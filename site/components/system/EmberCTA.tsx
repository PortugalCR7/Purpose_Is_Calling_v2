import styles from "./EmberCTA.module.css";

interface EmberCTAProps {
  label: string;
  href: string;
  variant: "outline";
}

/**
 * design/tokens.json -> componentContracts.EmberCTA, color.ember.usage_rules
 * design/motion-spec.md -> "1. The one easing curve", "8. What never happens", "9. Reduced motion"
 *
 * Ember is a scarcity accent (~3% of surface site-wide) and must never be a
 * large fill, so the only variant is an outlined control: ember border +
 * ember label on a transparent fill. Hover/focus shift the ember step from
 * 600 to 400 and scale to 1.02 (the spec's hard ceiling) — no shadow, no
 * second easing curve. Reduced motion is handled in EmberCTA.module.css via
 * `prefers-reduced-motion`, matching the same query useReducedMotion.ts
 * reads, since this is a hover/focus interaction rather than a scroll
 * entrance and needs no JS state.
 */
export function EmberCTA({ label, href, variant }: EmberCTAProps) {
  void variant;

  return (
    <a href={href} className={styles.cta}>
      {label}
    </a>
  );
}
