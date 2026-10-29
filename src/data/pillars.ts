import { PillarMetadata, PillarType } from '../types';

export const PILLARS: Record<PillarType, PillarMetadata> = {
  orchestration: {
    id: 'orchestration',
    title: 'Orchestration & Workflow Automation',
    shortTitle: 'Orchestration',
    sectionTag: 'ORCHESTRATION & AGENTIC WORKFLOWS',
    tagline: 'Autonomous agent swarms executing multi-channel campaign lifecycles and media plan ingestion.',
    summary: 'Autonomous agent swarms executing complex multi-step workflows across signal ingestion, validation, brief generation, and multi-channel campaign dispatch with human-in-the-loop gates.'
  },
  intelligence: {
    id: 'intelligence',
    title: 'Decision Intelligence & Agents',
    shortTitle: 'Intelligence',
    sectionTag: 'DECISION INTELLIGENCE & DATA LAKES',
    tagline: 'Conversational BigQuery text-to-query layers and Bayesian marketing mix modeling.',
    summary: 'Transforming massive BigQuery and enterprise data warehouses into conversational, proactive intelligence layers that diagnose underperformance and recommend next best actions.'
  },
  creative: {
    id: 'creative',
    title: 'Creative GenAI & Brand Governance',
    shortTitle: 'Creative AI',
    sectionTag: 'CREATIVE GEN-AI & BRAND GOVERNANCE',
    tagline: 'Dual-layer brand playbook enforcement, Indic vernacular typography, and dynamic video adaptation.',
    summary: 'Reason-before-render generative systems that enforce brand guidelines, eliminate visual hallucinations in regional scripts, and adapt long-form TVCs into high-performing short variants.'
  },
  measurement: {
    id: 'measurement',
    title: 'Measurement, Privacy & Attribution',
    shortTitle: 'Measurement',
    sectionTag: 'MEASUREMENT, PRIVACY & ATTRIBUTION',
    tagline: 'Cookieless server-side identity, zero-token MMP fraud auditing, and DPDPA consent ledgers.',
    summary: 'Cookieless first-party identity backbones, Bayesian marketing mix modeling on Google Meridian, headless mobile attribution fraud audits, and regulatory data governance.'
  },
  commerce: {
    id: 'commerce',
    title: 'Agentic Commerce & Discovery (GEO)',
    shortTitle: 'Agentic Commerce',
    sectionTag: 'AGENTIC COMMERCE & DISCOVERY (GEO)',
    tagline: 'Model Context Protocol (MCP) tool endpoints, LLM.txt discovery, and generative search optimization.',
    summary: 'Making brands discoverable, queryable, and transactable inside AI assistants (ChatGPT, Perplexity, Gemini) through live MCP catalog endpoints and Answer Engine Optimization (AEO).'
  }
};
