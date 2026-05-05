import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";

const CYCLES_PER_LETTER = 1.5;
const SHUFFLE_TIME = 36;
const CHARS = "01{}[]<>/#";

export function EncryptButton({
  text = "Button",
  icon = null,
  onClick,
  href = null,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  ...props
}) {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setDisplayText(null);
  };

  const scramble = () => {
    if (disabled) return;
    let pos = 0;
    clearInterval(intervalRef.current || undefined);

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || pos / CYCLES_PER_LETTER > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      pos += 1;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const variants = {
    primary:
      "border-teal-300/60 bg-teal-300 text-slate-950 shadow-teal-950/30 hover:bg-teal-200",
    secondary:
      "border-white/10 bg-white/[0.06] text-white hover:border-teal-300/40 hover:bg-white/[0.09] hover:text-teal-100",
    outline:
      "border-white/20 bg-transparent text-slate-200 hover:border-amber-300/60 hover:text-amber-100",
  };

  const labelStyles = {
    primary: "text-slate-950",
    secondary: "text-white group-hover:text-teal-100",
    outline: "text-slate-200 group-hover:text-amber-100",
  };

  const Component = href ? Motion.a : Motion.button;
  const externalProps =
    href && href.startsWith("http")
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

  return (
    <Component
      href={href}
      onClick={disabled ? undefined : onClick}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? "true" : undefined}
      tabIndex={href && disabled ? -1 : undefined}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] shadow-xl transition duration-300 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${className}`}
      {...externalProps}
      {...props}
    >
      {icon && <span className="relative z-10 text-base leading-none">{icon}</span>}
      <span
        className={`relative z-10 font-mono ${labelStyles[variant]}`}
        style={{ color: variant === "primary" ? "#020617" : undefined }}
      >
        {displayText ?? text}
      </span>
    </Component>
  );
}
