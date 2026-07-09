/**
 * WINGS-Web build — assembles dist/ from src/.
 *
 * Steps:
 *   1. Wrap each src/pages/*.html body in src/layout.html
 *   2. Inline {{> partial}} includes (header, footer, cta-band, page-hero)
 *   3. Mark the active nav item for the page
 *   4. Copy assets and JS
 *   5. Emit robots.txt + sitemap.xml
 *
 * Tailwind CSS is compiled separately by the npm `build` script
 * (it scans the assembled dist/ HTML).
 */
import { readFile, writeFile, mkdir, cp, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src';
const OUT = 'dist';

// Set to the real domain once configured (e.g. https://wings-aas.org).
// Relative asset/page URLs mean the site also works from a sub-path host
// such as GitHub Pages without changes.
const SITE_URL = process.env.SITE_URL || 'https://wings-aas.org';

/** Per-page metadata. `nav` = top-level header item to mark active. */
const PAGES = {
  'index.html': {
    title: 'WINGS-AAS — Empowering Women, Transforming Agriculture',
    description:
      'WINGS-AAS is a national women-led cooperative advancing agriculture through leadership, innovation, entrepreneurship, collaboration, and sustainable development.',
    nav: 'home',
  },
  'about.html': {
    title: 'About WINGS — WINGS-AAS',
    description:
      'Learn about WINGS-AAS: our story, vision, mission, and the core values behind a national women-led agricultural cooperative.',
    nav: 'about',
  },
  'focus.html': {
    title: 'Our Focus — WINGS-AAS',
    description:
      'Eight interconnected focus areas where WINGS-AAS creates lasting impact — from women empowerment to sustainable agriculture and market linkages.',
    nav: 'about',
  },
  'membership.html': {
    title: 'Membership — WINGS-AAS',
    description:
      'Join WINGS-AAS: membership tiers for young professionals, academics and researchers, corporates, startups, and institutions.',
    nav: 'membership',
  },
  'get-involved.html': {
    title: 'Get Involved — WINGS-AAS',
    description:
      'Become a member, partner with us, donate, or volunteer — every contribution creates impact at WINGS-AAS.',
    nav: 'involved',
  },
  'leadership.html': {
    title: 'Leadership & Governance — WINGS-AAS',
    description: 'The leadership and governance of WINGS-AAS.',
    nav: 'about',
  },
  'partners.html': {
    title: 'Partners & Collaborations — WINGS-AAS',
    description:
      'Partner organizations and collaboration models: research and innovation, CSR and development programs, capacity building.',
    nav: 'partners',
  },
  'news.html': {
    title: 'News & Events — WINGS-AAS',
    description: 'Latest news and upcoming events from WINGS-AAS.',
    nav: 'news',
  },
  'contact.html': {
    title: 'Contact Us — WINGS-AAS',
    description:
      'Get in touch with WINGS-AAS — Chhatrapati Sambhaji Nagar, Maharashtra. Phone +91 8329831530, email wings.aas5@gmail.com.',
    nav: 'contact',
  },
};

const read = (p) => readFile(p, 'utf8');
// Replacement via function to avoid `$&`-style substitution surprises.
const sub = (str, token, value) => str.replaceAll(token, () => value);

async function loadPartials() {
  const dir = path.join(SRC, 'partials');
  const partials = {};
  for (const f of await readdir(dir)) {
    if (f.endsWith('.html')) partials[f.replace('.html', '')] = await read(path.join(dir, f));
  }
  return partials;
}

function inlinePartials(html, partials) {
  // {{> name}} — repeat until stable so partials may nest.
  let prev;
  do {
    prev = html;
    html = html.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => {
      if (!(name in partials)) throw new Error(`Unknown partial: ${name}`);
      return partials[name];
    });
  } while (html !== prev);
  return html;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(path.join(OUT, 'assets'), { recursive: true });

  const layout = await read(path.join(SRC, 'layout.html'));
  const partials = await loadPartials();

  for (const [file, meta] of Object.entries(PAGES)) {
    const body = await read(path.join(SRC, 'pages', file));
    let html = layout;
    html = sub(html, '{{title}}', meta.title);
    html = sub(html, '{{description}}', meta.description);
    html = sub(html, '{{content}}', body);
    html = inlinePartials(html, partials);
    // Activate the current top-level nav item (CSS keys off data-active).
    html = sub(html, `data-nav="${meta.nav}"`, `data-nav="${meta.nav}" data-active`);
    // Activate dropdown sub-items that point at this page.
    html = sub(html, `data-subnav="${file}"`, `data-subnav="${file}" data-active`);
    await writeFile(path.join(OUT, file), html);
  }

  await cp('assets', path.join(OUT, 'assets'), { recursive: true });
  await cp(path.join(SRC, 'js'), path.join(OUT, 'assets', 'js'), { recursive: true });

  await writeFile(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.keys(PAGES)
    .map((p) => `  <url><loc>${SITE_URL}/${p === 'index.html' ? '' : p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  await writeFile(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  console.log(`Built ${Object.keys(PAGES).length} pages → ${OUT}/`);
}

main();
