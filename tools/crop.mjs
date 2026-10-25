/**
 * Element-level screenshot: lets a human (or a model) inspect one region at
 * full resolution without a 3000px-tall full-page capture.
 *   SHOT_SEL="#work article" SHOT_OUT=work-row node tools/crop.mjs
 */
import { chromium } from 'playwright';

const base = process.env.SHOT_BASE ?? 'http://127.0.0.1:4399';
const route = process.env.SHOT_ROUTE ?? '/';
const selector = process.env.SHOT_SEL ?? 'main';
const out = process.env.SHOT_OUT ?? 'crop';
const dark = process.env.SHOT_DARK === '1';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(process.env.SHOT_W ?? 1440), height: 1000 },
  deviceScaleFactor: Number(process.env.SHOT_DPR ?? 1.5),
  colorScheme: dark ? 'dark' : 'light',
});
await page.goto(base + route, { waitUntil: 'networkidle' });
await page.evaluate((scheme) => {
  if (scheme) document.documentElement.setAttribute('data-color-scheme', scheme);
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}, dark ? 'dark' : null);
await page.waitForTimeout(200);

const target = page.locator(selector).first();
await target.scrollIntoViewIfNeeded();
await target.screenshot({ path: `shots/${out}.png` });
await page.close();
await browser.close();
console.log(`wrote shots/${out}.png`);
