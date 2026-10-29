import React, { useState, useEffect, useMemo } from 'react';
import { AISolution, PillarType, MaturityStatus } from './types';
import { INITIAL_SOLUTIONS } from './data/solutions';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SolutionCard } from './components/SolutionCard';
import { SolutionModal } from './components/SolutionModal';
import { SyncModal } from './components/SyncModal';
import { UnlockModal } from './components/UnlockModal';
import { Footer } from './components/Footer';
import { Sparkles, Layers, SlidersHorizontal, AlertCircle } from 'lucide-react';

export default function App() {
  const [solutions, setSolutions] = useState<AISolution[]>(() => {
    const saved = localStorage.getItem('csa_solutions_catalog');
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
    return localStorage.getItem('csa_internal_unlocked') === 'true';
  });

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

  // Save internalMode status
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
      localStorage.setItem('csa_solutions_catalog', JSON.stringify(updated));
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
        const matchProblem = item.problem.toLowerCase().includes(q);
        const matchSolution = item.solution.toLowerCase().includes(q);
        const matchTech = item.techStack.some(t => t.toLowerCase().includes(q));
        const matchPublicClient = item.clientContext.publicName.toLowerCase().includes(q);
        const matchInternalClient = item.clientContext.internalName.toLowerCase().includes(q);
        const matchIndustry = item.clientContext.industry.toLowerCase().includes(q);

        return matchTitle || matchTagline || matchProblem || matchSolution || matchTech || matchPublicClient || matchInternalClient || matchIndustry;
      }
      return true;
    });
  }, [solutions, selectedPillar, selectedMaturity, searchQuery]);

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col font-sans selection:bg-brand-orange selection:text-white">
      
      {/* Persistent Navigation Header */}
      <Header
        internalMode={internalMode}
        onToggleInternalMode={handleToggleInternalMode}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        totalSolutions={solutions.length}
      />

      {/* Hero Section & Search / Filter Controls */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPillar={selectedPillar}
        onSelectPillar={setSelectedPillar}
        selectedMaturity={selectedMaturity}
        onSelectMaturity={setSelectedMaturity}
        totalCount={solutions.length}
        filteredCount={filteredSolutions.length}
      />

      {/* Main Catalog Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-16">
        
        {filteredSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                internalMode={internalMode}
                onSelect={(sol) => setSelectedSolution(sol)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl glass-panel border border-white/[0.08] max-w-lg mx-auto my-12">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Solutions Found</h3>
            <p className="text-xs text-slate-400 mb-4">
              No AI platforms match your search term &quot;{searchQuery}&quot; in the selected filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedPillar('all'); setSelectedMaturity('all'); }}
              className="px-4 py-2 rounded-xl bg-white/[0.08] text-xs font-semibold text-white hover:bg-white/[0.15] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Detail Slide-Out / Center Modal */}
      <SolutionModal
        solution={selectedSolution}
        internalMode={internalMode}
        onClose={() => setSelectedSolution(null)}
        onUnlockInternalMode={() => setIsUnlockModalOpen(true)}
      />

      {/* Team Sync & Skill Instructions Modal */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSolutionAdded={handleSolutionAdded}
      />

      {/* Unlock Internal Mode Modal */}
      <UnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onSuccess={handleUnlockSuccess}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
