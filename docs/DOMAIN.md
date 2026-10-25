# Custom domain

Goal: `https://<your-domain>` serves this site, with a valid certificate, and `http://`, `www`, and
the old `github.io/CV` URL all end up in the same place.

Nothing in the code needs to change — the build reads two environment variables.

---

## 1. Pick and buy the domain

Short, spellable over the phone, and it should not need explaining. For a data profile,
`firstnamelastname.com` is ideal; `firstnamelastname.dev` or `.io` also work. Avoid hyphens and
numbers, and check the name is free on LinkedIn/X before buying.

Cheap registrars that make DNS painless: Cloudflare Registrar (at-cost, no upsell), Porkbun,
Namecheap. **Cloudflare is the recommendation** — free DNS, free proxying, and no surprise renewal
pricing.

## 2. Point the domain at GitHub Pages

In the repository: **Settings → Pages → Custom domain**, enter the domain, save. GitHub writes a
`CNAME` file expectation; for this build the file must live in `public/CNAME`:

```bash
echo "yourdomain.com" > public/CNAME
```

Then DNS, at your registrar:

**Apex (`yourdomain.com`) — four `A` records:**

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**IPv6 (optional but recommended) — four `AAAA` records:**

`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`

**`www` — one `CNAME`:**

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `lakshmi-sindhu-p.github.io` |

Note the target is `lakshmi-sindhu-p.github.io` — **no** `/CV` path and no trailing slash.

Then in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is issued (usually minutes,
occasionally an hour). Set the custom domain as the primary and let GitHub redirect `www` → apex (or
the reverse, whichever you chose).

If you use Cloudflare as the proxy, set the records to **DNS only** (grey cloud) while GitHub issues
the certificate, then you may switch to proxied.

## 3. Tell the build about the domain

In `.github/workflows/deploy.yml`, change the two env vars on the build step:

```yaml
PUBLIC_SITE_URL: https://yourdomain.com   # no trailing slash
PUBLIC_BASE_PATH: /
```

That is what makes canonical URLs, Open Graph tags, the sitemap, and `robots.txt` point at the new
origin. The apex deploy previously used `PUBLIC_BASE_PATH=/CV/` — leaving it as `/CV/` on a custom
domain produces 404s for every asset, so this is the one value people get wrong.

## 4. Verify

```bash
curl -I https://yourdomain.com                 # 200, and the certificate is valid
curl -s https://yourdomain.com/robots.txt      # Sitemap line points at the new domain
curl -s https://yourdomain.com/sitemap-index.xml | head
```

Then:

- **OG preview:** paste the URL into <https://www.opengraph.xyz> — the card should show the generated
  `og.png` (regenerate it with `node tools/og.mjs` if the headline changes).
- **Canonical:** view source, confirm `<link rel="canonical" href="https://yourdomain.com/">`.
- **Old URL:** `https://lakshmi-sindhu-p.github.io/CV/` should redirect to the domain (GitHub does
  this automatically once the custom domain is set).

## 5. Checklist

- [ ] Domain bought, auto-renew on
- [ ] `public/CNAME` contains the bare domain
- [ ] Four `A` records (+ `AAAA` if you want IPv6)
- [ ] `www` CNAME → `lakshmi-sindhu-p.github.io`
- [ ] Settings → Pages → Custom domain saved
- [ ] Enforce HTTPS ticked after the certificate is issued
- [ ] `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH=/` updated, redeployed
- [ ] `robots.txt`, canonical, and OG verified
- [ ] Résumé PDF and LinkedIn updated to point at the domain

## Alternative hosts

The output is plain static files, so any of these work if you would rather not use Pages:

- **Cloudflare Pages** — build `npm run build`, output `dist`, free custom domain, fastest DNS.
- **Netlify / Vercel** — same two settings; both give preview deploys per branch.

With those, `PUBLIC_BASE_PATH` stays `/` and `PUBLIC_SITE_URL` is the full origin.
