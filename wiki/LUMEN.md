# LUMEN

> *Premium darkness for serious analytics.*

---

## The Brief

LUMEN is a SaaS analytics product website built around the physics of emitted light. Set in a dark atmospheric environment, every element glows, pulses, or reflects light — as if the interface itself is a source of illumination.

This isn't "dark mode." This is a different environment entirely — like a control room at night, or a dashboard in a dark cockpit, or the bridge of a ship. Light doesn't come from above. It comes from within.

---

## The Feeling

> *You're looking at a screen in a dark room. The screen is the only light source. Data flows across it in cyan and violet. Numbers pulse gently. A chart draws itself in real-time. You feel calm. You feel in control. This is what serious tools look like.*

---

## The Decisions

### Why Dark Mode (But Not Really)?

Most dark modes are just light modes with inverted colors. LUMEN treats darkness as a **canvas for emitted light**. Elements don't just exist against a dark background — they *glow* against it. The darkness is the medium. The light is the message.

### Why Cyan + Violet?

Cyan (`#00F0FF`) is the color of electron microscopes, medical monitors, and sci-fi interfaces. It signals precision. Violet (`#8B5CF6`) is the color of creativity and depth. Together, they create a palette that feels both technical and alive.

### Why Cursor-Following Glow?

The glow effect on feature cards creates a sense of **responsiveness** — the interface reacts to your presence. It's not just decoration. It's a conversation between user and interface.

---

## The Obsidian Layer System

Four depth levels, each progressively lighter:

| Level | Hex | Use | Analogy |
|-------|-----|-----|---------|
| Depth 0 | `#090D16` | Page background | Deep space |
| Depth 1 | `#111827` | Card surfaces | Floating panels |
| Depth 2 | `#1F2937` | Elevated elements | Overlays, dropdowns |
| Depth 3 | `#374151` | Interactive states | Hover, active |

### Why "Obsidian"?

Obsidian is volcanic glass — dark, smooth, with subtle internal reflections. The layer system mimics this: each level is slightly lighter, as if catching more ambient light. The effect is depth without borders.

---

## The Luminescent Palette

| Color | Hex | Role | Glow |
|-------|-----|------|------|
| Cyan | `#00F0FF` | Primary accent | `0 0 20px rgba(0,240,255,0.3)` |
| Violet | `#8B5CF6` | Secondary accent | `0 0 20px rgba(139,92,246,0.3)` |
| Amber | `#F59E0B` | Warnings | `0 0 20px rgba(245,158,11,0.3)` |

### Glow Formula
```css
.glow-cyan {
  box-shadow: 
    0 0 10px rgba(0, 240, 255, 0.2),    /* Tight glow */
    0 0 20px rgba(0, 240, 255, 0.15),   /* Medium glow */
    0 0 40px rgba(0, 240, 255, 0.08);   /* Diffuse glow */
}
```

Three layers of glow create the illusion of light passing through a translucent surface.

---

## Cursor-Following Radial Glow

Feature cards light up as the cursor moves over them:

```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
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
  background: radial-gradient(
    circle, 
    rgba(0, 240, 255, 0.15), 
    transparent 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover::before {
  opacity: 1;
}
```

The effect is like a flashlight beam moving across a dark surface — the card catches the light and glows.

---

## Light-Pipe Navigation

A thin accent line runs across the nav bar, shifting color based on scroll position:

```css
.nav-pipe {
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--cyan) calc(var(--scroll-progress) * 100%),
    var(--violet) calc(var(--scroll-progress) * 100%)
  );
}
```

```javascript
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--scroll-progress', progress);
});
```

At 0% scroll, the line is fully cyan. At 100%, it's fully violet. The transition happens gradually as you scroll — like light traveling through a fiber optic cable.

---

## Canvas Visualizations

### Live Chart
- Cyan line with glow effect
- Gradient fill below line (0.1 opacity)
- Updates every 3 seconds with new data points
- Smooth animation (old points slide left, new points enter from right)

### Dashboard Metrics
- Animated counter numbers (count up on scroll)
- Pulsing green status dots (breathing animation)
- Progress bars with glow fill

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  animation: pulse 2s ease-in-out infinite;
}
```

---

## Keycap Buttons

3D buttons that look like physical keyboard keys:

```css
.keycap {
  background: linear-gradient(180deg, #1F2937, #111827);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 12px 24px;
  box-shadow:
    0 4px 0 #0a0f16,              /* Bottom edge (3D depth) */
    0 8px 20px rgba(0, 240, 255, 0.15); /* Glow projection */
  transition: all 0.15s;
}
.keycap:hover {
  box-shadow:
    0 4px 0 #0a0f16,
    0 8px 30px rgba(0, 240, 255, 0.3); /* Stronger glow */
}
.keycap:active {
  transform: translateY(4px);
  box-shadow:
    0 0 0 #0a0f16,
    0 2px 10px rgba(0, 240, 255, 0.1); /* Depressed */
}
```

The glow projection makes buttons feel like they're emitting light — as if the keycap is translucent and the LED beneath is shining through.

---

## Cosmic Shadows

Shadows in LUMEN aren't just dark — they have a faint neon tint:

```css
.card {
  box-shadow: 0 8px 32px rgba(0, 240, 255, 0.08);
}
```

This creates the illusion that objects are floating above a luminous surface — the shadow catches some of the ambient glow.

---

## Specular Hairlines

1px borders with subtle light reflection:

```css
.card {
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

Barely visible, but they catch the eye and define edges in the darkness. Without them, cards would bleed into the background.

---

## Telemetry Ticker

Footer contains scrolling metrics:
- Updates every 5 seconds
- Smooth horizontal scroll via CSS animation
- Monospace font (JetBrains Mono)
- Fades at edges (gradient mask)

```css
.ticker {
  animation: scroll 30s linear infinite;
}
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

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

## The Problems

### 1. Glow Performance on Mobile
**Problem:** Multiple `box-shadow` glow effects caused jank on mobile GPUs.

**Fix:** Reduced glow layers from 3 to 2 on mobile. Used `will-change: box-shadow` sparingly. Disabled cursor-following glow on `pointer: coarse` devices.

### 2. Cyan on Dark Accessibility
**Problem:** Cyan text on dark background failed WCAG contrast ratio (4.5:1).

**Fix:** Used cyan only for decorative elements (glows, accents). Text remained white or light gray. Cyan was reserved for non-text visual communication.

### 3. Scroll-Linked Nav Pipe
**Problem:** The light-pipe nav effect caused layout thrashing on scroll.

**Fix:** Used CSS custom properties (not JavaScript) for the scroll progress. CSS custom property updates don't trigger layout — only paint.

---

## Lessons Learned

1. **Dark mode is not "light mode with inverted colors."** It's a different environment with different rules. Light doesn't come from above — it comes from within.

2. **Cursor-following effects create responsiveness.** The interface feels alive when it reacts to your presence. But only on devices with cursors — disable on touch.

3. **Glow effects need restraint.** Too much glow and it becomes a Christmas tree. The best glow is the one you almost don't notice — but would miss if it were gone.

4. **The obsidian layer system gives depth without borders.** Four shades of dark, each slightly lighter, create physical hierarchy without a single border.

5. **Light-pipe navigation is a subtle but powerful** way to show scroll progress. It doesn't scream "you are here" — it whispers it.

---

*Last updated: September 2026*
