# OCHRE — Deep Dive

## Overview

OCHRE is a brand website for a fictional Mediterranean natural-dye house in Ronda, Spain. Every visual element is drawn at runtime using Canvas 2D — no images, no SVGs, no illustrations loaded from disk.

**Live:** [rishikesh-sonawane.github.io/web-designs/Bohemian/](https://rishikesh-sonawane.github.io/web-designs/Bohemian/)  
**Directory:** `Bohemian/`  
**Stack:** Pure HTML5 + CSS3 + Canvas 2D API + Vanilla JS

---

## Brand Story

### Origin
Ronda, Spain — a pueblo blanco perched above the El Tajo gorge. Three generations of natural-dye artisans working with indigo, pomegranate, walnut, and madder root.

### Philosophy
> *"Cloth remembers the hands that make it."*

OCHRE doesn't mass-produce. Each piece carries the fingerprint of its maker, the water of its region, the season of its harvest.

### Name Meaning
Ochre — a natural clay pigment of yellowish-brown color. The name itself is a material.

---

## Design Language

### Color Palette

| Token | Hex | Inspiration |
|-------|-----|-------------|
| Terracotta | `#C4632A` | Baked clay, dried dye |
| Linen | `#F5F0E6` | Raw undyed cloth |
| Sand | `#D8C9A3` | Ronda's limestone |
| Indigo | `#2C4A6E` | Deep vat dye |
| Walnut | `#5C3D2E` | Walnut husk brown |

### Typography
- **Display:** Playfair Display — Classic, editorial
- **Body:** Plus Jakarta Sans — Modern, clean
- **Handwritten:** Caveat — Clock, signatures, personal touches

### Motifs
- **Arch shapes** — Three scales: hero frame, courtyard sections, dye plates
- **Botanical illustrations** — Canvas-drawn plants and flowers
- **Linen texture** — CSS repeating gradients mimicking woven fabric
- **Wabi-sabi circles** — Imperfect, hand-drawn aesthetic

---

## Canvas 2D Artwork

Every visual in OCHRE is drawn at runtime. No images are loaded.

### Drawn Elements
| Element | Technique |
|---------|-----------|
| Pottery | Bezier curves + gradients |
| Textiles | Repeating patterns + warp/weft simulation |
| Botanicals | Path drawing + fill gradients |
| Ceramics | Radial gradients + shadows |
| Wabi-sabi circles | Imperfect arc paths |
| Desert strips | Layered gradient bands |

### Dye-Bath Selector
Interactive feature where clicking a dye source (indigo, pomegranate, walnut, madder) triggers:
1. Canvas redraw of cloth with new color
2. Transition animation
3. Text update describing the dye process

---

## Floating Particles

Emoji botanicals (🌿, 🍂, 🌾, 🪴) drift across the viewport:
- Random spawn positions
- Gentle sine-wave motion
- Varying opacity and rotation
- Disabled on `prefers-reduced-motion`

---

## Bilingual Navigation

Toggle between Spanish and English:
- All text content has `data-es` and `data-en` attributes
- JavaScript swaps `textContent` on toggle
- Clock always shows in Caveat font

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

## Lessons Learned

- Canvas 2D is surprisingly capable for brand visuals — but requires careful performance management
- Organic, hand-drawn aesthetics need imperfection (slight randomness in curves, opacity)
- Linen textures via CSS gradients can look remarkably realistic
- Bilingual support is easy with data attributes + JS swapping
- Floating particles add life but must respect reduced-motion preferences
