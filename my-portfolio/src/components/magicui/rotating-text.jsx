import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RotatingText({ 
  items, 
  interval = 3000,
  className = "" 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <span className={`${className} relative inline-block`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.8 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: -30, filter: "blur(10px)", scale: 0.8 }}
          transition={{ 
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block relative"
        >
          {/* Animated glow behind text */}
          <motion.span
            className="absolute inset-0 blur-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)',
              backgroundSize: '200% 100%',
            }}
          />
          
          {/* Main text with gradient */}
          <motion.span
            className="relative bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent font-extrabold"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 100%',
              textShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
            }}
          >
            {items[currentIndex]}
          </motion.span>
          
          {/* Animated underline accent */}
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Sparkle effect */}
          <motion.span
            className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.span
            className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.75,
            }}
          />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
