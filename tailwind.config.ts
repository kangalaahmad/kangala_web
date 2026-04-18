import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══ Kangala Sovereign Palette ═══
        ivory: {
          DEFAULT: "#F5F0E8",
          dark: "#DAD3C6",
        },
        sovereign: {
          DEFAULT: "#0A192F",
          deep: "#061022",
          light: "#142645",
        },
        gold: {
          DEFAULT: "#B8954A",
          bright: "#D4AF5A",
          deep: "#8F7138",
        },
        jade: "#4A8B6F",
        mist: "rgba(10, 25, 47, 0.10)",
      },
      fontFamily: {
        // Arabic
        cairo: ["var(--font-cairo)", "sans-serif"],
        naskh: ["var(--font-naskh)", "serif"],
        // Latin display
        cinzel: ["var(--font-cinzel)", "serif"],
        // Latin editorial serif (Ivory scenes, body copy)
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        // Latin body
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        sovereign: "0.25em",
        royal: "0.4em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #B8954A 0%, #D4AF5A 50%, #B8954A 100%)",
        "kente": "repeating-linear-gradient(90deg, #B8954A 0, #B8954A 2px, transparent 2px, transparent 8px, #D4AF5A 8px, #D4AF5A 10px, transparent 10px, transparent 16px)",
      },
    },
  },
  plugins: [],
};

export default config;
