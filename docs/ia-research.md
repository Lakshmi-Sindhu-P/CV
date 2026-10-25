# Multipage personal sites — what actually exists, and how much people reveal

Compiled 25 Oct 2026. Nav labels below were **scraped from the live sites** with playwright
(`header a, nav a`), not remembered; captures are in `shots/refs/m-*.png`.

## First, an honest note on "most visited"

Traffic for personal sites is private — there is no ranking of "most visited portfolios" I can
verify, and any list claiming one is guessing. What *is* observable is which structures get
**copied and indexed**: directories of /now and /uses pages, garden taxonomies, "flat index"
sites. Those are the shapes other people adopted, which is a better signal than a traffic chart
anyway.

Evidence gathered:

- **uses.tech** — 952 published `/uses` pages ("all 952" in its own filter bar).
- **nownownow.com** — Derek Sivers' directory of `/now` pages; the pattern spread by word of mouth
  after he wrote about it.
- Navbars scraped live:
  - `simonwillison.net` → About | Newsletter | TILs | Tools
  - `maggieappleton.com` → The Garden | Now | About | Essays | Notes | Patterns | Smidgeons | Talks | Podcasts | Library
  - `craigmod.com` → About Craig | Books | Essays | Membership | Shop | "Special Projects" Membership | On Margins | SW945 | Newsletters | Roden | Ridgeline
  - `sive.rs` → no header nav at all (the page is a list of links)
  - `tomcritchlow.com` → no header nav (sections live in the body)
  - `nownownow.com` → /now page | /about

---

## The six multipage shapes

### 1 · The flat index — `sive.rs`
No navigation. The home page is a list of ~1000 links in loose categories; you navigate by
curiosity, not by menu. **Requires a large corpus**; works because Sivers has 20 years of pages.
Cost: zero structure, infinite content. Wrong for us.

### 2 · Stream + annexes — `simonwillison.net`
The blog stream *is* the site; four annexes hold different **types** of the same thing (About,
Newsletter, TILs, Tools). TILs are the clever bit: a category for "small things I learned", so
small notes have a home that isn't the front page. Cost: writing cadence.

### 3 · The garden taxonomy — `maggieappleton.com`
Content filed by **maturity and length**, not topic: Essays / Notes / Patterns / Smidgeons, plus
Now, Library, Talks, Podcasts. This is the most sophisticated IA in the list and the most
expensive to maintain — it only works if the buckets keep filling. Cost: high, sustained.

### 4 · Many rooms — `craigmod.com`
The site is a business: Books, Membership, Shop, Newsletters, two named projects (Roden, Ridgeline),
a podcast. Each room has a commercial purpose. Cost: high; needs products.

### 5 · The canonical trio — `/about` + `/now` + `/uses`
The personal web's cheapest humanity: what I'm doing this season (`/now`), what I work on
(`/uses`), who I am (`/about`). 952 sites publish a `/uses` page; the `/now` directory is large
enough to be a movement. Cost: **30 minutes, twice a year** — the best value per effort on this
whole list.

### 6 · One page, anchored — `rauno.me`, `brittanychiang.com`
Maximum density per scroll, minimum maintenance, minimum depth. Weakest for showing how someone
thinks over time; strongest for a hiring scan.

---

## The reveal ladder

How much of a person actually gets published, cheapest first:

| Level | What it adds | Who does it | Upkeep |
|---|---|---|---|
| **L0** | Name, role, links to work | most DE/DA portfolios | none |
| **L1** | One human sentence about how you think | rauno ("is an Estonian interaction designer working with Vercel") | none |
| **L2** | `/now` + `/uses` — this season, this setup | 952+ sites for /uses; the /now directory | twice a year |
| **L3** | About essay + a taste list (library, reading) | maggieappleton, craigmod | occasional |
| **L4** | Dated notes / TILs — unfinished thinking in public | simonwillison (TILs), maggie (notes) | weekly-ish |
| **L5** | Life as first-class pages: music, cooking, folklore, faith | rare; craigmod's side projects, some artist sites | consistent or don't start |

The sites people remember sit at **L2–L4**. L5 usually works better *inside* L3 as a list than as
its own page — a "shelf" reads as taste; a "life" section reads as a blog nobody updates.

---

## What this means for you

You asked for theme 7's warmth with your personality in it, multipage. The ladder says:
**L2 is free, L3 is where the soul lives, L4 is where the proof of transition lives.** So:

| Route | Level | Purpose | Effort |
|---|---|---|---|
| `/` cover | L1 | the four-line statement, one texture, three doors | done (prototype) |
| `/work` | L0–L2 | ledger index: four records, numbers up front | 1 pass |
| `/work/[slug]` × 4 | L2 | ~500 words each: problem, what I did, what it moved | 4 × half day |
| `/shelf` | L3 | singing, folklore, cooking, reading — lists with a line each | 2 hours, then living |
| `/about` | L3 | the four-line statement unpacked, in prose | 1 hour |
| `/now` | L2 | season status; also the honest "AI transition" tracker | 30 min, twice a year |
| `/notes` | L4 | only start when you have three notes you'd defend publicly | ongoing |

Minimum viable multipage: `/` + `/work` + `/shelf` + `/about`. Add `/now` immediately after
(it's the cheapest personality on the internet). Add `/notes` when the habit exists — an empty
garden is worse than no garden.
