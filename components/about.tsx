"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Lightbulb, Sparkles } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#070A13]/30">
      {/* Decorative Blur Blob */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            About Me
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Learning, Building, Improving
          </h3>
          <p className="text-slate-455 max-w-2xl mt-4 font-semibold text-sm sm:text-base leading-relaxed">
            I&apos;m a Computer Science student who enjoys learning new technologies and building projects. I like turning ideas into working applications and continuously improving my skills through practice and real world experience.
          </p>
        </div>

        {/* Restructured 3-Card Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Card 1: Background (Span 2) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group glow-effect"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 text-violet-400 pointer-events-none">
              <GraduationCap className="w-48 h-48" />
            </div>
            
            <div className="flex items-center gap-3.5 mb-6 text-violet-400">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Background</span>
            </div>
            
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
              Computer Science Student
            </h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              Currently studying Computer Science and developing a strong foundation in programming, databases, software development, and problem solving. I enjoy applying what I learn by working on personal and academic projects.
            </p>
          </motion.div>

          {/* Card 2: Highlights / Stats */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden glow-effect group"
          >
            <div className="flex items-center gap-3.5 mb-6 text-fuchsia-400">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Highlights</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6 my-auto">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight">
                  10+
                </span>
                <span className="text-slate-350 text-xs font-bold uppercase mt-1.5 tracking-wider">
                  Projects Completed
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight">
                  10+
                </span>
                <span className="text-slate-355 text-xs font-bold uppercase mt-1.5 tracking-wider">
                  GitHub Repositories
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Interests (Span 3 - Spans bottom row completely) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 glass-card p-8 rounded-3xl relative overflow-hidden group glow-effect"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 text-violet-400 pointer-events-none">
              <Lightbulb className="w-48 h-48" />
            </div>

            <div className="flex items-center gap-3.5 mb-6 text-violet-400">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Interests</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
              Web Development & Technology
            </h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              I enjoy creating websites and applications, learning modern tools, and exploring different areas of software development. Every project gives me an opportunity to learn something new.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
