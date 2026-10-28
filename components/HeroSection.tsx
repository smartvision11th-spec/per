"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Flame, ArrowRight, Play, Sparkles, Activity, ShieldCheck, Dumbbell } from "lucide-react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] lg:h-[700px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
        <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
          Initializing 3D Kinetic Canvas...
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
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-noise">
      {/* High-Impact Ambient Stage Glows */}
      <div className="absolute top-1/4 -left-60 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-60 w-[550px] h-[550px] bg-brand-cyan/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* Left Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Live Telemetry Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-card border border-brand-orange/30 shadow-spotlight mb-6 backdrop-blur-xl">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">
                LIVE FLOOR OCCUPANCY: <strong className="text-brand-orange">38%</strong> (PRIME SQUAT RACK AVAILABILITY)
              </span>
            </div>

            {/* Giant Athletic Headline (Bebas Neue Display) */}
            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.88]">
              FORGE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-brand-gold">
                PEAK POTENTIAL.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-7 text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Step into <strong className="text-white font-bold">Perfect Fitness</strong>. 
              A 15,000 sq ft cathedral of strength built with competition-calibrated Eleiko rigs, 
              cryogenic recovery suites, and AI-velocity tracking. 
              Open 24/7 for the unrelenting.
            </p>

            {/* Dual CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-red-600 to-amber-500 hover:from-brand-orange-hover hover:to-red-500 text-white font-extrabold uppercase tracking-wider text-sm shadow-orange-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <Flame className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href="#calculator"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-card hover:bg-white/10 text-slate-200 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-200"
              >
                <Activity className="w-4 h-4 text-brand-cyan" />
                <span>Calculate 1-Rep Max</span>
              </a>
            </div>

            {/* Performance Statistics */}
            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-xl">
              <div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
                  15,000<span className="text-brand-orange text-2xl sm:text-3xl font-display">SQ FT</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1.5 uppercase tracking-wider">
                  Olympic Facility
                </div>
              </div>

              <div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
                  24<span className="text-brand-orange font-display">/7</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1.5 uppercase tracking-wider">
                  Biometric Entry
                </div>
              </div>

              <div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
                  98<span className="text-brand-orange font-display">%</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1.5 uppercase tracking-wider">
                  Athlete Retention
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero 3D Kinetic Core */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroCanvas />
          </div>

        </div>
      </div>

      {/* 21st.dev Kinetic Marquee Ribbon */}
      <div className="mt-16 py-4 bg-dark-900/90 border-y border-white/10 overflow-hidden relative backdrop-blur-md">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-10 font-display text-2xl sm:text-3xl tracking-widest uppercase text-slate-400 select-none px-6">
              <span className="text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-brand-orange" /> ELEIKO CALIBRATED STEEL
              </span>
              <span className="text-brand-orange">✦</span>
              <span>SUB-ZERO 48°F COLD PLUNGE</span>
              <span className="text-brand-cyan">✦</span>
              <span className="text-white">AI VELOCITY TRACKING</span>
              <span className="text-brand-orange">✦</span>
              <span>INBODY 970 3D SCANS</span>
              <span className="text-emerald-400">✦</span>
              <span className="text-white">40-YARD TURF SPRINT LANES</span>
              <span className="text-brand-orange">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
