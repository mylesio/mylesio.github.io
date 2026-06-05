---
title: "Agent Self-Evolution (5): Distillation, Mutation Control, and Anti-Patterns"
description: "Safety nets for self-evolving agent systems: ablation-tested distillation, four-gate mutation control, cooling periods, and the most common failure modes."
date: 2026-06-05
tags: [ai, agent, self-evolution, safety, anti-patterns]
lang: en
zhSlug: agent-self-evolution-5-safety-zh
series: agent-self-evolution
seriesPart: 5
---

## The Core Risk

A self-evolving system's greatest danger isn't failing to evolve — it's **evolving in the wrong direction without noticing**. An agent that silently accumulates bad principles, bloated prompts, and cargo-cult rules will degrade so gradually that no single session reveals the problem.

This post covers the safety nets: mechanisms that ensure the system can only move in correct directions (or stay still), never backward.

---

## Distillation: Safe Prompt Compression

When your PRINCIPLES.md grows past the token budget, you need to compress. The question: how to remove content **without losing effective principles**?

### The Wrong Way: Intuition-Based Pruning

"This rule looks redundant, let me delete it." → You just removed the one rule that prevented a specific class of failure. You won't know until it recurs weeks later.

### The Right Way: Ablation Testing

Borrow from neuroscience — to understand what a brain region does, observe what breaks when you remove it.

```
PRINCIPLES.md (current, 25 principles)
         │
         │  For each candidate removal:
         ▼
┌─────────────────────────────────────────┐
│  1. Remove P-xxx from prompt            │
│  2. Run benchmark (same task set)       │
│  3. Compare results to baseline         │
│                                         │
│  Result A: No change → P-xxx is noise   │
│  Result B: Degraded  → P-xxx is active  │
│  Result C: Improved  → P-xxx was harmful│
└─────────────────────────────────────────┘
```

**Critical rule: test one removal at a time.** Removing multiple principles simultaneously makes attribution impossible.

### Four Distillation Operations

| Operation | When to Use | Example |
|-----------|-------------|---------|
| **Delete** | Ablation shows no impact | "Be thorough in your analysis" (too vague to affect behavior) |
| **Merge** | Multiple principles say the same thing | P-003 + P-007 + P-012 all about "user rejection handling" → one unified principle |
| **Upgrade to few-shot** | Rule is too abstract to follow | "Handle edge cases carefully" → replace with a concrete positive/negative example pair |
| **Demote to retrieval** | Low-frequency but verified effective | Move from always-present prompt → L3 pattern store, inject only when relevant task detected |

**"Demote to retrieval" is the most important move.** It lets you shrink the prompt without losing information. The principle isn't gone — it's just not occupying prompt space until needed.

### Trigger: When to Distill

Start distillation when prompt token count reaches 80% of your budget. Don't wait until it's full — you need room for the next evolution cycle.

---

## Mutation Control: The Four Gates

The Mutator (Part 3) proposes changes to PRINCIPLES.md. Not every proposal should be accepted. Four gates filter bad mutations:

```
Failure Episode
      │
      ▼
┌──────────┐
│ Mutator  │ → Proposed change
└──────────┘
      │
      ▼
┌──────────┐
│  Gate 1  │  STRUCTURAL — Is it well-formed?
│  (auto)  │
└────┬─────┘
     │ pass
     ▼
┌──────────┐
│  Gate 2  │  SUBSTANTIVE — Is it grounded in evidence?
│  (auto)  │
└────┬─────┘
     │ pass
     ▼
┌──────────┐
│  Gate 3  │  REGRESSION — Does it break anything?
│  (auto)  │
└────┬─────┘
     │ pass
     ▼
┌──────────┐
│  Gate 4  │  BLOAT — Does it fit the token budget?
│  (human) │
└────┬─────┘
     │ pass
     ▼
  ACCEPTED → enters candidate pool
```

### Gate 1: Structural Check

