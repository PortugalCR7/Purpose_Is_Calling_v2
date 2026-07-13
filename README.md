# purposeiscalling.life — The Descent

Ground-up redesign of a soul-purpose coaching site. Target: Awwwards-
caliber execution built around one concept — **the scroll is the
initiation.** The page descends from Icelandic ice-light to volcanic
dark as the visitor scrolls; ember is the scarce reward at the bottom,
never decoration along the way.

## Start here

1. **`AGENTS.md`** — the constitution. Every agent (human or AI) reads
   this before touching the repo. It outranks convenience and habit.
2. **`ROADMAP.md`** — staged plan with a model recommendation (Sonnet vs
   Opus) for each step, and why.
3. **`design/`** — the design system: `tokens.json` (the only source of
   colors/spacing/type/motion values), `motion-spec.md` (how things move),
   `art-direction.md` (the concept, the grade, the do/don't list).
4. **`film/`** — the hero cinematic: `master-brief.md` (original brief,
   versioned), `prompt-bible.md` (corrected, executable per-scene
   prompts), `shot-manifest.json` (status + acceptance criteria per
   scene).
5. **`content/pages/`** — existing site copy, one file per page, carried
   over from the current live site as raw material for the new IA.
6. **`site/`** — the Next.js application. Currently a scaffold; see
   `site/README.md` for build order.

## Why a corrected prompt bible exists alongside the original brief

The original creative brief (`film/master-brief.md`) is strong and its
rules are the right rules. The four reference stills supplied with it
did not follow those rules — they read as decorative fantasy stargates,
which is close to a line-by-line match against the brief's own "avoid"
list. Rather than iterate on those stills, `film/prompt-bible.md`
rewrites all six scenes to honor the brief as written. Generate against
the prompt bible; treat the four reference stills as color/mood
references only.

## Production stack

- **Generation:** Higgsfield (stills, motion, upscales) — single engine,
  no parallel production environments.
- **Coding agents:** Antigravity, working in the lanes described in
  `AGENTS.md` §4, against this repo as their shared source of truth.
- **Site:** Next.js, GSAP + Lenis for scroll/motion.

## Setting up locally

```bash
git clone <this-repo-url>
cd purposeiscalling
cp .env.example .env.local   # fill in real keys, never commit this file
cd site
npm install
npm run dev
```

## Pushing this to GitHub

This directory has already been initialized as a git repo with an
initial commit (see below for how it was delivered to you). To connect
it to GitHub:

```bash
gh repo create purposeiscalling --private --source=. --remote=origin
git push -u origin main
```

Or, without the `gh` CLI: create an empty repo on GitHub first (no
README/gitignore — this repo already has both), then:

```bash
git remote add origin https://github.com/<your-org>/purposeiscalling.git
git branch -M main
git push -u origin main
```
