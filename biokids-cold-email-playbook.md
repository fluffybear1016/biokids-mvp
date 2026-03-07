# bioKids Cold Email Automation Playbook

*Updated March 7, 2026 — "All In" positioning with Gregory Rigano as named founder.*

## The Stack ($85-115/mo total)

| Tool | Cost | Purpose |
|------|------|---------|
| Instantly AI | $30/mo (Growth) | Sending infrastructure, sequences, warmup |
| Million Verifier | $30 one-time | Email validation before loading |
| Apollo.io | Free tier / $49/mo | Lead scraping (holistic peds, coaches, NIL agents) |
| PhantomBuster or Apify | Free tier / $59/mo | YouTube/Instagram scraper for creator emails |
| n8n (self-hosted) or Make | Free / $9/mo | Workflow automation |
| Repurpose.io | $25/mo | Auto-post content across platforms |

---

## Infrastructure Setup (Do This First)

### 1. Domain & Mailbox Setup

Buy 3 secondary domains for cold outreach (never send cold email from biokids.me):

- `biokidshealth.com`
- `biokidsgrowth.com`
- `getbiokids.com`

For each domain, create 3 mailboxes:
- `greg@biokidshealth.com`
- `hello@biokidshealth.com`
- `gregory@biokidshealth.com`

That gives you 9 mailboxes = ~450 emails/day capacity (50/mailbox/day).

**DNS Setup for each domain:**
- SPF record
- DKIM record
- DMARC record
- Custom tracking domain in Instantly

**Cost:** ~$2/mailbox/mo on Google Workspace or $6/mo total on Instantly's mailbox add-on.

### 2. Warmup Period

Load all 9 mailboxes into Instantly AI's warmup tool. Let them warm for 14 days minimum before sending any campaigns. Instantly handles this automatically.

### 3. Lead Validation Rule

Every lead list gets run through Million Verifier before loading into Instantly. Target: only load "safe" and "valid" emails. Delete anything rated "risky" or "invalid." This keeps bounce rate under 3%.

---

## Campaign 1: Parenting & Health Podcasts

**Goal:** Get featured on 20+ podcasts within 90 days. Each podcast appearance = 50-200 site visits.

### Lead Scraping Method

Use the Cody Schneider playbook:

1. Go to Apple Podcasts or Spotify and search keywords:
   - "children's health"
   - "natural parenting"
   - "holistic kids"
   - "child nutrition"
   - "growth and development"
   - "mom health"
   - "pediatric wellness"
   - "sports parenting"
   - "youth athlete"
   - "crunchy mom"
   - "natural health"
   - "anti-establishment health"
   - "medical freedom"

2. Use RapidAPI's podcast scraper (or Listennotes API free tier) to pull:
   - Podcast name
   - Host name
   - Description
   - Website URL

3. For each podcast website, use Hunter.io or Apollo to find the host/producer email.

4. Validate all emails through Million Verifier.

**Target volume:** 500-1,000 podcasts

### Email Sequence

**Email 1 — Day 0:**

```
Subject: quick question about [PODCAST NAME]

Hi [FIRST NAME],

Been listening to [PODCAST NAME] — your episode on [RECENT TOPIC] was really well done. The point about [SPECIFIC DETAIL] stuck with me.

I'm Gregory Rigano — pharmaceutical and environmental lawyer. During COVID, my research was published by Elon Musk and I appeared on national TV. I'm used to digging into science that the mainstream doesn't want you to see.

Now I'm applying that same obsession to children's growth. My brother's wife played D1 volleyball — they have 3 kids (13, 11, 8) who all want to go pro. I built bioKids (biokids.me) to give parents the peer-reviewed science on how to optimize their child's natural growth hormone.

Some things your listeners would find wild:

- Glyphosate in conventional oats actively suppresses growth hormone in children
- 30-second sprints increase growth hormone by 700%+
- Dennis Rodman grew 12 inches after age 19 due to delayed puberty biology
- 18 everyday things are secretly blocking your child's growth

Would your audience be into a conversation about what the food industry doesn't want parents to know about their kids' growth? Happy to share our research beforehand.

Gregory Rigano
Founder, bioKids
biokids.me
```

