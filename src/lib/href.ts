/**
 * Prefix an internal path with the configured base path.
 *
 * The site deploys to GitHub Pages project pages (`/CV/`) today and to a custom domain (`/`)
 * later; every internal link goes through here so the switch is one env var.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function href(path = '/'): string {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}
