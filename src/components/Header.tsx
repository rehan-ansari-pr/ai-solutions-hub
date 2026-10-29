import React from 'react';
import { Lock, Unlock, RefreshCw, Sparkles, Layers, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  internalMode: boolean;
  onToggleInternalMode: () => void;
  onOpenSyncModal: () => void;
  totalSolutions: number;
}

export const Header: React.FC<HeaderProps> = ({
  internalMode,
  onToggleInternalMode,
  onOpenSyncModal,
  totalSolutions
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080A0F]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Identities */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-orange via-brand-purple to-brand-cyan p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-orange">
                  <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-brand-orange animate-pulse-subtle" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white">
                    CSA <span className="text-brand-orange">×</span> PivotRoots
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                    Havas Media Network
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">AI Solutions Hub</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 font-mono text-[11px]">{totalSolutions} Enterprise Deployments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* View Mode Toggle Button */}
            <button
              onClick={onToggleInternalMode}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                internalMode
                  ? 'bg-brand-purple/15 text-purple-300 border-purple-500/40 shadow-glow-purple'
                  : 'bg-white/[0.04] text-slate-300 border-white/[0.09] hover:bg-white/[0.08]'
              }`}
              title={internalMode ? "Unlocked: Internal Architecture & Client Names visible" : "Locked: Public Client-Safe Showcase mode"}
            >
              {internalMode ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden md:inline font-semibold">Internal Mode</span>
                  <span className="md:hidden">Internal</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden md:inline">Public Showcase</span>
                  <span className="md:hidden">Public</span>
                  <Lock className="w-3 h-3 text-slate-500" />
                </>
              )}
            </button>

            {/* Sync Solution Skill Button */}
            <button
              onClick={onOpenSyncModal}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-brand-orange to-brand-orangeGlow text-white shadow-glow-orange hover:opacity-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sync Project</span>
              <span className="sm:hidden">Sync</span>
            </button>

            {/* GitHub Repo Button */}
            <a
              href="https://github.com/rehan-ansari-pr/ai-solutions-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="View on GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
