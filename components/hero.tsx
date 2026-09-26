"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Mail, Github, Linkedin, Download, Check, Loader2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(false);

  // Section reference for Scroll Parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax motion: moves slightly slower than surrounding content & reduces scale very slightly as hero leaves
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imageParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Section cursor spotlight tracking
  const heroMouseX = useMotionValue(400);
  const heroMouseY = useMotionValue(300);
  const heroSpotlightX = useSpring(heroMouseX, { damping: 28, stiffness: 180 });
  const heroSpotlightY = useSpring(heroMouseY, { damping: 28, stiffness: 180 });

  // 3D Tilt Motion Values (Fixed position, only rotate on X/Y axis max 10deg)
  const imageTiltX = useMotionValue(0);
  const imageTiltY = useMotionValue(0);

  // Smooth, elegant spring physics (non-oscillating, weighted, luxurious feel)
  const tiltSpringConfig = { damping: 26, stiffness: 180, mass: 0.5 };
  const smoothRotateX = useSpring(imageTiltX, tiltSpringConfig);
  const smoothRotateY = useSpring(imageTiltY, tiltSpringConfig);

  // Subtle Purple Glow Coordinates following cursor (% based: 0% to 100%)
  const glowPosX = useMotionValue(50);
  const glowPosY = useMotionValue(50);
  const smoothGlowX = useSpring(glowPosX, { damping: 22, stiffness: 190 });
  const smoothGlowY = useSpring(glowPosY, { damping: 22, stiffness: 190 });

  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const imageCardRef = useRef<HTMLDivElement>(null);

  // Mobile / touch device detection: disable tilt effect on mobile
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(hasTouch || isCoarse || window.innerWidth < 1024);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || shouldReduceMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    
    // Ambient spotlight tracking
    heroMouseX.set(e.clientX - rect.left);
    heroMouseY.set(e.clientY - rect.top);
  };

  const handleHeroMouseLeave = () => {
    imageTiltX.set(0);
    imageTiltY.set(0);
    glowPosX.set(50);
    glowPosY.set(50);
    setIsImageHovered(false);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion) return;
    const card = imageCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate normalized cursor offset from center (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

    // Maximum tilt: 10deg
    // Cursor moving UP (-normY) -> top tilts backwards (positive rotateX: up to 10deg)
    // Cursor moving DOWN (+normY) -> top tilts forwards (negative rotateX: up to -10deg)
    // Cursor moving RIGHT (+normX) -> right side tilts backwards (positive rotateY: up to 10deg)
    // Cursor moving LEFT (-normX) -> left side tilts backwards (negative rotateY: up to -10deg)
    imageTiltX.set(-normY * 10);
    imageTiltY.set(normX * 10);

    // Track purple glow position across card
    glowPosX.set((x / rect.width) * 100);
    glowPosY.set((y / rect.height) * 100);
    setIsImageHovered(true);
  };

  const handleCardMouseLeave = () => {
    // Return smoothly to center when cursor leaves
    imageTiltX.set(0);
    imageTiltY.set(0);
    glowPosX.set(50);
    glowPosY.set(50);
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

  // Split name for staggered word reveal
  const nameWords = PROFILE_DATA.fullName.split(" ");

  return (
    <section
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden"
    >
      {/* Subtle Ambient Cursor Spotlight */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            background: useTransform(
              [heroSpotlightX, heroSpotlightY],
              ([x, y]) =>
                `radial-gradient(650px circle at ${x}px ${y}px, rgba(167, 139, 250, 0.05), transparent 70%)`
            ),
          }}
          className="absolute inset-0 pointer-events-none -z-10"
        />
      )}

      {/* Subtle Lavender Ambient Glows */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-lavender-400 rounded-full blur-3xl pointer-events-none -z-20"
      />
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-lavender-500 rounded-full blur-3xl pointer-events-none -z-20"
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
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            
            {/* Name Animation: Reveal each word smoothly, slight upward movement, fade in, small stagger between words */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-5">
              <span className="tracking-wider uppercase inline-flex flex-wrap gap-x-3.5 justify-center lg:justify-start">
                {nameWords.map((word, wIdx) => (
                  <motion.span
                    key={word}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.1 + wIdx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle Animation: Reveal shortly after name with opacity, translateY, small blur to sharp */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 12, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-base sm:text-lg md:text-xl font-semibold text-lavender-300 mb-3"
            >
              <span>{PROFILE_DATA.title}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-normal text-sm sm:text-base">
                {PROFILE_DATA.roleSubtitle}
              </span>
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
            >
              {PROFILE_DATA.intro}
            </motion.p>

            {/* Main Action Buttons: Resume & Connect Me with Micro-Interactions */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              {/* Resume Direct Download Button */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.025 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <a
                  href="/api/cv"
                  download="Laiba_Mehreen_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleResumeDownload}
                  aria-label="Download Resume"
                  title="Download Resume (PDF)"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
                    bg-lavender-400 hover:bg-lavender-300 text-navy-950 shadow-lavender-sm hover:shadow-lavender-md
                    transition-all duration-200 whitespace-nowrap group/resume cursor-pointer"
                >
                  {/* Subtle shine sweep passing across button on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover/resume:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />

                  {downloadingResume ? (
                    <Loader2 className="w-4 h-4 text-navy-950 animate-spin shrink-0" />
                  ) : downloadedResume ? (
                    <Check className="w-4 h-4 text-navy-950 shrink-0" />
                  ) : (
                    <Download className="w-4 h-4 text-navy-950 shrink-0 transition-transform duration-200 group-hover/resume:translate-y-0.5" />
                  )}
                  <span className="whitespace-nowrap font-bold">
                    {downloadedResume ? "Saved to Files!" : "Resume"}
                  </span>
                </a>
              </motion.div>

              {/* Connect Me Button */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.025 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <a
                  href="#contact"
                  aria-label="Navigate to Contact section"
                  title="Connect with me"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
                    bg-transparent hover:bg-lavender-400/10 text-white hover:text-lavender-300
                    border border-lavender-400/30 hover:border-lavender-400 shadow-sm transition-all duration-200 whitespace-nowrap group/connect cursor-pointer"
                >
                  {/* Subtle shine sweep passing across button on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover/connect:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />

                  <Mail className="w-4 h-4 text-lavender-400 group-hover/connect:text-lavender-300 shrink-0 transition-transform duration-200 group-hover/connect:translate-x-0.5" />
                  <span className="whitespace-nowrap font-medium">Connect Me</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Social & Contact Icons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center justify-center lg:justify-start gap-2.5 pt-4 border-t border-white/[0.08]"
            >
              <motion.a
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                href={`mailto:${PROFILE_DATA.email}`}
                title={`Send email to ${PROFILE_DATA.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-lavender-400/15 border border-white/10 hover:border-lavender-400/30 text-slate-300 hover:text-lavender-300 flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-lavender-400" />
              </motion.a>

              <motion.a
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
          </div>

          {/* Right Column: Interactive Profile Image Showcase with 3D Tilt & Purple Glow */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              style={
                shouldReduceMotion
                  ? { perspective: 1000 }
                  : {
                      y: imageParallaxY,
                      scale: imageParallaxScale,
                      perspective: 1000,
                    }
              }
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
              className="relative select-none"
            >
              {/* Premium 3D Tilt Wrapper: Fixed position (no translation), only rotateX/rotateY max 10deg */}
              <motion.div
                ref={imageCardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  rotateX: isTouchDevice || shouldReduceMotion ? 0 : smoothRotateX,
                  rotateY: isTouchDevice || shouldReduceMotion ? 0 : smoothRotateY,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                className="relative cursor-pointer group"
              >
                {/* Floating Decorative Elements (Behind profile image, subtle abstract motion) */}
                {!shouldReduceMotion && (
                  <div className="absolute inset-0 pointer-events-none -z-10">
                    {/* Tiny glowing dot (top-left) */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        x: [0, 4, 0],
                        opacity: [0.35, 0.75, 0.35],
                      }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-4 -left-3 w-1.5 h-1.5 rounded-full bg-lavender-300/50 blur-[0.5px]"
                    />

                    {/* Small delicate circle (top-right) */}
                    <motion.div
                      animate={{
                        y: [0, 6, 0],
                        rotate: [0, 90, 180, 270, 360],
                        opacity: [0.25, 0.45, 0.25],
                      }}
                      transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-5 -right-4 w-7 h-7 rounded-full border border-lavender-400/25"
                    />

                    {/* Very thin curved arc line (bottom-left) */}
                    <motion.div
                      animate={{
                        rotate: [0, 12, -12, 0],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-5 -left-4 w-10 h-10 pointer-events-none"
                    >
                      <svg className="w-full h-full text-lavender-400/30 stroke-current" viewBox="0 0 40 40" fill="none">
                        <path d="M 6 34 A 26 26 0 0 1 34 6" strokeWidth="1" strokeDasharray="2 3" />
                      </svg>
                    </motion.div>

                    {/* Soft gradient particle (bottom-right) */}
                    <motion.div
                      animate={{
                        y: [0, -7, 0],
                        opacity: [0.3, 0.65, 0.3],
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-4 -right-3 w-2 h-2 rounded-full bg-indigo-300/40 blur-[0.5px]"
                    />
                  </div>
                )}

                {/* Ambient Soft Glow Behind Card */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }
                  }
                  transition={{
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -inset-7 rounded-full bg-gradient-to-tr from-lavender-400/25 via-indigo-500/15 to-purple-500/20 blur-2xl pointer-events-none -z-20"
                />

                {/* Subtle Purple Glow Following Cursor Movement (Behind Card) */}
                {!isTouchDevice && (
                  <motion.div
                    style={{
                      opacity: isImageHovered ? 0.8 : 0.35,
                      background: useTransform(
                        [smoothGlowX, smoothGlowY],
                        ([x, y]) =>
                          `radial-gradient(380px circle at ${x}% ${y}%, rgba(168, 85, 247, 0.4), rgba(139, 92, 246, 0.15) 45%, transparent 75%)`
                      ),
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute -inset-6 rounded-3xl blur-xl pointer-events-none -z-10 transition-opacity duration-300"
                  />
                )}

                {/* Animated Image Border: Slow subtle gradient continuously traveling around edge */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-1 rounded-[2.1rem] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(167,139,250,0.35)_100deg,rgba(196,181,253,0.7)_180deg,rgba(129,140,248,0.35)_260deg,transparent_360deg)] opacity-70 blur-[1px] pointer-events-none"
                />

                {/* Interactive Profile Photo Card Frame (Fixed in position, 3D tilt applied on wrapper) */}
                <div
                  style={{
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  className="relative w-64 h-76 sm:w-72 sm:h-84 md:w-80 md:h-[26rem] rounded-3xl p-1 bg-gradient-to-b from-lavender-400/30 via-lavender-500/15 to-transparent shadow-xl shadow-lavender-400/15"
                >
                  {/* Inner Clipping Viewport */}
                  <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-navy-950 relative border border-white/10 shadow-inner">
                    {/* Portrait Image (Quality strictly preserved with priority, unoptimized, hardware accelerated) */}
                    <Image
                      src={PROFILE_DATA.image}
                      alt={PROFILE_DATA.fullName}
                      fill
                      unoptimized
                      priority
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                      style={{
                        transform: "translateZ(0)",
                        imageRendering: "auto",
                      }}
                    />

                    {/* Subtle Specular Sheen on Hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none z-10" />

                    {/* Subtle Purple Surface Light Reflection Following Cursor */}
                    {!isTouchDevice && (
                      <motion.div
                        style={{
                          opacity: isImageHovered ? 0.45 : 0,
                          background: useTransform(
                            [smoothGlowX, smoothGlowY],
                            ([x, y]) =>
                              `radial-gradient(280px circle at ${x}% ${y}%, rgba(216, 180, 254, 0.35), rgba(168, 85, 247, 0.12) 50%, transparent 75%)`
                          ),
                        }}
                        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                      />
                    )}

                    {/* Subtle Cinematic Bottom Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
