"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Achievements from "@/components/achievements";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // slight delay after 100%
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(prev + Math.floor(diff), 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#070A13] flex flex-col items-center justify-center z-50 pointer-events-auto"
          >
            {/* Logo container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-xl shadow-violet-500/20">
                <Code2 className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-extrabold text-2xl tracking-widest text-white">
                LAIBA<span className="text-violet-500 font-extrabold">.</span>
              </span>
            </motion.div>

            {/* Progress status */}
            <div className="w-64 flex flex-col items-center gap-3">
              {/* Progress Text */}
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Initializing Workspace <span className="text-violet-400 font-extrabold ml-1">{progress}%</span>
              </span>

              {/* Progress Bar Track */}
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Decorative glows */}
            <div className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-fuchsia-600/5 blur-[100px] pointer-events-none" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Portfolio Sections */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          {/* Navigation Bar */}
          <Navbar />

          {/* Main sections */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
