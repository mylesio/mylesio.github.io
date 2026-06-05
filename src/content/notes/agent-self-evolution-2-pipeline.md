---
title: "Agent Self-Evolution (2): From Raw Traces to Judgment Patterns"
description: "A four-layer pipeline that transforms ReAct execution logs into reusable judgment patterns — the engineering backbone of agent self-improvement."
date: 2026-06-05
tags: [ai, agent, self-evolution, pipeline, memory-systems]
lang: en
zhSlug: agent-self-evolution-2-pipeline-zh
series: agent-self-evolution
seriesPart: 2
---

## The Core Idea

Execution logs are raw ore. They become valuable only after refinement. This post describes the four-layer pipeline that progressively extracts **judgment patterns** from raw agent traces — turning "what happened" into "what to do next time."

```
┌──────────────────────────────────────────────────────┐
│  L1: Raw Trace                                       │
│  Thought → Action → Observation → Decision points    │
│  (everything that happened, including rejected paths) │
└────────────────────────┬─────────────────────────────┘
                         │  Evaluator LLM extraction
┌────────────────────────▼─────────────────────────────┐
│  L2: Episode Memory                                  │
│  Structured cases: context → decisions → outcome     │
│  (what mattered, why it succeeded or failed)         │
└────────────────────────┬─────────────────────────────┘
                         │  Clustering + distillation
┌────────────────────────▼─────────────────────────────┐
│  L3: Judgment Patterns                               │
│  IF signal THEN action (with positive/negative cases)│
│  (reusable wisdom across multiple episodes)          │
└────────────────────────┬─────────────────────────────┘
                         │  Selective injection
┌────────────────────────▼─────────────────────────────┐
│  L4: Behavioral Injection                            │
│  Dynamic few-shot / Prompt rewrite / Route selection │
│  (agent behaves differently next time)               │
└──────────────────────────────────────────────────────┘
```

Each layer corresponds to a type of knowledge in Polanyi's framework:

| Layer | Polanyi Concept | What It Captures |
|-------|----------------|-----------------|
| L1 | Subsidiary particulars | Every signal the agent attended to |
| L2 | Focal awareness | The key decisions and their outcomes |
| L3 | Tacit judgment | Cross-situational "if-then" patterns |
| L4 | Indwelling | Knowledge actively shaping behavior |

---

## L1: Raw Trace — What to Capture

Standard ReAct traces record thought/action/observation. That's necessary but insufficient. The critical addition: **decision points** — moments where the agent chose one path over alternatives.

### Enhanced Trace Schema

```jsonl
{"type":"thought","content":"User wants pagination fix. Options: (a) move max-height to child, (b) increase value, (c) absolute positioning","ts":"..."}
{"type":"decision","chose":"b","alternatives":["a","c"],"reasoning":"simplest change","ts":"..."}
{"type":"action","tool":"edit_file","input":{"path":"panel.vue","change":"max-height: 210px"},"ts":"..."}
{"type":"observation","content":"User: '乱改了，回滚'","ts":"..."}
{"type":"signal","category":"structural_rejection","evidence":"'乱改了' indicates direction wrong, not value wrong","ts":"..."}
{"type":"decision","chose":"a_revised","alternatives":["c","ask_user"],"reasoning":"realized hidden constraint: outer max-height must not move","ts":"..."}
```

Key additions beyond standard ReAct:

| Field | Why It Matters |
|-------|---------------|
| `decision.alternatives` | Records paths NOT taken — where judgment lives |
| `decision.reasoning` | The agent's rationale at decision time (may be wrong — that's valuable) |
| `signal` | Extracted contextual cues (user tone, error patterns, escalation signals) |

### Capture Principle

**Non-invasive, sidecar recording.** Don't modify the agent's core logic to produce traces. Instead, wrap the tool-dispatch layer:

```python
def traced_dispatch(tool_call, context):
    # Record the decision (what was called and why)
    trace_log.append({
        "type": "action",
        "tool": tool_call.name,
        "input": tool_call.args,
        "ts": now()
    })
    # Execute
    result = dispatch(tool_call)
    # Record observation
    trace_log.append({
        "type": "observation",
        "content": truncate(result, 500),
        "ts": now()
    })
    return result
```

Decision points require the LLM to explicitly output alternatives — either through structured output formatting or post-hoc extraction from the thought text.

---

## L2: Episode Memory — Attribution Extraction

Raw traces are too granular for pattern recognition. L2 compresses a full task trace into a structured **episode**: the essential decisions, their context, and the outcome.

### Episode Schema

```yaml
episode_id: "ep-2026-06-03-pagination"
timestamp: "2026-06-03T14:30:00Z"
context:
  task_type: "css_layout_fix"
  complexity: "medium"
  constraints: ["outer max-height must not move", "user validates before merge"]
  tools_used: ["edit_file", "grep", "git_diff"]
decisions:
  - point: "fix approach selection"
    chose: "increase max-height value"
    rejected: ["move max-height to child", "absolute positioning"]
    outcome: "rejected by user"
    signal: "structural rejection ('乱改了' = direction wrong)"
  - point: "fix approach selection (attempt 2)"
    chose: "computed effectiveMaxHeight in child, outer unchanged"
    rejected: ["ask user for exact value", "abandon task"]
    outcome: "accepted"
outcome: "success_after_2_attempts"
lesson: "When user uses structural rejection language, the direction is wrong — don't iterate on the same approach"
tacit_signal: "'乱改了/回滚' = paradigm shift needed; '差一点/再调调' = keep iterating"
```

