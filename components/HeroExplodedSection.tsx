"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

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
          style={{ borderColor: "rgba(200,230,58,0.4)", borderTopColor: "transparent" }}
        />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--c-silver)" }}>
          Initialising
        </span>
      </div>
    </div>
  ),
});

// ─── Technical annotation labels ─────────────────────────────────────────────
interface AnnotationProps {
  label: string;
  sub: string;
  side: "left" | "right";
  visible: boolean;
  delay?: number;
}

function Annotation({ label, sub, side, visible, delay = 0 }: AnnotationProps) {
  return (
    <div
      className="absolute top-1/2 flex items-center gap-3 pointer-events-none"
      style={{
        [side === "left" ? "left" : "right"]: "2%",
        transform: "translateY(-50%)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease`,
        transitionProperty: "opacity, transform",
        [side === "left" ? "flexDirection" : "flexDirection"]: side === "right" ? "row-reverse" : "row",
      }}
    >
      {/* Tick mark + line */}
      <div className="flex flex-col items-center gap-0" style={{ flexDirection: side === "left" ? "row" : "row-reverse", gap: "8px" }}>
        <div style={{ width: "1px", height: "40px", background: "rgba(200,230,58,0.4)" }} />
        <div style={{ width: "8px", height: "1px", background: "rgba(200,230,58,0.6)" }} />
      </div>
      <div className={side === "right" ? "text-right" : "text-left"}>
        <div className="label-overline" style={{ fontSize: "10px" }}>{label}</div>
        <div className="font-mono" style={{ fontSize: "9px", color: "var(--c-iron)", letterSpacing: "0.1em" }}>{sub}</div>
      </div>
    </div>
  );
}

