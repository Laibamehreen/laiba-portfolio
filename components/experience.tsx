"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Building2, Calendar, MapPin, ExternalLink, FileText } from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import { EXPERIENCE_DATA } from "@/data/experience";

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive drawing of the timeline line as user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 65%"],
  });
  const lineScaleY = useSpring(scrollYProgress, { damping: 25, stiffness: 140 });

  return (
    <ScrollRevealSection id="experience" className="py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Work Experience"
          title="Professional Experience"
          subtitle="A concise record of software engineering internships, core roles, and verified technical contributions."
        />

        <div ref={timelineRef} className="relative sm:pl-8 space-y-8">
          {/* Base Background Timeline Track */}
          <div className="hidden sm:block absolute left-2.5 top-3 bottom-6 w-[2px] bg-white/[0.06] rounded-full" />

          {/* Animated Progressive Glowing Timeline Line */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="hidden sm:block absolute left-2.5 top-3 bottom-6 w-[2px] bg-gradient-to-b from-lavender-400 via-indigo-400 to-purple-400 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]"
            />
          )}

          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={exp.id} className="relative">
              {/* Timeline Experience Node appearing when reached */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: idx * 0.12,
                }}
                className="hidden sm:flex absolute -left-8 top-7 -translate-x-1/2 w-5 h-5 rounded-full bg-navy-950 border-2 border-lavender-400 items-center justify-center z-10 shadow-[0_0_12px_rgba(167,139,250,0.6)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-lavender-300" />
              </motion.div>

              {/* Experience Card: Fades and slides smoothly into place */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -16, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="cv-card p-6 sm:p-7 group hover:border-lavender-400/40 transition-all duration-200 hover:shadow-lavender-md"
              >
                {/* Header: Company Name Most Prominent */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-lavender-400 shrink-0" />
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-lavender-300 transition-colors">
                        {exp.organization}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
                      <span className="font-semibold text-lavender-300 text-sm sm:text-base">
                        {exp.role}
                      </span>
                      {exp.location && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1 text-xs text-slate-400 font-normal">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-slate-300 border border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-lavender-400" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* 2 to 3 Short Summary Points */}
                <ul className="my-4 space-y-2">
                  {exp.highlights.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-lavender-400 shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Row: Technologies & Small Certificate Button */}
                <div className="pt-4 mt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {exp.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 text-xs rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-lavender-300 border border-white/[0.06] hover:border-lavender-400/30 transition-colors duration-150 font-medium cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cert inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-lavender-400/10 hover:bg-lavender-400/20 text-lavender-300 hover:text-white border border-lavender-400/30 hover:border-lavender-400 transition-all duration-200 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-lavender-400" />
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover/cert:translate-x-0.5 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
