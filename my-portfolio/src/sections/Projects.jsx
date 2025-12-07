import { motion } from "framer-motion";
import { useState } from "react";
import { EncryptButton } from "../components/ui/EncryptButton";

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-typewriter tracking-tight">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg font-hacker font-light tracking-wide">
            A collection of projects showcasing my skills in web development, AI/ML, and competitive programming
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
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Card glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.5), rgba(220, 38, 38, 0.3))',
                }}
              />

              {/* Card */}
              <motion.div
                className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
                animate={{
                  scale: hoveredIndex === index ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Icon/Emoji */}
                <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-red-950/50 to-slate-900/50">
                  <motion.div
                    className="text-8xl"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.image}
                  </motion.div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#fca5a5',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-neon-red-intense mb-2 group-hover:text-red-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neon-red-subtle text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-md bg-red-950/30 text-red-300 border border-red-800/50"
                        style={{
                          textShadow: '0 0 5px rgba(239, 68, 68, 0.5)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links with EncryptButton */}
                  <div className="flex gap-3">
                    <EncryptButton
                      text="GitHub"
                      href={project.github}
                      variant="outline"
                      className="flex-1 text-xs py-2"
                    />
                    <EncryptButton
                      text="Live Demo"
                      href={project.live}
                      variant="primary"
                      className="flex-1 text-xs py-2"
                    />
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 0.1 : 0,
                  }}
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.4), transparent 70%)',
                  }}
                />
              </motion.div>
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
