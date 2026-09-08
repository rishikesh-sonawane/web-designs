# Web Designs Wiki

A living document for the **Web Designs** collection — six concept projects exploring six distinct design languages, plus the portfolio that holds them together.

> *Six projects. Six design languages. Zero templates.*

---

## Table of Contents

1. [Portfolio](#portfolio)
2. [STONE](#01--stone)
3. [OCHRE](#02--ochre)
4. [KEEL](#03--keel)
5. [ATELIER & CO](#04--atelier--co)
6. [LUMEN](#05--lumen)
7. [LAYER](#06--layer)
8. [Case Studies](#case-studies)
9. [Design System](#design-system)
10. [Deployment](#deployment)
11. [FAQ](#faq)

---

## Portfolio

**What:** A single-page editorial portfolio showcasing six design concept projects.

**Where:** [rishikesh-sonawane.github.io/web-designs](https://rishikesh-sonawane.github.io/web-designs/)

**Design:** Warm editorial — terracotta on cream, Fraunces serif + Inter sans.

**Stack:** Pure HTML5 + CSS3 + Vanilla JavaScript. Zero dependencies.

### Sections
- **Hero** — Name, title, editorial tagline
- **Selected Work** — Six project cards with hover states (flip, offset, center variants)
- **Services** — Three offerings with 3D tilt cards
- **Process** — Four-step methodology
- **Design + Engineering** — Philosophy statement
- **About** — Bio with social links (GitHub, LinkedIn, Instagram)
- **Contact** — Formspree-powered form with validation
- **Footer** — Copyright, back-to-top

### Premium Features
- Custom cursor (dot + ring with mix-blend-mode)
- Scroll progress bar (3px, accent color)
- Noise overlay (SVG feTurbulence)
- Page loader with letter-stagger animation
- Magnetic buttons with cursor tracking
- Editorial link underline wipe
- Cookie consent with localStorage persistence
- Now Playing widget (decorative)
- Scroll reveal animations via IntersectionObserver
- prefers-reduced-motion support throughout

---

## 01 — STONE

**What:** A luxury architectural residences website for fictional European properties.

**Where:** [stone-residences.vercel.app](https://web-designs-by-rishi-11y8i6eaz-rishikesh-sonawanes-projects.vercel.app/)

**Design:** Quiet Luxury + Swiss Editorial + Architectural Minimalism

**Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + Framer Motion + Leaflet

**Directory:** `Mixed-Design/`

### Properties

| Property | Location | Type | Sq ft | Price |
|----------|----------|------|-------|-------|
| Villa Serra | Como, Italy | Lakeside Villa | 6,200 | €8.2M |
| Casa Lago | Zurich, Switzerland | Lakefront | 4,800 | €6.5M |
| Residenza Bosco | Milan, Italy | Forest Estate | 8,500 | €12.1M |
| Villa Tramontana | Santorini, Greece | Cliffside | 5,400 | €7.8M |
| Casa Pietra | Tuscany, Italy | Hillside | 7,100 | €9.4M |

### Pages
- `/` — Home with featured residence
- `/explore` — Filterable property explorer
- `/residences/[slug]` — Individual property pages
- `/about` — Brand story
- `/contact` — Contact form
- `/enquire` — Property enquiry
- `/waitlist` — Waitlist signup
- `/thank-you` — Confirmation page

### Design Tokens
```
Bone .............. #1A1A1A
Limestone ......... #222222
Charcoal .......... #F9F8F6
Bronze ............ #9E9A93
Moss .............. #A8B5A4
Font Display ...... Cormorant Garamond
Font UI ........... Inter
```

### Components (34)
Gallery, Hero, FloorPlan, MapView, EnquiryForm, Lightbox, MagneticButton, SplitText, ParallaxHero, ScrollProgress, CustomCursor, NoiseOverlay, PageLoader, Toast, CookieConsent, BackToTop, SkeletonImage, Breadcrumbs, FAQ, Reviews, ImageCompare, AnimatedNumber, HorizontalScroll, LazySection, PageTransition, TiltCard, and more.

### Key Features
- Interactive SVG floor plans with room labels
- Leaflet maps with CartoDB Positron tiles
- Full-screen image lightbox (keyboard + swipe)
- Filterable property explorer
- Parallax hero effect
- Static export for Vercel deployment
- Schema.org structured data per property

---

## 02 — OCHRE

**What:** A brand website for a fictional Mediterranean natural-dye house in Ronda, Spain.

**Where:** [rishikesh-sonawane.github.io/web-designs/Bohemian/](https://rishikesh-sonawane.github.io/web-designs/Bohemian/)

**Design:** Bohemian / Boho-chic editorial

**Stack:** Pure HTML5 + CSS3 + Canvas 2D API + Vanilla JS

**Directory:** `Bohemian/`

### Brand Identity
- **Origin:** Ronda, Spain — a pueblo blanco perched above a gorge
- **Heritage:** Three generations of natural-dye artisans
- **Philosophy:** "Cloth remembers the hands that make it"
- **Materials:** Indigo, pomegranate, walnut, madder root

### Design Language
- **Palette:** Terracotta (#C4632A), Linen (#F5F0E6), Sand (#D8C9A3)
- **Typography:** Playfair Display (display) + Plus Jakarta Sans (body) + Caveat (handwritten accents)
- **Motifs:** Arch shapes at three scales, botanical illustrations, linen texture

### Unique Features
- **Canvas-drawn artwork** — Every visual (pottery, textiles, botanicals, ceramics) drawn at runtime via Canvas 2D
- **Interactive dye-bath selector** — Click a dye source, watch cloth change color in real-time
- **Floating botanical particles** — Emoji botanicals drifting across the viewport
- **Arch motifs** — Hero frame, courtyard sections, dye plates
- **Linen texture overlay** — CSS repeating gradients mimicking woven fabric
- **Bilingual navigation** — Spanish/English toggle
- **Live clock** — Footer clock in Caveat handwritten font

### Files
- `index.html` — Main page
- `styles.css` — Design system
- `script.js` — Interactions + Canvas drawing
- `DESIGN-GUIDE.md` — Design language reference
- `DESIGN-SPEC.md` — Implementation specification
- `BRAND.md` — Brand identity guidelines
- `AUDIT.md` — Quality audit

---

## 03 — KEEL

**What:** A product page for a fictional DevOps deployment control plane.

**Where:** [rishikesh-sonawane.github.io/web-designs/Bento-Grid/](https://rishikesh-sonawane.github.io/web-designs/Bento-Grid/)

**Design:** Bento grid / Technical minimalism

**Stack:** Pure HTML5 + CSS Grid + Canvas 2D API + Vanilla JS

**Directory:** `Bento-Grid/`

### Brand Identity
- **Name:** KEEL — like a ship's keel, keeping production steady
- **Tagline:** "Production, kept steady"
- **Palette:** Paper (#FAFAF9), Ink (#1C1917), Sage (#A8B5A4)
- **Typography:** Inter (UI) + JetBrains Mono (code/metrics)

### Bento Grid Cells (15+)
1. Deploy stages (build → test → canary → fleet)
2. Live sparkline chart
3. UTC clock
4. SLO error-budget gauge
5. Service map with request topology
6. Interactive line chart (7D/30D/90D/1Y)
7. Performance gauge with gradient arc
8. Switchboard controls (sliders, toggles)
9. Palette swatches (click-to-copy)
10. Live metrics counter
11. Toast notification system
12. Dark mode toggle
13. Deploy queue
14. Recent events
15. System health indicators

### Key Features
- **Canvas 2D charts** — All charts drawn at runtime, no libraries
- **Dark mode toggle** — Full canvas re-render on theme switch
- **Clipboard API** — Click color swatches to copy hex values
- **Live control room** — Simulated deploy pipeline with stage transitions
- **SLO gauge** — Animated needle showing error budget consumption
- **Separate case study** — `case-study.html` + `case-study.css` documenting the design process

### Files
- `index.html` — Main page
- `styles.css` — Design system (CSS Grid)
- `script.js` — Interactions + Canvas drawing
- `case-study.html` — Design case study
- `case-study.css` — Case study styles
- `DESIGN-GUIDE.md` — Design language reference
- `DESIGN-SPEC.md` — Implementation specification
- `BRAND.md` — Brand identity
- `BUG-STORIES.md` — Bug documentation

---

## 04 — ATELIER & CO

**What:** A luxury leather-goods brand website with hyper-realistic skeuomorphic materials.

**Where:** [rishikesh-sonawane.github.io/web-designs/Skeuo/](https://rishikesh-sonawane.github.io/web-designs/Skeuo/)

**Design:** Skeuomorphism / Tactile luxury

**Stack:** Pure HTML5 + CSS3 + SVG Filters + Vanilla JS

**Directory:** `Skeuo/`

### Material Textures (All CSS, Zero Images)
| Material | Technique |
|----------|-----------|
| Leather | SVG `feTurbulence` filter + gradients |
| Wood grain | Repeating linear gradients |
| Brushed metal | Conic gradient + noise |
| Glass | `backdrop-filter: blur()` |
| Linen | Repeating CSS gradients |
| Plastic | Gradient + subtle noise |

### Design Language
- **Palette:** Leather (#8B6C4A), Chrome (#C0C0C0), Walnut (#5C4033)
- **Typography:** Playfair Display (display) + Inter (body)
- **Shadows:** 4-layer formula with reflected light
- **Edges:** Beveled (inner highlight + inner shadow)
- **Buttons:** Physical press-to-depress with inverted shadows

### Key Features
- **Zero texture images** — Every surface is CSS gradients and SVG filters
- **Floating control panel** — Draggable, localStorage-persisted, with 3 sliders:
  - Shadow depth (0–30)
  - Bevel width (0–6)
  - Corner radius (0–30px)
- **4 presets:** Default, Flat, Deep, Extreme
- **Spotlight effect** — Cursor-following radial highlight on cards
- **Magnetic pull** — Buttons attract toward cursor
- **Material ripple** — Material-style click ripple on buttons
- **Chrome specular highlights** — Realistic light reflections
- **Leather-textured toasts** — Notification toasts with leather texture

### Files
- `index.html` — Main page
- `styles.css` (~1,400 lines) — Full design system
- `script.js` (~500 lines) — Interactions + control panel
- `DESIGN-GUIDE.md` — Design language reference
- `Plan.md` — Development notes

---

## 05 — LUMEN

**What:** A SaaS analytics product website built around the physics of emitted light.

**Where:** [rishikesh-sonawane.github.io/web-designs/DarkMode-UI/](https://rishikesh-sonawane.github.io/web-designs/DarkMode-UI/)

**Design:** Premium dark mode / Atmospheric

**Stack:** Pure HTML5 + CSS3 + Canvas 2D API + Vanilla JS

**Directory:** `DarkMode-UI/`

### Obsidian Layer System
| Level | Color | Use |
|-------|-------|-----|
| Depth 0 | `#090D16` | Background |
| Depth 1 | `#111827` | Card surfaces |
| Depth 2 | `#1F2937` | Elevated elements |
| Depth 3 | `#374151` | Interactive states |

### Luminescent Palette
- **Cyan** `#00F0FF` — Primary accent, charts, glows
- **Violet** `#8B5CF6` — Secondary accent, navigation
- **Amber** `#F59E0B` — Warnings, highlights

### Key Features
- **Cursor-following radial glow** — Feature cards light up as cursor moves over them (CSS custom properties `--mouse-x`/`--mouse-y`)
- **Light-pipe navigation** — Color-shifting accent line (cyan → violet on scroll)
- **Canvas chart** — Live line chart with cyan glow and gradient fill
- **Keycap buttons** — 3D buttons with glow projection on hover, depression on click
- **Cosmic shadows** — Shadows with faint neon tint
- **Specular hairlines** — 1px borders with subtle light reflection
- **Dashboard** — Animated metric cards, glowing progress bars
- **Telemetry ticker** — Scrolling metrics in footer
- **Pulsing status dots** — Green indicators with breathing animation

### Files
- `index.html` — Main page
- `styles.css` — Design system
- `script.js` — Interactions + Canvas drawing
- `DESIGN-GUIDE.md` — Design language reference
- `Plan.md` — Development notes

---

## 06 — LAYER

**What:** A Material Design 3 component library showcase presented as a real SaaS product.

**Where:** [rishikesh-sonawane.github.io/web-designs/Material-Design/](https://rishikesh-sonawane.github.io/web-designs/Material-Design/)

**Design:** Material Design 3 / Systematic

**Stack:** Pure HTML5 + CSS3 + SVG + Vanilla JS

**Directory:** `Material-Design/`

### MD3 Token System
- **398 of 412 CSS variables** draw from the token system
- **13 semantic color pairs** (primary, secondary, tertiary, error + surface variants)
- **5 shape tokens** (none, extra-small, small, medium, large, full)
- **3 motion tokens** (standard, emphasized, standard-decelerate)
- **10 elevation levels** (dp 0 through dp 24)

### Key Features
- **Full dashboard** — Nav rail, stats with sparklines, revenue chart, activity feed, project progress
- **SVG path morph chart** — Segmented chart toggles between week/month/year with smooth path transitions
- **Floating control panel** — Adjustable border-radius, elevation scale, motion speed
- **Material ripple effects** — Click ripple on all buttons
- **Spotlight cursor** — Cards follow mouse position
- **Staggered scroll reveals** — 80ms delay per sibling element
- **Counter animations** — Stats count up on scroll
- **Snackbar toasts** — Auto-dismiss notifications
- **93 ARIA attributes** — Full accessibility
- **content-visibility: auto** — Performance optimization on below-fold sections

### Files
- `index.html` (1,076 lines) — Main page
- `styles.css` (2,350 lines) — Complete MD3 design system
- `script.js` (521 lines) — Interactions
- `DESIGN-GUIDE.md` — Design language reference
- `Plan.md` — Development notes

---

## Case Studies

Each project has a dedicated case study page in `work/`:

| # | Project | Case Study | Accent Color |
|---|---------|------------|--------------|
| 01 | STONE | [work/stone/](work/stone/) | `#A8B5A4` (Moss) |
| 02 | OCHRE | [work/ochre/](work/ochre/) | `#C4632A` (Terracotta) |
| 03 | KEEL | [work/keel/](work/keel/) | `#6B7280` (Slate) |
| 04 | ATELIER | [work/atelier/](work/atelier/) | `#8B6C4A` (Leather) |
| 05 | LUMEN | [work/lumen/](work/lumen/) | `#00F0FF` (Cyan) |
| 06 | LAYER | [work/layer/](work/layer/) | `#6366F1` (Indigo) |

**Navigation chain:** OCHRE → KEEL → ATELIER → LUMEN → LAYER → STONE → OCHRE (circular)

Each case study covers:
- Overview & context
- Design direction (typography, color, layout, materials, interaction)
- Key experience walkthrough
- Technology decisions
- Outcome & reflection

---

## Design System

The portfolio shares a unified design system across the landing page and all case studies.

### Tokens
```css
--bg: #F7F4EF        /* Warm cream */
--ink: #1F1B16        /* Deep brown-black */
--accent: #A4592F     /* Terracotta */
--muted: #6B645A      /* Warm gray */
--border: #D6CFC5     /* Subtle divider */
```

### Typography
- **Display:** Fraunces (variable weight, optical size)
- **Body:** Inter (300–700)

### Spacing
8px grid: `--s1` (8px) through `--s7` (128px)

### Layout
- Max-width: 1200px
- Gutter: 24px (mobile) → 40px (desktop)
- Nav height: 72px

---

## Deployment

### GitHub Pages (Portfolio + 5 Projects)
- **Branch:** `main`
- **URL:** `rishikesh-sonawane.github.io/web-designs/`
- **Setup:** Jekyll disabled via `.nojekyll` at repo root
- **Note:** Portfolio HTML files served directly; no build step

### Vercel (STONE)
- **Root Directory:** `Mixed-Design`
- **Build:** `npm run build` → static export to `out/`
- **URL:** `stone-residences.vercel.app`
- **basePath:** `/web-designs/Mixed-Design`

---

## FAQ

### Why no frameworks for five of six projects?
To demonstrate mastery of the raw web platform. CSS Grid, Canvas 2D, SVG filters, vanilla JS — these are the foundations. Frameworks are tools, not crutches.

### How are the Canvas 2D graphics drawn?
All charts, gauges, and generative art use the Canvas 2D API directly. No D3, no Chart.js, no external libraries. Each project's `script.js` contains the drawing logic.

### Can I use these designs for my own projects?
These are concept projects for portfolio purposes. The code is open for learning, but the designs and brand identities are fictional.

### Why does STONE use Next.js while the others don't?
STONE is the most complex project — 5 properties, multiple routes, interactive maps, floor plans, lightboxes. Next.js App Router with static export was the right tool for that scale. The other projects demonstrate that complex UI is possible without any framework.

### How do the floating control panels work?
Three projects (Skeuo, LAYER, KEEL) feature draggable control panels that modify CSS custom properties in real-time. Changes persist to localStorage. The panels use `position: fixed` with `pointer-events` management and drag handlers.

---

*Last updated: September 2026*
