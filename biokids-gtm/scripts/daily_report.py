#!/usr/bin/env python3
"""
bioKids Daily Report Agent
============================
Pulls metrics from Instantly + lead database,
generates a summary, and sends to Slack.

Usage:
    python daily_report.py              # Full daily report
    python daily_report.py --hot-replies  # Just check for hot replies
    python daily_report.py --weekly       # Weekly summary report

Requires: INSTANTLY_API_KEY, SLACK_WEBHOOK_URL in .env
"""

import os
import json
import time
import requests
import pandas as pd
from pathlib import Path
from datetime import datetime, timedelta

BASE_DIR = Path(__file__).parent.parent
LEADS_DIR = BASE_DIR / "leads"
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

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


def get_lead_stats() -> dict:
    """Get current lead database statistics."""
    master_file = LEADS_DIR / "master-leads.csv"
    if not master_file.exists():
        return {"total": 0, "verified": 0, "by_campaign": {}}

    df = pd.read_csv(master_file)
    verified = len(df[df.get("email_verified", False) == True]) if "email_verified" in df.columns else 0
    by_campaign = df.groupby("source_campaign").size().to_dict() if "source_campaign" in df.columns else {}

    return {
        "total": len(df),
        "verified": verified,
        "by_campaign": by_campaign,
    }


def get_instantly_stats() -> dict:
    """Pull campaign analytics from Instantly."""
    if not INSTANTLY_API_KEY:
        return {"error": "INSTANTLY_API_KEY not set"}

    stats = {}
    try:
        # Get campaign list
        resp = requests.get(
            "https://api.instantly.ai/api/v1/campaign/list",
            params={"api_key": INSTANTLY_API_KEY},
            timeout=15,
        )
        if resp.status_code == 200:
            campaigns = resp.json()
            for campaign in campaigns:
                if isinstance(campaign, dict) and "biokids" in campaign.get("name", "").lower():
                    cid = campaign.get("id", "")
                    name = campaign.get("name", "")

                    # Get summary for each campaign
                    try:
                        summary_resp = requests.get(
                            "https://api.instantly.ai/api/v1/analytics/campaign/summary",
                            params={"api_key": INSTANTLY_API_KEY, "campaign_id": cid},
                            timeout=15,
                        )
                        if summary_resp.status_code == 200:
                            stats[name] = summary_resp.json()
                    except:
                        stats[name] = {"status": "error fetching stats"}
    except Exception as e:
        return {"error": str(e)}

    return stats


def check_hot_replies() -> list[dict]:
    """Check Instantly for new interested/question replies."""
    if not INSTANTLY_API_KEY:
        print("[!] INSTANTLY_API_KEY not set")
        return []

    hot_replies = []
    try:
        # Get recent replies across all campaigns
        resp = requests.get(
            "https://api.instantly.ai/api/v1/unibox/emails",
            params={
                "api_key": INSTANTLY_API_KEY,
                "email_type": "received",
                "limit": 50,
            },
            timeout=15,
        )
        if resp.status_code == 200:
            emails = resp.json()
            for email in emails:
                if isinstance(email, dict):
                    # Simple classification based on content
                    body = (email.get("body", "") or "").lower()
                    subject = (email.get("subject", "") or "").lower()
                    from_email = email.get("from_address_email", "")
                    from_name = email.get("from_address_name", "")

                    # Classify
                    if any(word in body for word in ["out of office", "ooo", "away", "vacation", "auto-reply"]):
                        classification = "out_of_office"
                    elif any(word in body for word in ["unsubscribe", "remove", "stop", "not interested", "no thanks"]):
                        classification = "not_interested"
                    elif any(word in body for word in ["interested", "love to", "tell me more", "sounds great", "let's chat", "schedule", "calendar", "book"]):
                        classification = "interested"
                    else:
                        classification = "question"

                    if classification in ["interested", "question"]:
                        hot_replies.append({
                            "from_name": from_name,
                            "from_email": from_email,
                            "subject": subject,
                            "snippet": body[:200],
                            "classification": classification,
                            "timestamp": email.get("timestamp", ""),
                        })
    except Exception as e:
        print(f"[!] Error checking replies: {e}")

    return hot_replies


