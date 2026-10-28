"use client";

import React, { useRef } from "react";
import { 
  Dumbbell, 
  Snowflake, 
  Activity, 
  Zap, 
  Coffee, 
  Sparkles,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";

// Interactive Spotlight Card Component
function SpotlightCard({ 
  children, 
  className = "", 
  glowColor = "rgba(255, 77, 0, 0.15)" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        // @ts-ignore
        "--spotlight-color": glowColor,
      }}
      className={`spotlight-card rounded-3xl p-8 glass-card hover:border-white/20 transition-all duration-300 relative group overflow-hidden ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--spotlight-color), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default function BentoAmenities() {
  return (
    <section id="amenities" className="py-28 bg-dark-950 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-brand-orange/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>21ST.DEV SPOTLIGHT BENTO ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase tracking-tight text-white">
            COMPETITION-GRADE <span className="text-brand-orange">TRAINING ZONES</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Engineered with zero compromises. 15,000 sq ft outfitted with calibrated Olympic hardware, 
            sub-zero recovery pools, and continuous AI form metrics.
          </p>
        </div>

        {/* 21st.dev Asymmetric Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Olympic Barbell Arena (Double-Width 2-Col) */}
          <SpotlightCard className="lg:col-span-2 min-h-[420px]" glowColor="rgba(255, 77, 0, 0.22)">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shadow-orange-glow">
                  <Dumbbell className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange">
                  ZONE 01 • STRENGTH
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                Olympic Calibrated Lifting & Power Racks
              </h3>

              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                12 Eleiko certified weightlifting platforms with Swedish calibrated discs, 
                Rogue Monster power cages, custom machined dumbbells up to 150 lbs, and acoustic drop-dead rubber flooring.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Eleiko & Rogue Calibrated Steel
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Competition Monolifts
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Magnesium Chalk Stations
              </span>
            </div>
          </SpotlightCard>

          {/* Card 2: Cryo & Thermal Spa */}
          <SpotlightCard className="min-h-[420px]" glowColor="rgba(0, 242, 254, 0.22)">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shadow-cyan-glow-lg">
                  <Snowflake className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cyan">
                  ZONE 02 • RECOVERY
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                Sub-Zero Cryo & Infrared Spa
              </h3>

              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                48°F commercial chilled cold plunges, Finnish cedar saunas, full-body red light therapy panels, and NormaTec 3 compression boots for rapid vascular recovery.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2.5 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> 48°F Filtered Ice Plunge
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> 60% Faster Soreness Relief
              </span>
            </div>
          </SpotlightCard>

          {/* Card 3: AI Biometrics Tracking Lab */}
          <SpotlightCard className="min-h-[380px]" glowColor="rgba(16, 185, 129, 0.22)">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Activity className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                  ZONE 03 • AI TELEMETRY
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">
                AI Biometrics & Bar Velocity
              </h3>

              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Computer-vision cameras measure concentric velocity and bar-path deviation in real time. InBody 970 monthly scans track lean muscle & visceral fat.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Concentric Velocity
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3D Joint Symmetry Telemetry
              </span>
            </div>
          </SpotlightCard>

          {/* Card 4: Functional Turf & Combat Arena (Double-Width 2-Col) */}
          <SpotlightCard className="lg:col-span-2 min-h-[380px]" glowColor="rgba(251, 191, 36, 0.22)">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Zap className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400">
                  ZONE 04 • COMBAT & TURF
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                40-Yard Sprint Track & Regulation Boxing Ring
              </h3>

              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Indoor turf designed for weighted sled pushing, agility ladders, and ballistic medicine balls. 
                Full-size elevated boxing canvas equipped with Aqua impact water bags for elite fight conditioning.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Heavy Rogue Dog Sleds
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hydro-filled Heavy Punch Bags
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Olympic Battle Ropes
              </span>
            </div>
          </SpotlightCard>

          {/* Card 5: Fuel Shake & Nutrition Bar (Full Width on 3-col or 1-col) */}
          <SpotlightCard className="lg:col-span-3 min-h-[220px]" glowColor="rgba(255, 77, 0, 0.18)">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shrink-0">
                  <Coffee className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
                    ZONE 05 • ATHLETE NUTRITION
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">
                    On-Site Fuel Bar & Chilled Meal Prep Lockers
                  </h3>
                  <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                    Cold brew and raw electrolyte hydration on tap. Fresh organic whey and plant isolate smoothies mixed to order within 60 seconds post-workout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs font-bold text-slate-400 uppercase bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                  Daily Chilled Deliveries
                </span>
              </div>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
