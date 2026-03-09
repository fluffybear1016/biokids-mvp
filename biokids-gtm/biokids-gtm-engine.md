# bioKids GTM Engine — The $145K Machine Adapted for 1,000 Subscribers

*The complete system for getting bioKids from 0 to 1,000 paying subscribers using the Cody Schneider / Greg Isenberg agent-driven GTM playbook, customized for Gregory Rigano's "all in" positioning.*

---

## HOW THIS WORKS

You sit at your laptop with SuperWhisper running. You open 5-7 Claude Code terminal windows. Each one is a different agent working a different channel. You speak into your mic, each agent executes. In a single 2-hour morning session, you launch cold email campaigns, generate Facebook ad creative, scrape leads, respond to LinkedIn comments, and analyze performance data — all simultaneously.

**Total monthly cost:** ~$150-250/mo
**Time investment:** 2-3 hours/day for the first 30 days, then 1 hour/day once agents are deployed to Railway
**Target:** 1,000 paying subscribers in 90 days

---

## PHASE 0: INFRASTRUCTURE (Days 1-3)

### What to buy / sign up for:

| Tool | Cost | Purpose | Priority |
|------|------|---------|----------|
| SuperWhisper | $5/mo | Voice → text input for Claude Code | Day 1 |
| Claude Code | (Anthropic API usage) | The brain — runs all agents | Day 1 |
| 3 secondary domains | ~$30 one-time | Cold email sending domains | Day 1 |
| 9 Google Workspace mailboxes | ~$18/mo | Cold email sending accounts | Day 1 |
| Instantly AI (Growth) | $30/mo | Cold email sequences + warmup | Day 1 |
| Million Verifier | $30 one-time | Email validation | Day 1 |
| Apollo.io | Free tier → $49/mo | Lead enrichment (emails from names/LinkedIn) | Day 1 |
| PhantomBuster | Free tier → $59/mo | LinkedIn scraping + automation | Day 2 |
| Raphonic | (check pricing) | Podcast host scraping | Day 2 |
| Railway.com | Pay-as-you-go (~$5-20/mo) | Deploy always-on agents + Postgres | Day 7 |
| Notion API | Free | Document generation + content storage | Day 1 |
| Cal.com | Free tier | Scheduling for interested replies | Day 3 |
| Facebook Ads account | $0 setup + ad spend | Paid acquisition (Phase 2) | Day 14 |
| HeyGen | ~$29/mo | AI-generated video ads of "Greg" | Day 14 |
| Nano Banana Pro / Kai AI | (API pricing) | Bulk ad image generation | Day 14 |

**Total startup cost:** ~$120 one-time + ~$150-200/mo recurring

### Domain & Email Setup

```
Buy these domains:
  biokidshealth.com
  biokidsgrowth.com
  getbiokids.com

Create 3 mailboxes per domain:
  greg@biokidshealth.com
  hello@biokidshealth.com
  gregory@biokidshealth.com
  greg@biokidsgrowth.com
  hello@biokidsgrowth.com
  gregory@biokidsgrowth.com
  greg@getbiokids.com
  hello@getbiokids.com
  gregory@getbiokids.com

For each domain, set up:
  ✓ SPF record
  ✓ DKIM record
  ✓ DMARC record
  ✓ Custom tracking domain in Instantly
```

### Create Your Agent Workspace

```
mkdir ~/biokids-gtm/
cd ~/biokids-gtm/

# Create the files Claude Code needs:
touch .env              # All API keys
touch CLAUDE.md         # Agent personality + context
mkdir campaigns/        # Cold email templates
mkdir leads/            # Lead lists (CSV)
mkdir creative/         # Ad creative (React → PNG)
mkdir data/             # Performance data + analysis
mkdir content/          # Blog posts, social posts, scripts
```

---

## PHASE 1: ORGANIC MACHINE (Days 1-30)

### AGENT 1: Cold Email Pipeline (Crunchy Mom Creators)
*Run in Claude Code Terminal #1*

