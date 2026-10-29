import React, { useState } from 'react';
import { AISolution } from '../types';
import { PILLARS } from '../data/pillars';
import { X, Layers, CheckCircle, Shield, Cpu, ExternalLink, ArrowRight, FolderGit2, AlertCircle, Copy, Check, Terminal, Lock, Unlock } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0B0E17] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Glow Bar */}
        <div 
          className="h-1.5 w-full shrink-0" 
          style={{ background: `linear-gradient(90deg, ${pillar.accentHex}, #FF5C00, #8B5CF6)` }} 
        />

        {/* Modal Top Bar */}
        <div className="p-6 border-b border-white/[0.08] flex items-start justify-between shrink-0 bg-[#0F1422]/90">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${pillar.badgeBg} ${pillar.badgeBorder}`}>
                {pillar.shortTitle}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                {solution.maturity}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {solution.clientContext.industry} {solution.clientContext.region ? `• ${solution.clientContext.region}` : ''}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
              {solution.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-medium">
              {solution.tagline}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-4">
            <button
              onClick={handleCopyDetails}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors"
              title="Copy solution JSON schema"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans">
          
          {/* Client & Deployment Transparency Notice */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-white/[0.05]">
                {internalMode ? <Unlock className="w-5 h-5 text-purple-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  {internalMode ? 'Internal Enterprise Context' : 'Client-Safe Showcase Context'}
                </div>
                <div className="text-sm font-bold text-white">
                  {internalMode ? solution.clientContext.internalName : solution.clientContext.publicName}
                </div>
              </div>
            </div>

            {!internalMode && (
              <button
                onClick={onUnlockInternalMode}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-all flex items-center space-x-1"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Internal Details</span>
              </button>
            )}
          </div>

          {/* Key Impact Metrics Grid */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-brand-orange" />
              <span>Proven Business Impact & Key Metrics</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {solution.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#121624] border border-white/[0.08] text-center">
                  <div className="text-2xl font-bold font-mono text-brand-orange">{metric.value}</div>
                  <div className="text-xs font-semibold text-white mt-1">{metric.label}</div>
                  {metric.detail && (
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{metric.detail}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/15">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>The Challenge / Bottleneck</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {solution.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/15">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>The Engineered AI Solution</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {solution.solution}
              </p>
            </div>
          </div>

          {/* Step-by-Step Interactive Architecture Flow */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-brand-cyan" />
                <span>End-to-End System Architecture ({solution.architecture.nodes.length} Steps)</span>
              </h4>
            </div>

            <p className="text-xs text-slate-400 mb-4 italic">
              {solution.architecture.summary}
            </p>

            <div className="space-y-3">
              {solution.architecture.nodes.map((node, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-[#111522] border border-white/[0.06] hover:border-brand-cyan/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] text-brand-cyan shrink-0">
                      {node.step}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {node.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {node.description}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08] inline-block">
                      {node.tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Cloud */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Full Technology & Framework Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {solution.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] text-slate-200 border border-white/[0.08] text-xs font-mono font-medium hover:bg-white/[0.08] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Enterprise Deliverables & Capabilities</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {solution.deliverables.map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="text-brand-orange mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Internal Deep Dive (Unlocked if in internal mode) */}
          {internalMode && solution.internalDeepDive && (
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                <FolderGit2 className="w-4 h-4 text-purple-400" />
                <span>Internal Codebase & Agent Topology (Confidential)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {solution.internalDeepDive.repoPath && (
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-slate-500 text-[10px] uppercase">Local Repository Path</div>
                    <div className="text-purple-300 font-semibold truncate mt-0.5">{solution.internalDeepDive.repoPath}</div>
                  </div>
                )}
                {solution.internalDeepDive.architectureType && (
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                    <div className="text-slate-500 text-[10px] uppercase">System Architecture Topology</div>
                    <div className="text-slate-200 font-semibold truncate mt-0.5">{solution.internalDeepDive.architectureType}</div>
                  </div>
                )}
              </div>

              {solution.internalDeepDive.keyAgents && solution.internalDeepDive.keyAgents.length > 0 && (
                <div>
                  <div className="text-slate-400 text-xs font-medium mb-1.5">Active Agent Classes & Microservices:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {solution.internalDeepDive.keyAgents.map((agent, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30 font-mono text-[11px]">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {solution.internalDeepDive.compliance && (
                <div className="text-xs text-slate-400 pt-1">
                  <span className="text-slate-300 font-medium">Compliance & Regulatory Constraints:</span> {solution.internalDeepDive.compliance}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 px-6 bg-[#0E121E] border-t border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-mono">
            ID: <span className="text-slate-400">{solution.id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold transition-all"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
