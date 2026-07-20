import type { CSSProperties } from "react";
import { EmberCTA } from "@/components/system/EmberCTA";
import { RevealText } from "@/components/system/RevealText";
import { SectionShell } from "@/components/system/SectionShell";

interface TheInquirySectionProps {
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

// design/tokens.json -> spacing.usage.component_rhythm / section_rhythm
const placeholderStyle: CSSProperties = {
  marginTop: "var(--space-55)",
  padding: "var(--space-34)",
  border: "var(--border-hairline) dashed var(--hairline-on-basalt-strong)",
};

const placeholderLabelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-caption)",
  letterSpacing: "var(--letter-spacing-label-caps)",
  color: "var(--text-on-basalt-secondary)",
};

const ctaStyle: CSSProperties = {
  marginTop: "var(--space-55)",
};

/**
 * design/tokens.json -> componentContracts.SectionShell, RevealText, EmberCTA
 * content/home-narrative.md -> "05 — The Inquiry", "CTA policy"
 * AGENTS.md -> §4 (Lane D owns site/components/inquiry/), §5 (the Inquiry's LLM call)
 *
 * Lane B (this task) owns only the section shell and framing copy. The
 * actual five-question tool and its composed reflection are Lane D's —
 * see AGENTS.md §5. This is a shell + framing stub, not a fake
 * questionnaire.
 *
 * Temperature: home-narrative.md marks this section `basalt -> ember`,
 * but that ember moment is earned specifically by the rendered reflection
 * (SectionShell's `ember` prop pins the whole subtree to the ember wash —
 * see SectionShell.tsx's comment on why ember is a discrete, section-level
 * reward, not a ramp). Applying `ember` to this entire shell before any
 * reflection exists would spend that scarcity on an empty placeholder, so
 * this shell stays `basalt` until Lane D lands. When Lane D wires the
 * real reflection, the ember transition likely belongs to a nested
 * treatment scoped to the reflection output itself (e.g. its own
 * `SectionShell temperature="ember"` region within this section, or an
 * equivalent local wash) — that decision is Lane D's, not a change to
 * make here speculatively.
 *
 * CTA 2 of 3 is written to sit after the reflection per home-narrative.md
 * ("placed after the reflection renders — never before"). With no
 * reflection present yet, it renders at the section's foot; Lane D must
 * move it to sit directly below the rendered reflection once that lands.
 */
export function TheInquirySection({ posterSrc }: TheInquirySectionProps) {
  return (
    <SectionShell temperature="basalt" sectionNumber="05">
      {posterSrc ? (
        <div aria-hidden="true" style={{ ...posterStyle, backgroundImage: `url(${posterSrc})` }} />
      ) : null}
      <div style={contentStyle}>
        <RevealText as="p" staggerUnit="line">
          {"Before you decide anything, answer five questions.\nNot for us — for you.\nTake them slowly."}
        </RevealText>
        <div style={placeholderStyle} data-testid="inquiry-mount-placeholder">
          {/* Lane D: Inquiry mounts here — site/components/inquiry/, per AGENTS.md §4/§5 */}
          <span style={placeholderLabelStyle}>the inquiry — coming soon</span>
        </div>
        {/*
          TODO(Lane D): move this CTA to sit directly below the rendered
          reflection, per home-narrative.md's "placed after the reflection
          renders — never before". It sits at the section foot only
          because no reflection exists yet to place it after.
        */}
        <div style={ctaStyle}>
          <EmberCTA
            label="Talk it through with David"
            href="https://calendly.com/purposeiscalling/purpose-discovery-call"
            variant="outline"
          />
        </div>
      </div>
    </SectionShell>
  );
}
