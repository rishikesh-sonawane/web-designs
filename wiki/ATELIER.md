# ATELIER & CO

> *Materials you can feel.*

---

## The Brief

ATELIER & CO is a luxury leather-goods brand website built entirely with skeuomorphic design. Every material texture — leather, wood, metal, glass, linen, plastic — is generated with CSS and SVG filters. Zero texture images. The site should feel like you could reach through the screen and touch the materials.

This is the anti-flat-design project. Not the glossy buttons of iOS 6 — but tactile materials that feel like they have weight, texture, and history.

---

## The Feeling

> *You're holding a leather journal. The cover is warm from your hands. You can feel the grain under your thumb. The metal clasp is cool and heavy. You open it to find pages of thick, cream paper. This is something that will outlast you.*

---

## The Decisions

### Why Skeuomorphism?

Flat design won the war. But somewhere along the way, we lost the ability to make things feel *real*. Skeuomorphism isn't about nostalgia — it's about material honesty. Leather looks like leather. Wood looks like wood. Metal looks like metal.

The question isn't "why skeuomorphism?" The question is "why did we stop?"

### Why Zero Images?

If you can generate a leather texture with SVG filters, you don't need a photograph. The generated texture is:
- Infinitely scalable
- Adjustable in real-time (via the control panel)
- Consistent across devices
- Proof that CSS is more powerful than most people think

### Why a Control Panel?

The control panel isn't a gimmick. It's a teaching tool. By letting visitors adjust shadow depth, bevel width, and corner radius, they understand *how* skeuomorphism works. The magic isn't hidden — it's exposed.

---

## The Material System

### 1. Leather

The leather texture uses SVG `feTurbulence`:

```html
<filter id="leather">
  <feTurbulence 
    type="fractalNoise" 
    baseFrequency="0.04" 
    numOctaves="5" 
    result="noise" 
  />
  <feColorMatrix 
    type="saturate" 
    values="0" 
    in="noise" 
    result="grayNoise" 
  />
  <feBlend 
    in="SourceGraphic" 
    in2="grayNoise" 
    mode="multiply" 
  />
</filter>
```

Combined with:
- Brown base gradient (`#8B6C4A` → `#5C4033`)
- Subtle noise overlay
- Inner shadow for depth (`inset 0 2px 4px rgba(0,0,0,0.3)`)
- Top border highlight (`border-top: 1px solid rgba(255,255,255,0.1)`)

### 2. Wood Grain

```css
.wood {
  background: 
    repeating-linear-gradient(
      87deg,
      transparent,
      transparent 3px,
      rgba(92, 64, 33, 0.08) 3px,
      rgba(92, 64, 33, 0.08) 6px
    ),
    linear-gradient(180deg, #8B6C4A, #5C4033);
}
```

### 3. Brushed Metal

```css
.metal {
  background: 
    conic-gradient(
      from 0deg at 50% 50%,
      #C0C0C0, #E8E8E8, #A0A0A0, #D0D0D0, #C0C0C0
    );
  /* + noise overlay for grain */
}
```

### 4. Glass

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 5. Linen

```css
.linen {
  background:
    repeating-linear-gradient(
      0deg,
      transparent, transparent 2px,
      rgba(139, 119, 101, 0.05) 2px,
      rgba(139, 119, 101, 0.05) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent, transparent 2px,
      rgba(139, 119, 101, 0.05) 2px,
      rgba(139, 119, 101, 0.05) 4px
    ),
    #F5F0E6;
}
```

### 6. Plastic

```css
.plastic {
  background: linear-gradient(135deg, #E8E8E8, #D0D0D0);
  /* + subtle noise for texture */
}
```

---

## The Shadow Formula

ATELIER uses a 4-layer shadow system for depth:

```css
.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),           /* Ambient — soft, close */
    0 4px 8px rgba(0, 0, 0, 0.12),           /* Drop — medium distance */
    0 12px 24px rgba(0, 0, 0, 0.15),         /* Depth — far, diffused */
    inset 0 1px 0 rgba(255, 255, 255, 0.1);  /* Reflected light — top edge */
}
```

### Why Four Layers?
Real objects cast multiple shadows:
1. **Ambient** — Soft shadow directly beneath (occlusion)
2. **Drop** — Primary shadow from the light source
3. **Depth** — Diffused shadow from ambient light
4. **Reflected light** — Bright edge where light catches the surface

