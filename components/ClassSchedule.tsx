"use client";

import React, { useState } from "react";
import { Clock, Flame, UserCheck, Calendar, ArrowUpRight, Filter } from "lucide-react";

interface ClassScheduleProps {
  onOpenBooking: () => void;
}

interface ClassItem {
  id: string;
  name: string;
  category: "strength" | "hiit" | "combat" | "recovery";
  time: string;
  duration: string;
  coach: string;
  calories: string;
  intensity: number;
  spotsLeft: number;
  highlight?: boolean;
}

const CLASSES: ClassItem[] = [
  {
    id: "1",
    name: "Barbell Power & Olympic Clean",
    category: "strength",
    time: "06:00 AM",
    duration: "60 Min",
    coach: "Marcus Vance (Olympic Lifter)",
    calories: "550 - 700 kcal",
    intensity: 5,
    spotsLeft: 3,
    highlight: true,
  },
  {
    id: "2",
    name: "Metabolic HIIT & Turf Sprint",
    category: "hiit",
    time: "07:30 AM",
    duration: "45 Min",
    coach: "Elena Rostova (Conditioning)",
    calories: "600 - 800 kcal",
    intensity: 5,
    spotsLeft: 5,
  },
  {
    id: "3",
    name: "Golden Gloves Boxing & Striking",
    category: "combat",
    time: "09:00 AM",
    duration: "55 Min",
    coach: "Damian Cruz (Pro Boxer)",
    calories: "700 - 900 kcal",
    intensity: 4,
    spotsLeft: 2,
    highlight: true,
  },
  {
    id: "4",
    name: "Hypertrophy Chest & Shoulder Armor",
    category: "strength",
    time: "12:00 PM",
    duration: "50 Min",
    coach: "Marcus Vance",
    calories: "500 - 650 kcal",
    intensity: 4,
    spotsLeft: 8,
  },
  {
    id: "5",
    name: "Full-Body Athletic Conditioning",
    category: "hiit",
    time: "05:30 PM",
    duration: "50 Min",
    coach: "Elena Rostova",
    calories: "650 - 850 kcal",
    intensity: 5,
    spotsLeft: 4,
    highlight: true,
  },
  {
    id: "6",
    name: "Cryo Mobility & Spinal Decompression",
    category: "recovery",
    time: "07:00 PM",
    duration: "45 Min",
    coach: "Dr. Maya Lin (DPT)",
    calories: "200 - 300 kcal",
    intensity: 2,
    spotsLeft: 6,
  },
];

export default function ClassSchedule({ onOpenBooking }: ClassScheduleProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredClasses =
    activeCategory === "all"
      ? CLASSES
      : CLASSES.filter((c) => c.category === activeCategory);

  const categories = [
    { id: "all", label: "All Classes" },
    { id: "strength", label: "Strength & Power" },
    { id: "hiit", label: "HIIT Conditioning" },
    { id: "combat", label: "Combat & Boxing" },
    { id: "recovery", label: "Mobility & Recovery" },
  ];

  return (
    <section id="schedule" className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Class Timetable</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
              WEEKDAY <span className="text-brand-orange">TRAINING SCHEDULE</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Led by master athletic trainers. Small group caps ensure dedicated coaching and technical feedback.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3 text-xs text-slate-400 bg-surface border border-white/10 px-4 py-2.5 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Class booking opens 7 days in advance</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-brand-orange text-white shadow-orange-glow"
                  : "bg-surface hover:bg-surface-elevated text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 glass-panel hover:glass-panel-glow transition-all duration-300 flex flex-col justify-between relative group ${
                item.highlight ? "border-brand-orange/40" : ""
              }`}
            >
              {item.highlight && (
                <div className="absolute top-4 right-4 bg-brand-orange/20 border border-brand-orange/50 text-brand-orange text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  High Demand
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span className="text-white font-bold">{item.time}</span>
                  <span>({item.duration})</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Coach: <strong className="text-slate-200">{item.coach}</strong></span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{item.calories}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    ● {item.spotsLeft} spots remaining
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-elevated hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider border border-white/15 hover:border-brand-orange transition-all duration-200 group/btn"
                >
                  <span>Reserve</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
