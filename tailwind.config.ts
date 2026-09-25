import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "#080B16",
        foreground: "#F8FAFC",
        navy: {
          950: "#080B16",
          900: "#0E1326",
          850: "#13182E",
          800: "#18203D",
          700: "#222B52",
        },
        lavender: {
          300: "#C4B5FD",
          400: "#A78BFA", // Primary accent
          500: "#8B5CF6", // Secondary accent
          600: "#7C3AED",
          glow: "rgba(167, 139, 250, 0.15)",
        },
        card: {
          DEFAULT: "#0E1326",
          foreground: "#F8FAFC",
          lighter: "#13182E",
          border: "rgba(167, 139, 250, 0.15)",
        },
        muted: {
          DEFAULT: "#18203D",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#A78BFA",
          foreground: "#080B16",
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "lavender-sm": "0 0 15px -3px rgba(167, 139, 250, 0.12)",
        "lavender-md": "0 0 25px -5px rgba(167, 139, 250, 0.2)",
        "lavender-lg": "0 0 35px -5px rgba(167, 139, 250, 0.28)",
        "card-subtle": "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