The proposed principle must:
- Contain a concrete trigger condition ("When X happens...")
- Contain a specific action ("...do Y")
- Be ≤ 3 sentences
- NOT be a pure attitude statement

```
❌ REJECTED: "Be more careful when editing CSS"
   Reason: no trigger condition, no specific action, attitude-only

✅ ACCEPTED: "When user rejects with structural language ('回滚/乱改了')
   ≥2 times, stop current approach and re-identify constraints before
   proposing a fundamentally different solution"
   Reason: clear trigger, specific action, bounded scope
```

### Gate 2: Substantive Check

- Must reference at least one source episode ("because ep-xxx showed...")
- Must explain the counterfactual: "If this principle had existed during ep-xxx, the decision at [point] would have changed from [bad] to [good]"
- Must not contradict existing active principles

### Gate 3: Regression Check

- Run benchmark with the new principle added
- Pass rate must not decrease
- Specifically watch for: over-caution (agent starts asking permission for everything)

### Gate 4: Bloat Check

- Total PRINCIPLES.md token count after addition must stay within budget
- If over budget: the proposal must include a retirement recommendation ("retire P-xxx because...")
- **One in, one out** when at capacity

---

## The Cooling Period

The most dangerous mutation pattern: **one failure → immediately add a rule**. This is the recency bias trap.

```
Day 1: Agent makes error X
       → Mutator proposes P-new: "Always check for X"
       → Sounds reasonable, passes Gates 1-3...

Day 2-30: Error X never recurs
          (it was a one-off, not a pattern)
          P-new sits in prompt doing nothing
          ...except consuming tokens and attention

Day 31: P-new conflicts with a new principle
        → Cascade failure
```

### Solution: Candidate Staging

New principles don't go directly into the active prompt. They enter a **candidate pool**:

```
┌────────────────────────────────────────────┐
│  Candidate Pool                            │
│                                            │
│  P-new (proposed 2026-06-03)               │
│  ├── Source: ep-2026-06-03-pagination      │
│  ├── Verification count: 0/3              │
│  ├── Status: awaiting verification         │
│  └── Expires: 2026-07-03 (30 days)        │
│                                            │
│  Promotion criteria:                       │
│  - Relevant scenario occurs ≥3 times       │
│  - In ≥2 of those, the principle would     │
│    have improved the decision              │
│                                            │
│  Expiry:                                   │
│  - 30 days with <3 relevant scenarios      │
│    → auto-discard                          │
└────────────────────────────────────────────┘
```

**The cooling period ensures only recurring patterns become principles.** One-off mistakes stay as L2 episodes (available via few-shot retrieval when relevant) but don't pollute the always-present prompt.

---

## Anti-Pattern Catalog

Five failure modes that self-evolving systems commonly develop:

### 1. Attitude Inflation

```
❌ "Be more careful"
❌ "Pay close attention to edge cases"
❌ "Think thoroughly before acting"
❌ "Double-check your work"
```

**Why harmful:** Zero behavioral constraint. The model already "tries" to be careful — telling it to try harder doesn't change what it does. These accumulate and dilute attention from actionable principles.

**Detection:** Any principle that doesn't specify a concrete trigger + action. Automated regex check: must contain "when/if" + a verb.

### 2. Over-Generalization

```
❌ "Always ask the user before making changes"
   (caused by: one time the agent changed something the user didn't want)
```

**Why harmful:** Turns the agent into an indecisive questionnaire. Users gave the agent tools precisely so it would act autonomously.

**Detection:** Principles containing "always" or "never" without a scoped trigger. Cross-check: does the principle conflict with any "be decisive" type instruction?

### 3. Causal Hallucination

```
❌ "Always wrap API calls in try-catch"
   (caused by: one network timeout that had nothing to do with error handling)
```

**Why harmful:** The principle addresses a symptom, not a cause. It adds defensive code everywhere regardless of whether the actual failure mode is relevant.

**Detection:** Gate 2 counterfactual check — "Would try-catch have prevented the original failure?" If no → reject.

