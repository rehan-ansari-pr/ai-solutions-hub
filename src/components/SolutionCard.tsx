import React from 'react';
import { AISolution } from '../types';
import { PILLARS } from '../data/pillars';
import { ArrowUpRight, Cpu, Layers, Sparkles, ShieldCheck, CheckCircle2, Lock, Unlock } from 'lucide-react';

interface SolutionCardProps {
  solution: AISolution;
  internalMode: boolean;
  onSelect: (solution: AISolution) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  internalMode,
  onSelect
}) => {
  const pillar = PILLARS[solution.pillar] || PILLARS.intelligence;
  const primaryMetric = solution.metrics[0];

  return (
    <div
      onClick={() => onSelect(solution)}
      className="group relative flex flex-col justify-between glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer overflow-hidden bg-[#0F131D]/80 hover:bg-[#151B29]/95"
    >
      {/* Subtle top edge glow bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.accentHex}, transparent)` }}
      />

      <div>
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${pillar.badgeBg} ${pillar.badgeBorder}`}>
            {pillar.shortTitle}
          </span>

          <div className="flex items-center space-x-1.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              solution.maturity === 'Production'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : solution.maturity === 'Client MVP'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
              {solution.maturity}
            </span>
          </div>
        </div>

        {/* Client & Industry Context */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
          {internalMode ? (
            <span className="font-semibold text-purple-300 flex items-center space-x-1">
              <Unlock className="w-3 h-3 text-purple-400 inline mr-1" />
              {solution.clientContext.internalName}
            </span>
          ) : (
            <span className="text-slate-400 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-slate-500 inline mr-1" />
              {solution.clientContext.publicName}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-orange transition-colors tracking-tight leading-snug mb-2">
          {solution.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-5">
          {solution.tagline}
        </p>

        {/* Key Metric Spotlight */}
        {primaryMetric && (
          <div className="mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-baseline justify-between">
            <div className="text-[11px] font-medium text-slate-400">{primaryMetric.label}</div>
            <div className="text-base font-bold font-mono text-brand-orange">{primaryMetric.value}</div>
          </div>
        )}

        {/* Architecture Node Teaser */}
        <div className="mb-5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Architecture Flow ({solution.architecture.nodes.length} Steps)</span>
          </div>
          <div className="flex items-center space-x-1.5 overflow-hidden">
            {solution.architecture.nodes.slice(0, 3).map((node, i) => (
              <React.Fragment key={i}>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.05] whitespace-nowrap">
                  {node.step} {node.name.split(' ')[0]}
                </span>
                {i < 2 && <span className="text-slate-600 text-xs">→</span>}
              </React.Fragment>
            ))}
            {solution.architecture.nodes.length > 3 && (
              <span className="text-[10px] text-slate-500 font-mono">+{solution.architecture.nodes.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer: Tech Stack & Action Link */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex flex-wrap gap-1 max-w-[70%]">
          {solution.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.05]"
            >
              {tech}
            </span>
          ))}
          {solution.techStack.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500 px-1 py-0.5">
              +{solution.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center text-xs font-semibold text-brand-orange group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <ArrowUpRight className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
