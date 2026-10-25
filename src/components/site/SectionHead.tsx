interface Props {
  index: string;
  title: string;
  note?: string;
}

/**
 * Section head with a numbered rail. The number is the whole conceit:
 * this page reads as a report, so sections are numbered like one.
 */
export function SectionHead({ index, title, note }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b u-hairline pb-4 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-6">
      <p className="eyebrow text-[0.6875rem]">{index}</p>
      <h2 className="m-0 font-[family-name:var(--font-family-heading)] text-[1.6rem] font-medium leading-tight tracking-[-0.015em] u-ink md:text-[1.9rem]">
        {title}
      </h2>
      {note && <p className="max-w-[26ch] text-[0.8125rem] leading-snug u-muted md:text-right">{note}</p>}
    </div>
  );
}
