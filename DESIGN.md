---
version: alpha
name: Kangala Sovereign
description: >
  Visual identity for Kangala Holding Group — an elite Sovereign Investment
  Group operating in West Africa (Mali, Burkina Faso, Côte d'Ivoire) and the
  UAE. Verticals: Mining, Energy, Logistics. Audience: Presidents, Ministers,
  Sovereign Wealth Funds, Tier-1 Investors. Trilingual: EN · FR · AR (RTL).

colors:
  # ─── Core axis (95% of surfaces) ─────────────────────────────────
  ivory:          "#F5F0E8"   # Royal Ivory — section backgrounds, light scenes
  ivory-shock:    "#DAD3C6"   # Ivory Shock — primary typography on dark
  ivory-dark:     "#C8BEA8"   # muted ivory — borders on ivory surfaces

  sovereign:      "#0A192F"   # Midnight Blue — primary dark background
  sovereign-deep: "#061022"   # Sovereign Deep — rare cinematic accent only
  sovereign-light:"#142645"   # raised surfaces on dark

  # ─── Gold system (accents, never primary) ────────────────────────
  gold:           "#B8954A"   # Sovereign Gold — default borders, hairlines
  gold-bright:    "#D4AF5A"   # halos, active states, CTAs
  gold-deep:      "#8F7138"   # pressed, shadow tones

  # ─── Semantic ────────────────────────────────────────────────────
  jade:           "#4A8B6F"   # Heritage Jade — positive ROI, financial upside
  mist:           "rgba(6,16,34,0.40)"   # glass overlay on sovereign

typography:
  # Display — sovereign headlines
  display-xl:
    fontFamily: Cinzel
    fontSize: clamp(3.5rem, 10vw, 10rem)
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.02em

  display-lg:
    fontFamily: Cinzel
    fontSize: clamp(2.5rem, 6vw, 6rem)
    fontWeight: 300
    lineHeight: 1.05

  display-md:
    fontFamily: Cinzel
    fontSize: clamp(1.75rem, 4vw, 3.5rem)
    fontWeight: 400
    lineHeight: 1.1

  # Editorial serif — Ivory scenes, long-form body
  editorial:
    fontFamily: Cormorant
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6

  # Supra-label — small-caps navigational tags
  supra:
    fontFamily: Cinzel
    fontSize: 0.75rem
    fontWeight: 400
    letterSpacing: 0.6em

  royal-supra:
    fontFamily: Cinzel
    fontSize: 0.625rem
    fontWeight: 400
    letterSpacing: 0.7em

  # Body
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.6

  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: 1.5

  # Arabic (RTL) — automatic via html[dir="rtl"]
  body-ar:
    fontFamily: Cairo
    fontSize: 1rem
    lineHeight: 1.75

  body-ar-formal:
    fontFamily: Noto Naskh Arabic
    fontSize: 1rem
    lineHeight: 1.8

rounded:
  none: 0
  sm:   2px
  md:   4px
  full: 9999px   # reserved for orbital nodes, wax seal only

spacing:
  # 8-point grid — EVERY margin/padding MUST snap to these values
  xs:  4px
  sm:  8px
  md:  16px
  lg:  24px
  xl:  32px
  2xl: 48px
  3xl: 64px
  4xl: 72px
  5xl: 80px
  6xl: 96px

components:
  # ─── Gold frame — the signature Kangala vessel ────────────────
  gold-frame:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.sovereign}"
    padding: 28px
    # 1.5px solid gold at 35% opacity + inset glow 40px @ 4% opacity

  # ─── HUD glassmorphism card (War Room) ────────────────────────
  hud-card:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ivory-shock}"
    rounded: "{rounded.none}"
    padding: 24px
    # backdrop-blur-md, border 1px solid gold @ 20%

  # ─── Metric tile (Numbers scene, Odometer) ────────────────────
  metric-tile:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ivory-shock}"
    rounded: "{rounded.none}"
    padding: 40px
    # corner frames top-right + bottom-left, gold @ 60%

  # ─── Primary CTA (rare — only on final Invitation page) ──────
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.sovereign}"
    typography: "{typography.supra}"
    rounded: "{rounded.none}"
    padding: 16px 32px

  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"

  # ─── Kente decorative strip (chapter transitions) ─────────────
  kente-strip:
    # Repeating gold gradient — see tailwind bg-kente utility
    height: 2px

  # ─── Wax seal (closes final Invitation scene) ─────────────────
  wax-seal:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.full}"
    size: 120px

