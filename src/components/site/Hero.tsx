import { profile, positioning, headlineMetrics } from '@/data/profile';
import { Button } from '@astryxdesign/core/Button';

export function Hero() {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="relative overflow-hidden border-b u-hairline">
      <div className="paper-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative pb-2 pt-12 md:pt-16">
        {/* Report header rule — the page announces itself as a document */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b u-hairline pb-3">
          <p className="eyebrow">Portfolio · 2026 edition</p>
          <p className="eyebrow">{profile.location} · open to remote</p>
        </div>

        <h1 className="hero-title mt-12 max-w-[18ch]">{profile.name}</h1>

        <p className="lede mt-12 max-w-[54ch]">
          Data analyst and data scientist. I turn operational mess — a stock ledger, a clinic
          transcript, a protein network — into pipelines and models that survive contact with the
          people who use them.
        </p>

        <p className="prose-body mt-6 max-w-[64ch] text-[0.9375rem]">{positioning}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button href="#work" label="See the work" variant="primary" size="md" />
          <Button
            href={`mailto:${profile.email}`}
            label="Email me"
            variant="secondary"
            size="md"
            className="btn-quiet"
          />
          <a
            href={`${base}resume.pdf`}
            target="_blank"
            rel="noopener"
            className="link-underline eyebrow ml-1 text-[0.6875rem] text-[var(--color-text-primary)]"
          >
            Résumé (PDF) ↗
          </a>
        </div>

        <p className="mt-6 flex items-start gap-2 text-[0.8125rem] leading-snug u-muted">
          <span className="relative mt-[0.45em] grid size-2 shrink-0 place-items-center" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-[var(--color-success)] opacity-30" />
            <span className="size-1 rounded-full bg-[var(--color-success)]" />
          </span>
          {profile.availability}
        </p>

        {/* The four numbers. Everything below is evidence for these. */}
        <dl className="mt-12 grid grid-cols-2 border-t u-hairline md:grid-cols-4">
          {headlineMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={[
                'flex flex-col gap-1 border-b u-hairline px-0 py-5 md:border-b-0',
                index > 0 ? 'md:border-l md:pl-6' : '',
                index % 2 === 1 ? 'border-l pl-4 md:pl-6' : '',
                index < 2 ? '' : 'md:pt-5',
              ].join(' ')}
            >
              <dt className="metric u-ink">{metric.value}</dt>
              <dd className="metric-label">{metric.label}</dd>
              <dd className="mt-1 text-[0.6875rem] u-muted">{metric.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
