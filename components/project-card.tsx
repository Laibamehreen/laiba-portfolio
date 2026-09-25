"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ImageIcon } from "lucide-react";
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
      className="cv-card p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-lavender-md overflow-hidden"
    >
      <div>
        {/* Project Thumbnail Image Preview */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-navy-950/60 dark:bg-navy-950/80 border border-slate-200/80 dark:border-white/10 group-hover:border-lavender-400/40 transition-colors duration-300 shadow-inner">
          {previewSrc && !imageError ? (
            <a
              href={project.liveDemoUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="block w-full h-full relative cursor-pointer group/thumb"
            >
              <Image
                src={previewSrc}
                alt={`${project.title} live demo screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-[1.04]"
                onError={() => setImageError(true)}
              />
              {/* Subtle gradient overlay to merge seamlessly with theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-50 dark:opacity-60 group-hover/thumb:opacity-20 transition-opacity duration-300" />
            </a>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 bg-white/[0.02]">
              <ImageIcon className="w-7 h-7 stroke-[1.5] text-slate-600" />
              <span className="text-[11px] tracking-wide font-medium">Demo Preview</span>
            </div>
          )}
        </div>

        {/* Minimal Footer Row: Title & Live Demo Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mt-5">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-lavender-300 transition-colors tracking-tight">
            {project.title}
          </h3>

          {project.liveDemoUrl && (
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-lavender-400 hover:bg-lavender-300 text-navy-950 transition-all duration-200 shadow-lavender-sm hover:shadow-lavender-md active:scale-95 whitespace-nowrap shrink-0 group/demo"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="whitespace-nowrap font-bold">Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-navy-950/80 group-hover/demo:text-navy-950 group-hover/demo:translate-x-0.5 transition-all shrink-0" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}