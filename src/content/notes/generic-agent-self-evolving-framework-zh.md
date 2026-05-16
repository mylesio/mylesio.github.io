---
title: "GenericAgent：3K 行代码的自进化 Agent"
description: "一个极简 Agent 框架如何通过上下文信息密度最大化和自主技能晶化，实现 6 倍 token 效率提升。"
date: 2026-05-17
tags: [ai, agent, architecture, memory, efficiency]
lang: zh
---

## GenericAgent 是什么？

一个极简的、可自我进化的自主 Agent 框架。核心仅 ~3K 行代码，通过 9 个原子工具 + ~100 行 Agent Loop，赋予任意 LLM 对本地计算机的系统级控制能力——浏览器、终端、文件系统、键鼠输入、屏幕视觉、移动设备(ADB)。

**设计哲学：不预设技能，靠进化获得。**

每解决一个新任务，GenericAgent 就将执行路径自动固化为 Skill，供后续直接调用。使用时间越长，沉淀的技能越多，形成一棵完全属于你的专属技能树。

来源：[github.com/lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) | [arXiv: 2604.17091](https://arxiv.org/abs/2604.17091)

---

## 为什么重要：Token 效率

论文副标题："Contextual Information Density Maximization"（上下文信息密度最大化）。

大多数 Agent 框架使用 200K–1M context token。GenericAgent 在 **<30K token** 下运作——而且任务完成率更高，成本降低 6 倍。

洞见：塞更多上下文不会有帮助。真正有帮助的是最大化每个 token 的**信息密度**。分层记忆 + 技能晶化意味着 context 里只有必要信息——噪声更少，幻觉更低。

---

## 架构：100 行 Agent Loop

整个执行核心：

```
Messages → LLM → Tool Calls → Dispatch → Next Prompt → Loop
```

就这样。`agent_runner_loop()` 函数大约 100 行。没有复杂的依赖注入，没有精巧的状态机。Agent Loop 就是一个带工具分发的 while 循环。

有趣的细节：每 10 轮重置一次 context 中的工具 schema（`client.last_tools = ''`），防止过时的工具描述降低推理质量。

---

## 9 个原子工具

| 工具 | 功能 |
|------|------|
| `code_run` | 执行任意代码 |
| `file_read` | 读文件 |
| `file_write` | 写文件 |
| `file_patch` | 修改文件 |
| `web_scan` | 感知网页内容 |
| `web_execute_js` | 控制浏览器行为 |
| `ask_user` | 人机确认 |
| `update_working_checkpoint` | 持久化上下文到记忆 |
| `start_long_term_update` | 积累长期经验 |

哲学：少量可组合的原语胜过大量专用工具。通过 `code_run`，Agent 可以动态安装包、写脚本、调 API——将临时能力晶化为永久技能。

---

## 分层记忆（L0–L4）

| 层级 | 内容 | 类比 |
|------|------|------|
| **L0** Meta Rules | 核心行为规则、系统约束 | 宪法 |
| **L1** Insight Index | 最小记忆索引，快速路由 | 目录 |
| **L2** Global Facts | 长期运行积累的稳定知识 | 百科 |
| **L3** Task Skills/SOPs | 可复用的任务工作流 | 操作手册 |
| **L4** Session Archive | 已完成 session 的提炼记录 | 日志 |

记忆在任务执行过程中持续晶化。L1 充当路由器——收到新任务时，快速定位该调用哪个 L3 技能，无需将所有内容加载到 context。

---

## 技能晶化：核心循环

```
[遇到新任务] → [自主摸索]
    (安装依赖、编写脚本、调试验证)
        → [将执行路径固化为 Skill]
            → [写入记忆层]
                → [下次同类任务直接调用]
```

| 你说的话 | 第一次 | 之后每次 |
|---------|--------|---------|
| "读我的微信消息" | 安装依赖 → 逆向 DB → 写读取脚本 → 保存 Skill | 一行调用 |
| "监控股票并提醒我" | 安装 mootdx → 构建选股流程 → 配置定时 → 保存 Skill | 一句话启动 |
| "用 Gmail 发这个文件" | 配置 OAuth → 写发送脚本 → 保存 Skill | 直接可用 |

用几周后，你的 Agent 实例拥有一套任何人都没有的专属技能树——全从 3K 行种子代码生长而来。

---

## 自举实证

整个仓库——从 `git init` 到每条 commit message——均由 GenericAgent 自主完成。作者全程未打开过一次终端。

这不是噱头，而是自进化论文的实证：Agent 自举了自己的开发环境，学会了 git，管理了自己的源码版本控制。

---

## 与其他方案的对比

| 维度 | GenericAgent | 传统 Agent 框架 |
|------|-------------|----------------|
| 代码量 | ~3K 行 | 5 万–50 万+ 行 |
| Context 使用 | <30K token | 200K–1M token |
| 技能获取 | 自主晶化 | 手动编写插件/skill |
| 浏览器控制 | 真实浏览器（保留登录态） | 沙箱/无头浏览器 |
| 记忆 | 5 层分级 | 扁平 context 或向量 RAG |
| Token 成本 | 1x（基线） | 4–6x |

---

## Agent 设计的关键启示

### 1. 信息密度 > 上下文长度

不要往 context 里塞更多东西。确保每个 token 都有存在价值。分层记忆意味着：L1 路由到正确的 L3 技能，只加载相关上下文。

### 2. 自动晶化 > 手动编写 Skill

不应该由人来写 Agent 技能。Agent 应在自然任务执行过程中发现并保存技能。这消除了技能维护瓶颈。

### 3. 最小工具集 + 代码执行 = 无限工具

9 个原子工具看似有限，直到你意识到 `code_run` 可以在运行时创造*任何*能力。Agent 不受 9 种动作的限制——它只受代码能做什么的限制（答案是一切）。

### 4. Agent Loop 应该是 trivial 的

如果你的 Agent Loop 超过 1000 行，你在 harness 里编码了太多逻辑。让 LLM 做推理；循环只做简单的分发。

### 5. 定期重置状态

`turn%10==0` 重置工具 schema 是个小但强大的模式。长上下文会降低对早期 token 的注意力。定期刷新保持关键信息突出。

---

## 与记忆系统的对比

GenericAgent 的 L0–L4 层级 vs. 其他记忆方案：

| GA 层级 | Temporal Crystal 等价物 | 关键差异 |
|---------|------------------------|---------|
| L0 Meta Rules | —（system prompt） | GA 让规则可变 |
| L1 Insight Index | BM25 + embedding 检索 | GA 用 LLM 生成索引，不用向量搜索 |
| L2 Global Facts | COMPRESSED 层 | 功能相似 |
| L3 Task Skills | CRYSTAL 层 | GA = "如何做 X"；TC = "X 的真相是什么" |
| L4 Session Archive | RAW 层（每日日志） | 类似：用于长期回溯的原始历史 |

GA 缺失的机制：**没有遗忘**。技能只增不减，永不衰减。对个人 Agent 有效（技能树只会增长），但规模化时可能成为维护负担。

---

## 更大的图景

GenericAgent 验证了一个很多人一直在接近的假设：**最好的 Agent 架构是那个消失的架构。**

3K 行代码。9 个工具。100 行循环。复杂性存在于 LLM 的推理中，而不是脚手架里。其他一切——技能、知识、能力——从使用中涌现。

框架是种子。你的使用是土壤。技能树是生长出来的东西。