# ─── Motion — cinematic, never bouncy ─────────────────────────
easing:
  cinematic: cubic-bezier(0.25, 0.1, 0.25, 1)    # default, slow reveal
  silk:      cubic-bezier(0.22, 1, 0.36, 1)      # hover/exit
  apple:     cubic-bezier(0.16, 1, 0.3, 1)       # vault opens
  snap:      cubic-bezier(0.4, 0, 0.2, 1)        # short UI transitions

---

# Kangala Sovereign — Design System

## Overview
**Architectural Minimalism meets Sovereign Gravitas.** The UI evokes a
hand-bound dossier presented across a walnut desk in a sovereign fund boardroom
— a cinematic, cinematic-dark aesthetic where every element reads as
**earned legitimacy**, never as marketing.

This is a **trilingual** system (EN · FR · AR). Arabic uses RTL and its own
typography stack; no language ever appears inside another language's content.

## Persona
The designer acting on this file is the **Lead Cinematic UI/UX Architect &
Senior Art Director** for Kangala Holding. They design for Presidents,
Ministers, and Tier-1 sovereign investors. Every decision must exude
*Sovereign Power, High-End Corporate Luxury, and the "Big Boss" aesthetic.*

## The Anti-Slop Mandate *(non-negotiable)*
Under **no** circumstances should the output produce generic AI slop:
- **NO** purple/indigo startup gradients.
- **NO** overly playful or bouncy animations — all motion is slow, staggered, cinematic.
- **NO** soft rounded corners. Architectural proportions only: `rounded-none` dominates. `rounded-full` is reserved for orbital nodes and the wax seal.
- **NO** Lorem Ipsum. Real mining, logistics, geological copy only.
- **NO** cluttered UI. Heavy negative space, golden ratio proportions, sharp contrast.
- **NO** pure black `#000000` — always `{colors.sovereign}`.
- **NO** pure white `#FFFFFF` — always `{colors.ivory-shock}` on dark, `{colors.sovereign}` on light.

## Colors
A high-contrast palette rooted in two axes: **Ivory ↔ Sovereign** (95% of
surfaces) and **Gold** (accent only).

- **`{colors.ivory}` / `{colors.ivory-shock}`** — Royal Ivory foundation and
  Ivory Shock typography. These two values drive the entire luxury feel.
- **`{colors.sovereign}`** — Midnight Blue, the canonical dark background
  (body default, dossier interior pages).
- **`{colors.sovereign-deep}`** — **Rare use only.** Reserved for cinematic
  moments (FleetConvoy, chapter fade-outs, final scenes). Overusing this value
  collapses the brand into generic "black" territory.
- **`{colors.gold}` / `{colors.gold-bright}` / `{colors.gold-deep}`** — The
  three-stop gold system. Never fill large surfaces with gold; it is the
  accent that **earns** the viewer's attention (borders, hairlines, halos,
  active states).
- **`{colors.jade}`** — Heritage Jade. Used exclusively for positive financial
  indicators (ROI, upside values). Replaces Material/Bootstrap greens which
  read as "digital" and break the sovereign tone.

### Retired Colors *(banned from all output)*
These values appeared in earlier iterations and must **never** be reintroduced:
- `#1C0F00`, `#1A0A00`, `#2A1A0A` (Kente Ink/Black — replaced by `{colors.sovereign}`)
- Beige/tan gradients: `#E5DCC8`, `#DBD2C0`, `#EDE6D6`, `#E0D8C6`
- Pure `#000000` and `#FFFFFF`
- Material green `#4CAF50`, bright sage `#6ABE7B` (replaced by `{colors.jade}`)
- Bootstrap CU colors — replaced by Kente-harmonized `#8B6914` (High) / `#4A6741` (Medium)

**Only exceptions:** the print `page01_cover` and `page34_back_cover` may
retain `#1C0F00` for historical continuity of the physical cover.

## Typography
Four families, each with a precise role:
- **Cinzel** — All display headlines, supra labels, numeric display.
  Sovereign, Roman-inscribed, earned gravitas.
- **Cormorant** — Editorial serif body on Ivory scenes (Chairman quote,
  Discovery narrative). Never on dark backgrounds.