### 4. Redundant Insurance

```
❌ "Check the file exists. Then verify it's readable. Then confirm it's not empty.
    Then validate the format. Then parse it. Then verify the parse result."
```

**Why harmful:** Turns a 2-step operation into a 6-step paranoia sequence. Most of these checks are redundant (if it's not readable, the parse will fail anyway).

**Detection:** Principles that prescribe sequential verification steps where a single operation would surface the same errors.

### 5. Recency Bias (the most dangerous)

```
Week 1: Agent fails at task type A → adds P-new-A
Week 2: Agent fails at task type B → adds P-new-B
Week 3: Agent fails at task type C → adds P-new-C
...
Week 10: Prompt is 40% "lessons from single failures"
         that never recurred
```

**Why harmful:** Prompt fills with one-off reactions. Signal-to-noise ratio collapses. The cooling period (above) is the primary defense.

**Detection:** Track `verified_count` for each principle. After 60 days, any principle with verified_count < 2 is a recency-bias candidate for retirement.

---

## Systemic Degradation: Early Warning Signals

Even with all gates in place, watch for these macro indicators:

| Signal | What It Means | Action |
|--------|--------------|--------|
| Prompt growing >5% per week | Mutations outpacing retirements | Enforce one-in-one-out strictly |
| Benchmark variance increasing | Agent behavior becoming unstable | Pause mutations, investigate conflicts |
| User intervention rate rebounding | Recent changes hurt more than help | Rollback last 2-3 mutations |
| Fix-loop count rising | Agent second-guessing itself | Check for over-caution principles |
| First-pass rate dropping | Agent lost confidence | Likely conflicting principles |

---

## Version Control and Audit

Every mutation to PRINCIPLES.md should be:

1. **A git commit** with structured message:
   ```
   evolve(P-012): add constraint-detection principle
   
   Source: ep-2026-06-03-pagination
   Counterfactual: would have saved 3 fix-loops
   Ablation: benchmark 89% → 89% (no regression)
   Gate results: G1✓ G2✓ G3✓ G4✓
   ```

2. **Linked to evaluation data**: which benchmark run confirmed it, what the before/after metrics were.

3. **Reviewable in hindsight**: every quarter, audit the evolution log. Which principles actually triggered? Which sat dormant? This is the "spring cleaning" that prevents long-term drift.

---

## Connecting Back: The Polanyi Thread

Polanyi observed that **tradition** — the passing of tacit knowledge from master to apprentice — requires a specific structure: the apprentice must practice under the master's observation, with the master providing corrective feedback at the right moments.

The self-evolution pipeline mimics this structure:
- **Practice** = the agent running tasks (generating traces)
- **Master's observation** = the Evaluator extracting episodes
- **Corrective feedback** = L3 patterns injected into future sessions
- **Safety nets** = ensuring the "master" doesn't teach bad habits

The crucial difference: a human master can't be wrong (by definition, within the tradition). An automated evolution system *can* drift. That's why the gates, benchmarks, cooling periods, and rollback mechanisms exist — they play the role of the "community of practitioners" that validates whether the master's teaching is sound.

---

## Series Summary

Across five parts, we've built a complete framework:

1. **The Problem**: Agents are stateless; rules have ceilings; tacit knowledge is the frontier
2. **The Pipeline**: L1 traces → L2 episodes → L3 patterns → L4 injection
3. **The Methods**: Dynamic few-shot, prompt evolution, architectural routing
4. **The Metrics**: Three-layer evaluation pyramid + judgment benchmarks
5. **The Safety**: Ablation distillation, four gates, cooling period, anti-patterns

The unifying insight: **agent self-evolution without fine-tuning is an information-refinement problem, not a learning problem.** You don't teach the model — you curate what it sees. The engineering challenge is maximizing the relevance and precision of that curation, while preventing the curation process itself from degrading.

The context window is your canvas. Fill it wisely.
