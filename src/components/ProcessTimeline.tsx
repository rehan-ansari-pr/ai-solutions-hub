import React from 'react';

export interface TimelineItem {
  title: string;
  body?: string;
}

/** Horizontal line with round lime nodes and cards beneath, from "The right message at each step". */
export const ProcessTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  const last = items.length - 1;
  return (
    <ol className="relative grid gap-3 sm:gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))` }}>
      <div aria-hidden className="hidden sm:block absolute left-6 right-6 top-6 h-0.5 bg-line">
        <div className="h-full bg-lime animate-grow-x" />
      </div>
      {items.map((item, i) => (
        <li key={i} className="relative flex sm:flex-col gap-3 sm:gap-0">
          <span
            className={`relative z-10 num w-12 h-12 shrink-0 rounded-full inline-flex items-center justify-center text-[15px] ${
              i === last ? 'bg-ink text-lime' : 'bg-lime text-ink'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="sm:mt-4 card p-4 flex-1">
            <div className="font-display font-semibold text-[14px] leading-snug text-fg">{item.title}</div>
            {item.body && <p className="mt-1.5 text-[13px] text-slate leading-relaxed">{item.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
};
