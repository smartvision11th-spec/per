"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Layers, Maximize2, Cpu, Sparkles } from "lucide-react";

interface Facility {
  id: string;
  zone: string;
  title: string;
  specs: string;
  annotation: string;
  image: string;
  layout: "wide" | "tall" | "standard";
}

const facilities: Facility[] = [
  {
    id: "olympic-hall",
    zone: "ZONE ALPHA",
    title: "COMPETITION LIFTING MECCA",
    specs: "8 Inset Platforms • Eleiko Calibrated Discs • Solid Oak Inserts",
    annotation: "Engineered with sound-dampening acoustic sub-floors rated for 600kg drops.",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop",
    layout: "wide",
  },
  {
    id: "dumbbells-rig",
    zone: "ZONE BRAVO",
    title: "150KG URETHANE SUITE",
    specs: "Custom Matte Black Racks • 2kg to 150kg Increments • Floor-to-Ceiling Low-Iron Glass",
    annotation: "Precision machined knurled handles coated in protective black oxide.",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop",
    layout: "tall",
  },
  {
    id: "conditioning-lab",
    zone: "ZONE CHARLIE",
    title: "HYROX & SPRINT RIGGING",
    specs: "Laser-Measured 40M Turf • 12 Concept2 Erg Stations • Sled Tunnels",
    annotation: "Continuous velocity timing gates for real-time acceleration tracking.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    layout: "standard",
  },
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".facility-row");
            items.forEach((item, idx) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateY(0)";
              }, idx * 160);
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
      id="facilities"
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "#030406" }}
      aria-labelledby="facilities-heading"
    >
      <div className="container-gym">
        {/* Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div>
            <div className="label-overline mb-3">04 // ARCHITECTURAL SHOWCASE</div>
            <h2
              className="font-display font-black uppercase text-white tracking-tight"
              id="facilities-heading"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)", lineHeight: "0.92" }}
            >
              THE TRAINING <br />
              <span className="text-gradient-amber">FLOOR BLUEPRINT.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body text-sm text-silver leading-relaxed">
              Spanning 15,000 square feet, our spatial layout separates explosive Olympic kinetic work from isolated biomechanical hypertrophy and therapeutic cryo chambers.
            </p>
          </div>
        </div>

        {/* Cinematic Facilities Gallery */}
        <div className="space-y-12">
          {facilities.map((facility, idx) => (
            <div
              key={facility.id}
              className="facility-row grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 p-6 sm:p-8 bg-[#090C12]/60 backdrop-blur-xl group hover:border-amber-primary/40 transition-all duration-500"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              {/* Image Frame */}
              <div className={`relative h-[320px] sm:h-[400px] overflow-hidden ${idx % 2 === 0 ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"}`}>
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:contrast-115 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030406] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 border border-white/10 text-amber-sun font-mono text-[9px] tracking-widest uppercase">
                  {facility.zone}
                </div>
              </div>

              {/* Copy & Technical Breakdown */}
              <div className={`${idx % 2 === 0 ? "lg:col-span-5" : "lg:col-span-5 lg:order-1"} flex flex-col justify-center space-y-4`}>
                <div className="flex items-center gap-2 text-amber-sun font-mono text-[10px] tracking-widest uppercase">
                  <Cpu className="w-3.5 h-3.5 text-amber-primary" />
                  <span>FACILITY SPECIFICATION</span>
                </div>

                <h3 className="font-display font-black uppercase text-3xl sm:text-4xl text-white tracking-wide">
                  {facility.title}
                </h3>

                <p className="font-mono text-xs text-amber-sun/90 tracking-wide">
                  {facility.specs}
                </p>

                <p className="font-body text-xs sm:text-sm text-silver leading-relaxed pt-2">
                  {facility.annotation}
                </p>

                <div className="pt-4 flex items-center gap-4 text-silver font-mono text-[10px]">
                  <span>ACOUSTICS: 55dB REDUCTION</span>
                  <span>•</span>
                  <span>HVAC: HOSPITAL GRADE HEPA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
