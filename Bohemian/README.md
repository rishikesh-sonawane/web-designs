# Bohemian — The Organic Interface

> Live with intention. Create with soul.

## What Is Bohemian Design?

Bohemian (Boho-Chic) design draws from natural materials, artisan craft, and earth-toned warmth. It rejects harsh borders and clinical whites in favor of woven linen textures, architectural archways, botanical elements, and sun-drenched terracotta palettes. The interface feels like a high-end natural lifestyle journal.

---

## Design System

### Color Palette

| Token | Value | Use |
|-------|-------|-----|
| `--bg-base` | `#F5EFEB` | Terracotta-tinted alabaster cream |
| `--surface-sand` | `#EAE3D2` | Dried pampas sand |
| `--surface-ivory` | `#FAF6F0` | Clean matte ivory |
| `--accent-terracotta` | `#C67B5C` | Desert terracotta (primary) |
| `--accent-sage` | `#8A9A86` | Muted sage green |
| `--accent-mustard` | `#D4A373` | Vintage mustard gold |
| `--text-primary` | `#3D3028` | Deep warm charcoal |
| `--text-secondary` | `#6B5E52` | Warm body text |
| `--text-muted` | `#9B8E82` | Labels and metadata |

### Typography

| Font | Role | Character |
|------|------|-----------|
| Playfair Display | Display headings | Curvy, high-contrast retro serif |
| Plus Jakarta Sans | Body & labels | Clean, legible neutral sans |
| Caveat | Annotations & time | Handwritten warmth |

### Linen Texture

```css
/* Woven linen backplate via repeating gradients */
background-image:
  repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,119,101,0.03) 2px, rgba(139,119,101,0.03) 3px),
  repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,119,101,0.03) 2px, rgba(139,119,101,0.03) 3px);
```

### Architectural Archway

```css
/* Oasis arch frame */
border-radius: 200px 200px 0 0;
```

---

## Interactive Features

### Canvas Art — Arch Hero
- Terracotta landscape with sun, mountains, foreground earth
- Handthrown pottery silhouette with plant growing from it
- Ground texture dots and linen overlay
- Re-renders on window resize

### Canvas Art — Courtyard Cards
Each card type renders unique abstract art:

| Type | Subject | Technique |
|------|---------|-----------|
| pottery | Three vessels | Ellipse rims + quadratic body curves |
| textile | Woven pattern | Alternating color strips (vertical + horizontal) |
| botanical | Leaf silhouettes | Rotated ellipses at various angles |
| ceramic | Glaze patterns | Radial gradient circles |
| weave | Macramé knots | Sine-wave vertical lines |
| space | Interior room | Window arch, light beam, plant |

### Canvas Art — Journal Entries
| Type | Subject | Technique |
|------|---------|-----------|
| journal1 | Wabi-sabi circle | Irregular radius sine/cosine path |
| journal2 | Desert strips | Horizontal color bands + sun circle |
| journal3 | Manifesto | Random text-like line widths |

### Floating Botanicals
- Emoji symbols (🌿, ✦, ☀, 🌾) drift across the viewport
- Spawn rate ~30% every 3 seconds
- 20-second drift animation with rotation

### Hero Button
- Smooth scroll to collection section
- Toast notification on click

### FAQ Accordion
- Expand/collapse with smooth max-height transition
- Plus icon rotates 45° to become ×

### Contact Form
- Submit → personalized toast with user name → reset

### Nav Time
- Updates every 30 seconds
- Caveat handwritten font

### Studio Time
- Live clock in footer
- Updates every second

### Scroll Reveal
- IntersectionObserver on all major sections
- Fade up with 0.8s cubic-bezier

### Header Auto-Hide
- Hides on scroll down, shows on scroll up

---

## Sections

| Section | Purpose |
|---------|---------|
| Horizon Ribbon Nav | Seamless nav with wordmark, links, time |
| Botanical Archway Hero | Colloidal headline, arch-framed canvas art, CTA |
| Philosophy | Editorial narrative with Shakespeare quote |
| Curation Courtyard | 6 asymmetric cards with unique canvas art |
| Journal | 3 editorial entries with canvas illustrations |
| Studio | Stats + 2 testimonial arch cards |
| Pricing | 3 organic tiers (Seed/Garden/Grove) |
| Connect | Conversational contact form |
| FAQ | 4 expandable wisdom items |
| Earth-Loom Footer | Philosophy ticker + studio time |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| >1024px | Full 2-column hero, 3-column courtyard |
| 768–1024px | Single-column hero, 2-column courtyard, hidden nav |
| <640px | Everything single-column, stacked |

---

## Tech Stack

- Pure Semantic HTML5
- CSS (custom properties, organic border-radius, linen textures)
- Vanilla JavaScript
- Canvas 2D API for all artwork
- IntersectionObserver for scroll reveals

---

## Future Enhancements

- [ ] Parallax scrolling on arch canvas
- [ ] Cursor-reactive botanical elements
- [ ] Sound design (gentle wind, pottery wheel)
- [ ] Dark mode with warm charcoal tones
- [ ] Interactive pottery builder tool
- [ ] Seasonal color palette rotation
- [ ] Weaving pattern generator
- [ ] Guestbook with handwritten-style entries
