import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
