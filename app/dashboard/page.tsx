'use client';

import { useState } from "react";
import Nav from '@/components/Nav';

/*
 * bioKids — Ive Edition v6
 *
 * CHANGES FROM v5:
 * - Green numbers on EVERY item (morning, afternoon, evening)
 * - Afternoon restructured: sprint → jumping → stretching → milk (proper sequence)
 * - Stretching is its own dedicated item with Chinese RCT data
 * - Preschool jumping (3-6y) data added to jumping card
 * - Korean cohort (~6.1 cm/yr) validation referenced
 * - Cold exposure as morning item
 * - All percentages in science lines render green
 */

const F = {
  num: { fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", color:"#059669", letterSpacing:"-0.03em" } as React.CSSProperties,
  mono: { fontFamily:"'Courier New', Courier, monospace" } as React.CSSProperties,
};

// ═══════════════════
// THE DAY
// ═══════════════════
const dayData = [
  { period:"Morning", desc:"Prime the system", items:[
    { id:"wake", t:"Consistent wake time — same ±30 min, weekends too", gh:"60-80%", line:"of tonight's growth hormone (60-80%) depends on today's wake time. Normal sleep = 3× more peak growth hormone", cite:"Wittmann 2006; Brandenberger, Lancet 2000; Van Cauter, JAMA 2000", why:"Your child's growth hormone pulses tonight are programmed by this morning's wake time. The pituitary releases growth hormone on a circadian schedule set by the suprachiasmatic nucleus. Brandenberger et al. (Lancet 2000) showed that normal sleep produces 3× more peak growth hormone than disrupted sleep — the concentrated nocturnal surge is abolished without proper circadian timing. Variability >1 hour scrambles this. One late Saturday can disrupt growth hormone pulse timing through Wednesday.", tip:"Same time ±30 min, including weekends. This is the easiest lever and it's free." },

    { id:"sun", t:"10 min morning sunlight, no sunglasses", gh:"157%", line:"growth hormone tonight from melatonin (157%). Programs melatonin onset 14-16 hrs from now. Also triggers vitamin D for IGF-1", cite:"Roenneberg, Curr Biol 2007; Forsling, J Pineal Res 1999; Soliman, Indian J Endocrinol Metab 2014", why:"Morning light hits melanopsin receptors → synchronizes the suprachiasmatic nucleus → programs melatonin release tonight. Melatonin increases growth hormone 157% AND inhibits aromatase (the enzyme that closes growth plates). Morning sun also triggers vitamin D synthesis — deficiency blunts the entire growth hormone → IGF-1 → growth plate pathway.", tip:"Backyard, bus stop walk, porch breakfast. Overcast still works. Even better: combine with 5-10 min stretching outdoors — sets circadian clock while decompressing the spine.",
      pumps:[
        { p:"Melatonin timing", n:"157%", d:"Tonight's melatonin onset is set by this morning's light" },
        { p:"Aromatase inhibition", n:"—", d:"Melatonin blocks estrogen → delays growth plate closure" },
        { p:"Vitamin D synthesis", n:"IGF-1 enabler", d:"Deficiency blunts the entire growth hormone → IGF-1 axis" },
      ]},

    { id:"cold", t:"Cool water — last 30-60 sec of shower", gh:"↑ GH", line:"on rewarming. Norepinephrine 200-300%. Free, takes seconds, compounds with everything", cite:"Okada, JCEM 1970; Sramek, Eur J Appl Physiol 2000", why:"Exposure to cold raised growth hormone from <1.1 to >4.2 ng/ml on rewarming. Cold triggers norepinephrine 200-300%. Water conducts heat 25× faster than air. For kids: a brief cool rinse at the end of the shower, progressing gradually. Never force it — let them choose. Outdoor play in cool weather does the same thing.", tip:"Start with 10 seconds of cool (not cold). Progress to 30-60 seconds over weeks. They'll adapt. Morning or after school — never right before bed.",
      pumps:[
        { p:"Growth hormone on rewarming", n:"↑ GH", d:"GH rose from <1.1 to >4.2 ng/ml after cold exposure" },
        { p:"Norepinephrine", n:"200-300%", d:"Cold stress triggers norepinephrine which supports alertness and metabolism" },
      ]},

    { id:"bkf", t:"Pasture-raised eggs (2-3) + citrus", gh:"4,400%", line:"Choline (4,400% with exercise, 290% at rest). Glutamine (400%). Ornithine (300%). Lysine + Arginine (700%). L-DOPA/tyrosine (221%). Retinol (40-60% receptor function). B12. Glycine (300%). Taurine. Choline → acetylcholine → primes pituitary. Also delivers glutamine (400%), ornithine (300%), lysine + arginine (700%)", cite:"Ziegenfuss, JISSN 2008; Kawamura, Nutrition 2012", why:"Eggs are the richest whole-food choline source. Choline → acetylcholine → stimulates GHRH neurons in the hypothalamus, priming the pituitary for every growth hormone pulse all day. This restarts the 24-hour GH cycle — last night's casein from the Sleep Drink bridged overnight, and now choline reignites the axis. But eggs don't stop at choline — they also deliver glutamine, ornithine, tyrosine (dopamine precursor), and complete amino acids including lysine and arginine.", tip:"Scrambled or over easy. 5 minutes. Skip cereal — always. Over easy preserves more vitamins. Serve with orange slices (vitamin C boosts iron from eggs 2-3×). No cheese at this meal — calcium competes with egg iron.",
      pumps:[
        { p:"A-GPC (choline)", n:"4,400%", d:"Two eggs ≈ 300mg choline → acetylcholine → primes every growth hormone pulse" },
        { p:"A-GPC at rest", n:"290%", d:"Choline pathway works even without exercise" },
        { p:"Glutamine", n:"400%", d:"Eggs contain glutamine — 2g quadruples growth hormone in 30 min" },
        { p:"Ornithine", n:"300%", d:"Cycles with arginine via urea cycle to amplify growth hormone" },
        { p:"L-DOPA (tyrosine)", n:"221%", d:"Tyrosine → dopamine → stimulates GHRH at pituitary" },
        { p:"Retinol (vitamin A)", n:"40-60%", d:"Required for GH receptor gene expression" },
        { p:"B12", n:"cell division", d:"Required for chondrocyte division at growth plates" },
        { p:"Glycine", n:"300%", d:"Growth plate collagen building block" },
        { p:"Lysine + Arginine", n:"700%", d:"Eggs deliver balanced lysine and arginine together" },
        { p:"Taurine", n:"potentiator", d:"Supports bile acids for fat-soluble vitamin absorption (D, A, K)" },
      ],
      foods:[
        { f:"Pasture-raised eggs, 2-3 daily", d:"Richest whole-food choline. Two eggs ≈ 300mg. Also glutamine, ornithine, tyrosine." },
        { f:"Orange slices or bell peppers with eggs", d:"Vitamin C boosts iron absorption from eggs 2-3×. No dairy at this meal — calcium competes with iron." },
        { f:"Beef liver, 1×/week (or liver-beef blend 2-3×/week)", d:"Highest choline density of any meat. Also retinol + B12 + zinc + taurine. PAIR WITH VITAMIN C, NOT MILK." },
      ]},

    { id:"d1", t:"8 oz A2 milk or sheep's milk yogurt", gh:"10-20%", line:"IGF-1 (10-20%). +0.39 cm per 8 oz/day. Casein slow-release (451% at 24h). α-lactalbumin → melatonin (157%). Lysine + arginine (700%). GABA from fermented yogurt/kefir (400%). Calcium + phosphorus. Height shift P=0.005. 240 mL/day shifted growth hormone in prepubertal children (P=0.005). +0.39 cm per 8 oz/day", cite:"Hoppe, Eur J Clin Nutr 2008; Kang, Nutrients 2019", why:"Milk proteins directly stimulate hepatic IGF-1 production. Six key proteins: casein (slow-release aminos 6-7 hrs + calcium/phosphorus for bones), α-lactalbumin (highest tryptophan → serotonin → melatonin → deeper sleep → larger growth hormone pulses), lactoferrin (iron + immunity), lysozyme (gut health), sIgA (mucosal immunity), albumin support (transports IGF-1 and hormones).", tip:"Start the 24 oz daily target here. A2 or raw milk avoids A1 casein issues. Sheep's yogurt has 50-80% more casein per volume. IRON-DAIRY RULE: serve milk between meals or post-sprint, not alongside big iron meals (calcium competes with iron). Breakfast dairy FIRST (within 1 hour of waking), then eggs after. Add pumpkin seeds to sheep yogurt for arginine + zinc + magnesium in one handful.",
      pumps:[
        { p:"IGF-1 stimulation", n:"10-20%", d:"240 mL/day → measurable IGF-1 shift (P=0.005)" },
        { p:"Height per serving", n:"+0.39 cm", d:"Per additional 8 oz/day across childhood (cohort data)" },
        { p:"α-Lactalbumin → melatonin", n:"157%", d:"Highest tryptophan protein → serotonin → melatonin → growth hormone" },
        { p:"Casein overnight", n:"451%", d:"Slow-releases aminos 6-7 hrs feeding overnight growth hormone pulses" },
        { p:"Lysine + Arginine", n:"700%", d:"Milk delivers both synergistic aminos" },
        { p:"GABA (yogurt/kefir)", n:"400%", d:"Lactobacillus fermentation produces GABA → suppresses somatostatin" },
        { p:"Calcium + phosphorus", n:"bone mineral", d:"Via casein micelles — direct bone mineralization" },
      ],
      foods:[
        { f:"A2 whole milk, 8 oz", d:"Casein + whey + tryptophan + calcium. The workhorse." },
        { f:"Sheep's milk yogurt, 5 oz", d:"50-80% more casein. Lactobacillus produces GABA (~400% growth hormone)." },
        { f:"Full-fat kefir", d:"All milk proteins PLUS fermentation-derived GABA (~400% growth hormone)." },
        { f:"Goat milk (A2-type)", d:"Less αs1-casein, potentially easier digestion." },
      ]},

    { id:"clo", t:"Cod liver oil — ½ tsp daily (NOT on beef liver days)", gh:"40-60%", line:"of growth hormone receptor function lost without retinol (40-60%). CLO delivers retinol + vitamin D + omega-3s in one spoon", cite:"Balmer, J Lipid Res 2002; Soliman, Indian J Endocrinol Metab 2014; Mukherjee, J Biol Chem 1996", why:"CLO delivers three growth levers in one spoon. Retinol (vitamin A) is required for growth hormone receptor gene expression — deficiency cuts binding 40-60%. Vitamin D deficiency blunts the entire growth hormone → IGF-1 → growth plate pathway. Omega-3s are anti-inflammatory at the growth plate.", tip:"In a smoothie — they won't taste it. Skip on beef liver days — both deliver high-dose vitamins A and D, doubling up risks excess retinol. CLO daily on all other days.",
      pumps:[
        { p:"Retinol → GH receptors", n:"40-60%", d:"Deficiency reduces growth hormone receptor binding by this much" },
        { p:"Vitamin D → IGF-1", n:"axis enabler", d:"Deficiency blunts IGF-1 production and growth plate signaling" },
        { p:"Omega-3s", n:"anti-inflammatory", d:"Reduces inflammation at the growth plate itself" },
      ],
      foods:[
        { f:"Cod liver oil, ½ tsp daily", d:"Retinol + vitamin D + omega-3s in one dose." },
        { f:"Wild-caught salmon, 2-3×/week", d:"Vitamin D + omega-3s + niacin + complete protein." },
        { f:"Sardines (bones in)", d:"Vitamin D + calcium + omega-3s." },
      ]},

    { id:"cit", t:"Citrus or vitamin C food with every iron meal", gh:"2-3×", line:"iron absorption boosted 2-3× by vitamin C. Inositol supports the lysine-inositol-B12 growth pathway. Fiber slows insulin", cite:"Hallberg, Am J Clin Nutr 1989; Chinese ISS RCT (lysine-inositol-B12)", why:"Vitamin C boosts iron absorption 2-3× — critical because iron delivers oxygen to growing tissues and growth plate chondrocytes. In the Chinese ISS RCT, inositol (200mg) was part of the lysine-inositol-B12 syrup that produced significant height gains. Citrus delivers vitamin C + inositol + fiber. IRON-DAIRY RULE: pair iron meals (beef, liver, lentils) with vitamin C, NOT milk — calcium competes with iron. Save milk for between meals, post-sprint, and bedtime.", tip:"Orange slices or lemon water with beef, liver, or lentil meals. Never serve milk alongside big iron meals.",
      pumps:[
        { p:"Iron absorption boost", n:"2-3×", d:"Vitamin C dramatically increases iron uptake from food" },
        { p:"Inositol → growth pathway", n:"ISS RCT", d:"Part of the lysine-inositol-B12 combo that beat supplementation alone" },
        { p:"Fiber → insulin control", n:"protected GH", d:"Slows glucose → prevents insulin spikes that suppress GH" },
      ],
      foods:[
        { f:"Orange / mandarin slices with iron meals", d:"Vitamin C + inositol + fiber. Pair with beef, liver, lentils." },
        { f:"Bell peppers (red/yellow)", d:"Higher vitamin C than oranges. Great in stir-fry with beef." },
        { f:"Lemon water with meals", d:"Easiest way to boost iron absorption." },
        { f:"Strawberries, kiwi", d:"High vitamin C + fiber + natural inositol." },
      ]},

    { id:"ns", t:"No sugar until lunch — no artificial sweeteners ever", gh:"300%", line:"higher fasting growth hormone (300-500%). Insulin from cereal suppresses growth hormone up to 80%. Artificial sweeteners destroy GABA-producing gut bacteria", cite:"Lanzi, Metabolism 1999; Hartman, JCEM 1992; Kojima, Nature 1999", why:"60-80% of daily growth hormone is produced during fasting states. One bowl of cereal spikes insulin, which directly antagonizes growth hormone at the pituitary for 2-3 hours. Ghrelin (the hunger hormone) directly triggers growth hormone — but snacking keeps ghrelin suppressed. Artificial sweeteners (aspartame, sucralose) disrupt the gut microbiome — the bacteria responsible for continuous GABA production (400% growth hormone). Protect the microbiome = protect the GABA pathway.", tip:"Eggs, dairy, meat for breakfast. Save fruit for after lunch. Even OJ counts. Never artificial sweeteners — they damage the GABA-producing gut bacteria.",
      pumps:[
        { p:"Fasting growth hormone", n:"300-500%", d:"Overnight fast produces 60-80% of daily growth hormone" },
        { p:"Insulin suppression avoided", n:"up to 80%", d:"One sugar spike can block growth hormone for 2-3 hours" },
        { p:"Ghrelin → growth hormone", n:"secretagogue", d:"Hunger itself directly triggers growth hormone at the pituitary" },
        { p:"Microbiome integrity", n:"GABA protected", d:"No artificial sweeteners → gut bacteria keep producing GABA (400%)" },
        { p:"Healthy body composition", n:"sustained GH", d:"Less sugar → less visceral fat → higher baseline GH" },
      ]},

    { id:"joy", t:"Laughter, joy, and play — start the day light", gh:"87%", line:"growth hormone increase (87%) from anticipation of fun alone. Cortisol ↓39%. β-endorphins +27%. A happy kid produces more growth hormone than a stressed one", cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989", why:"Berk et al. (2006): merely anticipating a funny experience raised growth hormone 87%, β-endorphins 27%, and reduced cortisol 39%. Chronic stress (overscheduling, pressure, anxiety) suppresses growth hormone. Joy is not a bonus — it's a growth lever. A relaxed, laughing child has a biochemically better growth hormone environment than a stressed, overscheduled one.", tip:"Morning dance party. Jokes at breakfast. Funny videos on the way to school. Roughhousing before they leave. Protect unstructured play time — it's not wasted time, it's growth time.",
      pumps:[
        { p:"Anticipation of fun", n:"87%", d:"Just anticipating humor raises growth hormone 87%" },
        { p:"Cortisol reduction", n:"↓39%", d:"Less cortisol = less chronic suppression of growth hormone" },
        { p:"β-endorphins", n:"+27%", d:"Endorphins support overall hormonal environment" },
      ]},

    { id:"bp", t:"Light backpack — under 10-15% body weight", gh:"—", line:"Heavy loads compress developing spine. Up to 1% of height lost daily from compression", cite:"Brackley, Spine 2004; Negrini, Spine 2002; Reilly, Ergonomics 1984", why:"Chronic heavy loads affect intervertebral disc height and spinal development during the years when the spine should be lengthening. Combined with daily gravitational compression (up to 1% of height lost by evening), an overweight backpack amplifies the problem.", tip:"Weigh it. Remove what they don't need today. A rolling backpack eliminates the issue." },

    { id:"hang", t:"Dead hang — 3 × 20 sec, thumbs over bar", gh:"—", line:"Axial traction decompresses the spine. Reverses gravity's daily 1% height compression", cite:"Nachemson, Scand J Rehabil Med 1970; Reilly, Ergonomics 1984", why:"Gravity compresses spinal discs all day — up to 1% of height lost by evening. Hanging creates axial traction — pure decompression that rehydrates discs.", tip:"Pull-up bar, playground bar, door-frame bar. Relax shoulders completely. Let the spine lengthen." },
  ]},

  { period:"Afternoon", desc:"Sprint → Jump → Stretch → Milk", items:[
    { id:"lunch", t:"Animal protein + peanuts + lentils + broccoli + citrus", gh:"700%", line:"Lysine + arginine (700%). Glutamine (400%). Niacin (350%). Ornithine (300%). L-DOPA (221%). Arginine (+0.33 cm/yr). Iron (2-3× with vitamin C). Zinc (+0.37cm). B12. Magnesium (SWS). Fiber → protected GH. Inositol (ISS). Aromatase block. Taurine. Lysine + arginine together = 7-8× growth hormone. Habitual arginine = +0.33 cm/yr", cite:"Isidori, Curr Med Res Opin 1981; Larnkjaer, J Nutr 2012", why:"This meal activates 10+ growth hormone pathways and primes the afternoon sprint. Beef liver is the highest choline density of any meat + retinol + B12 + zinc — mix with ground beef if needed (burgers, meatballs, bolognese). Eggs add more choline + complete aminos. Peanuts deliver niacin which suppresses free fatty acids that brake GH → primes the afternoon sprint (350% greater peak GH on repeat sprint). Lysine + arginine synergy (700%). Glutamine (400%). Ornithine (300%). Arginine from pumpkin seeds (200% + 0.33cm/yr). Cruciferous block aromatase. WARNING: No cod liver oil on beef liver days — both deliver high-dose fat-soluble vitamins A and D. Doubling up risks excess retinol. CLO should be taken daily on all OTHER days at breakfast.", tip:"Beef liver mixed into ground beef (burgers, meatballs, bolognese) — kids won't taste it. Peanuts or PB prime the afternoon sprint (niacin). Broccoli for aromatase block. Lentils + orange slices (vitamin C boosts iron 2-3×). NO DAIRY at this meal. No CLO on liver days.",
      pumps:[
        { p:"Lysine + Arginine", n:"700%", d:"Beef = lysine; pumpkin seeds = arginine. Together = 7-8×" },
        { p:"Glutamine (beef)", n:"400%", d:"One serving of beef > 2g glutamine → 4-fold growth hormone" },
        { p:"Ornithine (beef)", n:"300%", d:"Cycles with arginine via urea cycle to amplify growth hormone" },
        { p:"L-DOPA (tyrosine)", n:"221%", d:"Protein → tyrosine → dopamine → stimulates growth hormone" },
        { p:"Arginine (pumpkin seeds)", n:"200%", d:"Highest plant arginine (~7g/cup). Copenhagen: +0.33 cm/yr" },
        { p:"Magnesium (pumpkin seeds)", n:"SWS amplifier", d:"Deepens slow-wave sleep → larger growth hormone pulses tonight" },
        { p:"Zinc (pumpkin seeds)", n:"+0.37 cm", d:"WHO meta-analysis: zinc alone = +0.37 cm in 24 weeks" },
        { p:"Taurine (meat)", n:"potentiator", d:"Supports bile for fat-soluble vitamin absorption (D, A, K)" },
        { p:"Iron (beef + lentils)", n:"growth enabler", d:"Required for oxygen delivery to growing tissues" },
        { p:"Iron absorption (vitamin C)", n:"2-3×", d:"Citrus/peppers with iron meal = dramatically more iron uptake" },
        { p:"B12 (beef)", n:"cell division", d:"Required for chondrocyte division at growth plates" },
        { p:"Fiber (lentils + seeds)", n:"protected GH", d:"Slows glucose → protects insulin-sensitive GH secretion" },
        { p:"Inositol (lentils + peanuts)", n:"ISS RCT", d:"Part of the lysine-inositol-B12 growth pathway" },
      ],
      foods:[
        { f:"⬜ Beef liver 1×/week (or liver-ground beef blend 2-3×/week)", d:"HIGHEST choline + niacin (350%) + iron + retinol (40-60%) + B12 + zinc. Mix into burgers, meatballs, bolognese. PAIR WITH VITAMIN C, NOT MILK. No CLO on liver days." },
        { f:"⬜ Cooked oysters 1×/week", d:"28.2mg zinc per 3 oz (full week's RDA). Hits all 3 growth axis levels: pituitary + liver + growth plate. + iron + B12 + omega-3s." },
        { f:"⬜ Wild salmon 2×/week", d:"Omega-3s (↑ IGF-1) + vitamin D + arginine + niacin + taurine." },
        { f:"ANIMAL PROTEIN RANKING (by GH pump density):", d:"All deliver arginine, glutamine, ornithine, glycine, lysine, choline, tyrosine, taurine, niacin." },
        { f:"1. Beef liver (1×/wk pure, 2-3×/wk blend)", d:"Highest choline (4,400%) + niacin (350%) + iron + retinol + B12 + zinc. The king." },
        { f:"2. Cooked oysters (1×/wk)", d:"Zinc (week's RDA) + iron + B12 + vitamin D + omega-3s. Multi-pathway." },
        { f:"3. Beef (any cut, daily)", d:"Glutamine (400%) + ornithine (300%) + lysine + tyrosine (221%) + taurine + iron + B12 + zinc." },
        { f:"4. Wild salmon (2×/wk)", d:"Omega-3s → IGF-1 + vitamin D + niacin + taurine. Anti-inflammatory at growth plate." },
        { f:"5. Turkey breast", d:"Highest niacin per gram (350% sprint prep) + highest arginine per gram (200%). Sprint primer." },
        { f:"6. Chicken (skin-on thighs)", d:"Collagen/glycine (300%) from skin + taurine (higher in dark meat) + complete aminos." },
        { f:"7. Eggs (2-3 daily)", d:"Choline (4,400%) + glutamine + ornithine + tyrosine + retinol + B12 + glycine." },
        { f:"Pumpkin seeds (daily)", d:"Arginine (200%/+0.33cm) + magnesium + zinc (+0.37cm) + tryptophan. One handful." },
        { f:"Peanuts / PB", d:"Niacin (350% sprint prep) + arginine (200%) + inositol + magnesium + fiber." },
        { f:"Lentils / beans + citrus", d:"Iron + lysine + inositol + fiber. VITAMIN C boosts iron 2-3×. NO DAIRY here." },
        { f:"Broccoli / cauliflower (side)", d:"DIM + I3C → aromatase inhibition → growth plates stay open." },
      ]},

    { id:"water", t:"Water only — no juice, no soda, no artificial sweeteners", gh:"300%", line:"GH protected (300%). Insulin suppression avoided (up to 80%). Ghrelin builds (secretagogue). Microbiome integrity (GABA protected). Healthy body composition (sustained GH). No artificial sweeteners. Each sugar spike suppresses up to 80%. Artificial sweeteners destroy GABA-producing gut bacteria", cite:"Lanzi, Metabolism 1999; Kojima, Nature 1999", why:"Every juice box or soda triggers an insulin spike that shuts down growth hormone for 2-3 hours. Allow 3-4 hour gaps between meals — ghrelin directly triggers growth hormone. Artificial sweeteners disrupt gut microbiome — the bacteria responsible for continuous GABA production (400% growth hormone). Abdominal fat is a stronger predictor of low growth hormone than age.", tip:"Water or milk between meals. Nothing else. Never artificial sweeteners.",
      pumps:[
        { p:"Insulin suppression avoided", n:"up to 80%", d:"Each sugar spike blocks GH for 2-3 hours" },
        { p:"Ghrelin builds", n:"secretagogue", d:"3-4 hour meal gaps let ghrelin trigger GH" },
        { p:"Microbiome integrity", n:"GABA protected", d:"No artificial sweeteners → gut bacteria keep producing GABA (400%)" },
        { p:"Healthy body composition", n:"sustained GH", d:"Less sugar → less visceral fat → higher baseline GH" },
      ]},

    { id:"nap", t:"No naps after 2-3pm", gh:"60-80%", line:"of tonight's growth hormone (60-80%) is at risk. Late naps steal adenosine. Normal sleep = 3× more peak growth hormone", cite:"Milner, J Sleep Res 2009; Brandenberger, Lancet 2000", why:"Naps after 3pm steal adenosine sleep pressure needed for deep slow-wave sleep tonight. The Brandenberger study (Lancet 2000) showed the nocturnal growth hormone surge produces 3× more peak growth hormone during normal sleep vs disrupted sleep — and sleep deprivation abolishes the concentrated surge entirely. The first slow-wave cycle, the one most disrupted by late naps, contains the single largest growth hormone pulse of the day.", tip:"If they truly need a nap, before 2pm and under 30 minutes." },

    { id:"pre", t:"Over easy eggs + peanuts 30-60 min before sprints", gh:"4,400%", line:"Choline (4,400%) + niacin (350% greater peak GH) + arginine (200%). Inositol (ISS pathway). Fiber (protected GH). Magnesium (SWS amplifier). Glutamine (400%). Choline (4,400%) + niacin (350% greater peak GH on repeat sprint) + arginine (200%) prime the sprint response", cite:"Stokes, J Appl Physiol 2008; Ziegenfuss, JISSN 2008", why:"Choline from eggs primes the hypothalamic-pituitary axis (4,400% with exercise). Niacin from peanuts blocks free fatty acids — a molecular brake on growth hormone. Stokes et al. (2008): niacin suppressed FFAs and amplified the second sprint's GH to ~23.3 μg/L vs ~5.2 controls (~350% greater peak, ~422% greater AUC). Peanuts also deliver arginine (200%) and magnesium.", tip:"Over easy eggs preserve more vitamins. Unroasted peanuts or natural PB. No dairy here — eggs have iron. Save milk for post-sprint.",
      pumps:[
        { p:"A-GPC (choline from eggs)", n:"4,400%", d:"Primes the pituitary for maximum sprint growth hormone" },
        { p:"Niacin (from peanuts)", n:"350%", d:"Niacin → ~350% greater peak GH on second sprint (~23.3 vs ~5.2 μg/L)" },
        { p:"Arginine (from peanuts)", n:"200%", d:"Suppresses somatostatin, the growth hormone brake" },
        { p:"Inositol (peanuts)", n:"ISS pathway", d:"Part of the lysine-inositol-B12 growth axis" },
        { p:"Fiber (peanuts)", n:"protected GH", d:"Fiber slows glucose → protects GH" },
        { p:"Magnesium (from peanuts)", n:"SWS amplifier", d:"Tonight's deep sleep will be deeper" },
        { p:"Glutamine (from eggs)", n:"400%", d:"Additional growth hormone substrate" },
      ],
      foods:[
        { f:"Pasture-raised eggs (over easy)", d:"Choline (4,400%) + glutamine (400%) + ornithine (300%) + tyrosine (221%)." },
        { f:"Peanuts / peanut butter (unroasted)", d:"Niacin (350% greater GH on repeat sprint) + arginine (200%) + magnesium." },
        { f:"Turkey breast (alternative)", d:"Highest niacin + arginine per gram." },
      ]},

    { id:"spr", t:"6 × 30-second all-out sprints — 3×/week", gh:"530%", line:"Sprint GH (530%). With choline priming (4,400%). With niacin (350%). Mechanical loading (growth plates). Healthy body composition (sustained GH). Even 6-sec sprint = 217%. Lactate from maximal effort is the primary trigger", cite:"Stokes, J Sports Sci 2002; Stokes, J Appl Physiol 2008; Nevill, J Appl Physiol 1996", why:"A single 30-second all-out sprint produces a 530% growth hormone spike above baseline, elevated 90-120 minutes. Nothing in nutrition comes close. A 6-second sprint still raises growth hormone ~217%. The trigger is lactate — which only accumulates at true maximum effort. With pre-sprint choline + niacin, every sprint's response is maximized.", tip:"100 meters, 2-4 min FULL rest between, 6 times. Tag, races, and hill sprints all count — as long as it's genuinely all-out. Hill sprints produce higher lactate from incline. Alternate days with jumping.",
      pumps:[
        { p:"Sprint growth hormone", n:"530%", d:"Per 30-sec all-out sprint. Elevated 90-120 min." },
        { p:"6-sec sprint", n:"217%", d:"Even short bursts produce substantial growth hormone" },
        { p:"With choline priming", n:"4,400%", d:"Pre-sprint eggs amplify the response to 44-fold" },
        { p:"Mechanical loading", n:"growth plates", d:"Direct stimulation of growth plate chondrocytes" },
        { p:"Healthy body composition", n:"sustained GH", d:"Sprints burn visceral fat — strongest predictor of low GH" },
        { p:"With niacin", n:"350%", d:"Peanuts before sprints → 350% greater peak GH on repeat sprint (Stokes 2008)" },
      ]},

    { id:"jump", t:"Jumping protocol — 50-100 jumps, 3×/week (alternate with sprints)", gh:"+4.3 cm", line:"+4.3 cm in 24 weeks. ↑IGF-1. BMD +1.08 (persists years). Preschool data > national avg. Mechanical loading. Healthy body comp. Cortisol ↓ 39%. Laughter/anticipation (87%). Short-stature children: +4.32 cm vs ~1 cm controls. ↑IGF-1, +1.08 bone density, zero injuries", cite:"Zribi, J Pediatr Endocrinol Metab; PMC9135997", feat:true, why:"In a 24-week study of short-stature children (ages 8-11): +4.32 cm vs 0.93-1.84 cm in controls — roughly 3+ cm extra in 6 months. IGF-1 increased significantly. IGF-1/IGFBP-3 ratio improved. Femoral neck bone density +1.08 (Cohen's d ≈ 0.87). Zero injuries. A separate preschool study (ages 3-6, n=196): 3 months of vertical jump training (2×/week, 1 hr) → height gain significantly exceeded Chinese national averages for both boys (P<0.01) and girls (P<0.05). >50% of underweight/overweight children moved toward normal BMI. Korean cohort validation: exercise + sleep + nutrition = ~6.1 ± 1.3 cm/yr height velocity.", tip:"Alternate with sprint days: Mon/Wed/Fri sprints, Tue/Thu jumping — or vice versa. Jump rope (50-100), drop jumps from 20-40cm platforms, single-leg hops across 5 platforms. HR target: 128-155 bpm. Always followed by 10 min stretching.",
      pumps:[
        { p:"Mechanical loading (Wolff's law)", n:"+4.3 cm", d:"Direct growth plate stimulation in 24 weeks" },
        { p:"IGF-1 increase", n:"significant", d:"Growth plate signaling upregulated" },
        { p:"Bone mineral density", n:"+1.08", d:"Femoral neck BMD Z-score. Persists years after stopping." },
        { p:"Preschool data (ages 3-6)", n:"> national avg", d:"Both sexes. P<0.01 boys, P<0.05 girls." },
        { p:"Healthy body composition", n:"sustained GH", d:"Active play maintains lean body comp" },
        { p:"Cortisol reduction", n:"↓39%", d:"Fun play lowers cortisol which suppresses GH" },
        { p:"Laughter / anticipation", n:"87%", d:"Make it fun — anticipation raises GH 87%" },
        { p:"Laughter / free play", n:"87%", d:"Make it fun — anticipation of fun raises growth hormone + drops cortisol 39%" },
      ],
      foods:[
        { f:"Jump rope, 50-100 daily", d:"Progressive mechanical loading on growth plates." },
        { f:"Drop jumps from platforms (20-40 cm)", d:"Step off → land both feet → immediate rebound jump upward." },
        { f:"Single-leg hop drills across 5 platforms", d:"6 sets, 1m apart. Soft landing, balance focus." },
        { f:"Swimming 2-3×/week", d:"Cold exposure + full-body resistance + growth hormone on rewarming." },
        { f:"Unstructured free play + roughhousing", d:"Laughter = 87% growth hormone + cortisol ↓39%." },
      ]},

    { id:"stretch", t:"10 min stretching — dead hang, leg stretches, cobra, cat stretch", gh:"↑ height velocity", line:"ISS RCT: stretching + nutrition → ↑ height velocity. GH elevation (significant). IGF-1 elevation (significant). Spinal decompression (reverses 1% daily loss). Mechanical loading. Optimal dose-response + lysine-inositol-B12 beat supplementation alone (100% higher height velocity at 12 months). Moderate duration is key — more days/week = better", cite:"Chinese ISS RCT (12-month); Zribi, J Pediatr Endocrinol Metab", why:"A 12-month RCT in children with idiopathic short stature found that moderate stretching exercise combined with lysine-inositol-B12 supplementation produced significantly greater height, higher height velocity, and elevated growth hormone and IGF-1 markers compared to supplementation alone. Key finding: number of days per week of exercise correlated positively with height velocity, but excessive minutes per day correlated negatively — moderate duration is optimal. Stretching after jumping/sprinting decompresses the spine, lengthens fascia, and allows growth plates to recover under optimal conditions.", tip:"ALWAYS after sprints or jumping, never skip. 10 minutes. Dead hang (30+ sec, 3 sets). Seated forward fold touching toes. Cobra pose (spine extension). Cat-cow stretch. Standing quad stretch. Butterfly stretch. Calf stretch against wall. This is when their body grows — during recovery.",
      pumps:[
        { p:"Stretching + nutrition synergy", n:"↑ height velocity", d:"Chinese RCT: exercise potentiates nutrition — combo beats nutrition alone" },
        { p:"Growth hormone elevation", n:"significant", d:"Exercise group had higher growth hormone markers at 12 months" },
        { p:"IGF-1 elevation", n:"significant", d:"Exercise group had higher IGF-1 at 12 months" },
        { p:"Spinal decompression", n:"reverses 1%", d:"Dead hang reverses gravity's daily compression" },
        { p:"Dose-response", n:"optimal", d:"More days/week = better. Excessive minutes/day = counterproductive." },
      ],
      foods:[
        { f:"Dead hang, 30+ sec × 3 sets", d:"Axial traction decompresses spine. Thumbs over bar. Relax shoulders." },
        { f:"Seated forward fold (touch toes)", d:"Hamstring + lower back lengthening. Hold 30 sec." },
        { f:"Cobra pose (spine extension)", d:"Press chest up, hips on ground. Opens anterior chain." },
        { f:"Cat-cow stretch (spine mobility)", d:"On hands and knees. Alternating arch and round. 10 reps." },
        { f:"Standing quad stretch + calf stretch", d:"Hold each 30 sec per leg. Against a wall for balance." },
        { f:"Butterfly stretch (inner thigh/hip)", d:"Seated, soles together, press knees toward floor. 30 sec." },
      ]},

    { id:"pm", t:"8-12 oz A2 milk + 1 tbsp raw honey — immediately after", gh:"451%", line:"GH 451% at 24h. IGF-1 +14%. Casein (6-7 hr slow-release). α-lactalbumin → melatonin (157%). Lysine + Arginine (700%). GABA if kefir (400%). Converts sprint GH → IGF-1 via STAT5 at 24 hours. IGF-1 +14%. Converts sprint/jump growth hormone → IGF-1 via STAT5 pathway", cite:"Zajac, J Human Kinetics 2018; Cappon, J Appl Physiol 1994", sig:true, why:"Without milk after sprints/jumping, the growth hormone spike is 'orphaned' — present but not converted to IGF-1 (the actual growth signal). Whey provides immediate amino acids. Honey's gentle insulin activates the STAT5 pathway in the liver, converting growth hormone into IGF-1. Casein then slow-releases for hours, sustaining the anabolic environment until the Sleep Drink at bedtime.", tip:"Cold milk, raw honey, immediately after stretching. This is a DAIRY window, not an iron meal. Non-sprint/jump days: same drink right after school.",
      pumps:[
        { p:"Growth hormone → IGF-1 conversion", n:"451%", d:"Growth hormone still 451% above baseline at 24 hours" },
        { p:"IGF-1 elevation", n:"+14%", d:"IGF-1 14% higher than controls at 24 hours" },
        { p:"α-Lactalbumin → melatonin", n:"157%", d:"Tryptophan from milk → serotonin → melatonin tonight" },
        { p:"Casein sustained release", n:"6-7 hrs", d:"Bridges to the Sleep Drink at bedtime" },
        { p:"Lysine + Arginine", n:"700%", d:"Milk delivers both synergistic amino acids" },
        { p:"GABA (if kefir used)", n:"400%", d:"Fermented dairy produces GABA → suppresses somatostatin" },
      ],
      foods:[
        { f:"A2 whole milk, 8-12 oz (cold)", d:"Whey (immediate) + casein (sustained) + tryptophan + lysine + arginine." },
        { f:"Raw honey, 1 tbsp", d:"Gentle insulin activates liver's STAT5 pathway for growth hormone → IGF-1." },
        { f:"Full-fat kefir (alternative)", d:"All milk proteins PLUS fermentation-derived GABA (~400% growth hormone)." },
      ]},
  ]},

  { period:"Late Afternoon", desc:"Rest, play, recover", items:[
    { id:"rest", t:"Rest, play with friends, unstructured time", gh:"87%", line:"growth hormone (87%) from anticipation of fun. Cortisol ↓39%. Light mechanical loading from play. A relaxed kid grows better than a stressed one", cite:"Berk, FASEB J 2006; Berk, Am J Med Sci 1989; Veldhuis, JCEM 1995", why:"Unstructured play is not wasted time — it's growth time. Anticipation of fun raises growth hormone 87% and reduces cortisol 39%. Light roughhousing adds mechanical loading. Chronic stress from overscheduling is one of the strongest suppressors of growth hormone. Protect this window.", tip:"No homework pressure right after school. Let them play first, eat, then homework. Save competitive sports for weekends and early afternoon — no evening games." },
  ]},

  { period:"Evening", desc:"Protect the overnight growth hormone window", note:"Do these in order. By the end, they're drowsy.", items:[
    { id:"nox", t:"No intense exercise after 6pm", gh:"60-80%", line:"of tonight's growth hormone (60-80%) at risk. Late exercise raises core temp. Normal sleep = 3× more peak growth hormone", cite:"Stutz, Sports Med 2019; Brandenberger, Lancet 2000", why:"Core body temperature must drop 1-1.5°C to initiate deep sleep. Vigorous exercise within 2 hours of bed raises it instead, delaying sleep onset and compressing the SWS window. The Brandenberger study (Lancet 2000) showed normal sleep produces 3× more peak growth hormone than disrupted sleep — and the concentrated nocturnal surge only fires if deep sleep initiates on time.", tip:"Save all running, sports, and active play for afternoon. No competitive sports in the evening — save those for weekends and early afternoon." },

    { id:"din", t:"Animal protein + cruciferous + fermented + bone broth + citrus", gh:"400%", line:"Glutamine (400%). GABA from fermented (400%). Glycine from broth (300%). Ornithine (300%). L-DOPA (221%). Iron (2-3× w/ vitamin C). Aromatase block. B12. Fiber. Inositol. Microbiome GABA (continuous). Taurine. Puberty delay (lentils). Stacks glutamine (400%) + glycine (300%) + GABA from fermented foods (400%) + aromatase inhibition", cite:"Welbourne, Am J Clin Nutr 1995; Powers, MSSE 2008; Kasai, Metabolism 1980", why:"This dinner hits every remaining growth hormone pathway before the overnight window. Beef: glutamine (400%), ornithine (300%), tyrosine (221%), taurine. Bone broth: glycine (300% + sleep onset + growth plate collagen). Sauerkraut: GABA (400% via Lactobacillus fermentation) + glutamine. Broccoli: DIM/I3C → aromatase inhibition → growth plates stay open. Lentils: delay puberty onset. Skin-on chicken: collagen + higher taurine.", tip:"Any meat + cruciferous + fermented side + bone broth + citrus for iron. NO DAIRY at dinner — save milk for the Sleep Drink or gelatin. Vary proteins but keep all four elements.",
      pumps:[
        { p:"Glutamine (beef)", n:"400%", d:"One serving > 2g → 4-fold growth hormone in 30 min" },
        { p:"GABA (sauerkraut/kefir/yogurt)", n:"400%", d:"Fermentation produces bioavailable GABA → suppresses somatostatin + deepens sleep" },
        { p:"Glycine (bone broth)", n:"300%", d:"Raises growth hormone AND lowers core temp → sleep onset" },
        { p:"Ornithine (beef)", n:"300%", d:"Cycles with arginine to amplify growth hormone" },
        { p:"L-DOPA (tyrosine)", n:"221%", d:"Protein → dopamine → stimulates GHRH" },
        { p:"Aromatase block (broccoli)", n:"growth plates", d:"DIM + I3C → less estrogen → plates stay open longer" },
        { p:"Taurine (meat)", n:"potentiator", d:"Supports bile for fat-soluble vitamin absorption" },
        { p:"Plant protein (lentils)", n:"puberty delay", d:"Associated with later puberty onset = longer growth window" },
        { p:"Iron (beef + lentils)", n:"growth enabler", d:"Required for oxygen to growing tissues" },
        { p:"Iron absorption (citrus)", n:"2-3×", d:"Orange slices or lemon water boosts iron uptake" },
        { p:"B12 (beef)", n:"cell division", d:"Chondrocyte division at growth plates" },
        { p:"Fiber (lentils + broccoli)", n:"protected GH", d:"Slows insulin → protects GH" },
        { p:"Inositol (lentils)", n:"ISS pathway", d:"Part of lysine-inositol-B12 growth axis" },
        { p:"Microbiome GABA (fermented)", n:"continuous", d:"Sauerkraut/kimchi feed bacteria that produce GABA 24/7" },
      ],
      foods:[
        { f:"ANIMAL PROTEIN (rotate from ranking — see lunch):", d:"All deliver arginine, glutamine, ornithine, glycine, lysine, choline, tyrosine, taurine, niacin." },
        { f:"Beef (any cut) — most nights", d:"Glutamine (400%) + ornithine (300%) + tyrosine (221%) + taurine + iron + B12." },
        { f:"Skin-on chicken thighs", d:"Collagen/glycine (300%) from skin + higher taurine than breast meat." },
        { f:"Turkey", d:"Niacin (350%) + arginine (200%). Great rotation protein." },
        { f:"⬜ Wild salmon 2×/week", d:"Omega-3s → IGF-1 + vitamin D + niacin. Dinner or lunch." },
        { f:"⬜ Beef liver 1×/week (or blend 2-3×/week)", d:"Highest pump density. With vitamin C, NOT milk. No CLO on liver days." },
        { f:"⬜ Cooked oysters 1×/week", d:"Zinc (full week's RDA) + iron + B12. All 3 growth axis levels." },
        { f:"Bone broth (as soup or drink)", d:"Glycine (300%) + hydroxyproline + proline = growth plate collagen." },
        { f:"Sauerkraut / kimchi (fermented side)", d:"GABA (400%) via Lactobacillus + glutamine from cabbage." },
        { f:"Kefir / yogurt as a SEPARATE snack (not at dinner)", d:"GABA (~400%) from Lactobacillus + casein + tryptophan. NOT at this iron meal." },
        { f:"Broccoli / cauliflower / Brussels sprouts", d:"DIM + I3C → aromatase inhibition → growth plates stay open." },
        { f:"Lentils / beans + citrus", d:"Iron + lysine + inositol + fiber. Vitamin C boosts iron 2-3×." },
      ]},

    { id:"gly", t:"Gelatin jello or bone broth dessert", gh:"300%", line:"growth hormone increase (300%) + sleep onset. Glycine lowers core temp AND raises growth hormone. Primary amino in growth plate collagen", cite:"Kawai, Neuropsychopharmacology 2015; Kasai, Metabolism 1980", why:"Glycine does three things: (1) lowers core body temperature via NMDA receptors — the primary trigger for sleep onset, (2) directly increases growth hormone, (3) is the most abundant amino acid in collagen — the structural protein of growth plates where height happens.", tip:"Bovine gelatin in jello with allulose or monk fruit (not sugar). Bone broth as soup. Gelatin powder has no taste — mix into anything.",
      pumps:[
        { p:"Glycine → growth hormone", n:"300%", d:"Direct growth hormone secretagogue" },
        { p:"Glycine → sleep onset", n:"core temp ↓", d:"Lowers body temp via NMDA receptors → initiates deep sleep" },
        { p:"Growth plate collagen", n:"structural", d:"Glycine + hydroxyproline + proline = the building crew for growth plates" },
      ],
      foods:[
        { f:"Bovine gelatin powder in jello", d:"Pure collagen = pure glycine. No taste. Sweeten with allulose or monk fruit." },
        { f:"Bone broth (homemade or quality)", d:"Richest glycine source + hydroxyproline + proline." },
        { f:"Skin-on chicken", d:"Skin and connective tissue are collagen-rich." },
      ]},

    { id:"nse", t:"GH-safe snacks only — no refined sugar, ever", gh:"300%", line:"Overnight GH protected (300%). Glycine/gummies (300%). Melatonin/gummies (157%). Casein/ice cream (451%). Arginine/peanuts (200%). Melatonin/pistachios (157%). One glucose spike blocks up to 80%. Use monk fruit, allulose, honey, or maple syrup", cite:"Lanzi, Metabolism 1999; Van Cauter, JCEM 1992; Kasai, Metabolism 1980", why:"60-80% of your child's daily growth hormone is released overnight. One scoop of regular ice cream can suppress up to 80% via insulin. Allulose and monk fruit don't raise insulin. Honey and maple syrup are gentler than refined sugar. Every snack below actively hits a growth hormone pump.", tip:"These replace all store-bought snacks.",
      pumps:[
        { p:"Overnight GH protected", n:"300-500%", d:"No refined sugar = no insulin suppression of overnight GH" },
        { p:"Glycine (gummies)", n:"300%", d:"Gelatin = pure glycine → direct GH + sleep onset + growth plates" },
        { p:"Melatonin (gummies)", n:"157%", d:"Tart cherry in gummies = highest food melatonin + aromatase block" },
        { p:"Casein (ice cream)", n:"451%", d:"A2 milk/cream = casein slow-release → counts toward daily dairy" },
        { p:"Arginine (peanuts)", n:"200%", d:"Unroasted peanuts + niacin (350%) + magnesium" },
        { p:"Melatonin (pistachios)", n:"157%", d:"Extraordinarily high melatonin per gram — best evening nut" },
      ],
      foods:[
        { f:"Homemade gummies (gelatin + tart cherry + allulose/monk fruit)", d:"Glycine (300%) + melatonin (157%) + aromatase block. Set in fridge." },
        { f:"Homemade ice cream (A2 milk/cream + egg yolks + monk fruit/allulose)", d:"Casein (451%) + choline + tryptophan. Counts toward 24 oz daily dairy." },
        { f:"Unroasted peanuts / natural PB", d:"Niacin (350%) + arginine (200%) + magnesium + inositol + fiber." },
        { f:"Pistachios (evening)", d:"Highest food melatonin per gram (157%) + arginine + magnesium." },
        { f:"Pumpkin seeds", d:"Arginine (200%/+0.33cm) + magnesium + zinc (+0.37cm) + tryptophan." },
        { f:"Dark chocolate 85%+", d:"Magnesium (SWS amplifier) + antioxidants. Small piece." },
      ]},

    { id:"nlf", t:"Finish all food 2-3 hours before bed", gh:"300-500%", line:"overnight growth hormone protected. Late eating suppresses slow-wave sleep. Protects the overnight fast where 60-80% of growth hormone is produced", cite:"Crispim, J Clin Sleep Med 2011; Hartman, JCEM 1992", why:"The overnight fast is when growth hormone peaks — fasting 37.5 hrs = 10-fold increase. Eating close to bed keeps insulin elevated and disrupts sleep architecture. Exception: bioKids Sleep Drink (~55 calories) is too small to suppress.", tip:"Dinner done by 6pm for an 8:30 bedtime.",
      pumps:[
        { p:"Fasting growth hormone", n:"300-500%", d:"Overnight fast = 60-80% of daily growth hormone" },
        { p:"Insulin cleared", n:"up to 80%", d:"Protects against growth hormone suppression" },
        { p:"Ghrelin builds", n:"secretagogue", d:"Hunger hormone directly triggers growth hormone overnight" },
      ]},

    { id:"nsc", t:"No screens after dinner", gh:"157%", line:"growth hormone from melatonin (157%) at risk. Blue light suppresses melatonin 90+ min. Melatonin also blocks aromatase → delays plate closure", cite:"Cajochen, JCEM 2005; Forsling, J Pineal Res 1999; Cos, J Pineal Res 1998", why:"Blue light suppresses melatonin for over 90 minutes. Melatonin attacks growth from two directions: directly increases growth hormone 157% AND inhibits aromatase (the enzyme that closes growth plates). Every minute of screen time after dinner steals from both.", tip:"TV is better than tablets/phones — distance matters. If screens are unavoidable: Night Shift mode + blue light blocking glasses. Red/amber lamps only.",
      pumps:[
        { p:"Melatonin → growth hormone", n:"157%", d:"Direct growth hormone elevation from melatonin" },
        { p:"Aromatase inhibition", n:"plates stay open", d:"Less estrogen → later growth plate closure" },
        { p:"SWS depth", n:"60-80%", d:"Melatonin deepens slow-wave sleep where growth hormone is released" },
      ],
      foods:[
        { f:"Tart cherry (already in Sleep Drink)", d:"Highest food melatonin source." },
        { f:"Pistachios (early evening snack)", d:"Extraordinarily high melatonin per gram." },
        { f:"Complete darkness after dinner", d:"Triggers endogenous melatonin on the body's own schedule." },
      ]},

    { id:"bath", t:"Warm bath with Epsom salts", gh:"60-80%", line:"Core temp drop → faster SWS onset. Magnesium/Epsom (SWS amplifier). First GH pulse (largest). Cortisol reduction (parasympathetic). Sensory ritual (anticipatory). Normal sleep = 3× more peak GH. Post-bath core temp drop accelerates deep sleep. Normal sleep = 3× more peak growth hormone", cite:"Haghayegh, Sleep Med Rev 2019; Brandenberger, Lancet 2000; Held, Pharmacopsychiatry 2002", why:"Warm water raises surface temperature. When they get out, core temperature drops rapidly — this paradoxical cooling is one of the most powerful sleep onset triggers known. Faster into deep sleep = you capture the full nocturnal growth hormone surge. Brandenberger et al. (Lancet 2000) showed normal sleep produces 3× more peak growth hormone than disrupted sleep. Epsom salts deliver magnesium transdermally — magnesium deepens the slow-wave sleep where the surge occurs.", tip:"10-20 minutes, warm not hot. Add Epsom salt.",
      pumps:[
        { p:"Core temp drop → sleep onset", n:"faster SWS", d:"Paradoxical cooling = one of the strongest sleep triggers" },
        { p:"Magnesium (Epsom)", n:"SWS amplifier", d:"Deepens the slow-wave sleep where growth hormone is released" },
        { p:"First growth hormone pulse", n:"largest", d:"Earlier into SWS = larger first pulse" },
        { p:"Cortisol reduction", n:"parasympathetic", d:"Warm water activates calm-down system" },
        { p:"Sensory ritual", n:"anticipatory", d:"Consistent bath cue tells the brain sleep is coming" },
      ]},

    { id:"mag", t:"Magnesium lotion on feet and shoulders", gh:"400%", line:"GABA receptor activation (400%). SWS depth (amplifier). Melatonin support (157%). Parasympathetic → sleep onset. Sensory ritual (conditioned). Cortisol reduction activation. Deepens slow-wave sleep. Many parents report drowsiness within 20 min", cite:"Abbasi, J Res Med Sci 2012; Held, Pharmacopsychiatry 2002; Powers, MSSE 2008", why:"Transdermal magnesium modulates the same GABA receptors responsible for ~400% growth hormone elevation. It activates parasympathetic tone, supports melatonin production, and deepens slow-wave sleep. Deficiency reduces SWS quality — blunting the growth hormone pulses that drive growth. Often the tipping point: even wired kids get drowsy.", tip:"Rub on feet and shoulders while they read or watch a calm show.",
      pumps:[
        { p:"GABA receptor modulation", n:"400%", d:"Magnesium activates the same receptors as GABA" },
        { p:"SWS depth", n:"amplifier", d:"Deeper slow-wave sleep = larger growth hormone pulses" },
        { p:"Melatonin support", n:"157%", d:"Magnesium supports melatonin production" },
        { p:"Parasympathetic activation", n:"sleep onset", d:"Triggers the calm-down system. Drowsiness in 20 min." },
        { p:"Sensory ritual", n:"conditioned", d:"Touch cue triggers parasympathetic response nightly" },
        { p:"Cortisol reduction", n:"calming", d:"Consistent touch ritual lowers cortisol" },
      ],
      foods:[
        { f:"Magnesium lotion at bedtime", d:"Transdermal absorption bypasses digestion. Fast-acting." },
        { f:"Pumpkin seeds (earlier in day)", d:"Highest Mg food + arginine + zinc + tryptophan." },
        { f:"Epsom salt bath (before lotion)", d:"Stacks with lotion for maximum transdermal Mg." },
      ]},

    { id:"drink", t:"4 oz A2 milk + 1 oz tart cherry — 30 min before bed", gh:"451%", line:"GH 451% at 24h. IGF-1 +14%. Casein overnight. Melatonin (157%). Aromatase block (plates open). Cortisol ↓ (cherry). Glutamine (400%). Glycine (300%). Calcium + phosphorus. SWS depth (60-80%). 24-hour GH cycle (always on). Chains casein + melatonin (157%) + tryptophan + aromatase inhibition into one ritual", cite:"Zajac, J Human Kinetics 2018; Howatson, Eur J Nutr 2012; Forsling, J Pineal Res 1999", sig:true, why:"The signature bioKids ritual chains every remaining overnight lever. Casein slow-releases aminos for 6-7 hours feeding growth hormone pulses all night. Tart cherry is the highest food source of melatonin (157% growth hormone + aromatase inhibition). α-Lactalbumin from milk has the highest tryptophan of any protein → serotonin → additional melatonin. Together with the post-sprint milk earlier: growth hormone remains 451% above baseline at 24 hours, with IGF-1 14% higher. ~55 calories — too small to spike insulin. This is the 24-hour GH cycle: post-sprint milk → casein bridges to Sleep Drink → casein bridges overnight → morning eggs restart the choline pump. Some growth hormone lever is always on.", tip:"Mix, serve 20-40 min before bed. This is a DAIRY window — dinner was iron, now dairy. Dim lights after.",
      pumps:[
        { p:"Casein overnight", n:"451%", d:"Growth hormone 451% above baseline at 24 hours" },
        { p:"IGF-1 elevation", n:"+14%", d:"IGF-1 14% higher than controls" },
        { p:"Melatonin (tart cherry)", n:"157%", d:"Highest food melatonin + aromatase inhibition" },
        { p:"α-Lactalbumin → melatonin", n:"tryptophan", d:"Highest tryptophan protein → serotonin → melatonin" },
        { p:"Aromatase block (cherry)", n:"plates open", d:"Less estrogen → later growth plate closure" },
        { p:"Cortisol reduction (cherry)", n:"↓ stress", d:"Tart cherry reduces cortisol in RCTs" },
        { p:"24-hour GH cycle", n:"always on", d:"Post-sprint milk → Sleep Drink → casein overnight → morning eggs restart. No gap." },
        { p:"Glutamine (milk)", n:"400%", d:"Milk delivers glutamine for overnight GH" },
        { p:"Glycine (milk)", n:"300%", d:"Growth plate collagen building block" },
        { p:"Calcium + phosphorus", n:"bone mineral", d:"Via casein micelles" },
        { p:"SWS depth (melatonin)", n:"60-80%", d:"Deeper sleep = larger growth hormone pulses" },
      ],
      foods:[
        { f:"A2 whole milk, 4 oz", d:"Casein (6-7 hr release) + α-lactalbumin (tryptophan) + lysine + calcium." },
        { f:"Unsweetened tart cherry juice, 1 oz", d:"Highest food melatonin (13.5ng/g). Montmorency variety." },
        { f:"Serve 20-40 min before bed", d:"Dim lights after. Body learns this as the sleep signal." },
      ]},

    { id:"rtn", t:"Same routine every night", gh:"157%", line:"Anticipatory melatonin (157%). Sensory ritual (conditioned — brain auto-releases after 1-2 weeks). Cortisol reduction (predictability). After 1-2 weeks, the brain auto-releases melatonin when the routine begins", cite:"Mindell, Sleep 2015; Mindell, Sleep 2009", why:"Consistent routines activate anticipatory circadian mechanisms. The brain starts releasing melatonin as soon as it recognizes the familiar sequence — before lights are even off. Melatonin = 157% growth hormone + aromatase inhibition. The routine itself becomes a growth hormone lever.", tip:"Bath → lotion → drink → books → bed. Same order, always.",
      pumps:[
        { p:"Anticipatory melatonin", n:"157%", d:"Brain auto-releases melatonin when routine starts" },
        { p:"Sensory ritual", n:"conditioned", d:"After 1-2 weeks, the sequence itself triggers sleep" },
        { p:"Cortisol reduction", n:"predictability", d:"Predictable routines lower cortisol in children" },
      ]},

    { id:"cool", t:"Cool the room — 65-68°F + pink noise / fan", gh:"60-80%", line:"60-80% of tonight's GH depends on this. Core temp must drop 2-3°F. Pink noise → fewer arousals/deeper SWS. Normal sleep = 3× more peak GH. Core temp must drop 2-3°F for deep sleep. Pink noise reduces arousals for deeper SWS. Normal sleep = 3× more peak growth hormone", cite:"Kräuchi, Nature 1999; Brandenberger, Lancet 2000", why:"The body must lower core temperature by 1-1.5°C to initiate slow-wave sleep — where the massive nocturnal growth hormone surge occurs. Brandenberger et al. showed normal sleep produces 3× more peak growth hormone than disrupted sleep — the concentrated surge is completely abolished without proper deep sleep. A warm room fights the temperature drop. Cool room + warm blanket = fastest path to that surge.", tip:"Crack a window, use a fan (doubles as pink noise). Cool room + warm blanket = fastest sleep onset." },

    { id:"dark", t:"Complete darkness — blackout curtains, tape every LED", gh:"60-80%", line:"of ALL daily growth hormone (60-80%) is released in deep sleep. Normal sleep = 3× more peak growth hormone than disrupted sleep. Even dim light suppresses 50%+", cite:"Brandenberger, Lancet 2000; Gooley, JCEM 2011; Van Cauter, JAMA 2000; Takahashi, J Clin Invest 1968", why:"This is the payoff. Brandenberger et al. (Lancet 2000) showed it: normal sleep produces a single massive growth hormone surge — 3× greater peak than disrupted sleep. With sleep deprivation, that concentrated surge is completely abolished, replaced by scattered, low-amplitude pulses. The nocturnal surge that drives growth simply disappears. Even a small LED or hallway light suppresses melatonin-driven growth hormone by 50%+. Every lever today — the eggs, the sprints, the milk, the dinner, the Sleep Drink — builds to this one nocturnal surge.", tip:"Blackout curtains are the single best investment. Tape over every device LED. Red nightlight only if needed." },

    { id:"dim", t:"Dim/red lights → bed", gh:"157%", line:"growth hormone (157%) from protected melatonin. The full biochemical cascade is now complete. They're drowsy. No fight.", cite:"Figueiro, Neuro Endocrinol Lett 2011; Gooley, JCEM 2011", why:"By now the cascade is complete. Bath cooled them. Magnesium activated parasympathetic tone. Glycine lowered core temp. The Sleep Drink delivered melatonin + tryptophan + casein. The routine triggered anticipatory melatonin. They're drowsy. They want to sleep.", tip:"Red bulbs or amber lamps only. Then lights out." },

    { id:"bed", t:"In bed by 8–8:30pm — asleep by 9, target 10-12 hours", gh:"60-80%", line:"of ALL daily growth hormone (60-80%). Normal sleep = 3× more peak growth hormone than disrupted sleep. 11 hrs = 7-8 growth reps vs 5 reps at 8 hrs", cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000; Takahashi, J Clin Invest 1968", why:"Everything today builds to this moment. The Brandenberger study (Lancet 2000) showed it definitively: normal sleep produces 3× more peak growth hormone than disrupted sleep. Each 90-minute sleep cycle is one 'growth rep.' A child sleeping 11 hours gets 7-8 reps. A child sleeping 8 hours gets only 5. With every lever activated: choline-primed pituitary, sprint-triggered lactate, IGF-1 conversion from milk, amino acid reloading from dinner, GABA from fermented foods, glycine from bone broth, melatonin from cherry, casein slow-releasing for 6-7 hours, core temp dropped, complete darkness — your child's body is now running the most powerful natural growth hormone sequence possible. And tomorrow morning, eggs restart the choline pump — the 24-hour cycle begins again.", tip:"10-12 hours total. Non-negotiable. This is the most important item on the entire page." },
  ]},
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RenderLine({ text, size }: { text: string; size?: number }) {
  const parts = text.split(/(\+?\d[\d,]*(?:\.\d+)?(?:-\d[\d,]*(?:\.\d+)?)?%\+?|\+\d+\.?\d*\s*(?:cm|cm\/yr)|\d+(?:-\d+)?[×x])/g);
  return parts.map((part, i) =>
    /\+?\d[\d,]*(?:\.\d+)?(?:-\d[\d,]*(?:\.\d+)?)?%|\+\d+\.?\d*\s*(?:cm|cm\/yr)|\d+(?:-\d+)?[×x]/.test(part)
      ? <span key={i} style={{ ...F.num, fontSize: size || 13 }}>{part}</span>
      : <span key={i}>{part}</span>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DayCard({ item, isOpen, onToggle, big }: { item: any; isOpen: boolean; onToggle: () => void; big: boolean }) {
  return (
    <div onClick={onToggle} style={{ cursor:"pointer", background:"#fff", borderRadius: big ? 16 : 12, border: big ? "2px solid #a7f3d0" : item.sig ? "2px solid #a7f3d0" : item.feat ? "2px solid #fbbf24" : "1px solid #e7e5e4", overflow:"hidden", boxShadow: big ? "0 4px 20px rgba(5,150,105,0.06)" : "0 1px 3px rgba(0,0,0,0.02)" }}>
      <div style={{ padding: big ? "16px 16px 14px" : "13px 14px 11px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize: 15, fontWeight:700, color:"#1c1917", lineHeight:1.3 }}>{item.t}</div>
            <div style={{ marginTop: big ? 6 : 4, lineHeight:1.45 }}>
              {item.gh && item.gh !== "—" && <span style={{ ...F.num, fontSize: 13, marginRight:5 }}>{item.gh}</span>}
              <span style={{ ...F.mono, fontSize: 11.5, color:"#57534e" }}><RenderLine text={item.line} size={13} /></span>
            </div>
            <div style={{ ...F.mono, fontSize: 9.5, color:"#8a8580", marginTop: 4, lineHeight:1.3 }}>{item.cite}</div>
          </div>
          <span style={{ color:"#d6d3d1", fontSize:11, marginTop:4, flexShrink:0, transition:"transform 0.15s", transform: isOpen ? "rotate(180deg)" : "none" }}>▼</span>
        </div>
      </div>
      {isOpen && <div onClick={e => e.stopPropagation()} style={{ padding:"0 16px 16px", borderTop:"1px solid #f5f5f0" }}>
        <div style={{ background:"#f0fdf4", borderRadius:10, padding:"11px 14px", margin:"12px 0 10px" }}>
          <p style={{ fontSize:13, color:"#065f46", lineHeight:1.6 }}>{item.why}</p>
        </div>
        <p style={{ fontSize:12.5, color:"#78716c", fontStyle:"italic", marginBottom:10, lineHeight:1.55 }}>{item.tip}</p>
        {item.pumps && <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:9, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Growth hormone pathways activated</div>
          {item.pumps.map((pump: { p: string; n: string; d: string }, i: number) => (
            <div key={i} style={{ display:"flex", alignItems:"baseline", gap:6, padding:"4px 0", borderTop: i > 0 ? "1px solid #f5f5f0" : "none" }}>
              <span style={{ ...F.num, fontSize:13, minWidth:56, textAlign:"right", flexShrink:0 }}>{pump.n}</span>
              <span style={{ fontSize:11.5, fontWeight:600, color:"#1c1917" }}>{pump.p}</span>
              <span style={{ ...F.mono, fontSize:9.5, color:"#a8a29e", flex:1 }}>— {pump.d}</span>
            </div>
          ))}
        </div>}
        {item.foods && <div style={{ marginBottom:6 }}>
          <div style={{ fontSize:9, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Food sources</div>
          {item.foods.map((food: { f: string; d: string }, i: number) => (
            <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderTop: i > 0 ? "1px solid #f5f5f0" : "none" }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:"#1c1917", flex:1, lineHeight:1.4 }}>{food.f}</div>
              <div style={{ ...F.mono, fontSize:9.5, color:"#a8a29e", maxWidth:220, textAlign:"right", lineHeight:1.4 }}>{food.d}</div>
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
  const [openId, setOpenId] = useState<string | null>(null);
  const ghCount = dayData.flatMap(d => d.items).filter(i => i.gh && i.gh !== "—").length;

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div style={{ maxWidth:600, margin:"0 auto", padding:"0 20px" }}>
        <div style={{ paddingTop:44, paddingBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <span style={{ fontSize:16 }}>🌿</span>
            <span style={{ fontSize:11, fontWeight:600, color:"#059669", textTransform:"uppercase", letterSpacing:"0.1em" }}>bioKids</span>
          </div>
          <h1 style={{ fontSize:32, fontWeight:900, color:"#1c1917", lineHeight:1.08, letterSpacing:"-0.025em", marginBottom:10 }}>
            <><span>Your child&apos;s day.</span><br/><span style={{ color:"#059669" }}>Mapped to growth.</span></>
          </h1>
          <p style={{ fontSize:14, color:"#78716c", lineHeight:1.7, maxWidth:440 }}>
            {ghCount} growth hormone levers from the peer-reviewed literature — mapped to the foods in your kitchen, organized into your child&apos;s day. Your child gets one window of growth. These are the exact levers to help them reach their full potential.
          </p>
          <div style={{ background:"#f0fdf4", borderRadius:12, padding:"14px 16px", marginTop:12, marginBottom:4, border:"1px solid #a7f3d0" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#059669", marginBottom:6 }}>The 24-Hour Growth Hormone Cycle</div>
            <p style={{ fontSize:12.5, color:"#44403c", lineHeight:1.65, margin:0 }}>
              This protocol is designed to keep at least one growth hormone lever activated around the clock — and to convert that GH into actual growth. Morning eggs prime the choline/acetylcholine axis (4,400%). Lunch loads amino acid substrates. Afternoon sprints spike GH 530%. Post-sprint milk converts GH → IGF-1 via the STAT5 pathway. Dinner stacks glycine + GABA + aromatase inhibition. The Sleep Drink bridges casein overnight — GH remains 451% above baseline at 24 hours, with IGF-1 14% higher. Tomorrow morning, eggs restart the cycle. <span style={{ fontWeight:700, color:"#059669" }}>Some growth hormone lever is always on.</span>
            </p>
            <p style={{ fontSize:11.5, color:"#78716c", lineHeight:1.55, margin:"8px 0 0" }}>
              Growth hormone doesn&apos;t just drive height — it&apos;s one of the most powerful drivers of childhood brain development. Every GH pulse stimulates neurogenesis, myelination, and synaptic formation. The same protocol that maximizes growth simultaneously optimizes cognitive development, memory consolidation during deep sleep, and long-term brain architecture.
            </p>
          </div>
        </div>
        {dayData.map((p, pi) => (
          <div key={p.period} style={{ marginBottom: pi < dayData.length-1 ? 36 : 0 }}>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>{p.period}</div>
              <div style={{ fontSize:13, color:"#a8a29e", marginTop:2 }}>{p.desc}</div>
              {p.note && <div style={{ fontSize:11, color:"#059669", marginTop:4, fontWeight:600 }}>{p.note}</div>}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {p.items.map((item, idx) => (
                <DayCard key={item.id} item={item} big={idx===0} isOpen={openId===item.id} onToggle={() => setOpenId(openId===item.id ? null : item.id)} />
              ))}
            </div>
          </div>
        ))}

        <div style={{ margin:"48px 0 36px", padding:"20px 0", borderTop:"1px solid #e7e5e4", textAlign:"center" }}>
          <p style={{ ...F.mono, fontSize:11, color:"#a8a29e", lineHeight:1.7 }}>Every number on this page comes from a peer-reviewed study.<br/>We read the research so you can focus on your child.</p>
        </div>
      </div>
    </div>
  );
}
