import { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { experiences } from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";

export default function Experience() {
  const { derived } = useLiveCodingStats();

  const items = useMemo(
    () =>
      experiences.map((item) =>
        item.metric?.startsWith("CGPA")
          ? {
              ...item,
              metric: derived.cgpa != null ? `CGPA ${derived.cgpa}` : item.metric,
            }
          : item,
      ),
    [derived.cgpa],
  );
  return (
    <section id="experience" className="relative overflow-hidden">
      <div className="section-shell">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 02 — Experience</p>
            <h2 className="display-h2 mt-6">
              A practical path through
              <span className="italic gradient-text-accent"> products</span>,
              teams, and AI fundamentals.
            </h2>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            Industry, leadership, academic, and community roles — the kind of work that
            sharpens taste and turns ideas into deliverables.
          </Motion.p>
        </div>

        {/* Timeline */}
        <div className="mt-20 grid gap-3">
          {items.map((item, i) => (
            <Motion.article
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              className="group relative grid gap-6 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 transition duration-500 hover:border-white/[0.14] hover:bg-white/[0.025] sm:p-7 lg:grid-cols-[200px_1fr_auto] lg:items-start"
            >
              {/* Hover edge accent */}
              <span className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-emerald-300 via-emerald-300/60 to-transparent transition-transform duration-500 group-hover:scale-y-100" />

              {/* Year */}
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300/90">
                  {item.year}
                </p>
                {item.metric && (
                  <span className="mt-3 inline-flex rounded-md border border-amber-300/30 bg-amber-300/[0.08] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200">
                    {item.metric}
                  </span>
                )}
                {item.location && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                    {item.location}
                  </p>
                )}
              </div>

              {/* Body */}
              <div>
                <h3 className="font-display text-2xl leading-tight tracking-ultratight text-white sm:text-[1.7rem]">
                  {item.role}
                </h3>
                <p className="mt-1 text-[13.5px] font-medium text-zinc-300">{item.company}</p>
                <p className="mt-4 max-w-3xl text-[13.5px] leading-[1.75] text-zinc-400">
                  {item.description}
                </p>

                {item.bullets && (
                  <ul className="mt-4 grid gap-2">
                    {item.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[13px] leading-[1.7] text-zinc-400"
                      >
                        <span className="mt-2 inline-block h-1 w-1.5 flex-shrink-0 rounded-full bg-emerald-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Index */}
              <div className="hidden self-start text-right lg:block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                  / {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
