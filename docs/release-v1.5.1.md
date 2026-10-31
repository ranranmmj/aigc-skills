# v1.5.1

2026-10-31 · 首个版本化发布

## 摘要

本版把 `video-prompt-optimizer` 从“提示词写法库”升级为“写法库 + 导演层方法 + 工作流”：

- 时长与拍法从模型方言中抽离为模型无关文件（`timing-and-beats.md`）；
- 补齐分镜设计学（切镜连接、对白处理、出彩设计）与节奏层（双轨节奏、60 秒结构）；
- 增加工作流暂停点、三契约输入卡、三道验收 gate、自测用例；
- 场景路由合并为单一入口（`SKILL.md` 第三步），删除 `scenario-router.md`。

## 变更

### 新增

- `video-prompt-optimizer/references/timing-and-beats.md`
- `director-workflow.md` §5 生成单元、§6 双轨节奏与模板
- `visual-language.md` §8 切镜连接
- `scenario-dialogue-emotion.md` §6 对白处理武器库
- `scenario-action.md` §3 追逐/追车
- `scenario-short-drama.md` 60 秒压缩版
- `SKILL.md`：工作流与暂停点、三契约、三道 gate、能力边界速查、自测用例
- 仓库级：`CHANGELOG.md`、`package.json`、`docs/release.md`、`docs/release-notes-template.md`、`scripts/release-check.sh`、`.github/workflows/release-check.yml`

### 修改

- `seedance-2.5.md` 删除时长预算表，保留时间戳机制
- `seedance-2.0.md` / `wan-3.0.md` 容量指针与台词口径
- `requirement-brief.md` 三契约输入卡；`shot-sheet-template.md` 口径对齐
- `iteration-and-diagnosis.md` 诊断闸门与症状表
- 来源标注去除本机路径

### 删除

- `video-prompt-optimizer/references/scenario-router.md`（并入 `SKILL.md` 第三步）

## 兼容性 / 迁移

- 安装方式不变：复制技能目录到工具的技能目录。
- 引用过 `scenario-router.md` 的，改读 `SKILL.md` 第三步。
- 旧版按“每镜 2–3 秒”排时长的，改为按信息层数与拍法估算（见 `timing-and-beats.md`）。

## 验证

- 冷读 A（单条齐全）：通过
- 冷读 B（多镜缺台词）：通过
- 结构检查：无悬空引用、交叉引用可解析、方言纯度未破坏

## 链接

- 完整变更记录：[CHANGELOG.md](../CHANGELOG.md)
