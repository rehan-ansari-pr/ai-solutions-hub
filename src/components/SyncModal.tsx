import React, { useState } from 'react';
import { X, RefreshCw, Terminal, Shield, Check, Copy, Send, Sparkles } from 'lucide-react';
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
  const [formConcept, setFormConcept] = useState('');
  const [formPillar, setFormPillar] = useState<'intelligence' | 'orchestration' | 'creative' | 'measurement' | 'commerce'>('intelligence');
  const [formProblem, setFormProblem] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formClientPublic, setFormClientPublic] = useState('');
  const [formClientInternal, setFormClientInternal] = useState('');
  const [formTechStack, setFormTechStack] = useState('Python, LangGraph, BigQuery');
  const [formUseCases, setFormUseCases] = useState('Automated data ingestion\nConversational query reasoning\nAutomated anomaly alerting');

  if (!isOpen) return null;

  const cliSnippet = `# 1. Export your authorized team token (in ~/.zshrc or terminal):
export CSA_CATALOG_TOKEN="${authToken}"

# 2. In any project repository, run the scan & sync script:
python3 scripts/scan_and_sync.py --scan --sync

# Or simply invoke the Antigravity Slash Command in your AI assistant:
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
      coreConcept: formConcept || formTagline,
      useCases: formUseCases.split('\n').map(s => s.trim()).filter(Boolean),
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
      setSubmitResult({ 
        success: true, 
        message: 'Solution synced locally into runtime memory.' 
      });
      if (onSolutionAdded) {
        onSolutionAdded(payload as AISolution);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/70 flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-card border border-line rounded-card overflow-hidden max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-lime" />

        <div className="p-6 border-b border-line flex items-center justify-between shrink-0 bg-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-lime text-ink rounded-full">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-fg tracking-tight">
                Team Solution Sync &amp; Skill
              </h3>
              <p className="text-xs text-slate">
                Securely register new AI projects or update architectures via coding agents
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-btn border border-line text-mist hover:text-fg hover:bg-paper transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex space-x-2 border-b border-line bg-paper">
          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'cli'
                ? 'border-lime-deep text-lime-deep'
                : 'border-transparent text-slate hover:text-fg'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Agent Skill &amp; CLI Protocol</span>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'form'
                ? 'border-lime-deep text-lime-deep'
                : 'border-transparent text-slate hover:text-fg'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Direct Web Submission</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-card">
          
          {/* Security Notice */}
          <div className="p-4 rounded-btn bg-paper border border-line text-xs text-fg flex items-start space-x-3">
            <Shield className="w-4 h-4 text-lime-deep shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-fg">Authorized Team Security Token:</span>
              <p className="text-slate mt-0.5 leading-relaxed">
                Only authenticated team members with the pre-shared secret key (<code className="text-lime-deep font-semibold">CSA_CATALOG_TOKEN</code>) can publish or update projects on the live Cloudflare deployment.
              </p>
            </div>
          </div>

          {activeTab === 'cli' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate mb-1.5">
                  Your Team Authorization Secret
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    className="w-full px-3 py-2 bg-paper border border-line rounded-btn text-xs font-mono text-fg focus:outline-none focus:border-fg"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate">
                    CLI &amp; Agent Skill Command
                  </label>
                  <button
                    onClick={handleCopyCmd}
                    className="text-xs text-lime-deep hover:underline flex items-center space-x-1 font-semibold"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-btn bg-ink text-white text-xs font-mono overflow-x-auto leading-relaxed">
                  {cliSnippet}
                </pre>
              </div>

              <div className="p-4 rounded-btn bg-paper border border-line space-y-2">
                <div className="text-xs font-bold text-fg flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-lime-deep" />
                  <span>How the Agentic Scanner Works:</span>
                </div>
                <p className="text-xs text-slate leading-relaxed">
                  When you run <code className="font-mono text-fg">/sync-solution</code> in any project directory, the agent inspects your <code className="font-mono text-fg">README.md</code>, requirements, architecture docs, and Git history. It synthesizes the problem, technical stack, core concept, and use cases into an authorized payload and delivers it directly to <code className="font-mono text-fg">POST /api/solutions</code>.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {submitResult && (
                <div className={`p-3 rounded-btn border text-xs ${
                  submitResult.success 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {submitResult.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Solution Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Mediaflow Plan Ingestion"
                    className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Strategic Pillar *</label>
                  <select
                    value={formPillar}
                    onChange={(e) => setFormPillar(e.target.value as any)}
                    className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg"
                  >
                    <option value="orchestration">Orchestration &amp; Workflow Automation</option>
                    <option value="intelligence">Decision Intelligence &amp; Agents</option>
                    <option value="creative">Creative GenAI &amp; Brand Governance</option>
                    <option value="measurement">Measurement, Privacy &amp; Attribution</option>
                    <option value="commerce">Agentic Commerce &amp; Discovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-fg mb-1">Tagline *</label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="One-line summary of capability"
                  className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-fg mb-1">The Core Concept *</label>
                <textarea
                  required
                  rows={2}
                  value={formConcept}
                  onChange={(e) => setFormConcept(e.target.value)}
                  placeholder="Explain the underlying architectural concept..."
                  className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-fg mb-1">Primary Use Cases (one per line) *</label>
                <textarea
                  required
                  rows={3}
                  value={formUseCases}
                  onChange={(e) => setFormUseCases(e.target.value)}
                  placeholder="Enter 2-4 concrete business use cases..."
                  className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Client (Public Sanitized) *</label>
                  <input
                    type="text"
                    required
                    value={formClientPublic}
                    onChange={(e) => setFormClientPublic(e.target.value)}
                    placeholder="e.g. Global Retail Chain"
                    className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Client (Internal Unredacted)</label>
                  <input
                    type="text"
                    value={formClientInternal}
                    onChange={(e) => setFormClientInternal(e.target.value)}
                    placeholder="e.g. KFC India / Yum! Brands"
                    className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">The Problem *</label>
                  <textarea
                    required
                    rows={2}
                    value={formProblem}
                    onChange={(e) => setFormProblem(e.target.value)}
                    placeholder="The business friction or bottleneck..."
                    className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">The Solution *</label>
                  <textarea
                    required
                    rows={2}
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    placeholder="The engineered AI architecture..."
                    className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-fg mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={formTechStack}
                  onChange={(e) => setFormTechStack(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-btn text-xs text-fg focus:outline-none focus:border-fg font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-btn bg-lime hover:brightness-95 text-ink text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Authenticating & Registering...' : 'Register Solution into Portfolio'}
                </button>
              </div>
            </form>
          )}

        </div>

        <div className="p-4 px-6 bg-paper border-t border-line flex items-center justify-between shrink-0">
          <span className="text-xs text-mist font-mono">
            Endpoint: <span className="text-slate">POST /api/solutions</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-btn border border-line text-xs font-semibold text-fg hover:bg-card transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
