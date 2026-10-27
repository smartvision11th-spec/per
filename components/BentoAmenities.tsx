"use client";

import React from "react";
import { 
  Dumbbell, 
  Snowflake, 
  Activity, 
  Zap, 
  Coffee, 
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function BentoAmenities() {
  return (
    <section id="amenities" className="py-24 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State-Of-The-Art Facilities</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            ENGINEERED FOR <span className="text-brand-orange">MAXIMUM RESULTS</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Every square foot of Perfect Fitness Gym is architected with competition-grade hardware, 
            cutting-edge recovery therapy, and seamless digital tracking.
          </p>
        </div>

        {/* 21st.dev Style Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* Bento Card 1: Olympic Strength Arena (Featured 2-Col on Desktop) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl p-8 glass-panel hover:glass-panel-glow transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Dumbbell className="w-36 h-36 text-brand-orange" />
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center mb-6">
                <Dumbbell className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange tracking-widest uppercase mb-2">
                Zone 01 • Heavy Iron
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                Olympic Lifting & Power Racks
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                12 competition-grade Eleiko platforms, calibrated steel plates, custom dumbbells up to 150 lbs, 
                and acoustic drop-zones built for serious strength lifters.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Eleiko & Rogue Spec
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Chalk Friendly
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Monolifts Available
              </span>
            </div>
          </div>

          {/* Bento Card 2: Cryo & Recovery Lounge */}
          <div className="rounded-3xl p-8 glass-panel hover:border-brand-cyan/40 hover:shadow-cyan-glow transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Snowflake className="w-28 h-28 text-brand-cyan" />
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center mb-6">
                <Snowflake className="w-6 h-6 text-brand-cyan" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan tracking-widest uppercase mb-2">
                Zone 02 • Recovery
              </div>
              <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">
                Cryo & Thermal Spa
              </h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                48°F commercial cold plunges, Finnish cedar saunas, infrared light therapy, and NormaTec 3 compression boots.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> Accelerated Muscle Repair
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> Reduce Inflammation 60%
              </span>
            </div>
          </div>

          {/* Bento Card 3: AI Biometrics Tracking */}
          <div className="rounded-3xl p-8 glass-panel hover:border-emerald-500/40 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-28 h-28 text-emerald-400" />
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-2">
                Zone 03 • Intelligence
              </div>
              <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">
                AI Biometrics Lab
              </h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Computer-vision velocity tracking, 3D body composition scanning (InBody 970), and heart rate zones streamed to gym monitors.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Bar Velocity
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Posture & Symmetry Scan
              </span>
            </div>
          </div>

          {/* Bento Card 4: Functional Sprint Turf & Boxing Ring (2-Col on LG) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl p-8 glass-panel hover:glass-panel-glow transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-32 h-32 text-amber-400" />
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-widest uppercase mb-2">
                Zone 04 • Conditioning
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                40-Yard Sprint Turf & Combat Arena
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Heavy sled pushing tracks, battle ropes, plyometric boxes, and a full-size regulation boxing ring 
                equipped with Aqua impact water bags for elite conditioning.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sled Push & Drag Lanes
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Heavy Bag Row
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Agility Ladders & Cones
              </span>
            </div>
          </div>

          {/* Bento Card 5: Fuel & Clean Nutrition Hub (2-Col on LG) */}
          <div className="md:col-span-1 lg:col-span-2 rounded-3xl p-8 glass-panel hover:glass-panel-glow transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coffee className="w-32 h-32 text-brand-orange" />
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center mb-6">
                <Coffee className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange tracking-widest uppercase mb-2">
                Zone 05 • Nutrition
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                Fuel Bar & Macro Meal Prep
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                On-site custom protein shake bar (grass-fed whey & vegan isolate), organic electrolyte hydration on tap, 
                and chilled meal prep lockers stocked daily by certified nutritionists.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Grass-Fed Whey & Plant Proteins
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cold Brew & Electrolytes
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
