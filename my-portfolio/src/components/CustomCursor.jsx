import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor more aggressively */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
        a, button, input, textarea, select {
          cursor: none !important;
        }
      `}</style>
      
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          scale: isClicking ? 0.8 : 1
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.6 }}
      >
        <div 
          className="w-10 h-10 rounded-full border-2 border-red-500/60"
          style={{
            boxShadow: "0 0 15px rgba(239, 68, 68, 0.4), inset 0 0 10px rgba(239, 68, 68, 0.2)",
          }}
        />
      </motion.div>
      
      {/* Inner core - black with red glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        animate={{ 
          x: position.x - 6, 
          y: position.y - 6,
          scale: isClicking ? 1.3 : 1
        }}
        transition={{ type: "spring", damping: 35, stiffness: 500, mass: 0.3 }}
      >
        <div className="relative w-3 h-3">
          {/* Black center dot */}
          <div 
            className="absolute inset-0 rounded-full bg-black border border-red-600"
          />
          {/* Red glow effect */}
          <div 
            className="absolute inset-0 rounded-full bg-red-500/30 blur-sm"
            style={{
              boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
            }}
          />
        </div>
      </motion.div>

      {/* Trailing particle effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ 
          x: position.x - 16, 
          y: position.y - 16,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 150, mass: 1 }}
      >
        <div 
          className="w-8 h-8 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </motion.div>

      {/* Subtle ambient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{ 
          x: position.x - 30, 
          y: position.y - 30,
          opacity: isClicking ? 0.8 : 0.3
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100, mass: 1.5 }}
      >
        <div 
          className="w-[60px] h-[60px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, transparent 60%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </>
  );
}
