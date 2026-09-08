# Portfolio

> *The seventh project.*

---

## The Brief

The portfolio is the seventh project in the collection. It's not just a container for the other six — it's a project in its own right, with its own design language, its own interactions, and its own personality.

Where the six concept projects are products, the portfolio is a person. Warm, editorial, unhurried. It doesn't compete with the work. It frames it.

---

## The Feeling

> *You're reading a well-designed magazine. The paper is thick. The typography is confident. There's plenty of whitespace. You're in no hurry. Neither is the designer.*

---

## The Design Language

### Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#F7F4EF` | Warm cream background |
| `--ink` | `#1F1B16` | Deep brown-black text |
| `--accent` | `#A4592F` | Terracotta accent |
| `--muted` | `#6B645A` | Warm gray (secondary text) |
| `--border` | `#D6CFC5` | Subtle dividers |

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Fraunces | 400–700 | clamp(2.5rem, 5vw, 4.5rem) |
| Body | Inter | 300–500 | clamp(1rem, 1.2vw, 1.125rem) |

Fraunces is a variable font with optical size — it gets more refined at larger sizes. Inter is clean and legible at body size.

### Spacing

8px grid system:
```css
--s1: 8px;
--s2: 16px;
--s3: 24px;
--s4: 32px;
--s5: 48px;
--s6: 64px;
--s7: 128px;
```

---

## Sections

### Hero
- Name in large Fraunces serif
- Title and tagline
- Scroll indicator (animated chevron)
- Skip link for accessibility

### Selected Work
Six project cards with different layout variants:
1. **STONE** — Full-width, image left
2. **OCHRE** — Offset right
3. **KEEL** — Center aligned
4. **ATELIER** — Flip (image right)
5. **LUMEN** — Standard split
6. **LAYER** — Standard split

Each card has:
- Project name and number
- One-line description
- Tech stack
- Accent color (via `--proj-accent`)
- "View case study" link
- "View live site" link

### Services
Three offerings with 3D tilt cards:
1. **Business Website** — Full brand identity + build
2. **Landing Page** — Single-page conversion focus
3. **Redesign** — Refresh existing digital presence

### Process
Four steps:
1. **Discover** — Understanding the business
2. **Design** — Crafting the visual language
3. **Develop** — Building with clean code
4. **Deliver** — Launching and iterating

### Design + Engineering
Philosophy statement about the intersection of design and code.

### About
- Bio paragraph
- Social links (GitHub, LinkedIn, Instagram) as pill buttons with SVG icons

### Contact
- Formspree-powered form
- Fields: Name, Email, Subject, Message
- Validation with error states
- Success/error status messages
- Email fallback (mailto: link)

### Footer
- Copyright with auto-updating year
- Inline SVG social icons
- Back-to-top button

---

## Premium Features

### Custom Cursor

Dot + ring cursor with smooth lag:

```javascript
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
  ring.style.left = `${cursorX}px`;
  ring.style.top = `${cursorY}px`;
  
  requestAnimationFrame(animateCursor);
}
```

- Hidden on `pointer: coarse` devices
- `cursor: none` on body
- Ring expands on hover over interactive elements
- Click scales the dot

### Page Loader

Letter-stagger animation:

```
R → I → S → H → I
```

Each letter fades in with a 100ms delay. After all letters appear, a line draws across. Then the subtitle fades in. Total duration: 1.4s.

### Scroll Progress Bar

3px bar at the top of the page, accent color:
```javascript
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.transform = `scaleX(${progress})`;
});
```

### Noise Overlay

SVG feTurbulence texture covering the entire viewport:
```html
<svg class="noise">
  <filter id="noise-filter">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
  </filter>
  <rect width="100%" height="100%" filter="url(#noise-filter)" />
</svg>
```

- `pointer-events: none` (doesn't block interaction)
- Hidden on mobile (`display: none` at `max-width: 860px`)
- `opacity: 0.03` (barely visible, but adds texture)

### Magnetic Buttons

CTAs attract toward cursor when nearby:
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

### Service Card 3D Tilt

Cards tilt toward cursor on hover:
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

### Editorial Link Underline

Underline wipes from left to right on hover:
```css
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

### Cookie Consent

Banner at bottom of page:
- "This site uses no cookies" message
- Accept button (stores consent in localStorage)
- Hidden after acceptance
- Respects `prefers-reduced-motion`

### Now Playing

Fixed bottom-left widget:
- Vinyl record animation (conic-gradient + groove rings)
- Orbiting dot (revolves around the record)
- Equalizer bars (3 bars with staggered animation)
- Click to toggle play/pause
- Decorative only (no actual audio)

---

## Scroll Reveal

Elements animate in as they enter the viewport:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

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

---

## Accessibility

- **Skip link** — First focusable element, jumps to main content
- **Focus-visible** — Accent color outline on all interactive elements
- **prefers-reduced-motion** — All animations disabled
- **Semantic HTML** — nav, main, article, section, footer
- **ARIA labels** — On all icons and interactive elements
- **Keyboard navigation** — Tab, Enter, Escape support
- **Contact form** — Labels, error messages, status announcements

---

## Case Studies

Six case study pages in `work/`:

| # | Project | Directory | Accent |
|---|---------|-----------|--------|
| 01 | STONE | `work/stone/` | `#A8B5A4` (Moss) |
| 02 | OCHRE | `work/ochre/` | `#C4632A` (Terracotta) |
| 03 | KEEL | `work/keel/` | `#6B7280` (Slate) |
| 04 | ATELIER | `work/atelier/` | `#8B6C4A` (Leather) |
| 05 | LUMEN | `work/lumen/` | `#00F0FF` (Cyan) |
| 06 | LAYER | `work/layer/` | `#6366F1` (Indigo) |

Each case study:
- Shares root `styles.css` and `script.js` (via `../../`)
- Sets project accent via `--proj-accent`
- Uses editorial layout (case-hero, case-grid, spec-grid)
- Links back to portfolio and live site
- Navigation chain: OCHRE → KEEL → ATELIER → LUMEN → LAYER → STONE → OCHRE (circular)

---

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~550 | Main page |
| `styles.css` | ~733 | Design system |
| `script.js` | ~268 | Interactions |
| `work/*/index.html` | ~200 each | Case studies |

---

## Lessons Learned

1. **The portfolio is a project, not a container.** It deserves the same care as the work it showcases.

2. **Warm editorial works for portfolios.** Terracotta on cream, serif headings, plenty of whitespace — it feels human.

3. **Custom cursors are polarizing.** Some love them, some hate them. The `pointer: coarse` check is essential — don't show custom cursors on touch devices.

4. **Page loaders are a waste of time** unless they serve a purpose (loading data, hydrating React). For a static HTML page, the loader is pure vanity. But it looks cool.

5. **Scroll reveal animations** are the single most impactful feature for a portfolio. Elements entering the viewport with intention make the page feel alive.

---

*Last updated: September 2026*
