import React, { useEffect, useState } from 'react';
import { AISolution } from '../types';
import { PILLARS } from '../data/pillars';
import { X, Copy, Check, Lock, Unlock, FolderGit2, Target, Wrench } from 'lucide-react';
import { PILLAR_ICONS } from './ui';
import { StatusChip } from './SolutionCard';
import { StatStrip } from './StatStrip';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ProcessTimeline } from './ProcessTimeline';
import { OwnershipPanel } from './OwnershipPanel';

interface SolutionModalProps {
  solution: AISolution | null;
  internalMode: boolean;
  onClose: () => void;
  onUnlockInternalMode: () => void;
}

const Block: React.FC<{ kicker: string; title?: string; red?: boolean; children: React.ReactNode }> = ({ kicker, title, red, children }) => (
  <section>
    <div className={red ? 'kicker-red' : 'kicker'}>{kicker}</div>
    {title && <h3 className="mt-1.5 mb-4 text-[18px] sm:text-[20px] font-bold leading-snug">{title}</h3>}
    {!title && <div className="mb-3" />}
    {children}
  </section>
);

/** Splits "Title: body" use-case strings into a timeline card. */
const toTimelineItem = (s: string) => {
  const idx = s.indexOf(':');
  return idx > 0 && idx < 70 ? { title: s.slice(0, idx), body: s.slice(idx + 1).trim() } : { title: s };
};

export const SolutionModal: React.FC<SolutionModalProps> = ({ solution, internalMode, onClose, onUnlockInternalMode }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!solution) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [solution, onClose]);

  if (!solution) return null;

  const pillar = PILLARS[solution.pillar] || PILLARS.intelligence;
  const Icon = PILLAR_ICONS[solution.pillar] || PILLAR_ICONS.intelligence;
  const stages = solution.architecture.nodes.length;
  const useCases = solution.useCases ?? [];
  const maxStat = Math.max(stages, useCases.length, solution.techStack.length, 1);

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(JSON.stringify(solution, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn" role="dialog" aria-modal="true" aria-label={solution.title}>
      <div className="absolute inset-0 bg-ink/70" onClick={onClose} />

      <div className="relative w-full max-w-[760px] h-full bg-paper overflow-y-auto animate-drawer">
        {/* Header in slide pattern */}
        <div className="bg-ink px-5 sm:px-8 pt-6 pb-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="badge w-10 h-10"><Icon className="w-[18px] h-[18px]" strokeWidth={1.75} /></span>
              <StatusChip maturity={solution.maturity} onDark />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyDetails}
                className="p-2 rounded-btn border border-white/20 text-mist hover:text-white hover:border-white/50 transition-colors"
                title="Copy solution JSON"
              >
                {copied ? <Check className="w-4 h-4 text-lime" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-btn border border-white/20 text-mist hover:text-white hover:border-white/50 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-6 kicker !text-lime">{pillar.title}</div>
          <h2 className="mt-2 text-[26px] sm:text-[32px] font-bold leading-tight !text-white">{solution.title}</h2>
          <p className="mt-2 text-mist">{solution.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {internalMode ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-btn bg-havas-red text-white text-[12px] font-semibold">
                <Unlock className="w-3.5 h-3.5" />
                {solution.clientContext.internalName}
              </span>
            ) : (
              <>
                <span className="chip !bg-white/10 !text-white/85">{solution.clientContext.publicName}</span>
                <button
                  onClick={onUnlockInternalMode}
                  className="inline-flex items-center gap-1 text-[12px] text-mist hover:text-white underline underline-offset-2"
                >
                  <Lock className="w-3 h-3" /> Unlock Internal Details
                </button>
              </>
            )}
            {solution.clientContext.region && <span className="chip !bg-white/10 !text-mist">{solution.clientContext.region}</span>}
          </div>
        </div>

        <div className="px-5 sm:px-8 py-8 space-y-10">
          <Block kicker="The Underlying Architectural Concept" title={solution.coreConcept || solution.tagline}>
            <StatStrip
              stats={[
                { value: stages, label: 'Architecture stages', ratio: stages / maxStat, tone: 'ink' },
                { value: useCases.length, label: 'Use cases', ratio: useCases.length / maxStat, tone: 'lime' },
                { value: solution.techStack.length, label: 'Technology stack', ratio: solution.techStack.length / maxStat, tone: 'mist' },
              ]}
            />
          </Block>

          <Block kicker={`Technical Design & Architecture (${stages} Stages)`} title={solution.architecture.summary}>
            <ArchitectureDiagram nodes={solution.architecture.nodes} />
          </Block>

          {useCases.length > 0 && (
            <Block kicker="Core Business Use Cases & Workflows Unlocked">
              <ProcessTimeline items={useCases.map(toTimelineItem)} />
            </Block>
          )}

          <Block kicker="Challenge & Solution">
            <OwnershipPanel
              left={{ title: 'The Engineered System Solution', intro: solution.solution, items: solution.deliverables, icon: Wrench }}
              right={{ title: 'The Challenge / Operational Bottleneck', intro: solution.problem, items: [], icon: Target }}
            />
          </Block>

          <Block kicker="Technology & Platform Stack">
            <div className="flex flex-wrap gap-1.5">
              {solution.techStack.map((tech) => (
                <span key={tech} className="chip !text-[12px] !px-2.5 !py-1">{tech}</span>
              ))}
            </div>
          </Block>

          {internalMode && solution.internalDeepDive && (
            <Block kicker="Internal Codebase & Architecture Topology" red>
              <div className="rounded-card border border-havas-red/40 bg-havas-redSoft p-5 space-y-4">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-fg">
                  <FolderGit2 className="w-4 h-4 text-havas-red" /> Internal Codebase &amp; Architecture Topology
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[12px]">
                  {solution.internalDeepDive.repoPath && (
                    <div className="bg-card rounded-btn border border-line p-3 min-w-0">
                      <dt className="kicker-red !text-[10px]">Local Directory</dt>
                      <dd className="mt-1 text-fg break-all">{solution.internalDeepDive.repoPath}</dd>
                    </div>
                  )}
                  {solution.internalDeepDive.architectureType && (
                    <div className="bg-card rounded-btn border border-line p-3 min-w-0">
                      <dt className="kicker-red !text-[10px]">Topology</dt>
                      <dd className="mt-1 text-fg">{solution.internalDeepDive.architectureType}</dd>
                    </div>
                  )}
                </dl>
                {solution.internalDeepDive.keyAgents && solution.internalDeepDive.keyAgents.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {solution.internalDeepDive.keyAgents.map((agent) => (
                      <span key={agent} className="px-2 py-0.5 rounded-btn bg-card border border-line font-mono text-[11px] text-fg">
                        {agent}
                      </span>
                    ))}
                  </div>
                )}
                {solution.internalDeepDive.compliance && (
                  <p className="text-[13px] text-fg"><span className="font-semibold">Compliance Notes:</span> {solution.internalDeepDive.compliance}</p>
                )}
              </div>
            </Block>
          )}
        </div>

        <div className="px-5 sm:px-8 py-3 sticky bottom-0 border-t border-line bg-card flex items-center justify-between text-[11px] text-slate">
          <span className="font-mono">System ID: <span className="text-fg">{solution.id}</span></span>
          <button onClick={onClose} className="btn !py-1.5 bg-ink text-white hover:bg-ink-2">Close Details</button>
        </div>
      </div>
    </div>
  );
};
