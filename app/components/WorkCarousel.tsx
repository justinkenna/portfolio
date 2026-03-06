"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const CARDS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    alt: "Selected work 1",
    label: "Project One",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&q=80",
    alt: "Selected work 2",
    label: "Project Two",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    alt: "Selected work 3",
    label: "Project Three",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=600&q=80",
    alt: "Selected work 4",
    label: "Project Four",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
    alt: "Selected work 5",
    label: "Project Five",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80",
    alt: "Selected work 6",
    label: "Project Six",
  },
];

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f6ece1] text-black disabled:opacity-30 hover:bg-white transition-colors shadow-lg"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        {direction === "left" ? (
          <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  );
}

export default function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const isProgrammaticScroll = useRef(false);

  const scrollTo = (index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.children[index] as HTMLElement;
    isProgrammaticScroll.current = true;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    activeRef.current = index;
    setActive(index);
    // Re-enable handleScroll after animation completes (~400ms)
    setTimeout(() => { isProgrammaticScroll.current = false; }, 500);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !trackRef.current) return;
    const track = trackRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    activeRef.current = closest;
    setActive(closest);
  };

  const prev = () => scrollTo(Math.max(0, activeRef.current - 3));
  const next = () => scrollTo(Math.min(CARDS.length - 1, activeRef.current + 3));

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

        {/* Carousel wrapper — position relative for the floating arrow buttons */}
        <div className="relative">

          {/* Left arrow — centered vertically on the card image area */}
          <div className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-1/2 z-10">
            <ArrowButton direction="left" onClick={prev} disabled={active === 0} />
          </div>

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
                className="snap-start flex-shrink-0 w-[72vw] max-w-[320px] flex flex-col gap-3"
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

          {/* Right arrow */}
          <div className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-1/2 z-10">
            <ArrowButton direction="right" onClick={next} disabled={active === CARDS.length - 1} />
          </div>

        </div>

        {/* Dot indicators — one per group of 3 */}
        <div className="flex gap-2 mt-6 justify-center">
          {[0, 3].map((groupStart, i) => (
            <button
              key={i}
              onClick={() => scrollTo(groupStart)}
              aria-label={`Go to group ${i + 1}`}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                active < 3 && i === 0
                  ? "w-6 bg-[#fe6500]"
                  : active >= 3 && i === 1
                  ? "w-6 bg-[#fe6500]"
                  : "w-[6px] bg-white/30"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
