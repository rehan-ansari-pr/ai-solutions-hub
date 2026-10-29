import React from 'react';
import { Search, X } from 'lucide-react';
import { AISolution, PillarType } from '../types';
import { PILLARS } from '../data/pillars';
import { PILLAR_ICONS, PILLAR_ORDER } from './ui';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPillar: PillarType | 'all';
  onSelectPillar: (pillar: PillarType | 'all') => void;
  solutions: AISolution[];
  internalMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedPillar,
  onSelectPillar,
  solutions,
  internalMode,
}) => {
  const liveCount = solutions.filter(s => s.maturity === 'Production').length;
  const showcase = solutions.filter(s => s.featured).slice(0, 3);

  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Lime panel, right 38% on desktop, as on the PivotRoots cover slide */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
      <div className="absolute -left-40 -bottom-40 w-[520px] h-[520px] rounded-full border border-lime/15" aria-hidden />
      <div className="absolute -left-24 -bottom-24 w-[360px] h-[360px] rounded-full border border-lime/10" aria-hidden />
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[38%] bg-lime animate-panel overflow-hidden" aria-hidden>
        <div className="absolute inset-0 dot-grid-ink opacity-40" />
        <div className="absolute -right-24 top-10 w-[420px] h-[420px] rounded-full border-[40px] border-ink/[0.06] animate-spin-slow" />
        <div className="absolute right-10 bottom-10 num text-[200px] leading-none text-ink/[0.07] select-none">AI</div>
      </div>

      <div className="page relative grid lg:grid-cols-[62fr_38fr] gap-10 py-14 sm:py-20 lg:py-24">
        <div className="lg:pr-10">
          <div className="kicker !text-lime">CSA &bull; Portfolio of AI Capabilities &amp; Architectures</div>
          <h1 className="mt-4 text-[36px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.05] tracking-[-0.01em] !text-white">
            Enterprise AI Solutions, Operating Concepts &amp; Use Cases
          </h1>
          <p className="mt-5 max-w-xl text-mist">
            A comprehensive repository of production platforms, working POCs, and system architectures built to solve
            core marketing, measurement, and creative bottlenecks at enterprise scale.
          </p>

          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-mist" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by solution, concept, use case, tech stack (BigQuery, Meridian, Vertex), or client industry..."
              className="w-full pl-10 pr-16 py-3 rounded-btn bg-white/5 border border-white/15 text-white placeholder-mist text-sm focus:outline-none focus:border-lime focus:bg-white/10 transition-colors"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery ? (
                <button onClick={() => onSearchChange('')} className="p-1 text-mist hover:text-white" aria-label="Clear search">
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-mono text-mist border border-white/15">⌘K</span>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => onSelectPillar('all')}
              className={`btn !py-1.5 !text-[12px] border ${selectedPillar === 'all' ? 'bg-lime text-ink border-lime' : 'border-lime/70 text-lime hover:bg-lime hover:text-ink'}`}
            >
              All Pillars ({solutions.length})
            </button>
            {PILLAR_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => onSelectPillar(key)}
                className={`btn !py-1.5 !text-[12px] border ${selectedPillar === key ? 'bg-lime text-ink border-lime' : 'border-lime/70 text-lime hover:bg-lime hover:text-ink'}`}
              >
                {PILLARS[key].shortTitle}
              </button>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-3 max-w-md border-t border-white/10 pt-6">
            {[
              [solutions.length, 'Solutions'],
              [liveCount, 'Production'],
              [5, 'Pillars'],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="num text-[32px] sm:text-[40px] text-white leading-none">{n}</dt>
                <dd className="mt-1.5 text-[12px] text-mist">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Card stack straddling the ink/lime seam */}
        <div className="hidden lg:flex items-center relative">
          <div className="relative w-full max-w-[360px] -ml-6 h-[400px]">
            {showcase.map((s, i) => {
              const Icon = PILLAR_ICONS[s.pillar];
              return (
                <div
                  key={s.id}
                  className="absolute left-0 right-0 bg-white rounded-card border border-ink/10 p-5 shadow-[0_18px_40px_-20px_rgba(30,43,48,0.45)] animate-float transition-transform duration-300 hover:!translate-x-0 hover:z-20"
                  style={{ top: i * 120, transform: `translateX(${i * 28}px)`, zIndex: 10 - i, animationDelay: `${i * -2}s` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="badge w-9 h-9"><Icon className="w-4 h-4" strokeWidth={1.75} /></span>
                    {s.maturity === 'Production' && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1E2B30]">
                        <span className="live-dot" /> Production
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F6E05]">
                    {internalMode ? s.clientContext.internalName : s.clientContext.industry}
                  </div>
                  <div className="mt-1 font-display font-semibold text-[#1E2B30] leading-snug line-clamp-1">{s.title}</div>
                  <div className="mt-1 text-[12px] text-[#5E6A6E] line-clamp-2">{s.tagline}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
