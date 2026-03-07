# bioKids GTM Engine — Setup Checklist
# Do these in order. Each day builds on the previous.

---

## DAY 1: Foundation (2-3 hours)

### Identity
- [ ] Switch Facebook from "Don James" to "Gregory Rigano"
- [ ] Update Facebook bio: "Pharma & environmental lawyer. Research published by Elon Musk. Godfather to 3 future pro athletes. Founder of bioKids — the science of how kids actually grow. biokids.me"
- [ ] Update X/Twitter @RiganoESQ bio to mention bioKids
- [ ] Update LinkedIn headline + about section

### Tools — Sign Up
- [ ] SuperWhisper ($5/mo) — set up global hotkey
- [ ] Instantly AI Growth plan ($30/mo)
- [ ] Apollo.io (free tier to start)
- [ ] Million Verifier ($30 one-time, buy credits)
- [ ] Create free Slack workspace → create #biokids-gtm channel → create incoming webhook
- [ ] Create Notion workspace → create API integration

### Domains & Email
- [ ] Buy: biokidshealth.com (~$10)
- [ ] Buy: biokidsgrowth.com (~$10)
- [ ] Buy: getbiokids.com (~$10)
- [ ] Create 9 mailboxes (3 per domain): greg@, hello@, gregory@
- [ ] Set up SPF record for each domain
- [ ] Set up DKIM record for each domain
- [ ] Set up DMARC record for each domain
- [ ] Load all 9 mailboxes into Instantly → start warmup

### Agent Workspace
- [ ] Install Claude Code (if not already)
- [ ] Create ~/biokids-gtm/ folder
- [ ] Copy CLAUDE.md into ~/biokids-gtm/
- [ ] Copy .env into ~/biokids-gtm/ → fill in Day 1 API keys
- [ ] Copy campaigns/ folder into ~/biokids-gtm/
- [ ] Copy facebook/ folder into ~/biokids-gtm/
- [ ] Copy scripts/ folder into ~/biokids-gtm/
- [ ] Create empty folders: creative/, content/, leads/, data/

**Day 1 cost: ~$75 (domains + Million Verifier + first month tools)**

---

## DAY 2: Lead Pipeline (1-2 hours)

### Tools — Sign Up
- [ ] PhantomBuster (free tier to start)
- [ ] Raphonic (check pricing, sign up)
- [ ] Fill in PHANTOMBUSTER_API_KEY and RAPHONIC_API_KEY in .env

### Start Scraping (run in Claude Code)
- [ ] Open Claude Code in ~/biokids-gtm/
- [ ] Voice: "Search Raphonic for podcasts about natural parenting, crunchy mom, holistic kids health. Export host names and emails. Enrich through Apollo. Validate through Million Verifier. Save to leads/crunchy-creators.csv"
- [ ] Voice: "Search Raphonic for podcasts about sports parenting, youth athletes, children's health. Get 1,000 results. Enrich through Apollo. Validate. Save to leads/podcasts.csv"

### Facebook — Start Lurking
- [ ] Join: Earthly Mamas (356K)
- [ ] Join: Crunchy Moms (288K)
- [ ] Join: Travel Baseball Families (95K)
- [ ] Join: Youth Basketball Development (83K)
- [ ] Join: Florida Travel Baseball (31K)
- [ ] Read 20-30 posts per group — understand the culture
- [ ] Start liking posts and leaving helpful comments (NO links, NO bioKids mention yet)

---

## DAY 3: Content Machine (1 hour)

### Tools — Sign Up
- [ ] Cal.com (free tier) → create booking link for podcast/partner calls

### Content Generation
- [ ] Open Claude Code
- [ ] Voice: "Take the bioKids article at biokids.me/learn/growth-blockers-to-avoid and create: a Twitter thread for @RiganoESQ, a Medium article cross-post, a Quora answer for 'what foods stunt growth in children', 3 TikTok script variations, 5 Instagram carousel texts. Save to content/"
- [ ] Review content → post X/Twitter thread
- [ ] Publish Medium article

### Dashboard
- [ ] Voice: "Create a Notion dashboard for bioKids GTM tracking with: campaign status table, Facebook group engagement log, content calendar, lead pipeline, weekly KPI tracker"

---

## DAY 7: Infrastructure (1 hour)

### Tools — Sign Up
- [ ] Railway.com (pay-as-you-go)
- [ ] Fill in RAILWAY_API_TOKEN in .env

