import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SpringCard({ children, className = "" }) {
  const ref = useRef(null);

  // Motion values for cursor position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth, bouncy animations
  const springConfig = { damping: 20, stiffness: 300 };

  // Apply spring physics to motion values
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  // Handle mouse move to calculate tilt
  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  // Reset on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        scale: { duration: 0.2, ease: "easeOut" },
      }}
      className={`relative ${className}`}
    >
      {/* Ambient glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.2))",
        }}
        whileHover={{ opacity: 1 }}
      />

      {/* Card content with enhanced shadow */}
      <motion.div
        className="relative rounded-xl"
        style={{
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.2)",
        }}
        transition={{
          boxShadow: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
