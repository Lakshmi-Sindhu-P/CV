import { projects, smallerProjects } from '@/data/profile';
import { SectionHead } from './SectionHead';

/**
 * Four projects, each written as a report entry: context in the rail,
 * outcome up front, method folded away for the reader who wants it.
 */
export function SelectedWork() {
  return (
    <section id="work" className="shell scroll-mt-20 py-14 md:py-20">
      <SectionHead
        index="01 — Selected work"
        title="Four projects, each with a number attached"
        note="Every figure here is from a shipped analysis or a measurement taken at the time."
      />

      <div className="mt-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="grid gap-x-8 gap-y-4 border-b u-hairline py-9 md:grid-cols-[7rem_1fr]"
          >
            <div className="rail flex items-baseline gap-2 md:flex-col md:items-start md:gap-1.5">
              <span className="eyebrow text-[0.6875rem]">{project.index}</span>
              <span className="eyebrow text-[0.6875rem]">{project.year}</span>
              <span className="mt-0.5 text-[0.6875rem] leading-snug u-muted md:mt-1.5">
                {project.context}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="m-0 max-w-[34ch] font-[family-name:var(--font-family-heading)] text-[1.35rem] font-medium leading-snug tracking-[-0.01em] u-ink md:text-[1.55rem]">
                {project.title}
              </h3>

              <p className="prose-body mt-3 max-w-[62ch] text-[0.9375rem]">{project.outcome}</p>

              <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
                {project.metrics.map((metric) => (
                  <li key={metric}>
                    <span className="chip chip-metric">{metric}</span>
                  </li>
                ))}
              </ul>

              <details className="group mt-5">
                <summary className="flex w-fit items-center gap-1.5 eyebrow text-[0.6875rem] transition-colors hover:u-accent">
                  <svg
                    className="disclosure-chevron transition-transform duration-200"
                    width="9"
                    height="9"
                    viewBox="0 0 8 8"
                    aria-hidden="true"
                  >
                    <path d="M2 1l4 3-4 3z" fill="currentColor" />
                  </svg>
                  Method &amp; stack
                </summary>
                <div className="mt-3 max-w-[62ch]">
                  <p className="prose-body m-0 text-[0.875rem] leading-relaxed">{project.method}</p>
                  <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <span className="chip">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <p className="eyebrow">Also shipped</p>
        <ul className="mt-4 grid list-none gap-x-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {smallerProjects.map((item) => (
            <li key={item.title} className="flex flex-col gap-0.5 border-t u-hairline py-3">
              <span className="text-[0.875rem] leading-snug u-ink">{item.title}</span>
              <span className="text-[0.75rem] leading-snug u-muted">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
