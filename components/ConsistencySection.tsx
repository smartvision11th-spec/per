"use client";

import React, { useRef, useEffect } from "react";

const lines = [
  { word: "CONSISTENCY", accent: false },
  { word: "FORGES", accent: true },
  { word: "TITANS.", accent: false },
];

const principles = [
  {
    number: "01",
    title: "NEVER RELY ON FLEETING MOTIVATION",
    body: "Motivation is temporary dopamine. Systemic discipline is an immovable fortress. Show up to the barbell when you're fatigued, when it rains, and when nobody is cheering.",
  },
  {
    number: "02",
    title: "PROGRESSION DEMANDS DATA",
    body: "Arbitrary training produces stagnant aesthetics. Measure bar speed, track mechanical overload, and monitor rest intervals with engineering-grade rigor.",
  },
  {
    number: "03",
    title: "RECOVERY IS WHERE GROWTH HAPPENS",
    body: "You do not grow in the squat rack; you break down muscle tissue. True progress is synthesized in high-quality REM sleep, sub-zero cold immersion, and disciplined micronutrition.",
  },
];

export default function ConsistencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll(".consistency-word");
            words.forEach((word, i) => {
              setTimeout(() => {
                (word as HTMLElement).style.opacity = "1";
                (word as HTMLElement).style.transform = "translateY(0) skewY(0deg)";
              }, i * 200);
            });

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
        borderTop: "1px solid rgba(255,115,0,0.1)",
      }}
      aria-labelledby="consistency-heading"
    >
      <div className="container-gym relative z-10">
        <div className="label-overline mb-8">06 / ATHLETIC CODE & PHILOSOPHY</div>

        {/* Giant Headline */}
        <div ref={headlineRef} className="mb-20" id="consistency-heading">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className={`consistency-word font-display font-black uppercase block tracking-tight ${
                  line.accent ? "text-gradient-amber" : "text-white"
                }`}
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 11rem)",
                  lineHeight: "0.88",
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

        {/* Three Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="principle-item glass p-8 border border-white/5 relative"
              style={{
                opacity: 0,
                transform: "translateX(-20px)",
                transition: `opacity 0.8s ${i * 0.15}s ease, transform 0.8s ${i * 0.15}s ease`,
              }}
            >
              <div className="font-mono text-xs text-amber-sun font-bold tracking-widest mb-4">
                {p.number} // PROTOCOL
              </div>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-wider mb-3">
                {p.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-silver leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
