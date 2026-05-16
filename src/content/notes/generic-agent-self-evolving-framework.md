---
title: "GenericAgent: A Self-Evolving Agent in 3K Lines"
description: "How a minimal agent framework achieves 6x token efficiency through contextual information density maximization and autonomous skill crystallization."
date: 2026-05-17
tags: [ai, agent, architecture, memory, efficiency]
lang: en
zhSlug: generic-agent-self-evolving-framework-zh
---

## What is GenericAgent?

A minimal, self-evolving autonomous agent framework. Core: ~3K lines of code. Through 9 atomic tools + a ~100-line Agent Loop, it grants any LLM system-level control over a local computer — browser, terminal, filesystem, keyboard/mouse, screen vision, and mobile devices (ADB).

**Design philosophy: don't preload skills — evolve them.**

Every time GenericAgent solves a new task, it automatically crystallizes the execution path into a skill for direct reuse. The longer you use it, the more skills accumulate — forming a skill tree that belongs entirely to you.

Source: [github.com/lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) | [arXiv: 2604.17091](https://arxiv.org/abs/2604.17091)

---

## Why It Matters: Token Efficiency

The paper's subtitle: "Contextual Information Density Maximization."

Most agent frameworks use 200K–1M context tokens. GenericAgent operates in **<30K tokens** — and achieves higher task completion rates at 6x lower cost.

The insight: cramming more context doesn't help. What helps is maximizing the **information density** of every token present. Layered memory + skill crystallization means the context contains exactly what's needed — no noise, fewer hallucinations.

---

## Architecture: 100 Lines of Agent Loop

The entire execution core:

```
Messages → LLM → Tool Calls → Dispatch → Next Prompt → Loop
```

That's it. The `agent_runner_loop()` function is ~100 lines. No complex dependency injection, no elaborate state machines. The agent loop is a simple while-loop with tool dispatch.

Neat trick: every 10 turns, it resets the tool schema in context (`client.last_tools = ''`) to prevent stale tool descriptions from degrading reasoning quality.

---

## 9 Atomic Tools

| Tool | Function |
|------|----------|
| `code_run` | Execute arbitrary code |
| `file_read` | Read files |
| `file_write` | Write files |
| `file_patch` | Patch/modify files |
| `web_scan` | Perceive web content |
| `web_execute_js` | Control browser behavior |
| `ask_user` | Human-in-the-loop confirmation |
| `update_working_checkpoint` | Persist context to memory |
| `start_long_term_update` | Accumulate long-term experience |

The philosophy: a small set of composable primitives beats a large set of specialized tools. Through `code_run`, the agent can dynamically install packages, write scripts, call APIs — crystallizing temporary abilities into permanent skills.

---

## Layered Memory (L0–L4)

| Layer | Content | Analogy |
|-------|---------|---------|
| **L0** Meta Rules | Core behavioral rules, system constraints | Constitution |
| **L1** Insight Index | Minimal memory index for fast routing | Table of contents |
| **L2** Global Facts | Stable knowledge from long-term operation | Encyclopedia |
| **L3** Task Skills/SOPs | Reusable workflows for specific tasks | Playbooks |
| **L4** Session Archive | Distilled records from finished sessions | Journal |

Memory crystallizes throughout execution. L1 serves as a router — given a new task, it quickly identifies which L3 skill to invoke without loading everything into context.

---

## Skill Crystallization: The Core Loop

```
[New Task] → [Autonomous Exploration]
    (install deps, write scripts, debug & verify)
        → [Crystallize Execution Path into Skill]
            → [Write to Memory Layer]
                → [Direct Recall on Next Similar Task]
```

| What you say | First time | Every time after |
|--------------|-----------|-----------------|
| "Read my WeChat messages" | Install deps → reverse DB → write read script → save skill | One-line invoke |
| "Monitor stocks and alert me" | Install mootdx → build flow → configure cron → save skill | One-line start |
| "Send this file via Gmail" | Configure OAuth → write send script → save skill | Ready to use |

After weeks of use, your agent instance has a skill tree no one else has — all grown from 3K lines of seed code.

---

## Self-Bootstrap Proof

The entire repository — from `git init` to every commit message — was completed autonomously by GenericAgent. The author never opened a terminal once.

This isn't a gimmick. It's a proof of the self-evolving thesis: the agent bootstrapped its own development environment, learned git, and managed its own source control.

---

## Comparison with Other Approaches

| Dimension | GenericAgent | Traditional Agent Frameworks |
|-----------|-------------|------------------------------|
| Codebase | ~3K lines | 50K–500K+ lines |
| Context usage | <30K tokens | 200K–1M tokens |
| Skill acquisition | Autonomous crystallization | Manual plugin/skill authoring |
| Browser control | Real browser (preserves login sessions) | Sandbox/headless browser |
| Memory | 5-layer hierarchical | Flat context or vector RAG |
| Token cost | 1x (baseline) | 4–6x |

---

## Key Insights for Agent Design

### 1. Information Density > Context Length

Don't stuff more into the context window. Instead, ensure every token earns its place. Layered memory means: L1 routes to the right L3 skill, only relevant context is loaded.

### 2. Crystallization > Manual Skill Authoring

Humans shouldn't write agent skills. The agent should discover and save them during natural task execution. This eliminates the skill maintenance bottleneck.

### 3. Minimal Toolset + Code Execution = Infinite Tools

9 atomic tools seem limiting until you realize `code_run` can create *any* capability at runtime. The agent isn't limited to 9 actions — it's limited only by what code can do (which is everything).

### 4. The Agent Loop Should Be Trivial

If your agent loop is 1000+ lines, you're encoding too much logic in the harness. Let the LLM reason; keep the loop as a simple dispatch mechanism.

### 5. Reset State Periodically

The `turn%10==0` tool schema reset is a small but powerful pattern. Long contexts degrade attention to early tokens. Periodic refresh keeps critical information salient.

---

## Comparison with Memory Systems

GenericAgent's L0–L4 hierarchy vs. other memory approaches:

| GA Layer | Temporal Crystal Equivalent | Key Difference |
|----------|----------------------------|----------------|
| L0 Meta Rules | — (system prompt) | GA makes rules mutable |
| L1 Insight Index | BM25 + embedding retrieval | GA uses LLM-generated index, not vector search |
| L2 Global Facts | COMPRESSED layer | Similar function |
| L3 Task Skills | CRYSTAL layer | GA = "how to do X"; TC = "what is true about X" |
| L4 Session Archive | RAW layer (daily logs) | Similar: raw history for long-horizon recall |

Notable absence in GA: **no forgetting mechanism**. Skills only accumulate, never decay. This works for a personal agent (skill trees only grow) but could become a maintenance burden at scale.

---

## The Bigger Picture

GenericAgent validates a hypothesis many of us have been circling: **the best agent architecture is the one that disappears.** 

3K lines. 9 tools. 100-line loop. The complexity lives in the LLM's reasoning, not in the scaffolding. Everything else — skills, knowledge, capabilities — emerges from use.

The framework is the seed. Your usage is the soil. The skill tree is what grows.
