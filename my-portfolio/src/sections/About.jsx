import { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { education, principles, interests, profile, formatCgpaDisplay } from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";

export default function About() {
  const { derived } = useLiveCodingStats();
  const cgpaLabel = formatCgpaDisplay(derived.cgpa);

  const principlesMerged = useMemo(
    () =>
      principles.map((p) =>
        p.n === "04" ? { ...p, body: derived.principlesAlgorithmsBody } : p,
      ),
    [derived.principlesAlgorithmsBody],
  );
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-shell">
        {/* Section header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">// 01 — About</p>
            <h2 className="display-h2 mt-6">
              The product should feel as
              <span className="italic gradient-text-accent"> intentional </span>
              as the code behind it.
            </h2>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[15px] leading-[1.75] text-zinc-400">
              Penultimate-year B.Tech Artificial Intelligence student at SVNIT Surat
              (CGPA 9.20, graduating May 2028), building production-grade software at the
              intersection of backend systems, applied ML, and thoughtful product design.
              My work is strongest where engineering detail meets product clarity: APIs that
              behave, interfaces that scan quickly, and systems that ship.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {interests.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </Motion.div>
        </div>

        {/* Principles grid */}
        <div className="mt-20">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
            <p className="label-mono">Engineering principles</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-700">
              4 / 4
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
            {principlesMerged.map((p, i) => (
              <Motion.div
                key={p.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06 }}
                className="group relative bg-ink-100 p-7 transition hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-emerald-300/90">
                    {p.n}
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-emerald-300/60 to-transparent" />
                </div>
                <h3 className="mt-7 font-display text-[1.55rem] leading-[1.15] tracking-ultratight text-white">
                  {p.title}
                </h3>
                <p className="mt-4 text-[13.5px] leading-[1.75] text-zinc-400">
                  {p.body}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>

        {/* Education + Currently */}
        <div className="mt-20 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Education */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="panel-strong overflow-hidden rounded-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div>
                <p className="label-mono">// Education</p>
                <h3 className="mt-1 font-display text-2xl tracking-ultratight text-white">
                  Academic record
                </h3>
              </div>
              <span className="chip-accent">
                {cgpaLabel != null ? `CGPA ${cgpaLabel}` : "CGPA —"}
              </span>
            </div>

            <div className="grid divide-y divide-white/[0.05]">
              {education.map((e, i) => (
                <Motion.div
                  key={e.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05 }}
                  className="grid gap-3 p-6 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <h4 className="text-[15px] font-semibold text-white">{e.title}</h4>
                    <p className="mt-1 text-[13px] text-zinc-400">{e.institution}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                      {e.location} · {e.period}
                    </p>
                    {e.note && (
                      <p className="mt-3 text-[12.5px] leading-relaxed text-zinc-500">
                        {e.note}
                      </p>
                    )}
                  </div>
                  <div className="self-start font-mono text-2xl font-medium text-emerald-200 sm:text-right">
                    {e.score}
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>

          {/* Now Card */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.05] via-amber-300/[0.02] to-transparent p-7"
          >
            <div className="flex items-center gap-2">
              <span className="live-dot" style={{ background: "#fbbf24", boxShadow: "0 0 0 3px rgba(251,191,36,0.25)" }} />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-200">
                Currently
              </p>
            </div>
            <h3 className="mt-5 font-display text-[1.65rem] leading-[1.15] tracking-ultratight text-white">
              Turning learning into shipped projects.
            </h3>
            <div className="mt-5 space-y-4 text-[13.5px] leading-[1.75] text-zinc-400">
              <p>
                Last summer I interned at IFFCO, shipping a full-stack internal tool that
                automated 50+ daily workflows — REST APIs, optimized SQL, Docker, and CI/CD.
              </p>
              <p>
                Shipped <span className="text-emerald-200">LogiFlow</span> (GSC Global Top 106)
                and <span className="text-emerald-200">Community Hero</span> (Vibe2Ship) —
                while building the <span className="text-emerald-200">Career Automation Stack</span>
                across 965+ companies.
              </p>
            </div>

            <div className="mt-6 rounded-md border border-white/[0.08] bg-black/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Open to
              </p>
              <p className="mt-2 text-[14px] font-semibold text-white">
                {profile.available}
              </p>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
