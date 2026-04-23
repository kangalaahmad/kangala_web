/**
 * Sovereign Easing Vocabulary — Kangala Holding
 *
 * Luxury brands use easing as VOCABULARY, not wallpaper.
 * Each curve is tuned for its specific motion context.
 *
 * Benchmarks:
 *  · Rolex    → SNAP   — snappy start, graceful settle
 *  · Apple    → SPRING — mechanical, spring-damper
 *  · RR       → VAULT  — vault-door weight, then release
 */

export const EASE = {
  /** Hero fades, section entrances, large area transitions */
  DISSOLVE: [0.25, 0.1, 0.25, 1],

  /** Orbital node selection, pagination, active-state snaps */
  SNAP: [0.4, 0, 0.2, 1],

  /** HUD panel slide-ins, modal reveals, glassmorphism cards */
  SPRING: [0.32, 0.08, 0.24, 1],

  /** Convoy entrance, ClimaticOrbit reveal, dramatic moments */
  VAULT: [0.32, 0, 0.67, 0],

  /** Buttons, links, micro-interactions, hover responses */
  HOVER: [0.22, 1, 0.36, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export type EasingName = keyof typeof EASE;
