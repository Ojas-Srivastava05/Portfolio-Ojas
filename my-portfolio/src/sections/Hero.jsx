import { motion } from "framer-motion";
import { TypingAnimation } from "../components/magicui/typing-animation";
import { RotatingText } from "../components/magicui/rotating-text";
import { EncryptButton } from "../components/ui/EncryptButton";

export default function Hero() {
  const roles = [
    "MACHINE LEARNING",
    "WEB DEVELOPMENT",
    "COMPETITIVE PROGRAMMING",
    "ARTIFICIAL INTELLIGENCE",
    "DSA",
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      {/* Pulsating edge lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleY: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleY: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div className="max-w-5xl mx-auto text-center">
        {/* Heading with typewriter font */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            <TypingAnimation
              text="Hi, I'm Ojas Srivastava"
              duration={80}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
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
          className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-12 h-12 font-light tracking-widest uppercase"
          style={{
            textShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          <RotatingText
            items={roles}
            interval={2500}
            className="text-xl md:text-2xl lg:text-3xl text-gray-400"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <EncryptButton
            text="View My Work"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            variant="primary"
          />
          <EncryptButton
            text="Download CV"
            onClick={() => {
              // Replace with your actual CV file path
              const link = document.createElement('a');
              link.href = '/Ojas-Srivastava-Resume-Sem2 2.pdf'; // Update this path
              link.download = 'Ojas_Srivastava_CV.pdf';
              link.click();
            }}
            variant="secondary"
          />
        </motion.div>

        {/* Animated glow effects */}
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

        {/* Floating particles */}
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
      </div>
    </section>
  );
}