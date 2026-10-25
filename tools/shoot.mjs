/**
 * Screenshot harness. Requires a static server on BASE (default 4399).
 *   PLAYWRIGHT_BROWSERS_PATH=.tmp/browsers node tools/shoot.mjs
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.SHOT_BASE ?? 'http://127.0.0.1:4399';

const shots = [
  { route: '/', file: 'home-desktop', width: 1440, height: 1000 },
  { route: '/', file: 'home-mobile', width: 390, height: 844 },
  { route: '/design', file: 'design-desktop', width: 1440, height: 1000 },
  { route: '/404.html', file: 'notfound', width: 1440, height: 800 },
];

await mkdir('shots', { recursive: true });

const browser = await chromium.launch();

for (const shot of shots) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
  });
  await page.goto(base + shot.route, { waitUntil: 'networkidle' });
  // Trigger every reveal so nothing is captured at opacity 0.
  await page.evaluate(() =>
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')),
  );
  await page.waitForTimeout(250);
  await page.screenshot({ path: `shots/${shot.file}.png`, fullPage: true });
  await page.close();
  console.log('wrote shots/' + shot.file + '.png');
}

// Dark mode of the home page.
const dark = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
});
await dark.goto(base + '/', { waitUntil: 'networkidle' });
await dark.evaluate(() => {
  document.documentElement.setAttribute('data-color-scheme', 'dark');
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
});
await dark.waitForTimeout(250);
await dark.screenshot({ path: 'shots/home-dark.png', fullPage: true });
console.log('wrote shots/home-dark.png');

await browser.close();
