# Design notes

Why the site looks the way it does, what it deliberately does not do, and what is still unresolved.

---

## 1. The idea: a private paper, printed once

The site is four pages of cream paper with ink on it, one rust accent, and a staff of small dots
behind the opening statement. It reads like a document someone typeset for one reader, not like a
landing page.

Three decisions carry that:

- **Cream, not white.** `#f4efe3` paper with `#17140f` ink. White would say "product"; cream says
  "printed for you". The single accent (`#96432c`, an iron-oxide rust) appears only where something
  is claimed — a figure, a kicker, a link on hover.
- **Two serifs and a mono, doing different jobs.** Fraunces (variable, soft optical axis) sets the
  display lines — it has a little ink in it without becoming a costume. Newsreader italic carries the
  fourth statement line and the coda, because the sentence that undercuts the claim should be set in
  a different voice. JetBrains Mono is metadata only: labels, dates, figures, the footer.
- **Music as a structural motif, never as naming.** Five hairline staff lines with sparse notes run
  behind the cover statement, return as a small static phrase at the foot of every page (the "fin"),
  and define the rhythm of section numbers. The nav is still plain — Work, Shelf, About — because a
  pun in the navigation costs a recruiter three seconds and buys nothing.

## 2. What the structure earns

The reveal ladder that shaped the IA (documented in `docs/ia-research.md`) is: L0 one page → L1
statement + work → **L2 now/uses** → L3 about + taste list → L4 dated notes → L5 ongoing practice.

This site sits at L3 with a door open to L4:

| Page | Level | Why it exists |
| --- | --- | --- |
| `/` | L1–L2 | The claim, the texture, four doors. Facts a skimmer needs in one screen. |
| `/work/` | L1 | A ledger of records, each with its number. Scannable in 20 seconds. |
| `/work/<slug>/` | L3 | Situation → what I did → what it moved → **what stayed hard**. |
| `/shelf/` | L3 | Three things that are not data work and are not separate from it. |
| `/about/` | L3 | The four sentences unpacked, plus history and contact. |

The one thing every record carries is a **"what stayed hard"** section. A portfolio that only ships
wins reads like a résumé; the failure note is what makes the wins credible, and it is the cheapest
seniority signal a young profile can send.

## 3. The texture

One canvas, no library:

- Five staff lines at `rgba(23,20,15,.065)`, a 17px grid.
- A dot at every 11th column on a line (`r ≈ 2.9`, alpha `.46`) — sparse on purpose. The first
  attempt drew the rules as dotted lines and read as notebook paper; the notes are the whole effect.
- Dots brighten within 200px of the pointer, capped, and never animate faster than the cursor moves.
- `prefers-reduced-motion` → draw one frame and stop. Tab hidden → pause. DPR capped at 2.

Cost: one `requestAnimationFrame` loop with ~1.4k points on a 1440px canvas. No Three.js, no GSAP,
no scroll-jacking.

## 4. What was rejected, and why

- **The Astryx design system as the site's skin.** It ships five themes that share one type scale,
  and all but *gothic* are light-only, so "choose a theme" produced four near-identical pages. It
  stays installed for the `/design` lab page, which is `noindex` and not linked.
- **A gothic / dark identity.** Closest to the "AI-native engineer" genre, but it made the data work
  look like a side quest and put the site in the same near-black as every other engineer's.
- **Scroll animations, parallax, a custom cursor.** A recruiter reads this in ninety seconds, often
  on a phone, sometimes on a locked-down browser. Motion is hovers and fades.
- **A contact form.** Email is the entry point; a form is a third party and a failure mode.
- **Photos.** Typography and diagrams only, as requested.

## 5. Accessibility and performance choices

- The rust accent on paper measures ≈ 6.4:1 — it is safe for a figure or a label, and it is never
  used for small mono text on a tinted panel.
- Focus rings are visible on every interactive element, drawn with `outline-offset`, never removed.
- The header nav marks the current page with `aria-current="page"` and an underline.
- A skip link to `#main` on every page.
- Fonts are self-hosted (`@fontsource-variable`), split by unicode-range, `font-display: swap`.
- No client-side framework on the public pages: the only JavaScript is the canvas.

## 6. Still unresolved

- **Dates.** The two newest résumés disagree about when Effexoft and TekLink started. One
  `TODO(verify)` in `src/data/profile.ts`; two pages read from it.
- **The shelf is thin.** Singing and folklore describe a practice, not a repertoire. Three or four
  real names — a song she actually sings, a book actually on the shelf — would turn the section from
  plausible into lived-in.
- **"Fiddler" is a pun.** It plays off the music motif. If the fiddle is real, the shelf should say so.
- **No notes section yet.** L4 — a dated log of what she is learning — is the natural next page, and
  the one that proves the transition instead of asserting it.
