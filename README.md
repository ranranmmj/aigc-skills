# AIGC Skills

两个可复用的 AIGC 提示词技能。

> 当前版本：**v1.5.1** · 版本记录见 [CHANGELOG.md](CHANGELOG.md) · 发布说明见 [docs/release-v1.5.1.md](docs/release-v1.5.1.md)

## 安装 / 更新

- **安装**：复制技能目录到工具的技能目录（如 `~/.dsh/skills/`）。
- **更新**：用仓库最新版覆盖同名目录；有个人改动时先备份，再合并（发布原则见 `docs/release.md`）。
- **版本记录**：根级 `CHANGELOG.md`；每次发布打 `vX.Y.Z` tag，并附 GitHub Release 说明。

## video-prompt-optimizer

多场景视频提示词写作与优化：

- 模型：Seedance 2.0 / 2.5、Wan 3.0，以及未知视频模型通用路径
- 场景：TVC 广告、竖屏短剧、动作打戏（含追逐）、对话情绪、蒙太奇
- 前置：角色/场景/道具资产、分镜脚本、剧本改编、视觉规范、参考片反推
- 方法：场景结构 → 时长/拍法 → 镜头表 → 模型方言；诊断 → 最小补丁 → 复测
- 流程：工作流暂停点 + 三契约输入卡 + 三道验收 gate + 自测用例

安装：复制 `video-prompt-optimizer/` 到工具的技能目录（如 `~/.dsh/skills/`）。

调用示例：

```text
用 $video-prompt-optimizer 写一条 60 秒汽车 TVC，卖“家庭生活方式”
用 $video-prompt-optimizer 按超燃动作模板写 30 秒仙侠空战，要 Seedance 2.5
用 $video-prompt-optimizer 做一套角色多视图 + 场景俯视图 + 站位标注
```

## short-drama-adapt

竖屏短剧改编与审查：

- 选材评估、故事构建、两集结构重构
- 推理框架、逻辑审查（空间/时间/媒介/自相矛盾/信息缺失/规则违反/角色行为）
- 视觉设计、分镜设计、留白结尾

安装：复制 `short-drama-adapt/` 到工具的技能目录（如 `~/.dsh/skills/`）。

调用示例：

```text
用 $short-drama-adapt 把这个故事改成两集竖屏短剧
用 $short-drama-adapt 查这份剧本的逻辑漏洞
```

## 说明

- 两个 skill 的详细规则见各自 `SKILL.md`；来源与许可见 `SOURCE.md` / `NOTICE.md`。
- 仓库不包含凭据、私有链接、本机路径或生成产物；示例中的本地路径与项目名已脱敏。
- CI：`release-check` workflow 模板在 `docs/release-check.workflow.yml`，提交到 `.github/workflows/` 需要 `workflow` scope 的凭据；激活前用本地命令 `node scripts/release-check.mjs` 做等价检查（见 `docs/release.md`）。
