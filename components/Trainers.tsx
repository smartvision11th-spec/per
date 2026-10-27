"use client";

import React from "react";
import { Award, Dumbbell, Shield, Sparkles, ChevronRight } from "lucide-react";

interface TrainersProps {
  onOpenBooking: () => void;
}

const COACHES = [
  {
    name: "Marcus Vance",
    role: "Head Strength & Olympic Barbell Coach",
    creds: "CSCS • USAW Senior Coach • Former Olympian Qualifier",
    bio: "Specializes in kinetic bar-velocity tracking, 500+ lb squat mechanics, and bulletproof posterior chain development.",
    badge: "Olympic Spec",
    accent: "from-brand-orange to-red-600",
  },
  {
    name: "Elena Rostova",
    role: "Director of Metabolic Conditioning & Mobility",
    creds: "Ex-Collegiate Gymnast • EXOS Performance Specialist",
    bio: "Pioneers high-lactate sprint protocols and functional thoracic spine mobility for peak athletic agility.",
    badge: "Conditioning",
    accent: "from-brand-cyan to-blue-600",
  },
  {
    name: "Damian Cruz",
    role: "Head Boxing & Combat Conditioning",
    creds: "Golden Gloves Champion • 14-2 Pro Boxing Record",
    bio: "Focuses on explosive rotational power, defensive head movement, and elite fight-pace cardio conditioning.",
    badge: "Combat",
    accent: "from-amber-400 to-orange-600",
  },
  {
    name: "Dr. Maya Lin, DPT",
    role: "Director of Physical Therapy & Cryo Recovery",
    creds: "Doctor of Physical Therapy • Certified Dry Needling",
    bio: "Integrates cold plunge vasoconstriction with targeted myofascial release to cut recovery time in half.",
    badge: "Recovery DPT",
    accent: "from-emerald-400 to-teal-600",
  },
];

export default function Trainers({ onOpenBooking }: TrainersProps) {
  return (
    <section id="trainers" className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Master Athletic Staff</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            WORLD-CLASS <span className="text-brand-orange">PERFORMANCE COACHES</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            No inexperienced gym floor attendants. Every coach at Perfect Fitness holds master certifications 
            and collegiate or professional athletic coaching credentials.
          </p>
        </div>

        {/* Coach Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COACHES.map((coach) => (
            <div
              key={coach.name}
              className="rounded-3xl p-6 glass-panel hover:glass-panel-glow transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Avatar Accent */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${coach.accent} flex items-center justify-center text-white shadow-lg font-display text-2xl font-bold`}>
                    {coach.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {coach.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                  {coach.name}
                </h3>
                <div className="text-xs font-semibold text-brand-orange mt-1">
                  {coach.role}
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-2 pb-3 border-b border-white/10">
                  {coach.creds}
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {coach.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-surface-elevated hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-brand-orange transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Book Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
