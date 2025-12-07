"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TypingAnimation({
  text,
  duration = 100,
  className = "",
  showCursor = true,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, duration]);

  return (
    <span className={`${className} relative inline-block`}>
      {/* Main text with smooth letter appearance and neon glow */}
      <span className="relative">
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
            className="inline-block"
            style={{
              textShadow: '0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Sleek modern cursor */}
      {showCursor && (
        <motion.span
          animate={{ 
            opacity: [1, 0.2, 1],
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="inline-block w-[2px] h-[0.9em] ml-1 align-middle rounded-sm bg-red-500"
          style={{
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
          }}
        />
      )}
    </span>
  );
}
