# Design notes

Why the site looks the way it does, what the design system actually contributes, and which
decisions are still open.

---

## 1. The idea: a report, not a template

Most analyst portfolios are a photo, a summary, and six cards of identical weight. Recruiters skim
them; the evidence is buried in bullet points that all sound the same.

This site borrows the structure of a **short research report**:

- Sections are numbered (`01 — Selected work`), and their labels sit in a left rail like running
  heads.
- The hero ends in four **figures**, and everything below is evidence for those figures.
- Each project states its **outcome first** in one sentence, carries its numbers as metric chips,
  and hides the method behind a disclosure for the reader who wants it.
- Mono type is used only for metadata: dates, section numbers, metrics, stack names. It is the
  "data" voice; Newsreader is the "writing" voice.

The payoff: a hiring manager can scan the page in 40 seconds and still come away with four numbers,
and a technical interviewer can open any disclosure and find the method.

## 2. Design system: three layers, one source of truth

| Layer | Role | Why |
| --- | --- | --- |
| **Astryx** (`@astryxdesign/core`) | Buttons, cards, badges, headings, text, stacks + the token vocabulary | 150+ accessible components grown inside Meta; ships prebuilt CSS (no PostCSS/Babel plugin) and themes through CSS custom properties |
| **Tailwind v4** | Layout only: grid, flex, gap, max-width | Fast to iterate; no design decisions live in utilities |
| **shadcn/ui** | Copy-in primitives for the ⌘K palette (`command`, `dialog`, `button`) | Owned source, no dependency to fight; the palette is the only interactive component that needs real JS |

**The token rule.** Astryx tokens (`--color-*`, `--font-family-*`, `--radius-*`, `--text-heading-*`)
are the only palette. shadcn's variables are *aliases* of Astryx tokens in an `@theme inline` block,
never a second palette — so the two systems cannot drift apart.

**The clash rule.** Both systems publish `text-primary` / `bg-accent` style utilities with different
meanings. Rather than relying on which `@theme` block wins, colour is expressed through explicit
classes in `global.css`:

- `.u-ink`, `.u-muted`, `.u-accent`, `.u-surface`, `.u-card`, `.u-muted-bg`, `.u-hairline` — colour
  and borders.
- `.eyebrow`, `.lede`, `.hero-title`, `.prose-body`, `.metric`, `.metric-label`, `.chip`,
  `.link-underline`, `.kbd`, `.monogram` — the editorial voice.
- Layout stays in Tailwind utilities.

If you add a component, use these classes for anything that touches colour or type.

**One Astryx quirk worth knowing:** it ships a single type system (system sans) for every theme, and
its `Heading` component reads the *body* font token. `global.css` therefore maps
`[data-astryx-theme] .astryx-heading` to `--font-family-heading` so component headings adopt the
editorial serif.

## 3. Identity tokens

Defined once, on `[data-astryx-theme='report']`, so Astryx components and hand-written CSS read the
same values.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-background-body` (paper) | `#faf9f6` | `#0f1216` |
| `--color-background-surface` | `#ffffff` | `#151a1f` |
| `--color-text-primary` (ink) | `#15171b` | `#e9e6df` |
| `--color-text-secondary` | `#5b6068` | `#9ba3ac` |
| `--color-border` / `emphasized` | `#e3dfd6` / `#c7c1b4` | `#262d35` / `#39424c` |
| `--color-accent` | `#1e4b8f` | `#8fb3f0` |
| `--color-on-accent` | `#ffffff` | `#0b1017` |
| `--radius-inner` … `--radius-page` | `4 / 6 / 10 / 14px` | same |

Type: **Newsreader** (headings, display) · **Inter** (body, UI) · **JetBrains Mono** (metadata).
All three self-hosted through `@fontsource-variable` — no third-party font request at runtime.

One accent colour, used for: primary buttons, metric chips, the one pull-quote rule in the toolkit
section, and hover states. Everything else is ink on paper.

## 4. The theme comparison (and the verdict)

`/design` renders the same components in five identities. What that exercise showed:

| Identity | What changes | Verdict |
| --- | --- | --- |
| **Report** (custom) | Serif headings, paper background, 4–14px radii, ink-blue accent | **Chosen.** Only identity that does not read like a component library |
| Neutral | Default Astryx: quiet greys, generous radii | Safe, interchangeable |
| Stone | Warm greys | Close to Report without the typographic personality |
| Butter | Cream + yellow, colourful buttons | Memorable but undersells technical depth |
| Gothic | Dark-only, high contrast | Good mood, bad constraint (dark-only, prints badly) |

Switching is one attribute on `<html>`: `data-astryx-theme="neutral"`. Themes are scoped with
`@scope`, so a nested panel can wear a different theme — that is how `/design` works.

## 5. Layout options

`/design` also sketches three structures:

- **A · Numbered report** — current build. Scans fast, prints well; depends on typography quality.
- **B · Sticky portrait split** — a pinned left column with portrait, name, contact. Great for
  recruiters, but needs a real photo (there is none in the repo) and costs mobile width.
- **C · Case-file grid** — projects as tiles, figure-first. Most visual, but flattens method.

Recommendation: keep **A**; adopt **B**'s sticky name rail on desktop only after a portrait exists.

## 6. Behaviour

- **⌘K palette** — sections, projects, and links; fuzzy-matched; the only React island
  (`client:load`). The static header button talks to it through a DOM event, so no shared store.
- **Reveal on scroll** — one IntersectionObserver, 12 lines, disabled under
  `prefers-reduced-motion: reduce`.
- **Theme** — `localStorage['lsp-theme']`, applied by an inline script before first paint so there
  is no flash. Falls back to `prefers-color-scheme`.
- **Print** — the print stylesheet drops the header and palette, prints the URL after each link,
  and keeps sections from breaking across pages. The page is designed to be a usable PDF.
- **Progressive enhancement** — nothing is hidden without JS (`html.no-js .reveal` stays visible).

## 7. Accessibility

- Skip link to `#main`; landmark elements (`header`, `main`, `footer`, `nav` with `aria-label`).
- One `h1` (the name); sections use `h2`; project and role titles use `h3`.
- Metric chips are a `ul` of `li`s rather than decorative spans, so they are announced.
- Disclosures are native `<details>`/`<summary>` — keyboard and screen-reader behaviour for free.
- Colour (measured): ink `#15171b` on paper `#faf9f6` 17.0:1; secondary `#5b6068` 6.0:1; accent
  `#1e4b8f` 8.1:1; white on accent 8.5:1. Dark scheme: ink 15.1:1, secondary 7.4:1, accent 8.8:1.
  All body text clears 4.5:1 in both schemes.
- Focus states are never removed; the theme toggle and palette trigger are real `<button>`s.

## 8. Open items

1. **Dates.** Two résumés disagree on the start dates at Effexoft and TekLink. `profile.ts` uses the
   newer PDF and flags `TODO(verify)`.
2. **Portrait.** Layout B needs one. Without it the page stays text-first, which is fine but less
   memorable.
3. **Project detail pages.** Each project currently fits in one paragraph + a disclosure. Two of
   them (clinical assistant, procurement pipeline) have enough method to justify `/work/<slug>`.
4. **A writing section** would help for a data role — one short post on the network-pruning project
   is the obvious candidate.
