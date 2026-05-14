import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  STATS_CP_PLATFORM_FALLBACK,
  heroMetrics,
  profileLinks,
  profile,
  tickerLines,
} from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";

const headlineVerbs = ["ship.", "engineer.", "model.", "deploy.", "solve."];

const editorCodeLinesSeed = [
  { kind: "muted", text: "// ojas.srivastava — builder.config.ts" },
  { kind: "keyword", token: "export const", name: "engineer", value: "{" },
  {
    kind: "field",
    label: "name",
    value: '"Ojas Srivastava"',
  },
  { kind: "field", label: "role", value: '"AI Engineer · Full-stack"' },
  { kind: "field", label: "school", value: '"SVNIT Surat · CGPA 9.19"' },
  { kind: "field", label: "leetcode", value: '{ rank: "Knight", peak: 1952, solved: 548 }' },
  { kind: "field", label: "stack", value: '["React", "Node", "Python", "FastAPI"]' },
  { kind: "field", label: "focus", value: '"Backend · Distributed · AI"' },
  { kind: "field", label: "available", value: 'true', accent: true },
  { kind: "raw", text: "}" },
  { kind: "muted", text: "// ⏎ Run \"npm run hire\"" },
];

function formatContestPctSub(pct) {
  if (typeof pct !== "number" || Number.isNaN(pct)) return null;
  const t = Number.isInteger(pct) ? String(pct) : pct.toFixed(2).replace(/\.?0+$/, "");
  return `Knight · Top ~${t}% contests`;
}

