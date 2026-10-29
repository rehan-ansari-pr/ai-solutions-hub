# CSA × PivotRoots — AI Solutions Hub
> **Enterprise AI Portfolio, Solutions Architecture, and Agentic Sync Platform**  
> *Part of Havas Media Network*

[![Live on Cloudflare](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://ai-solutions-hub-922.pages.dev)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A web application serving as an internal repository and external showcase of real-world AI platforms, POCs, and production engines engineered by **CSA (Cognitive / Consumer Science & Analytics)** and **PivotRoots**.

---

## Strategic Capability Pillars

The portfolio organizes all enterprise solutions into 5 strategic marketing technology pillars:

1. **🧠 Decision Intelligence & Agents:** Native BigQuery text-to-query data lakes, Bayesian Marketing Mix Modeling (Echo MMM Studio on Google Meridian), and closed-loop B2B ICP scoring (Rockwell Automation).
2. **⚡ Orchestration & Workflow Automation:** Multi-agent swarms (Artiscents Flywheel with 37 Cloud Run microservices & 21 agents), agency media plan ingestion pipelines (DS Group Mediaflow), and multimodal tag governance (TagPilot).
3. **🎨 Creative GenAI & Brand Governance:** Dual-layer deterministic + multimodal brand playbook scoring (Brand Mitra for Tata Steel), vernacular Indic typography-safe generators (Nivāsa Finance), and Vertex AI dynamic video adaptation (IndusInd Bank).
4. **📊 Measurement, Privacy & Attribution:** Enterprise Server-Side GTM & Trade Desk UID2 identity resolution (Chemist Warehouse), autonomous zero-token mobile fraud auditors (AppsFlyer Audit CLI), and DPDPA-compliant reverse ETL ledgers (DS Group).
5. **🛒 Agentic Commerce & Discovery (GEO):** Model Context Protocol (MCP) live catalog servers, Answer Engine Optimization (AEO), and semantic `llm.txt` manifests making brands transactable inside AI assistants (ChatGPT Shopping, Perplexity, Gemini).

---

## Dual-Audience Modes

- **Public Showcase Mode (Client-Safe):** Anonymizes proprietary enterprise client details into clean industry titles (e.g. *"Leading Retail Pharmacy & Health Omni-Channel Chain"* instead of internal brand names), concealing confidential repository paths while demonstrating architectural depth and proven ROI.
- **Internal Enterprise Mode (Unlocked):** Unlocks unredacted client context (*Chemist Warehouse*, *Tata Steel*, *KFC India*, *IndusInd Bank*, *6thStreet.com*, *DS Group*), local repository directories, agent class names, and compliance specifications using the team passphrase (`csa-internal-2026`).

---

## Team Contribution & Sync Skill (`/sync-solution`)

Any team member's coding agent can automatically scan a project repository and securely publish or update its profile on the live Cloudflare platform.

### Quick Start with CLI

```bash
# 1. Set your authorized team token
export CSA_CATALOG_TOKEN="csa_team_sec_2026_x89"

# 2. In any project repository:
python3 scripts/scan_and_sync.py --scan --sync
```

### Antigravity Skill Protocol
The skill is located at [`skills/sync-solution/SKILL.md`](skills/sync-solution/SKILL.md). In your AI pair-programming assistant, simply invoke:
```bash
/sync-solution
```

### Security & Authentication
The backend API endpoint (`POST /api/solutions`) is hosted on Cloudflare Pages Functions and enforces bearer token verification against `CSA_CATALOG_TOKEN` / `TEAM_CATALOG_SECRET`. Unauthorized requests are rejected with `401 Unauthorized`.

---

## Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Glassmorphism UI
- **Serverless Edge:** Cloudflare Pages Functions (`functions/api/solutions.ts`)
- **Hosting:** Cloudflare Pages global edge network
- **Scanner Engine:** Python 3.11+ AST & Markdown metadata parser

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build production bundle
pnpm build

# Deploy to Cloudflare Pages
pnpm deploy
```

---

## Deployment Information

- **Live URL:** [https://ai-solutions-hub-922.pages.dev](https://ai-solutions-hub-922.pages.dev)
- **API Endpoint:** [https://ai-solutions-hub-922.pages.dev/api/solutions](https://ai-solutions-hub-922.pages.dev/api/solutions)
- **Organization:** CSA & PivotRoots, Part of Havas Media Network
