import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import Background from "./components/Background";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SectionRail from "./components/SectionRail";
import About from "./sections/About";
import Achievements from "./sections/Achievements";
import CodingStats from "./sections/CodingStats";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Toolkit from "./sections/Toolkit";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 720);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setBooted(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
      <ScrollProgress />
      <Background />

      <CommandPalette />
      <SectionRail />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <CodingStats />
          <Achievements />
          <Toolkit />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Boot screen */}
      <AnimatePresence>
        {!booted && <BootScreen />}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <Motion.button
            aria-label="Back to top"
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-emerald-300/30 bg-[rgba(8,9,12,0.85)] text-emerald-200 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-300/[0.10]"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500 opacity-0 transition group-hover:opacity-100">
              top ↑
            </span>
          </Motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function BootScreen() {
  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center bg-ink"
    >
      <div className="text-center">
        <Motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-md border border-emerald-300/40 bg-emerald-300/[0.08] font-mono text-xl font-bold text-emerald-200"
        >
          OS
        </Motion.div>
        <p className="font-display text-3xl tracking-ultratight text-white sm:text-4xl">
          Ojas <span className="italic text-emerald-300">Srivastava</span>
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          <span className="live-dot" />
          <span>Booting builder OS</span>
        </div>
        <Motion.div
          initial={{ width: 0 }}
          animate={{ width: 220 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 h-[2px] origin-left rounded-full bg-gradient-to-r from-emerald-300 to-amber-300"
        />
      </div>
    </Motion.div>
  );
}

export default App;
