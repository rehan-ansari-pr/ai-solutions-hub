import React, { useState } from 'react';
import { AISolution } from '../types';
import { PILLARS } from '../data/pillars';
import { X, Layers, CheckCircle2, AlertCircle, Copy, Check, Lock, Unlock, FolderGit2, Cpu } from 'lucide-react';

interface SolutionModalProps {
  solution: AISolution | null;
  internalMode: boolean;
  onClose: () => void;
  onUnlockInternalMode: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
  solution,
  internalMode,
  onClose,
  onUnlockInternalMode
}) => {
  const [copied, setCopied] = useState(false);

  if (!solution) return null;

  const pillar = PILLARS[solution.pillar] || PILLARS.intelligence;

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(JSON.stringify(solution, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white border border-havas-border rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Red Accent Bar */}
        <div className="h-1.5 w-full bg-havas-red shrink-0" />

        {/* Modal Top Bar - Havas Presentation Header */}
        <div className="p-6 sm:p-7 border-b border-havas-border flex items-start justify-between shrink-0 bg-white">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="havas-tag text-havas-red">
                {pillar.sectionTag}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {solution.maturity}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                {solution.clientContext.industry}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-havas-black tracking-tight leading-tight">
              {solution.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 font-normal leading-relaxed">
              {solution.tagline}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-4">
            <button
              onClick={handleCopyDetails}
              className="p-2 rounded-md border border-havas-border text-slate-500 hover:text-havas-black hover:bg-slate-50 transition-colors"
              title="Copy solution JSON"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md border border-havas-border text-slate-500 hover:text-havas-black hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-[#F8F9FA]">
          
          {/* Client Transparency Banner */}
          <div className="p-4 rounded-lg bg-white border border-havas-border flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md bg-slate-100">
                {internalMode ? <Unlock className="w-4 h-4 text-purple-600" /> : <Lock className="w-4 h-4 text-slate-500" />}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  {internalMode ? 'Internal Enterprise Client Context' : 'Client-Safe Context'}
                </div>
                <div className="text-sm font-bold text-havas-black">
                  {internalMode ? solution.clientContext.internalName : solution.clientContext.publicName}
                </div>
              </div>
            </div>

            {!internalMode && (
              <button
                onClick={onUnlockInternalMode}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors flex items-center space-x-1"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Internal Details</span>
              </button>
            )}
          </div>

          {/* Underlying Concept Thesis */}
          <div className="p-5 rounded-lg bg-white border border-havas-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-havas-red mb-2">
              The Underlying Architectural Concept
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {solution.coreConcept || solution.tagline}
            </p>
          </div>

          {/* Unlocked Use Cases (Slide 10 Style) */}
          {solution.useCases && solution.useCases.length > 0 && (
            <div className="p-6 rounded-lg bg-white border border-havas-border shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-havas-black mb-4 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-havas-red" />
                <span>Core Business Use Cases &amp; Workflows Unlocked</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.useCases.map((useCase, idx) => (
                  <div key={idx} className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80">
                    <div className="text-xs text-slate-700 leading-relaxed">
                      {useCase}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-white border border-red-200 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>The Challenge / Operational Bottleneck</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {solution.problem}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white border border-emerald-200 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>The Engineered System Solution</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {solution.solution}
              </p>
            </div>
          </div>

          {/* End-to-End System Architecture (Slide 4 Style) */}
          <div className="p-6 rounded-lg bg-white border border-havas-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-havas-black mb-2 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-havas-red" />
              <span>Technical Design &amp; Architecture ({solution.architecture.nodes.length} Stages)</span>
            </div>
            <p className="text-xs text-slate-500 mb-5 italic">
              {solution.architecture.summary}
            </p>

            <div className="space-y-3">
              {solution.architecture.nodes.map((node, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-md bg-[#F9FAFB] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 shrink-0">
                      {node.step}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-havas-black">
                        {node.name}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {node.description}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <span className="text-[11px] font-mono px-2 py-1 rounded bg-white text-slate-700 border border-slate-200 inline-block">
                      {node.tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="p-5 rounded-lg bg-white border border-havas-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-slate-600" />
              <span>Technology &amp; Platform Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {solution.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Internal Deep Dive (Unlocked in Internal Mode) */}
          {internalMode && solution.internalDeepDive && (
            <div className="p-6 rounded-lg bg-purple-50 border border-purple-200 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-900">
                <FolderGit2 className="w-4 h-4 text-purple-700" />
                <span>Internal Codebase &amp; Architecture Topology</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {solution.internalDeepDive.repoPath && (
                  <div className="p-3 rounded bg-white border border-purple-200">
                    <div className="text-purple-600 text-[10px] uppercase font-bold">Local Directory</div>
                    <div className="text-slate-800 font-semibold truncate mt-0.5">{solution.internalDeepDive.repoPath}</div>
                  </div>
                )}
                {solution.internalDeepDive.architectureType && (
                  <div className="p-3 rounded bg-white border border-purple-200">
                    <div className="text-purple-600 text-[10px] uppercase font-bold">Topology</div>
                    <div className="text-slate-800 font-semibold truncate mt-0.5">{solution.internalDeepDive.architectureType}</div>
                  </div>
                )}
              </div>

              {solution.internalDeepDive.keyAgents && solution.internalDeepDive.keyAgents.length > 0 && (
                <div>
                  <div className="text-purple-900 text-xs font-medium mb-1.5">Active Agent Classes &amp; Microservices:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {solution.internalDeepDive.keyAgents.map((agent, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-purple-800 border border-purple-200 font-mono text-[11px]">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {solution.internalDeepDive.compliance && (
                <div className="text-xs text-purple-800 pt-1">
                  <span className="font-bold">Compliance Notes:</span> {solution.internalDeepDive.compliance}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 px-6 bg-white border-t border-havas-border flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400 font-mono">
            System ID: <span className="text-slate-600">{solution.id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-havas-black hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
