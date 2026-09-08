# ATELIER & CO — Deep Dive

## Overview

ATELIER & CO is a luxury leather-goods brand website built entirely with skeuomorphic design. Every material texture — leather, wood, metal, glass, linen, plastic — is generated with CSS and SVG filters. Zero texture images.

**Live:** [rishikesh-sonawane.github.io/web-designs/Skeuo/](https://rishikesh-sonawane.github.io/web-designs/Skeuo/)  
**Directory:** `Skeuo/`  
**Stack:** Pure HTML5 + CSS3 + SVG Filters + Vanilla JS

---

## Design Philosophy

### The Skeuomorphic Revival
Skeuomorphism died when flat design took over. ATELIER asks: what if we brought it back, but smarter? Not the glossy buttons of 2012 — but tactile materials that feel like they have weight, texture, and history.

### Core Principle
> *If you can't touch it, make it look like you can.*

---

## Material System

### 1. Leather
```css
/* SVG feTurbulence filter */
<filter id="leather">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
  <feColorMatrix type="saturate" values="0" />
  <feBlend in="SourceGraphic" mode="multiply" />
</filter>
```
Combined with:
- Brown base gradient
- Subtle noise overlay
- Inner shadow for depth

### 2. Wood Grain
- Repeating linear gradients at slight angles
- Varying opacity bands
- Warm brown base

### 3. Brushed Metal
- Conic gradient for directional reflection
- Fine noise overlay
- Silver/chrome base

### 4. Glass
- `backdrop-filter: blur(20px)`
- Semi-transparent white overlay
- Subtle border for edge definition

### 5. Linen
- Repeating CSS gradients (warp + weft)
- Warm off-white base
- Slight texture variation

### 6. Plastic
- Smooth gradient
- Subtle noise
- Glossy highlight

---

## Shadow Formula

ATELIER uses a 4-layer shadow system:

```css
box-shadow:
  0 1px 2px rgba(0,0,0,0.1),      /* Ambient */
  0 4px 8px rgba(0,0,0,0.12),     /* Drop */
  0 12px 24px rgba(0,0,0,0.15),   /* Depth */
  inset 0 1px 0 rgba(255,255,255,0.1); /* Reflected light */
```

### Beveled Edges
```css
border-top: 1px solid rgba(255,255,255,0.15);  /* Highlight */
border-bottom: 1px solid rgba(0,0,0,0.2);       /* Shadow */
```

---

## Physical Buttons

Buttons respond to click with inverted shadows:

| State | Shadow |
|-------|--------|
| Rest | 4-layer outward shadow |
| Hover | Slightly reduced shadow |
| Active/Pressed | **Inverted** shadow (inset) + translateY(1px) |

This creates the illusion of a physical button being depressed.

---

## Control Panel

A floating, draggable panel that modifies the entire design system in real-time.

### Sliders
| Control | Range | Effect |
|---------|-------|--------|
| Shadow Depth | 0–30px | Increases/decreases box-shadow spread |
| Bevel Width | 0–6px | Adjusts border highlight/shadow |
| Corner Radius | 0–30px | Changes border-radius |

### Presets
| Name | Shadow | Bevel | Radius |
|------|--------|-------|--------|
| Default | 12px | 2px | 8px |
| Flat | 0px | 0px | 0px |
| Deep | 24px | 4px | 16px |
| Extreme | 30px | 6px | 30px |

### Persistence
- Panel position saved to `localStorage`
- Slider values saved to `localStorage`
- Restored on page load

---

## Spotlight Effect

Cards light up as cursor moves over them:
- Radial gradient centered on cursor position
- CSS custom properties `--mouse-x` and `--mouse-y` updated on `mousemove`
- Creates a "flashlight" effect on textured surfaces

---

## Magnetic Pull

Buttons attract toward cursor when nearby:
- Calculate distance between cursor and button center
- Apply `transform: translate()` proportional to proximity
- Reset on `mouseleave`

---

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~400 | Main page |
| `styles.css` | ~1,400 | Full design system |
| `script.js` | ~500 | Interactions + control panel |
| `DESIGN-GUIDE.md` | — | Design language reference |
| `Plan.md` | — | Development notes |

---

## Lessons Learned

- SVG `feTurbulence` is incredibly powerful for generating organic textures
- The 4-layer shadow formula is the key to realistic skeuomorphism
- Physical button states (inverted shadows) feel surprisingly satisfying
- Control panels turn a static page into an interactive playground
- Skeuomorphism works best when materials feel authentic, not glossy
