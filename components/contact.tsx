"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      return;
    }
    
    setStatus("sending");

    const targetEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "laiba@example.com";
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`
        })
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Me",
      value: "laiba@example.com",
      href: "mailto:laiba@example.com",
      color: "text-violet-400 border-violet-500/20 bg-violet-500/5"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn Connect",
      value: "linkedin.com/in/laiba",
      href: "https://linkedin.com",
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub Profile",
      value: "github.com/laiba",
      href: "https://github.com",
      color: "text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let&apos;s Build Something Premium
          </h3>
          <p className="text-slate-400 max-w-md mt-4 font-medium">
            Contact me for jobs, internships, freelance, open source projects, or simple queries.
          </p>
        </div>

        {/* Form & Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            {contactInfo.map((info, idx) => (
              <motion.a
                href={info.href}
                target={info.href !== "#" ? "_blank" : undefined}
                rel={info.href !== "#" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={info.label}
                className="glass-card p-5 rounded-2.5xl flex items-center gap-5 border-white/5 hover:border-violet-500/25 transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 ${info.color}`}>
                  {info.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    {info.label}
                  </span>
                  <span className="text-sm font-bold text-slate-200 group-hover:text-violet-300 transition-colors">
                    {info.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column: Contact Form (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 glass-card p-8 rounded-3xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Inputs */}
              <div>
                <label htmlFor="name" className="text-slate-350 text-xs font-bold uppercase tracking-wider block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({ ...formState, name: e.target.value });
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/45 text-white text-sm placeholder-slate-650 transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-slate-350 text-xs font-bold uppercase tracking-wider block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/45 text-white text-sm placeholder-slate-650 transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-slate-350 text-xs font-bold uppercase tracking-wider block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/45 text-white text-sm placeholder-slate-650 resize-none transition-all outline-none"
                />
              </div>

              {/* Submit / Status Indicator */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                
                {/* Alert display */}
                <div className="h-8">
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-violet-400 text-xs font-bold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-violet-400" />
                        Message sent successfully!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-fuchsia-400 text-xs font-bold flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-4 h-4 text-fuchsia-400" />
                        All fields are required.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6.5 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm transition-all shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-95 disabled:opacity-50 duration-200"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
