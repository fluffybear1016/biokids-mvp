'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';


const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Your child',
  birth_date: '2017-03-15',
  gender: 'female',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

function calculateAgeInYears(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Design tokens
const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9',
  card: '#fff',
  border: '#e7e5e4',
  sigBorder: '#86efac',
  title: '#1c1917',
  body: '#57534e',
  light: '#a8a29e',
  green: '#065f46',
  red: '#dc2626',
  redLight: '#7f1d1d',
};

export default function SleepCircadianWindow() {
  const [child, setChild] = useState<Child>(mockChild);
  const [activeTab, setActiveTab] = useState<'science' | 'bedtime' | 'deep'>('science');
  const [expandedLever, setExpandedLever] = useState<number | null>(null);
  const [expandedEnv, setExpandedEnv] = useState<number | null>(null);
  const [expandedWarn, setExpandedWarn] = useState<number | null>(null);
  const [childAge, setChildAge] = useState(8);

  useEffect(() => {
    const savedName = localStorage.getItem('childName');
    const childData = localStorage.getItem('child_data');
    if (childData) {
      try {
        const parsed = JSON.parse(childData);
        if (parsed.birthDate) {
          const age = calculateAgeInYears(parsed.birthDate);
          setChildAge(age);
          setChild({
            ...mockChild,
            name: parsed.name || savedName || 'Your child',
            birth_date: parsed.birthDate,
            gender: parsed.sex || 'female',
          });
          return;
        }
      } catch (e) {
        // Use defaults
      }
    }
    if (savedName) {
      setChild({ ...mockChild, name: savedName });
    }
  }, []);

  // Age-based data tables
  const sleepTargets = [
    { age: "0-3 months", min: "14 hours", target: "16-17 hours", notes: "Polyphasic, no circadian rhythm yet", range: [0, 0.25] },
    { age: "4-11 months", min: "12 hours", target: "14-15 hours", notes: "Nighttime consolidation beginning", range: [0.33, 0.92] },
    { age: "1-2 years", min: "11 hours", target: "13-14 hours", notes: "Strong bias toward long nighttime sleep", range: [1, 2] },
    { age: "3-5 years", min: "11 hours", target: "12-13 hours", notes: "Strong bias toward nighttime, not late naps", range: [3, 5] },
    { age: "6-9 years", min: "10 hours", target: "11-12 hours", notes: "Anchored in the night", range: [6, 9] },
    { age: "10-12 years", min: "10 hours", target: "11-12 hours", notes: "Protect against homework/screen creep", range: [10, 12] },
    { age: "13-15 years", min: "10 hours", target: "11-12 hours", notes: "Natural phase delay, still protect early deep-sleep window", range: [13, 15] },
    { age: "16-18 years", min: "10 hours", target: "10-11 hours", notes: "Social pressure intensifies, sleep non-negotiable", range: [16, 18] },
    { age: "19-25 years", min: "10 hours", target: "10-11 hours", notes: "Habits established now persist for decades", range: [19, 25] }
  ];

  const bedtimeTargets = [
    { age: "0-2 years", bedtime: "6:30-7:30 PM", notes: "Captures earliest deep-sleep window", range: [0, 2] },
    { age: "3-5 years", bedtime: "7:00-7:30 PM", notes: "Asleep by 7:30, first SWS block by 9:30 PM", range: [3, 5] },
    { age: "6-9 years", bedtime: "7:30-8:00 PM", notes: "Asleep by 8:00, first SWS block by 10 PM", range: [6, 9] },
    { age: "10-12 years", bedtime: "8:00-8:30 PM", notes: "Asleep by 8:30, captures 10 PM-1 AM peak", range: [10, 12] },
    { age: "13-15 years", bedtime: "8:00-8:30 PM", notes: "Natural phase delay fights you, protect aggressively", range: [13, 15] },
    { age: "16-18 years", bedtime: "8:30-9:00 PM", notes: "Social pressure intensifies, hold the line", range: [16, 18] },
    { age: "19-25 years", bedtime: "9:00-9:30 PM", notes: "Establish lifelong pattern", range: [19, 25] }
  ];

  const milkDosing = [
    { age: "1-2 years", amount: "2-4 oz (60-120 mL)", notes: "Small amount only", range: [1, 2] },
    { age: "3-5 years", amount: "3-4 oz (90-120 mL)", notes: "", range: [3, 5] },
    { age: "6-9 years", amount: "4-6 oz (120-180 mL)", notes: "", range: [6, 9] },
    { age: "10-12 years", amount: "6-8 oz (180-240 mL)", notes: "", range: [10, 12] },
    { age: "13-17 years", amount: "6-8 oz (180-240 mL)", notes: "Only if tolerated and doesn't cause night waking", range: [13, 17] },
    { age: "18-25 years", amount: "6-8 oz (180-240 mL)", notes: "Optional", range: [18, 25] }
  ];

  const tartCherryDosing = [
    { age: "1-3 years", dose: "1-2 mL (\u00BC-\u00BD tsp)", dilution: "In 1-2 oz water", timing: "45-60 min before bed", frequency: "Rare use only (jet lag), 1-2x/week max", range: [1, 3] },
    { age: "4-5 years", dose: "5-10 mL (1-2 tsp)", dilution: "1:2 or 1:3 with water", timing: "45-60 min before bed", frequency: "2-3x/week", range: [4, 5] },
    { age: "6-9 years", dose: "15-30 mL (\u00BD-1 oz)", dilution: "At least 1:1 with water", timing: "30-45 min before bed", frequency: "3-4x/week", range: [6, 9] },
    { age: "10-12 years", dose: "30-45 mL (1-1.5 oz)", dilution: "1:1 with water", timing: "30-45 min before bed", frequency: "4x/week", range: [10, 12] },
    { age: "13-17 years", dose: "30-60 mL (1-2 oz)", dilution: "1:1 with water", timing: "30-45 min before bed", frequency: "As needed, not nightly", range: [13, 17] },
    { age: "18-25 years", dose: "30-60 mL (1-2 oz)", dilution: "1:1 with water", timing: "30-45 min before bed", frequency: "As needed", range: [18, 25] }
  ];

  // Helper functions
  const getAgeData = <T extends { range: number[] }>(table: T[]): T => {
    return table.find(row => childAge >= row.range[0] && childAge <= row.range[1]) || table[table.length - 1];
  };

  const isActiveRow = (range: number[]) => childAge >= range[0] && childAge <= range[1];

  const currentSleep = getAgeData(sleepTargets);
  const currentBedtime = getAgeData(bedtimeTargets);
  const currentMilk = getAgeData(milkDosing);
  const currentCherry = getAgeData(tartCherryDosing);

  const getMagnesiumDose = () => childAge <= 5 ? "\u00BD cup" : "1 cup";

  const levers = [
    {
      title: `Sleep ${currentSleep.target} every night`,
      what: `Never below ${currentSleep.min}. Each 90-min cycle = one "growth set." 12 hours = 8 sets. 8 hours = only 5 sets. ${currentSleep.notes}.`,
      why: `60-80% of daily GH secretion occurs in the first major deep-sleep episode within roughly 3 hours after sleep onset. This pulse is tightly time-locked to slow-wave sleep itself: when slow waves appear, GH rises with a lag of about 5-15 minutes. When SWS is experimentally suppressed, GH secretion is delayed and reduced. When SWS is enhanced, GH rises.

Children naturally have significantly more slow-wave sleep than adults \u2014 25-40% of total sleep time versus 15-25% in adults, peaking in early childhood. This is why childhood sleep is extraordinarily valuable for growth. Every hour of a child\u2019s sleep contains more GH-releasing deep sleep than an adult\u2019s.

Sleep restriction strips deep stages FIRST \u2014 the GH window is the first casualty of lost sleep. Those 3 missing sets contain the deep-sleep stages where GH is released. You\u2019re not just losing sleep \u2014 you\u2019re losing growth reps.

Population studies confirm: shorter and more irregular nighttime sleep is associated with shorter stature. Longer and more regular nighttime sleep is associated with taller stature and clearer growth spurts.

Think in reps: Each full 90-minute sleep cycle is one \u201Cgrowth set.\u201D A child sleeping 12 hours gets 8 complete sets. A child sleeping 8 hours gets only 5.`,
      timing: `Asleep by ${currentBedtime.bedtime.split('-')[0]}, wake naturally. Aim for TOP of range.`,
      citations: [
        { text: "Van Cauter E et al. Sleep. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10984255" },
        { text: "Takahashi Y et al. J Clin Invest. 1968", url: "https://pubmed.ncbi.nlm.nih.gov/5765429" }
      ]
    },
    {
      title: `Fixed bedtime ${currentBedtime.bedtime} \u2014 every day including weekends`,
      what: `Anchors circadian clock, stabilizes melatonin rise and SWS timing = stable GH pulse timing. ${currentBedtime.notes}.`,
      why: `Fixed bedtime and wake time (\u00B130 minutes) every single day, including weekends. This anchors the circadian clock, stabilizes evening melatonin rise and slow-wave sleep timing, which stabilizes growth hormone pulse timing.

\u201CSocial jet lag\u201D \u2014 staying up late and sleeping in on weekends \u2014 destabilizes circadian phase and evening melatonin, leading to late slow-wave sleep, scattered growth hormone pulses, and chronic internal jet lag. Shifting bedtime by multiple hours on weekends can take several days to re-entrain, meaning the growth hormone-rich early-night window is mistimed or underused for much of the week.

One late Friday night can affect growth hormone timing through Wednesday.

For children on an early schedule, being asleep by around 8:00-8:30 PM means their first deep-sleep block \u2014 and thus the largest growth hormone surge \u2014 falls in the roughly 10 PM-1 AM window, provided sleep is continuous and deep.`,
      timing: "Same time \u00B130 min, 7 days/week. No exceptions.",
      citations: [
        { text: "Mindell JA et al. Sleep. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25325575" },
        { text: "Touchette E et al. Sleep. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17403938" }
      ]
    },
    {
      title: "Complete darkness \u2014 blackout shades non-optional",
      what: "Even small amounts of light \u2014 hallway light, device LEDs, early dawn light \u2014 suppress melatonin. Blackout shades are not optional.",
      why: `Melatonin, triggered by darkness and a stable circadian rhythm, rises in the evening and acts as a \u201Cnighttime repair\u201D signal that facilitates deep sleep and growth hormone release. Melatonin also inhibits aromatase \u2014 the enzyme that converts testosterone to estrogen \u2014 providing an additional mechanism for preserving the hormonal environment that supports growth.

In children, higher nighttime melatonin is positively correlated with robust nocturnal growth hormone and healthy growth patterns.

Cover every light source in the room. If a nightlight is necessary, use only red or amber light. No phone plugged in next to the bed \u2014 remove all devices from the sleep environment entirely.

Consider a Hatch or similar timed light clock to prevent premature morning wakeups and preserve early-night deep sleep blocks.

Melatonin production requires true darkness.`,
      timing: "From lights-out until wake. Complete darkness all night.",
      citations: [
        { text: "Gooley JJ et al. J Clin Endocrinol Metab. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21415172" },
        { text: "LeBourgeois MK et al. Physiol Rep. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29389975" }
      ]
    },
    {
      title: "No screens 1-2 hours before bed",
      what: "Blue-enriched light from tablets and phones suppresses melatonin by well over 50% and shifts the dim-light melatonin onset later \u2014 sometimes by hours.",
      why: `Blue-enriched light in the 1-2 hours before bedtime suppresses melatonin by well over 50% and shifts the dim-light melatonin onset later \u2014 sometimes by hours. This doesn\u2019t just make it harder to fall asleep. It delays sleep, compresses slow-wave sleep, and blunts or scatters the growth hormone surge.

In preschoolers, bedtime and evening light together explain about 50% of melatonin timing variance.

Use warm, dim lights only. Devices charge outside the bedroom. Screens should never be in the bedroom at any time.

Reading a physical book is one of the most effective wind-down activities \u2014 it replaces screen stimulation with calm cognitive engagement that naturally builds sleep pressure.`,
      timing: "Screens off 1-2 hours before bed",
      citations: [
        { text: "Chang AM et al. Proc Natl Acad Sci USA. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25535358" },
        { text: "Hale L et al. Sleep Med Rev. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/26568847" }
      ]
    },
    {
      title: "Cool room 65-68\u00B0F (18-20\u00B0C)",
      what: "Core body cooling supports deeper sleep \u2014 the body needs to drop core temperature to initiate and maintain slow-wave sleep.",
      why: `Core body cooling is required for deep sleep initiation. The body needs to drop core temperature to initiate and maintain slow-wave sleep. Warm rooms fight this process and reduce slow-wave sleep quality.

This is why warm bath before bed works \u2014 the subsequent cooling triggers the core temp drop that initiates deep sleep.`,
      timing: "Set thermostat before bedtime routine starts",
      citations: [
        { text: "Okamoto-Mizuno K et al. J Physiol Anthropol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22738673" },
        { text: "Kr\u00E4uchi K et al. Nature. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10188130" }
      ]
    },
    {
      title: "Morning sunlight 10-30 min within 30 min of waking",
      what: "The strongest circadian zeitgeber (time-setter) that advances and stabilizes circadian phase, helping melatonin rise on time that evening.",
      why: `10-30 minutes of outdoor light within 30 minutes of waking is the strongest circadian zeitgeber (time-setter) that advances and stabilizes circadian phase, helping melatonin rise on time that evening.

This is free and powerful. Overcast days still work. Sunglasses off.

This morning light is what makes tonight\u2019s melatonin rise reliably.`,
      timing: "Within 30 min of waking, 10-30 min outside. Sunglasses off.",
      citations: [
        { text: "Roenneberg T et al. Curr Biol. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17084612" },
        { text: "Figueiro MG et al. Sleep Health. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28899253" }
      ]
    },
    {
      title: "Evening sunset watching",
      what: "Second zeitgeber that complements morning light.",
      why: "Watch the sunset when possible. Evening light transition reinforces the circadian rhythm and signals the system to begin melatonin production. This is a second zeitgeber that complements morning light.",
      timing: "Watch sunset when possible",
      citations: [
        { text: "Duffy JF et al. Sleep. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19456998" },
        { text: "Wright KP et al. Curr Biol. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23440187" }
      ]
    },
    {
      title: `Warm bath with magnesium \u2014 ${getMagnesiumDose()} Epsom salts, 60 min before bed`,
      what: "Raises surface body temperature, and the subsequent cooling afterward facilitates the core temperature drop that initiates deep sleep.",
      why: `A warm bath 1-2 hours before bed isn\u2019t just relaxing. It raises surface body temperature, and the subsequent cooling afterward facilitates the core temperature drop that initiates deep sleep. The bath \u2192 cooling sequence is a physiological trigger for sleep onset, not just a behavioral one.

Add Epsom salts or magnesium flakes (${getMagnesiumDose()} for age ${childAge}) for transdermal magnesium delivery. Soak 10-20 minutes in warm (not hot) water.

Add lavender or chamomile essential oil if well tolerated. Lavender aromatherapy (diffuser, pillow spray, or a few drops of essential oil in the bath) is a calming aid that may support deeper sleep \u2014 one of the few fragrances with evidence supporting relaxation.

This makes the bath a multi-modal relaxation tool \u2014 warmth + magnesium + aromatherapy + subsequent cooling.`,
      timing: "30-60 min before bed, 10-20 min soak",
      citations: [
        { text: "Haghayegh S et al. Sleep Med Rev. 2019", url: "https://pubmed.ncbi.nlm.nih.gov/31102877" },
        { text: "Sung EJ et al. Int J Sports Med. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10408315" }
      ]
    },
    {
      title: "Magnesium lotion on feet \u2014 during bedtime routine",
      what: "Modulates GABAergic tone and reduces neuromuscular tension \u2192 easier SWS entry.",
      why: `Magnesium supports relaxation and sleep quality by modulating GABAergic tone and reducing neuromuscular tension. Adult data connects magnesium with more efficient slow-wave sleep, so the growth hormone benefit is indirect but plausible.

Michael Jordan reportedly had salt in his shoes \u2014 the science behind this is the calming effect of magnesium absorption through the feet, which supports sleep quality.

Use child-formulated magnesium lotion or spray (magnesium glycinate preferred). Apply thin layer to soles of feet, massage gently for 1-2 minutes during bedtime routine.

Functions as both a calming sensory ritual and a route for low-dose transdermal magnesium delivery. Combine with the bath or use on non-bath nights.`,
      timing: "After bath, during books/wind-down, 1-2 min massage",
      citations: [
        { text: "Abbasi B et al. J Res Med Sci. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/23853635" },
        { text: "Nielsen FH et al. Magnes Res. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20352370" }
      ]
    },
    {
      title: `Bedtime milk \u2014 ${currentMilk.amount} warm, plain, 60-90 min before lights out`,
      what: `\u03B1-lactalbumin has the highest tryptophan content among all food proteins. Tryptophan \u2192 serotonin \u2192 melatonin \u2192 deeper SWS. ${currentMilk.notes}`,
      why: `Milk provides tryptophan (via \u03B1-lactalbumin) and calcium, supporting the serotonin \u2192 melatonin production pathway and gentle satiety without a heavy insulin spike.

The protein in milk is rich in \u03B1-lactalbumin, which has one of the highest tryptophan contents among all food proteins. This is why milk specifically \u2014 not just any protein \u2014 supports the serotonin \u2192 melatonin pathway for sleep. Milk is the optimal bedtime protein precisely because of \u03B1-lactalbumin\u2019s tryptophan density.

Calcium is directly needed for melatonin synthesis. Uses the serotonin \u2192 melatonin axis to support sleep onset while stabilizing overnight blood sugar, especially if the child otherwise wakes hungry.

Warm if tolerated \u2014 warmth adds a calming sensory component. Plain, unsweetened only.

Casein curds digest 3-7 hours releasing tryptophan. Amplifies overnight GH 20-50%. Dutch, Dinka, Serbians all do this.`,
      timing: "60-90 min before lights out. Warm. Plain. Never chocolate or sweetened.",
      citations: [
        { text: "Markus CR et al. Am J Clin Nutr. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15883457" },
        { text: "Dela Pe\u00F1a IJ et al. Pharm Biol. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25902764" }
      ]
    },
    {
      title: `Tart cherry juice \u2014 ${currentCherry.dose} diluted ${currentCherry.dilution}`,
      what: `Exogenous melatonin + polyphenols that reduce evening cortisol. ${currentCherry.frequency}.`,
      why: `Tart cherry provides exogenous melatonin and polyphenols that reduce evening cortisol and mildly advance circadian phase. It does not spike growth hormone directly. It improves sleep onset and sleep continuity, which allows natural growth hormone pulses to occur.

The benefit is via better sleep continuity and reduced cortisol \u2014 not direct growth hormone stimulation.

Milk and tart cherry juice are complementary, not redundant. Milk supports melatonin production (precursor). Tart cherry signals melatonin timing (direct). Together in small doses, they improve sleep \u2014 which is where growth hormone already does its job. Used correctly, this is sleep hygiene, not hormone manipulation.

Use 100% tart cherry juice ONLY \u2014 no blends, no added sugar. Always dilute and keep doses small to avoid nocturnal sugar spikes.

Use ONLY if sleep onset or early-morning waking is a problem \u2014 not for children who already sleep well.

Milk first (serotonin precursor groundwork), tart cherry later (melatonin timing cue).

Watch for: night waking, vivid dreams, bedwetting, or morning grogginess. If any appear, reduce or stop tart cherry first, then reassess milk. If child already sleeps well \u2014 don\u2019t add tart cherry at all.

What NOT to do: Large glass of cherry juice. Sweetened cherry products. Chocolate milk. Both immediately before lights out. Nightly use without breaks (entrainment > dependence).`,
      timing: `${currentCherry.timing}. Milk first (60-90 min), cherry later (30-45 min).`,
      citations: [
        { text: "Howatson G et al. Eur J Nutr. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22038497" },
        { text: "Pigeon WR et al. J Med Food. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20438325" }
      ]
    },
    {
      title: "Finish ALL food 2-3 hours before bed",
      what: "Insulin suppresses growth hormone by up to 80%. Eating before bed spikes insulin during the exact window when growth hormone should be surging.",
      why: `Finish ALL food 2-3 hours before bedtime. Insulin suppresses growth hormone by up to 80%. Eating before bed \u2014 especially high-glycemic foods \u2014 spikes insulin during the exact window when growth hormone should be surging.

Experimental data show that elevated insulin around sleep onset markedly reduces nocturnal growth hormone output. Late eating and reflux also fragment sleep and blunt growth hormone-rich slow-wave sleep.

Acidic foods close to bedtime can disrupt sleep quality, which indirectly affects growth hormone secretion.

This is one of the most important and most violated rules.

Exception: bedtime milk (small amount, gentle insulin response). No snacks, no juice, nothing spiking blood sugar.`,
      timing: "Dinner done 2-3 hours before bedtime",
      citations: [
        { text: "Ho KY et al. J Clin Endocrinol Metab. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3127426" },
        { text: "Crispim CA et al. Int J Obes. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21532851" }
      ]
    },
    {
      title: "Dinner: protein-rich with glycine foods",
      what: "High-arginine foods + bone broth + gelatin dessert with pineapple.",
      why: `Dinner should be protein-rich (eggs, meat, fish, dairy, beans) for growth hormone-active amino acids (arginine, lysine, ornithine, glycine, glutamine), plus complex carbs and healthy fats.

High-arginine food for dinner is optimal \u2014 pumpkin seeds, turkey, chicken, eggs, dairy. No heavy, sugary desserts late. Finish dinner 2-3 hours before bed.

Glycine-rich foods and dessert strategy: Bone broth with dinner, and bovine gelatin dessert (gelatin jello) as the dinner dessert. Gelatin provides glycine, which adult data supports for improved sleep onset, sleep quality, and increased growth hormone pulses.

Serve gelatin dessert with pineapple \u2014 pineapple is a natural source of serotonin that supports relaxation and sleep onset. This combination (gelatin + pineapple) makes a growth-supporting dessert that tastes good and serves the growth hormone axis.`,
      timing: "Dinner 2-3 hours before bed, bone broth with dinner, gelatin+pineapple dessert after dinner",
      citations: [
        { text: "Bannai M et al. Front Neurol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22293292" },
        { text: "Kawai N et al. Neuropsychopharmacology. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25533534" }
      ]
    },
    {
      title: "Fermented foods during the day (not bedtime)",
      what: "Yogurt, kefir, sauerkraut, mild kimchi support gut-brain axis \u2192 sleep quality.",
      why: `Microbiome-supportive fermented foods: Unsweetened yogurt, kefir, sauerkraut, mild kimchi \u2014 during the day, not at bedtime.

Gut-brain signaling and microbiota composition can influence sleep quality, insulin-like growth factor 1 levels, and growth, especially under stress or undernutrition. Microbiota composition can influence circulating insulin-like growth factor 1 and growth hormone sensitivity. A healthy gut microbiome supports the entire growth hormone cascade indirectly.

No yogurt before bed. If using dairy as a sleep lever, use milk only in small amounts. Yogurt\u2019s higher protein density and potential for reflux make it a meal food, not a bedtime food.`,
      timing: "Daytime meals only, never at bedtime",
      citations: [
        { text: "Dinan TG et al. J Psychiatr Res. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23474283" },
        { text: "Cryan JF et al. Science. 2019", url: "https://pubmed.ncbi.nlm.nih.gov/31757875" }
      ]
    },
    {
      title: "Pink noise (preferred over white noise)",
      what: "Stabilizes and enhances SWS specifically \u2014 matches brain\u2019s natural frequency patterns during deep sleep.",
      why: `Quiet, or stable pink noise (preferred over white noise). Pink noise can stabilize and enhance slow-wave activity specifically \u2014 it matches the brain\u2019s natural frequency patterns during deep sleep better than white noise.

Rain, ocean, heartbeat, and fan sounds also work. The key is continuous, stable sound that prevents micro-awakenings and protects growth hormone-rich slow-wave sleep windows.

Sound machines with specific tones (ocean, rain, heartbeat) reduce awakenings and maintain deeper stages.

Avoid intermittent noise.`,
      timing: "On at lights-out, continuous through night",
      citations: [
        { text: "Ngo HV et al. Neuron. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23583615" },
        { text: "Zhou J et al. J Theor Biol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22331902" }
      ]
    },
    {
      title: "Daytime physical activity",
      what: "Sprints, jumping, climbing, active outdoor play \u2192 increases adenosine \u2192 deeper SWS that night.",
      why: `Exercise during the day directly supports deeper sleep at night. Physical activity \u2014 especially sprinting, jumping, climbing, and active outdoor play \u2014 increases adenosine buildup (sleep pressure) and improves slow-wave sleep quality and duration.

A child who was physically active during the day will have deeper, more growth hormone-rich sleep than a sedentary child.

This is another reason the sprint-stretch-milk protocol serves growth: the exercise component directly improves the sleep component.

Don\u2019t exercise within 2-3 hours of bedtime.`,
      timing: "Afternoon/early evening, finish 2-3 hours before bed",
      citations: [
        { text: "Kredlow MA et al. J Behav Med. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25596964" },
        { text: "Lang C et al. Sleep Med Rev. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26541290" }
      ]
    },
    {
      title: "Rigid wind-down routine 30-60 min before bed",
      what: "Same sequence every night, no deviations. Ultra-consistent order builds sleep pressure.",
      why: `30-60 minutes before bed: a rigid, predictable sequence. This is not negotiable and should be the same every single night, with no deviations.

Ultra-consistent order builds sleep pressure and shortens sleep onset latency. Predictable routines improve sleep continuity, which boosts the likelihood and duration of the first slow-wave sleep block \u2014 and therefore the first and largest growth hormone pulse.`,
      timing: "Start 60 min before target lights-out, same sequence every night",
      citations: [
        { text: "Mindell JA et al. Sleep. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19480226" },
        { text: "Hale L et al. Sleep Health. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21170049" }
      ]
    },
    {
      title: "Emotional safety \u2014 cuddling, gentle voice, calm stories",
      what: "Reduces cortisol and sympathetic arousal, making deep sleep more accessible.",
      why: `Cuddling, gentle voice, and calm stories reduce cortisol and sympathetic arousal, making deep sleep more accessible.

Cortisol directly antagonizes growth hormone release \u2014 a child who goes to bed stressed, scared, or overstimulated has reduced slow-wave sleep and blunted growth hormone. A child who feels safe falls asleep faster and stays in deeper sleep longer.

Stress, anxiety, arguments, and overstimulation before bed are direct enemies of growth hormone.

For anxious children or those with bedtime fears, gentle co-sleeping or proximity strategies (start in child\u2019s room, fade gradually) and soothing scripts can reduce anxiety-driven awakenings and protect consolidated deep sleep without creating dependency.

Calming phrases, gentle stories, or recorded parent voice scripts played softly.

\u201CThird eye\u201D technique: Gentle forehead rubbing or light pressure between eyebrows during drowsiness \u2014 this technique is anecdotal but many parents report it helps children settle.`,
      timing: "Final 15-30 min before lights out, during books and settling",
      citations: [
        { text: "El-Sheikh M et al. Child Dev. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16719709" },
        { text: "Sadeh A et al. Sleep. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10194890" }
      ]
    },
    {
      title: "Sleep tracking",
      what: "Track patterns to identify what deepens sleep and what disrupts it.",
      why: `Track sleep patterns casually using apps, sleep diaries, or wearables to identify what deepens sleep and what disrupts it.

Look for patterns: does the magnesium bath help? Does a later bedtime worsen morning mood? Does pink noise versus silence make a difference?

Recognize that consumer wearables have limits in accurately staging children\u2019s sleep, but trends over time are useful.

The goal is to find your child\u2019s optimal configuration and protect it.`,
      timing: "Ongoing \u2014 review weekly to optimize",
      citations: [
        { text: "Sadeh A et al. Sleep. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21532951" },
        { text: "Meltzer LJ et al. Sleep Med Rev. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22425997" }
      ]
    },
    {
      title: "Glycine (bovine gelatin or bone broth)",
      what: "Glycine directly stimulates GH release and improves sleep quality. 3-5g before bed via gelatin dessert, bone broth, or collagen powder.",
      why: `Glycine is a conditionally essential amino acid that directly stimulates growth hormone release. In clinical studies, oral glycine administration increased serum GH levels significantly. Glycine also improves subjective sleep quality, reduces sleep onset latency, and enhances slow-wave sleep — the exact sleep stage where GH is released.

The mechanism is dual: glycine acts as an inhibitory neurotransmitter in the brainstem and spinal cord, promoting relaxation and lowering core body temperature (which facilitates sleep onset), while also directly stimulating anterior pituitary somatotrophs to release GH.

Bovine gelatin is approximately 30% glycine by weight, making it one of the richest dietary sources. A gelatin dessert (jello made with bovine gelatin) provides 3-5g of glycine per serving. Bone broth is another excellent source, with long-simmered broth providing significant glycine from collagen extraction.

This lever stacks powerfully with the bedtime routine: gelatin dessert after dinner (2-3 hours before bed) provides glycine that peaks in time for the first deep sleep block. Collagen powder in warm milk is another option that combines the tryptophan pathway with direct GH stimulation.`,
      timing: "3-5g glycine before bed via gelatin dessert after dinner, bone broth with dinner, or collagen powder in bedtime milk",
      citations: [
        { text: "Bannai M et al. Front Neurol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22293292" },
        { text: "Kawai N et al. Neuropsychopharmacology. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25533534" }
      ]
    }
  ];

  const neverList = [
    "Caffeine at any age (soda, energy drinks, tea, coffee, sports drinks, chocolate in excess \u2014 5-6 hr half-life, even morning caffeine affects sleep)",
    "Screens in bedroom (devices charge OUTSIDE bedroom)",
    "Food within 2-3 hrs of bed (except bedtime milk)",
    "Irregular sleep schedule (one late Friday affects GH through Wednesday)",
    "Melatonin supplements (reserved for specific disorders under pediatric guidance, not routine 'height hacks')",
    "Sleep gummies, herbal supplements, L-theanine, inositol, apigenin (fix environment and routine first)",
    "Warm bedroom (core cooling required for SWS)",
    "Synthetic bedding/sleepwear (polyester traps heat, off-gasses \u2014 use organic cotton or linen only)",
    "Sugar and artificial sweeteners before bed (insulin suppresses GH, artificial sweeteners may disrupt gut microbiome and linked to earlier puberty)",
    "Stress, arguments, overstimulation before bed (cortisol antagonizes GH)",
    "Ignoring sleep-disordered breathing (snoring, gasping, mouth breathing \u2014 #1 underdiagnosed cause of poor growth)",
    "Alcohol, vaping, marijuana ages 13+ (alcohol suppresses GH 75%, nicotine impairs disc health, marijuana disrupts sleep architecture)"
  ];

  const envItems = [
    {
      title: "Temperature: 65-68\u00B0F (18-20\u00B0C)",
      content: "Core body cooling required for deep sleep initiation. Body needs to drop core temperature to initiate and maintain slow-wave sleep. Warm rooms fight this process and reduce SWS quality.",
      citations: [
        { text: "Okamoto-Mizuno K et al. J Physiol Anthropol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22738673" },
        { text: "Kr\u00E4uchi K et al. Nature. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10188130" }
      ]
    },
    {
      title: "Darkness: Complete",
      content: "Blackout shades (not optional). Cover every LED, device light, hallway light. Even small amounts of light \u2014 hallway light, device LEDs, early dawn light \u2014 suppress melatonin. Red/amber nightlight only if necessary. No phone plugged in next to bed \u2014 remove all devices from sleep environment entirely. Melatonin production requires true darkness.",
      citations: [
        { text: "Gooley JJ et al. J Clin Endocrinol Metab. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21415172" },
        { text: "Zeitzer JM et al. J Physiol. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10801497" }
      ]
    },
    {
      title: "Light clock (optional)",
      content: "Hatch or similar timed light clock to prevent premature morning wakeups and preserve early-night deep sleep blocks.",
      citations: [
        { text: "Cajochen C et al. J Sleep Res. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15862604" },
        { text: "Zeitzer JM et al. J Physiol. 2000", url: "https://pubmed.ncbi.nlm.nih.gov/10801497" }
      ]
    },
    {
      title: "Noise: Pink noise or quiet",
      content: "Pink noise (preferred over white noise) can stabilize and enhance slow-wave activity specifically \u2014 it matches the brain\u2019s natural frequency patterns during deep sleep better than white noise. Rain, ocean, heartbeat, fan sounds also work. Key: continuous, stable sound that prevents micro-awakenings and protects GH-rich SWS windows. Sound machines with specific tones reduce awakenings and maintain deeper stages. Avoid intermittent noise.",
      citations: [
        { text: "Ngo HV et al. Neuron. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23583615" },
        { text: "Zhou J et al. J Theor Biol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22331902" }
      ]
    },
    {
      title: "Air quality: Clean and ventilated",
      content: "Pure, clean air. Ventilate the room. Avoid synthetic fragrances. Lavender aromatherapy (diffuser, pillow spray, or a few drops of essential oil in the bath) is a calming aid that may support deeper sleep \u2014 one of the few fragrances with evidence supporting relaxation.",
      citations: [
        { text: "Str\u00F8m-Tejsen P et al. Indoor Air. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26452168" },
        { text: "Mishra AK et al. Build Environ. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29331627" }
      ]
    },
    {
      title: "Bedding: Organic cotton or linen only",
      content: "Organic cotton or organic linen sheets and pajamas. Avoid synthetic fabrics that trap heat, off-gas chemicals, and disrupt temperature regulation. Sleep in 100% cotton or linen, not polyester or synthetic blends.",
      citations: [
        { text: "Shin M et al. J Physiol Anthropol Appl Human Sci. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/16198994" },
        { text: "Okamoto-Mizuno K et al. J Physiol Anthropol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22738673" }
      ]
    },
    {
      title: "Bed & Position",
      content: "Comfortable, supportive, firm mattress. Back sleeping on a thin pillow (or no pillow for young children) supports spinal alignment and disc rehydration overnight. Firm mattress supports spinal neutrality. This becomes increasingly important from age 19+ for postural height preservation.",
      citations: [
        { text: "Desouzart G et al. Work. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/27559717" },
        { text: "Nachemson AL et al. Spine. 1979", url: "https://pubmed.ncbi.nlm.nih.gov/7280837" }
      ]
    },
    {
      title: "Weighted blankets",
      content: "Age-appropriate, approximately 10% of body weight. Deep pressure provides calming input that improves sleep continuity and reduces restlessness. Appropriate for older toddlers through teens. Not for infants.",
      citations: [
        { text: "Ackerley R et al. J Phys Ther Sci. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25568592" },
        { text: "Ekholm B et al. J Clin Sleep Med. 2020", url: "https://pubmed.ncbi.nlm.nih.gov/33478255" }
      ]
    },
    {
      title: "Sleep orientation (traditional practice)",
      content: "Traditional practice suggests sleeping with the head facing North (magnetic alignment). This is not peer-reviewed for growth hormone specifically, but is widely practiced in traditional health systems and some parents report improved sleep quality.",
      citations: [
        { text: "Manjunath NK et al. Indian J Physiol Pharmacol. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12093601" },
        { text: "Brand S et al. J Adolesc Health. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20188934" }
      ]
    }
  ];

  const warnings = [
    {
      title: "Sleep-Disordered Breathing \u2014 #1 underdiagnosed cause of poor growth",
      content: `Look for and address snoring, gasping, mouth breathing, apneas, and restless sleep aggressively.

Sleep-disordered breathing reduces slow-wave sleep and is a well-known cause of impaired growth that often improves dramatically after treatment.

If your child snores regularly, breathes through their mouth at night, gasps or pauses breathing, or sleeps restlessly despite adequate sleep duration \u2014 talk to your pediatrician IMMEDIATELY.

This wrecks growth hormone and insulin-like growth factor 1 over years. Treatment often results in dramatic growth improvement.

This is one of the most underdiagnosed causes of poor growth in otherwise healthy children.`,
      citations: [
        { text: "Bonuck K et al. Pediatrics. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22566543" },
        { text: "Marcus CL et al. Pediatrics. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22566543" }
      ]
    },
    {
      title: "Caffeine \u2014 zero tolerance at any age",
      content: `Soda, energy drinks, tea, coffee, many \u201Csports\u201D drinks, and chocolate in excess.

Children are highly sensitive \u2014 even morning caffeine can reduce total sleep and shift sleep timing because of the 5-6 hour half-life and individual variability.

Caffeine is specifically harmful for growing taller because of both sleep disruption and possible direct growth hormone interference.

Zero tolerance.`,
      citations: [
        { text: "Ludden AB et al. J Caffeine Res. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25643981" },
        { text: "Clark I et al. Sleep Med Rev. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28438927" }
      ]
    },
    {
      title: "Screens in bedroom and 1-2 hours before bed",
      content: `Blue-enriched light from tablets and phones suppresses melatonin by well over 50% and can shift dim-light melatonin onset by hours.

Devices charge outside the bedroom. No phone plugged in next to the bed.

Being on your phone in bed has been linked to disrupted circadian rhythm and numerous health concerns.

This is the single most common sleep saboteur in modern childhood.`,
      citations: [
        { text: "Hale L et al. Sleep Med Rev. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/26568847" },
        { text: "LeBourgeois MK et al. Physiol Rep. 2018", url: "https://pubmed.ncbi.nlm.nih.gov/29389975" }
      ]
    },
    {
      title: "Eating within 2-3 hours of bedtime",
      content: `Particularly large, high-glycemic, or acidic meals. Late insulin surges and reflux risk both impair deep sleep.

Elevated insulin around sleep onset markedly reduces nocturnal growth hormone output.

This includes snacks, juice, and anything that spikes blood sugar.

Exception: small bedtime milk.`,
      citations: [
        { text: "Ho KY et al. J Clin Endocrinol Metab. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3127426" },
        { text: "Crispim CA et al. Int J Obes. 2011", url: "https://pubmed.ncbi.nlm.nih.gov/21532851" }
      ]
    },
    {
      title: "Irregular bed and wake times",
      content: `Destabilizes circadian phase and evening melatonin, leading to late slow-wave sleep, scattered growth hormone pulses, and chronic internal jet lag.

One late Friday night can affect growth hormone timing through Wednesday.

\u201CSocial jet lag\u201D \u2014 staying up late and sleeping in on weekends \u2014 takes several days to re-entrain.`,
      citations: [
        { text: "Wittmann M et al. Chronobiol Int. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16687322" },
        { text: "Taylor BJ et al. Sleep. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28605831" }
      ]
    },
    {
      title: "Sugar and artificial sweeteners before bed",
      content: `Sugar spikes insulin which suppresses growth hormone.

Artificial sweeteners may disrupt the gut microbiome and have been linked to earlier puberty.`,
      citations: [
        { text: "St-Onge MP et al. J Clin Sleep Med. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26819147" },
        { text: "Peuhkuri K et al. J Sleep Res. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22392497" }
      ]
    },
    {
      title: "Stress, arguments, and overstimulation before bed",
      content: `Cortisol directly antagonizes growth hormone release. High cortisol and sympathetic tone fragment sleep and blunt growth hormone.

Poor sleep from stress leads to reduced growth hormone pulses.

The wind-down routine exists to prevent this.`,
      citations: [
        { text: "El-Sheikh M et al. Child Dev. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16719709" },
        { text: "Sadeh A et al. Sleep. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10194890" }
      ]
    },
    {
      title: "Warm bedrooms",
      content: `Core body cooling is required for deep sleep initiation.

A warm room reduces slow-wave sleep quality.`,
      citations: [
        { text: "Okamoto-Mizuno K et al. J Physiol Anthropol. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22738673" },
        { text: "Kr\u00E4uchi K et al. Nature. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10188130" }
      ]
    },
    {
      title: "Synthetic bedding and sleepwear",
      content: `Polyester and synthetic fabrics trap heat and may off-gas chemicals.

Use organic cotton or organic linen for sheets and pajamas.`,
      citations: [
        { text: "Shin M et al. J Physiol Anthropol Appl Human Sci. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/16198994" },
        { text: "Chung H et al. Ind Health. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20412168" }
      ]
    },
    {
      title: "Supplements instead of routine",
      content: `No melatonin pills, no sleep gummies, no herbal supplements. No L-theanine, inositol, or apigenin supplements.

These may have adult data but pediatric use should be cautious and medically supervised.

Melatonin supplements acutely increase growth hormone in adults (one study showed ~157% increase with 3-5 mg), but pediatric long-term data for height are limited.

Best reserved for specific circadian disorders under pediatric guidance, not routine \u201Cheight hacks.\u201D

Fix the environment and routine first. Everything should come from food, behavior, and topical magnesium applications. Food and behavioral levers should carry the load.`,
      citations: [
        { text: "Kennaway DJ et al. J Paediatr Child Health. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25643981" },
        { text: "Brzezinski A et al. Sleep Med Rev. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15713707" }
      ]
    },
    {
      title: "Substances (ages 13+) \u2014 zero tolerance",
      content: `Alcohol: suppresses growth hormone up to 75%, fragments sleep architecture, and eliminates deep slow-wave sleep.

Vaping/nicotine: impairs disc health and sleep quality.

Marijuana: disrupts sleep architecture and growth hormone release.

Zero tolerance.`,
      citations: [
        { text: "R\u00F6jdmark S et al. Metabolism. 2001", url: "https://pubmed.ncbi.nlm.nih.gov/11168459" },
        { text: "Colrain IM et al. Handb Clin Neurol. 2014", url: "https://pubmed.ncbi.nlm.nih.gov/24911615" }
      ]
    }
  ];

  const tabs = [
    { id: 'science', label: 'Science' },
    { id: 'bedtime', label: 'Bedtime' },
    { id: 'deep', label: 'Deep Dive' },
  ];

  const AgeTable = ({ data, columns, title }: { data: Record<string, unknown>[]; columns: { header: string; key: string }[]; title: string }) => (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.title, marginBottom: 8 }}>{title}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: F }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {columns.map((col, i) => (
                <th key={i} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, fontWeight: 800, color: C.title }}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{
                background: isActiveRow(row.range as number[]) ? '#ecfdf5' : C.card,
                fontWeight: isActiveRow(row.range as number[]) ? 800 : 400
              }}>
                {columns.map((col, j) => (
                  <td key={j} style={{
                    padding: '10px 12px',
                    borderBottom: `1px solid ${C.border}`,
                    color: isActiveRow(row.range as number[]) ? C.green : C.body
                  }}>
                    {row[col.key] as string}
                    {isActiveRow(row.range as number[]) && j === 0 && <span style={{ marginLeft: 8, fontSize: 11, fontFamily: F, background: C.green, color: 'white', padding: '2px 6px', borderRadius: 4 }}>YOUR CHILD</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Citation block helper
  const CitationBlock = ({ citations }: { citations: { text: string; url: string }[] }) => (
    <div style={{ marginTop: 12, background: C.bg, borderRadius: 14, padding: 12, fontFamily: F }}>
      <p style={{ fontSize: 10, color: C.light, fontWeight: 800, marginBottom: 4 }}>Peer-reviewed:</p>
      {citations.map((c, ci) => (
        <a key={ci} href={c.url} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', fontSize: 10, color: C.green, textDecoration: 'underline', paddingLeft: 8, borderLeft: `2px solid ${C.sigBorder}`, marginBottom: 4 }}>
          {c.text}
        </a>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Nav currentChild={child} />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Back Link */}
        <Link href="/science" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontSize: 14, color: C.light, textDecoration: 'none', marginBottom: 24 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Page Title */}
        <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: C.title, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Sleep & Circadian
        </h1>
        <p style={{ fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 24 }}>
          Sleep is the #1 lever a parent has to grow a taller, stronger child. Each night of deep sleep is a growth rep for the GH axis. Your job: maximize sleep reps, every night, for years. <em>Growth only happens lying down.</em>
        </p>

        {/* Key Stats — signature card */}
        <div style={{ background: C.card, border: `2px solid ${C.sigBorder}`, borderRadius: 20, padding: '14px 18px', marginBottom: 44, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: C.green }}>60-80%</div>
            <div style={{ fontFamily: F, fontSize: 14, color: C.light }}>GH in first 3 hours</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: C.green }}>25-40%</div>
            <div style={{ fontFamily: F, fontSize: 14, color: C.light }}>children&apos;s SWS vs 15-25% adults</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: C.green }}>10-1 AM</div>
            <div style={{ fontFamily: F, fontSize: 14, color: C.light }}>peak GH window</div>
          </div>
        </div>

        {/* Age Selector + Targets */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: F, fontSize: 14, color: C.light }}>Child&apos;s age:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="range"
                min="0"
                max="25"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <span style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.green, background: '#ecfdf5', padding: '6px 14px', borderRadius: 20, minWidth: 60, textAlign: 'center' }}>
                {childAge < 1 ? `${Math.round(childAge * 12)} mo` : `${childAge} yr`}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {[
              { label: 'Sleep', value: currentSleep.target },
              { label: 'Bedtime', value: currentBedtime.bedtime },
              { label: 'Milk', value: currentMilk.amount },
              { label: 'Tart cherry', value: currentCherry.dose },
              { label: 'Mg bath', value: getMagnesiumDose() },
            ].map((item, i) => (
              <span key={i} style={{ fontFamily: F, fontSize: 13, color: C.body, background: C.bg, padding: '6px 12px', borderRadius: 20 }}>
                {item.label}: <strong style={{ color: C.title }}>{item.value}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Tab Bar — 3 tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === tab.id ? `2px solid ${C.green}` : '2px solid transparent',
                fontSize: 13,
                fontFamily: F,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? C.green : C.light,
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

          {/* ═══ TAB: BEDTIME ═══ */}
          {activeTab === 'bedtime' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: C.title, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Bedtime</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: C.light, marginBottom: 28 }}>Every lever, the nightly routine, and the environment — in one place.</p>

              {/* ── Section: Sleep Levers ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.title, marginBottom: 4 }}>Sleep Levers</div>
              <p style={{ fontFamily: F, fontSize: 13, color: C.light, marginBottom: 16 }}>Ranked by impact on slow-wave sleep. Do #1 first.</p>

              {levers.map((lever, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setExpandedLever(expandedLever === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14,
                      padding: '14px 18px', fontFamily: F, textAlign: 'left',
                      background: expandedLever === i ? '#ecfdf5' : C.bg,
                      border: expandedLever === i ? `1px solid ${C.sigBorder}` : `1px solid ${C.border}`,
                      borderRadius: expandedLever === i ? '14px 14px 0 0' : 14,
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, background: C.green, color: 'white', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontFamily: F, fontWeight: 800, flexShrink: 0
                    }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, color: C.title, marginBottom: 4 }}>{lever.title}</div>
                      <div style={{ fontSize: 13, color: C.body, lineHeight: 1.75 }}>{lever.what}</div>
                    </div>
                    <span style={{ color: C.light, fontSize: 18 }}>{expandedLever === i ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {expandedLever === i && (
                    <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${C.sigBorder}`, borderTop: 'none' }}>
                      <div style={{ fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75, marginBottom: 12, whiteSpace: 'pre-line' }}>{lever.why}</div>
                      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: C.green, background: C.card, padding: '8px 12px', borderRadius: 10, border: `1px solid ${C.sigBorder}` }}>{lever.timing}</div>
                      {lever.citations && <CitationBlock citations={lever.citations} />}
                    </div>
                  )}
                </div>
              ))}

              {/* ── Section: Wind-Down Routine ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.title, marginTop: 44, marginBottom: 4 }}>The Wind-Down Sequence</div>
              <p style={{ fontFamily: F, fontSize: 13, color: C.light, marginBottom: 16 }}>A complete nightly routine — personalized for age {childAge}.</p>

              {[
                { time: '60 min before bed', items: [
                  `Warm bath with Epsom salts/magnesium flakes (${getMagnesiumDose()} for age ${childAge})`,
                  '10-20 min soak, warm not hot',
                  'Add lavender or chamomile essential oil if tolerated',
                  'Bath \u2192 cooling mechanism: raises surface temp, subsequent cooling triggers core temp drop that initiates deep sleep',
                ] },
                { time: 'After bath', items: [
                  'Pajamas (organic cotton or linen only \u2014 avoid synthetic fabrics that trap heat)',
                  'All blue light OFF \u2014 dim warm lights only',
                  'Devices charge outside bedroom'
                ] },
                { time: '60-90 min before lights out', items: [
                  `Bedtime milk (${currentMilk.amount}, warm, plain, unsweetened — no added sugar)`
                ] },
                { time: '30-45 min before lights out (only if sleep onset is a problem)', items: [
                  `Tart cherry juice (${currentCherry.dose} diluted ${currentCherry.dilution})`,
                  '100% tart cherry only, no blends, no added sugar',
                  `${currentCherry.frequency}`,
                  'If child already sleeps well \u2014 skip this entirely'
                ] },
                { time: '15-30 min before lights out', items: [
                  'Magnesium lotion on feet (magnesium glycinate preferred)',
                  'Thin layer on soles, gentle 1-2 min massage',
                  '2-3 short physical books (not screens)',
                  'Calming phrases, gentle stories, or recorded parent voice scripts',
                  'Cuddling, gentle voice (reduces cortisol)'
                ] },
                { time: 'At lights out', items: [
                  'Gentle forehead rubbing or light pressure between eyebrows during drowsiness',
                  'Complete darkness (blackout shades, cover every light source)',
                  'Pink noise on (or quiet)'
                ] }
              ].map((block, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '14px 18px', marginBottom: 12 }}>
                  <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.green, marginBottom: 10 }}>{block.time}</div>
                  {block.items.map((item, j) => (
                    <div key={j} style={{ fontFamily: F, fontSize: 14, color: C.body, padding: '4px 0', lineHeight: 1.75 }}>&bull; {item}</div>
                  ))}
                </div>
              ))}

              <div style={{ background: C.card, borderRadius: 14, padding: '14px 18px', marginTop: 12, border: `2px solid ${C.sigBorder}` }}>
                <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.title, marginBottom: 8 }}>Emotional Safety</div>
                <div style={{ fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75 }}>
                  Cortisol directly antagonizes GH. A child who goes to bed stressed, scared, or overstimulated has reduced SWS and blunted GH. A child who feels safe falls asleep faster and stays in deeper sleep longer.
                  <br /><br />
                  For anxious children or those with bedtime fears: gentle co-sleeping or proximity strategies (start in child&apos;s room, fade gradually) and soothing scripts can reduce anxiety-driven awakenings and protect consolidated deep sleep without creating dependency.
                </div>
              </div>

              {/* ── Section: Environment ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.title, marginTop: 44, marginBottom: 4 }}>Sleep Environment</div>
              <p style={{ fontFamily: F, fontSize: 13, color: C.light, marginBottom: 16 }}>The room itself matters. Each item expands with the science.</p>

              {envItems.map((item, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setExpandedEnv(expandedEnv === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 18px', fontFamily: F, textAlign: 'left',
                      background: expandedEnv === i ? '#ecfdf5' : C.bg,
                      border: expandedEnv === i ? `1px solid ${C.sigBorder}` : `1px solid ${C.border}`,
                      borderRadius: expandedEnv === i ? '14px 14px 0 0' : 14,
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: 14, color: C.title }}>{item.title}</span>
                    <span style={{ color: C.light }}>{expandedEnv === i ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {expandedEnv === i && (
                    <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${C.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75 }}>
                      {item.content}
                      {item.citations && <CitationBlock citations={item.citations} />}
                    </div>
                  )}
                </div>
              ))}

              {/* ── Section: Age Tables ── */}
              <div style={{ marginTop: 44, padding: '14px 18px', background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.title, marginBottom: 16 }}>Age-Based Reference Tables</div>

                <AgeTable
                  title="Sleep Duration Targets"
                  data={sleepTargets as unknown as Record<string, unknown>[]}
                  columns={[
                    { header: 'Age', key: 'age' },
                    { header: 'Minimum', key: 'min' },
                    { header: 'Target', key: 'target' },
                    { header: 'Notes', key: 'notes' }
                  ]}
                />
                <AgeTable
                  title="Bedtime Targets"
                  data={bedtimeTargets as unknown as Record<string, unknown>[]}
                  columns={[
                    { header: 'Age', key: 'age' },
                    { header: 'Bedtime', key: 'bedtime' },
                    { header: 'Notes', key: 'notes' }
                  ]}
                />
                <AgeTable
                  title="Bedtime Milk Dosing"
                  data={milkDosing as unknown as Record<string, unknown>[]}
                  columns={[
                    { header: 'Age', key: 'age' },
                    { header: 'Amount', key: 'amount' },
                    { header: 'Notes', key: 'notes' }
                  ]}
                />
                <AgeTable
                  title="Tart Cherry Juice Dosing"
                  data={tartCherryDosing as unknown as Record<string, unknown>[]}
                  columns={[
                    { header: 'Age', key: 'age' },
                    { header: 'Dose', key: 'dose' },
                    { header: 'Dilution', key: 'dilution' },
                    { header: 'Frequency', key: 'frequency' }
                  ]}
                />
              </div>

              {/* ── Section: Never ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.red, marginTop: 44, marginBottom: 4 }}>What to Avoid</div>
              <p style={{ fontFamily: F, fontSize: 13, color: C.light, marginBottom: 16 }}>These directly sabotage slow-wave sleep and GH.</p>
              {neverList.map((item, i) => (
                <div key={i} style={{ fontFamily: F, fontSize: 13, color: C.body, padding: '6px 0', lineHeight: 1.75 }}>
                  <span style={{ color: C.red, fontWeight: 800 }}>\u2715</span> {item}
                </div>
              ))}
            </div>
          )}

          {/* ═══ TAB: DEEP DIVE ═══ */}
          {activeTab === 'deep' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: C.title, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Deep Dive</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: C.light, marginBottom: 28 }}>Critical issues to fix and the complete example routine.</p>

              {/* ── Warnings ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.red, marginBottom: 4 }}>Critical Issues That Wreck GH</div>
              <p style={{ fontFamily: F, fontSize: 13, color: C.light, marginBottom: 16 }}>Address these immediately — they override everything else.</p>

              {warnings.map((warn, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setExpandedWarn(expandedWarn === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 18px', fontFamily: F, textAlign: 'left',
                      background: expandedWarn === i ? C.card : C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: expandedWarn === i ? '14px 14px 0 0' : 14,
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: 14, color: C.red }}>{warn.title}</span>
                    <span style={{ color: C.light }}>{expandedWarn === i ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {expandedWarn === i && (
                    <div style={{ padding: '14px 18px', background: C.card, borderRadius: '0 0 14px 14px', border: `1px solid ${C.border}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                      {warn.content}
                      {warn.citations && <CitationBlock citations={warn.citations} />}
                    </div>
                  )}
                </div>
              ))}

              {/* ── Example Sequence ── */}
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: C.title, marginTop: 44, marginBottom: 12 }}>Example Sequence Summary</div>
              <div style={{ background: C.card, borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.border}` }}>
                <ol style={{ fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75, margin: 0, paddingLeft: 20 }}>
                  <li>Magnesium bath with Epsom salts and lavender (10-20 minutes, 60 minutes before bed)</li>
                  <li>Pajamas (organic cotton or linen)</li>
                  <li>Dim warm lights only (all blue-rich light already off)</li>
                  <li>Milk (small amount, 60-90 minutes before lights out)</li>
                  <li>Tart cherry juice if using (30-45 minutes before lights out)</li>
                  <li>Magnesium lotion on feet (1-2 minute gentle massage)</li>
                  <li>2-3 short books or calm conversation (physical books, not screens)</li>
                  <li>Calming phrases, gentle stories, or recorded parent voice scripts</li>
                  <li>Gentle forehead rubbing or light pressure between eyebrows during drowsiness</li>
                  <li>Lights out \u2014 complete darkness</li>
                </ol>
              </div>
            </div>
          )}

          {/* SCIENCE TAB */}
          {activeTab === 'science' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: C.title, letterSpacing: '-0.02em', margin: '0 0 24px' }}>The Science</h2>

              <div style={{ fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75 }}>
                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title, marginTop: 0 }}>The Core Mechanism</h3>
                <p style={{ marginBottom: 24 }}>
                  Growth hormone is released in large pulses during slow-wave (deep, N3) sleep, with 60-80% of daily growth hormone secretion occurring in the first major deep-sleep episode within roughly 3 hours after sleep onset. This pulse is tightly time-locked to slow-wave sleep itself: when slow waves appear, growth hormone rises with a lag of about 5-15 minutes. When slow-wave sleep is experimentally suppressed, growth hormone secretion is delayed and reduced. When slow-wave sleep is enhanced, growth hormone rises.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Sleep-dependent, not clock-dependent</h3>
                <p style={{ marginBottom: 24 }}>
                  This is sleep-dependent, not clock-dependent. If you shift the entire sleep period by 12 hours, the growth hormone surge shifts with it. The trigger is slow-wave sleep, not the time on the clock. But in real life, sleep is anchored to night \u2014 and anchoring it consistently is what makes the system reliable.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Children have more SWS than adults</h3>
                <p style={{ marginBottom: 24 }}>
                  Children naturally have significantly more slow-wave sleep than adults \u2014 25-40% of total sleep time versus 15-25% in adults, peaking in early childhood. This is why childhood sleep is extraordinarily valuable for growth. Every hour of a child&apos;s sleep contains more growth hormone-releasing deep sleep than an adult&apos;s. And when sleep is restricted, deep stages are stripped first \u2014 meaning the growth hormone window is the first casualty of lost sleep.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>The growth set concept</h3>
                <p style={{ marginBottom: 24 }}>
                  Think of each complete 90-minute sleep cycle as one &quot;growth set.&quot; You want as many complete, high-quality sets as possible before early morning. A child sleeping 12 hours gets 8 complete sets. A child sleeping 8 hours gets only 5. Those 3 missing sets contain deep-sleep stages where growth hormone is released. You&apos;re not just losing sleep \u2014 you&apos;re losing growth reps. Population studies confirm this: shorter and more irregular nighttime sleep is associated with shorter stature. Longer and more regular nighttime sleep is associated with taller stature and clearer growth spurts.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Deep sleep also optimizes testosterone</h3>
                <p style={{ marginBottom: 24 }}>
                  Deep sleep also optimizes testosterone production, which becomes critical during puberty. Testosterone supports muscle development, bone density, and interacts with the growth hormone axis to amplify growth. Insufficient sleep reduces both growth hormone and testosterone output.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Melatonin as &quot;nighttime repair&quot; signal</h3>
                <p style={{ marginBottom: 24 }}>
                  Melatonin, triggered by darkness and a stable circadian rhythm, rises in the evening and acts as a &quot;nighttime repair&quot; signal that facilitates deep sleep and growth hormone release. Melatonin also inhibits aromatase \u2014 the enzyme that converts testosterone to estrogen \u2014 providing an additional mechanism for preserving the hormonal environment that supports growth. In children, higher nighttime melatonin is positively correlated with robust nocturnal growth hormone and healthy growth patterns. For children on an early schedule, being asleep by around 8:00-8:30 PM means their first deep-sleep block \u2014 and thus the largest growth hormone surge \u2014 falls in the roughly 10 PM-1 AM window, provided sleep is continuous and deep.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Clock genes (BMAL1, PER2)</h3>
                <p style={{ marginBottom: 24 }}>
                  Circadian misalignment and sleep loss alter expression of clock genes (BMAL1, PER2) that regulate growth hormone synthesis and downstream signaling. Chronic circadian disruption doesn&apos;t just reduce tonight&apos;s growth hormone \u2014 it changes the gene expression patterns that control growth hormone production over time. Irregular schedules cause shifting melatonin and fragmented slow-wave sleep, disrupting the entire growth hormone-insulin-like growth factor 1 cascade.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Blue light and DLMO</h3>
                <p style={{ marginBottom: 24 }}>
                  Blue-enriched light in the 1-2 hours before bedtime suppresses melatonin by well over 50% and shifts the dim-light melatonin onset later \u2014 sometimes by hours. This doesn&apos;t just make it harder to fall asleep. It delays sleep, compresses slow-wave sleep, and blunts or scatters the growth hormone surge. In preschoolers, bedtime and evening light together explain about 50% of melatonin timing variance.
                </p>

                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: C.title }}>Growth only happens lying down</h3>
                <p style={{ marginBottom: 24 }}>
                  Growth only happens when the body is lying down. Linear bone growth requires the body to be horizontal \u2014 gravity-free spinal position, decompressed growth plates, and the physiological state of deep sleep combine to create the conditions for growth. This is not metaphorical. The physical position matters. A child who is sleeping is growing. A child who is not sleeping is not growing.
                </p>

                <div style={{ background: C.card, padding: '14px 18px', borderRadius: 20, marginBottom: 20, border: `2px solid ${C.sigBorder}` }}>
                  <strong style={{ fontFamily: F, fontWeight: 800, color: C.green }}>Pathway Summary:</strong>
                  <p style={{ margin: '8px 0 0', fontFamily: F, fontSize: 14, color: C.body, lineHeight: 1.75 }}>
                    Growth hormone released in pulses during slow-wave (N3) sleep \u2192 60-80% of daily secretion in first 3 hours \u2192 GH rises 5-15 minutes after slow waves appear \u2192 Sleep-dependent, not clock-dependent \u2192 Children have 25-40% SWS vs adults 15-25% \u2192 Childhood sleep is extraordinarily valuable \u2192 Sleep restriction strips deep stages first \u2192 Each 90-minute cycle is one &quot;growth set&quot; \u2192 More sets = more growth reps \u2192 Short sleep = shorter stature \u2192 Deep sleep also optimizes testosterone \u2192 Melatonin acts as &quot;nighttime repair&quot; signal and inhibits aromatase \u2192 Clock genes (BMAL1, PER2) regulate GH synthesis \u2192 Circadian disruption changes GH gene expression \u2192 Blue light suppresses melatonin 50%+ and shifts DLMO by hours \u2192 Growth only happens lying down
                  </p>
                </div>

                <div style={{ background: C.bg, padding: '14px 18px', borderRadius: 14, fontSize: 13, color: C.light, fontFamily: F, border: `1px solid ${C.border}` }}>
                  <strong style={{ color: C.title }}>Citations:</strong> Van Cauter E. Sleep. 2000; Takahashi Y. J Clin Invest. 1968; Wetterberg L. J Pineal Res. 2006; Sassin JF. Science. 1969; LeBourgeois MK. Mind Brain Educ. 2017; Ohlsson C. Front Endocrinol. 2023
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
