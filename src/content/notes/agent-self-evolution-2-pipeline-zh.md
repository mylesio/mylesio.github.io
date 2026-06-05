---
title: "Agent 自进化 (2)：从原始日志到判断力模式"
description: "四层管线将 ReAct 执行日志转化为可复用的判断力模式——Agent 自我提升的工程骨架。"
date: 2026-06-05
tags: [ai, agent, self-evolution, pipeline, memory-systems]
lang: zh
series: agent-self-evolution
seriesPart: 2
---

## 核心思想

执行日志是原矿石。经过提炼才有价值。本篇描述一个四层管线，逐步从原始 Agent trace 中提取**判断力模式**——把"发生了什么"变成"下次该怎么做"。

```
┌──────────────────────────────────────────────────────┐
│  L1: 原始轨迹 (Raw Trace)                            │
│  Thought → Action → Observation → 决策分支点          │
│  (发生的一切，包括被拒绝的路径)                         │
└────────────────────────┬─────────────────────────────┘
                         │  Evaluator LLM 提取
┌────────────────────────▼─────────────────────────────┐
│  L2: 情境记忆 (Episode Memory)                       │
│  结构化案例：上下文 → 决策 → 结果                      │
│  (什么重要，为什么成功或失败)                           │
└────────────────────────┬─────────────────────────────┘
                         │  聚类 + 蒸馏
┌────────────────────────▼─────────────────────────────┐
│  L3: 判断力模式 (Judgment Patterns)                   │
│  IF 信号 THEN 动作 (附正反例)                         │
│  (跨多个 episode 的可复用智慧)                         │
└────────────────────────┬─────────────────────────────┘
                         │  选择性注入
┌────────────────────────▼─────────────────────────────┐
│  L4: 行为注入 (Behavioral Injection)                  │
│  动态 few-shot / Prompt 改写 / 路由选择               │
│  (Agent 下次行为改变了)                               │
└──────────────────────────────────────────────────────┘
```

每层对应波兰尼框架中的一种知识类型：

| 层 | 波兰尼概念 | 捕获什么 |
|----|-----------|---------|
| L1 | 辅助觉知 (Subsidiary particulars) | Agent 注意到的每个信号 |
| L2 | 焦点觉知 (Focal awareness) | 关键决策及其结果 |
| L3 | 隐性判断 (Tacit judgment) | 跨情境的"如果-那么"模式 |
| L4 | 寓居 (Indwelling) | 积极塑造行为的知识 |

---

## L1: 原始轨迹——采集什么

标准 ReAct trace 记录 thought/action/observation。必要但不充分。关键增强：**决策分支点**——Agent 在多个选项中选择了一个的时刻。

### 增强 Trace Schema

```jsonl
{"type":"thought","content":"用户要修分页器。选项: (a) 移 max-height 到子元素, (b) 增大数值, (c) 绝对定位","ts":"..."}
{"type":"decision","chose":"b","alternatives":["a","c"],"reasoning":"最简单的改动","ts":"..."}
{"type":"action","tool":"edit_file","input":{"path":"panel.vue","change":"max-height: 210px"},"ts":"..."}
{"type":"observation","content":"用户: '乱改了，回滚'","ts":"..."}
{"type":"signal","category":"structural_rejection","evidence":"'乱改了'表明方向错误，不是值不对","ts":"..."}
{"type":"decision","chose":"a_revised","alternatives":["c","ask_user"],"reasoning":"意识到隐藏约束：外层 max-height 不能动","ts":"..."}
```

超越标准 ReAct 的关键字段：

| 字段 | 为什么重要 |
|------|-----------|
| `decision.alternatives` | 记录没走的路——判断力就藏在这里 |
| `decision.reasoning` | 决策时的理由（可能是错的——错误本身有价值） |
| `signal` | 提取的上下文线索（用户语气、错误模式、升级信号） |

### 采集原则

**非侵入式，旁路记录。** 不修改 Agent 核心逻辑来产出 trace。而是包装 tool-dispatch 层：

```python
def traced_dispatch(tool_call, context):
    trace_log.append({
        "type": "action",
        "tool": tool_call.name,
        "input": tool_call.args,
        "ts": now()
    })
    result = dispatch(tool_call)
    trace_log.append({
        "type": "observation",
        "content": truncate(result, 500),
        "ts": now()
    })
    return result
```

决策分支点需要 LLM 显式输出替代选项——通过结构化输出格式，或从 thought 文本中事后提取。

---

## L2: 情境记忆——归因提取

原始 trace 太细碎，不利于模式识别。L2 把一整段任务 trace 压缩成一个结构化的 **episode**：本质决策、上下文和结果。

### Episode Schema

```yaml
episode_id: "ep-2026-06-03-pagination"
timestamp: "2026-06-03T14:30:00Z"
context:
  task_type: "css_layout_fix"
  complexity: "medium"
  constraints: ["外层 max-height 不能动", "用户验证后才能合"]
  tools_used: ["edit_file", "grep", "git_diff"]
decisions:
  - point: "修复方案选择"
    chose: "增大 max-height 数值"
    rejected: ["移到子元素", "绝对定位"]
    outcome: "被用户否决"
    signal: "结构性否决（'乱改了' = 方向错了）"
  - point: "修复方案选择（第2次）"
    chose: "子组件内 computed 减去分页器高度，外层不变"
    rejected: ["问用户具体数值", "放弃任务"]
    outcome: "通过"
outcome: "success_after_2_attempts"
lesson: "用户用结构性否决语言时，方向是错的——不要在同一方案上迭代"
tacit_signal: "'乱改了/回滚' = 需要换范式; '差一点/再调调' = 继续迭代"
```

