import type { CSSProperties } from "react";
import { Hairline } from "@/components/system/Hairline";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface TheDescentSectionProps {
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
 * design/tokens.json -> componentContracts.SectionShell, RevealText
 * content/home-narrative.md -> "04 — The descent"
 *
 * Copy is locked. No CTA — this section's credibility depends on not
 * selling (home-narrative.md's explicit note for 04).
 */
export function TheDescentSection({ posterSrc }: TheDescentSectionProps) {
  return (
    <SectionShell temperature="basalt" sectionNumber="04">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div aria-hidden="true" style={registrationLineStyle}>
        <Hairline orientation="vertical" />
      </div>
      <div style={contentStyle}>
        <RevealText as="p" staggerUnit="line">
          {"The work is not a weekend of affirmations.\nIt asks you to look at the inherited stories and the defended habits that shaped the life you have, and to loosen them.\nThat takes patience, and it takes nerve.\nWhat's on the other side isn't a better version of the same performance.\nIt's the thing underneath it."}
        </RevealText>
      </div>
    </SectionShell>
  );
}
