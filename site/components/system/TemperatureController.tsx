"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTemperature } from "@/lib/motion/useTemperature";

interface TemperatureControllerProps {
  children: ReactNode;
}

/**
 * design/tokens.json -> componentContracts.TemperatureController
 * design/motion-spec.md -> "3. The temperature shift"
 *
 * The single source of truth for the scroll-driven glacier -> basalt
 * value. Exposes it as the --temp CSS custom property (already declared
 * in styles/tokens.css) to descendants. Do not read scroll position or
 * instantiate a second Lenis instance anywhere else on the site.
 *
 * Under prefers-reduced-motion this exposes an inert frozen 0 — it is not
 * the motion-spec.md §9 discrete fallback. That fallback lives in
 * SectionShell, which shadows --temp per-section with its own fixed
 * `temperature` prop for its subtree.
 */
export function TemperatureController({ children }: TemperatureControllerProps) {
  const temperature = useTemperature();

  const style = {
    display: "contents",
    "--temp": temperature,
  } as CSSProperties;

  return <div style={style}>{children}</div>;
}
