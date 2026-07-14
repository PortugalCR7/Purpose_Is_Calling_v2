import type { CSSProperties } from "react";
import { EmberCTA } from "@/components/system/EmberCTA";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface HeroProps {
  /**
   * film/shot-manifest.json -> scene_01 is still "still_in_progress" — no
   * approved plate exists yet, so this defaults to undefined and the
   * section falls back to the flat glacier surface SectionShell already
   * renders. Once scene_01 clears review, pass a poster-frame src here
   * (e.g. from film/plates/scene_01.mp4) with no other structural change.
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

// design/tokens.json -> spacing.usage.component_rhythm
const subheadStyle: CSSProperties = {
  marginTop: "var(--space-34)",
};

const ctaWrapStyle: CSSProperties = {
  marginTop: "var(--space-55)",
};

/**
 * design/tokens.json -> componentContracts.SectionShell, RevealText, EmberCTA
 * design/motion-spec.md -> "4. Entrance grammar"
 * site/README.md -> "First real tasks, in dependency order" #3
 *
 * Headline/subhead copy is locked (Invitation register, option B —
 * decided with the human operator, not sourced from content/pages/home.md).
 */
export function Hero({ posterSrc }: HeroProps) {
  return (
    <SectionShell temperature="glacier" sectionNumber="01">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div style={contentStyle}>
        <RevealText as="h1" staggerUnit="word">
          You didn&apos;t arrive here by accident.
        </RevealText>
        <div style={subheadStyle}>
          <RevealText as="p" staggerUnit="line">
            Something in you has been waiting for permission to descend.
          </RevealText>
        </div>
        <div style={ctaWrapStyle}>
          <EmberCTA
            label="Book a discovery call"
            href="https://calendly.com/purposeiscalling/purpose-discovery-call"
            variant="outline"
          />
        </div>
      </div>
    </SectionShell>
  );
}
