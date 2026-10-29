import React, { useState } from 'react';
import { X, Lock, Unlock, Key, AlertCircle } from 'lucide-react';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passphrase.trim().toLowerCase();
    if (clean === 'csa-internal-2026' || clean === 'csa_team_sec_2026_x89' || clean === 'admin' || clean === 'havas') {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
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
            className="p-1 rounded text-slate hover:text-fg hover:bg-line-soft"
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
              Enter Team Passphrase or Token
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passphrase}
                onChange={(e) => { setPassphrase(e.target.value); setError(false); }}
                placeholder="Hint: csa-internal-2026"
                className="w-full px-3.5 py-2.5 bg-paper border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-havas-red font-mono"
              />
              <Key className="w-4 h-4 text-mist absolute right-3 top-3" />
            </div>
            {error && (
              <p className="text-[11px] text-havas-red mt-1.5 flex items-center space-x-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Invalid passphrase. Try &apos;csa-internal-2026&apos; or your team secret.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-red w-full !py-2.5"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock Internal Details</span>
          </button>
        </form>
      </div>
    </div>
  );
};
