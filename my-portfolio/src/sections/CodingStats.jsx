import { motion } from "framer-motion";
import { EncryptButton } from "../components/ui/EncryptButton";
import SpringCard from "../components/ui/SpringCard";

export default function CodingStats() {

  // Snapshot Stats Strategy: API wrappers were unreliable/broken (CORS issues, rate limits).
  // Using hardcoded "Snapshot" values to ensure reliability for the user.
  // Last Updated: January 2026

  const stats = {
    github: {
      repositories: 25,
      stars: "10+",
      contributions: "500+"
    },
    leetcode: {
      totalSolved: "150+",
      rating: "N/A", // Not rated yet or data unavailable
      acceptanceRate: 60
    },
    codechef: {
      rating: 1600, // Approx for 3 Star
      maxRating: 1650,
      stars: 3
    },
    codeforces: {
      rating: 1000,
      maxRating: 1000,
      rank: "Newbie"
    },
    kaggle: {
      tier: "Expert", // Preserved from legacy code
      competitions: "15+",
      totalMedals: 3
    }
  };

  const profiles = [
    {
      name: "GitHub",
      username: "@Ojas-Srivastava05",
      icon: "https://cdn.simpleicons.org/github/white",
      color: "#ef4444",
      stats: [
        { label: "Public Repos", value: stats.github.repositories, icon: "📦", description: "Open source" },
        { label: "Total Stars", value: stats.github.stars, icon: "⭐", description: "Stargazers" },
        { label: "Contributions", value: stats.github.contributions, icon: "📊", description: "Past Year" },
      ],
      link: "https://github.com/Ojas-Srivastava05",
      bgGradient: "from-black/50 to-slate-900/50",
      highlights: ["Active Contributor", "Open Source", "Clean Code"],
    },
    {
      name: "LeetCode",
      username: "@Oju_Srivastava",
      icon: "https://cdn.simpleicons.org/leetcode/FFA116",
      color: "#f87171",
      stats: [
        { label: "Total Solved", value: stats.leetcode.totalSolved, icon: "✅", description: "Problems Solved" },
        { label: "Contest Rating", value: stats.leetcode.rating, icon: "🎯", description: "Competitive" },
        { label: "Acceptance", value: `${stats.leetcode.acceptanceRate}%`, icon: "📈", description: "Accuracy" },
      ],
      link: "https://leetcode.com/Oju_Srivastava", // Updated URL
      bgGradient: "from-black/50 to-slate-900/50",
      highlights: ["Problem Solving", "DSA", "Algorithms"],
    },
    {
      name: "CodeChef",
      username: "@ojassrivastava",
      icon: "https://cdn.simpleicons.org/codechef/5B4638",
      color: "#ef4444",
      stats: [
        { label: "Current Rating", value: stats.codechef.rating, icon: "⭐", description: "Live Rating" },
        { label: "Max Rating", value: stats.codechef.maxRating, icon: "🏆", description: "Peak Rating" },
        { label: "Stars", value: `${stats.codechef.stars} ⭐`, icon: "✨", description: "Division" },
      ],
      link: "https://www.codechef.com/users/ojassrivastava",
      bgGradient: "from-black/50 to-slate-900/50",
      highlights: ["3 Star Coder", "Contests", "Competitive"],
    },
    {
      name: "Codeforces",
      username: "@oju",
      icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
      color: "#dc2626",
      stats: [
        { label: "Current Rating", value: stats.codeforces.rating, icon: "⭐", description: "Live Rating" },
        { label: "Max Rating", value: stats.codeforces.maxRating, icon: "🏆", description: "Peak Rating" },
        { label: "Rank", value: stats.codeforces.rank, icon: "🎖️", description: "Current Rank" },
      ],
      link: "https://codeforces.com/profile/oju",
      bgGradient: "from-black/50 to-slate-900/50",
      highlights: ["Competitive", "Math", "Algorithms"],
    },
    {
      name: "Kaggle",
      username: "@ojassrivastava05",
      icon: "https://cdn.simpleicons.org/kaggle/20BEFF",
      color: "#f87171",
      stats: [
        { label: "Tier", value: stats.kaggle.tier, icon: "🏅", description: "Level" },
        { label: "Competitions", value: stats.kaggle.competitions, icon: "🎯", description: "Entered" },
        { label: "Total Medals", value: stats.kaggle.totalMedals, icon: "🥇", description: "Won" },
      ],
      link: "https://www.kaggle.com/ojassrivastava05",
      bgGradient: "from-black/50 to-slate-900/50",
      highlights: ["Data Science", "ML Models", "Analysis"],
    },
    {
      name: "LinkedIn",
      username: "@ojas-srivastava05",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      color: "#dc2626",
      stats: [
        { label: "Connections", value: "500+", icon: "👥", description: "Network" },
        { label: "Post Views", value: "Active", icon: "👁️", description: "Engagement" },
        { label: "Activity", value: "High", icon: "🔥", description: "Presence" },
      ],
      link: "https://www.linkedin.com/in/ojas-srivastava05",
      bgGradient: "from-black/50 to-slate-900/50",
      highlights: ["Professional", "Networking", "Updates"],
    },
  ];

  const overallStats = [
    {
      label: "Total Problems",
      value: "300+",
      icon: "💡"
    },
    {
      label: "GitHub Repos",
      value: stats.github.repositories,
      icon: "📦"
    },
    {
      label: "Contributions",
      value: stats.github.contributions,
      icon: "📅"
    },
    {
      label: "Total Stars",
      value: stats.github.stars,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Coding Profiles & Stats
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Snapshot of my competitive programming journey
          </p>
        </motion.div>

        {/* Overall Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 max-w-4xl mx-auto">
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
                  className="p-4 rounded-xl text-center backdrop-blur-sm border border-red-500/20 bg-black"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-white mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Profile Cards Grid */}
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
                  className="relative h-full rounded-xl overflow-hidden backdrop-blur-sm bg-black"
                  style={{
                    border: `1px solid ${profile.color}40`,
                  }}
                >
                  {/* Header */}
                  <div className="relative p-4 bg-black border-b border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <img
                        src={profile.icon}
                        alt={profile.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="text-white text-lg opacity-50">↗</div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {profile.name}
                    </h3>
                    <p className="text-xs opacity-70 mb-2 truncate" style={{ color: profile.color, fontFamily: "'Space Grotesk', sans-serif" }}>
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
                  </div>

                  {/* Detailed Stats Grid */}
                  <div className="p-3">
                    <div className="space-y-2">
                      {profile.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg border border-white/5 bg-white/5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{stat.icon}</span>
                            <span className="text-[10px] text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {stat.label}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-white font-mono block">
                              {stat.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visit Profile Button */}
                  <div className="px-3 pb-3">
                    <EncryptButton
                      text="Visit Profile"
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
