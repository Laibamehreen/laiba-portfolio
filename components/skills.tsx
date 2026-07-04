"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, Brain, Cpu, CheckCircle2 } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Monitor className="w-5 h-5" />,
      color: "text-violet-400 border-violet-500/25 bg-violet-500/5",
      skills: [
        { name: "Next.js", level: 90 },
        { name: "React", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML5 & CSS3", level: 95 }
      ]
    },
    {
      title: "Backend Engineering",
      icon: <Server className="w-5 h-5" />,
      color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/5",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "REST APIs", level: 88 }
      ]
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5" />,
      color: "text-fuchsia-400 border-fuchsia-500/25 bg-fuchsia-500/5",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 }
      ]
    },
    {
      title: "AI & Data Science",
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-400 border-purple-500/25 bg-purple-500/5",
      skills: [
        { name: "Python", level: 88 },
        { name: "Pandas & NumPy", level: 80 },
        { name: "Machine Learning", level: 75 }
      ]
    },
    {
      title: "Tools & Workflow",
      icon: <Cpu className="w-5 h-5" />,
      color: "text-slate-300 border-slate-500/25 bg-slate-500/5",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "VS Code", level: 95 }
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            Skills Stack
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tools & Technologies
          </h3>
          <p className="text-slate-400 max-w-xl mt-4 font-medium">
            A comprehensive breakdown of the frameworks, libraries, databases, and core libraries I work with.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="glass-card p-6.5 rounded-3xl relative overflow-hidden flex flex-col justify-between glow-effect group"
            >
              {/* Category Title & Icon */}
              <div>
                <div className={`flex items-center gap-3.5 mb-6 ${category.color} border px-4 py-2 rounded-2xl w-fit`}>
                  {category.icon}
                  <span className="text-sm font-bold tracking-wide">{category.title}</span>
                </div>

                {/* Skills List with Progress Bars */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group/item">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-200 text-sm font-semibold flex items-center gap-2 group-hover/item:text-white transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-500/70 group-hover/item:text-violet-400 transition-colors" />
                          {skill.name}
                        </span>
                        <span className="text-slate-400 text-xs font-bold">{skill.level}%</span>
                      </div>

                      {/* Progress Track */}
                      <div className="w-full h-1.5 bg-slate-900/60 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          variants={{
                            hidden: { width: 0 },
                            visible: { width: `${skill.level}%` }
                          }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 rounded-full"
                        />
                      </div>
                    </div>
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
