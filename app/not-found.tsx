import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080B16] text-[#F8FAFC] px-4">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-lavender-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-lavender-400/10 border border-lavender-400/20 text-lavender-300 font-bold text-2xl mb-6">
          404
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
          Page Not Found
        </h1>
        
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
          The page or resource you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-lavender-400 hover:bg-lavender-300 text-navy-950 font-semibold text-sm transition-all duration-200 shadow-lavender-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
