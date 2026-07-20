import type { CSSProperties } from "react";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface HeroProps {
  /**
   * film/shot-manifest.json -> scene_01 is still "still_in_progress" — no
   * approved plate exists yet, so this defaults to undefined and the
   * section falls back to the flat glacier surface SectionShell already
   * renders. Once scene_01 clears review, pass a poster-frame src here
   * (e.g. from film/plates/scene_01.mp4) with no other structural change.
   *
   * content/home-narrative.md -> "Film dependency — none": never substitute
   * stock imagery as a placeholder. A flat token surface is the correct
   * placeholder.
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
const subheadStyle: CSSProperties = {
  marginTop: "var(--space-34)",
};

/**
 * design/tokens.json -> componentContracts.SectionShell, RevealText
 * design/motion-spec.md -> "4. Entrance grammar"
 * content/home-narrative.md -> "01 — Hero"
 *
 * Headline/subhead copy is locked (Invitation register, option B —
 * decided with the client, not sourced from content/pages/home.md).
 *
 * NO CTA HERE — deliberate, not an omission. content/home-narrative.md §01:
 * "The Hero's job is to stop the scroll, not to convert." The three CTAs on
 * this page live at sections 03, 05, and 07 only (see that file's "CTA
 * policy"). Do not add a CTA to this component; if you believe one belongs
 * here, that is an amendment to home-narrative.md and a dialogue with the
 * client, not a build-task decision.
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
      </div>
    </SectionShell>
  );
}
