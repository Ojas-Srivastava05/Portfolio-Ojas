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
        { 
          label: "B.Tech - Computer Science", 
          score: "9.44/10", 
          year: "2023 - Present",
          school: "SRM Institute of Science and Technology",
          location: "Chennai, Tamil Nadu",
          note: "Till Sem-3"
        },
        { 
          label: "12th (CBSE)", 
          score: "95.2%", 
          year: "2022 - 2023",
          school: "Your High School Name",
          location: "Your City, State"
        },
        { 
          label: "10th (CBSE)", 
          score: "98.2%", 
          year: "2020 - 2021",
          school: "Your High School Name",
          location: "Your City, State"
        }
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            About Me
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Hi, I'm Ojas! 👋
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg text-red-400 font-semibold italic">
                    Engineering digital experiences with precision and creativity
                  </p>
                  <p>
                    I'm <span className="text-red-500 font-semibold">Ojas Srivastava</span>, a B.Tech AI sophomore at 
                    <span className="text-red-500 font-semibold"> NIT Surat</span>, building impactful products at the intersection 
                    of engineering, AI, and user experience. I blend human-centred design, full-stack development, and practical 
                    machine learning to create solutions that are both technically strong and intuitively usable.
                  </p>
                  <p>
                    I'm currently pursuing the <span className="text-red-500 font-semibold">Stanford Online ML Specialization</span> and 
                    have built a strong foundation in core engineering subjects such as Computer Organization & Architecture, Database 
                    Management Systems, Operating Systems, and more. I also hold a broad understanding of machine learning concepts and 
                    algorithms, enabling me to design scalable and efficient AI-driven systems.
                  </p>
                  <p>
                    Beyond development, I actively sharpen my problem-solving skills and hold a 
                    <span className="text-red-500 font-semibold"> 3⭐ rating on CodeChef</span>. I aim to build tools that deliver 
                    real-world value while pushing the boundaries of modern AI and product design.
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
                    <h4 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    Academic Record
                                  </h3>
                                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                                  <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border-2 border-red-500/30 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-[1.02]">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <p className="text-base text-white mb-1 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                          {edu.label}
                                        </p>
                                        <p className="text-sm text-red-400 font-semibold mb-2">
                                          {edu.school}
                                        </p>
                                        <p className="text-xs text-gray-400 mb-1">
                                          📍 {edu.location}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono">
                                          📅 {edu.year}
                                        </p>
                                      </div>
                                      <div className="text-right flex-shrink-0">
                                        <motion.p 
                                          className="text-3xl font-bold text-red-400 font-mono mb-1"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: idx * 0.15 + 0.2, type: "spring", bounce: 0.5 }}
                                        >
                                          {edu.score}
                                        </motion.p>
                                        {edu.note && (
                                          <p className="text-[10px] text-gray-500 italic">
                                            {edu.note}
                                          </p>
                                        )}
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
                                <p className="text-xs text-red-400 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                <div className="text-sm text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
