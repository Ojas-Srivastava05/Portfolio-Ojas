import { motion } from "framer-motion";
import SpringCard from "../components/ui/SpringCard";
import { EncryptButton } from "../components/ui/EncryptButton";

export default function CodingStats() {
  // Configuration for Live Widgets
  // Using reliable "ReadMe Stats" services to generate live SVGs

  const widgets = [
    {
      platform: "GitHub Stats",
      url: "https://github-readme-stats.vercel.app/api?username=Ojas-Srivastava05&show_icons=true&theme=dark&bg_color=00000000&hide_border=true&title_color=ef4444&icon_color=ef4444&text_color=cbd5e1",
      link: "https://github.com/Ojas-Srivastava05",
      colSpan: "md:col-span-1"
    },
    {
      platform: "GitHub Streak",
      url: "https://github-readme-streak-stats.herokuapp.com/?user=Ojas-Srivastava05&theme=dark&background=00000000&hide_border=true&ring=ef4444&currStreakLabel=ef4444",
      link: "https://github.com/Ojas-Srivastava05",
      colSpan: "md:col-span-1"
    },
    {
      platform: "Top Languages",
      url: "https://github-readme-stats.vercel.app/api/top-langs/?username=Ojas-Srivastava05&layout=compact&theme=dark&bg_color=00000000&hide_border=true&title_color=ef4444&text_color=cbd5e1",
      link: "https://github.com/Ojas-Srivastava05",
      colSpan: "md:col-span-1"
    },
    {
      platform: "LeetCode",
      url: "https://leetcard.jacoblin.cool/Oju_Srivastava?theme=dark&font=Space%20Grotesk&ext=heatmap",
      link: "https://leetcode.com/Oju_Srivastava",
      colSpan: "md:col-span-2"
    },
    {
      platform: "Codeforces",
      url: "https://codeforces-readme-stats.vercel.app/api/card?username=oju&theme=dark&bg_color=00000000&hide_border=true&title_color=ef4444&text_color=cbd5e1&icon_color=ef4444",
      link: "https://codeforces.com/profile/oju",
      colSpan: "md:col-span-1"
    },
    // Fallbacks/Badges for platforms without complex graphs
    {
      platform: "CodeChef",
      // Using a shield/badge style as reliable graph widgets are scarce
      customContent: (
        <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
          <img
            src="https://cdn.simpleicons.org/codechef/white"
            alt="CodeChef"
            className="w-12 h-12"
          />
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-1">3 Star</h3>
            <p className="text-red-400 font-mono">Rating: 1600+</p>
          </div>
          <img src="https://img.shields.io/badge/CodeChef-Level%203-brown?style=for-the-badge&logo=codechef&labelColor=black&color=ef4444" alt="CodeChef Badge" className="rounded-md opacity-80" />
        </div>
      ),
      link: "https://www.codechef.com/users/ojassrivastava",
      colSpan: "md:col-span-1"
    }
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
            Live Coding Stats
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Dynamic charts from my competitive profiles
          </p>
        </motion.div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${widget.colSpan || ''} h-full`}
            >
              <SpringCard className="h-full">
                <a
                  href={widget.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full p-4 bg-black/80 border border-red-500/20 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-red-400 transition-colors">
                      {widget.platform}
                    </span>
                    <span className="text-gray-600 group-hover:text-white transition-colors">↗</span>
                  </div>

                  <div className="flex items-center justify-center min-h-[160px]">
                    {widget.customContent ? (
                      widget.customContent
                    ) : (
                      <img
                        src={widget.url}
                        alt={`${widget.platform} Stats`}
                        className="w-full h-auto object-contain max-h-[200px] opacity-90 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    )}
                  </div>
                </a>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <EncryptButton
              text="View GitHub"
              href="https://github.com/Ojas-Srivastava05"
              variant="primary"
            />
            <EncryptButton
              text="LeetCode Profile"
              href="https://leetcode.com/Oju_Srivastava"
              variant="secondary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
