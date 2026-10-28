"use client";

import React, { useRef, useEffect } from "react";
import { Check, Flame, Zap, Shield } from "lucide-react";

const tiers = [
  {
    id: "essential",
    label: "ESSENTIAL ACCESS",
    tagline: "UNCOMPROMISING FOUNDATION",
    description:
      "Full 24/7 biometric access to all 5 dedicated training floors, Eleiko Olympic stations, and biometric locker suites.",
    features: [
      "All five dedicated strength zones",
      "24/7 biometric fingerprint access",
      "Eleiko competition rigs & dumbbells",
      "Digital locker suites & rainfall showers",
      "Full gym mobile app integration",
    ],
    cta: "Enquire for Access",
    featured: false,
    icon: <Shield className="w-6 h-6 text-silver" />,
  },
  {
    id: "performance",
    label: "SOLAR PERFORMANCE",
    tagline: "HIGH-OUTPUT ATHLETE TIER",
    description:
      "Engineered for serious lifters requiring monthly velocity check-ins, custom periodization blueprints, and cryo recovery suite privileges.",
    features: [
      "Everything included in Essential",
      "Monthly 3D body composition scan",
      "Dedicated periodized training roadmap",
      "Priority peak lifting platform reservation",
      "Contrast therapy cold plunge & infrared sauna",
      "Recovery nutrition shake bar allowance",
    ],
    cta: "Apply for Performance",
    featured: true,
    icon: <Flame className="w-6 h-6 text-amber-sun" />,
  },
  {
    id: "elite",
    label: "VIP TITANIUM ELITE",
    tagline: "1-ON-1 MASTER COACHING",
    description:
      "Unrestricted VIP master access. Weekly private strength coaching, tailored nutritional diagnostics, and executive amenity suite.",
    features: [
      "All Performance tier amenities",
      "Weekly private 1-on-1 coaching session",
      "Custom macro & biometric nutrition protocol",
      "Reserved executive locker & laundry service",
      "Unlimited guest day passes",
      "24/7 direct coach message line",
    ],
    cta: "Enquire for Elite VIP",
    featured: false,
    icon: <Zap className="w-6 h-6 text-amber-primary" />,
  },
];

export default function MembershipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".membership-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--c-ink)",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
        borderTop: "1px solid rgba(255,115,0,0.1)",
      }}
      aria-labelledby="membership-heading"
    >
      <div className="container-gym">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="label-overline mb-3">05 / MEMBERSHIP ACCESS</div>
            <h2
              className="font-display font-black uppercase text-white tracking-tight"
              id="membership-heading"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: "0.92",
              }}
            >
              INVEST IN YOUR <br />
              <span className="text-gradient-amber">PHYSICAL CALIBER.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-body text-sm text-silver leading-relaxed">
              Transparent, honest memberships without arbitrary lock-ins. Select your tier below to request an introductory tour and physical assessment with a coach.
            </p>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`membership-card relative flex flex-col p-8 sm:p-9 transition-all duration-300 ${
                tier.featured ? "glass-amber border-amber-primary/50 shadow-amber-glow" : "glass border-white/10"
              }`}
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity 0.8s ${i * 0.12}s ease, transform 0.8s ${i * 0.12}s ease`,
              }}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-sun to-amber-primary text-black font-mono font-bold text-[10px] tracking-widest uppercase">
                  MOST POPULAR • ATHLETE CHOICE
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-black uppercase text-2xl text-white">
                    {tier.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase text-amber-sun tracking-widest">
                    {tier.tagline}
                  </span>
                </div>
                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                  {tier.icon}
                </div>
              </div>

              <div className="py-6 border-y border-white/10 mb-6">
                <div className="font-display font-black text-4xl sm:text-5xl text-white">
                  CUSTOM QUOTE
                </div>
                <div className="font-mono text-[11px] text-amber-sun uppercase tracking-wider mt-1">
                  Tailored to goal commitment
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-silver leading-relaxed mb-8">
                {tier.description}
              </p>

              <ul className="flex flex-col gap-3.5 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-mist">
                    <Check className="w-4 h-4 text-amber-sun flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full justify-center ${tier.featured ? "btn-primary" : "btn-ghost"}`}
              >
                <span>{tier.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
