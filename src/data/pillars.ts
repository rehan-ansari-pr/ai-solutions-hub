import { PillarMetadata, PillarType } from '../types';

export const PILLARS: Record<PillarType, PillarMetadata> = {
  intelligence: {
    id: 'intelligence',
    title: 'Decision Intelligence & Agents',
    shortTitle: 'Intelligence',
    tagline: 'Text-to-query data lakes, autonomous anomaly detection, and predictive growth engines.',
    color: 'from-cyan-500 to-blue-600',
    accentHex: '#00D2FF',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    badgeBorder: 'border-cyan-500/30',
    glowClass: 'glow-cyan',
    iconName: 'BrainCircuit',
    summary: 'Transforming massive BigQuery and enterprise data warehouses into conversational, proactive intelligence layers that diagnose underperformance and recommend next best actions.'
  },
  orchestration: {
    id: 'orchestration',
    title: 'Orchestration & Workflow Automation',
    shortTitle: 'Orchestration',
    tagline: 'Multi-agent loops, media plan ingestion pipelines, and cross-channel marketing flywheels.',
    color: 'from-purple-500 to-indigo-600',
    accentHex: '#8B5CF6',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    badgeBorder: 'border-purple-500/30',
    glowClass: 'glow-purple',
    iconName: 'Workflow',
    summary: 'Autonomous agent swarms executing complex multi-step workflows across ingestion, validation, brief generation, and multi-channel campaign dispatch with human-in-the-loop gates.'
  },
  creative: {
    id: 'creative',
    title: 'Creative GenAI & Brand Governance',
    shortTitle: 'Creative AI',
    tagline: 'Brand playbook policy scoring, multimodal video generation, and Indic vernacular engines.',
    color: 'from-orange-500 to-amber-600',
    accentHex: '#FF5C00',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    badgeBorder: 'border-orange-500/30',
    glowClass: 'glow-orange',
    iconName: 'Sparkles',
    summary: 'Reason-before-render generative systems that enforce brand guidelines, eliminate visual hallucinations in regional scripts, and adapt long-form TVCs into high-performing short variants.'
  },
  measurement: {
    id: 'measurement',
    title: 'Measurement, Privacy & Attribution',
    shortTitle: 'Measurement',
    tagline: 'Google Meridian MMM studios, server-side GTM, attribution auditing, and DPDPA compliance.',
    color: 'from-emerald-500 to-teal-600',
    accentHex: '#10B981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    badgeBorder: 'border-emerald-500/30',
    glowClass: 'glow-green',
    iconName: 'BarChart3',
    summary: 'Cookieless first-party identity backbones, Bayesian marketing mix modeling on Google Meridian, headless mobile attribution fraud audits, and regulatory data governance.'
  },
  commerce: {
    id: 'commerce',
    title: 'Agentic Commerce & Discovery (GEO)',
    shortTitle: 'Agentic Commerce',
    tagline: 'Model Context Protocol (MCP) commerce servers, LLM.txt discovery, and generative search optimization.',
    color: 'from-rose-500 to-red-600',
    accentHex: '#E50200',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    badgeBorder: 'border-rose-500/30',
    glowClass: 'glow-orange',
    iconName: 'ShoppingBag',
    summary: 'Making brands discoverable, queryable, and transactable inside AI assistants (ChatGPT, Perplexity, Gemini) through live MCP catalog endpoints and Answer Engine Optimization (AEO).'
  }
};
