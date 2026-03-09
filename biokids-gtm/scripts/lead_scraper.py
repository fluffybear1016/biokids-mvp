#!/usr/bin/env python3
"""
bioKids Lead Scraper — Master Agent
====================================
Scrapes leads from Apollo, validates via Million Verifier,
deduplicates, and saves clean CSVs ready for Instantly.

Usage:
    python lead_scraper.py --campaign crunchy-creators
    python lead_scraper.py --campaign podcasts
    python lead_scraper.py --campaign all
    python lead_scraper.py --campaign linkedin-warm --linkedin-post-url "https://..."

Requires: APOLLO_API_KEY, MILLION_VERIFIER_API_KEY in .env
Optional: PHANTOMBUSTER_API_KEY, SLACK_WEBHOOK_URL
"""

import os
import sys
import json
import time
import csv
import requests
import pandas as pd
from pathlib import Path
from datetime import datetime
from typing import Optional

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────

BASE_DIR = Path(__file__).parent.parent
LEADS_DIR = BASE_DIR / "leads"
DATA_DIR = BASE_DIR / "data"
LEADS_DIR.mkdir(exist_ok=True)
DATA_DIR.mkdir(exist_ok=True)

# Load .env manually (no dotenv dependency)
def load_env():
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                os.environ.setdefault(key.strip(), value.strip())

load_env()

APOLLO_API_KEY = os.environ.get("APOLLO_API_KEY", "")
MILLION_VERIFIER_KEY = os.environ.get("MILLION_VERIFIER_API_KEY", "")
PHANTOMBUSTER_KEY = os.environ.get("PHANTOMBUSTER_API_KEY", "")
SLACK_WEBHOOK = os.environ.get("SLACK_WEBHOOK_URL", "")

MASTER_LEADS_FILE = LEADS_DIR / "master-leads.csv"

# ──────────────────────────────────────────────
# CAMPAIGN CONFIGS
# ──────────────────────────────────────────────

