"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface SectionShellProps {
  temperature: "glacier" | "basalt" | "ember";
  sectionNumber: string;
  children: ReactNode;
}

/**
 * design/tokens.json -> componentContracts.SectionShell
 * design/motion-spec.md -> "3. The temperature shift", "9. Reduced motion"
 *
 * Normal motion: background/foreground colors read the continuous --temp
 * TemperatureController exposes, via color-mix() so the crossfade is
 * driven by the same single scroll-linked value everywhere — no local
 * override, no second scroll listener.
 *
 * `ember` is not a fourth point on that 0..1 axis — home-narrative.md's
 * CTA policy and art-direction.md's ~3% scarcity rule require it to be a
 * discrete, section-level reward (only 07, and the reflection moment in
 * 05) rather than a natural end of a glacier->basalt ramp, which would
 * otherwise tint every deep-scroll section (04/05/06) progressively
 * orange. So an `ember` SectionShell pins --temp to 1 (fully basalt) for
 * its subtree, same as `basalt`, and layers a scarce ember wash on top:
 * the background gets a faint color-mix toward ember.800 (surfaceMix,
 * tokens.json -> color.ember.surfaceMixPercent — reusing the cursorEmber
 * opacity ratio so the two ember presences read as the same intensity),
 * and the section-number label recolors fully to ember.400 (a single
 * small label, within the "single word" scarcity allowance in
 * art-direction.md's "Do" list). Body text keeps reading
 * text-on-basalt-primary/secondary — the wash is basalt-dominant so
 * contrast is unaffected — so no new text-on-ember token is needed.
 *
 * Reduced motion: this is the one place the motion-spec.md §9 discrete
 * fallback lives. SectionShell shadows --temp with its own fixed 0/1 for
 * its subtree, so every descendant that reads var(--temp) (Hairline,
 * etc.) gets this section's fixed register without needing to know
 * reduced motion exists. `ember` shadows --temp unconditionally (not just
 * under reduced motion) since it's inherently a fixed register regardless
 * of motion preference — same mechanism, no second fallback. See
 * useTemperature.ts for why the frozen value TemperatureController
 * exposes under reduced motion is not this fallback.
 */
export function SectionShell({ temperature, sectionNumber, children }: SectionShellProps) {
  const reducedMotion = useReducedMotion();
  const isEmber = temperature === "ember";
  const shadowTemp = temperature === "glacier" ? 0 : 1;

  const style = {
    position: "relative",
    isolation: "isolate",
    padding: "var(--space-144) var(--space-55)",
    backgroundColor: isEmber
      ? "color-mix(in srgb, var(--color-ember-800) var(--ember-surface-mix), var(--color-basalt))"
      : "color-mix(in srgb, var(--color-basalt) calc(var(--temp) * 100%), var(--color-glacier))",
    color:
      "color-mix(in srgb, var(--text-on-basalt-primary) calc(var(--temp) * 100%), var(--text-on-glacier-primary))",
    transition: `background-color var(--duration-base) var(--ease-primary), color var(--duration-base) var(--ease-primary)`,
    ...(isEmber || reducedMotion ? { "--temp": shadowTemp } : {}),
  } as CSSProperties;

  const labelStyle: CSSProperties = {
    position: "absolute",
    left: "calc(var(--golden-minor) * 100%)",
    top: "var(--space-34)",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-label)",
    letterSpacing: "var(--letter-spacing-label-caps)",
    color: isEmber
      ? "var(--color-ember-400)"
      : "color-mix(in srgb, var(--text-on-basalt-secondary) calc(var(--temp) * 100%), var(--text-on-glacier-secondary))",
  };

  return (
    <section style={style} data-section={sectionNumber} data-temperature={temperature}>
      <span aria-hidden="true" style={labelStyle}>
        {sectionNumber}
      </span>
      {children}
    </section>
  );
}
