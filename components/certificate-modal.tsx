"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Award, ShieldCheck, Download, ExternalLink, Building2, Calendar, FileText, CheckCircle2, UserCheck } from "lucide-react";
import { CertificateItem } from "@/data/certificates";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  const [viewMode, setViewMode] = useState<"document" | "details">("document");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setViewMode("document");
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-navy-900 border border-lavender-400/30 rounded-3xl shadow-2xl shadow-black/90 text-white overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lavender-400/15 border border-lavender-400/30 flex items-center justify-center text-lavender-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Document</span>
                </span>
                {certificate.referenceCode && (
                  <span className="text-[11px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">
                    {certificate.referenceCode}
                  </span>
                )}
              </div>
              <h3 id="cert-modal-title" className="text-base sm:text-lg font-bold text-white">
                {certificate.title} — <span className="text-lavender-300">{certificate.organization}</span>
              </h3>
            </div>
          </div>

          {/* View Toggles & Close */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-navy-850 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode("document")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === "document"
                    ? "bg-lavender-400 text-navy-950 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Official Document
              </button>
              <button
                onClick={() => setViewMode("details")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === "details"
                    ? "bg-lavender-400 text-navy-950 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Credential Details
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {viewMode === "document" ? (
            <div className="flex flex-col items-center">
              {/* Document Image Container */}
              <div className="relative w-full max-w-2xl bg-navy-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-2 sm:p-3">
                <div className="relative w-full aspect-[1/1.414] rounded-xl overflow-hidden bg-white">
                  <Image
                    src={certificate.previewImage}
                    alt={`${certificate.title} issued by ${certificate.organization}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-contain object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Overview Box */}
              <div className="p-6 rounded-2xl bg-navy-950/70 border border-white/[0.08]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1 font-semibold uppercase">Organization:</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-lavender-400" />
                      {certificate.organization}
                    </span>
                    <span className="text-slate-400 text-[11px] block mt-0.5">{certificate.location}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 font-semibold uppercase">Completion / Issue Date:</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-lavender-400" />
                      {certificate.date}
                    </span>
                    <span className="text-emerald-400 text-[11px] block mt-0.5 font-medium">{certificate.duration}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {certificate.summary}
                </p>

                <div className="p-3.5 rounded-xl bg-navy-900 border border-white/10 flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-lavender-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-white font-semibold block">{certificate.signatory}</span>
                    <span className="text-slate-400">{certificate.signatoryTitle}</span>
                  </div>
                </div>
              </div>

              {/* Technical Contributions */}
              {certificate.contributions && certificate.contributions.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Documented Technical Contributions &amp; Scope:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {certificate.contributions.map((c) => (
                      <div key={c.number} className="p-4 rounded-xl bg-navy-950/50 border border-white/[0.06]">
                        <span className="text-xs font-mono font-bold text-lavender-400 block mb-1">
                          {c.number}
                        </span>
                        <span className="text-xs font-bold text-white block mb-1.5">
                          {c.title}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {c.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tags */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Verified Technical Skills:
                </span>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span key={skill} className="lavender-chip text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lavender-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-navy-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "document" ? "details" : "document")}
              className="text-xs font-medium text-lavender-300 underline"
            >
              Switch to {viewMode === "document" ? "Credential Details" : "Document View"}
            </button>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={certificate.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open PDF in New Tab</span>
            </a>

            <a
              href={certificate.filePath}
              download={`${certificate.organization.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.pdf`}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-lavender-400 hover:bg-lavender-300 text-navy-950 transition-colors shadow-lavender-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
