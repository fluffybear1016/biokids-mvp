#!/usr/bin/env python3
"""
bioKids Instantly Loader — Campaign Loader Agent
==================================================
Loads validated lead CSVs into Instantly AI campaigns.
Creates campaigns, adds leads, and configures sequences.

Usage:
    python instantly_loader.py --campaign crunchy-creators
    python instantly_loader.py --campaign all
    python instantly_loader.py --status

Requires: INSTANTLY_API_KEY in .env
"""

import os
import sys
import json
import time
import requests
import pandas as pd
from pathlib import Path
from datetime import datetime

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────

BASE_DIR = Path(__file__).parent.parent
LEADS_DIR = BASE_DIR / "leads"
CAMPAIGNS_DIR = BASE_DIR / "campaigns"

# Load .env
def load_env():
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                os.environ.setdefault(key.strip(), value.strip())

load_env()

INSTANTLY_API_KEY = os.environ.get("INSTANTLY_API_KEY", "")
SLACK_WEBHOOK = os.environ.get("SLACK_WEBHOOK_URL", "")

# Campaign name mapping
CAMPAIGN_MAP = {
    "crunchy-creators": {
        "instantly_name": "biokids-crunchy-creators",
        "csv_file": "crunchy-creators.csv",
        "display_name": "Crunchy Mom / Natural Health Creators",
    },
    "podcasts": {
        "instantly_name": "biokids-podcasts",
        "csv_file": "podcasts.csv",
        "display_name": "Parenting & Health Podcasts",
    },
    "newsletters": {
        "instantly_name": "biokids-newsletters",
        "csv_file": "newsletters.csv",
        "display_name": "Newsletter Authors & Bloggers",
    },
    "pediatricians": {
        "instantly_name": "biokids-pediatricians",
        "csv_file": "pediatricians.csv",
        "display_name": "Holistic / Integrative Pediatricians",
    },
    "aau-sports": {
        "instantly_name": "biokids-aau-sports",
        "csv_file": "aau-sports.csv",
        "display_name": "AAU / Youth Sports Directors",
    },
    "creators-paid": {
        "instantly_name": "biokids-creators-paid",
        "csv_file": "creators-paid.csv",
        "display_name": "Creator Paid Collaborations",
    },
    "linkedin-warm": {
        "instantly_name": "biokids-linkedin-warm",
        "csv_file": "linkedin-warm.csv",
        "display_name": "LinkedIn Warm Leads",
    },
}


# ──────────────────────────────────────────────
# INSTANTLY API CLIENT
# ──────────────────────────────────────────────

class InstantlyClient:
    """Instantly.ai API client for campaign management."""

    BASE_URL = "https://api.instantly.ai/api/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def _get(self, endpoint: str, params: dict = None) -> dict:
        params = params or {}
        params["api_key"] = self.api_key
        resp = requests.get(f"{self.BASE_URL}/{endpoint}", params=params, timeout=15)
        resp.raise_for_status()
        return resp.json()

    def _post(self, endpoint: str, data: dict = None) -> dict:
        data = data or {}
        data["api_key"] = self.api_key
        resp = requests.post(f"{self.BASE_URL}/{endpoint}", json=data, timeout=15)
        resp.raise_for_status()
        return resp.json()

    def list_campaigns(self) -> list:
        """List all campaigns."""
        try:
            return self._get("campaign/list")
        except Exception as e:
            print(f"  [!] Error listing campaigns: {e}")
            return []

    def create_campaign(self, name: str) -> dict:
        """Create a new campaign."""
        try:
            result = self._post("campaign/create", {"name": name})
            print(f"  Created campaign: {name}")
            return result
        except Exception as e:
            print(f"  [!] Error creating campaign: {e}")
            return {}

    def add_leads_to_campaign(self, campaign_id: str, leads: list[dict]) -> dict:
        """Add leads to a campaign. Each lead needs at minimum 'email'."""
        try:
            result = self._post("lead/add", {
                "campaign_id": campaign_id,
                "leads": leads,
                "skip_if_in_workspace": True,
            })
            return result
        except Exception as e:
            print(f"  [!] Error adding leads: {e}")
            return {}

    def get_campaign_summary(self, campaign_id: str) -> dict:
        """Get campaign analytics summary."""
        try:
            return self._get("analytics/campaign/summary", {"campaign_id": campaign_id})
        except Exception as e:
            print(f"  [!] Error getting summary: {e}")
            return {}

    def list_leads(self, campaign_id: str) -> list:
        """List leads in a campaign."""
        try:
            return self._get("lead/list", {"campaign_id": campaign_id})
        except Exception as e:
            print(f"  [!] Error listing leads: {e}")
            return []


# ──────────────────────────────────────────────
# LEAD FORMATTER
# ──────────────────────────────────────────────

def format_leads_for_instantly(csv_file: Path) -> list[dict]:
    """Read a campaign CSV and format leads for Instantly API."""
    if not csv_file.exists():
        print(f"  [!] CSV not found: {csv_file}")
        return []

    df = pd.read_csv(csv_file)
    leads = []

    for _, row in df.iterrows():
        email = str(row.get("email", "")).strip()
        if not email or email == "nan":
            continue

        lead = {
            "email": email,
            "first_name": str(row.get("first_name", "")).strip(),
            "last_name": str(row.get("last_name", "")).strip(),
            "company_name": str(row.get("company", "")).strip(),
        }

        # Add custom variables for email templates
        lead["custom_variables"] = {
            "title": str(row.get("title", "")).strip(),
            "city": str(row.get("city", "")).strip(),
            "state": str(row.get("state", "")).strip(),
            "linkedin": str(row.get("linkedin_url", "")).strip(),
        }

        # Clean up nan values
        for key in lead:
            if lead[key] == "nan":
                lead[key] = ""
        for key in lead.get("custom_variables", {}):
            if lead["custom_variables"][key] == "nan":
                lead["custom_variables"][key] = ""

        leads.append(lead)

    return leads


