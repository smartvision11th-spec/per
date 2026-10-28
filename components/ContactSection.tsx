"use client";

import React, { useState, useRef, useId } from "react";
import { ArrowRight, MapPin, Clock, Mail, Phone, Flame } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  interest?: string;
}

const interests = [
  "Essential Access Membership",
  "Solar Performance Membership",
  "VIP Titanium Elite Coaching",
  "Facility Apparatus Private Tour",
  "Powerlifting / Olympic Consultation",
];

export default function ContactSection() {
  const formId = useId();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "note">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Valid email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email format";
    }
    if (!formData.interest) newErrors.interest = "Please select a training program";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = formRef.current?.querySelector("[aria-invalid='true']") as HTMLElement;
      firstError?.focus();
      return;
    }
    setStatus("note");
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{
        background: "var(--c-ink)",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        borderTop: "1px solid rgba(255,115,0,0.15)",
      }}
      aria-labelledby="contact-heading"
    >
      <div className="container-gym">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5">
            <div className="label-overline mb-3">07 / INITIATE MEMBERSHIP</div>
            <h2
              className="font-display font-black uppercase text-white tracking-tight mb-6"
              id="contact-heading"
              style={{
                fontSize: "clamp(3rem, 6vw, 4.8rem)",
                lineHeight: "0.92",
              }}
            >
              READY TO <br />
              <span className="text-gradient-amber">COMMAND RESULTS?</span>
            </h2>
            <p className="font-body text-sm text-silver leading-relaxed mb-12">
              Step across the threshold. Connect with our coaching desk to discuss your performance history and schedule a private apparatus inspection.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <MapPin size={18} className="text-amber-sun" />,
                  label: "FACILITY ADDRESS",
                  value: "Private Campus • Location confirmed upon enquiry approval",
                },
                {
                  icon: <Clock size={18} className="text-amber-sun" />,
                  label: "BIOMETRIC ACCESS",
                  value: "24 Hours / 7 Days a Week • Continuous Access",
                },
                {
                  icon: <Mail size={18} className="text-amber-sun" />,
                  label: "DIRECT INQUIRIES",
                  value: "concierge@perfectfitnessgym.com",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-primary/10 border border-amber-primary/20 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-amber-sun tracking-widest uppercase mb-1">
                      {item.label}
                    </div>
                    <div className="font-body text-xs sm:text-sm text-white">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            {status === "note" ? (
              <div
                className="glass-amber p-10 border border-amber-primary/40 flex flex-col items-start gap-5"
                role="status"
              >
                <Flame className="w-12 h-12 text-amber-sun" />
                <h3 className="font-display font-black text-3xl text-white uppercase">
                  INQUIRY RECORDED
                </h3>
                <p className="font-body text-sm text-silver leading-relaxed">
                  Thank you for submitting your consultation request. Our admissions team processes new athlete applications within 24 hours. You can also reach our desk at concierge@perfectfitnessgym.com.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
                  }}
                  className="btn-ghost mt-2"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="glass p-8 sm:p-10 border border-white/10"
              >
                {Object.keys(errors).length > 0 && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
                    Please correct the highlighted fields before submitting.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="form-field">
                    <label htmlFor={`${formId}-name`} className="form-label">
                      Athlete Full Name *
                    </label>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      type="text"
                      className={`form-input ${errors.name ? "error" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Marcus Vance"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor={`${formId}-email`} className="form-label">
                      Email Address *
                    </label>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="marcus@domain.com"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="form-field">
                    <label htmlFor={`${formId}-phone`} className="form-label">
                      Phone Number (Optional)
                    </label>
                    <input
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor={`${formId}-interest`} className="form-label">
                      Interested In *
                    </label>
                    <select
                      id={`${formId}-interest`}
                      name="interest"
                      className={`form-input ${errors.interest ? "error" : ""}`}
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select tier or tour</option>
                      {interests.map((item) => (
                        <option key={item} value={item} className="bg-charcoal text-white">
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.interest && <span className="form-error">{errors.interest}</span>}
                  </div>
                </div>

                <div className="form-field mb-8">
                  <label htmlFor={`${formId}-message`} className="form-label">
                    Athletic Background & Goals (Optional)
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={4}
                    className="form-input"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current lift numbers, specific goals, or recovery needs..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <span>Transmit Application</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-lg tracking-[0.25em] text-white">
            PERFECT<span className="text-amber-primary">FITNESS</span>
          </div>
          <div className="font-mono text-xs text-silver">
            © {new Date().getFullYear()} PERFECT FITNESS GYM. ARCHITECTURAL ATHLETICS.
          </div>
        </div>
      </div>
    </section>
  );
}
