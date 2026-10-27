"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Flame, Shield, ArrowRight, Play, Zap, Users, Trophy } from "lucide-react";

// Dynamic client import for 3D canvas (prevents SSR canvas errors)
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Loading 3D Experience...
        </span>
      </div>
    </div>
  ),
});

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-grid-pattern">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Athletic Copy & Action */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Live Occupancy Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-orange/30 shadow-orange-glow mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
              </span>
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Live Gym Occupancy: <strong className="text-brand-orange">38%</strong> (Optimal Time To Train)
              </span>
            </div>

            {/* Main Headline with Bebas Neue Typography */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92]">
              FORGE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-amber-400">
                PEAK POTENTIAL.
              </span>
            </h1>

            {/* Subtitle with High Contrast Body Text */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Welcome to <strong className="text-white font-semibold">Perfect Fitness Gym</strong>. 
              A 15,000 sq ft high-performance training ground combining Olympic strength rigs, 
              cryogenic recovery spas, and AI-driven biomechanics tracking. Built for the relentless.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-500 text-white font-bold uppercase tracking-wider text-base shadow-orange-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <Flame className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#amenities"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface/90 hover:bg-surface-elevated border border-white/15 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200"
              >
                <Play className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
                <span>Explore Facilities</span>
              </a>
            </div>

            {/* Key Performance Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-xl">
              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">
                  15,000<span className="text-brand-orange text-2xl">SQ FT</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                  Training Ground
                </div>
              </div>

              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">
                  24<span className="text-brand-orange">/7</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                  Keycard Access
                </div>
              </div>

              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">
                  98<span className="text-brand-orange">%</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
                  Goal Success
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Equipment Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}
