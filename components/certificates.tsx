"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Eye, Building2, Calendar } from "lucide-react";
import SectionHeading from "./section-heading";
import ScrollRevealSection from "./scroll-reveal-section";
import { CERTIFICATES_DATA, CertificateItem } from "@/data/certificates";
import CertificateModal from "./certificate-modal";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCert = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  return (
    <ScrollRevealSection id="certificates" className="py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Credentials"
          title="Certifications"
          subtitle="Official completion certificates and technical evaluations for completed software engineering internships."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {CERTIFICATES_DATA.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="cv-card p-6 sm:p-7 flex flex-col justify-between group transition-shadow duration-300 hover:shadow-lavender-md h-full"
            >
              <div>
                {/* Certificate Preview Frame with Real Document Thumbnail */}
                <div
                  onClick={() => handleOpenCert(cert)}
                  className="relative w-full h-56 sm:h-64 rounded-2xl mb-5 overflow-hidden bg-navy-950 border border-lavender-400/20 shadow-lg cursor-pointer group-hover:border-lavender-400/50 transition-all duration-300"
                >
                  <Image
                    src={cert.previewImage}
                    alt={`${cert.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain object-top group-hover:scale-[1.03] transition-transform duration-300"
                  />

                  {/* Gradient Overlay for hover cues */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white border border-white/10">
                      <Building2 className="w-3.5 h-3.5 text-lavender-400" />
                      <span>{cert.organization}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Click to Preview Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-lavender-400" />
                      <span>{cert.date}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-lavender-400/20 backdrop-blur-md text-lavender-300 font-medium">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to View</span>
                    </span>
                  </div>
                </div>

                {/* Title & Organization */}
                <div className="mb-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-400 mb-1.5">
                    <span className="text-lavender-400 font-semibold">{cert.organization}</span>
                    {cert.referenceCode && (
                      <span className="font-mono bg-white/[0.05] px-2 py-0.5 rounded text-[11px]">
                        Ref: {cert.referenceCode}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-lavender-300 transition-colors">
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <a
                  href={cert.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Original PDF</span>
                </a>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleOpenCert(cert)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl
                    bg-lavender-400 hover:bg-lavender-300 text-navy-950 transition-all duration-200 shadow-lavender-sm whitespace-nowrap"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Certificate</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessible Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </ScrollRevealSection>
  );
}
