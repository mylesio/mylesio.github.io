---
title: "Multi-Agent Governance: Building Reliable AI Agent Teams"
description: "How to organize multiple AI agents into reliable teams — roles, authorization, evaluation, prompt evolution, and the engineering principles behind it all."
date: 2026-04-06
tags: [ai, agent, multi-agent, architecture, governance]
lang: en
zhSlug: multi-agent-governance-zh
---

## The Problem

When you have multiple AI agents working together, four problems recur constantly:

1. **Unclear role boundaries** — agents step on each other's work
2. **Broken authorization chains** — who approved this destructive action?
3. **Untraceable task decomposition** — where did this subtask come from?
4. **No cross-agent quality control** — each agent marks its own homework

This note consolidates lessons from building a multi-agent governance protocol (inspired by Anthropic's harness engineering blog and practical experience running agent teams on real codebases).

---

## Core Architecture: Queen / Worker / Evaluator

| Role | Responsibility | Key Constraint |
|------|---------------|----------------|
| **Queen** | Orchestration, progress control, quality gates, authorization | Should NOT be the primary implementer |
| **Worker** | Task decomposition, implementation, delivery | No unlimited autonomy; sensitive ops require authorization |
| **Evaluator** | Independent assessment of Worker output | Must be tuned "critical" + calibrated with few-shot examples |

**Critical insight: the Evaluator cannot be the Generator.** Models evaluating their own output are naturally too lenient. An independent Evaluator catches bugs that self-review misses — this is true for both subjective (design) and objective (code correctness) tasks.

---

## Authorization Model (L0–L3)

| Level | Trigger | Approver |
|-------|---------|----------|
| **L0** | Read files, analyze, draft, local build/test | No authorization needed |
| **L1** | Modify important logic, start impactful services | Worker → Queen |
| **L2** | Large-scope but reversible changes | Queen can approve (must disclose in reports) |
| **L3** | Destructive/irreversible ops, core config changes | Queen + Human double confirmation |

Every authorization gets a unique ID. Every agent has a globally unique identifier. No anonymous agents.

---

## Context Reset > Context Compaction

When context approaches its limit, models exhibit "Context Anxiety" — they try to wrap up prematurely, behavior degrades. This isn't a token problem; it's a psychological one.

| Method | Mechanism | When to Use |
|--------|-----------|-------------|
| **Compaction** (summarize) | Preserve continuity, shrink in-place | Short tasks, strong models |
| **Context Reset** (clean slate) | Clear window + structured handoff | Long tasks, cross-day work, visible anxiety |

**Compaction doesn't cure Context Anxiety. Context Reset does.**

The handoff artifact (HANDOFF.md) must contain: current progress, completed criteria, remaining criteria, known blockers, next action, critical context (file paths, gotchas).

---

## Sprint Contracts

Plans stay high-level (user story level) to avoid planner errors propagating downstream. But between high-level spec and verifiable implementation, there's a gap.

**Sprint Contract fills that gap:**

1. Generator proposes: "I'll implement X, verify via Y"
2. Evaluator reviews: acceptance criteria confirmed
3. Both aligned → development begins

Communication between agents happens via files (naturally async, persistable, auditable).

---

## Evaluator Must Use Live Interaction

| Verification Method | Catches | Misses |
|--------------------|---------|--------|
| Static screenshots | Layout errors, color issues | Button exists but API never fires |
| CDP actual clicks | Above + interaction logic, API routing | Deep race conditions |
| Playwright automation | Same as CDP, more systematic | Same edge cases |

**Static screenshots can't see "the button is there but nothing happens when you click it."** The evaluator must actually walk key user paths.

---

## Prompt Evolution System

A closed-loop system for automatically improving agent prompts:

```
Run baseline evaluation (current prompt scored)
    ↓
Generate mutation (LLM analyzes failures, proposes changes)
    ↓
Evaluate mutated prompt on benchmark suite
    ↓
Score improves? → Accept mutation, update best prompt
Score same/worse? → Discard, try next mutation
    ↓
Repeat until budget exhausted or target score reached
```

Key constraints:
- **Only one evolution instance at a time** (shared state corruption otherwise)
- **Smoke test (22 checks, 30s) before every full run**
- **Every mutation is a structural rule change**, not random edits

Results from practice: baseline 79.2% → best 87.5% after two accepted mutations (+8.3pp).

---

## Harness Thinning Principle

> Every harness component is a hypothesis: "the model can't do X."

As models improve, these hypotheses need periodic re-evaluation. The protocol:

1. Remove one component at a time
2. Observe impact on final output quality
3. Don't aggressively refactor (can't tell what's load-bearing)
4. Review after each major model upgrade

What was essential scaffolding for Sonnet 3.5 might be unnecessary overhead for the next generation.

---

## The Goal

Reduce human involvement to exactly three touchpoints:

1. **Requirement confirmation** — approve the spec once
2. **Exception escalation** — agent retried N times and failed
3. **Final acceptance** — screenshots + green pipeline, confirm ship

Everything else should be handled by the agent team autonomously, with the Queen maintaining quality through Sprint Contracts and the Evaluator providing independent verification.
