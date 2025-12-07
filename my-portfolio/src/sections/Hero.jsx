import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      {/* Glow behind the text */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]" />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
      >
        Hi, I'm <span className="text-red-400">Ojas</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 text-xl md:text-2xl text-slate-300 max-w-2xl"
      >
        I craft stylish, animated, modern web experiences using React.
      </motion.p>

      {/* Call To Action */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-8 inline-block px-8 py-3 text-lg font-medium rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors hover-target"
      >
        View My Work →
      </motion.a>
    </section>
  );
}
