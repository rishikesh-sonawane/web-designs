# Bento Grid — Modular Design System

> Every cell is a component. Every component tells a story.

## What Is Bento Grid Design?

Bento Grid design organizes content into a strict CSS Grid framework of precisely sized compartments — like the compartments of a Japanese bento box. Each cell is a self-contained module with its own unique content, interactions, and visual identity. The result is high content density with mathematical spacing precision.

---

## Design System

### Grid Engine

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Desktop (>1024px) | 4 columns | 20px |
| Tablet (768–1024px) | 2 columns | 20px |
| Mobile (<640px) | 1 column | 12px |

### Cell Sizes

| Cell | Columns | Rows | Purpose |
|------|---------|------|---------|
| Banner | 4 (full) | 1 | Navigation dashboard |
| Command Core | 2 | 2 | Hero + CTA |
| Spotlight | 2 | 1 | Canvas art |
| Stats | 2 | 1 | 3-column metrics |
| Switchboard | 1 | 2 | Interactive controls |
| Data Block | 1 | 1 | Gauge + metrics |
| Quick Actions | 1 | 1 | 6-button grid |
| Activity | 1 | 1 | Feed list |
| Chart | 2 | 1 | Interactive line chart |
| Typography | 1 | 1 | Font specimen |
| Palette | 1 | 1 | Color swatches |
| Showcase | 4 (full) | 1 | Component demos |
| Pricing | 3 | 1 | 3-tier cards |
| Testimonial | 1 | 1 | Quote card |
| Footer | 4 (full) | 1 | Ticker + credits |

### Color Palette (Light Mode)

| Token | Value | Use |
|-------|-------|-----|
| `--bg-canvas` | `#F1F5F9` | Page background |
| `--bg-cell` | `#FFFFFF` | Cell surface |
| `--text-primary` | `#0F172A` | Headlines |
| `--text-secondary` | `#475569` | Body text |
| `--accent` | `#6366F1` | Primary actions |
| `--success` | `#10B981` | Positive states |
| `--warning` | `#F59E0B` | Caution |
| `--error` | `#EF4444` | Error states |

### Cell Styling

```css
/* Deep corner geometry */
border-radius: 24px;

/* Premium dimensionality */
box-shadow: 0 4px 20px -2px rgba(0,0,0,0.04), 0 2px 6px -1px rgba(0,0,0,0.02);

/* Micro-thin hairline outline */
border: 1px solid rgba(0, 0, 0, 0.06);
```

---

## Interactive Features

### Dark Mode
- Toggle via moon/sun button (top-right)
- All canvases re-render with new color tokens
- Smooth 0.4s transition on all surfaces

### Interactive Line Chart
- Hover to see data point tooltips
- 4 time ranges: 7D, 30D, 90D, 1Y
- Gradient area fill under the line
- Animated hover point highlighting

### Performance Gauge
- Semi-circular gauge with gradient arc
- Animated needle pointing to value
- Glow effect on the arc

### Rotating Dial
- Continuous animation via `requestAnimationFrame`
- Shows percentage in center
- Gradient stroke with glow

### Spotlight Canvas
- Abstract generative art with grid, circles, diagonal lines, crosshair
- Re-renders on theme toggle

### Switchboard Controls
- Range slider with live value display
- Mode toggle buttons (LIVE/BATCH/STREAM)
- On/off toggle switches for notifications
- All interactors have immediate visual feedback

### Palette Color Copy
- Click any swatch to copy hex value to clipboard
- "Copied!" confirmation message

### Live Metrics
- Component shipped counter updates every 3 seconds
- Clock updates every second
- Status dot pulses continuously

### Scroll Reveal
- All cells fade in from bottom on scroll
- IntersectionObserver with 5% threshold

### Toast Notifications
- Triggered by mode switches and CTA clicks
- Auto-dismiss after 3 seconds

---

## Sections

| Section | Purpose |
|---------|---------|
| Banner Horizon | Full-width nav with clock and status |
| Command Core | Hero headline, CTA, animated dial, live metric |
| Visual Spotlight | Abstract canvas art with overlay |
| Stats Row | 3-column KPI cards with progress bars |
| Telemetry Switchboard | Sliders, mode toggles, on/off switches |
| Performance Block | Gauge, latency, memory, requests metrics |
| Quick Actions | 6-button utility grid |
| Activity Feed | 5-item recent activity list |
| Revenue Chart | Interactive line chart with tooltips |
| Typography Specimen | Font family, weights, size scale |
| Color Palette | 8 swatches with click-to-copy |
| Showcase | 4 component demos (buttons, charts, sliders, toggles) |
| Pricing | 3-tier pricing with featured card |
| Testimonial | Quote with author avatar |
| Footer | Scrolling ticker + credits |

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| >1024px | 4-column grid, all cells in place |
| 768–1024px | 2-column grid, nav hidden, stacked pricing |
| <640px | 1-column stack, everything vertical |

---

## Tech Stack

- Pure Semantic HTML5
- CSS Grid (no framework)
- Vanilla JavaScript (no dependencies)
- Canvas 2D API for charts and art
- IntersectionObserver for scroll reveals
- Clipboard API for color copy

---

## Future Enhancements

- [ ] Drag-and-drop cell rearrangement
- [ ] Cell resize handles
- [ ] Customizable grid layout (save preferences)
- [ ] More chart types (bar, pie, scatter)
- [ ] Real-time data streaming via WebSocket
- [ ] Cell minimize/maximize
- [ ] Export grid as image
- [ ] Keyboard navigation between cells
- [ ] Cell-level dark mode override
- [ ] Animated cell transitions on resize
