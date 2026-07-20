import type { CSSProperties } from "react";
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
      <div style={contentStyle}>
        <RevealText as="p" staggerUnit="line">
          {"Something brought you here.\nA restlessness that success didn't quiet.\nA pull you've been talking yourself out of.\nYou don't have to name it yet.\nYou only have to stop pretending it isn't there."}
        </RevealText>
      </div>
    </SectionShell>
  );
}
