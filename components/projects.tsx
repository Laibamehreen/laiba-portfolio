"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import ProjectCard from "./project-card";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  "All",
  "Featured",
  "Java / Backend",
  "Full Stack",
  "AI",
  "Mobile",
  "Frontend",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag-to-scroll state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Filter projects
  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : activeCategory === "Featured"
      ? PROJECTS_DATA.filter((p) => p.featured)
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const featuredCount = PROJECTS_DATA.filter((p) => p.featured).length;

  // Update scroll metrics
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setActiveIndex(0);
      return;
    }

    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < maxScroll - 12);

    // Approximate active card index
    const cardWidth = clientWidth < 640 ? clientWidth * 0.8 : 350;
    const estimatedIndex = Math.min(
      Math.round(scrollLeft / (cardWidth + 24)),
      filteredProjects.length - 1
    );
    setActiveIndex(Math.max(0, estimatedIndex));
  }, [filteredProjects.length]);

  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, filteredProjects]);

  // Smooth mouse wheel translation to horizontal scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      // If user is scrolling mostly vertically on desktop
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 2) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;

        // If at boundaries, allow normal page scroll
        const atStart = scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = scrollLeft >= maxScroll - 2 && e.deltaY > 0;

        if (!atStart && !atEnd && maxScroll > 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    container.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => container.removeEventListener("wheel", handleWheelEvent);
  }, []);

  // Reset scroll position on category filter change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Button navigation
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Scroll directly to a specific card
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsMouseDown(true);
    setHasMoved(false);
    setStartX(e.pageX - container.offsetLeft);
    setScrollStart(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const distance = x - startX;

    if (Math.abs(distance) > 5) {
      setHasMoved(true);
    }

    container.scrollLeft = scrollStart - distance * 1.3;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <ScrollRevealSection
      id="projects"
      className="py-16 md:py-24 border-t border-white/[0.04] relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-lavender-400/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Dynamic Right Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <SectionHeading
              badge="Horizontal Showcase"
              title="Featured Projects & Systems"
              subtitle="An interactive horizontal gallery of enterprise backend systems, full stack applications, AI assistants, and production web platforms."
            />
          </div>

          {/* Desktop Carousel Controls & Indicator */}
          <div className="hidden sm:flex items-center gap-4 self-end pb-4">
            {/* Active Position Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
              <span className="text-lavender-300 font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-500">/</span>
              <span>{String(filteredProjects.length).padStart(2, "0")}</span>
            </div>

            {/* Navigation Arrow Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left to previous project"
                title="Previous Project"
                className="h-10 w-10 rounded-full border-white/10 bg-white/[0.04] hover:bg-lavender-400/20 hover:border-lavender-400/50 hover:text-white disabled:opacity-30 disabled:hover:bg-white/[0.04] transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-slate-200" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right to next project"
                title="Next Project"
                className="h-10 w-10 rounded-full border-white/10 bg-white/[0.04] hover:bg-lavender-400/20 hover:border-lavender-400/50 hover:text-white disabled:opacity-30 disabled:hover:bg-white/[0.04] transition-all"
              >
                <ChevronRight className="w-5 h-5 text-slate-200" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 mb-8 no-print overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isFeatured = cat === "Featured";
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCategoryChange(cat)}
                className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-lavender-400 text-navy-950 shadow-lavender-sm font-bold"
                    : "bg-navy-900/80 dark:bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] backdrop-blur-md"
                }`}
              >
                {isFeatured && (
                  <Sparkles
                    className={`w-3 h-3 ${
                      isActive ? "fill-current" : "text-lavender-400"
                    }`}
                  />
                )}
                <span>{cat}</span>
                {isFeatured && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-navy-950/20 text-navy-950"
                        : "bg-lavender-400/20 text-lavender-300"
                    }`}
                  >
                    {featuredCount}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modern Horizontal Scrolling Showcase */}
      <div className="relative w-full">
        {/* Subtle Left & Right Edge Vignette Gradient Blurs (Desktop) */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#080B16] to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#080B16] to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Horizontal Card Row with generous border distance */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-6 px-6 sm:px-12 lg:px-16 
            ${
              isMouseDown
                ? "cursor-grabbing select-none"
                : "cursor-grab select-auto"
            } touch-pan-x`}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* Bottom Minimal Dots & Mobile Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-4">
        <div className="flex items-center justify-center sm:justify-between gap-4 pt-4 border-t border-white/[0.04]">
          {/* Direct Jump Pill Dots */}
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            {filteredProjects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => scrollToCard(idx)}
                aria-label={`Jump to ${project.title}`}
                title={project.title}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 h-2 bg-lavender-400 shadow-lavender-sm"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-xl px-3 py-1.5 text-xs border-white/10"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-xl px-3 py-1.5 text-xs border-white/10"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
