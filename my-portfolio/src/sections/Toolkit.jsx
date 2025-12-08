import { motion } from "framer-motion";

export default function Toolkit() {
  const categories = [
    {
      title: "Web Development Stack",
      icon: "🌐",
      skills: [
        { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
        { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
        { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
        { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
        { name: "Express", logo: "https://cdn.simpleicons.org/express/FFFFFF" },
        { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" }
      ]
    },
    {
      title: "Languages & Scripting",
      icon: "📝",
      skills: [
        { name: "C++", logo: "https://cdn.simpleicons.org/cplusplus/00599C" },
        { name: "Java", logo: "https://cdn.simpleicons.org/openjdk/FFFFFF" },
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
        { name: "SQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
        { name: "Bash", logo: "https://cdn.simpleicons.org/gnubash/4EAA25" }
      ]
    },
    {
      title: "AI Stack",
      icon: "🤖",
      skills: [
        { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
        { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/150458" },
        { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
        { name: "OpenCV", logo: "https://cdn.simpleicons.org/opencv/5C3EE8" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/chainlink/375BD2" }
      ]
    },
    {
      title: "Product Stack",
      icon: "🛠️",
      skills: [
        { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
        { name: "Linux", logo: "https://cdn.simpleicons.org/linux/FCC624" },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
        { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/FFFFFF" },
        { name: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" }
      ]
    }
  ];

  return (
    <section id="toolkit" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My Toolkit
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Technologies & Tools I Work With
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="rounded-2xl border-2 border-dashed border-red-500/50 bg-black p-6 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-xl hover:shadow-[6px_6px_0px_rgba(239,68,68,0.5)] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-dashed border-red-500/30">
                <div className="text-2xl bg-red-500/10 p-2 rounded-xl border-2 border-red-500/30">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (catIndex * 0.1) + (skillIndex * 0.05) }}
                    className="group relative"
                  >
                    <div className="rounded-lg border-2 border-red-500/30 bg-gradient-to-br from-red-500/5 to-transparent p-3 transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:border-red-500 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.3)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none cursor-pointer">
                      <div className="flex items-center gap-2">
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                        />
                        <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {skill.name}
                        </span>
                      </div>
                      
                      {/* Animated corner dots */}
                      <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Category Badge */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-red-500/30">
                <div className="inline-block px-3 py-1.5 rounded-full border-2 border-red-500/50 bg-red-500/10 text-[10px] font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {category.skills.length} TOOLS
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
