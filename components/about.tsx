"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Server, Database, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import { PROFILE_DATA } from "@/data/profile";

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "BS Computer Science",
      subtitle: "COMSATS University (Expected 2028)",
      description: "Strong grounding in data structures, algorithms, object-oriented design, and database architecture.",
    },
    {
      icon: Server,
      title: "Java Backend & Spring Boot",
      subtitle: "Enterprise-Grade Architecture",
      description: "Layered architecture (Controllers, Services, Repositories, Entities, DTOs) and secure REST API services.",
    },
    {
      icon: Database,
      title: "Databases & Persistence",
      subtitle: "Relational & Document Models",
      description: "Working knowledge of PostgreSQL relational schemas and MongoDB document-based data management.",
    },
    {
      icon: Layers,
      title: "Full Stack Web Development",
      subtitle: "End-to-End Integration",
      description: "Connecting responsive frontend interfaces built with React and Next.js to robust backend APIs.",
    },
  ];

  return (
    <ScrollRevealSection id="about" className="py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Background"
          title="About Me"
          subtitle="Software engineer dedicated to resilient backend systems, scalable APIs, and clean full-stack web applications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Narrative Card */}
          <div className="lg:col-span-6 cv-card p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-lavender-400" />
                  Software Engineer
                </h3>
              </div>

              <div className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {PROFILE_DATA.intro}
                </p>
              </div>

              {/* Dedicated Core Strengths */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-lavender-400" />
                  <span>Core Strengths:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROFILE_DATA.coreStrengths.map((strength) => (
                    <motion.div
                      key={strength}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-850/60 border border-lavender-400/15 text-xs text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-lavender-400 shrink-0" />
                      <span>{strength}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap gap-2">
              {["Java", "Spring Boot", "Spring Data JPA", "Spring Security", "REST APIs", "React", "Next.js"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="lavender-chip text-xs cursor-default transition-all duration-150"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full auto-rows-fr">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="h-full cv-card p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-lavender-md"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-lavender-400/10 border border-lavender-400/20 flex items-center justify-center text-lavender-300 mb-3.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-lavender-300/80 mb-2">
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
