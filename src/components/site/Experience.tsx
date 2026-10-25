import { experience } from '@/data/profile';
import { SectionHead } from './SectionHead';

/**
 * The résumé, but with the first bullet of each role kept visible and the
 * rest folded. Recruiters scan periods in the rail and proof badges inline.
 */
export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-20 border-t u-hairline py-14 md:py-20">
      <SectionHead
        index="02 — Experience"
        title="Where the numbers came from"
        note="Most recent first. Salary and notice period on request."
      />

      <div className="mt-2">
        {experience.map((role) => (
          <article
            key={`${role.org}-${role.period}`}
            className="grid gap-x-8 gap-y-3 border-b u-hairline py-8 md:grid-cols-[9rem_1fr]"
          >
            <div className="rail md:pt-1">
              <p className="m-0 font-[family-name:var(--font-family-code)] text-[0.75rem] leading-snug u-ink">
                {role.period}
              </p>
              <p className="m-0 mt-1 text-[0.6875rem] leading-snug u-muted">{role.place}</p>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="m-0 text-[1.0625rem] font-semibold leading-snug u-ink">
                  {role.role}
                </h3>
                <p className="m-0 text-[0.9375rem] u-muted">{role.org}</p>
                {role.proof && <span className="chip chip-metric">{role.proof}</span>}
              </div>

              <ul className="prose-body mt-3 max-w-[70ch] list-none space-y-2 p-0 text-[0.875rem] leading-relaxed">
                {role.points.map((point, index) => (
                  <li
                    key={point}
                    className={
                      index === 0
                        ? 'relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-[var(--color-border-emphasized)] before:content-[""]'
                        : 'relative hidden pl-4 before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-[var(--color-border)] before:content-[""] sm:block'
                    }
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
