// Protocol data — mirrors the web app's home page dayData
// Keeping all science content identical

export type Pump = { p: string; n: string; d: string };
export type Food = { f: string; d: string };
export type DayItem = {
  id: string;
  t: string;
  sub: string;
  gh?: string;
  headline: string;
  tier: number;
  cite: string;
  why?: string;
  tip?: string;
  sig?: boolean;
  feat?: boolean;
  pumps?: Pump[];
  foods?: Food[];
};
export type DayPeriod = {
  period: string;
  time: string;
  note?: string;
  items: DayItem[];
};

export const citeUrls: Record<string, string> = {
  "Brandenberger, Lancet 2000": "https://pubmed.ncbi.nlm.nih.gov/11052586/",
  "Van Cauter, JAMA 2000": "https://pubmed.ncbi.nlm.nih.gov/10938176/",
  "Roenneberg, Curr Biol 2007": "https://pubmed.ncbi.nlm.nih.gov/17240323/",
  "Forsling, J Pineal Res 1999": "https://pubmed.ncbi.nlm.nih.gov/10594526/",
  "Okada, JCEM 1970": "https://pubmed.ncbi.nlm.nih.gov/5412546/",
  "Sramek, Eur J Appl Physiol 2000": "https://pubmed.ncbi.nlm.nih.gov/10751106/",
  "Ziegenfuss, JISSN 2008": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3313098/",
  "Zeisel, Nutr Rev 2009": "https://pubmed.ncbi.nlm.nih.gov/19906248/",
  "Hoppe, Eur J Clin Nutr 2008": "https://pubmed.ncbi.nlm.nih.gov/19174829/",
  "Kang, Nutrients 2019": "https://pubmed.ncbi.nlm.nih.gov/30839054/",
  "Balmer, J Lipid Res 2002": "https://pubmed.ncbi.nlm.nih.gov/12401878/",
  "Soliman, Indian J Endocrinol Metab 2014": "https://pubmed.ncbi.nlm.nih.gov/25538884/",
  "Hallberg, Am J Clin Nutr 1989": "https://pubmed.ncbi.nlm.nih.gov/2911999/",
  "Lanzi, Metabolism 1999": "https://pubmed.ncbi.nlm.nih.gov/10484056/",
  "Hartman, JCEM 1992": "https://pubmed.ncbi.nlm.nih.gov/1548337/",
  "Stokes, J Appl Physiol 2008": "https://pubmed.ncbi.nlm.nih.gov/18187617/",
  "Stokes, J Sports Sci 2002": "https://pubmed.ncbi.nlm.nih.gov/12137178/",
  "Nevill, J Appl Physiol 1996": "https://pubmed.ncbi.nlm.nih.gov/8925817/",
  "Cappon, J Appl Physiol 1994": "https://pubmed.ncbi.nlm.nih.gov/7928875/",
  "Zribi, J Pediatr Endocrinol Metab": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9135997/",
  "Stutz, Sports Med 2019": "https://pubmed.ncbi.nlm.nih.gov/30374942/",
  "Welbourne, Am J Clin Nutr 1995": "https://pubmed.ncbi.nlm.nih.gov/7733028/",
  "Kasai, Metabolism 1980": "https://pubmed.ncbi.nlm.nih.gov/622050/",
  "Kawai, Neuropsychopharmacology 2015": "https://pubmed.ncbi.nlm.nih.gov/25533534/",
  "Zajac, Biol Sport 2018": "https://pubmed.ncbi.nlm.nih.gov/30765926/",
  "Howatson, Eur J Nutr 2012": "https://pubmed.ncbi.nlm.nih.gov/22038497/",
  "Mindell, Sleep 2015": "https://pubmed.ncbi.nlm.nih.gov/25325483/",
  "Takahashi, J Clin Invest 1968": "https://pubmed.ncbi.nlm.nih.gov/5675428/",
};

