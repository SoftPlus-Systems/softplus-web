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

## Project structure

```
app/                 Next.js app router (layout, page, global styles)
components/           Shared UI (nav, cursor, buttons, preloader, backgrounds)
components/sections/  One component per landing-page section
hooks/                 Reusable animation hooks (magnetic buttons, reduced motion)
lib/                   Static content (lib/data.ts) and GSAP setup
```

## Notes

- Respects `prefers-reduced-motion` throughout (preloader, cursor, smooth scroll,
  scroll-triggered animations all degrade gracefully).
- The 3D hero centerpiece and custom cursor are disabled on touch devices / narrow
  viewports for performance.
