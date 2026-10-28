"use client";

import React, { useState, useEffect } from "react";
import { Dumbbell, Menu, X, Flame, Shield, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Training Zones", href: "#amenities" },
    { label: "Class Timetable", href: "#schedule" },
    { label: "1-Rep Calculator", href: "#calculator" },
    { label: "Master Coaches", href: "#trainers" },
    { label: "Memberships", href: "#pricing" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-dark-950/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Athletic Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-xl"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-orange via-red-600 to-amber-500 flex items-center justify-center shadow-orange-glow-lg group-hover:scale-105 transition-transform duration-300">
                  <Dumbbell className="w-6 h-6 text-white transform -rotate-45" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-cyan border-2 border-dark-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-wider text-2xl sm:text-3xl font-extrabold uppercase text-white leading-none">
                  PERFECT<span className="text-brand-orange">FITNESS</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-slate-400 font-mono uppercase font-semibold mt-0.5">
                  24/7 ATHLETIC CLUB
                </span>
              </div>
            </a>

            {/* Floating Navigation Pill Island */}
            <nav className="hidden lg:flex items-center gap-1.5 glass-card rounded-full px-6 py-2 shadow-2xl border border-white/10 backdrop-blur-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Status Badge & Primary CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="hidden xl:flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 OPEN • LIVE SLOTS</span>
              </div>

              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden rounded-full p-[1.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-orange via-brand-cyan to-amber-400 rounded-full animate-shimmer" />
                <span className="relative flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-dark-950 hover:bg-transparent text-white text-xs font-extrabold tracking-widest uppercase transition-all duration-300">
                  <Flame className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors" />
                  <span>Free Day Pass</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-2xl glass-card border border-white/15 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-3xl lg:hidden pt-28 px-6 flex flex-col justify-between pb-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-4 py-2 rounded-xl mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Facility Status: Open 24/7/365</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-2xl font-display uppercase tracking-wider text-slate-200 hover:text-brand-orange py-3 border-b border-white/5"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-red-600 to-amber-500 text-white font-extrabold uppercase tracking-widest text-sm shadow-orange-glow-lg flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5" />
              <span>Claim Free 1-Day Pass</span>
            </button>
            <p className="text-center text-[11px] text-slate-400 font-mono">
              Instant digital keycard generation. No commitment.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
