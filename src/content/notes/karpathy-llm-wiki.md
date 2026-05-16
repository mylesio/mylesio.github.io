---
title: "Karpathy's LLM Wiki: Knowledge as Code"
description: "Instead of RAG-from-scratch every time, let the LLM continuously compile and maintain a living wiki. Notes on Karpathy's gist."
date: 2026-04-06
tags: [ai, knowledge-management, rag, memory]
lang: en
zhSlug: karpathy-llm-wiki-zh
---

## The Core Idea

**Don't make the LLM retrieve from scratch every time (RAG). Instead, let it continuously compile and maintain a living wiki.**

Source: [Karpathy's gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

### The Workflow

```
raw/ (papers, articles, notes, screenshots)
        ↓
   LLM compiles into interlinked Markdown wiki
        ↓
   Browse & query in Obsidian
        ↓
   Insights from each Q&A → archived back into wiki
        ↓ (loop — gets thicker with use)
```

**Three analogies:**
- LLM = programmer
- Wiki = codebase
- Obsidian = IDE

---

## LLM Wiki vs. Traditional RAG

| Dimension | Traditional RAG | LLM Wiki |
|-----------|----------------|----------|
| Knowledge form | Static vector index | Living, interlinked Markdown |
| Knowledge source | Raw document chunks | LLM-compiled structured insights |
| Update method | Re-embed documents | LLM actively edits wiki pages |
| Gets smarter with use | ❌ | ✅ Every Q&A output archived back |
| Sweet spot | Massive document sets | ~100 pages / ~400K chars |
| Infrastructure | Vector DB required | Pure filesystem (git + markdown) |

---

## Why ~100 Pages is the Sweet Spot

- **Too few**: Wiki too thin; the LLM's parametric memory suffices, wiki unnecessary
- **Too many**: Context window can't hold the full wiki; need internal retrieval, which circles back to RAG's problems
- **Sweet spot**: Wiki fits entirely in context; LLM can do **global reasoning** across all pages (vector search can't do cross-document inference)

---

## Operating Principles

1. **LLM periodic health checks**: Find contradictions, fill gaps, merge duplicate entries
2. **Every Q&A output must be archived**: This is the core loop — don't use insights and throw them away
3. **Wiki is a compiled artifact**: Raw materials (`raw/`) are source code; wiki pages are the compiled executable
4. **Interlink, don't flat-list**: `[[page-name]]` bidirectional links turn knowledge into a network, not isolated islands

---

## Tools

- **Obsidian**: Browse wiki, use graph view to see knowledge connections
- **Git**: Version control wiki changes (see how understanding evolves)
- **LLM**: Both reader (Q&A) and writer (wiki maintenance)

---

## Practical Implementation

If you run an AI agent with persistent memory (like OpenClaw, Claude Code, etc.), you're already doing a single-agent version of this:

- `MEMORY.md` = single agent's "living wiki"
- Conversation insights → compiled into MEMORY.md → injected next session
- **Difference**: MEMORY.md is typically linear, without interlinking; a full wiki is networked

### The Upgrade Path

```
Daily memory logs (raw/)
    ↓ periodic compilation
Wiki pages (structured, interlinked)
    ↓ further distillation
Crystals (high-confidence, stable knowledge)
```

Each layer is progressively more refined:
- **Raw**: everything that happened (high volume, low signal)
- **Wiki**: structured insights with context (medium volume, high signal)
- **Crystal**: invariant truths and proven patterns (low volume, highest signal)

---

## Key Insight

The fundamental shift: **knowledge management is not a retrieval problem, it's a compilation problem.**

RAG asks: "Given a query, find relevant chunks." That's search.

LLM Wiki asks: "Given everything I've learned, what's the current best understanding?" That's synthesis.

The compiled wiki is always ready — no retrieval latency, no relevance scoring, no missed context. The tradeoff is maintenance cost (compilation takes LLM time), but for personal/team knowledge bases in the sweet spot (~100 pages), it's dramatically more effective than RAG.
