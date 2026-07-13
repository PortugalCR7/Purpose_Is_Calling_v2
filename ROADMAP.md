# Roadmap and model recommendations

General principle for choosing a model at each step: reach for more
judgment/reasoning headroom (Opus) at points where taste, ambiguity, or
brand-risk arbitration is the actual task; drop to Sonnet for disciplined
execution against a spec that's already locked. Escalate back up
whenever a step produces an artifact a human hasn't yet blessed.

## Stage 0 — Foundation (this repo) — done
**Model used:** Sonnet 5. Correct choice — this stage was executing
already-agreed decisions (palette, spacing, motion grammar, prompt
corrections) into concrete files, not making new creative calls.

## Stage 1 — Still generation (Higgsfield)
**Recommended: Sonnet 5** for iterating prompt variations and running the
generation calls themselves — mechanical, spec-following work against
`film/prompt-bible.md`.
**Escalate to Opus 4.8** for the review gate: judging whether each
returned still actually passes its `acceptanceCriteria` in
`shot-manifest.json`, especially scenes 01/02/06 where the drift risk
(over-decoration) is highest and the judgment call is subtle. Don't let
the same pass that generated a candidate also be the pass that approves it.

## Stage 2 — Animation (still → plate)
**Recommended: Sonnet 5** for running `motion_control` calls against the
motion reference and handling re-encodes/grading scripts.
**Escalate to Opus 4.8** for continuity review across all six plates
side-by-side — this is a holistic judgment call (does this read as one
world, one camera, one journey) that benefits from more reasoning depth
than any single-scene check does.

## Stage 3 — Design-system components (Lane A)
**Recommended: Sonnet 5**, ideally as parallel Antigravity agents, since
`AGENTS.md` + `tokens.json` fully constrain the work. This is the
textbook case for Sonnet-at-scale: many small, well-specified tasks.

## Stage 4 — Section builds (Lanes B/C/D)
**Recommended: Sonnet 5** for implementation.
**Escalate to Opus 4.8** specifically for the Inquiry's reflection-prompt
design (AGENTS.md §5) — writing the system prompt that keeps David's
voice register warm and non-clinical while avoiding diagnostic language
is a nuanced writing/judgment task, not mechanical component work.

## Stage 5 — Full-site review, accessibility, performance, Awwwards prep
**Recommended: Opus 4.8** as the primary driver. This stage is almost
entirely judgment: holistic aesthetic review against `art-direction.md`,
accessibility audit quality (not just automated checks), performance
trade-off calls, and final go/no-go on submission readiness.

## Standing rule
Any step that produces a customer-facing creative artifact (a still, a
plate, final section copy, the Inquiry's tone) gets a human approval gate
before the next step consumes it — regardless of which model produced
it. Model choice affects quality and cost, not whether the gate exists.
