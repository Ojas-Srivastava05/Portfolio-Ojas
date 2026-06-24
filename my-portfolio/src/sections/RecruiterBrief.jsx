import { useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { profile, projects, recruiterBrief, INTERNSHIP_AVAILABILITY, formatCgpaDisplay } from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";

export default function RecruiterBrief() {
  const { derived } = useLiveCodingStats();
  const [copied, setCopied] = useState(false);
  const featured = useMemo(() => projects.filter((p) => p.featured).slice(0, 3), []);

  const briefItems = useMemo(() => {
    const { rank, peak, cgpa, shipped } = derived;
    return recruiterBrief.map((item) => {
      if (item.label === "Proof") {
        return {
          ...item,
          value: shipped > 0 ? `${shipped}+ shipped builds` : item.value,
        };
      }
      if (item.label === "Signal") {
        const lcBit = rank && peak != null ? `LeetCode ${rank} (${peak} peak)` : "LeetCode (live)";
        const cgpaBit = formatCgpaDisplay(cgpa) != null ? `CGPA ${formatCgpaDisplay(cgpa)}` : "SVNIT AI";
        return { ...item, value: `${lcBit} · ${cgpaBit}` };
      }
      if (item.label === "Availability") {
        return { ...item, value: INTERNSHIP_AVAILABILITY };
      }
      return item;
    });
  }, [derived]);

  const proofItems = useMemo(
    () => [
      {
        title: "Can ship production-ish systems",
        evidence:
          "IFFCO internship, deployed full-stack apps, REST APIs, auth, databases, Cloudinary, Render/Vercel.",
      },
      {
        title: "Can reason through algorithms",
        evidence: derived.proofAlgorithms,
      },
      {
        title: "Can build AI beyond wrappers",
        evidence:
          "RAG, graph search, OCR, offline voice, route explainability, ML delay prediction, summarisation.",
      },
    ],
    [derived.proofAlgorithms],
  );

  const copyPitch = async () => {
    try {
      await navigator.clipboard.writeText(derived.recruiterPitch);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="brief" className="relative overflow-hidden">
      <div className="section-shell !py-16 lg:!py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="panel-strong overflow-hidden rounded-xl"
          >
            <div className="border-b border-white/[0.06] px-6 py-4">
              <p className="eyebrow">// 00 — Recruiter Scan</p>
              <h2 className="mt-5 font-display text-[2.4rem] leading-[1.03] tracking-ultratight text-white sm:text-5xl">
                The 60-second
                <span className="italic gradient-text-accent"> proof layer</span>.
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.75] text-zinc-400">
                A compact read for recruiters and hiring managers: what I build, why I am credible,
                and where to click first.
              </p>
            </div>

            <div className="grid gap-px bg-white/[0.05] sm:grid-cols-2">
              {briefItems.map((item) => (
                <div key={item.label} className="bg-ink-100 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/80">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-[12.5px] leading-[1.65] text-zinc-500">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 px-6 py-5">
              <button type="button" onClick={copyPitch} className="btn-primary">
                {copied ? "Pitch Copied" : "Copy Pitch"}
                <span>{copied ? "✓" : "↗"}</span>
              </button>
              <a href={profile.resume} download className="btn-ghost">
                Resume
                <span>↓</span>
              </a>
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                Email
                <span>@</span>
              </a>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08 }}
            className="grid gap-4"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {proofItems.map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
                >
                  <span className="font-mono text-[11px] font-bold tracking-[0.22em] text-zinc-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-[1.7] text-zinc-500">{item.evidence}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.04] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="label-mono text-emerald-200/80">Open first</p>
                  <h3 className="mt-1 font-display text-2xl tracking-ultratight text-white">
                    Three projects that tell the story fastest
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-ghost"
                >
                  View Work
                  <span>↓</span>
                </button>
              </div>

              <div className="mt-5 grid gap-3">
                {featured.map((project) => (
                  <a
                    key={project.title}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-2 rounded-md border border-white/[0.07] bg-black/25 p-4 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.04] sm:grid-cols-[160px_1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="font-display text-xl leading-none tracking-ultratight text-white">
                        {project.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                        {project.category}
                      </p>
                    </div>
                    <p className="text-[12.5px] leading-[1.65] text-zinc-400">
                      {project.impact?.join(" · ") || project.subtitle}
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-200 opacity-80 transition group-hover:opacity-100">
                      Open ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
