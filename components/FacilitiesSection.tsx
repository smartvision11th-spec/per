"use client";

import React, { useRef, useEffect } from "react";

interface FacilityZone {
  label: string;
  name: string;
  detail: string;
  caption: string;
  span: "wide" | "portrait" | "square";
  bgStyle: React.CSSProperties;
  gradient: string;
}

const zones: FacilityZone[] = [
  {
    label: "Zone A",
    name: "Olympic Lifting Platform",
    detail: "8 competition platforms · Eleiko barbells · 500kg capacity flooring",
    caption:
      "Each platform is competition-spec. Rubber bumper flooring, stainless steel bar storage.",
    span: "wide",
    bgStyle: { background: "linear-gradient(145deg, #0A0E18 0%, #111824 50%, #0C1220 100%)" },
    gradient: "linear-gradient(to top, rgba(8,10,13,0.95) 0%, rgba(8,10,13,0.3) 60%, transparent 100%)",
  },
  {
    label: "Zone B",
    name: "Free Weight Floor",
    detail: "5–150kg · Hex & round plates · Fixed barbells",
    caption: "Hex dumbbells up to 150kg, urethane-coated. Mirrors floor to ceiling.",
    span: "portrait",
    bgStyle: { background: "linear-gradient(160deg, #0D1520 0%, #131A28 100%)" },
    gradient: "linear-gradient(to top, rgba(8,10,13,0.95) 0%, rgba(8,10,13,0.2) 70%, transparent 100%)",
  },
  {
    label: "Zone C",
    name: "Rig & Rack System",
    detail: "20-station rig · Pull-up bars · Monolift attachments",
    caption:
      "Custom-fabricated steel rig spanning the full length of the strength floor.",
    span: "portrait",
    bgStyle: { background: "linear-gradient(140deg, #0A1218 0%, #121E2C 100%)" },
    gradient: "linear-gradient(to top, rgba(8,10,13,0.95) 0%, rgba(8,10,13,0.2) 70%, transparent 100%)",
  },
  {
    label: "Zone D",
    name: "Conditioning Floor",
    detail: "Turf · Sleds · Battle ropes · Assault bikes",
    caption: "40 metres of open turf. Sled tracks, rowing, and functional training.",
    span: "square",
    bgStyle: { background: "linear-gradient(135deg, #0C1218 0%, #141C28 100%)" },
    gradient: "linear-gradient(to top, rgba(8,10,13,0.95) 0%, rgba(8,10,13,0.2) 80%, transparent 100%)",
  },
  {
    label: "Zone E",
    name: "Recovery Suite",
    detail: "Ice bath · Sauna · Compression boots · Massage",
    caption:
      "Deliberate recovery is part of the programme. Not an afterthought.",
    span: "square",
    bgStyle: { background: "linear-gradient(140deg, #080E18 0%, #0E1A28 100%)" },
    gradient: "linear-gradient(to top, rgba(8,10,13,0.95) 0%, rgba(8,10,13,0.2) 80%, transparent 100%)",
  },
];