export const dayData: DayPeriod[] = [
  {
    period: "Morning", time: "whenever they wake", items: [
      { id: "wake", t: "Same wake time", sub: "±30 min, weekends too", gh: "tonight's growth", headline: "of tonight's GH depends on this morning", tier: 1, cite: "Brandenberger, Lancet 2000; Van Cauter, JAMA 2000", why: "Your child's height-driving hormone pulses tonight are programmed by this morning's wake time.", tip: "Same time ±30 min, including weekends.",
        pumps: [
          { p: "Circadian programming", n: "60–80%", d: "Tonight's GH pulse timing set by today's wake time" },
          { p: "Normal sleep advantage", n: "3×", d: "Normal sleep = 3× more peak GH than disrupted" },
        ]},
      { id: "sun", t: "Morning sunlight + stretch", sub: "10 min outside — dead hang, fold over, cobra, cat-cow", gh: "melatonin trigger", headline: "melatonin tonight + spinal decompression", tier: 1, cite: "Roenneberg, Curr Biol 2007; Forsling, J Pineal Res 1999", tip: "Backyard, bus stop walk, porch. Dead hang 3×20 sec.",
        pumps: [
          { p: "Melatonin timing*", n: "up to 157%", d: "Tonight's melatonin set by this morning's light" },
          { p: "Spinal decompression", n: "reverses 1%", d: "Dead hang reverses daily gravitational compression" },
        ]},
      { id: "d1", t: "The Growth Bowl / Smoothie", sub: "Sheep yogurt + PB + berries + seeds + honey", gh: "+0.39 cm/day", headline: "each 8oz of A2 milk/day = +0.39cm across childhood", tier: 0, cite: "Hoppe, Eur J Clin Nutr 2008; Kang, Nutrients 2019", tip: "Dairy FIRST within 1hr of waking, then eggs.",
        pumps: [
          { p: "Lactoferrin", n: "35× more", d: "Sheep vs cow — directly triggers bone cell growth" },
          { p: "Height per serving", n: "+0.39cm", d: "Per additional 8 oz/day across childhood" },
          { p: "Niacin (PB)*", n: "up to 350%", d: "Removes the brake that suppresses growth" },
          { p: "Zinc (pumpkin seeds)", n: "activates 3 levels", d: "Activates the growth axis at pituitary, liver, and growth plate" },
        ],
        foods: [
          { f: "Sheep yogurt, 5 oz (base)", d: "= 8oz A2 milk. 35× more lactoferrin." },
          { f: "Natural peanut butter, 1–2 tbsp", d: "Niacin + arginine." },
          { f: "Berries", d: "Vitamin C + antioxidants. Organic preferred." },
          { f: "Pumpkin seeds, handful", d: "Zinc + arginine + magnesium." },
          { f: "Raw honey drizzle", d: "Sweetness drives compliance." },
        ]},
      { id: "bkf", t: "Pasture-raised eggs — sunny side up", sub: "2–3 daily + red bell pepper", gh: "primes the whole day", headline: "choline from eggs primes the entire growth axis", tier: 0, cite: "Ziegenfuss, JISSN 2008; Zeisel, Nutr Rev 2009", tip: "Sunny side up preserves the most nutrients. Red bell pepper slices alongside.",
        pumps: [
          { p: "Choline → growth axis", n: "axis primer", d: "Two eggs ≈ 300mg choline" },
          { p: "Choline pathway*", n: "up to 4,400%", d: "A-GPC amplified growth signals with exercise" },
        ]},
      { id: "clo", t: "Cod liver oil — ½ tsp daily", sub: "Retinol + vitamin D + omega-3s — NOT on beef liver days", gh: "receptor fuel", headline: "of GH receptor function lost without retinol", tier: 0, cite: "Balmer, J Lipid Res 2002; Soliman, Indian J Endocrinol Metab 2014", tip: "Best hidden in the Growth Smoothie." },
      { id: "ns", t: "No refined sugar until lunch", sub: "Natural sugars fine · no artificial sweeteners ever", gh: "protects overnight growth", headline: "fasting GH — one cereal bowl suppresses up to 80%", tier: 1, cite: "Lanzi, Metabolism 1999; Hartman, JCEM 1992", tip: "Eggs, dairy, fruit, meat for breakfast." },
    ]
  },
  {
    period: "Afternoon", time: "around lunch through late afternoon", note: "THE SPRINT STACK", items: [
      { id: "lunch", t: "The Growth Meal", sub: "Rotate: liver meatballs · oysters · salmon · turkey · beef", gh: "15+ pathways", headline: "15+ growth pathways activated in one meal", tier: 0, cite: "Isidori, Curr Med Res Opin 1981; Larnkjaer, J Nutr 2012", tip: "Batch-cook liver meatballs. Sauerkraut side. Broccoli at every lunch.",
        pumps: [
          { p: "Lysine + Arginine*", n: "up to 700%", d: "The strongest amino acid combination for growth" },
          { p: "GABA (sauerkraut)*", n: "up to 400%", d: "Fermentation produces GABA" },
          { p: "Zinc (oysters)", n: "full week", d: "28.2mg per 3oz" },
        ]},
      { id: "pre", t: "Pre-sprint snack", sub: "1 meatball, 1 egg, a few peanuts — ~60 min before sprints", gh: "primes the sprint", headline: "choline + niacin prime the sprint GH response", tier: 1, cite: "Stokes, J Appl Physiol 2008; Ziegenfuss, JISSN 2008", tip: "Very light — a snack, not a meal." },
      { id: "spr", t: "6 × 30-sec all-out sprints", sub: "MON / WED / FRI — alternate with jumping", gh: "strongest lever", headline: "per sprint in adult studies — nothing in nutrition comes close", tier: 0, cite: "Stokes, J Sports Sci 2002; Nevill, J Appl Physiol 1996", tip: "Tag, races, hill sprints. 2–4 min FULL rest between.",
        pumps: [
          { p: "Sprint GH*", n: "up to 530%", d: "Per 30-second all-out sprint" },
          { p: "With choline*", n: "up to 4,400%", d: "A-GPC raised GH up to 4,400% with exercise" },
        ]},
      { id: "jump", t: "Jumping protocol", sub: "TUE / THU / SAT — alternate with sprints", gh: "+4.3 cm", headline: "in 24 weeks — IGF-1 up, bone density +1.08", tier: 0, feat: true, cite: "Zribi, J Pediatr Endocrinol Metab", tip: "50–100 jumps: jump rope, drop jumps, single-leg hops.",
        pumps: [
          { p: "Height gain", n: "+4.3cm", d: "In 24 weeks vs ~1cm controls" },
          { p: "IGF-1 increase", n: "significant", d: "Growth plate signaling upregulated" },
          { p: "Bone density", n: "+1.08", d: "Femoral neck BMD" },
        ]},
      { id: "stretch", t: "10 min stretching", sub: "Dead hang, cobra, cat stretch — after sprints", gh: "↑ velocity", headline: "exercise + nutrition doubled height velocity", tier: 0, cite: "Chinese ISS RCT; Zribi, J Pediatr Endocrinol Metab", tip: "ALWAYS after sprints or jumping." },
      { id: "pm", t: "Dairy Serving #2", sub: "8–12 oz cold A2 milk + 1 tbsp raw honey · immediately after", gh: "24-hr growth signal", headline: "GH to IGF-1 conversion — still 451% at 24h", tier: 0, sig: true, cite: "Zajac, Biol Sport 2018; Cappon, J Appl Physiol 1994", tip: "Cold milk, raw honey, immediately after stretching.",
        pumps: [
          { p: "GH to IGF-1*", n: "up to 451%", d: "Still 451% above baseline at 24h" },
          { p: "Casein", n: "6–7 hrs", d: "Bridges to Sleep Drink at bedtime" },
        ]},
    ]
  },
  {
    period: "Evening", time: "wind-down hours", note: "Do these in order. By the end, they're drowsy.", items: [
      { id: "din", t: "Dinner", sub: "Bone broth starter · rotated protein · lentils + broccoli · no dairy", gh: "10+ pathways", headline: "glycine lowers core temp + builds growth plate collagen", tier: 0, cite: "Welbourne, Am J Clin Nutr 1995; Kasai, Metabolism 1980", tip: "Mug of bone broth as a starter. Done by 6pm.",
        pumps: [
          { p: "Glycine (broth)*", n: "up to 300%", d: "Growth signal + lowers core temp + builds growth plates" },
          { p: "DIM (broccoli)", n: "plates stay open", d: "Delays growth plate closure" },
        ]},
      { id: "gly", t: "Bovine gelatin jello", sub: "Glycine dessert — gelatin + tart cherry + allulose", gh: "sleep + growth plates", headline: "glycine — GH secretagogue + lowers core temp", tier: 1, cite: "Kawai, Neuropsychopharmacology 2015; Kasai, Metabolism 1980", tip: "Dissolve gelatin in warm tart cherry juice, set in fridge." },
      { id: "nsc", t: "No screens after dinner", sub: "Or Night Shift + blue light glasses", gh: "melatonin trigger", headline: "melatonin at risk — blue light suppresses 90+ min", tier: 1, cite: "Gooley, JCEM 2011" },
      { id: "bath", t: "Warm bath with Epsom salts", sub: "20 min before wind-down", gh: "tonight's growth", headline: "core temp drop after — fastest SWS onset", tier: 1, cite: "Krauchi, Nature 1999; Haghayegh, Sleep Med Rev 2019" },
      { id: "mag", t: "Magnesium glycinate lotion", sub: "Feet and shoulders", gh: "deep sleep amplifier", headline: "GABA receptor activation — deepens slow-wave sleep", tier: 1, cite: "Held, Pharmacopsychiatry 2002; Abbasi, J Res Med Sci 2012" },
      { id: "drink", t: "The Sleep Drink", sub: "4 oz A2 milk + 1 oz tart cherry juice · 60 min before bed", gh: "24-hr growth signal", headline: "the 24-hour cycle completes — GH 451% at 24h", tier: 0, sig: true, cite: "Zajac, Biol Sport 2018; Howatson, Eur J Nutr 2012", tip: "Unsweetened — no honey, no sugar. 100% tart cherry juice only.",
        pumps: [
          { p: "GH at 24h*", n: "up to 451%", d: "Still 451% above baseline" },
          { p: "Melatonin (cherry)*", n: "up to 157%", d: "Highest food melatonin" },
          { p: "Casein overnight", n: "6–7 hrs", d: "Slow-release aminos all night" },
        ]},
    ]
  },
];
