import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#060709",
          900: "#0B0E16",
          850: "#0F131F",
          800: "#141A29",
          700: "#1D253A",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          orange: "#FF4D00",
          "orange-hover": "#FF631F",
          gold: "#FBBF24",
          cyan: "#00F2FE",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-space)", "monospace"],
      },
      boxShadow: {
        "orange-glow-lg": "0 0 70px -15px rgba(255, 77, 0, 0.45)",
        "cyan-glow-lg": "0 0 60px -15px rgba(0, 242, 254, 0.35)",
        "spotlight": "0 0 40px -5px rgba(255, 77, 0, 0.15)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
