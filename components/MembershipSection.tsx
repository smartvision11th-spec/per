"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";

const tiers = [
  {
    id: "standard",
    label: "Essential",
    tagline: "The foundation.",
    description:
      "Full access to all five training zones. Locker room and showers included. Everything you need to train consistently.",
    features: [
      "All five training zones",
      "Locker room access",
      "24/7 facility access",
      "App & booking system",
    ],
    cta: "Enquire",
    featured: false,
  },
  {
    id: "performance",
    label: "Performance",
    tagline: "For serious athletes.",
    description:
      "Everything in Essential, plus dedicated coaching check-ins, programme design, and priority booking for peak hours.",
    features: [
      "Everything in Essential",
      "Monthly coaching check-in",
      "Programme design",
      "Priority peak-hour booking",
      "Recovery suite access",
    ],
    cta: "Enquire",
    featured: true,
  },
  {
    id: "elite",
    label: "Elite",
    tagline: "Unrestricted access.",
    description:
      "Full facility. Weekly coaching. Nutrition guidance. Dedicated locker. Designed for athletes who train for performance, not just habit.",
    features: [
      "Everything in Performance",
      "Weekly 1-on-1 coaching",
      "Nutrition guidance",
      "Dedicated locker",
      "Guest passes (4/month)",
      "First access to new programmes",
    ],
    cta: "Enquire",
    featured: false,
  },
];

export default function MembershipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".membership-card");
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
      id="membership"
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--c-ink)",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
      aria-labelledby="membership-heading"
    >
      <div className="container-gym">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="label-overline mb-4">05 / Training Access</div>
            <h2
              className="font-display font-black uppercase"
              id="membership-heading"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: "0.93",
                color: "var(--c-white)",
              }}
            >
              FIND YOUR
              <br />
              <span style={{ color: "var(--c-acid)" }}>TRAINING STYLE.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-body" style={{ fontSize: "13px", color: "var(--c-silver)", lineHeight: "1.75" }}>
              Pricing is tailored to your goals and commitment level.
              Contact us for a conversation — not a sales pitch.
            </p>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              className="membership-card relative flex flex-col"
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity 0.8s ${i * 0.12}s ease, transform 0.8s ${i * 0.12}s ease`,
                background: tier.featured ? "var(--c-charcoal)" : "rgba(14,18,28,0.6)",
                border: tier.featured
                  ? "1px solid rgba(200,230,58,0.35)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: tier.featured
                  ? "0 0 60px -12px rgba(200,230,58,0.2)"
                  : "none",
              }}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "var(--c-acid)" }}
                  aria-hidden="true"
                />
              )}
              {tier.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                  style={{
                    background: "var(--c-acid)",
                    color: "var(--c-void)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Tier header */}
                <div className="mb-6">
                  <div
                    className="font-display font-black uppercase mb-1"
                    style={{ fontSize: "1.8rem", color: tier.featured ? "var(--c-acid)" : "var(--c-white)", letterSpacing: "0.02em" }}
                  >
                    {tier.label}
                  </div>
                  <div
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.15em" }}
                  >
                    {tier.tagline}
                  </div>
                </div>

                {/* Price placeholder */}
                <div
                  className="mb-6 py-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="font-display font-black"
                    style={{ fontSize: "2.8rem", color: "var(--c-white)", lineHeight: 1 }}
                  >
                    Enquire
                  </div>
                  <div
                    className="font-mono mt-1"
                    style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    Tailored to your commitment
                  </div>
                </div>

                {/* Description */}
                <p
                  className="font-body mb-6"
                  style={{ fontSize: "13px", color: "var(--c-silver)", lineHeight: "1.7" }}
                >
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1" role="list">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 font-body"
                      style={{ fontSize: "13px", color: "var(--c-mist)" }}
                    >
                      <Check
                        size={14}
                        style={{ color: "var(--c-acid)", flexShrink: 0, marginTop: "2px" }}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={tier.featured ? "btn-primary w-full justify-center" : "btn-ghost w-full justify-center"}
                  aria-label={`Enquire about ${tier.label} membership`}
                >
                  <span>{tier.cta} about {tier.label}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p
          className="mt-8 text-center font-mono"
          style={{ fontSize: "11px", color: "var(--c-iron)", letterSpacing: "0.1em" }}
        >
          All memberships are month-to-month. No lock-in contracts.
        </p>
      </div>
    </section>
  );
}
