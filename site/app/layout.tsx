import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TemperatureController } from "@/components/system/TemperatureController";
import "../styles/tokens.css";

export const metadata: Metadata = {
  title: "Purpose Is Calling",
  description: "purposeiscalling.life — The Descent",
};

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
    <html lang="en">
      <body>
        <TemperatureController>{children}</TemperatureController>
      </body>
    </html>
  );
}