**Email 2 — Day 3 (if no reply):**

```
Subject: Re: quick question about [PODCAST NAME]

Hey [FIRST NAME],

Just bumping this up. I know inboxes are brutal.

The short version: I'm a pharma lawyer who discovered that most kids' food supply is working against their growth hormone production. I can break down the exact science — cited from JAMA, Endocrine Reviews, Journal of Applied Physiology — in a way that'll have your listeners texting their friends about it.

This isn't a supplements pitch. It's peer-reviewed science that parents aren't being told.

Worth a 15-min chat to see if it's a fit?

Greg
```

**Email 3 — Day 7 (if no reply):**

```
Subject: Re: quick question about [PODCAST NAME]

Hi [FIRST NAME],

Last follow-up on this. Totally understand if timing isn't right.

If you ever do an episode on kids' nutrition, growth, or the hidden toxins in children's food — I'd love to be a resource. I've done the pharmaceutical law research that most doctors haven't seen. Our free articles are at biokids.me/learn.

Either way, keep up the great work on [PODCAST NAME].

Greg
```

**Expected Results (based on Cody Schneider benchmarks):**
- 500 podcasts contacted → ~28 replies (5.6%) → ~10 booked appearances
- 1,000 podcasts contacted → ~56 replies → ~20 booked appearances

---

## Campaign 2: Holistic / Integrative Pediatricians

**Goal:** Get 50 practitioners to recommend bioKids to patients. Each practitioner = 10-50 referred parents.

### Lead Scraping Method

1. **Apollo.io search filters:**
   - Job titles: "Naturopathic Doctor," "Integrative Pediatrician," "Holistic Pediatrician," "Functional Medicine Doctor"
   - Industry: Healthcare
   - Keywords: "pediatric," "children," "holistic," "integrative," "naturopathic"
   - Location: United States

2. **Google Maps scraping (via Apify or Outscraper):**
   - Search: "holistic pediatrician [city]" across top 50 US metros
   - Search: "naturopathic doctor children [city]"
   - Search: "integrative medicine pediatric [city]"
   - Pull: practice name, website, phone, email from website

3. **Directories:**
   - IFM (Institute for Functional Medicine) practitioner directory
   - AANP (American Association of Naturopathic Physicians)
   - Integrative Pediatrics Council member list

**Target volume:** 800-1,200 practitioners

### Email Sequence

**Email 1 — Day 0:**

```
Subject: free growth resource for your pediatric patients

Hi Dr. [LAST NAME],

I saw your practice focuses on [INTEGRATIVE/HOLISTIC/FUNCTIONAL] pediatric care — which is exactly the audience we built bioKids for.

I'm Gregory Rigano — pharmaceutical and environmental lawyer. I spent years in pharma law before turning my research focus to children's growth science. My brother's kids (all aspiring pro athletes) were the catalyst — I wanted to understand the GH-IGF-1 axis and what parents can actually do to optimize it naturally.

bioKids (biokids.me) is the result — a free research platform that helps parents understand growth hormone biology and what disrupts it. All content is peer-reviewed — we cite JAMA, Endocrine Reviews, Journal of Applied Physiology, and others.

A few things your patients' parents would find valuable:

- How the GH-IGF-1 axis works (and what disrupts it)
- The 18 most common growth blockers in children's environments (including glyphosate in conventional oats)
- Why 30-second sprints are the most powerful natural GH trigger (700%+ increase)

We're not selling supplements. We're giving parents the science so they can make informed decisions — which aligns with what you're already doing.

Would it be useful to have a link you can share with patients? Happy to send a one-pager for your waiting room too.

Gregory Rigano
Founder, bioKids
biokids.me
```

**Email 2 — Day 4:**

```
Subject: Re: free growth resource for your pediatric patients

Dr. [LAST NAME],

Quick follow-up. Here are the specific articles your patients might benefit from:

1. How Your Child Actually Grows — biokids.me/learn/how-your-child-grows
2. 18 Growth Blockers to Avoid — biokids.me/learn/growth-blockers-to-avoid
3. Sprinting & Growth Hormone — biokids.me/learn/sprinting-growth-hormone

All free, no paywall, no email required. The glyphosate research in the growth blockers article alone tends to be eye-opening for parents.

Would any of these be worth sharing with families in your practice?

Greg
```