# ──────────────────────────────────────────────
# MAIN PIPELINE
# ──────────────────────────────────────────────

def load_campaign(campaign_key: str):
    """Load a campaign's leads into Instantly."""
    if campaign_key not in CAMPAIGN_MAP:
        print(f"Unknown campaign: {campaign_key}")
        print(f"Available: {', '.join(CAMPAIGN_MAP.keys())}")
        return

    config = CAMPAIGN_MAP[campaign_key]
    csv_file = LEADS_DIR / config["csv_file"]

    print(f"\n{'='*60}")
    print(f"LOADING: {config['display_name']}")
    print(f"{'='*60}\n")

    if not INSTANTLY_API_KEY:
        print("[!] INSTANTLY_API_KEY not set in .env")
        print("    Set the key and try again.")
        print(f"\n    Lead CSV is ready at: {csv_file}")
        print(f"    You can manually upload this CSV in Instantly's dashboard.")
        return

    client = InstantlyClient(INSTANTLY_API_KEY)

    # Step 1: Format leads
    print("[1/3] Reading leads from CSV...")
    leads = format_leads_for_instantly(csv_file)
    print(f"  Leads to load: {len(leads)}")

    if not leads:
        print("  No leads to load. Run lead_scraper.py first.")
        return

    # Step 2: Find or create campaign
    print(f"\n[2/3] Finding or creating campaign '{config['instantly_name']}'...")
    campaigns = client.list_campaigns()
    campaign_id = None

    for c in campaigns:
        if isinstance(c, dict) and c.get("name") == config["instantly_name"]:
            campaign_id = c.get("id")
            print(f"  Found existing campaign: {campaign_id}")
            break

    if not campaign_id:
        result = client.create_campaign(config["instantly_name"])
        campaign_id = result.get("id")
        if not campaign_id:
            print("  [!] Failed to create campaign. Load leads manually in Instantly dashboard.")
            return

    # Step 3: Add leads in batches
    print(f"\n[3/3] Loading {len(leads)} leads into Instantly...")
    batch_size = 100
    loaded = 0

    for i in range(0, len(leads), batch_size):
        batch = leads[i:i + batch_size]
        result = client.add_leads_to_campaign(campaign_id, batch)
        loaded += len(batch)
        print(f"  Loaded batch {i//batch_size + 1}: {loaded}/{len(leads)}")
        time.sleep(1)

    print(f"\n{'='*60}")
    print(f"COMPLETE")
    print(f"{'='*60}")
    print(f"  Campaign: {config['display_name']}")
    print(f"  Instantly campaign: {config['instantly_name']}")
    print(f"  Leads loaded: {loaded}")
    print(f"\n  Next steps:")
    print(f"  1. Open Instantly → find '{config['instantly_name']}'")
    print(f"  2. Set up the email sequence (templates in campaigns/{campaign_key}.md)")
    print(f"  3. Set send rate to 40/day per mailbox")
    print(f"  4. Enable the campaign")

    # Slack notification
    if SLACK_WEBHOOK:
        try:
            requests.post(SLACK_WEBHOOK, json={
                "text": f"🧬 *bioKids Instantly Loader*\n"
                        f"*{config['display_name']}* loaded\n"
                        f"• {loaded} leads added to `{config['instantly_name']}`\n"
                        f"• Ready to configure sequence and launch"
            }, timeout=5)
        except:
            pass


def load_all_campaigns():
    """Load all campaigns in priority order."""
    priority_order = [
        "crunchy-creators",
        "podcasts",
        "newsletters",
        "pediatricians",
        "aau-sports",
        "creators-paid",
    ]
    for campaign in priority_order:
        csv_file = LEADS_DIR / CAMPAIGN_MAP[campaign]["csv_file"]
        if csv_file.exists() and len(pd.read_csv(csv_file)) > 0:
            load_campaign(campaign)
            time.sleep(2)
        else:
            print(f"\n  Skipping {campaign} — no leads CSV found. Run lead_scraper.py first.")


def show_status():
    """Show status of all campaigns."""
    print(f"\n{'='*60}")
    print(f"CAMPAIGN STATUS")
    print(f"{'='*60}\n")

    for key, config in CAMPAIGN_MAP.items():
        csv_file = LEADS_DIR / config["csv_file"]
        if csv_file.exists():
            df = pd.read_csv(csv_file)
            count = len(df)
            status = f"✓ {count} leads ready"
        else:
            status = "✗ No CSV — run lead_scraper.py"
        print(f"  {config['display_name']:45s} {status}")

    # Master DB
    master = LEADS_DIR / "master-leads.csv"
    if master.exists():
        df = pd.read_csv(master)
        verified = len(df[df.get("email_verified", False) == True]) if "email_verified" in df.columns else 0
        print(f"\n  Master Database: {len(df)} total, {verified} verified")


# ──────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="bioKids Instantly Loader")
    parser.add_argument("--campaign", type=str,
                       help="Campaign to load: crunchy-creators, podcasts, etc., or 'all'")
    parser.add_argument("--status", action="store_true",
                       help="Show status of all campaigns")
    args = parser.parse_args()

    if args.status:
        show_status()
    elif args.campaign == "all":
        load_all_campaigns()
    elif args.campaign:
        load_campaign(args.campaign)
    else:
        parser.print_help()
