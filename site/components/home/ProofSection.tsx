import type { CSSProperties } from "react";
import { PullQuote } from "@/components/system/PullQuote";
import { SectionShell } from "@/components/system/SectionShell";

interface ProofSectionProps {
  /**
   * film/shot-manifest.json -> no approved plate for this section yet.
   * Defaults to undefined; SectionShell's flat basalt surface is the
   * correct placeholder. content/home-narrative.md -> "Film dependency —
   * none": never substitute stock imagery.
   */
  posterSrc?: string;
}

const contentStyle: CSSProperties = {
  position: "relative",
  zIndex: 1,
};

const posterStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

/**
 * design/tokens.json -> componentContracts.SectionShell, PullQuote
 * content/home-narrative.md -> "06 — Proof"
 *
 * One testimonial via PullQuote — not a carousel, not a grid (a wall of
 * testimonials is a funnel tell the rebuild avoids). Quote and
 * attribution are locked. No CTA — 05's CTA sits directly above and 07's
 * directly below.
 */
export function ProofSection({ posterSrc }: ProofSectionProps) {
  return (
    <SectionShell temperature="basalt" sectionNumber="06">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div style={contentStyle}>
        <PullQuote
          quote="He reflected both my gifts and shadows with compassion, camaraderie, and respect. His presence made me feel deeply seen."
          attribution="Joshua"
        />
      </div>
    </SectionShell>
  );
}
