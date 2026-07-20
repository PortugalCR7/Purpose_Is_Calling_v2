import type { CSSProperties } from "react";
import { EmberCTA } from "@/components/system/EmberCTA";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface TheCallSectionProps {
  /**
   * film/shot-manifest.json -> no approved plate for this section yet.
   * Defaults to undefined; SectionShell's flat ember-washed basalt surface
   * is the correct placeholder. content/home-narrative.md -> "Film
   * dependency — none": never substitute stock imagery.
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

// design/tokens.json -> spacing.usage.component_rhythm
const ctaStyle: CSSProperties = {
  marginTop: "var(--space-55)",
};

/**
 * design/tokens.json -> componentContracts.SectionShell, RevealText, EmberCTA
 * content/home-narrative.md -> "07 — The call", "CTA policy"
 *
 * The bottom of the descent — the only section using `temperature="ember"`
 * (SectionShell's discrete ember-register wash + ember.400 section label,
 * per SectionShell.tsx's comment on scarcity). CTA 3 of 3, the most
 * direct of the three. Copy is locked.
 */
export function TheCallSection({ posterSrc }: TheCallSectionProps) {
  return (
    <SectionShell temperature="ember" sectionNumber="07">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div style={contentStyle}>
        <RevealText as="p" staggerUnit="line">
          {"If you've read this far, you already know.\nOne conversation.\nNo pitch, no obligation — just a half hour to find out whether this is your path right now."}
        </RevealText>
        <div style={ctaStyle}>
          <EmberCTA
            label="Book your call"
            href="https://calendly.com/purposeiscalling/purpose-discovery-call"
            variant="outline"
          />
        </div>
      </div>
    </SectionShell>
  );
}
