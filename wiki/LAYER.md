# LAYER — Deep Dive

## Overview

LAYER is a Material Design 3 component library showcase presented as a real SaaS product. 398 of 412 CSS variables draw from a systematic token system. Every component follows MD3 spec — elevation, shape, motion, color — with a floating control panel for real-time adjustment.

**Live:** [rishikesh-sonawane.github.io/web-designs/Material-Design/](https://rishikesh-sonawane.github.io/web-designs/Material-Design/)  
**Directory:** `Material-Design/`  
**Stack:** Pure HTML5 + CSS3 + SVG + Vanilla JS

---

## Design Philosophy

### Systematic by Design
LAYER isn't just "Material-looking" — it's a genuine implementation of MD3's design token system. Every color, shape, elevation, and motion follows the spec. The control panel lets you see the system in action.

### Core Principle
> *Components aren't decorations. They're a system.*

---

## MD3 Token System

### Color Tokens (13 semantic pairs)

| Pair | Light | Dark |
|------|-------|------|
| Primary | `#6750A4` | `#D0BCFF` |
| On Primary | `#FFFFFF` | `#381E72` |
| Primary Container | `#EADDFF` | `#4F378B` |
| Secondary | `#625B71` | `#CCC2DC` |
| Tertiary | `#7D5260` | `#EFB8C8` |
| Error | `#B3261E` | `#F2B8B5` |
| Surface | `#FFFBFE` | `#1C1B1F` |
| + 6 more pairs | | |

### Shape Tokens

| Token | Value | Use |
|-------|-------|-----|
| none | 0px | — |
| extra-small | 4px | Chips, badges |
| small | 8px | Buttons, cards |
| medium | 12px | Dialogs, sheets |
| large | 16px | Navigation bars |
| full | 9999px | FABs, pills |

### Motion Tokens

| Token | Duration | Easing |
|-------|----------|--------|
| standard | 300ms | cubic-bezier(0.2, 0, 0, 1) |
| emphasized | 500ms | cubic-bezier(0.2, 0, 0, 1) |
| standard-decelerate | 300ms | cubic-bezier(0, 0, 0, 1) |

### Elevation Levels

| Level | Shadow | Use |
|-------|--------|-----|
| dp 0 | none | Background |
| dp 1 | 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15) | Cards |
| dp 2 | 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15) | Menus |
| dp 3 | 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3) | FABs |
| dp 4 | 0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3) | Dialogs |
| dp 5–24 | Progressively larger | — |

---

## Dashboard

### Nav Rail
- Vertical navigation with icons + labels
- Active state with primary color indicator
- IntersectionObserver highlights current section

### Stats Cards
- Animated counter on scroll
- Sparkline mini-charts
- Color-coded trends (green up, red down)

### Revenue Chart
- SVG-based line chart
- Three views: Week / Month / Year
- **SVG path morph** — smooth transition between views
- Gradient fill below line

### Activity Feed
- Staggered reveal (80ms per item)
- Avatar + name + action + timestamp
- Scroll reveal via IntersectionObserver

### Project Progress
- Horizontal progress bars
- Animated fill on scroll
- Percentage label

---

## SVG Path Morph Chart

The chart transitions between time views using SVG path morphing:

```javascript
// Week data
const weekPath = "M0,100 L20,80 L40,60 ...";

// Month data  
const monthPath = "M0,100 L20,90 L40,70 ...";

// Animate between them
function morphPath(from, to, progress) {
  // Interpolate each point
}
```

Creates a smooth, organic transition — not a hard cut.

---

## Floating Control Panel

### Controls

| Control | Range | Effect |
|---------|-------|--------|
| Border Radius | 0–28px | Changes all shape tokens |
| Elevation Scale | 0–24dp | Adjusts shadow intensity |
| Motion Speed | 0.5x–2x | Scales all animation durations |

### Real-Time Updates
All controls modify CSS custom properties:
```css
:root {
  --md-shape-medium: calc(var(--radius-base) * 1px);
  --md-elevation-1: 0 1px calc(var(--elevation-scale) * 2px) ...;
}
```

---

## Material Ripple

Click any button to see a ripple expand from click point:

```javascript
button.addEventListener('click', (e) => {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.left = `${e.offsetX}px`;
  ripple.style.top = `${e.offsetY}px`;
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
```

```css
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-expand 600ms ease-out;
}
```

---

## Accessibility

- **93 ARIA attributes** across the page
- **Skip navigation** link
- **48px minimum touch targets** on all interactive elements
- **Focus-visible** states with primary color outline
- **Screen reader** labels on all icons
- **Keyboard navigation** throughout

---

## Performance

- `content-visibility: auto` on 9 below-fold sections
- CSS containment for layout isolation
- Minimal DOM manipulation (static HTML + CSS animations)
- No framework overhead

---

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 1,076 | Main page |
| `styles.css` | 2,350 | Complete MD3 design system |
| `script.js` | 521 | Interactions + control panel |
| `DESIGN-GUIDE.md` | — | Design language reference |
| `Plan.md` | — | Development notes |

---

## Lessons Learned

- MD3's token system is more complex than it looks — 398 variables just for colors, shapes, and elevation
- SVG path morphing creates transitions that feel alive
- `content-visibility: auto` provides real performance wins on long pages
- Material ripple is simple to implement but adds enormous perceived quality
- Control panels are the best way to demonstrate a design system — they make the system tangible
- 93 ARIA attributes sounds like a lot, but accessibility should be thorough, not an afterthought
