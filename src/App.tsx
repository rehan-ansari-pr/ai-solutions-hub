import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AISolution, PillarType, MaturityStatus } from './types';
import { INITIAL_SOLUTIONS } from './data/solutions';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SolutionCard } from './components/SolutionCard';
import { SolutionModal } from './components/SolutionModal';
import { SyncModal } from './components/SyncModal';
import { UnlockModal } from './components/UnlockModal';
import { LoginGate } from './components/LoginGate';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { Reveal, SectionHead, PILLAR_ICONS, PILLAR_ORDER } from './components/ui';
import { PILLARS } from './data/pillars';
import { AlertCircle, ArrowRight } from 'lucide-react';
import {
  AuthRole,
  AuthSession,
  getAuthSession,
  saveAuthSession,
  destroyAuthSession,
} from './lib/auth';

type Theme = 'light' | 'dark';

const readStoredTheme = (): Theme => {
  try {
    const t = localStorage.getItem('csa_theme');
    if (t === 'light' || t === 'dark') return t;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(() => getAuthSession());

  const [solutions, setSolutions] = useState<AISolution[]>(() => {
    const saved = localStorage.getItem('csa_solutions_catalog_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse local stored solutions', e);
      }
    }
    return INITIAL_SOLUTIONS;
  });

  const [internalMode, setInternalMode] = useState<boolean>(() => {
    const s = getAuthSession();
    if (s?.role === 'internal') return true;
    return localStorage.getItem('csa_internal_unlocked') === 'true';
  });

  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('csa_theme', next);
    } catch {
      /* storage unavailable */
    }
  };

  const closeSolution = useCallback(() => setSelectedSolution(null), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [selectedMaturity, setSelectedMaturity] = useState<MaturityStatus | 'all'>('all');

  const [selectedSolution, setSelectedSolution] = useState<AISolution | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

  // Keyboard shortcut Cmd+K or Ctrl+K for search focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement | null;
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle internalMode status
  const handleToggleInternalMode = () => {
    if (internalMode) {
      setInternalMode(false);
      localStorage.setItem('csa_internal_unlocked', 'false');
    } else {
      setIsUnlockModalOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    setInternalMode(true);
    localStorage.setItem('csa_internal_unlocked', 'true');
  };

  const handleSignOut = () => {
    destroyAuthSession();
    setSession(null);
    setInternalMode(false);
  };

  // Handler for dynamically adding / syncing a solution
  const handleSolutionAdded = (newSol: AISolution) => {
    setSolutions(prev => {
      const existingIdx = prev.findIndex(s => s.id === newSol.id || s.title.toLowerCase() === newSol.title.toLowerCase());
      let updated: AISolution[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], ...newSol };
      } else {
        updated = [newSol, ...prev];
      }
      localStorage.setItem('csa_solutions_catalog_v2', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter solutions
  const filteredSolutions = useMemo(() => {
    return solutions.filter(item => {
      // Filter by Pillar
      if (selectedPillar !== 'all' && item.pillar !== selectedPillar) {
        return false;
      }
      // Filter by Maturity
      if (selectedMaturity !== 'all' && item.maturity !== selectedMaturity) {
        return false;
      }
      // Filter by Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchTagline = item.tagline.toLowerCase().includes(q);
        const matchConcept = item.coreConcept ? item.coreConcept.toLowerCase().includes(q) : false;
        const matchProblem = item.problem.toLowerCase().includes(q);
        const matchSolution = item.solution.toLowerCase().includes(q);
        const matchTech = item.techStack.some(t => t.toLowerCase().includes(q));
        const matchUseCases = item.useCases ? item.useCases.some(u => u.toLowerCase().includes(q)) : false;
        const matchPublicClient = item.clientContext.publicName.toLowerCase().includes(q);
        const matchInternalClient = item.clientContext.internalName.toLowerCase().includes(q);
        const matchIndustry = item.clientContext.industry.toLowerCase().includes(q);

        return matchTitle || matchTagline || matchConcept || matchProblem || matchSolution || matchTech || matchUseCases || matchPublicClient || matchInternalClient || matchIndustry;
      }
      return true;
    });
  }, [solutions, selectedPillar, selectedMaturity, searchQuery]);

  const grouped = useMemo(
    () =>
      PILLAR_ORDER.map((key, i) => ({
        key,
        index: i + 1,
        items: filteredSolutions.filter((s) => s.pillar === key),
      })).filter((g) => g.items.length > 0),
    [filteredSolutions]
  );

  const pillarCounts = useMemo(() => {
    const counts = {} as Record<PillarType, number>;
    PILLAR_ORDER.forEach((k) => (counts[k] = solutions.filter((s) => s.pillar === k).length));
    return counts;
  }, [solutions]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPillar('all');
    setSelectedMaturity('all');
  };

  if (!session) {
    return (
      <LoginGate
        theme={theme}
        onToggleTheme={toggleTheme}
        onAuthenticated={(role, rememberMe) => {
          saveAuthSession(role, rememberMe);
          setSession({ authenticated: true, role, timestamp: Date.now() });
          if (role === 'internal') {
            setInternalMode(true);
            localStorage.setItem('csa_internal_unlocked', 'true');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        internalMode={internalMode}
        onToggleInternalMode={handleToggleInternalMode}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        totalSolutions={solutions.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSignOut={handleSignOut}
      />

      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPillar={selectedPillar}
        onSelectPillar={setSelectedPillar}
        solutions={solutions}
        internalMode={internalMode}
      />

      <TechMarquee solutions={solutions} />

      <main className="flex-1 w-full">
        {/* Pillar overview, from "Four goals, one platform" */}
        <section className="page pt-16 sm:pt-24">
          <SectionHead kicker="CSA &bull; PivotRoots" title="Strategic Capability Pillars" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {PILLAR_ORDER.map((key, i) => {
              const p = PILLARS[key];
              const Icon = PILLAR_ICONS[key];
              const active = selectedPillar === key;
              return (
                <Reveal key={key} delay={i * 40} className="h-full">
                  <button
                    onClick={() => setSelectedPillar(active ? 'all' : key)}
                    className={`group text-left w-full h-full p-5 rounded-card border transition-all duration-200 hover:-translate-y-0.5 flex flex-col ${
                      active ? 'bg-ink border-ink' : 'bg-card border-line hover:border-fg'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="badge w-10 h-10"><Icon className="w-[18px] h-[18px]" strokeWidth={1.75} /></span>
                      <span className={`num text-[22px] leading-none ${active ? 'text-lime' : 'text-fg'}`}>{pillarCounts[key]}</span>
                    </div>
                    <div className={`mt-4 font-display font-semibold text-[15px] leading-snug ${active ? 'text-white' : 'text-fg'}`}>{p.title}</div>
                    <p className={`mt-2 text-[12.5px] leading-relaxed line-clamp-3 ${active ? 'text-mist' : 'text-slate'}`}>{p.tagline}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Portfolio */}
        <section className="page pt-16 sm:pt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHead
              kicker={`${filteredSolutions.length} solutions`}
              title={selectedPillar === 'all' ? 'Enterprise AI Solutions' : PILLARS[selectedPillar].title}
            />
            <div className="flex flex-wrap items-center gap-1.5 mb-8">
              <span className="kicker !text-slate mr-1">Deployment Status:</span>
              {(['all', 'Production', 'Client MVP', 'Strategic Architecture'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMaturity(m)}
                  className={`btn !py-1.5 !px-3 !text-[12px] border ${
                    selectedMaturity === m ? 'bg-ink text-lime border-ink dark:bg-lime dark:text-ink dark:border-lime' : 'border-line text-slate hover:border-fg hover:text-fg'
                  }`}
                >
                  {m === 'all' ? 'All Stages' : m}
                </button>
              ))}
            </div>
          </div>

          {filteredSolutions.length === 0 ? (
            <div className="card p-12 text-center max-w-lg mx-auto">
              <span className="badge w-12 h-12 mx-auto"><AlertCircle className="w-5 h-5" /></span>
              <h3 className="mt-4 text-lg font-bold">No Matching Solutions Found</h3>
              <p className="mt-1 text-[14px] text-slate">
                No AI platforms match &quot;{searchQuery}&quot; in the current filter.
              </p>
              <button onClick={resetFilters} className="btn-primary mt-5">Reset Filters</button>
            </div>
          ) : selectedPillar === 'all' ? (
            grouped.map((g) => (
              <div key={g.key}>
                <SectionDivider
                  index={g.index}
                  title={PILLARS[g.key].title}
                  description={PILLARS[g.key].summary}
                  count={g.items.length}
                />
                <SolutionGrid items={g.items} internalMode={internalMode} onSelect={setSelectedSolution} />
              </div>
            ))
          ) : (
            <SolutionGrid items={filteredSolutions} internalMode={internalMode} onSelect={setSelectedSolution} />
          )}
        </section>

      </main>

      <SolutionModal
        solution={selectedSolution}
        internalMode={internalMode}
        onClose={closeSolution}
        onUnlockInternalMode={() => setIsUnlockModalOpen(true)}
      />

      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSolutionAdded={handleSolutionAdded}
      />

      <UnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onSuccess={handleUnlockSuccess}
      />

      <Footer />
    </div>
  );
}

const SolutionGrid: React.FC<{
  items: AISolution[];
  internalMode: boolean;
  onSelect: (s: AISolution) => void;
}> = ({ items, internalMode, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((solution, i) => (
      <Reveal key={solution.id} delay={(i % 3) * 40} className="h-full">
        <SolutionCard solution={solution} internalMode={internalMode} onSelect={onSelect} dark={i === 0 && !!solution.featured} />
      </Reveal>
    ))}
  </div>
);

const TechMarquee: React.FC<{ solutions: AISolution[] }> = ({ solutions }) => {
  const tech = useMemo(() => Array.from(new Set(solutions.flatMap((s) => s.techStack))), [solutions]);
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden}>
      {tech.map((t) => (
        <span key={t} className="inline-flex items-center gap-8 whitespace-nowrap font-display font-semibold text-[15px] text-ink">
          {t}
          <span className="w-1.5 h-1.5 rounded-full bg-ink/40" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee bg-lime border-y-2 border-ink overflow-hidden py-3.5">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};
