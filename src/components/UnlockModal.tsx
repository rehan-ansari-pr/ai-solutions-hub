import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Key, AlertCircle, Eye, EyeOff } from 'lucide-react';
import {
  verifyInternalPassphrase,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from '../lib/auth';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPassphrase('');
      setError(null);
      return;
    }
    const limit = checkRateLimit('unlock');
    if (!limit.allowed) {
      setLockoutSeconds(limit.remainingSeconds);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) return;

    const limit = checkRateLimit('unlock');
    if (!limit.allowed) {
      setLockoutSeconds(limit.remainingSeconds);
      setError(`Lockout active: wait ${limit.remainingSeconds}s.`);
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const isValid = await verifyInternalPassphrase(passphrase);
      if (isValid) {
        resetRateLimit('unlock');
        setError(null);
        onSuccess();
        onClose();
      } else {
        const failed = recordFailedAttempt('unlock');
        if (failed.locked) {
          setLockoutSeconds(failed.remainingSeconds);
          setError(`Too many invalid attempts. Security lockout active for ${failed.remainingSeconds}s.`);
        } else {
          setError('Invalid internal passphrase or team token.');
        }
      }
    } catch {
      setError('Verification error. Please retry.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/70 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-card border border-line rounded-card p-6 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-line">
          <div className="flex items-center space-x-2 text-fg font-display font-bold text-base">
            <Lock className="w-4 h-4 text-havas-red" />
            <span>Unlock Enterprise Internal Mode</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate hover:text-fg hover:bg-line-soft transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[13px] text-slate leading-relaxed mb-4">
          Internal Mode reveals unredacted enterprise client names, local repository directories, agent class names, and compliance specifications.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block kicker-red mb-1">
              Enter Team Internal Passphrase
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={lockoutSeconds > 0 || isVerifying}
                value={passphrase}
                onChange={(e) => {
                  setPassphrase(e.target.value);
                  setError(null);
                }}
                placeholder="Enter authorized internal key"
                className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-havas-red font-mono pr-16 disabled:opacity-60"
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-mist">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-fg transition-colors"
                  aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Key className="w-3.5 h-3.5" />
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-havas-red mt-1.5 flex items-center space-x-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={lockoutSeconds > 0 || isVerifying || !passphrase.trim()}
            className="btn-red w-full !py-2.5 disabled:opacity-50 disabled:cursor-not-allowed justify-center"
          >
            {isVerifying ? (
              <span>Verifying...</span>
            ) : lockoutSeconds > 0 ? (
              <span>Locked ({lockoutSeconds}s)</span>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Internal Details</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