**Email 3 — Day 8:**

```
Subject: Re: free growth resource for your pediatric patients

Hi Dr. [LAST NAME],

Last note on this. I know you're busy.

If you ever have a parent asking about natural ways to support their child's growth — biokids.me is a research-backed resource they can explore on their own. Built by a pharmaceutical lawyer, not a supplement company. No pitch, just science.

Happy to be a resource anytime.

Greg
```

**Expected Results:**
- 1,000 practitioners contacted → ~50 replies (5%) → ~30 who share the resource
- Each practitioner sharing = 10-50 parents over 6 months = 300-1,500 new visitors

---

## Campaign 3: AAU / Youth Sports Directors & Coaches

**Goal:** Get bioKids content distributed through 30+ youth sports programs. Each program = 50-500 families.

### Lead Scraping Method

1. **AAU directory scraping:**
   - aauboysbasketball.org → club directory by state
   - aausports.org → track & field, volleyball, wrestling directories
   - Pull: organization name, director name, email, state

2. **Google search scraping (via Apify):**
   - "AAU basketball [state] director email"
   - "youth travel basketball [city] coach contact"
   - "youth track and field club [state]"
   - "youth sports academy [city]"

3. **Social scraping:**
   - Search Instagram/Facebook for AAU program pages
   - Extract admin email from bio/about section

**Target volume:** 500-800 programs

### Email Sequence

**Email 1 — Day 0:**

```
Subject: free resource your athletes' parents would want

Hi [FIRST NAME],

I found [PROGRAM NAME] while looking at [SPORT] programs in [STATE] — looks like you're building something great for these kids.

I'm Gregory Rigano — my brother's wife played D1 volleyball and their 3 kids (ages 13, 11, 8) all want to go pro. As their Godfather and a researcher by profession (pharmaceutical/environmental law), I went deep on the science of how young athletes actually grow.

What I found is directly relevant to your program: a single 30-second all-out sprint raises growth hormone by 700%+. Sprint-trained athletes produce nearly 3x the peak GH of endurance-trained athletes. Your kids are already triggering this — but most parents have no idea about the other 18 things in their environment that are quietly suppressing it.

I put all the peer-reviewed research together at bioKids (biokids.me) so sports parents could see it:
- Why sprinting is the most powerful natural GH trigger
- 18 common things that secretly block growth in kids
- How the growth hormone system actually works

Would your families find this useful? Happy to put together a quick resource sheet you could share with parents.

Greg Rigano
Founder, bioKids
biokids.me
```

**Email 2 — Day 3:**

```
Subject: Re: free resource your athletes' parents would want

Hey [FIRST NAME],

Quick follow-up. Here's the specific article about sprinting and growth hormone that's most relevant to your athletes:

biokids.me/learn/sprinting-growth-hormone

The science backs up what great coaches already know — short, explosive work builds better athletes. This just explains the hormonal mechanism behind it. Written by a pharma lawyer, fully cited from JAMA and Endocrine Reviews.

Worth a look?

Greg
```

**Email 3 — Day 7:**

```
Subject: the Dennis Rodman growth article

Hi [FIRST NAME],

One more thing your parents might love — we have an article about how Dennis Rodman grew from 5'8" to 6'8" after high school:

biokids.me/learn/dennis-rodman-growth

The biology behind late growth spurts is wild. Great conversation starter for sports parents who worry about their kid's height.

Either way, best of luck this season with [PROGRAM NAME].

Greg
```

**Expected Results:**
- 600 programs contacted → ~36 replies (6%) → ~20 who share with parents
- Each program = 50-200 families exposed = 1,000-4,000 new visitors

---

## Campaign 4: Parenting Newsletter Authors & Bloggers

**Goal:** Get bioKids cited in 15+ newsletters/blogs. Each placement = 100-1,000 clicks.

### Lead Scraping Method

1. **Substack scraping:**
   - Browse Substack's parenting category
   - Search: "parenting," "motherhood," "child health," "nutrition kids," "crunchy mom," "natural living," "holistic family"
   - Pull: newsletter name, author, subscriber count (if visible), email (from About page)

