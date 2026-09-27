"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollRevealSection({
  id,
  className = "",
  children,
}: ScrollRevealSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative scroll-mt-16 sm:scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
