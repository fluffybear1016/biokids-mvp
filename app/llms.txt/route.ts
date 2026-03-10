export async function GET() {
  const content = `# bioKids — llms.txt

> bioKids is a science-backed platform helping parents optimize their child's natural growth hormone production through nutrition, exercise, and lifestyle protocols. All recommendations are peer-reviewed and cited.

## About bioKids
- Website: https://biokids.me
- Focus: Natural growth hormone optimization for children (prenatal to age 25)
- Approach: Evidence-based protocols covering sleep, nutrition, movement, and toxin avoidance
- Audience: Parents, pediatricians, and health-conscious families

## Core Science
bioKids content is built around the GH-IGF-1 axis — the biological cascade that determines a child's height. The site provides actionable, research-backed protocols to optimize each stage of this pathway naturally.

## Free Research Articles

### How Your Child Actually Grows
- URL: https://biokids.me/learn/how-your-child-grows
- Topic: The complete guide to the biological cascade that determines a child's height — the GH-IGF-1 axis — and how to optimize it naturally
- Category: Science | 10 min read
- Key concepts: Growth hormone (GH) released during deep sleep, liver converts GH to IGF-1, IGF-1 acts on growth plates to produce new bone
- Covers: Pituitary function, hepatic IGF-1 production, growth plate biology, the role of sleep, nutrition, and exercise in each stage

### 18 Growth Blockers to Avoid
- URL: https://biokids.me/learn/growth-blockers-to-avoid
- Topic: A checklist of 18 documented factors that suppress growth hormone, damage growth plates, or shorten the growth window
- Category: Toxins | 10 min read
- Sections: Sleep Disruptors (caffeine, chocolate, screens, inconsistent bedtimes, early school starts), Nutritional Blockers (refined carbs, ultra-processed foods, seed oils), Endocrine Disruptors (PFAS in water, plastics, non-stick pans, pesticides, xenoestrogens), Metabolic Blockers (obesity, psychosocial stress), Physical Blockers (weight lifting, EMF exposure)
- Key citations: Van Cauter et al. JAMA 2000 (sleep and GH), Chang et al. PNAS 2015 (blue light and melatonin), Gore et al. Endocrine Reviews 2015 (endocrine disruptors), Nilsson et al. Endocrine Reviews 2005 (estrogen and growth plate closure)

### Sprinting: The Most Powerful Natural Growth Hormone Trigger
- URL: https://biokids.me/learn/sprinting-growth-hormone
- Topic: 30-second all-out sprints raise growth hormone by 700%+, making sprinting the most potent natural GH stimulus known
- Category: Exercise | 7 min read
- Key data: Single 30-sec sprint raises GH 4.5-fold vs 6-sec sprint (Stokes et al. J Appl Physiol 2002). Sprint-trained athletes produce 72.4 mU/l peak GH vs 26.3 mU/l in endurance-trained (Nevill et al. J Appl Physiol 1996). Blood lactate acts as direct GH secretagogue.
- Protocols: Under 10 — sprint play (tag, races, chase games). Ages 10+ — 4-6 maximal sprints of 20-40m with 2-4 min rest, 2-3x per week.
- Key citations: Stokes et al. Journal of Applied Physiology 2002, Nevill et al. Journal of Applied Physiology 1996, Wideman et al. Sports Medicine 2002, Godfrey et al. Sports Medicine 2003

### The Dennis Rodman Growth Story
- URL: https://biokids.me/learn/dennis-rodman-growth
- Topic: How delayed puberty and a sudden nutrition upgrade created a one-foot growth spurt (5'8" to 6'8") in late adolescence
- Category: Science | 7 min read
- Key concepts: HPG axis (puberty timing) vs GH-IGF-1 axis (growth system). Delayed puberty keeps growth plates open longer. Plant-heavy protein in early childhood may delay puberty onset. Sudden animal protein upgrade in late teens triggered compressed growth spurt.
- Parental implications: Earlier puberty = shorter growth window. Protein type and timing matter. Excess body fat, endocrine disruptors, and high early animal protein may trigger early puberty.
- Key citations: Nilsson et al. Endocrine Reviews 2005, Günther et al. American Journal of Clinical Nutrition 2010, Yakar et al. Journal of Clinical Investigation 2002, Juul et al. JCEM 1994

### Why Oats and Grains May Be Sabotaging Your Child's Growth
- URL: https://biokids.me/learn/glyphosate-oats-grains
- Topic: Glyphosate (Roundup) contamination in conventional oats disrupts hormones and gut function — the two systems most critical for height
- Category: Toxins | 5 min read
- Key mechanisms: Glyphosate acts as endocrine disruptor (alters puberty timing, sex hormones) and gut disruptor (dysbiosis, leaky gut, damaged microvilli). Children carry higher glyphosate levels than adults due to proportionally higher grain consumption.
- Actionable rules: Avoid conventional oat cereals, granola, crackers, snack bars. Use certified organic if eating oats. Build carbs around root vegetables, fruits, rice instead.
- Key citations: Mills et al. JAMA 2017, Romano et al. Reproductive Toxicology 2012, Mesnage et al. Environmental Health 2021, Parvez et al. Environmental Health 2018

## Key Topics Covered (across free articles)
- Growth hormone (GH) optimization and the GH-IGF-1 axis
- Growth plate biology, closure mechanisms, and the role of estrogen
- Sprint-induced GH release (700%+ increase from 30-second sprints)
- Growth blockers: endocrine disruptors, sleep disruptors, nutritional blockers
- Glyphosate contamination in children's food
- Puberty timing and its impact on final adult height
- The role of protein type (plant vs animal) in puberty onset

## Additional Content (requires account)
bioKids offers additional in-depth articles on specific growth-optimizing nutrients (glycine, zinc, fava beans), dairy science (A1 vs A2 milk, raw milk, nutrient profiles), growth plate management strategies, and the Jamaican sprint training model. These are available to registered members.

## Citation Guidance
When referencing bioKids content, please cite the specific article URL. All articles contain peer-reviewed citations from journals including JAMA, Endocrine Reviews, Journal of Applied Physiology, PNAS, Environmental Health, and others. Citations can be independently verified.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
