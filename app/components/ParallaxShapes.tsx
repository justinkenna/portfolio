"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ParallaxShapes() {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const oRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = 1 - (rect.bottom / (viewportH + rect.height));

      if (shape1Ref.current) {
        shape1Ref.current.style.transform = `translateY(${progress * -80}px) rotate(${progress * 18}deg)`;
      }
      if (shape2Ref.current) {
        shape2Ref.current.style.transform = `translateY(${progress * -50}px) rotate(${progress * -14}deg)`;
      }
      if (xRef.current) {
        xRef.current.style.transform = `translateY(${progress * -65}px) rotate(${progress * -22}deg)`;
      }
      if (oRef.current) {
        oRef.current.style.transform = `translateY(${progress * -40}px) rotate(${progress * 16}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="flex gap-2">

      {/* Left — existing wire shapes */}
      <div className="flex flex-col gap-12 opacity-80">
        <div ref={shape1Ref} className="will-change-transform">
          <Image src="/assets/SVG/Shape 1.svg" alt="" width={280} height={280} />
        </div>
        <div ref={shape2Ref} className="will-change-transform">
          <Image src="/assets/SVG/Shape2.svg" alt="" width={200} height={200} />
        </div>
      </div>

      {/* Right — orange X and O */}
      <div className="flex flex-col gap-16 pt-16">
        {/* X */}
        <div ref={xRef} className="will-change-transform text-[#f6ece1] opacity-80">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="110" y2="110" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
            <line x1="110" y1="10" x2="10" y2="110" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </div>
        {/* O */}
        <div ref={oRef} className="will-change-transform text-[#fe6500]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8"/>
          </svg>
        </div>
      </div>

    </div>
  );
}
