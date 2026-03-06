"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const CARDS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    alt: "Selected work 1",
    label: "Project One",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80",
    alt: "Selected work 2",
    label: "Project Two",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80",
    alt: "Selected work 3",
    label: "Project Three",
  },
];

export default function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index: number) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[index] as HTMLElement;
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(index);
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActive(closest);
  };

  return (
    <section className="bg-black py-12 px-8 md:px-16" id="work">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-3">
          Portfolio
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10">
          Selected Work
        </h2>

        {/* Carousel track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="snap-center flex-shrink-0 w-[72vw] max-w-[320px] flex flex-col gap-3"
            >
              {/* 3:4 image card */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "3 / 4", borderRadius: "28px" }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <p className="text-sm font-medium text-white/70 pl-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-6 justify-center">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-[#fe6500]" : "w-[6px] bg-white/30"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
