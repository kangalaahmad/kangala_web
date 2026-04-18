# Kangala Sovereign — Web Experience

Apple-inspired cinematic web experience for Kangala Holding Group's Sovereign Investment Dossier.

## Stack

- **Next.js 14** (App Router)
- **React 18** + TypeScript
- **Framer Motion** — scroll animations, parallax, transitions
- **Lenis** — silky smooth scrolling (Apple-style)
- **Tailwind CSS** — utility styling

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Default password:** `KANGALA2026`

To change, create `.env.local`:
```
NEXT_PUBLIC_GATE_PASSWORD=YOUR_PASSWORD
```

## Architecture

```
app/
  layout.tsx          # Root layout, fonts, smooth scroll
  page.tsx            # Home page with all scenes
  globals.css         # Global styles + Tailwind

components/
  PasswordGate.tsx    # Cinematic entry gate
  SmoothScroll.tsx    # Lenis wrapper
  scenes/
    Hero.tsx          # Opening — KANGALA reveal
    Authority.tsx     # Presidential medals
    Numbers.tsx       # Investment metrics (count-up)
    Invitation.tsx    # CTA + contact + PDF download

lib/
  auth.ts             # Client-side password check

public/
  (PDFs, images — add as needed)
```

## Design Principles

1. **Ivory ↔ Sovereign Dark** alternation between scenes
2. **Gold** as primary accent (Pantone 871 C inspired)
3. **Typography hierarchy**: Cinzel (display) + Cairo (Arabic body)
4. **Scroll-driven** animations, not click-driven
5. **Parallax depth** — subtle, not gimmicky

## Roadmap

- [x] MVP: Gate + Hero + Authority + Numbers + Invitation (AR)
- [ ] Phase 2: The Land, Discovery, Machine scenes
- [ ] Phase 3: Governance + EN/FR language switcher
- [ ] Phase 4: Real assets (photos, video) + polish

## Production Notes

- Client-side password gate is a UX barrier, **not security**.
- For real access control, implement a server-side auth route.
- PDFs should be placed in `public/` to be downloadable.