def generate_daily_report():
    """Generate and send the daily report."""
    print(f"\n{'='*60}")
    print(f"BIOKIDS DAILY REPORT — {datetime.now().strftime('%B %d, %Y')}")
    print(f"{'='*60}\n")

    # Lead stats
    lead_stats = get_lead_stats()
    print(f"LEAD DATABASE:")
    print(f"  Total leads: {lead_stats['total']}")
    print(f"  Verified: {lead_stats['verified']}")
    for campaign, count in lead_stats.get("by_campaign", {}).items():
        print(f"    {campaign}: {count}")

    # Instantly stats
    print(f"\nCAMPAIGN PERFORMANCE:")
    instantly_stats = get_instantly_stats()
    if "error" in instantly_stats:
        print(f"  {instantly_stats['error']}")
    else:
        for name, stats in instantly_stats.items():
            if isinstance(stats, dict):
                sent = stats.get("sent", 0)
                opened = stats.get("opened", 0)
                replied = stats.get("replied", 0)
                open_rate = f"{(opened/sent*100):.0f}%" if sent > 0 else "N/A"
                reply_rate = f"{(replied/sent*100):.1f}%" if sent > 0 else "N/A"
                print(f"  {name}:")
                print(f"    Sent: {sent} | Opened: {opened} ({open_rate}) | Replied: {replied} ({reply_rate})")

    # Hot replies
    print(f"\nHOT REPLIES:")
    hot_replies = check_hot_replies()
    if hot_replies:
        for reply in hot_replies:
            emoji = "🔥" if reply["classification"] == "interested" else "❓"
            print(f"  {emoji} {reply['from_name']} ({reply['from_email']})")
            print(f"     {reply['snippet'][:100]}...")
    else:
        print("  No hot replies right now.")

    # Save report
    report_dir = DATA_DIR / "daily-reports"
    report_dir.mkdir(exist_ok=True)
    report_file = report_dir / f"report-{datetime.now().strftime('%Y-%m-%d')}.json"
    report_data = {
        "date": datetime.now().isoformat(),
        "lead_stats": lead_stats,
        "instantly_stats": {k: v for k, v in instantly_stats.items() if isinstance(v, dict)},
        "hot_replies": hot_replies,
    }
    report_file.write_text(json.dumps(report_data, indent=2, default=str))
    print(f"\n  Report saved: {report_file}")

    # Slack notification
    if SLACK_WEBHOOK:
        hot_count = len(hot_replies)
        hot_text = ""
        for reply in hot_replies[:5]:
            emoji = "🔥" if reply["classification"] == "interested" else "❓"
            hot_text += f"\n  {emoji} {reply['from_name']} — {reply['snippet'][:80]}..."

        slack_msg = (
            f"📊 *bioKids Daily Report — {datetime.now().strftime('%B %d')}*\n\n"
            f"*Leads:* {lead_stats['total']} total, {lead_stats['verified']} verified\n"
        )

        if not isinstance(instantly_stats, dict) or "error" not in instantly_stats:
            total_sent = sum(s.get("sent", 0) for s in instantly_stats.values() if isinstance(s, dict))
            total_replied = sum(s.get("replied", 0) for s in instantly_stats.values() if isinstance(s, dict))
            slack_msg += f"*Email:* {total_sent} sent, {total_replied} replies\n"

        slack_msg += f"*Hot replies:* {hot_count}"
        if hot_text:
            slack_msg += hot_text

        try:
            requests.post(SLACK_WEBHOOK, json={"text": slack_msg}, timeout=5)
        except:
            pass


def generate_weekly_report():
    """Generate weekly summary from daily reports."""
    report_dir = DATA_DIR / "daily-reports"
    if not report_dir.exists():
        print("No daily reports found yet.")
        return

    print(f"\n{'='*60}")
    print(f"BIOKIDS WEEKLY REPORT — Week of {datetime.now().strftime('%B %d, %Y')}")
    print(f"{'='*60}\n")

    # Load last 7 daily reports
    reports = sorted(report_dir.glob("report-*.json"))[-7:]
    if not reports:
        print("No reports found.")
        return

    print(f"Reports analyzed: {len(reports)}")

    # Aggregate hot replies
    total_hot = 0
    interested = 0
    questions = 0
    for report_file in reports:
        data = json.loads(report_file.read_text())
        hot = data.get("hot_replies", [])
        total_hot += len(hot)
        interested += sum(1 for r in hot if r.get("classification") == "interested")
        questions += sum(1 for r in hot if r.get("classification") == "question")

    print(f"\nThis week:")
    print(f"  Hot replies: {total_hot}")
    print(f"  Interested: {interested}")
    print(f"  Questions: {questions}")

    # Current lead stats
    lead_stats = get_lead_stats()
    print(f"\n  Total leads in database: {lead_stats['total']}")
    print(f"  Verified emails: {lead_stats['verified']}")

    # Slack
    if SLACK_WEBHOOK:
        try:
            requests.post(SLACK_WEBHOOK, json={
                "text": (
                    f"📈 *bioKids Weekly Report*\n\n"
                    f"*Hot replies this week:* {total_hot}\n"
                    f"  🔥 Interested: {interested}\n"
                    f"  ❓ Questions: {questions}\n\n"
                    f"*Lead DB:* {lead_stats['total']} total, {lead_stats['verified']} verified"
                )
            }, timeout=5)
        except:
            pass


# ──────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="bioKids Daily Report")
    parser.add_argument("--hot-replies", action="store_true", help="Just check for hot replies")
    parser.add_argument("--weekly", action="store_true", help="Generate weekly summary")
    args = parser.parse_args()

    if args.hot_replies:
        replies = check_hot_replies()
        if replies:
            for r in replies:
                emoji = "🔥" if r["classification"] == "interested" else "❓"
                print(f"{emoji} {r['from_name']} ({r['from_email']}): {r['snippet'][:100]}")
        else:
            print("No hot replies right now.")
    elif args.weekly:
        generate_weekly_report()
    else:
        generate_daily_report()
