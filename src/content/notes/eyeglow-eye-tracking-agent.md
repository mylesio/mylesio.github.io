---
title: "EyeGlow: Eye-Tracking Agent Interaction on MacBook"
description: A design spec for using the MacBook front camera + eye direction + blink to replace mouse clicks when confirming AI agent prompts.
date: 2026-04-07
tags: [ai, hci, swift, macos, agent]
lang: en
zhSlug: eyeglow-eye-tracking-agent-zh
---

**Problem**: AI agent tools (Claude Code, etc.) need user confirmation frequently. Options appear with minimal spacing (~10px). Every confirmation is a friction point.

**Goal**: Build a macOS App that uses the front camera to detect eye direction (up/down/left/right) + deliberate blink to replace mouse clicks for agent option selection.

**Core insight**: Don't chase precise coordinate tracking. Just classify direction + blink confirmation, with Siri-style edge glow as visual feedback.

**Prototype target**: Claude Code CLI

---

## Architecture

```
macOS App (Swift + SwiftUI)
│
├── EyeTracker (MediaPipe / Vision)
│       │
├── Direction Classifier (up/down/left/right)
│       │
└── Action Engine
        │
        ├── EdgeGlow UI (Siri-style border glow)
        └── PTY Proxy (agent communication)
```

---

## Eye Direction Detection

MacBook front camera + MediaPipe Face Mesh iris tracking. Five reliably detectable states:

| Direction | Difficulty | Reliability | Notes |
|---|---|---|---|
| Left/Right | Low | ⭐⭐⭐⭐⭐ | Large horizontal iris displacement |
| Up/Down | Medium | ⭐⭐⭐⭐ | Smaller vertical range, still reliable |
| Blink | Low | ⭐⭐⭐⭐⭐ | Clear eyelid opening change |
| Center | Low | ⭐⭐⭐⭐⭐ | Baseline "idle" state |

Principle: detect iris displacement *within* the eye socket — no precise coordinates needed.

---

## Visual Design: Siri-Style Edge Glow

A soft gradient light band along the screen edge, continuously flowing + breathing pulse. Five states:

**State 1 — Awaiting selection** (agent shows options)
- Uniform warm glow around all edges, slow rotation + breathing pulse
- Option labels float on the glow band

**State 2 — Direction detected**
- User looks up → top band brightens + warms, bottom dims
- Light flows toward the gaze direction

**State 3 — Pre-confirm** (sustained gaze > 1s)
- Corresponding direction band pulses faster + halo expands
- "Charging" effect

**State 4 — Blink confirm**
- Band contracts from gaze direction toward center → flash → dissipate

**State 5 — Cancel** (return to center / close eyes > 1s)
- All bands return to uniform brightness, back to awaiting state

---

## Option Mapping

| Eye Direction | 2-option mode | 4-option mode | List scroll mode |
|---|---|---|---|
| Up | Option A | Option A | Previous item |
| Down | Option B | Option B | Next item |
| Left | — | Option C | Cancel/back |
| Right | — | Option D | More info |
| Center | Idle | Idle | Pause scroll |
| Blink | Confirm | Confirm | Confirm current |

---

## Anti-Misfire Mechanisms

| Strategy | Implementation |
|---|---|
| Dwell threshold | Must look at direction ≥ 1.5s before entering "pre-confirm" |
| Deliberate blink | Eye closed > 300ms to trigger; normal blink (< 200ms) ignored |
| Visual feedback | Glow brightens → pulses faster → converges on confirm |
| Undo | Two quick blinks within 2s of confirmation = undo |

---

## Agent Output Interception (PTY Proxy)

```
App starts → PTY Proxy wraps claude-code CLI
→ Monitor stdout, detect option patterns ("[1] xxx [2] xxx")
→ Intercept → show eye tracking glow interface
→ User blinks to select → write choice to PTY stdin
```

Swift core (AgentProxy):
```swift
func startCLI() {
    openpty(&masterFD, &slaveFD, nil, nil, nil)
    if fork() == 0 {
        dup2(slaveFD, STDIN_FILENO)
        dup2(slaveFD, STDOUT_FILENO)
        execv("/usr/local/bin/claude", ["claude"])
    } else {
        monitorOutput(fd: masterFD)
    }
}
```

---

## Tech Stack

| Module | Technology |
|---|---|
| Language | Swift |
| UI | SwiftUI |
| Eye tracking | MediaPipe Face Mesh (Iris Landmarks, ~30-50px precision) or Apple Vision |
| Camera | AVFoundation (AVCaptureSession) |
| Glow effect | SwiftUI AngularGradient + blur + animation |
| Terminal proxy | PTY (posix_openpt / forkpty) |
| Agent comms | stdin/stdout pipe |

MediaPipe wins on iris landmark precision (~30-50px vs. ~50-80px for Apple Vision) but needs C++/Python bridge. Apple Vision is native Swift but iris tracking is coarser.

---

## MVP Roadmap

| Step | Content | Est. Time |
|---|---|---|
| 1 | Python script to validate direction detection reliability | Half day |
| 2 | Tune thresholds across postures/lighting conditions | Half day |
| 3 | Swift App shell + Siri-style glow UI | 1-2 days |
| 4 | Integrate MediaPipe (Python subprocess or C++ bridge) | 1-2 days |
| 5 | PTY proxy for Claude Code | 1-2 days |
| 6 | End-to-end integration | 1 day |

**MVP core path: ~1 week.**

---

## Risk Assessment

| Risk | Mitigation |
|---|---|
| Front camera precision insufficient | Only need direction, not coordinates — risk low |
| Lighting variation affects tracking | MediaPipe is reasonably robust; add ambient light warning |
| Agent output format not fixed | Multiple regex patterns + LLM-assisted option text parsing |
| Eye fatigue over long sessions | Usage reminders; seamless fallback to mouse/keyboard |

---

## Key Validation Point

Run the Python validation script first. Specifically measure `v_ratio` variance between up/down gaze states. If the difference is > 0.08, the approach is very stable.

*Project codename: EyeGlow*
