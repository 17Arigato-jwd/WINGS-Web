# 02 — Design Language

The visual identity grows directly out of the WINGS-AAS logo (`assets/logo/wings-logo.png`): a circular emblem of a woman's profile with leaves woven into her hair, a wing formed of layered leaves, golden wheat stalks, and a sun rising over cultivated fields. Everything below — palette, shapes, motion — echoes that emblem: **organic, feminine, rooted, rising**.

## Brand Personality

| Trait | Expression on the site |
|---|---|
| Nurturing & feminine | Warm cream backgrounds, soft curves, generous whitespace |
| Rooted in agriculture | Deep greens, wheat gold, field/harvest photography |
| Professional & institutional | Disciplined grid, restrained motion, clear hierarchy |
| Aspirational ("wings") | Upward motion cues — reveals slide *up*, wing-curve dividers |

## Color Palette

All core colors are sampled from the logo.

### Primary — Greens

| Token | Hex | Sampled from | Use |
|---|---|---|---|
| `forest-900` | `#16341D` | darkest hair/wing tones | Footer bg, darkest text on cream |
| `forest-700` | `#1E4A28` | `#184828` (dominant logo color) | **Primary brand color** — headings, nav, primary buttons |
| `forest-600` | `#2C5A32` | `#284828` | Hover states of primary, section bg (dark variant) |
| `leaf-500` | `#4E7A3A` | `#486838` | Secondary buttons, icon strokes, links |
| `sage-400` | `#93A758` | `#98a858` | Decorative accents, borders, tags, wing-divider fills |
| `sage-200` | `#D6DFC0` | lightened sage | Card borders, subtle section tint |

### Accent — Golds (use sparingly, ~5% of any view)

