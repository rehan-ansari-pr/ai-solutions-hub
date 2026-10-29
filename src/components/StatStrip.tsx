import React from 'react';

export interface Stat {
  value: number | string;
  label: string;
  caption?: string;
  /** 0 to 1, drawn as the thin bar along the bottom of the card. */
  ratio?: number;
  tone?: 'ink' | 'lime' | 'mist';
}

const BAR: Record<NonNullable<Stat['tone']>, string> = {
  ink: 'bg-fg',
  lime: 'bg-lime',
  mist: 'bg-mist',
};

/** Three side-by-side stat cards with a big numeral and a progress bar. */
export const StatStrip: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {stats.map((s) => (
      <div key={s.label} className="card p-5 flex flex-col">
        <div className="text-[13px] font-semibold text-fg">{s.label}</div>
        <div className="num mt-2 text-[36px] leading-none text-fg">{s.value}</div>
        {s.caption && <div className="mt-2 text-[13px] text-slate leading-snug">{s.caption}</div>}
        <div className="mt-auto pt-5">
          <div className="h-1.5 w-full rounded-full bg-line-soft overflow-hidden">
            <div
              className={`h-full rounded-full animate-grow-x ${BAR[s.tone ?? 'ink']}`}
              style={{ width: `${Math.round((s.ratio ?? 1) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);
