import React from 'react';
import { PILLARS } from '../data/pillars';
import { PivotRootsLogo, PILLAR_ORDER } from './ui';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24">
      <div className="bg-card border-t border-line">
        <div className="page py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <PivotRootsLogo className="h-7" tone="ink" />
            <p className="mt-4 text-[13px] text-slate max-w-md leading-relaxed">
              Transforming enterprise marketing operations through autonomous AI agents, Bayesian econometrics on Google
              Meridian, cookieless first-party data backbones, and brand-governed generative systems.
            </p>
          </div>
          <div>
            <div className="kicker">Strategic Capability Pillars</div>
            <ul className="mt-3 space-y-1.5 text-[13px] text-slate">
              {PILLAR_ORDER.map((k) => (
                <li key={k}>{PILLARS[k].title}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="kicker">Governance &amp; Deployment</div>
            <ul className="mt-3 space-y-1.5 text-[13px] text-slate">
              <li>Cloudflare Pages &amp; Edge Functions</li>
              <li>DPDPA &amp; RBI Compliance Gated</li>
              <li>
                <a
                  href="https://github.com/rehan-ansari-pr/ai-solutions-hub"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lime-deep underline underline-offset-2 hover:text-fg"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="page pb-6 text-[11px] text-slate flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>&copy; {new Date().getFullYear()} HAVAS Media Network &bull; CSA &bull; PivotRoots. All rights reserved.</span>
          <span className="ml-auto inline-flex items-center gap-2 font-mono">
            Production Catalog <span className="text-mist">&bull;</span>
            <span className="live-dot" /> All Systems Operational
          </span>
        </div>
      </div>
      <div className="bg-havas-black">
        <div className="page py-5 flex items-center justify-between gap-4">
          <img src="/havas_logo_alt.png" alt="HAVAS" className="h-4 w-auto object-contain" />
          <span className="text-[11px] text-white/60">Part of Havas Media Network</span>
        </div>
      </div>
    </footer>
  );
};
