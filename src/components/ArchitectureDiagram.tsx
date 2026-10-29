import React from 'react';
import { ArchitectureNode } from '../types';

const Arrow: React.FC = () => (
  <svg aria-hidden className="shrink-0 w-5 h-3 text-mist" viewBox="0 0 20 12" fill="none">
    <path d="M0 6h17" stroke="currentColor" strokeWidth="1.25" />
    <path d="M13 2l5 4-5 4" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

/**
 * Flow diagram from the Havas "End-to-end architecture" slide.
 * Top: compact flow strip (grey input, dark processing, lime output, arrow connectors).
 * Below: one box per stage with description and tech.
 */
export const ArchitectureDiagram: React.FC<{ nodes: ArchitectureNode[] }> = ({ nodes }) => {
  const last = nodes.length - 1;
  const tone = (i: number) =>
    i === 0 ? 'bg-line-soft text-fg border-line' : i === last ? 'bg-lime text-ink border-lime' : 'bg-ink text-white border-ink';

  return (
    <div>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <span className={`shrink-0 whitespace-nowrap rounded-btn border px-2.5 py-1.5 text-[11px] font-semibold ${tone(i)}`}>
              {node.name}
            </span>
            {i < last && <Arrow />}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((node, i) => (
          <div key={i} className="card p-4 flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`num w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] border ${tone(i)}`}>
                {i + 1}
              </span>
              <span className="kicker truncate">{node.step}</span>
            </div>
            <div className="mt-2.5 font-display font-semibold text-[14px] leading-snug text-fg">{node.name}</div>
            <p className="mt-1.5 text-[12.5px] text-slate leading-relaxed">{node.description}</p>
            <div className="mt-auto pt-3 font-mono text-[11px] text-lime-deep">{node.tech}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
