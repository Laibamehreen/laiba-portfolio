"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, Check, Loader2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { downloadResumeFile } from "@/lib/download-cv";

export default function Hero() {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(false);

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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3"
            >
              <span className="tracking-wider uppercase">{PROFILE_DATA.fullName}</span>
            </motion.h1>

            {/* Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-semibold text-lavender-300 mb-2"
            >
              <span>{PROFILE_DATA.title}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-normal text-lg sm:text-xl">{PROFILE_DATA.roleSubtitle}</span>
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {PROFILE_DATA.intro}
            </motion.p>

            {/* Main Action Buttons: Resume & Upwork */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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

              {/* Upwork Profile Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://www.upwork.com/freelancers/~01649656063f558079"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit my Upwork profile"
                  title="Visit my Upwork profile"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
                    bg-transparent hover:bg-lavender-400/10 text-white hover:text-lavender-300
                    border border-lavender-400/30 hover:border-lavender-400 shadow-sm transition-all duration-200 whitespace-nowrap group/upwork"
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
                  <span className="whitespace-nowrap font-medium">Upwork</span>
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

          {/* Right Column: Clean Studio Portrait with Gentle Float Effect */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="relative group"
            >
              {/* Outer decorative card frame with soft lavender border */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-lavender-400/30 via-lavender-500/10 to-transparent shadow-card-subtle"
              >
                <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-navy-900 relative">
                  <Image
                    src={PROFILE_DATA.image}
                    alt={`${PROFILE_DATA.fullName} - Software Engineer`}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle inner gradient shadow at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Decorative Corner Lavender Glow Dots */}
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-lavender-400/40 blur-sm pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-lavender-500/30 blur-md pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
