"use client";

import React, { useState } from "react";
import { Check, Flame, Shield, ArrowRight, Sparkles, Zap } from "lucide-react";

interface PricingMatrixProps {
  onOpenBooking: () => void;
}

export default function PricingMatrix({ onOpenBooking }: PricingMatrixProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Basic Iron",
      tagline: "Essential strength & 24/7 facility access.",
      priceMonthly: 49,
      priceAnnual: 39,
      popular: false,
      glowColor: "rgba(255, 255, 255, 0.05)",
      features: [
        "24/7 RFID Biometric Keycard Access",
        "Full Olympic Eleiko Rigs & Barbells",
        "Dumbbell Array up to 150 LBS",
        "Functional Turf & Sled Sprint Lanes",
        "Executive Locker Rooms & Rain Showers",
        "Perfect Fitness iOS & Android App",
      ],
      cta: "Join Basic Iron",
    },
    {
      name: "Elite Pro",
      tagline: "Complete strength & cryogenic recovery suite.",
      priceMonthly: 89,
      priceAnnual: 71,
      popular: true,
      glowColor: "rgba(255, 77, 0, 0.25)",
      features: [
        "Everything in Basic Iron",
        "Unlimited Sub-Zero 48°F Cold Plunges",
        "Finnish Cedar Saunas & Red Light Therapy",
        "Monthly InBody 970 3D Body Composition Scan",
        "2 Monthly 1-on-1 Master Coach Sessions",
        "All Boxing, HIIT & Mobility Classes Included",
        "$30 Monthly Fuel Bar & Protein Shake Credit",
        "2 Monthly VIP Guest Passes",
      ],
      cta: "Join Elite Pro",
    },
    {
      name: "Black Tier VIP",
      tagline: "Bespoke executive athletic training protocol.",
      priceMonthly: 149,
      priceAnnual: 119,
      popular: false,
      glowColor: "rgba(0, 242, 254, 0.15)",
      features: [
        "Everything in Elite Pro",
        "Weekly Dedicated 1-on-1 Head Coach Protocol",
        "Bespoke Macro Nutrition & Meal Delivery Setup",
        "Daily Cryotherapy & NormaTec 3 Compression",
        "Reserved Private Executive Locker & Laundry",
        "Unlimited Daily Guest Privileges",
        "VIP Lounge & Unlimited Protein Smoothies",
      ],
      cta: "Join Black Tier",
    },
  ];

  return (
    <section id="pricing" className="py-28 bg-dark-950 relative overflow-hidden">
      {/* Background Neon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-orange/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>21ST.DEV PRICING COMPARISON MATRIX</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase tracking-tight text-white">
            TRANSPARENT <span className="text-brand-orange">MEMBERSHIPS</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            No initiation fees. No hidden maintenance charges. 30-day 100% money-back guarantee.
          </p>

          {/* 21st.dev Interactive Toggle Pill */}
          <div className="mt-9 inline-flex items-center gap-3 p-1.5 glass-card rounded-full shadow-2xl border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                !isAnnual
                  ? "bg-dark-800 text-white shadow-lg border border-white/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                isAnnual
                  ? "bg-gradient-to-r from-brand-orange to-red-600 text-white shadow-orange-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono font-bold bg-white text-dark-950 px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? "glass-card-glow lg:-translate-y-3"
                    : "glass-card hover:border-white/20"
                }`}
              >
                {/* Popular Animated Ribbon */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-orange via-red-600 to-amber-500 text-white text-[11px] font-mono font-extrabold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-orange-glow flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[34px] leading-relaxed">
                    {tier.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 mb-8 flex items-baseline gap-2">
                    <span className="font-display text-5xl sm:text-6xl font-black text-white">
                      ${price}
                    </span>
                    <span className="text-sm font-mono text-slate-400">
                      / month
                    </span>
                    {isAnnual && (
                      <span className="text-xs font-mono text-emerald-400 ml-2">
                        (${price * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Included Privileges */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">
                      Included Privileges:
                    </div>
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-10 pt-6 border-t border-white/5">
                  <button
                    onClick={onOpenBooking}
                    className={`w-full py-4 rounded-2xl font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                      tier.popular
                        ? "bg-gradient-to-r from-brand-orange via-red-600 to-amber-500 hover:from-brand-orange-hover hover:to-red-500 text-white shadow-orange-glow-lg"
                        : "bg-dark-800 hover:bg-white text-slate-200 hover:text-dark-950 border border-white/10"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] font-mono text-slate-400 mt-2.5 uppercase tracking-wider">
                    30-Day Full Refund Guarantee
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 max-w-2xl mx-auto rounded-2xl p-6 glass-card border border-white/10 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center shrink-0 text-brand-orange">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Risk-Free 30-Day Performance Assurance
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              If our facility, staff, and recovery suites don&apos;t exceed your highest standards within 30 days, receive an immediate 100% refund.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
