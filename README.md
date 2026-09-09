# Soft+Systems

Marketing site for Soft Plus Systems — a software studio building ERP, accounting,
stock, POS, mobile app and web platforms for operators who run on precision.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS for the design system
- GSAP + ScrollTrigger for scroll-driven choreography (pinned statement section,
  process timeline, word-reveal storytelling)
- Framer Motion for component-level motion (mobile menu, service explorer, card tilt)
- React Three Fiber / Three.js for the hero's animated plus-lattice centerpiece
- Lenis for smooth scrolling

All content (client logos, case studies, testimonials, contact details) is
placeholder copy — swap `lib/data.ts` for real content before launch.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Images

Originals live in `source-images/`, which is never served. `npm run images`
(wired into `predev` and `prebuild`, so it runs on its own) converts every
raster file there into a WebP at the same path under `public/`, capped at
1600px wide. Reference the generated `.webp` path from components — the site
never points at a PNG or JPG.

Adding an image means dropping it into `source-images/` and using its `.webp`
counterpart; a conversion is skipped when the output is already newer than its
source, so repeat builds cost nothing. The current set is 3.2 MB of PNG served
as 380 KB of WebP.

## Project structure

```
app/                  Next.js app router (layout, page, global styles)
components/           Shared UI (nav, cursor, buttons, preloader, backgrounds)
components/sections/  One component per landing-page section
hooks/                Reusable animation hooks (magnetic buttons, reduced motion)
lib/                  Static content (lib/data.ts), GSAP setup, intro handshake
scripts/              Build tooling (image conversion)
source-images/        Image originals — converted into public/, not served
```

## Notes

- Respects `prefers-reduced-motion` throughout (preloader, cursor, smooth scroll,
  scroll-triggered animations all degrade gracefully).
- The 3D hero centerpiece and custom cursor are disabled on touch devices / narrow
  viewports for performance. The WebGL render loop and the CTA particle canvas
  also stop entirely while off screen or in a background tab.
- The preloader waits on the real page load (capped at 900ms) and skips itself on
  repeat views in the same tab. It announces completion via `lib/intro.ts`, which
  is what the hero timeline waits on — no hand-tuned delays.
