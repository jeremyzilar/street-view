import type { Config } from "tailwindcss";

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
        "Helvetica Neue", // Popular sans-serif, widely available on Mac and iOS
        "Arial", // Default fallback sans-serif on Windows
        "Segoe UI", // Common on Windows and Microsoft platforms
        "Roboto", // Popular on Android and Google platforms
        "system-ui", // Uses the system's default sans-serif
        "-apple-system", // macOS and iOS system font
        "BlinkMacSystemFont", // Fallback for WebKit-based browsers
        "sans-serif", // Generic fallback
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
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
