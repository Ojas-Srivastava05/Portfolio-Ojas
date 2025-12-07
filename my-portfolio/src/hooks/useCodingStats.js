import { useState, useEffect } from 'react';
import {
  fetchGitHubStats,
  fetchLeetCodeStats,
  fetchCodeChefStats,
  fetchCodeforcesStats,
  fetchKaggleStats,
} from '../utils/codingPlatformAPIs';

export function useCodingStats(usernames) {
  const [stats, setStats] = useState({
    github: null,
    leetcode: null,
    codechef: null,
    codeforces: null,
    kaggle: null,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true);
      const newStats = {};
      const newErrors = {};

      try {
        // Fetch all stats in parallel
        const [github, leetcode, codechef, codeforces, kaggle] = await Promise.allSettled([
          fetchGitHubStats(usernames.github),
          fetchLeetCodeStats(usernames.leetcode),
          fetchCodeChefStats(usernames.codechef),
          fetchCodeforcesStats(usernames.codeforces),
          fetchKaggleStats(usernames.kaggle),
        ]);

        if (github.status === 'fulfilled') newStats.github = github.value;
        else newErrors.github = github.reason;

        if (leetcode.status === 'fulfilled') newStats.leetcode = leetcode.value;
        else newErrors.leetcode = leetcode.reason;

        if (codechef.status === 'fulfilled') newStats.codechef = codechef.value;
        else newErrors.codechef = codechef.reason;

        if (codeforces.status === 'fulfilled') newStats.codeforces = codeforces.value;
        else newErrors.codeforces = codeforces.reason;

        if (kaggle.status === 'fulfilled') newStats.kaggle = kaggle.value;
        else newErrors.kaggle = kaggle.reason;

      } catch (error) {
        console.error('Error fetching stats:', error);
      }

      setStats(newStats);
      setErrors(newErrors);
      setLoading(false);
    };

    if (usernames) {
      fetchAllStats();
    }
  }, [usernames.github, usernames.leetcode, usernames.codechef, usernames.codeforces, usernames.kaggle]);

  return { stats, loading, errors };
}
