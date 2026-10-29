export type PillarType = 
  | 'intelligence'     // Decision Intelligence & Agents
  | 'orchestration'    // Orchestration & Workflow Automation
  | 'creative'         // Creative GenAI & Brand Governance
  | 'measurement'      // Measurement, Privacy & Attribution
  | 'commerce';        // Agentic Commerce & Discovery

export type MaturityStatus = 
  | 'Production' 
  | 'Client MVP' 
  | 'Enterprise POC' 
  | 'Strategic Architecture';

export interface SolutionMetric {
  label: string;
  value: string;
  change?: string;
  detail?: string;
}

export interface ArchitectureNode {
  step: string;
  name: string;
  description: string;
  tech: string;
}

export interface AISolution {
  id: string;
  title: string;
  tagline: string;
  pillar: PillarType;
  maturity: MaturityStatus;
  clientContext: {
    publicName: string;
    internalName: string;
    industry: string;
    region?: string;
  };
  problem: string;
  solution: string;
  architecture: {
    summary: string;
    nodes: ArchitectureNode[];
  };
  techStack: string[];
  metrics: SolutionMetric[];
  deliverables: string[];
  internalDeepDive?: {
    repoName?: string;
    repoPath?: string;
    architectureType?: string;
    keyAgents?: string[];
    compliance?: string;
  };
  featured?: boolean;
}

export interface PillarMetadata {
  id: PillarType;
  title: string;
  shortTitle: string;
  tagline: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  glowClass: string;
  accentHex: string;
  iconName: string;
  summary: string;
}
