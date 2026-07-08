# 04 — Animation & Motion Design

**Direction: elegant & subtle.** The audience includes rural and mobile users on modest devices; motion must add polish and hierarchy, never weight or delay. The metaphor guiding all motion is the logo itself: *growth and lift* — things rise gently into place like leaves and wings, nothing bounces, spins, or flies.

## Motion Principles

1. **Everything rises.** Reveals translate *upward* (from +24px) — echoing growth. Nothing animates downward or sideways except the mobile drawer.
2. **One easing family.** `cubic-bezier(0.22, 1, 0.36, 1)` ("ease-out-quint-ish") for entrances; plain `ease` for hovers. Durations: hovers 150–200ms, reveals 500–700ms, hero entrance ≤ 900ms total.
3. **Animate cheap properties only:** `transform` and `opacity`. Never `top/left/width/height`. No JS animation libraries — CSS transitions/keyframes + one small `IntersectionObserver` utility (~30 lines).
4. **Each element reveals once.** No re-triggering on scroll-up; no scroll-jacking, ever.
5. **Respect `prefers-reduced-motion: reduce`:** all reveals render instantly visible, Ken Burns and counters are disabled (counters show final values). This is a hard requirement, implemented as a single media-query override.
6. **No layout shift.** Reveal elements start at `opacity: 0` but occupy their final space; content is fully readable if JS fails (reveal classes applied only when JS runs).

## The Global Reveal System

A single utility drives most of the site:

- `.reveal` — fade in + rise 24px over 600ms when the element enters the viewport (threshold 15%).
- `.reveal-group` — children reveal with an 80ms stagger (cards in a grid, list items), capped at 8 items then simultaneous.
- Applied to: section title blocks, cards, table, pricing cards, pathway cards, profile cards, news cards, form panels.

## Animation Map — What Happens Where

### Global / shared components

| Element | Animation |
|---|---|
| Sticky header | Height 72→60px and shadow fade-in after 80px scroll (200ms) |
| Nav links | 2px `sage-400` underline scales in from left on hover/focus (180ms); active page link keeps it |
| About dropdown | Fade + rise 8px (160ms); on focus/hover, stays for keyboard users |
| Mobile drawer | Slides in from right (280ms); links stagger-fade (40ms apart); hamburger morphs to ✕ |
| Primary/accent buttons | Hover: rise 2px + shadow deepen + bg shade shift (180ms); active: press back down |
| Ghost buttons | Hover: background tint fills (180ms) |
| All cards | Hover: rise 4px + shadow `sm→lg` (200ms); icon chip tint shifts `cream-100`→`sage-200` |
| Anchor navigation | `scroll-behavior: smooth` (CSS only), with `scroll-margin-top` matching header height |
| Images | Lazy-load with a 300ms opacity fade on load (no skeleton shimmer) |
| Focus states | Instant 2px `wheat-500` outline — **never animated**, always visible |

### Home page

| Section | Animation |
|---|---|
| 1.1 Hero entrance | On load, staggered rise: eyebrow → H1 → sub-line → paragraph → buttons (90ms apart, 700ms each). Logo on right fades + scales 0.96→1 |
| 1.1 Hero background | Ken Burns: photo scales 1.0→1.06 over 18s, one direction only, pauses at end (no loop). Disabled under reduced-motion and on `save-data` |
| 1.1 Scroll cue | Small chevron, 2s gentle 6px float loop — the **only** looping animation on the site |
| 1.2 Promise pills | Reveal-group stagger; hover: border color shift |
| 1.3 Focus cards | Reveal-group (8 cards, capped stagger); standard card hover |
| 1.4 Stats band | Numbers count up from 0 over 1.2s with ease-out when band enters view (once); `+` suffix pops in at end |
| 1.5 Why-join grid | Reveal-group |
| 1.6 CTA section | Section reveals as one block; buttons get standard hovers |

### Interior page heroes (all pages 2–9)

| Element | Animation |
|---|---|
| H1 + lede | Rise-in on load (no stagger beyond the pair — interior pages must feel faster than Home) |
| Breadcrumb | Simple fade |

### About

| Element | Animation |
|---|---|
| Story photo | Reveals with its offset frame: frame rises first, photo follows 120ms later |
| Vision/Mission panels | Reveal as a pair, Vision 100ms ahead |
| Values cards | Reveal-group |
| Pull-quote | Fade only (no rise) — reads as a held breath, distinct from cards |

### Our Focus

| Element | Animation |
|---|---|
| Alternating rows | Text column and visual column reveal together as one row unit (rise only — no left/right slides, keeps rhythm consistent) |

### Membership

| Element | Animation |
|---|---|
| Pricing cards | Reveal-group; hover lift slightly stronger (6px) to signal interactivity |
| Fee table rows | Stagger-reveal (60ms/row) |
| Benefits checklist | ✔ icons scale 0→1 (200ms) as list reveals, 40ms stagger |
| Patrons band | Single block reveal |

### Get Involved

| Element | Animation |
|---|---|
| Pathway cards | Reveal-group; the gold Donate card's hover additionally warms its border to `sun-400` |

### Leadership / Partners / News

| Element | Animation |
|---|---|
| Profile cards | Reveal-group; hover: photo scales 1.03 inside its circle mask |
| Partner logos | Reveal-group fade (no rise — logo walls look jittery rising); greyscale→color on hover (250ms) |
| News cards | Standard card hover + image scales 1.04 inside cropped container |

### Contact

| Element | Animation |
|---|---|
| Form panel + details card | Reveal as pair |
| Inputs | Border color `sage-200`→`leaf-500` on focus (150ms) |
| Submit | Button shows inline spinner (the one JS-toggled loading state); success swaps form for a check-mark + thank-you message (fade, 300ms) |
| Map | Loads only on click/consent; fades in |

## Explicitly Excluded (and why)

- **Parallax scenes / scroll-jacking** — heavy, motion-sickness-prone, poor on low-end Android.
- **Animated SVG logo drawing** — the logo is a raster PNG; tracing it to animatable SVG is a phase-2 nice-to-have at best.
- **Particle effects (floating leaves/wheat)** — continuous rAF cost, battery drain, kitsch risk.
- **Page-transition animations** — MPA with full page loads; fast loads beat fake transitions. (`@view-transition` may be added later as progressive enhancement.)
- **Text scramble / typewriter effects** — conflicts with the institutional tone and hurts screen readers.

## Performance Budget for Motion

- Zero animation libraries; total motion JS < 2 KB (IntersectionObserver reveal + counter + header shrink).
- No animation may block first paint; hero entrance uses CSS keyframes that start immediately.
- Any single view animates ≤ 12 elements concurrently.