| Token | Hex | Sampled from | Use |
|---|---|---|---|
| `wheat-500` | `#C9A24B` | `#d8b878` deepened | Accent buttons ("Donate"), highlights, stat numbers |
| `sun-400` | `#D9A441` | logo sun | Small decorative details, hover glints |

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `cream-50` | `#FAF8F0` | **Default page background** (echoes logo's warm white) |
| `cream-100` | `#F3F0E4` | Alternating section background |
| `white` | `#FFFFFF` | Cards, header |
| `ink-900` | `#232A20` | Body text (warm near-black) |
| `ink-600` | `#5A6354` | Secondary text, captions |

### Usage rules

- **60 / 30 / 10:** ~60% cream/white surfaces, ~30% greens, ~10% gold + photography.
- Gold is the *call-to-action-and-emphasis* color — if everything is gold, nothing is.
- Dark sections (`forest-700`/`forest-900` backgrounds with cream text) appear at most **twice per page** (typically hero and pre-footer CTA) to create rhythm.
- All text/background pairs must pass **WCAG AA** (4.5:1 body, 3:1 large text). `forest-700` on `cream-50` and `cream-50` on `forest-700` both pass comfortably. `wheat-500` is **never** used for body text on light backgrounds — decorative and large-type use only.

## Typography

| Role | Typeface | Weights | Notes |
|---|---|---|---|
| Display & headings | **Fraunces** (Google Fonts) | 400, 600 (SemiBold for H1/H2) | A warm, organic serif with soft terminals — matches the logo's hand-drawn feel without losing authority |
| Body, UI, buttons | **Inter** (Google Fonts) | 400, 500, 600 | Neutral, highly legible at small sizes on low-end devices |
| Fallbacks | `Georgia, serif` / `system-ui, sans-serif` | | Fonts load with `font-display: swap` |

Future note: if a Hindi version is added, pair with **Noto Serif Devanagari / Noto Sans Devanagari**.

### Type scale (desktop → mobile)

| Level | Size | Style |
|---|---|---|
| H1 (hero) | 56px → 34px | Fraunces 600, line-height 1.1, `forest-700` (or cream on dark) |
| H2 (section titles) | 40px → 28px | Fraunces 600 |
| H3 (card titles) | 24px → 20px | Fraunces 600 |
| Eyebrow / kicker | 14px, uppercase, letter-spacing 0.12em | Inter 600, `leaf-500` — sits above every H2 |
| Body | 18px → 16px | Inter 400, line-height 1.7, `ink-900` |
| Small / captions | 14px | Inter 400, `ink-600` |
| Buttons | 16px | Inter 600 |

Section title pattern used everywhere:

```
EYEBROW LABEL            ← small caps, leaf-500
Section Title in Fraunces ← H2, forest-700
One-sentence lede.        ← 20px Inter, ink-600, max-width 65ch
```

## Shape Language

- **Circles & pills** — the logo is circular, so buttons are **pill-shaped** (`border-radius: 9999px`), avatars and icon chips are circles.
- **Soft cards** — `border-radius: 16px`, 1px `sage-200` border, shadow only on hover.
- **Wing-curve section dividers** — key section boundaries use a shallow asymmetric SVG curve (single arc, higher on the right) echoing the logo's wing sweep. Used sparingly: hero bottom edge and pre-footer CTA top edge only.
- **Leaf motif** — a single minimal leaf SVG (traced from the logo's wing leaves) used as list bullets on feature lists and as a faint oversized watermark behind hero text (4–6% opacity).

## Iconography

The source document uses emoji (🌾 🌱 🚀 💡 🎓 🤝 📈 🌍 ✔). On the site these become **Lucide line icons** (2px stroke, `leaf-500`, inside 48px circular `cream-100` chips) for a consistent professional look:

| Content item | Icon |
|---|---|
| Women Empowerment | `heart-handshake` |
| Sustainable Agriculture | `sprout` |
| Entrepreneurship & Startups | `rocket` |
| Innovation & Technology | `lightbulb` |
| Capacity Building & Skill Development | `graduation-cap` |
| Partnerships & Collaborations | `handshake` |
| Market Linkages & Value Chains | `trending-up` |
| Community Development | `globe` |
| Benefit checkmarks (✔) | `check` in a small sage circle |

## Imagery

- **Subjects:** real Indian women farmers, scientists, and entrepreneurs at work — fields, labs, markets, training sessions. Dignified and active, never staged "poverty imagery."
- **Light:** golden-hour warmth to harmonize with the wheat/sun palette.
- **Treatment:** on dark hero/CTA sections, photos get a `forest-900` gradient overlay (55–70% opacity) so cream text stays readable.
- **Placeholders until real photos exist:** solid `cream-100` blocks with the leaf watermark — no generic stock that would need replacing anyway.
- Logo is used on white/cream only; keep a clear space of ½ the logo width around it. A simplified favicon (the wing + circle, no portrait detail) should be derived at 32/180/512px.

## Component Library (shared across pages)

| Component | Spec |
|---|---|
| **Header** | Sticky, white with 90% opacity + blur; 72px tall, shrinks to 60px on scroll. Logo left (40px circle + "WINGS-AAS" wordmark), nav right, "Contact" as pill button |
| **Primary button** | Pill, `forest-700` bg, cream text; hover → `forest-600` + lift 2px |
| **Accent button** | Pill, `wheat-500` bg, `forest-900` text (Donate / featured CTAs) |
| **Ghost button** | Pill, 1.5px `forest-700` border, transparent; hover → tinted fill |
| **Feature card** | White, radius 16, sage border, icon chip top, H3, 2-line body |
| **Pricing card** | As feature card + tier name, big Fraunces price, ✔-list, full-width button; featured tier gets `forest-700` fill (inverted) |
| **Stat block** | Big Fraunces number in `wheat-500` on dark (or `forest-700` on light) + Inter label |
| **Section divider** | Wing-curve SVG, fills next section's bg color |
| **Footer** | `forest-900` bg; 4 columns: logo+mission line, quick links, get-involved links, contact; bottom bar with © and registration line |

## Spacing & Grid

- Base unit **4px**; common steps 8 / 16 / 24 / 32 / 48 / 64 / 96.
- Content max-width **1200px**, gutter 24px (16px mobile).
- Vertical section padding **96px desktop / 64px mobile**.
- 12-column grid on desktop; cards typically 3-up (desktop) → 2-up (tablet) → 1-up (mobile).
