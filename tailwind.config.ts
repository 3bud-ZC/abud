import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        brand: {
          purple: "#9333ea",
          "purple-light": "#c084fc",
          "purple-dark": "#6b21a8",
          "purple-glow": "rgba(147, 51, 234, 0.3)",
          black: "#050508",
          "black-card": "#0d0d14",
          "black-border": "#1a1a2e",
          white: "#f8f8ff",
          "white-dim": "#c8c8d8",
        },
      },
      fontFamily: {
        arabic: ["IBM Plex Sans Arabic", "Noto Sans Arabic", "Tajawal", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "purple-glow": "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(147, 51, 234, 0.2) 0%, transparent 60%)",
        "card-gradient": "linear-gradient(135deg, rgba(13,13,20,0.9) 0%, rgba(26,26,46,0.6) 100%)",
        "purple-border": "linear-gradient(135deg, #9333ea, #c084fc)",
      },
      boxShadow: {
        "purple-sm": "0 0 10px rgba(147, 51, 234, 0.3)",
        "purple-md": "0 0 20px rgba(147, 51, 234, 0.4)",
        "purple-lg": "0 0 40px rgba(147, 51, 234, 0.5)",
        "purple-xl": "0 0 60px rgba(147, 51, 234, 0.6)",
        "card": "0 4px 24px rgba(0,0,0,0.5)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.7), 0 0 20px rgba(147, 51, 234, 0.2)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(147,51,234,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(147,51,234,0.7)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
