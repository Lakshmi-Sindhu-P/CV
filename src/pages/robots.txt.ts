import type { APIRoute } from 'astro';

/**
 * robots.txt is generated, not static, so the sitemap URL follows whatever
 * `site` + `base` astro.config.mjs was built with — the same build works on a
 * custom domain and on a github.io/CV subpath.
 */
export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? url.origin;
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, origin).href;

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
