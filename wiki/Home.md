# Web Designs Wiki

> Six projects. Six design languages. Zero templates.

This wiki documents the thinking, technique, and decisions behind every project in the collection. Not just *what* was built — but *why* it was built that way.

---

## How to Read This Wiki

Each project page follows the same structure:

1. **The Brief** — What the project is and who it's for
2. **The Feeling** — The sensory experience we're after
3. **The Decisions** — Why this palette, this type, this layout
4. **The Techniques** — How it was actually built
5. **The Problems** — What went wrong and how it was fixed
6. **The Lessons** — What would carry forward to the next project

---

## Projects

| # | Name | Design Language | Live |
|---|------|----------------|------|
| 01 | [STONE](STONE.md) | Quiet Luxury + Swiss Editorial | [→](https://web-designs-by-rishi-11y8i6eaz-rishikesh-sonawanes-projects.vercel.app/) |
| 02 | [OCHRE](OCHRE.md) | Bohemian Editorial | [→](https://rishikesh-sonawane.github.io/web-designs/Bohemian/) |
| 03 | [KEEL](KEEL.md) | Bento Grid / Technical | [→](https://rishikesh-sonawane.github.io/web-designs/Bento-Grid/) |
| 04 | [ATELIER](ATELIER.md) | Skeuomorphic Tactile | [→](https://rishikesh-sonawane.github.io/web-designs/Skeuo/) |
| 05 | [LUMEN](LUMEN.md) | Premium Dark / Atmospheric | [→](https://rishikesh-sonawane.github.io/web-designs/DarkMode-UI/) |
| 06 | [LAYER](LAYER.md) | Material Design 3 | [→](https://rishikesh-sonawane.github.io/web-designs/Material-Design/) |
| — | [Portfolio](Portfolio.md) | Warm Editorial | [→](https://rishikesh-sonawane.github.io/web-designs/) |
| — | [Design System](DesignSystem.md) | Shared tokens & patterns | — |

---

## The Rules

Every project in this collection follows three rules:

**Rule 1: No templates.**
Every project starts from a blank file. No Bootstrap, no Tailwind (except STONE), no component libraries. The point is to demonstrate range, not convenience.

**Rule 2: No images where code will do.**
If a texture can be generated with CSS, it is. If a chart can be drawn with Canvas 2D, it is. The only loaded images are photographs — everything else is code.

**Rule 3: One design language per project.**
Each project commits fully to a single visual language. OCHRE doesn't borrow from LUMEN. ATELIER doesn't sneak in LAYER's tokens. The constraint is the point.

---

## Common Patterns

Despite six different design languages, certain patterns recur:

### Floating Control Panels
Three projects (ATELIER, LAYER, KEEL) include draggable control panels that modify the design system in real-time. These panels serve two purposes:
1. **Demonstrate the system** — Visitors can see how tokens affect every component
2. **Create interactivity** — Static pages become playgrounds

### Canvas 2D
Four projects use Canvas 2D for charts, gauges, and generative art. No charting libraries. Each project's `script.js` contains its own drawing logic — custom-fit to the design language.

### IntersectionObserver
Every project uses IntersectionObserver for scroll-triggered reveals. The implementation varies (stagger delays, opacity+transform, clip-path), but the principle is consistent: elements enter the viewport with intention.

### prefers-reduced-motion
All animations respect the `prefers-reduced-motion` media query. If a user has requested reduced motion, transitions are instant, particles are hidden, parallax is disabled. Accessibility isn't optional.

---

## The Portfolio as Seventh Project

The portfolio itself (`index.html` + `styles.css` + `script.js`) is the seventh project in the collection. It demonstrates the same care as the six concept projects — custom cursor, noise overlay, page loader, magnetic buttons — while framing the work rather than competing with it.

The portfolio's design language is **warm editorial**: terracotta on cream, Fraunces serif + Inter sans, unhurried rhythm. It's deliberately the most "human" project in the collection — the one that feels like a person, not a product.

---

## Deployment Architecture

```
                    ┌─────────────────────┐
                    │   GitHub Actions    │
                    │   (push to main)    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   GitHub Pages      │
                    │   6 HTML projects   │
                    │   + portfolio       │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │   Vercel            │
                    │   STONE (Next.js)   │
                    │   Static export     │
                    └─────────────────────┘
```

GitHub Pages serves the five vanilla HTML projects and the portfolio. Vercel serves STONE (the only Next.js project) as a static export.

---

## File Organization

```
web-designs/
├── index.html              ← Portfolio entry point
├── styles.css              ← Shared design system (733 lines)
├── script.js               ← Shared interactions (268 lines)
│
├── assets/img/             ← Thumbnails + Unsplash architecture photos
├── work/                   ← Case study pages (one per project)
│
├── Mixed-Design/           ← STONE (Next.js, separate build)
├── Bohemian/               ← OCHRE (standalone)
├── Bento-Grid/             ← KEEL (standalone)
├── Skeuo/                  ← ATELIER (standalone)
├── DarkMode-UI/            ← LUMEN (standalone)
└── Material-Design/        ← LAYER (standalone)
```

The root `styles.css` and `script.js` serve both the portfolio and all six case study pages. Each case study links to these shared files via relative paths (`../../styles.css`, `../../script.js`) and customizes via the `--proj-accent` CSS variable.

---

*Last updated: September 2026*
