import { motion } from "framer-motion";
import { TypingAnimation } from "../components/magicui/typing-animation";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Animated glow behind the text */}
      <motion.div 
        className="absolute inset-0 -z-10 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-400/30 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Heading with gradient animation */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-white relative z-10"
      >
        <TypingAnimation 
          text="Hi, I'm Ojas Srivastava" 
          duration={100}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        />
      </motion.h1>

      {/* Subtitle with typing animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="mt-4 text-xl md:text-2xl text-slate-300 max-w-2xl relative z-10"
      >
        <TypingAnimation
          text="I craft stylish, animated, modern web experiences using React."
          duration={200}
          showCursor={false}
        />
      </motion.div>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 w-full relative z-10"
      >
      </motion.div>

      {/* Call To Action with pulse effect */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="mt-8 inline-block px-8 py-3 text-lg font-medium rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors hover-target relative z-10"
      >
        <motion.span
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          View My Work →
        </motion.span>
      </motion.a>

      {/* Animated border accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