**Voice command to Claude Code:**
> "Search Raphonic for podcasts about natural parenting, crunchy mom, holistic kids health, medical freedom. Export the host names and emails. Then enrich any missing emails through Apollo. Validate all emails through Million Verifier. Load the clean list into Instantly using Campaign 6 template from campaigns/crunchy-creators.md. Set send rate to 40/day across all 9 mailboxes."

**What happens:**
1. Claude Code calls Raphonic API → gets 200 podcast hosts
2. Calls Apollo API → enriches with email addresses
3. Calls Million Verifier API → filters to valid/safe only
4. Calls Instantly API → creates campaign, loads leads, sets sequence
5. Warmup already running → emails start sending on Day 15

**Output:** 200 crunchy mom/natural health creators getting your cold email sequence automatically

---

### AGENT 2: LinkedIn Engagement Scraper → Cold Email
*Run in Claude Code Terminal #2*

**Voice command:**
> "Use PhantomBuster to scrape everyone who liked or commented on this LinkedIn post: [URL of a popular post about kids nutrition / toxins in food / natural health]. Extract their profile URLs. Enrich through Apollo to get emails. Validate through Million Verifier. Load into Instantly as Campaign 7 — LinkedIn warm leads. Use the template in campaigns/linkedin-warm.md."

**Template for LinkedIn warm leads (save as campaigns/linkedin-warm.md):**

```
Subject: saw you liked that post about [TOPIC]

Hi [FIRST NAME],

Noticed you engaged with [AUTHOR]'s post about [TOPIC] on LinkedIn — clearly something you care about.

I'm Gregory Rigano — pharmaceutical lawyer. I've been researching what the food industry isn't telling parents about children's growth hormone. The science is eye-opening.

Quick example: glyphosate in conventional oats actively suppresses growth hormone production in kids. This is in JAMA. It's in Endocrine Reviews. But mainstream pediatrics ignores it.

I put the research at biokids.me — all free, fully peer-reviewed. If you have kids (or know parents who'd want to see this), take a look: biokids.me/learn/growth-blockers-to-avoid

Greg Rigano
Founder, bioKids
```

**What happens:**
1. PhantomBuster scrapes 500+ profiles who engaged with relevant LinkedIn posts
2. Apollo enriches with emails
3. Million Verifier validates
4. Instantly sends the warm lead sequence
5. These people already demonstrated interest in the topic → higher reply rate (8-12%)

**Output:** 500+ warm leads getting personalized cold emails based on their LinkedIn activity

---

### AGENT 3: LinkedIn Auto-Responder
*Run in Claude Code Terminal #3*

**Voice command:**
> "Monitor my LinkedIn post at [URL]. Every time someone comments, generate a thoughtful, personalized response that adds value and subtly mentions bioKids. Use the Gregory Rigano pharma lawyer positioning. Don't be salesy — be the helpful expert. Post the response as a reply to their comment."

**What happens:**
1. Claude Code monitors the LinkedIn post via PhantomBuster
2. When a new comment appears → Claude Code reads it → generates a personalized response
3. Posts the response back via PhantomBuster's commenting phantom
4. Every response positions Greg as the knowledgeable pharma lawyer who built bioKids

**Output:** 24/7 LinkedIn engagement that builds your personal brand while you sleep

---

### AGENT 4: Podcast Outreach Campaign
*Run in Claude Code Terminal #4*

**Voice command:**
> "Search Raphonic for podcasts about sports parenting, youth athletes, children's health, parenting tips, mom life. Get 1,000 results. Enrich through Apollo. Validate through Million Verifier. Load into Instantly as Campaign 1 — Podcasts. Use the template from campaigns/podcasts.md. Prioritize podcasts with 1K-50K downloads per episode."

**What happens:**
1. Raphonic scrapes 1,000 podcast hosts
2. Apollo enriches → Million Verifier validates → Instantly loads
3. 3-email sequence fires automatically over 7 days
4. Interested hosts get auto-tagged → Slack notification → you book them on Cal.com

**Output:** 20 podcast appearances booked in 90 days → 2,000-4,000 site visitors

---

