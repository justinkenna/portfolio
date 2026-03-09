"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "View Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const applyTransform = () => {
    if (!imgRef.current) return;
    const { x, y } = mouseOffsetRef.current;
    imgRef.current.style.transform =
      `translateY(${scrollYRef.current}px) translate(${x}px, ${y}px)`;
  };

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY * 0.45;
      applyTransform();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      // Normalize cursor to -0.5 → 0.5 within section
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      // Move image subtly opposite to cursor (max ±12px)
      mouseOffsetRef.current = { x: nx * -12, y: ny * -12 };
      applyTransform();
    };
    const handleLeave = () => {
      // Smoothly return to center on mouse leave
      mouseOffsetRef.current = { x: 0, y: 0 };
      if (imgRef.current) {
        imgRef.current.style.transition = "transform 0.6s ease";
        applyTransform();
        setTimeout(() => {
          if (imgRef.current) imgRef.current.style.transition = "";
        }, 600);
      }
    };
    section.addEventListener("mousemove", handleMouse);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouse);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const textRef = useRef<HTMLDivElement>(null);

  // Scroll-linked gap: subtitle stays fixed, only CTA gap compresses
  useEffect(() => {
    const updateGaps = () => {
      if (!textRef.current) return;
      const progress = Math.min(1, window.scrollY / 300);
      // CTA: 56px → 32px on scroll
      const ctaGap = 56 - progress * 24;
      textRef.current.style.setProperty("--gap-cta", `${ctaGap}px`);
    };
    window.addEventListener("scroll", updateGaps, { passive: true });
    updateGaps();
    return () => window.removeEventListener("scroll", updateGaps);
  }, []);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById("main-nav");
      if (nav && !nav.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">

      {/* Parallax image wrapper */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{ top: "-20%", bottom: "-20%", left: 0, right: 0 }}
      >
        <Image
          src="/assets/JustinHome9.jpg"
          alt="Justin Kenna hero background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

      {/* Nav */}
      <nav
        id="main-nav"
        className="absolute top-6 left-6 z-10"
      >
        {/* Pill row */}
        <div className="flex items-center gap-4 bg-black rounded-full px-[20px] py-[20px]">
          <Image
            src="/assets/SVG/JK Logo.svg"
            alt="JK Logo"
            width={32}
            height={32}
          />
          <span className="text-xs font-bold tracking-widest uppercase text-white">
            Justin Kenna
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-2 flex flex-col gap-[5px] focus:outline-none"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {/* Hamburger → X transition */}
            <span
              className={`block w-5 h-[2px] bg-white transition-transform duration-300 origin-center ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-transform duration-300 origin-center ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-2 bg-black rounded-2xl px-4 py-3 flex flex-col gap-1 min-w-[180px]">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.href}
                className="transition-all duration-300"
                style={{
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); setOpen(false); document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }); }}
                  className="block px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero text */}
      <div ref={textRef} className="absolute bottom-20 w-full flex flex-col items-center text-center px-6">
        <h1 className="text-[clamp(3rem,11vw,7rem)] font-extrabold leading-none tracking-wide text-[#f6ece1]">
          Justin Kenna
        </h1>
        <p className="text-lg text-white/80 tracking-wide" style={{ marginTop: "12px" }}>
            Product designer focused on AI, search, and monetization systems.
          </p>
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-flex items-center gap-3 bg-[#fe6500] hover:bg-[#e05a00] transition-colors text-white font-extrabold pl-6 pr-2 py-2 rounded-full"
          style={{ marginTop: "var(--gap-cta, 56px)" }}
        >
          View Work
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#fe6500]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