export default function Hero() {
  const [verbIndex, setVerbIndex] = useState(0);
  const [time, setTime] = useState(() => new Date());
  const { stats } = useLiveCodingStats();

  const displayMetrics = useMemo(() => {
    const lc = stats.leetcode;
    return heroMetrics.map((m, i) => {
      const pctSub = lc?.topPercentage != null ? formatContestPctSub(lc.topPercentage) : null;
      if (i === 0 && pctSub) {
        return { ...m, sub: pctSub };
      }
      if (i === 0 && !pctSub && lc?.contestRating != null) {
        return { ...m, sub: `Knight · rating ${lc.contestRating}` };
      }
      if (i === 2 && typeof lc?.totalSolved === "number") {
        const agg =
          lc.totalSolved +
          STATS_CP_PLATFORM_FALLBACK.codeforcesProblems +
          STATS_CP_PLATFORM_FALLBACK.codechefProblems;
        return {
          ...m,
          value: `${agg}+`,
          sub: `${lc.totalSolved}+ LC · ${STATS_CP_PLATFORM_FALLBACK.codeforcesProblems} CF · ${STATS_CP_PLATFORM_FALLBACK.codechefProblems} CC`,
        };
      }
      return m;
    });
  }, [stats.leetcode]);

  const editorLines = useMemo(() => {
    const n = stats.leetcode?.totalSolved;
    if (typeof n !== "number") return editorCodeLinesSeed;
    return editorCodeLinesSeed.map((line) =>
      line.kind === "field" && line.label === "leetcode"
        ? {
            ...line,
            value: `{ rank: "Knight", peak: 1952, solved: ${n} }`,
          }
        : line,
    );
  }, [stats.leetcode]);

  const leetSubtitle = stats.leetcode?.totalSolved
    ? `LeetCode Knight — ${stats.leetcode.totalSolved} solves, 1952 peak.`
    : "LeetCode Knight — scores refresh automatically from LC · GH · CF APIs.";

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

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-2rem)] overflow-hidden pt-24 sm:pt-28"
    >
      {/* Aurora wash */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="aurora" />
      </div>

      <div className="section-shell !py-12 lg:!py-20">
        {/* Top status bar */}
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <span className="live-dot" />
            <span className="text-emerald-200">CURRENTLY AVAILABLE</span>
            <span className="text-zinc-700">/</span>
            <span>SUMMER 2026 INTERN</span>
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
          {/* LEFT: Identity */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <div className="eyebrow">Builder · Engineer · Student</div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[12vw] font-normal leading-[0.92] tracking-ultratight text-white sm:text-[5.4rem] lg:text-[6.8rem]">
              <span className="block">I don't just code.</span>
              <span className="mt-1 flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                <span>I</span>
                <span
                  className="relative inline-block align-baseline"
                  style={{ minWidth: "5.5ch", lineHeight: 1.12 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <Motion.span
                      key={headlineVerbs[verbIndex]}
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block whitespace-nowrap italic gradient-text-accent"
                    >
                      {headlineVerbs[verbIndex]}
                    </Motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-8 max-w-2xl text-balance text-[17px] leading-[1.7] text-zinc-300 sm:text-[19px]">
              <span className="text-white">B.Tech in Artificial Intelligence at SVNIT Surat.</span>{" "}
              I design backends that behave, ship full-stack products that survive deployment, and
              grind algorithms like the scoreboard is watching.{" "}
              <span className="text-emerald-200">{leetSubtitle}</span>
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                Explore the Build
                <span className="text-[14px]">→</span>
              </button>
              <a href={profile.resume} download className="btn-ghost">
                Download CV
                <span className="text-[14px]">↓</span>
              </a>
              <a
                href="https://github.com/Ojas-Srivastava05"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub
                <span className="text-[14px]">↗</span>
              </a>
            </div>

            {/* Metrics row */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {displayMetrics.map((m, i) => (
                <Motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.5 }}
                  className={`group panel panel-hover px-4 py-4 ${
                    i === 0 ? "border-amber-300/25 bg-amber-300/[0.04]" : ""
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

            {/* Quick links row */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {profileLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-md border border-white/[0.07] bg-white/[0.015] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-emerald-300/[0.04]"
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

          {/* RIGHT: Editor card */}
          <Motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-4 -z-10 rounded-[1.5rem] bg-gradient-to-br from-emerald-300/[0.10] via-indigo-400/[0.05] to-amber-300/[0.08] blur-3xl" />

            {/* Editor frame */}
            <div className="panel-strong overflow-hidden rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <p className="font-mono text-[11px] text-zinc-500">
                  builder.config.ts —{" "}
                  <span className="text-emerald-300">~/portfolio</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  TYPESCRIPT
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 border-b border-white/[0.05] bg-black/30 px-3 py-1.5">
                <span className="rounded-t-md border-x border-t border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-emerald-200">
                  ● builder.config.ts
                </span>
                <span className="px-3 py-1 font-mono text-[11px] text-zinc-600">
                  README.md
                </span>
                <span className="px-3 py-1 font-mono text-[11px] text-zinc-600">
                  manifest.json
                </span>
              </div>

              {/* Code body */}
              <div className="grid grid-cols-[36px_1fr] font-mono text-[12.5px] leading-[1.85] sm:text-[13px]">
                {/* Line numbers */}
                <div className="border-r border-white/[0.05] bg-white/[0.01] py-4 text-right text-zinc-700">
                  {editorLines.map((_, i) => (
                    <div key={i} className="px-2">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  ))}
                </div>

                {/* Content */}
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
                        <span
                          className={
                            line.accent
                              ? "text-emerald-300"
                              : "text-emerald-200/85"
                          }
                        >
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

              {/* Status bar */}
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

            {/* Floating LeetCode badge */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -right-3 -top-5 rounded-md border border-amber-300/30 bg-gradient-to-br from-amber-300 to-amber-400 px-4 py-3 text-ink shadow-[0_15px_40px_-10px_rgba(251,191,36,0.5)]"
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">
                LeetCode
              </p>
              <p className="font-display text-2xl leading-none">Knight</p>
              <p className="mt-1 font-mono text-[10px] font-bold">1952 PEAK</p>
            </Motion.div>

            {/* Floating focus chip */}
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-4 -left-3 rounded-md border border-white/[0.10] bg-[rgba(14,15,20,0.95)] px-3 py-2.5 shadow-2xl backdrop-blur"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                Now Building
              </p>
              <p className="mt-0.5 font-mono text-[12px] font-semibold text-emerald-200">
                LogiFlow ⌁ logistics decision engine
              </p>
            </Motion.div>
          </Motion.div>
        </div>
      </div>

      {/* Marquee */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative mt-4 border-y border-white/[0.06] bg-black/30 py-4 mask-fade-edges"
      >
        <div className="ticker-track flex w-max gap-12 px-6 font-mono text-[12px] uppercase tracking-[0.22em] text-zinc-500">
          {[...tickerLines, ...tickerLines, ...tickerLines].map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-emerald-300">▸</span>
              <span>{t}</span>
            </span>
          ))}
        </div>
      </Motion.div>
    </section>
  );
}
