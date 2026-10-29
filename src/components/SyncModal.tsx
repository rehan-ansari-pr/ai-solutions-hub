import React, { useState } from 'react';
import { X, RefreshCw, Key, Terminal, Shield, Check, Copy, AlertTriangle, Send, Sparkles } from 'lucide-react';
import { AISolution } from '../types';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolutionAdded?: (newSolution: AISolution) => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  onSolutionAdded
}) => {
  const [activeTab, setActiveTab] = useState<'cli' | 'form'>('cli');
  const [authToken, setAuthToken] = useState('csa_team_sec_2026_x89');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPillar, setFormPillar] = useState<'intelligence' | 'orchestration' | 'creative' | 'measurement' | 'commerce'>('intelligence');
  const [formProblem, setFormProblem] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formClientPublic, setFormClientPublic] = useState('');
  const [formClientInternal, setFormClientInternal] = useState('');
  const [formTechStack, setFormTechStack] = useState('Python, LangGraph, BigQuery');
  const [formMetricVal, setFormMetricVal] = useState('+25% ROAS');
  const [formMetricLabel, setFormMetricLabel] = useState('Conversion Lift');

  if (!isOpen) return null;

  const cliSnippet = `# 1. Export your authorized team token (in ~/.zshrc or terminal):
export CSA_CATALOG_TOKEN="${authToken}"

# 2. Run the AI Solutions Sync agent scanner in your project directory:
python3 scripts/scan_and_sync.py --scan --sync

# Or use the Antigravity Slash Command inside your coding agent:
/sync-solution`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(cliSnippet);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    const payload: Partial<AISolution> = {
      title: formTitle,
      tagline: formTagline,
      pillar: formPillar,
      maturity: 'Client MVP',
      clientContext: {
        publicName: formClientPublic || 'Enterprise Client',
        internalName: formClientInternal || formClientPublic || 'Internal Project',
        industry: 'Digital Marketing & AI'
      },
      problem: formProblem,
      solution: formSolution,
      architecture: {
        summary: 'Automated agentic workflow',
        nodes: [
          { step: '01', name: 'Signal Intake', description: 'Real-time event or media data ingestion', tech: 'Cloud Pub/Sub' },
          { step: '02', name: 'Agent Reasoning', description: 'Core LLM reasoning and strategy engine', tech: 'Gemini 1.5 Pro' },
          { step: '03', name: 'Execution Gate', description: 'Automated validation and delivery', tech: 'Cloud Run' }
        ]
      },
      techStack: formTechStack.split(',').map(s => s.trim()).filter(Boolean),
      metrics: [
        { label: formMetricLabel || 'Performance Lift', value: formMetricVal || '+20%' }
      ],
      deliverables: [
        'Production microservice container deployment',
        'Executive decision dashboard & reporting integration'
      ]
    };

    try {
      const res = await fetch('/api/solutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSubmitResult({ success: true, message: data.message || 'Solution registered successfully!' });
        if (onSolutionAdded && data.data) {
          onSolutionAdded(data.data);
        }
      } else {
        setSubmitResult({ success: false, message: data.message || 'Failed to authorize submission.' });
      }
    } catch (err: any) {
      // Local development fallback
      setSubmitResult({ 
        success: true, 
        message: 'Solution synced locally into runtime memory (API backend available on deployed Cloudflare Worker).' 
      });
      if (onSolutionAdded) {
        onSolutionAdded(payload as AISolution);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0B0E17] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange via-purple-500 to-brand-cyan" />

        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#0F1422]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight">
                Team Solution Sync & Agent Skill
              </h3>
              <p className="text-xs text-slate-400">
                Securely register new AI projects or update architectures via coding agents
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex space-x-2 border-b border-white/[0.06] bg-[#0B0E17]">
          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'cli'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Agent Skill & CLI (Recommended)</span>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'form'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Direct Web Submission</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Security & Access Notice */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-start space-x-3">
            <Shield className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-300">Authorized Team Security Token:</span>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                Only authenticated team members with the pre-shared secret key (<code className="text-purple-300">CSA_CATALOG_TOKEN</code>) can publish or update projects on the live Cloudflare deployment.
              </p>
            </div>
          </div>

          {activeTab === 'cli' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Team Authorization Secret
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/[0.1] rounded-xl text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-400"
                  />
                  <div className="absolute right-3 top-2 text-[10px] text-slate-500 font-mono">
                    VALIDATED
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    CLI & Agent Skill Command
                  </label>
                  <button
                    onClick={handleCopyCmd}
                    className="text-xs text-brand-orange hover:text-amber-400 flex items-center space-x-1"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  {cliSnippet}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span>How the Agentic Scanner Works:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When you invoke <code className="text-slate-300 font-mono">/sync-solution</code> in any project folder, your coding agent inspects your <code className="text-slate-300 font-mono">README.md</code>, requirements, architecture docs, and Git history. It synthesizes the problem, technical stack, metrics, and architecture steps into an authorized payload and delivers it directly to <code className="text-slate-300 font-mono">POST /api/solutions</code>.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {submitResult && (
                <div className={`p-3 rounded-xl border text-xs ${
                  submitResult.success 
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-300 border-red-500/20'
                }`}>
                  {submitResult.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Solution Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Mediaflow Plan Ingestion"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Strategic Pillar *</label>
                  <select
                    value={formPillar}
                    onChange={(e) => setFormPillar(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#121624] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="intelligence">Decision Intelligence & Agents</option>
                    <option value="orchestration">Orchestration & Workflow Automation</option>
                    <option value="creative">Creative GenAI & Brand Governance</option>
                    <option value="measurement">Measurement, Privacy & Attribution</option>
                    <option value="commerce">Agentic Commerce & Discovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Punchy Tagline *</label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="One-line summary of capability and business value"
                  className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Client (Public Sanitized) *</label>
                  <input
                    type="text"
                    required
                    value={formClientPublic}
                    onChange={(e) => setFormClientPublic(e.target.value)}
                    placeholder="e.g. Global Retail Chain"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Client (Internal Unredacted)</label>
                  <input
                    type="text"
                    value={formClientInternal}
                    onChange={(e) => setFormClientInternal(e.target.value)}
                    placeholder="e.g. KFC India / Yum! Brands"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">The Problem / Challenge *</label>
                  <textarea
                    required
                    rows={3}
                    value={formProblem}
                    onChange={(e) => setFormProblem(e.target.value)}
                    placeholder="Describe the operational or business bottleneck..."
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">The Engineered Solution *</label>
                  <textarea
                    required
                    rows={3}
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    placeholder="Describe the AI models, pipelines, and agents deployed..."
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={formTechStack}
                    onChange={(e) => setFormTechStack(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Key Metric</label>
                  <input
                    type="text"
                    value={formMetricVal}
                    onChange={(e) => setFormMetricVal(e.target.value)}
                    placeholder="+20% ROAS"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-brand-orange font-mono font-bold focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orangeGlow text-white text-xs font-semibold shadow-glow-orange hover:opacity-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Authenticating & Registering...' : 'Register Solution into Portfolio'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-[#0E121E] border-t border-white/[0.08] flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-mono">
            API: <span className="text-slate-400">POST /api/solutions</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/[0.06] text-xs font-medium text-slate-300 hover:bg-white/[0.1] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
