# Layer — Production-Ready Material Design Components

A premium, portfolio-grade Material Design 3 component library showcase built with semantic HTML5, CSS custom properties, and vanilla JavaScript.

## Live Preview

Open `index.html` in any modern browser.

---

## Case Study

### The Challenge

Material Design is one of the most widely implemented design systems in the world — yet most Material-inspired websites feel generic, template-like, and indistinguishable from each other. The challenge was to build a Material Design showcase that feels **genuinely premium** — something a potential client would look at and think: *"This team understands product design at a level most studios don't."*

### What We Built

**Layer** is a fictional component library product that demonstrates systematic elevation, dynamic color, accessible interactions, and coherent motion language. The entire experience is designed to feel like a real, funded SaaS product — not a design system demo or coding experiment.

### Design Decisions

**Why Material Design?** Material Design is the most commercially relevant design language for SaaS and product work. Showing mastery of MD3 signals to potential clients: *"We can build interfaces that feel familiar, professional, and trustworthy."*

**Why a component library?** A component library is the most technically demanding type of website to showcase. It requires:
- Systematic consistency across every element
- A coherent design token system
- Interactive demonstrations that work flawlessly
- Accessibility that actually holds up under scrutiny

**Why no frameworks?** The entire project is built with semantic HTML5, CSS custom properties, and vanilla JavaScript. This demonstrates that the studio can deliver clean, maintainable, dependency-free code — not just wire up React components.

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Asymmetric feature layout** | Breaks the monotony of card grids; shows editorial design sensibility |
| **Dashboard as hero preview** | The product is a component library — showing the dashboard immediately proves the components work |
| **Counter animations on stats** | Numbers counting up create a sense of activity and life; far more engaging than static numbers |
| **Sparkline charts in stat cards** | Tiny trend lines communicate data richness without requiring a separate analytics section |
| **Dark mode as first-class** | Full theme system with smooth transitions proves attention to detail |
| **Control panel** | Interactive customization of radius/elevation/motion lets visitors understand the design system viscerally |
| **Staggered scroll reveals** | Creates visual rhythm and guides attention; 80ms stagger feels deliberate without being slow |
| **Active nav highlighting** | Provides orientation without being heavy-handed; IntersectionObserver-based for accuracy |

### What This Project Demonstrates

| Capability | Evidence |
|------------|----------|
| **Design systems thinking** | 13 semantic color pairs, 5 shape tokens, 3 motion tokens, 10 elevation levels — all as CSS custom properties |
| **Interaction design** | 12+ microinteractions, all purposeful; nothing decorative without function |
| **Accessibility** | 93 ARIA attributes, skip navigation, keyboard support, reduced motion, 48px touch targets |
| **Responsive design** | 4 breakpoints with mobile-first refinements; dashboard reflows gracefully |
| **Performance** | content-visibility, passive listeners, GPU-only animations, no framework overhead |
| **Commercial judgment** | Clear conversion paths, believable pricing, social proof, FAQ — the page sells |
| **Code quality** | Zero dependencies, single-file architecture, 398/412 CSS variables use the token system |

### Client Relevance

| Client Type | What This Proves |
|-------------|-----------------|
| **SaaS startup** | "We can build your product interface from scratch" |
| **Enterprise** | "We understand systematic, accessible design" |
| **Agency** | "We can deliver production-grade design systems" |
| **E-commerce** | "We know how to build trustworthy, conversion-focused interfaces" |

### Before → After

| Aspect | Before (Original) | After (Polished) |
|--------|-------------------|-------------------|
| Identity | Generic "Material Design" demo | "Layer" — believable SaaS product |
| Sections | 7 flat sections | 11 structured commercial flow |
| Dashboard | Basic stats + chart | Full dashboard with sparklines, activity feed, projects |
| Interactions | Basic hover + ripples | Staggered reveals, counters, active nav, spotlight |
| Accessibility | Minimal | 93 ARIA attrs, skip link, reduced motion |
| Responsive | Basic | 4 breakpoints, mobile-first |
| Performance | None | content-visibility, passive listeners, GPU animations |
| Social proof | None | Testimonials, FAQ, Final CTA |

---

## Architecture

| File | Lines | Purpose |
|------|:-----:|---------|
| `index.html` | 1,076 | Semantic HTML5 with 11 sections |
| `styles.css` | 2,350 | Complete MD3 design token system, light/dark themes, all component styles, responsive, animations |
| `script.js` | 521 | Navigation, chart toggle, form validation, snackbar, control panel, ripples, spotlight, scroll reveals, counter animations, theme toggle, back-to-top |

## Design System

