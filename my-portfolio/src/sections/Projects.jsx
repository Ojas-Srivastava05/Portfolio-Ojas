import { motion } from "framer-motion";
import { useState } from "react";
import { EncryptButton } from "../components/ui/EncryptButton";
import SpringCard from "../components/ui/SpringCard";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses using OpenAI GPT-4 API",
      tech: ["React", "Node.js", "OpenAI", "Socket.io"],
      image: "🤖",
      github: "#",
      live: "#",
      category: "AI/ML"
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard",
      tech: ["Next.js", "MongoDB", "Stripe", "Tailwind"],
      image: "🛒",
      github: "#",
      live: "#",
      category: "Web Dev"
    },
    {
      title: "Algorithm Visualizer",
      description: "Interactive tool to visualize sorting and pathfinding algorithms in real-time",
      tech: ["React", "TypeScript", "D3.js"],
      image: "📊",
      github: "#",
      live: "#",
      category: "DSA"
    },
    {
      title: "Neural Network Trainer",
      description: "Custom neural network implementation with visualization of training process",
      tech: ["Python", "TensorFlow", "Flask", "React"],
      image: "🧠",
      github: "#",
      live: "#",
      category: "ML"
    },
    {
      title: "Code Compiler",
      description: "Online code editor and compiler supporting multiple programming languages",
      tech: ["React", "Node.js", "Docker", "Monaco"],
      image: "💻",
      github: "#",
      live: "#",
      category: "Web Dev"
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with smooth animations and interactive UI components",
      tech: ["React", "Framer Motion", "Tailwind"],
      image: "🎨",
      github: "#",
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
                        href={project.demo}
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
