import { ACADEMIC_CGPA, INTERNSHIP_AVAILABILITY, education, projects, formatCgpaDisplay } from "../data/portfolio";

const CGPA_ENV =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_CGPA != null
    ? Number(import.meta.env.VITE_CGPA)
    : NaN;

/** Academic CGPA — `ACADEMIC_CGPA`, env `VITE_CGPA`, or parsed from education[0].score. */
export function getCgpa() {
  if (Number.isFinite(ACADEMIC_CGPA)) return ACADEMIC_CGPA;
  if (Number.isFinite(CGPA_ENV)) return CGPA_ENV;
  const raw = education?.[0]?.score;
  const m = typeof raw === "string" ? raw.match(/([\d.]+)/) : null;
  return m ? Number(m[1]) : null;
}

export function leetCodePeakFromStats(lc) {
  if (!lc) return null;
  if (typeof lc.maxContestRating === "number" && lc.maxContestRating > 0) {
    return lc.maxContestRating;
  }
  const hist = lc.contestHistory;
  if (!Array.isArray(hist) || !hist.length) return null;
  const ratings = hist.map((h) => h.rating).filter((n) => typeof n === "number" && n > 0);
  return ratings.length ? Math.max(...ratings) : null;
}

/** LeetCode contest rating title bands (contest rating, not classic LC). */
export function leetCodeRankFromRating(rating) {
  if (typeof rating !== "number" || rating <= 0) return null;
  if (rating >= 2220) return "Guardian";
  if (rating >= 1850) return "Knight";
  if (rating >= 1600) return "Master";
  if (rating >= 1400) return "Expert";
  if (rating >= 1200) return "Specialist";
  if (rating >= 1000) return "Pupil";
  return "Newbie";
}

export function countShippedProjects(projectList = projects) {
  return projectList.filter((p) => Boolean(p.github?.trim()) || Boolean(p.live?.trim())).length;
}

export function formatTopPct(raw) {
  if (typeof raw !== "number" || Number.isNaN(raw)) return null;
  const s = Number.isInteger(raw) ? String(raw) : raw.toFixed(2).replace(/\.?0+$/, "");
  return `Top ${s}%`;
}

export function formatTopPctApprox(raw) {
  const t = formatTopPct(raw);
  return t ? t.replace(/^Top /, "Top ~") : null;
}

export function totalProblemsAggregate(stats) {
  const lc = stats?.leetcode?.totalSolved;
  const cf = stats?.codeforces?.problemsSolved;
  const cc = stats?.codechef?.problemsSolved;
  const lcN = typeof lc === "number" ? lc : null;
  const cfN = typeof cf === "number" ? cf : null;
  const ccN = typeof cc === "number" ? cc : null;
  const parts = [lcN, cfN, ccN].filter((n) => n != null);
  if (!parts.length) return { total: null, lc: lcN, cf: cfN, cc: ccN };
  return { total: parts.reduce((a, b) => a + b, 0), lc: lcN, cf: cfN, cc: ccN };
}

function problemsBreakdownSub({ lc, cf, cc }) {
  if (lc != null && cf != null && cc != null) {
    return `${lc}+ LC · ${cf} CF · ${cc} CC`;
  }
  if (lc != null && cf != null) return `${lc}+ LC · ${cf} CF · CC`;
  if (lc != null) return `${lc}+ LC · CF · CC`;
  return "LC · CF · CC";
}

/**
 * Single derived snapshot for hero tiles, recruiter copy, tickers, and profile cards.
 * Values use "—" until the backing API returns data (no hardcoded competitive fallbacks).
 */
