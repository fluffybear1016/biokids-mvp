'use client';

import { useState, useEffect, useRef } from "react";
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';
import { useChildName } from '@/lib/useChildName';
import { getActiveChild } from '@/lib/children';
import { analytics } from '@/lib/analytics';
import InstallButton from '@/components/InstallButton';

const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Your child',
  birth_date: '2017-03-15',
  gender: 'female',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

/*
 * bioKids — Ive Edition v8
 *
 * Design philosophy: Jony Ive
 * - One number, one action, one reason per card
 * - Visual tiers: signature rituals > key levers > utility items
 * - Progress tracking — the day moves
 * - Science lives one tap deeper, never in your face
 * - Extraordinary white space
 * - The content earns trust. The interface earns calm.
 */

// ═══════════════════
// DATA
// ═══════════════════

type Pump = { p: string; n: string; d: string };
type Food = { f: string; d: string };
type DayItem = {
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
type DayPeriod = {
  period: string;
  time: string;
  note?: string;
  items: DayItem[];
};

// ═══════════════════
// CITATION URL MAP
// ═══════════════════
const citeUrls: Record<string, string> = {
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
  "Berk, FASEB J 2006": "https://faseb.onlinelibrary.wiley.com/doi/abs/10.1096/fasebj.20.4.A382-b",
  "Berk, Am J Med Sci 1989": "https://pubmed.ncbi.nlm.nih.gov/2556917/",
  "Brackley, Spine 2004": "https://pubmed.ncbi.nlm.nih.gov/15454714/",
  "Negrini, Spine 2002": "https://pubmed.ncbi.nlm.nih.gov/11805666/",
  "Nachemson, Scand J Rehabil Med 1970": "https://pubmed.ncbi.nlm.nih.gov/4257209/",
  "Reilly, Ergonomics 1984": "https://pubmed.ncbi.nlm.nih.gov/6600017/",
  "Isidori, Curr Med Res Opin 1981": "https://pubmed.ncbi.nlm.nih.gov/6790230/",
  "Larnkjaer, J Nutr 2012": "https://pubmed.ncbi.nlm.nih.gov/23077192/",
  "Kojima, Nature 1999": "https://pubmed.ncbi.nlm.nih.gov/10604470/",
  "Milner, J Sleep Res 2009": "https://pubmed.ncbi.nlm.nih.gov/19645971/",
  "Stokes, J Appl Physiol 2008": "https://pubmed.ncbi.nlm.nih.gov/18187617/",
  "Stokes, J Sports Sci 2002": "https://pubmed.ncbi.nlm.nih.gov/12137178/",
  "Nevill, J Appl Physiol 1996": "https://pubmed.ncbi.nlm.nih.gov/8925817/",
  "Cappon, J Appl Physiol 1994": "https://pubmed.ncbi.nlm.nih.gov/7928875/",
  "Zribi, J Pediatr Endocrinol Metab": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9135997/",
  "PMC9135997": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9135997/",
  "Stutz, Sports Med 2019": "https://pubmed.ncbi.nlm.nih.gov/30374942/",
  "Welbourne, Am J Clin Nutr 1995": "https://pubmed.ncbi.nlm.nih.gov/7733028/",
  "Kasai, Metabolism 1980": "https://pubmed.ncbi.nlm.nih.gov/622050/",
  "Kawai, Neuropsychopharmacology 2015": "https://pubmed.ncbi.nlm.nih.gov/25533534/",
  "Van Cauter, JCEM 1992": "https://pubmed.ncbi.nlm.nih.gov/1592892/",
  "Crispim, J Clin Sleep Med 2011": "https://pubmed.ncbi.nlm.nih.gov/22171206/",
  "Gooley, JCEM 2011": "https://pubmed.ncbi.nlm.nih.gov/21193540/",
  "Figueiro, Neuro Endocrinol Lett 2011": "https://pubmed.ncbi.nlm.nih.gov/21552190/",
  "Krauchi, Nature 1999": "https://pubmed.ncbi.nlm.nih.gov/10485703/",
  "Haghayegh, Sleep Med Rev 2019": "https://pubmed.ncbi.nlm.nih.gov/31102877/",
  "Held, Pharmacopsychiatry 2002": "https://pubmed.ncbi.nlm.nih.gov/12163983/",
  "Abbasi, J Res Med Sci 2012": "https://pubmed.ncbi.nlm.nih.gov/23853635/",
  "Howatson, Eur J Nutr 2012": "https://pubmed.ncbi.nlm.nih.gov/22038497/",
  "Mindell, Sleep 2015": "https://pubmed.ncbi.nlm.nih.gov/25325483/",
  "Mindell, Sleep 2009": "https://pubmed.ncbi.nlm.nih.gov/19480226/",
  "Takahashi, J Clin Invest 1968": "https://pubmed.ncbi.nlm.nih.gov/5675428/",
  "Zajac, Biol Sport 2018": "https://pubmed.ncbi.nlm.nih.gov/30765926/",
  "Quabbe, JCEM 1983": "https://pubmed.ncbi.nlm.nih.gov/6345570/",
  "Milan, Front Nutr 2020": "https://pubmed.ncbi.nlm.nih.gov/33240914/",
  "Zhang, Front Nutr 2024": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11622695/",
  "Morais-Almeida, Wandalsen & Solé, J Pediatr (Rio J) 2019": "https://pubmed.ncbi.nlm.nih.gov/30611649/",
};

const dayData: DayPeriod[] = [
  { period:"Morning", time:"whenever they wake", items:[
    { id:"wake", t:"Same wake time", sub:"±30 min, weekends too", gh:"tonight's growth", headline:"tonight's GH pulses are programmed by this morning's wake time", tier:1, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000", why:"Your child's height-driving hormone pulses tonight are programmed by this morning's wake time. The pituitary releases GH on a circadian schedule set by the suprachiasmatic nucleus. Brandenberger et al. showed normal sleep produces 3× more peak GH than disrupted sleep — the concentrated nocturnal surge is abolished without proper circadian timing. One late Saturday can disrupt pulse timing through Wednesday.", tip:"Same time ±30 min, including weekends. This is the easiest lever and it's free.",
      pumps:[
        { p:"Circadian programming", n:"60–80%", d:"Tonight's GH pulse timing set by today's wake time" },
        { p:"Normal sleep advantage", n:"3×", d:"Normal sleep = 3× more peak GH than disrupted" },
      ]},

    { id:"music-am", t:"Claire de Lune", sub:"Play softly during the morning routine", gh:"cortisol reducer", headline:"slow-tempo classical lowers cortisol — a direct GH suppressor", tier:2, cite:"Thoma, PLoS ONE 2013; Khalfa, Ann N Y Acad Sci 2003", why:"Music at 60–80 BPM synchronizes heart rate and breathing toward calm parasympathetic states. Thoma et al. showed classical music significantly reduced salivary cortisol — and cortisol directly suppresses growth hormone. Playing Claire de Lune or slow Bach during breakfast creates a calm, focused morning that primes the entire GH axis. It also becomes a conditioned routine cue — the brain associates this music with 'morning protocol starting.'", tip:"Start a playlist when they wake. Claire de Lune, Gymnopédie No. 1, Bach Cello Suite No. 1, Debussy Arabesques. Keep it soft — background level. This is the easiest addition to the protocol.",
      pumps:[
        { p:"Cortisol reduction", n:"significant", d:"Classical music reduced salivary cortisol in controlled study" },
        { p:"Parasympathetic activation", n:"HRV increase", d:"60–80 BPM music synchronizes autonomic nervous system toward calm" },
      ]},

    { id:"sun", t:"Sunlight + stretch", sub:"10 minutes outside with a gentle stretch", gh:"melatonin trigger", headline:"melatonin tonight + spinal decompression — two levers in one", tier:1, cite:"Roenneberg, Curr Biol 2007; Forsling, J Pineal Res 1999; Nachemson, Scand J Rehabil Med 1970; Reilly, Ergonomics 1984", why:"Morning light hits melanopsin receptors — synchronizes the suprachiasmatic nucleus — programs melatonin release 14–16 hours from now. Melatonin raised GH up to 157% in adult studies AND inhibits aromatase (the enzyme that closes growth plates). Gravity compresses spinal discs all day — up to 1% of height lost by evening. Dead hang creates pure axial traction that rehydrates discs. Stretching both upper and lower body daily decompresses the spine and allows growth plates to recover. 5–10 minutes is enough — circadian clock + spinal decompression in one.", tip:"Backyard, bus stop walk, porch. Dead hang 3 × 20 sec (thumbs over bar, relax shoulders). Fold over, cobra, cat-cow. Upper and lower body. Overcast still works for light.",
      pumps:[
        { p:"Melatonin timing*", n:"up to 157%", d:"Tonight's melatonin set by this morning's light — raised GH 157% in adults" },
        { p:"Aromatase inhibition", n:"—", d:"Melatonin blocks estrogen — delays growth plate closure" },
        { p:"Vitamin D synthesis", n:"IGF-1 enabler", d:"Deficiency blunts the entire GH — IGF-1 axis" },
        { p:"Spinal decompression", n:"reverses 1%", d:"Dead hang reverses daily gravitational compression" },
      ]},


    { id:"d1", t:"Dairy serving #1 — pick your format", sub:"A glass of cold A2 milk · a yogurt bowl with toppings · a smoothie — same growth levers, whichever fits your morning", gh:"+0.39 cm/yr", headline:"each 8 oz of A2 milk/day = +0.39 cm across childhood", tier:0, cite:"Hoppe, Eur J Clin Nutr 2008; Kang, Nutrients 2019; Milan, Front Nutr 2020; Zhang, Front Nutr 2024; Isidori, Curr Med Res Opin 1981; Quabbe, JCEM 1983; Balmer, J Lipid Res 2002", why:"THREE FORMATS, SAME GROWTH LEVERS\n\nOption A — A glass of cold A2 milk with a drizzle of honey. That's it. The simplest version and it works.\n\nOption B — The yogurt bowl. Sheep yogurt base (or any A2 yogurt), swirl in natural peanut butter, top with berries, pumpkin seeds, hemp hearts, drizzle of raw honey. Let them choose their own toppings — choosing triggers dopamine, which is itself a growth signal.\n\nOption C — The smoothie. Blend A2 milk or yogurt + frozen berries + ½ banana + natural peanut butter + ½ tsp lemon-flavored cod liver oil. The berries mask the CLO completely — they won't taste it. This is the best format for hiding cod liver oil.\n\nAll three formats deliver the same core growth levers. Pick whichever fits your morning. The glass of milk is the minimum. The bowl and smoothie are loaded.\n\nANY A2 MILK WILL DO\n\nAny A2-certified milk works — cow A2, goat, sheep, or buffalo. The key is avoiding A1 beta-casein. If you can get sheep milk, it's the gold standard: the most protein-dense dairy on earth. Up to 3× more total protein than cow milk, 35× more lactoferrin (the protein that directly triggers bone growth), 70% more casein (the slow-release protein that feeds growth overnight), and 5× less of the allergen that causes dairy sensitivity. It's naturally 100% A2 — zero A1. Fermentation into yogurt multiplies the benefits: it produces GABA (a natural growth signal), pre-digests proteins for easier absorption, and generates bioactive peptides.\n\nWHY THESE TOPPINGS?\n\nEvery ingredient earns its place. Peanut butter delivers niacin + arginine — two of the strongest growth-supporting aminos in food science. Pumpkin seeds add zinc (activates the growth axis at all 3 levels) + magnesium (deepens tonight's sleep). Berries add vitamin C that boosts seed iron absorption 2–3× while protecting growth plates. Hemp hearts bring complete protein. The sweetness from honey drives daily compliance — children ask for this bowl instead of resisting it.\n\nBERRY TIP: Buy organic. If conventional: soak 12–15 min in baking soda water (1–2 tsp per quart), rinse — removes 66–98% of surface pesticides.\n\nEASY DAIRY PROTOCOL: One serving at breakfast (this card), one as soon as they get home from school (e.g. 10 oz cold A2 milk). That's your daily dairy covered without overthinking it.\n\nDAILY TARGET: ~20–24 oz A2 milk equivalent across the day. 5 oz sheep yogurt = 8 oz A2 milk, so one bowl gets you nearly halfway.", tip:"Dairy FIRST (within 1 hour of waking), then eggs. GLASS: Cold A2 milk + drizzle of honey. BOWL: Yogurt base → swirl in natural peanut butter → top with berries, pumpkin seeds, hemp hearts → drizzle raw honey or maple. SMOOTHIE: Blend yogurt or A2 milk + frozen berries + ½ banana + natural peanut butter + ½ tsp lemon-flavored cod liver oil.\n\nCAN'T FIND SHEEP YOGURT? That's fine. Use any A2 yogurt, goat yogurt, or regular whole-milk Greek yogurt. Even plain A2 milk with the same toppings works. Sheep is the gold standard — but any whole-fat dairy with these toppings is 90% of the benefit. Don't let the perfect be the enemy of the good.",
      pumps:[
        { p:"Lactoferrin", n:"35× more", d:"Sheep vs cow — directly triggers bone cell growth" },
        { p:"Total protein", n:"3× more", d:"5.5–7.2g vs 2.4–2.8g per 100mL — all A2, zero A1" },
        { p:"Total casein", n:"70% more", d:"Slow-releases aminos 6–7 hours — feeds growth overnight" },
        { p:"BCAAs", n:"62% more", d:"Triggers muscle protein synthesis (RCT, P<0.001)" },
        { p:"Low allergen", n:"5× less", d:"5× less αs1-casein — the primary dairy allergen" },
        { p:"Height per serving", n:"+0.39cm", d:"Per additional 8 oz/day across childhood" },
        { p:"Fermentation → GABA*", n:"up to 400%", d:"Yogurt bacteria produce GABA — a natural growth signal" },
        { p:"Niacin (peanut butter)*", n:"up to 350%", d:"Removes the brake that suppresses growth during the day" },
        { p:"Arginine (PB + seeds)*", n:"up to 700%", d:"One of the strongest growth-supporting aminos in food" },
        { p:"Zinc (pumpkin seeds)", n:"activates 3 levels", d:"Activates the growth axis at pituitary, liver, and growth plate" },
        { p:"Vitamin C (berries)", n:"2–3× iron", d:"Boosts seed iron absorption + protects growth plates" },
        { p:"Retinol + D + Omega-3 (CLO in smoothie)", n:"receptor fuel", d:"Hidden ½ tsp lemon-flavored CLO delivers three growth levers — undetectable in berries" },
      ],
      foods:[
        { f:"Sheep yogurt, 5 oz (base)", d:"= 8 oz A2 milk. 35× more lactoferrin, 70% more casein, 100% A2. Gets you nearly halfway to the daily target." },
        { f:"Natural peanut butter, 1–2 tbsp", d:"Niacin + arginine. No added oils or sugar." },
        { f:"Berries (blueberries, strawberries, raspberries)", d:"Vitamin C + antioxidants. Organic preferred. Frozen = cheaper + thicker smoothie." },
        { f:"Pumpkin seeds, handful", d:"Zinc + arginine + magnesium + tryptophan." },
        { f:"Hemp hearts, 1 tbsp", d:"Complete protein — all essential aminos." },
        { f:"Raw honey or maple drizzle", d:"Sweetness drives daily compliance." },
        { f:"A2 whole milk, 4–8 oz", d:"Casein + whey + calcium. Use as base for smoothie or alternate bowl base. Add more for smoothie texture." },
        { f:"½ banana (smoothie version)", d:"Potassium + natural sweetness. Makes the smoothie creamy." },
        { f:"Lemon-flavored cod liver oil, ½ tsp (smoothie version)", d:"Retinol + vitamin D + omega-3. Completely hidden by berries — you don't even taste it. Skip on beef liver days." },
      ]},

    { id:"bkf", t:"Sunny side up eggs", sub:"2–3 eggs, red bell pepper alongside", gh:"primes the whole day", headline:"choline from eggs primes the entire growth axis for the day", tier:0, cite:"Ziegenfuss, JISSN 2008; Zeisel, Nutr Rev 2009", why:"WHY SUNNY SIDE UP?\n\nEggs are the richest whole-food source of choline — the compound that primes your child's growth axis for the entire day. Choline converts to acetylcholine, which activates the pituitary gland. This restarts the 24-hour growth cycle — here's how it works: yesterday's post-sprint milk converted GH to IGF-1, the Sleep Drink's casein slow-released aminos through the night feeding each GH pulse, and now this morning's choline from eggs reignites the pituitary to start the whole sequence again. Every meal connects to the next. Nothing is random.\n\nSunny side up preserves the most choline, lutein, and B vitamins of any cooking method — the yolk is never flipped, never broken, never overheated.\n\nWHY RED BELL PEPPER?\n\n190mg vitamin C per cup — 3× more than an orange. Placed alongside eggs, it boosts iron absorption 2–3×. No cooking needed, just slice it.\n\nSKIP CEREAL. Always. One bowl spikes insulin and suppresses growth signals for 2–3 hours.", tip:"Sunny side up — never hard-boiled for this meal. Red bell pepper slices alongside. No cheese — calcium competes with egg iron. Skip cereal — always.",
      pumps:[
        { p:"Choline → growth axis", n:"axis primer", d:"Two eggs ≈ 300mg choline — primes pituitary for the entire day" },
        { p:"Choline pathway*", n:"up to 4,400%", d:"A-GPC (choline metabolite) amplified growth signals 4,400% with exercise in adults" },
        { p:"Runny yolk advantage", n:"10–15% more", d:"Sunny side up preserves the most choline, lutein, B vitamins" },
        { p:"Vitamin C (bell pepper)", n:"2–3× iron", d:"190mg per cup — boosts egg iron absorption" },
      ],
      foods:[
        { f:"Pasture-raised eggs, 2–3 sunny side up", d:"Runny yolk = maximum choline. Never flip." },
        { f:"Red bell pepper slices", d:"190mg vitamin C per cup — boosts iron 2–3×." },
      ]},

    { id:"clo", t:"Lemon-flavored cod liver oil", sub:"Tastes good — don't tell them what it is — half a spoon in the smoothie", gh:"receptor fuel", headline:"40–60% of GH receptor function lost without retinol — CLO delivers all three growth levers", tier:0, cite:"Balmer, J Lipid Res 2002; Soliman, Indian J Endocrinol Metab 2014", why:"CLO delivers three growth levers in one spoon. Retinol is required for GH receptor gene expression — deficiency cuts binding 40–60%. Vitamin D deficiency blunts GH — IGF-1 — growth plate pathway. Omega-3s are anti-inflammatory at the growth plate.", tip:"Best hidden in the smoothie — lemon-flavored CLO disappears in berries, they won't taste it. Or straight off the spoon — the lemon flavor makes it palatable. Skip on liver days.",
      pumps:[
        { p:"Retinol — GH receptors", n:"40–60%", d:"Deficiency reduces GH receptor binding" },
        { p:"Vitamin D — IGF-1", n:"axis enabler", d:"Deficiency blunts IGF-1 production" },
        { p:"Omega-3s", n:"anti-inflammatory", d:"Reduces inflammation at growth plate" },
      ]},


    { id:"cit", t:"Red bell pepper with every iron meal", sub:"The single best source of vitamin C — never fruit with protein", gh:"2–3× iron", headline:"iron absorption — iron delivers oxygen to growing tissues", tier:0, cite:"Hallberg, Am J Clin Nutr 1989; Chinese ISS RCT", why:"Vitamin C boosts iron absorption 2–3× — critical for oxygen delivery to growth plate chondrocytes. Use high-vitamin-C VEGETABLES (bell peppers, broccoli, Brussels sprouts, cauliflower) alongside protein — never citrus or fruit. Pair with beef, liver, lentils, eggs. Never serve milk alongside iron meals.", tip:"Red bell pepper or broccoli alongside iron meals. Never dairy with iron. Never citrus or fruit with protein.",
      pumps:[
        { p:"Iron absorption", n:"2–3×", d:"Vitamin C dramatically increases iron uptake" },
        { p:"Inositol", n:"ISS RCT", d:"Part of lysine-inositol-B12 growth combo" },
      ],
      foods:[
        { f:"1. Red bell peppers", d:"190mg per cup — the single best source. Slice and serve alongside any iron meal." },
        { f:"2. Broccoli", d:"81mg per cup — also delivers DIM for aromatase inhibition. Steam or roast." },
        { f:"3. Brussels sprouts", d:"75mg per cup — roast with olive oil. Double duty: vitamin C + DIM." },
        { f:"4. Cauliflower", d:"52mg per cup — mild flavor kids accept easily." },
        { f:"5. Cabbage (cooked)", d:"37mg per cup — in stir fry, stew, or alongside meatballs." },
      ]},

    { id:"ns", t:"No refined sugar", sub:"Milk, fruit, honey are fine — no cereal, no juice boxes, no artificial sweeteners, ever", gh:"protects overnight growth", headline:"one cereal bowl suppresses growth hormone up to 80%", tier:1, cite:"Lanzi, Metabolism 1999; Hartman, JCEM 1992", why:"This means refined and added sugar — cereal, juice, candy, flavored yogurts. Natural sugars in whole milk, fruit, and raw honey are completely fine and are part of the protocol. Every sugar spike suppresses growth hormone for 2–3 hours. Ghrelin (hunger hormone) directly triggers GH — snacking keeps it suppressed. Artificial sweeteners disrupt gut bacteria responsible for GABA production (400% GH).", tip:"Eggs, dairy, fruit, meat for breakfast — all fine. The sugars to avoid are added/refined: cereal, juice boxes, candy. Never artificial sweeteners.",
      pumps:[
        { p:"Fasting GH", n:"300–500%", d:"Overnight fast produces 60–80% of daily GH" },
        { p:"Insulin avoided", n:"up to 80%", d:"One sugar spike blocks GH for 2–3 hours" },
        { p:"Ghrelin", n:"secretagogue", d:"Hunger directly triggers GH" },
        { p:"Microbiome integrity", n:"GABA protected", d:"No sweeteners — gut bacteria keep producing GABA" },
      ]},

    { id:"joy", t:"Laughter and play", sub:"Start the day light", gh:"stress ↓ cortisol ↓", headline:"laughter alone raised growth hormone 87% — cortisol down 39%", tier:0, cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989", why:"In adult studies, merely anticipating a funny experience raised GH 87%, β-endorphins 27%, and reduced cortisol 39%. Chronic stress suppresses GH. Joy is not a bonus — it's a growth lever.", tip:"Morning dance party. Let them be silly. Joy is not a bonus — it's a growth lever.",
      pumps:[
        { p:"Anticipation of fun*", n:"up to 87%", d:"Anticipating humor raised GH 87% in adult study" },
        { p:"Cortisol reduction*", n:"↓39%", d:"Less cortisol = less GH suppression (adult study)" },
        { p:"β-endorphins*", n:"+27%", d:"Endorphins support hormonal environment (adult study)" },
      ]},

    { id:"bp", t:"Weigh the backpack", sub:"Under 10–15% of body weight — heavy loads compress the developing spine", gh:"—", headline:"heavy backpacks compress the developing spine — keep it under 10–15% of body weight", tier:3, cite:"Brackley, Spine 2004; Negrini, Spine 2002", why:"Chronic heavy loads affect intervertebral disc height during the years when the spine should be lengthening. Combined with daily gravitational compression, an overweight backpack amplifies the problem.", tip:"Weigh it. Remove what they don't need. A rolling backpack eliminates the issue." },

  ]},

  { period:"Afternoon", time:"around lunch through late afternoon", note:"THE SPRINT STACK — the most powerful combination in the protocol. Pre-sprint snack → all-out sprints → cold milk with honey. Your child already sprints at practice and with friends — this turns every sprint into a growth event.", items:[
    { id:"lunch", t:"Rotated protein + vegetables + ferments", sub:"A different protein every day, a heap of cooked vegetables, a fermented side — this is lunch", gh:"15+ pathways", headline:"15+ growth pathways activated in one meal — primes the afternoon sprint", tier:0, cite:"Isidori, Curr Med Res Opin 1981; Larnkjaer, J Nutr 2012; Quabbe, JCEM 1983", why:"WHY ROTATION?\n\nNo single protein does everything. Rotating daily means your child hits all growth pathways across the week without you overthinking any single meal.\n\nTHE PROTEIN ROTATION:\n\nLiver meatballs 2–3×/wk — Mix 2 tbsp beef or chicken liver into ground beef, form meatballs. Kids won't taste it. Chicken liver is cheaper and packs nearly the same punch — highest choline density of any food, plus retinol, B12, niacin, iron, zinc. Beef liver is the gold standard but chicken liver is excellent and more affordable. Batch-cook and freeze.\n\nWild salmon 2×/wk — Omega-3s support IGF-1 production. Vitamin D enables the entire growth plate pathway.\n\nTurkey breast — Highest niacin + arginine per gram of any common meat.\n\nBeef (any cut) — Richest source of glutamine + ornithine + tyrosine.\n\nOysters 1×/wk — 28.2mg zinc in 3 oz — a full week's supply in one serving. Pan-seared or in stew.\n\nTHE VEGETABLES:\n\nLoad the plate. Broccoli (contains DIM — delays growth plate closure), spinach (iron + magnesium + folate), red bell pepper (190mg vitamin C — boosts iron 2–3×), Brussels sprouts, cauliflower, carrots, cabbage, sweet potatoes. Rotate daily — every color delivers different micronutrients. Variety matters more than perfection.\n\nTHE FERMENTS:\n\nSauerkraut, kimchi, pickled vegetables — even 2 tbsp counts. Fermentation produces GABA, a natural growth signal that also suppresses the hormone that brakes growth. Keep a jar in the fridge, serve a forkful alongside anything.\n\nLENTILS + RED BELL PEPPER: The lysine-inositol-B12 combination from a clinical growth trial. Bell pepper vitamin C alongside boosts iron 2–3×.\n\nNO DAIRY at this meal — save milk for post-sprint.", tip:"Batch-cook liver meatballs (beef or chicken liver — both work) and feed throughout the week. Sauerkraut or kimchi as a side — even 2 tbsp counts. Pumpkin seeds on top of anything. Load the plate with cooked vegetables — variety matters more than perfection. High-vitamin-C vegetables (bell pepper, broccoli) alongside iron foods — never citrus or fruit with protein. NO DAIRY here.\n\nNOT DOING LIVER YET? That's OK. Regular beef meatballs + lentils + broccoli + pumpkin seeds still hit 10+ pathways. Liver is the top tier — but a plate of real protein + real vegetables + seeds + a fermented side is already miles ahead of most kids' lunches. Start where you are and add liver when you're ready.",
      pumps:[
        { p:"Lysine + Arginine*", n:"up to 700%", d:"The strongest amino acid combination for growth — in beef, turkey, lentils, seeds" },
        { p:"Glutamine (beef)*", n:"up to 400%", d:"Beef is the richest dietary source of this growth-supporting amino" },
        { p:"GABA (sauerkraut)*", n:"up to 400%", d:"Fermentation produces GABA — a natural growth signal" },
        { p:"Niacin (turkey)*", n:"up to 350%", d:"Removes the molecular brake on growth — turkey has the most per gram" },
        { p:"Zinc (oysters)", n:"full week", d:"28.2mg per 3 oz — activates growth axis at all 3 levels" },
        { p:"Omega-3 (salmon)", n:"IGF-1 + vit D", d:"Supports IGF-1 production + enables growth plate pathway" },
        { p:"Choline (liver)*", n:"up to 4,400%", d:"Primes the growth axis for the entire day" },
        { p:"DIM (broccoli)", n:"plates stay open", d:"Delays growth plate closure" },
        { p:"Arginine (seeds)", n:"+0.33cm/yr", d:"Copenhagen study: +0.33cm/yr in children" },
        { p:"Iron (liver + beef)", n:"growth enabler", d:"Oxygen delivery to growing tissues" },
      ],
      foods:[
        { f:"Liver meatballs 2–3×/wk (beef or chicken liver)", d:"2 tbsp liver mixed into ground beef. Chicken liver is cheaper, nearly the same nutrients. Batch-cook and freeze. Kids won't taste it." },
        { f:"Wild salmon 2×/wk", d:"Omega-3s + vitamin D + niacin. Any preparation." },
        { f:"Cooked oysters 1×/wk", d:"Full week's zinc in one serving. Pan-seared or in stew." },
        { f:"Turkey breast", d:"Highest niacin + arginine per gram of any common meat." },
        { f:"Beef (any cut)", d:"Richest source of glutamine + ornithine + tyrosine." },
        { f:"Lentils + red bell pepper", d:"Growth combo from clinical trial. Bell pepper vitamin C boosts iron 2–3×." },
        { f:"Sauerkraut, kimchi, or pickled vegetables", d:"Even 2 tbsp counts. Fermentation produces GABA — a natural growth signal. Keep a jar in the fridge." },
        { f:"Broccoli", d:"DIM — keeps growth plates open longer. Also delivers vitamin C." },
        { f:"Spinach (cooked)", d:"Iron + magnesium + folate + vitamin K. Cook to reduce oxalates." },
        { f:"Brussels sprouts, cauliflower, cabbage, sweet potatoes, carrots", d:"Rotate daily. Every color delivers different micronutrients. Variety matters more than any single vegetable." },
        { f:"Pumpkin seeds", d:"Zinc + arginine + magnesium (+0.33cm/yr). Sprinkle on anything." },
      ]},

    { id:"water", t:"Sparkling water, splash of pomegranate, ice", sub:"The soda replacement — no juice boxes, no soda, no sweeteners", gh:"protects growth window", headline:"protected — each sugar spike suppresses up to 80%", tier:2, cite:"Lanzi, Metabolism 1999; Kojima, Nature 1999", why:"Every juice box triggers an insulin spike that shuts down GH for 2–3 hours. Allow 3–4 hour gaps — ghrelin directly triggers GH. Artificial sweeteners disrupt GABA-producing gut bacteria.", tip:"For a soda replacement: sparkling water with ice + a small splash of real juice (pomegranate, orange, tart cherry). Gives the fizzy flavor pop without the sugar load. Otherwise water or milk between meals.",
      pumps:[
        { p:"Insulin avoided", n:"up to 80%", d:"Each sugar spike blocks GH 2–3 hours" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Meal gaps let ghrelin trigger GH" },
        { p:"Microbiome", n:"GABA protected", d:"No sweeteners — bacteria keep producing GABA" },
        { p:"Healthy body composition", n:"sustained GH", d:"Less sugar — less visceral fat — higher baseline GH" },
      ]},

    { id:"nap", t:"No naps after 2 pm", sub:"Late naps steal tonight's biggest growth hormone pulse", gh:"tonight's growth", headline:"late naps steal tonight's biggest growth hormone pulse", tier:2, cite:"Milner, J Sleep Res 2009; Brandenberger, Lancet 2000", why:"Naps after 3pm steal adenosine sleep pressure needed for deep slow-wave sleep. The first SWS cycle — the one most disrupted by late naps — contains the single largest GH pulse of the day.", tip:"If they truly need a nap, before 2pm and under 30 minutes." },

    { id:"pre", t:"One meatball, one egg, a spoon of peanut butter", sub:"60 minutes before sprints — very light, not a meal", gh:"primes the sprint", headline:"choline + niacin prime the sprint GH response", tier:1, cite:"Stokes, J Appl Physiol 2008; Ziegenfuss, JISSN 2008; Quabbe, JCEM 1983", why:"This should be very light — a snack, not a meal. About 60 minutes before sprints, serve 1 beef liver meatball (2 tbsp liver mixed into ground beef — batch-cook and keep in fridge), 1 sunny side up egg, and a spoonful of natural peanut butter. The meatball loads the A-GPC choline pathway. The egg adds a second choline wave. Natural peanut butter delivers niacin — which blocks free fatty acids, a molecular brake on GH. Stokes (2008): niacin amplified second sprint GH to ~23.3 μg/L vs ~5.2 controls (~350% greater peak, ~422% greater AUC) in adult athletes. Keep it light so blood flow goes to muscles, not digestion. Natural peanut butter only — no added oils, no sugar (not Skippy, not Jif).", tip:"1 beef liver meatball + 1 sunny side up egg + a spoonful of natural peanut butter, ~60 min before sprints. That's it — very light. No dairy with liver — iron. Save milk for post-sprint. Do NOT take cod liver oil on beef liver days.",
      pumps:[
        { p:"Meatball choline*", n:"up to 4,400%", d:"1 beef liver meatball ~60 min before — loads A-GPC pathway for peak GH amplification" },
        { p:"Egg choline (2nd wave)*", n:"up to 4,400%", d:"A-GPC (choline metabolite) raised GH up to 4,400% with exercise in adults" },
        { p:"Niacin (peanut butter)*", n:"up to 350%", d:"Stokes: niacin + sprint → 350% greater GH peak; Quabbe: niacin alone → >1,000% GH in adults" },
        { p:"Liver niacin*", n:"up to 350%", d:"Beef liver also high in niacin — double-primes the sprint with peanut butter" },
        { p:"Arginine", n:"GH support", d:"Natural peanut butter delivers arginine — direct GH secretagogue" },
        { p:"Glutamine (egg)*", n:"up to 400%", d:"Glutamine raised GH 4-fold in adult supplement study" },
        { p:"Retinol (liver)", n:"GH receptor", d:"Preformed vitamin A — essential for GH receptor expression" },
      ]},

    { id:"spr", t:"Six 30-second sprints", sub:"All out, full rest between — alternate days with jumping", gh:"strongest lever", headline:"the single strongest growth lever — nothing in nutrition comes close", tier:0, cite:"Stokes, J Sports Sci 2002; Nevill, J Appl Physiol 1996", why:"In adult studies, a single 30-second sprint produced a 530% GH spike. Even 6 seconds = 217%. The trigger is lactate — only at true maximum effort. With pre-sprint choline + niacin, every sprint is maximized. ROTATION: Sprint days and jump days alternate — never do both on the same day. Example: Mon/Wed/Fri sprints, Tue/Thu/Sat jumps. Recovery between sessions is when growth happens.", tip:"Tag, races, hill sprints — as long as it's genuinely all-out. Hill sprints produce higher lactate. 2–4 min FULL rest between sprints. Sprint days: Mon / Wed / Fri. Jump days: Tue / Thu / Sat. Sunday: rest.",
      pumps:[
        { p:"Sprint GH*", n:"up to 530%", d:"Per 30-second all-out sprint in adult studies" },
        { p:"With choline*", n:"up to 4,400%", d:"A-GPC (choline pathway) raised GH up to 4,400% with exercise in adults" },
        { p:"With niacin*", n:"up to 350%", d:"Stokes: niacin + sprint → 350% GH amplification; Quabbe: niacin alone → >1,000% GH in adults" },
        { p:"Mechanical loading", n:"growth plates", d:"Direct growth plate stimulation" },
        { p:"6-sec sprint*", n:"up to 217%", d:"Even a 6-second sprint raised GH 217% in adult study" },
        { p:"Healthy body composition", n:"sustained GH", d:"Sprint training maintains lean body comp" },
      ]},

    { id:"jump", t:"50 jumps", sub:"Alternate days with sprints — never both on the same day", gh:"+4.3 cm", headline:"+4.3 cm in 24 weeks — IGF-1 up, bone density +1.08", tier:0, feat:true, cite:"Zribi, J Pediatr Endocrinol Metab; PMC9135997", why:"24-week study of short-stature children: +4.32 cm vs 0.93–1.84 cm in controls. IGF-1 increased. Femoral neck BMD +1.08 (Cohen's d ≈ 0.87). Zero injuries. Preschool study (ages 3–6): height gain exceeded national averages. ROTATION: Jump days and sprint days alternate — never do both on the same day. Example: Tue/Thu/Sat jumps, Mon/Wed/Fri sprints. Recovery between sessions is when growth happens.", tip:"50–100 jumps: jump rope, drop jumps from 20–40cm platforms, single-leg hops. HR target: 128–155 bpm. Jump days: Tue / Thu / Sat. Sprint days: Mon / Wed / Fri. Sunday: rest. Always followed by stretching.",
      pumps:[
        { p:"Height gain", n:"+4.3cm", d:"In 24 weeks vs ~1cm controls" },
        { p:"IGF-1 increase", n:"significant", d:"Growth plate signaling upregulated" },
        { p:"Bone density", n:"+1.08", d:"Femoral neck BMD. Persists years." },
        { p:"Cortisol ↓", n:"39%", d:"Fun play lowers cortisol" },
      ]},

    { id:"stretch", t:"Stretch", sub:"After every sprint or jump session — this is when they grow", gh:"↑ velocity", headline:"exercise + nutrition doubled height velocity in a 12-month clinical trial", tier:0, cite:"Chinese ISS RCT (12-month); Zribi, J Pediatr Endocrinol Metab", why:"12-month RCT in short-stature children: moderate stretching + lysine-inositol-B12 produced significantly greater height velocity than supplementation alone. More days/week = better. Excessive minutes/day = counterproductive. Stretching decompresses the spine and allows growth plates to recover.", tip:"ALWAYS after sprints or jumping. Dead hang 30+ sec × 3. Cobra pose. Cat-cow. Forward fold. This is when their body grows — during recovery.",
      pumps:[
        { p:"Stretch + nutrition synergy", n:"↑ velocity", d:"Combo beats nutrition alone" },
        { p:"GH elevation", n:"significant", d:"Higher GH markers at 12 months" },
        { p:"Spinal decompression", n:"reverses 1%", d:"Dead hang reverses daily compression" },
      ]},

    { id:"pm", t:"Cold A2 milk, one spoon of honey", sub:"Dairy serving #2 — within 30 minutes of activity · easy protocol: one dairy at breakfast, one when they get home", gh:"24-hr growth signal", headline:"GH to IGF-1 conversion — still 451% above baseline at 24h in adult study", tier:0, sig:true, cite:"Zajac, Biol Sport 2018; Cappon, J Appl Physiol 1994", why:"Without milk after sprints, the GH spike is 'orphaned' — present but not converted to IGF-1 (the actual growth signal). Whey provides immediate aminos. Raw honey's gentle insulin activates the STAT5 pathway, converting GH to IGF-1. Casein slow-releases for hours, bridging to the Sleep Drink. Counts toward the daily 20–24 oz A2 milk target.", tip:"Cold milk, raw honey, immediately after stretching. This is a DAIRY window. Non-sprint days: same drink after school.",
      pumps:[
        { p:"GH to IGF-1*", n:"up to 451%", d:"Zajac: still 451% above baseline at 24h in adult athletes" },
        { p:"IGF-1*", n:"+14%", d:"14% higher than controls at 24h in adult study" },
        { p:"Casein", n:"6–7 hrs", d:"Bridges to Sleep Drink at bedtime" },
        { p:"α-Lactalbumin*", n:"up to 157%", d:"Tryptophan — melatonin — raised GH 157% in adults" },
        { p:"Lysine + Arginine*", n:"up to 700%", d:"Milk delivers both — raised GH up to 700% in adult supplement studies" },
      ]},
  ]},

  { period:"Late Afternoon", time:"after school", items:[
    { id:"rest", t:"Outside as much as possible", sub:"Sunlight + movement + friends — three growth levers at once", gh:"stress ↓ cortisol ↓", headline:"outdoor play combines sunlight + movement + cortisol reduction — three GH levers at once", tier:1, cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989; Li, Environ Health Prev Med 2010", why:"Unstructured outdoor play is growth time — three independent levers at once. (1) Continued sunlight exposure supports vitamin D synthesis and circadian rhythm. (2) Movement and play — jumping, climbing, running — are natural GH triggers. (3) Nature exposure measurably reduces cortisol within 20 minutes, and cortisol is a direct GH suppressor. In adult studies, anticipation of fun raised GH 87% and reduced cortisol 39%. Get them outside as much as humanly possible.", tip:"No homework pressure right after school. Play outside first, eat, then homework. Backyard, park, bike ride, climbing, anything outside. The more time outdoors the better. No competitive sports in the evening." },
  ]},

  { period:"Evening", time:"wind-down hours", note:"Do these in order. By the end, they're drowsy.", items:[
    { id:"junk", t:"Had junk food today? No guilt — just a reset", sub:"A recovery smoothie with broccoli sprouts helps move it through fast", gh:"recovery mode", headline:"a broccoli sprout smoothie helps clear processed food faster", tier:1, cite:"Fahey, Nutr Cancer 2012; Dahl, Nutrients 2017; Bahadoran, J Funct Foods 2011", why:"LIFE HAPPENS.\n\nBirthday parties. Sleepovers. Team pizza after the game. A bag of chips at a friend's house. This is childhood — and none of it erases what you've been building.\n\nThe science is clear: consistency over weeks matters infinitely more than perfection on any single day. One pizza night doesn't undo a week of good inputs. Your child's body is resilient.\n\nBUT YOU CAN HELP THEIR BODY RECOVER FASTER.\n\nProcessed food sits heavier — refined carbs, seed oils, and additives slow digestion and create mild inflammation that can blunt overnight growth signals. A recovery smoothie packed with fiber and sulforaphane helps in two ways: (1) fiber physically moves processed food through the gut faster, and (2) broccoli sprouts activate your child's natural detox enzymes (Phase 2), clearing inflammatory byproducts that would otherwise suppress tonight's growth hormone.\n\nTHE RECOVERY SMOOTHIE:\n\nBlend: A2 milk or kefir + frozen berries + 1 small handful broccoli sprouts (or ½ tsp broccoli sprout powder) + ½ banana. The berries completely mask the sprouts — they won't taste them.\n\nBroccoli sprouts contain 20–100× more sulforaphane than mature broccoli. Sulforaphane is the most potent natural activator of Nrf2 — your body's master detox switch. Even a small handful after junk food meaningfully accelerates clearance.\n\nTHEN JUST CONTINUE THE PROTOCOL.\n\nDo the Sleep Drink. Do the routine. Sleep in the dark. Tomorrow, start fresh with the Growth Bowl. That's it. No guilt needed — you're already doing more than 99% of parents.",
      tip:"THE RECOVERY SMOOTHIE — after pizza, junk food, or processed snacks: Blend A2 milk + frozen berries + small handful of broccoli sprouts (or ½ tsp powder) + ½ banana. Berries mask the sprouts completely. Then continue the evening routine normally. No guilt — consistency over weeks is what matters.",
      pumps:[
        { p:"Sulforaphane (sprouts)", n:"Nrf2 activation", d:"20–100× more than mature broccoli. Activates Phase 2 detox enzymes." },
        { p:"Gut transit speed", n:"fiber + bulk", d:"Banana prebiotic fiber + berry fiber moves processed food through faster." },
        { p:"Inflammation reduction", n:"berries + sprouts", d:"Anthocyanins + sulforaphane lower IL-6 and TNF-alpha." },
      ],
      foods:[
        { f:"Broccoli sprouts (small handful or ½ tsp powder)", d:"20–100× more sulforaphane than broccoli. The most potent natural detox activator." },
        { f:"Frozen berries", d:"Mask the sprout taste + anthocyanins reduce inflammation from processed food." },
        { f:"A2 milk or kefir (base)", d:"Protein + probiotics. Counts toward daily dairy target." },
        { f:"½ banana", d:"Creaminess + potassium + prebiotic fiber." },
      ]},

    { id:"nox", t:"No exercise within 2 hours of bed", sub:"Core temp must drop for deep sleep — late activity delays it", gh:"tonight's growth", headline:"late exercise raises core temp and delays sleep onset — skip it after dinner", tier:2, cite:"Stutz, Sports Med 2019; Brandenberger, Lancet 2000", why:"Core body temp must drop 1–1.5°C to initiate deep sleep. Vigorous exercise within 2 hours of bed raises it, delaying sleep onset and compressing the SWS window.", tip:"Save all sports for afternoon. No competitive evening games." },

    { id:"din", t:"Dinner rotation", sub:"Rotated protein + lentils + cooked vegetables — no dairy here, save it for bedtime", gh:"10+ pathways", headline:"glycine + glutamine + DIM + iron — 10+ growth pathways in one sitting", tier:0, cite:"Welbourne, Am J Clin Nutr 1995; Kasai, Metabolism 1980", why:"THE DINNER ROTATION\n\nDinner is simple: pick a protein, add lentils, load up on cooked vegetables, and include a fermented side. Rotate the protein nightly so you hit every growth pathway across the week.\n\nBone broth is the richest food source of glycine — an amino acid that does three things at once: (1) directly signals growth, (2) lowers core body temperature to trigger deeper sleep, and (3) is the primary building block of growth plate cartilage. If you have time, a mug of broth as a dinner starter is one of the highest-leverage habits in the protocol. Store-bought is completely fine.\n\nDON'T HAVE TIME FOR BONE BROTH? That's OK — stir a tablespoon of bovine gelatin powder into anything warm (soup, stew, warm milk). It's tasteless and delivers the same glycine. Or skip it tonight and make gelatin gummies for dessert instead (see next card). Any dinner with rotated protein + cooked vegetables + lentils is already hitting most of the pathways.\n\nWHY NO DAIRY AT DINNER?\n\nCalcium competes with iron absorption. The meats and lentils at dinner deliver iron — you want maximum absorption. Save all milk for the Sleep Drink at bedtime.\n\nFinish dinner 2–3 hours before bed so the fasting window can begin.", tip:"Rotate proteins nightly: beef, chicken, turkey, salmon, oysters. Lentils in soup, stew, or as a side with bell pepper alongside. Load the plate with cooked vegetables — spinach, broccoli, carrots, Brussels sprouts, whatever you have. Sauerkraut or kimchi on the side. No raw salads at dinner (harder to digest before sleep). NO DAIRY at dinner.",
      pumps:[
        { p:"Glycine (broth/gelatin)*", n:"up to 300%", d:"Growth signal + lowers core temp for sleep + builds growth plates" },
        { p:"Glutamine (beef)*", n:"up to 400%", d:"Beef is the richest dietary source" },
        { p:"DIM (broccoli)", n:"plates stay open", d:"Delays growth plate closure" },
        { p:"Iron (beef + lentils)", n:"growth enabler", d:"Oxygen delivery to growing tissues" },
        { p:"Plant protein (lentils)", n:"longer growth window", d:"Associated with later puberty" },
        { p:"GABA (ferments)*", n:"up to 400%", d:"Sauerkraut/kimchi produce GABA — a natural growth signal" },
      ],
      foods:[
        { f:"Bone broth (starter) or bovine gelatin powder", d:"Richest glycine source. Broth if you have time, or stir a tbsp of gelatin into anything warm — it's tasteless." },
        { f:"Beef, chicken, turkey, salmon — rotate nightly", d:"All deliver key growth-supporting aminos. Variety across the week hits every pathway." },
        { f:"Oysters 1×/wk", d:"Full week's zinc in one serving." },
        { f:"Lentils + red bell pepper", d:"Iron + lysine + inositol. Bell pepper vitamin C boosts absorption 2–3×." },
        { f:"Broccoli, spinach, Brussels sprouts, carrots, cauliflower", d:"Cooked, not raw. Variety delivers broad micronutrient coverage." },
        { f:"Sauerkraut, kimchi, or pickled vegetables", d:"Even 2 tbsp counts. GABA production + gut health." },
      ]},

    { id:"gly", t:"Daily gelatin — pick your format", sub:"Bone broth, jello, gummies, or homemade ice cream — tasteless and builds growth plates", gh:"sleep + growth plates", headline:"glycine — GH secretagogue + lowers core temp + growth plate collagen", tier:1, cite:"Kawai, Neuropsychopharmacology 2015; Kasai, Metabolism 1980", why:"BOVINE GELATIN IS THE KEY\n\nBovine gelatin is pure collagen — the richest source of glycine available. Glycine: (1) lowers core temp via NMDA receptors — triggers sleep onset, (2) a direct GH secretagogue (raised GH up to 300% in adult studies), (3) most abundant amino acid in collagen — the structural protein of growth plates. It should be consumed daily. The powder is completely tasteless — you can add it to anything.\n\nPICK YOUR FORMAT:\n\nOption A — Gelatin jello: Dissolve bovine gelatin in warm tart cherry juice, add allulose or monk fruit, set in fridge. Kids think it's regular jello. Tart cherry delivers melatonin (the highest food source) plus aromatase inhibition.\n\nOption B — Gelatin gummies: Same recipe, use silicone molds. Fun shapes, portable.\n\nOption C — Homemade ice cream: A2 cream + egg yolks + monk fruit + gelatin. Casein slow-releases aminos overnight. Counts toward daily dairy.\n\nOption D — Stir into a smoothie: A tablespoon dissolved in any warm liquid, then blended in. Completely undetectable.\n\nOption E — Stir into bone broth, warm milk, or soup: Simplest method. Same glycine delivery.\n\nWe recommend Perfect Supplements Bovine Gelatin — grass-fed, no additives, dissolves easily.", tip:"Daily. Pick whichever format your kids will actually eat. The jello and gummies are kid favorites. The smoothie method is the easiest for busy parents. Gelatin powder has no taste — mix into anything warm.",
      pumps:[
        { p:"Glycine — GH*", n:"up to 300%", d:"Glycine raised GH up to 300% in adult studies" },
        { p:"Sleep onset", n:"core temp ↓", d:"Lowers body temp — initiates deep sleep" },
        { p:"Growth plate collagen", n:"structural", d:"Glycine + hydroxyproline + proline" },
        { p:"Melatonin (tart cherry jello)", n:"sleep + GH", d:"Tart cherry = highest food melatonin source" },
      ]},

    { id:"nse", t:"Evening snacks + desserts", sub:"Pistachios, pumpkin seeds, gelatin gummies, homemade ice cream, peanut butter — no refined sugar", gh:"protects overnight growth", headline:"overnight GH protected — each spike blocks up to 80%", tier:1, cite:"Lanzi, Metabolism 1999; Van Cauter, JCEM 1992", why:"60–80% of GH is released overnight. Refined sugar is the enemy — one scoop of regular ice cream suppresses up to 80% via insulin. These snacks and desserts deliver growth-supporting nutrients without the insulin spike.\n\nRaw honey and natural sugars in fruit are fine in small amounts. Monk fruit and allulose don't spike insulin at all.\n\nPistachios have the highest melatonin per gram of any nut — the perfect evening snack. Pumpkin seeds deliver arginine + zinc + magnesium + tryptophan. Homemade ice cream (A2 cream + egg yolks + monk fruit + gelatin) counts toward daily dairy AND delivers glycine. Gelatin gummies (see previous card) are a growth-plate-building dessert kids ask for.", tip:"These replace store-bought snacks with refined sugar. Pistachios are the go-to evening nut. Pumpkin seeds on anything. Homemade gummies and ice cream are kid favorites. Raw honey and fruit are fine. Natural peanut butter on apple slices or celery.",
      pumps:[
        { p:"Overnight GH protected", n:"300–500%", d:"No refined sugar = no insulin suppression" },
        { p:"Glycine (gummies/ice cream)", n:"up to 300%", d:"Gelatin delivers glycine — GH secretagogue + sleep + growth plates" },
        { p:"Melatonin (pistachios)", n:"sleep + GH", d:"Highest melatonin per gram — best evening nut" },
        { p:"Melatonin (gummies)", n:"sleep + GH", d:"Tart cherry = highest food melatonin source" },
        { p:"Casein (ice cream)", n:"slow-release", d:"A2 cream base — slow amino delivery overnight. Counts toward daily dairy" },
        { p:"Arginine (PB + seeds)", n:"GH support", d:"Natural peanut butter + pumpkin seeds deliver arginine + zinc + magnesium" },
      ],
      foods:[
        { f:"Pistachios", d:"Highest melatonin per gram of any nut. Best evening snack." },
        { f:"Pumpkin seeds", d:"Arginine + magnesium + zinc + tryptophan." },
        { f:"Gelatin gummies (gelatin + tart cherry + allulose)", d:"Glycine (GH secretagogue) + melatonin (sleep + aromatase inhibition). Set in fridge." },
        { f:"Homemade ice cream (A2 cream + egg yolks + monk fruit + gelatin)", d:"Casein + choline + glycine. Counts toward daily dairy." },
        { f:"Natural peanut butter (not Skippy, not Jif)", d:"Niacin + arginine + magnesium. On apple slices, celery, or by the spoon." },
        { f:"Dark chocolate (85%+ cacao, small square)", d:"Magnesium + antioxidants. Minimal sugar at this percentage." },
        { f:"Frozen berries with A2 cream", d:"Vitamin C + casein. A simple dessert that delivers growth levers." },
      ]},

    { id:"nlf", t:"Kitchen closes 2–3 hours before bed", sub:"Insulin must clear for tonight's growth surge", gh:"protects overnight growth", headline:"overnight fast = when 60–80% of GH is produced", tier:2, cite:"Crispim, J Clin Sleep Med 2011; Hartman, JCEM 1992", why:"The overnight fast is when GH peaks. Eating close to bed keeps insulin elevated and disrupts sleep architecture. Exception: Sleep Drink (~55 calories) is too small to suppress.", tip:"Aim for 2–3 hours between last food and bedtime. The exact time depends on your family's schedule.",
      pumps:[
        { p:"Fasting GH", n:"300–500%", d:"Overnight fast produces 60–80% of daily GH" },
        { p:"Insulin cleared", n:"up to 80%", d:"Insulin must clear for GH to fire" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Meal gaps let ghrelin trigger GH" },
      ]},

    { id:"nsc", t:"Screens off after dinner", sub:"Every minute of blue light steals from tonight's growth surge", gh:"melatonin trigger", headline:"melatonin at risk — blue light suppresses 90+ min", tier:1, cite:"Gooley, JCEM 2011; Figueiro, Neuro Endocrinol Lett 2011", why:"Blue light suppresses melatonin for 90+ minutes. Melatonin raised GH up to 157% in adult studies + provides aromatase inhibition. Every minute of screen time after dinner steals from tonight's GH surge.", tip:"TV better than tablets — distance matters. If unavoidable: Night Shift + blue light glasses.",
      pumps:[
        { p:"Melatonin — GH*", n:"up to 157%", d:"Blue light suppresses melatonin — raised GH 157% in adult studies" },
        { p:"Aromatase inhibition", n:"plates stay open", d:"Melatonin blocks estrogen — delays closure" },
        { p:"SWS depth", n:"60–80%", d:"Melatonin deepens slow-wave sleep" },
      ]},

    { id:"music-pm", t:"Chopin Nocturnes on", sub:"Screens off, music on — this becomes a sleep trigger", gh:"cortisol reducer", headline:"slow-tempo classical reduces cortisol and primes the brain for sleep", tier:2, cite:"Thoma, PLoS ONE 2013; Khalfa, Ann N Y Acad Sci 2003", why:"Music at 60–80 BPM synchronizes heart rate and breathing toward alpha/theta states — the neural precursor to deep sleep. Classical music significantly reduced salivary cortisol in controlled studies, and cortisol is one of the strongest GH suppressors. Playing Debussy or Chopin during the wind-down creates a conditioned sleep cue — after 1–2 weeks the brain associates this music with 'time to sleep.'", tip:"Start a playlist after dinner. Claire de Lune, Gymnopédie No. 1, Chopin Nocturne Op. 9 No. 2, Debussy Clair de Lune, Bach Cello Suite No. 1. Keep it soft — background level. Continue through bath and lotion time.",
      pumps:[
        { p:"Cortisol reduction", n:"significant", d:"Classical music reduced salivary cortisol in controlled study" },
        { p:"Parasympathetic shift", n:"alpha/theta", d:"60–80 BPM music synchronizes brainwaves toward pre-sleep states" },
        { p:"Conditioned cue", n:"after 1–2 wks", d:"Brain auto-associates this music with sleep onset" },
      ]},

    // Epsom bath card removed — optional, not core protocol

    { id:"mag", t:"Magnesium lotion on their feet", sub:"Rub it in while they read — two levers at once", gh:"deep sleep amplifier", headline:"GABA receptor activation — deepens slow-wave sleep", tier:1, cite:"Held, Pharmacopsychiatry 2002; Abbasi, J Res Med Sci 2012", why:"Magnesium activates GABA-A receptors — suppresses somatostatin — removes the brake on GH. Transdermal application bypasses digestion. The consistent touch ritual triggers a parasympathetic response after 1–2 weeks.", tip:"Rub on feet and shoulders while they read.",
      pumps:[
        { p:"GABA receptor activation*", n:"up to 400%", d:"GABA raised GH 400% in adult studies — magnesium activates GABA receptors" },
        { p:"SWS depth", n:"amplifier", d:"Deepens slow-wave sleep" },
        { p:"Sensory ritual", n:"conditioned", d:"Touch cue triggers parasympathetic nightly" },
        { p:"Melatonin support*", n:"up to 157%", d:"Magnesium supports melatonin synthesis — melatonin raised GH 157% in adults" },
        { p:"Parasympathetic activation", n:"sleep onset", d:"Touch ritual triggers parasympathetic response" },
        { p:"Cortisol reduction", n:"calming", d:"Consistent touch ritual lowers cortisol" },
      ]},

    { id:"drink", t:"Tart cherry + A2 milk", sub:"4 oz A2 milk, 1 oz tart cherry juice, unsweetened — 60–90 minutes before bed", gh:"24-hr growth signal", headline:"the 24-hour growth cycle completes — GH 451% at 24h in adult study, IGF-1 +14%", tier:0, sig:true, cite:"Zajac, Biol Sport 2018; Howatson, Eur J Nutr 2012; Forsling, J Pineal Res 1999", why:"The signature bioKids ritual. Everything unsweetened, no added sugar — sugar close to bed fragments sleep and blunts GH pulses after midnight. Casein slow-releases aminos 6–7 hours feeding GH pulses all night. Tart cherry = highest food melatonin (melatonin raised GH 157% in adult studies + aromatase inhibition). α-Lactalbumin = highest tryptophan — serotonin — melatonin. In the Zajac study (adults), GH remained 451% above baseline at 24 hours, IGF-1 14% higher. ~55 calories — too small to spike insulin. Use 100% tart cherry juice ONLY — no blends, no added sugar.\n\nTHE 24-HOUR GROWTH CYCLE: Here's how every meal connects — morning eggs deliver choline that primes the pituitary → sprints trigger a massive GH spike → post-sprint milk converts that GH to IGF-1 (the actual growth signal) → this Sleep Drink feeds casein overnight, slow-releasing aminos for 6–7 hours into each GH pulse while you sleep → tomorrow morning's eggs restart the whole cycle. Some growth lever is always on. Nothing is random.", tip:"Mix, serve 60 min before bed. Unsweetened — no honey, no sugar. 100% tart cherry juice only. This is a DAIRY window. Dim lights after.\n\nNO TART CHERRY JUICE? Warm A2 milk by itself still delivers casein overnight. The cherry adds melatonin — but the milk alone is the foundation. Even regular whole milk before bed is better than nothing. Start where you are.",
      pumps:[
        { p:"GH at 24h*", n:"up to 451%", d:"Zajac: still 451% above baseline at 24h in adult athletes" },
        { p:"IGF-1*", n:"+14%", d:"14% higher than controls in adult study" },
        { p:"Melatonin (cherry)*", n:"up to 157%", d:"Highest food melatonin — raised GH 157% in adults + aromatase block" },
        { p:"Casein overnight", n:"6–7 hrs", d:"Slow-release aminos all night" },
        { p:"24-hour cycle", n:"always on", d:"Post-sprint — Sleep Drink — overnight — eggs restart" },
        { p:"Cortisol ↓ (cherry)", n:"↓ stress", d:"Tart cherry reduces cortisol" },
      ]},

    { id:"read", t:"A book in bed", sub:"Physical book, not a screen — 15 minutes together", gh:"sleep trigger", headline:"reading in bed replaces screens and becomes a conditioned sleep cue", tier:1, cite:"Mindell, Sleep 2015; Chang, PNAS 2014", why:"Reading a physical book in bed activates the parasympathetic nervous system — the opposite of what screens do. After 1–2 weeks, the brain associates book + bed = sleep, and starts releasing melatonin on cue. Chang et al. showed screen reading before bed suppressed melatonin, while book reading did not. Shared reading also deepens parent-child bonding — which lowers cortisol in both parent and child.", tip:"Physical books only — no tablets, no Kindle with backlight. Read together. Let them pick the book. This becomes the last step before lights out. Magnesium lotion on feet while you read.",
      pumps:[
        { p:"Melatonin preserved", n:"no suppression", d:"Book reading doesn't suppress melatonin — screens do" },
        { p:"Parasympathetic activation", n:"sleep onset", d:"Reading activates calm nervous system state" },
        { p:"Conditioned cue", n:"after 1–2 wks", d:"Brain associates reading + bed = sleep" },
        { p:"Cortisol ↓ (bonding)", n:"calming", d:"Shared reading lowers cortisol in parent and child" },
      ]},

    { id:"rtn", t:"Bath — lotion — drink — read — bed", sub:"After two weeks the brain auto-releases melatonin when it hears this sequence start", gh:"melatonin trigger", headline:"brain auto-releases melatonin when routine starts", tier:0, cite:"Mindell, Sleep 2015; Mindell, Sleep 2009", why:"After 1–2 weeks, the brain starts releasing melatonin as soon as it recognizes the familiar sequence — before lights are off. Melatonin raised GH up to 157% in adult studies. The routine itself becomes a GH lever.", tip:"Same order, always. They stop fighting bedtime.",
      pumps:[
        { p:"Anticipatory melatonin*", n:"up to 157%", d:"Melatonin raised GH 157% in adult studies — routine auto-triggers it" },
        { p:"Sensory ritual", n:"conditioned", d:"After 1–2 weeks the sequence itself triggers sleep" },
        { p:"Cortisol reduction", n:"predictability", d:"Predictable routines lower cortisol in children" },
      ]},

    { id:"cool", t:"65°F, fan on", sub:"Cool air + pink noise — the body must drop 2–3°F to enter deep sleep", gh:"tonight's growth", headline:"core temp must drop 2–3°F for deep sleep", tier:2, cite:"Krauchi, Nature 1999; Brandenberger, Lancet 2000", why:"The body must lower core temperature by 1–1.5°C to initiate SWS — where the massive nocturnal GH surge occurs. Cool room + warm blanket = fastest path.", tip:"Crack a window, use a fan. Fan doubles as pink noise." },

    { id:"dark", t:"Blackout curtains, tape every LED", sub:"Even dim light suppresses 50%+ of tonight's growth hormone", gh:"tonight's growth", headline:"even dim light suppresses 50%+ of melatonin-driven GH", tier:0, cite:"Brandenberger, Lancet 2000; Gooley, JCEM 2011", why:"Normal sleep produces a single massive GH surge — 3× greater peak than disrupted sleep. Even a small LED suppresses melatonin-driven GH by 50%+. Every lever today builds to this one nocturnal surge.", tip:"Blackout curtains are the single best investment. Tape every LED. Red nightlight only." },

    { id:"bed", t:"Lights out — growth is happening now", sub:"Minimum 10 hours — ages 6+: 12+ hours offers the most gains — each 90-minute cycle is one growth rep", gh:"tonight's growth", headline:"each 90-min cycle is one growth rep — 12 hrs = 8 reps", tier:0, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000; Takahashi, J Clin Invest 1968", why:"Everything today builds to this. Normal sleep = 3× more peak GH. Each 90-minute cycle is one 'growth rep.' 11 hours = 7–8 reps. 8 hours = only 5. With every lever activated — choline-primed pituitary, sprint-triggered lactate, IGF-1 conversion, amino reloading, GABA, glycine, melatonin, casein slow-releasing, core temp dropped, complete darkness — the 24-hour cycle begins again tomorrow with eggs.", tip:"10–12 hours. Non-negotiable. This is the most important item on the entire page." },

    { id:"airway", t:"Nose breathing only", sub:"If their mouth is open at night, talk to your pediatrician — fixing this restores growth", gh:"tonight's growth at risk", headline:"fragmented sleep + hypoxia suppress the overnight height surge", tier:0, cite:"Morais-Almeida, Wandalsen & Solé, J Pediatr (Rio J) 2019", why:"A systematic review of 20 studies found that mouth-breathing children have reduced height-driving hormone release linked to fragmented sleep and hypoxia. Mouth breathing often signals an underlying airway obstruction — enlarged adenoids, tonsils, or allergic rhinitis — that fragments deep slow-wave sleep and reduces oxygen saturation. Since 60–80% of daily height-driving hormone is released during slow-wave sleep, anything that disrupts it directly suppresses growth. The good news: height-driving hormone secretion improves after effective treatment of the airway problem (adenotonsillectomy, nasal steroids, myofunctional therapy, or orthodontic expansion). The review concludes that mouth breathing should be considered a potential cause of growth retardation in children.", tip:"Watch your child sleep. If their mouth is open, they snore, or they breathe loudly — talk to your pediatrician or an ENT. Fixing the airway can restore normal height-driving hormone secretion.",
      pumps:[
        { p:"Slow-wave sleep disruption", n:"60–80%", d:"Mouth breathing fragments deep sleep — where the majority of height-driving hormones are released" },
        { p:"Hypoxia", n:"height suppression", d:"Reduced oxygen saturation blunts pituitary hormone release" },
        { p:"Post-treatment recovery", n:"height restored", d:"Systematic review: height-driving hormone secretion improves after effective airway treatment (Morais-Almeida 2019)" },
      ]},
  ]},
];


// ═══════════════════
// GREEN NUMBER RENDERER
// ═══════════════════
const greenNum = (text: string) => {
  if (!text) return null;
  return text.split(/(\d+[\.,]?\d*%?×?)/g).map((part, i) =>
    /\d/.test(part)
      ? <span key={i} style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", color:"#065f46" }}>{part}</span>
      : <span key={i}>{part}</span>
  );
};


// ═══════════════════
// CARD
// ═══════════════════
function Card({ item, isOpen, onToggle }: {
  item: DayItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isSig = item.sig || item.tier === 0;
  const isUtil = item.tier >= 3;
  const noGH = !item.gh || item.gh === "—";

  return (
    <div id={`item-${item.id}`} style={{
      background: isSig ? "#f0fdf4" : "#fff",
      borderRadius: isSig ? 20 : 14,
      border: isSig ? "1.5px solid #065f46" : item.feat ? "2px solid #fbbf24" : "1px solid #e7e5e4",
      overflow:"hidden",
      transition:"all 0.3s ease",
      boxShadow: isSig ? "0 4px 24px rgba(6,95,70,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      {/* Collapsed view */}
      <div onClick={onToggle} style={{ cursor:"pointer", padding: isSig ? "18px 20px" : isUtil ? "12px 16px" : "14px 18px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
          <div style={{ flex:1, minWidth:0 }}>
            {/* Title + GH number */}
            <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
              <span style={{
                fontSize: isSig ? 16 : isUtil ? 13.5 : 14.5,
                fontWeight:700,
                color: "#1c1917",
                lineHeight:1.3,
              }}>{item.t}</span>
              {!noGH && <span style={{
                fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif",
                fontSize:11, color:"#065f46", flexShrink:0,
                background:"#f0fdf4", border:"1px solid #065f46", borderRadius:8, padding:"2px 7px",
              }}>{item.gh}</span>}
            </div>

            {/* Subtitle in mono */}
            <div style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:11, color:"#1c1917", marginTop:3, lineHeight:1.3,
            }}>{item.sub}</div>

            {/* Headline — the ONE thing */}
            {!isUtil && <div style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:11.5, color:"#1c1917", marginTop:6, lineHeight:1.5,
            }}>{greenNum(item.headline)}</div>}

            {/* Citation */}
            <div style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:9, color:"#1c1917", opacity:0.9, marginTop:4, lineHeight:1.3,
            }}>{item.cite.split('; ').map((c, i, arr) => {
              const trimmed = c.trim();
              const url = citeUrls[trimmed];
              return <span key={i}>{url
                ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color:"#057a55", textDecoration:"underline", textUnderlineOffset:2 }}>{trimmed}</a>
                : trimmed}{i < arr.length - 1 ? '; ' : ''}</span>;
            })}</div>
          </div>

          {/* Expand indicator */}
          {(item.pumps || item.foods || item.why) && <span style={{
            flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center",
            width:28, height:28, borderRadius:14,
            background: isOpen ? "#f0fdf4" : "#fafaf8",
            border: isOpen ? "1px solid #065f46" : "1px solid #d6d3d1",
            transition:"all 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "none",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke={isOpen ? "#065f46" : "#78716c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>}
        </div>
      </div>

      {/* Expanded view */}
      {isOpen && <div onClick={e => e.stopPropagation()} style={{ padding:"0 20px 18px", borderTop:"1px solid #f5f5f0" }}>
        {item.why && <div style={{ background:"#f0fdf4", borderRadius:12, padding:"16px 18px", margin:"14px 0 12px" }}>
          {(() => {
            const sections = item.why.split('\n\n');
            const hasHeaders = sections.some(s => /^(WHY |THE |SKIP |DAILY |BERRY )/.test(s.trim()));
            if (!hasHeaders || sections.length <= 2) {
              return <p style={{ fontSize:13, color:"#065f46", lineHeight:1.65, margin:0 }}>{item.why}</p>;
            }
            const blocks: { header?: string; body: string }[] = [];
            let currentHeader: string | undefined;
            for (const section of sections) {
              const trimmed = section.trim();
              if (!trimmed) continue;
              const isHeader = /^(WHY |THE |SKIP |DAILY |BERRY )/.test(trimmed) && trimmed.length < 60;
              if (isHeader) {
                currentHeader = trimmed.replace(/[?:]$/, '');
              } else {
                blocks.push({ header: currentHeader, body: trimmed });
                currentHeader = undefined;
              }
            }
            return blocks.map((block, i) => (
              <div key={i} style={{ marginBottom: i < blocks.length - 1 ? 16 : 0, paddingTop: i > 0 && block.header ? 2 : 0, borderTop: i > 0 && block.header ? "1px solid #d1fae5" : "none" }}>
                {block.header && (
                  <div style={{ fontSize:10.5, fontWeight:700, color:"#047857", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6, marginTop: i > 0 ? 10 : 0 }}>
                    {block.header}
                  </div>
                )}
                <p style={{ fontSize:13, color:"#065f46", lineHeight:1.7, margin:0 }}>
                  {/^[A-Z][A-Z\s/()×–0-9]+:/.test(block.body) ? (
                    <><span style={{ fontWeight:600, fontSize:12 }}>{block.body.match(/^([A-Z][A-Z\s/()×–0-9]+:)/)?.[1]}</span>{block.body.replace(/^[A-Z][A-Z\s/()×–0-9]+:/, '')}</>
                  ) : block.body}
                </p>
              </div>
            ));
          })()}
        </div>}

        {item.tip && <p style={{ fontSize:12.5, color:"#44403c", fontStyle:"italic", marginBottom:14, lineHeight:1.55 }}>{item.tip}</p>}

        {item.pumps && <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:8.5, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Height pathways</div>
          {item.pumps.some(p => p.p.includes('*')) && <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8.5, color:"#1c1917", marginBottom:8, lineHeight:1.4 }}>* Percentages from adult studies using isolated amino acids or supplements. Whole foods deliver these pathways at lower but meaningful doses.</div>}
          {item.pumps.map((pump, i) => (
            <div key={i} style={{ display:"flex", alignItems:"baseline", gap:8, padding:"4px 0", borderTop: i > 0 ? "1px solid #f5f5f0" : "none" }}>
              <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:13, color:"#065f46", minWidth:56, textAlign:"right", flexShrink:0 }}>{pump.n}</span>
              <span style={{ fontSize:11.5, fontWeight:600, color:"#1c1917" }}>{pump.p}</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#1c1917", flex:1 }}>— {pump.d}</span>
            </div>
          ))}
        </div>}

        {item.foods && <div>
          <div style={{ fontSize:8.5, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Food sources</div>
          {item.foods.map((food, i) => (
            <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderTop: i > 0 ? "1px solid #f5f5f0" : "none" }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:"#1c1917", flex:1, lineHeight:1.4 }}>{food.f}</div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#1c1917", maxWidth:200, textAlign:"right", lineHeight:1.4 }}>{food.d}</div>
            </div>
          ))}
        </div>}
      </div>}
    </div>
  );
}


