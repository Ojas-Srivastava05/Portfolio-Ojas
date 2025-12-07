import { useRef, useState } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

export function EncryptButton({ 
  text = "Button",
  icon = null,
  onClick = () => {},
  href = null,
  className = "",
  variant = "default" // "default", "primary", "outline"
}) {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setDisplayText(text);
  };

  const variantStyles = {
    default: "bg-neutral-900/50 border-neutral-500 text-neutral-300 hover:text-red-400",
    primary: "bg-neutral-900/50 border-red-500/40 text-red-400 hover:text-red-300",
    outline: "bg-neutral-900/30 border-red-500/30 text-red-400 hover:text-red-300",
  };

  const gradientStyles = {
    default: "from-indigo-400/0 via-indigo-400/90 to-indigo-400/0",
    primary: "from-red-500/0 via-red-500/90 to-red-500/0",
    outline: "from-red-600/0 via-red-600/90 to-red-600/0",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={`group relative overflow-hidden rounded-lg border-[1px] px-6 py-3 font-mono font-medium uppercase transition-colors inline-block ${variantStyles[variant]} ${className}`}
    >
      {/* Animated laser scan effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${gradientStyles[variant]} opacity-0 group-hover:opacity-100 pointer-events-none`}
        initial={{ y: '100%' }}
        whileHover={{
          y: '-100%',
          transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }
        }}
      />
      
      {/* Text content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span>{displayText}</span>
      </span>
    </Component>
  );
}