### Color Tokens
- **Light mode**: MD3 Purple scheme (`#6750A4` primary)
- **Dark mode**: Full dark theme (`#D0BCFF` primary on `#1C1B1F` surface)
- **13 semantic color pairs** (primary, secondary, tertiary, error, surface variants)

### Typography
- **Primary**: Inter (300–800)
- **Mono**: Roboto Mono (400, 500)
- **MD3 Type Scale**: Display, Headline, Title, Body, Label — all defined as CSS custom properties

### Elevation
- **10 levels** (dp 0–24) with authentic MD3 shadow specifications
- **Physical hover**: Cards lift 2–4px on hover with deeper shadows

### Spacing
- **8px grid system** with consistent section padding (80px desktop, 60px mobile)

### Motion
- **4 easing curves**: standard, emphasized, decelerate, accelerate
- **3 duration tokens**: short (100ms), medium (300ms), long (500ms)
- **Control panel**: Adjustable radius, elevation, and motion speed in real-time

### Shape
- **5 radius tokens**: xs (8px), sm (12px), default (16px), lg (28px), full (9999px)

## Page Sections

1. **Navigation** — Fixed top bar with logo, links, theme toggle, CTA. Sticky shadow on scroll.
2. **Hero** — Split layout with product intro + mini dashboard preview with real data. Staggered entrance animation.
3. **Features** — Asymmetric layout: hero card with elevation visual + 3 feature cards.
4. **Elevation Showcase** — Interactive dp 0–24 demonstration with hover lift.
5. **Components** — Full library showcase: cards, buttons, chips, switches, checkboxes, sliders, text fields.
6. **Dashboard** — Complete Material Design dashboard with nav rail, stats with sparklines, revenue chart (week/month/year), activity feed, and active projects with progress bars.
7. **Testimonials** — 3 social proof cards with quotes.
8. **Pricing** — 3-tier pricing (Starter/Professional/Enterprise) with featured highlight.
9. **FAQ** — 5 expandable questions with smooth animation.
10. **Final CTA** — Conversion section with trust badge, proof points, and primary + secondary actions.
11. **Contact** — Form with validation, error states, and success feedback.
12. **Snackbar Demo** — Interactive toast notification triggers.
13. **Control Panel** — Live customization of radius, elevation, and motion.

## Interactive Features

| Feature | Implementation |
|---------|---------------|
| **Hero entrance** | Staggered fade-in with 150ms delays between elements |
| **Theme toggle** | Light/dark with system preference detection, localStorage persistence |
| **Scroll reveals** | IntersectionObserver with staggered delays (80ms per sibling) |
| **Counter animations** | Stats count up from 0 with ease-out cubic |
| **Active nav highlight** | Current section detected via IntersectionObserver |
| **Chart toggle** | Week/month/year with animated SVG path transitions |
| **Ripple effects** | Material ripple on all buttons and FABs |
| **Spotlight effect** | Radial gradient follows cursor on cards (disabled on touch) |
| **Control panel** | Live adjustment of border-radius, elevation scale, motion speed |
| **Form validation** | Real-time validation with error/success states |
| **Snackbar toasts** | Auto-dismiss with hover-pause, success/error/info variants |
| **FAQ expand** | Smooth slide-down animation with icon rotation |
| **Back to top** | Appears after scrolling past hero, smooth scroll to top |
| **Mobile nav** | Hamburger menu with dropdown |

## Accessibility

- Skip-to-content link
- 93 ARIA attributes across the page
- All decorative icons have `aria-hidden="true"`
- WCAG AA contrast ratios on all text
- 48px minimum touch targets on interactive elements
- `prefers-reduced-motion` respected globally
- Keyboard navigation for all interactive elements
- Semantic HTML structure (header, nav, main, section, footer)
- Proper heading hierarchy (h1 → h2 → h3 → h4)

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| 1024px | Hero stacks, features → single column, stats → 2 columns |
| 768px | Pricing → single column, nav rail → horizontal bar, dashboard stacks |
| 640px | Mobile hamburger, hero uses clamp(), stats → single column, reduced padding |
| 375px | Small phone optimizations, tighter spacing |

## Performance

- `content-visibility: auto` on 9 below-the-fold sections
- `will-change` hints during animation, removed after completion
- Passive scroll listeners
- Touch device detection disables mousemove effects
- Font `display=swap` on all Google Fonts
- Only `transform` and `opacity` animated (GPU-composited)
- No framework dependencies — pure vanilla JS

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

---

*Layer is a fictional product designed as a portfolio showcase. This project demonstrates design systems thinking, interaction design, accessibility, responsive design, and commercial judgment.*