2. **Beehiiv / ConvertKit creator directories**

3. **Google search:**
   - "parenting newsletter" + "subscribe"
   - "crunchy mom blog" + "about" + "contact"
   - "natural parenting blog" + "guest post" OR "write for us"
   - "holistic family newsletter"

4. **SparkToro** (free tier):
   - Search audience: "parents interested in natural health"
   - Shows which newsletters/blogs they read

**Target volume:** 300-500 newsletter authors

### Email Sequence

**Email 1 — Day 0:**

```
Subject: content your readers would share

Hi [FIRST NAME],

I've been reading [NEWSLETTER NAME] — your piece on [RECENT TOPIC] was [SPECIFIC COMPLIMENT].

I'm Gregory Rigano — pharmaceutical and environmental lawyer. My research was published by Elon Musk during COVID. Now I'm applying that same intensity to children's growth science.

The catalyst: my brother's wife played D1 volleyball. Their 3 kids (13, 11, 8) all want to go pro. I built bioKids (biokids.me) to share the peer-reviewed research I found on how children's growth hormone actually works — and what's suppressing it.

Two pieces that might resonate with your audience:

- "18 Growth Blockers to Avoid" — a checklist of things most parents don't realize are suppressing their child's growth hormone (glyphosate in oats, blue light before bed, etc.)
- "The Dennis Rodman Growth Story" — how he grew 12 inches after age 19 due to delayed puberty biology

Both are free, no paywall, fully cited from JAMA, Endocrine Reviews, etc.

Would either be useful as a link or reference in an upcoming issue? Happy to provide any additional context or quotes.

Gregory Rigano
Founder, bioKids
biokids.me
```

**Email 2 — Day 4:**

```
Subject: Re: content your readers would share

Hey [FIRST NAME],

Just bumping this. The growth blockers article in particular tends to get a strong reaction from parents — most had no idea about glyphosate levels in kids' oatmeal or that early puberty directly shortens the growth window.

Here's the direct link: biokids.me/learn/growth-blockers-to-avoid

Written by a pharma lawyer, not a supplement company. That distinction matters to readers who are skeptical of health content online.

No pressure at all — just thought it could be a fit.

Greg
```

**Expected Results:**
- 400 newsletters contacted → ~24 replies (6%) → ~12 who mention/link bioKids
- Each mention = 100-1,000 clicks = 1,200-12,000 new visitors

---

## Campaign 5: Creator / Influencer Paid Collaborations

**Goal:** Get 10 creators to post bioKids content. Each creator post = 500-5,000 views.

### Lead Scraping Method

1. **YouTube scraping (via RapidAPI YouTube Search API):**
   - Search: "kids nutrition," "child height," "growth tips kids," "healthy kids meals," "sports parent," "youth athlete training," "crunchy mom," "natural parenting," "holistic health kids"
   - Filter: channels with 5K-100K subscribers (micro-influencers, higher engagement, affordable)
   - Extract: channel name, email (from About → Business inquiries)

2. **Instagram scraping (via PhantomBuster):**
   - Search hashtags: #crunchymom, #holisticmom, #kidsnutrition, #youthathlete, #sportsparent, #naturalparenting, #nontoxicliving, #organicmom, #medicalfreedom
   - Filter: accounts with 5K-50K followers
   - Extract: email from bio

3. **TikTok manual search:**
   - Search: "crunchy mom," "kids nutrition," "mom hack healthy," "growth tips," "what I feed my kids"
   - Look for creators who post about natural living, clean eating, toxin-free homes

**Target volume:** 200-400 creators

### Email Sequence

**Email 1 — Day 0:**