### AGENT 5: Content Repurposing Machine
*Run in Claude Code Terminal #5*

**Voice command:**
> "Take the bioKids article at biokids.me/learn/growth-blockers-to-avoid and create: 1) A Twitter/X thread for @RiganoESQ (10 tweets, lead with the pharma lawyer angle), 2) A Medium article cross-post, 3) A Quora answer for 'what foods stunt growth in children', 4) 3 TikTok script variations (30 seconds each, talking head style), 5) 5 Instagram carousel slide texts. Save everything to content/ folder."

**What happens:**
1. Claude Code reads the source article
2. Generates all 5 content formats adapted for each platform
3. Saves to content/ folder for you to review and post
4. Each piece uses the Gregory Rigano positioning appropriate for that platform

**Output:** One article becomes 10+ pieces of content across 5 platforms

---

### AGENT 6: Notion Campaign Dashboard
*Run in Claude Code Terminal #6*

**Voice command:**
> "Create a Notion dashboard for bioKids GTM tracking. Include: 1) Campaign status table (all 6 cold email campaigns with send count, open rate, reply rate, conversions), 2) Facebook Group engagement log (group name, posts made, comments, reactions), 3) Content calendar (next 30 days, what to post where), 4) Lead pipeline (total leads, validated, loaded, contacted, replied, converted), 5) Weekly KPI tracker. Use the Notion API to create this."

**What happens:**
1. Claude Code creates structured Notion pages via API
2. Sets up databases with proper columns and views
3. Can be updated programmatically as data comes in

**Output:** Single source of truth for all GTM activity

---

### AGENT 7: Reply Handler
*Run in Claude Code Terminal #7 (or deploy to Railway for 24/7)*

**Voice command:**
> "Monitor Instantly for new replies across all campaigns. When a reply comes in, classify it as: interested, not interested, question, or out of office. If interested → send me a Slack message with the person's name, company, and their reply. If question → send me a Slack message so I can respond manually. If not interested → auto-archive. If out of office → reschedule for 2 weeks later."

**What happens:**
1. Instantly webhook fires on new reply
2. Claude Code (or deployed n8n workflow) classifies the reply
3. Routes to appropriate action
4. Interested replies get immediate Slack notification + Cal.com link auto-sent

**Output:** Zero inbox management — every reply is auto-triaged and acted on

---

## PHASE 2: PAID AMPLIFICATION (Days 15-60)

Once organic is running and you have initial data on what messaging resonates, layer on paid.

### AGENT 8: Facebook Ad Creative Generator
*Run in Claude Code Terminal #8*

**Voice command:**
> "Generate 50 Facebook ad variations for bioKids targeting crunchy moms. Use these angles: 1) Pharma lawyer exposes kids' oatmeal, 2) 18 things stunting your child's growth, 3) What Big Food doesn't want parents to know. For each angle, create 10 headline variations and 5 body copy variations. Output each as a React component with the bioKids brand styling. Then use html2canvas to export each as a 1080x1080 PNG. Save to creative/ folder."

**What happens:**
1. Claude Code generates 50 React components (ad creatives)
2. Renders each in a headless browser → exports as PNG
3. You now have 50 ad variations ready to upload — cost: $0

**Output:** 50 ad creatives ready for Facebook — no designer needed

---

### AGENT 9: Facebook Ad Bulk Uploader
*Run in Claude Code Terminal #9*

**Voice command:**
> "Take all 50 ad creatives from creative/ folder. Upload them as drafts to my Facebook ad account using the Facebook Ads API. Create one campaign called 'bioKids — Crunchy Mom Test'. Create 5 ad sets (one per angle). Put 10 ad variations in each ad set. Set each ad set budget to $10/day. Target: Women 28-55, interests in organic food, natural parenting, holistic health, non-toxic living. Set status to PAUSED so I can review before launching."

**What happens:**
1. Claude Code calls Facebook Ads API
2. Creates campaign → ad sets → ads, all programmatically
3. Uploads all 50 creatives with proper targeting
4. Everything is set to PAUSED for your review