// Geometric SVG illustrations for each zone
const zoneIllustrations = [
  // Olympic platform — lines suggesting a platform from above
  <svg key="a" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: 0.08 }}>
    <rect x="10" y="20" width="100" height="40" stroke="currentColor" strokeWidth="0.5" />
    <rect x="20" y="30" width="80" height="20" stroke="currentColor" strokeWidth="0.5" />
    <line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" strokeWidth="0.3" />
    <line x1="80" y1="20" x2="80" y2="60" stroke="currentColor" strokeWidth="0.3" />
    <line x1="10" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="0.8" />
  </svg>,
  // Free weight grid
  <svg key="b" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: 0.07 }}>
    {[0,1,2,3,4].map(row => [0,1,2].map(col => (
      <rect key={`${row}-${col}`} x={10 + col * 22} y={10 + row * 22} width="16" height="16" stroke="currentColor" strokeWidth="0.5" />
    )))}
  </svg>,
  // Rig elevation
  <svg key="c" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: 0.07 }}>
    <line x1="10" y1="20" x2="10" y2="100" stroke="currentColor" strokeWidth="1" />
    <line x1="70" y1="20" x2="70" y2="100" stroke="currentColor" strokeWidth="1" />
    <line x1="10" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="0.5" />
    {[30,45,60,75,90].map(y => (
      <line key={y} x1="10" y1={y} x2="70" y2={y} stroke="currentColor" strokeWidth="0.3" />
    ))}
  </svg>,
  // Turf — hatching
  <svg key="d" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: 0.07 }}>
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={0} y1={i * 20} x2="100" y2={i * 20} stroke="currentColor" strokeWidth="0.4" />
    ))}
    {[10,30,50,70,90].map(x => (
      <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="currentColor" strokeWidth="0.2" />
    ))}
  </svg>,
  // Recovery — concentric circles
  <svg key="e" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: 0.07 }}>
    {[10,20,30,40].map(r => (
      <circle key={r} cx="50" cy="50" r={r} stroke="currentColor" strokeWidth="0.5" />
    ))}
  </svg>,
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".facility-card");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
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
      id="facilities"
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--c-void)",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
      }}
      aria-labelledby="facilities-heading"
    >
      <div className="container-gym">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="label-overline mb-4">04 / The Space</div>
            <h2
              className="font-display font-black uppercase"
              id="facilities-heading"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: "0.93",
                color: "var(--c-white)",
              }}
            >
              THE TRAINING
              <br />
              <span style={{ color: "var(--c-acid)" }}>FLOOR.</span>
            </h2>
          </div>
          <div style={{ maxWidth: "300px" }}>
            <p className="font-body" style={{ fontSize: "13px", color: "var(--c-silver)", lineHeight: "1.75" }}>
              Five dedicated training zones.
              Each designed for a specific purpose.
              Nothing wasted. Nothing missing.
            </p>
          </div>
        </div>

        {/* Asymmetric facility grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Zone A — wide, spanning full row */}
          <div
            className="facility-card lg:col-span-8 relative overflow-hidden group"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              minHeight: "320px",
              ...zones[0].bgStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Illustration */}
            <div className="absolute top-6 right-6 w-28 h-20 text-gym-white pointer-events-none" aria-hidden="true">
              {zoneIllustrations[0]}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: zones[0].gradient }}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="label-overline mb-2" style={{ fontSize: "9px" }}>{zones[0].label}</div>
                  <h3
                    className="font-display font-black uppercase mb-1"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "0.95", color: "var(--c-white)" }}
                  >
                    {zones[0].name}
                  </h3>
                  <p className="font-mono" style={{ fontSize: "11px", color: "var(--c-iron)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {zones[0].detail}
                  </p>
                </div>
                <p
                  className="font-body hidden lg:block"
                  style={{ fontSize: "12px", color: "var(--c-silver)", lineHeight: "1.7", maxWidth: "220px", flexShrink: 0 }}
                >
                  {zones[0].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Zone B — portrait */}
          <div
            className="facility-card lg:col-span-4 relative overflow-hidden group"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease",
              minHeight: "320px",
              ...zones[1].bgStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-6 right-6 w-16 h-24 text-gym-white pointer-events-none" aria-hidden="true">
              {zoneIllustrations[1]}
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-7" style={{ background: zones[1].gradient }}>
              <div className="label-overline mb-2" style={{ fontSize: "9px" }}>{zones[1].label}</div>
              <h3
                className="font-display font-black uppercase mb-1"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: "0.95", color: "var(--c-white)" }}
              >
                {zones[1].name}
              </h3>
              <p className="font-mono" style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {zones[1].detail}
              </p>
            </div>
          </div>

          {/* Zone C — portrait */}
          <div
            className="facility-card lg:col-span-4 relative overflow-hidden"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease",
              minHeight: "260px",
              ...zones[2].bgStyle,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-6 right-6 w-14 h-24 text-gym-white pointer-events-none" aria-hidden="true">
              {zoneIllustrations[2]}
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-7" style={{ background: zones[2].gradient }}>
              <div className="label-overline mb-2" style={{ fontSize: "9px" }}>{zones[2].label}</div>
              <h3
                className="font-display font-black uppercase mb-1"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", lineHeight: "0.95", color: "var(--c-white)" }}
              >
                {zones[2].name}
              </h3>
              <p className="font-mono" style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {zones[2].detail}
              </p>
            </div>
          </div>

          {/* Zone D & E — two squares */}
          {[zones[3], zones[4]].map((zone, i) => (
            <div
              key={zone.label}
              className={`facility-card lg:col-span-4 relative overflow-hidden`}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.8s ${0.3 + i * 0.1}s ease, transform 0.8s ${0.3 + i * 0.1}s ease`,
                minHeight: "260px",
                ...zone.bgStyle,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="absolute inset-0 text-gym-white pointer-events-none flex items-center justify-center" aria-hidden="true">
                <div style={{ width: "80px", height: "80px" }}>
                  {zoneIllustrations[3 + i]}
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-7" style={{ background: zone.gradient }}>
                <div className="label-overline mb-2" style={{ fontSize: "9px" }}>{zone.label}</div>
                <h3
                  className="font-display font-black uppercase mb-1"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", lineHeight: "0.95", color: "var(--c-white)" }}
                >
                  {zone.name}
                </h3>
                <p className="font-mono" style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {zone.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote annotation */}
        <div className="mt-8 flex items-center gap-4">
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.05)" }} />
          <span
            className="font-mono"
            style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-iron)", whiteSpace: "nowrap" }}
          >
            All zones accessible with every membership tier
          </span>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.05)" }} />
        </div>
      </div>
    </section>
  );
}
