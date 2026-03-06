"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "View Work", href: "#work" },
  { label: "Case Studies", href: "#case-studies" },
];

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      imgRef.current.style.transform = `translateY(${window.scrollY * 0.45}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
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
    <section className="relative h-screen w-full overflow-hidden">

      {/* Parallax image wrapper */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{ top: "-20%", bottom: "-20%", left: 0, right: 0 }}
      >
        <Image
          src="/assets/HomeImage.png"
          alt="Justin Kenna hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

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
                  onClick={() => setOpen(false)}
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
      <div className="absolute bottom-20 w-full flex flex-col items-center text-center px-6">
        <h1 className="text-[clamp(5rem,20vw,12rem)] font-extrabold leading-none tracking-tight text-white">
          Justin
        </h1>
        <p className="mt-4 text-lg text-white/80 tracking-wide">
          UX design&nbsp;•&nbsp;Research&nbsp;•&nbsp;Problem Solver
        </p>
        <a
          href="#work"
          className="mt-6 inline-block bg-[#fe6500] hover:bg-[#e05a00] transition-colors text-white font-medium px-7 py-3 rounded-full"
        >
          View Work
        </a>
      </div>
    </section>
  );
}
