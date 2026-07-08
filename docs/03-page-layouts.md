# 03 — Page Layouts

Section-by-section layout for all 8 pages. Every page shares the sticky **Header** and the **Footer** (specs in `02-design-language.md`). Sections are listed top-to-bottom; copy references point to `05-content-inventory.md`. Animations named here are specified in `04-animations.md`.

Legend: `[PLACEHOLDER]` = layout is final, real content pending.

---

## 1. Home — `index.html`

The longest page; a guided story: *who we are → what we do → why join → act*.

### 1.1 Hero (dark, full-bleed)
- Full-viewport-height (min 640px) section, `forest-900` gradient over field photography.
- Left-aligned content column (max 640px): eyebrow "WINGS-AAS", H1 **"Empowering Women. Transforming Agriculture. Inspiring Sustainable Futures."**, sub-line "Where Women Lead, Agriculture Thrives.", one intro paragraph, then two buttons: **Become a Member** (accent gold) + **Explore Our Work** (ghost, scrolls to focus areas).
- Right side (desktop only): the circular logo, large (~380px), with a faint oversized leaf watermark behind it.
- Bottom edge: wing-curve divider into cream.
- Animations: staggered entrance, slow Ken Burns on photo, scroll cue.

### 1.2 Intro / "Who We Are" strip
- Cream bg. Centered narrow column (max 760px): the two remaining intro paragraphs ("We bring together…", "Together, we are building…").
- Below: **Our Promise** rendered as three inline pill tags: `Empower People` `Enable Innovation` `Create Impact`.

### 1.3 Our Focus Areas
- `cream-100` bg. Standard section title block ("WHAT WE DO / Our Focus Areas").
- **8 feature cards** in a 4×2 grid (desktop) → 2×4 (tablet) → 1-col (mobile): the eight focus areas with Lucide icons.
- Each card links to the matching section anchor on `focus.html`.

### 1.4 Impact stats band (dark)
- Slim `forest-700` band, 4 **stat blocks** in a row: `[PLACEHOLDER — e.g., Members · States Covered · Programs Conducted · Partner Institutions]`. Count-up animation.
- Purpose: credibility beat between content sections. If no real numbers exist at launch, this band ships hidden (single CSS class) rather than with fake numbers.

### 1.5 Why Join preview
- Cream bg. Title block ("WHY WINGS / One Community. Unlimited Possibilities.").
- The 8 "Why Join" items (Learn, Connect, Grow, Innovate, Expand, Create Impact, Gain Recognition, Belong) as a compact 4×2 icon-and-title grid — short body lines only here; full text lives on the Membership page.
- Ghost button: **See Membership Benefits** → `membership.html`.

### 1.6 Join the Movement CTA (dark, pre-footer)
- Wing-curve divider in. `forest-900` bg with subtle leaf watermark.
- Centered: H2 **"Together, We Can Redefine the Future of Agriculture."**, the three-sentence closing paragraph, tagline line "Empowering Women. Strengthening Agriculture. Creating Sustainable Futures." in `sage-400`.
- Three buttons: **Become a Member** (gold) · **Partner With Us** (primary) · **Explore Opportunities** (ghost).

---

## 2. About — `about.html`

### 2.1 Page hero (compact)
- All interior pages share this pattern: 320px-tall `forest-700` band, breadcrumb (Home / About), H1 "About WINGS", one-line lede — here: "Building Leaders. Strengthening Communities. Transforming Agriculture."

### 2.2 Our Story (two-column)
- Cream bg. Left: the four "About" paragraphs ("Women are the backbone of agriculture…" → "…inclusive rural development."). First sentence set larger (22px) as a lede.
- Right: portrait-ratio photo `[PLACEHOLDER]` with a `sage-400` offset frame (8px offset border behind the image).

### 2.3 Vision & Mission — `id="vision-mission"` (nav target)
- `cream-100` bg. Two side-by-side panels:
  - **Vision** card: `forest-700` filled, cream text, `eye` icon — the single vision sentence, set large (Fraunces 24px).
  - **Mission** card: white, the 6 mission bullets with leaf bullets.
- Mobile: stacked, Vision first.

### 2.4 Our Core Values
- Cream bg. 6 **feature cards** (3×2): Empowerment, Collaboration, Innovation, Sustainability, Inclusion, Excellence — each with icon, H3, one-line description.
- Below the grid, centered italic Fraunces pull-quote: *"WINGS is more than a cooperative — it is a movement transforming the future of women in agriculture."*

### 2.5 Mini-CTA strip
- Slim `forest-700` band: "Ready to be part of the movement?" + **Become a Member** button.

---

## 3. Our Focus — `focus.html`

### 3.1 Page hero (compact)
- H1 "Our Focus", lede: "Eight interconnected areas where WINGS creates lasting impact." `[PLACEHOLDER — lede copy to confirm]`

### 3.2 Focus area sections ×8
- Alternating layout rows (icon+text left / visual right, then flipped), one per focus area, each with an `id` anchor for links from Home.
- Each row: icon chip, H2 (e.g. "Women Empowerment"), 2–3 sentence description `[PLACEHOLDER — the source document names the areas but does not describe them; draft copy needed]`, and where relevant a link (e.g. Entrepreneurship → Membership).
- Row backgrounds alternate cream / `cream-100`.

### 3.3 Mini-CTA strip
- Same as 2.5, with **Partner With Us** button.

---

## 4. Membership — `membership.html`

The conversion page — everything a prospect needs to decide and act.

### 4.1 Page hero (compact)
- H1 "Membership", lede: "Join Once. Grow Together. Lead Forever."

