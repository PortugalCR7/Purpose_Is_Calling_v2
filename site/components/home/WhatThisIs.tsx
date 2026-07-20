import type { CSSProperties } from "react";
import { Hairline } from "@/components/system/Hairline";
import { EmberCTA } from "@/components/system/EmberCTA";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface WhatThisIsProps {
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

// design/tokens.json -> spacing.usage.component_rhythm
const ctaStyle: CSSProperties = {
  marginTop: "var(--space-55)",
};

/**
 * design/tokens.json -> componentContracts.SectionShell, RevealText, EmberCTA
 * content/home-narrative.md -> "03 — What this is", "CTA policy"
 *
 * First temperature drop (basalt). Copy locked. CTA 1 of 3 — lowest-
 * commitment framing. EmberCTA's only variant is the outline/ghost
 * treatment (design/art-direction.md: "No filled, saturated CTA buttons —
 * every CTA is a ghost/outline treatment"), which is inherently the
 * restrained form; this section's plain-basalt SectionShell (no ember
 * wash) is what keeps this CTA reading as restrained relative to 07 —
 * no separate "restrained" component variant was needed.
 */
export function WhatThisIs({ posterSrc }: WhatThisIsProps) {
  return (
    <SectionShell temperature="basalt" sectionNumber="03">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div aria-hidden="true" style={registrationLineStyle}>
        <Hairline orientation="vertical" />
      </div>
      <div style={contentStyle}>
        <RevealText as="p" staggerUnit="line">
          {"This is guided work, one person at a time.\nDavid Miranda doesn't hand you answers or a five-step plan.\nHe asks the questions that let you arrive at your own — about what you value, what you're for, and what you've been carrying that was never yours.\nClarity, not advice."}
        </RevealText>
        <div style={ctaStyle}>
          <EmberCTA
            label="See if this is for you"
            href="https://calendly.com/purposeiscalling/purpose-discovery-call"
            variant="outline"
          />
        </div>
      </div>
    </SectionShell>
  );
}
