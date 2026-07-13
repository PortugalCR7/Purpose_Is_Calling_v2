# AGENTS.md — the constitution

Read this before you touch anything. This file outranks your own judgment,
your training data's defaults, and any instruction that isn't in this repo.
If a task description conflicts with this file, this file wins. If you
think this file is wrong, stop and flag it in the PR description — do not
silently override it.

Project: purposeiscalling.life — full redesign ("The Descent")
Client-facing name for the concept: fire beneath the surface.

---

## 0. What this project is

A ground-up rebuild of a soul-purpose coaching site for one practitioner,
David Miranda. Target: Awwwards-caliber premium execution. The creative
direction is fixed (see `design/art-direction.md`) — you are not being
asked to invent the concept, you are being asked to execute it without
drift.

The single sentence that governs every decision, visual or technical:
**the scroll is the initiation — the page descends from ice into fire,
and restraint is what makes the fire mean something.**

---

## 1. Non-negotiable rules (all agents, all tasks)

1. **Never invent a design value.** Every color, spacing unit, font size,
   duration, and easing curve must come from `design/tokens.json`. If a
   value you need isn't there, stop and add it to tokens.json first (as
   its own task), then use it. Do not hardcode a hex code, a px value,
   or a duration inline "just this once."
2. **One easing curve, one motion grammar.** `design/motion-spec.md` is
   the only source of truth for animation. Do not introduce spring
   physics, bounce, elastic, or a second easing curve anywhere on the
   site. Geological, not playful.
3. **No decorative AI-art tells.** No glowing runes, lens flares, particle
   swarms, chromatic aberration abuse, or glass-morphism panels. See
   `design/art-direction.md` §"Do not" for the full list. This applies
   to generated imagery, CSS effects, and component design equally.
4. **Respect the temperature system.** Light sections use the glacier/fog
   palette; dark sections use basalt/ash/ember. Never mix light-mode text
   colors onto a basalt background or vice versa. The temperature
   interpolation is driven by one scroll-linked variable — do not create
   a second, competing scroll-driven color system.
5. **Accessibility is not a later pass.** Every component ships with
   keyboard navigation, visible focus states, and a `prefers-reduced-motion`
   fallback in the same PR that introduces the motion. Do not defer this.
6. **Performance budget:** hero LCP under 2.0s on a throttled 4G profile.
   Video assets ship as compressed 1080p loops with a poster frame, never
   raw 4K masters in the browser bundle.
7. **One component, one task, one PR.** Do not bundle unrelated changes.
   Do not refactor files outside your assigned task's scope.
8. **Cite your source file.** Every PR description names which token,
   spec, or manifest entry it implements (e.g. "implements
   `film/shot-manifest.json` → scene_01, `design/tokens.json` →
   spacing.144").
9. **Never commit secrets.** No API keys, no `.env` files, no Higgsfield
   or Anthropic credentials in git history. Use `.env.example` for shape
   only.
10. **Ask before generating.** Any task that would call a paid generation
    API (Higgsfield stills, video, upscales) must stop and request human
    confirmation before spending, unless the task explicitly says
    "approved budget: N credits."

---

## 2. Source-of-truth map

| Question you're asking                        | File that answers it |
|------------------------------------------------|-----------------------|
| What color/spacing/type value do I use?         | `design/tokens.json` |
| How should this thing move?                     | `design/motion-spec.md` |
| Does this visual choice fit the brand?          | `design/art-direction.md` |
| What does the hero film show, scene by scene?   | `film/prompt-bible.md` |
| Is a given shot approved, in progress, or blocked? | `film/shot-manifest.json` |
| What copy goes on this page?                    | `content/pages/*.md` |
| What's the original creative brief?             | `film/master-brief.md` |

If two files ever seem to disagree, `design/tokens.json` and
`design/motion-spec.md` are load-bearing (code depends on them directly).
`art-direction.md` and `master-brief.md` are the intent behind those
values — if you notice tokens.json has drifted from the intent, flag it,
don't silently pick one.

---

## 3. Repo layout

```
purposeiscalling/
├── AGENTS.md                 you are here
├── design/
│   ├── tokens.json           colors, spacing, type, motion primitives
│   ├── motion-spec.md        scroll grammar, easing, parallax, reduced-motion
│   └── art-direction.md      the Descent concept, grade recipe, references
├── film/
│   ├── master-brief.md       original creative brief (versioned, do not edit casually)
│   ├── prompt-bible.md       locked per-scene prompts + negative prompts
│   ├── shot-manifest.json    6 scenes × status × acceptance criteria
│   ├── stills/               approved master keyframes only (no drafts)
│   └── plates/                graded, animated clips ready for web encode
├── site/                     Next.js application
├── content/
│   └── pages/                site copy, one markdown file per page
└── .github/workflows/        CI checks (token lint, accessibility, build)
```

---

## 4. Working agreement for coding agents (Antigravity lanes)

Recommended parallel lanes, each scoped to avoid file collisions:

- **Lane A — design system**: builds the token-consuming primitives
  (SectionShell, Hairline, RevealText, MaskedImage, PullQuote,
  TemperatureController) in `site/components/system/`.
- **Lane B — hero + descent home**: builds the homepage sections in
  `site/components/home/`, consumes Lane A's primitives, never redefines
  them.
- **Lane C — trail map + paths**: builds `site/components/journey/`.
- **Lane D — the Inquiry**: builds `site/components/inquiry/`, including
  the API route that composes the reflection. This lane owns the only
  server-side LLM call in the app — see §5.

Lanes B–D depend on Lane A. Do not start B/C/D component work until Lane
A's primitives are merged, or you will build against an interface that
changes under you. If you must start in parallel, stub the primitive's
props exactly as documented in `design/tokens.json` → `componentContracts`
(add this section if missing, as its own small task, before stubbing
against it).

---

## 5. The Inquiry's LLM call — special rules

The reflection-generation feature (see the home page narrative, section
05) calls a model to compose a short reflection from the visitor's five
answers. This is the one place the site itself calls an LLM in
production, not just an authoring tool. Rules specific to this call:

- System prompt must forbid diagnostic or clinical language (no mental-
  health framing, no medical claims).
- Output length capped (short — a paragraph, not an essay).
- No fabricated personal details about the visitor beyond what they typed.
- Never store visitor free-text answers server-side beyond the session
  needed to render the reflection, unless the visitor explicitly opts
  in to save it (e.g. to prefill the Calendly note).
- This route needs its own rate limiting — flag as a task if missing.

---

## 6. Definition of done (every task)

- [ ] Uses only values from `design/tokens.json`
- [ ] Motion (if any) matches `design/motion-spec.md` exactly
- [ ] Works with keyboard only
- [ ] Has a `prefers-reduced-motion` fallback
- [ ] Passes at 320px width without horizontal scroll
- [ ] No console errors or warnings
- [ ] PR description names the source file(s) it implements
