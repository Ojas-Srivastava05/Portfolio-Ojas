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
        { label: "Contributions", value: stats.github.contributions, icon: "📊", description: "This year" },
      ] : [
        { label: "Public Repos", value: "...", icon: "📦", description: "Loading..." },
        { label: "Total Stars", value: "...", icon: "⭐", description: "Loading..." },
        { label: "Contributions", value: "...", icon: "📊", description: "Loading..." },
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
        { label: "Contest Rating", value: stats.leetcode.rating || "N/A", icon: "🎯", description: "Competitive score" },
        { label: "Acceptance Rate", value: `${stats.leetcode.acceptanceRate || 0}%`, icon: "📈", description: "Solution quality" },
      ] : [
        { label: "Total Solved", value: "...", icon: "✅", description: "Loading..." },
        { label: "Contest Rating", value: "...", icon: "🎯", description: "Loading..." },
        { label: "Acceptance Rate", value: "...", icon: "📈", description: "Loading..." },
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
      ] : [
        { label: "Current Rating", value: "...", icon: "⭐", description: "Loading..." },
        { label: "Max Rating", value: "...", icon: "🏆", description: "Loading..." },
        { label: "Stars", value: "...", icon: "✨", description: "Loading..." },
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
      ] : [
        { label: "Current Rating", value: "...", icon: "⭐", description: "Loading..." },
        { label: "Max Rating", value: "...", icon: "🏆", description: "Loading..." },
        { label: "Rank", value: "...", icon: "🎖️", description: "Loading..." },
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
        { label: "Competitions", value: stats.kaggle.competitions, icon: "🎯", description: "Participated" },
        { label: "Total Medals", value: stats.kaggle.totalMedals || 0, icon: "🥇", description: "Achievements" },
      ] : [
        { label: "Tier", value: "...", icon: "🏅", description: "Loading..." },
        { label: "Competitions", value: "...", icon: "🎯", description: "Loading..." },
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
        { label: "Endorsements", value: "Multiple", icon: "👍", description: "Skill validation" },
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
        <div className="grid grid-cols-4 gap-3 mb-12 max-w-4xl mx-auto">
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
                  className="p-4 rounded-xl text-center backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-white mb-0.5">
                    {loading ? "..." : stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Profile Cards Grid with SpringCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="relative h-full rounded-xl overflow-hidden backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: `1px solid ${profile.color}40`,
                  }}
                >
                  {/* Header */}
                  <div className={`relative p-4 bg-gradient-to-br ${profile.bgGradient}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{profile.icon}</div>
                      <div className="text-white text-lg opacity-50">↗</div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-0.5 font-hacker">
                      {profile.name}
                    </h3>
                    <p className="text-xs opacity-70 font-hacker mb-2" style={{ color: profile.color }}>
                      {profile.username}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1">
                      {profile.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-white/80 backdrop-blur-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {profile.error && (
                      <p className="text-[10px] text-red-400 mt-1">
                        ⚠️ Unable to fetch live data
                      </p>
                    )}
                  </div>

                  {/* Detailed Stats Grid */}
                  <div className="p-3">
                    <div className="grid grid-cols-1 gap-2">
                      {profile.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="relative p-2 rounded-lg bg-black/60 border border-slate-700/50 hover:border-red-500/50 transition-colors"
                        >
                          <div className="flex items-start gap-1.5">
                            <span className="text-base">{stat.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] text-slate-400 font-hacker block leading-tight truncate">
                                {stat.label}
                              </span>
                              <span className="text-sm font-bold text-white font-mono block mt-0.5 truncate">
                                {loading ? "..." : stat.value}
                              </span>
                              <span className="text-[9px] text-slate-500 block mt-0.5 truncate">
                                {stat.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visit Profile Button */}
                  <div className="px-3 pb-3">
                    <EncryptButton
                      text="Visit Profile →"
                      href={profile.link}
                      variant="primary"
                      className="w-full text-xs py-2"
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
