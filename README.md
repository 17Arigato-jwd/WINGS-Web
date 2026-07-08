# WINGS-Web

Website for **WINGS-AAS** — *Women's Initiative for Nurturing Growth & Sustainability – Agriculture & Allied Sectors Cooperative Society Limited*, a national women-led agricultural cooperative.

> Empowering Women. Transforming Agriculture. Inspiring Sustainable Futures.

<img src="assets/logo/wings-logo.png" alt="WINGS-AAS logo" width="180">

## Status

📐 **Planning phase.** Full website documentation is complete; implementation follows the phases in the technical plan.

## Documentation

| Doc | Contents |
|---|---|
| [01 — Project Overview](docs/01-project-overview.md) | Goals, audiences, sitemap (8 pages / 9 nav items), content status, key decisions |
| [02 — Design Language](docs/02-design-language.md) | Logo-derived color palette, typography (Fraunces + Inter), shapes, icons, components |
| [03 — Page Layouts](docs/03-page-layouts.md) | Section-by-section layout of every page |
| [04 — Animations](docs/04-animations.md) | Motion principles and the full animation map |
| [05 — Content Inventory](docs/05-content-inventory.md) | Cleaned website copy from the source document + content gaps list |
| [06 — Technical Plan](docs/06-technical-plan.md) | Stack (static HTML + Tailwind + vanilla JS), structure, performance, a11y, SEO, build phases |

## Assets

- `assets/logo/wings-logo.png` — master logo (1254×1254 PNG, extracted from the source content document). Optimized derivatives and favicons are produced during the build phase.

## At a glance

- **Pages:** Home · About (incl. Vision & Mission) · Our Focus · Membership · Get Involved · Leadership & Governance · Partners & Collaborations · News & Events · Contact
- **Design:** organic, warm, institutional — deep forest greens + wheat gold sampled from the logo, cream backgrounds, pill buttons, wing-curve dividers
- **Motion:** elegant & subtle — upward scroll reveals, stat counters, gentle hovers; `prefers-reduced-motion` respected
- **Stack:** static HTML + Tailwind CSS + <6 KB vanilla JS; free static hosting; Razorpay payments planned for phase 5
