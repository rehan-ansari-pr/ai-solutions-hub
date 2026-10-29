import React from 'react';
import { Search } from 'lucide-react';
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
    <div className="bg-white border-b border-havas-border pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Tag - Havas Presentation Style */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-havas-red mb-3">
            <span>CSA &bull; PORTFOLIO OF AI CAPABILITIES & ARCHITECTURES</span>
          </div>

          {/* Authoritative Slide-Style Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-havas-black tracking-tight leading-tight">
            Enterprise AI Solutions, Operating Concepts & Use Cases
          </h1>

          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive repository of production platforms, working POCs, and system architectures built to solve core marketing, measurement, and creative bottlenecks at enterprise scale.
          </p>
        </div>

        {/* Clean Editorial Search Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by solution, concept, use case, tech stack (BigQuery, Meridian, Vertex), or client industry..."
              className="w-full pl-10 pr-24 py-3 bg-[#F8F9FA] border border-havas-border rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-havas-black focus:bg-white transition-all font-sans shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center space-x-1">
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-600 hover:text-black transition-colors"
                >
                  Clear
                </button>
              )}
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-200 bg-white">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Pillar Navigation Tabs - Havas Slide Track Style */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => onSelectPillar('all')}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all border ${
              selectedPillar === 'all'
                ? 'bg-havas-black text-white border-havas-black shadow-sm'
                : 'bg-white text-slate-600 border-havas-border hover:bg-slate-50 hover:text-black'
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
                className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-havas-red text-white border-havas-red shadow-sm'
                    : 'bg-white text-slate-600 border-havas-border hover:bg-slate-50 hover:text-black'
                }`}
              >
                {pillar.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Maturity Filters */}
        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Deployment Status:</span>
          {(['all', 'Production', 'Client MVP', 'Strategic Architecture'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onSelectMaturity(m)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                selectedMaturity === m
                  ? 'bg-slate-200 text-havas-black font-semibold'
                  : 'text-slate-500 hover:text-black hover:bg-slate-100'
              }`}
            >
              {m === 'all' ? 'All Stages' : m}
            </button>
          ))}
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-mono text-[11px]">{filteredCount} solutions</span>
        </div>

      </div>
    </div>
  );
};
