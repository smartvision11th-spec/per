"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Flame, Zap } from "lucide-react";
import Hero from "@/components/ui/animated-shader-hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BarbellScene = dynamic(() => import("./BarbellScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(255,115,0,0.5)", borderTopColor: "transparent" }}
        />
        <span className="font-mono text-xs tracking-widest uppercase text-amber-sun">
          Initialising Kinetic Geometry...
        </span>
      </div>
    </div>
  ),
});

export default function HeroExplodedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const [annotationsVisible, setAnnotationsVisible] = useState(false);
  const [explodeProgress, setExplodeProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prefersReduced = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined" || prefersReduced.current) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: 1.2,
        onUpdate: (self) => {
          const raw = self.progress;

          // 4-Phase Exploded Lifecycle:
          // 0.0 - 0.25: Assembled state with ambient motion
          // 0.25 - 0.70: Dynamic staggered disassembly
          // 0.70 - 0.88: Maximum separation with telemetry annotations
          // 0.88 - 1.00: Precision reassembly into flow
          let p = 0;
          if (raw < 0.25) {
            p = 0;
          } else if (raw < 0.7) {
            p = (raw - 0.25) / 0.45;
          } else if (raw < 0.88) {
            p = 1;
          } else {
            p = 1 - (raw - 0.88) / 0.12;
          }

          scrollProgress.current = p;
          setExplodeProgress(p);
          setAnnotationsVisible(p > 0.55 && p < 0.94);
        },
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const progressPercent = Math.round(explodeProgress * 100);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────
          SECTION 1: THE ANIMATED SHADER HERO (WARM SOLAR INDUSTRIAL GYM)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative w-full h-screen">
        <Hero
          trustBadge={{
            text: "OLYMPIC STANDARDS • 24/7 BIOMETRIC FACILITY • ELEIKO CALIBRATED",
            icons: ["🔥", "⚡", "✦"],
          }}
          headline={{
            line1: "FORGE PEAK STRENGTH",
            line2: "THROUGH DISCIPLINE",
          }}
          subtitle="A 15,000 sq ft sanctuary of high-performance athletics, precision engineering, and elite human potential. Train with intent. Built without compromise."
          buttons={{
            primary: {
              text: "Explore Memberships",
              onClick: () => {
                const el = document.getElementById("membership");
                el?.scrollIntoView({ behavior: "smooth" });
              },
            },
            secondary: {
              text: "Inspect 3D Apparatus",
              onClick: () => {
                const el = document.getElementById("exploded-view");
                el?.scrollIntoView({ behavior: "smooth" });
              },
            },
          }}
        />

        {/* Floating Telemetry Indicator at bottom of Shader Hero */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-sun">
            SCROLL TO ENGAGE 3D APPARATUS
          </span>
          <ChevronDown
            size={18}
            className="text-amber-primary animate-bounce"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          SECTION 2: SIGNATURE SCROLL-DRIVEN 3D EXPLODED VIEW
      ─────────────────────────────────────────────────────────────────── */}
      <section
        id="exploded-view"
        ref={containerRef}
        className="relative"
        style={{ height: "420vh", background: "var(--c-void)" }}
        aria-label="3D barbell exploded view"
      >
        {/* Sticky 100vh viewport */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full overflow-hidden flex flex-col"
          style={{ height: "100vh", background: "radial-gradient(ellipse at 50% 50%, #0D111A 0%, #030406 100%)" }}
        >
          {/* Subtle architectural grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,115,0,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,115,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
            aria-hidden="true"
          />

          {/* Section Overline Header */}
          <div className="absolute top-10 left-0 z-20 container-gym w-full flex items-center justify-between">
            <div>
              <div className="label-overline">02 / ARCHITECTURAL BREAKDOWN</div>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wider mt-1">
                COMPETITION SPEC STEEL <span className="text-amber-primary">• 450KG LOAD RATED</span>
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-silver">
              <span>EXPLODE TELEMETRY</span>
              <span className="text-amber-sun font-bold">{progressPercent}%</span>
            </div>
          </div>

          {/* Progress bar line */}
          <div
            className="absolute top-0 left-0 h-[2px] z-20 transition-all shadow-amber-glow"
            style={{
              width: `${progressPercent}%`,
              background: "linear-gradient(90deg, #F59E0B, #FF7300)",
            }}
            aria-hidden="true"
          />

          {/* 3D Canvas */}
          <div className="absolute inset-0">
            {mounted && (
              <BarbellScene
                scrollProgress={scrollProgress}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Interactive Scientific Annotations */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Left Telemetry Annotation */}
            <div
              className="absolute"
              style={{
                left: "clamp(20px, 7%, 120px)",
                top: "36%",
                opacity: annotationsVisible ? 1 : 0,
                transform: `translateX(${annotationsVisible ? 0 : -25}px)`,
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="flex items-center gap-4">
                <div style={{ width: "36px", height: "1px", background: "var(--c-amber-primary)" }} />
                <div className="glass-amber p-4 border border-amber-primary/30 max-w-[220px]">
                  <div className="label-overline text-[10px] text-amber-sun">CALIBRATED STEEL</div>
                  <div className="font-display text-xl font-bold uppercase text-white mt-0.5">20KG DISC CORE</div>
                  <p className="font-mono text-[9px] text-silver mt-1 leading-relaxed">
                    Tolerance ±10 grams. Dual knurl outer flange for Olympic snatch & clean stabilization.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Telemetry Annotation */}
            <div
              className="absolute"
              style={{
                right: "clamp(20px, 7%, 120px)",
                top: "30%",
                opacity: annotationsVisible ? 1 : 0,
                transform: `translateX(${annotationsVisible ? 0 : 25}px)`,
                transition: "opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease",
              }}
            >
              <div className="flex items-center gap-4 flex-row-reverse">
                <div style={{ width: "36px", height: "1px", background: "var(--c-amber-primary)" }} />
                <div className="glass-amber p-4 border border-amber-primary/30 max-w-[220px] text-right">
                  <div className="label-overline text-[10px] text-amber-sun">CHROME SLEEVE</div>
                  <div className="font-display text-xl font-bold uppercase text-white mt-0.5">COMPRESSION LOCK</div>
                  <p className="font-mono text-[9px] text-silver mt-1 leading-relaxed">
                    Mirror polished alloy collar. Ultra-low friction needle bearings for smooth spin.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Philosophy Annotation */}
            <div
              className="absolute"
              style={{
                bottom: "14%",
                left: "50%",
                transform: `translateX(-50%) translateY(${annotationsVisible ? 0 : 20}px)`,
                opacity: annotationsVisible ? 1 : 0,
                transition: "opacity 0.6s 0.25s ease, transform 0.6s 0.25s ease",
              }}
            >
              <div className="h-annotation text-[10px] tracking-[0.25em] text-amber-sun whitespace-nowrap">
                CALIBRATED BALANCE • NO COMPROMISE • RAW POWER
              </div>
            </div>
          </div>

          {/* Lower Right Caption */}
          <div className="absolute bottom-12 right-0 z-10 container-gym w-full pointer-events-none">
            <div className="flex justify-end">
              <div className="glass p-5 border border-white/10 max-w-[340px] pointer-events-auto">
                <p className="font-body text-xs text-silver leading-relaxed">
                  Every gram engineered for kinetic transfer. Precision barbell assemblies calibrated for maximum load fidelity, zero bar-wobble, and lifelong mechanical reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Marquee Ribbon */}
      <div
        className="relative py-5 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #07090D 0%, #15100B 50%, #07090D 100%)",
          borderTop: "1px solid rgba(255,115,0,0.18)",
          borderBottom: "1px solid rgba(255,115,0,0.18)",
        }}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-marquee select-none">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-14 font-display font-black uppercase text-2xl tracking-widest px-8 text-silver"
            >
              <span className="text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-primary" /> OLYMPIC STEEL
              </span>
              <span className="text-amber-primary">✦</span>
              <span className="text-gradient-amber">KINETIC VELOCITY</span>
              <span className="text-amber-gold">✦</span>
              <span className="text-white">UNRELENTING DISCIPLINE</span>
              <span className="text-amber-primary">✦</span>
              <span className="text-gradient-fire">SUB-ZERO RECOVERY</span>
              <span className="text-amber-gold">✦</span>
              <span className="text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-sun" /> 24/7 HIGH PERFORMANCE
              </span>
              <span className="text-amber-primary">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