export function derivePortfolioStats(stats, projectList = projects) {
  const cgpa = getCgpa();
  const cgpaLabel = formatCgpaDisplay(cgpa);
  const lc = stats?.leetcode;
  const cf = stats?.codeforces;
  const cc = stats?.codechef;
  const gh = stats?.github;

  const peak = leetCodePeakFromStats(lc);
  const currentRating = typeof lc?.contestRating === "number" ? lc.contestRating : null;
  const rank =
    leetCodeRankFromRating(currentRating) ?? leetCodeRankFromRating(peak) ?? null;
  const { total: problemsTotal, lc: lcN, cf: cfN, cc: ccN } = totalProblemsAggregate(stats);
  const shipped = countShippedProjects(projectList);
  const topPct = formatTopPct(lc?.topPercentage);
  const topPctApprox = formatTopPctApprox(lc?.topPercentage);
  const problemsSub = problemsBreakdownSub({ lc: lcN, cf: cfN, cc: ccN });

  const peakSub =
    topPctApprox && rank
      ? `${rank} · ${topPctApprox} contests`
      : currentRating != null && rank
        ? `${rank} · rating ${currentRating}`
        : "Syncing from LeetCode…";

  const heroMetrics = [
    { value: peak != null ? String(peak) : "—", label: "LeetCode peak", sub: peakSub },
    { value: cgpaLabel ?? "—", label: "CGPA", sub: "/ 10.0" },
    {
      value: problemsTotal != null ? `${problemsTotal}+` : "—",
      label: "Problems",
      sub: problemsSub,
    },
    {
      value: shipped > 0 ? `${shipped}+` : "—",
      label: "Shipped",
      sub: "deployed builds",
    },
  ];

  const achievementStats = heroMetrics.map((m) => ({
    value: m.value,
    label: m.label === "Problems" ? "Problems solved" : m.label === "Shipped" ? "Products shipped" : m.label,
    detail:
      m.label === "LeetCode peak"
        ? peakSub
        : m.label === "CGPA"
          ? "B.Tech AI · SVNIT Surat"
          : m.label === "Problems"
            ? problemsSub
            : "Web · AI · Systems",
  }));

  const leetHandle =
    rank && peak != null && lcN != null
      ? `${rank} · peak ${peak} · ${lcN} solved`
      : rank && lcN != null
        ? `${rank} · ${lcN} solved`
        : "leetcode.com/Oju_Srivastava";

  const cfHandle =
    cf?.rating != null
      ? `${cf.rating} rated · ${cf.rank ?? "—"}${cfN != null ? ` · ${cfN} solved` : ""}`
      : "codeforces.com/profile/oju";

  const profileLinks = [
    {
      name: "GitHub",
      handle:
        gh?.repositories != null
          ? `${gh.repositories} repos · ${gh.followers ?? "—"} followers`
          : "@Ojas-Srivastava05",
    },
    { name: "LinkedIn", handle: "ojas-srivastava05" },
    { name: "LeetCode", handle: leetHandle },
    { name: "Codeforces", handle: cfHandle },
  ];

  const tickerLines = [
    rank ? `leetcode.${rank.toLowerCase()}` : "leetcode.sync",
    peak != null && lcN != null ? `peak::${peak} · solved::${lcN}` : "leetcode::syncing",
    problemsTotal != null ? `aggregate::${problemsTotal}+ across lc/cf/cc` : "aggregate::syncing",
    cf?.rating != null
      ? `cf::${cfN ?? "?"} solves · ${cf.rating} rating`
      : "codeforces::syncing",
    cc?.rating != null
      ? `codechef::${cc.stars ?? "—"} · ${cc.rating} rating`
      : "codechef::syncing",
    cgpa != null ? `svnit.ai · cgpa ${cgpaLabel}` : "svnit.ai",
    "stack::node + python + react + c++",
    "gsc::global top 100 · logiflow",
    "currently::shipping logiflow",
    "hackathon::airhelp · powermind 2026",
    gh?.repositories != null ? `github::${gh.repositories} public repos` : "github::syncing",
    "areas::backend · distributed · ai",
  ];

  const shortBio =
    lcN != null && problemsTotal != null && rank
      ? `B.Tech AI at SVNIT Surat. I design backend systems, ship full-stack products, and grind algorithms — ${lcN} on LeetCode, ${problemsTotal}+ across CP, ${rank}${topPctApprox ? `, ${topPctApprox} contests` : ""}.`
      : profileFallbackShortBio(cgpaLabel, rank);

  const recruiterPitch = buildRecruiterPitch({ cgpa, rank, peak, shipped });
  const proofAlgorithms = buildProofAlgorithms({ rank, peak, problemsTotal });
  const principlesAlgorithmsBody = buildPrinciplesAlgorithmsBody({ rank, peak, problemsTotal });

  const nowFeed = buildNowFeed({ lcN, problemsTotal, peak, gh, rank });

  return {
    cgpa,
    peak,
    currentRating,
    rank,
    problemsTotal,
    lcSolved: lcN,
    cfSolved: cfN,
    ccSolved: ccN,
    shipped,
    topPct,
    topPctApprox,
    githubRepos: gh?.repositories ?? null,
    githubFollowers: gh?.followers ?? null,
    githubStars: gh?.stars ?? null,
    githubContributions: gh?.contributions ?? null,
    heroMetrics,
    achievementStats,
    profileLinkHandles: profileLinks,
    tickerLines,
    shortBio,
    recruiterPitch,
    proofAlgorithms,
    principlesAlgorithmsBody,
    nowFeed,
    leetAchievementDetail:
      peak != null
        ? `Reached a ${peak} max rating with consistent algorithm practice.`
        : "Contest ratings sync from LeetCode automatically.",
  };
}

