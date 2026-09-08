# LAYER

> *Components, systematically.*

---

## The Brief

LAYER is a Material Design 3 component library showcase presented as a real SaaS product. 398 of 412 CSS variables draw from a systematic token system. Every component follows MD3 spec — elevation, shape, motion, color — with a floating control panel for real-time adjustment.

This isn't a documentation page. It's a living, interactive demonstration of how MD3 works. The control panel lets you break the system and see what happens.

---

## The Feeling

> *You're browsing a well-organized component shelf. Every piece has a place. Colors follow rules. Shadows follow physics. Motion follows curves. You could rebuild this entire interface from 400 CSS variables and nothing else.*

---

## The Decisions

### Why MD3 (Not MD2)?

Material Design 3 introduced a more flexible, expressive system — dynamic color, shape tokens, and motion tokens. MD2 was rigid. MD3 is systematic. The difference matters: rigid systems break under pressure. Systematic systems bend.

### Why Present It as a Product?

A component library documentation page is boring. A SaaS product that happens to use those components is compelling. LAYER presents itself as a real product — with a dashboard, stats, charts, and activity feed — so visitors experience the components in context, not in isolation.

### Why 398 CSS Variables?

Because the system is thorough. Every color, every shape, every elevation, every motion is tokenized. Change one variable, and the entire interface updates. That's the power of a systematic design language.

---

## The Token System

### Color Tokens (13 semantic pairs)

| Pair | Light | Dark | Use |
|------|-------|------|-----|
| Primary | `#6750A4` | `#D0BCFF` | Main actions, emphasis |
| On Primary | `#FFFFFF` | `#381E72` | Text on primary |
| Primary Container | `#EADDFF` | `#4F378B` | Secondary emphasis |
| On Primary Container | `#21005D` | `#EADDFF` | Text on primary container |
| Secondary | `#625B71` | `#CCC2DC` | Supporting actions |
| On Secondary | `#FFFFFF` | `#332D41` | Text on secondary |
| Secondary Container | `#E8DEF8` | `#4A4458` | Supporting emphasis |
| Tertiary | `#7D5260` | `#EFB8C8` | Accent, differentiation |
| Error | `#B3261E` | `#F2B8B5` | Error states |
| Surface | `#FFFBFE` | `#1C1B1F` | Background |
| On Surface | `#1C1B1F` | `#E6E1E5` | Text on surface |
| Surface Variant | `#E7E0EC` | `#49454F` | Secondary surfaces |
| Outline | `#79747E` | `#938F99` | Borders, dividers |

### Shape Tokens

| Token | Value | Use |
|-------|-------|-----|
| `none` | 0px | — |
| `extra-small` | 4px | Chips, badges |
| `small` | 8px | Buttons, cards |
| `medium` | 12px | Dialogs, sheets |
| `large` | 16px | Navigation bars |
| `extra-large` | 28px | Bottom sheets |
| `full` | 9999px | FABs, pills |

### Motion Tokens

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `standard` | 300ms | `cubic-bezier(0.2, 0, 0, 1)` | General transitions |
| `emphasized` | 500ms | `cubic-bezier(0.2, 0, 0, 1)` | Important transitions |
| `standard-decelerate` | 300ms | `cubic-bezier(0, 0, 0, 1)` | Elements entering |
| `standard-accelerate` | 200ms | `cubic-bezier(0.3, 0, 1, 1)` | Elements leaving |
| `emphasized-decelerate` | 400ms | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Important entries |
| `emphasized-accelerate` | 200ms | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Important exits |

### Elevation Levels

| Level | Shadow | Use |
|-------|--------|-----|
| dp 0 | none | Background |
| dp 1 | `0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)` | Cards |
| dp 2 | `0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)` | Menus |
| dp 3 | `0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)` | FABs |
| dp 4 | `0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)` | Dialogs |
| dp 5 | `0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)` | — |

---

## The Dashboard

### Nav Rail
- Vertical navigation with Material Icons + labels
- Active state with primary color indicator (pill background)
- IntersectionObserver highlights current section on scroll

### Stats Cards
- Animated counter on scroll (counts up from 0)
- Sparkline mini-charts (tiny Canvas 2D)
- Color-coded trends (green ↑, red ↓)
- 10 elevation dp for card depth

### Revenue Chart
- SVG-based line chart
- Three views: Week / Month / Year
- **SVG path morph** — smooth transition between views
- Gradient fill below line
- Grid lines at regular intervals

### Activity Feed
- Staggered reveal (80ms delay per item)
- Avatar + name + action + timestamp
- Scroll reveal via IntersectionObserver
- Divider lines between items