```
Subject: paid collaboration — bioKids x [CREATOR NAME]

Hi [FIRST NAME],

Enjoying the content you're making about [TOPIC]. Your [SPECIFIC VIDEO TITLE OR TOPIC] really stood out.

I'm Gregory Rigano — pharmaceutical and environmental lawyer. My research was published by Elon Musk during COVID. Now I run bioKids (biokids.me), a science platform that helps parents understand what's really going on with their child's growth hormone — and what's suppressing it.

We're looking for creators to collaborate with on a paid basis. Here's what we're thinking:

- 3 videos over 6 weeks featuring bioKids content
- Each video: natural mention + link to a specific bioKids article
- We provide the talking points, you make it yours
- On top of the flat fee: 30% affiliate commission on any sign-ups from your audience

Some content angles that perform especially well:
1. "Pharma lawyer exposes what's in your kids' oatmeal" (glyphosate + growth hormone)
2. "18 things secretly stunting your child's growth — a pharma lawyer explains"
3. "How Dennis Rodman grew 12 inches after high school"
4. "A 30-second sprint increases your kid's growth hormone by 700%"

Would you be open to a quick chat about pricing and fit?

Gregory Rigano
Founder, bioKids
biokids.me
```

**Email 2 — Day 3:**

```
Subject: Re: paid collaboration — bioKids x [CREATOR NAME]

Hey [FIRST NAME],

Just following up on the collab idea. Totally flexible on format — could be a dedicated video, a segment in your regular content, or even a story/reel series. Whatever works best for your audience.

The "pharma lawyer exposes what's in kids' food" angle tends to perform well because it's both credible and unexpected. Your audience will share it.

The 30% affiliate commission is ongoing too — so every parent who signs up through your link earns you revenue long-term.

Worth a quick 10-min call?

Greg
```

**Email 3 — Day 7:**

```
Subject: Re: paid collaboration — bioKids x [CREATOR NAME]

Hi [FIRST NAME],

Last follow-up on this. If paid collabs aren't your thing right now, happy to just send you access to our full research library — some eye-opening science about what's in kids' food and how it affects their growth. Written by a pharma lawyer, fully peer-reviewed.

Either way, keep doing what you're doing. Your audience clearly values it.

Greg
```

**Expected Results:**
- 300 creators contacted → ~18 replies (6%) → ~10 who agree to collaborate
- Budget: $100-300 per micro-influencer for 3 videos
- Each collaboration = 500-5,000 views = 50-500 site visits

---

## NEW: Campaign 6 — Crunchy Mom / Natural Health Influencers (All-In Track)

**Goal:** Get 15 natural health / anti-establishment creators to organically share bioKids. This is the highest-conversion audience.

### Lead Scraping Method

1. **Instagram hashtag scraping:**
   - #crunchymom, #toxinfree, #cleanfood, #naturalparenting, #holisticmom, #organickids, #nontoxicliving, #medicalfreedom, #mamaknows
   - Filter: 10K-200K followers, high engagement rate (>3%)
   - These creators' audiences overlap almost perfectly with the Facebook groups

2. **TikTok manual search:**
   - "What I stopped feeding my kids" (clean eating moms)
   - "Things that are actually toxic" (toxin awareness moms)
   - "Crunchy mom day in my life"
   - "Natural health for kids"

3. **Substack / podcast cross-reference:**
   - Find crunchy mom podcasters who also have social followings
   - Double-channel reach when they mention bioKids on both platforms

**Target volume:** 150-250 creators

### Email Sequence

**Email 1 — Day 0:**

```
Subject: [FIRST NAME] — pharma lawyer here, want to share something with your audience

Hi [FIRST NAME],

I'm Gregory Rigano — pharmaceutical and environmental lawyer. During COVID, my research was published by Elon Musk and I appeared on national TV. The mainstream media attacked me for telling uncomfortable truths. I kept going.

Now I'm researching something that directly affects your audience: what the food industry is doing to children's growth hormone.

Here's the headline: glyphosate — the herbicide in nearly all conventional oats, wheat, and grains — actively suppresses growth hormone production in children. This isn't fringe science. It's in JAMA. It's in Endocrine Reviews. But nobody in mainstream pediatrics is talking about it.

I built bioKids (biokids.me) to put this research directly in parents' hands. No supplements. No products. Just the peer-reviewed science.

I think your audience would want to know about this. A few angles:

1. "18 things in your home that suppress your child's growth hormone" (glyphosate, blue light, processed sugar, etc.)
2. "What Big Food doesn't want you to know about your kids' oatmeal"
3. "The science behind how your child actually grows — and what's blocking it"

Not looking for a paid deal necessarily — I just think this information deserves to reach the parents who will actually act on it. Your audience is exactly those parents.

Would you be interested in seeing the research?

Gregory Rigano
Founder, bioKids
biokids.me
```

