import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Color Scheme Usage Guidelines:
 *
 * PRIMARY (Navy/Teal):
 * - Use for headings, navigation, important text
 * - Main brand color for dark elements
 *
 * PEACH:
 * - Use for hero sections, warm backgrounds
 * - Creates welcoming, approachable feeling
 *
 * TEAL:
 * - Use for links, underlines, secondary accents
 * - Interactive elements
 *
 * ACCENT-ORANGE:
 * - Use for CTAs, important highlights
 * - Draws attention to key actions
 *
 * ACCENT-PURPLE:
 * - Use for progress indicators, interactive elements
 * - Modern, supportive feel
 *
 * ACCENT-YELLOW:
 * - Use for alerts, secondary highlights
 * - Warmth and attention
 *
 * SURFACES:
 * - Use for page backgrounds, cards, sections
 * - Creates visual hierarchy and depth
 */

const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      card: "160px",
      "card-lg": "240px",
      mobile: "320px",
      "mobile-lg": "480px",
      tablet: "640px",
      "tablet-lg": "880px",
      desktop: "1024px",
      "desktop-lg": "1256px",
      widescreen: "1400px",
    },
    fontFamily: {
      sans: [
        "Public Sans",
        "var(--font-public-sans)",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      serif: [
        "Georgia", // Well-regarded serif font, common across platforms
        "Cambria", // A default serif on Windows
        "Times New Roman", // Traditional web-safe serif
        "ui-serif", // Uses the system's default serif
        "serif", // Generic serif fallback
      ],
      mono: [
        "SFMono-Regular", // macOS default monospace font
        "Courier New", // Traditional monospace fallback
        "Consolas", // Popular on Windows
        "Liberation Mono", // Common on Linux
        "monospace", // Generic fallback
      ],
      display: [
        "Bebas Neue",
        "Helvetica Neue", // Suitable for large text and UI elements
        "Arial",
        "Segoe UI",
        "system-ui",
        "-apple-system",
        "sans-serif",
      ],
      body: [
        "Georgia", // Clean and widely supported for body text
        "Arial",
        "Roboto",
        "system-ui",
        "-apple-system",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        // Primary brand colors - Navy/Teal palette
        primary: {
          50: "#e6f0f4",
          100: "#cce1e9",
          200: "#99c3d3",
          300: "#66a5bd",
          400: "#3387a7",
          500: "#1C4A5F", // Main brand color
          600: "#163b4c",
          700: "#112c39",
          800: "#0b1e26",
          900: "#060f13",
          DEFAULT: "#1C4A5F",
        },
        // Warm peach for backgrounds and hero sections
        peach: {
          50: "#fef8f5",
          100: "#fdf1eb",
          200: "#fbe3d7",
          300: "#f9d5c3",
          400: "#f7c7af",
          500: "#F5C9B8", // Main peach
          600: "#f0a68e",
          700: "#e97f5f",
          800: "#de5838",
          900: "#c43c1f",
          DEFAULT: "#F5C9B8",
        },
        // Teal accent for links and interactive elements
        teal: {
          50: "#e8f5f8",
          100: "#d1ebf1",
          200: "#a3d7e3",
          300: "#75c3d5",
          400: "#47afc7",
          500: "#5BA3B8", // Main teal accent
          600: "#4a8293",
          700: "#38626e",
          800: "#27414a",
          900: "#152125",
          DEFAULT: "#5BA3B8",
        },
        // Accent colors for CTAs and highlights
        "accent-orange": {
          50: "#fce8ea",
          100: "#f9d1d5",
          200: "#f3a3ab",
          300: "#ed7581",
          400: "#e74757",
          500: "#E63946", // Main orange accent
          600: "#c92734",
          700: "#971d27",
          800: "#64141a",
          900: "#320a0d",
          DEFAULT: "#E63946",
        },
        "accent-purple": {
          50: "#f5edfe",
          100: "#ebdbfd",
          200: "#d7b7fb",
          300: "#c393f9",
          400: "#af6ff8",
          500: "#A855F7", // Main purple accent
          600: "#8e2de2",
          700: "#6d23ac",
          800: "#4a1872",
          900: "#250c39",
          DEFAULT: "#A855F7",
        },
        "accent-yellow": {
          50: "#fefbea",
          100: "#fef7d5",
          200: "#fdefab",
          300: "#fce781",
          400: "#fbdf57",
          500: "#FCD34D", // Main yellow accent
          600: "#f5c419",
          700: "#c49c0d",
          800: "#826808",
          900: "#413404",
          DEFAULT: "#FCD34D",
        },
        // Surface/background colors
        surface: {
          white: "#FFFFFF",
          "off-white": "#F0F0F0",
          mint: "#B8F5E8",
          "light-peach": "#F5D5C0",
          DEFAULT: "#F0F0F0",
        },
      },
      width: {
        card: "160px",
        "card-lg": "240px",
        mobile: "320px",
        "mobile-lg": "480px",
        tablet: "640px",
        "tablet-lg": "880px",
        desktop: "1024px",
        "desktop-lg": "1256px",
        widescreen: "1400px",
      },
      maxWidth: {
        card: "160px",
        "card-lg": "240px",
        "mobile-lg": "480px",
        mobile: "320px",
        tablet: "640px",
        "tablet-lg": "880px",
        desktop: "1024px",
        "desktop-lg": "1256px",
        widescreen: "1400px",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
