"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface RevealTextProps {
  as: "h1" | "h2" | "p";
  children: string;
  staggerUnit: "word" | "line";
}

const FONT_FAMILY: Record<RevealTextProps["as"], string> = {
  h1: "var(--font-voice)",
  h2: "var(--font-voice)",
  p: "var(--font-ui)",
};

const FONT_SIZE: Record<RevealTextProps["as"], string> = {
  h1: "var(--text-display-lg)",
  h2: "var(--text-heading-lg)",
  p: "var(--text-body)",
};

const LINE_HEIGHT: Record<RevealTextProps["as"], number> = {
  h1: 1.05,
  h2: 1.2,
  p: 1.6,
};

/**
 * design/tokens.json -> componentContracts.RevealText
 * design/motion-spec.md -> "4. Entrance grammar" (text), "9. Reduced motion"
 *
 * Splits the visible text into per-word or per-line spans for the
 * staggered rise-and-fade, but the accessible name of the element is the
 * unsplit `children` string via aria-label — the split spans live in an
 * aria-hidden wrapper so a screen reader announces one continuous string,
 * never 30 disjoint word fragments.
 */
export function RevealText({ as, children, staggerUnit }: RevealTextProps) {
  const Tag = as as ElementType;
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const units = useMemo(() => {
    if (staggerUnit === "line") {
      return children.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
    }
    return children.split(/\s+/).filter((word) => word.length > 0);
  }, [children, staggerUnit]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const containerStyle: CSSProperties = {
    fontFamily: FONT_FAMILY[as],
    fontSize: FONT_SIZE[as],
    lineHeight: LINE_HEIGHT[as],
    fontWeight: 400,
    margin: 0,
  };

  const unitNodes: ReactNode[] = [];
  units.forEach((unit, index) => {
    const delay = reducedMotion ? 0 : index * 89;
    const unitStyle: CSSProperties = reducedMotion
      ? {
          display: staggerUnit === "line" ? "block" : "inline-block",
          opacity: visible ? 1 : 0,
          transition: "opacity var(--duration-fast) var(--ease-primary)",
        }
      : {
          display: staggerUnit === "line" ? "block" : "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(var(--space-21))",
          transition:
            "opacity var(--duration-base) var(--ease-primary), transform var(--duration-base) var(--ease-primary)",
          transitionDelay: `${delay}ms`,
        };

    unitNodes.push(
      <span key={`unit-${index}`} style={unitStyle}>
        {unit}
      </span>
    );
    if (staggerUnit === "word" && index < units.length - 1) {
      unitNodes.push(" ");
    }
  });

  return (
    <Tag ref={containerRef as Ref<HTMLElement>} style={containerStyle} aria-label={children}>
      <span aria-hidden="true">{unitNodes}</span>
    </Tag>
  );
}
