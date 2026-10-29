import React from 'react';
import { Lock, Unlock, RefreshCw, Moon, Sun, LogOut } from 'lucide-react';
import { PivotRootsLogo } from './ui';

interface HeaderProps {
  internalMode: boolean;
  onToggleInternalMode: () => void;
  onOpenSyncModal: () => void;
  totalSolutions: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  internalMode,
  onToggleInternalMode,
  onOpenSyncModal,
  theme,
  onToggleTheme,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-ink border-b border-white/10">
      {internalMode && (
        <div className="bg-havas-red text-white text-[11px] font-semibold uppercase tracking-[0.14em]">
          <div className="page py-1.5 flex items-center gap-2">
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlocked: Full internal client names and repositories visible</span>
          </div>
        </div>
      )}
      <div className="page flex items-center justify-between h-16 gap-3">
        <div className="flex items-center gap-4 min-w-0">
          <PivotRootsLogo className="h-6 sm:h-7" />
          <div className="h-7 w-px bg-white/15 hidden sm:block" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display font-semibold text-[13px] text-white">
              CSA <span className="text-lime">×</span> PivotRoots
            </span>
            <span className="text-[11px] text-mist">Enterprise AI Solutions, Architectures &amp; Use Cases</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleInternalMode}
            className={`btn !px-3 border ${
              internalMode
                ? 'bg-havas-red border-havas-red text-white'
                : 'border-white/25 text-white/80 hover:text-white hover:border-white/60'
            }`}
            title={internalMode ? 'Internal mode on. Click to return to client-safe view.' : 'Client-safe view. Click to unlock internal details.'}
          >
            {internalMode ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{internalMode ? 'Internal Mode' : 'Client-Safe Mode'}</span>
          </button>

          <button onClick={onOpenSyncModal} className="btn-primary !px-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync Project</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-btn border border-white/25 text-white/80 hover:text-white hover:border-white/60 transition-colors"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            aria-label="Toggle colour theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onSignOut}
            className="p-2 rounded-btn border border-white/25 text-white/80 hover:text-white hover:border-white/60 transition-colors"
            title="Lock Hub / Sign Out"
            aria-label="Sign out and lock hub"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <a
            href="https://github.com/rehan-ansari-pr/ai-solutions-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-2 rounded-btn border border-white/25 text-white/80 hover:text-white hover:border-white/60 transition-colors"
            title="View on GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
