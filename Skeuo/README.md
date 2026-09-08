# Skeuo — Hyper-Realistic Skeuomorphic Design System

A production-grade design system that replicates real-world materials — leather, wood, brushed metal, glass, linen, and plastic — with intense specular highlights, heavy multi-layer drop shadows, and beveled edges.

## Design Philosophy

Skeuomorphism mimics physical objects. Every surface has texture, every shadow has depth, every highlight tells you where the light source is. The goal is to make digital interfaces feel **tangible and weighty** — like objects you could reach out and touch.

## Core Design Principles

### 1. Material Textures
Every surface is made from CSS gradients — no image files:
- **Leather**: `fractalNoise` SVG filter + warm brown gradients + grain overlay
- **Wood**: Repeating linear gradients simulating grain lines + warm undertones
- **Brushed Metal**: 1px horizontal lines + vertical gradient sheen
- **Glass**: `backdrop-filter: blur()` + edge highlights + transparency
- **Linen**: Crosshatch pattern via two perpendicular `repeating-linear-gradient`
- **Plastic**: Three-stop vertical gradient (light→mid→dark) + high specular

### 2. Heavy Shadows (4-layer formula)
```css
box-shadow:
  0 1px 0 rgba(255, 255, 255, 0.4),    /* reflected light */
  0 2px 0 rgba(255, 255, 255, 0.2),    /* secondary reflection */
  0 4px 8px rgba(0, 0, 0, 0.15),       /* contact shadow */
  0 8px 24px rgba(0, 0, 0, 0.2);       /* ambient shadow */
```

### 3. Beveled Edges
```css
.sk-card::before {
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.35),  /* top highlight */
    inset 0 -2px 0 rgba(0, 0, 0, 0.08);        /* bottom shadow */
}
```

### 4. Physical Button States
- **Default**: Raised with layered shadows + specular highlight
- **Hover**: Deeper shadows, slight lift
- **Active/Pressed**: Shadow inverts to `inset`, button depresses into surface

### 5. Chrome Specular Highlights
Buttons and cards have bright white streaks on top edges that simulate light reflecting off polished surfaces.

## Features

| Feature | Description |
|---------|-------------|
| **6 Material Textures** | Leather, wood, metal, glass, linen, plastic |
| **Heavy Drop Shadows** | 4-layer shadow system with reflected light |
| **Beveled Edges** | Inner highlight + inner shadow for 3D depth |
| **Physical Buttons** | Press-to-depress with inverted shadows |
| **Chrome Specular** | Bright white highlights on edges |
| **Theme Toggle** | Light/dark with material-appropriate variants |
| **Control Panel** | Adjustable shadow depth, bevel, radius |
| **Draggable Panel** | Reposition anywhere, persists to localStorage |
| **Toast Notifications** | Leather-textured, stacked, auto-dismiss |
| **Contact Form** | Floating labels, inset inputs, validation |
| **Scroll Reveal** | Staggered entrance animations |
| **Spotlight Effect** | Cursor-following radial highlight |
| **Magnetic Pull** | Buttons attract toward cursor |
| **Button Ripples** | Material-style click feedback |
| **Responsive** | Mobile, tablet, desktop breakpoints |
| **Accessibility** | ARIA labels, focus-visible, reduced-motion |

## Control Panel

The floating gear icon (bottom-right) gives you 3 sliders:

| Slider | Range | Effect |
|--------|-------|--------|
| **Shadow Depth** | 0–30 | How far shadows extend from elements |
| **Bevel** | 0–6 | Width of the beveled edge highlight/shadow |
| **Radius** | 0–30px | Corner rounding on all elements |

Plus 4 presets: Default, Flat, Deep, Extreme.

## File Structure

```
skeuo/
├── index.html      # Full page structure
├── styles.css      # Complete design system (~1400 lines)
├── script.js       # All interactivity (~500 lines)
└── README.md       # This file
```

## Quick Start

```bash
cd skeuo
open index.html
```

No build tools, no dependencies, no npm. Just open the HTML file.

## CSS Custom Properties

Override any token to customize:

```css
:root {
  --accent: #8B4513;        /* Primary leather brown */
  --bg: #d4c5a9;            /* Parchment background */
  --radius: 12px;           /* Base border-radius */
  --bevel-size: 2px;        /* Bevel highlight width */
  --shadow-heavy: 0 12px 40px rgba(0, 0, 0, 0.35),
                  0 4px 12px rgba(0, 0, 0, 0.2);
}
```

## Comparison with Other Morphisms

| Property | Skeuo | Glass | Neu | Clay | Liquid Glass |
|----------|-------|-------|-----|------|-------------|
| **Background** | Textured (linen) | Dynamic blobs | Solid matching | Colorful | Dynamic blobs |
| **Surface** | Material texture | Transparent glass | Solid matching | Solid white | Transparent glass |
| **Shadow** | 4-layer heavy | Soft ambient | Dual-direction | 4-layer clay | Soft ambient |
| **Transparency** | None | High (45%) | None | None | Very high (8%) |
| **Borders** | 1px dark | 1px specular | None | None | 1px specular |
| **Bevel** | Yes (inner shadow/highlight) | No | No | No | No |
| **Specular** | Intense white streaks | Subtle | None | None | Edge caustics |
| **Textures** | Leather, wood, metal, glass, linen, plastic | Blur noise | None | Noise | Blur noise |
| **Button press** | Physical depress | Hover lift | Inset shadow | Clay squish | Hover lift |

## Roadmap

### v2.0 — Extended Materials
- [ ] Brushed aluminum with directional grain
- [ ] Carbon fiber weave pattern
- [ ] Concrete/cement texture
- [ ] Fabric/canvas weave
- [ ] Ceramic glaze effect

### v2.1 — Interactive Depth
- [ ] Tilt-on-hover 3D perspective
- [ ] Drag-to-rearrange surfaces
- [ ] Depth-of-field blur on scroll
- [ ] Shadow direction follows cursor

### v2.2 — Sound & Haptics
- [ ] Subtle click sounds on button press
- [ ] Haptic feedback API integration
- [ ] Material-specific sound profiles

## License

MIT
