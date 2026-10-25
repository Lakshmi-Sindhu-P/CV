import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const targets = [
  ['degenesis', 'https://degenesis.com'],
  ['pudding', 'https://pudding.cool'],
  ['aww-de', 'https://www.awwwards.com/sites/data-engineering-ai'],
  ['hellboy', 'https://hellboywebofwyrd.com'],
];

await mkdir('shots/refs', { recursive: true });
const browser = await chromium.launch();
for (const [slug, url] of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `shots/refs/${slug}.png` });
    console.log(`ok   ${slug} — ${(await page.title()).slice(0, 60)}`);
  } catch (e) {
    console.log(`FAIL ${slug} — ${String(e).split('\n')[0].slice(0, 70)}`);
  } finally { await page.close(); }
}
await browser.close();
