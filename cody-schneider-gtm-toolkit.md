# Cody Schneider's GTM Engineering Toolkit — Complete Breakdown

*Source: "Claude Code & MCPs built my $145K marketing machine" — Greg Isenberg x Cody Schneider (The Startup Ideas Podcast, March 2, 2026)*

---

## The Big Idea

GTM (Go-To-Market) Engineering = using AI agents (primarily Claude Code) to replace an entire marketing/sales team. One person running 7-15 Claude Code instances simultaneously, each handling a different task — LinkedIn outreach, Facebook ad creation, cold email campaigns, data analysis, Notion docs — all at once. What used to require a 20-person team now runs on ~$85-150/mo in tooling.

The key insight: **your domain expertise is the multiplier.** The vocabulary and knowledge you bring from your field determines the quality of output you can extract from these tools. The AI does the middle work; you provide the strategy and judgment.

---

## 1. CLAUDE CODE

**Category:** AI Agent / Orchestrator
**What it does:** The command center. You speak into your mic, Claude Code executes tasks across your entire stack. It writes code, calls APIs, generates content, analyzes data, and deploys infrastructure — all from a terminal.

**How Cody uses it:**
- Runs 7-15 simultaneous instances, each working on a different task
- Speaks instructions via SuperWhisper → Claude Code executes
- Context-switches between tasks: "While that agent builds Facebook ads, this agent scrapes LinkedIn, and this one writes cold emails"
- Uses `.env` file with all API keys so every Claude Code instance can access every tool
- Uses `CLAUDE.md` file as persistent memory/instructions that Claude Code reads on startup

**How to set it up:**
1. Create a project folder (e.g., `gtm-workspace/`)
2. Add a `.env` file with all your API keys (Facebook, Instantly, Apollo, Railway, etc.)
3. Add a `CLAUDE.md` file with your brand context, writing style, product info
4. Open multiple terminal windows, launch Claude Code in each
5. Give each instance a different task via voice or text

**Integrates with:** Everything below. Claude Code is the glue that connects all tools via their APIs.

---

## 2. SUPER WHISPER

**Category:** Voice Transcription / Input
**What it does:** Converts your voice to text in real-time, allowing you to "talk" to Claude Code instead of typing. Press a hotkey, speak your instruction, and it types it into whatever window is active.

**How Cody uses it:**
- Maps to a keyboard shortcut
- Speaks complex instructions to Claude Code: "Go scrape all podcast hosts in the parenting category, enrich their emails through Apollo, validate through Million Verifier, and load them into Instantly"
- Enables rapid context-switching between 7+ agent windows without typing

**How to set it up:**
1. Download SuperWhisper (Mac app)
2. Set a global hotkey (e.g., `Cmd+Shift+Space`)
3. Press hotkey → speak → release → text appears in active window
4. Use with Claude Code terminals for voice-driven agent orchestration

**Integrates with:** Claude Code (primary), any text input field

---

## 3. INSTANTLY AI

**Category:** Cold Email Infrastructure
**Cost:** ~$30/mo (Growth plan)
**What it does:** Sends cold email sequences at scale with built-in email warmup, deliverability optimization, and reply detection.

**How Cody uses it:**
- Loads validated lead lists (from Apollo + Million Verifier)
- Runs multi-step email sequences (3-email cadences)
- Claude Code interacts with Instantly via API to load campaigns, monitor performance, and adjust copy
- Warm-up runs continuously even during active campaigns

**How to set it up:**
1. Buy secondary domains (never cold email from your main domain)
2. Set up 3 mailboxes per domain with SPF/DKIM/DMARC
3. Load mailboxes into Instantly, enable warmup for 14 days
4. After warmup: load leads → create sequences → launch campaigns
5. Use Instantly API key in your `.env` file so Claude Code can manage campaigns programmatically

**Integrates with:** Apollo (lead data), Million Verifier (email validation), Claude Code (campaign management), Raphonic (podcast lead scraping)

