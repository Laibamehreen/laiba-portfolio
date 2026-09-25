"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2 } from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import ProjectCard from "./project-card";
import { PROJECTS_DATA } from "@/data/projects";

const categories = ["All", "Featured", "Java / Backend", "Full Stack", "AI", "Mobile", "Frontend"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : activeCategory === "Featured"
      ? PROJECTS_DATA.filter((p) => p.featured)
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const featuredCount = PROJECTS_DATA.filter((p) => p.featured).length;

  return (
    <ScrollRevealSection id="projects" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Engineering Showcase"
          title="Featured Projects & Systems"
          subtitle="A curated showcase of enterprise backend systems, full stack applications, interactive AI assistants, and production web platforms."
        />

        {/* Filter Pills with Glassmorphic Design */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 no-print">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isFeatured = cat === "Featured";
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-lavender-400 text-navy-950 shadow-lavender-sm font-bold"
                    : "bg-navy-900/80 dark:bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] backdrop-blur-md"
                }`}
              >
                {isFeatured && <Sparkles className={`w-3 h-3 ${isActive ? "fill-current" : "text-lavender-400"}`} />}
                <span>{cat}</span>
                {isFeatured && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-navy-950/20 text-navy-950" : "bg-lavender-400/20 text-lavender-300"
                    }`}
                  >
                    {featuredCount}
                  </span>
                )}
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
