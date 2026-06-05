---
title: "Agent Self-Evolution (3): Behavioral Tuning Without Weights"
description: "Three paths to agent improvement without fine-tuning: dynamic few-shot injection, prompt evolution, and architectural routing."
date: 2026-06-05
tags: [ai, agent, self-evolution, prompt-engineering, few-shot]
lang: en
zhSlug: agent-self-evolution-3-tuning-zh
series: agent-self-evolution
seriesPart: 3
---

## The Key Reframe

Fine-tuning changes P(output|input) — the model's permanent tendency to produce certain outputs given certain inputs.

Context injection changes P(output|input, context) — the model's *conditional* tendency when given relevant experience alongside the input.

The difference:
- Fine-tuning = muscle memory (always there, no lookup needed)
- Context injection = open-book exam (need to find the right page, but just as effective once found)

Humans need to internalize knowledge because working memory holds ~7 items. LLMs have 128K–200K token context windows. **The "open book" is enormous.** Before it's full, there's no functional difference between "the model knows" and "the model is told."

```
┌──────────────────────────────────────────────────┐
│        When does context injection fail?          │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. Too many relevant experiences (>20 cases)    │
│     → Retrieval precision becomes the bottleneck │
│                                                  │
│  2. Behavioral preferences too subtle            │
│     ("tone", "style", "taste")                   │
│     → Hard to express as examples                │
│                                                  │
│  3. Speed-critical paths                         │
│     → Retrieval latency unacceptable             │
│                                                  │
│  Until you hit these walls:                      │
│  context injection ≈ fine-tuning in effect       │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Path A: Dynamic Few-Shot Injection

### Core Idea

Don't retrieve *knowledge documents*. Retrieve *decision cases*.

Standard RAG: "Here's documentation about CSS layout" → agent reads it → hopefully applies it correctly.

Dynamic Few-Shot: "Last time you faced a similar situation, here's what happened and what worked" → agent pattern-matches → replicates the successful path.

| Dimension | Standard RAG | Decision-Case Retrieval |
|-----------|-------------|------------------------|
| Retrieves | Facts, docs, specs | Past decisions + outcomes |
| Helps with | "What is X?" | "What should I do about X?" |
| Signal | Informational | Behavioral |
| Index key | Topic similarity | Situation similarity |

### Implementation

```
Task arrives
    │
    ▼
Extract task signature:
  { type: "css_fix", signals: ["user_rejected_twice"], constraints: [...] }
    │
    ▼
Vector search L3 Judgment Patterns
  → Top 2-3 matches by situation similarity
    │
    ▼
Inject into system prompt:
┌─────────────────────────────────────────────┐
│ ## Relevant Experience (auto-retrieved)      │
│                                             │
│ **Similar situation**: User rejected a CSS  │
│ approach twice with structural language.    │
│ ✅ What worked: Stop iterating, re-identify │
│    hidden constraints, propose new paradigm │
│ ❌ What failed: Adjusting parameters on the │
│    same rejected approach (3 wasted rounds) │
│ 🔍 Key signal: "回滚/乱改了" = direction   │
│    wrong; "差一点" = keep iterating         │
└─────────────────────────────────────────────┘
    │
    ▼
Agent executes (behavior shaped by injected cases)
```

### Design Decisions

**Why max 2-3 cases?** Beyond 3, the examples start competing for attention. The model may conflate advice from different cases. Diminishing returns measured empirically.

**Embedding strategy:** Embed the `trigger` + `context` fields of L3 patterns. At query time, embed the current task's type + observed signals. Cosine similarity for retrieval.

**Staleness management:** Each pattern has `last_verified` timestamp. Patterns not verified in 60 days get retrieval score penalized by 0.5×. After 120 days, archived (still searchable but won't auto-inject).

---

## Path B: Prompt Evolution (The Mutator Pattern)

### Core Idea

Treat the system prompt as a **living document** that evolves based on evidence. A dedicated "Mutator" process periodically rewrites it based on accumulated failure episodes.

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│Prompt v8│────▶│ Agent   │────▶│ Traces  │
└─────────┘     │ runs N  │     │ (L1-L2) │
                │ tasks   │     └────┬────┘
                └─────────┘          │
                                     │ failure episodes
                ┌─────────┐          │
                │Prompt v9│◀─────────┤
                └────┬────┘          │
                     │          ┌────▼────┐
                     │          │ Mutator │
                     │          │ (LLM)   │
                     │          └────┬────┘
                     │               │
                     ▼               ▼
              ┌────────────┐   ┌──────────┐
              │ Benchmark  │   │ Proposed │
              │ (pass/fail)│◀──│ changes  │
              └────────────┘   └──────────┘
                     │
            pass: deploy v9
            fail: discard, keep v8
```

### PRINCIPLES.md: The Evolvable Unit

Rather than rewriting the entire prompt, the Mutator operates on a structured `PRINCIPLES.md` — a list of behavioral rules, each with metadata:

