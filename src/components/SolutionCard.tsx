import React from 'react';
import { AISolution } from '../types';
import { ArrowRight, Lock } from 'lucide-react';
import { PILLAR_ICONS } from './ui';

interface SolutionCardProps {
  solution: AISolution;
  internalMode: boolean;
  onSelect: (solution: AISolution) => void;
  dark?: boolean;
}

export const StatusChip: React.FC<{ maturity: AISolution['maturity']; onDark?: boolean }> = ({ maturity, onDark }) =>
  maturity === 'Production' ? (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${onDark ? 'text-white' : 'text-fg'}`}>
      <span className="live-dot" /> Production
    </span>
  ) : (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-btn text-[10px] font-semibold uppercase tracking-[0.14em] border ${
        onDark ? 'border-white/25 text-mist' : 'border-line text-slate'
      }`}
    >
      {maturity}
    </span>
  );

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, internalMode, onSelect, dark }) => {
  const Icon = PILLAR_ICONS[solution.pillar] || PILLAR_ICONS.intelligence;
  const stages = solution.architecture.nodes.length;

  return (
    <button
      type="button"
      onClick={() => onSelect(solution)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
      className={`spotlight relative overflow-hidden group text-left w-full h-full flex flex-col p-6 rounded-card border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(30,43,48,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
        dark ? 'bg-ink border-ink hover:border-lime' : 'bg-card border-line hover:border-fg'
      }`}
    >
      <span aria-hidden className="absolute left-0 top-0 h-1 w-full bg-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="flex items-center justify-between">
        <span className="badge w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]">
          <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
        </span>
        <StatusChip maturity={solution.maturity} onDark={dark} />
      </div>

      <div className={`mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] flex items-center gap-1.5 ${dark ? 'text-lime' : 'text-lime-deep'}`}>
        {internalMode ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-btn bg-havas-red text-white normal-case tracking-normal text-[11px]">
            <Lock className="w-3 h-3" />
            {solution.clientContext.internalName}
          </span>
        ) : (
          <span className="line-clamp-1">{solution.clientContext.industry}</span>
        )}
      </div>

      <h3 className={`mt-2 text-[19px] font-semibold leading-snug ${dark ? '!text-white' : ''}`}>{solution.title}</h3>
      <p className={`mt-2 text-[14px] leading-relaxed line-clamp-3 ${dark ? 'text-mist' : 'text-slate'}`}>
        {solution.coreConcept || solution.tagline}
      </p>

      <div className={`mt-5 grid grid-cols-3 gap-2 pt-4 border-t ${dark ? 'border-white/10' : 'border-line-soft'}`}>
        {[
          [stages, 'Stages'],
          [solution.useCases?.length ?? 0, 'Use Cases'],
          [solution.techStack.length, 'Tech'],
        ].map(([n, label]) => (
          <div key={label}>
            <div className={`num text-[24px] leading-none ${dark ? 'text-white' : 'text-fg'}`}>{n}</div>
            <div className={`mt-1 text-[11px] ${dark ? 'text-mist' : 'text-slate'}`}>{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-5 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {solution.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className={dark ? 'chip !bg-white/10 !text-mist' : 'chip'}>
              {tech}
            </span>
          ))}
          {solution.techStack.length > 3 && (
            <span className={`text-[11px] px-1 py-0.5 ${dark ? 'text-mist' : 'text-slate'}`}>+{solution.techStack.length - 3}</span>
          )}
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center transition-transform group-hover:translate-x-1 ${
            dark ? 'bg-lime text-ink' : 'bg-ink text-lime'
          }`}
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  );
};
