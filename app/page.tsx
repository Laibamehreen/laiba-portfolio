import React from "react";
import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import CommandPalette from "@/components/command-palette";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Certificates from "@/components/certificates";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#080B16] text-slate-900 dark:text-[#F8FAFC] transition-colors duration-300">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Headless Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette showTrigger={false} />

      {/* Sticky Minimal Navbar */}
      <Navbar />

      {/* Main Single Page CV Sections */}
      <main className="relative flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Technical Skills */}
        <Skills />

        {/* Professional Experience */}
        <Experience />

        {/* Certifications (Internship Credentials) */}
        <Certificates />

        {/* Engineering Projects */}
        <Projects />


        {/* Contact Section */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
