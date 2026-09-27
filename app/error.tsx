"use client";

import React, { useEffect } from "react";
import { RotateCcw, AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Segment error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
          Unable to display section
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          There was a temporary issue loading this content.
        </p>

        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-lavender-400 hover:bg-lavender-300 text-navy-950 font-semibold text-sm transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reload</span>
        </button>
      </div>
    </div>
  );
}
