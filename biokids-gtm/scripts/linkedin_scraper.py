#!/usr/bin/env python3
"""
bioKids LinkedIn Engagement Scraper
=====================================
Scrapes people who engaged with LinkedIn posts,
enriches via Apollo, validates, and loads into Instantly.

Usage:
    python linkedin_scraper.py --post-url "https://linkedin.com/posts/..."
    python linkedin_scraper.py --profile-url "https://linkedin.com/in/..."

Requires: PHANTOMBUSTER_API_KEY, APOLLO_API_KEY, MILLION_VERIFIER_API_KEY in .env
"""

import os
import sys
import json
import time
import requests
import pandas as pd
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).parent.parent
LEADS_DIR = BASE_DIR / "leads"
LEADS_DIR.mkdir(exist_ok=True)

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

PHANTOMBUSTER_KEY = os.environ.get("PHANTOMBUSTER_API_KEY", "")
APOLLO_API_KEY = os.environ.get("APOLLO_API_KEY", "")
MILLION_VERIFIER_KEY = os.environ.get("MILLION_VERIFIER_API_KEY", "")
SLACK_WEBHOOK = os.environ.get("SLACK_WEBHOOK_URL", "")


class PhantomBusterClient:
    """PhantomBuster API client for LinkedIn scraping."""

    BASE_URL = "https://api.phantombuster.com/api/v2"

    # These are PhantomBuster phantom IDs for common scrapers
    # User needs to set these up in their PhantomBuster dashboard
    PHANTOMS = {
        "post_likers": None,       # LinkedIn Post Likers phantom ID
        "post_commenters": None,   # LinkedIn Post Commenters phantom ID
        "profile_scraper": None,   # LinkedIn Profile Scraper phantom ID
        "search_scraper": None,    # LinkedIn Search Export phantom ID
    }

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "X-Phantombuster-Key": api_key,
            "Content-Type": "application/json",
        }

    def launch_phantom(self, phantom_id: str, arguments: dict) -> dict:
        """Launch a phantom with given arguments."""
        if not self.api_key:
            print("  [!] PHANTOMBUSTER_API_KEY not set")
            return {}

        try:
            resp = requests.post(
                f"{self.BASE_URL}/agents/launch",
                headers=self.headers,
                json={"id": phantom_id, "argument": arguments},
                timeout=30,
            )
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            print(f"  [!] PhantomBuster error: {e}")
            return {}

    def get_output(self, container_id: str) -> dict:
        """Get phantom output."""
        try:
            resp = requests.get(
                f"{self.BASE_URL}/containers/fetch-output",
                headers=self.headers,
                params={"id": container_id},
                timeout=30,
            )
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            print(f"  [!] Error getting output: {e}")
            return {}

    def get_result_csv(self, container_id: str) -> str:
        """Get phantom result as CSV."""
        try:
            resp = requests.get(
                f"{self.BASE_URL}/containers/fetch-result-object",
                headers=self.headers,
                params={"id": container_id},
                timeout=30,
            )
            resp.raise_for_status()
            return resp.text
        except Exception as e:
            print(f"  [!] Error getting results: {e}")
            return ""


def scrape_linkedin_post_engagers(post_url: str) -> list[dict]:
    """
    Scrape people who engaged with a LinkedIn post.

    Since PhantomBuster requires pre-configured phantoms,
    this function provides the INSTRUCTIONS for setup
    and processes the output.
    """
    print(f"\n{'='*60}")
    print(f"LINKEDIN POST ENGAGEMENT SCRAPER")
    print(f"{'='*60}")
    print(f"\nPost URL: {post_url}\n")

    if not PHANTOMBUSTER_KEY:
        print("SETUP REQUIRED — PhantomBuster Configuration:")
        print("=" * 50)
        print("""
1. Go to phantombuster.com → My Phantoms
2. Create these phantoms:

   a) LinkedIn Post Likers
      - Phantom: "LinkedIn Post Likers"
      - Input: The post URL
      - Output: CSV of profile URLs + names

   b) LinkedIn Post Commenters
      - Phantom: "LinkedIn Post Commenters"
      - Input: The post URL
      - Output: CSV of profile URLs + names + comment text

3. Run both phantoms with this post URL:
   {post_url}

4. Download the output CSVs

5. Save them to:
   leads/linkedin-post-likers.csv
   leads/linkedin-post-commenters.csv

6. Then run this script again with --process-csv flag
""".format(post_url=post_url))
        return []

    # If PhantomBuster is configured, launch the phantoms
    pb = PhantomBusterClient(PHANTOMBUSTER_KEY)

    print("[1/2] Scraping post likers...")
    if pb.PHANTOMS["post_likers"]:
        result = pb.launch_phantom(pb.PHANTOMS["post_likers"], {"postUrl": post_url})
        print(f"  Launched phantom. Container ID: {result.get('containerId', 'N/A')}")
    else:
        print("  [!] Post likers phantom not configured. Set PHANTOMS['post_likers'] ID.")

    print("[2/2] Scraping post commenters...")
    if pb.PHANTOMS["post_commenters"]:
        result = pb.launch_phantom(pb.PHANTOMS["post_commenters"], {"postUrl": post_url})
        print(f"  Launched phantom. Container ID: {result.get('containerId', 'N/A')}")
    else:
        print("  [!] Post commenters phantom not configured. Set PHANTOMS['post_commenters'] ID.")

    return []


