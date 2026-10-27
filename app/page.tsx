"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoAmenities from "@/components/BentoAmenities";
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
    <main className="min-h-screen bg-background relative selection:bg-brand-orange selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section with 3D Canvas */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 21st.dev Style Bento Grid Amenities */}
      <BentoAmenities />

      {/* Daily Class Timetable */}
      <ClassSchedule onOpenBooking={handleOpenBooking} />

      {/* Pricing Matrix & Membership Comparison */}
      <PricingMatrix onOpenBooking={handleOpenBooking} />

      {/* World-Class Coaches */}
      <Trainers onOpenBooking={handleOpenBooking} />

      {/* Member Testimonials & Verified Metrics */}
      <Testimonials />

      {/* Footer & Contact */}
      <Footer />

      {/* Interactive Free Day Pass Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </main>
  );
}
