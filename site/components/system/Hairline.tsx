"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface HairlineProps {
  orientation?: "horizontal" | "vertical";
  temperature?: "glacier" | "basalt";
}

/**
 * design/tokens.json -> componentContracts.Hairline
 * design/motion-spec.md -> "4. Entrance grammar" (hairlines), "9. Reduced motion"
 *
 * Color always reads the continuous --temp register via color-mix(), same
 * pattern as SectionShell. `temperature` is only used to shadow --temp
 * locally for hairlines placed outside a SectionShell subtree (e.g. a
 * divider rendered before any section sets --temp); inside a SectionShell,
 * --temp is already inherited and this prop should be omitted.
 *
 * Entrance: scaleX/scaleY 0 -> 1 from the leading edge on first viewport
 * entry, duration.base. Under reduced motion this collapses to an opacity
 * fade at duration.fast instead of a transform, per motion-spec.md §9.
 */
export function Hairline({ orientation = "horizontal", temperature }: HairlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isHorizontal = orientation === "horizontal";

  const style: CSSProperties = {
    backgroundColor:
      "color-mix(in srgb, var(--hairline-on-basalt) calc(var(--temp) * 100%), var(--hairline-on-glacier))",
    ...(temperature ? { "--temp": temperature === "basalt" ? 1 : 0 } as CSSProperties : {}),
    ...(isHorizontal
      ? { width: "100%", height: "1px" }
      : { width: "1px", height: "100%" }),
    transformOrigin: isHorizontal ? "left" : "top",
    transform: reducedMotion
      ? "none"
      : `${isHorizontal ? "scaleX" : "scaleY"}(${isVisible ? 1 : 0})`,
    opacity: reducedMotion ? (isVisible ? 1 : 0) : 1,
    transition: reducedMotion
      ? `opacity var(--duration-fast) var(--ease-primary), background-color var(--duration-base) var(--ease-primary)`
      : `transform var(--duration-base) var(--ease-primary), background-color var(--duration-base) var(--ease-primary)`,
  };

  return <div ref={ref} aria-hidden="true" role="none" style={style} />;
}
