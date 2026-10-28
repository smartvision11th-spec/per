"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowRight, ShieldCheck, Flame, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BarbellScene = dynamic(() => import("./BarbellScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-amber-primary border-t-transparent animate-spin" />
        <span className="font-mono text-xs tracking-widest uppercase text-amber-sun">
          Calibrating 3D Kinematics...
        </span>
      </div>
    </div>
  ),
});

export default function HeroExplodedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const [explodeRatio, setExplodeRatio] = useState(0);
  const [annotationsVisible, setAnnotationsVisible] = useState(false);
  const [activeStage, setActiveStage] = useState<"ASSEMBLED" | "EXPLODING" | "MAX_SEPARATION" | "REASSEMBLY">("ASSEMBLED");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: 1.0,
        onUpdate: (self) => {
          const raw = self.progress;

          // Seamless 4-Phase Cinematic Cycle
          // 0.00 - 0.22: Scene A - Hero entrance & complete recognizable assembly
          // 0.22 - 0.65: Scene B - Controlled disassembly along axial trajectory
          // 0.65 - 0.85: Scene C - Maximum separation & architectural HUD telemetry
          // 0.85 - 1.00: Scene D - Reassembly and kinetic hand-off
          let p = 0;
          if (raw < 0.22) {
            p = 0;
            setActiveStage("ASSEMBLED");
          } else if (raw < 0.65) {
            p = (raw - 0.22) / 0.43;
            setActiveStage("EXPLODING");
          } else if (raw < 0.85) {
            p = 1;
            setActiveStage("MAX_SEPARATION");
          } else {
            p = 1 - (raw - 0.85) / 0.15;
            setActiveStage("REASSEMBLY");
          }

          scrollProgress.current = p;
          setExplodeRatio(p);
          setAnnotationsVisible(p > 0.45 && p < 0.95);
        },
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const percentage = Math.round(explodeRatio * 100);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "460vh", background: "#030406" }}
      aria-label="Hero and 3D apparatus sequence"
    >
      {/* 100vh Sticky Viewport for the Continuous Spatial Experience */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle Atmospheric Solar Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,115,0,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,115,0,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
          aria-hidden="true"
        />

        {/* Ambient Darkened Editorial Image Accent in Corner */}
        <div className="absolute top-0 right-0 w-[55vw] h-[75vh] opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
            alt="Gym texture"
            fill
            className="object-cover object-center grayscale contrast-150"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#030406]/80 to-[#030406]" />
        </div>

        {/* ── Top HUD Bar ── */}
        <div className="relative z-20 container-gym pt-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-primary animate-ping" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-amber-sun font-bold">
              SYS // 450KG COMPETITION ELEIKO APPARATUS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-silver">
            <span className="border-r border-white/10 pr-6">TOLERANCE: ±0.01%</span>
            <span className="border-r border-white/10 pr-6">BEARINGS: 10 NEEDLE</span>
            <span className="text-amber-sun font-bold">STAGE: {activeStage} ({percentage}%)</span>
          </div>
        </div>

        {/* ── Center: Full Screen 3D Spatial Canvas ── */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {mounted && (
            <BarbellScene
              scrollProgress={scrollProgress}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />
          )}
        </div>

        {/* ── Architectural SVG Telemetry Annotations (Appear during explode) ── */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left Wing Annotation: 20KG Disc */}
          <div
            className="absolute"
            style={{
              left: "clamp(24px, 8vw, 140px)",
              top: "40%",
              opacity: annotationsVisible ? 1 : 0,
              transform: `translateX(${annotationsVisible ? 0 : -30}px)`,
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-amber-primary shadow-amber-glow" />
              <div className="glass-amber p-4 border border-amber-primary/40 backdrop-blur-xl max-w-[240px]">
                <div className="label-overline text-[9px] text-amber-sun">COMPONENT 01 // DISC</div>
                <div className="font-display text-2xl font-black uppercase text-white mt-0.5">
                  CALIBRATED 20KG
                </div>
                <p className="font-mono text-[10px] text-silver mt-1.5 leading-relaxed">
                  Solid virgin urethane with competition chrome core. Zero rebound displacement.
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-between font-mono text-[9px] text-amber-sun">
                  <span>DIA: 450MM</span>
                  <span>HARDNESS: 90 SHORE A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Wing Annotation: Locking Collar */}
          <div
            className="absolute"
            style={{
              right: "clamp(24px, 8vw, 140px)",
              top: "34%",
              opacity: annotationsVisible ? 1 : 0,
              transform: `translateX(${annotationsVisible ? 0 : 30}px)`,
              transition: "opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease",
            }}
          >
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="w-12 h-px bg-amber-primary shadow-amber-glow" />
              <div className="glass-amber p-4 border border-amber-primary/40 backdrop-blur-xl max-w-[240px] text-right">
                <div className="label-overline text-[9px] text-amber-sun">COMPONENT 02 // SLEEVE</div>
                <div className="font-display text-2xl font-black uppercase text-white mt-0.5">
                  CHROME COLLAR
                </div>
                <p className="font-mono text-[10px] text-silver mt-1.5 leading-relaxed">
                  Dual-locking mechanical retention with internal needle bearings. Spin rated for 15,000 RPM.
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-between font-mono text-[9px] text-amber-sun">
                  <span>LOAD: 2.5T</span>
                  <span>TOLERANCE: 0.005MM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Lower Annotation */}
          <div
            className="absolute"
            style={{
              bottom: "16%",
              left: "50%",
              transform: `translateX(-50%) translateY(${annotationsVisible ? 0 : 20}px)`,
              opacity: annotationsVisible ? 1 : 0,
              transition: "opacity 0.6s 0.25s ease, transform 0.6s 0.25s ease",
            }}
          >
            <div className="h-annotation text-[10px] tracking-[0.25em] text-amber-sun whitespace-nowrap bg-black/60 px-6 py-2 border border-amber-primary/30 backdrop-blur-md">
              PRECISION MECHANICAL ALIGNMENT • TOTAL SYSTEM WEIGHT: 140KG
            </div>
          </div>
        </div>

        {/* ── Bottom Hero Copy and Call to Action ── */}
        <div className="relative z-20 container-gym pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-primary/10 border border-amber-primary/30 mb-4 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-amber-sun" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-amber-sun font-bold">
                  PERFECT FITNESS GYM // SANCTUARY OF PHYSICAL POWER
                </span>
              </div>

              <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tight uppercase text-white leading-[0.88]">
                BUILT THROUGH <br />
                <span className="text-gradient-amber">DISCIPLINE.</span>
              </h1>

              <p className="font-body text-sm sm:text-base text-silver max-w-xl mt-4 leading-relaxed">
                Train with unyielding purpose. We have forged a 15,000 sq ft cathedral of Olympic iron, sub-zero cryo suites, and world-class athletic coaching. Built for those who refuse to negotiate with weakness.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href="#membership" className="btn-primary w-full justify-center">
                <span>EXPLORE MEMBERSHIPS</span>
                <ArrowRight size={15} />
              </a>

              <a href="#training" className="btn-ghost w-full justify-center">
                <span>DISCOVER THE TRAINING FLOOR</span>
              </a>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-[10px] text-silver">
                <span>SCROLL DOWN TO DISASSEMBLE</span>
                <ChevronDown size={14} className="text-amber-primary animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
