"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import ProjectCard from "./project-card";
import { PROJECTS_DATA } from "@/data/projects";

const categories = ["All", "Java / Backend", "Full Stack", "AI", "Mobile", "Frontend"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <ScrollRevealSection id="projects" className="py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Work"
          title="Engineering Projects"
          subtitle="A showcase of enterprise backend systems, full stack applications, and mobile solutions."
        />

        {/* Filter Pills with Framer Motion */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 no-print">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-lavender-400 text-navy-950 shadow-lavender-sm"
                    : "bg-navy-900 text-slate-400 hover:text-white hover:bg-navy-850 border border-white/[0.06]"
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid with AnimatePresence & layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </ScrollRevealSection>
  );
}
