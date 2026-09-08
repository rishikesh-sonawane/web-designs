# STONE — Deep Dive

## Overview

STONE is a luxury architectural residences website for five fictional European properties. It's the only project in the collection using a framework (Next.js), chosen for its complexity: multiple routes, interactive maps, SVG floor plans, image lightboxes, and structured data per property.

**Live:** [stone-residences.vercel.app](https://web-designs-by-rishi-11y8i6eaz-rishikesh-sonawanes-projects.vercel.app/)  
**Directory:** `Mixed-Design/`  
**Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + Framer Motion + Leaflet

---

## Architecture

```
Mixed-Design/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home — featured + 3 property cards
│   ├── globals.css         # Full design system (898 lines)
│   ├── about/page.tsx      # Brand story
│   ├── contact/page.tsx    # Contact form
│   ├── enquire/page.tsx    # Property enquiry
│   ├── explore/page.tsx    # Filterable property explorer
│   ├── waitlist/page.tsx   # Waitlist signup
│   ├── thank-you/page.tsx  # Confirmation
│   └── residences/
│       └── [slug]/page.tsx # Dynamic property pages
├── components/             # 34 React components
├── data/
│   └── properties.ts       # All property data
├── hooks/
│   └── useParallax.ts      # Custom parallax hook
├── public/
│   └── architecture/       # Property images
├── next.config.ts          # Static export config
├── tailwind.config.ts      # Design tokens
└── package.json
```

---

## Design Language

### Philosophy
> *Quiet luxury doesn't announce itself. It doesn't need to.*

STONE channels the feeling of walking into a newly completed architectural residence — the cool touch of stone, the silence of well-insulated glass, the confidence of materials chosen for permanence.

### Color System

| Token | Hex | Use |
|-------|-----|-----|
| Bone | `#1A1A1A` | Primary background |
| Limestone | `#222222` | Card surfaces, secondary bg |
| Charcoal | `#F9F8F6` | Primary text |
| Bronze | `#9E9A93` | Secondary text, borders |
| Moss | `#A8B5A4` | Accent, links, hover states |

### Typography
- **Display:** Cormorant Garamond (300–600) — Elegant, high-contrast serif
- **Body:** Inter (300–500) — Clean, readable sans-serif

### Motion
- Page transitions via Framer Motion
- Scroll-triggered reveals
- Parallax hero effect
- Custom cursor with smooth lag

---

## Components

### Layout
- `Header` — Fixed nav with hamburger menu (mobile)
- `Footer` — Minimal with links
- `PageTransition` — Fade/slide between routes

### Property
- `Gallery` — Image grid with lightbox
- `Hero` — Full-bleed property hero
- `FloorPlan` — Interactive SVG (hover for room details)
- `MapView` — Leaflet map with property pin
- `EnquiryForm` — Property-specific contact
- `Breadcrumbs` — Schema.org structured data

### UI
- `MagneticButton` — Cursor-tracking button
- `SplitText` — Letter-by-letter animation
- `AnimatedNumber` — Counting stats
- `Toast` — Notification system
- `CookieConsent` — GDPR banner
- `BackToTop` — Scroll-to-top
- `SkeletonImage` — Loading placeholder

### Effects
- `CustomCursor` — Dot + ring cursor
- `ScrollProgress` — Top progress bar
- `NoiseOverlay` — SVG texture
- `PageLoader` — Initial loading animation
- `ParallaxHero` — Depth effect on scroll
- `LazySection` — Viewport-based loading

---

## Property Data Schema

```typescript
interface Property {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  country: string;
  price: string;
  specs: {
    area: string;
    bedrooms: number;
    bathrooms: number;
    floors: number;
  };
  materials: { name: string; description: string }[];
  features: string[];
  landmarks: { name: string; distance: string }[];
  images: {
    hero: string;
    gallery: string[];
    floorPlan: string;
  };
}
```

---

## Interactive Features

### Floor Plans
SVG-based floor plans with:
- Hover to reveal room names
- Area labels per room
- Color-coded zones
- Responsive scaling

### Maps
Leaflet integration with:
- CartoDB Positron tiles (minimal, matches design)
- Custom property markers
- Popup with property info
- Zoom controls

### Lightbox
Full-screen image viewer with:
- Keyboard navigation (←/→/Esc)
- Touch swipe support
- Image counter
- Close button

---

## Deployment

### Static Export
```bash
npm run build
# Output: out/ directory
```

### Vercel Config
```typescript
// next.config.ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
  unoptimized: true,
  basePath: "/web-designs/Mixed-Design",
  assetPrefix: "/web-designs/Mixed-Design",
};
```

### GitHub Pages
The `out/` directory contents are committed to `main` branch for GitHub Pages serving.

---

## Known Issues

1. **Image resolution** — Gallery images are 640px wide; soft on retina displays
2. **Mobile hamburger** — Was broken (z-index conflict with noise overlay); fixed with `z-index: 9999`
3. **Build size** — Static export includes all 5 properties even if not all are needed

---

## Lessons Learned

- Next.js static export is powerful for portfolio sites that need routing but not a server
- Tailwind CSS v4's new engine is significantly faster
- Leaflet's default tiles clash with custom designs; CartoDB Positron is a better fit
- SVG floor plans are more flexible than image-based plans (hover states, responsiveness)
- Noise overlays need explicit `z-index` management to avoid covering interactive elements
