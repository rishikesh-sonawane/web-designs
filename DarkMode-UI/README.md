# DarkMode — Premium Dark Interface

An ultra-premium dark UI built around the physics of emitted light, luminescent gradients, and deep obsidian surfaces. Not just black backgrounds — actual atmospheric depth.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Light-pipe nav, command deck hero with dashboard mockup, luminescent matrix grid, live dashboard, pricing, testimonials, contact, loading states, telemetry footer |
| `styles.css` | Obsidian layering, luminescent palette, specular borders, cursor glow, cosmic shadows, keycap buttons, light-pipe nav |
| `script.js` | Cursor glow tracking, live chart canvas, dashboard metric animation, light-pipe color shift, ticker, form, toasts |
| `README.md` | This file |

## Design System

### Obsidian Layering

| Layer | Color | Usage |
|-------|-------|-------|
| Background | `#090D16` | Deep space matte blue-black |
| Surface | `#111726` | Translucent dark obsidian panels |
| Surface Light | `#1A2035` | Elevated elements |
| Border | `rgba(255,255,255,0.08)` | Specular hairline highlight |

### Luminescent Palette

| Role | Color | Usage |
|------|-------|-------|
| Text | `#F8FAFC` | Crisp luminous white |
| Muted | `#64748B` | Icy blue-gray metadata |
| Cyan | `#00F0FF` | Primary glow accent |
| Violet | `#8B5CF6` | Secondary glow accent |
| Amber | `#F59E0B` | Warning/tertiary accent |
| Green | `#22C55E` | Status indicators |

### Cosmic Shadow Formula

```css
box-shadow: 0 10px 40px rgba(0, 240, 255, 0.03),
            0 1px 3px rgba(0, 0, 0, 0.4);
```

Deep, faint neon-tinted outer shadows simulate floating glow.

### Specular Border Formula

```css
border: 1px solid rgba(255, 255, 255, 0.08);
```

Ultra-thin, semi-transparent border reflecting virtual light.

### Keycap Button Formula

```css
.keycap--primary:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.45);
}
.keycap--primary:active {
  transform: translateY(2px);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.45);
}
```

Backlit mechanical keycap feel with glow projection.

## Features

### Light-Pipe Navigation
- Frosted obsidian dark glass with `backdrop-filter: blur(8px)`
- 1px gradient accent line at bottom that shifts color on scroll
- Links glow on hover (muted → radiant white)
- Pulsing green status indicator

### Command Deck Hero
- Gradient text from white to cosmic purple
- Dashboard mockup with live chart, connection nodes, code matrix
- Keycap CTA buttons with glow projection
- System metrics (uptime, latency, render)

### Live Chart Canvas
- Real-time line chart with cyan glow
- Grid background
- Auto-updating data points
- Gradient fill below line

### Luminescent Matrix
- 6 feature cards with cursor-tracking radial glow
- CSS custom properties `--mouse-x`, `--mouse-y` for positioning
- 3 glow colors (cyan, violet, amber)
- Pulsing green status dots

### Live Dashboard
- 4 metric cards with animated values
- Real-time updating every 3 seconds
- Glowing progress bars (cyan, violet, amber)
- Intersection observer triggers animation

### Light-Pipe Color Shift
- Nav accent line shifts from cyan to violet as you scroll
- Based on scroll percentage

### Control Panel
- Cursor glow tracking on all cards
- Live chart animation
- Dashboard metrics update

## Interactive Elements

| Element | Effect |
|---------|--------|
| Lumi card | Cursor-following radial glow via CSS variables |
| Keycap button | Glow projection on hover, depression on click |
| Nav links | Muted → radiant white on hover |
| Light-pipe | Color gradient shifts with scroll position |
| Chart canvas | Real-time line chart with glow |
| Dashboard bars | Animated fill on scroll |
| Status dots | Pulsing green glow animation |
| Ticker | Infinitely scrolling telemetry data |

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Desktop (>1024px) | Full 2-column hero, 3-column matrix |
| Tablet (768–1024px) | Single-column hero, stacked grids |
| Mobile (<768px) | Single column everything, hidden nav links |

## Potential Future Features

- **Theme switcher** — toggle between obsidian/void/abyss
- **Sound effects** — click/hover audio feedback
- **Particle system** — floating luminous particles
- **3D card tilt** — perspective shift on mouse move
- **Audio visualizer** — frequency bars in dashboard
- **Custom cursor** — glowing crosshair
- **Dark/light toggle** — persistent theme switch
- **Notification system** — toast with glow effects
- **Loading screen** — animated boot sequence
- **Easter egg** — Konami code activates special glow mode
