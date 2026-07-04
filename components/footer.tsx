"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/5 bg-[#05070D]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform duration-300">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-wider text-white">
              LAIBA<span className="text-violet-500 font-extrabold">.</span>
            </span>
          </a>
          <span className="text-slate-500 text-xs font-semibold mt-1">
            &copy; {currentYear} Laiba. All rights reserved.
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {[
            { icon: <Github className="w-4 h-4" />, href: "https://github.com", label: "GitHub" },
            { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: <Mail className="w-4 h-4" />, href: "mailto:laiba@example.com", label: "Email" }
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href !== "#" ? "_blank" : undefined}
              rel={social.href !== "#" ? "noopener noreferrer" : undefined}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-500/10 border border-white/5 hover:border-violet-500/30 text-slate-400 hover:text-violet-300 transition-all duration-200"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 transition-all active:scale-95 duration-200 border border-violet-500/30"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
