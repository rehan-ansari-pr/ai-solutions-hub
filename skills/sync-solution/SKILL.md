---
name: sync-solution
description: "Scans the current codebase/project, extracts architecture, tech stack, metrics, and problem-solution context, and securely registers or updates the entry in the CSA × PivotRoots AI Solutions Hub web app on Cloudflare."
---

# CSA × PivotRoots — AI Solutions Hub Sync Skill

This skill allows any team member's AI pair-programming assistant (Antigravity, Claude Code, Cursor, Windsurf) or CLI to analyze any project repository and securely publish or update its profile on the centralized **AI Solutions Hub**.

- **Live Hub:** https://ai-solutions-hub-922.pages.dev
- **API Endpoint:** `https://ai-solutions-hub-922.pages.dev/api/solutions`

---

## 🔑 Security & Authorization

To protect catalog integrity, publishing requires the team authorization token:
```bash
export CSA_CATALOG_TOKEN="csa_team_sec_2026_x89"
```

---

## 🤖 Instructions for AI Assistants (Agentic Workflow)

When the user asks to **"/sync-solution"**, **"upload this project to the solutions hub"**, or **"register this codebase in our AI catalog"**, execute the following steps:

### Step 1: Scan and Synthesize Project Metadata
Inspect the repository's files (`README.md`, `package.json`, `requirements.txt`, `pyproject.toml`, Dockerfiles, key source files) to extract:

1. **Title:** Clean, high-impact platform name (e.g., *"Brand Mitra: Agentic Creative Compliance Engine"*).
2. **Tagline:** One-sentence summary (<140 characters).
3. **Strategic Pillar:** Must be one of:
   - `intelligence` (Decision Intelligence & Agents: MMM, Bayesian modeling, text-to-query data lakes, ICP scoring)
   - `orchestration` (Orchestration & Swarms: Multi-agent pipelines, media ingestion, microservice workflows)
   - `creative` (Creative GenAI & Brand Governance: Multimodal compliance, Indic typography, dynamic video adaptation)
   - `measurement` (Measurement, Privacy & Attribution: Server-side GTM, UID2 identity, fraud detection, DPDPA)
   - `commerce` (Agentic Commerce & GEO: MCP product servers, AEO, Answer Engine manifests, ChatGPT Shopping)
4. **Maturity Status:** `Production`, `Client MVP`, or `Strategic Architecture`.
5. **Client Context:**
   - `publicName`: Client-safe generic description (e.g., *"Global Industrial Conglomerate"* or *"Omni-Channel Retailer"*).
   - `internalName`: Unredacted team/client name (e.g., *"Tata Steel Digital"* or *"Chemist Warehouse"*).
   - `industry`: Industry vertical (e.g., *"Retail & Healthcare"*, *"FMCG"*, *"Banking & BFSI"*).
6. **Problem Statement:** 2–3 sentences on the operational bottleneck or business challenge.
7. **Engineered Solution:** 2–4 sentences describing the AI architecture, models, and systems deployed.
8. **Core Business Use Cases:** 3–5 bullet points formatted as `"Title: Detailed description"`.
9. **Tech Stack:** Array of primary tools and frameworks (e.g., `["Python", "FastAPI", "Gemini 2.0 Flash", "BigQuery", "Terraform"]`).
10. **Architecture Workflow Nodes:** 3 to 6 chronological stages, each with:
    - `step`: `"01"`, `"02"`, `"03"`...
    - `name`: Layer or component name (e.g., `"Signal Intake"`, `"Agent Reasoning Mesh"`, `"Multimodal Dispatch"`)
    - `description`: What happens in this step
    - `tech`: Technologies used in this node

---

### Step 2: Publish to Cloudflare Edge API

Construct the JSON payload and execute the HTTP POST request using `curl`:

```bash
curl -s -X POST https://ai-solutions-hub-922.pages.dev/api/solutions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CSA_CATALOG_TOKEN:-csa_team_sec_2026_x89}" \
  -d '{
    "title": "<Extracted Title>",
    "tagline": "<Extracted Tagline>",
    "coreConcept": "<Core Architectural Concept>",
    "pillar": "<intelligence|orchestration|creative|measurement|commerce>",
    "maturity": "<Production|Client MVP|Strategic Architecture>",
    "clientContext": {
      "publicName": "<Client-Safe Public Title>",
      "internalName": "<Internal Brand / Client Name>",
      "industry": "<Industry Vertical>"
    },
    "problem": "<Challenge and Operational Bottleneck>",
    "solution": "<Engineered AI Solution>",
    "useCases": [
      "<UseCase 1 Title>: <UseCase 1 Description>",
      "<UseCase 2 Title>: <UseCase 2 Description>"
    ],
    "techStack": ["<Tech1>", "<Tech2>", "<Tech3>"],
    "architecture": {
      "summary": "<Architecture Flow Summary>",
      "nodes": [
        {"step": "01", "name": "<Stage 1>", "description": "<Desc 1>", "tech": "<Tech 1>"},
        {"step": "02", "name": "<Stage 2>", "description": "<Desc 2>", "tech": "<Tech 2>"},
        {"step": "03", "name": "<Stage 3>", "description": "<Desc 3>", "tech": "<Tech 3>"}
      ]
    },
    "deliverables": [
      "<Key Deliverable 1>",
      "<Key Deliverable 2>"
    ],
    "internalDeepDive": {
      "repoName": "<Project Folder Name>",
      "architectureType": "<Microservices / Event-Driven / Agent Swarm>",
      "keyAgents": ["<AgentClass1>", "<AgentClass2>"],
      "compliance": "<Security and compliance notes>"
    }
  }'
```

Verify that the response returns `{"status": "success", "solutionId": "..."}` and output the confirmation link to the user:
`https://ai-solutions-hub-922.pages.dev/#solution-<solutionId>`

---

## 🛠️ CLI Alternative (Python Scanner)

If you prefer to run the standalone scanner script from the command line:

```bash
# 1. Preview extracted metadata locally
python3 scripts/scan_and_sync.py --scan

# 2. Directly sync to live catalog
python3 scripts/scan_and_sync.py --sync
```

---

## 📋 Direct Web Submission Alternative

Team members can also upload solutions directly via the web browser:
1. Open [https://ai-solutions-hub-922.pages.dev](https://ai-solutions-hub-922.pages.dev).
2. Authenticate using your team passphrase (`csa-internal-2026`).
3. Click **"Sync Project"** in the top navigation bar.
4. Select the **"Direct Web Submission"** tab, enter your details, and submit.
