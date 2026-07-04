"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Laptop, FolderGit2, GraduationCap, Clock, Award } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMs = duration * 1000;
    const intervalTime = Math.max(Math.floor(totalMs / end), 12);
    const steps = totalMs / intervalTime;
    const increment = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface AchievementItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export default function Achievements() {
  const achievements: AchievementItem[] = [
    {
      value: 10,
      suffix: "+",
      label: "Projects Built",
      sub: "From landing portals to database platforms",
      icon: <Laptop className="w-5 h-5 text-violet-400" />
    },
    {
      value: 10,
      suffix: "+",
      label: "GitHub Repositories",
      sub: "Open source contributions & libraries",
      icon: <FolderGit2 className="w-5 h-5 text-indigo-400" />
    },
    {
      value: 15,
      suffix: "+",
      label: "Technologies Learned",
      sub: "Languages, framework libraries & systems",
      icon: <GraduationCap className="w-5 h-5 text-fuchsia-400" />
    },
    {
      value: 1200,
      suffix: "+",
      label: "Learning Hours",
      sub: "Academic studies, labs & deep dev coding",
      icon: <Clock className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#070A13]/20">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-fuchsia-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            Metrics
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Key Achievements
          </h3>
          <p className="text-slate-400 max-w-md mt-4 font-medium">
            Milestones and stats highlighting my continuous growth and contributions.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={item.label}
              className="glass-card p-6.5 rounded-3xl relative overflow-hidden flex flex-col justify-between glow-effect group"
            >
              {/* Card Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:border-violet-500/30 group-hover:bg-violet-500/5 transition-all duration-300">
                {item.icon}
              </div>

              {/* Big Number */}
              <div className="mb-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">
                  <Counter value={item.value} suffix={item.suffix} />
                </span>
              </div>

              {/* Label & Description */}
              <div>
                <h4 className="text-slate-200 text-sm font-bold tracking-wide uppercase mb-1.5">
                  {item.label}
                </h4>
                <p className="text-slate-450 text-xs leading-relaxed font-semibold">
                  {item.sub}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
