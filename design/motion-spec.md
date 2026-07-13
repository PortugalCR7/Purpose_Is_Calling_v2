# Motion spec — the Descent

One governing idea: **the scroll is the initiation.** Motion should feel
geological — fog settling, tectonic weight shifting — never bouncy,
never playful, never fast. If an animation would feel at home on a SaaS
marketing site, it's wrong here.

All values below are defined in `design/tokens.json` → `motion`. This
document explains *how* to apply them. Do not introduce a value that
isn't already in tokens.json.

---

## 1. The one easing curve

`cubic-bezier(0.16, 1, 0.3, 1)` — expo-out. Used for every transition on
the site: scroll reveals, hover states, the temperature shift, the trail
map's pinned scroll, the Inquiry's question transitions. No exceptions.

## 2. Scroll engine

Lenis, lerp `0.08`. This is heavier/slower than most implementations
default to — intentional. The scroll should feel like it has mass.

## 3. The temperature shift

A single scroll-linked value (0 at page top, 1 at page bottom) drives:
- Page background: `glacier` → `basalt`
- Primary text: `text-on-glacier-primary` → `text-on-basalt-primary`
- Secondary text: `text-on-glacier-secondary` → `text-on-basalt-secondary`
- Hairlines: `hairline-on-glacier` → `hairline-on-basalt`

Implementation: a `TemperatureController` component (see
`componentContracts` in tokens.json) computes this value from scroll
position relative to document height and exposes it as a CSS custom
property (`--temp: 0..1`) that descendant components read. Do not build
a second, independent scroll listener for this — one source of truth.

Crossfade between light and dark text sets happens over `duration.base`
(800ms) as `--temp` crosses each section's threshold — not instantly.

## 4. Entrance grammar

- **Text**: rises 21px (one spacing unit) while fading in, `duration.base`,
  staggered `89ms` per word (headlines) or per line (paragraphs).
- **Images**: start at `scale(1.06)` inside a `clip-path` mask, animate to
  `scale(1.0)` as the mask reveals bottom-up, `duration.slow`. This reads
  as fog lifting off the image, not a generic fade.
- **Hairlines**: `scaleX(0)` to `scaleX(1)` with `transform-origin: left`,
  `duration.base`. This is a signature detail — use it every time a
  divider or the margin registration line enters the viewport.

## 5. Parallax

Three depth layers only, at the Fibonacci-derived ratios in tokens.json:
- Background: 0.382× scroll speed
- Midground: 0.618× scroll speed
- Foreground: 1× (locked to scroll, no offset)

Do not add a fourth layer or arbitrary ratios. The math should be
invisible to the visitor but consistent under the hood.

## 6. The cursor ember

On basalt (dark) sections only: a soft radial glow, 60px radius, 6%
opacity, ember.600, trailing the pointer with a short lag (~150ms). This
is the one place ember appears continuously rather than as an accent —
keep it faint enough that people feel it before they consciously notice
it "following" them.

## 7. The trail map (12 modules)

A pinned, horizontally-scrolling section. Vertical page scroll drives
horizontal translation of the module strip while the section is pinned.
Same easing curve, same lerp feel — this is not a separate carousel
library with its own motion physics. Module 09 (SoulQuest) gets the
single ember flare marking the summit; every other module stays in the
gray/ash register.

## 8. What never happens

- No spring or elastic easing, anywhere, ever.
- No auto-playing carousels with a timer.
- No hover states that scale up more than 1.02 or add a shadow — this
  site has no shadows in its visual language at all.
- No parallax layer moving faster than scroll (1×) — nothing should feel
  like it's rushing toward the viewer.
- No confetti, particles-as-decoration, or sparkle effects. The only
  particle-adjacent motion in the entire site is the cursor ember and the
  film's own steam/dust, which live in the video assets, not in CSS.

## 9. Reduced motion

`prefers-reduced-motion: reduce` must be respected everywhere:
- Entrance animations collapse to opacity fade only, `duration.fast`.
- Parallax layers freeze at their resting position.
- The temperature shift becomes discrete: each `SectionShell` reads its
  own fixed `temperature` prop instead of interpolating continuously.
- The cursor ember is disabled entirely.
- The trail map's pin-and-scrub becomes a normal vertical list.

This is not an afterthought pass — every component ships its reduced-
motion behavior in the same PR that introduces the animation. See
AGENTS.md definition of done.
