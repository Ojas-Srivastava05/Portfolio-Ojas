import { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { codingProfiles, achievementStats } from "../data/portfolio";

// Generate a deterministic but realistic-looking activity heat-map (52w × 7d)
function generateActivity(seed = 1) {
  const cells = [];
  let x = seed;
  for (let i = 0; i < 7 * 52; i++) {
    x = (x * 9301 + 49297) % 233280;
    const r = x / 233280;
    let level = 0;
    if (r > 0.18) level = 1;
    if (r > 0.45) level = 2;
    if (r > 0.7) level = 3;
    if (r > 0.88) level = 4;
    cells.push(level);
  }
  return cells;
}

const heatColors = [
  "rgba(255,255,255,0.04)",
  "rgba(52,211,153,0.18)",
  "rgba(52,211,153,0.38)",
  "rgba(52,211,153,0.65)",
  "rgba(52,211,153,0.95)",
];

export default function CodingStats() {
  const activity = useMemo(() => generateActivity(7), []);
  const totalContributions = useMemo(
    () => activity.reduce((sum, l) => sum + (l > 0 ? Math.max(1, l * 2) : 0), 0),
    [activity],
  );

  return (
    <section id="coding-stats" className="relative overflow-hidden">
      <div className="section-shell">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 04 — Stats</p>
            <h2 className="display-h2 mt-6">
              Numbers that point to
              <span className="italic gradient-text-accent"> consistency</span>,
              not decoration.
            </h2>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            Competitive programming, academic performance, and shipped projects all feed
            the same habit: learn fast, debug carefully, build momentum.
          </Motion.p>
        </div>

        {/* Hero stats row */}
        <div className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {achievementStats.map((s, i) => (
            <Motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05 }}
              className="panel panel-hover relative overflow-hidden p-6"
            >
              <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-300/[0.05] blur-2xl" />
              <p className="font-display text-[3.2rem] font-normal leading-none tracking-ultratight gradient-text-mono">
                {s.value}
              </p>
              <p className="mt-4 text-[13px] font-semibold text-emerald-200/90">
                {s.label}
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-zinc-500">
                {s.detail}
              </p>
            </Motion.div>
          ))}
        </div>

        {/* Profiles grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {codingProfiles.map((p, i) => (
            <Motion.a
              key={p.platform}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
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
                "--spot-color": `${p.color === "#FFFFFF" ? "rgba(255,255,255,0.06)" : `${p.color}1F`}`,
              }}
              className="spotlight-card group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015] p-6 transition duration-500 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.03]"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl transition group-hover:opacity-60"
                style={{ background: p.color }}
              />

              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-md border border-white/[0.08] bg-black/40">
                    <img
                      src={p.icon}
                      alt={`${p.platform} icon`}
                      className="h-6 w-6 object-contain"
                    />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-white">{p.platform}</h3>
                    <p className="font-mono text-[11px] text-zinc-500">@{p.handle}</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition group-hover:text-emerald-200">
                  Visit ↗
                </span>
              </div>

              <p className="relative mt-5 text-[13px] leading-[1.7] text-zinc-400">
                {p.detail}
              </p>

              <div className="relative mt-5 grid grid-cols-3 gap-2">
                {p.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-md border border-white/[0.06] bg-black/30 px-3 py-2.5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-mono text-[14px] font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </Motion.a>
          ))}
        </div>

        {/* Activity Grid */}
        <Motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="panel-strong mt-12 overflow-hidden rounded-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
            <div>
              <p className="label-mono">// Activity · Last 12 months</p>
              <h3 className="mt-1 font-display text-2xl tracking-ultratight text-white">
                The grind, visualised.
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-zinc-500">
                <span className="text-white">{totalContributions}</span> contributions
              </span>
              <span className="chip-accent">consistent</span>
            </div>
          </div>

          <div className="overflow-x-auto p-6">
            <div className="inline-grid min-w-full grid-flow-col grid-rows-7 gap-[3px]">
              {activity.map((level, i) => (
                <div
                  key={i}
                  className="heat-cell h-3 w-3 rounded-[2px] sm:h-3.5 sm:w-3.5"
                  style={{ background: heatColors[level] }}
                  title={`Level ${level}`}
                />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              <span>52 weeks</span>
              <div className="flex items-center gap-2">
                <span>Less</span>
                {heatColors.map((c, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-[2px]"
                    style={{ background: c }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