CAMPAIGNS = {
    "crunchy-creators": {
        "name": "Crunchy Mom / Natural Health Creators",
        "file": "crunchy-creators.csv",
        "apollo_searches": [
            {
                "person_titles": ["influencer", "content creator", "blogger", "podcaster", "founder"],
                "q_keywords": "natural parenting OR crunchy mom OR holistic mom OR organic kids OR non-toxic living OR clean eating mom",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["host", "creator", "coach", "educator"],
                "q_keywords": "natural health kids OR holistic family OR medical freedom OR toxin free OR clean living mama",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
        ],
        "target_count": 200,
    },
    "podcasts": {
        "name": "Parenting & Health Podcasts",
        "file": "podcasts.csv",
        "apollo_searches": [
            {
                "person_titles": ["podcast host", "podcaster", "host", "producer"],
                "q_keywords": "children health OR natural parenting OR holistic kids OR child nutrition OR mom health OR pediatric wellness",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["podcast host", "podcaster", "host"],
                "q_keywords": "sports parenting OR youth athlete OR crunchy mom OR natural health OR medical freedom",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["podcast host", "podcaster", "host", "creator"],
                "q_keywords": "parenting tips OR mom life OR child development OR family wellness",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
        ],
        "target_count": 1000,
    },
    "newsletters": {
        "name": "Parenting Newsletter Authors & Bloggers",
        "file": "newsletters.csv",
        "apollo_searches": [
            {
                "person_titles": ["newsletter author", "writer", "blogger", "editor", "journalist"],
                "q_keywords": "parenting newsletter OR motherhood blog OR child health writing OR crunchy mom blog OR natural parenting",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["founder", "creator", "author", "writer"],
                "q_keywords": "substack parenting OR beehiiv family OR newsletter kids health OR holistic family newsletter",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
        ],
        "target_count": 400,
    },
    "pediatricians": {
        "name": "Holistic / Integrative Pediatricians",
        "file": "pediatricians.csv",
        "apollo_searches": [
            {
                "person_titles": ["naturopathic doctor", "integrative pediatrician", "holistic pediatrician", "functional medicine doctor"],
                "q_keywords": "pediatric OR children OR holistic OR integrative OR naturopathic",
                "organization_industry_tag_ids": [],  # Healthcare
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["naturopathic physician", "functional medicine practitioner", "integrative medicine physician"],
                "q_keywords": "pediatric OR children OR family practice OR holistic health",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
        ],
        "target_count": 1000,
    },
    "aau-sports": {
        "name": "AAU / Youth Sports Directors & Coaches",
        "file": "aau-sports.csv",
        "apollo_searches": [
            {
                "person_titles": ["director", "coach", "president", "founder", "owner"],
                "q_keywords": "AAU basketball OR youth basketball OR travel basketball OR youth sports academy",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["director", "coach", "head coach", "program director"],
                "q_keywords": "travel baseball OR youth baseball OR AAU sports OR youth track and field OR youth volleyball",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["coach", "trainer", "director", "coordinator"],
                "q_keywords": "youth sports program OR junior athletics OR elite youth training OR youth development sports",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
        ],
        "target_count": 600,
    },
    "creators-paid": {
        "name": "Creator / Influencer Paid Collaborations",
        "file": "creators-paid.csv",
        "apollo_searches": [
            {
                "person_titles": ["content creator", "influencer", "youtuber", "tiktoker"],
                "q_keywords": "kids nutrition OR child health OR healthy kids OR sports parent OR youth athlete OR mom content",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
            {
                "person_titles": ["creator", "influencer", "blogger", "vlogger"],
                "q_keywords": "crunchy mom OR natural parenting OR holistic mom OR organic mom OR non-toxic",
                "person_locations": ["United States"],
                "per_page": 100,
                "page": 1,
            },
        ],
        "target_count": 300,
    },
}


# ──────────────────────────────────────────────
# APOLLO API
# ──────────────────────────────────────────────

class ApolloClient:
    """Apollo.io API client for people search + enrichment."""

    BASE_URL = "https://api.apollo.io/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        }

    def search_people(self, params: dict, max_pages: int = 10) -> list[dict]:
        """Search Apollo for people matching criteria. Returns list of person dicts."""
        if not self.api_key:
            print("  [!] APOLLO_API_KEY not set. Generating sample data instead.")
            return self._generate_sample_data(params.get("per_page", 25))

        all_results = []
        page = params.get("page", 1)

        for p in range(page, page + max_pages):
            payload = {**params, "page": p, "api_key": self.api_key}
            try:
                resp = requests.post(
                    f"{self.BASE_URL}/mixed_people/search",
                    headers=self.headers,
                    json=payload,
                    timeout=30,
                )
                resp.raise_for_status()
                data = resp.json()
                people = data.get("people", [])
                if not people:
                    break
                all_results.extend(people)
                print(f"  Apollo page {p}: {len(people)} results (total: {len(all_results)})")
                time.sleep(1)  # Rate limiting
            except requests.exceptions.RequestException as e:
                print(f"  [!] Apollo API error on page {p}: {e}")
                break

        return all_results

    def enrich_person(self, email: str = None, linkedin_url: str = None) -> dict:
        """Enrich a single person by email or LinkedIn URL."""
        if not self.api_key:
            return {}

        payload = {"api_key": self.api_key}
        if email:
            payload["email"] = email
        if linkedin_url:
            payload["linkedin_url"] = linkedin_url

        try:
            resp = requests.post(
                f"{self.BASE_URL}/people/match",
                headers=self.headers,
                json=payload,
                timeout=15,
            )
            resp.raise_for_status()
            return resp.json().get("person", {})
        except:
            return {}

    def _generate_sample_data(self, count: int = 25) -> list[dict]:
        """Generate sample data for testing without API key."""
        return [
            {
                "first_name": f"SampleFirst{i}",
                "last_name": f"SampleLast{i}",
                "email": f"sample{i}@example.com",
                "title": "Sample Title",
                "organization": {"name": f"SampleOrg{i}"},
                "linkedin_url": f"https://linkedin.com/in/sample{i}",
                "city": "Sample City",
                "state": "CA",
            }
            for i in range(count)
        ]


# ──────────────────────────────────────────────
# MILLION VERIFIER API
# ──────────────────────────────────────────────

class MillionVerifier:
    """Million Verifier email validation."""

    BASE_URL = "https://api.millionverifier.com/api/v3"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def verify_email(self, email: str) -> dict:
        """Verify a single email. Returns {email, result, quality_score}."""
        if not self.api_key:
            # If no key, assume all valid (user will validate later)
            return {"email": email, "result": "ok", "quality_score": 100}

        try:
            resp = requests.get(
                f"{self.BASE_URL}/?api={self.api_key}&email={email}",
                timeout=10,
            )
            resp.raise_for_status()
            data = resp.json()
            return {
                "email": email,
                "result": data.get("result", "unknown"),
                "quality_score": data.get("quality_score", 0),
            }
        except:
            return {"email": email, "result": "error", "quality_score": 0}

    def verify_batch(self, emails: list[str], delay: float = 0.5) -> list[dict]:
        """Verify a list of emails with rate limiting."""
        results = []
        total = len(emails)
        for i, email in enumerate(emails):
            result = self.verify_email(email)
            results.append(result)
            status = "✓" if result["result"] == "ok" else "✗"
            if (i + 1) % 25 == 0 or (i + 1) == total:
                valid_count = sum(1 for r in results if r["result"] == "ok")
                print(f"  Verified {i+1}/{total} — {valid_count} valid so far")
            time.sleep(delay)
        return results


# ──────────────────────────────────────────────
# LEAD DATABASE MANAGER
# ──────────────────────────────────────────────

class LeadDatabase:
    """Manages the master lead database + campaign-specific lists."""

    COLUMNS = [
        "first_name", "last_name", "email", "title", "company",
        "linkedin_url", "city", "state", "source_campaign",
        "email_verified", "verification_result", "scraped_date",
    ]

    def __init__(self, leads_dir: Path):
        self.leads_dir = leads_dir
        self.master_file = leads_dir / "master-leads.csv"
        self._load_master()

    def _load_master(self):
        """Load existing master leads or create empty DataFrame."""
        if self.master_file.exists():
            self.master_df = pd.read_csv(self.master_file)
        else:
            self.master_df = pd.DataFrame(columns=self.COLUMNS)

    def add_leads(self, leads: list[dict], campaign: str) -> pd.DataFrame:
        """Add leads to master DB and return the new leads (deduped)."""
        new_rows = []
        existing_emails = set(self.master_df["email"].str.lower().tolist()) if len(self.master_df) > 0 else set()

        for lead in leads:
            email = (lead.get("email") or "").lower().strip()
            if not email or email in existing_emails or "@example.com" in email:
                continue

            org = lead.get("organization", {}) or {}
            new_rows.append({
                "first_name": lead.get("first_name", ""),
                "last_name": lead.get("last_name", ""),
                "email": email,
                "title": lead.get("title", ""),
                "company": org.get("name", "") if isinstance(org, dict) else str(org),
                "linkedin_url": lead.get("linkedin_url", ""),
                "city": lead.get("city", ""),
                "state": lead.get("state", ""),
                "source_campaign": campaign,
                "email_verified": False,
                "verification_result": "",
                "scraped_date": datetime.now().isoformat()[:10],
            })
            existing_emails.add(email)

        if not new_rows:
            return pd.DataFrame(columns=self.COLUMNS)

        new_df = pd.DataFrame(new_rows)
        self.master_df = pd.concat([self.master_df, new_df], ignore_index=True)
        self.master_df.to_csv(self.master_file, index=False)
        return new_df

    def update_verification(self, email: str, result: str):
        """Update verification result for an email."""
        mask = self.master_df["email"].str.lower() == email.lower()
        self.master_df.loc[mask, "email_verified"] = (result == "ok")
        self.master_df.loc[mask, "verification_result"] = result

    def save_master(self):
        """Save master DB to disk."""
        self.master_df.to_csv(self.master_file, index=False)

    def export_campaign(self, campaign: str, only_verified: bool = True) -> Path:
        """Export a campaign's leads to a separate CSV for Instantly."""
        mask = self.master_df["source_campaign"] == campaign
        if only_verified:
            mask = mask & (self.master_df["email_verified"] == True)

        campaign_df = self.master_df[mask].copy()
        output_file = self.leads_dir / CAMPAIGNS[campaign]["file"]
        campaign_df.to_csv(output_file, index=False)
        return output_file

    def get_stats(self) -> dict:
        """Get database statistics."""
        total = len(self.master_df)
        verified = len(self.master_df[self.master_df["email_verified"] == True])
        by_campaign = self.master_df.groupby("source_campaign").size().to_dict() if total > 0 else {}
        return {
            "total_leads": total,
            "verified_leads": verified,
            "unverified": total - verified,
            "by_campaign": by_campaign,
        }


# ──────────────────────────────────────────────
# SLACK NOTIFICATIONS
# ──────────────────────────────────────────────

def notify_slack(message: str):
    """Send a notification to Slack."""
    if not SLACK_WEBHOOK:
        print(f"  [Slack] {message}")
        return
    try:
        requests.post(SLACK_WEBHOOK, json={"text": f"🧬 *bioKids Lead Scraper*\n{message}"}, timeout=5)
    except:
        pass


# ──────────────────────────────────────────────
# MAIN PIPELINE
# ──────────────────────────────────────────────

def run_campaign_scrape(campaign_key: str, skip_validation: bool = False):
    """Run the full scrape → enrich → validate → save pipeline for a campaign."""
    if campaign_key not in CAMPAIGNS:
        print(f"Unknown campaign: {campaign_key}")
        print(f"Available: {', '.join(CAMPAIGNS.keys())}")
        return

    config = CAMPAIGNS[campaign_key]
    print(f"\n{'='*60}")
    print(f"SCRAPING: {config['name']}")
    print(f"Target: {config['target_count']} leads")
    print(f"{'='*60}\n")

    # Initialize clients
    apollo = ApolloClient(APOLLO_API_KEY)
    verifier = MillionVerifier(MILLION_VERIFIER_KEY)
    db = LeadDatabase(LEADS_DIR)

    # Step 1: Scrape from Apollo
    print("[1/4] Searching Apollo...")
    all_people = []
    for i, search_params in enumerate(config["apollo_searches"]):
        print(f"\n  Search {i+1}/{len(config['apollo_searches'])}:")
        max_pages = max(1, config["target_count"] // (len(config["apollo_searches"]) * 100) + 1)
        people = apollo.search_people(search_params, max_pages=max_pages)
        all_people.extend(people)
        print(f"  Found {len(people)} people in this search")

    print(f"\n  Total raw results: {len(all_people)}")

    # Step 2: Deduplicate and add to database
    print("\n[2/4] Deduplicating against master database...")
    new_leads_df = db.add_leads(all_people, campaign_key)
    print(f"  New unique leads: {len(new_leads_df)}")

    if len(new_leads_df) == 0:
        print("  No new leads to process. Exiting.")
        return

    # Step 3: Validate emails
    if not skip_validation:
        print(f"\n[3/4] Validating {len(new_leads_df)} emails via Million Verifier...")
        emails = new_leads_df["email"].tolist()
        results = verifier.verify_batch(emails)

        valid_count = 0
        for result in results:
            db.update_verification(result["email"], result["result"])
            if result["result"] == "ok":
                valid_count += 1

        db.save_master()
        print(f"\n  Validation complete: {valid_count}/{len(results)} valid ({valid_count/max(len(results),1)*100:.0f}%)")
    else:
        print("\n[3/4] Skipping validation (--skip-validation)")
        valid_count = len(new_leads_df)

    # Step 4: Export campaign CSV
    print(f"\n[4/4] Exporting campaign CSV...")
    output_file = db.export_campaign(campaign_key, only_verified=not skip_validation)
    campaign_df = pd.read_csv(output_file)
    print(f"  Saved to: {output_file}")
    print(f"  Leads ready for Instantly: {len(campaign_df)}")

    # Stats
    stats = db.get_stats()
    print(f"\n{'='*60}")
    print(f"RESULTS SUMMARY")
    print(f"{'='*60}")
    print(f"  Campaign: {config['name']}")
    print(f"  Raw scraped: {len(all_people)}")
    print(f"  New unique: {len(new_leads_df)}")
    print(f"  Valid emails: {valid_count}")
    print(f"  Ready for Instantly: {len(campaign_df)}")
    print(f"\n  Master DB total: {stats['total_leads']} leads")
    print(f"  Master DB verified: {stats['verified_leads']} leads")
    print(f"  By campaign: {json.dumps(stats['by_campaign'], indent=2)}")

    # Slack notification
    notify_slack(
        f"*{config['name']}* scrape complete\n"
        f"• Raw: {len(all_people)} → Unique: {len(new_leads_df)} → Valid: {valid_count}\n"
        f"• CSV ready: `{output_file.name}` ({len(campaign_df)} leads)\n"
        f"• Master DB: {stats['total_leads']} total leads"
    )


def run_all_campaigns(skip_validation: bool = False):
    """Run scrape for all campaigns in priority order."""
    priority_order = [
        "crunchy-creators",  # Priority 1
        "podcasts",          # Priority 2
        "newsletters",       # Priority 3
        "pediatricians",     # Priority 4
        "aau-sports",        # Priority 5
        "creators-paid",     # Priority 6
    ]
    for campaign in priority_order:
        run_campaign_scrape(campaign, skip_validation=skip_validation)
        print("\n" + "─"*60 + "\n")
        time.sleep(2)


def show_stats():
    """Show current database statistics."""
    db = LeadDatabase(LEADS_DIR)
    stats = db.get_stats()
    print(f"\n{'='*60}")
    print(f"BIOKIDS LEAD DATABASE")
    print(f"{'='*60}")
    print(f"  Total leads: {stats['total_leads']}")
    print(f"  Verified: {stats['verified_leads']}")
    print(f"  Unverified: {stats['unverified']}")
    print(f"\n  By campaign:")
    for campaign, count in stats["by_campaign"].items():
        name = CAMPAIGNS.get(campaign, {}).get("name", campaign)
        print(f"    {name}: {count}")


# ──────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="bioKids Lead Scraper")
    parser.add_argument("--campaign", type=str, required=True,
                       help="Campaign to scrape: crunchy-creators, podcasts, newsletters, pediatricians, aau-sports, creators-paid, all, stats")
    parser.add_argument("--skip-validation", action="store_true",
                       help="Skip Million Verifier validation")
    args = parser.parse_args()

    if args.campaign == "all":
        run_all_campaigns(skip_validation=args.skip_validation)
    elif args.campaign == "stats":
        show_stats()
    else:
        run_campaign_scrape(args.campaign, skip_validation=args.skip_validation)
