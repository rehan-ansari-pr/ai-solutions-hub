import React from 'react';
import { AISolution } from '../types';
import { PILLARS } from '../data/pillars';
import { ArrowRight, Layers, ShieldCheck, Unlock, CheckCircle2 } from 'lucide-react';

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

  return (
    <div
      onClick={() => onSelect(solution)}
      className="havas-card flex flex-col justify-between p-6 sm:p-7 rounded-lg cursor-pointer group bg-white"
    >
      <div>
        {/* Top Header Row - Havas Style Track & Status */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-havas-border">
          <span className="havas-tag text-havas-red">
            {pillar.sectionTag}
          </span>

          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
            solution.maturity === 'Production'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : solution.maturity === 'Client MVP'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-purple-50 text-purple-700 border border-purple-200'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
            {solution.maturity}
          </span>
        </div>

        {/* Client & Industry Subhead */}
        <div className="text-xs text-slate-500 font-medium mb-1.5 flex items-center space-x-1">
          {internalMode ? (
            <span className="text-purple-700 font-semibold flex items-center space-x-1">
              <Unlock className="w-3 h-3 text-purple-600 inline mr-1" />
              <span>{solution.clientContext.internalName}</span>
            </span>
          ) : (
            <span className="text-slate-500 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-slate-400 inline mr-1" />
              <span>{solution.clientContext.publicName}</span>
            </span>
          )}
        </div>

        {/* Solution Title */}
        <h3 className="text-xl font-display font-extrabold text-havas-black group-hover:text-havas-red transition-colors tracking-tight leading-snug mb-3">
          {solution.title}
        </h3>

        {/* Core Underlying Concept (Havas Presentation Thesis) */}
        <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            The Underlying Concept
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {solution.coreConcept || solution.tagline}
          </p>
        </div>

        {/* Unlocked Use Cases Showcase - Direct Focus on Capabilities */}
        {solution.useCases && solution.useCases.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Primary Use Cases &amp; Workflows
            </div>
            <ul className="space-y-1.5">
              {solution.useCases.slice(0, 3).map((useCase, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                  <span className="text-havas-red font-bold text-xs mt-0.5">&bull;</span>
                  <span className="line-clamp-2">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Architectural Flow Loop Teaser */}
        <div className="mb-4 pt-3 border-t border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Architecture Loop ({solution.architecture.nodes.length} Stages)</span>
          </div>
          <div className="flex items-center space-x-1 overflow-hidden">
            {solution.architecture.nodes.slice(0, 4).map((node, i) => (
              <React.Fragment key={i}>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                  {node.name.split(' ')[0]}
                </span>
                {i < 3 && i < solution.architecture.nodes.length - 1 && (
                  <span className="text-slate-400 text-xs">&rarr;</span>
                )}
              </React.Fragment>
            ))}
            {solution.architecture.nodes.length > 4 && (
              <span className="text-[10px] text-slate-400 font-mono">+{solution.architecture.nodes.length - 4}</span>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Footer - Tech Stack & Detail Action */}
      <div className="pt-4 border-t border-havas-border flex items-center justify-between">
        <div className="flex flex-wrap gap-1 max-w-[70%]">
          {solution.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
            >
              {tech}
            </span>
          ))}
          {solution.techStack.length > 3 && (
            <span className="text-[10px] font-mono text-slate-400 px-1 py-0.5">
              +{solution.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center text-xs font-bold text-havas-red group-hover:translate-x-1 transition-transform">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </div>
  );
};
