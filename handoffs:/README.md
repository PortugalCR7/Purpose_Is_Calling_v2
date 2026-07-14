# Handoff prompts — how this folder works

Each agent that runs in Antigravity gets one file here. A file has two
sections:

- **STANDING ROLE** — rarely changes. Who this agent is, what model/effort,
  what it must never touch, what "done" means for its lane. Copy this
  section forward unchanged when you open a new window for that agent.
- **THIS TASK** — replaced every time you deploy new work to that agent.
  Written by whoever plans the next step (you, or an Opus review pass),
  referencing the exact source file(s) and the current status fields at
  hand-off time.

When you kill an agent's context window to save tokens, the next window
opens with the same file: STANDING ROLE pasted in unchanged, THIS TASK
rewritten for the new work. The repo carries the context, not the chat
thread — that's the whole point of doing it this way.

## Rules for every agent, every task (on top of AGENTS.md)

1. Read AGENTS.md before anything else, every time, even if you "already
   know it" — the constitution can change between your last window and
   this one.
2. When finishing a task, before stopping:
   - Update the relevant status field(s) (`shot-manifest.json`, a
     component's merge status, etc.)
   - Append one line to the relevant `changeLog`
   - Write a PR description that cites the source file per AGENTS.md §1.8
3. An agent never rewrites its own THIS TASK section. That's the planner's
   job for the *next* handoff, not something the executing agent decides
   for itself mid-task.
4. If ground truth in the repo (a status field, a missing file) contradicts
   something this prompt or a prior chat claimed, the repo wins. Flag the
   discrepancy in the PR/output, don't silently resolve it either way.

## Current roster

**Wave 1 (parallel now — no dependencies on each other):**
- `agent-1-higgsfield.md` — Stage 1 still generation (Sonnet 5, medium)
- `agent-2-review-gate.md` — acceptance review for stills/plates (Opus 4.8, high)
- `agent-3-lane-a.md` — design-system primitives (Sonnet 5, medium)

Agent 2 is not "always on" — it fires per candidate Agent 1 produces, in
its own fresh window. The generating pass and the approving pass are never
the same agent instance.

**Wave 2 (queued — do not deploy until Lane A merges, AGENTS.md §4):**
- Lane B — hero + descent home
- Lane C — trail map + paths
- Lane D — the Inquiry (includes an Opus escalation for the reflection
  system prompt, per ROADMAP.md Stage 4)

**Wave 3 (queued — end of build):**
- Full-site review / Awwwards gate (Opus 4.8, high) — ROADMAP.md Stage 5
