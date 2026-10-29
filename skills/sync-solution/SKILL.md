---
name: sync-solution
description: "Scans the current codebase/project, extracts architecture, tech stack, metrics, and problem-solution context, and securely registers or updates the entry in the CSA × PivotRoots AI Solutions Hub web app on Cloudflare."
---

# CSA × PivotRoots — AI Solutions Hub Sync Skill

This skill allows any team member's coding agent to scan a project codebase and securely publish or update its solution profile in the centralized **AI Solutions Hub** web application deployed on Cloudflare.

---

## Security & Authentication

> [!IMPORTANT]
> To prevent unauthorized modifications, the catalog API requires the **CSA Team Secret Token**.
> Ensure you have `CSA_CATALOG_TOKEN` exported in your environment or pass `--token`.
>
> Default Team Secret: `csa_team_sec_2026_x89` (or custom token configured by the administrator).

```bash
export CSA_CATALOG_TOKEN="csa_team_sec_2026_x89"
```

---

## How to Run

### Option 1: Automated Agent Invocation
When working in any project directory (e.g. `Artiscents Flywheel`, `Brand Mitra`, `Echo MMM Studio`), invoke this skill or ask:
> "Scan this codebase and publish it to the AI Solutions Hub catalog."

The agent will execute:
```bash
python3 /Users/rehan.ansari/Library/CloudStorage/OneDrive-Havas/AI\ Solutions\ Repo/scripts/scan_and_sync.py --scan --sync
```

### Option 2: Command Line Scanner
In any project folder:
```bash
# Preview extracted metadata without syncing
python3 /path/to/AI\ Solutions\ Repo/scripts/scan_and_sync.py --scan

# Scan and sync directly to live Cloudflare web app
python3 /path/to/AI\ Solutions\ Repo/scripts/scan_and_sync.py --sync
```

---

## What Gets Extracted
1. **Title & Tagline:** Derived from `README.md`, `package.json`, or root headings.
2. **Strategic Pillar:** Auto-classified into:
   - *Decision Intelligence & Agents*
   - *Orchestration & Workflow Automation*
   - *Creative GenAI & Brand Governance*
   - *Measurement, Privacy & Attribution*
   - *Agentic Commerce & Discovery (GEO)*
3. **Problem & Engineered Solution:** Synthesized from project docs and README.
4. **Tech Stack Badges:** Auto-detected from `requirements.txt`, `package.json`, Dockerfiles, or imports.
5. **Business Metrics & KPIs:** Extracted from documented test results and case studies.
6. **Architecture Flow Nodes:** Synthesized into a step-by-step visual workflow.

---

## API Contract (Direct Webhook)

```http
POST https://ai-solutions-hub.pages.dev/api/solutions
Authorization: Bearer <CSA_CATALOG_TOKEN>
Content-Type: application/json

{
  "title": "Brand Mitra: Agentic Creative Compliance Engine",
  "tagline": "Autonomous multimodal inspection checking creative imagery against brand playbooks.",
  "pillar": "creative",
  "maturity": "Client MVP",
  "clientContext": {
    "publicName": "Global Industrial Conglomerate",
    "internalName": "Tata Steel Digital AOR",
    "industry": "Industrial & Manufacturing"
  },
  "problem": "Manual compliance reviews take days and allow off-brand assets into live media.",
  "solution": "Built dual-layer deterministic CV and multimodal Gemini 2.0 Flash compliance gate.",
  "techStack": ["Python", "FastAPI", "Gemini 2.0 Flash", "Docker"],
  "metrics": [
    { "label": "Review Speedup", "value": "10x Faster" }
  ]
}
```
