import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar(props) {
  const { title } = props;

  const initialValue = 140;
  const finalValue = 88;
  const thresholdY = 170;

  const speed = 1;
  const scrollDistance = (initialValue - finalValue) / speed;

  const startY = 0;
  const endY = startY + scrollDistance;

  const { scrollY } = useScroll();
  const scrollOutput = useTransform(
    scrollY,
    [startY, endY, endY],
    [initialValue, finalValue, finalValue],
    { clamp: false }
  );

  const [isPastThreshold, setIsPastThreshold] = useState(false);
  useEffect(
    () => scrollY.onChange((latest) => setIsPastThreshold(latest > thresholdY)),
    [scrollY]
  );

  const bgOpacity = useTransform(scrollY, [0, thresholdY], [0, 0.8]);

  return (
    <motion.div 
      className="navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8"
      style={{ 
        height: scrollOutput,
        backdropFilter: isPastThreshold ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: isPastThreshold ? "blur(12px)" : "blur(0px)",
        transform: 'translateZ(0)',
      }}
    >
      {/* Simplified background */}
      <div
        className="absolute inset-0 border-b border-red-900/30"
        style={{
          background: isPastThreshold 
            ? "linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 0, 0, 0.7) 100%)"
            : "transparent",
          transition: 'background 0.3s ease',
        }}
      />

      {/* Static grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: isPastThreshold ? 0.8 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Glowing line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.6) 50%, transparent 100%)",
          opacity: isPastThreshold ? 0.8 : 0,
          boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)",
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Title */}
      <motion.div
        className="relative font-mono text-2xl font-bold tracking-wider"
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{
          opacity: isPastThreshold ? 1 : 0,
          scale: isPastThreshold ? 1 : 0.5,
          y: isPastThreshold ? 0 : -20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          textShadow: "0 0 30px rgba(220, 38, 38, 0.5)",
          color: "#ef4444"
        }}
      >
        <span className="text-red-600/70">&lt;</span>
        <span className="text-red-500 mx-1">{title}</span>
        <span className="text-red-600/70">/&gt;</span>
        
        {/* Simplified underline */}
        <motion.div
          className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
          initial={{ width: "0%" }}
          animate={{ width: isPastThreshold ? "100%" : "0%" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)" }}
        />
      </motion.div>
    </motion.div>
  );
}
