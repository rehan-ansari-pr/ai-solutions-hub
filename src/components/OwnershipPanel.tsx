import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface Column {
  title: string;
  intro?: string;
  items: string[];
  icon?: LucideIcon;
}

/** Two-column panel from "We create the content. You stay in control": dark left, white right. */
export const OwnershipPanel: React.FC<{ left: Column; right: Column }> = ({ left, right }) => {
  const LeftIcon = left.icon ?? Check;
  const RightIcon = right.icon ?? Check;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-card bg-ink p-6">
        <div className="font-display font-semibold text-lime text-[17px]">{left.title}</div>
        {left.intro && <p className="mt-2 text-[13px] text-mist leading-relaxed">{left.intro}</p>}
        <ul className="mt-4 space-y-3">
          {left.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[13px] text-white/90 leading-snug">
              <span className="badge w-6 h-6 mt-[-2px]"><LeftIcon className="w-3.5 h-3.5" strokeWidth={2} /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-6">
        <div className="font-display font-semibold text-fg text-[17px]">{right.title}</div>
        {right.intro && <p className="mt-2 text-[13px] text-slate leading-relaxed">{right.intro}</p>}
        {right.items.length > 0 && <ul className="mt-4 space-y-3">
          {right.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[13px] text-fg leading-snug">
              <span className="badge-ink w-6 h-6 mt-[-2px]"><RightIcon className="w-3.5 h-3.5" strokeWidth={2} /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
};
