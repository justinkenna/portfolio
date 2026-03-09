import HeroSection from "./components/HeroSection";
import ParallaxShapes from "./components/ParallaxShapes";
import WorkCarousel from "./components/WorkCarousel";
import PortfolioAgent from "./components/PortfolioAgent";
import ContactSection from "./components/ContactSection";
import ScrollArrow from "./components/ScrollArrow";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="font-sans bg-black text-white">

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About ── */}
      <section id="about" className="bg-black px-8 pt-24 pb-0 md:px-16">
        <div className="max-w-5xl md:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Shapes — overlaps text on mobile (same grid row), own column on desktop */}
            <div className="col-start-1 row-start-1 md:col-start-auto md:row-start-auto opacity-20 md:opacity-80 pointer-events-none md:pointer-events-auto">
              <ParallaxShapes />
            </div>

            {/* Copy — also row-start-1 on mobile so it overlaps the shapes */}
            <div className="col-start-1 row-start-1 md:col-start-auto md:row-start-auto relative z-10">
              <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-3">About</p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#f6ece1]">
                Designing Intelligent Products That Balance User Value and Business Impact
              </h2>
              <p className="mt-6 text-sm leading-7 text-white/80">
                I design complex product systems that sit at the intersection of AI, search, and monetization.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/80">
                My work focuses on helping users navigate information, evaluate choices, and take meaningful action. By combining research, experimentation, and product thinking, I design experiences that create value for both people and the businesses that serve them.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Scroll Arrow ── */}
      <ScrollArrow />

      {/* ── Selected Work ── */}
      <WorkCarousel />

      {/* ── Portfolio Agent ── */}
      <PortfolioAgent />

      {/* ── Contact ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <Footer />

    </main>
  );
}
