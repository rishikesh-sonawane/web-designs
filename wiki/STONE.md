# STONE

> *Built to endure. Designed to inspire.*

---

## The Brief

STONE is a luxury architectural residences website for five fictional European properties. Each property has a full identity — location, price, materials, floor plans, landmarks — and the site treats them with the same reverence a real estate agency would treat a €12 million listing.

This is the only project in the collection that uses a framework (Next.js). The decision was deliberate: STONE has multiple routes, interactive maps, SVG floor plans, image lightboxes, and structured data per property. That complexity warrants a framework. The other five projects prove you don't need one.

---

## The Feeling

> *You walk into a newly completed architectural residence. The floor is cool stone. The ceilings are three meters high. Through floor-to-ceiling glass, you see a lake you've never heard of. Nobody is selling you anything. The space speaks.*

That's what STONE should feel like. Not a real estate listing. An architectural experience.

---

## The Decisions

### Why Quiet Luxury?

Luxury real estate websites typically go two directions: dark and moody (think nighttime Dubai) or bright and clinical (think Swiss bank). STONE takes a third path — **quiet luxury**. The same aesthetic behind brands like Aesop, The Row, or Celine under Phoebe Philo.

The key principle: **if you have to announce you're premium, you probably aren't.**

### Why Cormorant Garamond?

The typeface needed to feel architectural — high contrast, elegant proportions, but not ornate. Cormorant Garamond has the weight of a Didone but the lightness of a geometric. At 300 weight, it looks like it's carved into stone.

### Why the Bone/Charcoal palette?

Real stone isn't white. It's warm, off-white, slightly灰色. `#1A1A1A` (Bone) as the primary background gives the site warmth without resorting to beige. `#F9F8F6` (Charcoal) for text ensures readability without the harshness of pure black.

---

## The Architecture

```
Mixed-Design/
├── app/
│   ├── layout.tsx              Root layout — fonts, metadata, analytics
│   ├── page.tsx                Home — featured residence + 3 cards
│   ├── globals.css             Full design system (898 lines)
│   ├── about/page.tsx          Brand story
│   ├── contact/page.tsx        Contact form
│   ├── enquire/page.tsx        Property enquiry
│   ├── explore/page.tsx        Filterable property explorer
│   ├── waitlist/page.tsx       Waitlist signup
│   ├── thank-you/page.tsx      Confirmation
│   └── residences/
│       └── [slug]/page.tsx     Dynamic property pages
│
├── components/                 34 React components
├── data/
│   └── properties.ts           All property data (TypeScript)
├── hooks/
│   └── useParallax.ts          Custom parallax hook
├── public/
│   └── architecture/           Property images
└── next.config.ts              Static export config
```

---

## The Properties

| Property | Location | Type | Area | Price |
|----------|----------|------|------|-------|
| Villa Serra | Como, Italy | Lakeside Villa | 6,200 sq ft | €8.2M |
| Casa Lago | Zurich, Switzerland | Lakefront | 4,800 sq ft | €6.5M |
| Residenza Bosco | Milan, Italy | Forest Estate | 8,500 sq ft | €12.1M |
| Villa Tramontana | Santorini, Greece | Cliffside | 5,400 sq ft | €7.8M |
| Casa Pietra | Tuscany, Italy | Hillside | 7,100 sq ft | €9.4M |

Each property has:
- **Materials** — Board-formed concrete, white oak, low-iron glass, Corten steel, etc.
- **Features** — Infinity pool, private dock, heated floors, wine cellar
- **Landmarks** — Airport distances, town centers, cultural sites
- **Images** — Hero, gallery (6+), floor plan

---

## Component Breakdown

### Layout (4)
| Component | Purpose |
|-----------|---------|
| `Header` | Fixed nav with hamburger menu (mobile), 4 items |
| `Footer` | Minimal with links, copyright |
| `PageTransition` | Fade/slide between routes via Framer Motion |
| `Breadcrumbs` | Schema.org structured data, breadcrumb navigation |

### Property (6)
| Component | Purpose |
|-----------|---------|
| `Gallery` | Image grid with lightbox, keyboard/swipe nav |
| `Hero` | Full-bleed property hero with parallax |
| `FloorPlan` | Interactive SVG — hover reveals room names/areas |
| `MapView` | Leaflet map with CartoDB Positron tiles |
| `EnquiryForm` | Property-specific contact with Formspree |
| `SkeletonImage` | Loading placeholder with shimmer animation |

