#!/usr/bin/env python3
"""
CSA × PivotRoots — AI Solutions Catalog Scanner & Sync CLI
Part of Havas Media Network

This tool scans the current repository/codebase, synthesizes the architecture,
business context, and tech stack, and securely publishes or updates the solution
entry in the centralized AI Solutions Portfolio web app.
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.error
import re
from pathlib import Path

DEFAULT_ENDPOINT = "https://ai-solutions-hub-922.pages.dev/api/solutions"
DEFAULT_AUTH_TOKEN = "csa_team_sec_2026_x89"

def extract_project_metadata(project_dir: Path):
    """Inspects project files to extract architectural metadata."""
    metadata = {
        "title": project_dir.name.replace("-", " ").replace("_", " ").title(),
        "tagline": "",
        "pillar": "intelligence",
        "maturity": "Client MVP",
        "clientContext": {
            "publicName": "Enterprise Portfolio Brand",
            "internalName": project_dir.name,
            "industry": "Enterprise Digital / MarTech"
        },
        "problem": "",
        "solution": "",
        "techStack": [],
        "metrics": [],
        "deliverables": [],
        "architecture": {
            "summary": "Automated multi-step agentic architecture",
            "nodes": []
        },
        "internalDeepDive": {
            "repoName": project_dir.name,
            "repoPath": str(project_dir.resolve()),
            "keyAgents": []
        }
    }

    # 1. Inspect package.json / requirements.txt / pyproject.toml
    pkg_json = project_dir / "package.json"
    if pkg_json.exists():
        try:
            with open(pkg_json, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if data.get("name"):
                    metadata["title"] = data["name"].replace("-", " ").title()
                if data.get("description"):
                    metadata["tagline"] = data["description"]
                deps = list(data.get("dependencies", {}).keys())
                for d in deps:
                    clean_d = d.split("/")[-1].replace("@", "")
                    if clean_d not in metadata["techStack"]:
                        metadata["techStack"].append(clean_d.title())
        except Exception:
            pass

    req_txt = project_dir / "requirements.txt"
    if req_txt.exists():
        try:
            with open(req_txt, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip().split("==")[0].split(">=")[0].strip()
                    if line and not line.startswith("#"):
                        if line not in metadata["techStack"]:
                            metadata["techStack"].append(line)
        except Exception:
            pass

    # 2. Inspect README.md
    for readme_name in ["README.md", "README", "readme.md", "PROJECT_SUMMARY.md"]:
        readme_file = project_dir / readme_name
        if readme_file.exists():
            try:
                with open(readme_file, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    lines = [l.strip() for l in content.splitlines() if l.strip()]
                    # Title from first heading
                    for l in lines:
                        if l.startswith("# "):
                            metadata["title"] = l[2:].strip()
                            break
                    # Tagline from first non-heading paragraph
                    for l in lines:
                        if not l.startswith("#") and len(l) > 20:
                            metadata["tagline"] = l[:160] + ("..." if len(l) > 160 else "")
                            break
                    
                    # Detect Problem & Solution sections
                    prob_match = re.search(r"(?:Problem|Challenge|Why|Background)[:\s\n]+([^\n#]+(?:\n[^\n#]+){1,3})", content, re.IGNORECASE)
                    if prob_match:
                        metadata["problem"] = prob_match.group(1).strip()
                    
                    sol_match = re.search(r"(?:Solution|What we built|The Idea|Architecture)[:\s\n]+([^\n#]+(?:\n[^\n#]+){1,3})", content, re.IGNORECASE)
                    if sol_match:
                        metadata["solution"] = sol_match.group(1).strip()

                    # Detect metrics
                    metric_matches = re.findall(r"(\+?\d+%\s*|\b\d+x\s*|\$\d+\w*\b|\b\d+\s*(?:sec|seconds|mins|hours|days))", content, re.IGNORECASE)
                    if metric_matches:
                        for m in metric_matches[:3]:
                            metadata["metrics"].append({"label": "Performance Indicator", "value": m.strip()})
            except Exception:
                pass
            break

    # 3. Detect Strategic Pillar
    combined_text = (metadata["title"] + " " + metadata["tagline"] + " " + " ".join(metadata["techStack"])).lower()
    if any(k in combined_text for k in ["mmm", "meridian", "attribution", "appsflyer", "gtm", "cookie", "privacy", "dpdpa", "tracking"]):
        metadata["pillar"] = "measurement"
    elif any(k in combined_text for k in ["image", "video", "creative", "diffusion", "flux", "veo", "imagen", "indic", "kannada", "brand"]):
        metadata["pillar"] = "creative"
    elif any(k in combined_text for k in ["orchestrat", "flywheel", "agentic", "pipeline", "microservice", "workflow", "mediaflow"]):
        metadata["pillar"] = "orchestration"
    elif any(k in combined_text for k in ["commerce", "mcp", "shop", "discovery", "geo", "aeo", "retail"]):
        metadata["pillar"] = "commerce"
    else:
        metadata["pillar"] = "intelligence"

    # Default fallback values if fields are missing
    if not metadata["problem"]:
        metadata["problem"] = f"Manual operational overhead and slow reaction times in {metadata['title']} operations."
    if not metadata["solution"]:
        metadata["solution"] = f"Automated AI pipeline leveraging {', '.join(metadata['techStack'][:3]) or 'autonomous agents'} to optimize performance."
    if not metadata["metrics"]:
        metadata["metrics"] = [{"label": "Operational Lift", "value": "10x Velocity", "detail": "Automated workflow acceleration"}]

    metadata["architecture"]["nodes"] = [
        {"step": "01", "name": "Signal & Event Intake", "description": "Continuous data intake from source APIs or webhooks", "tech": "Cloud Pub/Sub"},
        {"step": "02", "name": "Agent Reasoning & Policy Gate", "description": "Autonomous reasoning enforcing brand and business constraints", "tech": "Gemini 1.5 Pro"},
        {"step": "03", "name": "Multimodal Dispatch", "description": "Automated delivery to downstream platforms and dashboards", "tech": "Cloud Run"}
    ]
    metadata["deliverables"] = [
        "Production containerized service or API endpoint",
        "Automated decisioning and performance tracking"
    ]

    return metadata

def sync_solution(payload: dict, endpoint: str, auth_token: str):
    """Sends HTTP POST request to the web app API to register/update the solution."""
    url = endpoint.rstrip("/")
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {auth_token}",
            "User-Agent": "CSA-AI-Solutions-Sync/1.0"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body)
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        try:
            parsed = json.loads(err_msg)
            return {"error": True, "status": e.code, "message": parsed.get("message", err_msg)}
        except Exception:
            return {"error": True, "status": e.code, "message": err_msg}
    except Exception as e:
        return {"error": True, "message": str(e)}

def main():
    parser = argparse.ArgumentParser(description="CSA × PivotRoots AI Solutions Sync CLI")
    parser.add_argument("--dir", default=".", help="Target project directory to scan (default: current directory)")
    parser.add_argument("--endpoint", default=os.getenv("CSA_CATALOG_ENDPOINT", DEFAULT_ENDPOINT), help="API endpoint URL")
    parser.add_argument("--token", default=os.getenv("CSA_CATALOG_TOKEN", DEFAULT_AUTH_TOKEN), help="Team authorized secret token")
    parser.add_argument("--scan", action="store_true", help="Scan and display extracted metadata")
    parser.add_argument("--sync", action="store_true", help="Sync to the catalog web app")
    parser.add_argument("--json", action="store_true", help="Output raw JSON metadata")

    args = parser.parse_args()
    project_dir = Path(args.dir).resolve()

    print(f"\n⚡ Scanning repository: {project_dir.name}...")
    metadata = extract_project_metadata(project_dir)

    if args.json:
        print(json.dumps(metadata, indent=2))
        return

    print("------------------------------------------------------------")
    print(f"Title:     {metadata['title']}")
    print(f"Pillar:    {metadata['pillar'].upper()}")
    print(f"Tagline:   {metadata['tagline']}")
    print(f"Tech:      {', '.join(metadata['techStack'][:6])}")
    print(f"Metrics:   {metadata['metrics'][0]['value']} ({metadata['metrics'][0]['label']})")
    print("------------------------------------------------------------")

    if args.sync or "--sync" in sys.argv or not args.scan:
        print(f"\n🔐 Connecting to catalog endpoint: {args.endpoint}...")
        res = sync_solution(metadata, args.endpoint, args.token)
        if res.get("status") == "success":
            print(f"✅ SUCCESS: {res.get('message', 'Solution registered!')}")
            print(f"🔗 View Live: {args.endpoint.replace('/api/solutions', '')}/#solution-{res.get('solutionId')}\n")
        elif res.get("error"):
            print(f"❌ AUTHENTICATION ERROR ({res.get('status')}): {res.get('message')}")
            print("💡 Please check your CSA_CATALOG_TOKEN or verify your access with the team admin.\n")
            sys.exit(1)
        else:
            print(f"ℹ️ Response: {res}\n")

if __name__ == "__main__":
    main()
