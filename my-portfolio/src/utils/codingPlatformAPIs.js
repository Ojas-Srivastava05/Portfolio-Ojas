
// GitHub API
export async function fetchGitHubStats(username) {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch GitHub data');

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      repositories: user.public_repos,
      followers: user.followers,
      stars: totalStars,
      contributions: await fetchGitHubContributionSummary(username),
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
}

async function fetchGitHubContributionSummary(username) {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
    );
    if (!response.ok) return '1K+';

    const data = await response.json();
    const total =
      typeof data.total === 'object'
        ? data.total[String(new Date().getFullYear())] || 0
        : null;
    if (total === null || total === undefined || Number.isNaN(total)) return '1K+';
    return total > 1000 ? `${(total / 1000).toFixed(1)}K+` : `${total}+`;
  } catch {
    return '1K+';
  }
}

/** Last ~year of commits for the heat-map (levels 0–4 per day). */
export async function fetchGitHubContributionHeatmap(username) {
  try {
    const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('heatmap fetch failed');

    const data = await response.json();
    const contributions = Array.isArray(data.contributions) ? data.contributions : [];
    const periodTotal = contributions.reduce((sum, c) => sum + (c.count || 0), 0);
    let levels = contributions.map((c) =>
      Math.min(4, Math.max(0, Number(c.level) || 0)),
    );
    const rem = levels.length % 7;
    if (rem !== 0) {
      levels = [...Array(7 - rem).fill(0), ...levels];
    }

    return { levels, periodTotal, daysLoaded: contributions.length };
  } catch (error) {
    console.warn('GitHub heatmap:', error);
    return null;
  }
}

function parseLeetDifficultyRows(rows) {
  const out = { All: 0, Easy: 0, Medium: 0, Hard: 0 };
  for (const row of rows || []) {
    const d = row.difficulty;
    if (Object.prototype.hasOwnProperty.call(out, d)) out[d] = row.count ?? 0;
  }
  return out;
}

/**
 * Same-origin POST avoids browser CORS preflight to `leetcode.com` (OPTIONS → 405 in client).
 * Dev: proxied via `vite.config.js`. Prod: `/api/leetcode/graphql` must be rewritten (see `vercel.json`)
 * or set `VITE_LEETCODE_GQL_URL` to your own reachable GraphQL relay.
 */
const LEETCODE_GQL_ENDPOINT =
  (typeof import.meta !== 'undefined' && String(import.meta.env?.VITE_LEETCODE_GQL_URL || '').trim()) ||
  '/api/leetcode/graphql';

// LeetCode — official GraphQL (same-origin relay; server forwards to leetcode.com)
export async function fetchLeetCodeStats(username) {
  if (!username) return null;
  try {
    const query = `
      query lcStats($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum { difficulty count }
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
        userContestRankingHistory(username: $username) {
          rating ranking attended trendDirection problemsSolved totalProblems
          contest { title titleSlug startTime }
        }
      }
    `;

    const response = await fetch(LEETCODE_GQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) throw new Error('LeetCode HTTP');

    const body = await response.json();
    if (body.errors?.length) {
      console.warn('LeetCode GraphQL:', body.errors);
    }

    const matched = body.data?.matchedUser;
    const contest = body.data?.userContestRanking;
    const difficulties = parseLeetDifficultyRows(matched?.submitStats?.acSubmissionNum);

    const totalSolved = difficulties.All || 0;
    const contestRating =
      typeof contest?.rating === 'number' ? Math.round(contest.rating) : null;

    const rawHist = body.data?.userContestRankingHistory;
    let contestHistory = [];
    if (Array.isArray(rawHist)) {
      contestHistory = rawHist
        .filter((h) => h?.contest?.startTime != null)
        .map((h) => ({
          rating: typeof h.rating === 'number' ? h.rating : 0,
          ranking: typeof h.ranking === 'number' ? h.ranking : 0,
          attended: h.attended,
          trendDirection: h.trendDirection,
          problemsSolved: typeof h.problemsSolved === 'number' ? h.problemsSolved : 0,
          totalProblems: typeof h.totalProblems === 'number' ? h.totalProblems : 4,
          title: h.contest.title,
          slug: h.contest.titleSlug || null,
          startTimeSec: h.contest.startTime,
        }))
        .sort((a, b) => a.startTimeSec - b.startTimeSec);
    }

    const peakFromHistory = contestHistory.length
      ? Math.max(...contestHistory.map((h) => h.rating).filter((n) => n > 0))
      : null;

    return {
      totalSolved,
      easySolved: difficulties.Easy,
      mediumSolved: difficulties.Medium,
      hardSolved: difficulties.Hard,
      contestRating,
      maxContestRating: peakFromHistory,
      contestsAttended: contest?.attendedContestsCount ?? 0,
      globalRanking: contest?.globalRanking,
      contestTotalParticipants: contest?.totalParticipants,
      topPercentage: contest?.topPercentage,
      ranking: matched ? null : 'N/A',
      contestHistory,
    };
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return null;
  }
}

// CodeChef public API mirrors are unstable — optional fetch
export async function fetchCodeChefStats(username) {
  try {
    const response = await fetch(`https://codechef-api.vercel.app/${username}`);
    if (!response.ok) throw new Error('Failed to fetch CodeChef data');

    const data = await response.json();

    const problemsSolved =
      data.problemsFullySolved ??
      data.fullySolved ??
      data.problemsSolved ??
      data.totalProblemsSolved ??
      null;

    return {
      rating: data.currentRating || 0,
      maxRating: data.highestRating || 0,
      stars: data.stars || 'N/A',
      globalRank: data.globalRank || 'N/A',
      countryRank: data.countryRank || 'N/A',
      problemsSolved: typeof problemsSolved === 'number' ? problemsSolved : null,
    };
  } catch {
    console.warn('CodeChef API unavailable');
    return null;
  }
}

async function fetchCodeforcesProblemsSolved(username) {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}&from=1&count=10000`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.status !== 'OK' || !Array.isArray(data.result)) return null;

    const unique = new Set();
    for (const sub of data.result) {
      if (sub.verdict !== 'OK' || !sub.problem) continue;
      const key = `${sub.problem.contestId ?? 'x'}-${sub.problem.index}`;
      unique.add(key);
    }
    return unique.size;
  } catch {
    return null;
  }
}

// Codeforces API
export async function fetchCodeforcesStats(username) {
  try {
    const [infoRes, problemsSolved] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${username}`),
      fetchCodeforcesProblemsSolved(username),
    ]);
    if (!infoRes.ok) throw new Error('Failed to fetch Codeforces data');

    const data = await infoRes.json();

    if (data.status !== 'OK') throw new Error('Invalid response');

    const user = data.result[0];

    const rank =
      typeof user.rank === 'string'
        ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1)
        : 'Unrated';

    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank,
      maxRank:
        typeof user.maxRank === 'string'
          ? user.maxRank.charAt(0).toUpperCase() + user.maxRank.slice(1)
          : 'Unrated',
      contribution: user.contribution || 0,
      handleDisplay: user.handle || username,
      problemsSolved: typeof problemsSolved === 'number' ? problemsSolved : null,
    };
  } catch (error) {
    console.error('Codeforces API Error:', error);
    return null;
  }
}

export function fetchKaggleStats() {
  console.warn('Kaggle API not available - using placeholder data');
  return {
    tier: 'Expert',
    competitions: '15+',
    datasets: '8',
    notebooks: '25+',
  };
}
