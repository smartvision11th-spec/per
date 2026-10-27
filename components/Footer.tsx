"use client";

import React from "react";
import { Dumbbell, MapPin, Phone, Mail, Clock, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-white/10 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange to-red-600 flex items-center justify-center text-white shadow-orange-glow">
                <Dumbbell className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="font-display tracking-wider text-2xl font-bold uppercase text-white leading-none">
                PERFECT<span className="text-brand-orange">FITNESS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              The premier 24/7 athletic training ground and recovery spa. 15,000 sq ft engineered with competition-grade Olympic hardware, cryotherapy, and master athletic coaching.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-orange transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-orange transition-all" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-orange transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Facility & Hours */}
          <div>
            <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
              Facility Hours
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">24/7 Keycard Entry</div>
                  <div className="text-slate-400">Open 365 Days a Year</div>
                </div>
              </li>
              <li className="pt-2 border-t border-white/5">
                <div className="text-white font-semibold">Staffed Front Desk</div>
                <div className="text-slate-400">Mon - Fri: 06:00 AM - 10:00 PM</div>
                <div className="text-slate-400">Sat - Sun: 08:00 AM - 08:00 PM</div>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Contact */}
          <div>
            <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
              Location & Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>840 Performance Parkway, Suite 100, Metro Athletic District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>(555) 737-3328 (PERFECT)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>contact@perfectfitness.gym</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#amenities" className="hover:text-brand-orange transition-colors">Training Zones</a></li>
              <li><a href="#schedule" className="hover:text-brand-orange transition-colors">Class Timetable</a></li>
              <li><a href="#pricing" className="hover:text-brand-orange transition-colors">Membership Options</a></li>
              <li><a href="#trainers" className="hover:text-brand-orange transition-colors">Master Coaches</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">InBody 3D Scan</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Cryotherapy FAQ</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Perfect Fitness Gym LLC. All rights reserved. Built with Next.js, Three.js & Tailwind.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200">Terms of Service</a>
            <a href="#" className="hover:text-slate-200">Accessibility Statement (WCAG 2.1)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
