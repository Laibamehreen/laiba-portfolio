"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 no-print ${
        scrolled
          ? "bg-[#080B16]/90 backdrop-blur-md border-b border-lavender-400/10 shadow-lg shadow-black/40"
          : "bg-[#080B16]/60 backdrop-blur-sm border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center group focus:outline-none"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-lavender-300 transition-colors">
              Laiba Mehreen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-lavender-300 bg-lavender-400/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action: Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Quick Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet / Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#080B16]/95 backdrop-blur-xl border-b border-lavender-400/15 animate-in fade-in slide-in-from-top duration-200">
          <div className="px-5 py-6 space-y-3 max-w-sm mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Theme:</span>
                <ThemeToggle />
              </div>
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-lavender-300 bg-lavender-400/15 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