// ─── Hero + Exploded View Section ─────────────────────────────────────────────
export default function HeroExplodedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0); // 0–1, read directly by Three.js

  // Annotation visibility
  const [annotationsVisible, setAnnotationsVisible] = useState(false);
  const [explodeProgress, setExplodeProgress] = useState(0);

  // For SSR-safe rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Reduced motion check
  const prefersReduced = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // ─── Headline entrance ───────────────────────────────────────────────
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, skewY: 4 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            delay: 0.3,
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.9 }
        );
      }

      if (prefersReduced.current) return;

      // ─── Scroll-driven exploded view ─────────────────────────────────────
      if (!containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: 1.2,
        onUpdate: (self) => {
          // Map full scroll range to our 4-phase animation
          const raw = self.progress; // 0–1

          // Phase 1 (0–0.3): Hero display, no explode
          // Phase 2 (0.3–0.7): Explode out
          // Phase 3 (0.7–0.85): Hold max explode
          // Phase 4 (0.85–1): Reassemble
          let p = 0;
          if (raw < 0.3) {
            p = 0;
          } else if (raw < 0.7) {
            p = (raw - 0.3) / 0.4;
          } else if (raw < 0.85) {
            p = 1;
          } else {
            p = 1 - (raw - 0.85) / 0.15;
          }

          scrollProgress.current = p;
          setExplodeProgress(p);
          setAnnotationsVisible(p > 0.55 && p < 0.92);
        },
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Progress indicator
  const progressPercent = Math.round(explodeProgress * 100);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────
          HERO VIEWPORT (Section 1)
      ─────────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "var(--c-void)" }}
        aria-label="Hero section"
      >
        {/* Background grid lines — architectural feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        {/* Left vertical accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,230,58,0.3) 40%, rgba(200,230,58,0.3) 60%, transparent)", left: "clamp(20px,5vw,80px)" }}
          aria-hidden="true"
        />

        <div className="container-gym w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center min-h-screen py-32">

            {/* ── Left: Typography ── */}
            <div className="lg:col-span-5 flex flex-col justify-center" ref={headlineRef}>

              {/* Overline */}
              <div className="label-overline mb-6 overflow-hidden">
                <span className="hero-word inline-block" style={{ opacity: 0 }}>
                  Perfect Fitness Gym
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="font-display font-black uppercase leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  letterSpacing: "-0.01em",
                  color: "var(--c-white)",
                  lineHeight: "0.92",
                }}
              >
                <span className="overflow-hidden block">
                  <span className="hero-word inline-block" style={{ opacity: 0 }}>BUILT</span>
                </span>
                <span className="overflow-hidden block">
                  <span className="hero-word inline-block" style={{ opacity: 0 }}>THROUGH</span>
                </span>
                <span className="overflow-hidden block">
                  <span
                    className="hero-word inline-block"
                    style={{ opacity: 0, color: "var(--c-acid)" }}
                  >
                    DISCIPLINE.
                  </span>
                </span>
              </h1>

              {/* Supporting copy */}
              <div
                ref={ctaRef}
                style={{ opacity: 0 }}
              >
                <p
                  className="mt-7 font-body"
                  style={{
                    fontSize: "clamp(14px, 1.5vw, 16px)",
                    color: "var(--c-silver)",
                    lineHeight: "1.75",
                    maxWidth: "380px",
                  }}
                >
                  Train with purpose. Build strength.
                  <br />Move beyond your limits.
                </p>

                {/* CTAs */}
                <div
                  className="mt-10 flex flex-col sm:flex-row gap-3"
                >
                <a href="#contact" className="btn-primary">
                  <span>Explore Memberships</span>
                  <ArrowRight size={14} />
                </a>
                <a href="#facilities" className="btn-ghost">
                  <span>Discover the Gym</span>
                </a>
              </div>
              </div>

              {/* Stats row */}
              <div
                className="mt-14 pt-8 grid grid-cols-3 gap-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {[
                  { val: "24", unit: "/7", label: "Access" },
                  { val: "200+", unit: "", label: "Equipment pieces" },
                  { val: "12", unit: " coaches", label: "On floor" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="font-display font-bold"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--c-white)", lineHeight: 1 }}
                    >
                      {stat.val}
                      <span style={{ color: "var(--c-acid)", fontSize: "0.6em" }}>{stat.unit}</span>
                    </div>
                    <div
                      className="font-mono mt-1"
                      style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-iron)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: 3D Canvas ── */}
            <div
              className="lg:col-span-7 relative"
              style={{ height: "clamp(360px, 60vh, 700px)" }}
              ref={canvasRef}
            >
              {mounted && (
                <BarbellScene
                  scrollProgress={scrollProgress}
                  className="absolute inset-0 w-full h-full"
                />
              )}

              {/* Interaction hint */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 leader-line"
                aria-hidden="true"
              >
                Scroll to explore
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <ChevronDown
            size={18}
            style={{ color: "var(--c-acid)", animation: "bounce 2s ease infinite" }}
          />
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(6px); }
          }
        `}</style>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          SCROLL-DRIVEN EXPLODED VIEW (Section 2)
          Pin container: 400vh tall, sticky inner panel
      ─────────────────────────────────────────────────────────────────── */}
      <section
        id="exploded-view"
        ref={containerRef}
        className="relative"
        style={{ height: "400vh", background: "var(--c-void)" }}
        aria-label="3D barbell exploded view"
      >
        {/* Sticky panel */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full overflow-hidden flex flex-col"
          style={{ height: "100vh", background: "var(--c-void)" }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />

          {/* Section label — top left */}
          <div className="absolute top-10 left-0 z-20 container-gym w-full">
            <div className="label-overline">
              Assembly breakdown
            </div>
          </div>

          {/* Explode progress bar */}
          <div
            className="absolute top-0 left-0 h-px z-20 transition-all"
            style={{
              width: `${progressPercent}%`,
              background: "var(--c-acid)",
              transition: "width 0.1s linear",
            }}
            aria-hidden="true"
          />

          {/* 3D Canvas — full height */}
          <div className="absolute inset-0">
            {mounted && (
              <BarbellScene
                scrollProgress={scrollProgress}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Annotations — left side */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Left annotation: outer plate */}
            <div
              className="absolute"
              style={{
                left: "clamp(20px, 6%, 100px)",
                top: "35%",
                opacity: annotationsVisible ? 1 : 0,
                transform: `translateX(${annotationsVisible ? 0 : -20}px)`,
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <div className="flex items-center gap-3">
                <div style={{ width: "32px", height: "1px", background: "rgba(200,230,58,0.5)" }} />
                <div>
                  <div className="label-overline" style={{ fontSize: "9px" }}>PRECISION</div>
                  <div className="font-mono" style={{ fontSize: "8px", color: "var(--c-iron)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Weight plate · Calibrated</div>
                </div>
              </div>
            </div>

            {/* Right annotation: collar */}
            <div
              className="absolute"
              style={{
                right: "clamp(20px, 6%, 100px)",
                top: "28%",
                opacity: annotationsVisible ? 1 : 0,
                transform: `translateX(${annotationsVisible ? 0 : 20}px)`,
                transition: "opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease",
              }}
            >
              <div className="flex items-center gap-3 flex-row-reverse">
                <div style={{ width: "32px", height: "1px", background: "rgba(200,230,58,0.5)" }} />
                <div className="text-right">
                  <div className="label-overline" style={{ fontSize: "9px" }}>CONTROL</div>
                  <div className="font-mono" style={{ fontSize: "8px", color: "var(--c-iron)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Chrome collar · Locking</div>
                </div>
              </div>
            </div>

            {/* Center bottom annotation */}
            <div
              className="absolute"
              style={{
                bottom: "18%",
                left: "50%",
                transform: `translateX(-50%) translateY(${annotationsVisible ? 0 : 20}px)`,
                opacity: annotationsVisible ? 1 : 0,
                transition: "opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease",
                textAlign: "center",
              }}
            >
              <div
                className="h-annotation"
                style={{ color: "var(--c-iron)", fontSize: "9px", letterSpacing: "0.2em" }}
              >
                PROGRESS
              </div>
            </div>
          </div>

          {/* Section copy — lower right */}
          <div
            className="absolute bottom-16 right-0 z-10 container-gym w-full"
            style={{ pointerEvents: "none" }}
          >
            <div className="flex justify-end">
              <div style={{ maxWidth: "320px" }}>
                <p
                  className="font-body"
                  style={{
                    fontSize: "13px",
                    color: "var(--c-silver)",
                    lineHeight: "1.7",
                    opacity: annotationsVisible ? 1 : 0,
                    transform: `translateY(${annotationsVisible ? 0 : 16}px)`,
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                  }}
                >
                  Every component engineered with a purpose.
                  Precision steel, calibrated weight, chrome-locking collars.
                  This is what serious training is built on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee transition */}
      <div
        className="relative py-5 overflow-hidden"
        style={{ background: "var(--c-charcoal)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-marquee select-none">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-14 font-display font-bold uppercase text-2xl tracking-widest px-8" style={{ color: "var(--c-steel)" }}>
              <span style={{ color: "var(--c-white)" }}>STRENGTH</span>
              <span style={{ color: "var(--c-acid)" }}>✦</span>
              <span>PRECISION</span>
              <span style={{ color: "var(--c-acid)" }}>✦</span>
              <span style={{ color: "var(--c-white)" }}>DISCIPLINE</span>
              <span style={{ color: "var(--c-acid)" }}>✦</span>
              <span>PERFORMANCE</span>
              <span style={{ color: "var(--c-acid)" }}>✦</span>
              <span style={{ color: "var(--c-white)" }}>CONTROL</span>
              <span style={{ color: "var(--c-acid)" }}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
