#!/usr/bin/env node
/**
 * MARKOVLAB production build script.
 * Generates dist/ with static files, SEO pages, OG cards, sitemap, and robots.txt.
 *
 * Usage: node scripts/build.mjs
 */
import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CALCULATORS } from '../assets/js/calculators.js';
import { categories } from '../assets/js/i18n.js';
import { DOMAIN_CONTENT } from '../assets/js/content.js';
import { RELEASE_CONFIG } from '../assets/js/config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const VERSION = RELEASE_CONFIG.version;
const CACHE_KEY = `markovlab-v${VERSION}`;

const CATEGORY_COLORS = {
  body: '#3b82f6', energy: '#f59e0b', nutrition: '#10b981',
  strength: '#ef4444', cardio: '#ec4899', recovery: '#8b5cf6',
  mind: '#06b6d4', money: '#22c55e', utility: '#6b7280'
};

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }
async function removeDir(dir) { await fs.rm(dir, { recursive: true, force: true }); }

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = join(src, entry.name), d = join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function copyStaticFiles() {
  console.log('📋 Copying static files...');
  const skipDirs = new Set(['dist', 'node_modules', '.git', 'legacy']);
  const skipFiles = new Set(['package.json', 'package-lock.json', 'README.md']);
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      await copyDir(join(ROOT, entry.name), join(DIST, entry.name));
    } else if (entry.isFile() && !skipFiles.has(entry.name)) {
      await fs.copyFile(join(ROOT, entry.name), join(DIST, entry.name));
    }
  }
}

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function calcJsonLd(calc, lang) {
  return {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: calc.title[lang], description: calc.description[lang],
    applicationCategory: 'HealthApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `./index.html#calc/${calc.id}`, inLanguage: lang
  };
}

async function generateToolSeoPages() {
  console.log('📄 Generating tool SEO pages...');
  let count = 0;
  for (const calc of CALCULATORS) {
    for (const lang of ['ru', 'en']) {
      const dir = join(DIST, lang, 'tools', calc.id);
      await ensureDir(dir);
      const canonical = `./index.html#calc/${calc.id}`;
      const otherLang = lang === 'ru' ? 'en' : 'ru';
      const hreflang = `../${otherLang}/tools/${calc.id}/index.html`;
      const title = calc.title[lang];
      const desc = calc.description[lang];
      const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | MARKOVLAB</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="${lang}" href="${canonical}">
<link rel="alternate" hreflang="${otherLang}" href="${hreflang}">
<meta property="og:title" content="${esc(title)} | MARKOVLAB">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(calcJsonLd(calc, lang))}</script>
</head>
<body>
<h1>${esc(title)}</h1>
<p>${esc(desc)}</p>
<noscript><p><a href="../index.html#home">MARKOVLAB</a></p></noscript>
<script>window.location.replace('../index.html#calc/${calc.id}')</script>
</body>
</html>`;
      await fs.writeFile(join(dir, 'index.html'), html, 'utf8');

      const color = CATEGORY_COLORS[calc.category] || '#6b7280';
      const catLabel = categories[calc.category]?.[lang] || calc.category;
      const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0f1714"/>
<rect x="0" y="0" width="1200" height="4" fill="${color}"/>
<text x="60" y="80" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="${color}" letter-spacing="3">MARKOVLAB</text>
<text x="60" y="200" font-family="system-ui,sans-serif" font-size="52" font-weight="700" fill="#edf4ef">${esc(title)}</text>
<text x="60" y="280" font-family="system-ui,sans-serif" font-size="20" fill="#b4c1ba">${esc(desc).slice(0, 100)}</text>
<rect x="60" y="340" width="${catLabel.length * 12 + 40}" height="36" rx="18" fill="${color}22" stroke="${color}" stroke-width="1"/>
<text x="${60 + (catLabel.length * 12 + 40) / 2}" y="363" font-family="system-ui,sans-serif" font-size="14" font-weight="500" fill="${color}" text-anchor="middle">${esc(catLabel)}</text>
<text x="60" y="580" font-family="system-ui,sans-serif" font-size="14" fill="#8a9a92">MARKOVLAB · ${VERSION}</text>
</svg>`;
      await fs.writeFile(join(dir, 'og.svg'), ogSvg, 'utf8');
      count++;
    }
  }
  console.log(`   Generated ${count} tool pages + OG cards`);
}

async function generateLabSeoPages() {
  console.log('📄 Generating lab SEO pages...');
  let count = 0;
  for (const [catId, cat] of Object.entries(categories)) {
    for (const lang of ['ru', 'en']) {
      const dir = join(DIST, lang, 'labs', catId);
      await ensureDir(dir);
      const title = cat[lang];
      const desc = cat.desc?.[lang] || title;
      const canonical = `./index.html#category/${catId}`;
      const otherLang = lang === 'ru' ? 'en' : 'ru';
      const hreflang = `../${otherLang}/labs/${catId}/index.html`;
      const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | MARKOVLAB</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="${lang}" href="${canonical}">
<link rel="alternate" hreflang="${otherLang}" href="${hreflang}">
<meta property="og:title" content="${esc(title)} | MARKOVLAB">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'CollectionPage',
  name: title, description: desc, url: canonical, inLanguage: lang
})}</script>
</head>
<body>
<h1>${esc(title)}</h1>
<p>${esc(desc)}</p>
<noscript><p><a href="../index.html#home">MARKOVLAB</a></p></noscript>
<script>window.location.replace('../index.html#category/${catId}')</script>
</body>
</html>`;
      await fs.writeFile(join(dir, 'index.html'), html, 'utf8');
      count++;
    }
  }
  console.log(`   Generated ${count} lab pages`);
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...');
  const today = new Date().toISOString().split('T')[0];
  const urls = [`  <url><loc>./index.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`];
  for (const catId of Object.keys(categories)) {
    for (const lang of ['ru', 'en']) {
      urls.push(`  <url><loc>${lang}/labs/${catId}/index.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
    }
  }
  for (const calc of CALCULATORS) {
    for (const lang of ['ru', 'en']) {
      urls.push(`  <url><loc>${lang}/tools/${calc.id}/index.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  await fs.writeFile(join(DIST, 'sitemap.xml'), xml, 'utf8');
}

async function generateRobotsTxt() {
  console.log('🤖 Generating robots.txt...');
  await fs.writeFile(join(DIST, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /docs/
Disallow: /tests/

Sitemap: ./sitemap.xml
`, 'utf8');
}

async function main() {
  console.log('🚀 Starting MARKOVLAB build...\n');
  console.log(`   Version: ${VERSION}`);
  await removeDir(DIST);
  await ensureDir(DIST);
  await copyStaticFiles();
  await generateSitemap();
  await generateRobotsTxt();
  await generateToolSeoPages();
  await generateLabSeoPages();

  let fileCount = 0, totalSize = 0;
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else { fileCount++; totalSize += (await fs.stat(p)).size; }
    }
  }
  await walk(DIST);

  console.log(`\n📊 Build Summary:`);
  console.log(`   Version: ${VERSION}`);
  console.log(`   Calculators: ${CALCULATORS.length}`);
  console.log(`   Categories: ${Object.keys(categories).length}`);
  console.log(`   Total files: ${fileCount}`);
  console.log(`   Total size: ${(totalSize / 1024).toFixed(2)} KB (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`   Output: ${DIST}\n`);
  console.log('✅ Build completed successfully!');
}

main().catch(err => { console.error('❌ Build failed:', err); process.exit(1); });
