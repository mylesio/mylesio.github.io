---
title: "The Right Way to Build AI Applications"
description: A breakdown of the MCP protocol, AI app architecture, and why context is the only battleground that matters.
date: 2025-03-18
tags: [ai, mcp, architecture, frontend]
lang: en
archived: true
zhSlug: how-to-build-ai-apps-zh
---

## Background

### Industry

From 2024 data: AI chatbot apps generated over $1B in revenue; users spent 7B hours in AI chat apps, up 347% year-over-year. LLMs have demonstrably moved the needle at billion-dollar scale.

As models become multimodal (GPT-4o, Qwen2.5-Omni, etc.), niche consumer applications are safer bets, but for internal tooling, stronger models are always better.

### Technology

Starting from Claude 3.5 Sonnet, the programming profession entered its AI era. Anthropic has since delivered: a hybrid reasoning model, the MCP standard, a fast-apply model for instant file edits, and Cursor. The old development paradigm is actively being dismantled.

If React-era tooling gave us leverage, LLMs gave us a dimension upgrade — requiring broader technical breadth, not just depth.

## Application Example

A general-purpose AI chat assistant: Electron shell, React + Vite frontend, local server, tools for task execution. The data visualization example in the video below shows the capability ceiling.

The pattern is: user input → LLM interprets → calls tools → returns result with full context.

## How It Actually Works

### 3.1 MCP Fundamentals

MCP (`modelcontextprotocol.io`) is a protocol, not a product. Its most important primitive is `tool` — analogous to function call, but protocol-level and model-agnostic.

A common question: what's the difference between OpenAI function calls and MCP tools? The key distinction: MCP is a protocol that works with any model. Function call capability is model-specific. MCP wins on portability.

**The request loop:**

Every interaction is a request chain:
1. User sends a message with system prompt that includes MCP server config
2. LLM wraps tool usage in structured tags (e.g. `<use_mcp_tool>`)
3. **The client (not the LLM) actually calls the MCP server**
4. Result is appended to context and sent back to LLM
5. LLM synthesizes the full context and responds

The LLM never executes code. It only orchestrates.

### 3.2 AI Application Architecture

Think of a coordinate plane where the x-axis is feature scope and the y-axis is context length. As tools execute, results accumulate in context. This is the pattern underlying all current AI apps — RAG, browser use, code agents — they're all context management strategies.

```
User input
    + System prompt
    + Tool definitions
    + Tool execution results (accumulated)
    = LLM context
         → LLM response
```

The architecture is the same everywhere. The differentiation is in what tools you build and how you manage context quality.

## Closing Thoughts

JavaScript and Python dominate MCP SDK support. But the application layer is drifting toward Node.js. Atwood's Law still holds: any application that can be written in JavaScript, will eventually be written in JavaScript.

The opportunity isn't in the model layer — that's Python's territory. The opportunity is in the tool and context orchestration layer. That's where frontend engineers have native advantages.
