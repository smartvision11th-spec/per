"use client";

import React, { useState } from "react";
import { Activity, Flame, Dumbbell, Trophy, ArrowRight, Zap } from "lucide-react";

interface InteractiveCalculatorProps {
  onOpenBooking: () => void;
}

export default function InteractiveCalculator({ onOpenBooking }: InteractiveCalculatorProps) {
  const [lift, setLift] = useState<string>("deadlift");
  const [weight, setWeight] = useState<number>(225);
  const [reps, setReps] = useState<number>(5);

  // Epley 1RM Formula
  const oneRepMax = Math.round(weight * (1 + reps / 30));
  const heavySingle = Math.round(oneRepMax * 0.9);
  const volumeSets = Math.round(oneRepMax * 0.75);

  const getTier = (max: number, currentLift: string) => {
    if (currentLift === "deadlift" || currentLift === "squat") {
      if (max >= 450) return { title: "Elite Olympic Tier", badge: "ELITE ATHLETE", color: "text-brand-orange" };
      if (max >= 315) return { title: "Intermediate Power", badge: "STRONG LIFTER", color: "text-amber-400" };
      return { title: "Building Foundation", badge: "RISING ATHLETE", color: "text-brand-cyan" };
    }
    if (max >= 315) return { title: "Elite Olympic Tier", badge: "ELITE ATHLETE", color: "text-brand-orange" };
    if (max >= 225) return { title: "Intermediate Power", badge: "STRONG LIFTER", color: "text-amber-400" };
    return { title: "Building Foundation", badge: "RISING ATHLETE", color: "text-brand-cyan" };
  };

  const tier = getTier(oneRepMax, lift);

  return (
    <section id="calculator" className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-orange/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>21ST.DEV ATHLETIC TELEMETRY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            1-REP MAX & <span className="text-brand-orange">POWER CALCULATOR</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Dial in your training loads. Use our calibrated calculation engine to establish your working percentages.
          </p>
        </div>

        {/* Interactive Dual-Panel Box */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-card-glow p-8 sm:p-12 border border-brand-orange/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Exercise Selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Select Calibrated Movement:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "deadlift", label: "Deadlift" },
                    { id: "squat", label: "Back Squat" },
                    { id: "bench", label: "Bench Press" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLift(item.id)}
                      className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                        lift === item.id
                          ? "bg-brand-orange text-white shadow-orange-glow"
                          : "bg-dark-950 text-slate-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lifted Weight Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    Working Weight:
                  </span>
                  <span className="font-display text-2xl font-bold text-white">
                    {weight} <span className="text-brand-orange text-base font-sans">LBS</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="600"
                  step="5"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>45 lbs (Empty Bar)</span>
                  <span>300 lbs</span>
                  <span>600 lbs</span>
                </div>
              </div>

              {/* Reps Completed Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    Reps to Failure:
                  </span>
                  <span className="font-display text-2xl font-bold text-white">
                    {reps} <span className="text-brand-cyan text-base font-sans">REPS</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-full h-2.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>1 Rep (Pure Max)</span>
                  <span>6 Reps (Strength)</span>
                  <span>12 Reps (Hypertrophy)</span>
                </div>
              </div>
            </div>

            {/* Right Result Display */}
            <div className="lg:col-span-5 rounded-2xl bg-dark-950 p-6 sm:p-8 border border-white/10 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl" />

              <div>
                <span className={`text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 ${tier.color}`}>
                  {tier.badge}
                </span>

                <div className="text-xs font-mono text-slate-400 mt-4 uppercase">
                  Estimated 1-Rep Max
                </div>
                <div className="font-display text-6xl sm:text-7xl font-extrabold text-white mt-1 leading-none">
                  {oneRepMax}<span className="text-brand-orange text-3xl font-display">LBS</span>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-xs font-mono text-slate-300 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400">90% Heavy Load:</span>
                    <strong className="text-white">{heavySingle} lbs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">75% Volume Working:</span>
                    <strong className="text-white">{volumeSets} lbs</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-orange-glow flex items-center justify-center gap-2 transition-all"
                >
                  <Dumbbell className="w-4 h-4" />
                  <span>Test on Eleiko Platforms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
