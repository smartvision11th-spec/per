"use client";

import React, { useState } from "react";
import { Check, Flame, Shield, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

interface PricingMatrixProps {
  onOpenBooking: () => void;
}

export default function PricingMatrix({ onOpenBooking }: PricingMatrixProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Basic Iron",
      tagline: "Essential strength and 24/7 gym access.",
      priceMonthly: 49,
      priceAnnual: 39,
      popular: false,
      features: [
        "24/7 RFID Keycard Facility Access",
        "Full Olympic Rigs, Dumbbells (up to 150 lbs)",
        "Cardio & Functional Turf Zone",
        "Executive Locker Rooms & Rain Showers",
        "Perfect Fitness iOS & Android App",
        "Standard Equipment Orientation",
      ],
      cta: "Join Basic Iron",
    },
    {
      name: "Elite Pro",
      tagline: "Full athletic access with cryogenic recovery.",
      priceMonthly: 89,
      priceAnnual: 71,
      popular: true,
      features: [
        "Everything in Basic Iron",
        "Unlimited Cryo Cold Plunge & Finnish Sauna",
        "Monthly InBody 970 3D Body Composition Scan",
        "2 Monthly 1-on-1 Personal Training Sessions",
        "All Group Fitness, Boxing & HIIT Classes Included",
        "$30 Monthly Fuel Bar & Protein Shake Credit",
        "2 Free Monthly Guest Passes",
      ],
      cta: "Join Elite Pro",
    },
    {
      name: "Black Tier VIP",
      tagline: "The ultimate bespoke athletic & recovery suite.",
      priceMonthly: 149,
      priceAnnual: 119,
      popular: false,
      features: [
        "Everything in Elite Pro",
        "Unlimited Dedicated Head Coach Sessions",
        "Bespoke Macro Nutrition & Meal Protocol",
        "Daily Cryotherapy & Compression Therapy",
        "Reserved Private Locker with Laundry Service",
        "Unlimited Daily Guest Privileges",
        "VIP Lounge & Free Recovery Smoothies On Tap",
      ],
      cta: "Join Black Tier",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Memberships</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            INVEST IN YOUR <span className="text-brand-orange">BODY & MIND</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            No hidden initiation fees. No long-term lock-in contracts. Cancel or freeze anytime with 1 click.
          </p>

          {/* Billing Toggle (Monthly vs Annual) */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-surface border border-white/10 rounded-full shadow-inner">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                !isAnnual
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isAnnual
                  ? "bg-brand-orange text-white shadow-orange-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold bg-white text-brand-orange px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? "bg-surface-elevated/95 border-2 border-brand-orange shadow-orange-glow lg:-translate-y-2"
                    : "glass-panel hover:border-white/20"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-orange to-red-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[36px]">
                    {tier.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-6 mb-8 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-sans">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      / month
                    </span>
                    {isAnnual && (
                      <span className="text-xs text-emerald-400 font-semibold ml-2">
                        (Billed ${price * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Included Privileges:
                    </div>
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-6">
                  <button
                    onClick={onOpenBooking}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 flex items-center justify-center gap-2 group ${
                      tier.popular
                        ? "bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-500 text-white shadow-orange-glow"
                        : "bg-surface-elevated hover:bg-white text-slate-200 hover:text-slate-950 border border-white/10"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    Includes 30-Day Money-Back Guarantee
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 max-w-2xl mx-auto rounded-2xl p-5 bg-surface/60 border border-white/10 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center shrink-0 text-brand-orange">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
              Risk-Free 30-Day Performance Guarantee
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              If you don&apos;t experience measurable physical improvements and love our facility within your first 30 days, we&apos;ll refund your membership in full. Zero hassle.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
