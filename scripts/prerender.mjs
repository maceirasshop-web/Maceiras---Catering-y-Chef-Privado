import fs from 'node:fs';
import path from 'node:path';
import { ROUTE_SEO } from '../src/seo/routes.ts';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const INDEX = path.join(DIST, 'index.html');

function upsertMeta(html, attr, key, content) {
  const re = new RegExp(`<meta[^>]*${attr}=["']${key}["'][^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${String(content).replace(/"/g, '&quot;')}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertLinkRel(html, rel, href) {
  const re = new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${href}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertJsonLd(html, json) {
  const re = /<script type="application\/ld\+json">[\s\S]*?<\/script>/i;
  const tag = `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function injectRoot(html, snapshot) {
  const re = /<!--PRERENDER-->[\s\S]*?<!--\/PRERENDER-->/;
  const block = `<!--PRERENDER-->\n${snapshot}\n<!--/PRERENDER-->`;
  if (re.test(html)) return html.replace(re, block);
  return html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${block}</div>`);
}

function outPathFor(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, routePath.replace(/^\//, ''), 'index.html');
}

if (!fs.existsSync(INDEX)) {
  throw new Error('dist/index.html missing. Run vite build first.');
}

const template = fs.readFileSync(INDEX, 'utf8');

for (const route of ROUTE_SEO) {
  let html = template;
  html = html.replace(/<html lang="[^"]*"/, '<html lang="es-CL"');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  html = upsertMeta(html, 'name', 'description', route.description);
  html = upsertMeta(html, 'name', 'robots', route.robots || 'index, follow');
  html = upsertLinkRel(html, 'canonical', route.canonical);
  html = upsertMeta(html, 'property', 'og:title', route.title);
  html = upsertMeta(html, 'property', 'og:description', route.description);
  html = upsertMeta(html, 'property', 'og:url', route.canonical);
  html = upsertMeta(html, 'property', 'og:image', route.ogImage);
  html = upsertMeta(html, 'property', 'og:type', 'website');
  html = upsertMeta(html, 'property', 'og:locale', 'es_CL');
  html = upsertMeta(html, 'name', 'twitter:title', route.title);
  html = upsertMeta(html, 'name', 'twitter:description', route.description);
  html = upsertMeta(html, 'name', 'twitter:image', route.ogImage);
  html = upsertJsonLd(html, route.jsonLd);
  html = injectRoot(html, route.snapshot);

  if (route.path === '/') {
    if (!html.includes('tabla-de-charcuteria-800.webp')) {
      html = html.replace(
        '</head>',
        '    <link rel="preload" as="image" href="/images/tabla-de-charcuteria-800.webp" type="image/webp" media="(min-width: 1024px)" fetchpriority="high" />\n  </head>'
      );
    }
  } else {
    html = html.replace(/<link rel="preload" as="image"[^>]*tabla-de-charcuteria[^>]*>\s*/g, '');
  }

  const dest = outPathFor(route.path);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log('Prerendered', route.path, '→', path.relative(ROOT, dest));
}
