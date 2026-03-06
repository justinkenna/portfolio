"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ParallaxShapes() {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // progress: 0 when section top hits viewport bottom, 1 when it leaves top
      const viewportH = window.innerHeight;
      const progress = 1 - (rect.bottom / (viewportH + rect.height));

      const translateY1 = progress * -80;
      const rotate1 = progress * 18;
      const translateY2 = progress * -50;
      const rotate2 = progress * -14;

      if (shape1Ref.current) {
        shape1Ref.current.style.transform = `translateY(${translateY1}px) rotate(${rotate1}deg)`;
      }
      if (shape2Ref.current) {
        shape2Ref.current.style.transform = `translateY(${translateY2}px) rotate(${rotate2}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-12 opacity-70">
      <div ref={shape1Ref} className="will-change-transform">
        <Image
          src="/assets/SVG/Shape 1.svg"
          alt=""
          width={280}
          height={280}
        />
      </div>
      <div ref={shape2Ref} className="will-change-transform">
        <Image
          src="/assets/SVG/Shape2.svg"
          alt=""
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
