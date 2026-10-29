import { AISolution } from '../types';

export const INITIAL_SOLUTIONS: AISolution[] = [
  {
    id: 'artiscents-flywheel',
    title: 'Multi-Agent AI Marketing Flywheel',
    tagline: '37 Cloud Run microservices & 21 autonomous AI agents powering signal-driven campaign delivery with human confidence gates.',
    coreConcept: 'Signal-driven multi-agent orchestration mesh that replaces manual 4-week campaign coordination with real-time signal intake, strategic reasoning, synthetic persona pre-testing, and automated omni-channel dispatch.',
    useCases: [
      'Real-Time Signal-to-Campaign Activation: Ingests weather, competitor discount shifts, and inventory triggers to deploy contextual campaigns in <45 minutes.',
      'Synthetic Consumer Persona Pre-Testing: 40+ simulated buyer twins stress-test messaging resonance, tone, and offers before spending ad budget.',
      'Closed-Loop Creative Recalibration: Connects live delivery metrics back to BigQuery institutional memory to refine future agent prompt weights.',
      'Human-in-the-Loop Confidence Routing: Autonomous delivery when agent confidence exceeds threshold; routes borderline assets to an operator gate.'
    ],
    pillar: 'orchestration',
    maturity: 'Production',
    featured: true,
    clientContext: {
      publicName: 'Direct-to-Consumer Luxury Fragrance & Multi-Brand Portfolio',
      internalName: 'Artiscents / Multi-Tenant DTC Flywheel (with Kotak 811, Glanbia, Mazda adaptations)',
      industry: 'DTC Luxury & Enterprise Retail',
      region: 'India / APAC'
    },
    problem: 'Traditional campaign creation requires 14–21 days of manual coordination across creative brief writing, copy drafts, visual design, legal checks, and channel deployment. In competitive DTC retail, delays result in missed cultural moments, seasonal surges, and competitive counter-moves.',
    solution: 'Constructed an enterprise GCP-native marketing operating system comprising 37 Cloud Run microservices and 21 specialized AI agents. Built with a vendor-neutral Provider Abstraction Layer (PAL), the flywheel listens for market and inventory signals, performs strategic reasoning, stress-tests ideas with synthetic personas, generates multimodal assets via Imagen 3/Veo 3, and routes borderline assets to an interactive Human-in-the-Loop Gate.',
    architecture: {
      summary: 'Signal Ingestion (Pub/Sub) → BigQuery Institutional Memory → 21-Agent Swarm (Vertex AI/ADK) → Synthetic Persona Validation → Multimodal Asset Rendering → Human Gate UI → Automated Omni-Channel Delivery.',
      nodes: [
        { step: '01', name: 'Signal Ingestion Layer', description: 'Real-time Pub/Sub streams capturing market triggers, stock levels, competitor pricing, and weather signals', tech: 'Cloud Pub/Sub · Cloud Run' },
        { step: '02', name: 'Institutional Memory', description: 'BigQuery vector memory storing historical campaign learnings, brand rules, and worked/unworked corpus', tech: 'BigQuery · AlloyDB · Vector Search' },
        { step: '03', name: '21-Agent Swarm (PAL)', description: 'Specialized swarms: Signal Analyst (A1), Strategist (A2), Brief Writer (A3), Guardian (A4), Persona Simulator (A5), Copy (A6), Visual (A7)', tech: 'Vertex AI · Google ADK · Gemini 1.5 Pro' },
        { step: '04', name: 'Synthetic Persona Validation', description: 'Simulated consumer panels evaluate resonance, tone of voice, and price resistance in <60 seconds', tech: 'Gemini 2.0 Flash · Persona Models' },
        { step: '05', name: 'Multimodal Generation', description: 'Autonomous rendering of static images, carousels, and video snippets formatted for all channels', tech: 'Imagen 3 · Veo 3 · Lyria 2 · React UI' },
        { step: '06', name: 'Human Gate & Dispatch', description: 'Dynamic confidence routing requiring human signoff only for borderline assets before dispatch', tech: 'Next.js UI · Meta CAPI · Gupshup WhatsApp' }
      ]
    },
    techStack: ['GCP Cloud Run', 'BigQuery', 'AlloyDB', 'Google ADK', 'Gemini 1.5 Pro', 'Imagen 3', 'Veo 3', 'Lyria 2', 'React 18', 'FastAPI', 'Terraform'],
    deliverables: [
      'GCP Infrastructure-as-Code (Terraform for Cloud Run, Pub/Sub, BigQuery, IAM in asia-south1)',
      'Provider Abstraction Layer (PAL) preventing direct LLM vendor lock-in',
      'Dynamic Human-in-the-Loop Review Dashboard with automated confidence routing',
      'Multi-Tenant Tenant Configuration Engine with isolated brand memory and visual guidelines'
    ],
    internalDeepDive: {
      repoName: 'Artiscents Flywheel',
      repoPath: '~/Documents/Projects/Artiscents Flywheel',
      architectureType: 'Decoupled Event-Driven Microservices (37 Cloud Run Services)',
      keyAgents: ['SignalAnalystAgent', 'CreativeStrategistAgent', 'BrandPlaybookGuardian', 'HumanGateRouter'],
      compliance: 'Contact frequency fatigue caps, budget burn rate protection, zero PII in model training'
    }
  },
  {
    id: 'brand-mitra',
    title: 'Brand Mitra: Agentic Creative Compliance Engine',
    tagline: 'Dual-layer deterministic CV and multimodal agentic gate ensuring 100% brand playbook adherence with section-level remediation.',
    coreConcept: 'A two-layer inspection engine combining deterministic computer vision algorithms for zero-token hard layout rules with multimodal Gemini Vision for tone and aesthetics, delivering clause-specific remediation advice.',
    useCases: [
      'Deterministic Pre-Flight Gate: Checks brand hex color tolerances, logo clear-space margins, and contrast ratios in milliseconds with zero LLM costs.',
      'Multimodal Tone & Copy Verification: Inspects headline urgency, brand persona fit, and legal warranty claims against brand playbook clauses.',
      'Actionable Clause-Level Remediation: Generates exact remediation steps tied to the brand book rather than providing unhelpful composite scores.',
      'Competitor Benchmark Scraping: Ingests live competitor campaigns via Apify to evaluate visual differentiation across categories.'
    ],
    pillar: 'creative',
    maturity: 'Client MVP',
    featured: true,
    clientContext: {
      publicName: 'Global Industrial Conglomerate / Steel & Building Materials Enterprise',
      internalName: 'Tata Steel Digital AOR / Havas (Tata Steel Aashiyana)',
      industry: 'Industrial & Building Materials',
      region: 'India'
    },
    problem: 'Multiple creative agencies generate hundreds of digital banners each month. Manual compliance reviews take days, cause campaign launch bottlenecks, and frequently allow off-palette hex colors, improper logo clearances, and weak legal disclosures into live media.',
    solution: 'Built Brand Mitra, an AI-powered visual and copy compliance engine featuring a two-layer inspection gate. Layer 1 uses deterministic computer vision to check hex colors, logo safe zones, and typography rules in milliseconds with zero LLM costs; Layer 2 uses Google ADK and Gemini 2.0 Flash to evaluate copy tone, aesthetic quality, and playbook alignment, providing clause-specific remediation advice.',
    architecture: {
      summary: '2-Layer Gate: Deterministic Computer Vision Hard Rules → Google ADK / Gemini 2.0 Flash Semantic Scorer → Composite Decision Router.',
      nodes: [
        { step: '01', name: 'Playbook Rule Extractor', description: 'Digitizes complex multi-page PDF brand guidelines into semantic policy vectors and hard rule constraints', tech: 'PDF Plumber · Vector Store' },
        { step: '02', name: 'Deterministic CV Gate', description: 'Algorithmic pixel analysis verifying exact hex color palette, logo clear-space margins, and contrast ratios', tech: 'Pillow · OpenCV · NumPy' },
        { step: '03', name: 'Multimodal Vision Inspector', description: 'Gemini 2.0 Flash evaluates layout balance, visual hierarchy, subject framing, and brand personality', tech: 'Gemini 2.0 Flash Vision' },
        { step: '04', name: 'Tone of Voice Scorer', description: 'NLP reasoning agent analyzing headline copy, CTA urgency, and statutory warranty claims against tone guides', tech: 'Google ADK · Gemini 1.5 Pro' },
        { step: '05', name: 'Decision Router & Feedback', description: 'Routes assets to Pass (>=70), Human Review (60–69), or Rework (<60) with clause-level remediation steps', tech: 'FastAPI · SQLite Audit Trail' }
      ]
    },
    techStack: ['Python 3.12', 'FastAPI', 'Google ADK', 'Gemini 2.0 Flash', 'Docker', 'OpenCV', 'Pillow', 'SQLite', 'React'],
    deliverables: [
      'Containerized FastAPI microservice with interactive Swagger and visual inspection dashboard',
      'Dual-Layer Deterministic + LLM Architecture saving token costs on obvious failures',
      'Meta Ad Library Scraper integration (Apify) pulling competitor and brand ads for benchmark scoring',
      'Immutable SQLite audit log tracking every revision, score breakdown, and compliance certificate'
    ],
    internalDeepDive: {
      repoName: 'Brand Mitra - Agentic Creative Scoring',
      repoPath: '~/Documents/Projects/Brand Mitra - Agentic Creative Scoring',
      architectureType: 'Dual-Layer Deterministic CV + Gemini Multimodal Vision API',
      keyAgents: ['PlaybookPolicyExtractor', 'DeterministicHardRuleValidator', 'SemanticAestheticScorer'],
      compliance: 'Strict adherence to Tata Steel brand book specifications and statutory advertising standards'
    }
  },
  {
    id: 'echo-mmm-studio',
    title: 'Echo: MMM Automation Studio on Google Meridian',
    tagline: 'End-to-end Bayesian Marketing Mix Modeling platform powered by Google Meridian, reducing econometric modeling cycles from 12 weeks to < 1 hour.',
    coreConcept: 'An agentic econometrics studio that automates raw media profiling, prior elicitation, and Markov Chain Monte Carlo (MCMC) Bayesian regression on Google Meridian with an interactive human approval gate at every step.',
    useCases: [
      'Automated Data Profiling & Reversible Repairs: Ingests raw media files, identifies schema blockers, and performs non-destructive data repairs.',
      'Multicollinearity & VIF Diagnostics: Evaluates Variance Inflation Factors and cross-channel correlation heatmaps to prevent fit instability.',
      'Bayesian Prior Calibration: Elicits industry lift tests and historical performance to configure informative ROI priors and adstock decay knots.',
      'Executive What-If Budget Optimizer: Simulates quarterly spend scenarios to calculate marginal ROAS curves and budget reallocation recommendations.'
    ],
    pillar: 'intelligence',
    maturity: 'Production',
    featured: true,
    clientContext: {
      publicName: 'Enterprise Multi-Brand Consumer Portfolios',
      internalName: 'Echo MMM Studio (Demonstrated on Titan Eye+, CoinDCX, Google AI Summit)',
      industry: 'Enterprise Retail, Fintech & FMCG',
      region: 'Global / APAC'
    },
    problem: 'Traditional econometrics and MMM take 8–16 weeks of senior data scientist effort per cycle, cost upwards of $100K, operate as opaque black boxes, and cannot adapt quickly enough to optimize modern digital and omni-channel media budgets in a privacy-first world.',
    solution: 'Built Echo, an agentic Marketing Mix Modeling studio powered by Google Meridian 1.6.2 (TensorFlow Probability). Features a guided 10-stage interactive workflow: data profiling, reversible schema repairs, collinearity diagnosis (VIF), Bayesian prior calibration, MCMC model fitting with live SSE streaming, and an embedded Groq (Llama 3.3-70B) copilot with a sub-second simulation fallback.',
    architecture: {
      summary: '10-Stage Guided Workflow: Upload → Diagnostic → Repair → EDA → Define Model → Collinearity → Priors → MCMC Run → Optimization & Dashboards.',
      nodes: [
        { step: '01', name: 'Raw Media Ingestion', description: 'Uploads raw weekly/daily spend, impressions, GRPs, and sales metrics with auto column role inference', tech: 'Pandas · Parquet' },
        { step: '02', name: 'Data Doctor & Profiler', description: 'Autonomous agent detecting schema gaps, negative values, and outliers with staged reversible repairs', tech: 'Python · Scikit-Learn' },
        { step: '03', name: 'Collinearity & VIF Guard', description: 'Calculates Variance Inflation Factors and correlation heatmaps to prevent multicollinearity fit instability', tech: 'NumPy · Seaborn Matrix' },
        { step: '04', name: 'Bayesian Priors Calibration', description: 'Translates brand historical lift tests and benchmarks into calibrated lognormal ROI priors and decay knots', tech: 'Google Meridian · Bayesian Priors' },
        { step: '05', name: 'Meridian MCMC Engine', description: 'Fits hierarchical Bayesian model estimating channel adstock, saturation curves, and baseline sales', tech: 'Google Meridian 1.6.2 · TFP' },
        { step: '06', name: 'Copilot & Scenario Optimizer', description: 'Embedded Groq Llama 3.3-70B copilot providing contextual dataset reasoning and budget reallocations', tech: 'Groq API · Recharts · React 18' }
      ]
    },
    techStack: ['Google Meridian 1.6.2', 'TensorFlow Probability', 'Python 3.11', 'FastAPI', 'React 18', 'TypeScript', 'Groq (Llama 3.3-70B)', 'Cloud Run'],
    deliverables: [
      'Interactive 10-Stage React 18 Dashboard with human approval gates between workflow stages',
      'FastAPI Backend orchestrating containerized Google Meridian MCMC runs on Cloud Run',
      'Nginx reverse-proxy single-origin architecture eliminating CORS vulnerabilities',
      'Real-time Budget Optimizer with exportable C-suite executive briefings'
    ],
    internalDeepDive: {
      repoName: 'Echo MMM Studio',
      repoPath: '~/Documents/Projects/Echo MMM Studio',
      architectureType: 'FastAPI Backend + Dual React Frontends (Client & Admin) + Meridian Engine',
      keyAgents: ['DataDoctorProfiler', 'MeridianMCMCOrchestrator', 'GroqReasoningCopilot'],
      compliance: 'Privacy-safe aggregate modeling requiring 0 personal identifiers or third-party cookies'
    }
  },
  {
    id: '6thstreet-marketing-os',
    title: '6thStreet: GenAI Marketing OS & Full-Stack Measurement Audit',
    tagline: 'Remediated 210M fake conversions in GA4/AppsFlyer while deploying an autonomous competitor intelligence-to-campaign reactive engine.',
    coreConcept: 'Dual-module platform combining full-funnel attribution audit (purging corrupted browsing conversions from Smart Bidding) with a real-time competitor scraper and reactive campaign generator.',
    useCases: [
      'Smart Bidding Pollution Cleanup: Stripped 210M micro-browsing interactions from primary conversion actions, stabilizing Google Ads automated bidding.',
      'Real-Time Competitor Drop Scraping (Prism): Headless crawlers continuously monitor rival flash sales, discount depths, and push notifications.',
      'Bilingual Counter-Campaign Generation (Flywheel): Synthesizes competitor promotions into on-brand Arabic and English reactive creatives in <4 hours.',
      'MMP Cost Sync Remediation: Repaired broken ad partner cost reporting integrations to recover visibility into AED 1.13M of ad revenue.'
    ],
    pillar: 'commerce',
    maturity: 'Client MVP',
    featured: true,
    clientContext: {
      publicName: 'Leading GCC Fast Fashion & Lifestyle E-Commerce Retailer',
      internalName: '6thStreet.com (Apparel Group, UAE/KSA/Kuwait)',
      industry: 'Fashion & E-Commerce',
      region: 'GCC (Middle East)'
    },
    problem: '6thStreet faced severe attribution distortion: 210 million fake conversions in 28 days (a 3,594% fake conversion rate) due to browsing events marked as primary conversions in GA4, poisoning Google Ads bidding. Simultaneously, top mobile channels (RTB House with AED 1.13M revenue) had broken cost syncs, while competitors (Namshi, Styli, SIVVI) dominated flash promotions.',
    solution: 'Executed a comprehensive dual-tier solution: (1) Full-stack measurement remediation untangling GA4 360 and AppsFlyer conversion hierarchies and fixing broken cost APIs; (2) GenAI Marketing OS combining Prism (real-time competitor scraping) and Flywheel (instant on-brand counter-campaign generation) to deploy reactive promotions in under 4 hours.',
    architecture: {
      summary: 'Measurement Remediation (GA4 360/AppsFlyer) + Competitor Scraping (Prism) → Prism Signal Bridge → Reactive Campaign Engine (Flywheel).',
      nodes: [
        { step: '01', name: 'Measurement Reconciler', description: 'Eliminated 210M micro-browsing events from conversion tagging, protecting Google Ads bidding', tech: 'GA4 360 Admin API · BigQuery' },
        { step: '02', name: 'Cost Integration Healer', description: 'Fixed broken reporting syncs across ad partners, recovering AED 1.13M in unmeasured revenue', tech: 'AppsFlyer Reporting API' },
        { step: '03', name: 'Prism Competitor Scraper', description: 'Monitors competitor flash sales, discount depths, and push notifications across Namshi and Styli', tech: 'Playwright · Apify Scrapers' },
        { step: '04', name: 'Prism Signal Bridge', description: 'Streams competitor discount signals into the Flywheel activation engine in real time', tech: 'FastAPI · Cloud Pub/Sub' },
        { step: '05', name: 'Bilingual Creative Generator', description: 'Auto-generates localized Arabic and English ad copy and banners compliant with GCC/VAT rules', tech: 'Claude 3.5 Sonnet · Imagen 3' },
        { step: '06', name: 'Omni-Channel Activation', description: 'Dispatches counter-promotions to MoEngage, Meta Ads, and Google Performance Max', tech: 'MoEngage API · Meta Marketing API' }
      ]
    },
    techStack: ['GA4 360', 'AppsFlyer API', 'BigQuery', 'Playwright', 'Claude 3.5 Sonnet', 'FastAPI', 'React 18', 'Cloud Run'],
    deliverables: [
      'Comprehensive Full-Funnel Attribution Audit Playbook fixing GA4 360 and AppsFlyer discrepancies',
      'Prism Headless Competitor Intelligence Scraper monitoring rival catalogs and promotions',
      'Prism-Flywheel Signal Bridge automating reactive marketing trigger creation',
      'Bilingual Arabic-English Generative Ad Studio with regional GCC compliance checks'
    ],
    internalDeepDive: {
      repoName: '6th Street',
      repoPath: '~/Documents/Projects/6th Street',
      architectureType: 'Dual-Engine: Prism (Intelligence) + Flywheel (Activation)',
      keyAgents: ['CompetitorScraperAgent', 'AttributionSanitizer', 'BilingualCampaignStrategist'],
      compliance: 'Strict adherence to GCC advertising laws, VAT pricing disclosures, and Ramadan sensitivity'
    }
  },
  {
    id: 'cwh-sgtm-cdp',
    title: 'Chemist Warehouse: Server-Side Tracking & First-Party Identity Hub',
    tagline: 'High-availability Server-Side GTM cluster & The Trade Desk Realtime ID integration achieving 99.4% transaction parity under browser cookie deprecation.',
    coreConcept: 'Enterprise server-side event pipeline routing web conversions through a first-party subdomain proxy, tokenizing Trade Desk First-Party Cookie IDs (TDID) into an enterprise CDP, and validating peak retail transactions.',
    useCases: [
      'Cookieless Conversion Tracking: Mitigates 7-day Safari ITP truncation and ad blockers via custom Cloudflare first-party proxies.',
      'Trade Desk Realtime ID Streaming: Captures client-side first-party cookie IDs and injects them server-side into Meiro CDP for programmatic activation.',
      'Black Friday Funnel Validation: 25 interactive diagnostic reports validating parity across add-to-cart, checkout, and purchase events.',
      'Zero-Trust Enterprise Portal: Houses analytics audit reports behind Cloudflare Zero Trust OTP authentication restricted to client domains.'
    ],
    pillar: 'measurement',
    maturity: 'Production',
    featured: true,
    clientContext: {
      publicName: 'Leading Retail Pharmacy & Health Omni-Channel Chain',
      internalName: 'Chemist Warehouse Australia (CWH) & Ultra Beauty Replatforming',
      industry: 'Retail Pharmacy & E-Commerce',
      region: 'Australia / APAC'
    },
    problem: 'Browser cookie restrictions (Safari ITP, Chrome Privacy Sandbox) and client-side ad blockers caused a 30%+ drop in measurable conversions and landing page attribution loss during Black Friday and peak sales events, while third-party audience streams needed to flow into Meiro CDP without client-side latency.',
    solution: 'Designed and deployed a high-availability Server-Side Google Tag Manager (sGTM) cluster on custom cloud infrastructure. Integrated The Trade Desk First-Party Cookie ID (`ttd_TDID`) directly into the sGTM event bus and Meiro CDP, backed by an interactive analytics validation hub of 25 standalone diagnostic reports protected by Cloudflare Zero Trust OTP.',
    architecture: {
      summary: 'Client-Side Tagging → First-Party Domain Proxy → Server-Side GTM Cluster → Trade Desk Identity Resolution → Meiro CDP & BigQuery.',
      nodes: [
        { step: '01', name: 'Client-Side Tracking Container', description: 'Lightweight GTM-M86X7T3D container capturing user interactions and first-party cookie IDs', tech: 'Client-Side GTM' },
        { step: '02', name: 'First-Party Proxy Subdomain', description: 'Routes data through customer domain, extending cookie persistence beyond 7-day Safari ITP caps', tech: 'Cloudflare Workers · DNS' },
        { step: '03', name: 'Server-Side GTM Cluster', description: 'GTM-5RJVJ89F container cluster processing high-concurrency peak transaction event streams', tech: 'Server-Side GTM · Cloud Run' },
        { step: '04', name: 'Trade Desk Realtime ID Stream', description: 'Injects First-Party Cookie ID (ttd_TDID) into server events for Meiro CDP audience resolution', tech: 'The Trade Desk API · Meiro CDP' },
        { step: '05', name: 'Zero-Trust Analytics Hub', description: '25 interactive diagnostic reports monitoring transaction reconciliation, signoffs, and funnel health', tech: 'Cloudflare Access (Zero Trust OTP)' }
      ]
    },
    techStack: ['Server-Side GTM', 'Cloudflare Workers', 'Cloudflare Zero Trust', 'The Trade Desk UID/TDID', 'Google Analytics 4', 'BigQuery', 'Meiro CDP'],
    deliverables: [
      'Dual-Container GTM Architecture (Client-Side GTM-M86X7T3D + Server-Side GTM-5RJVJ89F)',
      'The Trade Desk Realtime ID First-Party Cookie tag integration for Meiro CDP resolution',
      'Cloudflare Worker hosted Analytics Intelligence Hub with automated deployment scripts',
      'Comprehensive Black Friday Peak Trading UAT signoff validation suites'
    ],
    internalDeepDive: {
      repoName: 'CWH - Master',
      repoPath: '~/Documents/Projects/CWH - Master',
      architectureType: 'Cloudflare Worker Hub + Server-Side GTM Infrastructure',
      keyAgents: ['TransactionReconciler', 'FirstPartyIDStreamer', 'FunnelAuditValidator'],
      compliance: 'Zero-Trust enterprise authentication restricted to @chemistwarehouse.com.au and agency domains'
    }
  },
  {
    id: 'nivasa-indic-engine',
    title: 'Nivāsa Finance: Indic Typography-Safe Generative Engine',
    tagline: 'Hybrid vernacular ad generator combining Sarvam-M copy, headless Chromium vector typography shaping, and locked compliance disclaimers.',
    coreConcept: 'Decoupled hybrid rendering pipeline that separates vernacular copy synthesis (Sarvam-M) from programmatic vector typography (Chromium HarfBuzz) and diffusion background generation, guaranteeing 100% Indic script accuracy.',
    useCases: [
      'Zero-Corruption Vernacular Typography: Renders complex Kannada and South Indian conjuncts (matras/ligatures) without diffusion font artifacts.',
      'Immutable Regulatory Disclaimers: Hardcodes mandatory RBI NBFC interest rate disclosure lines, completely overriding generative drift.',
      'Batch Multi-Aspect Ratio Packaging: Simultaneously outputs native 1:1 Feed, 9:16 Story, 16:9 Display, and 4:5 Mobile Grid assets.',
      'Conversational Voice Loan Agent: Demonstrates automated inbound telephone loan qualification in colloquial Kannada using Sarvam AI TTS and Vapi.'
    ],
    pillar: 'creative',
    maturity: 'Client MVP',
    clientContext: {
      publicName: 'Regulated Affordable Housing Finance Institution',
      internalName: 'Nivāsa Finance (nivasafinance.com)',
      industry: 'BFSI / Affordable Housing NBFC',
      region: 'South India (Karnataka)'
    },
    problem: 'Mainstream image diffusion models (FLUX, Midjourney, Stable Diffusion) garble non-Latin Indic scripts, completely corrupting Kannada conjuncts (e.g. ಚತುರ್ಥಿ, ಸಾಲ) and hallucinating illegal loan terms, creating critical regulatory liabilities under RBI guidelines.',
    solution: 'Architected a hybrid decoupled rendering engine. Copy generation is handled by Sarvam-M (NVIDIA NIM) specialized in Indian languages; typography is rendered through headless Chromium using HarfBuzz vector text shaping directly over HTML/CSS canvases for 100% script accuracy; statutory financial disclosures are hardcoded and locked; and backgrounds are synthesized via FLUX with auto-legibility scrims across 4 simultaneous aspect ratios.',
    architecture: {
      summary: 'Prompt Ingestion → Sarvam-M Vernacular Copy → Headless Chromium HarfBuzz Typographic Canvas → Locked Compliance Gate → NVIDIA NIM FLUX Background.',
      nodes: [
        { step: '01', name: 'Prompt & Brief Synthesizer', description: 'Deconstructs natural language campaign brief into cultural cues and regional loan value props', tech: 'FastAPI · Pydantic' },
        { step: '02', name: 'Sarvam-M Vernacular Engine', description: 'Generates authentic colloquial Kannada and English ad copy tailored to affordable home buyers', tech: 'Sarvam AI · NVIDIA NIM' },
        { step: '03', name: 'HarfBuzz Typographic Shaper', description: 'Headless Chromium renders vector fonts directly to avoid diffusion script corruption', tech: 'Playwright · HarfBuzz · HTML5 Canvas' },
        { step: '04', name: 'Locked Compliance Gate', description: 'Hardcodes mandatory RBI loan interest rate ranges and license lines, overriding generative drift', tech: 'Deterministic Policy Rules' },
        { step: '05', name: '4-Ratio Multi-Format Export', description: 'Simultaneously renders 1:1 Feed, 9:16 Story, 16:9 Display, and 4:5 Mobile Grid assets in seconds', tech: 'Playwright Renderer · NVIDIA NIM FLUX' }
      ]
    },
    techStack: ['Python 3.11', 'FastAPI', 'Playwright', 'HarfBuzz Vector Shaping', 'NVIDIA NIM (Sarvam-M, FLUX)', 'Sarvam AI Voice', 'Vapi'],
    deliverables: [
      'Hybrid Rendering Pipeline pairing generative diffusion backgrounds with vector-shaped typography',
      'Vernacular Font Shaping Engine guaranteed free of Indic ligature and conjunct distortions',
      'Batch Creative Generation Server supporting multi-campaign regional asset production',
      'Interactive Voice Demonstration using Sarvam AI Kannada TTS and Vapi for phone loan inquiries'
    ],
    internalDeepDive: {
      repoName: 'Nivasa Finance',
      repoPath: '~/Documents/Projects/Nivasa Finance',
      architectureType: 'Hybrid AI Visual Generation + Headless Chromium Vector Typography',
      keyAgents: ['VernacularPromptParser', 'HarfBuzzVectorTypesetter', 'LockedComplianceGuardian'],
      compliance: 'Strict RBI Fair Practices Code for NBFC loan advertising'
    }
  },
  {
    id: 'tagpilot',
    title: 'TagPilot (Parallax): Multimodal AI Analytics Implementation & Governance',
    tagline: 'Multimodal Gemini Vision converting UI screen recordings into production-ready GA4/GTM measurement plans with one-click API deployment.',
    coreConcept: 'Multimodal analytics platform analyzing UI navigation videos to extract user interaction hierarchies, compile schema-verified measurement dictionaries, and batch-deploy containers directly via Google Tag Manager APIs.',
    useCases: [
      'Screen Video to Measurement Dictionary: Upload an MP4 walkthrough of checkout flows; Gemini Vision automatically maps events, triggers, and parameters.',
      'Automated GTM Container API Deployer: Creates tags, triggers, and custom JavaScript variables directly in target containers via OAuth2.',
      'Stealth Production Tag Auditing: Headless Chrome scanner navigates client sites and intercepts live dataLayer pushes in < 30 seconds.',
      'Compiled YAML Knowledge Base: Enforces naming conventions, PII prevention rules, and e-commerce tracking standards programmatically.'
    ],
    pillar: 'orchestration',
    maturity: 'Production',
    clientContext: {
      publicName: 'Enterprise Analytics Teams & Digital Agencies',
      internalName: 'TagPilot / Parallax Platform (Havas CSA & PivotRoots)',
      industry: 'Enterprise MarTech & Tag Management',
      region: 'Global / APAC'
    },
    problem: 'Drafting Google Analytics 4 (GA4) and Google Tag Manager (GTM) measurement plans from complex web applications takes weeks of manual spreadsheet authoring, selector finding, and tag construction, introducing human errors, broken triggers, and missing e-commerce parameters.',
    solution: 'Developed TagPilot (Parallax), a multimodal analytics implementation and governance platform. Uses Google Gemini Multimodal Vision to analyze screen recordings of user flows, automatically extract UI interaction hierarchies, compile complete GA4 event dictionaries, verify against compiled YAML rulebooks, and deploy containers via direct Google Tag Manager API batch calls.',
    architecture: {
      summary: 'Screen Video / UI Ingestion → Gemini Multimodal Vision Analyzer → YAML Rulebook Verifier → Direct GTM API Container Deployer → Stealth Web Inspector.',
      nodes: [
        { step: '01', name: 'Multimodal Video Ingestion', description: 'Uploads screen recording of user navigation; Gemini Multimodal Vision maps checkout journeys', tech: 'Google Gemini Multimodal API' },
        { step: '02', name: 'Event Schema Extractor', description: 'Two-pass AI analysis automatically generates event names, trigger conditions, and parameter schemas', tech: 'Gemini 1.5 Pro · Pydantic' },
        { step: '03', name: 'YAML Rulebook Verifier', description: 'Validates measurement specifications against compiled analytics best-practice rulebooks', tech: 'Compiled Knowledge Engine' },
        { step: '04', name: 'One-Click GTM Deployer', description: 'Batch-creates tags, triggers, and variables directly into target GTM containers via Google APIs', tech: 'Google Tag Manager API' },
        { step: '05', name: 'Stealth Live Inspector', description: 'Headless Chrome scanner running stealth plugins to audit live sites and intercept dataLayer pushes', tech: 'Puppeteer-Extra Stealth · Node.js' }
      ]
    },
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Google Gemini Vision', 'Tauri (Rust)', 'Puppeteer Stealth', 'GTM API', 'GA4 Admin API', 'Cloud Run'],
    deliverables: [
      'Multimodal Video-to-Measurement Plan Generator converting MP4 walkthroughs into GA4 event plans',
      'Compiled YAML Knowledge Base engine evaluating container hygiene against enterprise standards',
      'One-Click Google Tag Manager Container Deployment via OAuth2 and GTM Admin APIs',
      'Stealth Headless Chrome Inspector intercepting live dataLayer events on production sites'
    ],
    internalDeepDive: {
      repoName: 'TagPilot',
      repoPath: '~/Documents/Projects/TagPilot',
      architectureType: 'React 18 + Tauri (Rust) Desktop + Cloud Run API Backend',
      keyAgents: ['VideoJourneyExtractor', 'RulebookComplianceEvaluator', 'GTMContainerDeployer'],
      compliance: 'Strict GA4 naming convention validation, PII redaction checks, automated GTM backup snapshots'
    }
  },
  {
    id: 'appsflyer-audit',
    title: 'AppsFlyer Autonomous Attribution Fraud & Health Auditor',
    tagline: 'Zero-token headless browser engine auditing MMP accounts for attribution fraud, broken cost syncs, and Protect360 gaps with zero API keys.',
    coreConcept: 'Zero-API-key autonomous agent skill that logs into MMP dashboards via headless browser with OS Keychain-secured credentials, extracting configurations and evaluating deterministic fraud rules.',
    useCases: [
      'Admin-Free Forensic Account Discovery: Discovers reachable accounts and app bundles using standard marketing team login credentials.',
      'Attribution Fraud Vector Audit (AF-1.1): Evaluates active Protect360 licenses, click-to-install-time (CTIT) distributions, and device clustering.',
      'Partner Cost Sync Verification (AF-2.1): Identifies active ad networks that have stopped syncing spend data into MMP reporting.',
      'Automated Audit Memo Generation: Compiles executive-ready Markdown and HTML diagnostic reports outlining wasted spend and misconfigurations.'
    ],
    pillar: 'measurement',
    maturity: 'Production',
    clientContext: {
      publicName: 'Mobile App Growth Teams & Enterprise App Advertisers',
      internalName: 'AppsFlyer Audit CLI / Antigravity Skill',
      industry: 'Mobile Marketing & Performance AdTech',
      region: 'Global'
    },
    problem: 'Growth teams invest millions in mobile user acquisition but lose budget to ad fraud (click flooding, install hijacking) and broken partner cost integrations. Outside auditors and consultants can rarely obtain admin access or API tokens to perform forensic reviews due to corporate security hurdles.',
    solution: 'Engineered an autonomous CLI agent and Antigravity skill that requires only standard user dashboard credentials saved in the OS Keychain. The engine spins up a headless Chromium session, extracts active app configurations, executes deterministic forensic checks against a versioned YAML rulebook (AF-1.1 to AF-4.1), and exports executive-ready Markdown and HTML audit reports.',
    architecture: {
      summary: 'Keychain Credentials Retrieval → Headless Chromium Session Orchestrator → Multi-App Discovery → Deterministic YAML Rulebook Engine → Markdown/HTML Exporter.',
      nodes: [
        { step: '01', name: 'Keychain Auth Orchestrator', description: 'Interactive TTY-only onboarding storing credentials safely into macOS Keychain with zero CLI arg leakage', tech: 'Node.js · macOS Keychain' },
        { step: '02', name: 'Session Token Harvester', description: 'Automates dashboard login, extracts af_jwt and auth_tkt cookies, and queries internal APIs', tech: 'Puppeteer · Headless Chrome' },
        { step: '03', name: 'Multi-Account Discovery', description: 'Lists all reachable advertiser accounts, app bundles, and operating systems under the login', tech: 'Internal AppsFlyer Endpoints' },
        { step: '04', name: 'YAML Forensic Rulebook', description: 'Evaluates AF-1.1 (Protect360 licenses), AF-2.1 (cost health), AF-3.1 (attribution hygiene), AF-4.1 (revenue deduplication)', tech: 'YAML Rule Engine' },
        { step: '05', name: 'Executive Report Compiler', description: 'Generates prioritized markdown and HTML forensic audit reports highlighting financial leakage', tech: 'Markdown · HTML Templates' }
      ]
    },
    techStack: ['Node.js 20+', 'Puppeteer', 'Chrome DevTools Protocol', 'macOS Keychain API', 'YAML Rules Engine', 'Antigravity Skill Protocol'],
    deliverables: [
      'Self-contained Node.js CLI tool with interactive secure credential onboarding',
      'Antigravity Agent Skill enabling coding agents to trigger mobile attribution audits autonomously',
      'Versioned YAML Forensic Rulebook (AF-1.1 to AF-4.1) scoring account health',
      'Actionable Forensic Audit Reports highlighting unmeasured spend and inactive fraud licenses'
    ],
    internalDeepDive: {
      repoName: 'appsflyer-audit',
      repoPath: '~/Documents/Projects/appsflyer-audit',
      architectureType: 'Headless Browser Automation CLI + Claude/Antigravity Agent Skill',
      keyAgents: ['SessionTokenHarvester', 'DeterministicRuleEvaluator', 'ForensicReportCompiler'],
      compliance: 'Strict local password isolation; zero external transmission of user credentials'
    }
  },
  {
    id: 'kfc-genai-optimization',
    title: 'KFC: Multi-Agentic GenAI Campaign Optimization Engine',
    tagline: 'BigQuery marketing data lake paired with LangGraph multi-agent insighting engine delivering +18% retention lift and +20% ROAS improvement.',
    coreConcept: 'Native BigQuery marketing data platform orchestrating a LangGraph multi-agent swarm that converts natural language business queries into optimized SQL and prescribes daily budget shifts.',
    useCases: [
      'Natural Language Text-to-Query: Marketing teams interrogate store-level campaign data in conversational English with zero SQL barrier.',
      'Autonomous Zone Anomaly Scanner: Continuously monitors store cluster CPA and order volumes to detect underperforming delivery zones.',
      'Offer Responsiveness Dynamic Triggers: Recommends budget reallocations based on historical customer coupon elasticity and retention trends.',
      'Daily Media Desk Briefings: Automatically synthesizes morning campaign optimization recommendations before store trading opens.'
    ],
    pillar: 'intelligence',
    maturity: 'Production',
    featured: true,
    clientContext: {
      publicName: 'Global Quick Service Restaurant (QSR) Brand',
      internalName: 'KFC India / Yum! Brands Portfolio',
      industry: 'QSR / Food & Beverage',
      region: 'India'
    },
    problem: 'Managing 100+ concurrent campaigns across acquisition, retention, and food delivery aggregators with manual optimization led to reporting lag, missed peak ordering windows, and diminished overall ROAS.',
    solution: 'Designed and deployed a unified marketing data lake in Google BigQuery coupled with a multi-agentic insighting engine built on LangGraph. Marketing teams interact with live data via natural language text-to-query, while autonomous agents deliver daily campaign optimization briefings, spend reallocations, and cohort responsiveness triggers.',
    architecture: {
      summary: 'Data Lake Ingestion (Airflow) → BigQuery Lake → LangGraph Swarm (Query, Anomaly, Strategy) → Conversational Text-to-SQL → Daily Decision Briefs.',
      nodes: [
        { step: '01', name: 'Multi-Channel Ingestion', description: 'Centralized ingestion of paid media APIs, point-of-sale store orders, and food delivery data', tech: 'BigQuery · Cloud Composer' },
        { step: '02', name: 'LangGraph Multi-Agent Core', description: 'Multi-agent orchestration: Query Planner, SQL Generator, Anomaly Detector, and Strategy Advisor', tech: 'LangGraph · Python' },
        { step: '03', name: 'Text-to-Query Interface', description: 'Translates natural language questions into dialect-safe BigQuery SQL with partition awareness', tech: 'Gemini 1.5 Pro · SQLGlot' },
        { step: '04', name: 'Anomaly & Trend Scanner', description: 'Continuously monitors hourly CPA/ROAS across store clusters and flags drop-offs proactively', tech: 'BigQuery ML · Time Series' },
        { step: '05', name: 'Prescriptive Recommender', description: 'Outputs daily actionable budget shifts toward high-responsiveness customer cohorts', tech: 'LangGraph Synthesizer' }
      ]
    },
    techStack: ['LangGraph', 'Google BigQuery', 'Gemini 1.5 Pro', 'Python', 'Streamlit', 'GCP Cloud Run', 'SQLGlot'],
    deliverables: [
      'BigQuery Marketing Data Lake unifying POS, Delivery Aggregator, and Paid Media APIs',
      'LangGraph Multi-Agent Orchestrator with schema-aware Text-to-SQL capabilities',
      'Conversational Query Bot deployed for brand managers and performance marketing teams',
      'Autonomous Daily Optimization Briefing delivered every morning before trading starts'
    ],
    internalDeepDive: {
      repoName: 'KFC GenAI Campaign Engine',
      repoPath: 'AI solutions deck - abhimanyu.pptx (Slide 3)',
      architectureType: 'LangGraph Multi-Agent + BigQuery Native Intelligence',
      keyAgents: ['SQLPlannerAgent', 'CampaignAnomalyAgent', 'BudgetOptimizationAgent'],
      compliance: 'Aggregated store and cluster analytics; zero raw customer PII processed in LLMs'
    }
  },
  {
    id: 'indusind-video-vertex',
    title: 'IndusInd Bank: Dynamic Multi-Format Video Adaptation',
    tagline: 'Proprietary AI video adaptation pipeline on Vertex AI converting master TVCs into cohort-specific short-form variants within minutes.',
    coreConcept: 'Automated video intelligence pipeline using computer vision to isolate high-energy scene hooks from master shoots and rendering platform-fit short-form assets with neural voiceovers.',
    useCases: [
      'Visual Hook Classification: Vision models identify high-recall moments, product visuals, and key faces from master commercials.',
      'Cohort-Tailored Script Synthesis: Generates 6s bumper and 15s short scripts customized for salaried professionals, HNIs, and SMEs.',
      'Aspect Ratio Smart Reframing: Centers subjects dynamically across native 9:16 vertical (Reels/Shorts), 1:1 square, and 16:9 display.',
      'Statutory Banking Disclosures: Embeds mandatory RBI disclosure frames programmatically into concluding video seconds.'
    ],
    pillar: 'creative',
    maturity: 'Production',
    featured: true,
    clientContext: {
      publicName: 'Premier Indian Private Sector Bank',
      internalName: 'IndusInd Bank Digital',
      industry: 'BFSI / Retail Banking',
      region: 'India'
    },
    problem: 'Relying exclusively on a single long-form master TV commercial for digital channels led to severe audience creative fatigue, poor VTR on mobile feeds, and inability to produce platform-fit 9:16 and 1:1 formats at speed.',
    solution: 'Engineered an automated video adaptation pipeline using Google Vertex AI. The system decomposes master shoots into key visual hooks, writes cohort-targeted voiceover scripts, matches pacing to YouTube Shorts and Demand Gen formats, and renders high-recall variants in minutes.',
    architecture: {
      summary: 'Master footage decomposition, automated scene hook classification, script adaptation, and multi-ratio rendering.',
      nodes: [
        { step: '01', name: 'Master TVC Ingestion', description: 'Ingests high-resolution master video files and extracts keyframes and audio stems', tech: 'Cloud Storage · FFmpeg' },
        { step: '02', name: 'Visual Hook Detector', description: 'Vertex AI Vision identifies high-energy scenes, focal subjects, and product appearances', tech: 'Vertex AI Vision · Gemini' },
        { step: '03', name: 'Cohort Copywriter', description: 'Generates tailored 6s bumper and 15s short scripts tailored to distinct demographic segments', tech: 'Gemini 1.5 Pro' },
        { step: '04', name: 'Voiceover Synthesis', description: 'Neural text-to-speech generating regional language voiceovers synced to scene transitions', tech: 'Google Cloud TTS' },
        { step: '05', name: 'Multi-Format Compositor', description: 'Automated cropping and smart reframing for 9:16 vertical, 1:1 square, and 16:9 widescreen', tech: 'FFmpeg · MoviePy · Cloud Run' }
      ]
    },
    techStack: ['Google Cloud Vertex AI', 'Gemini Vision', 'Google Cloud TTS', 'FFmpeg', 'Python', 'Cloud Storage', 'Cloud Run'],
    deliverables: [
      'Automated Video Re-framing Engine with intelligent facial and product centering',
      'Demographic Script Adapter creating personalized value props for salaried, HNI, and SME cohorts',
      'Batch Video Rendering Pipeline exporting channel-ready YouTube Shorts & Meta Reels',
      'Creative Performance Tracker correlating visual hook duration with VTR completion'
    ],
    internalDeepDive: {
      repoName: 'IndusInd Video Vertex Engine',
      repoPath: 'AI solutions deck - abhimanyu.pptx (Slide 4)',
      architectureType: 'Cloud-Native Automated Video Synthesis Pipeline',
      keyAgents: ['KeyframeClassifier', 'VoiceoverSyncer', 'AspectReframer'],
      compliance: 'RBI statutory disclosure cards automatically hardcoded into closing frames'
    }
  },
  {
    id: 'ds-mediaflow',
    title: 'DS Group: Mediaflow Multi-Agent Planning Pipeline',
    tagline: 'Production-deployed 3-agent AI pipeline automating media plan ingestion, schema validation, and cross-channel intelligence.',
    coreConcept: 'A three-tier agentic pipeline that normalizes inconsistent media agency spreadsheets, enforces row-by-row rate card rules, and auto-generates executive TV and digital media briefings.',
    useCases: [
      'AI Column & Schema Mapping (Agent 1): Maps arbitrary agency column naming conventions to standard enterprise schemas with confidence scoring.',
      'Row-by-Row Quality Validation (Agent 2): Validates dayparts, rate cards, and channel allocations, rejecting invalid spreadsheet rows.',
      'Spend & Spot Intelligence Synthesis (Agent 3): Automatically compiles spend shares, Free Commercial Time (FCT), and spot distribution summaries.',
      'Cross-Agency Approval Portal: Central interface for brand managers to review, annotate, and approve multi-brand agency media plans.'
    ],
    pillar: 'orchestration',
    maturity: 'Production',
    featured: true,
    clientContext: {
      publicName: 'Diversified CPG & Tobacco Conglomerate',
      internalName: 'DS Group (Rajnigandha, Catch, Pulse, Pass Pass)',
      industry: 'CPG / FMCG',
      region: 'India'
    },
    problem: 'Multiple media agencies submit media plans across TV, Print, Radio, and Digital using inconsistent Excel templates with broken naming conventions, delaying campaign approvals and blinding brand leaders to overall cross-channel spend distribution.',
    solution: 'Built Mediaflow, an enterprise 3-agent automated ingestion and intelligence platform. Agent 1 maps arbitrary agency spreadsheets to standard schemas; Agent 2 executes strict row-by-row data validation and blocks corrupt submissions; Agent 3 auto-generates executive intelligence briefs breaking down spend, Free Commercial Time (FCT), and spot distribution.',
    architecture: {
      summary: '3-stage agentic pipeline: Field Mapping Agent → Data Validation Agent → Plan Analysis Agent.',
      nodes: [
        { step: '01', name: 'Agency Plan Upload', description: 'Secure portal for agency planners to submit raw Excel/CSV media schedules', tech: 'React · Firebase Auth' },
        { step: '02', name: 'Field Mapping Agent', description: 'AI column recognition across arbitrary templates; maps required/optional fields with confidence scores', tech: 'Vertex AI · Python' },
        { step: '03', name: 'Data Validation Agent', description: 'Row-by-row validation checking rate cards, date logic, dayparts, and program names', tech: 'Cloud Run · Pydantic' },
        { step: '04', name: 'Plan Analysis Agent', description: 'Auto-synthesizes spend distribution, FCT ratios, and competitive brand share summaries', tech: 'Gemini 1.5 Pro · Cloud SQL' },
        { step: '05', name: 'Central Command Center', description: 'Real-time dashboard for brand heads to review, approve, or request revisions on plans', tech: 'React · Tailwind CSS' }
      ]
    },
    techStack: ['React', 'Python', 'Google Cloud Run', 'Cloud SQL / Firestore', 'Firebase Auth', 'Vertex AI', 'FastAPI'],
    deliverables: [
      'Self-Service Agency Portal with instant schema feedback and error highlighting',
      'Automated Field Mapping Agent matching messy headers with >98% accuracy',
      'Executive Intelligence Generator creating C-suite TV & Digital plan summaries',
      'Centralized Cloud SQL Repository unifying historical media investments across brands'
    ],
    internalDeepDive: {
      repoName: 'DS Group Mediaflow',
      repoPath: 'AI solutions deck - abhimanyu.pptx (Slide 6) & Havas CSA CRM proposals',
      architectureType: 'Cloud Run Multi-Agent FastAPI + React Microfrontend',
      keyAgents: ['FieldMappingAgent', 'DataValidationAgent', 'PlanAnalysisAgent'],
      compliance: 'Strict rate card confidentiality; multi-tenant role-based permissions'
    }
  },
  {
    id: 'agentic-commerce-ds',
    title: 'Agentic Commerce & Generative Engine Optimization (GEO)',
    tagline: 'Model Context Protocol (MCP) servers, JSON-LD schemas, and LLM discovery manifests preparing brands for autonomous AI shopping agents.',
    coreConcept: 'Agentic commerce architecture that exposes live brand catalog and inventory via Model Context Protocol (MCP) endpoints and Answer Engine Optimization (AEO) to make products purchasable inside AI assistants.',
    useCases: [
      'Hosted Brand MCP Tool Servers: Exposes structured catalog tool calls directly to ChatGPT, Claude, and Gemini shopping agents.',
      'Semantic Machine Discovery (llm.txt): Deploys domain-root semantic manifests and Schema.org JSON-LD to guide crawler indexing.',
      'Instant Google Indexing API Automation: Triggers immediate indexing of newly launched SKUs into Gemini Overviews in < 2 hours.',
      'Conversational Checkout & Reordering: Chatbot on WhatsApp and brand websites answering ingredient queries and managing subscriptions.'
    ],
    pillar: 'commerce',
    maturity: 'Client MVP',
    clientContext: {
      publicName: 'Diversified Consumer Products & Confectionery Group',
      internalName: 'DS Group Brands (Rajnigandha, Catch Spices, Pulse)',
      industry: 'CPG / Food & Confectionery',
      region: 'India / Global'
    },
    problem: 'Over 40% of product search is shifting away from traditional search engines toward conversational AI assistants (ChatGPT, Perplexity, Gemini). Traditional SEO does not surface products inside AI shopping answers, leaving brands invisible in agent-driven commerce.',
    solution: 'Built an enterprise Agentic Commerce architecture. Deployed hosted Model Context Protocol (MCP) endpoints per brand cluster exposing live catalog and inventory, authored Answer Engine Optimization (AEO) structured JSON-LD schemas and `llm.txt` discovery manifests, and connected real-time Google Indexing API webhooks for sub-hour AI visibility.',
    architecture: {
      summary: 'Catalog API → Hosted MCP Endpoints → Semantic LLM manifests → AI assistant shopping graph integration.',
      nodes: [
        { step: '01', name: 'Product Catalog API', description: 'Centralized REST/GraphQL feeds supplying live stock, pricing, and variant metadata', tech: 'BigQuery · Cloud Run' },
        { step: '02', name: 'Hosted MCP Server', description: 'Model Context Protocol servers exposing tool calls to Claude, ChatGPT, and Gemini agents', tech: 'MCP Protocol · TypeScript' },
        { step: '03', name: 'Semantic Discovery (llm.txt)', description: 'Machine-readable semantic brand guides and Schema.org JSON-LD deployed at domain root', tech: 'JSON-LD · llm.txt Standard' },
        { step: '04', name: 'Instant Indexing Push', description: 'Google Indexing API webhooks indexing new SKUs into Gemini Overviews within hours', tech: 'Google Indexing API' },
        { step: '05', name: 'Conversational Checkout', description: 'AI shopping bot on WhatsApp and DTC web guiding consumers from recipe queries to checkout', tech: 'WhatsApp Business API · Claude' }
      ]
    },
    techStack: ['Model Context Protocol (MCP)', 'Node.js', 'TypeScript', 'Google Indexing API', 'BigQuery', 'JSON-LD', 'Cloud Run'],
    deliverables: [
      'Hosted Brand MCP Servers enabling Claude and ChatGPT to query product availability',
      'Standardized `llm.txt` and Schema.org JSON-LD implementation across portfolio domains',
      'Google Indexing API Automation Pipeline for instant product launch distribution',
      'Agent Session Analytics Dashboard tracking brand mentions and citation shares in LLMs'
    ],
    internalDeepDive: {
      repoName: 'Agentic Commerce DS Group',
      repoPath: 'AI solutions deck - abhimanyu.pptx (Slides 12 & 14)',
      architectureType: 'MCP Tool Server + Semantic Discovery Engine',
      keyAgents: ['CatalogMCPProvider', 'SemanticCrawlerBot', 'IndexingWebhookDispatcher'],
      compliance: 'Verified brand safety policy; strict inventory accuracy guards'
    }
  },
  {
    id: 'reverse-etl-dpdpa',
    title: 'Privacy-Safe Reverse ETL & DPDPA Consent Sync Framework',
    tagline: 'Composable CDP (RudderStack + Multiwoven) audience sync engine with immutable BigQuery consent ledger and automated right-to-erasure.',
    coreConcept: 'Warehouse-native Composable CDP and Reverse ETL framework that enforces statutory consent validation and automated cryptographic erasure across ad platforms under India’s DPDPA.',
    useCases: [
      'Statutory Consent-Gated Activation: Filters warehouse golden records against enterprise consent management platforms before audience dispatch.',
      'Google Ads Customer Match (API v18): Automates offline user data job operations for Customer Match user lists via OAuth2 refresh tokens.',
      'Client-Side SHA-256 Hashing: Enforces E.164 phone normalization and lowercased email hashing to prevent match-rate drops on Meta CAPI.',
      'Automated Right-to-Erasure Execution: Propagates opt-outs and erasure requests across ad destinations within 24 hours with an audit ledger.'
    ],
    pillar: 'measurement',
    maturity: 'Production',
    clientContext: {
      publicName: 'Enterprise FMCG & Regulated Consumer Brands',
      internalName: 'DS Group / Enterprise FMCG Reverse ETL & DPDPA Consent Ledger',
      industry: 'Enterprise FMCG & Real Estate',
      region: 'India'
    },
    problem: 'Under India’s Digital Personal Data Protection Act (DPDPA), brands face severe penalties if customer consent changes or erasure requests are not propagated to advertising networks (Google Ads, Meta) and marketing automation platforms in real time.',
    solution: 'Architected a privacy-safe Reverse ETL pipeline built on a Composable CDP stack (RudderStack + Multiwoven). Maintains an immutable BigQuery consent ledger, performs single SHA-256 PII hashing with phone normalization, and synchronizes audiences into Google Ads Customer Match (API v18) and Meta CAPI with automated right-to-be-forgotten erasure triggers.',
    architecture: {
      summary: 'Warehouse single customer view → Consent & DPDPA verification → Cryptographic PII hashing → OfflineUserDataJob / CAPI sync.',
      nodes: [
        { step: '01', name: 'Warehouse Single Customer View', description: 'Queries verified customer golden records from BigQuery / Snowflake / SAP S4/HANA', tech: 'BigQuery · Snowflake' },
        { step: '02', name: 'DPDPA Consent Verifier', description: 'Checks purpose-specific customer consent status before selecting records for export', tech: 'Consent Management API' },
        { step: '03', name: 'Cryptographic Hasher', description: 'Normalizes and hashes phone numbers and emails using SHA-256 with salt protection', tech: 'Ruby / Python Hasher' },
        { step: '04', name: 'Google Ads Customer Match Sync', description: 'Pushes offline user data jobs via Google Ads API v18 OfflineUserDataJobService', tech: 'Google Ads API v18' },
        { step: '05', name: 'Meta CAPI & MoEngage Push', description: 'Synchronizes custom audiences and lifecycle event triggers via secure batch APIs', tech: 'Meta Marketing API · MoEngage' },
        { step: '06', name: 'Right-to-be-Forgotten Engine', description: 'Automates user erasure operations across all destination platforms within 24 hours', tech: 'Erasure Audit Logger' }
      ]
    },
    techStack: ['Python', 'Ruby', 'Google Ads API v18', 'Meta Conversions API', 'BigQuery', 'RudderStack', 'Multiwoven', 'Cloud Run'],
    deliverables: [
      'Production-Ready Reverse ETL Connector Framework with Google Ads Customer Match support',
      'Automated PII Sanitization & SHA-256 Hashing Utility adhering to ad platform specifications',
      'DPDPA Compliance Audit Logger tracking every customer record ingress and egress event',
      'Automated Right-to-be-Forgotten Erasure Webhook synchronizing across all ad accounts'
    ],
    internalDeepDive: {
      repoName: 'Reverse ETL - Custom and DPDPA',
      repoPath: '~/Documents/Projects/Reverse ETL - Custom and DPDPA',
      architectureType: 'Multiwoven / Custom Ruby & Python Warehouse Connectors',
      keyAgents: ['ConsentAuditor', 'AudienceSyncWorker', 'ErasurePropagator'],
      compliance: 'Strict India DPDPA statutory compliance; zero raw PII stored in sync pipelines'
    }
  },
  {
    id: 'abm-magic-rockwell',
    title: 'Rockwell Automation: Closed-Loop B2B Demand Engine',
    tagline: 'Dynamic ICP scoring and LinkedIn Matched Audiences pipeline using Cohen’s d effect-size analysis to continuously retrain account targeting.',
    coreConcept: 'A closed-loop B2B demand generation engine connecting CRM seed accounts to live LinkedIn Matched Audiences and statistically retraining ICP scoring weights based on Cohen’s d effect sizes.',
    useCases: [
      'Third-Party Firmographic Enrichment: Enriches target enterprise accounts against a 50M+ company database for tech stack, headcount, and revenue.',
      'Multi-Dimensional ICP Scoring: Evaluates buying readiness across industrial automation, life sciences, and CPG segments.',
      'Automated LinkedIn Matched Audience Sync: Directly syncs tiered account segments into LinkedIn campaign managers.',
      'Statistical Retraining Loop (Cohen’s d): Evaluates which firmographics generate significant engagement lift to retrain ICP weights weekly.'
    ],
    pillar: 'intelligence',
    maturity: 'Production',
    clientContext: {
      publicName: 'Global Industrial Automation & Digital Transformation Leader',
      internalName: 'Rockwell Automation / Enterprise B2B Demand Engine',
      industry: 'Industrial Automation & Life Sciences',
      region: 'APAC / Global'
    },
    problem: 'Enterprise B2B manufacturing and automation sales have 6–18 month deal cycles, but marketing teams rely on static, intuition-based target account lists. There is no automated feedback loop measuring which account attributes correlate with actual pipeline progression.',
    solution: 'Built a closed-loop B2B demand generation engine. Seed accounts are enriched against a 50M+ company database, scored on weighted ICP criteria, tiered into buying personas, and activated on LinkedIn Matched Audiences. As accounts engage, the engine performs Cohen’s d effect-size analysis to statistically identify which firmographics drive lift, automatically retrained ICP weights for the next cycle.',
    architecture: {
      summary: 'Seed Account Ingestion → 50M+ Enrichment → Weighted ICP Scoring → LinkedIn Matched Audiences → Engagement Measurement → Cohen’s d Retraining.',
      nodes: [
        { step: '01', name: 'Seed Account Ingestion', description: 'Uploads target manufacturing and life sciences enterprise account lists', tech: 'FastAPI · Pydantic' },
        { step: '02', name: 'Third-Party Firmographic Enrichment', description: 'Enriches headcount, revenue, technology stack, and hiring signals against 50M+ company profiles', tech: 'Enrichment API · PostgreSQL' },
        { step: '03', name: 'Weighted ICP Scorer', description: 'Calculates multi-dimensional fit score across technical readiness and buying propensity', tech: 'Python · Scikit-Learn' },
        { step: '04', name: 'LinkedIn Audience Sync', description: 'Automatically creates and updates LinkedIn Matched Audiences segmented by tier and persona', tech: 'LinkedIn Marketing API' },
        { step: '05', name: 'Effect-Size Retraining Loop', description: 'Calculates Cohen’s d effect size on engaged accounts to statistically recalibrate ICP scoring weights', tech: 'NumPy · Statistical Models' }
      ]
    },
    techStack: ['Python 3.11', 'FastAPI', 'LinkedIn Marketing API', 'PostgreSQL', 'Scikit-Learn', 'React', 'Tailwind CSS'],
    deliverables: [
      'Closed-Loop Demand Pipeline connecting CRM seed accounts to live LinkedIn ad targeting',
      'Dynamic ICP Scoring Model retrained on statistical engagement lift (Cohen’s d)',
      'Executive Account Engagement Command Center tracking account stage velocity',
      'Automated Persona-to-Content Mapping Matrix for industrial engineering decision-makers'
    ],
    internalDeepDive: {
      repoName: 'ABM Magic - Rockwell',
      repoPath: '~/Documents/Projects/ABM Magic - Rockwell',
      architectureType: 'FastAPI Backend + Closed-Loop LinkedIn Activation Engine',
      keyAgents: ['FirmographicEnricher', 'ICPWeightOptimizer', 'LinkedInAudienceSynchronizer'],
      compliance: 'Full GDPR and B2B privacy compliance; enterprise CRM security boundaries'
    }
  }
];
