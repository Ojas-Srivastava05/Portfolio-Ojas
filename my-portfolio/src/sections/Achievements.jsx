import { motion as Motion } from "framer-motion";
import { achievements, nowFeed } from "../data/portfolio";

const tagAccent = {
  Hackathon: "border-orange-300/30 bg-orange-300/[0.06] text-orange-200",
  Competitive: "border-amber-300/30 bg-amber-300/[0.06] text-amber-200",
  Industry: "border-emerald-300/30 bg-emerald-300/[0.06] text-emerald-200",
  Leadership: "border-violet-300/30 bg-violet-300/[0.06] text-violet-200",
  Community: "border-sky-300/30 bg-sky-300/[0.06] text-sky-200",
  Learning: "border-rose-300/30 bg-rose-300/[0.06] text-rose-200",
  Mentorship: "border-teal-300/30 bg-teal-300/[0.06] text-teal-200",
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden">
      <div className="section-shell">
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 06 — Highlights</p>
            <h2 className="display-h2 mt-6">
              Milestones that show
              <span className="italic gradient-text-accent"> initiative </span>
              outside the classroom.
            </h2>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            A concise snapshot of the work, leadership, and learning threads behind the
            projects.
          </Motion.p>
        </div>

        {/* Achievements grid */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Motion.div
              key={a.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015] p-6 transition duration-500 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.025]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-zinc-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`rounded-md border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${
                    tagAccent[a.tag] || "border-white/[0.10] bg-white/[0.02] text-zinc-400"
                  }`}
                >
                  {a.tag}
                </span>
              </div>

              <h3 className="mt-7 font-display text-[1.45rem] leading-tight tracking-ultratight text-white">
                {a.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.75] text-zinc-400">{a.detail}</p>

              <span className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-300/[0.05] blur-3xl transition group-hover:bg-emerald-300/[0.1]" />
            </Motion.div>
          ))}
        </div>

        {/* Now feed */}
        <Motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="live-dot" />
              <p className="label-mono">// /now</p>
              <h3 className="font-display text-xl tracking-ultratight text-white">
                What I'm on, right now
              </h3>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              updated · this week
            </span>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {nowFeed.map((n) => (
              <div
                key={n.tag + n.text}
                className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="inline-flex w-fit items-center rounded-md border border-emerald-300/30 bg-emerald-300/[0.07] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                  {n.tag}
                </span>
                <p className="flex-1 text-[14px] text-zinc-200">{n.text}</p>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
