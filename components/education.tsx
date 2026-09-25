"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Building, BookOpen, CheckCircle2 } from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import { EDUCATION_DATA } from "@/data/education";

export default function Education() {
  return (
    <ScrollRevealSection id="education" className="py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Academic Background"
          title="Education"
          subtitle="Undergraduate computer science degree emphasizing computing theory, data structures, and modern software engineering."
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="cv-card p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lavender-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-lavender-400/10 border border-lavender-400/25 flex items-center justify-center text-lavender-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-lavender-300 mt-1">
                    <Building className="w-4 h-4 text-lavender-400" />
                    <span>{EDUCATION_DATA.institution}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                {EDUCATION_DATA.status}
              </span>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {EDUCATION_DATA.description}
            </p>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-lavender-400" />
                <span>Key Coursework:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {EDUCATION_DATA.keyCoursework.map((course) => (
                  <motion.div
                    key={course}
                    whileHover={{ scale: 1.03, x: 2 }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-850/60 border border-white/[0.06] text-xs text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-lavender-400 shrink-0" />
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
