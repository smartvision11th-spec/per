"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Training", href: "#training" },
  { label: "Facilities", href: "#facilities" },
  { label: "Membership", href: "#membership" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(8, 10, 13, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="container-gym">
          <nav
            className="flex items-center justify-between"
            style={{ height: "72px" }}
            aria-label="Main navigation"
          >
            {/* Wordmark */}
            <a
              href="#"
              className="font-display text-xl tracking-widest text-gym-white font-bold uppercase"
              style={{ letterSpacing: "0.2em" }}
              aria-label="Perfect Fitness Gym — Home"
            >
              PF<span style={{ color: "var(--c-acid)" }}>GYM</span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-silver hover:text-gym-white transition-colors duration-200"
                    style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                className="btn-primary"
                style={{ padding: "10px 24px", fontSize: "11px" }}
              >
                Join Now
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-silver hover:text-gym-white transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-400"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          background: "rgba(8, 10, 13, 0.98)",
          backdropFilter: "blur(24px)",
        }}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
      >
        <div className="flex flex-col justify-center h-full container-gym gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="font-display text-6xl font-bold uppercase text-gym-white hover:text-gym-acid transition-colors duration-200"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
                transition: "color 0.2s, transform 0.4s, opacity 0.4s",
                letterSpacing: "0.02em",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="btn-primary mt-4 self-start"
          >
            Join Now
          </a>
        </div>
      </div>
    </>
  );
}
