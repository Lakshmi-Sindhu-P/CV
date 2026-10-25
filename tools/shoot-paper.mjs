import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4399';
const out = 'shots/paper';
await mkdir(out, { recursive: true });

const routes = [
  ['home', '/'],
  ['work', '/work/'],
  ['record-clinical', '/work/clinical-notes/'],
  ['record-ledger', '/work/procurement-ledger/'],
  ['record-network', '/work/protein-network/'],
  ['record-listening', '/work/repeat-listening/'],
  ['shelf', '/shelf/'],
  ['about', '/about/'],
  ['404', '/404.html'],
];

const browser = await chromium.launch();

for (const [name, route] of routes) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name}-desktop.png`, fullPage: true });
  console.log(name, res?.status(), errors.length ? `errors: ${errors.join(' | ')}` : 'clean');
  await page.close();
}

// mobile: the pages that carry the most layout risk
for (const [name, route] of [['home', '/'], ['work', '/work/'], ['about', '/about/'], ['shelf', '/shelf/']]) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/${name}-mobile.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log('done');
