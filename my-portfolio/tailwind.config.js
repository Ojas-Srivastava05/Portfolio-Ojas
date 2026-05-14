/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08090c",
          50: "#f5f6f8",
          100: "#0e0f14",
          200: "#14151c",
          300: "#1a1c25",
          400: "#22242f",
          500: "#2c2f3c",
        },
        accent: {
          DEFAULT: "#34d399",
          soft: "rgba(52, 211, 153, 0.12)",
          line: "rgba(52, 211, 153, 0.32)",
          warm: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "grid-dot":
          "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
      },
      letterSpacing: {
        ultratight: "0em",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52,211,153,0.18), 0 8px 40px -12px rgba(52,211,153,0.18)",
      },
    },
  },
  plugins: [],
};
