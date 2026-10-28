"use client";

import React, { useRef, useEffect } from "react";
import { Dumbbell, Activity, Flame, ShieldAlert, ArrowUpRight } from "lucide-react";

interface TrainingCard {
  label: string;
  title: string;
  description: string;
  tag: string;
  size: "large" | "medium" | "small";
  bgGradient: string;
  icon: React.ReactNode;
}

const cards: TrainingCard[] = [
  {
    label: "01 / STRENGTH",
    title: "COMPOUND POWER & POWERLIFTING",
    description:
      "Deadlifts, squats, bench press, and Olympic clean & jerks. Heavy compound progressions designed around periodized overload and raw kinetic strength.",
    tag: "STRENGTH TRAINING",
    size: "large",
    bgGradient: "linear-gradient(145deg, #120D08 0%, #1A140F 40%, #0B0E14 100%)",
    icon: <Dumbbell className="w-8 h-8 text-amber-sun" />,
  },
  {
    label: "02 / FUNCTIONAL",
    title: "ATHLETIC CONDITIONING",
    description:
      "40-yard sled drags, kettlebell flows, and plyometric complexes engineered for real-world acceleration and explosive power.",
    tag: "FUNCTIONAL MOVEMENT",
    size: "medium",
    bgGradient: "linear-gradient(135deg, #14100C 0%, #1A1F2C 100%)",
    icon: <Activity className="w-7 h-7 text-amber-primary" />,
  },
  {
    label: "03 / METABOLIC",
    title: "HIGH-OUTPUT CONDITIONING",
    description:
      "Assault bikes, ski ergs, and anaerobic threshold intervals that strip fat without sacrificing lean muscle tissue.",
    tag: "AEROBIC ENGINE",
    size: "small",
    bgGradient: "linear-gradient(200deg, #100C09 0%, #151822 100%)",
    icon: <Flame className="w-6 h-6 text-amber-gold" />,
  },
  {
    label: "04 / RECOVERY",
    title: "CRYOTHERAPY & SAUNA",
    description:
      "Sub-zero cold plunge chambers, Finnish cedarwood sauna, and pneumatic compression suites to accelerate tissue repair.",
    tag: "RECOVERY PROTOCOL",
    size: "small",
    bgGradient: "linear-gradient(160deg, #0E0C0B 0%, #171E2B 100%)",
    icon: <ShieldAlert className="w-6 h-6 text-amber-sun" />,
  },
];

export default function TrainingIntentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elCards = entry.target.querySelectorAll(".training-card");
            elCards.forEach((card, i) => {
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
      id="training"
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--c-ink)",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
      }}
      aria-labelledby="training-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,115,0,0.3) 30%, rgba(255,115,0,0.3) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container-gym">
        {/* Section Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="label-overline mb-3">03 / PERFORMANCE DISCIPLINES</div>
            <h2
              className="font-display font-black uppercase text-white tracking-tight"
              id="training-heading"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: "0.92",
              }}
            >
              TRAIN WITH <br />
              <span className="text-gradient-amber">RELENTLESS INTENT.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-body text-sm text-silver leading-relaxed">
              Four specialized athletic training pillars. Structured systematically with periodized volume and bio-mechanical precision so your efforts yield undeniable physical transformation.
            </p>
          </div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Card 1: Large Featured */}
          <div
            className="training-card lg:col-span-6 lg:row-span-2 relative overflow-hidden group cursor-pointer"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              minHeight: "440px",
              background: cards[0].bgGradient,
              border: "1px solid rgba(255,115,0,0.22)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-sun via-amber-primary to-transparent" />

            <div className="p-8 sm:p-10 h-full flex flex-col justify-between relative z-10">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-sun">
                    {cards[0].label}
                  </span>
                  <div className="p-3 rounded-full bg-amber-primary/10 border border-amber-primary/30">
                    {cards[0].icon}
                  </div>
                </div>

                <h3 className="font-display font-black uppercase text-3xl sm:text-4xl text-white tracking-wide mb-4">
                  {cards[0].title}
                </h3>
                <p className="font-body text-sm text-silver leading-relaxed max-w-md">
                  {cards[0].description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                <span className="label-overline text-[10px] text-amber-sun">
                  {cards[0].tag}
                </span>
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-amber-primary/40 group-hover:bg-amber-primary group-hover:text-black text-amber-sun transition-all duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>

            {/* Hover Shader Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 60% 40%, rgba(255,115,0,0.18) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Card 2: Medium */}
          <div
            className="training-card lg:col-span-6 relative overflow-hidden group cursor-pointer"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease",
              minHeight: "220px",
              background: cards[1].bgGradient,
              border: "1px solid rgba(255,115,0,0.15)",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-amber-sun mb-2">
                    {cards[1].label}
                  </div>
                  <h3 className="font-display font-black uppercase text-2xl sm:text-3xl text-white">
                    {cards[1].title}
                  </h3>
                </div>
                <div className="p-2.5 rounded-full bg-amber-primary/10 border border-amber-primary/30">
                  {cards[1].icon}
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-silver leading-relaxed mt-4">
                {cards[1].description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="label-overline text-[9px] text-amber-sun">{cards[1].tag}</span>
                <ArrowUpRight size={16} className="text-amber-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: Small */}
          <div
            className="training-card lg:col-span-3 relative overflow-hidden group cursor-pointer"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease",
              minHeight: "200px",
              background: cards[2].bgGradient,
              border: "1px solid rgba(255,115,0,0.12)",
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber-sun">
                  {cards[2].label}
                </span>
                {cards[2].icon}
              </div>
              <div>
                <h3 className="font-display font-black uppercase text-xl text-white mb-2">
                  {cards[2].title}
                </h3>
                <p className="font-body text-[11px] text-silver leading-relaxed">
                  {cards[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Small */}
          <div
            className="training-card lg:col-span-3 relative overflow-hidden group cursor-pointer"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s 0.3s ease, transform 0.8s 0.3s ease",
              minHeight: "200px",
              background: cards[3].bgGradient,
              border: "1px solid rgba(255,115,0,0.12)",
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber-sun">
                  {cards[3].label}
                </span>
                {cards[3].icon}
              </div>
              <div>
                <h3 className="font-display font-black uppercase text-xl text-white mb-2">
                  {cards[3].title}
                </h3>
                <p className="font-body text-[11px] text-silver leading-relaxed">
                  {cards[3].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
