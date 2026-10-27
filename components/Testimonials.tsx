"use client";

import React from "react";
import { Star, Quote, CheckCircle2, Trophy, Users, ShieldCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "David K.",
    role: "Competitive Powerlifter",
    achievement: "+65 lbs on Deadlift in 4 Months",
    quote: "I've trained in barbell gyms across North America. Perfect Fitness is unmatched — the Eleiko bars are calibrated, chalk is welcomed, and the 24/7 keycard access fits my 5 AM schedule flawlessly.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Tech Executive & Marathoner",
    achievement: "PR Marathon Time • Zero Shin Splints",
    quote: "The combination of the InBody 3D scans and the sub-zero cryo cold plunge transformed my recovery. I went from lingering hamstring tightness to setting a marathon personal record.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Former Collegiate Athlete",
    achievement: "-18 lbs Body Fat • +8% Lean Mass",
    quote: "The coaching staff isn't just counting reps. Coach Vance fixed my hip shift on heavy squats in one session. The atmosphere is intense, focused, and completely free of ego.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Metric Bar Header */}
        <div className="rounded-3xl p-8 sm:p-12 glass-panel border border-brand-orange/20 shadow-orange-glow mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                4.9<span className="text-brand-orange">/5</span>
              </div>
              <div className="flex justify-center gap-1 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                1,200+ Verified Reviews
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                15,000<span className="text-brand-orange">SQ FT</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-2">
                Climate-Controlled Facility
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                100<span className="text-brand-orange">%</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-2">
                Olympic Calibrated Gear
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                24<span className="text-brand-orange">/7/365</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-2">
                Unrestricted Keycard Access
              </p>
            </div>
          </div>
        </div>

        {/* Member Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl p-8 glass-panel hover:glass-panel-glow transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-orange/40" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{review.achievement}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-bold text-white uppercase tracking-tight">
                    {review.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {review.role}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-brand-orange">
                  ✓
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
