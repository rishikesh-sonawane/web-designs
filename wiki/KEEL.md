# KEEL

> *Production, kept steady.*

---

## The Brief

KEEL is a product page for a fictional DevOps deployment control plane. Think of it as the dashboard you'd look at at 3 AM when production is on fire — except everything is calm, measured, and under control.

The design language is **bento grid**: 15+ distinct cells arranged in a strict 4-column CSS Grid, each containing live-updating data visualizations. Every chart is drawn with Canvas 2D. No charting libraries.

---

## The Feeling

> *You're in a control room. Monitors show live data — deploy stages, error rates, service health. Everything is green. The room is quiet. A clock shows UTC time. You could stay here all night. This is what calm looks like.*

---

## The Decisions

### Why Bento Grid?

The bento grid layout (popularized by Apple's WWDC presentations) is perfect for data-dense interfaces. Each cell is self-contained but visually related. The grid creates order without rigidity — you can span cells, vary sizes, and still maintain coherence.

### Why Paper/Ink/Sage?

Most DevOps tools use dark themes. KEEL goes the opposite direction: **light paper, dark ink, sage accents**. The effect is like reading a well-designed technical manual — clean, legible, trustworthy.

### Why JetBrains Mono?

Monospace fonts signal "technical" without saying it. JetBrains Mono has excellent legibility at small sizes (important for metrics) and a slightly rounded feel that softens the technical edge.

---

## The Bento Grid

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 16px;
}
```

### Cell Map

```
┌──────────────────┬──────────┬──────────┐
│                  │          │  UTC     │
│  DEPLOY STAGES   │ SPARKLINE│  CLOCK   │
│  (build→test→    │          │          │
│   canary→fleet)  │          │          │
├──────────────────┼──────────┴──────────┤
│                  │                     │
│  SLO GAUGE       │   SERVICE MAP       │
│                  │   (request topology)│
├──────────────────┼─────────────────────┤
│                  │                     │
│  LINE CHART      │   PERFORMANCE       │
│  (7D/30D/90D/   │   GAUGE             │
│   1Y)            │                     │
├──────────┬───────┼─────────────────────┤
│SWITCHBOARD│PALETTE│   METRICS          │
│ (sliders, │(click │   (live counter)   │
│  toggles) │copy)  │                    │
├──────────┴───────┼─────────────────────┤
│                  │                     │
│  EVENTS          │   HEALTH            │
│  (deploy log)    │   (system status)   │
│                  │                     │
└──────────────────┴─────────────────────┘
```

---

## Canvas 2D Visualizations

### Deploy Stages
A horizontal pipeline showing: Build → Test → Canary → Fleet
- Each stage has a progress indicator
- Color transitions from gray (pending) to sage (active) to green (complete)
- Stages advance automatically (simulated deploy)
- 3-second intervals between stages

### SLO Gauge
- Semicircular gauge with gradient arc (green → yellow → red)
- Animated needle pointing to error budget consumption
- Label shows percentage (e.g., "0.3% of 1.0% budget used")
- Updates on simulated data

### Line Chart
- 4 time ranges: 7D, 30D, 90D, 1Y
- Click range buttons to switch data sets
- Cyan line with subtle glow effect
- Gradient fill below line (0.1 opacity)
- Grid lines at regular intervals
- Axis labels (values on Y, dates on X)

### Sparkline
- Tiny inline chart (100% width, 40px height)
- Shows trend over time
- Updates every 2 seconds
- No axes, no labels — just the shape

### Performance Gauge
- Full circle gauge (not semicircular)
- Gradient arc from green (left) through yellow to red (right)
- Needle indicating current performance score
- Smooth animation on value change

---

## Interactive Features

### Dark Mode Toggle

Toggle `data-theme="dark"` on `<html>`:
```javascript
document.documentElement.dataset.theme = 
  document.documentElement.dataset.theme === 'dark' ? '' : 'dark';
```

**Critical:** All Canvas 2D elements must re-render on theme change. CSS can handle HTML elements, but Canvas drawing uses hardcoded colors. The fix:
```javascript
function reRenderAllCanvases() {
  drawDeployStages();
  drawSLOGauge();
  drawLineChart();
  drawSparkline();
  drawPerformanceGauge();
}
```

### Clipboard API

Click any color swatch → hex value copied to clipboard:
```javascript
swatch.addEventListener('click', () => {
  navigator.clipboard.writeText(swatch.dataset.hex);
  showToast(`Copied ${swatch.dataset.hex}`);
});
```

### Switchboard Controls

Sliders and toggles that modify visual properties:
- **Shadow depth** — Adjusts box-shadow spread on all cards
- **Border radius** — Changes border-radius globally
- **Mode toggles** — Switch between visualization modes

---

## The Deploy Pipeline

Simulated deployment stages with timing:

| Stage | Duration | Color | Status |
|-------|----------|-------|--------|
| Build | 3s | Gray → Sage | Compiling, bundling |
| Test | 4s | Sage | Running test suite |
| Canary | 5s | Sage → Green | Deploying to 5% traffic |
| Fleet | 3s | Green | Rolling out to 100% |

After fleet completes, the pipeline resets after 5 seconds.

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

## The Problems

### 1. Canvas Retina Rendering
**Problem:** Canvas elements looked blurry on Retina displays.

**Fix:** Scale canvas by `window.devicePixelRatio`:
```javascript
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.offsetWidth * dpr;
canvas.height = canvas.offsetHeight * dpr;
ctx.scale(dpr, dpr);
```

### 2. Line Chart Data Switching
**Problem:** Switching between 7D/30D/90D/1Y caused a jarring hard cut.

**Fix:** Animated the transition by interpolating between old and new data points over 300ms using `requestAnimationFrame`.

### 3. Dark Mode Canvas Re-render
**Problem:** Canvas elements kept their light-mode colors after dark mode toggle.

**Fix:** Stored color palettes as objects and swapped them on theme change:
```javascript
const palettes = {
  light: { line: '#1C1917', grid: '#E5E5E5', fill: 'rgba(28,25,23,0.1)' },
  dark: { line: '#00F0FF', grid: '#374151', fill: 'rgba(0,240,255,0.1)' }
};
```

---

## Lessons Learned

1. **CSS Grid is perfect for bento layouts.** Explicit, predictable, responsive. No need for Flexbox hacks or positioning.

2. **Canvas 2D handles multiple simultaneous visualizations** without performance issues — as long as you're not redrawing everything every frame. Redraw on data change, not on animation frame.

3. **Dark mode requires re-rendering all Canvas elements.** You can't just toggle CSS. Plan for this from the start.

4. **Simulated live data** (setInterval with random fluctuations) creates a compelling "control room" feel. It doesn't need to be real data to feel real.

5. **Clipboard API is simple** but requires user interaction (click) to work. You can't copy to clipboard on page load.

---

*Last updated: September 2026*