### UI (8)
| Component | Purpose |
|-----------|---------|
| `MagneticButton` | Cursor-tracking button with smooth lag |
| `SplitText` | Letter-by-letter animation |
| `AnimatedNumber` | Counting stats with easing |
| `Toast` | Notification system |
| `CookieConsent` | GDPR banner with localStorage |
| `BackToTop` | Scroll-to-top button |
| `FAQ` | Accordion with animated expand |
| `Reviews` | Testimonial cards |

### Effects (8)
| Component | Purpose |
|-----------|---------|
| `CustomCursor` | Dot + ring with mix-blend-mode |
| `ScrollProgress` | 3px top progress bar |
| `NoiseOverlay` | SVG feTurbulence texture |
| `PageLoader` | Initial loading animation |
| `ParallaxHero` | Depth effect on scroll |
| `LazySection` | Viewport-based loading |
| `HorizontalScroll` | Horizontal scroll section |
| `ImageCompare` | Before/after slider |

---

## Interactive Features

### Floor Plans

SVG-based floor plans with:
- **Hover states** — Room names and areas appear on hover
- **Color coding** — Different zones (living, sleeping, outdoor) in different tones
- **Responsive scaling** — SVG viewBox adapts to container
- **Accessibility** — ARIA labels on each room group

### Maps

Leaflet integration with CartoDB Positron tiles (minimal, matches the design):
- Custom property markers
- Popup with property summary
- Zoom controls
- Scroll wheel zoom disabled by default (prevents scroll hijacking)

### Lightbox

Full-screen image viewer:
- Keyboard navigation (←/→/Esc)
- Touch swipe support
- Image counter ("3 / 7")
- Close button
- Body scroll lock when open

---

## Design Tokens

```css
:root {
  /* Colors */
  --color-bone:        #1A1A1A;
  --color-limestone:   #222222;
  --color-charcoal:    #F9F8F6;
  --color-bronze:      #9E9A93;
  --color-moss:        #A8B5A4;

  /* Typography */
  --font-display:      'Cormorant Garamond', serif;
  --font-body:         'Inter', sans-serif;

  /* Spacing */
  --gutter:            clamp(24px, 4vw, 40px);
  --section-gap:       clamp(80px, 12vw, 160px);

  /* Layout */
  --nav-h:             72px;
  --max-w:             1200px;
}
```

---

## Deployment

### Static Export
```bash
npm run build
# Output: out/ directory (all static HTML)
```

### Vercel Config
```typescript
// next.config.ts
const nextConfig = {
  output: "export",        // Static export
  trailingSlash: true,     // /about/ not /about
  unoptimized: true,       // No image optimization (static)
  basePath: "/web-designs/Mixed-Design",
  assetPrefix: "/web-designs/Mixed-Design",
};
```

### GitHub Pages
The `out/` directory contents are committed to the `main` branch. The `.nojekyll` file at the repo root disables Jekyll processing.

---

## The Problems

### 1. Mobile Hamburger Menu
**Problem:** The hamburger menu appeared broken on mobile — only "Residences" was visible, the rest required scrolling.

**Root cause:** The nav panel had `position: fixed; top: 0` with `padding: calc(var(--nav-h) + 48px)` at the top, pushing content too far down.

**Fix:** Changed to `top: var(--nav-h)` (starts below the navbar) with reduced padding (`24px`). Also increased z-index to `9999` to ensure it sits above the noise overlay (`9998`).

### 2. Vercel Deployment Conflicts
**Problem:** Two Vercel projects pointed to the same repo — the old one (root directory) kept failing because there was no `package.json` at the root.

**Fix:** Deleted the old Vercel project. The new project (root directory set to `Mixed-Design`) is the only one.

### 3. GitHub Pages + Jekyll
**Problem:** Jekyll processing was interfering with the static HTML files.

**Fix:** Added `.nojekyll` at the repo root.

---

## Lessons Learned

1. **Next.js static export is powerful** for portfolio sites that need routing but not a server. The `output: "export"` option gives you the best of both worlds.

2. **Tailwind CSS v4's new engine** is significantly faster. The build time dropped from ~8s to ~3s.

3. **Leaflet's default tiles** clash with custom designs. CartoDB Positron (light, minimal) is a better fit for luxury brands.

4. **SVG floor plans** are more flexible than image-based plans. Hover states, responsiveness, accessibility — all built in.

5. **Noise overlays need z-index management.** A full-screen SVG overlay at z-index 9998 will cover everything if you're not careful. Interactive elements need to be above it.

6. **The featured property matters.** Swapping from Villa Serra to Residenza Bosco (the most expensive, largest property) immediately changed the perceived quality of the site.

---

*Last updated: September 2026*
