'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';

export default function NutritionWindow() {
  const [child, setChild] = useState<Child | null>(null);
  const [ageInMonths, setAgeInMonths] = useState(96); // Default 8 years
  const [activeTab, setActiveTab] = useState<'science' | 'protocol' | 'deep'>('science');
  const [expandedLever, setExpandedLever] = useState<string | null>(null);
  const [expandedFood, setExpandedFood] = useState<string | null>(null);
  const [expandedMech, setExpandedMech] = useState<number | null>(null);
  const [expandedMilkSection, setExpandedMilkSection] = useState<number | null>(null);
  const [expandedSupp, setExpandedSupp] = useState<number | null>(null);
  const [expandedStageLever, setExpandedStageLever] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('biokids_children');
      if (stored) {
        const children = JSON.parse(stored);
        if (Array.isArray(children) && children.length > 0) {
          const firstChild = children[0];
          setChild(firstChild);
          const birthDate = new Date(firstChild.birth_date);
          if (!isNaN(birthDate.getTime())) {
            const now = new Date();
            const months = (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());
            setAgeInMonths(Math.max(0, months));
          }
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const ageInYears = ageInMonths / 12;

  const getCLO = () => {
    if (ageInYears < 0.75) return "NONE";
    if (ageInYears <= 1) return "1/4 tsp";
    if (ageInYears <= 3) return "1/4-1/2 tsp";
    if (ageInYears <= 12) return "1/2-1 tsp";
    return "1 tsp";
  };

  const getProtein = () => {
    if (ageInYears <= 3) return "0.9-1.2 g/kg";
    if (ageInYears <= 12) return "1.2-1.5 g/kg";
    return "1.5+ g/kg";
  };

  const getMilkAmount = () => {
    if (ageInYears <= 2) return "16oz (2 cups)";
    if (ageInYears <= 5) return "16-20oz (2-2.5 cups)";
    if (ageInYears <= 12) return "20-24oz (2.5-3 cups)";
    return "24oz (3 cups)";
  };

  // Highlight function for milk dosing table
  const getMilkAgeHighlight = () => {
    if (ageInYears >= 1 && ageInYears <= 2) return '1-2 years';
    if (ageInYears > 2 && ageInYears <= 5) return '2-5 years';
    if (ageInYears > 5 && ageInYears <= 12) return '6-12 years';
    if (ageInYears > 12) return '13-18 years';
    return '';
  };

  // ─── ALL 16 MECHANISMS IN RANKED ORDER ───
  const mechanisms = [
    { rank: 1, title: "Energy & Protein Sufficiency", subtitle: "mTOR / AMPK — the \"Growth vs. Survival\" switch", icon: "battery-100", color: "forest", parentLever: "Eat enough. Calorie surplus 300-1,000 kcal/day for active youth. Protein 0.9-1.5 g/kg/day.", citations: [{ text: "Iannotti LL et al. Pediatrics. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28011439" }, { text: "Dewey KG et al. Am J Clin Nutr. 1993", url: "https://pubmed.ncbi.nlm.nih.gov/8296076" }], content: `Without enough calories and protein, the liver and growth plate switch into survival mode, not growth mode.\n\nYour child's body has two nutrient sensors:\n- mTOR (growth mode) — activated by leucine and adequate calories. When on, chondrocytes in growth plates proliferate and grow taller.\n- AMPK (survival mode) — activated when energy is low. Shuts down mTOR and causes functional GH resistance.\n\nA child who is even mildly calorie-restricted can have plenty of GH but zero growth response. Everything else in this protocol sits on top of this.` },
    { rank: 2, title: "GH Receptor Signaling (JAK2-STAT5)", subtitle: "The main conversion step at the liver", icon: "heart", color: "amber", parentLever: "Zinc (oysters, beef, pumpkin seeds), Vitamin D (salmon, CLO, sunlight), adequate protein, low inflammation.", citations: [{ text: "Prasad AS et al. Nutrition. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/8875519" }, { text: "Holick MF. N Engl J Med. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17634462" }], content: `This is the central machinery: GH arrives at the liver, binds its receptor, and activates the JAK2-STAT5 signaling cascade — which actually transcribes IGF-1.\n\nGood state: GH receptor expressed, zinc and vitamin D sufficient, SOCS proteins low → JAK2-STAT5 runs cleanly → IGF-1 produced.\n\nBad state: Zinc deficiency, vitamin D deficiency, chronic inflammation → SOCS upregulated → GH receptor blunted → low IGF-1 even with normal GH.` },
    { rank: 3, title: "The Insulin-GH Seesaw", subtitle: "Insulin present, not spiked — temporal separation", icon: "scale", color: "coral", parentLever: "Balanced meals with whole-food carbs. No sugar spikes. No vinegar around meals. Post-exercise milk + honey.", citations: [{ text: "Ho KY et al. J Clin Endocrinol Metab. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3127426" }, { text: "Lanzi R et al. Metabolism. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10484056" }], content: `Insulin and GH fight each other at the pituitary — when blood sugar spikes, insulin rises and GH drops by up to 80%. But the liver NEEDS insulin to activate STAT5 and produce IGF-1.\n\nSo the strategy is timing separation:\n- Phase 1 (GH release): Low insulin, low glucose, low somatostatin → sleep, overnight fasting, sprints\n- Phase 2 (IGF-1 conversion): Insulin rises into a permissive range\n\nRegular whole-food carbs provide the insulin the liver needs. Sugar suppresses GH when it matters most.` },
    { rank: 4, title: "Somatostatin: The GH Brake", subtitle: "The master \"off switch\" on GH pulses", icon: "stop-circle", color: "coral", parentLever: "Arginine-rich foods (pumpkin seeds, turkey, eggs). Fermented foods. Bone broth at night.", citations: [{ text: "Alba-Roth J et al. J Clin Endocrinol Metab. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3127426" }, { text: "Chromiak JA et al. J Am Coll Nutr. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12137178" }], content: `Somatostatin tells the pituitary to STOP releasing growth hormone. When somatostatin is high, GH pulses are smaller and less frequent.\n\nFoods that take this brake off:\n- Arginine-rich foods → compete with somatostatin signaling\n- GABA (fermented foods) → reduces somatostatin during slow-wave sleep\n- Niacin (unroasted peanuts) → suppresses free fatty acids that brake GH\n- Glycine (bone broth, gelatin) → deeper SWS → reduced somatostatin` },
    { rank: 5, title: "Sleep Architecture & Melatonin", subtitle: "The GH pulse generator + anti-aromatase", icon: "moon", color: "purple", parentLever: "See the Sleep & Circadian card for the full protocol. Tart cherries, raspberries, milk before bed, bone broth.", citations: [{ text: "Van Cauter E et al. Sleep. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10984255" }, { text: "Reiter RJ et al. Life Sci. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10694236" }], content: `60-80% of daily GH is released in the first 3 hours of deep sleep. Melatonin helps synchronize and deepen those pulses.\n\nMelatonin also inhibits aromatase — the enzyme that converts testosterone to estrogen, which closes growth plates. So melatonin-supporting foods serve a dual purpose:\n1. Enhance GH pulses during sleep\n2. Slow estrogen-driven growth plate closure\n\nFoods: tart cherries (strongest), raspberries, oats, walnuts, tomatoes. Milk before bed provides alpha-lactalbumin — the highest tryptophan food protein.` },
    { rank: 6, title: "Inflammation & SOCS Pathway", subtitle: "The \"dimmer switch\" that mutes the GH-IGF-1 axis", icon: "flame", color: "coral", parentLever: "Wild salmon, olive oil, berries, turmeric (+ pepper + fat), leafy greens. Avoid UPFs, seed oils, sugar.", citations: [{ text: "Bodart V et al. Endocrinology. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12215445" }, { text: "Senn JJ et al. J Biol Chem. 2003", url: "https://pubmed.ncbi.nlm.nih.gov/12522143" }], content: `SOCS proteins act like a dimmer switch on GH signaling at the liver. When inflammation is chronic, SOCS ramps up and blocks JAK2-STAT5.\n\nWhat drives SOCS up: Ultra-processed foods, obesity, gut inflammation, chronic illness. These raise IL-6 and TNF-alpha.\n\nWhat drives SOCS down: Anti-inflammatory diet — omega-3 fish, olive oil, berries, cruciferous vegetables, turmeric with black pepper.` },
    { rank: 7, title: "IGF-Binding Proteins (IGFBPs)", subtitle: "The delivery system — how IGF-1 reaches growth plates", icon: "package", color: "teal", parentLever: "Oysters (increase IGFBP-3). Adequate protein. Zinc sufficiency.", citations: [{ text: "Baxter RC. Am J Physiol Endocrinol Metab. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10910000" }, { text: "Firth SM et al. Endocr Rev. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12379487" }], content: `IGFBP-3 controls the stability, half-life, and tissue delivery of IGF-1. Think of it as the shipping container.\n\nFermented oysters specifically increase both IGF-1 AND IGFBP-3, and are linked to greater growth-plate thickness. Production without delivery is wasted.` },
    { rank: 8, title: "Local vs. Systemic IGF-1", subtitle: "Growth plates make their own IGF-1 — exercise drives it", icon: "running", color: "blue", parentLever: "Sprints, jumping, active outdoor play → local IGF-1 at growth plates. Nutrition → systemic IGF-1 from liver.", citations: [{ text: "Yakar S et al. Proc Natl Acad Sci USA. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12055200" }, { text: "Shavlakadze T et al. Growth Horm IGF Res. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/19923565" }], content: `There are two sources of IGF-1:\n\n- Systemic IGF-1: Produced by the liver, travels through bloodstream. This is what diet influences.\n- Local IGF-1: Produced directly at the growth plate. Responds to mechanical loading — sprints, jumping, climbing.\n\nA child who eats perfectly but is sedentary misses the local IGF-1 stimulation. You need both.` },
    { rank: 9, title: "Micronutrient Axis", subtitle: "Zinc, Vitamin D, Calcium, Magnesium, A, K2, Iron, Iodine", icon: "gem", color: "gray", parentLever: "Oysters/beef (zinc), salmon/CLO (D), dairy (Ca), greens (Mg), liver (A, iron), natto/K2, seaweed (iodine).", citations: [{ text: "Prasad AS et al. Nutrition. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/8875519" }, { text: "Holick MF. N Engl J Med. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17634462" }], content: `These are the locks and keys on the growth machinery. A deficiency in any single one can flatten growth even when GH and calories are normal.\n\n- Zinc → GH receptor function. Deficiency = functional GH resistance.\n- Vitamin D → GH receptor expression + calcium absorption.\n- Calcium & Phosphorus → bone matrix mineralization.\n- Magnesium → supports IGF-1 production, sleep depth.\n- Vitamin A → regulates chondrocyte differentiation.\n- Vitamin K2 → directs calcium to bones, not arteries.\n- Iron → hemoglobin, oxygen delivery. Deficiency causes PERSISTENT lags.\n- Iodine → thyroid function → GH/IGF-1 axis.` },
    { rank: 10, title: "Ghrelin: The Hunger-GH Link", subtitle: "Why meal timing and overnight fasting matter", icon: "clock", color: "brown", parentLever: "No food 2-3h before bed. Fresh ginger in meals. Regular meal schedule during the day.", citations: [{ text: "Kojima M et al. Nature. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/11137997" }, { text: "Arvat E et al. J Endocrinol Invest. 2001", url: "https://pubmed.ncbi.nlm.nih.gov/11054601" }], content: `Ghrelin — the \"hunger hormone\" — is also a potent natural GH secretagogue. It binds directly to GHS-R1a receptors on pituitary cells.\n\nNormal daytime meals + no late-night grazing allows ghrelin to rise naturally at night → stronger GH pulses during sleep.\n\nFresh ginger acutely increases ghrelin, which is why it's in the protocol.` },
    { rank: 11, title: "The Cholinergic Pathway", subtitle: "Why eggs before sprints matter — the signal amplifier", icon: "brain", color: "forest", parentLever: "Eggs (147mg choline) and beef liver (431mg) pre-exercise. Salmon (90mg), chicken (72mg).", citations: [{ text: "Kawamura T et al. J Int Soc Sports Nutr. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22673596" }, { text: "Ziegenfuss T et al. J Int Soc Sports Nutr. 2008", url: "https://pubmed.ncbi.nlm.nih.gov/18708688" }], content: `Choline converts to acetylcholine — a neurotransmitter that carries signals between hypothalamus and pituitary. This is the communication highway for GH release.\n\nPre-sprint eggs load acetylcholine into the system, making the pituitary \"permissive\" — ready to fire a maximum-amplitude GH pulse.` },
    { rank: 12, title: "Arachidonic Acid & Prostaglandins", subtitle: "Why egg yolks matter beyond protein", icon: "egg", color: "amber", parentLever: "Whole egg yolks (not just whites), quality animal fats.", citations: [{ text: "Hadley KB et al. Nutrients. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/27022223" }, { text: "Markworth JF et al. Prostaglandins Other Lipid Mediat. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23263574" }], content: `Arachidonic acid (ARA) in egg yolks converts to prostaglandin E2 (PGE2), which modulates pituitary GH secretion and plays roles in bone remodeling.\n\nThis is why whole egg yolks matter, not just whites. Quality animal fats are signal molecules for growth.` },
    { rank: 13, title: "Colostrum & Proline-Rich Polypeptides", subtitle: "Growth factors from nature's first food", icon: "dna", color: "gray", parentLever: "Bovine colostrum supplement/food. HGH cocktail: colostrum + goji berries + raw honey.", citations: [{ text: "Shing CM et al. Eur J Appl Physiol. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19128995" }, { text: "Davison G. Eur J Nutr. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26373020" }], content: `Bovine colostrum contains Proline-Rich Polypeptides (PRPs) that support growth signaling, plus IGF-1 and immune modulators.\n\nIn older, well-nourished children, colostrum is more about recovery and gut health than centimeters. But gut health feeds directly into the SOCS/inflammation pathway.` },
    { rank: 14, title: "HPG Axis & Growth Plate Protection", subtitle: "Controls when growth STOPS — extending the runway", icon: "shield", color: "forest", parentLever: "Beans/lentils DAILY (plant protein → later puberty). Cruciferous veg. Tart cherries (anti-aromatase). No soy.", citations: [{ text: "Gunther ALB et al. Am J Clin Nutr. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/19906826" }, { text: "Daftary SS et al. Endocr Rev. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10884549" }], content: `This controls when growth stops, not how fast it happens day-to-day.\n\nThe timeline: GnRH → LH/FSH → sex steroids rise → testosterone converts to estrogen via aromatase → estrogen closes growth plates permanently.\n\nPediatric cohorts show: higher plant protein (beans/legumes daily at ages 3-6) → later puberty onset. This extends the genetic height runway.\n\nAdditional protectors: cruciferous vegetables, melatonin-rich foods (inhibit aromatase directly).` },
    { rank: 15, title: "Epigenetics & The Microbiome", subtitle: "Long-term programming of the growth axis", icon: "flask", color: "brown", parentLever: "Early-life diet quality. Fermented foods. Fiber. Avoid UPFs and EDCs from the start.", citations: [{ text: "Waterland RA et al. Mol Cell Biol. 2003", url: "https://pubmed.ncbi.nlm.nih.gov/15591049" }, { text: "Schwarzenberg SJ et al. Pediatrics. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29358729" }], content: `Nutrition changes which genes are expressed.\n\nEpigenetics: Early nutrition, obesity, and metabolic stress change methylation patterns at growth-related genes. Effects persist for years.\n\nMicrobiome: Gut-brain and gut-liver signaling through SCFAs directly modulate GH secretion and IGF-1 production. Certain microbiota profiles can increase IGF-1 even under suboptimal nutrition.` },
    { rank: 16, title: "Environmental Disruptors", subtitle: "The background antagonists eroding your gains", icon: "alert-triangle", color: "coral", parentLever: "All organic when possible. No UPFs. Wild-caught fish. Pasture-raised eggs/meat. Avoid Dirty Dozen.", citations: [{ text: "Gore AC et al. Endocr Rev. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/26001723" }, { text: "Street ME et al. Front Endocrinol. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29951123" }], content: `EDCs interfere with hypothalamic-pituitary signaling, sex-steroid balance, thyroid function, and IGF systems.\n\nBiggest offenders:\n- Glyphosate on non-organic produce\n- Ultra-processed food diets\n- Saturated fatty acids in excess\n- Obesogenic diets\n\nThey won't make a tall child short alone, but they erode the gains from every other lever.` },
  ];

  // ─── SOMATOSTATIN TABLE ───
  const somatostatinTable = [
    { mechanism: "Amino acid competition", how: "Arginine, ornithine, and lysine compete with and suppress somatostatin signaling at the pituitary", foods: "Pumpkin seeds, turkey, eggs, beef, lentils, chickpeas", icon: "muscle" },
    { mechanism: "Dopamine signaling", how: "Dopamine directly inhibits somatostatin release — it tells the brake to let go", foods: "Beets, bananas", icon: "brain" },
    { mechanism: "GABAergic tone", how: "GABA reduces somatostatin \"noise\" and improves sleep-GH coupling", foods: "Fermented foods: kimchi, sauerkraut, kefir, yogurt", icon: "moon" },
    { mechanism: "FFA suppression", how: "Free fatty acids independently brake GH. Niacin (B3) suppresses FFAs", foods: "Unroasted peanuts, organ meats, tuna, turkey", icon: "peanut" },
    { mechanism: "Thermal regulation", how: "Lower core body temp → deeper SWS → reduced somatostatin during GH window", foods: "Bone broth and gelatin (glycine lowers core temp)", icon: "thermometer" },
  ];

  // ─── TIER 1 FOODS ───
  const tier1Foods = [
    { name: "Eggs (pasture-raised)", emoji: "", target: "2-3 daily", when: "Morning + Pre-Sprint + Dinner", combine: "WITH: Coconut oil pre-sprint. Gelatin (balance amino profile). Pineapple with meats. AVOID: High-calcium foods at same time.", why: "Top amino acid profile: lysine, leucine, isoleucine, valine, methionine, cysteine, tryptophan. Choline (147mg/egg) = A-GPC analog for cholinergic pathway. ARA in yolks. Arginine suppresses somatostatin. Zinc for liver GH receptor. K2 directs calcium to growth plates.", suppCorollary: "Food version of A-GPC (44-fold GH) — same cholinergic pathway, sustained tone instead of acute bolus.", citations: [{ text: "Iannotti LL et al. Pediatrics. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28011439" }, { text: "Lutter CK et al. Matern Child Nutr. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29196386" }] },
    { name: "Raw / A2 Milk & Full-Fat Dairy", emoji: "", target: "2-3 cups daily", when: "Morning + Post-Sprint + Pre-Bed", combine: "Includes: cream-line milk, grass-fed yogurt, cheese, kefir. Post-sprint: + raw honey. Bedtime: plain only. AVOID: A1 milk (BCM-7 inflammatory). Vinegar near meals.", why: "All 20 AAs, 22 minerals, ~60 enzymes. Lysine, BCAAs, glutamine, alpha-lactalbumin (highest tryptophan → sleep). Calcium, lactoferrin. Each 8oz/day = +0.39cm height.", suppCorollary: "Food version of GABA (400%) + Melatonin (157%) — tryptophan → melatonin at bedtime, GABA via gut-brain signaling.", citations: [{ text: "Hoppe C et al. Am J Clin Nutr. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/15447891" }, { text: "de Beer H. J Biosoc Sci. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22556553" }] },
    { name: "Bone Broth / Gelatin / Collagen Cuts", emoji: "", target: "Daily — as much as practical", when: "Dinner (2-3h pre-bed) + anytime", combine: "Includes: bone broth, gelatin, oxtail, shank, fish skin. WITH: Anything — smoothies, soups, jello desserts. Pair with eggs.", why: "Glycine + proline for collagen framework. Glycine lowers core body temp → deeper SWS → larger GH pulses. One of the ONLY foods rivaling supplements for sleep-GH coupling. Activates mTORC1.", suppCorollary: "Food version of GABA (400%) — glycine achieves comparable sleep-GH coupling through thermoregulation.", citations: [{ text: "de Paz-Lugo P et al. Amino Acids. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29559876" }, { text: "Bannai M et al. Neuropsychopharmacology. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22293292" }] },
    { name: "Pumpkin Seeds", emoji: "", target: "Daily snack", when: "Snack + Dinner + Pre-Bed", combine: "WITH: Lentils (best plant GH combo). PREP: Soak 30 min before eating. AVOID: High-calcium foods (zinc-calcium competition).", why: "Highest practical food arginine (~7g/cup) → suppresses somatostatin. Tryptophan (~0.6g/cup) → melatonin → SWS. Zinc = GH receptor cofactor. Copenhagen: 2.8-3.2g/day arginine = +0.33 cm/yr in 7-13yr olds.", suppCorollary: "Food version of IV Arginine (20-fold GH).", citations: [{ text: "Prasad AS et al. Nutrition. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/8875519" }, { text: "Gupta M et al. J Tradit Complement Med. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25431862" }] },
    { name: "Grass-fed Beef (Muscle Meat)", emoji: "", target: "Several times/week", when: "Midday + Recovery", combine: "Includes: steak, ground beef, roasts. WITH: Leafy greens, pineapple (bromelain). AVOID: Not as large meal before bed.", why: "Steak uniquely synthesizes L-ornithine → 4x GH baseline. Arginine, ornithine, leucine/BCAAs, glutamine. Zinc for JAK2-STAT5. Iron. Complete protein + leucine for mTOR.", suppCorollary: "Food version of L-Ornithine (300%) — steak IS the ornithine supplement.", citations: [{ text: "Phillips SM et al. J Am Coll Nutr. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22150425" }, { text: "Welch AA et al. J Bone Miner Res. 2014", url: "https://pubmed.ncbi.nlm.nih.gov/24739093" }] },
    { name: "Wild-Caught Fatty Fish", emoji: "", target: "2-3x/week", when: "Midday", combine: "Includes: salmon, mackerel, sardines (with bones). WITH: Leafy greens, lemon. AVOID: Never farmed fish. Don't overcook.", why: "Complete protein, omega-3 → reduces SOCS. Vitamin D (271% RDA salmon) → GH receptor expression. Choline. Sardines add calcium + vitamin D synergy.", suppCorollary: "Supports Niacin + Exercise pathway (600-1500%) — B3 suppresses FFAs that brake GH.", citations: [{ text: "Rangel-Huerta OD et al. Br J Nutr. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22332096" }, { text: "Oken E et al. Am J Clin Nutr. 2008", url: "https://pubmed.ncbi.nlm.nih.gov/18310198" }] },
    { name: "Legumes (High-Priority Mix)", emoji: "", target: "DAILY", when: "Midday + Evening", combine: "Includes: lentils, chickpeas, black beans, kidney beans, navy beans, split peas. WITH: Any grain-free carb. Vitamin C for iron.", why: "CRITICAL for puberty timing — plant protein keeps HPG axis quiet → later puberty = longer growth window. Lysine (~1.7g/cup lentils), arginine, glutamine, threonine. Magnesium + fiber. Reduced CRP.", suppCorollary: "The long-game strategy supplements cannot replicate: IGF-1 maintained while growth window EXTENDED.", citations: [{ text: "Gunther ALB et al. Am J Clin Nutr. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/19906826" }, { text: "Messina V et al. Am J Clin Nutr. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10687887" }] },
    { name: "Collard Greens", emoji: "", target: "Daily — Tier 1 leafy", when: "Midday + Evening", combine: "WITH: Lemon for iron absorption. Olive oil for fat-soluble vitamins. AVOID: None — universally safe.", why: "Lower oxalate than spinach — promoted as primary leafy green. Magnesium → deeper sleep → more GH. Vitamin K for bone. Calcium (better absorbed than spinach). Nitrate → NO → hypothalamic signaling.", suppCorollary: "Supports GABA sleep-depth pathway — Mg deepens the SWS where 70% of GH is released.", citations: [{ text: "Weaver CM et al. Am J Clin Nutr. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10024903" }, { text: "Tucker KL et al. Am J Clin Nutr. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/9925120" }] },
    { name: "Fermented Dairy & Fermented Cabbage", emoji: "", target: "Daily", when: "Evening + anytime", combine: "Includes: yogurt, kefir, sauerkraut, red cabbage. WITH: Berries (polyphenol + probiotic synergy). Full-fat, grass-fed only.", why: "Protein (yogurt), glutamine (red cabbage = highest plant source), GABA from LAB. Probiotics → gut-brain-liver signaling. IGFBP-3 support. Polyphenols from red cabbage.", suppCorollary: "THE food version of GABA (400%) — chronic somatostatin reduction via gut-brain axis.", citations: [{ text: "Marco ML et al. Curr Opin Biotechnol. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28945458" }, { text: "Parvez S et al. J Appl Microbiol. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16865764" }] },
    { name: "Unroasted Peanuts", emoji: "", target: "Daily / pre-sprint snack", when: "Snack + Pre-Sprint", combine: "WITH: Pre-sprint eggs (choline + niacin stack). AVOID: Roasted (destroys niacin). Watch allergy.", why: "Highest niacin food → FFA suppression. High arginine (~3.7g/cup). Phenylalanine (highest plant source) → dopamine. Key food-level niacin + exercise lever.", suppCorollary: "THE food version of Niacin + Exercise (600-1500%). Pre-sprint peanuts = the food protocol.", citations: [{ text: "Kamceva G et al. Open Access Maced J Med Sci. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23913506" }, { text: "MacKay D et al. Nutr Rev. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22747081" }] },
    { name: "Beef Liver (Strictly Limited)", emoji: "", target: "1x/week", when: "Midday (liver day)", combine: "WITH: Vitamin C foods for iron absorption. AVOID: SKIP CLO same day. SKIP heavy carrots. Vitamin A toxicity risk.", why: "ALL B vitamins score 100. Choline (431mg) = highest food for cholinergic pathway. Zinc + iron. Vitamin A (7,740 mcg) for bone cell differentiation. GH/IGF-1 cofactor bomb with safety caps.", suppCorollary: "Food version of A-GPC (44-fold) — highest food choline + Niacin pathway + cofactors for ALL pathways.", citations: [{ text: "Beal T et al. Front Nutr. 2022", url: "https://pubmed.ncbi.nlm.nih.gov/35183054" }, { text: "Hurrell R et al. Am J Clin Nutr. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/9914521" }] },
    { name: "Cod Liver Oil", emoji: "", target: getCLO() + " daily", when: "Morning with food", combine: "WITH: Fatty meal. AVOID: NEVER on beef liver day. NEVER heavy carrot day. Liver 1-2x/wk, CLO all other days.", why: "Vitamin A (4,080 mcg/tbsp) for osteoblasts/osteoclasts. Vitamin D → GH receptor expression. Omega-3 → SOCS reduction. The only food combining retinol + D3 + omega-3.", suppCorollary: "No direct equivalent — supports the ENVIRONMENT for all pathways.", citations: [{ text: "Molgaard C et al. Curr Opin Clin Nutr Metab Care. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21613357" }, { text: "Holick MF. N Engl J Med. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17634462" }] },
  ];

  // ─── TIER 2 FOODS ───
  const tier2Foods = [
    { name: "Oysters (age 2+)", emoji: "", target: "~1x/week", when: "Midday", combine: "WITH: Lemon (zinc absorption). AVOID: Raw for children.", why: "Highest zinc source → GH receptor function. Fermented oysters → increase IGF-1 AND IGFBP-3 → growth plate thickness. Mineral density.", suppCorollary: "ENABLES all pathways — zinc deficiency mimics the failure state supplements try to overcome.", citations: [{ text: "Prasad AS et al. Nutrition. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/8875519" }, { text: "Wessells KR et al. PLoS One. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22836031" }] },
    { name: "Fresh Ginger", emoji: "", target: "In meals + tea", when: "With meals", combine: "WITH: Meals. As tea. AVOID: Excess on empty stomach.", why: "Acutely increases ghrelin → natural GH secretagogue. Appetite support. GH-permissive timing.", suppCorollary: "Food version of fasting's GH mechanism (+287%) — ghrelin stimulation WITHOUT lowering IGF-1.", citations: [{ text: "Mansour MS et al. Metabolism. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22538118" }, { text: "Mozaffari-Khosravi H et al. J Complement Integr Med. 2014", url: "https://pubmed.ncbi.nlm.nih.gov/25230520" }] },
    { name: "Tart Cherries / Tart Cherry Juice", emoji: "", target: "30-45 min pre-bed", when: "Evening / Bedtime", combine: "WITH: Walnuts. AVOID: Sugar in juice — dilute. Tart not sweet.", why: "DUAL: Natural melatonin → stronger GH pulses. ALSO inhibits aromatase → delays growth plate closure. One of the only foods working on two critical pathways.", suppCorollary: "THE food version of Melatonin (157% + aromatase inhibition).", citations: [{ text: "Howatson G et al. Eur J Nutr. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22038497" }, { text: "Pigeon WR et al. J Med Food. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20438325" }] },
    { name: "Pineapple", emoji: "", target: "With meats + evening", when: "Evening + with meats", combine: "WITH: Quality meats (bromelain aids AA digestion). AVOID: Alone on empty stomach.", why: "Serotonin support → sleep. Bromelain aids amino acid extraction → better arginine, lysine, leucine bioavailability. Manganese for bone.", suppCorollary: "Enhances bioavailability of amino acids that supplements provide synthetically.", citations: [{ text: "Shing CM et al. Eur J Sport Sci. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/24518062" }, { text: "Pavan R et al. Biotechnol Res Int. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22375024" }] },
    { name: "Watermelon", emoji: "", target: "Snack / smoothie", when: "Snack", combine: "WITH: Goji, pineapple. AVOID: Not before bed.", why: "Citrulline → arginine. Better oral bioavailability than arginine itself for raising plasma levels.", suppCorollary: "Food version of oral arginine (2-4.5x GH) via superior citrulline delivery.", citations: [{ text: "Rimando AM et al. J Chromatogr A. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/16007998" }, { text: "Curis E et al. Amino Acids. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15809017" }] },
    { name: "Coconut Oil", emoji: "", target: "Pre-sprint (1g/kg)", when: "Pre-Sprint", combine: "WITH: Eggs (pre-workout stack). AVOID: Not bedtime. Not excessive daily.", why: "Short-term HGH boost up to 4 hours (J Endocrinology). Quick fuel. Stacks with sprint GH pulse.", suppCorollary: "Synergistic with Niacin + Exercise — amplifies the exercise GH window.", citations: [{ text: "Assuncao ML et al. Lipids. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19437058" }, { text: "St-Onge MP et al. Obes Res. 2003", url: "https://pubmed.ncbi.nlm.nih.gov/12975635" }] },
    { name: "Bovine Colostrum", emoji: "", target: "Morning / post-sprint", when: "Morning / Post-Sprint", combine: "WITH: Goji + honey. No conflicts.", why: "PRPs for growth signaling. IGF-1 + immune modulators. Gut health → feeds into SOCS/inflammation pathway.", suppCorollary: "Multi-pathway: SeroVital-like (600-700%) + immune modulation.", citations: [{ text: "Shing CM et al. Eur J Appl Physiol. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19128995" }, { text: "Davison G. Eur J Nutr. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26373020" }] },
    { name: "Spirulina + Chlorella", emoji: "", target: "Morning smoothie", when: "Morning", combine: "WITH: Each other (synergistic). In smoothie. AVOID: Tested brands only.", why: "Together boost HGH. Reduce IL-6, TNF-alpha → SOCS reduction → liver hears GH signal. Antioxidant for growth plates.", suppCorollary: "Clears metabolic noise blocking the same pathways GABA and niacin activate.", citations: [{ text: "Kalafati M et al. Med Sci Sports Exerc. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20010119" }, { text: "Miczke A et al. Eur Rev Med Pharmacol Sci. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26813942" }] },
    { name: "Cruciferous Veg", emoji: "", target: "Several times per week", when: "Any", combine: "Includes: broccoli, kale, cauliflower, red cabbage. WITH: Fat for absorption of fat-soluble compounds.", why: "I3C and sulforaphane modify estrogen metabolism → theoretical growth-plate protection. Red cabbage adds glutamine (highest plant source) + polyphenols.", suppCorollary: "Complementary to melatonin's aromatase inhibition — different mechanism, same goal.", citations: [{ text: "Higdon JV et al. Pharmacol Res. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17497238" }, { text: "Fuentes F et al. Curr Pharmacol Rep. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25911914" }] },
  ];

  // ─── TIER 3 — SIGNALING & EXTRAS ───
  const tier3Foods = [
    { name: "Fermented Veg (Kimchi, Natto)", emoji: "", when: "Evening", why: "GABA via gut-brain axis. Natto = K2 for growth plates. Probiotics → microbiome → GH/IGF-1 signaling. Sleep-GH coupling.", suppCorollary: "GABA (400%): sustained gut-brain pathway > acute supplement spike.", citations: [{ text: "Marco ML et al. Curr Opin Biotechnol. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28945458" }, { text: "Dimidi E et al. Nutrients. 2019", url: "https://pubmed.ncbi.nlm.nih.gov/30452699" }] },
    { name: "Berries (Raspberries, Blueberries)", emoji: "", when: "Morning + Evening", why: "Polyphenols, vitamin C. Cortisol buffer — GH is cortisol-sensitive. Raspberries = best melatonin support. Antioxidant protection for growth plates.", suppCorollary: "Raspberries: melatonin. All berries: cortisol reduction → permissive GH environment.", citations: [{ text: "Joseph SV et al. J Agric Food Chem. 2014", url: "https://pubmed.ncbi.nlm.nih.gov/25612929" }, { text: "Skrovankova S et al. Int J Mol Sci. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/26287411" }] },
    { name: "Quinoa / Buckwheat / Hemp", emoji: "", when: "Any", why: "Complete/near-complete plant proteins. Low-GI carbs supporting IGF-1 without bread/rice/oats. mTOR support. Clean carb-protein bases.", suppCorollary: "Natural multi-amino profile similar to SeroVital.", citations: [{ text: "Repo-Carrasco-Valencia R et al. Food Rev Int. 2003", url: "https://pubmed.ncbi.nlm.nih.gov/12505299" }, { text: "Callaway JC. Euphytica. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/15140036" }] },
    { name: "Turmeric + Black Pepper + Fat", emoji: "", when: "Any", why: "Anti-SOCS. Curcumin lowers IL-6, TNF-alpha, CRP → liver hears GH signal. Must combine with pepper (2000% absorption) and fat for bioavailability.", suppCorollary: "Clears metabolic noise. Different mechanism, same outcome: liver sensitivity to GH.", citations: [{ text: "Hewlings SJ et al. Foods. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/29065496" }, { text: "Aggarwal BB et al. AAPS J. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24214087" }] },
    { name: "Seaweed", emoji: "", when: "Occasional", why: "Iodine → thyroid support → GH/IGF-1 axis. Iodine deficiency = 10-13.5 IQ point drop. Glycine content. Moderate intake — excess iodine is also harmful.", suppCorollary: "Micronutrient axis support for thyroid-mediated growth signaling.", citations: [{ text: "Zimmermann MB. Endocr Rev. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19594417" }, { text: "Cherry P et al. Nutrients. 2019", url: "https://pubmed.ncbi.nlm.nih.gov/31540409" }] },
  ];

  // ─── SUPPLEMENT MAP ───
  const suppMap = [
    { supp: "IV Arginine", spike: "20-fold GH", spikeDose: "IV ~0.5g/kg; oral boluses 2-4.5x", mechanism: "Suppresses somatostatin at the pituitary, releasing the brake on GH pulses", when: "Daily snacks + pre-bed + pre-sprint", why: "Copenhagen Study: habitual 2.8-3.2g/day arginine = +0.33 cm/yr in 7-13yr olds. Chronic somatostatin suppression from food > single acute IV spike.", top3: [ { rank: 1, food: "Pumpkin seeds", detail: "Highest plant arginine (~7g/cup). Also zinc + tryptophan.", freq: "Daily" }, { rank: 2, food: "Turkey / chicken breast", detail: "Very high arginine per gram of protein. Lean, versatile.", freq: "Daily / several times per week" }, { rank: 3, food: "Beef — steak, ground, roasts", detail: "Substantial arginine + zinc + iron.", freq: "Several times per week" }, ] },
    { supp: "L-Ornithine", spike: "~300% GH", spikeDose: "2-10g isolated supplement", mechanism: "Synergizes with arginine via the urea cycle; direct GH secretagogue effect", when: "Midday / dinner protein", why: "University of Houston: beef-derived ornithine elevates GH 4x baseline. Steak IS the ornithine supplement.", top3: [ { rank: 1, food: "Beef — steak, chuck, round", detail: "Strong ornithine + arginine + glutamine + zinc.", freq: "Several times per week" }, { rank: 2, food: "Chicken / turkey", detail: "Ornithine levels similar to other meats. Very practical.", freq: "Daily / several times per week" }, { rank: 3, food: "Fish — tuna, salmon", detail: "Good ornithine + omega-3 anti-inflammatory benefit.", freq: "2-3x per week" }, ] },
    { supp: "GABA", spike: "~400% GH", spikeDose: "3-5g isolated supplement", mechanism: "Reduces somatostatin tone; improves sleep-GH coupling via gut-brain axis", when: "Evening + daily", why: "Food GABA via gut-brain axis achieves chronic somatostatin reduction — the sustained environment — rather than a single acute spike.", top3: [ { rank: 1, food: "Kimchi", detail: "High GABA from GABA-producing lactic acid bacteria. Small amounts regularly.", freq: "Daily (small amounts)" }, { rank: 2, food: "GABA-rich yogurt / kefir", detail: "Fermented with GABA-producing LAB. Core child-friendly source.", freq: "Daily" }, { rank: 3, food: "Sauerkraut / fermented vegetables", detail: "Variable but meaningful GABA + strong microbiome support.", freq: "Daily" }, ] },
    { supp: "Melatonin", spike: "157% GH + aromatase inhibition", spikeDose: "Supplemental melatonin (various doses)", mechanism: "Deepens SWS for larger GH pulses AND inhibits aromatase (delays growth plate closure)", when: "Evening / bedtime", why: "DUAL benefit: GH stimulation during sleep + aromatase inhibition protecting growth plates. Rhythm entrainment via food is superior to pharmacologic dosing.", top3: [ { rank: 1, food: "Tart cherries / tart cherry juice", detail: "Highest melatonin among common fruits. Improves sleep onset.", freq: "Evening, 3-4x/week (diluted juice)" }, { rank: 2, food: "Tomatoes", detail: "Contain melatonin and precursors. Part of the circadian foods stack.", freq: "Daily" }, { rank: 3, food: "Oats (steel-cut or rolled)", detail: "Tryptophan + B-vitamins support serotonin → melatonin conversion.", freq: "Daily" }, ] },
    { supp: "Niacin + Exercise", spike: "600-1,500% GH", spikeDose: "500-3,000mg niacin + high-intensity exercise", mechanism: "Niacin suppresses free fatty acids (FFAs) which independently brake GH; exercise triggers the GH pulse", when: "Pre-sprint (peanuts/liver) → sprint → post-sprint nutrition", why: "MENS stack: Melatonin + Exercise + Niacin + Sleep. Food-level niacin + sprints = the food version of this protocol.", top3: [ { rank: 1, food: "Raw / unroasted peanuts", detail: "Very high niacin (B3) + high arginine. Cornerstone of food-niacin approach.", freq: "Daily / several times per week" }, { rank: 2, food: "Beef liver (limited)", detail: "Extremely dense niacin and all B-vitamins. Constrained by vitamin A.", freq: "1-2x per week max" }, { rank: 3, food: "Tuna / turkey / chicken", detail: "High niacin per 100g. Safe for frequent use.", freq: "Daily / several times per week" }, ] },
    { supp: "A-GPC", spike: "44-fold peak GH", spikeDose: "600mg pre-exercise", mechanism: "Choline → acetylcholine → primes hypothalamus-pituitary communication for GH release", when: "Pre-sprint (eggs + liver on liver day)", why: "Same cholinergic pathway. Food choline provides sustained neurotransmitter tone — keeping the pituitary \"permissive\".", top3: [ { rank: 1, food: "Eggs (pasture-raised)", detail: "~147mg choline per egg. \"Eggs before sprints\" protocol built on this.", freq: "Daily (2-3)" }, { rank: 2, food: "Beef liver (limited)", detail: "~350+ mg choline per 3oz — highest food source.", freq: "1-2x per week max" }, { rank: 3, food: "Salmon / chicken breast", detail: "Salmon ~75-90mg/3oz, chicken ~72mg/3oz. Good regular background.", freq: "Several times per week" }, ] },
  ];

  // ─── NUTRITION LEVERS (TODAY TAB) ───
  const nutritionLevers = [
    { rank: 1, title: "Eat enough", color: "forest", what: "Calorie surplus of 300-1,000 kcal above maintenance. If your child is hungry between meals, portions are too small.", why: "Without enough energy, AMPK activates survival mode and shuts down ALL growth signaling. Nothing else on this list matters if calories are insufficient. This overrides every other lever.", timing: "Every meal, every day. Never skip meals. Never restrict calories in a growing child.", citations: [{ text: "Iannotti LL et al. Pediatrics. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28011439" }, { text: "Dewey KG et al. Am J Clin Nutr. 1993", url: "https://pubmed.ncbi.nlm.nih.gov/8296076" }] },
    { rank: 2, title: "Bedtime milk", color: "forest", what: `1 cup warm A2/raw milk, plain, ${ageInYears <= 5 ? "at bedtime" : "30 min before lights out"}. Every night.`, why: "Casein curds digest over 3-7 hours, slowly releasing tryptophan → melatonin → deeper sleep. 70% of daily GH releases in the first 3 hours of deep sleep. Bedtime milk amplifies this 20-50%. The Dutch, Dinka, and Serbians — three tallest populations — all do this.", timing: "30 minutes before lights out. Plain only — no sweetener. Warm, not hot. This is the single highest-impact nutrition habit.", citations: [{ text: "Markus CR et al. Am J Clin Nutr. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15883457" }, { text: "Hoppe C et al. Am J Clin Nutr. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/15447891" }] },
    { rank: 3, title: `Raw milk or A2 organic — ${getMilkAmount()} daily`, color: "blue", what: `Split across morning, afternoon, and bedtime. Never A1 Holstein.`, why: "Each 8oz of milk per day = +0.39cm height — the most replicated finding in pediatric nutrition. Milk contains all 20 amino acids, 22 minerals, ~60 enzymes. Milk stimulates endogenous GH with little to NO effect on testosterone — critical for growth without accelerating puberty.", timing: `Morning: 1 cup with breakfast. ${ageInYears >= 6 ? "Post-sprint: 1 cup + honey. " : "Afternoon: 1 cup with snack. "}Bedtime: 1 cup warm, plain.`, citations: [{ text: "Hoppe C et al. Am J Clin Nutr. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/15447891" }, { text: "de Beer H. J Biosoc Sci. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22556553" }] },
    { rank: 4, title: "Enough protein", color: "forest", what: `${getProtein()} daily. Both animal (eggs, beef, fish, dairy) and plant (beans, lentils, pumpkin seeds).`, why: "IGF-1 is a protein — you need amino acids to build it. Leucine activates mTOR (the growth switch). Dairy protein stimulates IGF-1 more effectively than any other source due to bioactive peptides enhancing JAK2-STAT5 signaling.", timing: "Protein at every meal. Spread it — the body can only use ~25-30g per sitting for synthesis.", citations: [{ text: "Hoppe C et al. Am J Clin Nutr. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/14985208" }, { text: "Bonjour JP et al. J Clin Endocrinol Metab. 2001", url: "https://pubmed.ncbi.nlm.nih.gov/11431360" }] },
    { rank: 5, title: "Beans or lentils every day", color: "forest", what: "Lentils, chickpeas, black beans, kidney beans, navy beans, or split peas. At least one serving daily.", why: "The long game. Pediatric cohorts show higher plant protein ages 3-6 = later puberty onset. Later puberty = more years of open growth plates = more total height. This extends the entire growth window.", timing: "Lunch and/or dinner. Every day. Non-negotiable from age 2 onward.", citations: [{ text: "Gunther ALB et al. Am J Clin Nutr. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/19906826" }, { text: "Berkey CS et al. Am J Epidemiol. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10501064" }] },
    { rank: 6, title: "Eggs — the daily anchor", color: "amber", what: `${ageInYears <= 5 ? "2" : "2-3"} pasture-raised eggs daily.`, why: "Best amino acid profile of any single food: lysine, leucine, tryptophan, methionine, cysteine. Choline (147mg/egg) primes the pituitary for GH release. ARA in yolks modulates growth signaling. Zinc for the GH receptor.", timing: "Morning (with CLO). Pre-exercise if age 6+ (choline loading). Versatile — any meal works.", citations: [{ text: "Iannotti LL et al. Pediatrics. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28011439" }, { text: "Lutter CK et al. Matern Child Nutr. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29196386" }] },
    { rank: 7, title: "Finish dinner 2-3 hours before bed", color: "coral", what: "Last food (except bedtime milk) finishes 2-3 hours before sleep.", why: "Ghrelin (the hunger hormone that triggers GH) rises during the overnight fast. Late eating suppresses ghrelin AND elevates insulin — both directly suppress GH during the 10pm-2am pulse window.", timing: "Dinner at 6pm for a 9pm bedtime. Bedtime milk at 8:30pm is the exception — casein digests differently.", citations: [{ text: "Ho KY et al. J Clin Endocrinol Metab. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3127426" }, { text: "Crispim CA et al. Int J Obes. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21532851" }] },
    { rank: 8, title: "Cod liver oil every morning", color: "blue", what: `${getCLO()} daily with a fatty breakfast.`, why: "The only food combining retinol + vitamin D + omega-3 in one source. Vitamin D upregulates GH receptor expression. Vitamin A drives bone cell differentiation. Omega-3 reduces SOCS.", timing: "Morning with food (needs fat for absorption). Skip on beef liver day to avoid vitamin A excess.", citations: [{ text: "Molgaard C et al. Curr Opin Clin Nutr Metab Care. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21613357" }, { text: "Holick MF. N Engl J Med. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17634462" }] },
    { rank: 9, title: "Pumpkin seeds daily", color: "brown", what: "Handful as snack, in trail mix, on yogurt, or before bed.", why: "Highest practical food arginine (~7g/cup) — the amino acid that suppresses somatostatin (the GH brake). Also zinc (GH receptor cofactor) and tryptophan (sleep support). Copenhagen Study: +0.33 cm/yr in 7-13yr olds.", timing: "Anytime. Soak 30 min before eating for better mineral absorption. Small amount before bed is fine.", citations: [{ text: "Prasad AS et al. Nutrition. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/8875519" }, { text: "Fricke O et al. Horm Res Paediatr. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19396503" }] },
    { rank: 10, title: "Bone broth at dinner", color: "purple", what: "A cup of bone broth with or before dinner. Or gelatin in desserts, smoothies, gummies.", why: "Glycine lowers core body temperature → deeper slow-wave sleep → larger GH pulses. One of the only foods that rivals supplements for sleep-GH coupling. Also provides the collagen scaffold for bones.", timing: "Dinner or 2-3h before bed. The glycine needs time to lower core temp before the sleep window opens.", citations: [{ text: "Bannai M et al. Neuropsychopharmacology. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22293292" }, { text: "de Paz-Lugo P et al. Amino Acids. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29559876" }] },
    { rank: 11, title: "No sugar after lunch", color: "coral", what: "Zero added sugar in the afternoon and evening. No juice, candy, desserts, or sweetened anything after midday.", why: "Sugar spikes insulin → GH suppressed by 80%. Even moderate sugar in the evening window directly shrinks the overnight GH pulses. This is the single biggest destroyer of the sleep-growth window.", timing: "Morning sugar is less damaging (GH pulses are overnight). But evening sugar is a direct GH killer. Raw honey post-sprint is the only exception.", citations: [{ text: "Ho KY et al. J Clin Endocrinol Metab. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3127426" }, { text: "Lanzi R et al. Metabolism. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10484056" }] },
  ];

  // ─── MILK PRIMER SECTIONS ───
  const milkSections = [
    { id: "a2a1", title: "A2 vs A1 Milk — Why It Matters", icon: "cow", citations: [{ text: "Pal S et al. Eur J Clin Nutr. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25238234" }, { text: "Jianqin S et al. Nutr J. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26939681" }], content: `A1 beta-casein (70-80% of US Holstein milk) has histidine at position 67, releasing beta-casomorphin-7 (BCM-7) during digestion — an inflammatory opioid peptide linked to gut permeability, bloating, allergies/eczema, and chronic low-grade inflammation.\n\nA2 beta-casein (80-90% of French/European Jersey/Guernsey milk) has proline at position 67, preventing BCM-7 release. Digested cleanly like human breast milk: intact gut barriers, minimal inflammation, better tolerance, superior nutrient delivery.\n\nThis is why French children tend to outgrow American children on equivalent dairy intake. The milk itself is different at the molecular level.\n\nBottom line: A2 or raw milk. Never conventional A1 Holstein.` },
    { id: "ranking", title: "Milk Ranking — Best to Worst", icon: "trophy", citations: [{ text: "Brick T et al. J Allergy Clin Immunol. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/27269135" }, { text: "Macdonald LE et al. J Food Prot. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21459498" }], content: `Tier 1 — Optimal: Human breast milk (gold standard for infants)\nTier 2 — Excellent: Raw camel milk, raw sheep milk, raw goat milk, raw cow milk (A2)\nTier 3 — Good: Organic pasteurized grass-fed (camel/sheep/goat/cow)\nTier 4 — Acceptable: Organic ultra-pasteurized grass-fed cow milk\nTier 5 — Avoid: Conventional pasteurized A1 milk (hormones, antibiotics, pesticides)\n\nWhy raw > pasteurized: Pasteurization dramatically reduces the six key growth proteins. Raw preserves enzymes, lactoferrin, immunoglobulins, and bioavailable IGF-1 (20-50% higher).\n\nWhy grass-fed > grain-fed: Better fatty acid profile, higher fat-soluble vitamins (A, D, K2).\n\nFull-fat ALWAYS for children — never low-fat or skim.` },
    { id: "proteins", title: "The Six Growth Proteins in Milk", icon: "dna", citations: [{ text: "Markus CR et al. Am J Clin Nutr. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15883457" }, { text: "Lonnerdal B. Am J Clin Nutr. 2003", url: "https://pubmed.ncbi.nlm.nih.gov/14519827" }], content: `#1 Serum Albumin — Transports hormones and growth factors. Critical for delivering growth signals throughout the body.\n\n#2 alpha-Lactalbumin — Highest tryptophan content of ANY protein (serotonin → melatonin → GH). This is why bedtime milk works for sleep.\n\n#3 Casein — 80% of milk protein. Forms curds in stomach → slow 3-7 hour digestion → sustained amino acid release overnight.\n\n#4 Lactoferrin — Aids iron absorption. Anti-inflammatory. Studies: lactoferrin supplementation = greater gains in height AND weight.\n\n#5 Lysozyme — Antimicrobial. Supports gut health and immune function.\n\n#6 Secretory IgA — Immune function. Maintains gut health. Reduces inflammation → frees energy for growth.\n\nKey insight: These proteins are DRAMATICALLY reduced in pasteurized milk.` },
    { id: "bedtime", title: "The Bedtime Milk Secret", icon: "moon", citations: [{ text: "Markus CR et al. Am J Clin Nutr. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15883457" }, { text: "Dela Pena IJ et al. Pharm Biol. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25902764" }], content: `Why 30 minutes before bed — the mechanism:\n\nCasein is a slow-digesting protein. It forms curds in the stomach. These curds release amino acids slowly over 3-7 hours — the exact duration of the deepest sleep cycles.\n\nTryptophan (highest in alpha-lactalbumin) converts: Tryptophan → Serotonin → Melatonin. This deepens slow-wave sleep. 70% of daily growth hormone is released during deep sleep. Bedtime milk amplifies this by 20-50%.\n\nThe Dinka of South Sudan — the world's tallest ethnic group (men average 6'4\") — raise children in cattle camps where they primarily consume raw milk, including before sleep.\n\nThe protocol: Warm, plain A2 or raw milk. No sweetener. 30 minutes before lights out. Every night.` },
    { id: "casestudies", title: "The Evidence: Netherlands, Dinka, Serbia, France", icon: "globe", citations: [{ text: "de Beer H. J Biosoc Sci. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22556553" }, { text: "Hoppe C et al. Am J Clin Nutr. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/15447891" }], content: `Netherlands — World's tallest country (men 182.53cm / 5'11.86\"). Consume 25% more dairy than Americans. Raw milk vending machines throughout the country. Their milk has NO rBGH, no antibiotics, strict pesticide limits.\n\nDinka of South Sudan — World's tallest ethnic group (men 6'4\" / 193cm). Diet dominated by raw milk. Children sent to cattle camps (toc tradition) where they drink up to 3 gallons/day.\n\nSerbia — Average men 182cm. Traditional diet: daily fresh milk/cheese, grilled meats, fermented dairy (kajmak, sir). Tight-knit families enforce early bedtimes. Dairy + sleep + movement = height.\n\nFrance — A2 milk dominant (80-90% Jersey/Guernsey breeds). French children outgrow American children on equivalent dairy volume.` },
    { id: "safety", title: "Caps, Cautions & Pairing", icon: "alert", citations: [{ text: "Greer FR et al. Pediatrics. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16322164" }, { text: "Ziegler EE. Nestle Nutr Workshop Ser Pediatr Program. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21709090" }], content: `Maximum recommendations:\n- School-age: Cap at 24oz (calcium competes with iron absorption → anemia risk)\n- Teens: Cap at 32oz\n- Always pair with varied diet — not milk-only nutrition\n\nIron pairing: Don't serve milk with iron-rich foods at the same meal. Serve milk between meals or at bedtime. Serve iron foods (beef, liver, lentils) with vitamin C foods instead.\n\nQuality hierarchy: Raw A2 > Raw cow > Organic pasteurized grass-fed A2 > Organic pasteurized grass-fed > Conventional (avoid).\n\nFull-fat ALWAYS. Never low-fat or skim for children.` },
  ];

  // Dosing table by age
  const milkDosingTable = [
    { age: "1-2 years", amount: "16oz (2 cups)", timing: "Morning + Bedtime", benefit: "Reverses stunting. 15-30% IGF-1 boost. Bedtime cup deepens sleep for GH." },
    { age: "2-5 years", amount: "16-20oz (2-2.5 cups)", timing: "Morning + Snack + Bedtime", benefit: "Peak bone mass accrual. Calcium/IGF-1 absorption 20% better in A2. MFGM for brain myelination." },
    { age: "6-12 years", amount: "20-24oz (2.5-3 cups)", timing: "Breakfast + After school + Bedtime", benefit: "Height velocity (+0.5-1cm/yr edge). Stable energy. IQ via reduced brain fog. Cap 24oz (iron competition)." },
    { age: "13-18 years", amount: "24oz (3 cups)", timing: "Breakfast + Post-school + Bedtime", benefit: "Final growth spurts. Peak bone mass. Boys: supports last 4-8cm gains. Girls: density against estrogen-driven fusion." },
  ];


  // Design tokens
  const F = "'Courier New', Courier, monospace";
  const CC = {
    bg: '#fafaf9', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
    title: '#1c1917', body: '#57534e', light: '#a8a29e', green: '#059669', red: '#dc2626',
  };

  const CitationBlock = ({ citations }: { citations: { text: string; url: string }[] }) => (
    <div style={{ marginTop: 12, background: CC.bg, borderRadius: 14, padding: 12, fontFamily: F }}>
      <p style={{ fontSize: 10, color: CC.light, fontWeight: 800, marginBottom: 4 }}>Peer-reviewed:</p>
      {citations.map((c, ci) => (
        <a key={ci} href={c.url} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', fontSize: 10, color: CC.green, textDecoration: 'underline', paddingLeft: 8, borderLeft: `2px solid ${CC.sigBorder}`, marginBottom: 4 }}>
          {c.text}
        </a>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: CC.bg }}>
      <Nav currentChild={child} />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Back Link */}
        <Link href="/science" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontSize: 14, color: CC.light, textDecoration: 'none', marginBottom: 24 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Page Title */}
        <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Nutrition & GH→IGF-1
        </h1>
        <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 24 }}>
          Every meal is a signal to the growth hormone axis. Your job: provide the right nutrients at the right time so the pituitary releases GH, the liver converts it to IGF-1, and the growth plates respond. <em>Timing beats stimulation.</em>
        </p>

        {/* Key Stats — signature card */}
        <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '14px 18px', marginBottom: 44, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: CC.green }}>3 stages</div>
            <div style={{ fontFamily: F, fontSize: 14, color: CC.light }}>Pituitary → Liver → Plate</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: CC.green }}>+0.39cm</div>
            <div style={{ fontFamily: F, fontSize: 14, color: CC.light }}>per 8oz milk/day</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: CC.green }}>70%</div>
            <div style={{ fontFamily: F, fontSize: 14, color: CC.light }}>GH during deep sleep</div>
          </div>
        </div>

        {/* Hero: Personalized Daily Targets */}
        <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '20px 22px', marginBottom: 44 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: CC.green, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 14 }}>
            {child ? `${child.name}'s daily targets` : 'Daily targets'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { label: 'Protein', value: getProtein(), sub: 'per kg body weight' },
              { label: 'Milk', value: getMilkAmount(), sub: 'A2 or raw preferred' },
              { label: 'Cod Liver Oil', value: getCLO(), sub: 'every morning' },
              { label: 'Age', value: `${Math.floor(ageInYears)} years`, sub: 'protocols adjusted' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 800, fontSize: 22, color: CC.green, lineHeight: 1.2 }}>{item.value}</div>
                <div style={{ fontFamily: F, fontSize: 12, fontWeight: 800, color: CC.title, marginTop: 4 }}>{item.label}</div>
                <div style={{ fontFamily: F, fontSize: 11, color: CC.light }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Bar — 3 tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 0, borderBottom: `1px solid ${CC.border}` }}>
          {[
            { id: 'science', label: 'Science' },
            { id: 'protocol', label: 'Kitchen' },
            { id: 'deep', label: 'Deep Dive' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === tab.id ? `2px solid ${CC.green}` : '2px solid transparent',
                fontSize: 13,
                fontFamily: F,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? CC.green : CC.light,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '24px 0', marginBottom: 44 }}>

          {/* ═══ TAB: PROTOCOL ═══ */}
          {activeTab === 'protocol' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 4px' }}>The Protocol</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: CC.light, marginBottom: 28 }}>Everything to do, eat, and avoid — in order of impact.</p>

              {/* ── Section: Levers ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginBottom: 4 }}>Daily Levers</div>
              <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 16 }}>Ranked by impact on height. Do #1 first.</p>

              {nutritionLevers.map((lever, i) => {
                const isExpanded = expandedLever === `today-${i}`;
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedLever(isExpanded ? null : `today-${i}`)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                        padding: '14px 18px',
                        fontFamily: F,
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{
                        width: 28, height: 28, background: CC.green, color: 'white', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontFamily: F, fontWeight: 800, flexShrink: 0,
                      }}>{lever.rank}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: CC.title, marginBottom: 4 }}>{lever.title}</div>
                        <div style={{ fontSize: 13, color: CC.body, lineHeight: 1.75 }}>{lever.what}</div>
                      </div>
                      <span style={{ color: CC.light, fontSize: 18 }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none' }}>
                        <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>{lever.why}</p>
                        <div style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: CC.green, background: CC.card, padding: '8px 12px', borderRadius: 10, border: `1px solid ${CC.sigBorder}` }}>
                          Timing: {lever.timing}
                        </div>
                        {lever.citations && <CitationBlock citations={lever.citations} />}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ── Section: Milk Primer ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 4 }}>The Milk Primer</div>
              <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 16 }}>The single most studied food for child growth.</p>

              {/* Milk hero stat */}
              <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '14px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 28, color: CC.green }}>+0.39cm</div>
                <div style={{ fontFamily: F, fontSize: 14, color: CC.body, marginTop: 4 }}>per 8oz of milk per day — the most replicated finding in pediatric growth nutrition.</div>
                <div style={{ fontFamily: F, fontSize: 13, color: CC.light, marginTop: 8 }}>Hoppe C. Am J Clin Nutr. 2004 | Netherlands 25% more dairy = world's tallest country</div>
              </div>

              {/* Milk dosing by age */}
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginBottom: 12 }}>How Much — By Age</div>
              <div style={{ marginBottom: 20 }}>
                {milkDosingTable.map((row, i) => {
                  const isHighlighted = getMilkAgeHighlight() === row.age;
                  return (
                    <div key={i} style={{
                      padding: '14px 18px',
                      borderRadius: 14,
                      border: isHighlighted ? `2px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                      background: isHighlighted ? '#ecfdf5' : CC.card,
                      marginBottom: 8,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: isHighlighted ? CC.green : CC.title }}>{row.age}</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, color: isHighlighted ? CC.green : CC.body }}>{row.amount}</span>
                      </div>
                      <div style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 2 }}>{row.timing}</div>
                      <div style={{ fontFamily: F, fontSize: 14, color: CC.body }}>{row.benefit}</div>
                    </div>
                  );
                })}
              </div>

              {/* Milk deep sections */}
              {milkSections.map((section, i) => {
                const isExpanded = expandedMilkSection === i;
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedMilkSection(isExpanded ? null : i)}
                      style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 18px', fontFamily: F, textAlign: 'left',
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontWeight: 800, fontSize: 14, color: CC.title }}>{section.title}</span>
                      <span style={{ color: CC.light }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, whiteSpace: 'pre-line' as const }}>
                        {section.content}
                        {section.citations && <CitationBlock citations={section.citations} />}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ── Section: Master Food Chart ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 4 }}>Master Food Chart</div>
              <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 16 }}>Every food ranked with timing, combinations, and which pathway it activates.</p>

              {[
                { title: 'Tier 1 — Daily Anchors', sub: 'Strong evidence. Non-negotiables.', foods: tier1Foods },
                { title: 'Tier 2 — Power Adds', sub: 'Moderate evidence. Rotate these in weekly.', foods: tier2Foods },
                { title: 'Tier 3 — Signaling & Extras', sub: 'Niche or indirect — helpful but not core.', foods: tier3Foods },
              ].map((tier, ti) => (
                <div key={ti} style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginBottom: 4, paddingBottom: 8, borderBottom: `1px solid ${CC.border}` }}>{tier.title}</div>
                  <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 12 }}>{tier.sub}</p>
                  {tier.foods.map((food, i) => {
                    const isExpanded = expandedFood === food.name;
                    return (
                      <div key={i} style={{ marginBottom: 8 }}>
                        <button
                          onClick={() => setExpandedFood(isExpanded ? null : food.name)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                            padding: '14px 18px', fontFamily: F, textAlign: 'left',
                            background: isExpanded ? '#ecfdf5' : CC.bg,
                            border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                            borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontSize: 20 }}>{food.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontWeight: 800, fontSize: 14, color: CC.title }}>{food.name}</span>
                            {'target' in food && (food as { target?: string }).target && <span style={{ fontSize: 13, color: CC.light, marginLeft: 8 }}>({(food as { target?: string }).target})</span>}
                          </div>
                          <span style={{ fontSize: 13, color: CC.green }}>{food.when} {isExpanded ? '▲' : '▼'}</span>
                        </button>
                        {isExpanded && (
                          <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                            {'combine' in food && (food as { combine?: string }).combine && <div style={{ marginBottom: 8 }}><strong style={{ color: CC.title }}>How to combine:</strong> {(food as { combine?: string }).combine}</div>}
                            <div style={{ marginBottom: 8 }}><strong style={{ color: CC.title }}>Why it works:</strong> {food.why}</div>
                            <div style={{ background: CC.bg, borderLeft: `3px solid ${CC.sigBorder}`, padding: '8px 12px', borderRadius: '0 10px 10px 0', marginBottom: 8 }}>
                              <strong style={{ fontSize: 13, color: CC.green }}>Replaces this supplement:</strong> <span style={{ fontSize: 13, color: CC.body }}>{food.suppCorollary}</span>
                            </div>
                            {food.citations && <CitationBlock citations={food.citations} />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* ── Section: What to Avoid ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.red, marginTop: 44, marginBottom: 4 }}>What to Avoid</div>
              <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 16 }}>These directly interfere with the GH→IGF-1 axis.</p>
              {[
                ["Sugar / high-glycemic carbs", "Spikes insulin → suppresses GH up to 80%"],
                ["Ultra-processed foods", "DIRECTLY damage growth plates and chondrocytes"],
                ["Seed oils", "Inflammatory; affect hormone signaling"],
                ["Late-night eating", "Elevates insulin during the 10pm-2am GH window"],
                ["Large protein meals before bed", "Glass of milk OK; full steak NOT"],
                ["Vinegar", "Inhibits insulin presence the liver needs for IGF-1"],
                ["A1 conventional milk", "BCM-7 inflammatory peptide → gut permeability"],
                ["Farmed fish", "Grain-fed, antibiotics, contaminants"],
                ["Non-organic Dirty Dozen", "Pesticide residues = endocrine disruptors"],
                ["Keto / very low-carb", "Liver REQUIRES insulin (from carbs) to make IGF-1"],
                ["Soy", "Phytoestrogen concerns per framework"],
                ["Caffeine", "Disrupts deep sleep architecture"],
                ["Bread, pasta, rice, oats", "High-glycemic; spikes insulin"],
                ["Skipping meals / under-eating", "AMPK survival mode shuts down growth"],
              ].map(([item, reason], i) => (
                <div key={i} style={{ fontFamily: F, fontSize: 13, color: CC.body, padding: '6px 0', lineHeight: 1.75 }}>
                  <span style={{ color: CC.red, fontWeight: 800 }}>✕</span> <strong>{item}</strong> — {reason}
                </div>
              ))}

              {/* ── Section: Supplement → Food Map ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 4 }}>Supplement → Food Replacement Map</div>
              <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '14px 18px', marginBottom: 16, marginTop: 12 }}>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                  According to peer-reviewed research, these compounds can produce 157% to 44-fold increases in growth hormone — but those results come from isolated, pharmacologic-dose supplements. For children, <strong>making it a lifestyle through food is superior</strong>. Whole foods deliver the same active compounds alongside cofactors, minerals, and complementary nutrients. A food-based lifestyle creates the <em>environment</em> for growth day after day, month after month.
                </p>
              </div>
              {suppMap.map((supp, i) => {
                const isExpanded = expandedSupp === i;
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedSupp(isExpanded ? null : i)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                        padding: '14px 18px', fontFamily: F, textAlign: 'left',
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, color: CC.green, fontSize: 13 }}>{supp.spike}</span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 800, fontSize: 14, color: CC.title }}>{supp.supp}</span>
                        <div style={{ fontSize: 13, color: CC.light, marginTop: 2 }}>{supp.mechanism}</div>
                      </div>
                      <span style={{ color: CC.light }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                        <div style={{ fontSize: 13, color: CC.light, marginBottom: 12 }}>Supplement dose: {supp.spikeDose}</div>
                        <div style={{ fontWeight: 800, color: CC.green, marginBottom: 8 }}>Top 3 Food Replacements</div>
                        {supp.top3.map((t, ti) => (
                          <div key={ti} style={{ padding: '8px 12px', borderRadius: 10, background: ti === 0 ? '#ecfdf5' : CC.card, border: `1px solid ${ti === 0 ? CC.sigBorder : CC.border}`, marginBottom: 6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ width: 22, height: 22, borderRadius: '50%', background: CC.green, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{t.rank}</span>
                              <span style={{ fontWeight: 800, color: CC.title }}>{t.food}</span>
                            </div>
                            <div style={{ fontSize: 13, color: CC.body, marginLeft: 30 }}>{t.detail}</div>
                            <div style={{ fontSize: 13, color: CC.green, marginLeft: 30, marginTop: 2 }}>{t.freq}</div>
                          </div>
                        ))}
                        <div style={{ background: CC.card, padding: '8px 12px', borderRadius: 10, border: `1px solid ${CC.border}`, marginTop: 8 }}>
                          <div style={{ fontSize: 13, color: CC.light }}><strong>When:</strong> {supp.when}</div>
                          <div style={{ fontSize: 13, color: CC.green, marginTop: 4 }}><strong>Why food is better:</strong> {supp.why}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ TAB: DEEP DIVE ═══ */}
          {activeTab === 'deep' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Deep Dive</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: CC.light, marginBottom: 28 }}>The complete science — every mechanism, every pathway, every lever explained.</p>

              {/* ── Three Stage Model ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginBottom: 4 }}>The Three-Stage Model</div>
              <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 16 }}>What to do at each stage — and why it works. Tap any lever to see the science.</p>
              {[
                { stage: "Stage 1: Pituitary", sub: "Release the GH pulse", levers: [
                  { food: "Pumpkin seeds, turkey, eggs, beef, lentils", action: "Suppress somatostatin (the GH brake)", science: "Arginine, ornithine, and lysine compete with somatostatin signaling. Copenhagen Study: habitual 2.8-3.2g/day arginine = +0.33 cm/yr." },
                  { food: "Eggs before sprints (2-3 daily)", action: "Prime the pituitary communication highway", science: "Choline (147mg/egg) → acetylcholine → the neurotransmitter that carries GH-release signals. Pre-exercise eggs make the pituitary \"permissive\" for max GH amplitude." },
                  { food: "Fermented foods (yogurt, kefir, kimchi)", action: "Reduce somatostatin via gut-brain GABA", science: "GABA-producing lactic acid bacteria reduce somatostatin \"noise\" through the gut-brain axis. Sustained somatostatin suppression during the sleep-GH window." },
                  { food: "Bone broth / gelatin (evening, 2-3h pre-bed)", action: "Deeper sleep → bigger GH pulses", science: "Glycine lowers core body temperature → deeper slow-wave sleep → reduced somatostatin during the GH pulse window." },
                ]},
                { stage: "Stage 2: Liver", sub: "Convert GH → IGF-1 via JAK2-STAT5", levers: [
                  { food: "Eat enough calories (surplus 300-1000 kcal/day)", action: "#1 priority — without this, nothing else works", science: "Low energy activates AMPK (survival mode), which shuts down mTORC1 and causes functional GH resistance. Adequate calories normalize AMPK and allow growth signaling." },
                  { food: "Adequate protein (0.9-1.5 g/kg/day)", action: "Building blocks for IGF-1 + mTOR activation", science: "IGF-1 is a protein — you need amino acids to build it. Leucine specifically activates mTOR. UK Biobank: both animal and plant protein contribute to IGF-1." },
                  { food: "Zinc-rich foods (oysters, beef, pumpkin seeds)", action: "GH receptor REQUIRES zinc to function", science: "Zinc is the cofactor for GH receptor signaling and IGF-1 gene expression. Without sufficient zinc, JAK2-STAT5 can't activate properly." },
                  { food: "Salmon, CLO, sunlight (Vitamin D)", action: "GH receptor expression + calcium absorption", science: "Vitamin D upregulates GH receptor expression at the liver — more receptors = more GH signal captured." },
                ]},
                { stage: "Stage 3: Growth Plate", sub: "IGF-1 → actual bone growth", levers: [
                  { food: "Sprints + jumping + active play (3x/week)", action: "Local IGF-1 production directly at growth plates", science: "Growth plates produce their own IGF-1 in response to mechanical load. A child who eats perfectly but is sedentary misses this local IGF-1 stimulation." },
                  { food: "Dairy, leafy greens, sardines (calcium)", action: "Bone matrix mineralization", science: "Calcium and phosphorus provide the mineral component of bone matrix. Fermented dairy has the highest calcium bioavailability." },
                  { food: "Beans / lentils DAILY + cruciferous veg", action: "Keep growth plates OPEN longer (delay puberty)", science: "Higher plant protein ages 3-6 = later puberty onset. Cruciferous vegetables modify estrogen metabolism. This extends the genetic height runway." },
                  { food: "Tart cherries, raspberries, oats, walnuts", action: "Support melatonin — dual GH + anti-aromatase", science: "Melatonin both deepens SWS for larger GH pulses AND inhibits aromatase (delays growth plate closure)." },
                ]},
              ].map((stage, si) => (
                <div key={si} style={{ background: CC.card, border: `1px solid ${CC.border}`, borderRadius: 14, padding: '14px 18px', marginBottom: 12 }}>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: CC.green }}>{stage.stage}</span>
                    <span style={{ fontFamily: F, fontSize: 13, color: CC.light, marginLeft: 8 }}>{stage.sub}</span>
                  </div>
                  {stage.levers.map((lever, li) => {
                    const leverId = `${si}-${li}`;
                    const isExpanded = expandedStageLever === leverId;
                    return (
                      <div key={li} style={{ marginBottom: 6 }}>
                        <button
                          onClick={() => setExpandedStageLever(isExpanded ? null : leverId)}
                          style={{
                            width: '100%', textAlign: 'left', padding: '8px 12px', fontFamily: F,
                            background: isExpanded ? '#ecfdf5' : CC.bg, borderRadius: isExpanded ? '10px 10px 0 0' : 10,
                            border: `1px solid ${isExpanded ? CC.sigBorder : CC.border}`, cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontWeight: 800, fontSize: 13, color: CC.title }}>{lever.food}</div>
                          <div style={{ fontSize: 13, color: CC.green, marginTop: 2 }}>{lever.action}</div>
                        </button>
                        {isExpanded && (
                          <div style={{ background: '#ecfdf5', padding: '8px 12px', borderRadius: '0 0 10px 10px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                            {lever.science}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* ── Somatostatin ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 4 }}>Somatostatin: The GH Brake</div>
              <div style={{ background: CC.card, border: `1px solid ${CC.border}`, borderRadius: 14, padding: '14px 18px', marginTop: 12, marginBottom: 20 }}>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>
                  Somatostatin is a hormone that tells the pituitary to <strong>stop releasing growth hormone</strong>. Think of it as the brake pedal. When somatostatin is high, GH pulses are smaller and less frequent — even if everything else is perfect.
                </p>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                  If somatostatin is chronically elevated from poor diet, inflammation, or disrupted sleep, the brake is on and GH can't flow freely. The good news: <strong>specific foods naturally reduce somatostatin</strong>, releasing the brake.
                </p>
              </div>

              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginBottom: 12 }}>Removing the Brakes — 5 Ways Food Suppresses Somatostatin</div>
              {somatostatinTable.map((row, i) => (
                <div key={i} style={{ padding: '14px 18px', borderRadius: 14, background: CC.card, border: `1px solid ${CC.border}`, marginBottom: 8 }}>
                  <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: CC.title, marginBottom: 4 }}>{row.mechanism}</div>
                  <div style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 4 }}>{row.how}</div>
                  <div style={{ fontFamily: F, fontSize: 14, color: CC.green }}><strong>Foods:</strong> {row.foods}</div>
                </div>
              ))}

              {/* ── All 16 Pathways ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 4 }}>All 16 Pathways — Ranked by Impact</div>
              <p style={{ fontFamily: F, fontSize: 13, color: CC.light, marginBottom: 16 }}>The complete science behind each recommendation.</p>
              {mechanisms.map((m, i) => {
                const isExpanded = expandedMech === i;
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedMech(isExpanded ? null : i)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '14px 18px', fontFamily: F, textAlign: 'left',
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                      }}
                    >
                      <span style={{
                        width: 24, height: 24, background: CC.green, color: 'white', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontFamily: F, fontWeight: 800, flexShrink: 0,
                      }}>{m.rank}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: CC.title }}>{m.title}</div>
                        <div style={{ fontSize: 13, color: CC.light }}>{m.subtitle}</div>
                      </div>
                      <span style={{ color: CC.light }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                        <div style={{ background: CC.card, padding: '8px 12px', borderRadius: 10, border: `1px solid ${CC.sigBorder}`, marginBottom: 12 }}>
                          <strong style={{ color: CC.green }}>Parent lever:</strong> {m.parentLever}
                        </div>
                        <p style={{ whiteSpace: 'pre-line' as const }}>{m.content}</p>
                        {m.citations && <CitationBlock citations={m.citations} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ TAB: SCIENCE ═══ */}
          {activeTab === 'science' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 4px' }}>The Science</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: CC.light, marginBottom: 28 }}>Understanding the GH→IGF-1 connection and how nutrition controls the conversion cascade.</p>

              {/* Mechanism */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginBottom: 12 }}>Mechanism</div>
              <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '18px 22px', marginBottom: 28 }}>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>
                  Growth hormone (GH) is released in pulses from the pituitary gland, primarily during deep slow-wave sleep (SWS), with 60-80% of daily secretion in the first 3 hours after sleep onset. GH alone does not cause bones to grow. The liver must convert GH into Insulin-like Growth Factor 1 (IGF-1), which is the actual mediator of longitudinal bone growth.
                </p>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>
                  Before the liver releases IGF-1, it checks multiple signals simultaneously: blood glucose must be adequate, insulin must be present in a permissive range (not spiked), amino acids must be available, thyroid hormone must be sufficient, and inflammation must be low. Think of the liver asking: <em>&quot;Is this a safe time to build a bigger body?&quot;</em> Only when all conditions are favorable does it produce IGF-1.
                </p>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                  In children, GH is already abundant. The constraint is sleep quality, nutrient sufficiency, and timing — not stimulation. The growth plate problem compounds this: testosterone rises during puberty → converts to estrogen via aromatase → estrogen closes growth plates permanently. This creates a finite window where optimizing the GH→IGF-1 axis matters most.
                </p>
              </div>

              {/* Five Levers */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginBottom: 12 }}>The Five Levers That Actually Matter</div>
              <div style={{ background: CC.card, border: `1px solid ${CC.border}`, borderRadius: 14, padding: '18px 22px', marginBottom: 28 }}>
                {[
                  ["Eat enough calories", "The #1 priority. Under-eating = low IGF-1 regardless of food quality. Surplus 300-1000 kcal/day for active youth. AMPK overrides ALL growth signals when energy is low."],
                  ["Eat enough protein", "IGF-1 is a protein — you need building blocks to make it. 0.9-1.5 g/kg/day. Both animal and plant protein contribute to IGF-1. Plant protein = later puberty (bonus)."],
                  ["Insulin: present but not spiked", "The liver REQUIRES insulin for IGF-1 — very low-carb diets stunt growth. But sugar suppresses GH 80%. Solution: balanced meals."],
                  ["Keep inflammation low", "Inflammation activates SOCS proteins — a \"dimmer switch\" that blocks the liver from hearing GH. Anti-inflammatory foods keep the dimmer off."],
                  ["Optimize sleep", "70% of GH released during deep sleep. Sleep quality is the #1 modifiable factor. Everything else optimizes around this window."],
                ].map(([title, desc], i) => (
                  <div key={i} style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: i < 4 ? 12 : 0 }}>
                    <strong style={{ color: CC.title }}>{title}:</strong> {desc}
                  </div>
                ))}
              </div>

              {/* Pathway — numbered cascade */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: CC.title, marginBottom: 12 }}>The Pathway</div>
              <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '18px 22px' }}>
                {[
                  "Pituitary releases GH during deep sleep",
                  "GH travels to liver",
                  "Liver checks: insulin permissive? amino acids available? zinc sufficient? inflammation low?",
                  "If yes → JAK2-STAT5 signaling activates",
                  "IGF-1 produced",
                  "IGFBP-3 carries IGF-1 to growth plates",
                  "mTOR activates chondrocyte proliferation → bones grow",
                  "Local IGF-1 from exercise adds to systemic",
                  "Estrogen eventually closes plates → growth window is finite",
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 8 ? 10 : 0, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: i === 8 ? CC.red : CC.green, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontFamily: F, fontWeight: 800,
                    }}>{i + 1}</span>
                    <span style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
                <div style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: CC.green, marginTop: 16, textAlign: 'center' as const }}>
                  Timing beats stimulation.
                </div>
                <p style={{ fontFamily: F, fontSize: 12, color: CC.light, marginTop: 16, lineHeight: 1.6 }}>
                  Van Cauter E. Sleep. 2000 · Hoppe C. Am J Clin Nutr. 2004 · Prasad AS. Nutrition. 1998 · Iannotti LL. Pediatrics. 2017 · Copenhagen Study · UK Biobank
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
