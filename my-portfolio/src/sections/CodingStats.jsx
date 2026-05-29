import { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { codingProfiles } from "../data/portfolio";
import LeetContestVisualization from "../components/LeetContestVisualization";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";
import { formatTopPct } from "../utils/derivePortfolioStats";
import { formatSyncedAge } from "../utils/statsTime";

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
  const {
    stats,
    derived,
    loading,
    syncing,
    errors,
    heatmap,
    heatmapLoading,
    lastSyncedAt,
    heatmapLastSyncedAt,
  } = useLiveCodingStats();

  const [syncClock, setSyncClock] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setSyncClock((x) => x + 1), 12_000);
    return () => window.clearInterval(id);
  }, []);

  const syncLabelParts = useMemo(() => {
    void syncClock;
    const a = formatSyncedAge(lastSyncedAt);
    const b = formatSyncedAge(heatmapLastSyncedAt);
    if (!a && !b) return null;
    if (a && b) return `${a} · chart ${b}`;
    return a || `chart ${b}`;
  }, [lastSyncedAt, heatmapLastSyncedAt, syncClock]);

  const fallbackHeat = useMemo(() => generateActivity(7), []);
  const levels = heatmap?.levels ?? fallbackHeat;
  const contribTotalLive = heatmap?.periodTotal;
  const totalContributions = useMemo(() => {
    if (contribTotalLive != null) return contribTotalLive;
    return levels.reduce((sum, l) => sum + (l > 0 ? Math.max(1, l * 2) : 0), 0);
  }, [levels, contribTotalLive]);

  const mergedProfiles = useMemo(() => {
    const { peak, rank, lcSolved, cfSolved, ccSolved } = derived;

    return codingProfiles.map((p) => {
      if (p.platform === "LeetCode" && stats.leetcode?.totalSolved) {
        const lc = stats.leetcode;
        const topPctLabel = formatTopPct(lc.topPercentage) ?? "—";
        const peakVal = peak != null ? String(peak) : "—";
        const rankLabel = rank ?? "—";
        return {
          ...p,
          rating: lc.contestRating != null ? String(lc.contestRating) : p.rating,
          rank: rankLabel,
          detail: `${lc.totalSolved} solved · Peak ${peakVal} · ${topPctLabel}`,
          stats: [
            { label: "Peak rating", value: peakVal },
            { label: "Current", value: lc.contestRating != null ? String(lc.contestRating) : "—" },
            { label: "Rank", value: rankLabel },
            { label: "Problems", value: String(lc.totalSolved) },
            { label: "Contests", value: String(lc.contestsAttended ?? "—") },
            { label: "Global rank", value: topPctLabel },
          ],
        };
      }
      if (p.platform === "Codeforces" && stats.codeforces?.rating != null) {
        const cf = stats.codeforces;
        const probVal = cfSolved != null ? String(cfSolved) : "—";
        return {
          ...p,
          rating: String(cf.rating),
          rank: cf.rank ?? p.rank,
          detail: `${cf.rating} rated · ${cf.rank ?? "rank"} · ${probVal} problems uniquely solved.`,
          stats: [
            { label: "Rating", value: String(cf.rating) },
            { label: "Rank", value: cf.rank ?? "—" },
            { label: "Max", value: cf.maxRating != null ? String(cf.maxRating) : "—" },
            { label: "Problems", value: probVal },
          ],
        };
      }
      if (p.platform === "GitHub" && stats.github?.repositories != null) {
        const gh = stats.github;
        return {
          ...p,
          rating: String(gh.repositories),
          rank: "Public repos",
          detail: `${gh.repositories} public repos · ${gh.followers ?? "—"} followers · ${typeof gh.stars === "number" ? gh.stars : 0}★ across them.`,
          stats: [
            { label: "Repos", value: String(gh.repositories) },
            { label: "Followers", value: gh.followers != null ? String(gh.followers) : "—" },
            { label: "Stars", value: typeof gh.stars === "number" ? String(gh.stars) : "—" },
          ],
        };
      }
      if (p.platform === "CodeChef" && stats.codechef?.rating) {
        const cc = stats.codechef;
        const probVal = ccSolved != null ? String(ccSolved) : "—";
        return {
          ...p,
          rating: String(cc.rating),
          rank: String(cc.stars ?? p.rank),
          detail: `${cc.globalRank ?? "—"} global · ${cc.countryRank ?? "—"} India — live mirror`,
          stats: [
            { label: "Rating", value: String(cc.rating) },
            { label: "Stars", value: String(cc.stars ?? "—") },
            { label: "Peak", value: String(cc.maxRating ?? "—") },
            { label: "Problems", value: probVal },
          ],
        };
      }
      return p;
    });
  }, [stats, derived]);

  return (
    <section id="coding-stats" className="relative overflow-hidden">
      <div className="section-shell">
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 04 — Stats</p>
            <h2 className="display-h2 mt-6">
              Numbers that point to
              <span className="italic gradient-text-accent"> consistency</span>, not decoration.
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${
                  loading
                    ? "border-amber-300/35 text-amber-200/85"
                    : syncing
                      ? "border-sky-400/35 text-sky-100"
                      : "border-emerald-400/35 text-emerald-200"
                }`}
              >
                {loading ? "Pulling APIs…" : syncing ? "Background sync…" : "Live LC · GH · CF · CC"}
              </span>
              {!loading && syncLabelParts != null ? (
                <span className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  <span className="text-emerald-200/95">Synced</span> {syncLabelParts}
                </span>
              ) : null}
              {loading === false && !stats?.leetcode && errors?.leetcode != null && (
                <span className="rounded-full border border-rose-400/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-rose-200/95">
                  LeetCode fetch blocked — retry via command palette
                </span>
              )}
            </div>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            Competitive programming, academic performance, and shipped projects all feed the same
            habit: learn fast, debug carefully, build momentum. Every number below is pulled from
            public APIs on a schedule — no hand-edited counters.
          </Motion.p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {derived.achievementStats.map((s, i) => (
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
              <p className="mt-4 text-[13px] font-semibold text-emerald-200/90">{s.label}</p>
              <p className="mt-1 text-[12px] leading-[1.6] text-zinc-500">{s.detail}</p>
            </Motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {mergedProfiles.map((p, i) => (
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
                    <img src={p.icon} alt="" className="h-6 w-6 object-contain" />
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

              <p className="relative mt-5 text-[13px] leading-[1.7] text-zinc-400">{p.detail}</p>

              <div
                className={`relative mt-5 grid gap-2 ${
                  (p.stats?.length ?? 0) >= 6 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
                }`}
              >
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

        <LeetContestVisualization contestHistory={stats.leetcode?.contestHistory} />

        <Motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="panel-strong mt-12 overflow-hidden rounded-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
            <div>
              <p className="label-mono">// Activity · GitHub contributions</p>
              <h3 className="mt-1 font-display text-2xl tracking-ultratight text-white">
                Real commits, not garnish.
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-zinc-500">
                <span className="text-white">{totalContributions}</span>{" "}
                {contribTotalLive != null ? "events · last ~12 mo" : "visual units"}
              </span>
              <span className="chip-accent">
                {heatmapLoading ? "loading…" : heatmap ? "github api" : "fallback"}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto p-6">
            <div className="inline-grid min-w-full grid-flow-col grid-rows-7 gap-[3px]">
              {levels.map((level, i) => (
                <div
                  key={i}
                  className="heat-cell h-3 w-3 rounded-[2px] sm:h-3.5 sm:w-3.5"
                  style={{ background: heatColors[Math.min(4, level)] }}
                  title={`Level ${level}`}
                />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              <span>{heatmap ? `${heatmap.daysLoaded} days` : "52 weeks · synthetic"}</span>
              <div className="flex items-center gap-2">
                <span>Less</span>
                {heatColors.map((c, j) => (
                  <span
                    key={`${c}-${j}`}
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