---

## 4. PHANTOM BUSTER

**Category:** LinkedIn Scraping & Automation
**Cost:** Free tier / $59/mo
**What it does:** Scrapes LinkedIn profiles, posts, comments, and engagement data. Automates LinkedIn actions like profile visits and connection requests.

**How Cody uses it:**
- **LinkedIn Engagement Scraper → Cold Email Pipeline:** Scrapes everyone who liked/commented on a specific LinkedIn post (his own or a competitor's), extracts their profile data, enriches through Apollo to get emails, then loads into Instantly for cold outreach
- **Auto-responder:** Scrapes new comments on his LinkedIn posts, then Claude Code generates personalized responses and posts them back
- Builds lead lists of people engaging with competitor content

**How to set it up:**
1. Sign up for PhantomBuster
2. Use the "LinkedIn Post Likers" or "LinkedIn Post Commenters" phantom
3. Feed in a LinkedIn post URL → it extracts all profile URLs of people who engaged
4. Pass those profile URLs to Apollo for email enrichment
5. Connect via API to Claude Code for automated pipeline

**Integrates with:** LinkedIn (data source), Apollo (enrichment), Instantly (outreach), Claude Code (orchestration)

---

## 5. APOLLO.IO (API)

**Category:** Data Enrichment & Lead Database
**Cost:** Free tier / $49/mo
**What it does:** Takes a person's name, company, or LinkedIn URL and returns their email address, phone number, job title, company data, and more.

**How Cody uses it:**
- Enriches leads scraped from PhantomBuster (LinkedIn) or Raphonic (podcasts)
- Takes raw profile data → returns verified email addresses
- Claude Code calls Apollo API directly to enrich in bulk
- Used as the "enrichment layer" between scraping and outreach

**How to set it up:**
1. Sign up for Apollo.io, get API key
2. Add API key to your `.env` file
3. Claude Code sends profile data to Apollo API → gets back enriched contact info
4. Feed enriched data to Million Verifier → then to Instantly

**Integrates with:** PhantomBuster (inbound leads), Raphonic (podcast leads), Million Verifier (validation), Instantly (outreach), Claude Code (orchestration)

---

## 6. MILLION VERIFIER

**Category:** Email Verification
**Cost:** ~$30 one-time (credits-based)
**What it does:** Validates email addresses before you send to them. Tells you if an email is valid, risky, or invalid. Keeps your bounce rate under 3% so your sending domains don't get blacklisted.

**How Cody uses it:**
- Every lead list goes through Million Verifier before loading into Instantly
- Filters out "risky" and "invalid" emails — only sends to "safe" and "valid"
- Protects domain reputation and deliverability

**How to set it up:**
1. Sign up for Million Verifier, buy credits
2. Upload CSV of emails or use their API
3. Filter results: keep only "valid" and "safe"
4. Load cleaned list into Instantly

**Integrates with:** Apollo (upstream — provides the emails), Instantly (downstream — receives validated emails), Claude Code (can automate via API)

---

## 7. RAPHONIC

**Category:** Podcast Host Scraping
**What it does:** Scrapes podcast directories to find podcast host names, show descriptions, episode data, and contact emails. Purpose-built for podcast outreach.

**How Cody uses it:**
- Searches podcast directories by keyword (e.g., "parenting," "children's health," "youth sports")
- Extracts host names, podcast names, and contact info
- Feeds data into Apollo for email enrichment
- Then loads enriched/validated contacts into Instantly for cold email outreach
- Claude Code automates the entire pipeline: Raphonic → Apollo → Million Verifier → Instantly

**How to set it up:**
1. Sign up for Raphonic
2. Search by keywords relevant to your niche
3. Export results → enrich through Apollo → validate → load into Instantly
4. Or use the API and let Claude Code handle the full pipeline

**Integrates with:** Apollo (enrichment), Million Verifier (validation), Instantly (outreach), Claude Code (automation)

---

## 8. FACEBOOK ADS API

**Category:** Paid Advertising
**What it does:** Allows programmatic creation, management, and optimization of Facebook/Instagram ads without using the Facebook Ads Manager UI.

**How Cody uses it:**
- **Bulk Ad Creation:** Claude Code generates 100 ad variations (different headlines, copy, images) and uploads them all as drafts to Facebook via the API
- **Performance Analysis:** Pulls ad performance data into a dashboard, identifies low performers, and automatically pauses them
- **Budget Optimization:** Moves budget from low-performing ads to high-performing ones programmatically
- **Creative Testing:** Generates React component ad creatives → exports as PNGs → uploads via API

**How to set it up:**
1. Create a Facebook Developer account, get an access token
2. Set up a Business Manager account with ad accounts
3. Add the access token to your `.env` file
4. Claude Code uses the Facebook Marketing API to create campaigns, ad sets, and ads
5. Pull performance data for analysis

**Integrates with:** Claude Code (creative generation + campaign management), Nano Banana Pro / Kai AI (image generation), Railway (for always-on ad management)

---

## 9. FACEBOOK ADS LIBRARY

**Category:** Competitor Research
**Cost:** Free
**What it does:** Public database of every active ad running on Facebook/Instagram. You can search by advertiser, keyword, or category to see competitors' creative, copy, and targeting.

**How Cody uses it:**
- Researches competitor ad creative and messaging before creating his own
- Identifies what copy/angles competitors are testing
- Claude Code scrapes the ads library to pull competitor ad data for analysis
- Uses competitor insights to inform his own ad creative generation

**How to set it up:**
1. Go to facebook.com/ads/library
2. Search by competitor name or keywords
3. Or use the Ads Library API for programmatic access
4. Feed findings to Claude Code as context for ad creation

**Integrates with:** Claude Code (research → creative generation), Facebook Ads API (publishing)

---

## 10. NANO BANANA PRO

**Category:** AI Image Generation
**What it does:** One of the best AI image models for generating high-quality marketing visuals. Produces photorealistic and stylized images from text prompts.

**How Cody uses it:**
- Generates ad creative images at scale
- Mentioned as the best image model available
- Caveat: sometimes struggles to stay "on brand" — Cody sometimes prefers code-generated React creatives for consistency

**How to set it up:**
1. Access via API
2. Provide text prompts describing the ad creative you want
3. Generate multiple variations for A/B testing
4. Export and upload to Facebook Ads via API

**Integrates with:** Claude Code (prompt generation), Facebook Ads API (publishing)

---

## 11. KAI AI

**Category:** Bulk AI Image Generation
**What it does:** Generates images in bulk — optimized for producing large volumes of ad creative variations quickly.

**How Cody uses it:**
- Mass-produces ad image variations
- Used alongside or instead of Nano Banana Pro when volume is the priority over individual image quality
- Feeds into the Facebook Ads bulk upload pipeline

**Integrates with:** Claude Code (orchestration), Facebook Ads API (publishing)

---

## 12. HEYGEN API

**Category:** AI Video / UGC Generation
**What it does:** Creates AI-generated video content with realistic-looking human avatars. Can produce "user-generated content" (UGC) style videos at scale without hiring real creators.

**How Cody uses it:**
- Generates UGC-style video ads programmatically
- Creates talking-head videos for ad creative without filming
- Scales video production for Facebook/Instagram ads

**How to set it up:**
1. Sign up for HeyGen, get API access
2. Choose or create an avatar
3. Provide script text → HeyGen generates the video
4. Export and upload to ad platforms

**Integrates with:** Claude Code (script generation), Facebook Ads API (publishing)

---

## 13. RAILWAY.COM

**Category:** Infrastructure / Deployment / Databases
**Cost:** Pay-as-you-go (very cheap for small workloads)
**What it does:** Deploys servers, creates databases on the fly, and hosts always-on applications. Think of it as "one-click infrastructure."

**How Cody uses it:**
- **On-the-fly Postgres databases:** When doing data analysis, Claude Code creates a Postgres database on Railway, pumps data in, runs SQL queries, and outputs results — all without touching a UI
- **Always-on agents:** Takes proven Claude Code workflows and deploys them as always-on processes that run 24/7 on Railway servers
- **Autonomous marketing:** The dream — deploy agents that automatically respond to LinkedIn, manage Facebook ads, send cold emails, all running on Railway

**How to set it up:**
1. Sign up for Railway.com
2. Use their API to programmatically create Postgres databases
3. Claude Code pushes data into the database, runs analysis, and exports results
4. Deploy agent scripts as Railway services for 24/7 operation

**Integrates with:** Claude Code (creates and manages everything), Postgres (database), Facebook Ads API, Instantly, PhantomBuster

---

## 14. VERCEL

**Category:** Deployment / Hosting
**What it does:** Deploys web applications (especially Next.js/React) with zero configuration. One-command deploys.

**How Cody uses it:**
- Deploys front-end applications and dashboards
- Mentioned as part of the deployment stack alongside Railway

**Integrates with:** Claude Code (deployment automation), React/Next.js apps

---

## 15. GRAPHED / GRAPHED MCP

**Category:** Data Warehouse / Live Data Feeds / Analytics
**What it does:** Cody's own startup. A data warehouse that provides live data feeds and connects to Claude Code via MCP (Model Context Protocol). Essentially gives Claude Code real-time access to all your marketing/sales data.

**How Cody uses it:**
- Connects all data sources (Facebook Ads, Google Analytics, CRM, etc.) into one unified data warehouse
- Claude Code queries Graphed via MCP to get real-time performance data
- Enables data-driven decisions within Claude Code sessions: "Show me which ads are underperforming" → Claude Code queries Graphed → gets data → takes action

**How to set it up:**
1. Sign up at graphed.com
2. Connect your data sources (ad platforms, analytics, CRM)
3. Install the Graphed MCP in your Claude Code environment
4. Claude Code can now query your live marketing data

**Integrates with:** Claude Code (via MCP), Google Analytics 4, Facebook Ads, Salesforce, any data source

---

## 16. GOOGLE ANALYTICS 4 (GA4)

**Category:** Web Analytics
**What it does:** Tracks website traffic, user behavior, conversions, and attribution.

**How Cody uses it:**
- Feeds data into Graphed for unified analytics
- Claude Code can query GA4 data (via Graphed MCP) to analyze campaign performance
- Tracks UTM parameters from cold email campaigns, social posts, and ads

**Integrates with:** Graphed (data warehouse), Claude Code (analysis via MCP)

---

## 17. NOTION

**Category:** Documentation / Knowledge Base
**What it does:** All-in-one workspace for notes, docs, wikis, and databases.

**How Cody uses it:**
- Claude Code creates Notion documents programmatically via Notion API
- Generates campaign briefs, content docs, and research summaries directly into Notion
- Uses Notion as the "output" layer — Claude Code does the work, Notion stores the results

**How to set it up:**
1. Get a Notion API key (integration token)
2. Add to your `.env` file
3. Claude Code can create pages, databases, and update content via API

**Integrates with:** Claude Code (content creation), any workflow that needs documentation

---

## 18. SENDGRID API

**Category:** Transactional Email
**What it does:** Sends transactional emails (welcome emails, notifications, receipts) at scale via API.

**How Cody uses it:**
- Sends automated emails triggered by user actions
- Different from Instantly (which handles cold email) — SendGrid handles emails to existing users/subscribers
- Claude Code triggers SendGrid API calls based on events

**Integrates with:** Claude Code (triggers), your product/app (user events)

---

## 19. INTERCOM

**Category:** Customer Communication / Live Chat
**What it does:** In-app messaging, live chat, help desk, and customer engagement platform.

**How Cody uses it:**
- Customer support and engagement
- Mentioned as part of the CRM/communication stack

**Integrates with:** Graphed (data), Claude Code (can automate responses via API)

---

## 20. SLACK

**Category:** Team Communication
**What it does:** Messaging platform for teams.

**How Cody uses it:**
- Receives notifications from automated workflows (e.g., "New interested reply from Instantly")
- Claude Code sends Slack messages via webhook when important events happen
- Used as the notification layer for the entire automated stack

**Integrates with:** Claude Code (notifications via webhook), Instantly (reply alerts), every other tool

---

## 21. CAL.COM API

**Category:** Scheduling
**What it does:** Open-source scheduling tool (like Calendly). API allows programmatic booking management.

**How Cody uses it:**
- When a cold email recipient replies "interested" → automated workflow sends them a Cal.com booking link
- Claude Code can create/manage scheduling links via API

**Integrates with:** Instantly (cold email replies → booking), Claude Code (automation)

---

## 22. CLAY.COM

**Category:** Data Enrichment Workflows (Referenced as Origin of "GTM Engineering")
**What it does:** Visual workflow builder for cascading data enrichment — LinkedIn profile → email lookup → company data → CRM push. The original "GTM engineering" tool.

**How Cody references it:**
- Credits Clay with coining "GTM engineering" as a term
- Says the concept has evolved far beyond Clay's original vision
- Clay did cascading enrichment workflows; now Claude Code does that PLUS content creation, ad management, deployment, data analysis — everything

**Relevance:** Understanding Clay helps you understand the evolution. Clay automated data enrichment; Claude Code automates the entire marketing operation.

---

## 23. PERPLEXITY API

**Category:** AI Search / Research
**What it does:** AI-powered search engine with an API. Returns researched, cited answers to questions.

**How Cody uses it:**
- Research within Claude Code workflows
- When Claude Code needs current information (competitor data, market trends, news), it queries Perplexity
- Feeds research results into content generation and ad copy

**Integrates with:** Claude Code (research layer), content generation workflows

---

## 24. OPENAI CODEX

**Category:** AI Agent (Alternative to Claude Code)
**What it does:** OpenAI's coding agent. Alternative/complement to Claude Code for certain tasks.

**How Cody references it:**
- Mentioned as another agent harness alongside Claude Code
- The concept: pass your ideas to whichever agent handles the task best

**Integrates with:** Same tool ecosystem (APIs don't care which AI calls them)

---

## 25. HTML TO CANVAS

**Category:** Utility / Export
**What it does:** Converts HTML/React components into PNG images. Used for turning code-generated ad creative into uploadable image files.

**How Cody uses it:**
- Claude Code generates ad creative as React components (HTML/CSS)
- HTML to Canvas converts those components into PNG files
- PNGs get uploaded to Facebook Ads via API
- This approach gives more control over brand consistency than AI image generators

**How to set it up:**
- Use the `html2canvas` or `puppeteer` library within a Node.js script
- Claude Code generates the React component → renders it → screenshots it → saves as PNG

**Integrates with:** Claude Code (generates the HTML/React), Facebook Ads API (receives the PNGs)

---

## 26. LOOKER STUDIO (Referenced as Legacy Tool)

**Category:** Business Intelligence / Dashboards
**What it does:** Google's BI tool for creating dashboards and reports.

**How Cody references it:**
- Mentioned as what people USED to use for marketing dashboards
- Now replaced by Claude Code + Graphed MCP + Railway Postgres for more flexible, on-demand analysis
- Scrapes Reddit for pain points that Looker Studio users have → uses those as ad copy angles

---

## 27. SALESFORCE (Referenced as Comparison)

**Category:** CRM
**What it does:** The dominant enterprise CRM.

**How Cody references it:**
- Mentioned as a comparison point for CRM functionality
- The thesis: every SaaS tool (including Salesforce) will need to become API-first because agents are the new users, not humans clicking UIs

---

## 28. IDEA BROWSER

**Category:** Startup Idea Discovery
**URL:** ideabrowser.com
**What it does:** Tool for finding startup ideas and trends. Greg Isenberg's tool.

**How it's referenced:**
- Mentioned in the video description as "the #1 tool to find startup ideas/trends"

---

## 29. THE VIBE MARKETER

**Category:** Resource Hub
**URL:** thevibemarketer.com
**What it does:** Resources for people doing marketing with AI ("vibe marketing").

**How it's referenced:**
- Linked in the video description as a resource hub for AI-powered marketing

---

## THE COMPLETE WORKFLOW (How It All Connects)

```
YOU (voice via SuperWhisper)
  ↓
CLAUDE CODE (orchestrator — runs 7-15 instances simultaneously)
  ↓
┌──────────────────────────────────────────────────────────────┐
│ RESEARCH LAYER                                                │
│  • Perplexity API → market research, competitor intel         │
│  • Facebook Ads Library → competitor ad creative              │
│  • Reddit/YouTube/Twitter → pain point scraping               │
├──────────────────────────────────────────────────────────────┤
│ LEAD GENERATION LAYER                                         │
│  • Raphonic → podcast host scraping                           │
│  • PhantomBuster → LinkedIn engagement scraping               │
│  • Apollo API → email enrichment                              │
│  • Million Verifier → email validation                        │
├──────────────────────────────────────────────────────────────┤
│ OUTREACH LAYER                                                │
│  • Instantly AI → cold email sequences                        │
│  • PhantomBuster → LinkedIn auto-responses                    │
│  • SendGrid → transactional emails                            │
│  • Cal.com → scheduling for interested replies                │
├──────────────────────────────────────────────────────────────┤
│ CREATIVE LAYER                                                │
│  • Claude Code → React component ad creative                  │
│  • HTML to Canvas → convert React to PNGs                     │
│  • Nano Banana Pro → AI image generation                      │
│  • Kai AI → bulk image generation                             │
│  • HeyGen → AI video/UGC generation                          │
├──────────────────────────────────────────────────────────────┤
│ ADVERTISING LAYER                                             │
│  • Facebook Ads API → bulk upload, manage, optimize ads       │
│  • Facebook Ads Library → competitor research                 │
├──────────────────────────────────────────────────────────────┤
│ DATA & ANALYTICS LAYER                                        │
│  • Graphed MCP → unified data warehouse + live feeds          │
│  • Google Analytics 4 → web traffic and conversions           │
│  • Railway Postgres → on-the-fly databases for analysis       │
├──────────────────────────────────────────────────────────────┤
│ INFRASTRUCTURE LAYER                                          │
│  • Railway.com → deploy always-on agents + databases          │
│  • Vercel → deploy web apps and dashboards                    │
├──────────────────────────────────────────────────────────────┤
│ PRODUCTIVITY LAYER                                            │
│  • Notion → documentation and content storage                 │
│  • Slack → notifications and alerts                           │
│  • Intercom → customer communication                          │
│  • CLAUDE.md → persistent agent memory/instructions           │
│  • .env file → centralized API key management                 │
└──────────────────────────────────────────────────────────────┘
```

---

## KEY CONCEPTS FROM THE EPISODE

**1. The `.env` File is Your Control Panel**
One file with every API key. Every Claude Code instance reads from it. This is what makes the multi-agent workflow possible — any agent can access any tool.

**2. The `CLAUDE.md` File is Your Agent's Brain**
Persistent instructions that Claude Code reads on startup. Put your brand voice, product info, target audience, and workflow instructions here. It's the difference between Claude Code doing generic work and doing YOUR work.

**3. Code-Generated Ad Creative > AI Image Models (For Testing)**
Cody generates ad creative as React components (text + layout + styling) → exports as PNGs. This costs nothing, gives perfect brand control, and allows rapid iteration. AI image models are great for polished final creative, but code-generated is better for fast testing of messaging.

**4. The LinkedIn → Cold Email Pipeline**
Scrape everyone who engaged with a relevant LinkedIn post → enrich through Apollo → validate through Million Verifier → load into Instantly → send personalized cold emails. This turns social engagement into outbound pipeline automatically.

**5. Railway = Always-On Agents**
Once you've proven a workflow in Claude Code (it works, generates results), deploy it to Railway so it runs 24/7 without you. This is how one person replaces a team — the agents never sleep.

**6. APIs Are the New Product**
The thesis: every SaaS tool needs to become API-first because AI agents are the new "users." The UI is becoming the nice-to-have. The API is the product. Build for agents, not humans.

**7. Domain Expertise is the Real Moat**
The tools are available to everyone. The competitive advantage is the vocabulary, industry knowledge, and strategic judgment you bring. A pharma lawyer using these tools for children's health content will produce fundamentally different (and better, for that niche) output than a generalist.

---

## 30. ETSY API / ETSY SHOP AUTOMATION (Teased at End)

**Category:** E-Commerce Automation
**What it does:** Runs an entire Etsy storefront autonomously — product creation, listing management, and operations — all via AI agents.

**How Cody used it:**
- Had a Claude Code agent running an Etsy shop fully autonomously
- The agent presumably generated product listings (likely digital products or print-on-demand), priced them, wrote descriptions, and managed the store
- Got banned 2 days before the episode aired — platforms eventually detect fully automated operations
- Cody found it hilarious, implying it ran successfully for a while before the ban

**Key takeaway:** Agents can run entire storefronts, but platforms will eventually catch on. The play is to use agents for the heavy lifting (product research, listing generation, ad creative) while keeping enough human touch to stay compliant.

**Integrates with:** Claude Code (orchestration), potentially Nano Banana Pro / Kai AI (product image generation), Facebook Ads API (driving traffic to store)

---

## 31. CHROME EXTENSIONS (Teased at End)

**Category:** Product Development / Distribution
**What it does:** Claude Code can "one-shot" build Chrome extensions — you describe what you want, it builds the entire extension, and you publish it to the Chrome Web Store.

**How Cody teased it:**
- Said "you can go for days about Chrome extensions right now"
- You can have Claude Code build a Chrome extension → publish it → turn on Facebook ads to drive installs — all automated
- This is a full product-launch pipeline: ideation → development → distribution, all agent-driven

**Key takeaway:** Chrome extensions are a massively underrated distribution channel. Claude Code can build them in minutes, and you can run Facebook ads to drive installs. The extension itself can serve as a lead magnet or product.

**Integrates with:** Claude Code (builds the extension), Facebook Ads API (drives installs), Chrome Web Store (distribution)

---

## BIOIKIDS APPLICATION

Every tool in this stack maps directly to the bioKids GTM playbook:

| Cody's Tool | bioKids Use Case |
|-------------|-----------------|
| Raphonic → Apollo → Million Verifier → Instantly | Podcast outreach campaign (already in playbook) |
| PhantomBuster → Apollo → Instantly | Scrape crunchy mom influencer LinkedIn engagement → cold email |
| Facebook Ads API + Claude Code | Bulk-create and test 100 ad variations targeting crunchy moms |
| Nano Banana Pro / Kai AI | Generate ad images: "pharma lawyer exposes kids' oatmeal" visuals |
| HeyGen | Create UGC-style video ads of Gregory Rigano talking about growth blockers |
| Railway | Deploy always-on agent that auto-responds to LinkedIn comments about kids' health |
| Graphed MCP | Unified dashboard: track which channel drives the most biokids.me sign-ups |
| SuperWhisper + Claude Code | Voice-drive the entire operation from your phone/laptop |
| Notion | Store all campaign briefs, lead lists, performance reports |
| Cal.com | When podcast hosts reply "interested" → auto-send scheduling link |
