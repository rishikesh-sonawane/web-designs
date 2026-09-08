# Design System

> The shared foundation beneath six different design languages.

---

## Overview

The portfolio and all six case study pages share a single design system defined in `styles.css` (733 lines). Each project customizes it via a single CSS variable: `--proj-accent`.

This isn't a component library. It's a **design vocabulary** — tokens, patterns, and conventions that create consistency without uniformity.

---

## Tokens

### Colors

```css
:root {
  --bg:      #F7F4EF;  /* Warm cream */
  --ink:     #1F1B16;  /* Deep brown-black */
  --accent:  #A4592F;  /* Terracotta */
  --muted:   #6B645A;  /* Warm gray */
  --border:  #D6CFC5;  /* Subtle divider */
  --surface: #EDE8E0;  /* Slightly darker cream */
}
```

### Typography

```css
:root {
  --font-display: 'Fraunces', serif;
  --font-body:    'Inter', sans-serif;
}
```

**Fraunces** — Variable font with optical size axis. Gets more refined at larger sizes. Used for headings, hero text, and display type.

**Inter** — Clean, legible sans-serif. Used for body text, UI elements, and small type.

### Spacing

8px grid:
```css
--s1: 8px;     --s2: 16px;    --s3: 24px;
--s4: 32px;    --s5: 48px;    --s6: 64px;
--s7: 128px;
```

### Layout

```css
--max-w:    1200px;
--gutter:   clamp(24px, 4vw, 40px);
--nav-h:    72px;
```

---

## Components

### Navigation

Fixed glass-morphism nav:
```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-h);
  background: rgba(247, 244, 239, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 100;
  border-bottom: 1px solid var(--border);
}
```

- Fixed position, always visible
- Glass-morphism blur (backdrop-filter)
- Hamburger menu on mobile (< 860px)
- ARIA states for accessibility

### Work Items

Six layout variants for project cards:

| Variant | Layout | Use |
|---------|--------|-----|
| `split` | Image left, text right | Default |
| `full` | Full-width image + overlay | Hero cards |
| `offset` | Text left, image right (offset) | Variety |
| `center` | Centered text, image below | Featured |
| `flip` | Image right, text left | Variety |
| `standard` | Simple split | Default |

Each variant uses CSS Grid or Flexbox with consistent spacing.

### Buttons

Four button styles:

```css
.btn-solid {
  background: var(--ink);
  color: var(--bg);
  border: none;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--ink);
  color: var(--ink);
}

.btn-ghost {
  background: transparent;
  border: none;
  color: var(--ink);
}

.btn-light {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

All buttons:
- 48px minimum height (touch targets)
- `transition: all 0.3s cubic-bezier(0.2, 0, 0, 1)`
- `:focus-visible` outline in accent color

### Chips

Small label elements:
```css
.chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--surface);
  color: var(--muted);
}
```

---

## Patterns

### Scroll Reveal

Elements animate in as they enter the viewport:

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s, transform 0.6s cubic-bezier(0.2, 0, 0, 1);
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

Direction variants:
```css
.reveal-left  { transform: translateX(-30px); }
.reveal-right { transform: translateX(30px); }
.reveal-down  { transform: translateY(-30px); }
```

### Editorial Link

Underline wipe on hover:
```css
.editorial-link {
  position: relative;
  text-decoration: none;
  color: var(--ink);
}
.editorial-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);
}
.editorial-link:hover::after {
  transform: scaleX(1);
}
```

### Magnetic Button

Button attracts toward cursor:
```javascript
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
btn.addEventListener('mouseleave', () => {
  btn.style.transform = 'translate(0, 0)';
});
```

### 3D Tilt

Cards tilt toward cursor:
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `
    perspective(800px)
    rotateY(${x * 10}deg)
    rotateX(${-y * 10}deg)
  `;
});
```

---

## Case Study System

Each case study in `work/` inherits the shared design system and customizes via `--proj-accent`:

```css
/* In each case study's <style> */
:root {
  --proj-accent: #A4592F; /* Override per project */
}
```

### Layout

```
┌─────────────────────────────────────┐
│           CASE HERO                 │
│  Project number · name · tagline    │
├──────────────┬──────────────────────┤
│              │                      │
│   ASIDE      │      BODY            │
│   (specs,    │   (content           │
│    meta)     │    sections)         │
│              │                      │
├──────────────┴──────────────────────┤
│           SPEC GRID                 │
│  4-column grid of specifications    │
├─────────────────────────────────────┤
│           CASE CTA                  │
│  Links to live site + next project  │
└─────────────────────────────────────┘
```

### Navigation Chain

Case studies link to each other in a circular chain:
```
OCHRE → KEEL → ATELIER → LUMEN → LAYER → STONE → OCHRE
```

Each has "Next project →" at the bottom.

---

## Responsive Breakpoints

```css
/* Mobile first */
@media (max-width: 860px) {
  /* Mobile nav (hamburger) */
  /* Single column layouts */
  /* Reduced spacing */
}

@media (min-width: 861px) {
  /* Desktop nav */
  /* Multi-column layouts */
  /* Full spacing */
}
```

---

## Accessibility

### Requirements
- Skip link (first focusable element)
- `:focus-visible` on all interactive elements
- 48px minimum touch targets
- Semantic HTML (nav, main, article, section)
- ARIA labels on icons
- `prefers-reduced-motion` support
- Color contrast WCAG AA (4.5:1)

### reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
  .noise { display: none; }
}
```

---

## Performance

- No external dependencies (except Google Fonts)
- CSS custom properties for theming (no preprocessor needed)
- IntersectionObserver for scroll reveals (no scroll event listeners)
- `will-change` on animated elements
- `content-visibility: auto` on below-fold sections (in STONE)
- Minimal DOM manipulation

---

## File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `styles.css` | 733 | Complete design system |
| `script.js` | 268 | Shared interactions |

---

*Last updated: September 2026*
