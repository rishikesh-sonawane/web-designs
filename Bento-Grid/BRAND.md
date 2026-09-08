# KEEL — Brand & Product Charter

> Phase 2 artifact. The Bento grid is the presentation system; Keel is the business.
> Reference: Plan.md §2–§4 (brand, credibility, grid-as-vehicle).

## 1. Brand

- **Name:** Keel
- **Domain:** keel.dev (fictional)
- **Wordmark:** lowercase `keel`, ink-navy, geometric sans
- **Metaphor:** the keel is the structural spine under a ship's waterline — invisible, essential, keeps everything upright. Keel does the same for production software.
- **Tagline:** "Production, kept steady."
- **Voice:** calm, precise, engineering-grade. Declarative sentences. No hype words (no "supercharge", no "AI-powered", no "blazing"). Numbers over adjectives.
  - ✅ "Deploys land in 42 seconds. Rollback lands faster."
  - ❌ "Revolutionize your deployment workflow!"

## 2. Product

**Keel is a deployment and observability control plane for software teams.**
One place to ship, watch, and steady production: pipelines, live telemetry,
SLO gauges, incident feed, and one-keystroke rollback.

**Positioning:** the calm layer between your code and your customers —
deployment discipline of Vercel, observability honesty of Datadog, presented
like a well-kept control room rather than a dashboard explosion.

**Audience:** platform engineers, tech leads, and product teams (5–200 engineers)
who ship daily and are tired of duct-taping CI logs, status pages and three
monitoring tools into one mental model.

## 3. What the product does (believable feature set)

| Feature | What it really means |
|---|---|
| **Pipelines** | Visual deploy pipelines w/ stages: build → test → canary → fleet |
| **Live telemetry** | Requests/min, p95 latency, error budget burn — per service |
| **SLO gauges** | Error-budget dials with burn-rate alerts before the breach |
| **Control room** | Live/Batch/Stream data modes, notification routing, speed controls |
| **Incident feed** | Chronological deploy + alert trail, human-readable |
| **One-keystroke rollback** | `keel rollback web-api` — or the big red button |

## 4. Numbers Keel is allowed to claim (consistent story)

- 2,400+ engineering teams
- 1.2M deploys shipped / month
- 99.98% platform uptime (their own SLO, eaten by their own dogfood)
- Median deploy time: 42s
- Rollback: 8s
- 38% fewer incident minutes in the first quarter (customer median)

Every metric used anywhere on the site must come from this table or derive
from it. No new numbers invented per-section (Plan §20: coherent product).

## 5. Visual identity

- **Base:** ink-navy dark (`#0A0E14` canvas range) + paper-white light mode
- **Surfaces:** deep slate cells, hairline borders, one warm signal accent
- **Accent:** signal amber `#F59E0B` (control-room indicator language) —
  deliberately NOT purple/blue gradient (Plan §69)
- **Status colors:** steady green `#10B981`, warn amber, alert red `#EF4444`
- **Type:** Inter for UI, JetBrains Mono for every measurement, timestamp,
  and command (data is mono — the brand's signature texture)
- **Depth:** shadows stay low; depth comes from surface contrast + borders
  (Plan §67)
- **Iconography:** nautical-control-room minimal — steady states glow soft,
  alerts pulse once

## 6. Information architecture (site map)

1. **Nav** — keel wordmark, links (Platform, Telemetry, Pricing, Docs), CTA
2. **Hero** — one dominant statement + one dominant visual (live control-room
   module), supported by two quiet metric chips
3. **Platform grid** — the bento proper: pipelines, telemetry, switchboard,
   SLO gauge, incident feed, chart (Tier 2/3 modules)
4. **Rollback moment** — full-bleed signature interaction (Phase 8)
5. **Proof** — one testimonial, one oversized number
6. **Pricing** — Crew / Fleet / Armada
7. **Final CTA + Footer**

## 7. Pricing (credible)

| Tier | Price | For | Includes |
|---|---|---|---|
| **Crew** | $0 | side projects, ≤3 services | 3 services, 7-day telemetry, community |
| **Fleet** | $29/user/mo | growing teams | unlimited services, 90-day telemetry, SLO gauges, incident feed, Slack routing |
| **Armada** | custom | platform orgs | SSO/SAML, audit log, dedicated SLA, on-prem runners |

## 8. Proof people (fictional but plausible)

- "We deleted three dashboards the week we moved to Keel. The incident feed
  is the only tab open during on-call now." — Mara Chen, Platform Lead,
  Northwind Logistics
- "Rollback went from a 20-minute ritual to a keystroke. Our error budget
  thanked us." — Diego Alvarez, VP Engineering, Ferryline
