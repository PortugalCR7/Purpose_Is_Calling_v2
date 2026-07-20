import type { CSSProperties } from "react";
import { Hairline } from "@/components/system/Hairline";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface SomethingBroughtYouHereProps {
  /**
   * film/shot-manifest.json -> no approved plate for this section yet.
   * Defaults to undefined; SectionShell's flat glacier surface is the
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
 * design/tokens.json -> componentContracts.SectionShell, RevealText
 * content/home-narrative.md -> "02 — Something brought you here"
 *
 * Copy is locked, reframed from content/pages/home.md's rhetorical-question
 * register into second person, declarative, no exclamation points, no
 * question-stacking (home-narrative.md's explicit instruction for this
 * section). No CTA — CTAs live only at 03/05/07.
 */
export function SomethingBroughtYouHere({ posterSrc }: SomethingBroughtYouHereProps) {
  return (
    <SectionShell temperature="glacier" sectionNumber="02">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div aria-hidden="true" style={registrationLineStyle}>
        <Hairline orientation="vertical" />
      </div>
      <div style={contentStyle}>
        <RevealText as="p" staggerUnit="line">
          {"Something brought you here.\nA restlessness that success didn't quiet.\nA pull you've been talking yourself out of.\nYou don't have to name it yet.\nYou only have to stop pretending it isn't there."}
        </RevealText>
      </div>
    </SectionShell>
  );
}
