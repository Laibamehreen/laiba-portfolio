"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const moveGlow = (e: MouseEvent) => {
      // Update global CSS variables for the mouse spotlight effect
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", moveGlow);
    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };
  }, []);

  return <div className="glow-spotlight" />;
}
