import { motion } from "framer-motion";
import { TypingAnimation } from "../components/magicui/typing-animation";
import { RotatingText } from "../components/magicui/rotating-text";

export default function Hero() {
  const roles = [
    "MACHINE LEARNING",
    "WEB DEVELOPMENT",
    "COMPETITIVE PROGRAMMING",
    "ARTIFICIAL INTELLIGENCE",
    "DSA",
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Multiple layered animated glows */}
      <motion.div 
        className="absolute inset-0 -z-10 flex items-center justify-center"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
      </motion.div>

      <motion.div 
        className="absolute inset-0 -z-10 flex items-center justify-center"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
      </motion.div>

      {/* Enhanced floating particles with varied sizes and movements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 5) * 15}%`,
            background: i % 3 === 0 
              ? 'rgba(239, 68, 68, 0.4)' 
              : i % 3 === 1 
                ? 'rgba(168, 85, 247, 0.4)' 
                : 'rgba(239, 68, 68, 0.2)',
          }}
          animate={{
            y: [0, -40 - (i % 3) * 20, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-20 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Heading with neon glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          <TypingAnimation 
            text="Hi, I'm Ojas Srivastava" 
            duration={80}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          />
        </h1>
      </motion.div>

      {/* Subtitle with rotating text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 2.5, 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="mt-6 text-2xl md:text-3xl text-slate-300 max-w-2xl relative z-10 font-medium"
      >
        <span className="text-white"></span>
        <RotatingText 
          items={roles}
          interval={2500}
          className="text-2xl md:text-3xl"
        />
      </motion.div>

      {/* Floating accent lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
          style={{
            width: '200px',
            left: `${20 + i * 25}%`,
            top: `${40 + i * 10}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Call To Action with enhanced effects */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.08,
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 4.5, duration: 0.6 }}
        className="mt-10 inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all relative z-10 overflow-hidden group"
      >
        {/* Button shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.span
          className="relative z-10"
          animate={{
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          View My Work
        </motion.span>
        
        <motion.span
          className="relative z-10"
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          →
        </motion.span>
      </motion.a>

      {/* Animated border accent at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-red-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20 border-r-2 border-b-2 border-red-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
}
