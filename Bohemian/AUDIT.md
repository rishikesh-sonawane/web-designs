# PHASE 1 — AUDIT: The Existing Bohemian Project

Method: read all source files (`index.html` 485 · `styles.css` 1409 · `script.js` 648),
plus `README.md` and `DESIGN-GUIDE.md`.

---

## What's already strong → preserve & elevate

| Asset | Why it's worth keeping |
|---|---|
| **Warm earthy palette** (terracotta / sage / mustard / sand / ivory) | Genuinely bohemian; on-brand tone system |
| **Linen texture overlay** | Lightweight, pure CSS, feels tactile without cost |
| **Architectural arch** (hero frame + `border-radius: 200px 200px 0 0`) | The single strongest identity device; an architectural motif with history |
| **Arch + sun canvas landscape** | Terracotta sky, sun, hills, pot with sprout — improvable but right spirit |
| **Editorial numbered sections** (`01 / PHILOSOPHY` …) | Perfect seed for a catalog / archive grammar |
| **Handwritten Caveat annotations** (time, "scroll gently") | Warm human signature — keep, use sparingly |
| **Playfair Display serif + italic *em*** | Carries editorial, historical gravitas |
| **Canvas-art variety** (pottery, botanical, woven, abstract) | Proven technique; can be upgraded to museum-catalog illus |
| **FAQ accordion, toast system, scroll reveal, header auto-hide** | Solid, working interactions — keep the systems |

## Weaknesses → fix

| # | Issue | Why it's a problem |
|---|---|---|
| 1 | **Brand is a generic "terracotta studio"** | No history, no founder, no provenance, no place — fails Plan §4/§26/§86 ("real brand") |
| 2 | **Floating emoji botanicals** (🌿☀✦ spawn randomly every 3s) | Plan §21: decorative elements *must have a job*. Random emoji = clutter |
| 3 | **Misattributed cliché quote** — "The earth has music for those who listen." — *Shakespeare* | It isn't Shakespeare; it's boho wallpaper. Replaced with an original voice (the maker) |
| 4 | **Generic testimonials** ("Elena Morales, Madrid") with initial avatars | No realism; no specimen. Replaced with believable maker *letters* |
| 5 | **Pricing is implausible** — "$0/mo curated pieces" subscription | A ceramics atelier cannot sell monthly piece-subscriptions. Business model must be believable (§59) |
| 6 | **Micro-labels at 0.58–0.68rem, `--text-muted #9B8E82`** | ~3.1:1 contrast on paper — fails WCAG AA for small text (Plan §49/§51) |
| 7 | **Canvas art is static + hardcoded colors** | No theme awareness; colors live in JS strings, not tokens |
| 8 | **No mobile menu** | `.nav__links` just disappears at ≤768px → nav is dead on phones (§45) |
| 9 | **Two CTAs side by side, neither strong** ("Explore the Collection" + "Read Our Story") | Plan §59/§61: one contextual CTA per moment |
| 10 | **No craft process, no maker story, no gallery, no signature interaction** | Missing the storytelling spine (§26/§32) and the one memorable moment (§32) |

## Verdict grid

| Keep | Elevate | Replace | Redesign |
|---|---|---|---|
| Linen texture | Arch → hero *landmark* | Faux-Shakespeare quote | Brand → historical atelier "Casa Arcilla" |
| Playfair + Caveat voice | Section numbers → catalog metadata | Emoji botanicals → sun motif (one device §76) | Sub-model pricing → workshops / commissions |
| Editorial sections | Courtyard cards → heritage collection w/ provenance | Generic testimonials → maker letters | Mobile nav → real drawer menu |
| FAQ / toasts / reveals | Journal → the **Archive** | Random CTAs → brand CTA vocabulary | Canvas palette → token-driven |
| Canvas artwork | Header | | Dark-value emphasis for AA |

**Bottom line:** the craft is good; the story is missing. The plan's own test (§77–§86) says
*the foundation must survive without the flowers* — so we rebuild the foundation
(history, business, editorial grammar) and let the sun, the clay and the arch be the
decoration that *earns* its place.