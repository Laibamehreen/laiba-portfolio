import React from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Certificates from "@/components/certificates";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#080B16] text-slate-900 dark:text-[#F8FAFC] transition-colors duration-300">
      {/* Sticky Minimal Navbar */}
      <Navbar />

      {/* Main Single Page CV Sections */}
      <main className="flex-grow">
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

        {/* Education */}
        <Education />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
