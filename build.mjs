/**
 * WINGS-Web build — assembles the static site into the repository ROOT.
 *
 * The site is served by GitHub Pages in "Deploy from a branch → main → /(root)"
 * mode, so the generated HTML must live at the repo root (alongside a
 * `.nojekyll` marker) for it to be published as the site. Building into a
 * `dist/` sub-folder does not work with branch-root Pages — Jekyll would fall
 * back to rendering README.md as the homepage.
 *
 * Steps:
 *   1. Wrap each src/pages/*.html body in src/layout.html
 *   2. Inline {{> partial}} includes (header, footer, cta-band)
 *   3. Mark the active nav item for the page
 *   4. Copy site JS into assets/js
 *   5. Emit robots.txt, sitemap.xml, and .nojekyll at the root
 *
 * Tailwind CSS is compiled separately by the npm `build` script into
 * assets/css/main.css (it scans the generated root HTML).
 */
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src';
const ROOT = '.'; // publish target = repository root (branch-root Pages)

// Set to the real domain once configured (e.g. https://wings-aas.org).
// Relative asset/page URLs mean the site also works from a project-pages
// sub-path (e.g. https://<user>.github.io/wings-web/) without changes.
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
  const { readdir } = await import('node:fs/promises');
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
  await mkdir(path.join(ROOT, 'assets', 'css'), { recursive: true });

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
    await writeFile(path.join(ROOT, file), html);
  }

  // Site JS → assets/js (rebuilt each time so it can't go stale).
  await rm(path.join(ROOT, 'assets', 'js'), { recursive: true, force: true });
  await cp(path.join(SRC, 'js'), path.join(ROOT, 'assets', 'js'), { recursive: true });

  // Disable Jekyll so GitHub Pages serves these files as-is (and never turns
  // README.md into the homepage).
  await writeFile(path.join(ROOT, '.nojekyll'), '');

  await writeFile(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.keys(PAGES)
    .map((p) => `  <url><loc>${SITE_URL}/${p === 'index.html' ? '' : p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  await writeFile(
    path.join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  console.log(`Built ${Object.keys(PAGES).length} pages → repository root`);
}

main();
