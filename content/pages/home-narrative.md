# Home page narrative — the descent

**Status:** v1, agreed with the client 2026-07-14. This file is the
structure `AGENTS.md` §5 refers to when it says "the home page
narrative, section 05" — that reference existed before this document
did. Lane B builds against this file.

**Amendment rule:** same as `film/master-brief.md` — no silent rewrites.
Change the structure here, in dialogue with the client, with a version
bump. Do not let a build task quietly reinterpret a section's job.

---

## The premise

The scroll is the initiation. The page opens in ice-light and cools
downward into basalt, and ember is the reward at depth — never
decoration (`design/art-direction.md`). Seven sections. The visitor
descends through them.

The commercial reasoning matters as much as the aesthetic one: the
client's prospects are successful people who are allergic to being
sold to. Restraint is the signal that this isn't a funnel. Every
section earns its place or it comes out.

---

## The sections

| # | Section | `temperature` | Job |
|---|---|---|---|
| 01 | Hero | `glacier` | The call. Stop the scroll without shouting. |
| 02 | Something brought you here | `glacier` | Name the pull that got them onto the page. |
| 03 | What this is | `basalt` | David's role, plainly. First CTA. |
| 04 | The descent | `basalt` | The journey ahead — what the work actually is. |
| 05 | The Inquiry | `basalt` → ember | The visitor *does* something. Second CTA follows the reflection. |
| 06 | Proof | `basalt` | One testimonial. Not a wall of them. |
| 07 | The call | `ember` | The ask. Third and final CTA. |

### 01 — Hero
**Temp:** `glacier`. **Locked copy:**
- h1: `You didn't arrive here by accident.`
- p: `Something in you has been waiting for permission to descend.`

No CTA. The Hero's job is to stop the scroll, not to convert. Background
is a flat glacier-token surface with a `posterSrc` swap point reserved
for a film plate that does not yet exist — see "Film dependency" below.

### 02 — Something brought you here
**Temp:** `glacier`. Names the curiosity/gut-feeling/pull that put them
on the page. Source: `content/pages/home.md` — "Something Brought You
Here" and the opening "a curiosity, a gut feeling, a deep intuition."

Reframe, don't port. The base copy stacks rhetorical questions ("Are you
ready to ignite that fire within?"); that register is the thing this
rebuild moves away from. Second person, declarative, no exclamation
points, no question-stacking.

### 03 — What this is
**Temp:** `basalt`. The first temperature drop. David's role stated
plainly: he guides you to ask your own questions and receive your own
answers. Source: home.md's "Welcome. My name is David Miranda" block and
the six bullets (Clarity in Your Vision / Alignment with Your Values /
Activation of Your Core Powers / Expression of Your Radiant Essence /
Explore Your Giveaway / Purposeful Action).

Six bullets is likely too many for this register — a copy dialogue with
the client, not a build-task decision.

**CTA 1 of 3.** Lowest-commitment framing of the three. This catches the
visitor who already knows they want to talk and shouldn't have to scroll
the whole page to find out how.

### 04 — The descent
**Temp:** `basalt`. What the work actually is: self-discovery,
unraveling inherited/default narratives, moving toward wholeness. The
honest one — it says this takes patience, commitment, and courage.
Source: home.md's "The Journey Ahead..." block.

No CTA. This section's credibility depends on not selling.

### 05 — The Inquiry
**Temp:** `basalt` → ember at the reflection. Lane D owns this
(`site/components/inquiry/`); Lane B owns the section shell it sits in.

The pivot of the page: the visitor answers five questions and receives a
short composed reflection. This is where the page stops being read and
starts being *done* — which is why it sits at the temperature
transition. Answering five questions about yourself is itself the
descent in miniature; the ember reflection is what's earned for it.

The LLM call is governed by `AGENTS.md` §5 — no diagnostic or clinical
language, short output, no fabricated personal details, no server-side
storage of free-text beyond the session unless the visitor opts in.

**CTA 2 of 3**, placed *after* the reflection renders — never before.
This is the highest-intent moment on the page: they've just been given
something. Framing should acknowledge that rather than pitch cold.

### 06 — Proof
**Temp:** `basalt`. One testimonial via `PullQuote`. Joshua's is the
strongest in the source material ("He reflected both my gifts and
shadows with compassion, camaraderie, and respect"). One, not a
carousel, not a grid — a wall of testimonials is a funnel tell.

No CTA. Section 05's CTA is directly above and 07's is directly below.

### 07 — The call
**Temp:** `ember`. The bottom of the descent. Ember is fully earned
here. `EmberCTA` → Calendly.

**CTA 3 of 3.** The real ask, and the most direct of the three.

---

## CTA policy

**Three Calendly CTAs — at 03, 05, and 07.** Client decision,
2026-07-14. All point to
`https://calendly.com/purposeiscalling/purpose-discovery-call`.

Placement is deliberate rather than evenly spaced: each sits at a moment
where a visitor could plausibly be ready — after they understand the
offer (03), after they've received something (05), and at the end (07).

They should **escalate**, not repeat. Three instances of the same shouted
label is the funnel tell the rebuild is avoiding; three different
framings at three different intent levels is not. Exact labels are a copy
dialogue with the client — do not let a build task invent them.

`art-direction.md`'s ember scarcity rule (~3% of rendered surface) still
binds. Three CTAs do not license three ember blooms — the CTAs at 03 and
05 sit in `basalt` sections and should be correspondingly restrained;
only 07 gets full ember.

---

## Film dependency — none

The homepage is built with flat token-color surfaces where film plates
will eventually go. **No section blocks on film.** The film pipeline is
parked as of 2026-07-14 (the six-scene concept is unresolved; the
prompt-bible approach was not converging and the client's reference
material points somewhere the written brief forbids — that contradiction
is unresolved and is not the homepage's problem).

Every section that will eventually carry a plate takes an optional
`posterSrc` prop defaulting to `undefined`, so a plate is a drop-in swap
later and never a restructure. **Never substitute stock imagery as a
placeholder** (`art-direction.md` "Do not") — a flat token surface is
the correct placeholder, not an Unsplash photo.

It is a live possibility that once the page exists at real scale, it
needs less film than the brief assumes. Do not pre-emptively design
around six cinematic scenes.

---

## What is NOT on this page

Cut from the source site, deliberately:
- The repeated Calendly CTA after nearly every block (source has ~5).
- The rhetorical-question stacking ("Curious? Intrigued? Don't know?").
- The testimonial wall — one quote, at 06.
- The newsletter subscribe block.
- Exclamation points.
