---
title: "EndlessRun: Running Local Models for 24 Hours Straight"
description: A design for letting an 8B–26B edge model run complex tasks overnight using task decomposition, memory compression, and native tool calls.
date: 2026-04-06
tags: [ai, local-llm, agent, gemma]
lang: en
zhSlug: endlessrun-local-model-24h-zh
---

> Give it a task before bed. Wake up to results.

## One-Sentence Pitch

Let edge models (8B–26B) run complex tasks for 24 hours straight using **task decomposition + memory compression + native tool calls**.

## Why It Matters

- **Zero cost**: edge models don't consume API credits
- **Data stays local**: privacy-safe, nothing leaves your machine
- **Always on**: no API rate limits, no service outages
- **Profile accumulation**: the more you use it, the better it knows you

---

## Architecture

```
Edge Model
    │ outputs structured text with tool call markers
    ▼
Tag Parsing Layer (Runtime core)
    │
    ├── read_file    → read local files
    ├── run_script   → execute local scripts
    ├── save_memory  → trigger memory compression
    ├── next_step    → load next subtask
    ├── checkpoint   → save current state snapshot
    └── abort        → pause on error, notify user
    │
    ▼
Execution results fed back to model → loop
```

The model never executes code. It only outputs structured invocation instructions. Execution is always the runtime's responsibility.

---

## Gemma 4 Native Tool Protocol

Six special token pairs:

| Token Pair | Purpose |
|---|---|
| `<\|tool>` / `<tool\|>` | Define available tools |
| `<\|tool_call>` / `<tool_call\|>` | Model requests a tool |
| `<\|tool_response>` / `<tool_response\|>` | Feed result back to model |

Example workflow:
```
1. System declares tools via <|tool> tokens
2. Model outputs <|tool_call> when it needs a tool
3. Runtime executes, wraps result in <|tool_response>
4. Model continues generation
```

---

## Hard Constraints

Small models drift. You can't trust their free-form output. Four system-level constraints:

**1. Forced memory compression**
```python
if output_tokens > 3000 or step_completed:
    # force save_memory
    # validate compression quality
    # pass → continue, fail → recompress
```

**2. Forced checkpoints**  
After each subtask: save progress + compressed memory + step summary + next instruction. Enables rollback and restart after power loss.

**3. Output format validation**  
Parse → validate → execute. Three consecutive format failures → trigger `abort`.

**4. Security whitelist**  
`rm -rf /` → rejected. `read_file /etc/passwd` → rejected. `python analyze.py` → allowed. Safety boundaries are hardcoded, not trusted to model "judgment."

---

## Memory Compression

Core principle: use the small model itself to compress (small models are actually good at summarization — it's their sweet spot).

Compression prompt template:
```
Here is the complete output from the previous step. Extract key conclusions 
in structured format, compressed to under 200 tokens.
MUST keep: data conclusions, decision results, identified problems.
CAN discard: reasoning process, redundant info, filler.
```

Dual validation:
```
Step N complete
    ↓
Model A: generate compressed summary
Model B (same model, different prompt): validate summary for missing critical info
    ↓
Pass → Step N+1
Fail → recompress
```

Edge models are free to run. No cost pressure on multiple passes.

---

## Context Budget (8K window example)

```
Total window: 8192 tokens
├── Profile injection (compressed): 300 tokens  (3.7%)
├── Task state summary:             500 tokens
├── Current step instruction:       200 tokens
├── Current step input (file etc):  2000 tokens
├── Reserved for model output:      4000 tokens
└── Safety margin:                  1192 tokens
```

Google's official guidance:
> "For long-running agents, developers may want to extract, summarize, and feed the model's previous thoughts back into the context window as standard text."

---

## Model Selection (Gemma 4, M3 Pro 24GB)

| Model | Memory (INT4) | Feasibility | Speed |
|---|---|---|---|
| E2B (5B active) | ~3GB | ✅ Very easy | ~30-40 tok/s |
| E4B (8B, 4.5B active) | ~5GB | ✅ Easy | ~20-30 tok/s |
| 26B MoE (3.8B active) | ~15GB | ✅ Works | ~10-15 tok/s |
| 31B Dense | ~18GB | ⚠️ Tight | ~5-8 tok/s |

Recommended strategy:
- **Development/debugging**: E4B (8B), 6-8GB, leaves room for IDE
- **Production runs**: 26B MoE, close other apps

---

## Development Roadmap

| Step | Timeline | Task | Output |
|---|---|---|---|
| 1 | Today | Install Ollama, pull Gemma 4 E4B, test tool call format | Environment ready |
| 2 | This week | Runtime core: tag parsing + tool execution (read_file, save_memory, checkpoint) | MVP core |
| 3 | Week 2 | End-to-end run with codebase analysis task, measure compression quality | Validation |
| 4 | Week 3 | 24h endurance test overnight, review results in the morning | Long-run verified |
| 5 | Week 4+ | Profile accumulation + AutoResearch optimization loop | Product polish |

---

## Long-Term Moat vs. Model Providers

| Dimension | Model Providers | EndlessRun |
|---|---|---|
| Direction | General capability improvement | Personalized amplification |
| Relationship | Providers raise the floor | You raise the ceiling — complementary |

Three layers of protection:
1. **Data lock-in**: accumulated knowledge of "which model + which prompt pattern works for your use case" is user-bound, providers can't replicate it
2. **Model-agnostic**: not tied to any provider — any improvement benefits you
3. **Client-side position**: you're the user's delegate, not an appendage of any model vendor
