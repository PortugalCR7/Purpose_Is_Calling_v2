"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

// design/tokens.json -> motion.scroll.lerp
const SCROLL_LERP = 0.08;

/**
 * design/tokens.json -> componentContracts.TemperatureController
 * design/motion-spec.md -> "3. The temperature shift"
 *
 * Returns the single scroll-linked value (0 at page top, 1 at page bottom)
 * that drives the glacier -> basalt interpolation. Under
 * prefers-reduced-motion the Lenis instance never starts, since a
 * continuous scroll listener is itself a motion effect this hook has no
 * business running for these visitors — but the frozen 0 this returns is
 * inert, not the reduced-motion fallback. Per motion-spec.md -> "9.
 * Reduced motion", the discrete temperature register is owned entirely by
 * SectionShell (site/components/system/SectionShell.tsx), which shadows
 * `--temp` for its own subtree with its fixed `temperature` prop. Do not
 * reintroduce a second discrete-fallback mechanism here.
 */
export function useTemperature(): number {
  const reducedMotion = useReducedMotion();
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ lerp: SCROLL_LERP });
    lenis.on("scroll", (instance: Lenis) => {
      setTemperature(instance.progress);
    });

    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return temperature;
}