### Tacit Signal: The Most Valuable Field

Most structured logs miss this. `tacit_signal` captures **patterns that can't be written as rules but influence correct decisions**:

- User tone shifts (patience → frustration)
- Rejection escalation (gentle → harsh)
- Meta-signals ("算了我自己来" = agent has lost user trust)
- Temporal patterns (3 attempts on same approach = direction wrong)

### Extraction Method

Use an Evaluator LLM to extract episodes from L1 traces. Prompt structure:

```markdown
Given this execution trace, extract a structured episode.
Focus on:
1. What were the key decision points?
2. What alternatives were considered at each point?
3. What signal (if any) indicated the chosen path was wrong?
4. What's the one-sentence lesson?
5. What tacit signal (unwritten rule) does this episode reveal?

Output in YAML format: [schema above]
```

**Trigger timing:**
- After every task completion (success or failure)
- After every user rejection/override
- After every fix-loop (attempt → fail → retry)

---

## L3: Judgment Patterns — Cross-Episode Distillation

Individual episodes are anecdotes. Patterns emerge when you cluster similar episodes and distill the commonality.

### From Episodes to Patterns

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ep-06-03     │  │ ep-05-20     │  │ ep-05-15     │
│ CSS fix      │  │ API design   │  │ Refactor     │
│ 2 rejections │  │ 3 rejections │  │ 2 rejections │
│ signal:      │  │ signal:      │  │ signal:      │
│ "回滚"       │  │ "不是这样"    │  │ "重来"       │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └────────────┬────┘─────────────────┘
                    ▼
    ┌──────────────────────────────────┐
    │  JUDGMENT PATTERN:               │
    │                                  │
    │  IF: user rejects ≥2 times       │
    │      with structural language    │
    │      ("回滚/乱改了/不是这样")     │
    │                                  │
    │  THEN: stop current direction,   │
    │        re-identify constraints,  │
    │        propose fundamentally     │
    │        different approach        │
    │                                  │
    │  COUNTER-SIGNAL:                 │
    │  "差一点/再小一些" = parametric,  │
    │  keep iterating on same approach │
    │                                  │
    │  Verified: 3 episodes            │
    │  Last triggered: 2026-06-03      │
    └──────────────────────────────────┘
```

### Distillation Criteria

Not every cluster becomes a pattern. Thresholds:

| Criterion | Minimum |
|-----------|---------|
| Supporting episodes | ≥ 3 |
| Consistent outcome | Same lesson in ≥ 80% of episodes |
| Actionable | Must specify a concrete behavior change |
| Non-redundant | Must not duplicate an existing pattern |

### Output Format

Each pattern includes:

```yaml
pattern_id: "JP-007"
trigger: "user rejects with structural language ≥2 times"
action: "stop iterating, re-identify constraints, propose different paradigm"
counter_signal: "parametric feedback ('再小一些') → keep iterating"
positive_examples: ["ep-06-03", "ep-05-20"]
negative_examples: ["ep-05-10 (kept iterating after structural rejection → 4 wasted attempts)"]
confidence: 3  # number of verified episodes
last_verified: "2026-06-03"
```

---

## L4: Behavioral Injection — Closing the Loop

L3 patterns are inert until they change agent behavior. Three injection paths exist (detailed in Part 3):

1. **Dynamic Few-Shot**: At runtime, retrieve the 2-3 most relevant patterns and inject them as examples in the system prompt
2. **Prompt Evolution**: Periodically rewrite the system prompt's principles section based on accumulated patterns
3. **Architectural Routing**: Route different task types to specialized agent configurations, each pre-loaded with domain-specific patterns

The choice depends on maturity:
- Cold start → Path 2 (prompt evolution, lowest barrier)
- 50+ episodes → Add Path 1 (few-shot retrieval)
- Clear task clusters → Add Path 3 (routing)

---

## Automation: The Scheduling

```
Trigger              Pipeline Step         Frequency
─────────────────────────────────────────────────────
Task ends          → L1 → L2 extraction   Real-time
                     (Retrospective)

Weekly cron        → L2 → L3 distill      Every 50 episodes
                     (Pattern mining)      or weekly

Bi-weekly review   → L3 → L4 injection    Every 2 weeks
                     (Prompt/config update) + benchmark gate
```

**Quality gates at each transition:**

- L1→L2: Format validation (all required fields present) + deduplication (similar episodes merged)
- L2→L3: Minimum episode count + consistency check + non-redundancy
- L3→L4: **Benchmark must pass** — no injection without evidence of improvement (see Part 4)

---

## Key Takeaway

The pipeline is a **knowledge refinery**. Raw traces are crude oil — abundant but unusable directly. Each layer refines them further:

- L1 captures everything (high volume, low signal)
- L2 extracts what matters (medium volume, medium signal)
- L3 distills reusable patterns (low volume, high signal)
- L4 applies them (minimal, precise behavioral changes)

The most common mistake is trying to jump from L1 directly to L4 — reading logs and immediately writing rules. That's the "more rules" approach from Part 1, and it hits the same ceiling. The intermediate layers (L2 attribution + L3 clustering) are what transform anecdotes into genuine judgment patterns.

Next: [Part 3](/notes/agent-self-evolution-3-tuning) — the three injection paths in detail.
