"use client";

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  CINEMATIC ATMOSPHERE — Operation Cinematic Vault · PHASE 1       ║
 * ║                                                                   ║
 * ║  Three fused atmospheric layers that transform the site from     ║
 * ║  "digital clean" into "35mm sovereign cinema":                    ║
 * ║                                                                   ║
 * ║   1. BreathingVignette  — edges darken/lighten over 8s (depth)    ║
 * ║   2. GodRays            — two diagonal light shafts drift slowly  ║
 * ║                            (cathedral vault feel, NOT particles)  ║
 * ║   3. FilmGrain          — static SVG fractal noise overlay        ║
 * ║                            (35mm physical texture)                 ║
 * ║                                                                   ║
 * ║  Also retains the existing static Spotlight + Top-edge bleed      ║
 * ║  that were previously inlined in layout.tsx (proven good).        ║
 * ║                                                                   ║
 * ║  Performance contract:                                            ║
 * ║   - All layers: position:fixed, pointer-events:none               ║
 * ║   - Animations: transform/opacity only (GPU accelerated)          ║
 * ║   - `prefers-reduced-motion` disables all motion automatically    ║
 * ║   - No JS runtime cost after mount (pure CSS animations)          ║
 * ║   - FilmGrain SVG is static (feTurbulence computes once)          ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

export default function CinematicAtmosphere() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          BACKGROUND LAYER — behind all content (zIndex: -1)
          Contains: Vignette (breathing), Spotlight (static),
                    GodRays (drifting), Top-edge bleed (static)
         ═══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
      >
        {/* Breathing Vignette — darkens edges, pulses 8s (luxury depth) */}
        <div
          className="cinematic-vignette absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, transparent 28%, rgba(2,5,14,0.52) 72%, rgba(1,3,10,0.80) 100%)",
          }}
        />

        {/* Sovereign Spotlight — warm gold ambient (retained, static) */}
        <div
          className="absolute rounded-full"
          style={{
            width: "65%",
            height: "50vh",
            top: "18vh",
            left: "17.5%",
            background:
              "radial-gradient(circle, rgba(212,175,90,0.72) 0%, rgba(212,175,90,0.18) 55%, transparent 80%)",
            filter: "blur(130px)",
            opacity: 0.17,
          }}
        />

        {/* Top-edge bleed — subtle gold leak at scroll top (retained) */}
        <div
          className="absolute top-0 inset-x-0"
          style={{
            height: "22vh",
            background:
              "linear-gradient(to bottom, rgba(212,175,90,0.06) 0%, transparent 100%)",
          }}
        />

        {/* God Ray #1 — diagonal shaft drifting left→right over 72s */}
        <div className="cinematic-godray cinematic-godray--a" aria-hidden />

        {/* God Ray #2 — counter-diagonal drifting right→left over 96s */}
        <div className="cinematic-godray cinematic-godray--b" aria-hidden />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FOREGROUND LAYER — above all content (zIndex: 9999)
          Contains: Film Grain (mix-blend-mode: soft-light at 3.5%)
         ═══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9999,
          mixBlendMode: "soft-light",
          opacity: 0.4,
        }}
      >
        {/* Static 35mm grain — SVG feTurbulence computes once, GPU caches */}
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <filter id="cinematic-grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.92"
              numOctaves="2"
              stitchTiles="stitch"
              seed="7"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.55 0"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#cinematic-grain-filter)"
          />
        </svg>
      </div>
    </>
  );
}
