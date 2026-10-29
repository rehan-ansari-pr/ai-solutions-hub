import React from 'react';
import { Sparkles, Shield, Cloud, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#07090E] py-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-display font-bold text-lg mb-2">
              <span className="text-white">CSA <span className="text-brand-orange">×</span> PivotRoots</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 font-mono">
                Havas Media Network
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Transforming enterprise marketing through autonomous AI agents, Bayesian econometrics on Google Meridian, cookieless first-party data backbones, and brand-governed multimodal synthesis.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Strategic Pillars
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Decision Intelligence & Agents</li>
              <li>Orchestration & Workflow Automation</li>
              <li>Creative GenAI & Brand Governance</li>
              <li>Measurement, Privacy & Attribution</li>
              <li>Agentic Commerce & Discovery (GEO)</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Infrastructure & Governance
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center space-x-1.5">
                <Cloud className="w-3.5 h-3.5 text-amber-400" />
                <span>Cloudflare Pages & Workers</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>DPDPA & GDPR Compliant</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <svg className="w-3.5 h-3.5 fill-current text-slate-300" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <a 
                  href="https://github.com/rehan-ansari-pr/ai-solutions-hub" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PivotRoots & CSA (Havas Media Network). All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0 font-mono text-[11px]">
            <span>Version 2.4.0</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