### Deploy Always-On Reply Handler
- [ ] Voice: "Set up the reply handler: monitor Instantly for new replies, classify as interested/not interested/question/OOO, send interested + question to Slack, auto-archive not interested, reschedule OOO for 2 weeks"

### More Leads
- [ ] Voice: "Scrape holistic pediatricians from Apollo — naturopathic doctors, integrative pediatricians, functional medicine. 1,000 leads. Validate. Save to leads/pediatricians.csv"
- [ ] Voice: "Scrape AAU basketball and baseball directors. 600 leads. Validate. Save to leads/aau-sports.csv"

### Facebook — First Origin Story
- [ ] Post Track 1 origin story in Earthly Mamas (see facebook/origin-story-track1.md)
- [ ] Respond to EVERY comment personally

---

## DAY 14: Ads + Full Launch (2 hours)

### Mailboxes Fully Warmed → GO
- [ ] Voice: "Load leads/crunchy-creators.csv into Instantly campaign biokids-crunchy-creators. Use templates from campaigns/crunchy-creators.md. Set send rate to 40/day across all 9 mailboxes. Launch."
- [ ] Campaign 6 is now LIVE

### Facebook Ads (optional $150-300 test)
- [ ] Create Facebook Ads account (if not already)
- [ ] Fill in FACEBOOK_* keys in .env
- [ ] Voice: "Generate 30 Facebook ad creatives for bioKids" (see scripts/generate-ad-creatives.md)
- [ ] Review creatives → approve or reject
- [ ] Voice: "Upload approved ads to Facebook Ads. Budget $5/day. Target crunchy moms. Set to PAUSED."
- [ ] Review in Ads Manager → Launch

### Facebook — Second Origin Story
- [ ] Post Track 1 origin story in Crunchy Moms (288K)
- [ ] Post Track 2 origin story in Travel Baseball Families (95K)

---

## DAY 21: Scale (1 hour)

- [ ] Voice: "Launch Campaign 1 — podcasts. Load leads/podcasts.csv into Instantly."
- [ ] Voice: "Pull first week of cold email results. How are open rates, reply rates, bounces?"
- [ ] Voice: "Check ad performance. Pause losers. Scale winners." (if running ads)
- [ ] Voice: "Scrape newsletter authors. 400 leads. Validate. Save to leads/newsletters.csv"

---

## DAY 30: Optimize (1 hour)

- [ ] Voice: "Launch Campaign 4 — newsletters. Load leads/newsletters.csv."
- [ ] Voice: "Weekly report — full metrics across all channels."
- [ ] Voice: "Deploy lead scraper as weekly cron job on Railway — scrape new leads every Monday."
- [ ] Review: which channel is performing best? Double down.
- [ ] Review: which channel is performing worst? Adjust or kill.

---

## DAY 45: Evaluate (30 min)

- [ ] Voice: "How many total subscribers do we have?"
- [ ] If tracking above 500 → stay the course
- [ ] If tracking below 500 → consider scaling FB ad budget to $15-20/day
- [ ] Voice: "What's our CAC by channel? Which is cheapest?"

---

## DAY 60-90: Compound (30 min/week)

- [ ] All agents running on Railway (24/7)
- [ ] Weekly: review metrics, adjust campaigns
- [ ] Continue daily Facebook engagement (15 min/day — human vibes)
- [ ] Record TikTok videos 1x/week (batch 3-4 at once)
- [ ] Do podcast appearances as booked
- [ ] By Day 90: 1,000+ subscribers

---

## COST SUMMARY (revised lean budget)

| Item | Cost |
|------|------|
| 3 domains | $30 one-time |
| Million Verifier | $30 one-time |
| SuperWhisper (3 mo) | $15 |
| Instantly AI (3 mo) | $90 |
| Apollo.io (3 mo) | $147 |
| PhantomBuster (3 mo) | $177 |
| Google Workspace 9 mailboxes (3 mo) | $54 |
| Railway (3 mo) | $45 |
| Notion, Cal.com, Slack | $0 |
| **Tooling Total** | **$588** |
| FB Ads (30-day test, $5-10/day) | $150-300 |
| **Grand Total (90 days)** | **$738-888** |

**Greg's time: ~1 hour/day** after setup week
**Human tasks only: Facebook comments, reply to interested leads, record TikToks, do podcasts**
**Everything else: automated**