```yaml
- id: "P-007"
  trigger: "user rejects with structural language ≥2 times"
  action: "stop current direction, re-identify constraints, new paradigm"
  source_episode: "ep-2026-06-03-pagination"
  verified_count: 3
  last_triggered: "2026-06-03"
  status: "active"  # active | candidate | retired
```

**Lifecycle:**

```
candidate ──(verified 3×)──▶ active ──(60 days unused)──▶ retired
    ▲                                                        │
    │                                                        │
    └──── (new failure episode triggers creation) ◀──────────┘
                                                   (re-activated if
                                                    relevant again)
```

### Evolution Cadence

- **Maximum 1 mutation per week** — prevents cascading changes that are impossible to diagnose
- **Every change = git commit** with message: "Add P-012 (source: ep-xxx, reason: ...)"
- **Rollback granularity**: revert one principle at a time, not the whole prompt

---

## Path C: Architectural Routing

### Core Idea

Instead of one general-purpose agent handling everything, route tasks to **specialized configurations** — each pre-loaded with domain-specific patterns, tools, and constraints.

This mirrors Polanyi's observation that expertise is domain-specific. A chess grandmaster's intuition doesn't transfer to surgery. An agent's CSS-fixing judgment doesn't help with API design.

```
Task arrives
    │
    ▼
┌───────────────────┐
│   Classifier      │  (lightweight: rules, embeddings, or small LLM)
│   "What kind of   │
│    task is this?"  │
└───────┬───────────┘
        │
   ┌────┼────────┬──────────┐
   ▼    ▼        ▼          ▼
┌─────┐┌─────┐┌─────┐┌──────────┐
│CSS  ││API  ││Debug││Refactor  │
│Fix  ││Desn ││Diag ││Planning  │
│     ││     ││     ││          │
│Prncpl││Prncpl││Prncpl││Prncpl  │
│1,7,9 ││2,4,8 ││3,5,6 ││4,10,11 │
│     ││     ││     ││          │
│Tools:││Tools:││Tools:││Tools:   │
│edit, ││curl, ││grep,││ast,     │
│grep  ││test  ││log  ││diff     │
└─────┘└─────┘└─────┘└──────────┘
```

Each expert configuration contains:
- **Subset of principles** (only relevant ones — less noise)
- **Domain few-shot cases** (only same-domain episodes)
- **Restricted tool set** (fewer irrelevant options)
- **Domain-specific constraints** (e.g., CSS fixes: "always confirm visual constraints first")

### When to Split

Don't route too early. Split when:

| Signal | Threshold |
|--------|-----------|
| Distinct failure patterns by task type | ≥ 3 types with different L3 patterns |
| Principle conflicts between domains | Principles that help in domain A hurt in domain B |
| L2 episode volume | ≥ 20 episodes per candidate domain |

**Over-splitting cost:** maintenance burden + edge cases that don't fit any expert → fall through to a degraded general path.

---

## Combining the Three Paths

They're not mutually exclusive. They operate at different timescales and serve different purposes:

```
┌────────────────────────────────────────────────────────┐
│                   L3 Judgment Patterns                  │
│                    (shared source)                      │
└───────┬──────────────────┬──────────────────┬──────────┘
        │                  │                  │
        ▼                  ▼                  ▼
 ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
 │  Path A:     │  │  Path B:     │  │  Path C:     │
 │  Few-Shot    │  │  Prompt Evo  │  │  Routing     │
 │              │  │              │  │              │
 │  "Right now, │  │  "From now   │  │  "For this   │
 │  for this    │  │  on, always  │  │  type of     │
 │  task"       │  │  do X"       │  │  work, use   │
 │              │  │              │  │  config Y"   │
 │  Latency:    │  │  Latency:    │  │  Latency:    │
 │  per-request │  │  weekly      │  │  monthly     │
 └──────────────┘  └──────────────┘  └──────────────┘
```

**Recommended adoption order:**

1. **Start with B** (Prompt Evolution) — lowest barrier, works from day 1 with manual episode review
2. **Add A** (Dynamic Few-Shot) — once you have 50+ episodes and a vector store
3. **Add C** (Routing) — once task-type clusters are clearly distinct in your L3 patterns

---

## The Deeper Insight

Polanyi's concept of **indwelling** describes how knowledge becomes part of the knower — a pianist doesn't think about finger positions, they "dwell in" the piano.

Fine-tuning achieves indwelling literally: knowledge enters the weights, becomes part of the model.

Context injection achieves indwelling *functionally*: knowledge arrives just-in-time, and the model behaves as if it's always known it.

The practical limitation isn't capability — it's **retrieval precision**. The real engineering challenge of agent self-evolution isn't "how to learn" but "how to remember the right thing at the right time."

Which brings us to the next question: how do you *know* the agent is actually getting better, and not just accumulating noise? That's Part 4.

Next: [Part 4](/notes/agent-self-evolution-4-evaluation) — evaluation pyramid and judgment benchmarks.
