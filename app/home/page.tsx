'use client';

import { useState, useEffect, useRef } from "react";
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';
import { useChildName } from '@/lib/useChildName';

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

const dayData: DayPeriod[] = [
  { period:"Morning", time:"6:30 – 8:30am", items:[
    { id:"wake", t:"Same wake time", sub:"±30 min, weekends too", gh:"60–80% GH", headline:"of tonight's GH depends on this morning", tier:1, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000", why:"Your child's growth hormone pulses tonight are programmed by this morning's wake time. The pituitary releases GH on a circadian schedule set by the suprachiasmatic nucleus. Brandenberger et al. showed normal sleep produces 3× more peak GH than disrupted sleep — the concentrated nocturnal surge is abolished without proper circadian timing. One late Saturday can disrupt pulse timing through Wednesday.", tip:"Same time ±30 min, including weekends. This is the easiest lever and it's free.",
      pumps:[
        { p:"Circadian programming", n:"60–80%", d:"Tonight's GH pulse timing set by today's wake time" },
        { p:"Normal sleep advantage", n:"3×", d:"Normal sleep = 3× more peak GH than disrupted" },
      ]},

    { id:"sun", t:"Morning sunlight", sub:"10 min, no sunglasses", gh:"157% GH*", headline:"melatonin tonight — deeper sleep — larger GH pulses", tier:1, cite:"Roenneberg, Curr Biol 2007; Forsling, J Pineal Res 1999", why:"Morning light hits melanopsin receptors — synchronizes the suprachiasmatic nucleus — programs melatonin release 14–16 hours from now. Melatonin raised GH up to 157% in adult studies AND inhibits aromatase (the enzyme that closes growth plates). Combine with 5–10 min outdoor stretching — circadian clock + spinal decompression in one.", tip:"Backyard, bus stop walk, porch breakfast. Overcast still works.",
      pumps:[
        { p:"Melatonin timing*", n:"up to 157%", d:"Tonight's melatonin set by this morning's light — raised GH 157% in adults" },
        { p:"Aromatase inhibition", n:"—", d:"Melatonin blocks estrogen — delays growth plate closure" },
        { p:"Vitamin D synthesis", n:"IGF-1 enabler", d:"Deficiency blunts the entire GH — IGF-1 axis" },
      ]},

    { id:"cold", t:"Cool water rinse", sub:"Last 30–60 sec of shower", gh:"↑ GH", headline:"on rewarming — norepinephrine 200–300%", tier:2, cite:"Okada, JCEM 1970; Sramek, Eur J Appl Physiol 2000", why:"Cold raised GH from <1.1 to >4.2 ng/ml on rewarming. Norepinephrine 200–300%. Water conducts heat 25× faster than air. Start with 10 seconds of cool, progress gradually. Never force it.", tip:"Start 10 seconds cool. Progress to 30–60 seconds over weeks.",
      pumps:[
        { p:"GH on rewarming", n:"↑ GH", d:"GH rose from <1.1 to >4.2 ng/ml" },
        { p:"Norepinephrine", n:"200–300%", d:"Cold stress triggers norepinephrine" },
      ]},

    { id:"bkf", t:"Eggs + citrus", sub:"2–3 pasture-raised, orange slices", gh:"GH axis primer", headline:"choline — acetylcholine — primes every GH pulse today", tier:0, cite:"Ziegenfuss, JISSN 2008; Kawamura, Nutrition 2012", why:"Eggs are the richest whole-food choline source. Choline converts to acetylcholine, which stimulates GHRH neurons, priming the pituitary for every GH pulse all day. This restarts the 24-hour cycle — last night's casein bridged overnight, now choline reignites the axis. Eggs also deliver glutamine, ornithine, lysine + arginine, and tyrosine — all GH-supporting aminos.", tip:"Scrambled or over easy. Skip cereal — always. Serve with orange slices (vitamin C boosts iron 2–3×). No cheese at this meal — calcium competes with egg iron.",
      pumps:[
        { p:"Choline → acetylcholine", n:"axis primer", d:"Two eggs ≈ 300mg choline — primes pituitary for GH pulses all day" },
        { p:"Choline pathway*", n:"up to 4,400%", d:"A-GPC (choline metabolite) raised GH up to 4,400% in adult studies" },
        { p:"Glutamine*", n:"up to 400%", d:"Glutamine raised GH 4-fold in adult studies — eggs deliver meaningful amounts" },
        { p:"Ornithine", n:"GH amplifier", d:"Cycles with arginine to amplify GH" },
        { p:"Lysine + Arginine*", n:"up to 700%", d:"Combined amino acids raised GH up to 700% in adult supplement studies" },
        { p:"L-DOPA (tyrosine)*", n:"up to 221%", d:"Tyrosine — dopamine — stimulates GHRH in adult studies" },
        { p:"Retinol (vitamin A)", n:"40–60%", d:"Deficiency reduces GH receptor binding 40–60%" },
        { p:"Glycine", n:"collagen builder", d:"Growth plate collagen building block" },
        { p:"Taurine", n:"potentiator", d:"Supports bile for fat-soluble vitamin absorption" },
        { p:"B12", n:"cell division", d:"Required for chondrocyte division at growth plates" },
      ],
      foods:[
        { f:"Pasture-raised eggs, 2–3 daily", d:"Richest whole-food choline source." },
        { f:"Orange slices or bell peppers", d:"Vitamin C boosts iron absorption 2–3×." },
        { f:"Beef liver 1×/wk or blend 2–3×/wk", d:"Highest choline density. VITAMIN C, NOT MILK." },
      ]},

    { id:"d1", t:"Morning dairy", sub:"8 oz A2 milk or sheep yogurt", gh:"+0.39 cm/yr", headline:"per 8 oz/day across childhood — IGF-1 shift P=0.005", tier:0, cite:"Hoppe, Eur J Clin Nutr 2008; Kang, Nutrients 2019", why:"Milk proteins directly stimulate hepatic IGF-1 production. Six key proteins: casein (slow-release 6–7 hrs), α-lactalbumin (highest tryptophan — serotonin — melatonin), lactoferrin, lysozyme, sIgA, albumin. IRON-DAIRY RULE: serve milk between meals or post-sprint, not alongside iron meals.", tip:"Breakfast dairy FIRST (within 1 hour of waking), then eggs. Add pumpkin seeds to sheep yogurt for arginine + zinc + magnesium in one handful.",
      pumps:[
        { p:"IGF-1 stimulation", n:"10–20%", d:"240 mL/day — measurable IGF-1 shift (P=0.005)" },
        { p:"Height per serving", n:"+0.39cm", d:"Per additional 8 oz/day across childhood" },
        { p:"α-Lactalbumin — melatonin*", n:"up to 157%", d:"Highest tryptophan — serotonin — melatonin raised GH 157% in adult studies" },
        { p:"Casein overnight*", n:"up to 451%", d:"Slow-releases aminos 6–7 hrs — Zajac: GH 451% above baseline at 24h in adults" },
        { p:"Lysine + Arginine*", n:"up to 700%", d:"Milk delivers both — combined aminos raised GH up to 700% in adult supplement studies" },
        { p:"GABA (yogurt/kefir)*", n:"up to 400%", d:"Lactobacillus produces GABA — raised GH 400% in adult studies" },
        { p:"Calcium + phosphorus", n:"bone mineral", d:"Via casein micelles — direct bone mineralization" },
      ],
      foods:[
        { f:"A2 whole milk, 8 oz", d:"Casein + whey + tryptophan + calcium." },
        { f:"Sheep's milk yogurt, 5 oz", d:"50–80% more casein per volume." },
        { f:"Full-fat kefir", d:"Milk proteins + fermentation-derived GABA." },
      ]},

    { id:"clo", t:"Cod liver oil", sub:"½ tsp — NOT on beef liver days", gh:"40–60% GH", headline:"of GH receptor function lost without retinol", tier:0, cite:"Balmer, J Lipid Res 2002; Soliman, Indian J Endocrinol Metab 2014", why:"CLO delivers three growth levers in one spoon. Retinol is required for GH receptor gene expression — deficiency cuts binding 40–60%. Vitamin D deficiency blunts GH — IGF-1 — growth plate pathway. Omega-3s are anti-inflammatory at the growth plate.", tip:"In a smoothie — they won't taste it. Skip on beef liver days — both deliver high-dose vitamins A and D.",
      pumps:[
        { p:"Retinol — GH receptors", n:"40–60%", d:"Deficiency reduces GH receptor binding" },
        { p:"Vitamin D — IGF-1", n:"axis enabler", d:"Deficiency blunts IGF-1 production" },
        { p:"Omega-3s", n:"anti-inflammatory", d:"Reduces inflammation at growth plate" },
      ]},

    { id:"cit", t:"Vitamin C with iron meals", sub:"Orange slices or lemon water", gh:"2–3× iron", headline:"iron absorption — iron delivers oxygen to growing tissues", tier:0, cite:"Hallberg, Am J Clin Nutr 1989; Chinese ISS RCT", why:"Vitamin C boosts iron absorption 2–3× — critical for oxygen delivery to growth plate chondrocytes. Citrus also delivers inositol (part of the lysine-inositol-B12 growth combo from the Chinese ISS RCT).", tip:"Orange slices or lemon water with beef, liver, lentils. Never serve milk alongside iron meals.",
      pumps:[
        { p:"Iron absorption", n:"2–3×", d:"Vitamin C dramatically increases iron uptake" },
        { p:"Inositol", n:"ISS RCT", d:"Part of lysine-inositol-B12 growth combo" },
      ]},

    { id:"ns", t:"No sugar until lunch", sub:"No artificial sweeteners ever", gh:"300–500% GH", headline:"fasting GH — one cereal bowl suppresses up to 80%", tier:1, cite:"Lanzi, Metabolism 1999; Hartman, JCEM 1992", why:"60–80% of daily GH is produced during fasting. One bowl of cereal spikes insulin, suppressing GH for 2–3 hours. Ghrelin (hunger hormone) directly triggers GH — snacking keeps it suppressed. Artificial sweeteners disrupt gut bacteria responsible for GABA production (400% GH).", tip:"Eggs, dairy, meat for breakfast. Never artificial sweeteners.",
      pumps:[
        { p:"Fasting GH", n:"300–500%", d:"Overnight fast produces 60–80% of daily GH" },
        { p:"Insulin avoided", n:"up to 80%", d:"One sugar spike blocks GH for 2–3 hours" },
        { p:"Ghrelin", n:"secretagogue", d:"Hunger directly triggers GH" },
        { p:"Microbiome integrity", n:"GABA protected", d:"No sweeteners — gut bacteria keep producing GABA" },
      ]},

    { id:"joy", t:"Laughter and play", sub:"Start the day light", gh:"87% GH*", headline:"from anticipation of fun alone — cortisol down 39% in adult study", tier:0, cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989", why:"In adult studies, merely anticipating a funny experience raised GH 87%, β-endorphins 27%, and reduced cortisol 39%. Chronic stress suppresses GH. Joy is not a bonus — it's a growth lever.", tip:"Morning dance party. Jokes at breakfast. Roughhousing before they leave.",
      pumps:[
        { p:"Anticipation of fun*", n:"up to 87%", d:"Anticipating humor raised GH 87% in adult study" },
        { p:"Cortisol reduction*", n:"↓39%", d:"Less cortisol = less GH suppression (adult study)" },
        { p:"β-endorphins*", n:"+27%", d:"Endorphins support hormonal environment (adult study)" },
      ]},

    { id:"bp", t:"Light backpack", sub:"Under 10–15% body weight", gh:"—", headline:"heavy loads compress developing spine", tier:3, cite:"Brackley, Spine 2004; Negrini, Spine 2002", why:"Chronic heavy loads affect intervertebral disc height during the years when the spine should be lengthening. Combined with daily gravitational compression, an overweight backpack amplifies the problem.", tip:"Weigh it. Remove what they don't need. A rolling backpack eliminates the issue." },

    { id:"hang", t:"Dead hang", sub:"3 × 20 sec, thumbs over bar", gh:"—", headline:"axial traction — reverses gravity's daily 1% compression", tier:0, cite:"Nachemson, Scand J Rehabil Med 1970; Reilly, Ergonomics 1984", why:"Gravity compresses spinal discs all day — up to 1% of height lost by evening. Hanging creates pure axial traction that rehydrates discs.", tip:"Pull-up bar, playground bar, door-frame bar. Relax shoulders completely." },
  ]},

  { period:"Afternoon", time:"12:00 – 5:00pm", items:[
    { id:"lunch", t:"Animal protein + peanuts + broccoli", sub:"Beef liver + eggs + lentils + citrus", gh:"GH multi-lever", headline:"lysine + arginine + glutamine + niacin — stacks multiple GH pathways", tier:0, cite:"Isidori, Curr Med Res Opin 1981; Larnkjaer, J Nutr 2012", why:"This meal activates 10+ GH pathways and primes the afternoon sprint. Beef liver has the highest choline density plus retinol, B12, and zinc. Peanuts deliver niacin, which suppresses free fatty acids that brake GH. WARNING: No CLO on beef liver days — both deliver high-dose vitamins A and D.", tip:"Beef liver mixed into ground beef (burgers, meatballs, bolognese) — kids won't taste it. Peanuts prime the sprint. NO DAIRY at this meal.",
      pumps:[
        { p:"Lysine + Arginine*", n:"up to 700%", d:"Combined aminos raised GH up to 700% in adult supplement studies" },
        { p:"Glutamine (beef)*", n:"up to 400%", d:"Glutamine raised GH 4-fold in adult studies — beef delivers meaningful amounts" },
        { p:"Niacin (peanuts)*", n:"up to 350%", d:"Niacin suppressed FFAs → amplified sprint GH in adult study" },
        { p:"Ornithine", n:"GH amplifier", d:"Cycles with arginine to amplify GH" },
        { p:"L-DOPA (tyrosine)*", n:"up to 221%", d:"Tyrosine — dopamine — stimulates GHRH in adult studies" },
        { p:"Arginine (pumpkin seeds)", n:"+0.33cm/yr", d:"Highest plant arginine. Copenhagen study: +0.33cm/yr in children" },
        { p:"Zinc (seeds)", n:"+0.37cm", d:"WHO meta-analysis: zinc alone" },
        { p:"Iron absorption (citrus)", n:"2–3×", d:"Citrus boosts iron uptake" },
        { p:"Magnesium (seeds)", n:"SWS amplifier", d:"Deepens slow-wave sleep tonight" },
        { p:"Taurine (meat)", n:"potentiator", d:"Supports bile for fat-soluble vitamin absorption" },
        { p:"Iron (beef + lentils)", n:"growth enabler", d:"Required for oxygen to growing tissues" },
        { p:"B12 (beef)", n:"cell division", d:"Chondrocyte division at growth plates" },
        { p:"Fiber (lentils + seeds)", n:"protected GH", d:"Slows glucose — protects GH" },
        { p:"Inositol (lentils + peanuts)", n:"ISS RCT", d:"Part of lysine-inositol-B12 growth combo" },
      ],
      foods:[
        { f:"Beef liver 1×/wk (or blend 2–3×/wk)", d:"Highest choline + niacin + iron + retinol + B12 + zinc. VITAMIN C, NOT MILK." },
        { f:"Cooked oysters 1×/wk", d:"28.2mg zinc per 3 oz (full week's RDA). All 3 growth axis levels." },
        { f:"Wild salmon 2×/wk", d:"Omega-3s — IGF-1 + vitamin D + niacin." },
        { f:"Beef (any cut) — daily", d:"Rich in glutamine, ornithine, and tyrosine — all GH-supporting aminos." },
        { f:"Turkey breast", d:"Highest niacin + arginine per gram — primes sprint GH response." },
        { f:"Chicken (skin-on thighs)", d:"Collagen/glycine from skin + taurine." },
        { f:"Eggs (2–3 daily)", d:"Choline → GH axis primer + complete aminos." },
        { f:"Pumpkin seeds", d:"Arginine + magnesium + zinc + tryptophan." },
        { f:"Peanuts / PB", d:"Niacin + arginine + inositol — all GH-supporting nutrients." },
        { f:"Lentils + citrus", d:"Iron + lysine + inositol. Vitamin C boosts iron 2–3×." },
        { f:"Broccoli / cauliflower", d:"DIM + I3C — aromatase inhibition — plates stay open." },
      ]},

    { id:"water", t:"Water only", sub:"No juice, no soda, no sweeteners", gh:"300% GH", headline:"protected — each sugar spike suppresses up to 80%", tier:2, cite:"Lanzi, Metabolism 1999; Kojima, Nature 1999", why:"Every juice box triggers an insulin spike that shuts down GH for 2–3 hours. Allow 3–4 hour gaps — ghrelin directly triggers GH. Artificial sweeteners disrupt GABA-producing gut bacteria.", tip:"Water or milk between meals. Nothing else.",
      pumps:[
        { p:"Insulin avoided", n:"up to 80%", d:"Each sugar spike blocks GH 2–3 hours" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Meal gaps let ghrelin trigger GH" },
        { p:"Microbiome", n:"GABA protected", d:"No sweeteners — bacteria keep producing GABA" },
        { p:"Healthy body composition", n:"sustained GH", d:"Less sugar — less visceral fat — higher baseline GH" },
      ]},

    { id:"nap", t:"No naps after 2–3pm", sub:"Steals tonight's deep sleep", gh:"60–80% GH", headline:"of tonight's GH at risk — late naps steal adenosine", tier:2, cite:"Milner, J Sleep Res 2009; Brandenberger, Lancet 2000", why:"Naps after 3pm steal adenosine sleep pressure needed for deep slow-wave sleep. The first SWS cycle — the one most disrupted by late naps — contains the single largest GH pulse of the day.", tip:"If they truly need a nap, before 2pm and under 30 minutes." },

    { id:"pre", t:"Eggs + peanuts before sprints", sub:"30–60 min before", gh:"sprint primer", headline:"choline + niacin prime the sprint GH response", tier:1, cite:"Stokes, J Appl Physiol 2008; Ziegenfuss, JISSN 2008", why:"Choline primes the hypothalamic-pituitary axis for the upcoming sprint. Niacin blocks free fatty acids — a molecular brake on GH. Stokes (2008): niacin amplified second sprint GH to ~23.3 μg/L vs ~5.2 controls (~350% greater peak, ~422% greater AUC) in adult athletes.", tip:"Over easy eggs. Unroasted peanuts or natural PB. No dairy — eggs have iron. Save milk for post-sprint.",
      pumps:[
        { p:"Choline priming*", n:"up to 4,400%", d:"A-GPC (choline metabolite) raised GH up to 4,400% with exercise in adults" },
        { p:"Niacin (peanuts)*", n:"up to 350%", d:"Niacin suppressed FFAs → 350% greater sprint GH peak in adult study" },
        { p:"Arginine", n:"GH support", d:"Peanuts deliver arginine — direct GH secretagogue" },
        { p:"Glutamine (eggs)*", n:"up to 400%", d:"Glutamine raised GH 4-fold in adult supplement study" },
        { p:"Inositol (peanuts)", n:"ISS pathway", d:"Part of lysine-inositol-B12 growth combo" },
        { p:"Fiber (peanuts)", n:"protected GH", d:"Slows glucose — protects GH" },
        { p:"Magnesium (peanuts)", n:"SWS amplifier", d:"Deepens slow-wave sleep tonight" },
      ]},

    { id:"spr", t:"6 × 30-sec all-out sprints", sub:"3×/week — 2–4 min full rest between", gh:"530% GH*", headline:"per sprint in adult studies — nothing in nutrition comes close", tier:0, cite:"Stokes, J Sports Sci 2002; Nevill, J Appl Physiol 1996", why:"In adult studies, a single 30-second sprint produced a 530% GH spike. Even 6 seconds = 217%. The trigger is lactate — only at true maximum effort. With pre-sprint choline + niacin, every sprint is maximized.", tip:"Tag, races, hill sprints — as long as it's genuinely all-out. Hill sprints produce higher lactate. Alternate days with jumping.",
      pumps:[
        { p:"Sprint GH*", n:"up to 530%", d:"Per 30-second all-out sprint in adult studies" },
        { p:"With choline*", n:"up to 4,400%", d:"A-GPC (choline pathway) raised GH up to 4,400% with exercise in adults" },
        { p:"With niacin*", n:"up to 350%", d:"Niacin amplified repeat sprint GH ~350% in adult study" },
        { p:"Mechanical loading", n:"growth plates", d:"Direct growth plate stimulation" },
        { p:"6-sec sprint*", n:"up to 217%", d:"Even a 6-second sprint raised GH 217% in adult study" },
        { p:"Healthy body composition", n:"sustained GH", d:"Sprint training maintains lean body comp" },
      ]},

    { id:"jump", t:"Jumping protocol", sub:"50–100 jumps, 3×/week (alternate with sprints)", gh:"+4.3 cm", headline:"in 24 weeks — IGF-1 up, bone density +1.08", tier:0, feat:true, cite:"Zribi, J Pediatr Endocrinol Metab; PMC9135997", why:"24-week study of short-stature children: +4.32 cm vs 0.93–1.84 cm in controls. IGF-1 increased. Femoral neck BMD +1.08 (Cohen's d ≈ 0.87). Zero injuries. Preschool study (ages 3–6): height gain exceeded national averages.", tip:"Jump rope (50–100), drop jumps from 20–40cm platforms, single-leg hops. HR target: 128–155 bpm. Always followed by stretching.",
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

    { id:"pm", t:"Post-sprint milk", sub:"8–12 oz A2 + 1 tbsp raw honey", gh:"451% GH*", headline:"GH to IGF-1 conversion — still 451% above baseline at 24h in adult study", tier:0, sig:true, cite:"Zajac, J Human Kinetics 2018; Cappon, J Appl Physiol 1994", why:"Without milk after sprints, the GH spike is 'orphaned' — present but not converted to IGF-1 (the actual growth signal). Whey provides immediate aminos. Honey's gentle insulin activates the STAT5 pathway, converting GH to IGF-1. Casein slow-releases for hours, bridging to the Sleep Drink.", tip:"Cold milk, raw honey, immediately after stretching. This is a DAIRY window. Non-sprint days: same drink after school.",
      pumps:[
        { p:"GH to IGF-1*", n:"up to 451%", d:"Zajac: still 451% above baseline at 24h in adult athletes" },
        { p:"IGF-1*", n:"+14%", d:"14% higher than controls at 24h in adult study" },
        { p:"Casein", n:"6–7 hrs", d:"Bridges to Sleep Drink at bedtime" },
        { p:"α-Lactalbumin*", n:"up to 157%", d:"Tryptophan — melatonin — raised GH 157% in adults" },
        { p:"Lysine + Arginine*", n:"up to 700%", d:"Milk delivers both — raised GH up to 700% in adult supplement studies" },
      ]},
  ]},

  { period:"Late Afternoon", time:"3:00 – 6:00pm", items:[
    { id:"rest", t:"Rest and play", sub:"Unstructured time with friends", gh:"87% GH*", headline:"anticipation of fun raised GH 87% in adult study — cortisol down 39%", tier:1, cite:"Berk, FASEB J 2006; Veldhuis, JCEM 1995", why:"Unstructured play is growth time. In adult studies, anticipation of fun raised GH 87% and reduced cortisol 39%. Chronic stress from overscheduling is one of the strongest GH suppressors.", tip:"No homework pressure right after school. Play first, eat, then homework. No competitive sports in the evening." },
  ]},

  { period:"Evening", time:"6:00 – 9:00pm", note:"Do these in order. By the end, they're drowsy.", items:[
    { id:"nox", t:"No exercise after 6pm", sub:"Core temp must drop for deep sleep", gh:"60–80% GH", headline:"of tonight's GH at risk — late exercise delays sleep onset", tier:2, cite:"Stutz, Sports Med 2019; Brandenberger, Lancet 2000", why:"Core body temp must drop 1–1.5°C to initiate deep sleep. Vigorous exercise within 2 hours of bed raises it, delaying sleep onset and compressing the SWS window.", tip:"Save all sports for afternoon. No competitive evening games." },

    { id:"din", t:"Dinner — done by 6pm", sub:"Animal protein + cruciferous + fermented + broth + citrus", gh:"GH multi-lever", headline:"stacks glutamine + GABA + glycine + aromatase block", tier:0, cite:"Welbourne, Am J Clin Nutr 1995; Kasai, Metabolism 1980", why:"This dinner hits every remaining GH pathway. Beef delivers glutamine, ornithine, and tyrosine. Bone broth delivers glycine (promotes sleep onset + growth plate collagen). Fermented foods provide GABA via Lactobacillus. Broccoli provides DIM for aromatase inhibition — plates stay open. NO DAIRY at dinner — save milk for the Sleep Drink.", tip:"Any meat + cruciferous + fermented side + bone broth + citrus. Vary proteins. NO DAIRY here.",
      pumps:[
        { p:"Glutamine (beef)*", n:"up to 400%", d:"Glutamine raised GH 4-fold in adult studies — beef delivers meaningful amounts" },
        { p:"GABA (fermented)*", n:"up to 400%", d:"GABA raised GH 400% in adult studies — fermented foods are a natural GABA source" },
        { p:"Glycine (broth)*", n:"up to 300%", d:"Glycine raised GH 300% in adult studies — also lowers core temp for sleep" },
        { p:"Ornithine", n:"GH amplifier", d:"Cycles with arginine to amplify GH" },
        { p:"Aromatase block", n:"growth plates", d:"DIM from broccoli — delays growth plate closure" },
        { p:"L-DOPA (tyrosine)*", n:"up to 221%", d:"Tyrosine — dopamine — stimulates GHRH in adult studies" },
        { p:"Taurine (meat)", n:"potentiator", d:"Supports bile for fat-soluble vitamin absorption" },
        { p:"Iron (beef + lentils)", n:"growth enabler", d:"Required for oxygen to growing tissues" },
        { p:"Iron absorption (citrus)", n:"2–3×", d:"Orange slices or lemon water boosts iron uptake" },
        { p:"B12 (beef)", n:"cell division", d:"Chondrocyte division at growth plates" },
        { p:"Fiber (lentils + broccoli)", n:"protected GH", d:"Slows insulin — protects GH" },
        { p:"Inositol (lentils)", n:"ISS pathway", d:"Part of lysine-inositol-B12 growth axis" },
        { p:"Microbiome GABA (fermented)", n:"continuous", d:"Sauerkraut/kimchi feed bacteria that produce GABA 24/7" },
        { p:"Plant protein (lentils)", n:"puberty delay", d:"Associated with later puberty — longer growth window" },
      ],
      foods:[
        { f:"ANIMAL PROTEIN — rotate from ranking:", d:"All deliver arginine, glutamine, ornithine, glycine, lysine, choline, tyrosine, taurine, niacin." },
        { f:"Beef (any cut) — most nights", d:"Rich in glutamine, ornithine, and tyrosine — all GH-supporting aminos." },
        { f:"Skin-on chicken thighs", d:"Collagen/glycine from skin + taurine." },
        { f:"Turkey", d:"Highest niacin + arginine per gram — primes GH response." },
        { f:"Wild salmon 2×/wk", d:"Omega-3s — IGF-1 + vitamin D." },
        { f:"Beef liver 1×/wk (blend 2–3×/wk)", d:"Highest pump density. Vitamin C, NOT milk." },
        { f:"Cooked oysters 1×/wk", d:"Zinc (week's RDA) + iron + B12." },
        { f:"Bone broth", d:"Richest food source of glycine — GH secretagogue + growth plate collagen." },
        { f:"Sauerkraut / kimchi", d:"Fermented foods produce GABA via Lactobacillus — suppresses somatostatin." },
        { f:"Broccoli / cauliflower", d:"Aromatase inhibition — plates stay open." },
        { f:"Lentils + citrus", d:"Iron + lysine + inositol. Vitamin C 2–3×." },
      ]},

    { id:"gly", t:"Gelatin dessert", sub:"Bovine gelatin jello or bone broth", gh:"glycine lever", headline:"glycine — GH secretagogue + lowers core temp + growth plate collagen", tier:1, cite:"Kawai, Neuropsychopharmacology 2015; Kasai, Metabolism 1980", why:"Glycine: (1) lowers core temp via NMDA receptors — triggers sleep onset, (2) a direct GH secretagogue (raised GH up to 300% in adult studies), (3) most abundant amino acid in collagen — the structural protein of growth plates.", tip:"Gelatin in jello with allulose or monk fruit. Gelatin powder has no taste — mix into anything.",
      pumps:[
        { p:"Glycine — GH*", n:"up to 300%", d:"Glycine raised GH up to 300% in adult studies" },
        { p:"Sleep onset", n:"core temp ↓", d:"Lowers body temp — initiates deep sleep" },
        { p:"Growth plate collagen", n:"structural", d:"Glycine + hydroxyproline + proline" },
      ]},

    { id:"nse", t:"GH-safe snacks only", sub:"No refined sugar — ever", gh:"300–500% GH", headline:"overnight GH protected — each spike blocks up to 80%", tier:1, cite:"Lanzi, Metabolism 1999; Van Cauter, JCEM 1992", why:"60–80% of GH is released overnight. One scoop of regular ice cream suppresses up to 80% via insulin. Use monk fruit, allulose, honey, or maple syrup.", tip:"These replace all store-bought snacks. Every one hits a GH pump.",
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
        { f:"Raw cacao nibs (occasional, early in day only)", d:"Magnesium source. Contains caffeine — never after lunch." },
      ]},

    { id:"nlf", t:"Finish food 2–3 hrs before bed", sub:"Protects overnight fasting window", gh:"300–500% GH", headline:"overnight fast = when 60–80% of GH is produced", tier:2, cite:"Crispim, J Clin Sleep Med 2011; Hartman, JCEM 1992", why:"The overnight fast is when GH peaks. Eating close to bed keeps insulin elevated and disrupts sleep architecture. Exception: Sleep Drink (~55 calories) is too small to suppress.", tip:"Dinner done by 6pm for an 8:30 bedtime.",
      pumps:[
        { p:"Fasting GH", n:"300–500%", d:"Overnight fast produces 60–80% of daily GH" },
        { p:"Insulin cleared", n:"up to 80%", d:"Insulin must clear for GH to fire" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Meal gaps let ghrelin trigger GH" },
      ]},

    { id:"nsc", t:"No screens after dinner", sub:"Or Night Shift + blue light glasses", gh:"157% GH*", headline:"melatonin at risk — blue light suppresses 90+ min", tier:1, cite:"Gooley, JCEM 2011; Figueiro, Neuro Endocrinol Lett 2011", why:"Blue light suppresses melatonin for 90+ minutes. Melatonin raised GH up to 157% in adult studies + provides aromatase inhibition. Every minute of screen time after dinner steals from tonight's GH surge.", tip:"TV better than tablets — distance matters. If unavoidable: Night Shift + blue light glasses.",
      pumps:[
        { p:"Melatonin — GH*", n:"up to 157%", d:"Blue light suppresses melatonin — raised GH 157% in adult studies" },
        { p:"Aromatase inhibition", n:"plates stay open", d:"Melatonin blocks estrogen — delays closure" },
        { p:"SWS depth", n:"60–80%", d:"Melatonin deepens slow-wave sleep" },
      ]},

    { id:"bath", t:"Warm bath with Epsom salts", sub:"20 min before wind-down", gh:"60–80% GH", headline:"core temp drop after — fastest SWS onset", tier:1, cite:"Krauchi, Nature 1999; Haghayegh, Sleep Med Rev 2019", why:"Warm bath raises peripheral blood flow — when you get out, core temp drops rapidly — this accelerated cooling signals sleep onset and deepens SWS. Epsom salts add transdermal magnesium. The first SWS cycle contains the largest GH pulse of the day.", tip:"10–20 minutes, warm not hot. Add Epsom salt.",
      pumps:[
        { p:"Core temp drop", n:"faster SWS", d:"Accelerated cooling — deeper sleep onset" },
        { p:"Magnesium (Epsom)", n:"SWS amplifier", d:"Transdermal magnesium deepens slow-wave sleep" },
        { p:"First GH pulse", n:"largest", d:"First SWS cycle = largest GH pulse of the day" },
        { p:"Cortisol reduction", n:"parasympathetic", d:"Warm water activates parasympathetic tone" },
        { p:"Sensory ritual", n:"anticipatory", d:"Brain associates bath with sleep after 1–2 weeks" },
      ]},

    { id:"mag", t:"Magnesium lotion", sub:"Feet and shoulders", gh:"SWS amplifier", headline:"GABA receptor activation — deepens slow-wave sleep", tier:1, cite:"Held, Pharmacopsychiatry 2002; Abbasi, J Res Med Sci 2012", why:"Magnesium activates GABA-A receptors — suppresses somatostatin — removes the brake on GH. Transdermal application bypasses digestion. The consistent touch ritual triggers a parasympathetic response after 1–2 weeks.", tip:"Rub on feet and shoulders while they read.",
      pumps:[
        { p:"GABA receptor activation*", n:"up to 400%", d:"GABA raised GH 400% in adult studies — magnesium activates GABA receptors" },
        { p:"SWS depth", n:"amplifier", d:"Deepens slow-wave sleep" },
        { p:"Sensory ritual", n:"conditioned", d:"Touch cue triggers parasympathetic nightly" },
        { p:"Melatonin support*", n:"up to 157%", d:"Magnesium supports melatonin synthesis — melatonin raised GH 157% in adults" },
        { p:"Parasympathetic activation", n:"sleep onset", d:"Touch ritual triggers parasympathetic response" },
        { p:"Cortisol reduction", n:"calming", d:"Consistent touch ritual lowers cortisol" },
      ]},

    { id:"drink", t:"Sleep Drink", sub:"4 oz A2 milk + 1 oz tart cherry — 30 min before bed", gh:"451% GH*", headline:"the 24-hour cycle completes — GH 451% at 24h in adult study, IGF-1 +14%", tier:0, sig:true, cite:"Zajac, J Human Kinetics 2018; Howatson, Eur J Nutr 2012; Forsling, J Pineal Res 1999", why:"The signature bioKids ritual. Casein slow-releases aminos 6–7 hours feeding GH pulses all night. Tart cherry = highest food melatonin (melatonin raised GH 157% in adult studies + aromatase inhibition). α-Lactalbumin = highest tryptophan — serotonin — melatonin. In the Zajac study (adults), GH remained 451% above baseline at 24 hours, IGF-1 14% higher. ~55 calories — too small to spike insulin. This is the 24-hour cycle: post-sprint milk then Sleep Drink then casein overnight then morning eggs restart. Some GH lever is always on.", tip:"Mix, serve 20–40 min before bed. This is a DAIRY window. Dim lights after.",
      pumps:[
        { p:"GH at 24h*", n:"up to 451%", d:"Zajac: still 451% above baseline at 24h in adult athletes" },
        { p:"IGF-1*", n:"+14%", d:"14% higher than controls in adult study" },
        { p:"Melatonin (cherry)*", n:"up to 157%", d:"Highest food melatonin — raised GH 157% in adults + aromatase block" },
        { p:"Casein overnight", n:"6–7 hrs", d:"Slow-release aminos all night" },
        { p:"24-hour cycle", n:"always on", d:"Post-sprint — Sleep Drink — overnight — eggs restart" },
        { p:"Cortisol ↓ (cherry)", n:"↓ stress", d:"Tart cherry reduces cortisol" },
      ]},

    { id:"rtn", t:"Same routine every night", sub:"Bath — lotion — drink — books — bed", gh:"157% GH*", headline:"brain auto-releases melatonin when routine starts", tier:0, cite:"Mindell, Sleep 2015; Mindell, Sleep 2009", why:"After 1–2 weeks, the brain starts releasing melatonin as soon as it recognizes the familiar sequence — before lights are off. Melatonin raised GH up to 157% in adult studies. The routine itself becomes a GH lever.", tip:"Same order, always. They stop fighting bedtime.",
      pumps:[
        { p:"Anticipatory melatonin*", n:"up to 157%", d:"Melatonin raised GH 157% in adult studies — routine auto-triggers it" },
        { p:"Sensory ritual", n:"conditioned", d:"After 1–2 weeks the sequence itself triggers sleep" },
        { p:"Cortisol reduction", n:"predictability", d:"Predictable routines lower cortisol in children" },
      ]},

    { id:"cool", t:"Cool room", sub:"65–68°F + fan for pink noise", gh:"60–80% GH", headline:"core temp must drop 2–3°F for deep sleep", tier:2, cite:"Krauchi, Nature 1999; Brandenberger, Lancet 2000", why:"The body must lower core temperature by 1–1.5°C to initiate SWS — where the massive nocturnal GH surge occurs. Cool room + warm blanket = fastest path.", tip:"Crack a window, use a fan. Fan doubles as pink noise." },

    { id:"dark", t:"Complete darkness", sub:"Blackout curtains — tape every LED", gh:"60–80% GH", headline:"even dim light suppresses 50%+ of melatonin-driven GH", tier:0, cite:"Brandenberger, Lancet 2000; Gooley, JCEM 2011", why:"Normal sleep produces a single massive GH surge — 3× greater peak than disrupted sleep. Even a small LED suppresses melatonin-driven GH by 50%+. Every lever today builds to this one nocturnal surge.", tip:"Blackout curtains are the single best investment. Tape every LED. Red nightlight only." },

    { id:"bed", t:"In bed by 8:00–8:30pm", sub:"Asleep by 9 — target 10–12 hours", gh:"60–80% GH", headline:"each 90-min cycle is one 'growth rep' — 11 hrs = 7–8 reps", tier:0, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000; Takahashi, J Clin Invest 1968", why:"Everything today builds to this. Normal sleep = 3× more peak GH. Each 90-minute cycle is one 'growth rep.' 11 hours = 7–8 reps. 8 hours = only 5. With every lever activated — choline-primed pituitary, sprint-triggered lactate, IGF-1 conversion, amino reloading, GABA, glycine, melatonin, casein slow-releasing, core temp dropped, complete darkness — the 24-hour cycle begins again tomorrow with eggs.", tip:"10–12 hours. Non-negotiable. This is the most important item on the entire page." },
  ]},
];


// ═══════════════════
// GREEN NUMBER RENDERER
// ═══════════════════
const greenNum = (text: string) => {
  if (!text) return null;
  return text.split(/(\d+[\.,]?\d*%?×?)/g).map((part, i) =>
    /\d/.test(part)
      ? <span key={i} style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", color:"#059669" }}>{part}</span>
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
      background:"#fff",
      borderRadius: isSig ? 20 : 14,
      border: isSig ? "2px solid #a7f3d0" : item.feat ? "2px solid #fbbf24" : "1px solid #e7e5e4",
      overflow:"hidden",
      opacity: done ? 0.55 : 1,
      transition:"all 0.3s ease",
      boxShadow: isSig ? "0 4px 24px rgba(5,150,105,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
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
              background: done ? "#059669" : "transparent",
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
                color: done ? "#a8a29e" : "#1c1917",
                lineHeight:1.3,
                textDecoration: done ? "line-through" : "none",
              }}>{item.t}</span>
              {!noGH && <span style={{
                fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif",
                fontSize:13, color:"#059669", flexShrink:0,
              }}>{item.gh}</span>}
            </div>

            {/* Subtitle in mono */}
            <div style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:11, color:"#57534e", marginTop:3, lineHeight:1.3,
            }}>{item.sub}</div>

            {/* Headline — the ONE thing */}
            {!isUtil && <div style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:11.5, color:"#57534e", marginTop:6, lineHeight:1.5,
            }}>{greenNum(item.headline)}</div>}

            {/* Citation */}
            <div style={{
              fontFamily:"'Courier New', Courier, monospace",
              fontSize:9, color:"#57534e", opacity:0.55, marginTop:4, lineHeight:1.3,
            }}>{item.cite}</div>
          </div>

          {/* Expand arrow */}
          {(item.pumps || item.foods || item.why) && <span style={{
            color:"#d6d3d1", fontSize:10, marginTop:4, flexShrink:0,
            transition:"transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "none",
          }}>▼</span>}
        </div>
      </div>

      {/* Expanded view */}
      {isOpen && <div onClick={e => e.stopPropagation()} style={{ padding:"0 20px 18px", borderTop:"1px solid #f5f5f0" }}>
        {item.why && <div style={{ background:"#f0fdf4", borderRadius:12, padding:"12px 14px", margin:"14px 0 12px" }}>
          <p style={{ fontSize:13, color:"#065f46", lineHeight:1.65, margin:0 }}>{item.why}</p>
        </div>}

        {item.tip && <p style={{ fontSize:12.5, color:"#78716c", fontStyle:"italic", marginBottom:14, lineHeight:1.55 }}>{item.tip}</p>}

        {item.pumps && <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:8.5, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Growth hormone pathways</div>
          {item.pumps.some(p => p.p.includes('*')) && <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8.5, color:"#a8a29e", marginBottom:8, lineHeight:1.4 }}>* Percentages from adult studies using isolated amino acids or supplements. Whole foods deliver these pathways at lower but meaningful doses.</div>}
          {item.pumps.map((pump, i) => (
            <div key={i} style={{ display:"flex", alignItems:"baseline", gap:8, padding:"4px 0", borderTop: i > 0 ? "1px solid #f5f5f0" : "none" }}>
              <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:13, color:"#059669", minWidth:56, textAlign:"right", flexShrink:0 }}>{pump.n}</span>
              <span style={{ fontSize:11.5, fontWeight:600, color:"#1c1917" }}>{pump.p}</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#a8a29e", flex:1 }}>— {pump.d}</span>
            </div>
          ))}
        </div>}

        {item.foods && <div>
          <div style={{ fontSize:8.5, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Food sources</div>
          {item.foods.map((food, i) => (
            <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderTop: i > 0 ? "1px solid #f5f5f0" : "none" }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:"#1c1917", flex:1, lineHeight:1.4 }}>{food.f}</div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#a8a29e", maxWidth:200, textAlign:"right", lineHeight:1.4 }}>{food.d}</div>
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

  // Persist checkmarks in localStorage, keyed by today's date (auto-resets daily)
  const todayKey = `biokids_done_${new Date().toISOString().slice(0, 10)}`;
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

  const [introOpen, setIntroOpen] = useState(true);

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
          borderBottom: allCoreDone ? "1px solid #a7f3d0" : "1px solid #e7e5e4",
          padding:"10px 20px 12px",
          transition:"all 0.5s ease",
        }}>
          <div style={{ maxWidth:540, margin:"0 auto" }}>
            {/* Core progress (primary) */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color: allCoreDone ? "#059669" : "#a8a29e" }}>
                {allCoreDone ? "Core goals complete" : "Core goals"}
              </span>
              <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:15, color:"#059669" }}>
                {coreDoneCount}/{coreTotal}
              </span>
            </div>
            <div style={{ height:4, borderRadius:2, background: allCoreDone ? "#a7f3d0" : "#e7e5e4", overflow:"hidden", marginBottom:6 }}>
              <div style={{ height:"100%", borderRadius:2, background:"#059669", width:`${corePct}%`, transition:"width 0.4s ease" }} />
            </div>
            {/* Bonus progress (secondary — smaller) */}
            {(doneCount - coreDoneCount > 0 || allCoreDone) && (
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#c8c3bc" }}>
                  {allDone ? "Everything done" : "Bonus"}
                </span>
                <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:11, color:"#a8a29e", fontWeight:700 }}>
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
            <span style={{ color:"#059669" }}>bioKids</span> is a state of the art application to optimize the natural rhythm of the body&apos;s own growth signals to keep your child&apos;s growth maximally supported all day and all night — organically.
            <span style={{ color:"#059669", fontSize:9, transition:"transform 0.2s ease", transform: introOpen ? "rotate(180deg)" : "none", display:"inline-block", marginLeft:6 }}>▼</span>
          </p>

          {introOpen && <>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:14, color:"#44403c", lineHeight:1.75, maxWidth:440, marginBottom:14 }}>
              It&apos;s built on one simple idea: when you arrange a child&apos;s day with care, growth hormone doesn&apos;t need to be forced or hacked — it&apos;s invited, again and again.
            </p>

            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:14, color:"#44403c", lineHeight:1.75, maxWidth:440, marginBottom:14 }}>
              We shaped this first for our own families, and now offer it as a gift to parents and to the kids they love.
            </p>

            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:14, color:"#44403c", lineHeight:1.75, maxWidth:440, margin:0, fontStyle:"italic" }}>
              Growth hormone doesn&apos;t just drive height — every GH pulse simultaneously helps optimize brain development.
            </p>
          </>}
        </div>

        {/* Progress spacer — reserves space when sticky bar is visible */}
        {doneCount > 0 && <div style={{ height:48 }} />}

        {/* Core goals celebration */}
        {showCoreCelebration && (
          <div style={{
            background:"linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ecfdf5 100%)",
            borderRadius:20, border:"2px solid #a7f3d0",
            padding:"28px 24px", margin:"24px 0 0",
            boxShadow:"0 4px 24px rgba(5,150,105,0.12)",
            animation:"celebrateFadeIn 0.6s ease",
          }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>&#x2728;</div>
              <p style={{
                fontSize:18, fontWeight:800, color:"#059669", margin:"0 0 10px",
                letterSpacing:"-0.02em",
              }}>
                Every core goal — done.
              </p>
              <p style={{
                fontFamily:"'Courier New', Courier, monospace",
                fontSize:13, color:"#065f46", lineHeight:1.65, margin:"0 0 14px",
                maxWidth:380, marginLeft:"auto", marginRight:"auto",
              }}>
                You just gave {childName === 'Your child' ? 'your child' : childName} a full day of growth support. The science says this matters — and so do you for showing up like this.
              </p>
              {!allDone && (
                <div style={{
                  background:"rgba(255,255,255,0.7)", borderRadius:12,
                  padding:"12px 16px", marginTop:16,
                }}>
                  <p style={{
                    fontFamily:"'Courier New', Courier, monospace",
                    fontSize:11.5, color:"#57534e", lineHeight:1.6, margin:0,
                  }}>
                    There are {total - coreTotal - (doneCount - coreDoneCount)} bonus items left — these are the amplifiers.
                    Each one you check off stacks on top of today&apos;s foundation.
                    No pressure. You&apos;ve already done the hard part.
                  </p>
                </div>
              )}
              {allDone && (
                <p style={{
                  fontFamily:"'Courier New', Courier, monospace",
                  fontSize:12, color:"#059669", fontWeight:700, margin:"8px 0 0",
                }}>
                  Every single item. That&apos;s extraordinary.
                </p>
              )}
            </div>
          </div>
        )}

        {/* All items complete — full day celebration */}
        {allDone && (
          <div style={{
            background:"#059669", borderRadius:20,
            padding:"28px 24px", margin:"16px 0 0",
            boxShadow:"0 8px 32px rgba(5,150,105,0.25)",
          }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:10 }}>&#x1F31F;</div>
              <p style={{ fontSize:18, fontWeight:800, color:"#fff", margin:"0 0 8px", letterSpacing:"-0.02em" }}>
                Perfect day.
              </p>
              <p style={{
                fontFamily:"'Courier New', Courier, monospace",
                fontSize:13, color:"rgba(255,255,255,0.85)", lineHeight:1.65, margin:0,
                maxWidth:380, marginLeft:"auto", marginRight:"auto",
              }}>
                {total}/{total} — every lever pulled, every window used.
                {childName === 'Your child' ? ' Your child' : ` ${childName}`} got the full protocol today.
                That&apos;s a parent who cares deeply. Tomorrow it starts again — and it gets easier.
              </p>
            </div>
          </div>
        )}

        {/* Breath before the day begins */}
        <div style={{ height:1, background:"#e7e5e4", margin:"36px 0 40px" }} />

        {/* Day sections */}
        {dayData.map((p, pi) => (
          <div key={p.period} ref={el => { periodRefs.current[p.period] = el; }} style={{ marginBottom: pi < dayData.length - 1 ? 44 : 0 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                <span style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>{p.period}</span>
                <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#c8c3bc" }}>{p.time}</span>
                {activePeriod === p.period && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#ecfdf5", padding:"2px 8px", borderRadius:10 }}>
                    <span style={{ width:5, height:5, background:"#059669", borderRadius:"50%", display:"inline-block" }} />
                    <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.04em" }}>Now</span>
                  </span>
                )}
              </div>
              {p.note && <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#059669", marginTop:4, fontWeight:600 }}>{p.note}</div>}
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

        {/* Footer */}
        <div style={{ margin:"52px 0 40px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10.5, color:"#a8a29e", lineHeight:1.7 }}>
            Every number on this page comes from a peer-reviewed study.<br/>
            Items marked with * are from adult studies using isolated amino acids or supplements.<br/>
            Whole foods deliver these same pathways at lower but meaningful doses.<br/>
            We read the research so you can focus on your child.
          </p>
        </div>
      </div>
    </div>
  );
}
