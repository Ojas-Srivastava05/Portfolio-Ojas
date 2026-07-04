import { lazy, Suspense, useEffect, useState } from "react";
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

// Code-split: opentype.js loads for the boot signature under cover of the intro.
const Signature = lazy(() => import("./components/Signature"));

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
  const [sigReady, setSigReady] = useState(false);
  const { chaosMode, matrixRain } = useSiteFx();

  // Hard safety cap so the intro never hangs if the font/chunk is slow.
  useEffect(() => {
    if (booted) return undefined;
    const safety = window.setTimeout(() => setBooted(true), 6200);
    return () => window.clearTimeout(safety);
  }, [booted]);

  // Once the signature has computed its strokes, let it draw, then reveal.
  useEffect(() => {
    if (!sigReady || booted) return undefined;
    const t = window.setTimeout(() => setBooted(true), 3100);
    return () => window.clearTimeout(t);
  }, [sigReady, booted]);

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
          <Hero ready={booted} />
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
      <AnimatePresence>{!booted && <BootScreen onReady={() => setSigReady(true)} />}</AnimatePresence>

      {/* Scroll ring back-to-top */}
      <ScrollRingButton />
    </div>
  );
}

function BootScreen({ onReady }) {
  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-ink"
    >
      {/* Soft emerald glow behind the signature */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 38% at 50% 46%, rgba(52,211,153,0.12), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center px-6">
        <Suspense fallback={<div className="h-24 w-[min(520px,84vw)]" />}>
          <Signature
            text="Ojas Srivastava"
            color="#34d399"
            fontSize={120}
            duration={1.15}
            staggerStep={0.1}
            shimmer
            strokeWidth={2}
            inView={false}
            onReady={onReady}
            className="h-auto w-[min(560px,86vw)] [filter:drop-shadow(0_0_24px_rgba(52,211,153,0.35))]"
          />
        </Suspense>
        <Motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 h-px rounded-full bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
        />
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600"
        >
          <span className="live-dot" />
          Software Engineer
        </Motion.p>
      </div>
    </Motion.div>
  );
}

export default App;
