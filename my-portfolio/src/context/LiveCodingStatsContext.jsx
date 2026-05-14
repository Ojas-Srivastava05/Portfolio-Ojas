import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STATS_POLL_INTERVAL_MS, platformUsernames } from "../data/portfolio";
import { useCodingStats } from "../hooks/useCodingStats";
import { fetchGitHubContributionHeatmap } from "../utils/codingPlatformAPIs";

const LiveCodingStatsContext = createContext(null);

export function LiveCodingStatsProvider({ children }) {
  const user = platformUsernames;
  const { stats, loading, syncing, errors, lastSyncedAt, refetchStats } = useCodingStats(user, {
    pollIntervalMs: STATS_POLL_INTERVAL_MS,
  });
  const [heatmap, setHeatmap] = useState(null);
  const [heatmapLoading, setHeatmapLoading] = useState(true);
  const [heatmapLastSyncedAt, setHeatmapLastSyncedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function refreshHeatmap(showLoading) {
      if (showLoading) setHeatmapLoading(true);
      try {
        const data = await fetchGitHubContributionHeatmap(user.github);
        if (!cancelled && data) {
          setHeatmap(data);
          setHeatmapLastSyncedAt(Date.now());
        }
      } finally {
        if (!cancelled) setHeatmapLoading(false);
      }
    }

    refreshHeatmap(true);

    const intervalId = window.setInterval(
      () => refreshHeatmap(false),
      STATS_POLL_INTERVAL_MS,
    );

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [user.github]);

  /* When user forces a stats refetch from the palette, bump the contributions grid too — same HTTP source. */
  const refetchStatsAndHeatmap = useMemo(() => {
    return () => {
      refetchStats?.();
      (async () => {
        try {
          const data = await fetchGitHubContributionHeatmap(user.github);
          if (data) {
            setHeatmap(data);
            setHeatmapLastSyncedAt(Date.now());
          }
        } catch {
          /* ignore — interval will retry */
        }
      })();
    };
  }, [refetchStats, user.github]);

  const value = useMemo(
    () => ({
      stats,
      loading,
      syncing,
      errors,
      heatmap,
      heatmapLoading,
      lastSyncedAt,
      heatmapLastSyncedAt,
      refetchStats: refetchStatsAndHeatmap,
    }),
    [
      stats,
      loading,
      syncing,
      errors,
      heatmap,
      heatmapLoading,
      lastSyncedAt,
      heatmapLastSyncedAt,
      refetchStatsAndHeatmap,
    ],
  );

  return <LiveCodingStatsContext.Provider value={value}>{children}</LiveCodingStatsContext.Provider>;
}

export function useLiveCodingStats() {
  const ctx = useContext(LiveCodingStatsContext);
  if (!ctx) {
    throw new Error("useLiveCodingStats must be used within LiveCodingStatsProvider");
  }
  return ctx;
}
