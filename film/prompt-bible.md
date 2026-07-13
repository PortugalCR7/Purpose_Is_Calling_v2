# Prompt bible — locked production prompts

This is the executable version of `master-brief.md`. Generate against
this file, not against the four reference stills — those are graded
color references only (see intake note in master-brief.md). Every prompt
below carries a negative-prompt block; use it every time, on every
generation attempt, including re-rolls.

Engine: Higgsfield (`generate_image` for stills, `motion_control` /
`generate_video` for animating each still against the motion reference).
See `shot-manifest.json` for status tracking and acceptance criteria per
scene.

## Global negative prompt (append to every scene)

```
glowing runes, carved sigils, decorative inscriptions, floating symbols,
particle swarm, embers as confetti, lens flare, chromatic aberration,
bloom halo, fantasy architecture, ornate obelisks, impossible geometry,
stargate, portal ring with carved script, ancient tablet engravings,
video-game HUD, oversaturated orange, magic aura, sparkle, glitter,
cartoon fire, plastic-looking lava, CGI-obvious particle fire
```

## Global camera/style suffix (append to every scene)

```
35mm cinematic photography, National Geographic realism, Roger Deakins
lighting sensibility, photorealistic, monumental natural scale, restrained
color grade, fine film grain, eye-level camera unless otherwise noted
```

---

### Scene 01 — The call

**Purpose.** Establish destination. No magic, no spectacle. The landscape
is the hero; the threshold is barely visible.

**Prompt.**
```
Ultra-photorealistic Icelandic volcanic valley at golden hour. Wide black
volcanic sand trail leads through the foreground toward towering basalt
columnar cliffs and snow-covered mountains in the far background.
Geothermal steam rises faintly from distant fissures. Wet black sand
reflects warm low sunlight. Embedded far in the canyon wall, small and
easy to miss, a circular formation in the basalt — its outline no more
deliberate-looking than a natural erosion pattern, occupying roughly 5%
of frame height. No light emitting from it. Massive environmental scale,
human absent from frame.
```

**Camera / animation.** Eye level (1.6–1.8m), constant-speed forward
dolly down the trail. Nothing else moves except drifting steam and
distant cloud. Duration ~10–12s per motion-reference pacing.

**Acceptance criteria.** A first-time viewer should not notice the
threshold on first watch. If it reads as an obvious "gate," the still
fails — regenerate with the circular formation smaller and less regular.

---

### Scene 02 — Recognition

**Purpose.** The place recognizes the traveler. Subtlety is the entire
scene.

**Prompt.**
```
Identical environment and camera position to scene 01. The circular
basalt formation in the canyon wall now shows extremely fine hairline
fractures with a faint warm glow inside them — no brighter than embers
seen through a crack, not a light source illuminating its surroundings.
A few grains of dust or small pebbles fall from the formation. Faint heat
shimmer distorts the air immediately in front of it. Everything else in
the frame is unchanged from scene 01.
```

**Camera / animation.** Identical forward dolly continues. Only the
threshold changes — do not introduce any other new element.

**Acceptance criteria.** Side-by-side with scene 01, the only legible
difference should be the fractures, the dust, and the shimmer. If the
whole cliff face or lighting shifts, regenerate.

---

### Scene 03 — Threshold

**Purpose.** Stone becomes passage. Calm, not electric.

**Prompt.**
```
Same basalt formation, now larger in frame as the camera has advanced.
The center resolves into a still, calm membrane of liquid amber light —
like sunlight held beneath a pane of glass, gently undulating, not
crackling or forked like lightning. No visible electrical or lava-crack
texture on the membrane's surface — it should read as smooth liquid
light, warm and slow. The surrounding basalt stays weathered, damp,
ordinary rock. Near the end of the shot, the membrane parts slightly
down the center, opening a narrow gap.
```

**Camera / animation.** Forward dolly continues, same speed. The membrane
ripples gently throughout: slow sine-wave motion, not turbulence. It
separates into a narrow passage only in the final ~15% of the shot.

