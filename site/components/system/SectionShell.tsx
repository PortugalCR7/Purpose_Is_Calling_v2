"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface SectionShellProps {
  temperature: "glacier" | "basalt";
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
 * Reduced motion: this is the one place the motion-spec.md §9 discrete
 * fallback lives. SectionShell shadows --temp with its own fixed 0/1 for
 * its subtree, so every descendant that reads var(--temp) (Hairline,
 * etc.) gets this section's fixed register without needing to know
 * reduced motion exists. See useTemperature.ts for why the frozen value
 * TemperatureController exposes under reduced motion is not this fallback.
 */
export function SectionShell({ temperature, sectionNumber, children }: SectionShellProps) {
  const reducedMotion = useReducedMotion();

  const style = {
    position: "relative",
    isolation: "isolate",
    padding: "var(--space-144) var(--space-55)",
    backgroundColor:
      "color-mix(in srgb, var(--color-basalt) calc(var(--temp) * 100%), var(--color-glacier))",
    color:
      "color-mix(in srgb, var(--text-on-basalt-primary) calc(var(--temp) * 100%), var(--text-on-glacier-primary))",
    transition: `background-color var(--duration-base) var(--ease-primary), color var(--duration-base) var(--ease-primary)`,
    ...(reducedMotion ? { "--temp": temperature === "basalt" ? 1 : 0 } : {}),
  } as CSSProperties;

  const labelStyle: CSSProperties = {
    position: "absolute",
    left: "calc(var(--golden-minor) * 100%)",
    top: "var(--space-34)",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-label)",
    letterSpacing: "var(--letter-spacing-label-caps)",
    color:
      "color-mix(in srgb, var(--text-on-basalt-secondary) calc(var(--temp) * 100%), var(--text-on-glacier-secondary))",
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
