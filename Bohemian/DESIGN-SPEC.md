# PHASES 4–5 — DESIGN SYSTEM & INFORMATION ARCHITECTURE

Everything here exists to serve *Casa Arcilla* (BRAND.md) — and only that brand.

---

## 4.1 Color system (Plan §6/§7 — restraint: ~70% paper, 20% sand, 10% expressive)

### Light values
| Token | Value | Role | Contrast on `--paper` |
|---|---|---|---|
| `--paper` | `#F6F1E8` | Base — aged parchment | — |
| `--paper-warm` | `#EFE6D8` | Secondary band (Archive/pricing) | — |
| `--ivory` | `#FBF7F0` | Card surface | — |
| `--sand` | `#E3D8C5` | Wells, dividers | — |
| `--ink` | `#33251C` | Primary text (deep umber, never black) | 14.2:1 |
| `--ink-soft` | `#5C4B3C` | Secondary text | 6.4:1 |
| `--muted` | `#7C6A5A` | Metadata, labels | 4.6:1 |
| `--clay` | `#A84E33` | **Primary accent** (text, CTAs) | 4.88:1 |
| `--clay-deep` | `#8F4229` | Clay hover / pressed | 6.2:1 |
| `--clay-bleed` | `rgba(168,78,51,0.10)` | Accent washes | — |
| `--gold` | `#C99B47` | Surface / big numerals (fills only) | 3.3:1 (display-use) |
| `--sage` | `#7C8B72` | Steady states, botánicos art | 3.9:1 (display-use) |
| `--line` | `rgba(51,37,28,0.14)` | Hairline borders, rules | — |
| `--shadow-warm` | `0 10px 30px -12px rgba(120,72,44,0.28)` | Rest shadow (no glow) | — |
| `--shadow-raise` | `0 22px 50px -20px rgba(120,72,44,0.38)` | Hover-raised | — |

**Rule:** accent for text uses **clay** only; gold and sage are surface/art
colors. Never use `--muted` for text smaller than 0.7rem.

