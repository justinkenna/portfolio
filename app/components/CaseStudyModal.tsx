"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { CaseStudy } from "@/lib/case-studies";

type Props = {
  study: CaseStudy;
  isOpen: boolean;
  onClose: () => void;
};

export default function CaseStudyModal({ study, isOpen, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black transition-opacity duration-300"
        style={{ opacity: isOpen ? 0.55 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={study.title}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#f6ece1] overflow-y-auto"
        style={{
          height: "95dvh",
          borderRadius: "24px 24px 0 0",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-[#f6ece1]/95 backdrop-blur-sm border-b border-black/10 px-6 md:px-12 py-4 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest uppercase text-[#fe6500]">
            Case Study
          </span>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Hero image */}
        <div className="relative w-full" style={{ height: "55vh" }}>
          <Image
            src={study.heroSrc}
            alt={study.heroAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f6ece1]" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 pb-24 -mt-10 relative">

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-black/10 text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title block */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight mb-4">
            {study.title}
          </h2>
          <p className="text-lg text-black/70 leading-relaxed mb-3">
            {study.subtitle}
          </p>
          <p className="text-sm text-black/40 mb-14">
            {study.role}&nbsp;&nbsp;·&nbsp;&nbsp;{study.year}
          </p>

          {/* Overview */}
          <div className="mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-4">
              Overview
            </p>
            <p className="text-base md:text-lg text-black/80 leading-relaxed">
              {study.overview}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-black/10 mb-16" />

          {/* Sections */}
          {study.sections.map((section, i) => (
            <div key={i} className="mb-16">
              <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-4">
                {section.heading}
              </p>
              <p className="text-base text-black/80 leading-relaxed mb-8">
                {section.body}
              </p>

              {/* Single image */}
              {section.image && !section.images && (
                <div className={section.isFullBleed ? "-mx-6 md:-mx-8" : ""}>
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: section.isFullBleed ? "16 / 9" : "3 / 2",
                      borderRadius: section.isFullBleed ? "0px" : "16px",
                    }}
                  >
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  {section.image.caption && (
                    <p className="text-xs text-black/40 mt-3 text-center italic px-6 md:px-8">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              )}

              {/* Image grid */}
              {section.images && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.images.map((img, j) => (
                    <div key={j}>
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "4 / 3", borderRadius: "16px" }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {img.caption && (
                        <p className="text-xs text-black/40 mt-2 italic">{img.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Outcomes */}
          {study.outcomes.length > 0 && (
            <>
              <div className="border-t border-black/10 mb-16" />
              <div className="mb-16">
                <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-8">
                  Outcomes
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {study.outcomes.map((o, i) => (
                    <div key={i} className="bg-white/70 rounded-2xl px-6 py-5">
                      <p className="text-2xl md:text-3xl font-extrabold text-[#fe6500] mb-1">
                        {o.value}
                      </p>
                      <p className="text-sm text-black/60">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
