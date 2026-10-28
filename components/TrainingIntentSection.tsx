"use client";

import React, { useRef, useEffect } from "react";

interface TrainingCard {
  label: string;
  title: string;
  description: string;
  tag: string;
  accent?: boolean;
  size: "large" | "medium" | "small";
  imageStyle: React.CSSProperties;
}

const cards: TrainingCard[] = [
  {
    label: "01 / Strength",
    title: "Compound Power",
    description:
      "Deadlifts, squats, presses. The foundational movements that build real, transferable strength.",
    tag: "Strength Training",
    accent: true,
    size: "large",
    imageStyle: {
      background:
        "linear-gradient(160deg, #0A0D14 0%, #1A1F2A 40%, #0D1520 100%)",
    },
  },
  {
    label: "02 / Functional",
    title: "Athletic Movement",
    description:
      "Kettlebell flows, loaded carries, explosive drills. Built for real-world athletic performance.",
    tag: "Functional Fitness",
    size: "medium",
    imageStyle: {
      background:
        "linear-gradient(135deg, #111520 0%, #1E2840 100%)",
    },
  },
  {
    label: "03 / Conditioning",
    title: "Metabolic Edge",
    description:
      "High-output conditioning circuits that build endurance without sacrificing strength.",
    tag: "Conditioning",
    size: "small",
    imageStyle: {
      background:
        "linear-gradient(200deg, #0A1018 0%, #161C28 100%)",
    },
  },
  {
    label: "04 / Recovery",
    title: "Strategic Rest",
    description:
      "Mobility work, contrast therapy, and structured deload. Because progress happens between sessions.",
    tag: "Recovery",
    size: "small",
    imageStyle: {
      background:
        "linear-gradient(160deg, #0D1117 0%, #1A2030 100%)",
    },
  },
];

// SVG icons for each card
const cardIcons = [
  // Barbell icon
  <svg key="b" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
    <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="2" y="18" width="5" height="12" rx="1" fill="currentColor" opacity="0.7" />
    <rect x="7" y="16" width="4" height="16" rx="1" fill="currentColor" />
    <rect x="37" y="16" width="4" height="16" rx="1" fill="currentColor" />
    <rect x="41" y="18" width="5" height="12" rx="1" fill="currentColor" opacity="0.7" />
  </svg>,
  // Kettlebell
  <svg key="k" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
    <path d="M16 22C16 22 14 18 16 14C18 10 22 8 24 8C26 8 30 10 32 14C34 18 32 22 32 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="24" cy="32" rx="10" ry="9" stroke="currentColor" strokeWidth="2" />
    <path d="M20 22H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  // Heart rate
  <svg key="h" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
    <path d="M4 24H12L16 16L22 34L28 20L32 28H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Leaf/restore
  <svg key="l" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
    <path d="M24 8C24 8 38 12 38 26C38 34 32 40 24 40C16 40 10 34 10 26C10 18 16 12 24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 40V28M24 28C22 24 18 22 14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
];

