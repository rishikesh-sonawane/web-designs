# KEEL — Design Spec (Phases 3–5)

> Implementation source of truth. Phase 6 builds this verbatim.
> Phase 3 = content map · Phase 4 = grid system · Phase 5 = visual system.

---

## PHASE 3 — CONTENT MAP

Voice: calm, precise, numbers over adjectives. Every claim from BRAND.md §4.

### 3.1 Nav banner
- Wordmark: `keel` (mono, ink) + status chip `● All systems steady` (green, soft pulse)
- Links: Platform · Telemetry · Pricing · Docs
- CTA: `Start free`

### 3.2 Hero (Tier 1 — Option D, one dominant visual)
- **Headline:** Production, kept steady.
- **Sub:** Keel is the control plane for shipping software — pipelines,
  live telemetry and eight-second rollbacks in one calm room.
- **Primary CTA:** Start free — no card · **Secondary:** Watch a deploy ↓
- **Quiet metric strip** (mono, borderless, inside hero copy tile):
  `2,400+ teams` · `1.2M deploys/mo` · `42s median deploy`
- **Dominant visual:** live control-room module — a deploy in flight:
  stage list `build 12s ✓ → test 9s ✓ → canary 6% ● → fleet ○`,
  live request sparkline, mono timestamps ticking.

### 3.3 Platform grid modules (Tier 2/3)
| Module | Title | Body copy | Specific data |
|---|---|---|---|
| **Pipelines** (large) | Every deploy, one story. | Watch build, test, canary and fleet land in real time — stages, owners and artifacts without spelunking through CI logs. | stages w/ per-stage timings; current run `web-api v2.4.1`, owner `mara` |
| **Service map** (canvas) | Service map | Live request topology across regions. Every edge is traffic; every pulse is health. | 6 nodes (edge, web-api, billing, auth, workers, db), flows sized by req/min |
| **Telemetry chart** | p95 at a glance | Latency, errors and throughput for every service — backfilled 90 days. | tabs `1h / 24h / 7d` switch series; y in ms; hover tooltip `142ms · 14:02` |
| **Control room** (switchboard) | Control room | Route the room the way your team works. Modes re-tune telemetry instantly. | mode `LIVE/BATCH/STREAM`; sampling slider; routing toggles PagerDuty / Slack / Email |
| **SLO gauge** | Error budget | Burn-rate alerts fire long before the budget does. | gauge `87%` remaining, meta: `burn 0.4x · 30d window · policy p95<180ms` |
| **Incident feed** | Ship log | | `14:02:11 web-api v2.4.1 deployed · canary healthy` / `14:07:36 p95 alert cleared · back under 180ms` / `13:58:02 canary promoted · fleet rollout started` |
| **Quick actions** | — | — | Deploy · Promote · Rollback (red) · Snapshot — Rollback wired to signature moment (Phase 8) |

### 3.4 Rollback moment (full-bleed, Tier 2)
- Oversized mono display: `rollback 8s`
- Line: From alert to steady in eight seconds — one keystroke, fleet-wide,
  traffic drained and drained back clean.
- Tile hosts the interactive expansion demo (Phase 8).

### 3.5 Proof (rhythm break — no cards)
- Oversized numeral: `38%` — fewer incident minutes in quarter one
  (customer median, n=214 teams).
- Testimonial (Mara Chen, Northwind Logistics) from BRAND.md §8.

### 3.6 Pricing
Crew $0 (3 services · 7-day telemetry · community) ·
Fleet $29/user/mo — POPULAR (unlimited services · 90-day telemetry · SLO
gauges · incident feed · Slack routing) ·
Armada custom (SSO/SAML · audit log · dedicated SLA · on-prem runners).

### 3.7 Final CTA + Footer
- Display: Put production on keel. · CTA Start free · mono chip `keel deploy --production`
- Footer: tagline; columns Product (Pipelines, Telemetry, Rollbacks) /
  Company (About, Careers, Blog) / Resources (Docs, Status, Changelog);
  `© 2026 Keel Systems, Inc. All systems steady.`

---

## PHASE 4 — GRID SYSTEM

- **Columns:** 12 (desktop ≥1025px) · 6 (tablet 641–1024px) · 4 (mobile ≤640px)
- **Container:** max 1320px, side padding 24px (12px mobile)
- **Gutter:** `--gap: 20px` desktop / 14px tablet / 12px mobile
- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 120
  (`--space-1`…`--space-10`); section rhythm uses 64/80/120
- **Radius:** cells 24px · inner cards 14px · chips/buttons 8px
  (`--radius-lg/md/sm`) — inner elements never match cell radius
- **Module spans (desktop 12-col, size follows content — Plan §10):**
  | Row | Modules |
  |---|---|
  | Hero | copy `span 5` + control-room visual `span 7 × rows 2` |
  | Platform A | pipelines `7 × 2` · control room `5` · SLO gauge `5` |
  | Platform B | service map `4` · telemetry chart `5` · ship log `3` |
  | Platform C | quick actions `3` · quick-stat tile `4` · uptime tile `5` |
  | Rollback | full-bleed `12` |
  | Proof | numeral `7` · testimonial `5` |
  | Pricing / CTA / Footer | `12` each |
- **Rhythm (Plan §11):** large → medium → small alternation; full-bleed
  rollback strip breaks card soup; proof row deliberately card-free
