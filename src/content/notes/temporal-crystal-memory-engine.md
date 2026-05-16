---
title: "Temporal Crystal: A Memory Compression and Retrieval Engine"
description: "An AI memory system with layered compression, hybrid retrieval, knowledge graphs, self-healing, and a dream engine inspired by biological sleep."
date: 2026-03-20
tags: [ai, memory, retrieval, knowledge-graph, agent]
lang: en
zhSlug: temporal-crystal-memory-engine-zh
---

## What is Temporal Crystal?

A memory engine for AI agents that solves the fundamental problem: **how do you give a stateless model persistent, evolving, self-maintaining memory?**

The answer: a layered compression pipeline inspired by how biological memory consolidates during sleep.

---

## The Four Memory Layers

```
RAW → COMPRESSED → ABSTRACT → CRYSTAL
 │         │            │          │
 high      medium       low        minimal
 volume    volume       volume     volume
 │         │            │          │
 all       key facts    patterns   invariant
 details   preserved    identified truths
```

| Layer | What It Stores | Lifetime | Example |
|-------|---------------|----------|---------|
| **RAW** | Everything that happened | Days–weeks | "At 14:32, user asked about Vue reactivity" |
| **COMPRESSED** | Key facts, decisions | Weeks–months | "User prefers Vue composition API over options API" |
| **ABSTRACT** | Patterns across events | Months | "User learns by doing, not reading docs" |
| **CRYSTAL** | Invariant truths | Permanent | "Always show code examples before explaining theory" |

Each layer is progressively smaller and more refined. The LLM itself drives the compression — it's good at summarization, which makes this its natural sweet spot.

---

## Hybrid Retrieval (v0.4)

Three retrieval strategies fused via Reciprocal Rank Fusion (RRF, k=60):

| Strategy | Strength | Weakness |
|----------|----------|----------|
| **BM25** (with jieba for Chinese) | Exact term matching, fast | Misses semantically similar but lexically different |
| **Embedding** (OpenAI-compatible, L2 normalized cosine) | Semantic similarity | May miss exact matches, slower |
| **Graph** (BFS with hop decay) | Finds related concepts via connections | Requires graph to be built |

The fusion ensures you get both precision (BM25) and recall (embedding) with structural context (graph).

---

## GraphRAG-Lite (v0.5)

A lightweight knowledge graph with three edge types:

| Edge Type | Meaning | Example |
|-----------|---------|---------|
| `same_group` | Memories from the same context | Two memories from the same debugging session |
| `semantic` | Semantically related content | "Vue reactivity" ↔ "Proxy-based state management" |
| `call_chain` | Causal or procedural links | "Build failed" → "Missing dependency" → "npm install fixed it" |

Retrieval via BFS expansion: start from the best-matching node, expand outward with hop decay (0.7^hop). `call_chain` edges get a +0.3 bonus (causal links are more valuable than mere association).

---

## Self-Healing (v0.6)

When retrieval returns low-quality results (nothing relevant found), the system **generates new memories to fill the gap**:

```
Query → Recall → Quality too low?
                      ↓ Yes
    LLM synthesizes 1-3 new memories
    Writes them to RAW layer
    Re-runs recall with augmented memory
```

Constraints:
- Maximum 2 heals per query (prevents runaway generation)
- Heal history is tracked (can review what was synthesized)
- `--dry-run` mode shows what would be generated without writing

---

## Dream Engine (v0.7)

Inspired by biological sleep consolidation. Four phases per dream cycle:

### Phase 1: DECAY
Apply Ebbinghaus forgetting curve: `importance × e^(-rate × age_days)`

Immunity rules:
- CRYSTAL layer memories never decay
- High importance (≥0.8) memories are protected
- Everything else gradually fades

### Phase 2: COMPRESS
Promote RAW memories that have survived decay to COMPRESSED layer. The LLM extracts key facts, discards procedural details.

### Phase 3: MERGE
Detect duplicates via jieba token overlap (Jaccard ≥ threshold). Merge similar memories into single, richer entries.

### Phase 4: GRAPH
Update the knowledge graph with new connections discovered during compression and merging.

**Watch mode**: Runs as a background thread on a configurable interval (like a daemon dreaming while you sleep).

---

## CLI Interface

```bash
tc init                    # Initialize a new crystal store
tc add "memory text"       # Add a new memory (auto-scored for importance)
tc recall "query"          # Retrieve relevant memories
tc recall --graph          # Include graph-expanded results
tc dream                   # Run one dream cycle
tc dream --watch           # Background daemon mode
tc dream --dry-run         # Preview without writing
tc heal "query"            # Manually trigger self-heal
tc stats                   # Memory layer statistics
tc graph-stats             # Knowledge graph statistics
```

---

## What's Next

- **Crystal triggers**: Auto-detect when 3+ similar memories appear → LLM distills them into a Crystal
- **Crystal conflict detection**: Alert when a new Crystal contradicts an existing one
- **Visualization**: Memory health dashboard + knowledge graph visualization + timeline view
- **Memory sharing**: Export/import Crystals between agents
- **Collaborative memory**: Multiple agents contributing to the same knowledge base
- **Configurable forgetting**: Different domains use different decay curves

---

## The Key Insight

Traditional agent memory is either "remember everything" (context overflow) or "remember nothing" (stateless). Temporal Crystal offers a third option: **remember the right things at the right granularity, and let the rest gracefully fade** — just like biological memory does.

The dream engine isn't a metaphor. It's a literal implementation of sleep consolidation: compress, merge, forget, strengthen. The result is a memory system that gets *better* over time, not just bigger.
