import { profile } from '@/data/profile';

export function Footer() {
  const base = import.meta.env.BASE_URL;

  return (
    <footer id="contact" className="mt-6 scroll-mt-20 border-t u-hairline">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">05 — Contact</p>
            <h2 className="mt-4 font-[family-name:var(--font-family-heading)] text-[2.2rem] font-medium leading-[1.05] tracking-[-0.02em] u-ink md:text-[2.75rem]">
              Let’s talk.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed u-muted">
              If you have a messy dataset and a deadline, that is the kind of problem I like. I
              answer email within a day.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-6 inline-block font-[family-name:var(--font-family-heading)] text-[1.25rem] text-[var(--color-text-primary)] md:text-[1.5rem]"
            >
              {profile.email}
            </a>
          </div>

          <ul className="m-0 flex list-none flex-col gap-2 p-0 md:items-end">
            {[
              { label: 'GitHub', href: profile.github },
              { label: 'LinkedIn', href: profile.linkedin },
              { label: 'Résumé (PDF)', href: `${base}resume.pdf` },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="eyebrow flex items-center gap-1.5 text-[0.6875rem] no-underline transition-colors hover:u-accent"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t u-hairline pt-5 text-[0.6875rem] leading-relaxed u-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            © {new Date().getFullYear()} {profile.name}. Typeset in Newsreader, Inter, and JetBrains
            Mono.
          </p>
          <p className="m-0">
            Static Astro build · Astryx design system · ⌘K palette built on shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
