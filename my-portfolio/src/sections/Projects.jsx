import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { projects } from "../data/portfolio";

const categories = ["All", "AI Systems", "Full Stack", "AI Tools", "Product", "Machine Learning", "Frontend"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const flagship = projects.find((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);
  const visible = filter === "All" ? rest : rest.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="section-shell">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 03 — Selected Work</p>
            <h2 className="display-h2 mt-6">
              Products with
              <span className="italic gradient-text-accent"> real surfaces</span>,
              not just slide decks.
            </h2>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            A mix of full-stack products, machine-learning experiments, and AI systems —
            each one shipped, deployed, and accessible behind a real URL.
          </Motion.p>
        </div>

        {/* Flagship — LogiFlow */}
        {flagship && (
          <Motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-300/[0.05] via-white/[0.015] to-indigo-400/[0.04]"
          >
            {/* Top status bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="live-dot" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                  Flagship · In Progress
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {flagship.period}
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Visual */}
              <div className="relative overflow-hidden border-b border-white/[0.06] bg-black/40 lg:border-b-0 lg:border-r">
                <div className="aspect-[16/11] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.18),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.18),transparent_60%)] lg:aspect-auto lg:h-full">
                  {/* Simulated dashboard graphic */}
                  <div className="absolute inset-0 grid-bg-fine opacity-50" />
                  <div className="relative flex h-full items-center justify-center p-10">
                    <div className="w-full max-w-md">
                      <div className="mb-4 grid grid-cols-4 gap-2">
                        {["Rail", "Air", "Road", "Water"].map((m, i) => (
                          <div
                            key={m}
                            className="rounded-md border border-white/[0.08] bg-black/50 px-2.5 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 backdrop-blur"
                            style={{
                              borderColor:
                                i === 0
                                  ? "rgba(52,211,153,0.4)"
                                  : "rgba(255,255,255,0.08)",
                              color: i === 0 ? "#34d399" : undefined,
                            }}
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg border border-white/[0.08] bg-black/60 p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                            Optimal Route
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                            ETA -18%
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-zinc-300">
                          <span className="rounded border border-emerald-300/30 bg-emerald-300/[0.08] px-2 py-1 text-emerald-200">
                            DEL
                          </span>
                          <span className="text-zinc-600">→</span>
                          <span className="rounded border border-white/[0.10] bg-white/[0.04] px-2 py-1">
                            JBP
                          </span>
                          <span className="text-zinc-600">→</span>
                          <span className="rounded border border-white/[0.10] bg-white/[0.04] px-2 py-1">
                            MUM
                          </span>
                          <span className="text-zinc-600">→</span>
                          <span className="rounded border border-emerald-300/30 bg-emerald-300/[0.08] px-2 py-1 text-emerald-200">
                            PNQ
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px]">
                          <div className="rounded border border-white/[0.08] bg-white/[0.02] p-2">
                            <p className="text-zinc-500">TIME</p>
                            <p className="mt-1 text-white">42h</p>
                          </div>
                          <div className="rounded border border-white/[0.08] bg-white/[0.02] p-2">
                            <p className="text-zinc-500">COST</p>
                            <p className="mt-1 text-white">₹12.4K</p>
                          </div>
                          <div className="rounded border border-white/[0.08] bg-white/[0.02] p-2">
                            <p className="text-zinc-500">RISK</p>
                            <p className="mt-1 text-emerald-300">LOW</p>
                          </div>
                        </div>
                        <div className="mt-3 rounded border border-white/[0.08] bg-white/[0.02] p-2 font-mono text-[10px] text-zinc-400">
                          <span className="text-amber-200">↳ AI:</span> Switching to rail leg cuts cost without breaching SLA window.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail */}
              <div className="p-7 lg:p-9">
                <span className="chip-accent">{flagship.category}</span>
                <h3 className="mt-5 font-display text-[2.25rem] leading-[1.05] tracking-ultratight text-white sm:text-5xl">
                  {flagship.title}
                </h3>
                <p className="mt-2 text-[15px] font-medium text-emerald-200/90">
                  {flagship.subtitle}
                </p>
                <p className="mt-5 max-w-xl text-[14px] leading-[1.75] text-zinc-400">
                  {flagship.description}
                </p>

                <ul className="mt-6 grid gap-2.5">
                  {flagship.bullets?.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[13px] leading-[1.7] text-zinc-300"
                    >
                      <span className="mt-1.5 inline-block h-1 w-1.5 flex-shrink-0 rounded-full bg-emerald-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {flagship.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={flagship.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Visit Project <span>↗</span>
                  </a>
                  <a
                    href={flagship.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Source <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </Motion.article>
        )}

        {/* Filters */}
        <div className="mt-20 flex flex-wrap items-center gap-2">
          <span className="label-mono mr-2">Filter:</span>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-md border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition ${
                filter === c
                  ? "border-emerald-300/40 bg-emerald-300/[0.08] text-emerald-200"
                  : "border-white/[0.07] bg-white/[0.015] text-zinc-400 hover:border-white/[0.18] hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
                e.currentTarget.style.setProperty("--spot-opacity", "1");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("--spot-opacity", "0");
              }}
              style={{
                "--spot-x": "50%",
                "--spot-y": "50%",
                "--spot-opacity": "0",
                "--spot-size": "320px",
                "--spot-color": "rgba(52, 211, 153, 0.10)",
              }}
              className="spotlight-card group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015] transition duration-500 hover:border-white/[0.14] hover:bg-white/[0.025]"
            >
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-ink-100">
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    loading={i > 1 ? "lazy" : "eager"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-md border border-white/15 bg-black/55 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
                      {p.period}
                    </span>
                  </div>
                </div>
              </a>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight tracking-ultratight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-[12.5px] font-medium text-emerald-200/90">
                      {p.subtitle}
                    </p>
                  </div>
                  <span className="text-zinc-600 transition group-hover:text-emerald-300">↗</span>
                </div>

                <p className="mt-3 line-clamp-3 text-[13px] leading-[1.7] text-zinc-400">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="chip !text-[10px]">{t}</span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="chip !text-[10px]">+{p.tech.length - 4}</span>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4 text-[11px]">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono uppercase tracking-[0.18em] text-emerald-200 transition hover:text-emerald-100"
                  >
                    Live →
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
                  >
                    Source ↗
                  </a>
                </div>
              </div>
            </Motion.article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-center font-mono text-[13px] uppercase tracking-[0.18em] text-zinc-600">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
