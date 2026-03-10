'use client';

import { useState, useEffect, useRef } from "react";
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';
import { useChildName } from '@/lib/useChildName';
import { getActiveChild } from '@/lib/children';

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
    { id:"wake", t:"Same wake time", sub:"±30 min, weekends too", gh:"tonight's growth", headline:"of tonight's GH depends on this morning", tier:1, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000", why:"Your child's height-driving hormone pulses tonight are programmed by this morning's wake time. The pituitary releases GH on a circadian schedule set by the suprachiasmatic nucleus. Brandenberger et al. showed normal sleep produces 3× more peak GH than disrupted sleep — the concentrated nocturnal surge is abolished without proper circadian timing. One late Saturday can disrupt pulse timing through Wednesday.", tip:"Same time ±30 min, including weekends. This is the easiest lever and it's free.",
      pumps:[
        { p:"Circadian programming", n:"60–80%", d:"Tonight's GH pulse timing set by today's wake time" },
        { p:"Normal sleep advantage", n:"3×", d:"Normal sleep = 3× more peak GH than disrupted" },
      ]},

    { id:"sun", t:"Morning sunlight + stretch", sub:"10 min outside — dead hang, fold over, cobra, cat-cow", gh:"melatonin trigger", headline:"melatonin tonight + spinal decompression — two levers in one", tier:1, cite:"Roenneberg, Curr Biol 2007; Forsling, J Pineal Res 1999; Nachemson, Scand J Rehabil Med 1970; Reilly, Ergonomics 1984", why:"Morning light hits melanopsin receptors — synchronizes the suprachiasmatic nucleus — programs melatonin release 14–16 hours from now. Melatonin raised GH up to 157% in adult studies AND inhibits aromatase (the enzyme that closes growth plates). Gravity compresses spinal discs all day — up to 1% of height lost by evening. Dead hang creates pure axial traction that rehydrates discs. Stretching both upper and lower body daily decompresses the spine and allows growth plates to recover. 5–10 minutes is enough — circadian clock + spinal decompression in one.", tip:"Backyard, bus stop walk, porch. Dead hang 3 × 20 sec (thumbs over bar, relax shoulders). Fold over, cobra, cat-cow. Upper and lower body. Overcast still works for light.",
      pumps:[
        { p:"Melatonin timing*", n:"up to 157%", d:"Tonight's melatonin set by this morning's light — raised GH 157% in adults" },
        { p:"Aromatase inhibition", n:"—", d:"Melatonin blocks estrogen — delays growth plate closure" },
        { p:"Vitamin D synthesis", n:"IGF-1 enabler", d:"Deficiency blunts the entire GH — IGF-1 axis" },
        { p:"Spinal decompression", n:"reverses 1%", d:"Dead hang reverses daily gravitational compression" },
      ]},


    { id:"d1", t:"The Growth Bowl / Smoothie", sub:"Same ingredients, two ways — bowl it or blend it · let them choose", gh:"+0.39 cm/day", headline:"each 8 oz of A2 milk/day = +0.39 cm across childhood", tier:0, cite:"Hoppe, Eur J Clin Nutr 2008; Kang, Nutrients 2019; Milan, Front Nutr 2020; Zhang, Front Nutr 2024; Isidori, Curr Med Res Opin 1981; Quabbe, JCEM 1983; Balmer, J Lipid Res 2002", why:"WHY SHEEP YOGURT?\n\nSheep milk is the most protein-dense dairy on earth. Up to 3× more total protein than cow milk, 35× more lactoferrin (the protein that directly triggers bone growth), 70% more casein (the slow-release protein that feeds growth overnight), and 5× less of the allergen that causes dairy sensitivity. It's naturally 100% A2 — zero A1. Fermentation into yogurt multiplies the benefits: it produces GABA (a natural growth signal), pre-digests proteins for easier absorption, and generates bioactive peptides.\n\nWHY THESE TOPPINGS?\n\nEvery ingredient earns its place. Peanut butter delivers niacin + arginine — two of the strongest growth-supporting aminos in food science. Pumpkin seeds add zinc (activates the growth axis at all 3 levels) + magnesium (deepens tonight's sleep). Berries add vitamin C that boosts seed iron absorption 2–3× while protecting growth plates. Chia seeds bring omega-3s. Hemp hearts bring complete protein. The sweetness from honey drives daily compliance — children ask for this bowl instead of resisting it.\n\nTHE SECRET: let children choose their own toppings. Choosing triggers dopamine, which is itself a growth signal.\n\nBOWL OR SMOOTHIE?\n\nSame ingredients, two formats. As a bowl: sheep yogurt base, toppings on top, eaten with a spoon. As a smoothie: blend everything with a bit more A2 milk for texture. The smoothie version is perfect for hiding cod liver oil — add ½ tsp lemon-flavored CLO and the berries mask it completely. They won't taste it. Either way, every growth lever is the same.\n\nBERRY TIP: Buy organic. If conventional: soak 12–15 min in baking soda water (1–2 tsp per quart), rinse — removes 66–98% of surface pesticides.\n\nDAILY TARGET: ~20–24 oz A2 milk equivalent across the day (morning bowl + post-sprint milk + Sleep Drink). 5 oz sheep yogurt = 8 oz A2 milk, so one bowl gets you nearly halfway.", tip:"Dairy FIRST (within 1 hour of waking), then eggs. BOWL: Sheep yogurt base → swirl in natural peanut butter → top with berries, pumpkin seeds, chia, hemp hearts → drizzle raw honey or maple. SMOOTHIE: Blend sheep yogurt or A2 milk + frozen berries + ½ banana + nut butter + chia seeds + ½ tsp lemon-flavored cod liver oil. Add more A2 milk for texture. Natural peanut butter only — no added oils or sugar.",
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
        { p:"Omega-3 (chia)", n:"anti-inflammatory", d:"Reduces inflammation at growth plates" },
        { p:"Retinol + D + Omega-3 (CLO in smoothie)", n:"receptor fuel", d:"Hidden ½ tsp lemon-flavored CLO delivers three growth levers — undetectable in berries" },
      ],
      foods:[
        { f:"Sheep yogurt, 5 oz (base)", d:"= 8 oz A2 milk. 35× more lactoferrin, 70% more casein, 100% A2. Gets you nearly halfway to the daily target." },
        { f:"Natural peanut butter, 1–2 tbsp", d:"Niacin + arginine. No added oils or sugar." },
        { f:"Berries (blueberries, strawberries, raspberries)", d:"Vitamin C + antioxidants. Organic preferred. Frozen = cheaper + thicker smoothie." },
        { f:"Pumpkin seeds, handful", d:"Zinc + arginine + magnesium + tryptophan." },
        { f:"Chia seeds, 1 tsp", d:"Omega-3s. Start small — they absorb 12× their weight. Blend fully for smoothie." },
        { f:"Hemp hearts, 1 tbsp", d:"Complete protein — all essential aminos." },
        { f:"Raw honey or maple drizzle", d:"Sweetness drives daily compliance." },
        { f:"A2 whole milk, 4–8 oz", d:"Casein + whey + calcium. Use as base for smoothie or alternate bowl base. Add more for smoothie texture." },
        { f:"½ banana (smoothie version)", d:"Potassium + natural sweetness. Makes the smoothie creamy." },
        { f:"Lemon-flavored cod liver oil, ½ tsp (smoothie version)", d:"Retinol + vitamin D + omega-3. Completely hidden by berries — you don't even taste it. Skip on beef liver days." },
        { f:"Collagen peptides, 1 scoop (optional, smoothie)", d:"Glycine + proline — growth plate building blocks." },
      ]},

    { id:"bkf", t:"Pasture-raised eggs — over easy", sub:"2–3 daily in olive oil · red bell pepper alongside · runny yolk = maximum nutrients", gh:"primes the whole day", headline:"choline from eggs primes the entire growth axis for the day", tier:0, cite:"Ziegenfuss, JISSN 2008; Zeisel, Nutr Rev 2009", why:"WHY OVER EASY?\n\nEggs are the richest whole-food source of choline — the compound that primes your child's growth axis for the entire day. Choline converts to acetylcholine, which activates the pituitary gland. This restarts the 24-hour cycle: last night's casein bridged overnight, now choline reignites everything.\n\nRunny yolk preserves 10–15% more choline, lutein, and B vitamins than scrambling or hard-boiling. Cooking in olive oil boosts absorption of fat-soluble vitamins A, D, E, K from the yolk.\n\nWHY RED BELL PEPPER?\n\n190mg vitamin C per cup — 3× more than an orange. Placed alongside eggs, it boosts iron absorption 2–3×. No cooking needed, just slice it.\n\nSKIP CEREAL. Always. One bowl spikes insulin and suppresses growth signals for 2–3 hours.", tip:"Over easy in olive oil — never hard-boiled for this meal. Red bell pepper slices alongside. No cheese — calcium competes with egg iron. Skip cereal — always.",
      pumps:[
        { p:"Choline → growth axis", n:"axis primer", d:"Two eggs ≈ 300mg choline — primes pituitary for the entire day" },
        { p:"Choline pathway*", n:"up to 4,400%", d:"A-GPC (choline metabolite) amplified growth signals 4,400% with exercise in adults" },
        { p:"Runny yolk advantage", n:"10–15% more", d:"Over easy preserves more choline, lutein, B vitamins than scrambled" },
        { p:"Vitamin C (bell pepper)", n:"2–3× iron", d:"190mg per cup — boosts egg iron absorption" },
      ],
      foods:[
        { f:"Pasture-raised eggs, 2–3 over easy", d:"In olive oil. Runny yolk = maximum choline." },
        { f:"Red bell pepper slices", d:"190mg vitamin C per cup — boosts iron 2–3×." },
      ]},

    { id:"clo", t:"Cod liver oil — ½ tsp daily", sub:"Retinol + vitamin D + omega-3s in one spoon — NOT on beef liver days", gh:"receptor fuel", headline:"of GH receptor function lost without retinol", tier:0, cite:"Balmer, J Lipid Res 2002; Soliman, Indian J Endocrinol Metab 2014", why:"CLO delivers three growth levers in one spoon. Retinol is required for GH receptor gene expression — deficiency cuts binding 40–60%. Vitamin D deficiency blunts GH — IGF-1 — growth plate pathway. Omega-3s are anti-inflammatory at the growth plate.", tip:"Best hidden in the Growth Smoothie — lemon-flavored CLO disappears in berries, you don't even taste it. Or take straight off the spoon. Skip on beef liver days — both deliver high-dose vitamins A and D.",
      pumps:[
        { p:"Retinol — GH receptors", n:"40–60%", d:"Deficiency reduces GH receptor binding" },
        { p:"Vitamin D — IGF-1", n:"axis enabler", d:"Deficiency blunts IGF-1 production" },
        { p:"Omega-3s", n:"anti-inflammatory", d:"Reduces inflammation at growth plate" },
      ]},


    { id:"cit", t:"Vitamin C with iron meals", sub:"Serve with any iron-rich meal", gh:"2–3× iron", headline:"iron absorption — iron delivers oxygen to growing tissues", tier:0, cite:"Hallberg, Am J Clin Nutr 1989; Chinese ISS RCT", why:"Vitamin C boosts iron absorption 2–3× — critical for oxygen delivery to growth plate chondrocytes. Citrus also delivers inositol (part of the lysine-inositol-B12 growth combo from the Chinese ISS RCT). Pair with beef, liver, lentils, eggs. Never serve milk alongside iron meals.", tip:"Any of the top 5 sources below alongside iron meals. Never dairy with iron.",
      pumps:[
        { p:"Iron absorption", n:"2–3×", d:"Vitamin C dramatically increases iron uptake" },
        { p:"Inositol", n:"ISS RCT", d:"Part of lysine-inositol-B12 growth combo" },
      ],
      foods:[
        { f:"1. Red bell peppers", d:"190mg per cup — 3× more than oranges." },
        { f:"2. Strawberries", d:"98mg per cup — kids love them." },
        { f:"3. Oranges / orange slices", d:"96mg per large orange." },
        { f:"4. Kiwi", d:"137mg per 2 kiwis — highest density per bite." },
        { f:"5. Broccoli", d:"81mg per cup — also delivers DIM for aromatase inhibition." },
      ]},

    { id:"ns", t:"No refined sugar until lunch", sub:"Natural sugars in milk, fruit, and honey are fine and part of the protocol · no artificial sweeteners ever", gh:"protects overnight growth", headline:"fasting GH — one cereal bowl suppresses up to 80%", tier:1, cite:"Lanzi, Metabolism 1999; Hartman, JCEM 1992", why:"This means refined and added sugar — cereal, juice, candy, flavored yogurts. Natural sugars in whole milk, fruit, and raw honey are completely fine and are part of the protocol. 60–80% of daily GH is produced during the morning fasting window. One bowl of cereal spikes insulin, suppressing GH for 2–3 hours. Ghrelin (hunger hormone) directly triggers GH — snacking keeps it suppressed. Artificial sweeteners disrupt gut bacteria responsible for GABA production (400% GH).", tip:"Eggs, dairy, fruit, meat for breakfast — all fine. The sugars to avoid are added/refined: cereal, juice boxes, candy. Never artificial sweeteners.",
      pumps:[
        { p:"Fasting GH", n:"300–500%", d:"Overnight fast produces 60–80% of daily GH" },
        { p:"Insulin avoided", n:"up to 80%", d:"One sugar spike blocks GH for 2–3 hours" },
        { p:"Ghrelin", n:"secretagogue", d:"Hunger directly triggers GH" },
        { p:"Microbiome integrity", n:"GABA protected", d:"No sweeteners — gut bacteria keep producing GABA" },
      ]},

    { id:"joy", t:"Laughter and play", sub:"Start the day light", gh:"stress ↓ cortisol ↓", headline:"from anticipation of fun alone — cortisol down 39% in adult study", tier:0, cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989", why:"In adult studies, merely anticipating a funny experience raised GH 87%, β-endorphins 27%, and reduced cortisol 39%. Chronic stress suppresses GH. Joy is not a bonus — it's a growth lever.", tip:"Morning dance party. Jokes at breakfast. Roughhousing before they leave.",
      pumps:[
        { p:"Anticipation of fun*", n:"up to 87%", d:"Anticipating humor raised GH 87% in adult study" },
        { p:"Cortisol reduction*", n:"↓39%", d:"Less cortisol = less GH suppression (adult study)" },
        { p:"β-endorphins*", n:"+27%", d:"Endorphins support hormonal environment (adult study)" },
      ]},

    { id:"bp", t:"Light backpack", sub:"Under 10–15% body weight", gh:"—", headline:"heavy loads compress developing spine", tier:3, cite:"Brackley, Spine 2004; Negrini, Spine 2002", why:"Chronic heavy loads affect intervertebral disc height during the years when the spine should be lengthening. Combined with daily gravitational compression, an overweight backpack amplifies the problem.", tip:"Weigh it. Remove what they don't need. A rolling backpack eliminates the issue." },

  ]},

  { period:"Afternoon", time:"around lunch through late afternoon", note:"THE SPRINT STACK — the most powerful combination in the protocol. Pre-sprint snack → all-out sprints → cold milk with honey. Your child already sprints at practice — this turns every sprint into a growth event.", items:[
    { id:"lunch", t:"The Growth Meal", sub:"Rotate: liver meatballs · oysters · salmon · turkey · beef — with sauerkraut + lentils + broccoli + seeds", gh:"15+ pathways", headline:"15+ growth pathways activated in one meal — primes the afternoon sprint", tier:0, cite:"Isidori, Curr Med Res Opin 1981; Larnkjaer, J Nutr 2012; Quabbe, JCEM 1983", why:"WHY THESE FOODS?\n\nEvery item in this meal earns its place by activating a specific growth pathway. Together they stack 15+ pathways in a single sitting — more than any supplement can touch.\n\nBEEF LIVER MEATBALLS (2–3×/wk): Mix 2 tbsp liver into ground beef, form meatballs — kids won't taste it. Highest choline density of any food (primes the entire growth axis) plus retinol, B12, niacin, iron, zinc. The single most nutrient-dense food that exists.\n\nOYSTERS (1×/wk): 28.2mg zinc in 3 oz — a full week's supply in one serving. Zinc activates the growth axis at all 3 levels. Pan-seared or in stew.\n\nSALMON (2×/wk): Omega-3s support IGF-1 production. Vitamin D enables the entire growth plate pathway. Any preparation works.\n\nSAUERKRAUT/KIMCHI: Even 2 tbsp counts. Fermentation produces GABA — a natural growth signal that also suppresses the hormone that brakes growth.\n\nLENTILS + CITRUS: The lysine-inositol-B12 combination from a clinical growth trial. Vitamin C alongside boosts iron 2–3×.\n\nBROCCOLI: Contains DIM — delays growth plate closure by blocking the enzyme that converts testosterone to estrogen.\n\nNO DAIRY at this meal — save milk for post-sprint.", tip:"Batch-cook liver meatballs and feed throughout the week. Sauerkraut as a side — even 2 tbsp counts. Pumpkin seeds on top of anything. Broccoli at every lunch. Vitamin C alongside iron foods. NO DAIRY here.",
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
        { f:"Beef liver meatballs 2–3×/wk", d:"2 tbsp liver mixed into ground beef. Kids won't taste it. Pair with vitamin C, NOT milk." },
        { f:"Cooked oysters 1×/wk", d:"Full week's zinc in one serving. Pan-seared or in stew." },
        { f:"Wild salmon 2×/wk", d:"Omega-3s + vitamin D + niacin. Any preparation." },
        { f:"Turkey breast", d:"Highest niacin + arginine per gram of any common meat." },
        { f:"Beef (any cut) — daily", d:"Richest source of glutamine + ornithine + tyrosine." },
        { f:"Sauerkraut or kimchi", d:"Even 2 tbsp counts. Produces GABA naturally." },
        { f:"Lentils + citrus", d:"Growth combo from clinical trial. Vitamin C boosts iron 2–3×." },
        { f:"Broccoli", d:"DIM — keeps growth plates open longer." },
        { f:"Pumpkin seeds", d:"Zinc + arginine + magnesium (+0.33cm/yr)." },
      ]},

    { id:"water", t:"Water or milk between meals", sub:"No juice boxes, no soda, no sweeteners · A2 milk is fine and encouraged", gh:"protects growth window", headline:"protected — each sugar spike suppresses up to 80%", tier:2, cite:"Lanzi, Metabolism 1999; Kojima, Nature 1999", why:"Every juice box triggers an insulin spike that shuts down GH for 2–3 hours. Allow 3–4 hour gaps — ghrelin directly triggers GH. Artificial sweeteners disrupt GABA-producing gut bacteria.", tip:"For a soda replacement: sparkling water with ice + a small splash of real juice (pomegranate, orange, tart cherry). Gives the fizzy flavor pop without the sugar load. Otherwise water or milk between meals.",
      pumps:[
        { p:"Insulin avoided", n:"up to 80%", d:"Each sugar spike blocks GH 2–3 hours" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Meal gaps let ghrelin trigger GH" },
        { p:"Microbiome", n:"GABA protected", d:"No sweeteners — bacteria keep producing GABA" },
        { p:"Healthy body composition", n:"sustained GH", d:"Less sugar — less visceral fat — higher baseline GH" },
      ]},

    { id:"nap", t:"No naps after 2–3pm", sub:"Steals tonight's deep sleep", gh:"tonight's growth", headline:"of tonight's GH at risk — late naps steal adenosine", tier:2, cite:"Milner, J Sleep Res 2009; Brandenberger, Lancet 2000", why:"Naps after 3pm steal adenosine sleep pressure needed for deep slow-wave sleep. The first SWS cycle — the one most disrupted by late naps — contains the single largest GH pulse of the day.", tip:"If they truly need a nap, before 2pm and under 30 minutes." },

    { id:"pre", t:"Pre-sprint snack — 1 meatball, 1 egg, a few peanuts", sub:"~60 min before sprints · very light — NOT a full meal · choline + niacin prime the sprint GH response", gh:"primes the sprint", headline:"choline + niacin prime the sprint GH response", tier:1, cite:"Stokes, J Appl Physiol 2008; Ziegenfuss, JISSN 2008; Quabbe, JCEM 1983", why:"This should be very light — a snack, not a meal. About 60 minutes before sprints, serve 1 beef liver meatball (2 tbsp liver mixed into ground beef — batch-cook and keep in fridge), 1 over easy egg, and a small handful of peanuts. The meatball loads the A-GPC choline pathway. The egg adds a second choline wave. Peanuts deliver niacin — which blocks free fatty acids, a molecular brake on GH. Stokes (2008): niacin amplified second sprint GH to ~23.3 μg/L vs ~5.2 controls (~350% greater peak, ~422% greater AUC) in adult athletes. Keep it light so blood flow goes to muscles, not digestion.", tip:"1 beef liver meatball + 1 over easy egg + a few peanuts, ~60 min before sprints. That's it — very light. No dairy with liver — iron. Save milk for post-sprint. Do NOT take cod liver oil on beef liver days.",
      pumps:[
        { p:"Meatball choline*", n:"up to 4,400%", d:"1 beef liver meatball ~60 min before — loads A-GPC pathway for peak GH amplification" },
        { p:"Egg choline (2nd wave)*", n:"up to 4,400%", d:"A-GPC (choline metabolite) raised GH up to 4,400% with exercise in adults" },
        { p:"Niacin (peanuts)*", n:"up to 350%", d:"Stokes: niacin + sprint → 350% greater GH peak; Quabbe: niacin alone → >1,000% GH in adults" },
        { p:"Liver niacin*", n:"up to 350%", d:"Beef liver also high in niacin — double-primes the sprint with peanuts" },
        { p:"Arginine", n:"GH support", d:"Peanuts deliver arginine — direct GH secretagogue" },
        { p:"Glutamine (egg)*", n:"up to 400%", d:"Glutamine raised GH 4-fold in adult supplement study" },
        { p:"Retinol (liver)", n:"GH receptor", d:"Preformed vitamin A — essential for GH receptor expression" },
      ]},

    { id:"spr", t:"6 × 30-sec all-out sprints", sub:"MON / WED / FRI — alternate days with jumping (never both same day)", gh:"strongest lever", headline:"per sprint in adult studies — nothing in nutrition comes close", tier:0, cite:"Stokes, J Sports Sci 2002; Nevill, J Appl Physiol 1996", why:"In adult studies, a single 30-second sprint produced a 530% GH spike. Even 6 seconds = 217%. The trigger is lactate — only at true maximum effort. With pre-sprint choline + niacin, every sprint is maximized. ROTATION: Sprint days and jump days alternate — never do both on the same day. Example: Mon/Wed/Fri sprints, Tue/Thu/Sat jumps. Recovery between sessions is when growth happens.", tip:"Tag, races, hill sprints — as long as it's genuinely all-out. Hill sprints produce higher lactate. 2–4 min FULL rest between sprints. Sprint days: Mon / Wed / Fri. Jump days: Tue / Thu / Sat. Sunday: rest.",
      pumps:[
        { p:"Sprint GH*", n:"up to 530%", d:"Per 30-second all-out sprint in adult studies" },
        { p:"With choline*", n:"up to 4,400%", d:"A-GPC (choline pathway) raised GH up to 4,400% with exercise in adults" },
        { p:"With niacin*", n:"up to 350%", d:"Stokes: niacin + sprint → 350% GH amplification; Quabbe: niacin alone → >1,000% GH in adults" },
        { p:"Mechanical loading", n:"growth plates", d:"Direct growth plate stimulation" },
        { p:"6-sec sprint*", n:"up to 217%", d:"Even a 6-second sprint raised GH 217% in adult study" },
        { p:"Healthy body composition", n:"sustained GH", d:"Sprint training maintains lean body comp" },
      ]},

    { id:"jump", t:"Jumping protocol", sub:"TUE / THU / SAT — alternate days with sprints (never both same day)", gh:"+4.3 cm", headline:"in 24 weeks — IGF-1 up, bone density +1.08", tier:0, feat:true, cite:"Zribi, J Pediatr Endocrinol Metab; PMC9135997", why:"24-week study of short-stature children: +4.32 cm vs 0.93–1.84 cm in controls. IGF-1 increased. Femoral neck BMD +1.08 (Cohen's d ≈ 0.87). Zero injuries. Preschool study (ages 3–6): height gain exceeded national averages. ROTATION: Jump days and sprint days alternate — never do both on the same day. Example: Tue/Thu/Sat jumps, Mon/Wed/Fri sprints. Recovery between sessions is when growth happens.", tip:"50–100 jumps: jump rope, drop jumps from 20–40cm platforms, single-leg hops. HR target: 128–155 bpm. Jump days: Tue / Thu / Sat. Sprint days: Mon / Wed / Fri. Sunday: rest. Always followed by stretching.",
      pumps:[
        { p:"Height gain", n:"+4.3cm", d:"In 24 weeks vs ~1cm controls" },
        { p:"IGF-1 increase", n:"significant", d:"Growth plate signaling upregulated" },
        { p:"Bone density", n:"+1.08", d:"Femoral neck BMD. Persists years." },
        { p:"Cortisol ↓", n:"39%", d:"Fun play lowers cortisol" },
      ]},

    { id:"stretch", t:"10 min stretching", sub:"Dead hang, cobra, cat stretch — after sprints", gh:"↑ velocity", headline:"ISS RCT: exercise + nutrition doubled height velocity at 12mo", tier:0, cite:"Chinese ISS RCT (12-month); Zribi, J Pediatr Endocrinol Metab", why:"12-month RCT in short-stature children: moderate stretching + lysine-inositol-B12 produced significantly greater height velocity than supplementation alone. More days/week = better. Excessive minutes/day = counterproductive. Stretching decompresses the spine and allows growth plates to recover.", tip:"ALWAYS after sprints or jumping. Dead hang 30+ sec × 3. Cobra pose. Cat-cow. Forward fold. This is when their body grows — during recovery.",
      pumps:[
        { p:"Stretch + nutrition synergy", n:"↑ velocity", d:"Combo beats nutrition alone" },
        { p:"GH elevation", n:"significant", d:"Higher GH markers at 12 months" },
        { p:"Spinal decompression", n:"reverses 1%", d:"Dead hang reverses daily compression" },
      ]},

    { id:"pm", t:"A2 milk + raw honey after sprints — ALWAYS!", sub:"8–12 oz cold A2 milk + 1 tbsp raw honey · immediately after any physical activity", gh:"24-hr growth signal", headline:"GH to IGF-1 conversion — still 451% above baseline at 24h in adult study", tier:0, sig:true, cite:"Zajac, Biol Sport 2018; Cappon, J Appl Physiol 1994", why:"Without milk after sprints, the GH spike is 'orphaned' — present but not converted to IGF-1 (the actual growth signal). Whey provides immediate aminos. Raw honey's gentle insulin activates the STAT5 pathway, converting GH to IGF-1. Casein slow-releases for hours, bridging to the Sleep Drink. Counts toward the daily 20–24 oz A2 milk target.", tip:"Cold milk, raw honey, immediately after stretching. This is a DAIRY window. Non-sprint days: same drink after school.",
      pumps:[
        { p:"GH to IGF-1*", n:"up to 451%", d:"Zajac: still 451% above baseline at 24h in adult athletes" },
        { p:"IGF-1*", n:"+14%", d:"14% higher than controls at 24h in adult study" },
        { p:"Casein", n:"6–7 hrs", d:"Bridges to Sleep Drink at bedtime" },
        { p:"α-Lactalbumin*", n:"up to 157%", d:"Tryptophan — melatonin — raised GH 157% in adults" },
        { p:"Lysine + Arginine*", n:"up to 700%", d:"Milk delivers both — raised GH up to 700% in adult supplement studies" },
      ]},
  ]},

  { period:"Late Afternoon", time:"after school", items:[
    { id:"rest", t:"Rest and play", sub:"Unstructured time with friends", gh:"stress ↓ cortisol ↓", headline:"anticipation of fun raised GH 87% in adult study — cortisol down 39%", tier:1, cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989", why:"Unstructured play is growth time. In adult studies, anticipation of fun raised GH 87% and reduced cortisol 39%. Chronic stress from overscheduling is one of the strongest GH suppressors.", tip:"No homework pressure right after school. Play first, eat, then homework. No competitive sports in the evening." },
  ]},

  { period:"Evening", time:"wind-down hours", note:"Do these in order. By the end, they're drowsy.", items:[
    { id:"nox", t:"No vigorous exercise close to bedtime", sub:"Core temp must drop for deep sleep — aim for 2+ hrs gap", gh:"tonight's growth", headline:"of tonight's GH at risk — late exercise delays sleep onset", tier:2, cite:"Stutz, Sports Med 2019; Brandenberger, Lancet 2000", why:"Core body temp must drop 1–1.5°C to initiate deep sleep. Vigorous exercise within 2 hours of bed raises it, delaying sleep onset and compressing the SWS window.", tip:"Save all sports for afternoon. No competitive evening games." },

    { id:"din", t:"Dinner", sub:"Bone broth starter · rotated protein · lentils + broccoli · no dairy here — save milk for Sleep Drink · aim to finish 2–3 hrs before bed", gh:"10+ pathways", headline:"glycine from bone broth lowers core temp for sleep AND builds growth plate collagen", tier:0, cite:"Welbourne, Am J Clin Nutr 1995; Kasai, Metabolism 1980", why:"WHY BONE BROTH?\n\nBone broth is the richest food source of glycine — an amino acid that does three things at once: (1) directly signals growth, (2) lowers core body temperature to trigger deeper sleep, and (3) is the primary building block of growth plate cartilage. A mug of broth as a dinner starter is one of the highest-leverage habits in the protocol.\n\nWHY NO DAIRY AT DINNER?\n\nCalcium competes with iron absorption. The meats and lentils at dinner deliver iron — you want maximum absorption. Save all milk for the Sleep Drink at bedtime, when casein can slow-release aminos through the night.\n\nTHE DINNER FORMULA: Bone broth starter → any rotated protein (beef, chicken, turkey, salmon) → lentils with citrus → broccoli. Done by 6pm so the fasting window can begin.", tip:"Mug of bone broth as a starter or soup base. Rotate proteins nightly. Lentils in soup, stew, or as a side with citrus. Broccoli at every dinner. Aim to finish 2–3 hours before their bedtime. NO DAIRY.",
      pumps:[
        { p:"Glycine (broth)*", n:"up to 300%", d:"Growth signal + lowers core temp for sleep + builds growth plates" },
        { p:"Glutamine (beef)*", n:"up to 400%", d:"Beef is the richest dietary source" },
        { p:"DIM (broccoli)", n:"plates stay open", d:"Delays growth plate closure" },
        { p:"Iron (beef + lentils)", n:"growth enabler", d:"Oxygen delivery to growing tissues" },
        { p:"Plant protein (lentils)", n:"longer growth window", d:"Associated with later puberty" },
      ],
      foods:[
        { f:"Bone broth (starter)", d:"Richest glycine source — growth signal + sleep trigger + growth plate builder." },
        { f:"Beef, chicken, turkey, salmon", d:"Rotate nightly. All deliver key growth-supporting aminos." },
        { f:"Lentils + citrus", d:"Iron + lysine + inositol. Vitamin C boosts absorption 2–3×." },
        { f:"Broccoli", d:"DIM — keeps growth plates open longer." },
      ]},

    { id:"gly", t:"Bovine gelatin jello with tart cherry", sub:"Glycine dessert — gelatin + tart cherry juice + allulose or monk fruit", gh:"sleep + growth plates", headline:"glycine — GH secretagogue + lowers core temp + growth plate collagen", tier:1, cite:"Kawai, Neuropsychopharmacology 2015; Kasai, Metabolism 1980", why:"Bovine gelatin is pure collagen — the richest source of glycine available. Glycine: (1) lowers core temp via NMDA receptors — triggers sleep onset, (2) a direct GH secretagogue (raised GH up to 300% in adult studies), (3) most abundant amino acid in collagen — the structural protein of growth plates. Adding tart cherry juice delivers melatonin (the highest food source) plus aromatase inhibition. Use allulose or monk fruit to sweeten — no insulin spike.", tip:"Dissolve bovine gelatin in warm tart cherry juice, add allulose or monk fruit, set in fridge. Kids think it's regular jello. Gelatin powder has no taste — mix into anything.",
      pumps:[
        { p:"Glycine — GH*", n:"up to 300%", d:"Glycine raised GH up to 300% in adult studies" },
        { p:"Sleep onset", n:"core temp ↓", d:"Lowers body temp — initiates deep sleep" },
        { p:"Growth plate collagen", n:"structural", d:"Glycine + hydroxyproline + proline" },
      ]},

    { id:"nse", t:"Evening snacks", sub:"Homemade gummies, pistachios, pumpkin seeds · no refined sugar — monk fruit, allulose, or raw honey", gh:"protects overnight growth", headline:"overnight GH protected — each spike blocks up to 80%", tier:1, cite:"Lanzi, Metabolism 1999; Van Cauter, JCEM 1992", why:"60–80% of GH is released overnight. Refined sugar is the enemy here — one scoop of regular ice cream suppresses up to 80% via insulin. Raw honey and natural sugars in fruit are fine in small amounts. Monk fruit and allulose don't spike insulin at all. Homemade gummies (gelatin + tart cherry + allulose) deliver glycine + melatonin. Pistachios have the highest melatonin per gram of any nut — the perfect evening snack. Pumpkin seeds deliver arginine + zinc + magnesium + tryptophan. Homemade ice cream (A2 cream + egg yolks + monk fruit) counts toward daily dairy.", tip:"These replace store-bought snacks with refined sugar. Raw honey and fruit are fine. Pistachios are the go-to evening snack — highest melatonin of any nut.",
      pumps:[
        { p:"Overnight GH protected", n:"300–500%", d:"No refined sugar = no insulin suppression" },
        { p:"Glycine (gummies)*", n:"up to 300%", d:"Gelatin delivers glycine — GH secretagogue + sleep + growth plates" },
        { p:"Melatonin (gummies)", n:"sleep + GH", d:"Tart cherry = highest food melatonin source" },
        { p:"Casein (ice cream)", n:"slow-release", d:"A2 cream base — slow amino delivery overnight. Counts toward daily dairy" },
        { p:"Arginine (peanuts)", n:"GH support", d:"Unroasted peanuts + niacin + magnesium" },
        { p:"Melatonin (pistachios)", n:"sleep + GH", d:"Highest melatonin per gram — best evening nut" },
      ],
      foods:[
        { f:"Homemade gummies (gelatin + tart cherry + allulose)", d:"Glycine (GH secretagogue) + melatonin (sleep + aromatase inhibition). Set in fridge." },
        { f:"Homemade ice cream (A2 cream + egg yolks + monk fruit)", d:"Casein (slow-release aminos overnight) + choline. Counts toward daily dairy." },
        { f:"Unroasted peanuts / natural PB", d:"Niacin + arginine + magnesium — all GH-supporting nutrients." },
        { f:"Pistachios (evening)", d:"Highest melatonin per gram of any nut. Best evening snack." },
        { f:"Pumpkin seeds", d:"Arginine + magnesium + zinc + tryptophan." },
      ]},

    { id:"nlf", t:"Finish food 2–3 hrs before bed", sub:"Protects overnight fasting window", gh:"protects overnight growth", headline:"overnight fast = when 60–80% of GH is produced", tier:2, cite:"Crispim, J Clin Sleep Med 2011; Hartman, JCEM 1992", why:"The overnight fast is when GH peaks. Eating close to bed keeps insulin elevated and disrupts sleep architecture. Exception: Sleep Drink (~55 calories) is too small to suppress.", tip:"Aim for 2–3 hours between last food and bedtime. The exact time depends on your family's schedule.",
      pumps:[
        { p:"Fasting GH", n:"300–500%", d:"Overnight fast produces 60–80% of daily GH" },
        { p:"Insulin cleared", n:"up to 80%", d:"Insulin must clear for GH to fire" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Meal gaps let ghrelin trigger GH" },
      ]},

    { id:"nsc", t:"No screens after dinner", sub:"Or Night Shift + blue light glasses", gh:"melatonin trigger", headline:"melatonin at risk — blue light suppresses 90+ min", tier:1, cite:"Gooley, JCEM 2011; Figueiro, Neuro Endocrinol Lett 2011", why:"Blue light suppresses melatonin for 90+ minutes. Melatonin raised GH up to 157% in adult studies + provides aromatase inhibition. Every minute of screen time after dinner steals from tonight's GH surge.", tip:"TV better than tablets — distance matters. If unavoidable: Night Shift + blue light glasses.",
      pumps:[
        { p:"Melatonin — GH*", n:"up to 157%", d:"Blue light suppresses melatonin — raised GH 157% in adult studies" },
        { p:"Aromatase inhibition", n:"plates stay open", d:"Melatonin blocks estrogen — delays closure" },
        { p:"SWS depth", n:"60–80%", d:"Melatonin deepens slow-wave sleep" },
      ]},

    { id:"bath", t:"Warm bath with Epsom salts", sub:"20 min before wind-down", gh:"tonight's growth", headline:"core temp drop after — fastest SWS onset", tier:1, cite:"Krauchi, Nature 1999; Haghayegh, Sleep Med Rev 2019", why:"Warm bath raises peripheral blood flow — when you get out, core temp drops rapidly — this accelerated cooling signals sleep onset and deepens SWS. Epsom salts add transdermal magnesium. The first SWS cycle contains the largest GH pulse of the day.", tip:"10–20 minutes, warm not hot. Add Epsom salt.",
      pumps:[
        { p:"Core temp drop", n:"faster SWS", d:"Accelerated cooling — deeper sleep onset" },
        { p:"Magnesium (Epsom)", n:"SWS amplifier", d:"Transdermal magnesium deepens slow-wave sleep" },
        { p:"First GH pulse", n:"largest", d:"First SWS cycle = largest GH pulse of the day" },
        { p:"Cortisol reduction", n:"parasympathetic", d:"Warm water activates parasympathetic tone" },
        { p:"Sensory ritual", n:"anticipatory", d:"Brain associates bath with sleep after 1–2 weeks" },
      ]},

    { id:"mag", t:"Magnesium glycinate lotion", sub:"Feet and shoulders", gh:"deep sleep amplifier", headline:"GABA receptor activation — deepens slow-wave sleep", tier:1, cite:"Held, Pharmacopsychiatry 2002; Abbasi, J Res Med Sci 2012", why:"Magnesium activates GABA-A receptors — suppresses somatostatin — removes the brake on GH. Transdermal application bypasses digestion. The consistent touch ritual triggers a parasympathetic response after 1–2 weeks.", tip:"Rub on feet and shoulders while they read.",
      pumps:[
        { p:"GABA receptor activation*", n:"up to 400%", d:"GABA raised GH 400% in adult studies — magnesium activates GABA receptors" },
        { p:"SWS depth", n:"amplifier", d:"Deepens slow-wave sleep" },
        { p:"Sensory ritual", n:"conditioned", d:"Touch cue triggers parasympathetic nightly" },
        { p:"Melatonin support*", n:"up to 157%", d:"Magnesium supports melatonin synthesis — melatonin raised GH 157% in adults" },
        { p:"Parasympathetic activation", n:"sleep onset", d:"Touch ritual triggers parasympathetic response" },
        { p:"Cortisol reduction", n:"calming", d:"Consistent touch ritual lowers cortisol" },
      ]},

    { id:"drink", t:"The Sleep Drink", sub:"4 oz A2 milk + 1 oz tart cherry juice · unsweetened · 60 min before bed", gh:"24-hr growth signal", headline:"the 24-hour cycle completes — GH 451% at 24h in adult study, IGF-1 +14%", tier:0, sig:true, cite:"Zajac, Biol Sport 2018; Howatson, Eur J Nutr 2012; Forsling, J Pineal Res 1999", why:"The signature bioKids ritual. Everything unsweetened, no added sugar — sugar close to bed fragments sleep and blunts GH pulses after midnight. Casein slow-releases aminos 6–7 hours feeding GH pulses all night. Tart cherry = highest food melatonin (melatonin raised GH 157% in adult studies + aromatase inhibition). α-Lactalbumin = highest tryptophan — serotonin — melatonin. In the Zajac study (adults), GH remained 451% above baseline at 24 hours, IGF-1 14% higher. ~55 calories — too small to spike insulin. Use 100% tart cherry juice ONLY — no blends, no added sugar. This is the 24-hour cycle: post-sprint milk then Sleep Drink then casein overnight then morning eggs restart. Some GH lever is always on.", tip:"Mix, serve 60 min before bed. Unsweetened — no honey, no sugar. 100% tart cherry juice only. This is a DAIRY window. Dim lights after.",
      pumps:[
        { p:"GH at 24h*", n:"up to 451%", d:"Zajac: still 451% above baseline at 24h in adult athletes" },
        { p:"IGF-1*", n:"+14%", d:"14% higher than controls in adult study" },
        { p:"Melatonin (cherry)*", n:"up to 157%", d:"Highest food melatonin — raised GH 157% in adults + aromatase block" },
        { p:"Casein overnight", n:"6–7 hrs", d:"Slow-release aminos all night" },
        { p:"24-hour cycle", n:"always on", d:"Post-sprint — Sleep Drink — overnight — eggs restart" },
        { p:"Cortisol ↓ (cherry)", n:"↓ stress", d:"Tart cherry reduces cortisol" },
      ]},

    { id:"rtn", t:"Same routine every night", sub:"Bath — lotion — drink — books — bed", gh:"melatonin trigger", headline:"brain auto-releases melatonin when routine starts", tier:0, cite:"Mindell, Sleep 2015; Mindell, Sleep 2009", why:"After 1–2 weeks, the brain starts releasing melatonin as soon as it recognizes the familiar sequence — before lights are off. Melatonin raised GH up to 157% in adult studies. The routine itself becomes a GH lever.", tip:"Same order, always. They stop fighting bedtime.",
      pumps:[
        { p:"Anticipatory melatonin*", n:"up to 157%", d:"Melatonin raised GH 157% in adult studies — routine auto-triggers it" },
        { p:"Sensory ritual", n:"conditioned", d:"After 1–2 weeks the sequence itself triggers sleep" },
        { p:"Cortisol reduction", n:"predictability", d:"Predictable routines lower cortisol in children" },
      ]},

    { id:"cool", t:"Cool room", sub:"65–68°F + fan for pink noise", gh:"tonight's growth", headline:"core temp must drop 2–3°F for deep sleep", tier:2, cite:"Krauchi, Nature 1999; Brandenberger, Lancet 2000", why:"The body must lower core temperature by 1–1.5°C to initiate SWS — where the massive nocturnal GH surge occurs. Cool room + warm blanket = fastest path.", tip:"Crack a window, use a fan. Fan doubles as pink noise." },

    { id:"dark", t:"Complete darkness", sub:"Blackout curtains — tape every LED", gh:"tonight's growth", headline:"even dim light suppresses 50%+ of melatonin-driven GH", tier:0, cite:"Brandenberger, Lancet 2000; Gooley, JCEM 2011", why:"Normal sleep produces a single massive GH surge — 3× greater peak than disrupted sleep. Even a small LED suppresses melatonin-driven GH by 50%+. Every lever today builds to this one nocturnal surge.", tip:"Blackout curtains are the single best investment. Tape every LED. Red nightlight only." },

    { id:"bed", t:"Early, consistent bedtime", sub:"Target 10–12 hours of sleep · the exact time fits your family", gh:"tonight's growth", headline:"each 90-min cycle is one 'growth rep' — 11 hrs = 7–8 reps", tier:0, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000; Takahashi, J Clin Invest 1968", why:"Everything today builds to this. Normal sleep = 3× more peak GH. Each 90-minute cycle is one 'growth rep.' 11 hours = 7–8 reps. 8 hours = only 5. With every lever activated — choline-primed pituitary, sprint-triggered lactate, IGF-1 conversion, amino reloading, GABA, glycine, melatonin, casein slow-releasing, core temp dropped, complete darkness — the 24-hour cycle begins again tomorrow with eggs.", tip:"10–12 hours. Non-negotiable. This is the most important item on the entire page." },

    { id:"airway", t:"Nose breathing only! Mouth breathing quietly impairs height", sub:"Mouth breathing at night reduces height-driving hormone secretion — improves after treatment", gh:"tonight's growth at risk", headline:"fragmented sleep + hypoxia suppress the overnight height surge", tier:0, cite:"Morais-Almeida, Wandalsen & Solé, J Pediatr (Rio J) 2019", why:"A systematic review of 20 studies found that mouth-breathing children have reduced height-driving hormone release linked to fragmented sleep and hypoxia. Mouth breathing often signals an underlying airway obstruction — enlarged adenoids, tonsils, or allergic rhinitis — that fragments deep slow-wave sleep and reduces oxygen saturation. Since 60–80% of daily height-driving hormone is released during slow-wave sleep, anything that disrupts it directly suppresses growth. The good news: height-driving hormone secretion improves after effective treatment of the airway problem (adenotonsillectomy, nasal steroids, myofunctional therapy, or orthodontic expansion). The review concludes that mouth breathing should be considered a potential cause of growth retardation in children.", tip:"Watch your child sleep. If their mouth is open, they snore, or they breathe loudly — talk to your pediatrician or an ENT. Fixing the airway can restore normal height-driving hormone secretion.",
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
function Card({ item, isOpen, onToggle, done, onDone }: {
  item: DayItem;
  isOpen: boolean;
  onToggle: () => void;
  done: boolean;
  onDone: () => void;
}) {
  const isSig = item.sig || item.tier === 0;
  const isUtil = item.tier >= 3;
  const noGH = !item.gh || item.gh === "—";

  return (
    <div style={{
      background: isSig ? "#f0fdf4" : "#fff",
      borderRadius: isSig ? 20 : 14,
      border: isSig ? "1.5px solid #065f46" : item.feat ? "2px solid #fbbf24" : "1px solid #e7e5e4",
      overflow:"hidden",
      opacity: done ? 0.55 : 1,
      transition:"all 0.3s ease",
      boxShadow: isSig ? "0 4px 24px rgba(6,95,70,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      {/* Collapsed view */}
      <div onClick={onToggle} style={{ cursor:"pointer", padding: isSig ? "18px 20px" : isUtil ? "12px 16px" : "14px 18px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
          {/* Check circle */}
          <div
            onClick={e => { e.stopPropagation(); onDone(); }}
            style={{
              width:22, height:22, borderRadius:11, flexShrink:0, marginTop:1,
              border: done ? "none" : "2px solid #d6d3d1",
              background: done ? "#065f46" : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", transition:"all 0.2s ease",
            }}
          >
            {done && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>

          <div style={{ flex:1, minWidth:0 }}>
            {/* Title + GH number */}
            <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
              <span style={{
                fontSize: isSig ? 16 : isUtil ? 13.5 : 14.5,
                fontWeight:700,
                color: done ? "#78716c" : "#1c1917",
                lineHeight:1.3,
                textDecoration: done ? "line-through" : "none",
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
  const allItems = dayData.flatMap(d => d.items);
  const total = allItems.length;
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round((doneCount / total) * 100);

  // Core items = green-bordered cards (tier 0 or sig)
  const coreItems = allItems.filter(i => i.sig || i.tier === 0);
  const coreTotal = coreItems.length;
  const coreDoneCount = coreItems.filter(i => done[i.id]).length;
  const corePct = coreTotal > 0 ? Math.round((coreDoneCount / coreTotal) * 100) : 0;
  const allCoreDone = coreDoneCount === coreTotal && coreTotal > 0;
  const allDone = doneCount === total && total > 0;

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

    // Auto-scroll to current period after a brief delay for render
    setTimeout(() => {
      const el = periodRefs.current[current];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Offset for nav
        setTimeout(() => window.scrollBy(0, -80), 400);
      }
    }, 300);
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

      {/* Sticky progress bar — floats at top while scrolling */}
      {doneCount > 0 && (
        <div style={{
          position:"sticky", top:0, zIndex:90,
          background: allCoreDone ? "rgba(236,253,245,0.95)" : "rgba(250,250,249,0.92)",
          backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
          borderBottom: allCoreDone ? "1px solid #86efac" : "1px solid #e7e5e4",
          padding:"10px 20px 12px",
          transition:"all 0.5s ease",
        }}>
          <div style={{ maxWidth:540, margin:"0 auto" }}>
            {/* Core progress + streak */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
              <span style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color: allCoreDone ? "#065f46" : "#78716c" }}>
                  {allCoreDone ? "Core goals complete" : "Core goals"}
                </span>
                {streak > 0 && (
                  <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, fontWeight:700, color:"#065f46", background:"#f0fdf4", border:"1px solid #86efac", borderRadius:8, padding:"1px 7px" }}>
                    Day {streak}
                  </span>
                )}
              </span>
              <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:15, color:"#065f46" }}>
                {coreDoneCount}/{coreTotal}
              </span>
            </div>
            <div style={{ height:4, borderRadius:2, background: allCoreDone ? "#86efac" : "#e7e5e4", overflow:"hidden", marginBottom:6 }}>
              <div style={{ height:"100%", borderRadius:2, background:"#065f46", width:`${corePct}%`, transition:"width 0.4s ease" }} />
            </div>
            {/* Bonus progress (secondary — smaller) */}
            {(doneCount - coreDoneCount > 0 || allCoreDone) && (
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#44403c" }}>
                  {allDone ? "Everything done" : "Bonus"}
                </span>
                <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:11, color:"#1c1917", fontWeight:700 }}>
                  {doneCount - coreDoneCount}/{total - coreTotal}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ maxWidth:540, margin:"0 auto", padding:"0 20px" }}>

        {/* Header */}
        <div style={{ paddingTop:48, paddingBottom:0 }}>
          <p
            onClick={() => setIntroOpen(o => !o)}
            style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:16, fontWeight:600, color:"#1c1917", lineHeight:1.55, maxWidth:460, marginBottom: introOpen ? 16 : 0, cursor:"pointer" }}
          >
            {childName === 'Your child' ? 'Your child' : childName}&apos;s daily growth protocol.
            <span style={{ color:"#065f46", fontSize:9, transition:"transform 0.2s ease", transform: introOpen ? "rotate(180deg)" : "none", display:"inline-block", marginLeft:6 }}>▼</span>
          </p>

          {introOpen && <>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, color:"#1c1917", lineHeight:1.75, maxWidth:440, margin:"0 0 8px" }}>
              Meals, sprints, and sleep — arranged by science to maximize growth. Check them off as you go.
            </p>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:12, color:"#065f46", lineHeight:1.6, maxWidth:440, margin:"0 0 16px", fontStyle:"italic" }}>
              Every growth signal simultaneously supports brain development.
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
              Everything below is your child&apos;s daily growth protocol — 15+ science-backed levers, arranged into a simple checklist.
            </p>
            <p style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:11.5, color:"#059669", lineHeight:1.6, margin:"0 0 6px",
              maxWidth:340, marginLeft:"auto", marginRight:"auto",
            }}>
              Works at any age before growth plates close — typically 14–16 for girls, 16–18 for boys. Starting at any age is powerful.
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
                    growth streak
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
                  const text = `${streakText}Did you know there are 15+ science-backed things that affect your kid's height that no doctor talks about? My ${childName === 'Your child' ? 'kid' : childName} is on it. biokids.me`;
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

        {/* All items complete — perfect day card */}
        {allDone && (
          <div style={{
            background:"#065f46", borderRadius:20,
            padding:"32px 24px", margin:"16px 0 0",
            boxShadow:"0 8px 32px rgba(6,95,70,0.25)",
          }}>
            <div style={{ textAlign:"center" }}>
              {streak > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:56, fontWeight:800, color:"#fff", lineHeight:1, letterSpacing:"-0.04em" }}>
                    Day {streak}
                  </div>
                  <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, marginTop:4 }}>
                    perfect streak
                  </div>
                </div>
              )}

              <div style={{ width:40, height:2, background:"rgba(255,255,255,0.2)", borderRadius:1, margin:"0 auto 16px" }} />

              <p style={{ fontSize:18, fontWeight:800, color:"#fff", margin:"0 0 8px", letterSpacing:"-0.02em" }}>
                Every single lever. Perfect day.
              </p>
              <p style={{
                fontFamily:"'Courier New', Courier, monospace",
                fontSize:12, color:"rgba(255,255,255,0.7)", margin:"0 0 4px",
              }}>
                {childName === 'Your child' ? 'Your child' : childName} &middot; {new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
              </p>

              <div style={{ margin:"16px 0" }}>
                <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:28, fontWeight:800, color:"#fff" }}>{total}/{total}</div>
                <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"rgba(255,255,255,0.5)" }}>every growth lever pulled</div>
              </div>

              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", margin:"12px 0 16px" }}>
                &#x25CF; bioKids
              </div>

              <button
                onClick={() => {
                  const streakText = streak > 1 ? `Day ${streak}. ` : '';
                  const text = `${streakText}Perfect day — every growth lever pulled. There are 15+ things that affect your kid's height that most parents never hear about. biokids.me`;
                  if (navigator.share) {
                    navigator.share({ text }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => {});
                  }
                }}
                style={{
                  fontFamily:"'Courier New', Courier, monospace",
                  fontSize:11, fontWeight:600, color:"#fff",
                  background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:10,
                  padding:"8px 18px", cursor:"pointer",
                  display:"inline-flex", alignItems:"center", gap:6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Tell a parent friend
              </button>
            </div>
          </div>
        )}

        {/* Brain statement + Height Potential — featured at top */}
        {heightData && (
          <div style={{ marginTop:24, padding:"16px 20px", background:"linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)", borderRadius:14, border:"1.5px solid #86efac", textAlign:"center", marginBottom:8 }}>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, color:"#065f46", lineHeight:1.65, margin:0, fontWeight:600, fontStyle:"italic" }}>
              Height isn&apos;t the only benefit — every growth signal simultaneously supports brain development.
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
                <span style={{
                  display:"flex", alignItems:"center", gap:4,
                  fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#44403c",
                }}>
                  Edit heights
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3.5 2L7 5L3.5 8" stroke="#c8c3bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          );
        })()}

        {/* Breath before the day begins */}
        <div style={{ height:1, background:"#e7e5e4", margin:"36px 0 40px" }} />

        {/* Title — centered, outside the box */}
        <div style={{ fontSize:20, fontWeight:900, color:"#1c1917", letterSpacing:"-0.02em", textAlign:"center", marginBottom:8 }}>Today&apos;s Game Plan</div>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#44403c", textAlign:"center", marginBottom:12, lineHeight:1.5 }}>Check them off as you go. It gets easier every day.</div>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#78716c", textAlign:"center", marginBottom:32, lineHeight:1.6, fontStyle:"italic" }}>Miss something? That&apos;s fine. Even 60% consistency compounds beautifully over months.</div>

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
                  done={!!done[item.id]}
                  onDone={() => setDone(d => ({ ...d, [item.id]: !d[item.id] }))}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Shopping List */}
        <div style={{ margin:"52px 0 0" }}>
          <div style={{ height:1, background:"#e7e5e4", marginBottom:40 }} />
          <details>
            <summary style={{ fontSize:20, fontWeight:900, color:"#1c1917", letterSpacing:"-0.02em", textAlign:"center", cursor:"pointer", listStyle:"none", WebkitAppearance:"none" as never }}>
              <span>Shopping List</span>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#44403c", marginTop:6, fontWeight:400 }}>Ranked by importance · buy the top items first</div>
            </summary>

            {/* Tier 1 — Non-negotiable */}
            <div style={{ marginTop:28, marginBottom:28 }}>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Tier 1 — Non-negotiable</div>
              {[
                { item:"A2 whole milk (organic, full-fat)", note:"Daily target: 20–24 oz. Bowl/smoothie + post-sprint + Sleep Drink. Each 8 oz/day = +0.39 cm." },
                { item:"Sheep yogurt (plain, whole)", note:"35× more lactoferrin. 5 oz = 8 oz A2 milk. Growth Bowl base." },
                { item:"Pasture-raised eggs", note:"2–3 daily. Richest whole-food choline source. Over easy in olive oil." },
                { item:"Grass-fed beef (any cut)", note:"Richest glutamine + ornithine + tyrosine. Daily protein rotation." },
                { item:"Beef liver (grass-fed)", note:"Most nutrient-dense food on earth. Mix 2 tbsp into meatballs — kids won't taste it." },
                { item:"Turkey breast", note:"Highest niacin + arginine per gram of any common meat. Dinner rotation." },
                { item:"Wild-caught salmon", note:"Omega-3s + vitamin D (271% RDA) + niacin. 2–3×/wk. Never farmed." },
                { item:"Cooked oysters", note:"28.2mg zinc per 3 oz — full week's supply. GH receptor cofactor. 1×/wk." },
                { item:"Natural peanut butter (no added oils/sugar)", note:"Highest niacin food. Arginine. Bowl/smoothie + pre-sprint snack." },
                { item:"Pumpkin seeds (raw)", note:"Highest practical arginine (~7g/cup) + zinc + magnesium + tryptophan. Copenhagen: +0.33 cm/yr." },
                { item:"Lemon-flavored cod liver oil", note:"½ tsp daily. Retinol + D + omega-3 in one spoon. Hidden in the smoothie." },
                { item:"Bone broth", note:"Richest glycine source. Dinner starter. Lowers core temp for sleep + growth plate collagen." },
                { item:"Bovine gelatin (unflavored)", note:"Pure collagen. Homemade jello with tart cherry. Glycine dessert." },
                { item:"Lentils", note:"DAILY. Iron + lysine + inositol. Plant protein delays puberty = longer growth window. Pair with citrus." },
                { item:"Tart cherry juice (100%, unsweetened)", note:"Highest food melatonin. Sleep Drink + gelatin jello. No blends, no added sugar." },
                { item:"Raw honey", note:"Compliance driver. Post-sprint milk + Bowl drizzle. Gentle insulin for IGF-1 conversion." },
                { item:"Olive oil (extra virgin)", note:"Cook eggs in it. Fat-soluble vitamin absorption from yolks." },
              ].map((r, i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"baseline" }}>
                  <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#065f46", minWidth:20, textAlign:"right" }}>{i+1}</span>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#1c1917" }}>{r.item}</div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#78716c", marginTop:2 }}>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tier 2 — Important */}
            <div style={{ marginBottom:28 }}>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#44403c", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Tier 2 — Important</div>
              {[
                { item:"Frozen berries (organic)", note:"Vitamin C + antioxidants. Bowl/smoothie. Masks CLO flavor. Raspberries support melatonin." },
                { item:"Red bell peppers", note:"190mg vitamin C per cup — 3× more than oranges. Alongside eggs + iron meals." },
                { item:"Broccoli", note:"DIM — delays growth plate closure by blocking aromatase. Every lunch and dinner." },
                { item:"Chicken breast", note:"High ornithine + niacin + arginine. Versatile dinner rotation protein." },
                { item:"Chickpeas / black beans / kidney beans", note:"Plant protein delays puberty. Lysine + arginine + magnesium + fiber. Rotate with lentils." },
                { item:"Sauerkraut or kimchi", note:"Even 2 tbsp counts. Fermentation produces GABA — reduces somatostatin via gut-brain axis." },
                { item:"Collard greens", note:"Lower oxalate than spinach. Magnesium + vitamin K + calcium. Primary leafy green." },
                { item:"Pineapple", note:"Bromelain aids amino acid extraction from meats. Serotonin support. Manganese for bone." },
                { item:"Chia seeds", note:"Omega-3s. Bowl topping or blended into smoothie." },
                { item:"Hemp hearts", note:"Complete protein — all essential aminos. Bowl topping." },
                { item:"Bananas", note:"Smoothie version. Potassium + creaminess. Dopamine signaling." },
                { item:"Allulose or monk fruit sweetener", note:"Zero insulin spike. Gelatin jello + homemade ice cream sweetener." },
                { item:"Epsom salt", note:"Warm bath before bed. Transdermal magnesium for deeper SWS." },
                { item:"Magnesium glycinate lotion", note:"Feet and shoulders at bedtime. Glycinate is best absorbed for sleep — activates GABA receptors." },
              ].map((r, i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"baseline" }}>
                  <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#78716c", minWidth:20, textAlign:"right" }}>{i+18}</span>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#1c1917" }}>{r.item}</div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#78716c", marginTop:2 }}>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tier 3 — Nice to have */}
            <div style={{ marginBottom:12 }}>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#a8a29e", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Tier 3 — Nice to have</div>
              {[
                { item:"Pistachios", note:"Highest melatonin per gram of any nut. Best evening snack." },
                { item:"Walnuts", note:"Melatonin support + omega-3s. Evening snack." },
                { item:"Sardines (with bones)", note:"Calcium + vitamin D + omega-3. Bone density." },
                { item:"Tuna", note:"High niacin per 100g. Good ornithine + omega-3. 1–2×/wk." },
                { item:"Oranges / kiwi", note:"Vitamin C alongside iron meals. Kiwi = highest density per bite." },
                { item:"Watermelon", note:"Citrulline → arginine. Better oral bioavailability than arginine itself." },
                { item:"Beets", note:"Dopamine signaling — directly inhibits somatostatin release." },
                { item:"Fresh ginger", note:"Increases ghrelin — natural GH secretagogue. In meals or as tea." },
                { item:"Coconut oil", note:"Pre-sprint fuel. Short-term GH boost up to 4 hours. Stacks with sprint pulse." },
                { item:"Turmeric + black pepper", note:"Anti-SOCS. Lowers IL-6, TNF-alpha. Pepper boosts absorption 2,000%." },
                { item:"Shredded coconut (unsweetened)", note:"Bowl topping. Medium-chain fats." },
                { item:"Quinoa / buckwheat", note:"Complete plant proteins. Low-GI carb base. mTOR support." },
                { item:"Seaweed (nori, kelp)", note:"Iodine → thyroid → GH/IGF-1 axis. Moderate intake." },
                { item:"Bovine colostrum", note:"IGF-1 + immune modulators + gut health. Morning or post-sprint." },
              ].map((r, i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"baseline" }}>
                  <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#d6d3d1", minWidth:20, textAlign:"right" }}>{i+32}</span>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#1c1917" }}>{r.item}</div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#78716c", marginTop:2 }}>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#78716c", textAlign:"center", marginTop:20, lineHeight:1.6, fontStyle:"italic" }}>
              Start with Tier 1. Add Tier 2 when it feels easy. Tier 3 whenever you want.
            </div>
          </details>
        </div>

        {/* Footer */}
        <div style={{ margin:"52px 0 40px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#065f46", fontWeight:600, marginBottom:6 }}>
            {allDone ? "Perfect. See you tomorrow." : allCoreDone ? "Core done. See you tomorrow." : "Every day counts."}
          </p>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#78716c", lineHeight:1.6 }}>
            Every number on this page comes from a peer-reviewed study. * from adult studies — whole foods deliver these pathways at lower but meaningful doses.
          </p>
        </div>
      </div>
    </div>
  );
}
