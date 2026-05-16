---
title: "A Frontend Developer's Thoughts on LLMs"
description: How LLMs are reshaping frontend development — prompts, tools, context, and the shift from static to agent-driven workflows.
date: 2025-01-09
tags: [ai, frontend, llm, agent]
lang: en
zhSlug: thinking-about-llm-as-a-frontend-dev-zh
---

## Background and Goal

After using tools like Cursor and various AI coding assistants, the impact of LLMs on software engineering became hard to ignore. Pure chat-style interaction is just the beginning. To systematically leverage AI for productivity, you need more complex interaction patterns — like the MCP protocol.

The application layer of LLM tooling is evolving every week. One week it's agents, the next it's workflow-based approaches like Agentless. There's always a new concept that questions the previous one.

## Characteristics of LLMs in Coding

The core surprise came from Cursor's composer: whether it's line-level, function-level, or file-level, it can infer suggestions from context, function names, comments, and anything useful. From an LLM usage perspective, if you can provide:

1. Precise enough requirements
2. Sufficiently atomic tools
3. Appropriately scoped context

...an LLM can theoretically handle all daily development scenarios. The goal then simplifies into three concrete problems.

## Engineering LLM Capabilities

### 1. Precise Prompting

The intelligence of an agent is also its unpredictability. Context-poor or context-overloaded prompts both cause problems. Precise prompting is a skill — "prompt engineering" exists for a reason. MCP includes a mechanism for custom built-in prompts triggered by `/` shortcuts. It's a direction worth watching.

### 2. Atomic Tools

MCP's `tool` concept is its most important primitive — it maps perfectly onto function call capabilities. The more atomic each tool is, the more flexible the composition. Like how a robot with fully articulated joints moves more fluidly.

### 3. Context Length Management

Longer context isn't always better. The sweet spot is a stable, appropriate window. General-purpose models don't have fast-apply layers like Cursor does — large files (1200+ lines) can get truncated during edits, requiring a restart from scratch. The best short-term fix is prompt-level guidance, but that's not ideal.

## Existing Approaches to AI-Assisted Development

Three patterns, each with trade-offs:

| Pattern | Description | Pros | Cons |
|---|---|---|---|
| Low-code platforms | AI generates schema, rendered by platform SDK | Controllable output, good for simple cases | Limited by platform capabilities, ongoing maintenance tied to platform |
| Design-to-code (P2C) | From requirements/mockups directly to component library code | Eliminates intermediate steps, huge speedup | High maintenance cost as page complexity increases |
| Role assistant agent | An agent acting as a developer persona, operating across platforms | Flexible, extensible | ROI unclear short-term |

## Thoughts on AI Integration

### Cost Estimation (circa 2024, GPT-4o-level pricing)

- P2C flow (~7200 tokens): ~¥0.38 per generation
- Low-code flow (~11500 tokens): ~¥0.62 per generation

These numbers are small. The bottleneck is quality, not cost.

### Three Agent Interaction Modes

**1. Static Q&A bot (localized)**
Floating widget pattern. Works well for knowledge base lookup or guided workflows. Fast and predictable, but requires a maintained private knowledge base.

**2. Platform-embedded agent**
Side panel conversation. Reduces the learning curve for complex tools. Downside: each platform needs to build its own AI layer.

**3. Role assistant agent (client-side)**
Desktop app / Electron shell acting as a cross-platform delegate. High upside, unclear near-term ROI.

The shift we're moving toward: from AI-assisted to AI-primary, with humans confirming key decision points rather than driving every step.
