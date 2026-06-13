import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./providers/**/*.{ts,tsx,mdx}",
    "./hooks/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        wo: {
          bg: "var(--color-bg)",
          surface: "var(--color-surface)",
          primary: "var(--color-primary)",
          text: "var(--color-text)",
          "text-soft": "var(--color-text-soft)",
          "text-muted": "var(--color-text-muted)",
          border: "var(--color-border)",
          blush: "var(--color-accent-1)",
          gold: "var(--color-gold)",
          dark: "#1A1A1A",
          brown: "#2C1810"
        }
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        dm: ["var(--font-dm)", "system-ui", "sans-serif"],
        system: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      fontSize: {
        display: [
          "clamp(3.5rem,10vw,12rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em" }
        ],
        h1: [
          "clamp(2.5rem,5vw,4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" }
        ],
        h2: [
          "clamp(2rem,3.5vw,3rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" }
        ],
        h3: ["clamp(1.5rem,2.5vw,2rem)", { lineHeight: "1.25" }],
        "body-lg": ["clamp(1.125rem,1.5vw,1.25rem)", { lineHeight: "1.6", letterSpacing: "0.01em" }],
        body: ["1rem", { lineHeight: "1.65", letterSpacing: "0.01em" }],
        small: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }]
      },
      borderRadius: {
        wo: "28px",
        "wo-lg": "40px"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(44, 24, 16, 0.08)",
        gold: "0 18px 60px rgba(201, 169, 110, 0.22)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" }
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-50%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" }
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.88" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" }
        }
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