**Output:** 50 ads ready to launch with one click — setup that would take a media buyer 2 days done in 10 minutes

---

### AGENT 10: Ad Performance Analyzer
*Run in Claude Code Terminal #10 (or deploy to Railway for daily runs)*

**Voice command:**
> "Pull all Facebook ad performance data for the bioKids campaign from the last 7 days. Push it into a Railway Postgres database. Analyze: which ad sets have the lowest cost per click? Which creatives have the highest CTR? Which ones have the best conversion rate? Pause any ad that has spent more than $20 with zero conversions. Create a new ad set with the top 5 performers and set budget to $25/day. Send me a Slack summary of what you changed."

**What happens:**
1. Claude Code pulls Facebook Ads data via API
2. Creates/updates Railway Postgres database with performance data
3. Runs analysis: identifies winners and losers
4. Automatically pauses underperformers
5. Scales winners into a new ad set
6. Sends you a Slack summary

**Output:** Self-optimizing ad campaigns — AI media buyer running 24/7

---

### AGENT 11: HeyGen Video Ad Generator
*Run when ready for video creative*

**Voice command:**
> "Use HeyGen API to create 5 UGC-style video ads for bioKids. Use an avatar that looks like a concerned parent. Scripts: 1) 'I'm a pharma lawyer and I'm horrified by what's in my nephew's oatmeal', 2) 'My sister-in-law played D1 volleyball — here's what we found about our kids' growth', 3) 'A 30-second sprint increases your kid's growth hormone by 700%', 4) '18 things secretly stunting your child's growth', 5) 'Dennis Rodman was 5'8 after high school'. Each video should be 30-45 seconds. Export as MP4."

**What happens:**
1. Claude Code sends scripts to HeyGen API
2. HeyGen generates 5 talking-head videos
3. Videos are ready to upload to Facebook Ads, TikTok, Instagram Reels

**Output:** 5 video ads — no filming, no editing, no production cost

---

## PHASE 3: ALWAYS-ON DEPLOYMENT (Days 30-90)

### Deploy Proven Workflows to Railway

Once you've validated which agents produce results, deploy them to Railway so they run 24/7 without your laptop being open.

**What to deploy:**

| Agent | Railway Deployment | Runs |
|-------|-------------------|------|
| Reply Handler | Node.js service with Instantly webhook | 24/7 — auto-classifies every reply |
| LinkedIn Auto-Responder | Node.js service with PhantomBuster polling | Every 15 minutes — responds to comments |
| Ad Performance Analyzer | Cron job (daily at 6am) | Once daily — pauses losers, scales winners |
| Lead Scraper Pipeline | Cron job (weekly Monday 6am) | Weekly — scrapes new leads, enriches, loads |
| Content Repurposer | Triggered on new article publish | On-demand — turns every new article into 10+ content pieces |

**Voice command to deploy:**
> "Take the reply handler workflow and deploy it to Railway. Create a new Node.js service. Set up the Instantly webhook to trigger the classification pipeline. Use the same .env variables. Make it always-on."

**Output:** Your marketing machine runs while you sleep, eat, and live your life.

---

## THE DAILY ROUTINE (Once Everything Is Set Up)

### Morning (30 minutes):
1. Check Slack for overnight notifications (interested replies, ad performance alerts)
2. Respond to any "question" replies that need personal touch
3. Open Claude Code + SuperWhisper
4. Quick voice command: "Pull this week's numbers from Instantly, Facebook Ads, and GA4. How many new subscribers this week? What's our CAC by channel?"

