"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import CaseStudyModal from "./CaseStudyModal";
import { CASE_STUDIES } from "@/lib/case-studies";

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

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openStudy = (id: number) => {
    setSelectedId(id);
    requestAnimationFrame(() => setIsModalOpen(true));
  };

  const closeStudy = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedId(null), 420);
  }, []);

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
    const groupSize = 3;
    const numGroups = Math.ceil(CARDS.length / groupSize);
    let closestGroup = 0;
    let minDist = Infinity;
    for (let g = 0; g < numGroups; g++) {
      const idx = g * groupSize;
      const el = track.children[idx] as HTMLElement;
      const dist = Math.abs(el.offsetLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closestGroup = g; }
    }
    const snappedIndex = closestGroup * groupSize;
    activeRef.current = snappedIndex;
    setActive(snappedIndex);
  };

  const prev = () => scrollTo(Math.max(0, activeRef.current - 3));
  const next = () => scrollTo(Math.min(CARDS.length - 3, activeRef.current + 3));

  return (<>
    <section className="bg-black py-12 px-8 md:px-16" id="work">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-3">
          Portfolio
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#f6ece1] mb-10">
          Selected Work
        </h2>

        {/* Carousel wrapper — capped at 3-card width so right arrow aligns with last card */}
        <div className="relative max-w-[1008px]">

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
                <button
                  onClick={() => openStudy(card.id)}
                  aria-label={`Open case study: ${card.label}`}
                  className="relative w-full overflow-hidden group cursor-pointer focus:outline-none"
                  style={{ aspectRatio: "3 / 4", borderRadius: "28px" }}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold tracking-widest uppercase text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                      View Case Study
                    </span>
                  </div>
                </button>
                <p className="text-sm font-medium text-white/70 pl-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <div className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-1/2 z-10">
            <ArrowButton direction="right" onClick={next} disabled={active >= CARDS.length - 3} />
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

    {/* Case study overlay */}
    {selectedId !== null && CASE_STUDIES[selectedId] && (
      <CaseStudyModal
        study={CASE_STUDIES[selectedId]}
        isOpen={isModalOpen}
        onClose={closeStudy}
      />
    )}
  </>);
}
