import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { projects } from "../data/portfolio";

const categories = ["All", "AI Systems", "Full Stack", "AI Tools", "Product", "Machine Learning", "Frontend"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const flagship = projects.find((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);
  const visible = filter === "All" ? rest : rest.filter((p) => p.category === filter);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

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
                  Flagship · Shipped · GSC Top 100
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {flagship.period}
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Visual */}
              <div className="relative overflow-hidden border-b border-white/[0.06] bg-black/40 lg:border-b-0 lg:border-r">
                <div className="aspect-[16/11] w-full lg:aspect-auto lg:h-full">
                  <img
                    src={flagship.image}
                    alt={`${flagship.title} preview`}
                    className="h-full w-full object-cover object-top"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
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
                {flagship.role && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    Role · <span className="text-zinc-300">{flagship.role}</span>
                  </p>
                )}
                <p className="mt-5 max-w-xl text-[14px] leading-[1.75] text-zinc-400">
                  {flagship.description}
                </p>

                {flagship.impact && (
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {flagship.impact.map((item) => (
                      <div
                        key={item}
                        className="rounded-md border border-emerald-300/18 bg-emerald-300/[0.045] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

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
                  <button
                    type="button"
                    onClick={() => setSelectedProject(flagship)}
                    className="btn-ghost"
                  >
                    Case Study <span>⌁</span>
                  </button>
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
                const shell = e.currentTarget.querySelector("[data-tilt-shell]");
                if (shell) {
                  const px = ((e.clientX - r.left) / r.width - 0.5) * -12;
                  const py = ((e.clientY - r.top) / r.height - 0.5) * 11;
                  shell.style.transform = `perspective(880px) rotateX(${py}deg) rotateY(${px}deg) scale3d(1.01,1.01,1)`;
                }
                e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
                e.currentTarget.style.setProperty("--spot-opacity", "1");
              }}
              onMouseLeave={(e) => {
                const shell = e.currentTarget.querySelector("[data-tilt-shell]");
                if (shell) shell.style.transform = "";
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
              <div
                data-tilt-shell
                className="flex h-full transform-gpu flex-col transition-transform duration-200 ease-out will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
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

                {p.impact && (
                  <div className="mt-4 grid gap-1.5">
                    {p.impact.slice(0, 3).map((item) => (
                      <p
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-[1.5] text-zinc-300"
                      >
                        <span className="mt-1.5 h-1 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="chip !text-[10px]">{t}</span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="chip !text-[10px]">+{p.tech.length - 4}</span>
                  )}
                </div>

                <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/[0.05] pt-4 text-[11px]">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md px-2 py-2 text-center font-mono uppercase tracking-[0.18em] text-emerald-200 transition hover:bg-emerald-300/[0.08] hover:text-emerald-100"
                  >
                    Live
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(p)}
                    className="rounded-md px-2 py-2 text-center font-mono uppercase tracking-[0.18em] text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    Brief
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md px-2 py-2 text-center font-mono uppercase tracking-[0.18em] text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    Source
                  </a>
                </div>
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

      <ProjectBriefModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

function ProjectBriefModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <Motion.div
          key={project.title}
          className="fixed inset-0 z-[180] grid place-items-center overflow-y-auto px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close project brief"
            className="absolute inset-0 bg-ink/82 backdrop-blur-md"
            onClick={onClose}
          />

          <Motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-brief-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.10] bg-[rgba(14,15,20,0.96)] shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[280px] overflow-hidden border-b border-white/[0.07] bg-black/35 lg:border-b-0 lg:border-r">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="chip-accent">{project.category}</span>
                  <h3
                    id="project-brief-title"
                    className="mt-4 font-display text-[2.6rem] leading-none tracking-ultratight text-white sm:text-6xl"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[14px] font-medium text-emerald-200">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <div className="max-h-[86vh] overflow-y-auto p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-mono">Case study brief</p>
                    {project.role && (
                      <p className="mt-2 text-[13px] leading-[1.65] text-zinc-400">
                        <span className="text-zinc-200">Role:</span> {project.role}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/[0.10] text-zinc-400 transition hover:border-emerald-300/35 hover:text-white"
                    aria-label="Close project brief"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 grid gap-4">
                  <BriefBlock label="Problem" text={project.problem || project.description} />
                  <BriefBlock label="Solution" text={project.solution || project.description} />
                  {project.proof && <BriefBlock label="Proof" text={project.proof} />}
                </div>

                {project.outcomes && (
                  <div className="mt-6 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.04] p-5">
                    <p className="label-mono text-emerald-200/80">Outcomes</p>
                    <ul className="mt-4 grid gap-3">
                      {project.outcomes.map((item) => (
                        <li key={item} className="flex gap-3 text-[13px] leading-[1.7] text-zinc-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Open Live
                    <span>↗</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    View Source
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </Motion.article>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

function BriefBlock({ label, text }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-5">
      <p className="label-mono">{label}</p>
      <p className="mt-3 text-[13.5px] leading-[1.75] text-zinc-300">{text}</p>
    </div>
  );
}
