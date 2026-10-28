"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroExplodedSection from "@/components/HeroExplodedSection";
import TrainingIntentSection from "@/components/TrainingIntentSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import MembershipSection from "@/components/MembershipSection";
import ConsistencySection from "@/components/ConsistencySection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--c-void)" }}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* S01 + S02: Hero + Scroll-driven 3D Exploded View */}
      <HeroExplodedSection />

      {/* S03: Train With Intent — editorial training grid */}
      <TrainingIntentSection />

      {/* S04: Training Floor — facility zones */}
      <FacilitiesSection />

      {/* S05: Find Your Training Style — membership tiers */}
      <MembershipSection />

      {/* S06: Consistency Builds Results — typographic philosophy section */}
      <ConsistencySection />

      {/* S07: Start Training — contact + enquiry form */}
      <ContactSection />
    </main>
  );
}