**Email 2 — Day 3:**

```
Subject: Re: the oatmeal research

Hey [FIRST NAME],

Quick follow-up. Here's the specific article about growth blockers: biokids.me/learn/growth-blockers-to-avoid

Glyphosate, blue light, BPA, processed sugar, excess soy — all peer-reviewed, all suppressing growth hormone in kids. Parents freak out when they see this list because most of them are feeding their kids these things daily.

I'm a pharma lawyer. I know how these companies work. This information is deliberately not making it to parents.

Happy to chat more if this resonates.

Greg
```

**Email 3 — Day 7:**

```
Subject: Re: pharma lawyer here

Hi [FIRST NAME],

Last note. The reason I built bioKids is personal — my brother's 3 kids (13, 11, 8) all want to go pro in sports. Their mom played D1 volleyball. When I started researching the science of growth, what I found made me angry. The food supply is actively working against these kids.

If you ever want to reference any of our research in your content — it's all free at biokids.me/learn. No paywall, no email gate, fully cited.

Keep doing what you do. Parents need voices like yours.

Greg
```

**Expected Results:**
- 200 creators contacted → ~16 replies (8% — higher because message resonates deeply with this audience)
- ~10 who organically share or create content about bioKids
- Each organic share from a 10K-200K follower account = 1,000-10,000 views
- This audience SHARES — expect secondary virality (their followers reshare)

---

## Instantly AI Campaign Setup

### Sequence Settings (apply to all campaigns)

| Setting | Value |
|---------|-------|
| Emails per day per account | 40-50 |
| Minimum delay between emails | 3-5 minutes |
| Reply handling | Auto-detect, pause sequence |
| Warmup | Keep ON even during campaigns |
| Tracking | Open tracking ON, click tracking OFF (improves deliverability) |
| Sending window | 8am - 6pm recipient timezone |
| Sending days | Monday - Friday |

### Campaign Priority Order (Updated for "All In")

Launch in this order (1 campaign per week):

1. **Week 1:** Campaign 6 — Crunchy Mom / Natural Health Creators (highest audience alignment — these creators share proactively)
2. **Week 2:** Campaign 1 — Parenting Podcasts (highest leverage — one appearance = hundreds of visitors)
3. **Week 3:** Campaign 4 — Newsletter Authors (compounding — one mention lives forever)
4. **Week 4:** Campaign 2 — Holistic Pediatricians (highest trust — doctor recommendation = instant credibility)
5. **Week 5:** Campaign 3 — AAU / Youth Sports (largest volume — hundreds of families per program)
6. **Week 6:** Campaign 5 — Creator Paid Collaborations (most expensive but viral potential)

### Daily Sending Capacity

With 9 mailboxes at 40 emails/day each = 360 emails/day = ~2,500/week

| Campaign | Leads | Days to Send | Priority |
|----------|-------|-------------|----------|
| Crunchy Mom Creators | 200 | 0.5 days | Week 1 |
| Podcasts | 1,000 | 3 days | Week 2 |
| Newsletters | 400 | 1.5 days | Week 3 |
| Pediatricians | 1,000 | 3 days | Week 4 |
| AAU / Sports | 600 | 2 days | Week 5 |
| Creators (Paid) | 300 | 1 day | Week 6 |
| **Total** | **3,500** | **~11 days** | |

All initial sends complete within 2 weeks. Follow-ups run automatically.

---

## Automation Workflows (n8n or Make)

### Workflow 1: Lead Scraping Pipeline

```
Trigger: Weekly (Monday 6am)
→ Apollo API: Pull new leads matching saved searches
→ Filter: Remove duplicates against master list
→ Million Verifier API: Validate emails
→ Filter: Keep only "valid" and "safe"
→ Instantly API: Add to appropriate campaign
→ Google Sheet: Log all leads with source + date
```

### Workflow 2: Reply Handler

```
Trigger: Instantly webhook (new reply detected)
→ OpenAI API: Classify reply (interested / not interested / question / out of office)
→ If interested → Slack notification + Google Sheet update + draft follow-up
→ If question → Slack notification for manual response
→ If not interested → Auto-archive
→ If out of office → Reschedule for later
```

