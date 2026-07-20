import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { TemperatureController } from "@/components/system/TemperatureController";
import "../styles/tokens.css";

export const metadata: Metadata = {
  title: "Purpose Is Calling",
  description: "purposeiscalling.life — The Descent",
};

/**
 * design/tokens.json -> typography.families.voice, typography.weight
 *
 * Self-hosted at build time via next/font/google (no runtime request to
 * fonts.googleapis.com — AGENTS.md rule 6, hero LCP budget). Weights
 * limited to 400/500 per tokens.json's "Two weights only, regular and
 * medium. Never bold." Exposed as --font-voice so tokens.css's existing
 * fallback declaration is simply overridden by this variable taking
 * precedence in the cascade — no component changes needed.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-voice",
  display: "swap",
});

/**
 * design/tokens.json -> typography.families.ui, typography.weight
 *
 * General Sans is Fontshare-exclusive (no Google Fonts / npm package),
 * so it's self-hosted via next/font/local from site/app/fonts/ — see
 * site/app/fonts/GENERAL-SANS-LICENSE.txt for the license grant covering
 * self-hosting. Weights limited to 400/500, same rule as Fraunces above.
 */
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ui",
  display: "swap",
});

/**
 * site/README.md -> "First real tasks" #1
 * design/motion-spec.md -> "3. The temperature shift"
 *
 * TemperatureController wraps the whole page here, once — the single
 * scroll-linked --temp source of truth for every SectionShell below it.
 * Do not re-wrap individual sections in their own controller.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${generalSans.variable}`}>
      <body>
        <TemperatureController>{children}</TemperatureController>
      </body>
    </html>
  );
}
