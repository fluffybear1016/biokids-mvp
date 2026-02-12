'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';
import { SleepHomeTab } from '@/components/HomeTabs';

const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Emma',
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

export default function SleepCircadianWindow() {
  const [child, setChild] = useState<Child>(mockChild);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedLever, setExpandedLever] = useState<number | null>(null);
  const [expandedEnv, setExpandedEnv] = useState<number | null>(null);
  const [expandedWarn, setExpandedWarn] = useState<number | null>(null);
  const [childAge, setChildAge] = useState(8);

  useEffect(() => {
    const childData = localStorage.getItem('child_data');
    if (childData) {
      try {
        const parsed = JSON.parse(childData);
        if (parsed.birthDate) {
          const age = calculateAgeInYears(parsed.birthDate);
          setChildAge(age);
          setChild({
            ...mockChild,
            name: parsed.name || 'Emma',
            birth_date: parsed.birthDate,
            gender: parsed.sex || 'female',
          });
        }
      } catch (e) {
        // Use defaults
      }
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
      timing: `Asleep by ${currentBedtime.bedtime.split('-')[0]}, wake naturally. Aim for TOP of range.`
    },
    {
      title: `Fixed bedtime ${currentBedtime.bedtime} \u2014 every day including weekends`,
      what: `Anchors circadian clock, stabilizes melatonin rise and SWS timing = stable GH pulse timing. ${currentBedtime.notes}.`,
      why: `Fixed bedtime and wake time (\u00B130 minutes) every single day, including weekends. This anchors the circadian clock, stabilizes evening melatonin rise and slow-wave sleep timing, which stabilizes growth hormone pulse timing.

\u201CSocial jet lag\u201D \u2014 staying up late and sleeping in on weekends \u2014 destabilizes circadian phase and evening melatonin, leading to late slow-wave sleep, scattered growth hormone pulses, and chronic internal jet lag. Shifting bedtime by multiple hours on weekends can take several days to re-entrain, meaning the growth hormone-rich early-night window is mistimed or underused for much of the week.

One late Friday night can affect growth hormone timing through Wednesday.

For children on an early schedule, being asleep by around 8:00-8:30 PM means their first deep-sleep block \u2014 and thus the largest growth hormone surge \u2014 falls in the roughly 10 PM-1 AM window, provided sleep is continuous and deep.`,
      timing: "Same time \u00B130 min, 7 days/week. No exceptions."
    },
    {
      title: "Complete darkness \u2014 blackout shades non-optional",
      what: "Even small amounts of light \u2014 hallway light, device LEDs, early dawn light \u2014 suppress melatonin. Blackout shades are not optional.",
      why: `Melatonin, triggered by darkness and a stable circadian rhythm, rises in the evening and acts as a \u201Cnighttime repair\u201D signal that facilitates deep sleep and growth hormone release. Melatonin also inhibits aromatase \u2014 the enzyme that converts testosterone to estrogen \u2014 providing an additional mechanism for preserving the hormonal environment that supports growth.

In children, higher nighttime melatonin is positively correlated with robust nocturnal growth hormone and healthy growth patterns.

Cover every light source in the room. If a nightlight is necessary, use only red or amber light. No phone plugged in next to the bed \u2014 remove all devices from the sleep environment entirely.

Consider a Hatch or similar timed light clock to prevent premature morning wakeups and preserve early-night deep sleep blocks.

Melatonin production requires true darkness.`,
      timing: "From lights-out until wake. Complete darkness all night."
    },
    {
      title: "No screens 1-2 hours before bed",
      what: "Blue-enriched light from tablets and phones suppresses melatonin by well over 50% and shifts the dim-light melatonin onset later \u2014 sometimes by hours.",
      why: `Blue-enriched light in the 1-2 hours before bedtime suppresses melatonin by well over 50% and shifts the dim-light melatonin onset later \u2014 sometimes by hours. This doesn\u2019t just make it harder to fall asleep. It delays sleep, compresses slow-wave sleep, and blunts or scatters the growth hormone surge.

In preschoolers, bedtime and evening light together explain about 50% of melatonin timing variance.

Use warm, dim lights only. Devices charge outside the bedroom. Screens should never be in the bedroom at any time.

Reading a physical book is one of the most effective wind-down activities \u2014 it replaces screen stimulation with calm cognitive engagement that naturally builds sleep pressure.`,
      timing: "Screens off 1-2 hours before bed"
    },
    {
      title: "Cool room 65-68\u00B0F (18-20\u00B0C)",
      what: "Core body cooling supports deeper sleep \u2014 the body needs to drop core temperature to initiate and maintain slow-wave sleep.",
      why: `Core body cooling is required for deep sleep initiation. The body needs to drop core temperature to initiate and maintain slow-wave sleep. Warm rooms fight this process and reduce slow-wave sleep quality.

This is why warm bath before bed works \u2014 the subsequent cooling triggers the core temp drop that initiates deep sleep.`,
      timing: "Set thermostat before bedtime routine starts"
    },
    {
      title: "Morning sunlight 10-30 min within 30 min of waking",
      what: "The strongest circadian zeitgeber (time-setter) that advances and stabilizes circadian phase, helping melatonin rise on time that evening.",
      why: `10-30 minutes of outdoor light within 30 minutes of waking is the strongest circadian zeitgeber (time-setter) that advances and stabilizes circadian phase, helping melatonin rise on time that evening.

This is free and powerful. Overcast days still work. Sunglasses off.

This morning light is what makes tonight\u2019s melatonin rise reliably.`,
      timing: "Within 30 min of waking, 10-30 min outside. Sunglasses off."
    },
    {
      title: "Evening sunset watching",
      what: "Second zeitgeber that complements morning light.",
      why: "Watch the sunset when possible. Evening light transition reinforces the circadian rhythm and signals the system to begin melatonin production. This is a second zeitgeber that complements morning light.",
      timing: "Watch sunset when possible"
    },
    {
      title: `Warm bath with magnesium \u2014 ${getMagnesiumDose()} Epsom salts, 60 min before bed`,
      what: "Raises surface body temperature, and the subsequent cooling afterward facilitates the core temperature drop that initiates deep sleep.",
      why: `A warm bath 1-2 hours before bed isn\u2019t just relaxing. It raises surface body temperature, and the subsequent cooling afterward facilitates the core temperature drop that initiates deep sleep. The bath \u2192 cooling sequence is a physiological trigger for sleep onset, not just a behavioral one.

Add Epsom salts or magnesium flakes (${getMagnesiumDose()} for age ${childAge}) for transdermal magnesium delivery. Soak 10-20 minutes in warm (not hot) water.

Add lavender or chamomile essential oil if well tolerated. Lavender aromatherapy (diffuser, pillow spray, or a few drops of essential oil in the bath) is a calming aid that may support deeper sleep \u2014 one of the few fragrances with evidence supporting relaxation.

This makes the bath a multi-modal relaxation tool \u2014 warmth + magnesium + aromatherapy + subsequent cooling.`,
      timing: "30-60 min before bed, 10-20 min soak"
    },
    {
      title: "Magnesium lotion on feet \u2014 during bedtime routine",
      what: "Modulates GABAergic tone and reduces neuromuscular tension \u2192 easier SWS entry.",
      why: `Magnesium supports relaxation and sleep quality by modulating GABAergic tone and reducing neuromuscular tension. Adult data connects magnesium with more efficient slow-wave sleep, so the growth hormone benefit is indirect but plausible.

Michael Jordan reportedly had salt in his shoes \u2014 the science behind this is the calming effect of magnesium absorption through the feet, which supports sleep quality.

Use child-formulated magnesium lotion or spray (magnesium glycinate preferred). Apply thin layer to soles of feet, massage gently for 1-2 minutes during bedtime routine.

Functions as both a calming sensory ritual and a route for low-dose transdermal magnesium delivery. Combine with the bath or use on non-bath nights.`,
      timing: "After bath, during books/wind-down, 1-2 min massage"
    },
    {
      title: `Bedtime milk \u2014 ${currentMilk.amount} warm, plain, 60-90 min before lights out`,
      what: `\u03B1-lactalbumin has the highest tryptophan content among all food proteins. Tryptophan \u2192 serotonin \u2192 melatonin \u2192 deeper SWS. ${currentMilk.notes}`,
      why: `Milk provides tryptophan (via \u03B1-lactalbumin) and calcium, supporting the serotonin \u2192 melatonin production pathway and gentle satiety without a heavy insulin spike.

The protein in milk is rich in \u03B1-lactalbumin, which has one of the highest tryptophan contents among all food proteins. This is why milk specifically \u2014 not just any protein \u2014 supports the serotonin \u2192 melatonin pathway for sleep. Milk is the optimal bedtime protein precisely because of \u03B1-lactalbumin\u2019s tryptophan density.

Calcium is directly needed for melatonin synthesis. Uses the serotonin \u2192 melatonin axis to support sleep onset while stabilizing overnight blood sugar, especially if the child otherwise wakes hungry.

Warm if tolerated \u2014 warmth adds a calming sensory component. Plain, unsweetened only.

Can add \u00BD-1 teaspoon raw honey for blood sugar stabilization and taste.

Casein curds digest 3-7 hours releasing tryptophan. Amplifies overnight GH 20-50%. Dutch, Dinka, Serbians all do this.`,
      timing: "60-90 min before lights out. Warm. Plain. Never chocolate or sweetened."
    },
    {
      title: "Honey before bed \u2014 \u00BD-1 tsp raw honey",
      what: "Stabilizes overnight blood sugar and improves sleep quality.",
      why: `A small amount of raw honey (\u00BD-1 teaspoon) can stabilize overnight blood sugar and improve sleep quality. Studies in cough and respiratory contexts show honey before bed improves sleep continuity.

This prevents the blood sugar dip that can cause middle-of-night waking. Use sparingly \u2014 this is not a large dose. Can be added to warm milk.`,
      timing: "Add to bedtime milk or take separately"
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

The risk of combining: Too much sugar too close to bed can fragment sleep later in the night and blunt growth hormone pulses after midnight. Dose and spacing matter more than the foods themselves.

Watch for: night waking, vivid dreams, bedwetting, or morning grogginess. If any appear, reduce or stop tart cherry first, then reassess milk. If child already sleeps well \u2014 don\u2019t add tart cherry at all.

What NOT to do: Large glass of cherry juice. Sweetened cherry products. Chocolate milk. Both immediately before lights out. Nightly use without breaks (entrainment > dependence).`,
      timing: `${currentCherry.timing}. Milk first (60-90 min), cherry later (30-45 min).`
    },
    {
      title: "Finish ALL food 2-3 hours before bed",
      what: "Insulin suppresses growth hormone by up to 80%. Eating before bed spikes insulin during the exact window when growth hormone should be surging.",
      why: `Finish ALL food 2-3 hours before bedtime. Insulin suppresses growth hormone by up to 80%. Eating before bed \u2014 especially high-glycemic foods \u2014 spikes insulin during the exact window when growth hormone should be surging.

Experimental data show that elevated insulin around sleep onset markedly reduces nocturnal growth hormone output. Late eating and reflux also fragment sleep and blunt growth hormone-rich slow-wave sleep.

Acidic foods close to bedtime can disrupt sleep quality, which indirectly affects growth hormone secretion.

This is one of the most important and most violated rules.

Exception: bedtime milk (small amount, gentle insulin response). No snacks, no juice, nothing spiking blood sugar.`,
      timing: "Dinner done 2-3 hours before bedtime"
    },
    {
      title: "Dinner: protein-rich with glycine foods",
      what: "High-arginine foods + bone broth + gelatin dessert with pineapple.",
      why: `Dinner should be protein-rich (eggs, meat, fish, dairy, beans) for growth hormone-active amino acids (arginine, lysine, ornithine, glycine, glutamine), plus complex carbs and healthy fats.

High-arginine food for dinner is optimal \u2014 pumpkin seeds, turkey, chicken, eggs, dairy. No heavy, sugary desserts late. Finish dinner 2-3 hours before bed.

Glycine-rich foods and dessert strategy: Bone broth with dinner, and bovine gelatin dessert (gelatin jello) as the dinner dessert. Gelatin provides glycine, which adult data supports for improved sleep onset, sleep quality, and increased growth hormone pulses.

Serve gelatin dessert with pineapple \u2014 pineapple is a natural source of serotonin that supports relaxation and sleep onset. This combination (gelatin + pineapple) makes a growth-supporting dessert that tastes good and serves the growth hormone axis.`,
      timing: "Dinner 2-3 hours before bed, bone broth with dinner, gelatin+pineapple dessert after dinner"
    },
    {
      title: "Fermented foods during the day (not bedtime)",
      what: "Yogurt, kefir, sauerkraut, mild kimchi support gut-brain axis \u2192 sleep quality.",
      why: `Microbiome-supportive fermented foods: Unsweetened yogurt, kefir, sauerkraut, mild kimchi \u2014 during the day, not at bedtime.

Gut-brain signaling and microbiota composition can influence sleep quality, insulin-like growth factor 1 levels, and growth, especially under stress or undernutrition. Microbiota composition can influence circulating insulin-like growth factor 1 and growth hormone sensitivity. A healthy gut microbiome supports the entire growth hormone cascade indirectly.

No yogurt before bed. If using dairy as a sleep lever, use milk only in small amounts. Yogurt\u2019s higher protein density and potential for reflux make it a meal food, not a bedtime food.`,
      timing: "Daytime meals only, never at bedtime"
    },
    {
      title: "Pink noise (preferred over white noise)",
      what: "Stabilizes and enhances SWS specifically \u2014 matches brain\u2019s natural frequency patterns during deep sleep.",
      why: `Quiet, or stable pink noise (preferred over white noise). Pink noise can stabilize and enhance slow-wave activity specifically \u2014 it matches the brain\u2019s natural frequency patterns during deep sleep better than white noise.

Rain, ocean, heartbeat, and fan sounds also work. The key is continuous, stable sound that prevents micro-awakenings and protects growth hormone-rich slow-wave sleep windows.

Sound machines with specific tones (ocean, rain, heartbeat) reduce awakenings and maintain deeper stages.

Avoid intermittent noise.`,
      timing: "On at lights-out, continuous through night"
    },
    {
      title: "Daytime physical activity",
      what: "Sprints, jumping, climbing, active outdoor play \u2192 increases adenosine \u2192 deeper SWS that night.",
      why: `Exercise during the day directly supports deeper sleep at night. Physical activity \u2014 especially sprinting, jumping, climbing, and active outdoor play \u2014 increases adenosine buildup (sleep pressure) and improves slow-wave sleep quality and duration.

A child who was physically active during the day will have deeper, more growth hormone-rich sleep than a sedentary child.

This is another reason the sprint-stretch-milk protocol serves growth: the exercise component directly improves the sleep component.

Don\u2019t exercise within 2-3 hours of bedtime.`,
      timing: "Afternoon/early evening, finish 2-3 hours before bed"
    },
    {
      title: "Rigid wind-down routine 30-60 min before bed",
      what: "Same sequence every night, no deviations. Ultra-consistent order builds sleep pressure.",
      why: `30-60 minutes before bed: a rigid, predictable sequence. This is not negotiable and should be the same every single night, with no deviations.

Ultra-consistent order builds sleep pressure and shortens sleep onset latency. Predictable routines improve sleep continuity, which boosts the likelihood and duration of the first slow-wave sleep block \u2014 and therefore the first and largest growth hormone pulse.`,
      timing: "Start 60 min before target lights-out, same sequence every night"
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
      timing: "Final 15-30 min before lights out, during books and settling"
    },
    {
      title: "Sleep tracking",
      what: "Track patterns to identify what deepens sleep and what disrupts it.",
      why: `Track sleep patterns casually using apps, sleep diaries, or wearables to identify what deepens sleep and what disrupts it.

Look for patterns: does the magnesium bath help? Does a later bedtime worsen morning mood? Does pink noise versus silence make a difference?

Recognize that consumer wearables have limits in accurately staging children\u2019s sleep, but trends over time are useful.

The goal is to find your child\u2019s optimal configuration and protect it.`,
      timing: "Ongoing \u2014 review weekly to optimize"
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
      content: "Core body cooling required for deep sleep initiation. Body needs to drop core temperature to initiate and maintain slow-wave sleep. Warm rooms fight this process and reduce SWS quality."
    },
    {
      title: "Darkness: Complete",
      content: "Blackout shades (not optional). Cover every LED, device light, hallway light. Even small amounts of light \u2014 hallway light, device LEDs, early dawn light \u2014 suppress melatonin. Red/amber nightlight only if necessary. No phone plugged in next to bed \u2014 remove all devices from sleep environment entirely. Melatonin production requires true darkness."
    },
    {
      title: "Light clock (optional)",
      content: "Hatch or similar timed light clock to prevent premature morning wakeups and preserve early-night deep sleep blocks."
    },
    {
      title: "Noise: Pink noise or quiet",
      content: "Pink noise (preferred over white noise) can stabilize and enhance slow-wave activity specifically \u2014 it matches the brain\u2019s natural frequency patterns during deep sleep better than white noise. Rain, ocean, heartbeat, fan sounds also work. Key: continuous, stable sound that prevents micro-awakenings and protects GH-rich SWS windows. Sound machines with specific tones reduce awakenings and maintain deeper stages. Avoid intermittent noise."
    },
    {
      title: "Air quality: Clean and ventilated",
      content: "Pure, clean air. Ventilate the room. Avoid synthetic fragrances. Lavender aromatherapy (diffuser, pillow spray, or a few drops of essential oil in the bath) is a calming aid that may support deeper sleep \u2014 one of the few fragrances with evidence supporting relaxation."
    },
    {
      title: "Bedding: Organic cotton or linen only",
      content: "Organic cotton or organic linen sheets and pajamas. Avoid synthetic fabrics that trap heat, off-gas chemicals, and disrupt temperature regulation. Sleep in 100% cotton or linen, not polyester or synthetic blends."
    },
    {
      title: "Bed & Position",
      content: "Comfortable, supportive, firm mattress. Back sleeping on a thin pillow (or no pillow for young children) supports spinal alignment and disc rehydration overnight. Firm mattress supports spinal neutrality. This becomes increasingly important from age 19+ for postural height preservation."
    },
    {
      title: "Weighted blankets",
      content: "Age-appropriate, approximately 10% of body weight. Deep pressure provides calming input that improves sleep continuity and reduces restlessness. Appropriate for older toddlers through teens. Not for infants."
    },
    {
      title: "Sleep orientation (traditional practice)",
      content: "Traditional practice suggests sleeping with the head facing North (magnetic alignment). This is not peer-reviewed for growth hormone specifically, but is widely practiced in traditional health systems and some parents report improved sleep quality."
    }
  ];

  const warnings = [
    {
      title: "Sleep-Disordered Breathing \u2014 #1 underdiagnosed cause of poor growth",
      content: `Look for and address snoring, gasping, mouth breathing, apneas, and restless sleep aggressively.

Sleep-disordered breathing reduces slow-wave sleep and is a well-known cause of impaired growth that often improves dramatically after treatment.

If your child snores regularly, breathes through their mouth at night, gasps or pauses breathing, or sleeps restlessly despite adequate sleep duration \u2014 talk to your pediatrician IMMEDIATELY.

This wrecks growth hormone and insulin-like growth factor 1 over years. Treatment often results in dramatic growth improvement.

This is one of the most underdiagnosed causes of poor growth in otherwise healthy children.`
    },
    {
      title: "Caffeine \u2014 zero tolerance at any age",
      content: `Soda, energy drinks, tea, coffee, many \u201Csports\u201D drinks, and chocolate in excess.

Children are highly sensitive \u2014 even morning caffeine can reduce total sleep and shift sleep timing because of the 5-6 hour half-life and individual variability.

Caffeine is specifically harmful for growing taller because of both sleep disruption and possible direct growth hormone interference.

Zero tolerance.`
    },
    {
      title: "Screens in bedroom and 1-2 hours before bed",
      content: `Blue-enriched light from tablets and phones suppresses melatonin by well over 50% and can shift dim-light melatonin onset by hours.

Devices charge outside the bedroom. No phone plugged in next to the bed.

Being on your phone in bed has been linked to disrupted circadian rhythm and numerous health concerns.

This is the single most common sleep saboteur in modern childhood.`
    },
    {
      title: "Eating within 2-3 hours of bedtime",
      content: `Particularly large, high-glycemic, or acidic meals. Late insulin surges and reflux risk both impair deep sleep.

Elevated insulin around sleep onset markedly reduces nocturnal growth hormone output.

This includes snacks, juice, and anything that spikes blood sugar.

Exception: small bedtime milk.`
    },
    {
      title: "Irregular bed and wake times",
      content: `Destabilizes circadian phase and evening melatonin, leading to late slow-wave sleep, scattered growth hormone pulses, and chronic internal jet lag.

One late Friday night can affect growth hormone timing through Wednesday.

\u201CSocial jet lag\u201D \u2014 staying up late and sleeping in on weekends \u2014 takes several days to re-entrain.`
    },
    {
      title: "Sugar and artificial sweeteners before bed",
      content: `Sugar spikes insulin which suppresses growth hormone.

Artificial sweeteners may disrupt the gut microbiome and have been linked to earlier puberty.`
    },
    {
      title: "Stress, arguments, and overstimulation before bed",
      content: `Cortisol directly antagonizes growth hormone release. High cortisol and sympathetic tone fragment sleep and blunt growth hormone.

Poor sleep from stress leads to reduced growth hormone pulses.

The wind-down routine exists to prevent this.`
    },
    {
      title: "Warm bedrooms",
      content: `Core body cooling is required for deep sleep initiation.

A warm room reduces slow-wave sleep quality.`
    },
    {
      title: "Synthetic bedding and sleepwear",
      content: `Polyester and synthetic fabrics trap heat and may off-gas chemicals.

Use organic cotton or organic linen for sheets and pajamas.`
    },
    {
      title: "Supplements instead of routine",
      content: `No melatonin pills, no sleep gummies, no herbal supplements. No L-theanine, inositol, or apigenin supplements.

These may have adult data but pediatric use should be cautious and medically supervised.

Melatonin supplements acutely increase growth hormone in adults (one study showed ~157% increase with 3-5 mg), but pediatric long-term data for height are limited.

Best reserved for specific circadian disorders under pediatric guidance, not routine \u201Cheight hacks.\u201D

Fix the environment and routine first. Everything should come from food, behavior, and topical magnesium applications. Food and behavioral levers should carry the load.`
    },
    {
      title: "Substances (ages 13+) \u2014 zero tolerance",
      content: `Alcohol: suppresses growth hormone up to 75%, fragments sleep architecture, and eliminates deep slow-wave sleep.

Vaping/nicotine: impairs disc health and sleep quality.

Marijuana: disrupts sleep architecture and growth hormone release.

Zero tolerance.`
    }
  ];

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'today', label: 'Levers' },
    { id: 'routine', label: 'Routine' },
    { id: 'environment', label: 'Environment' },
    { id: 'warnings', label: 'Warnings' },
    { id: 'science', label: 'Science' }
  ];

  const AgeTable = ({ data, columns, title }: { data: Record<string, unknown>[]; columns: { header: string; key: string }[]; title: string }) => (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: '#1B4332', marginBottom: 8 }}>{title}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              {columns.map((col, i) => (
                <th key={i} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e5e5e5', fontWeight: 600 }}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{
                background: isActiveRow(row.range as number[]) ? '#dcfce7' : 'white',
                fontWeight: isActiveRow(row.range as number[]) ? 600 : 400
              }}>
                {columns.map((col, j) => (
                  <td key={j} style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid #eee',
                    color: isActiveRow(row.range as number[]) ? '#166534' : '#333'
                  }}>
                    {row[col.key] as string}
                    {isActiveRow(row.range as number[]) && j === 0 && <span style={{ marginLeft: 8, fontSize: 11, background: '#166534', color: 'white', padding: '2px 6px', borderRadius: 4 }}>YOUR CHILD</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />

      <main className="max-w-3xl mx-auto px-4 py-12">

        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-forest mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header Card */}
        <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', borderRadius: 16, padding: '32px', marginBottom: 20, color: 'white', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>🌙 Sleep Window</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }}></span>
              Optimal
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 12px' }}>Sleep & Circadian</h1>
          <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6, maxWidth: 600 }}>
            Sleep is the #1 lever a parent has to grow a taller, stronger child. Each night of deep sleep is a growth rep for the GH axis. Your job: maximize sleep reps, every night, for years. <em>Growth only happens lying down.</em>
          </p>
          <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>60-80%</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>GH in first 3 hours</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>25-40%</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>children&apos;s SWS vs 15-25% adults</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>10-1 AM</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>peak GH window</div>
            </div>
          </div>
        </div>

        {/* Age Selector + Targets Bar */}
        <div style={{ background: 'white', borderRadius: 12, padding: '16px 20px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: '#666' }}>Child&apos;s age:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="range"
                min="0"
                max="25"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <span style={{ background: '#1B4332', color: 'white', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 600, minWidth: 60, textAlign: 'center' }}>
                {childAge < 1 ? `${Math.round(childAge * 12)} mo` : `${childAge} yr`}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
            <span style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: 20, fontSize: 13 }}>Sleep: <strong>{currentSleep.target}</strong></span>
            <span style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: 20, fontSize: 13 }}>Bedtime: <strong>{currentBedtime.bedtime}</strong></span>
            <span style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: 20, fontSize: 13 }}>Milk: <strong>{currentMilk.amount}</strong></span>
            <span style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: 20, fontSize: 13 }}>Tart cherry: <strong>{currentCherry.dose}</strong></span>
            <span style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: 20, fontSize: 13 }}>Mg bath: <strong>{getMagnesiumDose()}</strong></span>
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 0, background: '#f5f5f5', padding: 4, borderRadius: '12px 12px 0 0', width: 'fit-content' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: activeTab === tab.id ? 'white' : 'transparent',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? '#1B4332' : '#666',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: 'white', borderRadius: '0 12px 12px 12px', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div style={{ padding: 8 }}>
              <SleepHomeTab age={childAge} />
            </div>
          )}

          {/* TODAY TAB */}
          {activeTab === 'today' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1B4332', margin: '0 0 8px', textAlign: 'center' }}>Sleep Levers</h2>
              <p style={{ textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 24 }}>Ranked by impact on slow-wave sleep. Do #1 first.</p>

              {levers.map((lever, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setExpandedLever(expandedLever === i ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      padding: '16px 18px',
                      background: expandedLever === i ? '#f0fdf4' : '#fafafa',
                      border: expandedLever === i ? '1px solid #bbf7d0' : '1px solid #eee',
                      borderRadius: expandedLever === i ? '12px 12px 0 0' : 12,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{
                      width: 28,
                      height: 28,
                      background: '#1B4332',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 600,
                      flexShrink: 0
                    }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, color: '#1B4332', marginBottom: 4 }}>{lever.title}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{lever.what}</div>
                    </div>
                    <span style={{ color: '#999', fontSize: 18 }}>{expandedLever === i ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {expandedLever === i && (
                    <div style={{ padding: '16px 18px', background: '#f0fdf4', borderRadius: '0 0 12px 12px', border: '1px solid #bbf7d0', borderTop: 'none' }}>
                      <div style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginBottom: 12, whiteSpace: 'pre-line' }}>{lever.why}</div>
                      <div style={{ fontSize: 13, color: '#1B4332', fontWeight: 600, background: '#dcfce7', padding: '8px 12px', borderRadius: 6 }}>\u23F0 {lever.timing}</div>
                    </div>
                  )}
                </div>
              ))}

              {/* Full Age Tables */}
              <div style={{ marginTop: 32, padding: 20, background: '#f9fafb', borderRadius: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>📊 Complete Age-Based Reference Tables</h3>

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

              {/* Never Box */}
              <div style={{ marginTop: 24, background: '#fef2f2', borderRadius: 12, padding: '18px 22px', border: '1px solid #fecaca' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#dc2626', marginBottom: 10 }}>🚫 Never</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '8px' }}>
                  {neverList.map((item, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#7f1d1d', padding: '4px 0' }}>\u2715 {item}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROUTINE TAB */}
          {activeTab === 'routine' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1B4332', margin: '0 0 24px' }}>The Complete Wind-Down Sequence</h2>

              {[
                { time: '60 min before bed', items: [
                  `Warm bath with Epsom salts/magnesium flakes (${getMagnesiumDose()} for age ${childAge})`,
                  '10-20 min soak, warm not hot',
                  'Add lavender or chamomile essential oil if tolerated',
                  'Bath \u2192 cooling mechanism: raises surface temp, subsequent cooling triggers core temp drop that initiates deep sleep (physiological trigger, not just behavioral)',
                  'Multi-modal relaxation tool: warmth + magnesium + aromatherapy + subsequent cooling'
                ], color: '#2D6A4F' },
                { time: 'After bath', items: [
                  'Pajamas (organic cotton or linen only \u2014 avoid synthetic fabrics that trap heat, off-gas chemicals, and disrupt temperature regulation)',
                  'All blue light OFF \u2014 dim warm lights only',
                  'Devices charge outside bedroom'
                ], color: '#3B82F6' },
                { time: '60-90 min before lights out', items: [
                  `Bedtime milk (${currentMilk.amount}, warm, plain, unsweetened)`,
                  'Can add \u00BD-1 tsp raw honey for blood sugar stabilization'
                ], color: '#8B5CF6' },
                { time: '30-45 min before lights out (only if sleep onset is a problem)', items: [
                  `Tart cherry juice (${currentCherry.dose} diluted ${currentCherry.dilution})`,
                  '100% tart cherry only, no blends, no added sugar',
                  `${currentCherry.frequency}`,
                  'If child already sleeps well \u2014 skip this entirely'
                ], color: '#EC4899' },
                { time: '15-30 min before lights out', items: [
                  'Magnesium lotion on feet (magnesium glycinate preferred)',
                  'Thin layer on soles, gentle 1-2 min massage',
                  'Functions as calming sensory ritual + transdermal delivery',
                  '2-3 short physical books (not screens)',
                  'Calm conversation',
                  'Calming phrases, gentle stories, or recorded parent voice scripts played softly',
                  'Cuddling, gentle voice (reduces cortisol)'
                ], color: '#F59E0B' },
                { time: 'At lights out', items: [
                  '\u201CThird eye\u201D technique: gentle forehead rubbing or light pressure between eyebrows during drowsiness (anecdotal but many parents report it helps children settle)',
                  'Complete darkness (blackout shades, cover every light source)',
                  'Pink noise on (or quiet)'
                ], color: '#1B4332' }
              ].map((block, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 4, background: block.color, borderRadius: 2 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: block.color, marginBottom: 10 }}>{block.time}</div>
                    {block.items.map((item, j) => (
                      <div key={j} style={{ fontSize: 14, color: '#444', padding: '4px 0', lineHeight: 1.6 }}>&bull; {item}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ background: '#fef3c7', borderRadius: 12, padding: '16px 20px', marginTop: 24, border: '1px solid #fde68a' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 8 }}>💛 Emotional Safety</div>
                <div style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7 }}>
                  Cortisol directly antagonizes GH. A child who goes to bed stressed, scared, or overstimulated has reduced SWS and blunted GH. A child who feels safe falls asleep faster and stays in deeper sleep longer.
                  <br /><br />
                  For anxious children or those with bedtime fears: gentle co-sleeping or proximity strategies (start in child&apos;s room, fade gradually) and soothing scripts can reduce anxiety-driven awakenings and protect consolidated deep sleep without creating dependency.
                </div>
              </div>

              <div style={{ background: '#f0f9ff', borderRadius: 12, padding: '16px 20px', marginTop: 16, border: '1px solid #bae6fd' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0369a1', marginBottom: 8 }}>📋 Example Sequence Summary</div>
                <ol style={{ fontSize: 14, color: '#0c4a6e', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
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

          {/* ENVIRONMENT TAB */}
          {activeTab === 'environment' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1B4332', margin: '0 0 24px' }}>Sleep Environment Checklist</h2>

              {envItems.map((item, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setExpandedEnv(expandedEnv === i ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 18px',
                      background: expandedEnv === i ? '#f0fdf4' : '#fafafa',
                      border: expandedEnv === i ? '1px solid #bbf7d0' : '1px solid #eee',
                      borderRadius: expandedEnv === i ? '10px 10px 0 0' : 10,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#1B4332' }}>{item.title}</span>
                    <span style={{ color: '#999' }}>{expandedEnv === i ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {expandedEnv === i && (
                    <div style={{ padding: '14px 18px', background: '#f0fdf4', borderRadius: '0 0 10px 10px', border: '1px solid #bbf7d0', borderTop: 'none', fontSize: 14, color: '#444', lineHeight: 1.7 }}>
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* WARNINGS TAB */}
          {activeTab === 'warnings' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#dc2626', margin: '0 0 24px' }}>⚠️ Critical Issues That Wreck GH \u2014 Address Immediately</h2>

              {warnings.map((warn, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setExpandedWarn(expandedWarn === i ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 18px',
                      background: expandedWarn === i ? '#fef2f2' : '#fff5f5',
                      border: expandedWarn === i ? '1px solid #fecaca' : '1px solid #fee2e2',
                      borderRadius: expandedWarn === i ? '10px 10px 0 0' : 10,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#dc2626' }}>{warn.title}</span>
                    <span style={{ color: '#f87171' }}>{expandedWarn === i ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {expandedWarn === i && (
                    <div style={{ padding: '14px 18px', background: '#fef2f2', borderRadius: '0 0 10px 10px', border: '1px solid #fecaca', borderTop: 'none', fontSize: 14, color: '#7f1d1d', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {warn.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SCIENCE TAB */}
          {activeTab === 'science' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1B4332', margin: '0 0 24px' }}>The Science</h2>

              <div style={{ fontSize: 15, color: '#333', lineHeight: 1.8 }}>
                <h3 style={{ fontSize: 17, color: '#1B4332', marginTop: 0 }}>The Core Mechanism</h3>
                <p style={{ marginBottom: 16 }}>
                  Growth hormone is released in large pulses during slow-wave (deep, N3) sleep, with 60-80% of daily growth hormone secretion occurring in the first major deep-sleep episode within roughly 3 hours after sleep onset. This pulse is tightly time-locked to slow-wave sleep itself: when slow waves appear, growth hormone rises with a lag of about 5-15 minutes. When slow-wave sleep is experimentally suppressed, growth hormone secretion is delayed and reduced. When slow-wave sleep is enhanced, growth hormone rises.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Sleep-dependent, not clock-dependent</h3>
                <p style={{ marginBottom: 16 }}>
                  This is sleep-dependent, not clock-dependent. If you shift the entire sleep period by 12 hours, the growth hormone surge shifts with it. The trigger is slow-wave sleep, not the time on the clock. But in real life, sleep is anchored to night \u2014 and anchoring it consistently is what makes the system reliable.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Children have more SWS than adults</h3>
                <p style={{ marginBottom: 16 }}>
                  Children naturally have significantly more slow-wave sleep than adults \u2014 25-40% of total sleep time versus 15-25% in adults, peaking in early childhood. This is why childhood sleep is extraordinarily valuable for growth. Every hour of a child&apos;s sleep contains more growth hormone-releasing deep sleep than an adult&apos;s. And when sleep is restricted, deep stages are stripped first \u2014 meaning the growth hormone window is the first casualty of lost sleep.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>The growth set concept</h3>
                <p style={{ marginBottom: 16 }}>
                  Think of each complete 90-minute sleep cycle as one &quot;growth set.&quot; You want as many complete, high-quality sets as possible before early morning. A child sleeping 12 hours gets 8 complete sets. A child sleeping 8 hours gets only 5. Those 3 missing sets contain deep-sleep stages where growth hormone is released. You&apos;re not just losing sleep \u2014 you&apos;re losing growth reps. Population studies confirm this: shorter and more irregular nighttime sleep is associated with shorter stature. Longer and more regular nighttime sleep is associated with taller stature and clearer growth spurts.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Deep sleep also optimizes testosterone</h3>
                <p style={{ marginBottom: 16 }}>
                  Deep sleep also optimizes testosterone production, which becomes critical during puberty. Testosterone supports muscle development, bone density, and interacts with the growth hormone axis to amplify growth. Insufficient sleep reduces both growth hormone and testosterone output.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Melatonin as &quot;nighttime repair&quot; signal</h3>
                <p style={{ marginBottom: 16 }}>
                  Melatonin, triggered by darkness and a stable circadian rhythm, rises in the evening and acts as a &quot;nighttime repair&quot; signal that facilitates deep sleep and growth hormone release. Melatonin also inhibits aromatase \u2014 the enzyme that converts testosterone to estrogen \u2014 providing an additional mechanism for preserving the hormonal environment that supports growth. In children, higher nighttime melatonin is positively correlated with robust nocturnal growth hormone and healthy growth patterns. For children on an early schedule, being asleep by around 8:00-8:30 PM means their first deep-sleep block \u2014 and thus the largest growth hormone surge \u2014 falls in the roughly 10 PM-1 AM window, provided sleep is continuous and deep.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Clock genes (BMAL1, PER2)</h3>
                <p style={{ marginBottom: 16 }}>
                  Circadian misalignment and sleep loss alter expression of clock genes (BMAL1, PER2) that regulate growth hormone synthesis and downstream signaling. Chronic circadian disruption doesn&apos;t just reduce tonight&apos;s growth hormone \u2014 it changes the gene expression patterns that control growth hormone production over time. Irregular schedules cause shifting melatonin and fragmented slow-wave sleep, disrupting the entire growth hormone-insulin-like growth factor 1 cascade.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Blue light and DLMO</h3>
                <p style={{ marginBottom: 16 }}>
                  Blue-enriched light in the 1-2 hours before bedtime suppresses melatonin by well over 50% and shifts the dim-light melatonin onset later \u2014 sometimes by hours. This doesn&apos;t just make it harder to fall asleep. It delays sleep, compresses slow-wave sleep, and blunts or scatters the growth hormone surge. In preschoolers, bedtime and evening light together explain about 50% of melatonin timing variance.
                </p>

                <h3 style={{ fontSize: 17, color: '#1B4332' }}>Growth only happens lying down</h3>
                <p style={{ marginBottom: 24 }}>
                  Growth only happens when the body is lying down. Linear bone growth requires the body to be horizontal \u2014 gravity-free spinal position, decompressed growth plates, and the physiological state of deep sleep combine to create the conditions for growth. This is not metaphorical. The physical position matters. A child who is sleeping is growing. A child who is not sleeping is not growing.
                </p>

                <div style={{ background: '#f0fdf4', padding: '16px 20px', borderRadius: 10, marginBottom: 20, border: '1px solid #bbf7d0' }}>
                  <strong style={{ color: '#166534' }}>Pathway Summary:</strong>
                  <p style={{ margin: '8px 0 0', fontSize: 14, color: '#166534', lineHeight: 1.7 }}>
                    Growth hormone released in pulses during slow-wave (N3) sleep \u2192 60-80% of daily secretion in first 3 hours \u2192 GH rises 5-15 minutes after slow waves appear \u2192 Sleep-dependent, not clock-dependent \u2192 Children have 25-40% SWS vs adults 15-25% \u2192 Childhood sleep is extraordinarily valuable \u2192 Sleep restriction strips deep stages first \u2192 Each 90-minute cycle is one &quot;growth set&quot; \u2192 More sets = more growth reps \u2192 Short sleep = shorter stature \u2192 Deep sleep also optimizes testosterone \u2192 Melatonin acts as &quot;nighttime repair&quot; signal and inhibits aromatase \u2192 Clock genes (BMAL1, PER2) regulate GH synthesis \u2192 Circadian disruption changes GH gene expression \u2192 Blue light suppresses melatonin 50%+ and shifts DLMO by hours \u2192 Growth only happens lying down
                  </p>
                </div>

                <div style={{ background: '#f5f5f5', padding: '16px 20px', borderRadius: 10, fontSize: 13, color: '#666', fontFamily: "'Courier New', Courier, monospace" }}>
                  <strong>Citations:</strong> Van Cauter E. Sleep. 2000; Takahashi Y. J Clin Invest. 1968; Wetterberg L. J Pineal Res. 2006; Sassin JF. Science. 1969; LeBourgeois MK. Mind Brain Educ. 2017; Ohlsson C. Front Endocrinol. 2023
                </div>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
