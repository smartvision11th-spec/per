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
        void: "#030406",
        ink: "#07090D",
        charcoal: "#0F1219",
        slate: {
          DEFAULT: "#181D26",
          steel: "#242B38",
        },
        iron: "#525C6C",
        silver: "#9AA4B5",
        mist: "#D5DBE5",
        amber: {
          primary: "#FF7300",
          gold: "#F59E0B",
          sun: "#FBBF24",
          dark: "#B45309",
        },
        gym: {
          white: "#FFFFFF",
          chrome: "#E2E8F0",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        "amber-glow": "0 0 50px -10px rgba(255, 115, 0, 0.45)",
        "amber-sm": "0 0 25px -5px rgba(255, 115, 0, 0.25)",
        "deep": "0 32px 80px rgba(0,0,0,0.75)",
      },
      borderColor: {
        dim: "rgba(255, 115, 0, 0.12)",
        strong: "rgba(255, 140, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