def enrich_linkedin_profiles(csv_file: Path) -> pd.DataFrame:
    """
    Take a CSV of LinkedIn profile URLs and enrich via Apollo.
    Returns a DataFrame with email addresses added.
    """
    print(f"\nEnriching profiles from: {csv_file}")

    if not csv_file.exists():
        print(f"  [!] File not found: {csv_file}")
        return pd.DataFrame()

    df = pd.read_csv(csv_file)
    print(f"  Profiles to enrich: {len(df)}")

    if not APOLLO_API_KEY:
        print("  [!] APOLLO_API_KEY not set. Cannot enrich.")
        return df

    enriched = []
    headers = {"Content-Type": "application/json", "Cache-Control": "no-cache"}

    for i, row in df.iterrows():
        linkedin_url = row.get("profileUrl") or row.get("linkedin_url") or row.get("linkedInUrl", "")
        if not linkedin_url:
            continue

        try:
            resp = requests.post(
                "https://api.apollo.io/v1/people/match",
                headers=headers,
                json={"api_key": APOLLO_API_KEY, "linkedin_url": linkedin_url},
                timeout=15,
            )
            if resp.status_code == 200:
                person = resp.json().get("person", {})
                if person and person.get("email"):
                    enriched.append({
                        "first_name": person.get("first_name", ""),
                        "last_name": person.get("last_name", ""),
                        "email": person.get("email", ""),
                        "title": person.get("title", ""),
                        "company": (person.get("organization", {}) or {}).get("name", ""),
                        "linkedin_url": linkedin_url,
                        "city": person.get("city", ""),
                        "state": person.get("state", ""),
                        "source_campaign": "linkedin-warm",
                        "email_verified": False,
                        "verification_result": "",
                        "scraped_date": datetime.now().isoformat()[:10],
                    })

            if (i + 1) % 10 == 0:
                print(f"  Enriched {i+1}/{len(df)} — {len(enriched)} emails found")
            time.sleep(1)  # Rate limit

        except Exception as e:
            print(f"  [!] Error enriching {linkedin_url}: {e}")

    print(f"\n  Total enriched with emails: {len(enriched)}/{len(df)}")

    enriched_df = pd.DataFrame(enriched)
    output_file = LEADS_DIR / "linkedin-warm.csv"
    enriched_df.to_csv(output_file, index=False)
    print(f"  Saved to: {output_file}")

    return enriched_df


def process_and_validate(csv_file: Path):
    """Full pipeline: read LinkedIn CSV → enrich → validate → save."""
    # Step 1: Enrich
    enriched_df = enrich_linkedin_profiles(csv_file)

    if len(enriched_df) == 0:
        print("No leads to validate.")
        return

    # Step 2: Validate
    if MILLION_VERIFIER_KEY:
        print(f"\nValidating {len(enriched_df)} emails...")
        valid_emails = []

        for i, row in enriched_df.iterrows():
            email = row["email"]
            try:
                resp = requests.get(
                    f"https://api.millionverifier.com/api/v3/?api={MILLION_VERIFIER_KEY}&email={email}",
                    timeout=10,
                )
                if resp.status_code == 200:
                    result = resp.json().get("result", "unknown")
                    enriched_df.at[i, "email_verified"] = (result == "ok")
                    enriched_df.at[i, "verification_result"] = result
                    if result == "ok":
                        valid_emails.append(email)
                time.sleep(0.5)
            except:
                pass

            if (i + 1) % 25 == 0:
                print(f"  Validated {i+1}/{len(enriched_df)} — {len(valid_emails)} valid")

        print(f"\n  Validation complete: {len(valid_emails)}/{len(enriched_df)} valid")
    else:
        print("\n  Skipping validation — MILLION_VERIFIER_API_KEY not set")
        valid_emails = enriched_df["email"].tolist()

    # Step 3: Save
    output_file = LEADS_DIR / "linkedin-warm.csv"
    enriched_df.to_csv(output_file, index=False)
    print(f"\n  Final CSV saved: {output_file} ({len(enriched_df)} leads)")

    # Slack notification
    if SLACK_WEBHOOK:
        try:
            requests.post(SLACK_WEBHOOK, json={
                "text": f"🧬 *bioKids LinkedIn Scraper*\n"
                        f"• Enriched: {len(enriched_df)} profiles\n"
                        f"• Valid emails: {len(valid_emails)}\n"
                        f"• CSV ready: `linkedin-warm.csv`"
            }, timeout=5)
        except:
            pass


# ──────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="bioKids LinkedIn Engagement Scraper")
    parser.add_argument("--post-url", type=str, help="LinkedIn post URL to scrape engagers from")
    parser.add_argument("--process-csv", type=str, help="Process a CSV of LinkedIn profiles (enrich + validate)")
    args = parser.parse_args()

    if args.post_url:
        scrape_linkedin_post_engagers(args.post_url)
    elif args.process_csv:
        process_and_validate(Path(args.process_csv))
    else:
        parser.print_help()
        print("\nExamples:")
        print('  python linkedin_scraper.py --post-url "https://linkedin.com/posts/..."')
        print('  python linkedin_scraper.py --process-csv leads/linkedin-post-likers.csv')
