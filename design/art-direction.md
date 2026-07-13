# Art direction — The Descent

## The one-sentence brief

The scroll is the initiation. The page begins above the treeline in
Icelandic ice-light and descends, as the visitor scrolls, through basalt
gray into volcanic dark — where the only warmth is ember. Fire is never
decoration. It is the reward for depth. By the time a visitor reaches the
final CTA, they have physically enacted the journey the program sells.

Reference points: Denis Villeneuve, Roger Deakins, National Geographic
geological photography, Iceland. Not: fantasy, magic, video-game
environments, ornate mythology, decorative visual effects.

## Palette

See `tokens.json` → `color` for exact values. In prose: glacier white at
the top of the site, fog gray as the transition, basalt near-black at the
bottom, ash as muted dark-mode text, ember as the single scarce warm
accent (~3% of rendered surface, site-wide).

## Footage inventory (owned assets)

| Asset | Content | Use |
|---|---|---|
| `16340285` | Aerial glacial river braids, black sand | Hero opening plate — the mystery shot |
| `16046104` | Aerial sea-cliff coastline, forward track | "Recognition" section atmosphere |
| `17685638` | Fire macro, 60fps native | Source for slow-motion ember burn (conform to 24fps, ~2.5x slow) — final threshold section, ember cursor reference |
| `6256991` | Alpenglow peak, moving cloud, warm light on snow | "Two paths, one mountain" offer section — fire and ice coexisting in one frame |
| Geothermal fumarole (still) | Steam rising from fissure | Crossing-point texture between ice and ember registers |
| Basalt columns (stills) | Columnar jointing, vertical parallel lines | Dark-section ground texture; conceptual source for the margin registration-line system |

## The grade

One unified treatment across all footage and generated film, so live-
action and generated plates read as one planet:
- Desaturate ~20% from source
- Lift blacks slightly (never crush to pure black except basalt page
  background itself)
- Cool shadows, neutral midtones
- Only fire and alpenglow warmth are permitted to keep full saturation
- Fine film grain, consistent across all sources
- Target delivery: 1080p, H.265/VP9, 8–12s seamless loops, poster-frame-
  first loading

## The basalt-as-grid concept

Columnar jointing — the natural hexagonal/parallel fracturing of cooled
basalt — is the conceptual source for the site's hairline system. The
1px vertical registration lines running down the page margins are not a
generic Swiss-grid affectation; they are an abstraction of the same
geological process shown in the footage. This connects the structural
design system to the visual content — keep this link intentional. When
in doubt about whether a structural element "fits," ask whether it could
plausibly be read as geological.

## Do

- Let restraint carry the emotional weight. Anticipation (dust falling
  from a hairline fracture) outperforms spectacle (a roaring portal).
- Let symbolism emerge from real geology — basalt, ice, fire, steam.
- Keep camera/scroll motion constant-speed and forward. See
  `motion-spec.md` and `film/prompt-bible.md`.
- Keep generated imagery photorealistic, editorial, National-Geographic-
  grade.
- Use ember with total scarcity — a glow, a single word, one outlined
  button, never a fill.

## Do not

- No glowing runes, carved sigils, or decorative inscriptions of any kind.
- No floating symbols or particle swarms as decoration.
- No fantasy architecture — obelisks, ornate gates, impossible structures.
- No glass-morphism panels, frosted cards, or drop shadows anywhere.
- No filled, saturated CTA buttons — every CTA is a ghost/outline treatment.
- No lens flare, chromatic aberration, or bloom stacked on top of footage.
- No rainbow/multi-hue color cycling — this is a two-register palette
  (ice/ember) with neutrals between, not a gradient playground.
- No stock-photo Unsplash imagery in the final build — every image on the
  live site should come from the owned footage library or the approved
  generated film stills.

## Why this matters commercially, not just aesthetically

The prospect this site is built for has already achieved conventional
success and is suspicious of anything that reads as a sales funnel. Every
instance of restraint — the absence of a countdown timer, the refusal to
fill the screen with an amber button, the choice to let a hairline draw
itself instead of popping in — is doing conversion work by signaling that
this practice does not need to perform urgency. That trust is the actual
product being sold before the Discovery Call ever happens.
