# Keel — Bug stories

Engineering notes from building Keel (the Bento-Grid project). Two bugs that never crashed
anything, never logged a warning, and both would have shipped silently without a mechanical
audit. That is exactly what makes them worth writing down.

---

## Bug 1 — `animation-fill-mode: both` killed every hover on the page

**Phase:** 9 (motion) · **Severity:** silent UX regression · **Caught:** during self-review of the motion layer, before preview

### The setup

Phase 9 added the entrance choreography: every cell rises in with a staggered `keel-rise`
animation, timed by a per-sibling `animation-delay` custom property:

```css
/* the motion layer, as first written */
.cell {
  animation: keel-rise 420ms var(--ease-out) both;
  animation-delay: var(--reveal-i);
}
```

Meanwhile Phase 7 had already shipped the interaction layer, including the standard lift:

```css
.cell:hover {
  transform: translateY(-2px);
}
```

### What actually happened

`fill-mode: both` means *backwards + forwards*. The **forwards** half pins the final
keyframe state — `transform: translateY(0)` — onto every cell **forever after the animation
ends**, and animation-level declarations sit above ordinary rules in the cascade.

So the moment a cell finished revealing, its hover lift was dead. No error. No console
output. The reveal looked perfect. The hover *also still looked like it worked* if you
tested it on a cell that hadn't scrolled into view yet. Only revealed cells lost the lift —
which, on a long page, is almost all of them, and almost impossible to catch by eyeballing
a fresh load.

### Why `both` felt right in the first place

The stagger uses `animation-delay`, and a delayed animation without a **backwards** fill
flashes the element fully visible *before* its animation starts. So `both` seems
mandatory — it fixes a real, visible bug.

### The fix

```css
.cell {
  animation: keel-rise 420ms var(--ease-out) backwards;
}
```

`backwards` keeps the pre-delay coverage (no flash), but once the animation ends the
element **returns to its own stylesheet styles** — which include the hover transform.
Identical reveal behavior. Hover restored. One word changed.

### The lesson

Fill modes are not about the animation's duration. They decide **who owns the property
after the animation ends**. If an element has its own interactive `transform`, the
animation must let go of it — and `both` never lets go.

---

## Bug 2 — a token referenced everywhere and defined nowhere

**Phase:** introduced in 8 (signature), caught in the post-build audit · **Severity:** silent styling loss · **Caught by:** mechanical `var()` ↔ definition cross-reference

### The setup

The rollback signature sequence (press Rollback → the strip takes over with a live
8-tick countdown) styled its steady state through a token that had simply never been
declared:

```css
/* four sites in the rollback layer — defined in NEITHER theme block */
.rollback__bar-fill { background: var(--success); }
```

The brand token table had renamed this concept to `--steady` long before any CSS was
written. One legacy name survived in four declarations.

### Why nothing screamed

Custom properties fail **silently at computed-value time**. `var(--success)` with no
definition and no fallback makes the property *guaranteed-invalid*, so it falls back to
its initial or inherited value — no console error, no lint failure, no crash. The bar
just quietly lost its color.

### The detection

The audit cross-referenced every `var(--x)` used in the stylesheet against every `--x:`
definition, then `comm`'d the two sorted lists:

```
$ comm -23 <(grep -oh 'var(--[a-z-]*' styles.css | sort -u) \
           <(grep -oh '^  --[a-z-]*' styles.css | sort -u)
--success
```

One line out. Every other token resolved.

### The fix — rename, don't rescue

The tempting fix is to add `--success` to `:root`. That would be wrong twice: it would
duplicate a concept the token table already names (`--steady`), and it would leave four
declarations drifting from the source of truth. The real fix was renaming all four sites
to the `--steady` family and deleting the phantom name entirely.

### The lesson

Broken custom properties are a **cross-reference problem, not a syntax problem**. No
linter catches them. The only reliable net is a definition/usage audit — which is cheap
to script and now runs at every milestone.

---

## Bonus — auditing the auditor

The verification pass itself (~70 mechanical checks, WCAG contrast recomputed from real
token values) produced its own false alarms — and every one was re-verified by hand
before being believed:

- `grep 'Phase 15'` missed `PHASE 15` — a case-sensitivity bug in the checker, which
  briefly reported a roadmap edit as "never landed" when it was in the file all along
- grepping for `chip` when the class was `.fchip`
- a regex that read only the first `:root` block, flagging the `--space-*` scale
  (which lives in the second) as undefined
- fallback syntax `var(--w, 0%)` being invisible to the var-extraction regex
- reporting `showToast` as missing when the function was named `toast()`

The meta-lesson: **trust, but recompute the contrast ratios yourself.** An audit that
isn't skeptical of its own tooling just moves the bugs somewhere quieter.

