import type { CSSProperties } from "react";
import { Hero } from "@/components/home/Hero";
import { ProofSection } from "@/components/home/ProofSection";
import { SomethingBroughtYouHere } from "@/components/home/SomethingBroughtYouHere";
import { TheCallSection } from "@/components/home/TheCallSection";
import { TheDescentSection } from "@/components/home/TheDescentSection";
import { TheInquirySection } from "@/components/home/TheInquirySection";
import { WhatThisIs } from "@/components/home/WhatThisIs";
import { Hairline } from "@/components/system/Hairline";

const mainStyle: CSSProperties = {
  position: "relative",
};

// design/tokens.json -> layout.marginRegistrationLine ("38.2% gutter from
// left, full page height") — design/art-direction.md -> "The
// basalt-as-grid concept": one continuous spine down the page, not a
// per-section repeat, so it reads as the same structural line the
// columnar-basalt footage is abstracted from. golden-minor is the same
// 0.382 value tokens.json's marginRegistrationLine names.
const registrationLineStyle: CSSProperties = {
  position: "absolute",
  left: "calc(var(--golden-minor) * 100%)",
  top: 0,
  bottom: 0,
  zIndex: 1,
};

export default function HomePage() {
  return (
    <main style={mainStyle}>
      <div aria-hidden="true" style={registrationLineStyle}>
        <Hairline orientation="vertical" revealOn="mount" />
      </div>
      <Hero />
      <SomethingBroughtYouHere />
      <WhatThisIs />
      <TheDescentSection />
      <TheInquirySection />
      <ProofSection />
      <TheCallSection />
    </main>
  );
}
