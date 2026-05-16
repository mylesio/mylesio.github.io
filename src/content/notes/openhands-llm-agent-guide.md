---
title: "LLM Agent Development Guide from OpenHands"
description: Dissecting how OpenHands handles multi-model support, message systems, conversation memory, and microagents — lessons for building your own LLM agent.
date: 2025-05-27
tags: [ai, agent, openhands, architecture]
lang: en
zhSlug: openhands-llm-agent-guide-zh
---

OpenHands is an open-source autonomous software development platform. It can modify code, run commands, browse the web, and call APIs. Source: [github.com/All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)

## Agent Flow

The agent loop: receive task → LLM reasons → tool call → observe result → loop until done.

OpenHands implements this with a clean separation: the LLM decides *what* to do, the runtime *executes* it, and observations are fed back into context.

## Multi-Model Support Architecture

OpenHands uses LiteLLM as a unified adapter layer, letting the same agent code run against any LLM provider without changes. The key insight: separate the agent logic from the model interface.

## Message System Design

**Custom Message class** — supports rich content formats including text, images, and tool results. Two serialization paths:
- String serialization: for plain text content
- List serialization: for multimedia content

**Message construction flow** — `_get_messages` converts the event history into LLM-consumable message format. The system maintains a rolling window and handles prompt caching for efficiency (especially relevant for Anthropic models).

## Conversation Memory Management

`ConversationMemory` handles event history for CodeAct Agent:

1. Events from the runtime are accumulated
2. Messages are constructed from events on demand
3. Prompt caching is applied to static prefixes
4. Long histories are summarized or truncated to fit context windows

The design principle: treat memory as a pipeline, not a log dump.

## Microagents System

Microagents are specialized modules that inject domain knowledge or workflow guidance into the agent's context. Three types:

**Knowledge Microagents** (`.openhands/microagents/knowledge/`)
- Triggered by keywords
- Contain domain expertise: specific tools, languages, frameworks
- Example: "when you see `Vue 2`, inject the reactivity gotchas doc"

**Task Microagents** (`.openhands/microagents/tasks/`)
- Provide step-by-step workflow guidance
- Accept inputs and adapt to different scenarios
- Example: "when task is PR review, walk through: checkout → read diff → check tests → summarize"

**Repository Microagents**
- Project-specific context and conventions
- Auto-loaded when the agent operates in a known codebase

## Key Takeaways

1. **Decouple model from logic** — use an adapter layer (LiteLLM or equivalent). Your agent shouldn't care which model it's running on.

2. **Memory is a pipeline** — don't just append events; construct messages purposefully, cache the stable prefix, summarize the volatile middle.

3. **Microagents = context injection** — rather than one giant system prompt, use targeted knowledge injection based on task type. Smaller, more relevant context beats comprehensive context.

4. **Observe → Reason → Act loop** — the agent never "knows" what happened; it only sees what it can observe. Design your observations carefully.

5. **File system as memory** — long-running agents should externalize state to files (TODO.md, DEV_LOG.md) rather than relying solely on in-context history.