Most CSS shadows use one layer. Four layers create the illusion of physical presence.

---

## Beveled Edges

```css
.beveled {
  border-top: 1px solid rgba(255, 255, 255, 0.15);   /* Highlight */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);        /* Shadow */
  border-left: 1px solid rgba(255, 255, 255, 0.08);   /* Left highlight */
  border-right: 1px solid rgba(0, 0, 0, 0.1);         /* Right shadow */
}
```

The highlight on top and shadow on bottom creates the illusion of a raised, beveled surface — like a physical button or panel edge.

---

## Physical Buttons

Buttons respond to click with inverted shadows:

| State | Shadow | Transform |
|-------|--------|-----------|
| Rest | 4-layer outward | none |
| Hover | Slightly reduced | translateY(-1px) |
| Active/Pressed | **Inverted** (inset) | translateY(1px) |

```css
.btn:active {
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 12px 24px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(1px);
}
```

This creates the illusion of a physical button being depressed into the surface.

---

## The Control Panel

A floating, draggable panel that modifies the entire design system in real-time.

### Sliders

| Control | Range | CSS Variable | Effect |
|---------|-------|--------------|--------|
| Shadow Depth | 0–30px | `--shadow-depth` | Increases/decreases box-shadow spread |
| Bevel Width | 0–6px | `--bevel-width` | Adjusts border highlight/shadow |
| Corner Radius | 0–30px | `--radius` | Changes border-radius |

### Presets

| Name | Shadow | Bevel | Radius | Feel |
|------|--------|-------|--------|------|
| Default | 12px | 2px | 8px | Balanced |
| Flat | 0px | 0px | 0px | Modern, minimal |
| Deep | 24px | 4px | 16px | Dramatic, luxurious |
| Extreme | 30px | 6px | 30px | Maximum depth |

### Persistence
- Panel position saved to `localStorage`
- Slider values saved to `localStorage`
- Restored on page load
- Reset button clears `localStorage` and returns to defaults

---

## Spotlight Effect

Cards light up as cursor moves over them:

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
  background: radial-gradient(circle, rgba(255,255,255,0.1), transparent);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
```

The effect is like shining a flashlight on textured material — the texture catches the light differently at different angles.

---

## Chrome Specular Highlights

Metal elements have specular highlights that follow the cursor:

```css
.metal-button::after {
  content: '';
  position: absolute;
  top: var(--highlight-y, 30%);
  left: var(--highlight-x, 50%);
  width: 60%;
  height: 30%;
  background: radial-gradient(
    ellipse, 
    rgba(255,255,255,0.4), 
    transparent 70%
  );
  pointer-events: none;
}
```

The highlight position updates on mousemove, creating the illusion of a real metal surface reflecting ambient light.

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

## The Problems

### 1. SVG Filter Performance
**Problem:** Applying `feTurbulence` to large surfaces caused jank on mobile.

**Fix:** Applied the filter to smaller elements only. For large surfaces, used CSS gradients instead. Limited `numOctaves` to 3 on mobile.

### 2. Control Panel Dragging on Touch
**Problem:** The draggable control panel didn't work on touch devices.

**Fix:** Added touch event handlers (`touchstart`, `touchmove`, `touchend`) alongside mouse events. Used `e.touches[0].clientX` instead of `e.clientX`.

### 3. Glassmorphism Browser Support
**Problem:** `backdrop-filter` doesn't work in Firefox (as of 2024).

**Fix:** Added a fallback background color for browsers without `backdrop-filter` support.

---

## Lessons Learned

1. **SVG `feTurbulence` is incredibly powerful** for generating organic textures. It's the secret weapon of CSS-only material design.

2. **The 4-layer shadow formula** is the key to realistic skeuomorphism. Single-layer shadows look flat. Four layers look physical.

3. **Physical button states** (inverted shadows) feel surprisingly satisfying. The brain interprets the inverted shadow as "this button went down."

4. **Control panels turn a static page into an interactive playground.** They're the best way to demonstrate a design system — they make the system tangible.

5. **Skeuomorphism works best when materials feel authentic, not glossy.** Real leather has grain. Real wood has variation. Real metal has imperfections. The goal is material honesty, not material fantasy.

---

*Last updated: September 2026*