### Tacit Signal：最有价值的字段

大多数结构化日志漏掉了这个。`tacit_signal` 捕获的是**无法写成规则但影响正确决策的模式**：

- 用户语气变化（耐心 → 不耐烦）
- 否决升级（温和 → 强烈）
- 元信号（"算了我自己来" = Agent 已经失去用户信任）
- 时间模式（同一方案尝试 3 次 = 方向错了）

### 提取方法

用 Evaluator LLM 从 L1 trace 中提取 episode。Prompt 结构：

```markdown
给定这段执行轨迹，提取一个结构化 episode。
关注：
1. 关键决策点是什么？
2. 每个点考虑了哪些替代方案？
3. 什么信号（如有）表明选择的路径是错的？
4. 一句话教训是什么？
5. 这个 episode 揭示了什么隐性信号（不成文规则）？

输出 YAML 格式：[上述 schema]
```

**触发时机：**
- 每次任务完成后（成功或失败）
- 每次用户否决/覆盖后
- 每次 fix-loop（尝试 → 失败 → 重试）后

---

## L3: 判断力模式——跨 Episode 蒸馏

单个 episode 是轶事。模式在你聚类相似 episode 并蒸馏共性时浮现。

### 从 Episode 到 Pattern

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ep-06-03     │  │ ep-05-20     │  │ ep-05-15     │
│ CSS 修复     │  │ API 设计     │  │ 重构         │
│ 2 次否决     │  │ 3 次否决     │  │ 2 次否决     │
│ 信号:        │  │ 信号:        │  │ 信号:        │
│ "回滚"       │  │ "不是这样"    │  │ "重来"       │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └────────────┬────┘─────────────────┘
                    ▼
    ┌──────────────────────────────────┐
    │  判断力模式:                      │
    │                                  │
    │  IF: 用户用结构性语言否决 ≥2 次   │
    │      ("回滚/乱改了/不是这样")     │
    │                                  │
    │  THEN: 停止当前方向，             │
    │        重新识别约束，             │
    │        提出根本不同的方案          │
    │                                  │
    │  反信号:                          │
    │  "差一点/再小一些" = 参数性的，   │
    │  继续在同一方案上迭代             │
    │                                  │
    │  验证次数: 3 个 episode           │
    │  最后触发: 2026-06-03            │
    └──────────────────────────────────┘
```

### 蒸馏标准

不是每个聚类都能成为 pattern。门槛：

| 标准 | 最低要求 |
|------|---------|
| 支撑 episode 数 | ≥ 3 |
| 结果一致性 | ≥ 80% 的 episode 得出相同教训 |
| 可操作性 | 必须指定具体的行为改变 |
| 非冗余 | 不得重复已有 pattern |

### 输出格式

每个 pattern 包含：

```yaml
pattern_id: "JP-007"
trigger: "用户用结构性语言否决 ≥2 次"
action: "停止迭代，重新识别约束，提出不同范式"
counter_signal: "参数性反馈（'再小一些'）→ 继续迭代"
positive_examples: ["ep-06-03", "ep-05-20"]
negative_examples: ["ep-05-10 (结构性否决后继续迭代 → 浪费4轮)"]
confidence: 3
last_verified: "2026-06-03"
```

---

## L4: 行为注入——闭合回路

L3 的 pattern 在改变 Agent 行为之前是惰性的。三条注入路径（Part 3 详述）：

1. **动态 Few-Shot**：运行时检索最相关的 2-3 个 pattern，作为示例注入 system prompt
2. **Prompt 进化**：定期根据积累的 pattern 改写 system prompt 的原则部分
3. **架构路由**：将不同任务类型路由到专门的 Agent 配置，各自预加载领域 pattern

选择取决于成熟度：
- 冷启动 → 路径 2（prompt 进化，门槛最低）
- 50+ episodes → 加路径 1（few-shot 检索）
- 任务聚类清晰 → 加路径 3（路由）

---

## 自动化调度

```
触发条件          管线步骤              频率
─────────────────────────────────────────────────
任务结束        → L1 → L2 提取        实时
                 (Retrospective)

定时任务        → L2 → L3 蒸馏        每 50 个 episode
                 (Pattern 挖掘)        或每周

双周审查        → L3 → L4 注入        每两周
                 (Prompt/配置更新)      + benchmark 门控
```

**每次转换的质量门控：**

- L1→L2：格式校验（必填字段完整）+ 去重（相似 episode 合并）
- L2→L3：最低 episode 数 + 一致性检查 + 非冗余
- L3→L4：**必须过 benchmark**——没有改善证据不注入（见 Part 4）

---

## 关键要点

管线是一个**知识精炼厂**。原始 trace 是原油——量大但不能直接用。每层进一步精炼：

- L1 记录一切（高量，低信号密度）
- L2 提取重要内容（中量，中信号密度）
- L3 蒸馏可复用模式（低量，高信号密度）
- L4 应用它们（极少量，精确行为改变）

最常见的错误是试图从 L1 直接跳到 L4——读日志然后立刻写规则。那就是 Part 1 里的"加更多规则"做法，撞同样的天花板。中间层（L2 归因 + L3 聚类）才是把轶事转化为真正判断力模式的关键。

下一篇：[Part 3](/notes/agent-self-evolution-3-tuning) — 三条注入路径的详细设计。
