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
      initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