export default function TrainingIntentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".training-card");
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
      id="training"
      ref={sectionRef}
      className="relative"
      style={{ background: "var(--c-ink)", paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(80px, 12vw, 140px)" }}
      aria-labelledby="training-heading"
    >
      {/* Subtle diagonal separator from void */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,230,58,0.15) 30%, rgba(200,230,58,0.15) 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="container-gym">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <div className="label-overline mb-4">03 / Training Disciplines</div>
            <h2
              className="font-display font-black uppercase"
              id="training-heading"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: "0.93",
                color: "var(--c-white)",
                letterSpacing: "-0.01em",
              }}
            >
              TRAIN WITH
              <br />
              <span style={{ color: "var(--c-acid)" }}>INTENT.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
            <p className="font-body" style={{ fontSize: "14px", color: "var(--c-silver)", lineHeight: "1.75" }}>
              Four training disciplines. One coherent system.
              Each method is purposefully chosen, not randomly assembled.
            </p>
          </div>
        </div>

        {/* Editorial card grid — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Large card — takes 6 cols, 2 rows */}
          <div
            className="training-card lg:col-span-6 lg:row-span-2 relative overflow-hidden group cursor-default"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              minHeight: "400px",
              ...cards[0].imageStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Acid lime top edge accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--c-acid)" }} aria-hidden="true" />

            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "var(--c-iron)" }}>
                  {cards[0].label}
                </div>
                <div style={{ color: "var(--c-acid)", marginBottom: "20px" }}>
                  {cardIcons[0]}
                </div>
                <h3
                  className="font-display font-black uppercase mb-3"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "0.95", color: "var(--c-white)" }}
                >
                  {cards[0].title}
                </h3>
                <p className="font-body" style={{ fontSize: "14px", color: "var(--c-silver)", lineHeight: "1.7", maxWidth: "320px" }}>
                  {cards[0].description}
                </p>
              </div>
              <div
                className="flex items-center justify-between pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="label-overline" style={{ fontSize: "10px" }}>{cards[0].tag}</span>
                <div
                  className="w-8 h-8 flex items-center justify-center group-hover:bg-gym-acid transition-colors duration-200"
                  style={{ border: "1px solid rgba(200,230,58,0.3)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: "var(--c-acid)" }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
              style={{ opacity: 0, background: "radial-gradient(ellipse at 30% 30%, rgba(200,230,58,0.04) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
          </div>

          {/* Medium card */}
          <div
            className="training-card lg:col-span-6 relative overflow-hidden group cursor-default"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s 0.12s ease, transform 0.8s 0.12s ease",
              minHeight: "200px",
              ...cards[1].imageStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="p-7 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--c-iron)" }}>
                    {cards[1].label}
                  </div>
                  <h3
                    className="font-display font-black uppercase"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: "0.95", color: "var(--c-white)" }}
                  >
                    {cards[1].title}
                  </h3>
                </div>
                <div style={{ color: "var(--c-acid)", opacity: 0.7 }}>
                  {cardIcons[1]}
                </div>
              </div>
              <p className="font-body mt-4" style={{ fontSize: "13px", color: "var(--c-silver)", lineHeight: "1.65" }}>
                {cards[1].description}
              </p>
              <div className="mt-5">
                <span className="label-overline" style={{ fontSize: "9px" }}>{cards[1].tag}</span>
              </div>
            </div>
          </div>

          {/* Small card 1 */}
          <div
            className="training-card lg:col-span-3 relative overflow-hidden group cursor-default"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s 0.24s ease, transform 0.8s 0.24s ease",
              minHeight: "180px",
              ...cards[2].imageStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div style={{ color: "var(--c-acid)", opacity: 0.6 }}>
                {cardIcons[2]}
              </div>
              <div>
                <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--c-iron)" }}>
                  {cards[2].label}
                </div>
                <h3
                  className="font-display font-black uppercase"
                  style={{ fontSize: "1.5rem", lineHeight: "0.95", color: "var(--c-white)" }}
                >
                  {cards[2].title}
                </h3>
                <span className="label-overline mt-2 block" style={{ fontSize: "9px" }}>{cards[2].tag}</span>
              </div>
            </div>
          </div>

          {/* Small card 2 */}
          <div
            className="training-card lg:col-span-3 relative overflow-hidden group cursor-default"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s 0.36s ease, transform 0.8s 0.36s ease",
              minHeight: "180px",
              ...cards[3].imageStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div style={{ color: "var(--c-acid)", opacity: 0.6 }}>
                {cardIcons[3]}
              </div>
              <div>
                <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--c-iron)" }}>
                  {cards[3].label}
                </div>
                <h3
                  className="font-display font-black uppercase"
                  style={{ fontSize: "1.5rem", lineHeight: "0.95", color: "var(--c-white)" }}
                >
                  {cards[3].title}
                </h3>
                <span className="label-overline mt-2 block" style={{ fontSize: "9px" }}>{cards[3].tag}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