- **Inter** — UI body and data. Neutral, precise, never emotive.
- **Cairo + Noto Naskh Arabic** — Arabic system. `Cairo` for UI and body,
  `Noto Naskh Arabic` for formal long-form (quotes, doctrines).

Headings set on the 8pt grid. Letter-spacing on supra labels is aggressive
(`0.6em`–`0.7em`) — this is the signature of the Kangala voice.

## Spacing — 8-Point Grid
**All** margins, paddings, gaps, and line-heights snap to multiples of 4 or 8.
Random values (13px, 17px, 22px) are rejected. This is the mathematical
substrate of the sovereign feel — the eye reads harmony even when it cannot
name the cause.

Negative space **is** luxury. If a layout feels crowded, the fix is always to
**increase** line-height and padding, never to **shrink** fonts.

## Layered Depth System
Three tiers stack on the dark Sovereign surface:
1. **Tier 1 — Sovereign.** Solid `{colors.sovereign}`. Gold/ivory text only.
2. **Tier 2 — Azure Mist.** Glass overlay: `{colors.mist}` + gold border top
   3px, sides 1px. Inset shadow 0.5px at 8% gold. Midnight blue text if inside
   an ivory context, ivory text if inside a dark context.
3. **Tier 3 — Gold Whisper.** `rgba(184,149,74,0.06)` wash. Metric tiles,
   alternating table rows, subtle row striping.

## Motion
All motion uses the easing tokens above. Durations:
- **Micro (hover, focus):** 300–400ms, `{easing.silk}`
- **Reveal (scroll into view):** 1200–1500ms, `{easing.cinematic}`
- **Vault (hero/climax):** 2000–2500ms, `{easing.apple}`

No animation is bouncy, no spring overshoots. Ambient pulses (halos, kente
strips) loop at 2.4–3s, always at ≤40% opacity so they read as atmosphere.

## Components

### Gold Frame *(signature vessel)*
The 1.5px gold border at 35% opacity, inset 28px from the page edge, with an
inner glow of `inset 0 0 40px rgba(184,149,74,0.04)`. Header clears the frame
by **70–75px**. This frame is the single most recognizable element of the
brand; its proportions are law.

### HUD Card *(War Room glassmorphism)*
Transparent dark glass (`{components.hud-card}`). Used in FleetConvoy and
AssetArchitecture for floating data panels. Ultra-thin gold border (20%
opacity). Never layered more than two deep — nested glass dilutes the effect.

### Wax Seal *(final press)*
Closes the Invitation scene. The only circular, the only gold-on-gold element.
Its appearance signals **"the dossier is now sealed — the decision is yours."**

## Print & Web Parity
The system serves two targets:
- **Print (`Sovereign_Final/*.html`)** — A4 pages, 90° sharp corners only,
  no digital shadows, page breaks authored explicitly.
- **Web (`kangala-web`)** — Next.js + Tailwind + Framer Motion. Tokens here
  derive from this file; `tailwind.config.ts` should be regenerated from
  the YAML front matter rather than hand-edited.

## Workflow Rules
- **Screenshot-driven.** If the user provides a screenshot, its structural
  layout is **absolute law**, but its colors and fonts are overwritten with
  the Kangala palette.
- **Vertical integration narrative.** Every component must connect to the
  "Pit to Port" story (Mining → Transport → Trading).
- **No language mixing.** EN, FR, AR content lives in separate dictionary
  entries. Never render Arabic text inside an English-active scene, or
  vice-versa. Decorative bilingual flourishes are forbidden.
- **"21st.dev" rule.** Before writing complex motion from scratch (orbital
  menus, 3D cards, advanced carousels), consult high-end component sources
  and adapt to the Kangala brand.
- These rules are absolute. Do not ask for permission to apply them.

## Known Drift to Resolve
The following inconsistencies currently exist between surfaces and should be
reconciled in the next pass:
- `tailwind.config.ts` defines `sovereign.DEFAULT = #061022` while
  `globals.css` defines `--sovereign: #0A192F`. This file declares
  `{colors.sovereign} = #0A192F` as canonical. The Tailwind default should
  migrate to match.
- `_SYSTEM_RULES.md` (legacy) describes `Sovereign Deep (#061022)` as the
  primary background. This file supersedes that claim — `#061022` is the
  cinematic exception, not the default.
