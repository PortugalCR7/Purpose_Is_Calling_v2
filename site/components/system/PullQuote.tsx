"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Hairline } from "./Hairline";

interface PullQuoteProps {
  quote: string;
  attribution: string;
}

/**
 * design/tokens.json -> componentContracts.PullQuote
 * design/motion-spec.md -> "4. Entrance grammar" (text), "8. What never
 * happens" (ember scarcity — no card/box/shadow), "9. Reduced motion"
 *
 * `display_md` (55px), not `heading_lg` (34px): heading_lg is already
 * claimed by RevealText's h2 (section headlines), and a pulled quote
 * needs to read as a display-scale moment of its own — set apart from
 * the surrounding body copy — without competing with an actual h1 at
 * display_lg. Attribution stays at label size in --font-mono so the
 * credit line reads as a quiet caption, never a second headline.
 *
 * Separation from surrounding copy is spacing (Fibonacci) plus a single
 * Hairline above the attribution — no card, no fill, no shadow.
 *
 * Entrance matches RevealText's grammar (rise 21px + fade, duration.base)
 * treating the quote and the attribution line as two macro units, one
 * stagger step (89ms) apart, rather than splitting the quote itself into
 * words — a pulled quote is read as a whole, not word-by-word.
 */
export function PullQuote({ quote, attribution }: PullQuoteProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const textColor =
    "color-mix(in srgb, var(--text-on-basalt-primary) calc(var(--temp) * 100%), var(--text-on-glacier-primary))";
  const secondaryColor =
    "color-mix(in srgb, var(--text-on-basalt-secondary) calc(var(--temp) * 100%), var(--text-on-glacier-secondary))";

  const riseTransition = reducedMotion
    ? "opacity var(--duration-fast) var(--ease-primary)"
    : "opacity var(--duration-base) var(--ease-primary), transform var(--duration-base) var(--ease-primary)";

  const quoteStyle: CSSProperties = {
    margin: 0,
    fontFamily: "var(--font-voice)",
    fontSize: "var(--text-display-md)",
    lineHeight: 1.2,
    fontWeight: 400,
    color: textColor,
    opacity: visible ? 1 : 0,
    transform: reducedMotion || visible ? "none" : "translateY(var(--space-21))",
    transition: riseTransition,
  };

  const attributionRowStyle: CSSProperties = {
    marginTop: "var(--space-34)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-21)",
    opacity: visible ? 1 : 0,
    transform: reducedMotion || visible ? "none" : "translateY(var(--space-21))",
    transition: riseTransition,
    transitionDelay: reducedMotion ? "0ms" : "var(--stagger-unit)",
  };

  const citeStyle: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-label)",
    letterSpacing: "var(--letter-spacing-label-caps)",
    fontStyle: "normal",
    color: secondaryColor,
  };

  return (
    <figure ref={ref as React.Ref<HTMLElement>} style={{ margin: 0 }}>
      <blockquote style={quoteStyle}>{quote}</blockquote>
      <figcaption style={attributionRowStyle}>
        <Hairline />
        <cite style={citeStyle}>{attribution}</cite>
      </figcaption>
    </figure>
  );
}
