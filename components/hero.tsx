"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, Download, Check, Loader2, Sparkles } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { downloadResumeFile } from "@/lib/download-cv";

export default function Hero() {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(false);

  // Interactive 3D Parallax & Physics Tilt on Portrait Image
  const imageCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle 240px at ${x}% ${y}%, rgba(255, 255, 255, 0.28), transparent 70%)`
  );
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setIsImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsImageHovered(false);
  };

  const handleResumeDownload = () => {
    setDownloadingResume(true);
    setTimeout(() => {
      setDownloadingResume(false);
      setDownloadedResume(true);
      setTimeout(() => setDownloadedResume(false), 3000);
    }, 400);
  };
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle Lavender Ambient Glows */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-lavender-400 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-lavender-500 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Print-only CV Header */}
      <div className="hidden print-only mb-6 pb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-black uppercase tracking-tight">{PROFILE_DATA.fullName}</h1>
        <p className="text-base font-semibold text-gray-800 mt-1">{PROFILE_DATA.title} • {PROFILE_DATA.roleSubtitle}</p>
        <p className="text-sm text-gray-600 mt-2">{PROFILE_DATA.intro}</p>
        <div className="flex gap-4 text-xs text-gray-600 mt-3">
          <span>Email: {PROFILE_DATA.email}</span>
          <span>Education: {PROFILE_DATA.education.institution} ({PROFILE_DATA.education.degree})</span>
          <span>Status: {PROFILE_DATA.education.status}</span>
          <span>Location: {PROFILE_DATA.location}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
          >
            

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-5"
            >
              <span className="tracking-wider uppercase">{PROFILE_DATA.fullName}</span>
            </motion.h1>

            {/* Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-base sm:text-lg md:text-xl font-semibold text-lavender-300 mb-3"
            >
              <span>{PROFILE_DATA.title}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-normal text-sm sm:text-base">{PROFILE_DATA.roleSubtitle}</span>
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
            >
              {PROFILE_DATA.intro}
            </motion.p>

            {/* Main Action Buttons: Resume & Connect Me */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              {/* Resume Direct Download Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="/api/cv"
                  download="Laiba_Mehreen_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleResumeDownload}
                  aria-label="Download Resume"
                  title="Download Resume (PDF)"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
                    bg-lavender-400 hover:bg-lavender-300 text-navy-950 shadow-lavender-sm hover:shadow-lavender-md
                    transition-all duration-200 whitespace-nowrap group/resume cursor-pointer active:scale-95"
                >
                  {downloadingResume ? (
                    <Loader2 className="w-4 h-4 text-navy-950 animate-spin shrink-0" />
                  ) : downloadedResume ? (
                    <Check className="w-4 h-4 text-navy-950 shrink-0" />
                  ) : (
                    <Download className="w-4 h-4 text-navy-950 shrink-0 transition-transform group-hover/resume:translate-y-0.5" />
                  )}
                  <span className="whitespace-nowrap font-bold">
                    {downloadedResume ? "Saved to Files!" : "Resume"}
                  </span>
                </a>
              </motion.div>

              {/* Connect Me Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#contact"
                  aria-label="Navigate to Contact section"
                  title="Connect with me"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
                    bg-transparent hover:bg-lavender-400/10 text-white hover:text-lavender-300
                    border border-lavender-400/30 hover:border-lavender-400 shadow-sm transition-all duration-200 whitespace-nowrap group/connect cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-lavender-400 group-hover/connect:text-lavender-300 shrink-0 transition-colors" />
                  <span className="whitespace-nowrap font-medium">Connect Me</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Social & Contact Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center lg:justify-start gap-2.5 pt-4 border-t border-white/[0.08]"
            >
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${PROFILE_DATA.email}`}
                title={`Send email to ${PROFILE_DATA.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-lavender-400/15 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-lavender-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-lavender-400/15 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 flex items-center justify-center transition-all duration-200"
              >
                <Github className="w-4 h-4 text-lavender-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-lavender-400/15 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-lavender-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.upwork.com/freelancers/~01649656063f558079"
                target="_blank"
                rel="noopener noreferrer"
                title="Upwork Profile"
                aria-label="Upwork Profile"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-lavender-400/15 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 flex items-center justify-center transition-all duration-200"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current text-lavender-400"
                  aria-hidden="true"
                >
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: High-Animation Studio Portrait Showcase (Pure Image, No Extra Badges/Text) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative select-none"
            >
              {/* Layer 1: Multi-Color Pulsing & Morphing Ambient Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.4, 0.75, 0.4],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-10 rounded-full bg-gradient-to-tr from-lavender-400/40 via-purple-600/30 to-indigo-500/40 blur-3xl pointer-events-none -z-10"
              />

              {/* Layer 2: Fast Iridescent Conic Border Ring (Clockwise) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-2.5 rounded-[2.3rem] bg-[conic-gradient(from_0deg,#c084fc_0%,#818cf8_25%,#38bdf8_50%,#e879f9_75%,#c084fc_100%)] opacity-70 blur-md pointer-events-none"
              />

              {/* Layer 3: Counter-Rotating Fine Border Halo (Counter-Clockwise) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-1 rounded-[2.1rem] bg-[conic-gradient(from_180deg,#818cf8_0%,#c084fc_50%,#38bdf8_100%)] opacity-80 blur-sm pointer-events-none"
              />

              {/* Layer 4: Interactive 3D Floating Tilt Card Frame */}
              <motion.div
                ref={imageCardRef}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  y: [0, -16, 0],
                  rotateZ: [0, 1.2, -1.2, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.04 }}
                className="relative w-64 h-76 sm:w-72 sm:h-84 md:w-80 md:h-[26rem] rounded-3xl p-1.5 bg-gradient-to-b from-lavender-400/40 via-lavender-500/20 to-transparent shadow-2xl shadow-lavender-400/25 cursor-pointer group"
              >
                {/* Inner Clipping Viewport */}
                <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-navy-950 relative border border-white/15 shadow-inner">
                  {/* Portrait Image with Scale & Contrast Lift */}
                  <Image
                    src={PROFILE_DATA.image}
                    alt={PROFILE_DATA.fullName}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 group-hover:contrast-105 group-hover:brightness-105"
                  />

                  {/* Continuous Holographic Specular Beam Sweep (Automatic Periodic Glint) */}
                  <motion.div
                    animate={{ x: ["-160%", "260%"] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatDelay: 2.2,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-25 pointer-events-none z-10"
                  />

                  {/* Dynamic Specular Sheen Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-15" />

                  {/* Interactive Glare Spotlight tracking Mouse Cursor */}
                  <motion.div
                    style={{
                      background: glareBackground,
                      opacity: isImageHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 pointer-events-none z-20"
                  />

                  {/* Subtle Cinematic Bottom & Top Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-navy-950/20 pointer-events-none" />
                </div>
              </motion.div>

              {/* Corner Glint Energy Orbs */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.95, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-lavender-300 blur-sm pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.95, 0.4] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-purple-400 blur-sm pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.85, 0.3] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-cyan-300 blur-sm pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.85, 0.3] }}
                transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
                className="absolute -bottom-2 -left-2 w-3.5 h-3.5 rounded-full bg-indigo-400 blur-sm pointer-events-none"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
