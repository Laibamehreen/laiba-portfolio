"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  categories: string[];
  demoUrl: string;
  githubUrl: string;
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const projectsData: Project[] = [
    {
      id: 1,
      title: "AI Career Advisor",
      description: "An AI-powered adaptive advisor platform guiding students towards custom-tailored career paths, internships, scholarships, and academic planning profiles derived from deep interest mapping logic.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI"],
      categories: ["Web", "AI"],
      demoUrl: "https://github.com/laiba/ai-career-advisor",
      githubUrl: "https://github.com/laiba/ai-career-advisor"
    },
    {
      id: 2,
      title: "Health Guide App",
      description: "A secure healthcare mobile application providing customized health guidance, symptom monitoring diaries, diagnostic advice integrations, and localized clinical maps.",
      tech: ["React Native", "Firebase", "Expo", "CSS"],
      categories: ["Mobile"],
      demoUrl: "https://github.com/laiba/health-guide-app",
      githubUrl: "https://github.com/laiba/health-guide-app"
    },
    {
      id: 3,
      title: "Hospital Management System",
      description: "A full-stack medical records database and scheduling gateway facilitating physician workflows, patient records retrieval, and bed allocations.",
      tech: ["MongoDB", "React.js", "Node.js", "Express", "CSS"],
      categories: ["Web"],
      demoUrl: "https://github.com/laiba/hospital-mgt-system",
      githubUrl: "https://github.com/laiba/hospital-mgt-system"
    }
  ];

  const filters = ["All", "Web", "AI", "Mobile"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#070A13]/20">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            Showcase
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured Projects
          </h3>
          <p className="text-slate-400 max-w-xl mt-4 font-medium">
            Explore some of the applications and full stack solutions I have designed, built, and deployed.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10 px-2 py-1.5 rounded-2xl border border-white/5 bg-slate-950/20 backdrop-blur-md">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  filter === f
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              className="glass-card rounded-3xl p-6.5 flex flex-col justify-between relative overflow-hidden group glow-effect"
            >
              <div className="mb-4">
                {/* Header (Title and Links) */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-violet-500/10 border border-white/5 hover:border-violet-500/30 text-slate-300 hover:text-violet-300 transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-violet-500/10 border border-white/5 hover:border-violet-500/30 text-slate-300 hover:text-violet-300 transition-all duration-200"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-slate-900/60 border border-white/5 text-slate-300 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
