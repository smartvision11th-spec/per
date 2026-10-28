"use client";

import React, { useRef, useEffect } from "react";

const lines = [
  { word: "CONSISTENCY", accent: false },
  { word: "BUILDS", accent: false },
  { word: "RESULTS.", accent: true },
];

const principles = [
  {
    number: "01",
    title: "Show up when it's hard.",
    body: "Motivation is weather. Discipline is infrastructure. Train whether you want to or not, and results follow.",
  },
  {
    number: "02",
    title: "Programme over instinct.",
    body: "Random effort produces random results. A structured programme, executed with patience, is what creates measurable progress.",
  },
  {
    number: "03",
    title: "Recovery is training.",
    body: "Adaptation happens outside the gym. Sleep, nutrition, and deliberate rest are not optional — they are the work.",
  },
];

export default function ConsistencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate headline
            const words = entry.target.querySelectorAll(".consistency-word");
            words.forEach((word, i) => {
              setTimeout(() => {
                (word as HTMLElement).style.opacity = "1";
                (word as HTMLElement).style.transform = "translateY(0) skewY(0deg)";
              }, i * 200);
            });

            // Animate principles
            const prList = entry.target.querySelectorAll(".principle-item");
            prList.forEach((pr, i) => {
              setTimeout(() => {
                (pr as HTMLElement).style.opacity = "1";
                (pr as HTMLElement).style.transform = "translateX(0)";
              }, 400 + i * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--c-void)",
        paddingTop: "clamp(100px, 15vw, 180px)",
        paddingBottom: "clamp(100px, 15vw, 180px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
      aria-labelledby="consistency-heading"
    >
      {/* Background: large faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
        aria-hidden="true"
      />

      {/* Giant watermark number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: "clamp(20rem, 35vw, 50rem)",
          lineHeight: "0.8",
          color: "rgba(255,255,255,0.015)",
          letterSpacing: "-0.05em",
          right: "-0.05em",
        }}
        aria-hidden="true"
      >
        06
      </div>

      <div className="container-gym relative z-10">

        {/* Overline */}
        <div className="label-overline mb-12">06 / The Philosophy</div>

        {/* Giant headline */}
        <div ref={headlineRef} className="mb-20" id="consistency-heading">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className="consistency-word font-display font-black uppercase block"
                style={{
                  fontSize: "clamp(4rem, 13vw, 12rem)",
                  lineHeight: "0.88",
                  letterSpacing: "-0.02em",
                  color: line.accent ? "var(--c-acid)" : "var(--c-white)",
                  opacity: 0,
                  transform: "translateY(60px) skewY(3deg)",
                  transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {line.word}
              </span>
            </div>
          ))}
        </div>

        {/* Three principles — editorial list */}
        <div ref={principlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="principle-item"
              style={{
                opacity: 0,
                transform: "translateX(-20px)",
                transition: `opacity 0.8s ease, transform 0.8s ease`,
                paddingTop: "40px",
                paddingBottom: "40px",
                paddingRight: i < 2 ? "40px" : "0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                paddingLeft: i > 0 ? "40px" : "0",
              }}
            >
              <div
                className="font-mono mb-4 block"
                style={{ fontSize: "11px", color: "var(--c-acid)", letterSpacing: "0.15em" }}
              >
                {p.number}
              </div>
              <h3
                className="font-display font-bold uppercase mb-3"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "var(--c-white)", lineHeight: "1.1" }}
              >
                {p.title}
              </h3>
              <p
                className="font-body"
                style={{ fontSize: "13px", color: "var(--c-silver)", lineHeight: "1.75" }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