### Midday (30 minutes):
5. Post in 2-3 Facebook groups (personal engagement — can't automate this)
6. Review and post content that Agent 5 generated yesterday
7. Voice command: "Scrape the comments on [competitor LinkedIn post], enrich, load into Campaign 7"

### Evening (15 minutes):
8. Review any new podcast booking requests
9. Quick voice command: "Generate tomorrow's social content from the sprinting article"
10. Done.

**Total: ~1.25 hours/day** once the machine is built.

---

## SUBSCRIBER MATH: HOW WE HIT 1,000

### Organic Channels (Phase 1, $0 ad spend)

| Channel | 90-Day Visitors | Sign-up Rate | Subscribers |
|---------|----------------|-------------|-------------|
| Cold Email → Crunchy Creators (organic shares) | 5,000-20,000 | 3% | 150-600 |
| Cold Email → Podcasts (20 appearances) | 2,000-4,000 | 3% | 60-120 |
| Cold Email → Newsletters (12 mentions) | 1,200-6,000 | 3% | 36-180 |
| Cold Email → Pediatricians (30 sharing) | 3,000-6,000 | 3% | 90-180 |
| Cold Email → AAU/Sports (20 programs) | 2,000-4,000 | 3% | 60-120 |
| Cold Email → Paid Creators (10 collabs) | 2,500-12,500 | 3% | 75-375 |
| LinkedIn Pipeline (warm leads + auto-responder) | 1,000-3,000 | 5% | 50-150 |
| Facebook Groups (51 groups, personal engagement) | 3,000-6,000 | 3% | 90-180 |
| X/Twitter threads (@RiganoESQ, 15K followers) | 2,000-5,000 | 2% | 40-100 |
| TikTok/Reels (organic content) | 1,000-5,000 | 2% | 20-100 |
| Medium articles (3-5 cross-posts) | 500-2,000 | 3% | 15-60 |
| Quora answers (7 answers) | 300-1,000 | 3% | 9-30 |
| SEO/GEO (already built, compounding) | 1,000-5,000 | 3% | 30-150 |
| **Organic Total** | **24,500-79,500** | | **725-2,345** |

### Paid Channels (Phase 2, ~$1,500-3,000 total ad spend)

| Channel | Ad Spend | CPC | Visitors | Sign-up Rate | Subscribers |
|---------|----------|-----|----------|-------------|-------------|
| Facebook Ads (50 variations, AI-optimized) | $1,000-2,000 | $0.50-1.00 | 1,000-4,000 | 5% | 50-200 |
| HeyGen Video Ads (5 UGC videos) | $500-1,000 | $0.30-0.75 | 700-3,000 | 5% | 35-150 |
| **Paid Total** | **$1,500-3,000** | | **1,700-7,000** | | **85-350** |

### Combined Projection

| Scenario | Organic | Paid | Total | Timeline |
|----------|---------|------|-------|----------|
| Conservative | 725 | 85 | **810** | 90 days |
| Realistic | 1,300 | 175 | **1,475** | 75 days |
| Aggressive | 2,345 | 350 | **2,695** | 60 days |

**Even the conservative estimate gets you to 810 in 90 days** — and that assumes every channel underperforms. With the "all in" positioning (pharma lawyer, Elon Musk, anti-establishment), the crunchy mom channel alone could hit 600 on the aggressive end.

---

## COST BREAKDOWN: FIRST 90 DAYS

| Category | One-Time | Monthly | 90-Day Total |
|----------|----------|---------|-------------|
| Domains (3) | $30 | — | $30 |
| Million Verifier | $30 | — | $30 |
| Instantly AI | — | $30 | $90 |
| Apollo.io | — | $49 | $147 |
| PhantomBuster | — | $59 | $177 |
| Google Workspace (9 mailboxes) | — | $18 | $54 |
| SuperWhisper | — | $5 | $15 |
| Railway | — | ~$15 | $45 |
| HeyGen | — | $29 | $87 |
| Notion | — | $0 | $0 |
| Cal.com | — | $0 | $0 |
| **Tooling Total** | **$60** | **~$205/mo** | **$675** |
| Facebook Ad Spend | — | — | $1,500-3,000 |
| Creator Collabs (10 x $200 avg) | — | — | $2,000 |
| **Grand Total** | | | **$4,175-5,675** |

**Cost per subscriber (conservative): $5.24-7.00**
**Cost per subscriber (realistic): $2.83-3.85**

For context: most SaaS companies spend $50-200 per subscriber. You're doing this for under $7.

---

## QUICK-START CHECKLIST

### Day 1
- [ ] Buy SuperWhisper, set up global hotkey
- [ ] Create `~/biokids-gtm/` folder structure
- [ ] Create `.env` file (see biokids-env-template.md)
- [ ] Create `CLAUDE.md` file (see biokids-claude-md.md)
- [ ] Buy 3 secondary domains
- [ ] Set up 9 mailboxes with SPF/DKIM/DMARC
- [ ] Sign up for Instantly AI, load mailboxes, start warmup
- [ ] Sign up for Apollo.io (free tier)
- [ ] Buy Million Verifier credits
- [ ] Sign up for Notion, create API integration
- [ ] Switch Facebook from "Don James" to "Gregory Rigano"
- [ ] Update X/Twitter @RiganoESQ bio with bioKids mention

### Day 2
- [ ] Sign up for PhantomBuster
- [ ] Sign up for Raphonic
- [ ] Open 5 Claude Code terminals
- [ ] Run Agent 1: Scrape + enrich + validate crunchy mom creators (200 leads)
- [ ] Run Agent 4: Scrape + enrich + validate podcast hosts (1,000 leads)
- [ ] Run Agent 5: Generate first batch of repurposed content
- [ ] Run Agent 6: Create Notion dashboard
- [ ] Join top 5 Facebook groups (Earthly Mamas, Crunchy Moms, Travel Baseball Families, Youth Basketball Dev, Florida Travel Baseball)

### Day 3
- [ ] Sign up for Cal.com, create booking link
- [ ] Run Agent 2: LinkedIn scraper → cold email (first 500 warm leads)
- [ ] Run Agent 3: LinkedIn auto-responder on latest post
- [ ] Post first X/Twitter thread: glyphosate article
- [ ] Publish first Medium cross-post
- [ ] Begin Facebook group lurking + commenting

### Day 7
- [ ] Sign up for Railway.com
- [ ] Run Agent 7: Deploy reply handler to Railway (24/7)
- [ ] Scrape + load Campaign 2 (holistic pediatricians, 1,000 leads)
- [ ] Scrape + load Campaign 3 (AAU/sports directors, 600 leads)
- [ ] Post origin story in Earthly Mamas (356K)

### Day 14
- [ ] All 9 mailboxes fully warmed → cold emails start sending
- [ ] Sign up for Facebook Ads account
- [ ] Sign up for HeyGen
- [ ] Run Agent 8: Generate 50 Facebook ad creatives
- [ ] Run Agent 9: Bulk upload to Facebook as PAUSED drafts
- [ ] Review and launch first ad set ($10/day test)
- [ ] Run Agent 11: Generate 5 HeyGen video ads

### Day 21
- [ ] Review first week of cold email results
- [ ] Run Agent 10: Analyze ad performance, pause losers, scale winners
- [ ] Scrape + load Campaign 4 (newsletter authors, 400 leads)
- [ ] Scrape + load Campaign 6 (crunchy mom creators, 200 leads)
- [ ] Deploy LinkedIn auto-responder to Railway (24/7)
- [ ] Post origin story in Crunchy Moms (288K)

### Day 30
- [ ] Review all channel performance
- [ ] Deploy ad performance analyzer to Railway (daily cron)
- [ ] Deploy weekly lead scraper to Railway (Monday cron)
- [ ] Scrape + load Campaign 5 (paid creator collabs, 300 leads)
- [ ] Begin podcast recording schedule (2-3/week)
- [ ] Scale winning Facebook ads to $25-50/day

### Day 60
- [ ] Review halfway metrics: subscribers, CAC by channel, best content
- [ ] Double down on top 3 performing channels
- [ ] Kill any channel with zero ROI
- [ ] Generate second batch of 50 ad creatives (winning angles only)
- [ ] Film real TikTok videos (not just AI-generated) — personal brand building

### Day 90
- [ ] Final count: 1,000+ subscribers?
- [ ] If yes → transition to Phase 4 (product refinement, pricing optimization, referral program)
- [ ] If no → analyze which channels underperformed, reallocate budget, extend timeline 30 days
