# 06 — Technical Plan

## Stack Decision

**Chosen: static multi-page site — HTML + Tailwind CSS (CLI build) + vanilla JavaScript.**

Why this fits WINGS-AAS:

- The site is content-driven with no dynamic data at launch; a framework adds build/hosting complexity without payoff.
- Best possible performance on low-end Android devices and slow rural connections — the audience reality.
- Free, simple hosting (GitHub Pages / Netlify / Cloudflare Pages); no server to maintain or pay for.
- Anyone with basic HTML knowledge can update content later — no framework lock-in for a cooperative that may rotate volunteers/vendors.

**Considered alternatives** (revisit if requirements change):

| Option | When it becomes the right choice |
|---|---|
| **Astro** | If page count grows enough that shared header/footer duplication hurts, or a content-collections/news workflow is wanted. Migration from static HTML is straightforward. |
| **Next.js** | If/when a member portal, login, or online payment flows are built (phase 3) — likely better built as a separate app (e.g. `members.wings-aas.org`) than a rewrite of the public site. |

To keep the 8 pages maintainable without a framework, shared header/footer live in `partials/` and are inlined at build time by a ~40-line Node build script (or `tailwindcss` + a tiny HTML-include step). No client-side includes — every page ships complete HTML.

## Repository Structure

```
WINGS-Web/
├── docs/                     # this planning documentation
├── assets/
│   ├── logo/
│   │   ├── wings-logo.png    # master 1254×1254 (extracted from source docx)
│   │   ├── wings-logo-256.png / -64.png   # derived, optimized
│   │   └── favicon-32.png / -180.png / -512.png
│   ├── img/                  # photography (WebP + JPEG fallback)
│   └── icons/                # inlined Lucide SVGs actually used
├── src/
│   ├── pages/                # index.html, about.html, focus.html, membership.html,
│   │                         # get-involved.html, leadership.html, partners.html,
│   │                         # news.html, contact.html  (9 files, 8 unique pages + index)
│   ├── partials/             # header.html, footer.html, cta-band.html, page-hero.html
│   ├── css/input.css         # Tailwind entry + custom properties (brand tokens)
│   └── js/main.js            # reveal observer, counter, header shrink, mobile drawer, form UX
├── dist/                     # build output (deployed artifact)
├── build.mjs                 # partial-inlining + copy step
├── tailwind.config.js        # brand tokens from 02-design-language.md
└── package.json              # scripts: dev, build
```

Brand tokens (`forest-700`, `sage-400`, `wheat-500`, `cream-50`, …) are defined once in `tailwind.config.js`, matching `02-design-language.md` exactly.

## JavaScript Budget

Total custom JS **< 6 KB minified**, no libraries:

| Module | ~Size | Purpose |
|---|---|---|
| `reveal.js` | 1 KB | IntersectionObserver → adds `.is-visible`; honors reduced-motion |
| `counter.js` | 0.8 KB | Stat count-up |
| `header.js` | 0.5 KB | Shrink-on-scroll, mobile drawer toggle |
| `form.js` | 1.5 KB | Contact-form submit to form backend, loading + success states |
| `map.js` | 0.5 KB | Click-to-load map embed |

Site remains 100% readable and navigable with JS disabled.

## Forms & Payments (phased)

- **Phase 1 (launch):** contact + membership-interest forms post to a hosted form backend (Formspree/Basin/Web3Forms — free tiers suffice initially) with server-side email notification to the secretariat. Honeypot + backend spam filtering; no CAPTCHAs that block low-tech users.
- **Phase 2:** membership fee payment via **Razorpay payment links/pages** (supports UPI — essential for the Indian audience) linked from pricing-card buttons. No PCI scope on our side.
- **Phase 3 (separate project):** member portal with accounts, renewals, directory.

## Performance Targets

| Metric | Budget |
|---|---|
| Lighthouse (mobile, throttled) | ≥ 90 all categories |
| LCP | < 2.5s on simulated 4G |
| CLS | < 0.05 |
| Page weight (Home) | < 900 KB total, < 250 KB before images |
| CSS (purged) | < 25 KB gzip |

Practices: WebP with JPEG fallback via `<picture>`; explicit `width/height` on all images; `loading="lazy"` below the fold; hero image `fetchpriority="high"` and preloaded; fonts subset + `font-display: swap`; logo derivatives (the 1.1 MB master PNG is never shipped to a page — a 256px optimized version serves header/hero).

## Accessibility (WCAG 2.1 AA)

- Semantic landmarks (`header/nav/main/footer`), one `h1` per page, logical heading order.
- Color contrast per the palette rules in `02-design-language.md`; link styling never color-only.
- Full keyboard support: skip-link, focus-visible outlines (`wheat-500`), dropdown and drawer operable and Escape-closable, focus trapped in open drawer.
- `prefers-reduced-motion` honored globally (see `04-animations.md`).
- All images meaningful `alt`; decorative SVGs `aria-hidden`.
- Form fields labelled, errors described via `aria-describedby`.
- Emoji from source copy replaced by icons + text (screen-reader-friendly).

## SEO & Metadata

- Unique `<title>` + meta description per page; canonical URLs.
- Open Graph + Twitter cards (logo-based share image 1200×630).
- `Organization` + `NGO` JSON-LD on Home (name, alternateName "WINGS-AAS", logo, contact once available).
- `sitemap.xml` + `robots.txt` generated in build.
- Descriptive URLs already flat (`/membership.html`); optionally serve extensionless via host config.

## Hosting & Deployment

- **Host:** GitHub Pages (free, fits this repo) — or Netlify if form handling without third-party backend is preferred. Custom domain (e.g. `wings-aas.org`) + HTTPS.
- **CI:** GitHub Action — on push to `main`: build → deploy `dist/`. PR previews via Netlify if chosen.
- **News updates workflow:** at launch, news items are HTML snippets — documented copy-paste pattern in a `CONTRIBUTING.md`. If update frequency grows, migrate to Astro content collections (see stack alternatives).

## Build Phases

| Phase | Scope | Exit criteria |
|---|---|---|
| **0. Foundation** | Repo scaffolding, Tailwind + tokens, build script, partials, deploy pipeline | Empty branded page deploys |
| **1. Core pages** | Home, About, Membership, Get Involved + header/footer/CTA components | Content-complete pages live, Lighthouse ≥ 90 |
| **2. Supporting pages** | Our Focus, Leadership, Partners, News, Contact (placeholders where content pending) | All 9 nav items resolve |
| **3. Content fill** | Real contact/leadership/partner/news content, photography, focus-area copy (gaps list in `05-content-inventory.md`) | No `[PLACEHOLDER]` visible |
| **4. Launch hardening** | A11y audit, cross-device QA, SEO/meta, analytics (privacy-friendly, e.g. Plausible/GoatCounter), custom domain | Public launch |
| **5. Post-launch** | Razorpay membership payments, Hindi language toggle (structure ready: `lang` attribute + Noto fonts), member portal exploration | — |