### Project Progress
- Horizontal progress bars
- Animated fill on scroll (width transitions)
- Percentage label
- Different colors per project

---

## SVG Path Morph Chart

The chart transitions between time views using SVG path morphing:

```javascript
function morphPath(fromPath, toPath, progress) {
  const fromPoints = parsePath(fromPath);
  const toPoints = parsePath(toPath);
  
  const interpolated = fromPoints.map((from, i) => {
    const to = toPoints[i];
    return {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress
    };
  });
  
  return buildPath(interpolated);
}
```

The transition takes 500ms with an emphasized easing curve. The effect is organic — the chart doesn't cut between views, it *flows*.

---

## Floating Control Panel

### Controls

| Control | Range | CSS Variable | Effect |
|---------|-------|--------------|--------|
| Border Radius | 0–28px | `--md-shape-medium` | Changes all shape tokens |
| Elevation Scale | 0–24dp | `--elevation-scale` | Adjusts shadow intensity |
| Motion Speed | 0.5x–2x | `--motion-speed` | Scales all animation durations |

### Real-Time Updates

All controls modify CSS custom properties:
```css
:root {
  --md-shape-medium: calc(var(--radius-base) * 1px);
  --md-elevation-1: 0 1px calc(var(--elevation-scale) * 2px) 
    rgba(0,0,0,0.3), 0 1px calc(var(--elevation-scale) * 3px) 
    1px rgba(0,0,0,0.15);
}
```

Change the slider → every component updates instantly. That's the power of tokenization.

---

## Material Ripple

Click any button to see a ripple expand from click point:

```javascript
button.addEventListener('click', (e) => {
  const ripple = document.createElement('span');
  ripple.classList.add('md-ripple');
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
```

```css
.md-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(103, 80, 164, 0.2);
  transform: scale(0);
  animation: md-ripple-expand 600ms cubic-bezier(0.2, 0, 0, 1);
  pointer-events: none;
}
@keyframes md-ripple-expand {
  to { transform: scale(4); opacity: 0; }
}
```

---

## Accessibility

- **93 ARIA attributes** across the page
- **Skip navigation** link (first focusable element)
- **48px minimum touch targets** on all interactive elements
- **Focus-visible** states with primary color outline
- **Screen reader** labels on all icons (`aria-label`)
- **Keyboard navigation** throughout (Tab, Enter, Escape, Arrow keys)
- **Semantic HTML** (nav, main, article, section, aside)
- **Color contrast** — all text meets WCAG AA (4.5:1)

---

## Performance

- `content-visibility: auto` on 9 below-fold sections
- CSS containment for layout isolation (`contain: layout`)
- Minimal DOM manipulation (static HTML + CSS animations)
- No framework overhead (zero dependencies)
- `will-change` on animated elements (removed after animation)

```css
.below-fold {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

This tells the browser to skip rendering until the element enters the viewport — significant performance win on long pages.

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

## The Problems

### 1. SVG Path Morph Complexity
**Problem:** Path morphing between charts with different point counts required interpolation logic.

**Fix:** Standardized all chart paths to 12 points. Points that don't exist in the shorter path are interpolated from neighbors.

### 2. Elevation Token Cascade
**Problem:** Changing the elevation scale affected all 10 levels simultaneously, creating visual chaos.

**Fix:** Added smooth transitions to elevation changes: `transition: box-shadow 300ms cubic-bezier(0.2, 0, 0, 1)`.

### 3. Motion Speed Token
**Problem:** Scaling all animation durations broke some animations (too fast = invisible, too slow = tedious).

**Fix:** Capped the motion speed range at 0.5x–2x. Added `prefers-reduced-motion` override that sets speed to 0x.

---

## Lessons Learned

1. **MD3's token system is more complex than it looks.** 398 variables just for colors, shapes, and elevation. But the result is a system that's consistent by construction, not by effort.

2. **SVG path morphing creates transitions that feel alive.** The chart doesn't cut between views — it flows. That organic quality is worth the implementation complexity.

3. **`content-visibility: auto` provides real performance wins** on long pages. The browser skips rendering below-fold sections until they enter the viewport.

4. **Material ripple is simple to implement** but adds enormous perceived quality. A 60ms animation that makes buttons feel responsive.

5. **Control panels are the best way to demonstrate a design system.** They make the system tangible. Visitors don't just see the tokens — they *play* with them.

6. **93 ARIA attributes sounds like a lot**, but accessibility should be thorough, not an afterthought. Every interactive element needs a label. Every state change needs an announcement.

---

*Last updated: September 2026*
