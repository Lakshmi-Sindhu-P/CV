/**
 * Reference capture: screenshots candidate sites so design claims are based on
 * what the site actually looks like, not on a search snippet.
 *   PLAYWRIGHT_BROWSERS_PATH=.tmp/browsers node tools/refs.mjs
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const targets = [
  ['rauno', 'https://rauno.me'],
  ['paco', 'https://paco.me'],
  ['brittanychiang', 'https://brittanychiang.com'],
  ['maggieappleton', 'https://maggieappleton.com'],
  ['yanholtz', 'https://www.yan-holtz.com'],
  ['distill', 'https://distill.pub'],
  ['terminalshop', 'https://terminal.shop'],
  ['leerob', 'https://leerob.io'],
  ['godly', 'https://godly.website'],
  ['a1dark', 'https://www.a1.gallery/style/dark'],
  ['brutalist', 'https://brutalistwebsites.com'],
];

await mkdir('shots/refs', { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const [slug, url] of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2500);
    const title = await page.title();
    await page.screenshot({ path: `shots/refs/${slug}.png` });
    results.push({ slug, url, ok: true, title: title.slice(0, 80) });
    console.log(`ok   ${slug} — ${title.slice(0, 60)}`);
  } catch (error) {
    results.push({ slug, url, ok: false, error: String(error).split('\n')[0].slice(0, 90) });
    console.log(`FAIL ${slug} — ${String(error).split('\n')[0].slice(0, 70)}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 1));
