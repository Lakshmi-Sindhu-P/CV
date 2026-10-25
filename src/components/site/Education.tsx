import { education, certifications } from '@/data/profile';
import { SectionHead } from './SectionHead';

export function Education() {
  return (
    <section id="education" className="shell scroll-mt-20 border-t u-hairline py-14 md:py-20">
      <SectionHead
        index="04 — Education"
        title="Two degrees, one of them recent"
        note="Coursework available on request; the thesis and capstones are in the work section."
      />

      <div className="mt-2">
        {education.map((entry) => (
          <article
            key={entry.school}
            className="grid gap-x-8 gap-y-2 border-b u-hairline py-7 md:grid-cols-[7rem_1fr]"
          >
            <p className="rail m-0 font-[family-name:var(--font-family-code)] text-[0.75rem] u-ink">
              {entry.period}
            </p>
            <div>
              <h3 className="m-0 text-[1rem] font-semibold u-ink">{entry.degree}</h3>
              <p className="m-0 mt-0.5 text-[0.9375rem] u-muted">{entry.school}</p>
              <p className="m-0 mt-1 text-[0.75rem] u-muted">{entry.note}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="eyebrow m-0 text-[0.6875rem]">Certifications</p>
        <p className="m-0 text-[0.8125rem] u-muted">{certifications.join(' · ')}</p>
      </div>
    </section>
  );
}
