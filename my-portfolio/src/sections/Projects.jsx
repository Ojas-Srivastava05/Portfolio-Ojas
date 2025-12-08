import { motion } from "framer-motion";
import { useState } from "react";
import { EncryptButton } from "../components/ui/EncryptButton";
import SpringCard from "../components/ui/SpringCard";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "RangRiti – Cultural Tech Platform",
      description: "Full-stack web platform bridging traditional Indian art and modern digital audience with AI-powered tools, VR rooms, and artisan marketplace",
      tech: ["Node.js", "Express", "MongoDB", "Cloudinary", "Hugging Face", "EJS"],
      image: "🎨",
      github: "https://github.com/Ojas-Srivastava05/RangRiti",
      live: "https://rangriti.onrender.com",
      category: "Web Dev",
      featured: true,
      details: {
        tagline: "Bridging Tradition and Technology to Celebrate Indian Art",
        highlights: [
          "40+ Indian artforms with educational context",
          "AI-powered art preview generation",
          "Immersive VR cultural rooms",
          "Global artisan marketplace",
          "Text-to-speech mythology narrations"
        ]
      }
    },
    {
      title: "ClimaTrack – Temperature Predictor",
      description: "Machine Learning temperature prediction system using Linear Regression with Gradient Descent trained from scratch in Python",
      tech: ["Python", "Flask", "Linear Regression", "React", "OpenWeather API"],
      image: "🌤️",
      github: "https://github.com/Ojas-Srivastava05/TempPredictor",
      live: "https://climatrack-2o3u.onrender.com",
      category: "ML",
      details: {
        highlights: [
          "Custom gradient descent implementation",
          "Real-time weather data integration",
          "Tomorrow's temperature prediction",
          "Full-stack ML deployment",
          "First ML project milestone"
        ]
      }
    },
    {
      title: "Clubify – Campus Community Platform",
      description: "Modern platform streamlining how students discover, join, and engage with campus clubs and events through unified communication and management",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT Auth", "Cloudinary"],
      image: "🎯",
      github: "https://github.com/Ojas-Srivastava05/WPP-Project.git",
      live: "https://github.com/Ojas-Srivastava05/WPP-Project.git",
      category: "Web Dev",
      featured: true,
      details: {
        highlights: [
          "Personalized club discovery feed",
          "Event management & registration tracking",
          "Seamless membership onboarding workflow",
          "Role-based admin dashboard",
          "Real-time updates and analytics"
        ]
      }
    },
    {
      title: "INK'D – Digital Diary Terminal",
      description: "Futuristic AI-powered diary app with PDF generation, QR code linking, and intelligent AI summaries using Cohere API",
      tech: ["Node.js", "Express", "Cohere API", "PDF Generation", "QR Code"],
      image: "✍️",
      github: "https://github.com/Ojas-Srivastava05/inkd-diary",
      live: "https://inkd-diary.onrender.com",
      category: "Web Dev",
      details: {
        highlights: [
          "Auto-generated PDF for each entry",
          "QR code links to generated PDFs",
          "AI-powered entry summaries",
          "Animated, responsive UI",
          "Secure diary management"
        ]
      }
    },
    {
      title: "DSA Problem Solutions",
      description: "Comprehensive collection of Data Structures & Algorithms solutions across multiple competitive programming platforms",
      tech: ["C++", "Python", "Java", "Algorithms", "Problem Solving"],
      image: "💡",
      github: "https://github.com/Ojas-Srivastava05",
      live: "https://github.com/Ojas-Srivastava05",
      category: "DSA",
      details: {
        platforms: ["LeetCode", "CodeChef", "Codeforces", "TLE Eliminators"],
        highlights: [
          "300+ problems solved",
          "Organized by topic and difficulty",
          "Optimized solutions with explanations",
          "Regular updates with new problems"
        ]
      }
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with smooth animations and interactive UI components",
      tech: ["React", "Framer Motion", "Tailwind"],
      image: "🎨",
      github: "https://github.com/Ojas-Srivastava05/Portfolio-Ojas.git",
      live: "#",
      category: "Web Dev"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Showcasing my recent work
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpringCard>
                <div className="group relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-black/95 to-slate-900/95 border border-red-500/20 hover:border-red-500/50 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-500/10 to-purple-500/10">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {project.title}
                      </h3>
                      <span className="text-2xl">{project.icon}</span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] font-semibold rounded-md bg-red-500/10 text-red-400 border border-red-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <EncryptButton
                        text="View Demo"
                        href={project.live}
                        variant="primary"
                        className="flex-1 text-xs py-2"
                      />
                      <EncryptButton
                        text="Code"
                        href={project.github}
                        variant="secondary"
                        className="flex-1 text-xs py-2"
                      />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500" />
                  </div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <EncryptButton
            text="View All Projects"
            icon="→"
            href="#"
            variant="primary"
            className="text-base"
          />
        </motion.div>
      </div>
    </section>
  );
}
