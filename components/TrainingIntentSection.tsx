"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Flame, Dumbbell, Activity, ShieldAlert } from "lucide-react";

interface Discipline {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  image: string;
  span: string;
}

const disciplines: Discipline[] = [
  {
    id: "compound",
    number: "01",
    title: "HEAVY COMPOUND & POWERLIFTING",
    category: "STRENGTH CORE",
    description:
      "Deadlifts, low-bar squats, competition bench press, and Olympic snatches. Calibrated Eleiko steel plates, 28mm competition knurled bars, and calibrated Eleiko racks.",
    metrics: ["8 COMPETITION RIGS", "500KG RATED PLATFORMS", "ZERO BAR DEFLECTION"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    span: "lg:col-span-8",
  },
  {
    id: "functional",
    number: "02",
    title: "ATHLETIC VELOCITY & TURF",
    category: "DYNAMIC MOVEMENT",
    description:
      "40-yard sprint lanes, weighted sled pushes, plyometric hurdles, and Bulgarian sandbag complexes to build explosive hip drive and sprint acceleration.",
    metrics: ["40-YARD TURF", "ROGUE TANK SLEDS", "MED BALL REBOUNDERS"],
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
    span: "lg:col-span-4",
  },
  {
    id: "conditioning",
    number: "03",
    title: "METABOLIC ENGINE WORK",
    category: "ANAEROBIC THRESHOLD",
    description:
      "Assault AirBikes, Concept2 Rowers, and SkiErgs mapped to heart-rate telemetry to build massive cardiovascular resilience without burning hard-earned muscle.",
    metrics: ["POLAR TELEMETRY", "LACTATE THRESHOLD", "ZERO IMPACT IMPACT"],
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    span: "lg:col-span-4",
  },
  {
    id: "recovery",
    number: "04",
    title: "SUB-ZERO CRYO & INFRARED",
    category: "RECOVERY SCIENCE",
    description:
      "Cold-shock immersion plunge chambers held at a constant 42°F, paired with full-spectrum infrared cedarwood saunas to cut systemic inflammation.",
    metrics: ["42°F PLUNGE POOLS", "INFRARED CELL REPAIR", "HYPERICE COMPRESSION"],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    span: "lg:col-span-8",
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
            const cards = entry.target.querySelectorAll(".discipline-card");
            cards.forEach((card, idx) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, idx * 140);
            });
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="training"
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "#05070A" }}
      aria-labelledby="training-heading"
    >
      <div className="container-gym">
        {/* Section Headline */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="label-overline mb-3">03 // TRAINING METHODOLOGY</div>
            <h2
              className="font-display font-black uppercase text-white tracking-tight"
              id="training-heading"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)", lineHeight: "0.92" }}
            >
              TRAIN WITH <br />
              <span className="text-gradient-amber">RELENTLESS INTENT.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-body text-sm text-silver leading-relaxed">
              Every training discipline is executed within dedicated, purpose-engineered zones. We reject random workouts in favor of periodized kinetic overload and verified biological recovery.
            </p>
          </div>
        </div>

        {/* Editorial Photography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {disciplines.map((item, idx) => (
            <div
              key={item.id}
              className={`discipline-card ${item.span} relative overflow-hidden group min-h-[460px] border border-white/10 hover:border-amber-primary/40 transition-all duration-500`}
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              {/* Background Photography with Editorial Color Treatment */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:contrast-110 transition-transform duration-700 ease-out"
                />
                {/* Heavy Dark Gradient Tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030406] via-[#030406]/75 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030406]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-amber-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Top Hairline Amber Glow */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-sun via-amber-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Content Overlay */}
              <div className="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-amber-sun tracking-widest">
                      {item.number} //
                    </span>
                    <span className="label-overline text-[10px] text-silver">
                      {item.category}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-amber-primary group-hover:bg-amber-primary group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Footer Copy */}
                <div>
                  <h3 className="font-display font-black uppercase text-3xl sm:text-4xl text-white tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-mist max-w-xl leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* High-Tech Metrics Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-amber-sun bg-black/60 border border-white/10 backdrop-blur-md"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
