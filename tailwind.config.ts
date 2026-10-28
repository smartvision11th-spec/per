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
        void: "#080A0D",
        ink: "#0D1117",
        charcoal: "#141820",
        slate: {
          DEFAULT: "#1E2532",
          steel: "#2A3347",
        },
        iron: "#4A5568",
        silver: "#8A94A6",
        mist: "#C4CAD6",
        gym: {
          white: "#F0F2F5",
          acid: "#C8E63A",
          "acid-dark": "#96AB1E",
          chrome: "#D4D9E0",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "11xl": ["12rem", { lineHeight: "0.88" }],
        "12xl": ["14rem", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        "wide-xl": "0.15em",
        "wide-2xl": "0.25em",
      },
      borderColor: {
        dim: "rgba(255,255,255,0.06)",
        strong: "rgba(255,255,255,0.12)",
      },
      boxShadow: {
        "acid-glow": "0 0 40px -8px rgba(200,230,58,0.4)",
        "acid-sm": "0 0 20px -4px rgba(200,230,58,0.25)",
        "deep": "0 32px 80px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "gradient-void": "linear-gradient(180deg, #080A0D 0%, #0D1117 100%)",
        "gradient-charcoal": "linear-gradient(180deg, #141820 0%, #0D1117 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
