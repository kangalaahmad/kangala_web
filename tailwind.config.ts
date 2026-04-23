import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══ Kangala Sovereign Palette — source of truth: DESIGN.md ═══
        // YAML token → Tailwind utility mapping. Do not hand-edit values;
        // update DESIGN.md and regenerate/propagate here.
        ivory: {
          DEFAULT: "#F5F0E8",  // Royal Ivory — light scene backgrounds
          shock: "#DAD3C6",    // Ivory Shock — primary typography on dark
          light: "#F5F0E8",    // legacy alias
          dark: "#DAD3C6",     // legacy alias → Ivory Shock
          muted: "#C8BEA8",    // borders on ivory surfaces
        },
        sovereign: {
          DEFAULT: "#0A192F",  // Midnight Blue — canonical dark background
          deep: "#061022",     // Sovereign Deep — rare cinematic only
          navy: "#0A192F",     // legacy alias
          light: "#142645",    // raised surfaces on dark
        },
        gold: {
          DEFAULT: "#B8954A",  // Sovereign Gold — default borders, hairlines
          bright: "#D4AF5A",   // halos, active states, CTAs
          warm: "#B8954A",     // legacy alias
          deep: "#8F7138",     // pressed, shadow tones
        },
        jade: "#4A8B6F",       // Heritage Jade — positive ROI indicators
        mist: "rgba(10, 25, 47, 0.40)",   // glass overlay on sovereign
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
        cinematic: "cubic-bezier(0.25, 0.1, 0.25, 1)",
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
