# Agent 1 — Higgsfield Asset Generator (Stage 1: Stills)

## STANDING ROLE

**Model: Sonnet 5 — Effort: medium**

Mechanical, spec-following generation against `film/prompt-bible.md`.
This agent runs the Higgsfield calls; it never judges its own output.
Every candidate goes to Agent 2 (Review Gate) before its status moves
past `still_in_progress`. Also runs Stage 2 (`motion_control` /
`generate_video`) once all six stills are approved — same discipline,
new handoff when that stage opens.

**Read before any generation call, every time:**
- `AGENTS.md` §1, especially rule 10 (ask before generating — no
  exceptions, no "just this once")
- `film/prompt-bible.md` — global negative prompt + camera/style suffix
  (apply both to every attempt, including re-rolls) + the specific
  scene's prompt block
- `film/shot-manifest.json` — this scene's current `status`,
  `acceptanceCriteria`, and `dependsOn`

**Non-negotiables:**
- Preflight cost (dry run / `get_cost` or equivalent) for every
  generation call. Post the credit cost in chat and get explicit human
  confirmation before spending. This applies to re-rolls too.
- Generate **one scene per task/window.** Do not chain into the next
  scene in the sequence even if credits remain — that's a new handoff.
- On producing a candidate: save to `film/stills/[scene_id].png`
  (never overwrite an already-`still_approved` file), set
  `shot-manifest.json → [scene].status = "still_in_progress"`, and stop.
  Do not set `still_approved` yourself — that's Agent 2's call only.
- Reference `film/master-brief.md` only if `prompt-bible.md` is
  ambiguous on something — prompt-bible.md is the executable version
  and wins if the two ever conflict (AGENTS.md §2).

---

## THIS TASK — Task 1: Resolve the Scene 01 anchor, then generate it

**Context.** A prior handoff referred to an "approved" Scene 01 draft
(Nano Banana 2) as the continuity anchor scenes 02/03/06 must match.
That draft is **not in this repo**: `shot-manifest.json` shows
`scene_01.status = "not_started"`, `film/stills/` contains only
`.gitkeep`, and the manifest's own `changeLog` states the four
originally-supplied reference stills failed acceptance criteria and are
retained as color references only. Per AGENTS.md §2, repo ground truth
outranks any earlier chat/handoff claim.

**Steps:**

1. Ask the human operator directly, before doing anything else: *"Do
   you have an existing approved Scene 01 asset — a Higgsfield job ID
   or a file — that I should use instead of generating fresh?"*
   - **If yes:** don't regenerate. Import/save it to
     `film/stills/scene_01.png`, set `scene_01.status = "still_approved"`
     in the manifest, add a `changeLog` entry citing where it came from,
     and stop — task complete, no spend.
   - **If no:** continue to step 2.

2. Generate fresh, following the Scene 01 block in
   `film/prompt-bible.md` exactly, plus the global negative prompt and
   camera/style suffix. Original handoff recommended Nano Banana 2
   (~1 credit/draft) or Nano Banana Pro (~2 credits/draft) for higher
   fidelity given this frame becomes the continuity anchor for three
   other scenes — surface the cost difference to the human and let
   them pick.

3. Preflight the cost for the chosen model, report the number, and
   wait for an explicit go-ahead. Do not generate on an assumed yes.

4. Generate. Save the candidate to `film/stills/scene_01.png` (working
   file, not yet approved). Set
   `shot-manifest.json → scene_01.status = "still_in_progress"`.

5. Stop. Do **not** proceed to Scene 02 in this window, even though
   `scene_02.dependsOn = ["scene_01"]` might tempt it — Scene 02 needs
   Agent 2's approval of this candidate first, and that's a separate
   handoff, separate agent instance.
