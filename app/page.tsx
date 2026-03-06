import HeroSection from "./components/HeroSection";
import ParallaxShapes from "./components/ParallaxShapes";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="font-sans bg-black text-white">

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About ── */}
      <section className="bg-black px-8 py-24 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Decorative shapes */}
          <ParallaxShapes />

          {/* Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
              Crafting Meaningful Design and Validating the Results with User Research
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/60">
              My name is Justin Kenna and I have been a UX designer focused on building
              products that are both intuitive and impactful. I approach every project by
              combining rigorous research with thoughtful design to create experiences people
              actually enjoy using.
            </p>
          </div>

        </div>
      </section>

      {/* ── Contact ── */}
      <ContactSection />

    </main>
  );
}
