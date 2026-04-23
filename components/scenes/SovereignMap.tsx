"use client";

/**
 * SovereignMap — Real 3D cartographic experience of West Africa.
 *
 * RENDERER: MapLibre GL JS (open-source fork of Mapbox GL v1)
 * TILES:    MapTiler Cloud — not blocked by Brave/privacy blockers
 *
 * ═══════════════════════════════════════════════════════════════════
 * Architecture:
 *   - Base: MapTiler streets-dark style (vector tiles, custom dark navy)
 *   - Terrain: MapTiler terrain-rgb-v2 with exaggeration 1.5 (real 3D)
 *   - Clutter removal: all symbol layers hidden on load
 *   - Burkina Faso: inline simplified GeoJSON polygon — 100% reliable
 *     regardless of tile provider schema
 *   - Gold vein: GeoJSON LineString across Birimian belt,
 *     progressively revealed via line-gradient on scroll
 *   - Targets: HTML markers with CSS pulse at real Burkinabé town lat/lng
 *
 * Camera choreography (driven by scrollProgress MotionValue):
 *   0.00–0.10   fade-in (zoom 5.0, pitch 15)
 *   0.10–0.60   zoom in + tilt (zoom 6.0, pitch 50)
 *   0.30–0.55   Burkina highlight fades in + gold border glows
 *   0.55–0.80   vein draws east → west across Birimian belt
 *   0.80–0.95   target markers ignite
 *   0.55–0.90   subtle bearing orbit (0° → -12°)
 * ═══════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import "maplibre-gl/dist/maplibre-gl.css";

// ─── 3 Priority Gold Targets from Kangala Deep-Explor® mapping ───
// Source: Kangala Sovereign Portfolio — page 13 (Technical Verification).
// Coordinates are from the official dossier; all three sit within the 40 km²
// concession centered at 11.4503°N / 3.0112°W (heart of Birimian Greenstone Belt).
const TARGETS: Array<{
  id: string;
  name: string;
  lng: number;
  lat: number;
  primary?: boolean;
  priority: "URGENT" | "FAST TRACK";
}> = [
  {
    id: "G-21",
    name: "G-21 · URGENT",
    lng: -3.012,
    lat: 11.455,
    priority: "URGENT",
  },
  {
    id: "G-6",
    name: "G-6 · URGENT",
    lng: -3.009,
    lat: 11.448,
    priority: "URGENT",
    primary: true,
  },
  {
    id: "G-8",
    name: "G-8 · FAST TRACK",
    lng: -3.015,
    lat: 11.451,
    priority: "FAST TRACK",
  },
];

// The Birimian Greenstone Belt — Paleoproterozoic gold-bearing formation
// crossing Mali → Burkina Faso → Niger (Liptako-Gourma region).
// Path follows the real NE-trending structural geology of the West African Craton.
// Our concession (11.4503°N / 3.0112°W) sits on the Boromo segment.
const BIRIMIAN_BELT: [number, number][] = [
  // ── Mali: Kédougou-Kéniéba gold district (western anchor) ──
  [-11.8, 12.0],
  [-11.2, 12.4],
  [-10.5, 12.2],
  [-9.8,  12.6],
  [-9.2,  12.8],
  // ── Mali: Bougouni-Yanfolila corridor ──
  [-8.6,  12.5],
  [-8.0,  12.9],
  [-7.4,  13.1],
  [-6.8,  12.8],
  [-6.2,  13.0],
  [-5.6,  12.6],
  // ── Burkina Faso: Houndé Belt (western entry) ──
  [-5.0,  12.2],
  [-4.5,  11.9],
  [-4.1,  11.7],
  [-3.8,  11.6],
  [-3.5,  11.55],
  // ── Burkina Faso: Boromo Belt — OUR CONCESSION ──
  [-3.2,  11.5],
  [-3.01, 11.45],   // concession center 11.4503°N, 3.0112°W
  [-2.8,  11.35],
  // ── Burkina Faso: Fada N'Gourma corridor ──
  [-2.4,  11.1],
  [-1.9,  11.3],
  [-1.5,  11.8],
  // ── Burkina / Niger border: Liptako-Gourma region ──
  [-1.0,  12.2],
  [-0.5,  12.7],
  [-0.1,  13.1],
  // ── Niger: Tillabéri gold province ──
  [ 0.4,  13.5],
  [ 0.9,  13.9],
  [ 1.5,  14.3],
  [ 2.1,  14.8],
  // ── Niger: Dosso / In-Gall region (eastern terminus) ──
  [ 2.6,  15.2],
];

// Simplified Burkina Faso outline (~30 points, based on Natural Earth).
// Embedded directly so we don't depend on provider-specific country tilesets.
const BURKINA_FASO_POLYGON: [number, number][] = [
  [-5.404, 10.369], [-5.101, 10.467], [-4.954, 10.152], [-4.779, 9.915],
  [-4.330, 9.611], [-3.981, 9.862], [-3.512, 9.900], [-3.103, 9.798],
  [-2.776, 9.405], [-2.000, 9.424], [-1.467, 9.798], [-1.020, 9.497],
  [-0.762, 10.471], [-0.437, 11.098], [0.024, 11.098], [0.899, 10.997],
  [1.424, 11.138], [2.177, 11.940], [2.155, 13.624], [1.542, 13.331],
  [0.975, 13.600], [0.038, 14.886], [-0.267, 14.924], [-0.516, 15.116],
  [-1.066, 14.974], [-2.001, 14.559], [-2.192, 14.247], [-2.968, 13.798],
  [-3.103, 13.541], [-3.522, 13.338], [-3.980, 13.378], [-4.330, 13.123],
  [-4.428, 12.543], [-4.929, 12.628], [-5.088, 11.813], [-5.470, 10.951],
  [-5.404, 10.369],
];

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface SovereignMapProps {
  scrollProgress: MotionValue<number>;
}

export default function SovereignMap({ scrollProgress }: SovereignMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const rafRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  useEffect(() => {
    if (!containerRef.current) return;
    if (!key) {
      console.warn("[SovereignMap] Missing NEXT_PUBLIC_MAPTILER_KEY");
      return;
    }
    console.log("[SovereignMap] Initializing MapLibre + MapTiler");

    let map: MapLibreMap;
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${key}`,
        center: [-3.0, 13.5], // belt corridor start (Mali → Burkina → Niger)
        zoom: 4.2,
        pitch: 12,
        bearing: 0,
        interactive: false,
        attributionControl: { compact: true },
        maxZoom: 13, // allow close concession zoom
      });
    } catch (err) {
      console.error("[SovereignMap] Map constructor threw:", err);
      setHasError(true);
      return;
    }

    mapRef.current = map;

    map.on("error", (e) => {
      const err = (e as unknown as { error?: { status?: number; message?: string } })?.error;
      const isFatal =
        err?.status === 401 ||
        err?.status === 403 ||
        (typeof err?.message === "string" &&
          (err.message.toLowerCase().includes("key") ||
            err.message.toLowerCase().includes("unauthorized")));

      if (isFatal) {
        console.error("[SovereignMap] Fatal MapTiler error:", e);
        setHasError(true);
      } else {
        console.warn("[SovereignMap] Non-fatal:", err?.message || e);
      }
    });

    map.on("load", () => {
      console.log("[SovereignMap] Map 'load' fired — setting up layers");
      try {
        // ── 1. Remove clutter — hide all symbol labels (we overlay Cinzel) ──
        const style = map.getStyle();
        if (style?.layers) {
          style.layers.forEach((layer) => {
            const id = layer.id.toLowerCase();
            const shouldHide =
              id.includes("road") ||
              id.includes("motorway") ||
              id.includes("bridge") ||
              id.includes("tunnel") ||
              id.includes("poi") ||
              id.includes("transit") ||
              id.includes("aeroway") ||
              id.includes("building") ||
              id.includes("admin-1") ||
              layer.type === "symbol";

            if (shouldHide) {
              try {
                map.setLayoutProperty(layer.id, "visibility", "none");
              } catch {}
            }
          });
        }

        // ── 2. Keep outdoor-v2 water defaults (natural blue — not overriding) ──

        // ── 3. 3D terrain ──
        map.addSource("maptiler-terrain", {
          type: "raster-dem",
          url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${key}`,
          tileSize: 256,
        });
        try {
          map.setTerrain({ source: "maptiler-terrain", exaggeration: 1.5 });
        } catch (err) {
          console.warn("[SovereignMap] Terrain unavailable:", err);
        }

        // ── 4. Golden hillshade ──
        try {
          map.addLayer({
            id: "sovereign-hillshade",
            type: "hillshade",
            source: "maptiler-terrain",
            paint: {
              "hillshade-shadow-color": "#0A192F",
              "hillshade-highlight-color": "#B8954A",
              "hillshade-accent-color": "#1a2a48",
              "hillshade-exaggeration": 0.4,
            },
          });
        } catch {}

        // ── 5. Burkina Faso — inline GeoJSON (provider-independent) ──
        map.addSource("burkina-faso", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [BURKINA_FASO_POLYGON],
            },
          },
        });

        // Gold fill (starts invisible, fades in via scroll)
        map.addLayer({
          id: "bf-fill",
          type: "fill",
          source: "burkina-faso",
          paint: {
            "fill-color": "#D4AF5A",
            "fill-opacity": 0,
          },
        });

        // Gold border glow (wide + blurred-like via large width)
        map.addLayer({
          id: "bf-border-glow",
          type: "line",
          source: "burkina-faso",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#D4AF5A",
            "line-width": 10,
            "line-blur": 6,
            "line-opacity": 0,
          },
        });

        // Gold border solid
        map.addLayer({
          id: "bf-border",
          type: "line",
          source: "burkina-faso",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#D4AF5A",
            "line-width": 3.0,
            "line-opacity": 0,
          },
        });

        // ── 6. Birimian Belt — geological gold vein crossing Mali→Burkina→Niger ──
        map.addSource("birimian-belt", {
          type: "geojson",
          lineMetrics: true,
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: BIRIMIAN_BELT,
            },
          },
        });

        // Geological zone (wide ambient glow — shows extent of the formation)
        map.addLayer({
          id: "belt-zone",
          type: "line",
          source: "birimian-belt",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#B8954A",
            "line-width": 60,
            "line-blur": 28,
            "line-opacity": 0,
          },
        });

        // Bloom (molten glow)
        map.addLayer({
          id: "belt-bloom",
          type: "line",
          source: "birimian-belt",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#D4AF5A",
            "line-width": 28,
            "line-blur": 12,
            "line-opacity": 0,
          },
        });

        // Body — the vein streak (gradient progressive reveal)
        map.addLayer({
          id: "belt-body",
          type: "line",
          source: "birimian-belt",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-width": 5,
            "line-opacity": 0,
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0, "rgba(184,149,74,0)",
              1, "rgba(184,149,74,0)",
            ],
          },
        });

        // Core — bright molten centre
        map.addLayer({
          id: "belt-core",
          type: "line",
          source: "birimian-belt",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-width": 1.5,
            "line-opacity": 0,
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0, "rgba(245,224,160,0)",
              1, "rgba(245,224,160,0)",
            ],
          },
        });

        // ── 7a. Country name overlays (Cinzel HTML markers) ──
        const COUNTRY_LABELS = [
          { name: "MALI", lng: -4.0, lat: 16.5, size: "lg" },
          { name: "NIGER", lng: 6.0, lat: 16.0, size: "lg" },
          { name: "GHANA", lng: -1.0, lat: 8.0, size: "md" },
          { name: "CÔTE D'IVOIRE", lng: -5.8, lat: 7.8, size: "md" },
          { name: "BÉNIN", lng: 2.3, lat: 10.0, size: "sm" },
          { name: "TOGO", lng: 0.9, lat: 9.3, size: "sm" },
          { name: "BURKINA FASO", lng: -1.5, lat: 13.9, size: "xl", sovereign: true },
        ];
        COUNTRY_LABELS.forEach((c) => {
          const el = document.createElement("div");
          el.className = `sovereign-country-label sovereign-country-label--${c.size} ${c.sovereign ? "sovereign-country-label--sovereign" : ""}`;
          el.textContent = c.name;
          const marker = new maplibregl.Marker({ element: el, anchor: "center" })
            .setLngLat([c.lng, c.lat])
            .addTo(map);
          markersRef.current.push(marker);
        });

        // ── 7b. Capital — Ouagadougou ──
        const ouaEl = document.createElement("div");
        ouaEl.className = "sovereign-capital";
        ouaEl.innerHTML = `
          <div class="sovereign-capital__dot"></div>
          <div class="sovereign-capital__label">
            <span class="sovereign-capital__name">OUAGADOUGOU</span>
            <span class="sovereign-capital__tag">CAPITAL</span>
          </div>
        `;
        const ouaMarker = new maplibregl.Marker({ element: ouaEl, anchor: "center" })
          .setLngLat([-1.52, 12.37])
          .addTo(map);
        markersRef.current.push(ouaMarker);

        // ── 7c. Gold targets ──
        TARGETS.forEach((t) => {
          const el = document.createElement("div");
          el.className = `sovereign-target ${t.primary ? "sovereign-target--primary" : ""}`;
          el.innerHTML = `
            <div class="sovereign-target__halo"></div>
            <div class="sovereign-target__ring"></div>
            <div class="sovereign-target__core"></div>
            <div class="sovereign-target__label">
              <span class="sovereign-target__id">${t.id}</span>
              <span class="sovereign-target__name">${t.name}</span>
            </div>
          `;
          const marker = new maplibregl.Marker({ element: el, anchor: "center" })
            .setLngLat([t.lng, t.lat])
            .addTo(map);
          markersRef.current.push(marker);
        });

        // Initially hide targets (vein/country markers stay visible)
        markersRef.current.forEach((m) => {
          const el = m.getElement();
          if (el.classList.contains("sovereign-target")) {
            el.style.opacity = "0";
          }
        });

        console.log("[SovereignMap] Setup complete — map ready");
        setIsReady(true);
      } catch (setupErr) {
        console.error("[SovereignMap] Setup threw during 'load' handler:", setupErr);
      }
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [key]);

  // ══ Scroll-driven camera + layer animation — RAF-throttled for smooth 60fps ══
  useMotionValueEvent(scrollProgress, "change", (p) => {
    // Cancel any pending frame and schedule a fresh one — ensures we always
    // execute the LATEST scroll value with at most one GPU update per frame.
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const map = mapRef.current;
      if (!map || !isReady) return;

      // ─── Camera choreography ───────────────────────────────────────────
      // 0.00–0.20  Full belt corridor visible (Mali → Niger), wide view
      // 0.20–0.55  Belt draws west→east; Burkina territory fades in
      // 0.55–0.80  Camera zooms into Burkina / concession zone
      // 0.80–0.95  Target markers ignite
      // 0.70–1.00  Slight bearing orbit for cinematic depth
      const zoom =
        p < 0.55
          ? lerp(4.2, 5.5, smoothstep(0.1, 0.55, p))
          : lerp(5.5, 11.8, smoothstep(0.55, 0.85, p));
      const pitch   = lerp(12, 52, smoothstep(0.2, 0.78, p));
      const bearing = lerp(0, -15, smoothstep(0.7, 0.98, p));
      const centerLng = lerp(-3.0, -3.0112, smoothstep(0.4, 0.78, p));
      const centerLat = lerp(13.5, 11.4503, smoothstep(0.4, 0.78, p));

      map.jumpTo({ zoom, pitch, bearing, center: [centerLng, centerLat] });

      // ─── Burkina territory activation (0.30 → 0.55) ──────────────────
      const bfOpacity = smoothstep(0.3, 0.55, p);
      try {
        map.setPaintProperty("bf-fill",        "fill-opacity", bfOpacity * 0.25);
        map.setPaintProperty("bf-border",      "line-opacity", bfOpacity);
        map.setPaintProperty("bf-border-glow", "line-opacity", bfOpacity * 0.55);
      } catch {}

      // ─── Birimian Belt reveal (0.20 → 0.55) ──────────────────────────
      const beltRaw = smoothstep(0.20, 0.55, p);
      const beltCut = Math.max(0.001, Math.min(0.999, beltRaw));
      try {
        map.setPaintProperty("belt-zone",  "line-opacity", beltRaw * 0.12);
        map.setPaintProperty("belt-bloom", "line-opacity", beltRaw * 0.35);
        map.setPaintProperty("belt-body",  "line-opacity", beltRaw > 0 ? 0.9 : 0);
        map.setPaintProperty("belt-core",  "line-opacity", beltRaw > 0 ? 0.95 : 0);

        if (beltRaw > 0) {
          const tail = Math.min(0.9999, beltCut + 0.001);
          map.setPaintProperty("belt-body", "line-gradient", [
            "interpolate", ["linear"], ["line-progress"],
            0,        "#B8954A",
            beltCut,  "#D4AF5A",
            tail,     "rgba(184,149,74,0)",
            1,        "rgba(184,149,74,0)",
          ]);
          map.setPaintProperty("belt-core", "line-gradient", [
            "interpolate", ["linear"], ["line-progress"],
            0,        "#F5E0A0",
            beltCut,  "#F5E0A0",
            tail,     "rgba(245,224,160,0)",
            1,        "rgba(245,224,160,0)",
          ]);
        }
      } catch {}

      // ─── Target markers (0.80 → 0.95) ────────────────────────────────
      const targetsOpacity = smoothstep(0.8, 0.95, p);
      markersRef.current.forEach((m) => {
        const el = m.getElement();
        if (el.classList.contains("sovereign-target")) {
          el.style.opacity = String(targetsOpacity);
        }
      });
    });
  });

  if (!key) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-sovereign-deep/20 border border-gold/20">
        <div className="text-center px-8">
          <div className="font-cinzel text-gold tracking-[0.4em] text-xs mb-4 opacity-80">
            MAP · UNCONFIGURED
          </div>
          <p className="font-cairo text-ivory/60 text-sm max-w-md">
            أضف <code className="text-gold">NEXT_PUBLIC_MAPTILER_KEY</code> إلى{" "}
            <code className="text-gold">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-sovereign-deep/20 border border-gold/20">
        <div className="text-center px-8">
          <div className="font-cinzel text-gold tracking-[0.4em] text-xs mb-4 opacity-80">
            MAP · ERROR
          </div>
          <p className="font-cairo text-ivory/60 text-sm">
            تعذّر تحميل الخريطة. تحقق من الـ API key والاتصال.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ minHeight: 300, width: "100%", height: "100%" }}
    />
  );
}
