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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white border border-havas-border rounded-xl shadow-2xl p-6 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-havas-border">
          <div className="flex items-center space-x-2 text-havas-black font-extrabold text-base">
            <Lock className="w-4 h-4 text-purple-600" />
            <span>Unlock Enterprise Internal Mode</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-black hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Internal Mode reveals unredacted enterprise client names, local repository directories, agent class names, and compliance specifications.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Enter Team Passphrase or Token
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passphrase}
                onChange={(e) => { setPassphrase(e.target.value); setError(false); }}
                placeholder="Hint: csa-internal-2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:border-purple-600 font-mono"
              />
              <Key className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
            {error && (
              <p className="text-[11px] text-red-600 mt-1.5 flex items-center space-x-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Invalid passphrase. Try &apos;csa-internal-2026&apos; or your team secret.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock Internal Details</span>
          </button>
        </form>
      </div>
    </div>
  );
};
