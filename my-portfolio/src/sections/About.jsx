import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SpringCard from "../components/ui/SpringCard";

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const highlights = [
    {
      icon: "🎓",
      title: "Education",
      description: "Computer Science Student",
      detail: "Building strong foundations in algorithms and systems",
      hasDetails: true,
      educationDetails: [
        { label: "10th Board", score: "95.2%", year: "2020" },
        { label: "12th Board", score: "92.8%", year: "2022" },
        { label: "Current CGPA", score: "8.9", year: "B.Tech CS" }
      ]
    },
    {
      icon: "💻",
      title: "Developer",
      description: "Full-Stack Enthusiast",
      detail: "Creating seamless web experiences"
    },
    {
      icon: "🏆",
      title: "Problem Solver",
      description: "Competitive Programmer",
      detail: "Active on multiple coding platforms"
    },
    {
      icon: "🚀",
      title: "Learner",
      description: "Always Growing",
      detail: "Exploring new technologies daily"
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-hacker tracking-tight">
            About Me
          </h2>
          <p className="text-gray-400 text-lg font-hacker font-light tracking-wide uppercase">
            Get to know me better
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpringCard>
              <div className="p-8 rounded-xl bg-black border border-red-500/20">
                <h3 className="text-2xl font-bold mb-4 text-white font-hacker">
                  Hi, I'm Ojas! 👋
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I'm a passionate <span className="text-red-500 font-semibold">Computer Science student</span> and 
                    <span className="text-red-500 font-semibold"> full-stack developer</span> who loves turning complex problems 
                    into elegant solutions.
                  </p>
                  <p>
                    My journey in tech started with a curiosity about how things work, which evolved into a deep passion 
                    for building impactful applications. I specialize in modern web technologies and have a strong 
                    foundation in data structures and algorithms.
                  </p>
                  <p>
                    When I'm not coding, you'll find me participating in competitive programming contests, contributing 
                    to open-source projects, or exploring the latest tech trends.
                  </p>
                  <p className="text-red-400 font-semibold">
                    Let's build something amazing together! 🚀
                  </p>
                </div>
              </div>
            </SpringCard>
          </motion.div>

          {/* Right: Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                <SpringCard>
                  <div className="p-6 rounded-xl bg-black border border-red-500/20 h-full">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-1 font-hacker">
                      {item.title}
                    </h4>
                    <p className="text-sm text-red-400 mb-2 font-semibold">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </SpringCard>

                {/* Education Details Popup - Appears outside the card */}
                {item.hasDetails && hoveredCard === index && (
                  <AnimatePresence>
                    <>
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md"
                        style={{ 
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 9999,
                          margin: 0,
                          padding: 0
                        }}
                        onClick={() => setHoveredCard(null)}
                      />
                      
                      {/* Popup Card - Centered Container */}
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 10000,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '20px',
                          pointerEvents: 'none'
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: 50 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: 50 }}
                          transition={{ 
                            type: "spring", 
                            damping: 20, 
                            stiffness: 300,
                            duration: 0.4
                          }}
                          style={{
                            width: '90%',
                            maxWidth: '500px',
                            pointerEvents: 'auto'
                          }}
                        >
                          <div className="rounded-2xl border-2 border-dashed border-red-500/70 bg-black p-8 shadow-[0_0_80px_rgba(239,68,68,0.5)]">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-red-500/40">
                              <div className="flex items-center gap-3">
                                <motion.div 
                                  className="text-4xl bg-red-500/20 p-3 rounded-xl border-2 border-red-500/50"
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  🎯
                                </motion.div>
                                <div>
                                  <h3 className="text-2xl font-bold text-white font-hacker">
                                    Academic Record
                                  </h3>
                                  <p className="text-xs text-gray-400 font-hacker">
                                    Excellence in Education
                                  </p>
                                </div>
                              </div>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHoveredCard(null);
                                }}
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-red-500 hover:text-red-400 transition-colors text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-500/10"
                              >
                                ✕
                              </motion.button>
                            </div>

                            {/* Education Details */}
                            <div className="space-y-4">
                              {item.educationDetails.map((edu, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.15, type: "spring" }}
                                  className="group relative"
                                >
                                  <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border-2 border-red-500/30 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-[1.02]">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-sm text-gray-300 font-hacker mb-1 font-semibold">
                                          {edu.label}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono">
                                          {edu.year}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <motion.p 
                                          className="text-3xl font-bold text-red-400 font-mono"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: idx * 0.15 + 0.2, type: "spring", bounce: 0.5 }}
                                        >
                                          {edu.score}
                                        </motion.p>
                                      </div>
                                    </div>
                                    
                                    {/* Corner decorations */}
                                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* Footer Badge */}
                            <motion.div 
                              className="mt-6 pt-4 border-t-2 border-dashed border-red-500/40 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="inline-block px-4 py-2 rounded-full border-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 transition-colors">
                                <p className="text-xs text-red-400 font-bold font-hacker">
                                  🏆 ACADEMIC EXCELLENCE
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </>
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Years Coding", value: "3+" },
            { label: "Projects Built", value: "20+" },
            { label: "Problems Solved", value: "500+" },
            { label: "Cups of Coffee", value: "∞" }
          ].map((stat, index) => (
            <SpringCard key={index}>
              <div className="p-6 rounded-xl bg-black border border-red-500/20 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-hacker">
                  {stat.label}
                </div>
              </div>
            </SpringCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
