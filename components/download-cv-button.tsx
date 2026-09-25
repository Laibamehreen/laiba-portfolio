"use client";

import React, { useState } from "react";
import { Download, FileText, Check, Loader2 } from "lucide-react";
import { downloadResumeFile } from "@/lib/download-cv";

interface DownloadCVButtonProps {
  className?: string;
  variant?: "primary" | "outline" | "compact";
}

export default function DownloadCVButton({
  className = "",
  variant = "primary",
}: DownloadCVButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    try {
      await downloadResumeFile("Laiba_Mehreen_CV.pdf");
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } finally {
      setDownloading(false);
    }
  };

  if (variant === "compact") {
    return (
      <a
        href="/api/cv"
        download="Laiba_Mehreen_CV.pdf"
        onClick={handleDownload}
        title="Download Official CV (PDF)"
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full 
          bg-lavender-400/10 hover:bg-lavender-400/20 text-lavender-300 hover:text-white 
          border border-lavender-400/30 hover:border-lavender-400 transition-all duration-200 no-print cursor-pointer active:scale-95 ${className}`}
      >
        {downloading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : downloaded ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        <span>{downloaded ? "Saved!" : "Download CV"}</span>
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href="/api/cv"
        download="Laiba_Mehreen_CV.pdf"
        onClick={handleDownload}
        title="Download Official CV (PDF)"
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
          bg-transparent hover:bg-lavender-400/10 text-white hover:text-lavender-300
          border border-lavender-400/30 hover:border-lavender-400 shadow-sm transition-all duration-200 no-print cursor-pointer active:scale-95 ${className}`}
      >
        {downloading ? (
          <Loader2 className="w-4 h-4 animate-spin text-lavender-400" />
        ) : downloaded ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Download className="w-4 h-4 text-lavender-400" />
        )}
        <span>{downloaded ? "Saved to Files!" : "Download CV (PDF)"}</span>
      </a>
    );
  }

  return (
    <a
      href="/api/cv"
      download="Laiba_Mehreen_CV.pdf"
      onClick={handleDownload}
      title="Download Official CV (PDF)"
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl
        bg-lavender-400 hover:bg-lavender-300 text-navy-950 shadow-lavender-sm hover:shadow-lavender-md
        transition-all duration-200 active:scale-[0.98] no-print cursor-pointer ${className}`}
    >
      {downloading ? (
        <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
      ) : downloaded ? (
        <Check className="w-4 h-4 text-navy-950" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span>{downloaded ? "Saved to Files!" : "Download CV (PDF)"}</span>
    </a>
  );
}
