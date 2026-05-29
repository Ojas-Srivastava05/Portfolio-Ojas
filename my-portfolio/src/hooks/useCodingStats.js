import { useCallback, useEffect, useRef, useState } from "react";
import { STATS_POLL_INTERVAL_MS } from "../data/portfolio";
import {
  fetchGitHubStats,
  fetchLeetCodeStats,
  fetchCodeChefStats,
  fetchCodeforcesStats,
} from "../utils/codingPlatformAPIs";

/**
 * Fetches coding-platform stats from public HTTP APIs and **polls on an interval**.
 * Same outcome as push/WebSocket refreshes without hosting a realtime server — fine for leaderboard-style data that changes slowly.
 *
 * @param {object} usernames
 * @param {object} [options]
 * @param {number} [options.pollIntervalMs] — clamped ≥ 60_000 ms
 */
export function useCodingStats(usernames, options = {}) {
  const {
    github: githubUsername,
    leetcode: leetcodeUsername,
    codechef: codechefUsername,
    codeforces: codeforcesUsername,
  } = usernames || {};

  const pollIntervalMs = Math.max(
    typeof options.pollIntervalMs === "number" ? options.pollIntervalMs : STATS_POLL_INTERVAL_MS,
    60_000,
  );

  const [stats, setStats] = useState({
    github: null,
    leetcode: null,
    codechef: null,
    codeforces: null,
  });

  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const manualRefetchRef = useRef(() => {});

  useEffect(() => {
    let cancelled = false;

    async function fetchAll(kind) {
      if (!usernames) return;

      const isPoll = kind === "poll";
      const showInitialSpinner = kind === "initial";
      const showManualSpinner = kind === "manual";

      if (!isPoll && showInitialSpinner) setLoading(true);
      if (showManualSpinner) setSyncing(true);

      const newStats = {};
      const newErrors = {};

      try {
        const [github, leetcode, codechef, codeforces] = await Promise.allSettled([
          fetchGitHubStats(githubUsername),
          fetchLeetCodeStats(leetcodeUsername),
          fetchCodeChefStats(codechefUsername),
          fetchCodeforcesStats(codeforcesUsername),
        ]);

        if (cancelled) return;

        if (github.status === "fulfilled") newStats.github = github.value;
        else newErrors.github = github.reason;

        if (leetcode.status === "fulfilled") newStats.leetcode = leetcode.value;
        else newErrors.leetcode = leetcode.reason;

        if (codechef.status === "fulfilled") newStats.codechef = codechef.value;
        else newErrors.codechef = codechef.reason;

        if (codeforces.status === "fulfilled") newStats.codeforces = codeforces.value;
        else newErrors.codeforces = codeforces.reason;
      } catch (error) {
        console.error("Error fetching stats:", error);
      }

      if (cancelled) return;

      setStats(newStats);
      setErrors(newErrors);
      setLastSyncedAt(Date.now());
      setLoading(false);
      setSyncing(false);
    }

    manualRefetchRef.current = () => fetchAll("manual");

    fetchAll("initial");

    const intervalId = window.setInterval(() => fetchAll("poll"), pollIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      manualRefetchRef.current = () => {};
    };
  }, [
    githubUsername,
    leetcodeUsername,
    codechefUsername,
    codeforcesUsername,
    usernames,
    pollIntervalMs,
  ]);

  const refetchStats = useCallback(() => {
    manualRefetchRef.current?.();
  }, []);

  return { stats, loading, syncing, errors, lastSyncedAt, refetchStats };
}
