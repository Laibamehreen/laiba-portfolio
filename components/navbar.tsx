"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Code2, Menu, X, ArrowUpRight, Download, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  // Framer motion scroll hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-transparent backdrop-blur-md border-b border-white/5" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            LAIBA<span className="text-violet-500 font-extrabold animate-pulse">.</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-slate-950/20 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-white/5 hover:border-violet-500/30 bg-white/5 hover:bg-violet-500/5 text-slate-300 hover:text-violet-300 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-violet-400" /> : <Moon className="w-4 h-4 text-violet-400" />}
          </button>
          <a
            href="/api/cv"
            download
            className="flex items-center gap-1.5 px-4.5 py-2.5 text-sm font-bold rounded-xl border border-violet-500/35 hover:border-violet-500 bg-violet-500/5 hover:bg-violet-500/10 text-violet-300 transition-all duration-200"
          >
            <Download className="w-4 h-4" /> CV
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white transition-all shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-95 duration-200"
          >
            Hire Me <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Toggle & Theme Switcher */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-violet-400" /> : <Moon className="w-5 h-5 text-violet-400" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 glass-card mx-6 my-3 rounded-2xl border-white/10 p-5 flex flex-col gap-4 z-50 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white px-3.5 py-2.5 rounded-xl text-base font-semibold hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2.5 w-full">
              <a
                href="/api/cv"
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-xl border border-violet-500/35 bg-violet-500/5 text-violet-300 font-bold transition-all"
              >
                <Download className="w-5 h-5" /> Download CV
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold transition-all shadow-md hover:opacity-95"
              >
                Hire Me <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Scroll Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 origin-left z-50 shadow-md shadow-violet-500/30"
        style={{ scaleX }}
      />
    </motion.header>
  );
}
