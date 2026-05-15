# Design

## Theme

Dark. No question. A terminal that's been open since midnight.
Background near-black with a faint blue-purple undertone — not pure black, not gray.

## Color

Strategy: **Restrained + one kinetic accent**

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `oklch(12% 0.008 260)` ≈ `#111112` | Page background |
| `--surface` | `oklch(14% 0.008 260)` ≈ `#18181a` | Elevated surfaces |
| `--border` | `oklch(18% 0.008 260)` ≈ `#242428` | Dividers, full-perimeter borders |
| `--rule` | `oklch(15% 0.008 260)` ≈ `#1e1e22` | Hairline dividers only — not for text |
| `--text` | `oklch(88% 0.005 260)` ≈ `#e0e0e2` | Body text (~13:1 on --bg) |
| `--muted` | `oklch(48% 0.008 260)` ≈ `#72727c` | Secondary text, timestamps (~4.6:1 on --bg, WCAG AA) |
| `--label` | `oklch(35% 0.010 260)` ≈ `#52525e` | Uppercase section labels only — decorative, not body text |
| `--dim` | `oklch(24% 0.010 260)` ≈ `#30303a` | Non-text: borders, rules only. Never for text. |
| `--accent` | `oklch(83% 0.14 220)` ≈ `#7dd3fc` | Sky blue — hover states, cursor, selection, interactive highlights |
| `--accent-dim` | `oklch(56% 0.10 220)` ≈ `#3a8ab5` | Subdued accent — static presence (section label bars, status badges) |

Accent strategy: `--accent` is the kinetic color — it appears in motion and hover states.
`--accent-dim` is the static presence — small doses (12px hairlines, status text) that anchor the palette without competing with body text.

## Typography

**Typeface**: Operator Mono / OperatorMonoLig (monospace, the whole site)
Fallbacks: 'Fira Code', 'JetBrains Mono', monospace
No serif. No sans-serif. Monospace is the identity, not a style choice.

**Scale**:
- Hero name: `1.6rem`, weight 400, letter-spacing `-0.01em`
- Section labels: `0.68rem`, uppercase, `letter-spacing: 0.14em`, color `--dim`
- Body / list items: `0.9rem`, weight 400
- Meta / timestamps: `0.78rem`, weight 300, color `--muted`
- Nav: `0.8rem`, `letter-spacing: 0.04em`

Body line length: capped at 65ch.
No heading hierarchy beyond page title — labels use `font-size` + `text-transform`, not `<h2>`.

## Spacing

Base unit: `0.25rem` (4px).
Rhythm is intentional variation — sections breathe, list items are compact.

- Hero top padding: `3.5rem` (desktop), `2.5rem` (mobile)
- Section gap: `3rem`
- List item padding: `0.55rem 0`
- Page horizontal padding: `1.5rem` (desktop), `1rem` (mobile)

## Motion

**Philosophy**: stillness is the canvas, motion is the event. Most of the page is static.
Animation triggers on: page load (elements enter), user hover (subtle), specific designed moments (favicon, cursor blink).

**Easing**: always `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) or harder. Never bounce. Never elastic.

**Three motion layers**:
1. **Entry**: `fadeUp` — `opacity 0→1` + `translateY(6-10px) → 0`, staggered by `0.07s`, duration `0.45–0.55s`
2. **Persistent**: cursor blink (`step-end`, `1.1s`), favicon gravity animation (physics-based, plays once)
3. **Interactive**: hover color transitions (`0.18s ease-out-expo`), no layout shifts

**Mixed-mode motion style** (per PRODUCT.md "kinetic"):
- Physical: gravity/inertia for favicon, any falling/landing animations
- Terminal: cursor blink, typewriter reveal for specific hero moments
- Geometric: SVG path draws, coordinate-based transforms on data-dense elements

All animations respect `prefers-reduced-motion: reduce` — collapse to `opacity: 1, animation: none`.

## Components

**List item** (notes, projects):
- `display: flex; justify-content: space-between; align-items: baseline`
- `border-bottom: 1px solid var(--border)` — full horizontal rule, never left/right side stripe
- Hover: link color → `--accent`, no background change
- Mobile: stack vertically

**Section label**:
- Uppercase monospace, `--dim` color, `0.68rem`
- Not an `<h2>` — purely typographic label

**Links**:
- Default: `color: inherit`, `border-bottom: 1px solid var(--dim)`
- Hover: `color: var(--accent)`, `border-color: var(--accent)`
- Nav links: no underline, `--muted` → `--text` on hover/active
- Accent-colored links (about page inline): `color: var(--accent)`, no underline border

**Favicon animation**:
- SVG `>` glyph
- Gravity collapse: upper arm falls first, both arms lie flat at `y=24` together
- Plays once on page load, stops when flat, no loop, full opacity throughout

## Layout

Single column. `max-width: 640px`, centered, `margin: 0 auto`.
Contained via `.page-wrap { max-width: var(--col); margin: 0 auto; padding: 0 1.5rem; }`.
No sidebars. No grid. No cards.

Mobile breakpoint: `480px`
- Font size drops to `14px`
- Padding: `0 1rem`
- Header gaps compress
- List items stack vertically
