"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, Database, Brain, Sparkles, Terminal, Cpu, Download } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const words = ["Full Stack Developer", "Problem Solver", "Computer Science Student"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden grid-bg">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-violet-600/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-[130px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Content */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          
          {/* Tagline greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 animate-spin-slow" />
            <span>Welcome to my digital space</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Hi, I&apos;m <span className="text-gradient font-black">Laiba</span>
          </motion.h1>

          {/* Rotating Text Area */}
          <div className="h-16 flex items-center mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300"
              >
                {words[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed font-medium"
          >
            A passionate Computer Science student dedicated to <span className="text-slate-200 font-semibold">Building Full Stack Web Applications</span> and solving complex algorithmic challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 hover:-translate-y-0.5 active:scale-95 duration-200"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-violet-500/30 bg-white/5 hover:bg-violet-500/5 text-slate-200 hover:text-violet-300 font-semibold transition-all hover:-translate-y-0.5 active:scale-95 duration-200"
            >
              Contact Me
            </a>
            <a
              href="/api/cv"
              download
              className="flex items-center gap-1.5 px-6 py-3.5 rounded-xl border border-dashed border-violet-500/40 hover:border-violet-500 bg-violet-500/5 hover:bg-violet-500/10 text-violet-300 hover:text-violet-200 font-semibold transition-all hover:-translate-y-0.5 active:scale-95 duration-200"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Avatar & Floating Elements */}
        <div className="md:col-span-5 flex justify-center items-center relative">
          
          {/* Animated gradient rings behind profile */}
          <div className="absolute inset-0 w-80 h-80 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-full blur-2xl opacity-20 animate-pulse-slow" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden glass-card border-white/10 flex items-center justify-center p-2.5 animate-float-slow group"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/api/avatar"
                alt="Laiba's Digital Profile"
                fill
                priority
                unoptimized={true}
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Floating Technology Icons */}
          {/* Icon 1: Frontend Code */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-violet-400 border-white/10 shadow-lg shadow-black/40"
          >
            <Code className="w-5 h-5" />
          </motion.div>

          {/* Icon 2: Databases */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute top-1/2 -right-8 w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-fuchsia-400 border-white/10 shadow-lg shadow-black/40"
          >
            <Database className="w-5 h-5" />
          </motion.div>

          {/* Icon 3: AI Machine Learning */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute -bottom-4 left-1/4 w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-purple-400 border-white/10 shadow-lg shadow-black/40"
          >
            <Brain className="w-5 h-5" />
          </motion.div>
          
          {/* Icon 4: Terminal */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-1/4 -left-12 w-11 h-11 rounded-xl glass-card flex items-center justify-center text-indigo-400 border-white/10 shadow-lg shadow-black/40"
          >
            <Terminal className="w-5 h-5" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