function profileFallbackShortBio(cgpaLabel, rank) {
  const base =
    "B.Tech AI at SVNIT Surat. I design backend systems, ship full-stack products, and grind algorithms";
  const tail =
    rank && cgpaLabel != null
      ? ` — ${rank}, CGPA ${cgpaLabel}; stats refresh from LC · GH · CF APIs.`
      : " — live stats refresh from LC · GH · CF APIs.";
  return base + tail;
}

function buildRecruiterPitch({ cgpa, rank, peak, shipped }) {
  const name = "Ojas Srivastava";
  const role = "AI Engineer & Full-Stack Developer";
  const lcBit =
    rank && peak != null ? `LeetCode ${rank} (${peak} peak)` : "LeetCode (live ratings)";
  const cgpaBit = formatCgpaDisplay(cgpa) != null ? `CGPA ${formatCgpaDisplay(cgpa)}` : "SVNIT AI";
  const shipBit = shipped > 0 ? `${shipped}+ shipped builds` : "shipped full-stack builds";
  return `${name} - B.Tech AI at SVNIT Surat, ${role}. ${lcBit}, ${cgpaBit}, ${shipBit} across backend, full-stack, and AI systems. Strong fit for ${INTERNSHIP_AVAILABILITY} SDE / AI engineering internships.`;
}

function buildProofAlgorithms({ rank, peak, problemsTotal }) {
  const rankLabel = rank ?? "LeetCode";
  const peakBit = peak != null ? `${peak} peak` : "live contest peak";
  const probBit =
    problemsTotal != null ? `${problemsTotal}+ aggregate practice` : "aggregate practice";
  return `${rankLabel}, ${peakBit}, ${probBit} across LC / CF / CC.`;
}

function buildPrinciplesAlgorithmsBody({ rank, peak, problemsTotal }) {
  const rankLabel = rank ?? "LeetCode";
  const peakBit = peak != null ? `peak ${peak}` : "contest peak";
  const probBit = problemsTotal != null ? `${problemsTotal}+ aggregated practice` : "practice";
  return `${rankLabel}, ${peakBit}, ${probBit} across LC / CF / CC. The reps make me faster at debugging, calmer in code review, and sharper at problem modelling.`;
}

function buildNowFeed({ lcN, problemsTotal, peak, gh, rank }) {
  const grinding =
    lcN != null && problemsTotal != null && peak != null
      ? `LeetCode ${lcN}+/${problemsTotal}+ CP · probing past peak ${peak} again`
      : "LeetCode · CP grind — stats syncing";
  const ghLine =
    gh?.repositories != null
      ? `github::${gh.repositories} public repos`
      : "github::syncing repos";
  return [
    { tag: "BUILDING", text: "LogiFlow · GSC Global Top 100 · multi-modal logistics platform" },
    { tag: "SHIPPED", text: "AirHelp · AI airport assistant · PowerMind Hackathon 2026" },
    { tag: "GRINDING", text: grinding },
    { tag: "STUDYING", text: "Stanford ML Specialization + DBMS internals" },
    { tag: "READING", text: "Designing Data-Intensive Applications" },
    { tag: "OPEN TO", text: `SDE / AI internships · ${INTERNSHIP_AVAILABILITY}` },
    { tag: "GITHUB", text: ghLine },
  ];
}