- **Tablet remap:** hero stacks 6+6; pipelines 6×2; control/gauge 3+3;
  map/chart/log 6/6/6; actions row 2+2+2
- **Mobile (≤640):** everything `span 4` (single column); order follows DOM
  = narrative order (Plan §51)

---

## PHASE 5 — VISUAL SYSTEM

### 5.1 Color tokens
| Token | Light | Dark |
|---|---|---|
| `--bg-canvas` | `#F4F6F8` paper | `#0A0E14` ink |
| `--bg-cell` | `#FFFFFF` | `#111826` |
| `--bg-cell-alt` | `#F8FAFB` | `#0D1420` |
| `--bg-immersive` | `#0C1220` | `#070B11` |
| `--text-primary` | `#0C1220` | `#E9EDF4` |
| `--text-secondary` | `#3D4757` | `#9AA5B5` |
| `--text-muted` | `#8A94A6` | `#5C6779` |
| `--border-cell` | `rgba(12,18,32,.07)` | `rgba(233,237,244,.07)` |
| `--accent` | `#D97706` signal amber | `#FBBF24` |
| `--accent-soft` | `rgba(217,119,6,.10)` | `rgba(251,191,36,.12)` |
| `--steady` | `#10B981` | `#34D399` |
| `--warn` | `#F59E0B` | `#FBBF24` |
| `--alert` | `#DC2626` | `#F87171` |

Rule: 80% neutral surfaces, amber only where the room wants your eye
(active stage, featured tier, primary CTA, chart hero line). No gradients
on surfaces. Blue/purple forbidden (Plan §69).

### 5.2 Typography
- **UI:** Inter — display `clamp(2.5rem, 5vw, 4rem)/1.05/900/-0.04em` ·
  h2 `1.6rem/800/-0.02em` · h3 `1.05rem/700` · body `0.9rem/1.55` ·
  label `0.65rem/700/+0.15em/uppercase` (muted)
- **Data:** JetBrains Mono — every number, timestamp, stage, command, metric.
  Numerals are the brand texture; oversized numerals (`8s`, `38%`) are
  display modules themselves (Plan §18)

### 5.3 Surfaces (Plan §16 hierarchy)
- **Primary:** `--bg-cell` + hairline border + low shadow (most cells)
- **Secondary:** `--bg-cell-alt`, no shadow (ship log, chips)
- **Tertiary:** transparent, border-only (metric strip rows)
- **Featured:** amber left rule `2px` + `--accent-soft` wash (featured
  pricing tier, active pipeline)
- **Immersive:** `--bg-immersive` full-bleed, inverted text (rollback strip)

### 5.4 Depth & borders
- Shadows stay low: rest `0 1px 2px rgba(12,18,32,.04), 0 8px 24px -16px rgba(12,18,32,.10)`;
  hover raises one level only (no glow)
- Dark mode shadows deepen, borders lighten
- Border emphasis: subtle (default) / emphasis `--accent` 40% (focus, active)
- Focus ring: `2px --accent` offset 2px — keyboard-visible everywhere

### 5.5 Motion tokens (Plan §9/§33/§34)
- `--dur-fast: 160ms` (small tiles) · `--dur: 240ms` (normal) ·
  `--dur-slow: 420ms` (large/spatial)
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` user-triggered ·
  `--ease-inout: cubic-bezier(0.65, 0, 0.35, 1)` spatial ·
  spring (cubic-bezier(0.34, 1.56, 0.64, 1)) — the expansion demo (rollback takeover spatial settle, Plan §34)
- Stagger: 40ms per tile, capped at 8 tiles
- All motion silenced under `prefers-reduced-motion` except opacity

---

## IMPLEMENTATION ROADMAP — post-spec phases

Executed per Plan.md §88: **Phase 6** Core Composition ✓ · **7** Interaction ✓ ·
**8** Signature (rollback sequence) ✓ · **9** Motion ✓ · **10** Responsive ✓ ·
**11** Accessibility ✓ · **12** Performance ✓ · **13** Final polish ✓ ·
**14** Case study ✓ · **15** Bug stories ✓ — **all 15 phases complete.**

Tablet remap refinement (Phase 10): map+log and actions+stat pair `3+3`
instead of the sketched `6/6/6` — pairing preserves the plan's large→small
rhythm (§11) and avoids stretching the service-map canvas; everything else
follows §4.4/§4.5 as written. Gutters flow from `--gutter`: 20 / 14 / 12px.

## PHASE 14 — CASE STUDY PAGE (portfolio presentation)

- `case-study.html` in-repo: how a 2,516-line brief (Plan.md) became
  BRAND.md → DESIGN-SPEC.md → token system → build — process first, result second.
- Shows the decision chain: content map before CSS, grid math (12/6/4),
  five-surface hierarchy, the rollback signature, QA gates.
- Audience: hiring managers. Signals product thinking, not just grid skills.

## PHASE 15 — PROCESS ARTIFACTS (bug stories)

- Documented debugging narratives: (1) animation `fill-mode: both`
  permanently pins `transform` at a cascade level above hover rules,
  silently killing every hover lift — and why `backwards` fixes it;
  (2) `--success` referenced four times, defined nowhere — the
  undefined-token audit that caught it, plus the contrast-pass table.
- Placed in the case study + README as interview-ready anecdotes.

