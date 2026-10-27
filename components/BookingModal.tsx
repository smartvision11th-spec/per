"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Flame, Calendar, Clock, Shield, Sparkles, QrCode } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "hypertrophy",
    timePreference: "morning",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate instant VIP pass generation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      goal: "hypertrophy",
      timePreference: "morning",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-glow bg-surface/95 border border-brand-orange/40 shadow-2xl p-6 sm:p-8 my-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange mb-2">
              <Flame className="w-4 h-4 fill-brand-orange" />
              <span>Complimentary VIP Guest Pass</span>
            </div>

            <h3 id="modal-title" className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-none">
              EXPERIENCE <span className="text-brand-orange">PERFECT FITNESS</span>
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Claim full 24-hour access to our Olympic strength zone, cryotherapy spa, and locker rooms. Zero obligation.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alexander Stone"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Primary Athletic Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                >
                  <option value="hypertrophy">Muscle Hypertrophy & Powerlifting</option>
                  <option value="conditioning">Metabolic Conditioning & Fat Loss</option>
                  <option value="boxing">Combat Sports & Boxing Conditioning</option>
                  <option value="recovery">Cryo Recovery & Spinal Rehab</option>
                  <option value="general">Overall Longevity & Peak Health</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Preferred Workout Window
                </label>
                <select
                  value={formData.timePreference}
                  onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                >
                  <option value="morning">Morning (05:00 AM - 10:00 AM)</option>
                  <option value="afternoon">Midday (11:00 AM - 03:00 PM)</option>
                  <option value="evening">Peak Evening (04:00 PM - 08:00 PM)</option>
                  <option value="night">Night Owl (09:00 PM - 02:00 AM)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-500 text-white font-bold uppercase tracking-wider text-sm shadow-orange-glow transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" />
                      <span>Generate Instant VIP Keycard</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  🔒 We respect your privacy. No spam. Instant digital pass via SMS & email.
                </p>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation & QR Keycard State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-display text-3xl font-bold uppercase text-white tracking-tight">
              VIP PASS ACTIVATED!
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              Welcome to the family, <strong className="text-white">{formData.name}</strong>. Your 24-hour pass has been issued and sent to <span className="text-brand-orange font-semibold">{formData.email}</span>.
            </p>

            {/* Mock Digital RFID Keycard Card */}
            <div className="my-6 p-5 rounded-2xl bg-slate-950 border-2 border-brand-orange/50 shadow-orange-glow text-left flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                  Perfect Fitness Digital Keycard
                </div>
                <div className="font-display text-xl text-white font-bold tracking-wider mt-1">
                  PASS #{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Valid for 24 Hours • Full All-Zone Access
                </div>
              </div>
              <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center">
                <QrCode className="w-14 h-14 text-slate-950" />
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 text-left bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="font-bold text-white uppercase text-[11px]">What To Bring On Your First Visit:</div>
              <div>• Photo ID matching your pass name</div>
              <div>• Clean training footwear (chalk allowed)</div>
              <div>• Complimentary towel and locker provided at reception</div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3.5 rounded-xl bg-surface-elevated hover:bg-white text-slate-200 hover:text-slate-950 font-bold uppercase text-xs tracking-wider transition-all"
            >
              Done & Return To Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
