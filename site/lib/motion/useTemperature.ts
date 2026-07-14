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
 * prefers-reduced-motion, the scroll listener never starts and the value
 * stays at its initial 0, per motion-spec.md -> "9. Reduced motion":
 * the shift becomes discrete, not a continuously interpolated transition.
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
