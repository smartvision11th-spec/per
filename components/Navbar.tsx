"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";

const navLinks = [
  { label: "Apparatus 3D", href: "#exploded-view" },
  { label: "Training", href: "#training" },
  { label: "Facilities", href: "#facilities" },
  { label: "Memberships", href: "#membership" },
  { label: "Philosophy", href: "#about" },
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
            ? "rgba(3, 4, 6, 0.94)"
            : "linear-gradient(180deg, rgba(3,4,6,0.85) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,115,0,0.15)" : "none",
        }}
      >
        <div className="container-gym">
          <nav
            className="flex items-center justify-between"
            style={{ height: "76px" }}
            aria-label="Main navigation"
          >
            {/* Wordmark with Solar Glow */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="Perfect Fitness Gym — Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-primary to-amber-sun flex items-center justify-center text-black font-black font-display text-lg shadow-amber-sm">
                PF
              </div>
              <span className="font-display text-xl tracking-[0.25em] text-white font-black uppercase group-hover:text-amber-sun transition-colors">
                PERFECT<span className="text-amber-primary">FITNESS</span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs tracking-widest uppercase text-silver hover:text-amber-sun transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Action CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                className="btn-primary"
                style={{ padding: "10px 24px", fontSize: "11px" }}
              >
                <Flame className="w-4 h-4 text-black mr-1" />
                Join The Elite
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-silver hover:text-amber-sun transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-400"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          background: "rgba(3, 4, 6, 0.98)",
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
              className="font-display text-5xl font-black uppercase text-white hover:text-amber-sun transition-colors duration-200"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
                transition: "color 0.2s, transform 0.4s, opacity 0.4s",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="btn-primary mt-6 self-start"
          >
            Join The Elite
          </a>
        </div>
      </div>
    </>
  );
}
