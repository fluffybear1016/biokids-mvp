# bioKids .env Template

*Copy this into `~/biokids-gtm/.env` and fill in your API keys as you sign up for each service.*

```env
# ============================================
# BIOKIDS GTM ENGINE — ENVIRONMENT VARIABLES
# ============================================
# This file gives every Claude Code agent access
# to every tool in your stack. Keep it secret.
# ============================================

# --- AI / LLM ---
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
PERPLEXITY_API_KEY=pplx-xxxxx

# --- Cold Email ---
INSTANTLY_API_KEY=xxxxx
INSTANTLY_WORKSPACE_ID=xxxxx

# --- Lead Generation & Enrichment ---
APOLLO_API_KEY=xxxxx
PHANTOMBUSTER_API_KEY=xxxxx
RAPHONIC_API_KEY=xxxxx

# --- Email Verification ---
MILLION_VERIFIER_API_KEY=xxxxx

# --- Facebook Ads ---
FACEBOOK_APP_ID=xxxxx
FACEBOOK_APP_SECRET=xxxxx
FACEBOOK_ACCESS_TOKEN=xxxxx
FACEBOOK_AD_ACCOUNT_ID=act_xxxxx
FACEBOOK_PAGE_ID=xxxxx

# --- Video / Image Generation ---
HEYGEN_API_KEY=xxxxx
NANO_BANANA_API_KEY=xxxxx
KAI_AI_API_KEY=xxxxx

# --- Infrastructure ---
RAILWAY_API_TOKEN=xxxxx
VERCEL_TOKEN=xxxxx

# --- Databases ---
DATABASE_URL=postgresql://user:pass@host:5432/biokids_gtm

# --- Notifications ---
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx
SLACK_CHANNEL=#biokids-gtm

# --- Scheduling ---
CALCOM_API_KEY=xxxxx
CALCOM_EVENT_TYPE_ID=xxxxx

# --- Content / Productivity ---
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx

# --- Transactional Email ---
SENDGRID_API_KEY=SG.xxxxx

# --- Analytics ---
GA4_MEASUREMENT_ID=G-xxxxx
GA4_API_SECRET=xxxxx

# --- Social Media ---
TWITTER_BEARER_TOKEN=xxxxx
TWITTER_API_KEY=xxxxx
TWITTER_API_SECRET=xxxxx

# --- bioKids Product ---
BIOKIDS_URL=https://biokids.me
BIOKIDS_STRIPE_KEY=sk_live_xxxxx

# --- Personal Info (for templates) ---
FOUNDER_NAME=Gregory Rigano
FOUNDER_EMAIL=greg@biokids.me
FOUNDER_TWITTER=@RiganoESQ
FOUNDER_LINKEDIN=https://linkedin.com/in/gregoryrigano
BOOKING_LINK=https://cal.com/gregoryrigano/30min
```

## Priority Order for Setup

**Day 1 (must-have to start):**
1. `ANTHROPIC_API_KEY` — Claude Code won't work without it
2. `INSTANTLY_API_KEY` — cold email campaigns
3. `APOLLO_API_KEY` — lead enrichment
4. `MILLION_VERIFIER_API_KEY` — email validation
5. `SLACK_WEBHOOK_URL` — notifications
6. `NOTION_API_KEY` — dashboard

**Day 2 (high priority):**
7. `PHANTOMBUSTER_API_KEY` — LinkedIn scraping
8. `RAPHONIC_API_KEY` — podcast scraping

**Day 7 (infrastructure):**
9. `RAILWAY_API_TOKEN` — deploy always-on agents
10. `DATABASE_URL` — Postgres for data analysis

**Day 14 (paid ads):**
11. `FACEBOOK_*` keys — ad campaigns
12. `HEYGEN_API_KEY` — video ads
13. `NANO_BANANA_API_KEY` — image ads

**Nice to have (set up when needed):**
14. `SENDGRID_API_KEY` — transactional emails to subscribers
15. `TWITTER_*` keys — automated posting (optional)
16. `CALCOM_API_KEY` — auto-scheduling
17. `PERPLEXITY_API_KEY` — research queries
18. `GA4_*` keys — analytics integration
