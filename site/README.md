# site/ — Next.js application (scaffold only, pre-production)

This directory is intentionally minimal right now. It exists so the repo
has a real dev environment from day one, not just specs. Before writing
components:

1. Read `/AGENTS.md` at the repo root — the constitution.
2. Read `../design/tokens.json`, `../design/motion-spec.md`,
   `../design/art-direction.md`.
3. Check `componentContracts` in tokens.json before creating any of the
   design-system primitives (`SectionShell`, `RevealText`, `Hairline`,
   `MaskedImage`, `PullQuote`, `EmberCTA`, `TemperatureController`).

## Planned structure (not yet built)

```
site/
├── app/                     Next.js app router pages
├── components/
│   ├── system/              Lane A — design-system primitives
│   ├── home/                Lane B — the descent homepage sections
│   ├── journey/              Lane C — trail map + paths
│   └── inquiry/             Lane D — the guided reflection flow
├── styles/
│   └── tokens.css           generated from design/tokens.json (present)
├── lib/                     scroll engine setup, temperature controller logic
└── scripts/
    └── check-tokens.js      CI lint: fails build if a hardcoded color/
                              spacing value is found outside tokens.css
```

## First real tasks, in dependency order

1. `TemperatureController` + `SectionShell` (Lane A) — everything else
   depends on these.
2. `Hairline`, `RevealText`, `MaskedImage` (Lane A).
3. Hero section (Lane B) — depends on 1 and 2, and on `film/plates/scene_01`
   through `scene_06` being approved for the background sequence, or a
   placeholder poster frame if plates aren't ready yet.
4. Everything else per `AGENTS.md` §4 lane assignments.

Do not skip straight to the hero — it has the most dependencies of
anything on the site.
