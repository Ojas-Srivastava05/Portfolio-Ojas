import { useId, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { platformUsernames } from "../data/portfolio";

const VB_W = 760;
const GUTTER_L = 40;
const PAD_L = GUTTER_L + 6;
const PAD_R = 8;
const PAD_TOP = 10;
const PAD_BTM = 24;

/** Match theme heat scale: dim base → emerald by solve ratio. */
function solvesHeat(ratio) {
  const r = Math.max(0, Math.min(1, ratio || 0));
  const emerald = Math.round(74 + r * (110 - 74));
  const g = Math.round(222 + r * (255 - 222));
  const b = Math.round(128 + r * (200 - 128));
  const a = 0.25 + r * 0.7;
  return `rgba(${emerald},${g},${b},${a})`;
}

function fmtContestMonth(sec) {
  if (typeof sec !== "number" || Number.isNaN(sec)) return "—";
  const d = new Date(sec * 1000);
  return d.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

/** Catmull-Rom points → cubic Bézier SVG path through all knots. */
function smoothPath(points) {
  const n = points.length;
  if (n === 0) return "";
  if (n === 1) return `M ${points[0].x} ${points[0].y}`;
  const d = [`M ${points[0].x} ${points[0].y}`];
  const k = n - 1;
  for (let i = 0; i < k; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 >= n ? n - 1 : i + 2];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}

function linearFillPath(xs, ys, baseY) {
  let d = `M ${xs[0]} ${baseY} L ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) d += ` L ${xs[i]},${ys[i]}`;
  d += ` L ${xs[xs.length - 1]} ${baseY} Z`;
  return d;
}

export default function LeetContestVisualization({ contestHistory }) {
  const lcHandle = platformUsernames.leetcode;
  const gid = useId().replace(/:/g, "");

  const viz = useMemo(() => {
    const list = Array.isArray(contestHistory) ? contestHistory : [];
    const attendedOnly = list.filter(
      (e) => e.attended !== false && typeof e.startTimeSec === "number",
    );
    if (attendedOnly.length === 0) {
      return {
        hasData: false,
        vbH: 0,
        ratings: null,
        strip: [],
        tailRating: null,
        pathSmooth: "",
        pathFillLinear: "",
        gridLines: [],
        firstLabel: "",
        lastLabel: "",
        latest: null,
      };
    }

    const rs = attendedOnly.map((e) => e.rating);
    let rMin = Math.floor(Math.min(...rs) / 40) * 40 - 40;
    let rMax = Math.ceil(Math.max(...rs) / 40) * 40 + 40;
    if (rMax - rMin < 200) rMax = rMin + 200;
    const rSpan = Math.max(rMax - rMin, 1);

    const tMin = attendedOnly[0].startTimeSec;
    const tMax = attendedOnly[attendedOnly.length - 1].startTimeSec;
    const tSpan = Math.max(tMax - tMin, 1);

    const innerW = VB_W - PAD_L - PAD_R;
    const innerActualH = 168;
    const baseY = PAD_TOP + innerActualH;

    const toXY = (t, r) => ({
      x: PAD_L + ((t - tMin) / tSpan) * innerW,
      y: PAD_TOP + innerActualH - ((r - rMin) / rSpan) * innerActualH,
    });

    const xy = attendedOnly.map((e, i) => ({
      ...toXY(e.startTimeSec, e.rating),
      rating: e.rating,
      keyId: String(e.slug || e.title || e.startTimeSec),
      idx: i,
    }));

    const pathSmooth = smoothPath(xy);
    const xs = xy.map((p) => p.x);
    const ys = xy.map((p) => p.y);
    const pathFillLinear =
      ys.length >= 2 ? linearFillPath(xs, ys, baseY) : "";

    const midR = Math.round((rMax + rMin) / 2);

    const gridLines = [
      { y: toXY(tMin, rMax).y, dashed: false },
      { y: toXY(tMin, midR).y, dashed: true },
      { y: toXY(tMin, rMin).y, dashed: false },
    ];

    const strip = attendedOnly.map((e) => {
      const denom = Math.max(e.totalProblems || 4, 1);
      return {
        ratio: e.problemsSolved / denom,
        title: e.title,
        solves: e.problemsSolved,
        total: e.totalProblems,
        slugKey: `${e.slug || e.title}-${e.startTimeSec}`,
      };
    });

    const latest = xy[xy.length - 1];
    const vbH = baseY + PAD_BTM;

    return {
      hasData: true,
      vbH,
      ratings: { min: rMin, mid: midR, max: rMax },
      strip,
      tailRating: xy[xy.length - 1].rating,
      pathSmooth,
      pathFillLinear,
      gridLines,
      firstLabel: fmtContestMonth(attendedOnly[0].startTimeSec),
      lastLabel: fmtContestMonth(attendedOnly[attendedOnly.length - 1].startTimeSec),
      latest,
      xyPts: xy,
    };
  }, [contestHistory]);

  const hasData =
    Array.isArray(contestHistory) &&
    contestHistory.filter((x) => x.attended !== false && typeof x.startTimeSec === "number").length > 0;

  if (!hasData || !viz.hasData) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="panel-strong mt-12 overflow-hidden rounded-xl"
      >
        <div className="border-b border-white/[0.06] px-6 py-4">
          <p className="label-mono">// LeetCode · Rated contests</p>
          <h3 className="mt-1 font-display text-2xl tracking-ultratight text-white">
            Contest trajectory
          </h3>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-zinc-500">
            Contest rating loads with your LC stats. If nothing appears after a sync, reload once — or open your contest tab.
          </p>
          <a
            href={`https://leetcode.com/${lcHandle}?tab=contest`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex font-mono text-[11px] text-emerald-400 underline-offset-4 hover:text-emerald-300"
          >
            Contest tab →
          </a>
        </div>
      </Motion.div>
    );
  }

  const {
    vbH,
    ratings,
    strip,
    tailRating,
    pathSmooth,
    pathFillLinear,
    gridLines,
    firstLabel,
    lastLabel,
    latest,
    xyPts,
  } = viz;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="panel-strong mt-12 overflow-hidden rounded-xl"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
        <div>
          <p className="label-mono">// LeetCode · Rated contests</p>
          <h3 className="mt-1 font-display text-2xl tracking-ultratight text-white">
            Contest rating
          </h3>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-zinc-500 sm:text-[14px]">
            Smooth trajectory across rated rounds; emerald strip is solve intensity per contest (fraction of the slate cleared).
          </p>
        </div>
        <a
          href={`https://leetcode.com/${lcHandle}?tab=contest`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-white/[0.10] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200 transition hover:border-emerald-400/35 hover:bg-emerald-400/[0.08]"
        >
          Contests ↗
        </a>
      </div>

      <div className="w-full pb-6 pt-5">
        <div className="min-w-0 w-full">
          <div
            className="relative w-full overflow-hidden bg-gradient-to-b from-[#08090c] to-[#0c0d13] shadow-inner shadow-black/40"
            style={{ aspectRatio: `${VB_W} / ${vbH}` }}
          >
            <svg
              viewBox={`0 0 ${VB_W} ${vbH}`}
              width="100%"
              height="100%"
              className="block h-full min-h-0 w-full shrink-0"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="LeetCode contest rating over time"
            >
                <defs>
                  <linearGradient id={`lc-fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(52,211,153,0.22)" />
                    <stop offset="45%" stopColor="rgba(52,211,153,0.06)" />
                    <stop offset="100%" stopColor="rgba(8,9,12,0)" />
                  </linearGradient>
                  <filter id={`lc-glow-${gid}`} x="-8%" y="-8%" width="116%" height="116%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect width={VB_W} height={vbH} fill="#08090c" opacity={0.65} />

                {ratings && (
                  <>
                    <text
                      x={GUTTER_L - 6}
                      y={gridLines[0]?.y ?? PAD_TOP}
                      fill="#71717a"
                      dominantBaseline="middle"
                      fontSize={11}
                      fontFamily='"JetBrains Mono", ui-monospace, monospace'
                      textAnchor="end"
                    >
                      {ratings.max}
                    </text>
                    <text
                      x={GUTTER_L - 6}
                      y={gridLines[1]?.y ?? PAD_TOP + 84}
                      fill="#52525b"
                      dominantBaseline="middle"
                      fontSize={11}
                      fontFamily='"JetBrains Mono", ui-monospace, monospace'
                      textAnchor="end"
                    >
                      {ratings.mid}
                    </text>
                    <text
                      x={GUTTER_L - 6}
                      y={gridLines[2]?.y ?? PAD_TOP + 168}
                      fill="#71717a"
                      dominantBaseline="middle"
                      fontSize={11}
                      fontFamily='"JetBrains Mono", ui-monospace, monospace'
                      textAnchor="end"
                    >
                      {ratings.min}
                    </text>
                  </>
                )}

                {gridLines.map((g, i) => (
                  <line
                    key={`grid-${gid}-${i}`}
                    x1={0}
                    x2={VB_W}
                    y1={g.y}
                    y2={g.y}
                    stroke={
                      i === 0 || i === gridLines.length - 1
                        ? "rgba(255,255,255,0.065)"
                        : "rgba(255,255,255,0.035)"
                    }
                    strokeWidth={1}
                    strokeDasharray={g.dashed ? "3 10" : "none"}
                  />
                ))}

                {pathFillLinear ? (
                  <path d={pathFillLinear} fill={`url(#lc-fill-${gid})`} opacity={0.9} />
                ) : null}

                {pathSmooth ? (
                  <path
                    d={pathSmooth}
                    fill="none"
                    stroke="rgba(52,211,153,0.28)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : null}
                {pathSmooth ? (
                  <path
                    d={pathSmooth}
                    fill="none"
                    stroke="#a7f3d0"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#lc-glow-${gid})`}
                  />
                ) : null}

                {xyPts.map((p, i) => {
                  const last = i === xyPts.length - 1;
                  return (
                    <circle
                      key={`${p.keyId}-${p.idx}`}
                      cx={p.x}
                      cy={p.y}
                      r={last ? 4.25 : 2.6}
                      fill={last ? "#fbbf24" : "rgba(8,9,12,0.92)"}
                      stroke={last ? "#fef3c7" : "#6ee7b7"}
                      strokeWidth={last ? 1.85 : 1.2}
                    />
                  );
                })}

                <text
                  x={PAD_L}
                  y={vbH - 7}
                  fill="#71717a"
                  fontFamily='"JetBrains Mono", ui-monospace, monospace'
                  fontSize={11}
                >
                  {firstLabel}
                </text>
                <text
                  x={VB_W - PAD_R}
                  y={vbH - 7}
                  fill="#71717a"
                  textAnchor="end"
                  fontFamily='"JetBrains Mono", ui-monospace, monospace'
                  fontSize={11}
                >
                  {lastLabel}
                </text>

                {latest ? (
                  <text
                    x={Math.min(Math.max(latest.x, PAD_L + 28), VB_W - PAD_R - 8)}
                    y={Math.max(latest.y - 14, 18)}
                    fill="#fcd34d"
                    fontFamily='"JetBrains Mono", ui-monospace, monospace'
                    fontSize={12}
                    fontWeight={700}
                    textAnchor="middle"
                  >
                    {Math.round(tailRating)}
                  </text>
                ) : null}
              </svg>
          </div>

          {strip.length > 0 && (
            <div className="mt-5 w-full">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                <span>Solves per contest (older → newer)</span>
                <span className="normal-case tracking-normal text-zinc-500">
                  Current rating{" "}
                  <span className="font-semibold text-emerald-300">{Math.round(tailRating)}</span>
                </span>
              </div>
              <div className="flex h-11 w-full min-w-0 gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/45 p-1.5 backdrop-blur-sm sm:h-[3rem]">
                {strip.map((cell) => (
                  <div
                    key={cell.slugKey}
                    title={`${cell.title || "Contest"} · ${cell.solves}/${cell.total} solved`}
                    className="min-w-5 flex-1 rounded-md border border-white/[0.05] shadow-sm shadow-black/20 transition hover:z-[1] hover:border-emerald-400/40 hover:brightness-110"
                    style={{ backgroundColor: solvesHeat(cell.ratio) }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Motion.div>
  );
}
