"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectWithImage = ProjectItem & {
  image?: string;
  previewImage?: string;
};

interface ProjectCardProps {
  project: ProjectWithImage;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt & Interactive Spotlight States
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const previewSrc = project.image || project.previewImage;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth subtle tilt calculation (-6 to +6 degrees)
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex-shrink-0 w-[80vw] sm:w-[320px] md:w-[340px] lg:w-[350px] snap-center sm:snap-start select-none"
    >
      {/* 3D Tilt Wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
        whileHover={{ y: -6 }}
        className="relative h-[470px] sm:h-[490px] rounded-2xl p-[1px] group transition-all duration-300"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Gradient Border Container */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
            isHovered
              ? "bg-gradient-to-br from-lavender-400 via-purple-500/40 to-lavender-400/60 opacity-100 shadow-[0_0_30px_-5px_rgba(167,139,250,0.35)]"
              : project.featured
              ? "bg-gradient-to-br from-lavender-400/40 via-white/10 to-lavender-400/20 opacity-80"
              : "bg-gradient-to-b from-white/15 via-white/5 to-white/10 opacity-60"
          }`}
        />

        {/* Outer Shadow & Glow */}
        <div
          className={`absolute -inset-0.5 rounded-2xl bg-lavender-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`}
        />

        {/* Inner Card (shadcn/ui Card Component) */}
        <Card className="relative w-full h-full rounded-[calc(1rem-1px)] bg-[#0E1326]/90 dark:bg-[#0E1326]/95 border-0 shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
          {/* Mouse Spotlight Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[calc(1rem-1px)]"
            style={{
              opacity: isHovered ? 0.8 : 0,
              background: `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(167, 139, 250, 0.16), transparent 70%)`,
            }}
          />

          {/* Diagonal Shine Sweep on Hover */}
          <div className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-12" />

          {/* Top Section: Media Preview, Badges, Header & Content */}
          <div className="relative z-10 flex flex-col flex-grow">
            {/* Project Image Preview */}
            <div className="relative w-full aspect-video overflow-hidden rounded-t-[calc(1rem-1px)] bg-navy-950/80 border-b border-white/[0.06] group/thumb">
              {previewSrc && !imageError ? (
                <a
                  href={project.liveDemoUrl || project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="block w-full h-full relative cursor-pointer"
                >
                  <Image
                    src={previewSrc}
                    alt={`${project.title} live interface preview`}
                    fill
                    sizes="(max-width: 768px) 85vw, 420px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1326] via-[#0E1326]/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                </a>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 bg-white/[0.02]">
                  <Layers className="w-8 h-8 stroke-[1.5] text-lavender-400/50" />
                  <span className="text-[11px] tracking-wide font-medium text-slate-400">
                    System Architecture
                  </span>
                </div>
              )}

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 pointer-events-none z-10">
                {project.featured && (
                  <Badge variant="default" className="shadow-md text-[10px] uppercase tracking-wider py-0.5 px-2.5">
                    <Sparkles className="w-3 h-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
                <Badge variant="secondary" className="text-[10px] py-0.5 px-2.5">
                  {project.category}
                </Badge>
              </div>

              {/* Tech Stack Summary Badge (Top Right) */}
              <div className="absolute top-3 right-3 pointer-events-none z-10">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-navy-950/80 text-lavender-300/90 border border-white/10 backdrop-blur-md">
                  {project.technologies[0] || "Code"}
                </span>
              </div>
            </div>

            {/* Card Header */}
            <CardHeader className="p-4 pb-1.5">
              <CardTitle className="text-base sm:text-lg font-bold text-white group-hover:text-lavender-300 transition-colors line-clamp-1">
                {project.title}
              </CardTitle>
              <p className="text-[11px] font-mono text-lavender-400/80 tracking-wide pt-0.5">
                {project.techStackSummary}
              </p>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="p-4 pt-0.5 pb-2 flex-grow flex flex-col justify-between">
              <CardDescription className="text-xs text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2.5">
                {project.shortDescription}
              </CardDescription>

              {/* Technology Badges with Subtle Motion */}
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ y: -1.5, scale: 1.04 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-[10px] font-normal py-0.5 px-2 bg-white/[0.03] text-slate-300 border-white/[0.08] hover:border-lavender-400/40 hover:text-white transition-colors"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[9.5px] text-slate-400 font-mono px-1">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </CardContent>
          </div>

          {/* Card Footer: Action Buttons (GitHub Repo + Live Demo) with Independent Icon Reactions */}
          <CardFooter className="p-4 pt-2.5 border-t border-white/[0.08] bg-white/[0.01] relative z-10 flex items-center justify-between gap-2">
            {project.githubUrl ? (
              <motion.a
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                title="View GitHub Repository"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 group/git"
              >
                <Github className="w-3.5 h-3.5 text-slate-400 group-hover/git:text-white group-hover/git:scale-110 transition-all shrink-0" />
                <span>Source</span>
              </motion.a>
            ) : (
              <div />
            )}

            {project.liveDemoUrl && (
              <motion.a
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demonstration of ${project.title}`}
                title="Open Live Demonstration"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
                  bg-lavender-400 hover:bg-lavender-300 text-navy-950 transition-all duration-200 shadow-lavender-sm hover:shadow-lavender-md whitespace-nowrap group/demo ml-auto cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-navy-950/80 group-hover/demo:text-navy-950 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform shrink-0" />
              </motion.a>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}