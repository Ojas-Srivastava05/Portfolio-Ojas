import { motion } from "framer-motion";
import { useState } from "react";
import { useCodingStats } from "../hooks/useCodingStats";
import { EncryptButton } from "../components/ui/EncryptButton";
import SpringCard from "../components/ui/SpringCard";

export default function CodingStats() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const usernames = {
    github: "Ojas-Srivastava05",
    leetcode: "Oju_Srivastava",
    codechef: "ojassrivastava",
    codeforces: "oju",
    kaggle: "ojassrivastava05",
    linkedin: "ojas-srivastava05",
  };

  const { stats, loading, errors } = useCodingStats(usernames);

  // Enhanced profiles with more detailed stats
  const profiles = [
    {
      name: "GitHub",
      username: `@${usernames.github}`,
      icon: "💻",
      color: "#ef4444",
      stats: stats.github ? [
        { label: "Public Repos", value: stats.github.repositories, icon: "📦", description: "Open source projects" },
        { label: "Total Stars", value: stats.github.stars, icon: "⭐", description: "Community appreciation" },
        { label: "Followers", value: stats.github.followers, icon: "👥", description: "Developer network" },
        { label: "Following", value: stats.github.following, icon: "👤", description: "Connections" },
        { label: "Contributions", value: stats.github.contributions, icon: "📊", description: "This year" },
        { label: "Public Gists", value: stats.github.gists || 0, icon: "📝", description: "Code snippets" },
      ] : [
        { label: "Public Repos", value: "...", icon: "📦", description: "Loading..." },
        { label: "Total Stars", value: "...", icon: "⭐", description: "Loading..." },
        { label: "Followers", value: "...", icon: "👥", description: "Loading..." },
        { label: "Following", value: "...", icon: "👤", description: "Loading..." },
        { label: "Contributions", value: "...", icon: "📊", description: "Loading..." },
        { label: "Public Gists", value: "...", icon: "📝", description: "Loading..." },
      ],
      link: `https://github.com/${usernames.github}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: errors.github,
      highlights: ["Active contributor", "Open source enthusiast", "Clean code advocate"],
    },
    {
      name: "LeetCode",
      username: `@${usernames.leetcode}`,
      icon: "🏆",
      color: "#f87171",
      stats: stats.leetcode ? [
        { label: "Total Solved", value: stats.leetcode.totalSolved, icon: "✅", description: "Problems completed" },
        { label: "Easy Problems", value: stats.leetcode.easySolved, icon: "🟢", description: `/${stats.leetcode.totalEasy || 0}` },
        { label: "Medium Problems", value: stats.leetcode.mediumSolved, icon: "🟡", description: `/${stats.leetcode.totalMedium || 0}` },
        { label: "Hard Problems", value: stats.leetcode.hardSolved, icon: "🔴", description: `/${stats.leetcode.totalHard || 0}` },
        { label: "Acceptance Rate", value: `${stats.leetcode.acceptanceRate || 0}%`, icon: "📈", description: "Solution quality" },
        { label: "Contest Rating", value: stats.leetcode.rating || "N/A", icon: "🎯", description: "Competitive score" },
      ] : [
        { label: "Total Solved", value: "...", icon: "✅", description: "Loading..." },
        { label: "Easy Problems", value: "...", icon: "🟢", description: "Loading..." },
        { label: "Medium Problems", value: "...", icon: "🟡", description: "Loading..." },
        { label: "Hard Problems", value: "...", icon: "🔴", description: "Loading..." },
        { label: "Acceptance Rate", value: "...", icon: "📈", description: "Loading..." },
        { label: "Contest Rating", value: "...", icon: "🎯", description: "Loading..." },
      ],
      link: `https://leetcode.com/${usernames.leetcode}`,
      bgGradient: "from-orange-900/30 to-slate-900/50",
      error: errors.leetcode,
      highlights: ["Algorithm expert", "Problem solver", "Contest participant"],
    },
    {
      name: "CodeChef",
      username: `@${usernames.codechef}`,
      icon: "👨‍🍳",
      color: "#ef4444",
      stats: stats.codechef ? [
        { label: "Current Rating", value: stats.codechef.rating, icon: "⭐", description: "Live ranking" },
        { label: "Max Rating", value: stats.codechef.maxRating, icon: "🏆", description: "Peak performance" },
        { label: "Stars", value: `${stats.codechef.stars} ⭐`, icon: "✨", description: "Skill level" },
        { label: "Global Rank", value: stats.codechef.globalRank || "N/A", icon: "🌍", description: "Worldwide standing" },
        { label: "Country Rank", value: stats.codechef.countryRank || "N/A", icon: "🇮🇳", description: "National position" },
        { label: "Problems Solved", value: stats.codechef.problemsSolved || "N/A", icon: "✅", description: "Total challenges" },
      ] : [
        { label: "Current Rating", value: "...", icon: "⭐", description: "Loading..." },
        { label: "Max Rating", value: "...", icon: "🏆", description: "Loading..." },
        { label: "Stars", value: "...", icon: "✨", description: "Loading..." },
        { label: "Global Rank", value: "...", icon: "🌍", description: "Loading..." },
        { label: "Country Rank", value: "...", icon: "🇮🇳", description: "Loading..." },
        { label: "Problems Solved", value: "...", icon: "✅", description: "Loading..." },
      ],
      link: `https://www.codechef.com/users/${usernames.codechef}`,
      bgGradient: "from-brown-900/30 to-slate-900/50",
      error: errors.codechef,
      highlights: ["Competitive coder", "Contest regular", "DSA specialist"],
    },
    {
      name: "Codeforces",
      username: `@${usernames.codeforces}`,
      icon: "🎯",
      color: "#dc2626",
      stats: stats.codeforces ? [
        { label: "Current Rating", value: stats.codeforces.rating, icon: "⭐", description: "Active score" },
        { label: "Max Rating", value: stats.codeforces.maxRating, icon: "🏆", description: "Personal best" },
        { label: "Rank", value: stats.codeforces.rank, icon: "🎖️", description: "Skill division" },
        { label: "Max Rank", value: stats.codeforces.maxRank || "N/A", icon: "👑", description: "Highest achieved" },
        { label: "Contests", value: stats.codeforces.contests || "N/A", icon: "🎪", description: "Participated" },
        { label: "Problems Solved", value: stats.codeforces.problemsSolved || "N/A", icon: "✅", description: "Total count" },
      ] : [
        { label: "Current Rating", value: "...", icon: "⭐", description: "Loading..." },
        { label: "Max Rating", value: "...", icon: "🏆", description: "Loading..." },
        { label: "Rank", value: "...", icon: "🎖️", description: "Loading..." },
        { label: "Max Rank", value: "...", icon: "👑", description: "Loading..." },
        { label: "Contests", value: "...", icon: "🎪", description: "Loading..." },
        { label: "Problems Solved", value: "...", icon: "✅", description: "Loading..." },
      ],
      link: `https://codeforces.com/profile/${usernames.codeforces}`,
      bgGradient: "from-blue-900/30 to-slate-900/50",
      error: errors.codeforces,
      highlights: ["Algorithmic thinker", "Contest enthusiast", "Math problem solver"],
    },
    {
      name: "Kaggle",
      username: `@${usernames.kaggle}`,
      icon: "📊",
      color: "#f87171",
      stats: stats.kaggle ? [
        { label: "Tier", value: stats.kaggle.tier, icon: "🏅", description: "Achievement level" },
        { label: "Competition Rank", value: stats.kaggle.competitionRank || "N/A", icon: "🏆", description: "Leaderboard position" },
        { label: "Competitions", value: stats.kaggle.competitions, icon: "🎯", description: "Participated" },
        { label: "Datasets", value: stats.kaggle.datasets, icon: "📁", description: "Contributions" },
        { label: "Notebooks", value: stats.kaggle.notebooks || 0, icon: "📓", description: "Published work" },
        { label: "Total Medals", value: stats.kaggle.totalMedals || 0, icon: "🥇", description: "Achievements" },
      ] : [
        { label: "Tier", value: "...", icon: "🏅", description: "Loading..." },
        { label: "Competition Rank", value: "...", icon: "🏆", description: "Loading..." },
        { label: "Competitions", value: "...", icon: "🎯", description: "Loading..." },
        { label: "Datasets", value: "...", icon: "📁", description: "Loading..." },
        { label: "Notebooks", value: "...", icon: "📓", description: "Loading..." },
        { label: "Total Medals", value: "...", icon: "🥇", description: "Loading..." },
      ],
      link: `https://www.kaggle.com/${usernames.kaggle}`,
      bgGradient: "from-cyan-900/30 to-slate-900/50",
      error: errors.kaggle,
      highlights: ["Data scientist", "ML practitioner", "Competition solver"],
    },
    {
      name: "LinkedIn",
      username: `@${usernames.linkedin}`,
      icon: "💼",
      color: "#dc2626",
      stats: [
        { label: "Network Size", value: "500+", icon: "👥", description: "Professional connections" },
        { label: "Profile Views", value: "Active", icon: "👁️", description: "Engagement" },
        { label: "Posts", value: "Regular", icon: "📝", description: "Content creation" },
        { label: "Endorsements", value: "Multiple", icon: "👍", description: "Skill validation" },
        { label: "Recommendations", value: "Available", icon: "⭐", description: "Peer reviews" },
        { label: "Articles", value: "Published", icon: "📰", description: "Thought leadership" },
      ],
      link: `https://www.linkedin.com/in/${usernames.linkedin}`,
      bgGradient: "from-blue-900/30 to-slate-900/50",
      error: null,
      highlights: ["Tech professional", "Network builder", "Industry insights"],
    },
  ];

  const overallStats = [
    { 
      label: "Total Problems", 
      value: stats.leetcode ? stats.leetcode.totalSolved : "...", 
      icon: "💡" 
    },
    { 
      label: "GitHub Repos", 
      value: stats.github ? stats.github.repositories : "...", 
      icon: "📦" 
    },
    { 
      label: "Contributions", 
      value: stats.github ? stats.github.contributions : "...", 
      icon: "📅" 
    },
    { 
      label: "Total Stars", 
      value: stats.github ? stats.github.stars : "...", 
      icon: "⭐" 
    },
  ];

  return (
    <section id="coding-stats" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-hacker tracking-tight">
            Coding Profiles & Stats
          </h2>
          <p className="text-gray-400 text-lg font-hacker font-light tracking-wide uppercase">
            Live statistics from multiple platforms
          </p>
        </motion.div>

        {/* Overall Stats Grid with SpringCard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {overallStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SpringCard>
                <div
                  className="p-6 rounded-2xl text-center backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {loading ? "..." : stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Profile Cards Grid with SpringCard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SpringCard>
                <div
                  className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
                    border: `1px solid ${profile.color}40`,
                  }}
                >
                  {/* Header */}
                  <div className={`relative p-6 bg-gradient-to-br ${profile.bgGradient}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-6xl">{profile.icon}</div>
                      <div className="text-white text-2xl opacity-50">↗</div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 font-hacker">
                      {profile.name}
                    </h3>
                    <p className="text-sm opacity-70 font-hacker mb-3" style={{ color: profile.color }}>
                      {profile.username}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {profile.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80 backdrop-blur-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {profile.error && (
                      <p className="text-xs text-red-400 mt-2">
                        ⚠️ Unable to fetch live data
                      </p>
                    )}
                  </div>

                  {/* Detailed Stats Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {profile.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="relative p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-red-500/50 transition-colors"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                            <div className="flex-1">
                              <span className="text-xs text-slate-400 font-hacker block leading-tight">
                                {stat.label}
                              </span>
                              <span className="text-base font-bold text-white font-mono block mt-1">
                                {loading ? "..." : stat.value}
                              </span>
                              <span className="text-xs text-slate-500 block mt-1">
                                {stat.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visit Profile Button */}
                  <div className="px-6 pb-6">
                    <EncryptButton
                      text="Visit Profile →"
                      href={profile.link}
                      variant="primary"
                      className="w-full text-sm py-3"
                    />
                  </div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
