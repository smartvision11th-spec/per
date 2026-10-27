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
        background: "#090A0F",
        surface: {
          DEFAULT: "#121622",
          elevated: "#1A2030",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          orange: "#FF5500",
          "orange-hover": "#FF6E26",
          cyan: "#00F2FE",
          green: "#22C55E",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "orange-glow": "0 0 35px -5px rgba(255, 85, 0, 0.4)",
        "cyan-glow": "0 0 30px -5px rgba(0, 242, 254, 0.35)",
        "glass-edge": "inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