### 4.2 Intro
- Narrow centered column: the two membership intro paragraphs.

### 4.3 Individual tiers (2 pricing cards side by side)
- **Young Industry Professionals** — ₹5,000 | 5-Year Membership, description + 6 ✔ benefits.
- **Academic & Research Members** — ₹5,000 | 5-Year Membership, description + 6 ✔ benefits.
- Both cards: white, price in Fraunces 40px `forest-700`, **Apply Now** button `[PLACEHOLDER — application mechanism: form vs. email, see 06-technical-plan.md]`.

### 4.4 Corporate • Startup • Institutional tier
- Sub-title: "Building Partnerships That Create Impact".
- **Fee table** (styled, not a card): 4 rows — Very Small (1–10) ₹10,000 · Small (10–20) ₹25,000 · Medium (20–50) ₹1,00,000 · Large (50+) ₹2,00,000. Zebra striping with `cream-100`; on mobile the table becomes stacked definition rows.
- Below: the 12 exclusive benefits as a 3-column ✔ checklist.
- **Enquire About Institutional Membership** button.

### 4.5 Patrons & Advisors (dark band)
- `forest-700` band, centered: H2 "Patrons & Advisors — By Invitation", the two description sentences, ghost-on-dark **Contact the Secretariat** button.

### 4.6 Why Join WINGS? (full version)
- Cream bg. The 8 items as full feature cards (icon, H3, complete description text), 4×2 grid.

### 4.7 Membership CTA
- Gold-accented closing band: "Membership isn't just about joining an organization — it's about becoming part of a purpose-driven ecosystem." + **Become a Member**.

---

## 5. Get Involved — `get-involved.html`

### 5.1 Page hero (compact)
- H1 "Get Involved", lede: "Every Contribution Creates Impact."

### 5.2 Intro line
- Single centered sentence ("Whether you're an individual, institution, corporate…").

### 5.3 Four pathway cards (2×2 grid, equal height)
- **Become a Member** → button to `membership.html`
- **Partner With Us** → button opens contact form with subject preset `[PLACEHOLDER — partnership process]`
- **Donate** → gold accent card (visually distinct) — includes "Your contribution creates opportunities that transform lives." `[PLACEHOLDER — donation mechanism: bank details / payment gateway / 80G status]`
- **Volunteer with WINGS** → button to contact form
- Each card: icon, H3, full description from content doc, one button.

### 5.4 Final CTA (dark)
- Same component as Home 1.6 (shared partial) — reinforces the closing message.

---

## 6. Leadership & Governance — `leadership.html` `[PLACEHOLDER page]`

### 6.1 Page hero (compact)
- H1 "Leadership & Governance", lede `[PLACEHOLDER]`.

### 6.2 Board / Office bearers grid
- Rows of **profile cards**: circular photo (160px), name, role, one-line bio. Grid 4-up → 2-up → 1-up. `[PLACEHOLDER — names, roles, photos]`
- Suggested grouping: Board of Directors · Advisory Council · Secretariat.

### 6.3 Governance structure
- Short section: cooperative registration details, governance principles, AGM cadence. `[PLACEHOLDER — registration number, bylaws summary]`

---

## 7. Partners & Collaborations — `partners.html` `[PLACEHOLDER page]`

### 7.1 Page hero (compact)
### 7.2 Partner logo wall
- Greyscale logos in a 5-up grid, color on hover. `[PLACEHOLDER — partner logos]`
- Optional grouping tabs: Government · Academic · Industry · Development Organizations.

### 7.3 Collaboration models
- 3 cards: Research & Innovation · CSR & Development Programs · Capacity Building — copy derived from the "Partner With Us" text.

### 7.4 Mini-CTA: **Partner With Us** → contact form.

---

## 8. News & Events — `news.html` `[PLACEHOLDER page]`

### 8.1 Page hero (compact)
### 8.2 Featured item
- One wide card: image, date chip, title, excerpt. `[PLACEHOLDER]`
### 8.3 News grid
- 3-up cards (image, date, title, 2-line excerpt, "Read more"). Initially 3–6 items; static HTML at launch, upgrade path in `06-technical-plan.md`. `[PLACEHOLDER — initial items]`
### 8.4 Upcoming events list
- Simple list rows: date block (day/month in Fraunces), event title, venue, ghost "Details" button. `[PLACEHOLDER]`

---

## 9. Contact Us — `contact.html`

### 9.1 Page hero (compact)
- H1 "Contact Us", lede: "We'd love to hear from you."

### 9.2 Two-column layout
- **Left — contact details card:** registered office address, phone, email, office hours, social links. `[PLACEHOLDER — all details pending]`
- **Right — contact form:** Name, Email, Phone, Subject (dropdown: Membership / Partnership / Donation / Volunteering / General), Message, consent checkbox, **Send Message** (primary). Form backend per `06-technical-plan.md`.

### 9.3 Map
- Full-width embedded map (lazy-loaded, static image placeholder until consented/clicked — avoids third-party weight). `[PLACEHOLDER — location]`

---

## Shared: Footer (all pages)

- `forest-900`. Columns: ① logo + one-line mission + social icons ② Explore (page links) ③ Get Involved (Member / Partner / Donate / Volunteer) ④ Contact summary `[PLACEHOLDER]`.
- Bottom bar: "© 2026 WINGS-AAS — Women's Initiative for Nurturing Growth & Sustainability – Agriculture & Allied Sectors Cooperative Society Limited" + registration line `[PLACEHOLDER]`.