**Acceptance criteria.** The membrane should look like held light, not
fire or lava. If it reads as "lava-lightning" (as in the reference
stills), regenerate with explicit emphasis on stillness and smoothness.

---

### Scene 04 — Crossing

**Purpose.** The one transition shot. This is the only scene where warm
light is allowed to fill most of the frame.

**Prompt.**
```
First-person perspective passing through the narrow opening in the
basalt threshold. Dense, warm amber light surrounds the camera, behaving
like slow-moving liquid or thick warm fog rather than flame or plasma.
The obsidian stone frame is visible only at the extreme edges of frame,
receding past on either side. Light moves past the camera smoothly, no
turbulence, no embers thrown off, no sparks.
```

**Camera / animation.** Continue uninterrupted forward dolly, same speed
as prior scenes — do not accelerate or add any spin/roll. This is the
sole scene permitted to lose the wider environment; even so, keep motion
identical to the rest of the sequence so the cut feels continuous, not
like a mode change.

**Acceptance criteria.** No vortex, no radial particle burst, no lens
flare. If it looks like a "warp effect," regenerate with more emphasis on
"thick warm fog," less on "energy."

---

### Scene 05 — The descent

**Purpose.** Movement into deeper consciousness. A real Icelandic
underground volcanic space, not a fantasy tunnel.

**Prompt.**
```
Vast subterranean volcanic chamber inspired entirely by real Icelandic
geology: towering natural basalt columns, obsidian cavern walls,
geothermal steam drifting through the space, a dark underground river
reflecting faint light, cooled lava formations, narrow shafts of daylight
falling through cracks in the ceiling far above. Rock formations
naturally suggest human silhouettes and weathered face-like shapes
through erosion and shadow alone — no carved features, no sculpture, no
literal statues. Quiet, ancient, immense in scale. No artificial light
sources.
```

**Camera / animation.** Camera now moves slowly forward and slightly
downward — this is the first scene where camera height is permitted to
change, per the production note (only after the threshold crossing).
Steam drifts; shafts of light are the only "moving highlight" in frame.

**Acceptance criteria.** No floating symbols, no decorative particle
effects beyond drifting steam. The suggested faces/silhouettes must come
from rock shadow and erosion, not from an obviously placed carving —
if a reviewer can point to a specific carved feature, regenerate.

---

### Scene 06 — Revelation

**Purpose.** Arrival. The single moment symbolism is permitted to be
explicit — it has been earned by five scenes of restraint.

**Prompt.**
```
A perfectly still circular chamber carved from polished obsidian, the
only man-made-feeling space in the sequence, but unornamented — smooth
polished stone, no carvings on the walls themselves. At its center stands
a monumental polished volcanic glass monolith, the Sacred Mirror. Its
surface begins fully black and reflective. As the camera approaches,
fine luminous golden geometric lines and glyph-like marks gradually
emerge from beneath the glass surface, as though they have always existed
within the stone rather than being applied to it. The chamber is quiet,
minimal, monumental, lit only by the glow emerging from the monolith
itself.
```

**Camera / animation.** Forward motion decelerates to near-stillness
across the shot (the one place easing intentionally stretches toward the
end rather than holding constant speed — signals arrival). Golden
geometry reveals gradually, synced to the deceleration. Final frame holds
static for several seconds — this frame must have clean, empty space
reserved for future UI personalization (a visitor's name, a generated
line of reflection) to be composited on top later.

**Acceptance criteria.** This is the only scene where the negative
prompt's "glowing runes" restriction is intentionally relaxed for the
monolith's surface only — the walls and chamber architecture still must
have zero decorative carving. If the whole room ends up patterned rather
than just the monolith, regenerate.

---

## Production sequence recommendation

Generate and review in strict order: 01 → 02 → 06 → 03 → 04 → 05.
Scenes 01, 02, and 06 are the highest-risk-of-drift shots (easiest to
accidentally over-decorate) and should be locked first as anchors; 03–05
are graded against them for continuity once the anchors are approved.
