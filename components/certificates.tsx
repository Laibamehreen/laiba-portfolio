"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Eye } from "lucide-react";
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
          {CERTIFICATES_DATA.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="cv-card p-6 sm:p-7 flex flex-col justify-between group transition-shadow duration-300 hover:shadow-lavender-md h-full"
            >
              <div>
                {/* Certificate Preview Frame with Real Document Thumbnail */}
                {/* Certificate Preview Frame with Native PDF Thumbnail */}
                <div
                  onClick={() => handleOpenCert(cert)}
                  className="relative w-full h-64 sm:h-72 rounded-2xl mb-5 overflow-hidden bg-slate-900 border border-lavender-400/20 shadow-lg cursor-pointer group-hover:border-lavender-400/50 transition-all duration-300"
                >
                  <iframe
                    src={`${cert.filePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1`}
                    title={`${cert.title} PDF Preview`}
                    scrolling="no"
                    className="w-[calc(100%+20px)] h-full border-0 pointer-events-none select-none bg-white"
                    loading="lazy"
                  />

                  {/* Subtle top-right credential badge */}
                  <div className="absolute top-3 right-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-sm">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Official PDF</span>
                    </span>
                  </div>

                  {/* Hover Overlay with Centered View Button */}
                  <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 z-20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lavender-400 text-navy-950 text-xs sm:text-sm font-bold shadow-lavender-md transform scale-95 group-hover:scale-100 transition-transform duration-200">
                      <Eye className="w-4 h-4" />
                      <span>View Full Certificate</span>
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
