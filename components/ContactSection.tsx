"use client";

import React, { useState, useRef, useId } from "react";
import { ArrowRight, MapPin, Clock, Mail, Phone } from "lucide-react";

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
  "Essential Membership",
  "Performance Membership",
  "Elite Membership",
  "Group Classes",
  "Personal Training",
  "Facility Tour",
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.interest) newErrors.interest = "Please select your interest";
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
      // Focus first error
      const firstError = formRef.current?.querySelector("[aria-invalid='true']") as HTMLElement;
      firstError?.focus();
      return;
    }
    // No real backend — show honest note
    setStatus("note");
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{
        background: "var(--c-charcoal)",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-labelledby="contact-heading"
    >
      {/* Top acid line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--c-acid)" }} aria-hidden="true" />

      <div className="container-gym">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left: copy & contact info */}
          <div className="lg:col-span-5">
            <div className="label-overline mb-5">07 / Start Training</div>
            <h2
              className="font-display font-black uppercase mb-6"
              id="contact-heading"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                lineHeight: "0.93",
                color: "var(--c-white)",
              }}
            >
              READY TO
              <br />
              <span style={{ color: "var(--c-acid)" }}>BEGIN?</span>
            </h2>
            <p
              className="font-body mb-12"
              style={{ fontSize: "14px", color: "var(--c-silver)", lineHeight: "1.8", maxWidth: "340px" }}
            >
              Tell us what you are looking to achieve. We will get back to you
              within one business day with information that is actually relevant
              to your goals.
            </p>

            {/* Info items */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <MapPin size={15} aria-hidden="true" />,
                  label: "Location",
                  value: "Address provided upon enquiry",
                },
                {
                  icon: <Clock size={15} aria-hidden="true" />,
                  label: "Access",
                  value: "24 / 7 for all members",
                },
                {
                  icon: <Mail size={15} aria-hidden="true" />,
                  label: "Email",
                  value: "hello@perfectfitnessgym.com",
                },
                {
                  icon: <Phone size={15} aria-hidden="true" />,
                  label: "Phone",
                  value: "Contact us by email first",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "var(--c-acid)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="font-mono uppercase mb-1"
                      style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--c-iron)" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="font-body"
                      style={{ fontSize: "13px", color: "var(--c-mist)" }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            {status === "note" ? (
              <div
                className="flex flex-col items-start justify-center h-full gap-6 p-10"
                style={{ background: "rgba(20,24,32,0.8)", border: "1px solid rgba(200,230,58,0.25)" }}
                role="status"
                aria-live="polite"
              >
                <div style={{ color: "var(--c-acid)" }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14 24L21 31L34 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  className="font-display font-black uppercase"
                  style={{ fontSize: "2rem", color: "var(--c-white)" }}
                >
                  Enquiry Received
                </h3>
                <p className="font-body" style={{ fontSize: "14px", color: "var(--c-silver)", lineHeight: "1.75", maxWidth: "400px" }}>
                  This form is not yet connected to a live submission endpoint.
                  In production, your enquiry would be sent directly to our team.
                  Please email us at{" "}
                  <a
                    href="mailto:hello@perfectfitnessgym.com"
                    style={{ color: "var(--c-acid)", textDecoration: "underline" }}
                  >
                    hello@perfectfitnessgym.com
                  </a>{" "}
                  to get in touch.
                </p>
                <button
                  className="btn-ghost"
                  onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", phone: "", interest: "", message: "" }); }}
                >
                  Start over
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Membership enquiry form"
              >
                {/* Error summary (for multi-error) */}
                {Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-6 p-4"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}
                  >
                    <p className="font-mono text-xs tracking-wider" style={{ color: "#EF4444" }}>
                      Please correct the fields below before submitting.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div className="form-field">
                    <label htmlFor={`${formId}-name`} className="form-label">
                      Full Name <span aria-hidden="true" style={{ color: "var(--c-acid)" }}>*</span>
                    </label>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`form-input ${errors.name ? "error" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <span id={`${formId}-name-error`} className="form-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label htmlFor={`${formId}-email`} className="form-label">
                      Email Address <span aria-hidden="true" style={{ color: "var(--c-acid)" }}>*</span>
                    </label>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <span id={`${formId}-email-error`} className="form-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Phone (optional) */}
                  <div className="form-field">
                    <label htmlFor={`${formId}-phone`} className="form-label">
                      Phone <span className="font-mono" style={{ fontSize: "9px", color: "var(--c-iron)" }}>(Optional)</span>
                    </label>
                    <input
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 000 000 0000"
                    />
                  </div>

                  {/* Interest */}
                  <div className="form-field">
                    <label htmlFor={`${formId}-interest`} className="form-label">
                      I&apos;m interested in <span aria-hidden="true" style={{ color: "var(--c-acid)" }}>*</span>
                    </label>
                    <select
                      id={`${formId}-interest`}
                      name="interest"
                      className={`form-input ${errors.interest ? "error" : ""}`}
                      value={formData.interest}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.interest}
                      aria-describedby={errors.interest ? `${formId}-interest-error` : undefined}
                      style={{ appearance: "none", cursor: "pointer" }}
                    >
                      <option value="" disabled>Select an option</option>
                      {interests.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.interest && (
                      <span id={`${formId}-interest-error`} className="form-error" role="alert">
                        {errors.interest}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="form-field mb-6">
                  <label htmlFor={`${formId}-message`} className="form-label">
                    Tell us about your goals <span className="font-mono" style={{ fontSize: "9px", color: "var(--c-iron)" }}>(Optional)</span>
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={4}
                    className="form-input"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Current training background, specific goals, questions…"
                    style={{ resize: "vertical", minHeight: "110px" }}
                  />
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <button type="submit" className="btn-primary">
                    <span>Send Enquiry</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <p
                    className="font-mono"
                    style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.1em" }}
                  >
                    Response within 1 business day
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer rule */}
        <div
          className="mt-24 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="font-display font-bold uppercase tracking-widest"
            style={{ fontSize: "1.1rem", color: "var(--c-steel)", letterSpacing: "0.25em" }}
          >
            PFGYM
          </div>
          <p
            className="font-mono"
            style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            © {new Date().getFullYear()} Perfect Fitness Gym. All rights reserved.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              {["Privacy", "Terms", "Accessibility"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-mono"
                    style={{ fontSize: "10px", color: "var(--c-iron)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
                    onMouseOver={(e) => ((e.target as HTMLElement).style.color = "var(--c-silver)")}
                    onMouseOut={(e) => ((e.target as HTMLElement).style.color = "var(--c-iron)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
