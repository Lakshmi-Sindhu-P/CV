import { toolkit } from '@/data/profile';
import { SectionHead } from './SectionHead';

export function Toolkit() {
  return (
    <section id="toolkit" className="shell scroll-mt-20 border-t u-hairline py-14 md:py-20">
      <SectionHead
        index="03 — Toolkit"
        title="What I actually reach for"
        note="Grouped by what the tool does, not by how impressive its logo looks. Basics are marked."
      />

      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {toolkit.map((group) => (
          <div key={group.group}>
            <h3 className="eyebrow m-0 pb-2 text-[0.6875rem]">{group.group}</h3>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 border-t u-hairline p-0 pt-3">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="chip">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[64ch] border-l-2 border-[var(--color-accent)] pl-4 text-[0.875rem] leading-relaxed u-muted">
        I would rather say “basics” than overstate. If something is listed without a qualifier, I
        have shipped work with it and can talk about where it breaks.
      </p>
    </section>
  );
}
