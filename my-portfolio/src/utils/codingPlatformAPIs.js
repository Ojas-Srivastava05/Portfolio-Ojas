
// GitHub API
export async function fetchGitHubStats(username) {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch GitHub data');

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      repositories: user.public_repos,
      followers: user.followers,
      stars: totalStars,
      contributions: await fetchGitHubContributions(username),
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
}

async function fetchGitHubContributions(username) {
  try {
    // Using GitHub's contribution graph API (unofficial)
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
    if (!response.ok) return '1.2K+';
    
    const data = await response.json();
    const total = data.total[new Date().getFullYear()] || 0;
    return total > 1000 ? `${(total / 1000).toFixed(1)}K+` : `${total}+`;
  } catch {
    return '1.2K+';
  }
}

// LeetCode API (using unofficial proxy)
export async function fetchLeetCodeStats(username) {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (!response.ok) throw new Error('Failed to fetch LeetCode data');

    const data = await response.json();

    return {
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      ranking: data.ranking || 'N/A',
      contributionPoints: data.contributionPoints || 0,
    };
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return null;
  }
}

// CodeChef API (public profile scraping)
export async function fetchCodeChefStats(username) {
  try {
    const response = await fetch(`https://codechef-api.vercel.app/${username}`);
    if (!response.ok) throw new Error('Failed to fetch CodeChef data');

    const data = await response.json();

    return {
      rating: data.currentRating || 0,
      maxRating: data.highestRating || 0,
      stars: data.stars || 'N/A',
      globalRank: data.globalRank || 'N/A',
      countryRank: data.countryRank || 'N/A',
    };
  } catch (error) {
    console.error('CodeChef API Error:', error);
    return null;
  }
}

// Codeforces API
export async function fetchCodeforcesStats(username) {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
    if (!response.ok) throw new Error('Failed to fetch Codeforces data');

    const data = await response.json();
    
    if (data.status !== 'OK') throw new Error('Invalid response');

    const user = data.result[0];

    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'unrated',
      maxRank: user.maxRank || 'unrated',
      contribution: user.contribution || 0,
    };
  } catch (error) {
    console.error('Codeforces API Error:', error);
    return null;
  }
}

// Kaggle (no official API - would need web scraping or manual update)
export async function fetchKaggleStats(username) {
  // Kaggle doesn't have a public API
  // You'll need to manually update these values or use web scraping
  console.warn('Kaggle API not available - using placeholder data');
  return {
    tier: 'Expert',
    competitions: '15+',
    datasets: '8',
    notebooks: '25+',
  };
}
