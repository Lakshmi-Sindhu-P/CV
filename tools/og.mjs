/**
 * Renders public/og.png (1200×630) from the same tokens the site uses.
 * Re-run after changing type, colours, or the headline metrics:
 *   PLAYWRIGHT_BROWSERS_PATH=.tmp/browsers node tools/og.mjs
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const fontDir = resolve('node_modules/@fontsource-variable');
const b64 = async (path) => (await readFile(path)).toString('base64');

const newsreader = await b64(`${fontDir}/newsreader/files/newsreader-latin-wght-normal.woff2`);
const inter = await b64(`${fontDir}/inter/files/inter-latin-wght-normal.woff2`);
const mono = await b64(`${fontDir}/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2`);

const metrics = [
  ['−60%', 'inventory query time'],
  ['35→18', 'min per consultation'],
  ['4.9M→184K', 'protein edges pruned'],
  ['0.04→0.42', 'R² on engagement'],
];

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: Newsreader; src: url(data:font/woff2;base64,${newsreader}) format('woff2'); font-weight: 200 800; }
  @font-face { font-family: Inter; src: url(data:font/woff2;base64,${inter}) format('woff2'); font-weight: 100 900; }
  @font-face { font-family: Mono; src: url(data:font/woff2;base64,${mono}) format('woff2'); font-weight: 100 800; }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 64px 72px;
    background: #faf9f6; color: #15171b;
    display: flex; flex-direction: column; justify-content: space-between;
    font-family: Inter, sans-serif; position: relative; overflow: hidden;
  }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(to right, #e3dfd6 1px, transparent 1px),
                      linear-gradient(to bottom, #e3dfd6 1px, transparent 1px);
    background-size: 96px 96px; opacity: .55; }
  .eyebrow { font-family: Mono, monospace; font-size: 15px; letter-spacing: .14em;
    text-transform: uppercase; color: #5b6068; }
  .top { display: flex; justify-content: space-between; align-items: baseline;
    border-bottom: 1px solid #c7c1b4; padding-bottom: 14px; position: relative; }
  h1 { font-family: Newsreader, serif; font-weight: 400; font-size: 76px; line-height: .95;
    letter-spacing: -.03em; margin-top: 28px; position: relative; }
  .lede { font-family: Newsreader, serif; font-size: 26px; line-height: 1.4; color: #3c4148;
    max-width: 800px; margin-top: 18px; position: relative; }
  .strip { display: flex; gap: 0; border-top: 1px solid #e3dfd6; position: relative; }
  .strip div { flex: 1; padding: 18px 20px 0 0; }
  .strip div + div { border-left: 1px solid #e3dfd6; padding-left: 24px; }
  .value { font-family: Mono, monospace; font-size: 34px; font-weight: 500;
    letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
  .label { font-family: Mono, monospace; font-size: 12px; letter-spacing: .08em;
    text-transform: uppercase; color: #5b6068; margin-top: 6px; }
</style></head>
<body>
  <div class="grid"></div>
  <div>
    <div class="top">
      <span class="eyebrow">Portfolio · 2026 edition</span>
      <span class="eyebrow">Chicago, IL · open to remote</span>
    </div>
    <h1>Lakshmi Sindhu<br/>Pulugundla</h1>
    <p class="lede">Data analyst and data scientist. I turn operational mess — a stock ledger,
      a clinic transcript, a protein network — into pipelines and models that survive contact
      with the people who use them.</p>
  </div>
  <div class="strip">
    ${metrics.map(([v, l]) => `<div><div class="value">${v}</div><div class="label">${l}</div></div>`).join('')}
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1.6,
});
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('wrote public/og.png');
