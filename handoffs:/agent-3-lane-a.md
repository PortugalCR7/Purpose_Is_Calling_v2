# Agent 3 — Lane A: Design-System Primitives

## STANDING ROLE

**Model: Sonnet 5 — Effort: medium**

ROADMAP.md Stage 3: "the textbook case for Sonnet-at-scale... many
small, well-specified tasks." `AGENTS.md` + `design/tokens.json` fully
constrain this work — no creative judgment calls belong in this lane.
Once the contract gap below is fixed, the seven primitives are
independent and can run as separate parallel Sonnet windows, one
primitive per window, using this same file with a swapped THIS TASK
section.

**Read before any code, every time:**
- `AGENTS.md` — all of it, especially §1 (never invent a design value,
  one easing curve, one motion grammar) and §6 (definition of done)
- `design/tokens.json` — all of it, especially `componentContracts` for
  this primitive's exact prop shape
- `design/motion-spec.md` — if this primitive has any entrance/scroll
  behavior (most do)

**Non-negotiables (full authority is AGENTS.md, this is a quick-reference only):**
- Every color/spacing/type/duration value comes from `tokens.json`.
  Nothing hardcoded, not even "just this once."
- One easing curve, everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`. No
  spring, bounce, or elastic, ever.
- No second scroll-driven color system alongside `TemperatureController`.
- Keyboard nav, visible focus state, and a `prefers-reduced-motion`
  fallback ship in the *same* PR as the motion — not a follow-up.
- One component, one task, one PR. Do not touch another primitive's
  files, even to fix something adjacent — flag it instead.
- Builds into `site/components/system/` only. Never touch
  `site/components/home|journey|inquiry/` — those don't exist yet and
  belong to Lanes B/C/D (Wave 2, still queued).

**⚠ Known gap, flag resolved by Task 1 below:** `tokens.json →
componentContracts.TemperatureController` documents *behavior*
("provides the scroll-driven glacier-to-basalt interpolation as a CSS
custom property to descendants") but never names the property. Every
consumer (`SectionShell`, `Hairline`) needs that name to build against.
Per AGENTS.md §4, this gets added to tokens.json as its own small task
*before* anything stubs against it — that's why it's bundled into Task 1
rather than left for whichever primitive hits it first.

---

## THIS TASK — Task 1: Fix the contract gap + build TemperatureController

1. Add the missing CSS custom property name to `design/tokens.json →
   componentContracts.TemperatureController`. Suggested:
   `--temperature-t` (a 0–1 float, 0 = full glacier, 1 = full basalt) —
   rename if you have a concrete reason, but the point is the name must
   live in tokens.json, not just materialize in code.
2. Build `TemperatureController` per its documented props (`children`)
   and behavior: scroll-driven interpolation using `motion.scroll.lerp`
   (0.08, Lenis-driven) and exposed via the property you just named.
3. Ship the `prefers-reduced-motion` fallback per `tokens.json →
   motion.reducedMotion`: discrete per-section values instead of
   continuous scroll interpolation — not just a disabled transition.
4. PR description cites `design/tokens.json →
   componentContracts.TemperatureController` and `motion.scroll` /
   `motion.reducedMotion` per AGENTS.md §1.8.
5. Do not start any other primitive in this window. Stop when this
   merges. Tasks 2–7 (Hairline, SectionShell, RevealText, MaskedImage,
   PullQuote, EmberCTA) become separate handoffs — each its own window,
   each parallel to the others — once this one is in.