// ═══════════════════
// MAIN
// ═══════════════════
export default function Dashboard() {
  const childName = useChildName();
  const child = { ...mockChild, name: childName };

  const [openId, setOpenId] = useState<string | null>(null);

  // Per-child checklist: include active child ID in the localStorage key
  const activeChild = typeof window !== 'undefined' ? getActiveChild() : null;
  const childIdSuffix = activeChild?.id ? `_${activeChild.id}` : '';

  // Height potential data from saved child profile
  const heightData = (() => {
    if (!activeChild?.geneticTarget) return null;
    const targetCm = parseFloat(activeChild.geneticTarget);
    if (isNaN(targetCm)) return null;
    const cmToFtIn = (cm: number) => {
      const totalIn = Math.round(cm / 2.54);
      return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
    };
    const rangeLow = cmToFtIn(targetCm - 2 * 2.54);
    const rangeHigh = cmToFtIn(targetCm + 2 * 2.54);
    const bioLow = rangeHigh;
    const bioHigh = cmToFtIn(targetCm + 8 * 2.54);
    const midpoint = cmToFtIn(targetCm);
    return { rangeLow, rangeHigh, bioLow, bioHigh, midpoint, targetCm };
  })();
  // Persist checkmarks in localStorage, keyed by today's date + child (auto-resets daily)
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayKey = `biokids_done_${todayStr}${childIdSuffix}`;
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(todayKey);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem(todayKey, JSON.stringify(done)); } catch {}
  }, [done, todayKey]);

  // Identify user + track session start on mount
  useEffect(() => {
    // Re-identify the user so Mixpanel ties this session to the right person
    const uid = localStorage.getItem('biokids_auth_user_id');
    const email = localStorage.getItem('biokids_auth_email');
    if (uid) {
      analytics.identify(uid, email || undefined);
    }
    analytics.sessionStart();
    analytics.pageView('home');
  }, []);

  // Compute items early — needed by streak tracking below
  const allItems = dayData.flatMap(d => d.items);
  const total = allItems.length;
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round((doneCount / total) * 100);
  const coreItems = allItems.filter(i => i.sig || i.tier === 0);
  const coreTotal = coreItems.length;
  const coreDoneCount = coreItems.filter(i => done[i.id]).length;
  const corePct = coreTotal > 0 ? Math.round((coreDoneCount / coreTotal) * 100) : 0;
  const allCoreDone = coreDoneCount === coreTotal && coreTotal > 0;
  const allDone = doneCount === total && total > 0;

  // Streak tracking — counts consecutive days with at least 1 core goal done
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const streakKey = `biokids_streak${childIdSuffix}`;
    const lastDateKey = `biokids_streak_last${childIdSuffix}`;
    try {
      const savedStreak = parseInt(localStorage.getItem(streakKey) || '0');
      const lastDate = localStorage.getItem(lastDateKey) || '';
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (lastDate === todayStr) {
        // Already counted today
        setStreak(savedStreak);
      } else if (lastDate === yesterdayStr) {
        // Consecutive — check if today has any core done
        const hasCoreToday = coreItems.some(i => done[i.id]);
        if (hasCoreToday) {
          const newStreak = savedStreak + 1;
          localStorage.setItem(streakKey, String(newStreak));
          localStorage.setItem(lastDateKey, todayStr);
          setStreak(newStreak);
        } else {
          setStreak(savedStreak); // keep showing until they do something or day passes
        }
      } else if (lastDate === '') {
        // First time — if they have any core done, start at 1
        const hasCoreToday = coreItems.some(i => done[i.id]);
        if (hasCoreToday) {
          localStorage.setItem(streakKey, '1');
          localStorage.setItem(lastDateKey, todayStr);
          setStreak(1);
        }
      } else {
        // Streak broken — reset if they do something today
        const hasCoreToday = coreItems.some(i => done[i.id]);
        if (hasCoreToday) {
          localStorage.setItem(streakKey, '1');
          localStorage.setItem(lastDateKey, todayStr);
          setStreak(1);
        } else {
          setStreak(0);
        }
      }
    } catch { setStreak(0); }
  }, [done, todayStr, childIdSuffix, coreItems]);

  // Celebration state — tracks if user has seen core celebration
  const [showCoreCelebration, setShowCoreCelebration] = useState(false);
  const prevCoreDone = useRef(false);
  useEffect(() => {
    if (allCoreDone && !prevCoreDone.current) {
      setShowCoreCelebration(true);
    }
    prevCoreDone.current = allCoreDone;
  }, [allCoreDone]);

  const [introOpen, setIntroOpen] = useState(false);

  // First-visit welcome — shows once after payment, then never again
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('biokids_welcomed');
  });
  const dismissWelcome = () => {
    localStorage.setItem('biokids_welcomed', '1');
    setShowWelcome(false);
  };

  // Time-based auto-scroll to current period
  const periodRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activePeriod, setActivePeriod] = useState<string>('');

  useEffect(() => {
    const hour = new Date().getHours();
    let current = 'Morning';
    if (hour >= 18) current = 'Evening';
    else if (hour >= 15) current = 'Late Afternoon';
    else if (hour >= 12) current = 'Afternoon';
    else if (hour >= 6) current = 'Morning';
    else current = 'Evening'; // before 6am = still evening/sleep territory
    setActivePeriod(current);

    // Deep link: if URL has a hash like #item-clo, scroll to that card and open it
    const hash = window.location.hash;
    if (hash && hash.startsWith('#item-')) {
      const itemId = hash.replace('#item-', '');
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setOpenId(itemId);
        }
      }, 400);
    } else {
      // Auto-scroll to current period after a brief delay for render
      setTimeout(() => {
        const el = periodRefs.current[current];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Offset for nav
          setTimeout(() => window.scrollBy(0, -80), 400);
        }
      }, 300);
    }
  }, []);

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#fafaf9" }}>
      <style>{`
        @keyframes celebrateFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <Nav currentChild={child} />

      {/* Clean top bar */}

      <div style={{ maxWidth:540, margin:"0 auto", padding:"0 20px" }}>

        {/* Header */}
        <div style={{ paddingTop:48, paddingBottom:0 }}>
          <p
            onClick={() => setIntroOpen(o => !o)}
            style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:16, fontWeight:600, color:"#1c1917", lineHeight:1.55, maxWidth:460, marginBottom: introOpen ? 16 : 0, cursor:"pointer" }}
          >
            {childName === 'Your child' ? 'Your child' : childName}&apos;s daily height protocol.
            <span style={{ color:"#065f46", fontSize:9, transition:"transform 0.2s ease", transform: introOpen ? "rotate(180deg)" : "none", display:"inline-block", marginLeft:6 }}>▼</span>
          </p>

          {introOpen && <>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, color:"#1c1917", lineHeight:1.75, maxWidth:440, margin:"0 0 8px" }}>
              Meals, sprints, and sleep — arranged by science to maximize height.
            </p>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:12, color:"#065f46", lineHeight:1.6, maxWidth:440, margin:"0 0 16px", fontStyle:"italic" }}>
              Every height signal simultaneously supports brain development.
            </p>

            {/* Daily targets — three clean numbers */}
            <div style={{ display:"flex", gap:8, marginBottom:4 }}>
              <div style={{ flex:1, background:"#f0fdf4", borderRadius:12, padding:"10px 12px", border:"1px solid #d1fae5" }}>
                <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#065f46", lineHeight:1 }}>20–24 oz</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8.5, color:"#059669", marginTop:4, lineHeight:1.3 }}>A2 milk/day</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:7.5, color:"#78716c", marginTop:2 }}>5 oz sheep yogurt = 8 oz milk</div>
              </div>
              <div style={{ flex:1, background:"#f0fdf4", borderRadius:12, padding:"10px 12px", border:"1px solid #d1fae5" }}>
                <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#065f46", lineHeight:1 }}>1.2–1.5g</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8.5, color:"#059669", marginTop:4, lineHeight:1.3 }}>protein/kg/day</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:7.5, color:"#78716c", marginTop:2 }}>eggs, dairy, meat, lentils</div>
              </div>
              <div style={{ flex:1, background:"#f0fdf4", borderRadius:12, padding:"10px 12px", border:"1px solid #d1fae5" }}>
                <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#065f46", lineHeight:1 }}>surplus</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8.5, color:"#059669", marginTop:4, lineHeight:1.3 }}>clean calories</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:7.5, color:"#78716c", marginTop:2 }}>whole foods only</div>
              </div>
            </div>
          </>}
        </div>

        {/* Install to Home Screen prompt — top of page for visibility */}
        <div style={{ marginTop: 16 }}>
          <InstallButton />
        </div>

        {/* Quick links — Shopping List + Height Log */}
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <button
            onClick={() => { window.location.href = '/shopping-list'; }}
            style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              fontFamily:"'Courier New', Courier, monospace", fontSize:12, fontWeight:700,
              color:"#065f46", background:"#f0fdf4", border:"1.5px solid #d1fae5",
              borderRadius:12, padding:"12px 16px", cursor:"pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Shopping List
          </button>
          <button
            onClick={() => { window.location.href = '/growth-log'; }}
            style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              fontFamily:"'Courier New', Courier, monospace", fontSize:12, fontWeight:700,
              color:"#065f46", background:"#f0fdf4", border:"1.5px solid #d1fae5",
              borderRadius:12, padding:"12px 16px", cursor:"pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Height Log
          </button>
        </div>

        {/* Progress spacer — reserves space when sticky bar is visible */}
        {doneCount > 0 && <div style={{ height:48 }} />}

        {/* First-visit welcome */}
        {showWelcome && (
          <div style={{
            background:"linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)",
            borderRadius:20, border:"2px solid #86efac",
            padding:"32px 24px", marginTop:24,
            boxShadow:"0 4px 24px rgba(6,95,70,0.1)",
            textAlign:"center",
            animation:"celebrateFadeIn 0.6s ease",
          }}>
            <div style={{ fontSize:28, marginBottom:14 }}>&#x1F331;</div>
            <p style={{
              fontSize:20, fontWeight:800, color:"#065f46", margin:"0 0 10px",
              letterSpacing:"-0.02em", lineHeight:1.3,
            }}>
              Welcome{childName !== 'Your child' ? `, ${childName}'s family` : ''}.
            </p>
            <p style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:13, color:"#065f46", lineHeight:1.65, margin:"0 0 6px",
              maxWidth:360, marginLeft:"auto", marginRight:"auto",
            }}>
              Everything below is your child&apos;s daily height protocol — 15+ science-backed levers. Your notifications walk you through it each day.
            </p>
            <p style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:11.5, color:"#059669", lineHeight:1.6, margin:"0 0 6px",
              maxWidth:340, marginLeft:"auto", marginRight:"auto",
            }}>
              Works at any age before growth plates close — typically up to age 17 for girls, age 20 for boys. Starting at any age is powerful.
            </p>
            <p style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:12, color:"#059669", lineHeight:1.6, margin:"0 0 20px",
              maxWidth:340, marginLeft:"auto", marginRight:"auto",
            }}>
              Check things off as you go. It gets easier every day.
            </p>
            <button
              onClick={dismissWelcome}
              style={{
                fontFamily:"'Courier New', Courier, monospace",
                fontSize:13, fontWeight:700, color:"#fff",
                background:"#065f46", border:"none", borderRadius:12,
                padding:"10px 28px", cursor:"pointer",
              }}
            >
              Let&apos;s begin
            </button>
          </div>
        )}

        {/* START HERE — Big 5 gateway */}
        {(
          <div style={{
            background:"#fff", borderRadius:20, border:"1.5px solid #065f46",
            padding:"24px 20px", margin:"24px 0 0",
            boxShadow:"0 2px 12px rgba(6,95,70,0.06)",
          }}>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:800, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>
              Start here
            </div>
            <div style={{ fontSize:17, fontWeight:800, color:"#1c1917", lineHeight:1.3, marginBottom:4 }}>
              The 5 that matter most.
            </div>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#57534e", lineHeight:1.6, marginBottom:18 }}>
              Master these first. Everything else multiplies them.
            </p>

            {[
              { num:"1", title:"A2 milk every morning + afternoon", sub:"A glass with honey, a yogurt bowl, or a smoothie — dairy serving #1. One more when they get home from school — #2. Minimum is 2 glasses per day.", anchor:"d1" },
              { num:"2", title:"Lemon-flavored cod liver oil", sub:"½ to full spoon direct or hidden in smoothie. Three growth levers in one. Don't tell them what it is. Do NOT consume on liver days.", anchor:"clo" },
              { num:"3", title:"Liver meatballs 2–3× per week", sub:"Mix 2 tbsp beef or chicken liver into ground beef. They won't taste it. The single most nutrient-dense food.", anchor:"lunch" },
              { num:"4", title:"The Sprint Stack", sub:"Light snack (peanut butter + egg for niacin + choline, or just a liver meatball — it has both) → all-out sprints (they already do this at practice + with friends) → stretch → cold milk with honey right after. That sequence is the most powerful combination in the protocol.", anchor:"spr" },
              { num:"5", title:"10+ hours in complete darkness", sub:"Blackout curtains, tape every LED. This is when 60–80% of growth hormone is released. Non-negotiable.", anchor:"bed" },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  const el = document.getElementById(`item-${item.anchor}`);
                  if (el) { el.scrollIntoView({ behavior:'smooth', block:'center' }); setOpenId(item.anchor); }
                }}
                style={{
                  display:"flex", gap:12, padding:"14px 0",
                  borderTop: i > 0 ? "1px solid #f0eeec" : "none",
                  cursor:"pointer",
                }}
              >
                <div style={{
                  width:28, height:28, borderRadius:14, flexShrink:0,
                  background:"#065f46", display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:14, fontWeight:800, color:"#fff" }}>{item.num}</span>
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#1c1917", lineHeight:1.3 }}>{item.title}</div>
                  <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10.5, color:"#57534e", lineHeight:1.5, marginTop:3 }}>{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Joy — unnumbered, lighter feel, the soul of the protocol */}
            <div
              onClick={() => {
                const el = document.getElementById('item-joy');
                if (el) { el.scrollIntoView({ behavior:'smooth', block:'center' }); setOpenId('joy'); }
              }}
              style={{
                display:"flex", gap:12, padding:"14px 0",
                borderTop:"1px solid #f0eeec",
                cursor:"pointer",
              }}
            >
              <div style={{
                width:28, height:28, borderRadius:14, flexShrink:0,
                background:"linear-gradient(135deg, #fbbf24, #f59e0b)", display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <span style={{ fontSize:14 }}>&#9728;</span>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:"#1c1917", lineHeight:1.3 }}>Sunlight, laughter, outside, every day</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10.5, color:"#57534e", lineHeight:1.5, marginTop:3 }}>10 minutes of morning sun sets tonight's sleep clock. Laughter alone raised growth hormone 87% in one study. Let them play, be silly, have fun. Joy is not a bonus — it's a growth lever. Make it fun for everyone.</div>
              </div>
            </div>

            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#065f46", marginTop:14, fontStyle:"italic", lineHeight:1.6 }}>
              Full protocol below — but these five are your foundation.
            </p>
          </div>
        )}

        {/* Core goals celebration — screenshot-worthy card */}
        {showCoreCelebration && (
          <div style={{
            background:"linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ecfdf5 100%)",
            borderRadius:20, border:"2px solid #86efac",
            padding:"32px 24px", margin:"24px 0 0",
            boxShadow:"0 4px 24px rgba(6,95,70,0.12)",
            animation:"celebrateFadeIn 0.6s ease",
          }}>
            <div style={{ textAlign:"center" }}>
              {/* Big streak number — the screenshot moment */}
              {streak > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:56, fontWeight:800, color:"#065f46", lineHeight:1, letterSpacing:"-0.04em" }}>
                    Day {streak}
                  </div>
                  <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#059669", textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, marginTop:4 }}>
                    height streak
                  </div>
                </div>
              )}

              <div style={{ width:40, height:2, background:"#86efac", borderRadius:1, margin:"0 auto 16px" }} />

              <p style={{
                fontSize:16, fontWeight:800, color:"#065f46", margin:"0 0 8px",
                letterSpacing:"-0.02em",
              }}>
                Every core goal — done.
              </p>
              <p style={{
                fontFamily:"'Courier New', Courier, monospace",
                fontSize:12, color:"#065f46", lineHeight:1.65, margin:"0 0 4px",
              }}>
                {childName === 'Your child' ? 'Your child' : childName} &middot; {new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
              </p>

              <div style={{ display:"flex", justifyContent:"center", gap:20, margin:"16px 0" }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:22, fontWeight:800, color:"#065f46" }}>{coreDoneCount}/{coreTotal}</div>
                  <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#059669" }}>core goals</div>
                </div>
                {(doneCount - coreDoneCount) > 0 && (
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:22, fontWeight:800, color:"#065f46" }}>{doneCount - coreDoneCount}</div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#059669" }}>bonus</div>
                  </div>
                )}
              </div>

              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#86efac", letterSpacing:"0.08em", margin:"12px 0 16px" }}>
                &#x25CF; bioKids
              </div>

              {/* Share — FOMO text */}
              <button
                onClick={() => {
                  const streakText = streak > 1 ? `Day ${streak} streak. ` : '';
                  const text = `${streakText}Did you know there are 15+ science-backed things that affect how tall your kid grows that no doctor talks about? My ${childName === 'Your child' ? 'kid' : childName} is on it. biokids.me`;
                  if (navigator.share) {
                    navigator.share({ text }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => {});
                  }
                }}
                style={{
                  fontFamily:"'Courier New', Courier, monospace",
                  fontSize:11, fontWeight:600, color:"#065f46",
                  background:"rgba(255,255,255,0.7)", border:"1px solid #86efac", borderRadius:10,
                  padding:"8px 18px", cursor:"pointer",
                  display:"inline-flex", alignItems:"center", gap:6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Tell a parent friend
              </button>
            </div>
          </div>
        )}

        {/* Removed: checklist celebration card — protocol is reference, not homework */}

        {/* Brain statement + Height Potential — featured at top */}
        {heightData && (
          <div style={{ marginTop:24, padding:"16px 20px", background:"linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)", borderRadius:14, border:"1.5px solid #86efac", textAlign:"center", marginBottom:8 }}>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, color:"#065f46", lineHeight:1.65, margin:0, fontWeight:600, fontStyle:"italic" }}>
              Height isn&apos;t the only benefit — every height signal simultaneously supports brain development.
            </p>
          </div>
        )}

        {/* Height Potential — tape measure + typography */}
        {heightData && (() => {
          const rangeHighTotal = parseInt(heightData.rangeHigh.split("'")[0]) * 12 + parseInt(heightData.rangeHigh.split("'")[1]);
          const rangeLowTotal = parseInt(heightData.rangeLow.split("'")[0]) * 12 + parseInt(heightData.rangeLow.split("'")[1]);
          const bioHighTotal = parseInt(heightData.bioHigh.split("'")[0]) * 12 + parseInt(heightData.bioHigh.split("'")[1]);
          const totalSpan = bioHighTotal - rangeLowTotal;
          const geneticPct = ((rangeHighTotal - rangeLowTotal) / totalSpan) * 100;

          return (
            <div
              onClick={() => { window.location.href = '/settings'; }}
              style={{
                cursor:"pointer", marginTop:32,
                background:"#fafaf9",
                borderRadius:20, border:"1.5px solid #e7e5e4",
                padding:"28px 24px 24px", position:"relative",
              }}
            >
              {/* Label */}
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:20 }}>
                {childName === 'Your child' ? "Your child's" : `${childName}'s`} height potential
              </div>

              {/* Main layout: tape measure left, content right */}
              <div style={{ display:"flex", gap:20, alignItems:"stretch" }}>

                {/* Tape measure — slim vertical bar */}
                <div style={{ width:20, flexShrink:0, position:"relative", minHeight:200 }}>
                  {/* Genetic zone (bottom) — warm gray */}
                  <div style={{
                    position:"absolute", bottom:0, left:0, right:0,
                    height:`${geneticPct}%`,
                    background:"#ebe9e6",
                    borderRadius:"0 0 10px 10px",
                  }} />
                  {/* bioKids zone (top) — green gradient */}
                  <div style={{
                    position:"absolute", top:0, left:0, right:0,
                    height:`${100 - geneticPct}%`,
                    background:"linear-gradient(to top, #065f46 0%, #059669 40%, #34d399 100%)",
                    borderRadius:"10px 10px 0 0",
                  }} />

                  {/* Tick marks — subtle ruler lines */}
                  {Array.from({ length: totalSpan + 1 }, (_, i) => {
                    const pct = (i / totalSpan) * 100;
                    const isInch = true;
                    const isMajor = i % 2 === 0;
                    const isZoneLine = i === (rangeHighTotal - rangeLowTotal);
                    const inGreen = i >= (rangeHighTotal - rangeLowTotal);
                    return (
                      <div key={i} style={{
                        position:"absolute",
                        bottom:`${pct}%`,
                        right:0,
                        width: isZoneLine ? 24 : isMajor ? 10 : 6,
                        height: isZoneLine ? 2 : 1,
                        background: isZoneLine ? "#065f46" : inGreen ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.08)",
                        marginLeft: isZoneLine ? -2 : 0,
                      }} />
                    );
                  })}
                </div>

                {/* Right side — heights stacked vertically */}
                <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:200 }}>

                  {/* Top — the big aspirational number */}
                  <div>
                    <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:42, fontWeight:800, color:"#065f46", lineHeight:1, letterSpacing:"-0.03em" }}>
                      {heightData.bioHigh}
                    </div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#059669", marginTop:6 }}>
                      with optimized environment
                    </div>
                  </div>

                  {/* Middle — bioKids zone range */}
                  <div style={{ padding:"12px 0" }}>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8, color:"#065f46", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>bioKids Zone</div>
                    <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:17, fontWeight:800, color:"#065f46" }}>
                      {heightData.bioLow} — {heightData.bioHigh}
                    </div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#065f46", marginTop:2 }}>
                      +2&quot; to +8&quot; above genetic midpoint
                    </div>
                  </div>

                  {/* Bottom — genetic range */}
                  <div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8, color:"#1c1917", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Genetic range</div>
                    <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:15, fontWeight:700, color:"#1c1917" }}>
                      {heightData.rangeLow} — {heightData.rangeHigh}
                    </div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#44403c", marginTop:2 }}>
                      standard mid-parental prediction
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom — share + edit */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const name = childName === 'Your child' ? 'My kid' : childName;
                    const text = `${name}'s height potential: ${heightData.bioLow} to ${heightData.bioHigh} with the right environment. Genetics say ${heightData.rangeLow}–${heightData.rangeHigh}. The gap is real. biokids.me`;
                    if (navigator.share) {
                      navigator.share({ text }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => {});
                    }
                  }}
                  style={{
                    fontFamily:"'Courier New', Courier, monospace",
                    fontSize:9, fontWeight:600, color:"#065f46",
                    background:"#f0fdf4", border:"1px solid #86efac", borderRadius:8,
                    padding:"4px 10px", cursor:"pointer",
                    display:"inline-flex", alignItems:"center", gap:4,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  Share
                </button>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); window.location.href = '/growth-log'; }}
                    style={{
                      fontFamily:"'Courier New', Courier, monospace",
                      fontSize:9, fontWeight:600, color:"#065f46",
                      background:"#f0fdf4", border:"1px solid #86efac", borderRadius:8,
                      padding:"4px 10px", cursor:"pointer",
                      display:"inline-flex", alignItems:"center", gap:4,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><polyline points="7 16 11 10 15 14 21 6"/></svg>
                    Height Log
                  </button>
                  <span style={{
                    display:"flex", alignItems:"center", gap:4,
                    fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#44403c",
                  }}>
                    Edit
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3.5 2L7 5L3.5 8" stroke="#c8c3bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ Featured Investigation ═══ */}
        <div
          onClick={() => { analytics.citationTap('dinka_article_home'); window.location.href = '/learn/dinka-tribe'; }}
          style={{
            cursor:"pointer", marginTop:36,
            background:"linear-gradient(135deg, #1c1917 0%, #292524 100%)",
            borderRadius:20, overflow:"hidden",
            border:"1.5px solid #44403c",
            position:"relative",
          }}
        >
          {/* Top accent bar */}
          <div style={{ height:3, background:"linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b)" }} />
          <div style={{ padding:"24px 20px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#f59e0b", textTransform:"uppercase", letterSpacing:"0.1em", background:"rgba(245,158,11,0.12)", padding:"3px 8px", borderRadius:6 }}>Investigation</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c" }}>5 min read</span>
            </div>
            <div style={{ fontSize:19, fontWeight:900, color:"#fafaf9", letterSpacing:"-0.02em", lineHeight:1.3, marginBottom:10 }}>
              The Dinka Tribe of South Sudan
            </div>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:12, color:"#a8a29e", lineHeight:1.65, margin:"0 0 16px" }}>
              A tiny tribe produces more 7-footers per capita than anywhere on Earth. Their secret? Cattle camps where children drink raw milk by the gallon. The legend of Bol Nyuol — Manute Bol&apos;s 7&apos;10&quot; grandfather — begins here.
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", gap:6 }}>
                {["Raw Milk", "Growth", "7-Footers"].map(tag => (
                  <span key={tag} style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", background:"rgba(120,113,108,0.15)", padding:"3px 8px", borderRadius:6 }}>{tag}</span>
                ))}
              </div>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#f59e0b", fontWeight:700 }}>Read →</span>
            </div>
          </div>
        </div>

        {/* Breath before the day begins */}
        <div style={{ height:1, background:"#e7e5e4", margin:"36px 0 40px" }} />

        {/* Title — centered, outside the box */}
        <div style={{ fontSize:20, fontWeight:900, color:"#1c1917", letterSpacing:"-0.02em", textAlign:"center", marginBottom:8 }}>Today&apos;s Game Plan</div>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#78716c", textAlign:"center", marginBottom:32, lineHeight:1.6, fontStyle:"italic" }}>Even 60% consistency compounds beautifully over months.</div>

        {/* Day sections */}
        {dayData.map((p, pi) => (
          <div key={p.period} ref={el => { periodRefs.current[p.period] = el; }} style={{ marginBottom: pi < dayData.length - 1 ? 44 : 0 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                <span style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>{p.period}</span>
                <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#44403c" }}>{p.time}</span>
                {activePeriod === p.period && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#f0fdf4", border:"1px solid #065f46", padding:"2px 8px", borderRadius:10 }}>
                    <span style={{ width:5, height:5, background:"#065f46", borderRadius:"50%", display:"inline-block" }} />
                    <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.04em" }}>Now</span>
                  </span>
                )}
              </div>
              {p.note && <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#065f46", marginTop:4, fontWeight:600 }}>{p.note}</div>}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {p.items.map(item => (
                <Card
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </div>
        ))}


        {/* Footer */}
        <div style={{ margin:"52px 0 40px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#065f46", fontWeight:600, marginBottom:6 }}>
            Every day counts.
          </p>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#78716c", lineHeight:1.6 }}>
            Every number on this page comes from an academic or scientific study. * from adult studies — whole foods deliver these pathways at lower but meaningful doses.
          </p>
        </div>
      </div>
    </div>
  );
}
