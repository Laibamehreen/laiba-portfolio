"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Layout, Database, CheckCircle, Code2, ShieldCheck, Cpu } from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import { SKILLS_DATA } from "@/data/skills";

export default function Skills() {
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "backend":
        return Server;
      case "frontend":
        return Layout;
      case "databases":
        return Database;
      default:
        return Code2;
    }
  };

  return (
    <ScrollRevealSection id="skills" className="py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Skills"
          title="Core Competencies"
          subtitle="Specialized in backend architectures with Java & Spring Boot, paired with modern web engineering and data persistence."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SKILLS_DATA.map((category) => {
            const Icon = getCategoryIcon(category.categoryKey);
            const isBackend = category.categoryKey === "backend";

            return (
              <motion.div
                key={category.categoryKey}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`cv-card p-6 flex flex-col justify-between relative transition-shadow duration-300 hover:shadow-lavender-md ${
                  isBackend ? "md:col-span-1 md:row-span-1 border-lavender-400/30 shadow-lavender-sm" : ""
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-lavender-400/10 border border-lavender-400/25 flex items-center justify-center text-lavender-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {category.title}
                        </h3>
                        <span className="text-xs text-lavender-300/80 font-medium">
                          {category.skills.length} Technologies
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category Description */}
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills List / Chips */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ x: 4, transition: { duration: 0.15 } }}
                        className="group flex flex-col p-2.5 rounded-xl bg-navy-850/60 hover:bg-navy-800/80 border border-white/[0.05] hover:border-lavender-400/30 transition-colors duration-150"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white group-hover:text-lavender-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-lavender-400/60 group-hover:bg-lavender-400" />
                        </div>
                        {skill.description && (
                          <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                            {skill.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
