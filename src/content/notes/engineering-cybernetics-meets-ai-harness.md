---
title: "Engineering Cybernetics Meets AI Harness"
description: How Qian Xuesen's 1954 control theory maps to the problem of making AI agents follow instructions reliably.
date: 2026-05-16
tags: [ai-agents, harness, control-theory]
lang: en
zhSlug: engineering-cybernetics-meets-ai-harness-zh
---

Qian Xuesen published *Engineering Cybernetics* in 1954. It took Norbert Wiener's abstract control theory and made it usable for real engineering problems — rockets, missiles, automated systems. The core idea: any system with a measurable output and a controllable input can be made to converge toward a goal, given feedback.

Seventy years later, the same structure applies to the problem of getting AI agents to reliably follow instructions and produce correct outputs.

---

## The Control Loop, Restated

The classic feedback control diagram:

```
Goal ──▶ Controller ──▶ Actuator ──▶ Plant ──▶ Output
              ▲                                   │
              └──────── Sensor (measurement) ◀────┘
```

Swap in an AI agent:

```
Spec ──▶ Harness ──▶ Prompt ──▶ LLM Agent ──▶ Code / Text
           ▲                                       │
           └──── Evidence (tests, lint, coverage) ◀┘
```

The mapping is exact:

| Control Theory | AI Harness |
|----------------|------------|
| Plant (controlled system) | LLM agent |
| Controller | Orchestration logic + rules |
| Reference input | Spec + acceptance criteria |
| Actuator | Prompt injection |
| Sensor | Automated evidence collection |
| Feedback signal | Pass/fail from test runner, linter |
| Negative feedback | Fix-loop (retry on failure) |

---

## Four Levels of Control

Qian Xuesen described four design methods, from simple to complex:

**Level 1 — Classical control.** The system model is known; fixed rules suffice. In harness terms: hardcoded rules in the orchestration layer. "E2E tests must pass." "No hardcoded secrets." These work when agent behavior is predictable.

**Level 2 — Robust control.** The model has uncertainty; the controller must tolerate a range of deviations. In harness terms: phase gates — hard exits that don't need to know *why* the agent failed, only *that* the output is outside acceptable bounds. The gate fires regardless of the specific failure mode.

**Level 3 — Adaptive control.** Learn and control simultaneously; the controller updates its model online. In harness terms: iterative benchmarking with retrospective analysis. Each benchmark run surfaces new failure patterns, which get distilled into updated rules for the next run. The controller improves over time.

**Level 4 — Intelligent control.** Multi-agent systems, conflicting objectives, emergent behavior. In harness terms: the frontier — multi-agent orchestration where one agent's output constraints another's, dynamic spec drift detection, multi-objective optimization (coverage vs. token cost vs. latency).

A well-designed harness engineering system moves through these levels as the agent's task complexity grows.

---

## The Observability Requirement

Control theory has a foundational theorem: a system can only be controlled if it is *observable* — you must be able to infer the system's true state from its outputs.

This has a direct implication for AI harness design: **never trust agent self-reports**.

An agent that says "I ran the tests and they passed" is not a sensor. It is part of the plant. The actual sensor is the test runner's output file — a structured artifact that exists independently of what the agent claims.

Evidence-based validation means treating every measurable output (test results, coverage numbers, lint reports, type-check output) as the ground truth, and treating agent-generated prose as unverified input. The harness only advances the pipeline when the artifacts say so, not when the agent does.

---

## Feedforward vs. Feedback

Most harness engineering is feedback-dominant: agent produces output → validation fails → retry. This is reactive.

Control theory also has *feedforward*: analyze the upcoming task *before* execution and inject task-specific constraints proactively, based on known failure modes.

In practice: if the task involves external HTTP requests, inject the constraint "all non-localhost requests must be intercepted and fulfilled" *at spawn time*, not after observing the first failure. If the task involves component mounting, inject known anti-patterns for that component type upfront.

A feedforward layer reduces fix-loop iterations by shifting correction from reactive to predictive.

---

## Stability

A feedback system that isn't carefully designed can become unstable — oscillation, divergence, runaway loops.

The harness equivalent: an unbounded fix-loop. If an agent repeatedly fails the same gate and the harness keeps retrying indefinitely, you get a spinning failure that consumes resources without converging.

The control theory solution is to analyze closed-loop stability before deploying. The harness solution is simpler: set a maximum retry count, and escalate to human review when the limit is hit. The system remains stable because it has an explicit failure mode (human-in-the-loop) rather than an infinite regress.

---

## What This Gets You

Framing harness engineering through control theory clarifies what actually needs to be built:

1. **Sensors first.** If you can't measure it, you can't control it. Every behavioral constraint needs a corresponding automated measurement.
2. **Robust before adaptive.** Get hard phase gates working reliably before investing in learning mechanisms.
3. **Feedforward reduces feedback load.** A 100-entry anti-pattern library injected at spawn is cheaper than 100 fix-loop iterations.
4. **Stability is a design constraint, not an afterthought.** Every fix-loop needs a termination condition.

The deeper insight from Qian Xuesen is that *engineering* a system means making its behavior predictable and controllable — not just hoping it works. The same applies to building reliable AI agent pipelines.

---

*Tagged: [ai-agents], [harness], [control-theory]*
