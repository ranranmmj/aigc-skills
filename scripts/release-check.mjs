#!/usr/bin/env node
// Read-only release check for aigc-skills. Does not modify files.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
let failed = false;

const note = (m) => console.log(m);
const ok = (m) => console.log(`ok: ${m}`);
const bad = (m) => { console.error(`FAIL: ${m}`); failed = true; };

note("== release check ==");

// 1. release files exist
for (const f of ["CHANGELOG.md", "README.md", "package.json", "docs/release.md", "scripts/release-check.mjs"]) {
  if (!existsSync(join(root, f))) bad(`missing ${f}`);
}
ok("release files present");

// 2. skill dirs: SKILL.md exists; frontmatter name matches dir
const skills = ["video-prompt-optimizer", "short-drama-adapt"];
for (const d of skills) {
  const p = join(root, d, "SKILL.md");
  if (!existsSync(p)) { bad(`${d}/SKILL.md missing`); continue; }
  const txt = readFileSync(p, "utf8");
  const m = txt.match(/^name:\s*(\S+)/m);
  if (m && m[1] === d) ok(`${d} frontmatter name matches`);
  else bad(`${d} frontmatter name '${m ? m[1] : "?"}' != dir name`);
}

// 3. retired entry must stay deleted
if (existsSync(join(root, "video-prompt-optimizer/references/scenario-router.md")))
  bad("retired scenario-router.md is back");
else ok("retired entry absent");

// 4. no local machine paths (lines marked 未随仓库分发 are allowed)
const pathRe = /(C:\\|\/Users\/[A-Za-z]|Desktop|桌面[`\\/])/;
const allowRe = /未随仓库分发/;
let pathHit = false;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(md|ya?ml|json)$/.test(name)) {
      readFileSync(p, "utf8").split(/\r?\n/).forEach((line, i) => {
        if (pathRe.test(line) && !allowRe.test(line)) {
          console.error(`FAIL: local path ${relative(root, p)}:${i + 1}: ${line.trim()}`);
          pathHit = true;
        }
      });
    }
  }
}
walk(root);
if (pathHit) failed = true; else ok("no local machine paths");

// 5. SKILL.md references resolve
for (const d of skills) {
  const p = join(root, d, "SKILL.md");
  if (!existsSync(p)) continue;
  const refs = new Set(readFileSync(p, "utf8").match(/(?:references|assets)\/[A-Za-z0-9._-]+\.md/g) || []);
  for (const r of refs) {
    if (!existsSync(join(root, d, r))) bad(`broken link in ${d}: ${r}`);
  }
}
ok("skill links checked");

// 6. no credential-like strings
const credRe = /(gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})/;
let credHit = false;
function walkCred(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkCred(p);
    else if (/\.(md|ya?ml|json)$/.test(name)) {
      if (credRe.test(readFileSync(p, "utf8"))) {
        console.error(`FAIL: credential-like string in ${relative(root, p)}`);
        credHit = true;
      }
    }
  }
}
walkCred(root);
if (credHit) failed = true; else ok("no credential-like strings");

// 7. CHANGELOG has a version heading
const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
if (/^## v\d+\.\d+\.\d+/m.test(changelog)) ok("CHANGELOG version heading present");
else bad("CHANGELOG has no version heading");

console.log(failed ? "== result: FAIL ==" : "== result: PASS ==");
process.exit(failed ? 1 : 0);
