"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface MaskedImageProps {
  src: string;
  alt: string;
  aspect: "1:1.618" | "1.618:1";
  parallaxLayer: "background" | "midground" | "foreground";
}

// design/tokens.json -> motion.parallax_speed / layout.goldenSplit
const PARALLAX_SPEED: Record<MaskedImageProps["parallaxLayer"], number> = {
  background: 0.382,
  midground: 0.618,
  foreground: 1,
};

const ASPECT_RATIO: Record<MaskedImageProps["aspect"], string> = {
  "1:1.618": "1 / calc(1 / var(--golden-major))",
  "1.618:1": "calc(1 / var(--golden-major)) / 1",
};

/**
 * design/tokens.json -> componentContracts.MaskedImage
 * design/motion-spec.md -> "4. Entrance grammar" (images), "5. Parallax", "9. Reduced motion"
 *
 * Entrance: the image sits at scale(1.06) behind a clip-path inset that
 * hides it entirely, then the inset animates open from the bottom edge
 * upward while the image relaxes to scale(1.0) — fog lifting off the
 * frame, not an opacity fade. Parallax offset is applied to the same
 * element via translateY so the two transforms compose in one
 * `transform` value instead of fighting over the box.
 *
 * Parallax is tracked with a scroll+rAF listener local to this
 * component, not the shared --temp scroll value — motion-spec.md §5
 * treats parallax and the temperature shift as independent scroll-driven
 * effects, and only the latter is required to have one source of truth
 * (motion-spec.md §3).
 *
 * Reduced motion: matches the same opacity-fade-at-duration.fast
 * fallback every other entrance in this system uses (RevealText,
 * Hairline), and additionally locks scale to 1 and disables the parallax
 * listener entirely, per motion-spec.md §9 ("parallax layers freeze at
 * their resting position").
 */
export function MaskedImage({ src, alt, aspect, parallaxLayer }: MaskedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
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
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || parallaxLayer === "foreground") return;

    const node = containerRef.current;
    if (!node) return;

    const speed = PARALLAX_SPEED[parallaxLayer];
    let rafId = 0;
    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      setOffset(distanceFromCenter * (speed - 1));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, parallaxLayer]);

  const containerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    aspectRatio: ASPECT_RATIO[aspect],
    width: "100%",
  };

  // Parallax offset updates every scroll frame and must track instantly —
  // it lives on its own layer so it never inherits the entrance
  // transition below.
  const parallaxStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transform: reducedMotion ? "none" : `translateY(${offset}px)`,
  };

  const imageStyle: CSSProperties = reducedMotion
    ? {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: isVisible ? 1 : 0,
        transition: "opacity var(--duration-fast) var(--ease-primary)",
      }
    : {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: isVisible ? "scale(1)" : "scale(1.06)",
        clipPath: isVisible ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
        transition: `transform var(--duration-slow) var(--ease-primary), clip-path var(--duration-slow) var(--ease-primary)`,
      };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={parallaxStyle}>
        <img src={src} alt={alt} loading="lazy" decoding="async" style={imageStyle} />
      </div>
    </div>
  );
}
