import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Domain provisions
 * -----------------
 * Two env vars make this deployable anywhere without code edits:
 *
 *   PUBLIC_SITE_URL   e.g. https://sindhup.dev        (custom domain)
 *                          https://lakshmi-sindhu-p.github.io   (project pages, subpath)
 *   PUBLIC_BASE_PATH  e.g. /            (root domain / Netlify / Vercel)
 *                          /CV/         (GitHub Pages project site)
 *
 * If you deploy to a GitHub Pages *project* site, also set
 * PUBLIC_BASE_PATH=/CV/ so every asset and link resolves correctly.
 * On a custom domain, leave it at "/" and do not commit public/CNAME-*.
 */
const site = process.env.PUBLIC_SITE_URL ?? 'https://lakshmi-sindhu-p.github.io';
const base = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  integrations: [
    react(),
    // /design is a noindex comparison sheet — keep it out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/design') && !page.includes('/404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
