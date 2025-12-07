import { motion } from "framer-motion";
import { useState } from "react";

export function NeuButton({ 
  text = "View My Work",
  subtext = "Explore portfolio",
  icon = "→",
  href = "#projects",
  showAvatar = false,
  avatarText = "O"
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.a
      href={href}
      className="relative inline-block cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
    >
      {/* Ambient glow background - RED THEME */}
      <motion.div
        className="absolute -inset-6 blur-3xl"
        animate={{
          opacity: isHovered ? 0.5 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.2), transparent 70%)',
        }}
      />

      {/* Main button container */}
      <motion.div
        className="relative flex items-center gap-3 px-8 py-3.5 rounded-full overflow-hidden backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          boxShadow: isPressed 
            ? 'inset 2px 2px 6px rgba(0, 0, 0, 0.6), inset -1px -1px 4px rgba(239, 68, 68, 0.1)'
            : isHovered
              ? '0 10px 40px rgba(239, 68, 68, 0.3), 0 0 80px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
        animate={{
          y: isPressed ? 1 : isHovered ? -4 : 0,
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.4), transparent 70%)',
          }}
        />

        {/* Text section */}
        <div className="flex flex-col gap-0 relative z-10">
          <motion.span
            className="text-[10px] uppercase tracking-widest font-bold"
            animate={{
              color: isHovered ? '#fca5a5' : '#6b7280',
            }}
            transition={{ duration: 0.2 }}
          >
            EXPLORE
          </motion.span>
          <motion.span 
            className="text-lg font-bold text-white leading-tight"
            animate={{
              textShadow: isHovered 
                ? '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)'
                : '0 0 0px rgba(239, 68, 68, 0)',
            }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.span>
          <span className="text-[10px] text-gray-500 leading-tight">
            {subtext}
          </span>
        </div>

        {/* Arrow icon badge */}
        <motion.div
          className="relative flex-shrink-0 ml-2"
          animate={{
            x: isHovered ? 4 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.15) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: isHovered 
                ? '0 0 20px rgba(239, 68, 68, 0.5), inset 0 0 10px rgba(239, 68, 68, 0.2)'
                : '0 0 10px rgba(239, 68, 68, 0.3)',
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 0 25px rgba(239, 68, 68, 0.6), inset 0 0 15px rgba(239, 68, 68, 0.3)'
                : '0 0 10px rgba(239, 68, 68, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
              style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6), transparent 70%)',
              }}
            />

            {/* Icon */}
            <motion.span
              className="text-xl font-bold relative z-10"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                filter: isHovered 
                  ? 'brightness(1.5) drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' 
                  : 'brightness(1.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{
            x: isHovered ? '100%' : '-100%',
            opacity: isHovered ? 0.2 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          }}
        />
      </motion.div>
    </motion.a>
  );
}
