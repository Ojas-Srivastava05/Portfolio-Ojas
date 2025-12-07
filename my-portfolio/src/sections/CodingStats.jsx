import { motion } from "framer-motion";
import { useState } from "react";
import { useCodingStats } from "../hooks/useCodingStats";
import { EncryptButton } from "../components/ui/EncryptButton";

export default function CodingStats() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Replace with your actual usernames
  const usernames = {
    github: "Ojas-Srivastava05",
    leetcode: "Oju_Srivastava",
    codechef: "ojassrivastava",
    codeforces: "oju",
    kaggle: "ojassrivastava05",
    linkedin: "ojas-srivastava05", // Add your LinkedIn username
  };

  const { stats, loading, errors } = useCodingStats(usernames);

  // Dynamic profiles based on fetched data
  const profiles = [
    {
      name: "GitHub",
      username: `@${usernames.github}`,
      icon: "💻",
      color: "#ef4444",
      stats: stats.github ? [
        { label: "Repositories", value: stats.github.repositories },
        { label: "Contributions", value: stats.github.contributions },
        { label: "Stars", value: stats.github.stars },
      ] : [
        { label: "Repositories", value: "..." },
        { label: "Contributions", value: "..." },
        { label: "Stars", value: "..." },
      ],
      link: `https://github.com/${usernames.github}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: errors.github,
    },
    {
      name: "LinkedIn",
      username: `@${usernames.linkedin}`,
      icon: "💼",
      color: "#dc2626",
      stats: [
        { label: "Network", value: "500+" },
        { label: "Profile Views", value: "Professional" },
        { label: "Engagement", value: "Active" },
      ],
      link: `https://www.linkedin.com/in/${usernames.linkedin}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: null,
    },
    {
      name: "LeetCode",
      username: `@${usernames.leetcode}`,
      icon: "🏆",
      color: "#f87171",
      stats: stats.leetcode ? [
        { label: "Problems Solved", value: stats.leetcode.totalSolved },
        { label: "Easy", value: stats.leetcode.easySolved },
        { label: "Medium", value: stats.leetcode.mediumSolved },
      ] : [
        { label: "Problems Solved", value: "..." },
        { label: "Contest Rating", value: "..." },
        { label: "Global Rank", value: "..." },
      ],
      link: `https://leetcode.com/${usernames.leetcode}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: errors.leetcode,
    },
    {
      name: "CodeChef",
      username: `@${usernames.codechef}`,
      icon: "👨‍🍳",
      color: "#ef4444",
      stats: stats.codechef ? [
        { label: "Rating", value: stats.codechef.rating },
        { label: "Max Rating", value: stats.codechef.maxRating },
        { label: "Stars", value: stats.codechef.stars },
      ] : [
        { label: "Rating", value: "..." },
        { label: "Stars", value: "..." },
        { label: "Global Rank", value: "..." },
      ],
      link: `https://www.codechef.com/users/${usernames.codechef}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: errors.codechef,
    },
    {
      name: "Codeforces",
      username: `@${usernames.codeforces}`,
      icon: "🎯",
      color: "#dc2626",
      stats: stats.codeforces ? [
        { label: "Rating", value: stats.codeforces.rating },
        { label: "Max Rating", value: stats.codeforces.maxRating },
        { label: "Rank", value: stats.codeforces.rank },
      ] : [
        { label: "Rating", value: "..." },
        { label: "Max Rating", value: "..." },
        { label: "Contests", value: "..." },
      ],
      link: `https://codeforces.com/profile/${usernames.codeforces}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: errors.codeforces,
    },
    {
      name: "Kaggle",
      username: `@${usernames.kaggle}`,
      icon: "📊",
      color: "#f87171",
      stats: stats.kaggle ? [
        { label: "Tier", value: stats.kaggle.tier },
        { label: "Competitions", value: stats.kaggle.competitions },
        { label: "Datasets", value: stats.kaggle.datasets },
      ] : [
        { label: "Competitions", value: "..." },
        { label: "Datasets", value: "..." },
        { label: "Notebooks", value: "..." },
      ],
      link: `https://www.kaggle.com/${usernames.kaggle}`,
      bgGradient: "from-red-900/30 to-slate-900/50",
      error: errors.kaggle,
    },
  ];

  // Calculate overall stats from fetched data
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(239, 68, 68, 0.3)',
            }}
          >
            Coding Profiles & Stats
          </motion.h2>
          <motion.p
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {loading ? "Loading real-time statistics..." : "Live statistics from multiple platforms"}
          </motion.p>
        </motion.div>

        {/* Overall Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {overallStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <motion.div
                className="p-6 rounded-2xl text-center backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {loading ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ...
                    </motion.span>
                  ) : stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Card glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${profile.color}80, ${profile.color}40)`,
                }}
              />

              {/* Card */}
              <motion.div
                className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
                  border: `1px solid ${profile.color}40`,
                }}
                animate={{
                  scale: hoveredCard === index ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with icon and platform name */}
                <div className={`relative p-6 bg-gradient-to-br ${profile.bgGradient}`}>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="text-6xl"
                      animate={{
                        scale: hoveredCard === index ? 1.2 : 1,
                        rotate: hoveredCard === index ? 10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {profile.icon}
                    </motion.div>
                    
                    {/* External link icon */}
                    <motion.div
                      className="text-white text-2xl opacity-50 group-hover:opacity-100"
                      animate={{
                        x: hoveredCard === index ? 5 : 0,
                        y: hoveredCard === index ? -5 : 0,
                      }}
                    >
                      ↗
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: profile.color }}>
                    {profile.username}
                  </p>

                  {/* Error indicator */}
                  {profile.error && (
                    <p className="text-xs text-red-400 mt-2">
                      Unable to fetch live data
                    </p>
                  )}
                </div>

                {/* Stats section */}
                <div className="p-6">
                  {profile.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="mb-4 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-400">{stat.label}</span>
                        <span className="text-lg font-bold text-white">
                          {loading ? (
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ...
                            </motion.span>
                          ) : stat.value}
                        </span>
                      </div>
                      
                      {/* Animated progress bar */}
                      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${profile.color}, ${profile.color}80)`,
                            boxShadow: `0 0 10px ${profile.color}40`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: loading ? '50%' : `${60 + (i * 15)}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + (i * 0.1), duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Visit Profile Button with EncryptButton */}
                <div className="px-6 pb-6">
                  <EncryptButton
                    text="Visit Profile"
                    icon="→"
                    href={profile.link}
                    variant="primary"
                    className="w-full text-sm"
                  />
                </div>

                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredCard === index ? 0.1 : 0,
                  }}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${profile.color}60, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
