import type { CSSProperties } from "react";
import { Hairline } from "@/components/system/Hairline";
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

// design/tokens.json -> layout.maxContentWidth_px — reading-column cap,
// keeps text from running edge-to-edge on wide viewports.
const contentStyle: CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "var(--max-content-width)",
};

const posterStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

// design/tokens.json -> layout.marginRegistrationLine, spacing (space-55)
// design/art-direction.md -> "The basalt-as-grid concept"
// Vertical hairline at the same left margin SectionShell already pads to
// (space-55), so it registers consistently down the page section to
// section — the columnar-basalt link the concept doc names explicitly.
const registrationLineStyle: CSSProperties = {
  position: "absolute",
  left: "var(--space-55)",
  top: 0,
  bottom: 0,
  zIndex: 1,
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
      <div aria-hidden="true" style={registrationLineStyle}>
        <Hairline orientation="vertical" />
      </div>
      <div style={contentStyle}>
        <PullQuote
          quote="He reflected both my gifts and shadows with compassion, camaraderie, and respect. His presence made me feel deeply seen."
          attribution="Joshua"
        />
      </div>
    </SectionShell>
  );
}
