"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/data/projects";

type ProjectWithImage = ProjectItem & {
  image?: string;
  previewImage?: string;
};

interface ProjectCardProps {
  project: ProjectWithImage;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const previewSrc = project.image || project.previewImage;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`cv-card p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 overflow-hidden relative ${
        project.featured ? "border-lavender-400/30 hover:border-lavender-400/60 shadow-lavender-sm" : ""
      }`}
    >
      {/* Subtle Specular Glow Gradient on Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-lavender-400/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Project Thumbnail Image Preview with Glassmorphic Floating Badges */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-navy-950/70 dark:bg-navy-950/80 border border-slate-200/80 dark:border-white/10 group-hover:border-lavender-400/40 transition-colors duration-300 shadow-inner">
          {previewSrc && !imageError ? (
            <a
              href={project.liveDemoUrl || project.githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
              className="block w-full h-full relative cursor-pointer group/thumb"
            >
              <Image
                src={previewSrc}
                alt={`${project.title} live preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-[1.04]"
                onError={() => setImageError(true)}
              />
              {/* Subtle gradient overlay to merge seamlessly with theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent opacity-60 group-hover/thumb:opacity-25 transition-opacity duration-300" />
            </a>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 bg-white/[0.02]">
              <Layers className="w-8 h-8 stroke-[1.5] text-lavender-400/40" />
              <span className="text-[11px] tracking-wide font-medium text-slate-400">Project Architecture Preview</span>
            </div>
          )}

          {/* Floating Badges on Image */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 pointer-events-none">
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-lavender-400 text-navy-950 shadow-md backdrop-blur-md">
                <Sparkles className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-navy-900/85 dark:bg-black/75 text-lavender-300 border border-white/10 backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Title & Tech Summary */}
        <div className="mt-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-lavender-300 transition-colors tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Technology Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium 
                bg-white/[0.04] dark:bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:border-lavender-400/30 hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons Row: GitHub Repo + Live Demo */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code of ${project.title} on GitHub`}
            title="View GitHub Repository"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold
              bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 group/git"
          >
            <Github className="w-3.5 h-3.5 text-slate-400 group-hover/git:text-white transition-colors" />
            <span>Source Code</span>
          </a>
        ) : (
          <div />
        )}

        {project.liveDemoUrl && (
          <motion.a
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live deployment of ${project.title}`}
            title="Open Live Demonstration"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold
              bg-lavender-400 hover:bg-lavender-300 text-navy-950 transition-all duration-200 shadow-lavender-sm hover:shadow-lavender-md active:scale-95 whitespace-nowrap shrink-0 group/demo"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Live Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-navy-950/80 group-hover/demo:text-navy-950 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform shrink-0" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}