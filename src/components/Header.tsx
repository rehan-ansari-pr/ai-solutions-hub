import React from 'react';
import { Lock, Unlock, RefreshCw, Eye } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-havas-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Havas Brand & CSA Identity */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-3.5">
              {/* Actual Havas Logo extracted from ppt template - havas.pptx */}
              <img 
                src="/havas_logo.png" 
                alt="HAVAS" 
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  // Fallback in case image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />

              <div className="h-6 w-px bg-havas-border hidden sm:block" />

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display font-extrabold text-base tracking-tight text-havas-black">
                    CSA <span className="text-havas-red">×</span> PivotRoots
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-havas-light text-slate-600 border border-havas-border">
                    Part of Havas Media Network
                  </span>
                </div>
                <div className="text-[11px] text-havas-muted font-medium">
                  Enterprise AI Solutions, Architectures & Use Cases
                </div>
              </div>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center space-x-2.5">
            
            {/* View Mode Toggle: Public Showcase vs Internal */}
            <button
              onClick={onToggleInternalMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                internalMode
                  ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm'
                  : 'bg-white text-slate-700 border-havas-border hover:bg-slate-50'
              }`}
              title={internalMode ? "Unlocked: Full internal client names and repositories visible" : "Locked: Client-Safe Showcase Mode"}
            >
              {internalMode ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">Internal Mode</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Client-Safe Mode</span>
                  <Lock className="w-3 h-3 text-slate-400" />
                </>
              )}
            </button>

            {/* Sync Solution Skill Button */}
            <button
              onClick={onOpenSyncModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-havas-red hover:bg-havas-redHover text-white transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Project</span>
            </button>

            {/* GitHub Repo Button */}
            <a
              href="https://github.com/rehan-ansari-pr/ai-solutions-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-havas-border text-slate-500 hover:text-havas-black hover:bg-slate-50 transition-colors"
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
