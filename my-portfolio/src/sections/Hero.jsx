import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { profileLinks, profile, INTERNSHIP_AVAILABILITY, formatCgpaDisplay } from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";
import CinematicVideo from "../components/CinematicVideo";

// Code-split: three.js only loads for the background glow, never blocking first paint.
const LightRays = lazy(() => import("../components/LightRays"));

const headlineVerbs = ["ship.", "engineer.", "model.", "deploy.", "solve."];

// Abstract fluid-waves loop (motionsites.ai) — hue-shifted to emerald + darkened in CSS.
const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085844_21a8f4b3-dea5-4ede-be16-d53f6973bb14.mp4";

function ChevronRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default function Hero({ ready = true }) {
  const [verbIndex, setVerbIndex] = useState(0);
  const [time, setTime] = useState(() => new Date());
  const { derived } = useLiveCodingStats();

  const editorLines = useMemo(() => {
    const cgpa = derived.cgpa;
    const rank = derived.rank ?? "—";
    const peak = derived.peak ?? "—";
    const solved = derived.lcSolved ?? "—";
    return [
      { kind: "muted", text: "// ojas.srivastava — builder.config.ts" },
      { kind: "keyword", token: "export const", name: "engineer", value: "{" },
      { kind: "field", label: "name", value: '"Ojas Srivastava"' },
      { kind: "field", label: "role", value: '"Software Engineer · Full-stack & AI"' },
      {
        kind: "field",
        label: "school",
        value:
          cgpa != null
            ? `"SVNIT Surat · CGPA ${formatCgpaDisplay(cgpa)} · '28"`
            : '"SVNIT Surat · May 2028"',
      },
      {
        kind: "field",
        label: "leetcode",
        value: `{ rank: "${rank}", peak: ${peak}, solved: ${solved} }`,
      },
      { kind: "field", label: "stack", value: '["React", "Node", "Python", "FastAPI"]' },
      { kind: "field", label: "focus", value: '"Backend · Distributed · AI"' },
      { kind: "field", label: "available", value: "true", accent: true },
      { kind: "raw", text: "}" },
      { kind: "muted", text: '// ⏎ Run "npm run hire"' },
    ];
  }, [derived]);

  const displayLinks = useMemo(() => {
    const handles = derived.profileLinkHandles;
    return profileLinks.map((link, i) => ({
      ...link,
      handle: handles[i]?.handle ?? link.handle,
    }));
  }, [derived.profileLinkHandles]);

  const leetSubtitle = useMemo(() => {
    const { rank, lcSolved, peak } = derived;
    if (rank && lcSolved != null && peak != null) {
      return `LeetCode ${rank} — ${lcSolved} solves, ${peak} peak.`;
    }
    return "LeetCode · GitHub · Codeforces — stats refresh automatically.";
  }, [derived]);

  useEffect(() => {
    const verbTimer = window.setInterval(() => {
      setVerbIndex((i) => (i + 1) % headlineVerbs.length);
    }, 2000);
    const clockTimer = window.setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.clearInterval(verbTimer);
      window.clearInterval(clockTimer);
    };
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const { rank, peak } = derived;

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-2rem)] overflow-hidden pt-24 sm:pt-28"
    >
      {/* Cinematic video — dual-copy crossfade for a seamless infinite loop */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <CinematicVideo
          src={HERO_VIDEO_SRC}
          fade={1.2}
          rate={0.8}
          className="absolute inset-0 h-full w-full opacity-[0.6] [filter:hue-rotate(-28deg)_saturate(1.12)_brightness(0.95)_contrast(1.05)]"
        />
        {/* Readability wash: keep the top/right visibly alive, darken the bottom seam. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/35 to-ink" />
        {/* Protect the left text column while letting the right breathe. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
      </div>

      {/* Faint emerald light glow (spell.sh) — a whisper, not a wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="mask-fade-b absolute inset-0 opacity-[0.32]">
          <Suspense fallback={null}>
            <LightRays
              raysColor={{ mode: "single", color: "#34d399" }}
              intensity={6}
              rays={16}
              reach={7}
              position={58}
              animation={{ animate: true, speed: 6 }}
              backgroundColor="transparent"
            />
          </Suspense>
        </div>
        <div className="aurora opacity-60" />
      </div>

      {/* Keyed on `ready` so the whole hero animates in as the intro lifts. */}
      <div key={ready ? "ready" : "idle"} className="contents">
      <div className="section-shell !py-12 lg:!py-20">
        {/* macOS-style status strip */}
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass mb-10 flex flex-wrap items-center justify-between gap-3 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400"
        >
          <div className="flex items-center gap-3">
            <span className="live-dot" />
            <span className="text-emerald-200">CURRENTLY AVAILABLE</span>
            <span className="text-zinc-700">/</span>
            <span>{INTERNSHIP_AVAILABILITY.toUpperCase()} INTERN</span>
          </div>
          <div className="flex items-center gap-4">
            <span>SURAT, IN</span>
            <span className="text-zinc-700">/</span>
            <span className="tabular-nums">{formatTime(time)} IST</span>
            <span className="text-zinc-700">/</span>
            <span>v1.0.0</span>
          </div>
        </Motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="eyebrow">Builder · Engineer · Student</div>
            </div>

            <h1 className="font-display text-[2.85rem] font-normal leading-[0.94] tracking-ultratight text-white min-[390px]:text-[3.55rem] sm:text-[5.4rem] lg:text-[6.8rem]">
              <span className="block">
                <span className="block sm:inline">I don't just</span>
                <span className="block sm:inline"> code.</span>
              </span>
              <span className="mt-1 flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                <span>I</span>
                <span className="relative inline-block align-baseline" style={{ lineHeight: 1.12 }}>
                  <span className="shiny-text animate-shiny inline-block whitespace-nowrap italic">
                    {headlineVerbs[verbIndex]}
                  </span>
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-balance text-[17px] leading-[1.7] text-zinc-300 sm:text-[19px]">
              <span className="text-white">
                Penultimate-year B.Tech AI at SVNIT Surat — seeking Summer 2027 SWE internships.
              </span>{" "}
              I design backends that behave, ship full-stack products that survive deployment, and
              grind algorithms like the scoreboard is watching.{" "}
              <span className="text-emerald-200">{leetSubtitle}</span>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-emerald-200 active:scale-[0.98]"
              >
                Explore the Build
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/5"
              >
                Download CV
                <span className="text-[13px]">↓</span>
              </a>
              <a
                href="https://github.com/Ojas-Srivastava05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/5"
              >
                GitHub
                <span className="text-[13px]">↗</span>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {derived.heroMetrics.map((m, i) => (
                <Motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.5 }}
                  className={`liquid-glass group rounded-2xl px-4 py-4 ${
                    i === 0 ? "liquid-glass-accent" : ""
                  }`}
                >
                  <p className="font-display text-3xl font-normal tracking-ultratight text-white sm:text-4xl">
                    {m.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    {m.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-zinc-600">{m.sub}</p>
                </Motion.div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {displayLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition hover:-translate-y-0.5"
                >
                  <img src={link.icon} alt="" className="h-4 w-4 object-contain opacity-90" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold text-white">{link.name}</span>
                    <span className="block truncate font-mono text-[10px] text-zinc-500">
                      {link.handle}
                    </span>
                  </span>
                  <span className="text-[10px] text-zinc-600 transition group-hover:text-emerald-300">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[1.5rem] bg-gradient-to-br from-emerald-300/[0.12] via-cyan-400/[0.06] to-amber-300/[0.08] blur-3xl" />

            <div className="liquid-glass overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="font-mono text-[11px] text-zinc-500">
                  builder.config.ts — <span className="text-emerald-300">~/portfolio</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  TYPESCRIPT
                </p>
              </div>

              <div className="flex items-center gap-1 border-b border-white/[0.05] bg-black/30 px-3 py-1.5">
                <span className="rounded-t-md border-x border-t border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-emerald-200">
                  ● builder.config.ts
                </span>
                <span className="px-3 py-1 font-mono text-[11px] text-zinc-600">README.md</span>
                <span className="px-3 py-1 font-mono text-[11px] text-zinc-600">manifest.json</span>
              </div>

              <div className="grid grid-cols-[36px_1fr] font-mono text-[12.5px] leading-[1.85] sm:text-[13px]">
                <div className="border-r border-white/[0.05] bg-white/[0.01] py-4 text-right text-zinc-700">
                  {editorLines.map((_, i) => (
                    <div key={i} className="px-2">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden py-4 pl-4 pr-3">
                  {editorLines.map((line, i) => {
                    if (line.kind === "muted") {
                      return (
                        <div key={i} className="text-zinc-600">
                          {line.text}
                        </div>
                      );
                    }
                    if (line.kind === "raw") {
                      return (
                        <div key={i} className="text-zinc-400">
                          {line.text}
                        </div>
                      );
                    }
                    if (line.kind === "keyword") {
                      return (
                        <div key={i}>
                          <span className="text-fuchsia-300">{line.token}</span>{" "}
                          <span className="text-amber-200">{line.name}</span>{" "}
                          <span className="text-zinc-500">=</span>{" "}
                          <span className="text-zinc-400">{line.value}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="pl-3">
                        <span className="text-sky-300">{line.label}</span>
                        <span className="text-zinc-500">: </span>
                        <span className={line.accent ? "text-emerald-300" : "text-emerald-200/85"}>
                          {line.value}
                        </span>
                        <span className="text-zinc-500">,</span>
                      </div>
                    );
                  })}
                  <div className="mt-2 text-zinc-700">
                    <span className="text-emerald-300">▸</span> exit 0{" "}
                    <span className="cursor-blink" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] bg-emerald-300/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                <div className="flex items-center gap-3">
                  <span>● ready</span>
                  <span className="text-zinc-600">/</span>
                  <span>UTF-8</span>
                  <span className="text-zinc-600">/</span>
                  <span>LF</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500">
                  <span>Ln 9, Col 14</span>
                  <span className="text-zinc-700">/</span>
                  <span>2 spaces</span>
                </div>
              </div>
            </div>

            <Motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -right-3 -top-5 rounded-md border border-amber-300/30 bg-gradient-to-br from-amber-300 to-amber-400 px-4 py-3 text-ink shadow-[0_15px_40px_-10px_rgba(251,191,36,0.5)]"
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">LeetCode</p>
              <p className="font-display text-2xl leading-none">{rank ?? "—"}</p>
              <p className="mt-1 font-mono text-[10px] font-bold">
                {peak != null ? `${peak} PEAK` : "SYNCING"}
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="liquid-glass absolute -bottom-4 -left-3 rounded-xl px-3 py-2.5 shadow-2xl"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                Recently Shipped
              </p>
              <p className="mt-0.5 font-mono text-[12px] font-semibold text-emerald-200">
                LogiFlow ⌁ GSC Top 106 · live on Vercel
              </p>
            </Motion.div>
          </Motion.div>
        </div>
      </div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative mt-4 border-y border-white/[0.06] bg-black/30 py-4 mask-fade-edges"
      >
        <div className="ticker-track flex w-max gap-12 px-6 font-mono text-[12px] uppercase tracking-[0.22em] text-zinc-500">
          {[...derived.tickerLines, ...derived.tickerLines, ...derived.tickerLines].map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-emerald-300">▸</span>
              <span>{t}</span>
            </span>
          ))}
        </div>
      </Motion.div>
      </div>
    </section>
  );
}
