# Changelog

本仓库的公开变更记录。格式：`## Unreleased` 累积未发布变更；发布时归档为 `## vX.Y.Z — 日期`。

## Unreleased

- 暂无。

## v1.5.1 — 2026-10-31

首个版本化发布。相对仓库旧版（v1.0 上传版），`video-prompt-optimizer` 完成结构重构。

### 新增

- `references/timing-and-beats.md`：模型无关的时长与拍法——拍的定义、三类拍（质感/叙事/顺序〔链条式/断点式〕）、四张区间表（叙事功能/信息层数/景别/镜头组）、台词“脑内演一遍”、动作-反应单元、出彩设计 70/30、失败判据、三模型时间机制差异。
- `director-workflow.md` §5 生成单元（多镜合一生）：分组规则、单元字段、容量、可切点；§6 节奏模型升级为双轨节奏 + 三层叠加 + 波浪图 + 40/60/90–120/30 秒模板。
- `visual-language.md` §8 切镜连接：相邻景别/跨级跳切比例、推近拉远弹跳、方向与视线匹配、动作中切、场景转换、角度保持。
- `scenario-dialogue-emotion.md` §6 对白处理武器库：正反打 4 变体 + 非正反打 10 种 + 选择逻辑。
- `scenario-action.md` §3 追逐/追车结构。
- `scenario-short-drama.md` 60 秒压缩版结构表。
- `SKILL.md`「工作流与暂停点」（B1–B4 节点）、三契约输入卡（Brief / Direction / Reference Pack）、三道验收 gate、模型能力边界速查、自测用例与冷读清单。
- `iteration-and-diagnosis.md` 诊断闸门（先方案后动手）。
- 仓库级：`CHANGELOG.md`、`package.json`（v1.5.1）、`docs/release.md`、`docs/release-notes-template.md`、`docs/release-v1.5.1.md`、`scripts/release-check.sh`、`.github/workflows/release-check.yml`。

### 修改

- `seedance-2.5.md`：删除“时长预算表”，保留时间戳机制（连续、总和=duration、末标记≥3s、节奏级精度、单拍卡不用标记、每标记只变一层），容量指向 `timing-and-beats.md`。
- `seedance-2.0.md` / `wan-3.0.md`：容量指向 `timing-and-beats.md`；台词口径由字数改为“演一遍”。
- `requirement-brief.md` 重写为三契约输入卡；`shot-sheet-template.md` 时长/台词口径对齐，补“待定”台词态。
- `director-workflow.md` 七阶段表加“暂停点”列；镜头字段加一致性裁决口。
- `iteration-and-diagnosis.md` 症状表补“画面空/假循环”“动作丢失/跳变”。
- `NOTICE.md`、`seedance-2.0/2.5.md`、`wan-3.0.md`：来源中的本机路径改为“未随仓库分发”描述（发布原则：不含本机路径）。

### 删除

- `references/scenario-router.md`：内容并入 `SKILL.md` 第三步（场景路由唯一入口），消除双入口。

### 验证

- 冷读 A（单条齐全：8s 2.5 追车 + 逐字台词）：通过。
- 冷读 B（多镜缺台词：60s/12 镜）：通过——先问 3 个阻塞项、先出镜头表并暂停、台词写待定。
- 结构检查：无 `scenario-router` 悬空引用；`§` 交叉引用可解析；三份方言互不污染。

### 兼容性 / 迁移

- 安装方式不变（复制目录）。
- 若你直接引用过 `references/scenario-router.md`，改为读 `SKILL.md` 第三步。
- 若你按旧版“每镜 2–3 秒”硬排时长，改为按 `timing-and-beats.md` 的信息层数与拍法估算。
