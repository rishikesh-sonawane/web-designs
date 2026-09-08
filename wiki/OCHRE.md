# OCHRE

> *Cloth remembers the hands that make it.*

---

## The Brief

OCHRE is a brand website for a fictional Mediterranean natural-dye house in Ronda, Spain. Three generations of artisans working with indigo, pomegranate, walnut, and madder root. The site should feel like stepping into their workshop — sun-warmed, textural, unhurried.

Every visual element is drawn at runtime using Canvas 2D. No images. No SVGs. No illustrations loaded from disk. The constraint was deliberate: if you can't use images, how do you make a brand feel real?

---

## The Feeling

> *You're sitting in a courtyard in Ronda. The walls are whitewashed limestone. A cloth is drying in the sun — indigo fading to sky blue at the edges. You can almost smell the pomegranate rinds soaking in the dye vat. Nobody is selling you anything. They're showing you how they work.*

---

## The Decisions

### Why Terracotta?

The palette needed to feel Mediterranean without being cliché. Not olive green and sunset orange — that's a postcard. Terracotta is the color of the actual material: baked clay, dried dye, the earth of southern Spain.

`#C4632A` isn't a pretty color. It's a working color. The color of a dye master's hands.

### Why Canvas 2D?

The constraint of drawing everything at runtime forces creative solutions. You can't just drop in a stock photo of pottery — you have to *make* the pottery. That process of construction mirrors the brand's own process: everything made by hand, from raw materials.

### Why Bilingual?

OCHRE is rooted in Ronda, Spain. The site should feel local first, international second. Spanish comes first in the navigation. English follows. The toggle isn't a feature — it's a statement about where this brand belongs.

---

## The Brand

### Origin
Ronda, Spain — a pueblo blanco perched above the El Tajo gorge. The town has been a center for textile arts since the Moorish period.

### Heritage
Three generations:
1. **Abuela Carmen** — Learned dyeing from her mother. Specialized in indigo.
2. **Madre Lucía** — Expanded to pomegranate and walnut. Established the workshop.
3. **Hija Elena** — The current generation. Blending traditional techniques with contemporary design.

### Philosophy
> *"We don't dye cloth. We teach it to remember."*

Each piece carries the fingerprint of its maker, the water of its region, the season of its harvest. No two pieces are identical. That's not a flaw — it's the point.

### Materials
| Dye Source | Color | Season |
|------------|-------|--------|
| Indigo | Deep blue → sky blue | Summer harvest |
| Pomegranate | Warm yellow → gold | Autumn rinds |
| Walnut | Rich brown → umber | Winter husks |
| Madder Root | Deep red → terracotta | Spring roots |

---

## Canvas 2D Artwork

Every visual is drawn at runtime. Here's how:

### Pottery
```javascript
// Bezier curves for vessel shape
ctx.beginPath();
ctx.moveTo(100, 300);
ctx.bezierCurveTo(80, 250, 80, 150, 100, 100);
ctx.bezierCurveTo(120, 50, 180, 50, 200, 100);
// Gradient fill for clay texture
const grad = ctx.createLinearGradient(100, 50, 200, 300);
grad.addColorStop(0, '#C4632A');
grad.addColorStop(1, '#8B4513');
ctx.fillStyle = grad;
ctx.fill();
```

### Textiles
- Repeating patterns with slight randomness
- Warp and weft simulation via alternating lines
- Color variation per thread (no two identical)

### Botanicals
- Path drawing for stems and leaves
- Radial gradients for flower centers
- Slight curve variation for organic feel

### Wabi-Sabi Circles
- Imperfect arc paths (not perfect circles)
- Varying stroke width
- Deliberate asymmetry

---

## Interactive Features

### Dye-Bath Selector

Click a dye source → watch cloth change color in real-time:

1. User clicks "Indigo" button
2. Canvas redraws cloth with indigo color values
3. Transition animation (cloth appears to soak)
4. Text updates describing the indigo process
5. Background particles shift to blue tones

### Floating Botanical Particles

Emoji botanicals (🌿, 🍂, 🍃, 🪴) drift across the viewport:
- Random spawn positions along top edge
- Gentle sine-wave horizontal motion
- Varying opacity (0.3–0.7)
- Slow rotation
- Disabled on `prefers-reduced-motion`

### Linen Texture Overlay

CSS repeating gradients mimicking woven fabric:
```css
.linen-texture {
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(139, 119, 101, 0.03) 2px,
      rgba(139, 119, 101, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(139, 119, 101, 0.03) 2px,
      rgba(139, 119, 101, 0.03) 4px
    );
}
```

---

## Typography

| Role | Font | Weight | Use |
|------|------|--------|-----|
| Display | Playfair Display | 400, 700 | Headlines, hero text |
| Body | Plus Jakarta Sans | 400, 500, 600 | Paragraphs, UI |
| Handwritten | Caveat | 400 | Clock, signatures, personal notes |

The handwritten font in the footer clock creates a personal touch — like someone jotting down the time on a piece of cloth.

---

## The Arch Motif

Arches appear at three scales throughout the site:

1. **Hero frame** — A large arch frames the hero section, like a doorway into the workshop
2. **Courtyard sections** — Medium arches separate content sections, like courtyard openings
3. **Dye plates** — Small arches contain the dye source colors, like ceramic plates

The arch is a Moorish architectural element — appropriate for a brand rooted in Ronda's history.

---

## Bilingual Navigation

Toggle between Spanish and English:
- All text elements have `data-es` and `data-en` attributes
- JavaScript swaps `textContent` on toggle click
- Spanish is the default (the brand's home language)
- The toggle itself is labeled in both languages

---

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~500 | Main page structure |
| `styles.css` | ~800 | Design system |
| `script.js` | ~600 | Canvas drawing + interactions |
| `DESIGN-GUIDE.md` | — | Design language reference |
| `DESIGN-SPEC.md` | — | Implementation specification |
| `BRAND.md` | — | Brand identity guidelines |
| `AUDIT.md` | — | Quality audit |

---

## The Problems

### 1. Canvas Performance on Mobile
**Problem:** Drawing 15+ botanical elements every frame caused jank on mobile devices.

**Fix:** Reduced particle count on mobile (`Math.min(8, window.innerWidth / 100)`). Added `will-change: transform` to canvas elements. Used `requestAnimationFrame` instead of `setInterval`.

### 2. Emoji Rendering Inconsistency
**Problem:** Botanical emoji looked different across platforms (Apple, Google, Samsung).

**Fix:** Accepted the inconsistency as part of the charm. Different platforms rendering the same emoji differently mirrors how different hands would dye the same cloth differently.

---

## Lessons Learned

1. **Canvas 2D is surprisingly capable** for brand visuals. The constraint of drawing everything at runtime forces creative solutions that feel more authentic than stock imagery.

2. **Organic aesthetics need imperfection.** Perfect bezier curves look mechanical. Adding slight randomness to control points makes everything feel hand-drawn.

3. **Linen textures via CSS gradients** can look remarkably realistic. The key is subtlety — barely visible lines at varying opacities.

4. **Bilingual support is easy** with data attributes and JS swapping. The hard part isn't the code — it's the content strategy (which language comes first, how to handle length differences).

5. **Floating particles add life** but must respect `prefers-reduced-motion`. This isn't optional — it's a requirement.

---

*Last updated: September 2026*
