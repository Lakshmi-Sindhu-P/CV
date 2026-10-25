import { profile, navSections } from '@/data/profile';
import { Button } from '@astryxdesign/core/Button';

/**
 * Sticky masthead. Deliberately thin: a recruiter should always be one click
 * from the résumé, and one keystroke from any section.
 */
export function Header() {
  const base = import.meta.env.BASE_URL;

  return (
    <header
      data-site-header
      className="no-print header-sticky sticky top-0 z-40 border-b u-hairline"
    >
      <div className="shell flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <a href={base} className="flex items-center gap-3 no-underline" aria-label="Home">
            <span className="monogram u-ink" aria-hidden="true">
              LS
            </span>
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate text-[0.8125rem] font-medium u-ink">{profile.name}</span>
              <span className="eyebrow text-[0.625rem]">{profile.role}</span>
            </span>
          </a>
        </div>

        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`${base}#${section.id}`}
              className="eyebrow text-[0.6875rem] no-underline transition-colors hover:u-accent"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            id="palette-trigger"
            type="button"
            className="flex size-8 items-center justify-center gap-2 rounded-md border u-hairline text-[0.6875rem] u-muted transition-colors hover:u-ink sm:size-auto sm:px-2.5 sm:py-1.5"
            aria-label="Jump to a section"
          >
            <svg
              className="sm:hidden"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h11M4 17h7" strokeLinecap="round" />
            </svg>
            <span className="hidden font-[family-name:var(--font-family-body)] sm:inline">Jump to</span>
            <span className="kbd hidden sm:inline">⌘K</span>
          </button>

          <button
            id="theme-toggle"
            type="button"
            className="grid size-8 place-items-center rounded-md border u-hairline u-muted transition-colors hover:u-ink"
            aria-label="Toggle colour scheme"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" strokeLinecap="round" />
            </svg>
          </button>

          <Button
            href={`${base}resume.pdf`}
            label="Résumé"
            variant="primary"
            size="sm"
            target="_blank"
            rel="noopener"
          />
        </div>
      </div>
    </header>
  );
}
