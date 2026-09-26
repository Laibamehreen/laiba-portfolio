"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Briefcase,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  AtSign,
  Tag,
  MessageSquare,
} from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import { PROFILE_DATA } from "@/data/profile";

function UpworkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("laibamehreenk@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateField = (field: string, value: string) => {
    let error = "";
    const trimmed = value.trim();

    if (field === "name") {
      if (!trimmed) {
        error = "Name is required.";
      } else if (trimmed.length < 2) {
        error = "Name must be at least 2 characters.";
      }
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmed) {
        error = "Email address is required.";
      } else if (!emailRegex.test(trimmed)) {
        error = "Please enter a valid email address.";
      }
    } else if (field === "subject") {
      if (!trimmed) {
        error = "Subject is required.";
      } else if (trimmed.length < 2) {
        error = "Subject must be at least 2 characters.";
      }
    } else if (field === "message") {
      if (!trimmed) {
        error = "Message is required.";
      } else if (trimmed.length < 5) {
        error = "Message must be at least 5 characters.";
      }
    }

    return error;
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status !== "idle" && status !== "submitting") {
      setStatus("idle");
      setStatusMessage("");
    }
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) next[field] = err;
        else delete next[field];
        return next;
      });
    }
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    };

    const filtered: Record<string, string> = {};
    for (const [k, v] of Object.entries(newErrors)) {
      if (v) filtered[k] = v;
    }

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });
    setErrors(filtered);

    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "submitting") return;

    if (!validateAll()) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields with valid information.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setStatusMessage("Thanks for reaching out! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({});
    } catch (err: unknown) {
      setStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or reach out directly via email.";
      setStatusMessage(msg);
    }
  };

  return (
    <ScrollRevealSection id="contact" className="py-16 md:py-24 border-t border-white/[0.04] relative overflow-hidden">
      {/* Subtle Bottom Glow Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lavender-400/[0.06] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Connect"
          subtitle="I'm open to software development opportunities, internships, freelance projects, and technical collaboration."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Introduction, Contact Info Cards & Social Links (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Professional Introduction */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-400/10 border border-lavender-400/20 text-lavender-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Collaboration</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Let's discuss an opportunity
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Have a project in mind or want to discuss an opportunity? Feel free to reach out.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-3.5">
              {/* Email Card */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="cv-card p-4 sm:p-5 transition-all duration-200 hover:border-lavender-400/40 hover:shadow-lavender-sm group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-lavender-400/10 border border-lavender-400/20 text-lavender-400 flex items-center justify-center shrink-0 group-hover:bg-lavender-400/20 group-hover:scale-105 transition-all duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:laibamehreenk@gmail.com"
                      title="Open your email client to email laibamehreenk@gmail.com"
                      className="text-sm sm:text-base font-semibold text-white hover:text-lavender-300 transition-colors break-all block"
                    >
                      laibamehreenk@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    className="p-2 rounded-lg text-slate-400 hover:text-lavender-300 hover:bg-white/[0.06] transition-colors shrink-0"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="cv-card p-4 sm:p-5 transition-all duration-200 hover:border-lavender-400/40 hover:shadow-lavender-sm group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-lavender-400/10 border border-lavender-400/20 text-lavender-400 flex items-center justify-center shrink-0 group-hover:bg-lavender-400/20 group-hover:scale-105 transition-all duration-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                      Location
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      Punjab, Pakistan
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Availability Card */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="cv-card p-4 sm:p-5 transition-all duration-200 hover:border-lavender-400/40 hover:shadow-lavender-sm group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-lavender-400/10 border border-lavender-400/20 text-lavender-400 flex items-center justify-center shrink-0 group-hover:bg-lavender-400/20 group-hover:scale-105 transition-all duration-200">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                      Availability
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      Open to internships, freelance projects, and software engineering opportunities
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                Professional Profiles
              </span>
              <div className="grid grid-cols-3 gap-3">
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl cv-card hover:border-lavender-400/40 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold group shadow-sm"
                >
                  <Github className="w-4 h-4 text-lavender-400 group-hover:text-lavender-300 shrink-0 transition-colors" />
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl cv-card hover:border-lavender-400/40 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold group shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-lavender-400 group-hover:text-lavender-300 shrink-0 transition-colors" />
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://www.upwork.com/freelancers/~01649656063f558079"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Upwork Profile"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl cv-card hover:border-lavender-400/40 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold group shadow-sm"
                >
                  <UpworkIcon className="w-4 h-4 text-lavender-400 group-hover:text-lavender-300 shrink-0 transition-colors" />
                  <span>Upwork</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="cv-card p-6 sm:p-8 relative">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1.5 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-lavender-400" />
                  <span>Send a Message</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fill in your details below and I will get back to you as soon as possible.
                </p>
              </div>

              {/* Success Notification */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-300">Message Delivered</h4>
                      <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
                        {statusMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Notification */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-rose-300">Notice</h4>
                      <p className="text-xs text-rose-200/90 mt-0.5 leading-relaxed">
                        {statusMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Your Name <span className="text-lavender-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        disabled={status === "submitting"}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-navy-950 border text-xs sm:text-sm text-white placeholder-slate-500 transition-colors outline-none ${
                          errors.name && touched.name
                            ? "border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30"
                            : "border-white/10 hover:border-lavender-400/30 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/40"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Email Address <span className="text-lavender-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <AtSign className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        disabled={status === "submitting"}
                        placeholder="visitor@example.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-navy-950 border text-xs sm:text-sm text-white placeholder-slate-500 transition-colors outline-none ${
                          errors.email && touched.email
                            ? "border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30"
                            : "border-white/10 hover:border-lavender-400/30 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/40"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Subject <span className="text-lavender-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Tag className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      disabled={status === "submitting"}
                      placeholder="Software Engineer Role / Project Inquiry"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-navy-950 border text-xs sm:text-sm text-white placeholder-slate-500 transition-colors outline-none ${
                        errors.subject && touched.subject
                          ? "border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30"
                          : "border-white/10 hover:border-lavender-400/30 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/40"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.subject && touched.subject && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Message <span className="text-lavender-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    disabled={status === "submitting"}
                    placeholder="Hi Laiba, I saw your portfolio and would love to discuss an opportunity..."
                    className={`w-full p-3.5 rounded-xl bg-navy-950 border text-xs sm:text-sm text-white placeholder-slate-500 transition-colors outline-none resize-none leading-relaxed ${
                      errors.message && touched.message
                        ? "border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30"
                        : "border-white/10 hover:border-lavender-400/30 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/40"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  {errors.message && touched.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Action / Submit */}
                <div className="pt-2 flex justify-end">
                  <motion.button
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-lavender-400 hover:bg-lavender-300 text-navy-950 transition-all duration-200 shadow-lavender-sm hover:shadow-lavender-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-navy-950" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
