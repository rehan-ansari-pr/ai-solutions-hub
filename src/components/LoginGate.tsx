import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Sun, Moon } from 'lucide-react';
import { PivotRootsLogo } from './ui';
import {
  AuthRole,
  verifyAccessPassphrase,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from '../lib/auth';

interface LoginGateProps {
  onAuthenticated: (role: AuthRole, rememberMe: boolean) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const LoginGate: React.FC<LoginGateProps> = ({
  onAuthenticated,
  theme,
  onToggleTheme,
}) => {
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Check rate limit on mount
  useEffect(() => {
    const limit = checkRateLimit('login');
    if (!limit.allowed) {
      setLockoutSeconds(limit.remainingSeconds);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) return;

    // Check rate limit
    const limit = checkRateLimit('login');
    if (!limit.allowed) {
      setLockoutSeconds(limit.remainingSeconds);
      setError(`Too many failed attempts. Security lockout active for ${limit.remainingSeconds}s.`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyAccessPassphrase(passphrase);
      if (result.valid && result.role) {
        resetRateLimit('login');
        onAuthenticated(result.role, rememberMe);
      } else {
        const failed = recordFailedAttempt('login');
        if (failed.locked) {
          setLockoutSeconds(failed.remainingSeconds);
          setError(`Too many invalid attempts. Security lockout active for ${failed.remainingSeconds}s.`);
        } else {
          setError('Invalid access passphrase. Please enter an authorized team key or token.');
        }
      }
    } catch {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-lime/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-slate/15 blur-3xl" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 w-full border-b border-line bg-card/60 backdrop-blur-md">
        <div className="page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PivotRootsLogo className="h-6 sm:h-7" />
            <div className="h-5 w-px bg-line hidden sm:block" />
            <span className="hidden sm:inline text-[12px] font-display font-semibold tracking-wide text-fg">
              CSA <span className="text-lime-deep dark:text-lime">×</span> PivotRoots
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-btn text-[11px] font-medium bg-line-soft text-slate border border-line">
              <Shield className="w-3 h-3 text-havas-red" />
              Restricted Enterprise Access
            </span>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-btn border border-line text-slate hover:text-fg hover:border-fg transition-colors"
              title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
              aria-label="Toggle colour theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-card border border-line rounded-card p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(30,43,48,0.25)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-11 h-11 rounded-btn bg-ink text-lime flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate px-2 py-0.5 rounded-btn border border-line">
              Confidential Hub
            </span>
          </div>

          <div className="kicker !text-lime-deep dark:!text-lime">Havas Media Network</div>
          <h1 className="mt-1 text-2xl font-display font-bold text-fg tracking-tight">
            AI Solutions Hub
          </h1>
          <p className="mt-2 text-[13px] text-slate leading-relaxed">
            Enterprise portfolio, production architectures, and multi-agent systems engineered by CSA &amp; PivotRoots.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-fg mb-1.5">
                Passphrase / Access Token
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutSeconds > 0 || isLoading}
                  value={passphrase}
                  onChange={(e) => {
                    setPassphrase(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter team or access passphrase"
                  className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg dark:focus:border-lime font-mono transition-colors disabled:opacity-60 disabled:cursor-not-allowed pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-mist hover:text-slate transition-colors p-0.5"
                  aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <div className="mt-2 p-2.5 rounded-btn bg-havas-redSoft border border-havas-red/30 flex items-start space-x-2 text-[12px] text-havas-red animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-line text-ink focus:ring-lime"
                />
                <span>Remember session on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={lockoutSeconds > 0 || isLoading || !passphrase.trim()}
              className="btn-primary w-full !py-2.5 mt-2 justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : lockoutSeconds > 0 ? (
                <span>Locked ({lockoutSeconds}s)</span>
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Security details footnote */}
          <div className="mt-6 pt-5 border-t border-line text-center">
            <p className="text-[11px] text-slate leading-relaxed">
              Authorized team members can use the team passphrase from the repository documentation to access the full portfolio.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-line bg-card/60 backdrop-blur-md py-4">
        <div className="page flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate">
          <span>&copy; {new Date().getFullYear()} CSA &bull; PivotRoots &bull; Havas Media Network</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-deep dark:bg-lime" />
              Edge Security Active
            </span>
            <span>Zero PII Stored</span>
            <span>Brute-Force Protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
