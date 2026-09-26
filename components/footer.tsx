"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Heart } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-white/[0.06] bg-navy-950 no-print text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-bold text-white text-sm">{PROFILE_DATA.fullName}</span>
          <span>•</span>
          <span>Software Engineer CV</span>
          <span>•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <Link href="#about" className="hover:text-lavender-300 transition-colors">About</Link>
          <Link href="#education" className="hover:text-lavender-300 transition-colors">Education</Link>
          <Link href="#skills" className="hover:text-lavender-300 transition-colors">Skills</Link>
          <Link href="#experience" className="hover:text-lavender-300 transition-colors">Experience</Link>
          <Link href="#certificates" className="hover:text-lavender-300 transition-colors">Certificates</Link>
          <Link href="#projects" className="hover:text-lavender-300 transition-colors">Projects</Link>
          <Link href="#contact" className="hover:text-lavender-300 transition-colors">Contact</Link>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors border border-white/10"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-lavender-400" />
        </button>
      </div>
    </footer>
  );
}
