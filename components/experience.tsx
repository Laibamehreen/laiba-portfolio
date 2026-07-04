"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code, Rocket, Calendar } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export default function Experience() {
  const timelineData: TimelineItem[] = [
    {
      year: "2024",
      title: "Started Computer Science Journey",
      description: "Began academic study in Computer Science, mastering core computer fundamentals, data structures, and foundational programming paradigms.",
      icon: <GraduationCap className="w-5 h-5" />,
      details: ["Mastered C++ and Java basics", "Understood core OOP design systems", "Solved 100+ algorithmic puzzles"]
    },
    {
      year: "2025",
      title: "Explored Web Development & Databases",
      description: "Dived deep into modern web stacks, creating interactive UIs and connecting them to production database engines.",
      icon: <Code className="w-5 h-5" />,
      details: ["Built frontend interfaces with React & Tailwind CSS", "Designed relational & NoSQL schemas", "Authored node API handlers"]
    },
    {
      year: "2026",
      title: "Building AI & Full Stack Applications",
      description: "Pivoting towards end-to-end full stack architecture combined with AI API integrations and machine learning concepts.",
      icon: <Rocket className="w-5 h-5" />,
      details: ["Implemented Next.js 15 route systems", "Configured OpenAI embeddings pipeline", "Created responsive recruiter-friendly portfolios"]
    }
  ];

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#070A13]/30">
      {/* Background radial gradient */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-fuchsia-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            Roadmap
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Learning Journey
          </h3>
          <p className="text-slate-400 max-w-md mt-4 font-medium">
            A chronological timeline detailing my academic progression and engineering growth.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-violet-500/20 ml-4 md:ml-32 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              key={item.year}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-violet-500 flex items-center justify-center text-violet-400 shadow-md shadow-violet-500/25 group-hover:scale-110 group-hover:border-fuchsia-400 group-hover:text-fuchsia-400 transition-all duration-300">
                {item.icon}
              </div>

              {/* Year label (Left offset for Desktop, inside card for Mobile) */}
              <div className="hidden md:block absolute -left-32 top-2.5 text-right w-24">
                <span className="flex items-center justify-end gap-1.5 text-sm font-bold text-violet-400 group-hover:text-fuchsia-400 transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </span>
              </div>

              {/* Milestone Card */}
              <div className="glass-card p-6.5 rounded-3xl border-white/5 hover:border-violet-500/20 shadow-md glow-effect relative overflow-hidden">
                {/* Year indicator for Mobile */}
                <div className="md:hidden flex items-center gap-1.5 mb-3 text-xs font-extrabold tracking-wider text-violet-400 uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-4 font-medium">
                  {item.description}
                </p>

                {/* Sub details bullet points */}
                <ul className="space-y-2 text-xs text-slate-500 font-semibold pl-4 list-disc marker:text-violet-500">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
