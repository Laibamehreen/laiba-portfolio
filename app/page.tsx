import React from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Certificates from "@/components/certificates";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Education Section */}
      <Education />

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
    </>
  );
}
