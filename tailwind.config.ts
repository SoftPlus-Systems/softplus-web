import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#07080a",
          50: "#f4f5f3",
          100: "#e2e4df",
          200: "#c5c9bf",
          800: "#121417",
          900: "#0b0c0e",
          950: "#050607",
        },
        surface: {
          DEFAULT: "#101215",
          raised: "#15171b",
          line: "rgba(243,244,239,0.08)",
          "line-strong": "rgba(243,244,239,0.16)",
        },
        bone: "#f3f4ef",
        mist: "#9a9e9c",
        signal: {
          DEFAULT: "#c6ff5e",
          dim: "#8fce34",
          deep: "#5c8f22",
        },
        amber: {
          DEFAULT: "#ff7a3d",
        },
        azure: {
          DEFAULT: "#4dd8ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "wide-2": "0.2em",
        "wide-3": "0.32em",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(243,244,239,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,244,239,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-fine": "48px 48px",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(198,255,94,0.45)",
        "glow-sm": "0 0 24px -6px rgba(198,255,94,0.5)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin 18s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        swift: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
