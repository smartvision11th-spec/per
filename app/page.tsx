"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HeroExplodedSection from "@/components/HeroExplodedSection";
import TrainingIntentSection from "@/components/TrainingIntentSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import MembershipSection from "@/components/MembershipSection";
import ConsistencySection from "@/components/ConsistencySection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  useEffect(() => {
    // Lenis smooth luxury mechanical scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen relative selection:bg-amber-primary selection:text-black" style={{ background: "#030406" }}>
      {/* Subtle Noise Texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Glassmorphism Brand Navigation */}
      <Navbar />

      {/* 
        S01 + S02: THE CENTRAL SPATIAL MASTERPIECE
        Continuous 4-phase scroll-driven 3D barbell exploded view 
        (Assembled Hero -> Axial Disassembly -> Max Separation HUD -> Reassembly)
      */}
      <HeroExplodedSection />

      {/* S03: Train With Intent — High-Impact Editorial Photography Grid */}
      <TrainingIntentSection />

      {/* S04: Architectural Showcase — Facility Blueprint & Zones */}
      <FacilitiesSection />

      {/* S05: Membership Caliber — Honest Tiers & Custom Quotes */}
      <MembershipSection />

      {/* S06: Philosophy & Athletic Code — Giant Typographic Power Statement */}
      <ConsistencySection />

      {/* S07: Initiate Membership — Validated Athlete Application */}
      <ContactSection />
    </main>
  );
}
