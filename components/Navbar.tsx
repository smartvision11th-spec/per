"use client";

import React, { useState, useEffect } from "react";
import { Dumbbell, Menu, X, Flame, ShieldCheck, ChevronRight } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Amenities", href: "#amenities" },
    { label: "Programs", href: "#programs" },
    { label: "Schedule", href: "#schedule" },
    { label: "Coaches", href: "#trainers" },
    { label: "Membership", href: "#pricing" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg p-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-red-600 flex items-center justify-center shadow-orange-glow group-hover:scale-105 transition-transform duration-300">
                <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-wider text-2xl font-bold uppercase text-white leading-none">
                  PERFECT<span className="text-brand-orange">FITNESS</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
                  24/7 Athletic Club
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-surface/80 border border-white/10 rounded-full px-5 py-2 shadow-inner backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Button & Status */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open 24/7 • Live Access</span>
              </div>

              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-orange via-red-500 to-amber-500 rounded-full animate-shimmer" />
                <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-transparent text-white text-sm font-bold tracking-wide uppercase transition-all duration-300">
                  <Flame className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors" />
                  <span>Free Day Pass</span>
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-surface border border-white/10 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-4 py-2 rounded-xl mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Facility Status: Open Now (24/7 Access)</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg font-medium text-slate-200 hover:text-brand-orange py-3 border-b border-white/5"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 text-white font-bold uppercase tracking-wider text-base shadow-orange-glow flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5 text-white" />
              <span>Claim Free 1-Day Pass</span>
            </button>
            <p className="text-center text-xs text-slate-400">
              No credit card required. Instant digital pass.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
