"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Download,
  Mail,
  ExternalLink,
  MapPin,
  Check,
  Loader2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROFILE_DATA } from "@/data/profile";
import { downloadResumeFile } from "@/lib/download-cv";

// ==========================================
// 1. ANIMATED STATISTICS COUNTER COMPONENT
// ==========================================
function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Smooth cubic out easing
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * value;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ==========================================
// 2. PROFESSIONAL TYPING TITLE COMPONENT
// ==========================================
const ROLES = [
  "Software Engineer",
  "Java & Spring Boot Engineer",
  "RESTful API Architect",
  "Full-Stack Web Developer",
];

function TypingTitle() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(ROLES[0]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 35);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <div className="inline-flex items-center min-h-[32px] sm:min-h-[38px]">
      <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-lavender-200 to-lavender-400 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span className="inline-block w-[3px] h-6 sm:h-7 ml-1.5 bg-lavender-400 animate-pulse rounded-full" />
    </div>
  );
}

// ==========================================
// 3. 3D INTERACTIVE PROFILE CARD COMPONENT
// ==========================================
function InteractiveProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Silky 60fps spring physics for 3D card tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 180,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1100 }}
      className="w-full flex justify-center sticky top-28"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className="w-full max-w-md rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-shadow duration-300
          bg-navy-900/75 dark:bg-[#0E1326]/85 backdrop-blur-2xl border border-lavender-400/25
          shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(167,139,250,0.22)] group"
      >
        {/* Ambient Top Glow in Card */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-lavender-400/10 rounded-full blur-2xl pointer-events-none -z-10 group-hover:bg-lavender-400/20 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Profile Image with Ring & Floating Badge */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-5">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-lavender-400/40 via-lavender-500/10 to-transparent shadow-card-subtle"
            >
              <div className="w-full h-full rounded-[0.9rem] overflow-hidden bg-navy-950 relative">
                <Image
                  src={PROFILE_DATA.image}
                  alt={`${PROFILE_DATA.fullName} - Software Engineer`}
                  fill
                  unoptimized
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Availability Pill */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/90 border border-emerald-400/30 text-[11px] font-semibold text-emerald-300 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Available for Roles</span>
            </div>
          </div>

          {/* Name & Academic Credentials */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2">
            {PROFILE_DATA.fullName}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-lavender-300 mt-1">
            BS Computer Science • COMSATS University
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            <MapPin className="w-3.5 h-3.5 text-lavender-400 shrink-0" />
            <span>{PROFILE_DATA.location}</span>
          </div>

          {/* Key Metric Snapshot Grid */}
          <div className="w-full grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/[0.08] text-left">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                Academic CGPA
              </span>
              <span className="text-sm font-bold text-lavender-300">
                3.75 / 4.00
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                Degree Status
              </span>
              <span className="text-sm font-bold text-slate-200">
                Expected 2028
              </span>
            </div>
          </div>

          {/* Domain Badges */}
          <div className="w-full flex flex-wrap justify-center gap-1.5 mt-4">
            {["Java Backend", "Spring Boot", "REST APIs", "Full Stack", "Data Structures"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-lavender-400/10 border border-lavender-400/20 text-lavender-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social Quick Shortcuts */}
          <div className="w-full flex items-center justify-center gap-2 pt-4 mt-4 border-t border-white/[0.08]">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              title="Send Email"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-lavender-400/20 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-lavender-400/20 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-lavender-400/20 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01649656063f558079"
              target="_blank"
              rel="noopener noreferrer"
              title="Upwork Profile"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-lavender-400/20 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// 4. MAIN ABOUT COMPONENT
// ==========================================
export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Resume Download State
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(false);

  const handleResumeDownload = () => {
    setDownloadingResume(true);
    downloadResumeFile("Laiba_Mehreen_Resume.pdf");
    setTimeout(() => {
      setDownloadingResume(false);
      setDownloadedResume(true);
      setTimeout(() => setDownloadedResume(false), 3000);
    }, 450);
  };

  // Mouse Follow Glow Springs
  const glowX = useMotionValue(-1000);
  const glowY = useMotionValue(-1000);
  const smoothGlowX = useSpring(glowX, { stiffness: 120, damping: 25 });
  const smoothGlowY = useSpring(glowY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    glowX.set(-1000);
    glowY.set(-1000);
  };

  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Skill Badges Data
  const skillBadges = [
    { name: "Java", category: "Backend" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Spring Data JPA", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Git & GitHub", category: "DevOps" },
    { name: "Docker", category: "DevOps" },
  ];

  // Mini Timeline Data
  const timelineEntries = [
    {
      organization: "Warmbytes Private Limited",
      role: "Java Developer Intern",
      period: "Jul – Sep 2026",
      location: "Islamabad, Pakistan",
      highlights: "Engineered Java & Spring Boot backend services, implemented transactional REST endpoints, and integrated PostgreSQL via Spring Data JPA.",
      badge: "Verified Credential",
    },
    {
      organization: "Xappo Enterprises",
      role: "Full Stack Developer Intern",
      period: "Jun – Aug 2026",
      location: "Mosta, Malta",
      highlights: "Built responsive frontend architectures with React & Next.js, and integrated cross-system REST APIs with automated testing workflows.",
      badge: "Ref: XAPPO-INT-2026-09",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-20 md:py-28 border-t border-white/[0.04] overflow-hidden scroll-mt-20"
    >
      {/* ====================================================
          2. FLOATING BACKGROUND GRADIENT EFFECTS (Continuous)
          ==================================================== */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Blob 1: Lavender top-left */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 45, -35, 0],
                  y: [0, -35, 25, 0],
                  scale: [1, 1.12, 0.95, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-lavender-400/[0.07] blur-3xl pointer-events-none"
        />

        {/* Blob 2: Deep Indigo bottom-right */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -50, 40, 0],
                  y: [0, 40, -30, 0],
                  scale: [1, 0.92, 1.1, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-24 w-[560px] h-[560px] rounded-full bg-indigo-500/[0.06] blur-3xl pointer-events-none"
        />

        {/* Blob 3: Center Soft Cyan Glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 30, -30, 0],
                  y: [0, 20, -20, 0],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-lavender-500/[0.04] blur-3xl pointer-events-none"
        />
      </div>

      {/* ====================================================
          8. MOUSE FOLLOW GLOW (Ultra subtle, low opacity)
          ==================================================== */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            x: smoothGlowX,
            y: smoothGlowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute pointer-events-none w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_70%)] blur-2xl -z-10"
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====================================================
            10. MODERN TWO-COLUMN LAYOUT
            ==================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* ====================================================
              LEFT COLUMN: About Content, Narrative, Stats, Timeline (7 Cols)
              ==================================================== */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header: Badge & Staggered Reveal Title */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-lavender-400/10 text-lavender-300 border border-lavender-400/20">
                <Sparkles className="w-3.5 h-3.5 text-lavender-400" />
                <span>About Me</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-lavender-300 via-indigo-200 to-white bg-clip-text text-transparent">
                    {PROFILE_DATA.fullName}
                  </span>
                </h2>
                <div className="mt-1.5">
                  <TypingTitle />
                </div>
              </div>
            </motion.div>

            {/* Narrative with Gradient Highlighted Keywords */}
            <motion.div
              variants={itemVariants}
              className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3.5"
            >
              <p>
                I am a Computer Science student at{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-lavender-300 to-indigo-200 bg-clip-text text-transparent">
                  COMSATS University
                </span>{" "}
                specializing in{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-lavender-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Java Backend Engineering
                </span>
                ,{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-lavender-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Spring Boot Architecture
                </span>
                , and high-performance{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-lavender-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  RESTful APIs
                </span>
                .
              </p>
              <p className="text-slate-300/90">
                Through hands-on software engineering internships at{" "}
                <span className="text-slate-100 font-medium">Warmbytes Private Limited</span>{" "}
                and{" "}
                <span className="text-slate-100 font-medium">Xappo Enterprises</span>
                , I have built production-grade microservice endpoints, managed relational persistence with{" "}
                <span className="text-slate-100 font-medium">Spring Data JPA & PostgreSQL</span>
                , and crafted modern, responsive client interfaces with{" "}
                <span className="text-slate-100 font-medium">React & Next.js</span>.
              </p>
            </motion.div>

            {/* ====================================================
                4. ANIMATED STATISTICS GRID (Counts Up When Visible)
                ==================================================== */}
            <motion.div variants={itemVariants} className="space-y-2.5">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-lavender-400" />
                <span>Academic & Engineering Metrics</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Metric 1: CGPA */}
                <div className="p-4 rounded-2xl bg-navy-900/60 dark:bg-[#0E1326]/70 border border-lavender-400/20 backdrop-blur-xl hover:border-lavender-400/40 transition-all duration-200 group">
                  <div className="text-2xl sm:text-3xl font-extrabold text-lavender-300 group-hover:scale-105 transition-transform duration-200">
                    <AnimatedCounter value={3.75} decimals={2} />
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    Academic CGPA
                  </div>
                  <div className="text-[11px] text-slate-400">
                    COMSATS Univ.
                  </div>
                </div>

                {/* Metric 2: Projects */}
                <div className="p-4 rounded-2xl bg-navy-900/60 dark:bg-[#0E1326]/70 border border-lavender-400/20 backdrop-blur-xl hover:border-lavender-400/40 transition-all duration-200 group">
                  <div className="text-2xl sm:text-3xl font-extrabold text-lavender-300 group-hover:scale-105 transition-transform duration-200">
                    <AnimatedCounter value={6} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    Projects Built
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Backend & Full-Stack
                  </div>
                </div>

                {/* Metric 3: Certifications */}
                <div className="p-4 rounded-2xl bg-navy-900/60 dark:bg-[#0E1326]/70 border border-lavender-400/20 backdrop-blur-xl hover:border-lavender-400/40 transition-all duration-200 group">
                  <div className="text-2xl sm:text-3xl font-extrabold text-lavender-300 group-hover:scale-105 transition-transform duration-200">
                    <AnimatedCounter value={2} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    Certifications
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Industry Credentials
                  </div>
                </div>

                {/* Metric 4: Internships */}
                <div className="p-4 rounded-2xl bg-navy-900/60 dark:bg-[#0E1326]/70 border border-lavender-400/20 backdrop-blur-xl hover:border-lavender-400/40 transition-all duration-200 group">
                  <div className="text-2xl sm:text-3xl font-extrabold text-lavender-300 group-hover:scale-105 transition-transform duration-200">
                    <AnimatedCounter value={2} />
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    Internships
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Warmbytes & Xappo
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ====================================================
                6. INTERACTIVE SKILLS PREVIEW (shadcn Badge Components)
                ==================================================== */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-lavender-400" />
                  <span>Core Tech Stack Preview</span>
                </h4>
                <a
                  href="#skills"
                  className="text-xs font-medium text-lavender-400 hover:text-lavender-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>View All Skills</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillBadges.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.04,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-default px-3 py-1.5 text-xs font-medium rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 
                        hover:text-white hover:border-lavender-400 hover:bg-lavender-400/10 hover:shadow-[0_0_15px_rgba(167,139,250,0.3)] transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-lavender-400 shrink-0" />
                      <span>{skill.name}</span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ====================================================
                7. EXPERIENCE TIMELINE PREVIEW (Mini Animated Timeline)
                ==================================================== */}
            <motion.div variants={itemVariants} className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-lavender-400" />
                  <span>Experience Timeline Preview</span>
                </h4>
                <a
                  href="#experience"
                  className="text-xs font-medium text-lavender-400 hover:text-lavender-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Full Experience</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="relative pl-6 space-y-4">
                {/* Animated Vertical Timeline Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-lavender-400 via-indigo-500/40 to-transparent origin-top"
                />

                {timelineEntries.map((exp, idx) => (
                  <motion.div
                    key={exp.organization}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -16 : 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 4 }}
                    className="relative p-4 rounded-2xl bg-navy-900/50 dark:bg-[#0E1326]/60 border border-white/[0.08] hover:border-lavender-400/30 transition-all duration-200 group"
                  >
                    {/* Glowing Node Dot */}
                    <div className="absolute -left-[27px] top-5 w-3.5 h-3.5 rounded-full bg-lavender-400 ring-4 ring-lavender-400/20 group-hover:scale-125 transition-transform" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h5 className="text-sm font-bold text-white group-hover:text-lavender-300 transition-colors">
                        {exp.role}
                      </h5>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-lavender-400/10 text-lavender-300 border border-lavender-400/20">
                        {exp.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="font-medium text-slate-300">{exp.organization}</span>
                      <span>•</span>
                      <span>{exp.period}</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {exp.highlights}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ====================================================
                9. PREMIUM BUTTONS (Resume + Upwork + Connect Me)
                ==================================================== */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]"
            >
              {/* Premium Resume Button with Shine Sweep Animation */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={handleResumeDownload}
                  disabled={downloadingResume}
                  aria-label="Download Official Resume"
                  className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-bold rounded-xl
                    bg-lavender-400 hover:bg-lavender-300 text-navy-950 shadow-lavender-sm hover:shadow-lavender-md
                    transition-all duration-200 whitespace-nowrap group/btn overflow-hidden cursor-pointer active:scale-95"
                >
                  {/* Sweep Glimmer Effect */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine-sweep" />
                  </div>

                  {downloadingResume ? (
                    <Loader2 className="w-4 h-4 text-navy-950 animate-spin shrink-0" />
                  ) : downloadedResume ? (
                    <Check className="w-4 h-4 text-navy-950 shrink-0" />
                  ) : (
                    <Download className="w-4 h-4 text-navy-950 shrink-0 transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                  )}

                  <span className="relative z-10">
                    {downloadedResume ? "Resume Saved!" : "Download CV / Resume"}
                  </span>
                </button>
              </motion.div>

              {/* Upwork Button with Hover Scale & Glow */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="https://www.upwork.com/freelancers/~01649656063f558079"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit my Upwork Profile"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-xl
                    bg-transparent hover:bg-lavender-400/10 text-white hover:text-lavender-300
                    border border-lavender-400/30 hover:border-lavender-400
                    hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-all duration-300 whitespace-nowrap group/upwork cursor-pointer"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-current text-lavender-400 group-hover/upwork:text-lavender-300 shrink-0 transition-colors"
                    aria-hidden="true"
                  >
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                  </svg>
                  <span>Upwork Profile</span>
                </a>
              </motion.div>

              {/* Connect Me Button Linking to #contact */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="#contact"
                  aria-label="Navigate to Contact Section"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl
                    bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white
                    border border-white/10 hover:border-lavender-400/40 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-lavender-400 shrink-0" />
                  <span>Get in Touch</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ====================================================
              RIGHT COLUMN: Interactive 3D Glassmorphism Profile Card (5 Cols)
              ==================================================== */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <InteractiveProfileCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
