# LUMEN — Deep Dive

## Overview

LUMEN is a SaaS analytics product website built around the physics of emitted light. Set in a dark atmospheric environment, every element glows, pulses, or reflects light — as if the interface itself is a source of illumination.

**Live:** [rishikesh-sonawane.github.io/web-designs/DarkMode-UI/](https://rishikesh-sonawane.github.io/web-designs/DarkMode-UI/)  
**Directory:** `DarkMode-UI/`  
**Stack:** Pure HTML5 + CSS3 + Canvas 2D API + Vanilla JS

---

## Design Philosophy

### Light in Darkness
LUMEN treats dark mode not as an inverted light theme, but as its own environment — like a control room at night, or a dashboard in a dark cockpit. Elements don't just exist; they emit light.

### Core Principle
> *Darkness isn't the absence of light. It's the canvas for it.*

---

## Obsidian Layer System

Four depth levels, each progressively lighter:

| Level | Hex | Use |
|-------|-----|-----|
| Depth 0 | `#090D16` | Page background |
| Depth 1 | `#111827` | Card surfaces |
| Depth 2 | `#1F2937` | Elevated elements (dropdowns, modals) |
| Depth 3 | `#374151` | Interactive states (hover, active) |

### Purpose
Each depth level represents a physical layer — like stacked glass panels with light passing through them. Higher levels catch more ambient light.

---

## Luminescent Palette

| Color | Hex | Role |
|-------|-----|------|
| Cyan | `#00F0FF` | Primary accent, charts, glows |
| Violet | `#8B5CF6` | Secondary accent, navigation |
| Amber | `#F59E0B` | Warnings, highlights |

### Glow Effects
Elements use `box-shadow` with color-matched spread:
```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3),
              0 0 40px rgba(0, 240, 255, 0.1);
}
```

---

## Cursor-Following Glow

Feature cards light up as the cursor moves over them:

```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
});
```

```css
.card::before {
  content: '';
  position: absolute;
  top: var(--mouse-y);
  left: var(--mouse-x);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0,240,255,0.15), transparent);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
```

---

## Light-Pipe Navigation

A thin accent line runs across the nav bar:
- Starts cyan on page load
- Shifts to violet as user scrolls
- Creates a "light pipe" effect — like fiber optics

```css
.nav-pipe {
  background: linear-gradient(90deg, 
    var(--cyan) calc(var(--scroll) * 100%), 
    var(--violet) calc(var(--scroll) * 100%)
  );
}
```

---

## Canvas Visualizations

### Live Chart
- Cyan line with glow effect
- Gradient fill below line
- Updates every 3 seconds with new data points
- Smooth animation

### Performance Metrics
- Animated counter numbers
- Pulsing green status dots
- Progress bars with glow

---

## Keycap Buttons

3D buttons that look like physical keyboard keys:

| State | Effect |
|-------|--------|
| Rest | Raised, subtle glow projection |
| Hover | Increased glow, slight lift |
| Pressed | Depressed (inset shadow), glow disappears |

### Glow Projection
```css
.keycap {
  box-shadow: 
    0 4px 0 #1a1a2e,
    0 8px 20px rgba(0, 240, 255, 0.2);
}
.keycap:hover {
  box-shadow: 
    0 4px 0 #1a1a2e,
    0 8px 30px rgba(0, 240, 255, 0.4);
}
```

---

## Cosmic Shadows

Shadows in LUMEN aren't just dark — they have a faint neon tint:

```css
box-shadow: 0 8px 32px rgba(0, 240, 255, 0.08);
```

This creates the illusion that objects are floating above a luminous surface.

---

## Specular Hairlines

1px borders with subtle light reflection:
```css
border: 1px solid rgba(255, 255, 255, 0.06);
```

Barely visible, but they catch the eye and define edges in the darkness.

---

## Telemetry Ticker

Footer contains scrolling metrics:
- Updates every 5 seconds
- Smooth horizontal scroll
- Monospace font (JetBrains Mono)
- Fades at edges

---

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~450 | Main page |
| `styles.css` | ~700 | Design system |
| `script.js` | ~500 | Canvas drawing + interactions |
| `DESIGN-GUIDE.md` | — | Design language reference |
| `Plan.md` | — | Development notes |

---

## Lessons Learned

- Dark mode is not "light mode with inverted colors" — it's a different environment
- Cursor-following effects create a sense of responsiveness and life
- Glow effects need restraint — too much and it becomes a Christmas tree
- The obsidian layer system gives depth without borders
- Light-pipe navigation is a subtle but powerful way to show scroll progress
