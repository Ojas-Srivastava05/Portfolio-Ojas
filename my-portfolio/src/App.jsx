import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import Background from "./components/Background";
import CommandPalette from "./components/CommandPalette";
import ConsoleEgg from "./components/ConsoleEgg";
import CursorTrail from "./components/CursorTrail";
import Footer from "./components/Footer";
import FxToast from "./components/FxToast";
import InteractionLab from "./components/InteractionLab";
import KonamiEgg from "./components/KonamiEgg";
import MagneticDock from "./components/MagneticDock";
import AvailabilityOrb from "./components/AvailabilityOrb";
import MatrixRain from "./components/MatrixRain";
import MatrixToggle from "./components/MatrixToggle";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SectionRail from "./components/SectionRail";
import { useSiteFx } from "./context/SiteFxContext";
import About from "./sections/About";
import Achievements from "./sections/Achievements";
import CodingStats from "./sections/CodingStats";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import RecruiterBrief from "./sections/RecruiterBrief";
import Toolkit from "./sections/Toolkit";

const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20 on 48px button

function ScrollRingButton() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, scrolled / total) : 0;
      setPct(p);
      setShow(scrolled > 720);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <Motion.button
          aria-label="Back to top"
          type="button"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-ui-chrome="true"
          className="group fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center text-emerald-200"
        >
          {/* Circular progress ring */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 48 48"
            width="48"
            height="48"
          >
            {/* Track */}
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            {/* Progress */}
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - pct)}
              style={{ transition: "stroke-dashoffset 0.15s linear" }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>
          {/* Glass background */}
          <span className="absolute inset-[4px] rounded-full border border-white/[0.08] bg-[rgba(8,9,12,0.85)] backdrop-blur-xl transition group-hover:border-emerald-300/40 group-hover:bg-emerald-300/[0.08]" />
          {/* Arrow */}
          <svg
            aria-hidden="true"
            className="relative z-10 h-3.5 w-3.5 transition group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500 opacity-0 transition group-hover:opacity-100">
            top ↑
          </span>
        </Motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  const { chaosMode, matrixRain } = useSiteFx();

  useEffect(() => {
    const t = window.setTimeout(() => setBooted(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    };

    if (booted) scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [booted]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-ink text-white ${chaosMode ? "chaos-mode" : ""}`}>
      {/* Global features */}
      <MatrixRain active={matrixRain} intensity={chaosMode ? 1.65 : 1.05} />
      <MatrixToggle />
      <KonamiEgg />
      <FxToast />
      <ConsoleEgg />
      <CursorTrail />
      <MagneticDock />
      <AvailabilityOrb />

      <div data-ui-chrome="true">
        <ScrollProgress />
      </div>
      <Background />

      <CommandPalette />
      <InteractionLab />
      <div data-ui-chrome="true">
        <SectionRail />
      </div>

      <div className="relative z-10">
        <div data-ui-chrome="true">
          <Navbar />
        </div>
        <main>
          <Hero />
          <RecruiterBrief />
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
      <AnimatePresence>{!booted && <BootScreen />}</AnimatePresence>

      {/* Scroll ring back-to-top */}
      <ScrollRingButton />
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
