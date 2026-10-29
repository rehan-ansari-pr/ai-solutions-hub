import React from 'react';
import { Search, Sparkles, Filter, CheckCircle2, TrendingUp, Cpu, Shield, ArrowRight } from 'lucide-react';
import { PillarType, MaturityStatus } from '../types';
import { PILLARS } from '../data/pillars';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPillar: PillarType | 'all';
  onSelectPillar: (pillar: PillarType | 'all') => void;
  selectedMaturity: MaturityStatus | 'all';
  onSelectMaturity: (maturity: MaturityStatus | 'all') => void;
  totalCount: number;
  filteredCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedPillar,
  onSelectPillar,
  selectedMaturity,
  onSelectMaturity,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="relative pt-10 pb-8 overflow-hidden">
      
      {/* Decorative Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-orange/15 via-brand-purple/10 to-brand-cyan/15 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-5">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>Enterprise AI Portfolio & Intelligent Solutions Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            From Execution-Led Operations to{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-cyan bg-clip-text text-transparent">
              Intelligence-Led Marketing
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Where autonomous agents, privacy-first measurement backbones, and brand-governed multimodal engines power decisioning, creativity, and orchestration at scale.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8">
            <div className="glass-panel p-3 rounded-xl border border-white/[0.08] text-center">
              <div className="text-2xl font-bold font-display text-white">14+</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Production Deployments</div>
            </div>
            <div className="glass-panel p-3 rounded-xl border border-white/[0.08] text-center">
              <div className="text-2xl font-bold font-display text-brand-cyan">5 Pillars</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Core Capability Matrix</div>
            </div>
            <div className="glass-panel p-3 rounded-xl border border-white/[0.08] text-center">
              <div className="text-2xl font-bold font-display text-purple-400">37+</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Microservices & Agents</div>
            </div>
            <div className="glass-panel p-3 rounded-xl border border-white/[0.08] text-center">
              <div className="text-2xl font-bold font-display text-emerald-400">99.4%</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Attribution Accuracy</div>
            </div>
          </div>
        </div>

        {/* Global Instant Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by solution, tech (BigQuery, LangGraph, Meridian), client industry, or problem..."
              className="w-full pl-12 pr-28 py-3.5 bg-[#0F131D]/90 border border-white/[0.1] rounded-2xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 shadow-2xl transition-all font-sans"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1.5">
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs px-2 py-1 rounded bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.12] transition-colors"
                >
                  Clear
                </button>
              )}
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Strategic Pillar Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => onSelectPillar('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedPillar === 'all'
                ? 'bg-white text-slate-900 border-white shadow-lg'
                : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
            }`}
          >
            All Pillars ({totalCount})
          </button>

          {(Object.keys(PILLARS) as PillarType[]).map((key) => {
            const pillar = PILLARS[key];
            const isSelected = selectedPillar === key;
            return (
              <button
                key={key}
                onClick={() => onSelectPillar(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center space-x-1.5 ${
                  isSelected
                    ? `${pillar.badgeBg} border-white/20 shadow-md`
                    : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07] hover:text-slate-200'
                }`}
              >
                <span>{pillar.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Maturity Filters */}
        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
          <span className="text-[11px] uppercase tracking-wider font-medium text-slate-500">Maturity:</span>
          {(['all', 'Production', 'Client MVP', 'Strategic Architecture'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onSelectMaturity(m)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                selectedMaturity === m
                  ? 'bg-white/[0.12] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {m === 'all' ? 'All Stages' : m}
            </button>
          ))}
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-mono text-[11px]">{filteredCount} shown</span>
        </div>

      </div>
    </div>
  );
};
