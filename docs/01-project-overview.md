# 01 — Project Overview

## The Organization

**WINGS-AAS** — *Women's Initiative for Nurturing Growth & Sustainability – Agriculture & Allied Sectors Cooperative Society Limited* — is a national women-led cooperative dedicated to advancing agriculture through leadership, innovation, entrepreneurship, collaboration, and sustainable development.

**Brand promise:** *Empower People. Enable Innovation. Create Impact.*

## Purpose of the Website

1. **Establish credibility** — a professional national-level presence for the cooperative.
2. **Drive membership** — clearly present the four membership tiers and their benefits, and funnel visitors toward joining.
3. **Enable engagement** — partner, donate, and volunteer pathways ("Get Involved").
4. **Inform** — vision, mission, focus areas, leadership, partners, news and events.

## Target Audiences

| Audience | Primary goal on site |
|---|---|
| Women farmers & rural entrepreneurs | Understand benefits, become a member |
| Young industry professionals | Join the ₹5,000 / 5-year individual tier |
| Researchers, scientists, faculty | Join the academic tier, find collaborations |
| Corporates, startups, institutions | Institutional membership, partnership, CSR |
| Policymakers & development organizations | Learn about the cooperative, partner |
| Philanthropists / donors | Donate, become patrons |

Many visitors will be on **mobile devices and modest connections** (rural India). Performance and mobile-first design are non-negotiable — this drives the tech and animation choices documented in the other files.

## Site Map & Page Count

The website has **8 physical pages** covering the 9 navigation items from the content document (Vision & Mission lives as an anchored section of the About page):

```
WINGS-AAS Website
│
├── 1. Home ......................... index.html
├── 2. About WINGS .................. about.html
│      └── Vision & Mission ........ about.html#vision-mission (nav item → anchor)
├── 3. Our Focus .................... focus.html
├── 4. Membership ................... membership.html
├── 5. Get Involved ................. get-involved.html
├── 6. Leadership & Governance ...... leadership.html   [placeholder content]
├── 7. Partners & Collaborations .... partners.html     [placeholder content]
├── 8. News & Events ................ news.html         [placeholder content]
└── 9. Contact Us ................... contact.html      [details pending]
```

**Navigation bar order** (from the content document):
Home · About WINGS · Vision & Mission · Our Focus · Membership · Leadership & Governance · Partners & Collaborations · News & Events · Contact Us

Nine items is too many for a single desktop row at readable sizes, so the header groups them:

- **Home**
- **About** (dropdown: About WINGS · Vision & Mission · Our Focus · Leadership & Governance)
- **Membership**
- **Get Involved**
- **Partners**
- **News & Events**
- **Contact** (styled as a button)

On mobile, all items appear in a slide-in drawer, ungrouped.

## Content Status

Content extracted from `Website_content.docx` (see `05-content-inventory.md` for the full cleaned text):

| Page | Content status |
|---|---|
| Home | ✅ Complete (hero, intro, focus areas, join CTA) |
| About / Vision & Mission | ✅ Complete (story, vision, mission, 6 core values) |
| Our Focus | 🟡 Partial — 8 focus areas named; detail copy to be expanded |
| Membership | ✅ Complete (4 tiers, fees, benefits, "Why Join" section) |
| Get Involved | ✅ Complete (Member / Partner / Donate / Volunteer) |
| Leadership & Governance | 🔴 Missing — needs names, roles, photos, governance structure |
| Partners & Collaborations | 🔴 Missing — needs partner names/logos |
| News & Events | 🔴 Missing — needs initial news items / events |
| Contact Us | 🔴 Missing — needs address, phone, email, registration number |

All 🔴 pages are fully **designed and laid out** in `03-page-layouts.md` with clearly marked `[PLACEHOLDER]` slots so real content can be dropped in without redesign.

## Key Decisions Made (overridable)

These were proposed as questions but answered with recommended defaults to keep momentum — flag if you want any changed:

1. **Tech stack:** static HTML + Tailwind CSS + vanilla JS (details and alternatives in `06-technical-plan.md`).
2. **Motion design:** elegant & subtle — scroll reveals, counters, hover states; no heavy parallax scenes (details in `04-animations.md`).
3. **Missing-content pages:** built at launch with placeholder content rather than omitted.

## Document Index

| File | Contents |
|---|---|
| `01-project-overview.md` | This file — goals, audiences, sitemap, decisions |
| `02-design-language.md` | Colors, typography, spacing, components, imagery |
| `03-page-layouts.md` | Section-by-section layout of every page |
| `04-animations.md` | Motion principles and exactly which animation goes where |
| `05-content-inventory.md` | Full cleaned website copy from the source document |
| `06-technical-plan.md` | Stack, file structure, performance, accessibility, SEO, phases |
