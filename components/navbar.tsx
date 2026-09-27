"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const navLinks = [
  { name: "About", href: "/#about", sectionId: "about" },
  { name: "Education", href: "/#education", sectionId: "education" },
  { name: "Skills", href: "/#skills", sectionId: "skills" },
  { name: "Experience", href: "/#experience", sectionId: "experience" },
  { name: "Certificates", href: "/#certificates", sectionId: "certificates" },
  { name: "Projects", href: "/#projects", sectionId: "projects" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.sectionId);
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
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

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        style={{
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print w-full backdrop-blur-md ${
          scrolled
            ? "bg-[#080B16]/85 dark:bg-[#080B16]/85 border-b border-lavender-400/15 shadow-lg shadow-black/40"
            : "bg-[#080B16]/55 dark:bg-[#080B16]/55 border-b border-white/[0.06]"
        }`}
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none"
            aria-label="Laiba Mehreen - Home"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-lavender-300 transition-colors">
              Laiba Mehreen
            </span>
          </Link>

          {/* Desktop Navigation (visible on lg screens, 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
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

          {/* Mobile & Tablet Header Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="p-2.5 rounded-xl text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 active:scale-95 transition-all cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5 text-lavender-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop: clicking outside closes the menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/80 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Mobile Sheet / Drawer with Frosted Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
              }}
              className="lg:hidden fixed top-16 sm:top-20 inset-x-0 z-50 bg-[#080B16]/95 backdrop-blur-xl border-b border-lavender-400/20 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="px-5 py-6 space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Navigation
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Select a section
                  </span>
                </div>

                {navLinks.map((link) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-lavender-300 bg-lavender-400/15 font-semibold border border-lavender-400/30"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                      }`}
                    >
                      <span className="text-sm">{link.name}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-lavender-300" : "text-slate-500"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
    {/* Spacer to preserve document layout offset under fixed navbar */}
    <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />
  </>
  );
}