### Workflow 3: New Content Auto-Distribution

```
Trigger: New article published on biokids.me (webhook)
→ Repurpose.io API: Auto-create social posts
→ Medium API: Cross-post article
→ Quora: Flag for manual answer posting (can't fully automate)
→ Email list: Send update to subscribers
```

---

## Metrics to Track

### Weekly Dashboard

| Metric | Target | Source |
|--------|--------|--------|
| Emails sent | 2,500/week | Instantly |
| Open rate | >60% | Instantly |
| Reply rate | >5% | Instantly |
| Positive reply rate | >3% | Manual tag |
| Bounce rate | <3% | Instantly |
| Podcast bookings | 2-3/week | Manual |
| Practitioner partnerships | 3-5/week | Manual |
| Crunchy creator shares | 2-3/week | Manual |
| Site visits from outreach | Track with UTM links | Analytics |
| New sign-ups from outreach | Track with UTM links | Analytics |

### UTM Link Structure

Every link in every email should use UTM parameters:

```
biokids.me/learn/sprinting-growth-hormone?utm_source=instantly&utm_medium=email&utm_campaign=podcasts&utm_content=email1
```

Campaign values: `crunchy-creators`, `podcasts`, `newsletters`, `pediatricians`, `aau-sports`, `creators-paid`

---

## 90-Day Projection (Updated with "All In" Strategy)

| Channel | Leads Sent | Replies | Conversions | Visitors Generated | Sign-ups (3%) |
|---------|-----------|---------|-------------|-------------------|---------------|
| Crunchy Mom Creators | 200 | 16 (8%) | 10 organic shares | 5,000-20,000 | 150-600 |
| Podcasts | 1,000 | 50 | 20 appearances | 2,000-4,000 | 60-120 |
| Newsletters | 400 | 24 | 12 mentions | 1,200-6,000 | 36-180 |
| Pediatricians | 1,000 | 50 | 30 sharing | 3,000-6,000 | 90-180 |
| AAU/Sports | 600 | 36 | 20 programs | 2,000-4,000 | 60-120 |
| Creators (Paid) | 300 | 18 | 10 collabs | 2,500-12,500 | 75-375 |
| **Total** | **3,500** | **194** | **102** | **15,700-52,500** | **471-1,575** |

**Key insight:** The crunchy mom creator channel alone could generate 150-600 sign-ups because (a) the reply rate is higher (your story resonates), (b) this audience shares aggressively with their networks, and (c) secondary virality is built into the culture — when a crunchy mom influencer says "you need to see this," her followers actually go see it.

Combined with SEO/GEO (already built), Quora answers (already drafted), Medium cross-posts, Facebook Group engagement (51 groups, 1.07M members), and X/Twitter threads from @RiganoESQ — **hitting 1,000 paying subscribers within 90 days is now realistic, not aspirational.**

---

## Quick-Start Checklist

- [ ] Switch Facebook from "Don James" to "Gregory Rigano" with updated bio
- [ ] Update X/Twitter @RiganoESQ bio to mention bioKids
- [ ] Buy 3 secondary domains ($10-12/each)
- [ ] Set up 9 mailboxes (greg@, hello@, gregory@) with SPF/DKIM/DMARC
- [ ] Sign up for Instantly AI Growth plan ($30/mo)
- [ ] Start warmup on all 9 mailboxes (14-day minimum)
- [ ] Buy Million Verifier credits ($30)
- [ ] Sign up for Apollo.io free tier
- [ ] Set up n8n (self-hosted free) or Make ($9/mo)
- [ ] Scrape first lead list: 200 crunchy mom creators (Campaign 6)
- [ ] Validate emails through Million Verifier
- [ ] Load Campaign 6 (Crunchy Mom Creators) into Instantly
- [ ] Set UTM tracking parameters
- [ ] Launch Campaign 6 on Day 15 (after warmup)
- [ ] Scrape Campaign 1 leads (Podcasts) while Campaign 6 runs
- [ ] Launch one new campaign per week for 6 weeks
- [ ] Review metrics weekly, adjust subject lines and copy based on open/reply rates
