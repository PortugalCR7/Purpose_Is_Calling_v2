import { Hero } from "@/components/home/Hero";
import { ProofSection } from "@/components/home/ProofSection";
import { SomethingBroughtYouHere } from "@/components/home/SomethingBroughtYouHere";
import { TheCallSection } from "@/components/home/TheCallSection";
import { TheDescentSection } from "@/components/home/TheDescentSection";
import { TheInquirySection } from "@/components/home/TheInquirySection";
import { WhatThisIs } from "@/components/home/WhatThisIs";

export default function HomePage() {
  return (
    <main>
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
