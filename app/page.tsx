"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoAmenities from "@/components/BentoAmenities";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import ClassSchedule from "@/components/ClassSchedule";
import PricingMatrix from "@/components/PricingMatrix";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <main className="min-h-screen bg-dark-950 text-slate-100 relative selection:bg-brand-orange selection:text-white">
      {/* 21st.dev Floating Glassmorphism Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Cinematic 3D Kinetic Hero Section */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 21st.dev Spotlight Bento Grid Amenities */}
      <BentoAmenities />

      {/* Interactive 1-Rep Max & Telemetry Calculator */}
      <InteractiveCalculator onOpenBooking={handleOpenBooking} />

      {/* Daily Studio Class Schedule */}
      <ClassSchedule onOpenBooking={handleOpenBooking} />

      {/* Dynamic 3-Tier Pricing Matrix */}
      <PricingMatrix onOpenBooking={handleOpenBooking} />

      {/* Certified Master Coaches */}
      <Trainers onOpenBooking={handleOpenBooking} />

      {/* Social Proof & Verified Reviews */}
      <Testimonials />

      {/* Full Facility Footer */}
      <Footer />

      {/* Interactive 24-Hour VIP Digital Pass Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </main>
  );
}
