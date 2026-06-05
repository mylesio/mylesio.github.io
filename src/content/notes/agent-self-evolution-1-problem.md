---
title: "Agent Self-Evolution (1): Stateless Agents in a Stateful World"
description: "LLM agents are intelligent yet amnesiac. Explicit rules hit a ceiling. Real improvement requires extracting tacit knowledge from execution traces."
date: 2026-06-05
tags: [ai, agent, self-evolution, tacit-knowledge, memory]
lang: en
zhSlug: agent-self-evolution-1-problem-zh
series: agent-self-evolution
seriesPart: 1
---

## The Paradox: Intelligent Yet Amnesiac

An LLM agent can reason through multi-step problems, orchestrate tools, write code, and debug its own mistakes — all in a single session. Then the session ends, and it forgets everything.

Next time it encounters the same class of problem, it has no memory of what worked, what failed, or what the user's unspoken preferences were. It starts from zero.

Human experts don't work this way. A senior engineer who's debugged 500 CSS layout issues doesn't consult a checklist each time — they *feel* which direction is wrong before they can articulate why. That feeling is **tacit knowledge**: accumulated through practice, impossible to fully express in rules.

Michael Polanyi put it precisely: **"We can know more than we can tell."**

The agent's problem isn't intelligence. It's amnesia.

---

## Why "More Rules" Hits a Ceiling

The current industry reflex: agent made a mistake → add a rule to the system prompt.

```
Session 1:  Agent breaks user's layout constraint
            → Add rule: "Always confirm constraints before proposing solutions"

Session 2:  Agent asks too many questions, user gets frustrated
            → Add rule: "Be decisive, don't over-ask"

Session 3:  Rules now contradict each other
```

This approach fails for four structural reasons:

| Failure Mode | Mechanism |
|---|---|
| **Attention dilution** | Longer prompts → model pays less attention to each rule → compliance drops |
| **Rule conflict** | "Be proactive" vs "Be cautious" — both are valid in different contexts |
| **Empty generality** | "Be careful" has zero behavioral constraint — it's noise |
| **Long-tail coverage** | Rules can't cover every situation; real judgment handles novel contexts |

**Empirical evidence:** In one project, we compressed a 521-line system prompt down to 209 lines (−60%) and ran the same benchmark. Pass rate: identical. Sixty percent of those rules were doing nothing.

The ceiling isn't about writing better rules. It's about the fundamental nature of what rules can encode.

---

## Polanyi's Framework: Explicit vs. Tacit

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│            What we can write down                   │
│         ┌───────────────────────────┐              │
│         │     EXPLICIT KNOWLEDGE     │              │
│         │                           │              │
│         │  • "Check constraints"    │  ← Rules     │
│         │  • "Use git blame first"  │              │
│         │  • "Max 3 retries"        │              │
│         └───────────────────────────┘              │
│                                                     │
│  ─ ─ ─ ─ ─ ─ ─ ─ waterline ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│                                                     │
│         ┌───────────────────────────────────┐      │
│         │        TACIT KNOWLEDGE             │      │
│         │                                   │      │
│         │  • Sensing when a user is about   │      │
│         │    to lose patience               │      │
│         │  • Knowing which approach "feels  │      │
│         │    wrong" before testing it        │      │
│         │  • Recognizing that two failed    │      │
│         │    attempts = wrong direction     │      │
│         │  • Reading context signals that   │      │
│         │    shift the strategy             │      │
│         │                                   │      │
│         └───────────────────────────────────┘      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Polanyi identified two layers of awareness in skilled performance:

- **Focal awareness**: what you're consciously attending to (the task)
- **Subsidiary awareness**: the background signals you integrate without deliberate attention (user tone, context patterns, structural similarities to past problems)

An expert's **from-to structure** works like this: they perceive subsidiary clues → integrate them unconsciously → arrive at a focal judgment. They can't always explain the path from perception to conclusion.

For agents, this maps to:

| Polanyi Concept | Agent Engineering |
|---|---|
| Subsidiary awareness | Signals in traces: rejected alternatives, user tone, context constraints |
| Focal awareness | The final decision taken |
| From-to structure | The pattern from "seeing signals" to "making judgment" |
| Indwelling (internalization) | When patterns become part of the prompt / context / routing logic |

---

## ReAct Traces: The Hidden Gold Mine

The ReAct framework (Thought → Action → Observation → repeat) generates a complete decision trace for every task. Most teams use these traces only for debugging.

They're throwing away gold.

```
┌─────────────────────────────────────────────┐
│  TRACE: CSS Layout Fix Task                 │
├─────────────────────────────────────────────┤
│                                             │
│  Thought: "User wants max-height fixed.     │
│   Options: (a) move to child element        │  ← Decision point
│            (b) increase value               │
│            (c) use overflow hidden           │
│   Going with (b) — simplest change."        │
│                                             │
│  Action: modify max-height 170 → 210        │
│  Observation: User says "乱改了，回滚"       │
│                                             │
│  Thought: "User rejected strongly.          │  ← Signal
│   '乱改了' suggests direction is wrong,     │
│   not just value is wrong. Rethinking..."   │
│                                             │
│  Thought: "What if the constraint is:       │  ← Pivot
│   outer max-height must NOT change?         │
│   Then I need to work within it.            │
│   Option (a) revisited: pass reduced        │
│   height to child component."               │
│                                             │
│  Action: add computed effectiveMaxHeight     │
│  Observation: User approves ✓               │
│                                             │
└─────────────────────────────────────────────┘
```

The most valuable data here isn't "what was done" — it's:

1. **What was considered but rejected** (options a and c in the first thought)
2. **What signal triggered the pivot** ("乱改了" = structural rejection, not parametric)
3. **The reasoning gap between attempt 1 and attempt 2** (realizing a hidden constraint)

This is the raw material of tacit knowledge. A chess player's post-game analysis focuses on the moves *not* played — because that's where skill is revealed.

---

## The Constraint That Shapes Everything

Most agent developers call models via API. They can't touch weights. No LoRA, no DPO, no RLHF.

This means the traditional path — "accumulate experience → internalize into parameters" — is unavailable.

But there's a massive compensating advantage: **context windows are enormous**.

Human working memory holds ~7 items. That's why humans *must* internalize knowledge into procedural memory (muscle memory, intuition) — they can't hold all their experience in active recall.

LLMs have 128K–200K token context windows. That's an external memory slot large enough to hold hundreds of relevant experiences *at inference time*.

**Reframing the problem:**

```
Traditional (fine-tuning):
  Experience → Train into weights → Model "just knows"

API-constrained (our reality):
  Experience → Store in retrieval system → Inject at runtime → Model "knows for this session"
```

The question becomes: not "how to make the model learn," but **"how to provide the most relevant experience at each inference."**

This leads directly to the engineering challenge of the next four parts in this series: building the pipeline that extracts, structures, stores, and injects experiential knowledge — systematically and automatically.

---

## Series Roadmap

| Part | Title | Focus |
|------|-------|-------|
| **1** | Stateless Agents in a Stateful World | Problem definition (this post) |
| **2** | From Raw Traces to Judgment Patterns | The four-layer extraction pipeline |
| **3** | Behavioral Tuning Without Weights | Three injection paths: few-shot, prompt evolution, routing |
| **4** | How to Know It's Actually Getting Better | Evaluation pyramid + judgment benchmarks |
| **5** | Distillation, Mutation Control, and Anti-Patterns | Safety nets for self-evolving systems |

Each part is self-contained but builds on the prior. The theoretical anchor throughout is Polanyi's tacit knowledge framework — not as academic decoration, but as an engineering compass for what to extract and how.
