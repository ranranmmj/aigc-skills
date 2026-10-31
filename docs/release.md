# Release Guide

## Purpose

本仓库用 **GitHub Releases + `vX.Y.Z` tag** 作为公开发布记录；不发布 npm 包。

## Release Principles

- 只发布**可复用的技能资产**：`SKILL.md`、`references/`、`assets/`、`agents/` 以及仓库级发布文件。
- 不打包：凭据、私有链接、本机路径、个人项目上下文、生成产物、用户特定配置。
- 保持角色与文件名中性：不在源文件里写个人目录、账号或本地安装路径。
- 发布检查必须**只读**；版本号、CHANGELOG、commit、tag、Release 由维护者显式执行。

## Pre-Release Checklist

1. **确认版本目标与发布范围**（哪些 skill 变了、是否包含破坏性变更）。
2. **更新 `package.json` 的 `version`**（与 tag 一致）。
3. **更新 `CHANGELOG.md`**：把 `## Unreleased` 的内容归档为 `## vX.Y.Z — 日期`，写清用户可见变化、兼容性与迁移说明。
4. **跑发布检查**：

   ```bash
   npm run release:check
   ```

5. **检查内容清单**：`git ls-files` 确认没有本机路径、凭据、生成产物。
6. **提交**：提交信息用描述性句子（如 `Release v1.5.1: ...`），不用前缀式 conventional commits。
7. **打 tag**：`git tag vX.Y.Z && git push origin vX.Y.Z`。
8. **创建 GitHub Release**：标题 `vX.Y.Z`，正文按 `docs/release-notes-template.md` 填写（可直接用 `docs/release-vX.Y.Z.md`）。

## CI 未激活时

`release-check` workflow 模板放在 `docs/release-check.workflow.yml`。提交 `.github/workflows/` 路径需要带 `workflow` scope 的凭据（OAuth / classic PAT），普通 `repo` scope 会被 GitHub 以 404 拒绝。

在 CI 激活前：

- **本地等价检查**：`node scripts/release-check.mjs`（与 CI 跑的是同一脚本）；
- **激活方式**：用网页上传该文件到 `.github/workflows/release-check.yml`，或在可访问 github.com 的环境执行 `gh auth refresh -s workflow` 后再提交；
- 激活后无需改 `package.json`：`npm run release:check` 已指向同一脚本。

## After Release

- 确认 `release-check` workflow 在 tag push 后为绿色。
- 确认 tag 指向的 commit 与 Release 说明一致。
- 更新 `README.md` 顶部的“当前版本”行。

## Rollback

- 不要删除已发布的 tag；如需回退，发布一个**新补丁版本**（`vX.Y.Z+1`），并在 CHANGELOG 写清回退原因与恢复方式。
