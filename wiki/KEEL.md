# KEEL — Deep Dive

## Overview

KEEL is a product page for a fictional DevOps deployment control plane. Built as a bento grid — 15+ distinct cells arranged in a strict 4-column CSS Grid, each containing live-updating data visualizations.

**Live:** [rishikesh-sonawane.github.io/web-designs/Bento-Grid/](https://rishikesh-sonawane.github.io/web-designs/Bento-Grid/)  
**Directory:** `Bento-Grid/`  
**Stack:** Pure HTML5 + CSS Grid + Canvas 2D API + Vanilla JS

---

## Brand Identity

### Name Origin
KEEL — the structural backbone of a ship. Keeps production steady in rough waters.

### Philosophy
> *"Production, kept steady."*

Not flashy. Not trendy. Just reliable infrastructure that works.

### Design Principles
- **Calm over chaotic** — Clean grid, minimal noise
- **Data over decoration** — Every element shows information
- **Technical but approachable** — Developers are humans too

---

## Design Language

### Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| Paper | `#FAFAF9` | Background |
| Ink | `#1C1917` | Text, borders |
| Sage | `#A8B5A4` | Success, accents |
| Amber | `#F59E0B` | Warnings |
| Red | `#EF4444` | Errors, alerts |

### Typography
- **UI:** Inter — Clean, legible
- **Code/Metrics:** JetBrains Mono — Monospace for data

---

## Bento Grid Layout

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
```

### Cell Types

| Cell | Span | Content |
|------|------|---------|
| Deploy Stages | 2×1 | Build → Test → Canary → Fleet pipeline |
| Sparkline | 1×1 | Live metric trend |
| UTC Clock | 1×1 | Real-time clock |
| SLO Gauge | 1×1 | Error budget with animated needle |
| Service Map | 2×1 | Request topology diagram |
| Line Chart | 2×1 | 4-time-range interactive chart |
| Performance | 1×1 | Gradient arc gauge |
| Switchboard | 1×1 | Sliders, toggles, modes |
| Palette | 1×1 | Color swatches (click-to-copy) |
| Metrics | 1×1 | Live counter |
| Events | 2×1 | Recent deploy events |
| Health | 1×1 | System status indicators |

---

## Canvas 2D Visualizations

All charts and gauges are drawn with Canvas 2D — no charting libraries.

### SLO Gauge
- Animated needle pointing to error budget consumption
- Gradient arc from green → yellow → red
- Updates on simulated data

### Line Chart
- 4 time ranges: 7D, 30D, 90D, 1Y
- Click range buttons to switch data
- Cyan glow effect on line
- Gradient fill below line

### Sparkline
- Tiny inline chart showing trend
- Updates every 2 seconds
- Smooth animation

### Performance Gauge
- Gradient arc (green → yellow → red)
- Needle indicating current performance
- Smooth animation on value change

---

## Interactive Features

### Dark Mode Toggle
- Toggles `data-theme="dark"` on `<html>`
- All Canvas 2D elements re-render with new colors
- Smooth CSS transition on backgrounds

### Clipboard API
- Click any color swatch
- Hex value copied to clipboard
- Toast notification confirms copy

### Deploy Pipeline
Simulated stages:
1. **Build** — Compiling, bundling (3s)
2. **Test** — Running test suite (4s)
3. **Canary** — Deploying to 5% traffic (5s)
4. **Fleet** — Rolling out to 100% (3s)

Each stage has its own progress indicator and status color.

---

## Case Study

KEEL has a separate case study page:
- `case-study.html` — Documents the design process
- `case-study.css` — Case study-specific styles

This is the only project with a dedicated case study outside the `work/` directory.

---

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~600 | Main page |
| `styles.css` | ~900 | CSS Grid design system |
| `script.js` | ~700 | Canvas drawing + interactions |
| `case-study.html` | ~300 | Design case study |
| `case-study.css` | ~200 | Case study styles |
| `DESIGN-GUIDE.md` | — | Design language reference |
| `DESIGN-SPEC.md` | — | Implementation specification |
| `BRAND.md` | — | Brand identity |
| `BUG-STORIES.md` | — | Bug documentation |

---

## Lessons Learned

- CSS Grid is perfect for bento layouts — explicit, predictable, responsive
- Canvas 2D can handle multiple simultaneous visualizations without performance issues
- Dark mode requires re-rendering all Canvas elements — can't just toggle CSS
- Simulated live data (setInterval) creates a compelling "control room" feel
- Clipboard API is simple but needs user interaction (click) to work
