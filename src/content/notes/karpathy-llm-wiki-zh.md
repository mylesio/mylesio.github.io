---
title: "Karpathy 的 LLM Wiki：知识即代码"
description: "不要每次都从零 RAG，让 LLM 持续编译和维护一本活的 wiki。Karpathy gist 的学习笔记。"
date: 2026-04-06
tags: [ai, knowledge-management, rag, memory]
lang: zh
---

## 核心思想

**不让 LLM 每次从零检索（RAG），而是让 LLM 持续编译并维护一本活的 wiki。**

来源：[Karpathy 的 gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

### 工作流

```
raw/（论文/文章/笔记/截图）
        ↓
   LLM 编译成互链 Markdown wiki
        ↓
   Obsidian 浏览 & 问答
        ↓
   每次问答的 insight → 归档回 wiki
        ↓（循环，越用越厚）
```

**三个类比：**
- LLM = 程序员
- wiki = 代码库
- Obsidian = IDE

---

## LLM Wiki vs. 传统 RAG

| 维度 | 传统 RAG | LLM Wiki |
|------|----------|----------|
| 知识形态 | 静态向量索引 | 活的、互链的 Markdown |
| 知识来源 | 原始文档切片 | LLM 编译提炼的结构化洞察 |
| 更新方式 | 重新 embedding | LLM 主动编辑 wiki 页面 |
| 越用越聪明 | ❌ | ✅ 每次问答输出归档回 wiki |
| 适用规模 | 海量文档 | ~100 篇 / 40 万字时效果最优 |
| 基础设施 | 向量数据库必须 | 纯文件系统（git + markdown） |

---

## 为什么 ~100 篇是甜点区

- **太少**：wiki 太薄，LLM 记忆优势就够了，没必要 wiki
- **太多**：context window 装不下全部 wiki，需要内部检索，又回到 RAG 的问题
- **甜点区**：wiki 能全部载入 context，LLM 能做"全局推理"（RAG 的向量搜索做不到跨文档推理）

---

## 操作原则

1. **LLM 定期健康检查**：找矛盾、补缺失、合并重复条目
2. **每次问答输出必须归档**：这是核心循环——用了就扔等于浪费
3. **wiki 是"编译产物"**：原始材料（`raw/`）是源码，wiki 页面是编译后的可执行文件
4. **互链而非平铺**：`[[页面名]]` 双链让知识成网状，不是孤岛

---

## 工具

- **Obsidian**：浏览 wiki，用图视图看知识关联
- **Git**：版本控制 wiki 变更（可以看理解如何演化）
- **LLM**：既是读者（问答）也是作者（维护 wiki）

---

## 实际应用

如果你跑的是带持久记忆的 AI Agent（如 OpenClaw、Claude Code 等），你已经在做单 Agent 版本的 LLM Wiki：

- `MEMORY.md` = 单个 agent 的"活 wiki"
- 对话中的 insight → 编译进 MEMORY.md → 下次 session 注入
- **差异**：MEMORY.md 通常是线性的，没有互链；完整 wiki 是网状的

### 升级路径

```
每日记忆日志（raw/）
    ↓ 定期编译
Wiki 页面（结构化、互链）
    ↓ 进一步提炼
Crystal（高置信度、稳定知识）
```

每层逐步精炼：
- **Raw**：发生的一切（高容量、低信号）
- **Wiki**：带上下文的结构化洞察（中容量、高信号）
- **Crystal**：不变的真理和已验证的模式（低容量、最高信号）

---

## 核心洞见

根本转变：**知识管理不是检索问题，是编译问题。**

RAG 问的是："给定一个查询，找到相关片段。"这是搜索。

LLM Wiki 问的是："基于我学到的一切，当前最佳理解是什么？"这是综合。

编译好的 wiki 随时就绪——没有检索延迟，没有相关性评分，没有遗漏上下文。代价是维护成本（编译需要 LLM 时间），但对于甜点区（~100 页）内的个人/团队知识库来说，效果远超 RAG。