### Dark values (Phase 14, reserved)
Night-klin variant: `--paper → #241A13`, `--ivory → #2E2218`, `--ink → #F0E6D6`,
ink-soft `→ #BBA894`, muted `→ #96836F`, clay `→ #D0896C`, gold `→ #D9B25F`.
(Announced, not built yet — the plan's phase order is followed.)

## 4.2 Typography (Plan §9–§11)
- **Playfair Display** 500/600/700/800/900 (+ italics) — display, H1–H3, pull quotes.
- **Plus Jakarta Sans** 400/500/600/700 — body, nav, labels, buttons.
- **Caveat** 500/600/700 — signature annotations only (dates, "scroll gently",
  margin notes). Never sentence-long copy (Plan §50).
- Scale: `clamp()` display 2.5→4.5rem · H2 2→3rem · body 0.95→1.05 · meta 0.7 ·
  micro 0.75. Micro floor raised from 0.58 to **0.75rem** site-wide.
- Contrast system: `uppercase label (0.75, 0.08em tracking)` → `serif H` →
  `sans body` → `Caveat annotation`. The visual personality lives in that
  rhythm, not in decorations (Plan §11).

## 4.3 Spacing / grid / shape
- Spacing scale: **4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128**
- Container: `max-width 1200px`, padding `24px` (`16px` mobile)
- Grid: 12-col keyline (invisible), broken deliberately in one place per
  section (Plan §12): hero arch overflows, the timeline photo overflows its
  field, the archive card is rotated 1.5°.
- Radius language (Plan §16 controlled imperfection):
  - **The Arch**: `border-radius: 500px 500px 16px 16px / 400px 400px 16px 16px` — heroes & testimonials
  - **Organic blob**: `50% 50% 45% 55% / 55% 45% 55% 45%` — canvas wells
  - **Cards**: 20–24px · **Buttons/pills**: 999px
  - Imperfect rotations: ±1.5° max, never on readable text bodies
- Z-index scaffold (Plan §66): texture `1` · deco `2` · content `3` ·
  floating detail `4` · nav `100` · lightbox `200` · toast `300`. No random `99999`.

## 4.4 Texture & paper language (Plan §18–§20, §70)
1. **Linen** — existing CSS grid overlay, kept (cheap, tactile).
2. **Paper grain** — tiny inline SVG `feTurbulence` data-URI at 3% opacity on
   hero and archive (one ~900-byte data-URI, reused, not repeated rasters).
3. **Letterpress label** — uppercase tracked labels with `text-shadow: 0 1px 0
   rgba(255,255,255,0.5)` and a printed border (`1px solid --line`), used on
   stamps and archive cards.
4. **The sun stamp** — one hand-drawn sun SVG, drawn-in once per view; reused
   as divider and footer seal. *One decorative family only.*

## 4.5 Motion (Plan §33–§35)
- Tokens: `--dur-fast: 180ms` · `--dur: 300ms` · `--dur-slow: 600ms` ·
  `--ease-organic: cubic-bezier(0.33, 1, 0.68, 1)` (ease-out, breathy, no bounce).
- Motion hierarchy (Plan §67): page movement (nav reveal) → section (paper
  edge) → element (reveal) → micro (link underline draw) → **signature** (Glaze Lab).
- Reveals: fade + 16px rise in family columns, `IntersectionObserver`, gated
  `prefers-reduced-motion` (Plan §71).
- Hand-drawn lines: SVG `stroke-dasharray/offset` draw for the sun and the
  nav underline (Plan §31/§40), once each per view.

## 4.6 Component system (Plan §29–§30)
Buttons: `.btn` (pill) with default/hover/focus/active; solid-clay CTA (white
label, 5.5:1) · ghost (ink, clay border) · text-link (hand-drawn underline).
Focused: `2px --clay` ring, 2px offset. Cards: archive card, provenance
stamp, line card, workshop pod — one composition language, zero duplication.

---

# PHASE 5 — INFORMATION ARCHITECTURE

**1. Nav** — wordmark (sun + *Casa Arcilla*) · La Historia · La Colección ·
El Archivo · El Taller · Contacto · live time in Caveat. Mobile: drawer.

**2. Hero** — *Arco del Sol*: the arch canvas (sun rising over fields, a
vessel on a wheel, layered hills), eyebrow "Taller de cerámica · Ronda ·
est. 1927", headline **"Clay, fire & patience."**, sub in ink-soft, one CTA
(*Visit the Taller*), Caveat margin-note "fuego lento — slow fire".

**3. Manifesto** — *Una Casa* — original voice of the century; one Amparo
quote (replaces the fake Shakespeare), pull-quote with sun stamp.

**4. Lineage (the history)** — a timeline: 1927 · 1954 · 1978 · 2001 · Hoy —
three ceramic lineages (Talavera → garden glazes → barro negro → raku).
Canvas/art illustration at the end of the spine.

**5. La Colección** — six heritage cards, each a **catalog card**:
`Vessel No. 214 · Talavera white · 1968`. Canvas art per piece + provenance
stamp. CTA: *Start a commission*.

**6. El Archivo (journal)** — three ledger-style entries: the glaze ledger,
the wabi-sabi note, field notes from Oaxaca. Metadata: archive no., date.

**7. El Taller (studio)** — the makers, the process (4 steps, clay→fire),
stats as kiln counts (pieces fired · years · open days per year), and two
**maker letters** (believable, first-person; replaces fake testimonials).

**8. Workshops & commissions (pricing)** — three believable offerings:
**Taller** (workshop day, €120) · **Encargo** (commission, from €450) ·
**Residencia** (week-long retreat, €1,200). Not a subscription (Plan §59).

**9. Contacto** — enquiry form for commissions/workshops.

**10. FAQ · Footer** — ticker *(fuego lento · la memoria · hazlo a mano)*,
studio time, colophon: "Set at the Taller, Ronda — MMXXVI."

**Mobile:** the collage simplifies to single-column story order (image → text
→ image → annotation) per Plan §45/§46; nav becomes a drawer — this is the
redesign the audit flagged.