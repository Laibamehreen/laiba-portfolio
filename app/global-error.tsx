"use client";

import React, { useEffect } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080B16] text-[#F8FAFC] font-sans min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-5">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Something went wrong
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            An unexpected error occurred while rendering the page.
          </p>

          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-lavender-400 hover:bg-lavender-300 text-navy-950 font-semibold text-sm transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </body>
    </html>
  );
}
