import React, { useState } from 'react';
import { X, Lock, Unlock, Key, ShieldAlert } from 'lucide-react';

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
    // Allow either the team internal token or easy passphrase
    if (clean === 'csa-internal-2026' || clean === 'csa_team_sec_2026_x89' || clean === 'admin' || clean === 'havas') {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#0B0E17] border border-white/[0.12] rounded-3xl shadow-2xl p-6 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
            <Lock className="w-5 h-5" />
            <span>Unlock Enterprise Internal Mode</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Internal Mode reveals unredacted enterprise client names, local repository directories, agent class names, and confidential architecture details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Enter Team Passphrase or Token
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passphrase}
                onChange={(e) => { setPassphrase(e.target.value); setError(false); }}
                placeholder="Hint: csa-internal-2026"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/[0.1] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
              />
              <Key className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
            {error && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Invalid passphrase. Try &apos;csa-internal-2026&apos; or your team secret.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-glow-purple hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock Internal Mode</span>
          </button>
        </form>
      </div>
    </div>
  );
};
