'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

type StageSection = {
  title: string;
  intro: string;
  explanation: string;
  flow: string;
  citation: string;
};

type StageData = {
  id: string;
  ageRange: string;
  header: string;
  subhead: string;
  supportive: string;
  sections: StageSection[];
};

const allStages: StageData[] = [
  {
    id: 'early-prenatal',
    ageRange: 'Conception to 6 months pregnant',
    header: 'First & Second Trimester',
    subhead: 'The blueprint is being drawn.',
    supportive: "Everything starts here. You're laying the groundwork.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: "Your baby's growth hormone system doesn't exist yet — it's being built from scratch.",
        explanation: "In the first two trimesters, your baby's pituitary gland is literally forming from a small pouch of cells. By week 8, the basic structure exists. By week 20, it starts producing tiny amounts of GH. But here's the key insight: fetal growth right now doesn't depend on GH at all. It runs on a different system — IGF-2 and insulin, controlled largely by nutrient supply from you. Think of GH as hardware being installed for later use. The quality of that installation depends on your nutrition, thyroid function, and avoiding toxins that disrupt hormonal development.",
        flow: 'Pituitary forming → GH hardware installing → (Growth runs on IGF-2/insulin for now, not GH)',
        citation: 'Gluckman PD. Endocr Rev. 1995',
      },
      {
        title: 'How those signals reach the body',
        intro: 'GH receptors are just beginning to appear. The real growth driver right now is insulin and IGF-2.',
        explanation: "Your baby's cells are installing GH receptors, but they're not the main show yet. IGF-2 is the dominant growth factor in utero — it drives cell division and organ formation independent of GH. Insulin from your baby's pancreas also plays a major role, which is why gestational diabetes (high maternal glucose → high fetal insulin) causes big babies but not necessarily healthy growth patterns. The receptor systems being built now — for GH, IGF-1, and insulin — will determine your child's metabolic and growth responses for life. This is programming, not just growing.",
        flow: 'IGF-2 + Insulin driving growth → GH receptors installing in background → (Programming for postnatal life)',
        citation: 'Hill DJ. Pediatr Res. 1998',
      },
      {
        title: 'How bones actually grow',
        intro: "Bones aren't bones yet — they're cartilage models being sculpted.",
        explanation: "Your baby's skeleton starts as a cartilage 'rough draft' that will later be replaced by bone. Mesenchymal stem cells condense, then differentiate into chondrocytes that form cartilage templates of every bone. By the end of the second trimester, ossification centers appear — spots where cartilage starts converting to bone. The growth plates that will determine your child's adult height are being established now. Folate, choline, and adequate protein support the massive cell division happening. Neural tube defects and skeletal abnormalities trace back to this period.",
        flow: 'Stem cells → Cartilage models → Ossification centers form → Growth plates established',
        citation: 'Kronenberg HM. Nature. 2003',
      },
    ],
  },
  {
    id: 'late-prenatal',
    ageRange: 'Last 3 months before birth',
    header: 'Third Trimester',
    subhead: 'The foundation is being built.',
    supportive: "Your choices right now are already shaping your baby's growth potential.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: "During the third trimester, your baby's pituitary gland is maturing and beginning to produce growth hormone.",
        explanation: "Your baby's brain is building its first 'growth command center.' The hypothalamus is learning to send signals (GHRH) to the pituitary, which responds by releasing GH pulses. It's like installing the hardware before birth. But here's what's interesting — your stress levels directly affect this installation. Cortisol crosses the placenta freely. Chronic maternal stress is like static on the line, making it harder for your baby's growth signals to develop clean, strong patterns. The calmer the environment, the cleaner the wiring.",
        flow: "Baby's hypothalamus wiring up → Early GH pulses begin → (Maternal cortisol = static on the line)",
        citation: 'Gluckman PD. Endocr Rev. 1995',
      },
      {
        title: 'How those signals reach the body',
        intro: "Your baby's GH receptors are forming throughout the body. These determine how well growth signals will work after birth.",
        explanation: "Think of GH receptors as antennas your baby is installing on every organ — liver, muscles, bones. The more antennas, and the better tuned they are, the stronger the growth signal will be received after birth. Here's the key: your nutrition affects antenna quality. Omega-3s (especially DHA) help build receptor membranes. Endocrine disruptors — chemicals in plastics and pesticides — are like interference that scrambles antenna calibration. What you eat and what you avoid right now programs how responsive your child will be to growth signals for years.",
        flow: 'Receptors installing everywhere → DHA builds quality → Toxins scramble calibration',
        citation: 'Hill DJ. Pediatr Res. 1998',
      },
      {
        title: 'How bones actually grow',
        intro: "Growth plates are forming in your baby's skeleton. These cartilage zones will be where all future height comes from.",
        explanation: "Your baby's bones aren't really bones yet — they're cartilage scaffolds with special zones called growth plates. Right now, cells called chondrocytes are laying down the blueprint that will become your child's skeleton. They're building a scaffold (collagen and proteins) that will later turn into bone. The raw materials come directly from you: amino acids from protein, calcium, phosphorus. If supply is limited, the scaffold gets built with whatever's available — thinner, weaker. This is 'fetal programming' — the blueprint drawn now affects the building for decades.",
        flow: "Chondrocytes building scaffold → Your nutrients = their raw materials → Blueprint set for life",
        citation: 'Fowden AL. J Physiol. 2006',
      },
    ],
  },
  {
    id: '0-3-months',
    ageRange: '0-3 months',
    header: 'Newborn',
    subhead: 'Adjusting to the outside world.',
    supportive: 'Your baby is adapting beautifully. Growth is happening around the clock.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: "GH pulses happen throughout day and night — your newborn's system doesn't know the difference yet.",
        explanation: "Your newborn's GH system just went live, but it hasn't learned day from night. The hypothalamus fires GHRH signals randomly throughout 24 hours, creating small, frequent GH pulses rather than big nighttime surges. This is actually perfect — a newborn sleeps 16-17 hours in fragments, so having GH tied to 'nighttime' wouldn't make sense. Feeding is the main trigger: amino acids from breast milk or formula directly stimulate GH release. Every feed is a growth signal. The circadian pattern will develop over months as the brain matures.",
        flow: 'Feeding → Amino acids → GH pulse → (No day/night rhythm yet; all sleep counts)',
        citation: 'Giustina A. Endocr Rev. 1998',
      },
      {
        title: 'How those signals reach the body',
        intro: "The liver is coming online as the main IGF-1 factory. Breast milk provides backup growth factors.",
        explanation: "Your newborn's liver is learning its job as the body's growth factory. GH binds receptors, flips the JAK2-STAT5 switch, and IGF-1 production begins. But the system is immature — output is variable. Breast milk fills the gap: it contains IGF-1, IGF-2, and other growth factors that survive the gut and enter circulation. Think of it as supplemental support while the factory ramps up. Colostrum in the first days is especially rich in these factors. The combination of endogenous production plus milk-borne growth factors drives the rapid weight gain of early infancy.",
        flow: 'GH → Liver (ramping up) → IGF-1 → (Breast milk adds backup growth factors)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth plates are running full speed. Your baby may grow 1 inch per month.',
        explanation: "Newborn growth plates are among the most active they'll ever be. Chondrocytes are dividing and inflating rapidly, pushing bones longer every day. The growth rate — roughly 1 inch per month — will never be matched again. Calcium and phosphorus are being deposited at tremendous rates to harden the new bone. Vitamin D is critical: it unlocks calcium absorption from milk. Newborns are often born with low vitamin D stores (depending on maternal status), which is why supplementation is recommended from birth. The construction crew is working overtime — make sure they have materials.",
        flow: 'Chondrocytes dividing rapidly → Calcium hardening new bone → (Vitamin D unlocks absorption)',
        citation: 'Specker BL. J Bone Miner Res. 1999',
      },
    ],
  },
  {
    id: '3-6-months',
    ageRange: '3-6 months',
    header: '3-6 Months',
    subhead: 'The growth engine is humming.',
    supportive: 'Your baby is thriving. The systems are clicking into place.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH pulses are becoming slightly more organized, but feeding is still the main trigger.',
        explanation: "Around 3-4 months, something shifts: your baby starts consolidating sleep into longer stretches, and the GH system begins noticing. Pulses during sleep become slightly larger than daytime pulses — the first hints of circadian rhythm. But feeding remains dominant. Breast milk or formula every few hours keeps amino acids flowing, and each feeding triggers GH release. The system is transitioning from 'fire randomly' to 'fire with some pattern.' This is why sleep consolidation and consistent feeding both support growth — they're giving the system rhythm to work with.",
        flow: 'Sleep consolidating → GH pulses getting organized → Feeding still triggers most pulses',
        citation: 'Giustina A. Endocr Rev. 1998',
      },
      {
        title: 'How those signals reach the body',
        intro: "The liver's IGF-1 production is stabilizing. Protein intake directly controls output.",
        explanation: "By now, the liver's growth factory is running more consistently. GH arrives, the JAK2-STAT5 pathway activates, and IGF-1 flows out. The relationship becomes clearer: more protein → more IGF-1. Studies show formula-fed infants with higher protein content grow faster (though not always better — there's a sweet spot). The liver is also maturing its ability to regulate IGF-binding proteins, which control how much IGF-1 is 'free' to act on tissues. The system is calibrating. Consistent nutrition keeps it calibrated well.",
        flow: 'GH → Stable liver response → IGF-1 → (Protein intake = production dial)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth rate is still rapid — roughly 0.5-1 inch per month. Bones are lengthening visibly.',
        explanation: "Growth plates maintain high activity. The proliferative zone churns out new chondrocytes; the hypertrophic zone inflates them; the ossification zone converts them to bone. It's a conveyor belt running at high speed. This is when you notice your baby outgrowing clothes weekly. Tummy time and early movement aren't just developmental milestones — they provide mechanical signals to growing bones. Load-bearing, even at this age, tells the skeleton 'build stronger here.' Bones adapt to the forces placed on them, and these early signals shape skeletal architecture.",
        flow: 'Chondrocyte conveyor belt → Rapid elongation → Early movement = early mechanical signals',
        citation: 'Specker BL. J Bone Miner Res. 1999',
      },
    ],
  },
  {
    id: '6-12-months',
    ageRange: '6-12 months',
    header: '6-12 Months',
    subhead: 'Solid foods enter the picture.',
    supportive: 'New inputs, same goal. Growth is being fueled from more sources now.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH is increasingly tied to sleep. Nighttime pulses are becoming dominant.',
        explanation: "By 6 months, most babies sleep longer stretches at night, and the GH system responds. Nighttime pulses grow larger as the hypothalamus learns to sync GHRH release with sleep cycles. Daytime pulses don't disappear, but they become secondary. This is the beginning of the adult-like pattern where sleep quality matters enormously for growth. Disrupted sleep — from teething, illness, or schedule chaos — means disrupted GH pulses. The system is trainable: consistent sleep schedules reinforce strong circadian GH rhythm. Inconsistency keeps it sloppy.",
        flow: 'Sleep consolidation → Larger nighttime GH pulses → (Consistency trains the rhythm)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: "Solid foods add protein diversity. The liver responds to new amino acid sources.",
        explanation: "Introduction of solid foods changes the growth equation. Breast milk or formula still provides baseline nutrition, but now meat, eggs, legumes, and dairy add concentrated amino acids directly. The liver's IGF-1 production responds to total protein intake from all sources. This is when nutrition strategy starts mattering: protein-rich first foods (pureed meats, egg yolks) directly support IGF-1 output. Iron-rich foods also matter — iron deficiency impairs growth through multiple pathways. The liver can only produce what it's given materials for.",
        flow: 'Solid foods → More amino acids → Liver produces more IGF-1 → (Iron deficiency = bottleneck)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth rate slows slightly but remains high. Crawling and standing add new mechanical inputs.',
        explanation: "Growth velocity drops from the frenetic newborn pace but remains substantial — around 4-5 inches in this six-month window. What changes is mechanical input. Crawling loads the arms and legs differently. Pulling to stand introduces vertical compression through the spine and legs. Growth plates respond to these new forces by adapting bone architecture. The skeleton is learning what forces it needs to handle. Bones don't just grow longer — they grow smarter, reinforcing areas under stress. Movement isn't just motor development; it's skeletal programming.",
        flow: 'Crawling/standing → New mechanical forces → Growth plates adapt architecture → Smarter, stronger bones',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: '12-18-months',
    ageRange: '12-18 months',
    header: '12-18 Months',
    subhead: 'Walking changes everything.',
    supportive: 'Upright and mobile. A whole new set of growth signals is activating.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH secretion is now clearly sleep-dominant. Night sleep quality directly affects growth.',
        explanation: "By 12 months, the circadian system is largely mature. GH secretion follows a clear pattern: large pulses during deep sleep (especially the first few hours), minimal during the day. The hypothalamus has learned to suppress GHRH during waking and release it during sleep. This means sleep quality isn't just about rest anymore — it's about growth hormone access. Toddlers who sleep poorly grow more slowly, independent of nutrition. The broadcast is on a schedule now, and missing the broadcast window means missing growth signals.",
        flow: 'Mature circadian rhythm → Deep sleep = GH window → (Poor sleep = missed growth signals)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Whole milk becomes a growth accelerator. The protein-IGF-1 connection is fully online.',
        explanation: "At 12 months, whole cow's milk typically enters the diet, and it's a growth lever. Milk protein (especially casein and whey) strongly stimulates IGF-1 production — more than equivalent protein from other sources. Danish studies show clear dose-response: more milk → higher IGF-1 → faster growth. The liver is now fully capable of translating GH signals into IGF-1, and protein intake sets the production ceiling. This is the age where nutrition choices visibly affect growth velocity. The machinery is ready; the fuel determines the output.",
        flow: 'Milk protein → Strong IGF-1 stimulus → Liver at full capacity → (More milk = more growth signal)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Walking introduces impact loading. Growth plates respond to vertical force for the first time.',
        explanation: "Walking is a biomechanical revolution. For the first time, your child's full body weight transmits through the legs with every step, creating repetitive impact loading. Growth plate chondrocytes have mechanoreceptors that detect this force and respond by increasing proliferation and matrix production. The skeleton is now receiving constant 'build stronger' signals. This is why delays in walking can affect leg bone development — it's not just motor delay, it's mechanical signal delay. Steps are information. More steps = more building instructions.",
        flow: 'Walking → Impact loading → Mechanoreceptors activate → Growth plates build in response',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: '18-24-months',
    ageRange: '18-24 months',
    header: '18-24 Months',
    subhead: 'Running, climbing, building.',
    supportive: 'The body is learning what it can do. Every movement teaches the bones.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH secretion patterns are stable. Sleep consistency now matters more than sleep duration.',
        explanation: "By 18 months, the GH secretion system is well-established. The big insight now is that consistency matters more than perfection. A toddler who sleeps 10pm-6am every night will have better GH patterns than one who sleeps 11 hours but at irregular times. The hypothalamus learns rhythms through repetition. Irregular schedules keep the system guessing, preventing it from optimizing GHRH release timing. Nap transitions can temporarily disrupt things — that's normal. But the overnight anchor is what programs strong, reliable growth pulses.",
        flow: 'Consistent schedule → Hypothalamus optimizes timing → Reliable GH pulses → (Irregular = suboptimal)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'The growth system is fully functional. What you feed it determines what it produces.',
        explanation: "There's no more 'ramping up' — the liver's IGF-1 factory is mature. GH arrives, JAK2-STAT5 activates, IGF-1 flows. The limiting factor is now purely nutritional. Protein quality and quantity set IGF-1 levels. Zinc is a critical cofactor — deficiency directly impairs GH signaling at the receptor level. Inflammation from frequent illness (common in toddlers) can install that SOCS 'dimmer switch' temporarily, but it resolves when the child recovers. Consistent good nutrition beats occasional perfect nutrition. The system averages inputs over time.",
        flow: 'GH → Liver → IGF-1 → (Protein + zinc = production rate; Illness = temporary dimmer)',
        citation: 'Prasad AS. Nutrition. 1998',
      },
      {
        title: 'How bones actually grow',
        intro: 'Running and climbing add dynamic, varied loading. Bones are learning their final architecture.',
        explanation: "A toddler's movement repertoire expands dramatically — running, jumping off things, climbing. Each activity provides different mechanical signals. Running = repetitive impact. Jumping = high-force, intermittent loading. Climbing = torsion and multi-directional force. Growth plates interpret this variety and build bone architecture accordingly. This is why diverse physical activity outperforms repetitive single-sport activity for skeletal development. The bones are asking 'what do you need me to do?' and movement answers that question. Limited movement = limited bone programming.",
        flow: 'Varied movement → Diverse mechanical signals → Growth plates build adaptively → Stronger architecture',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-2',
    ageRange: '2 years',
    header: 'Age 2',
    subhead: 'Toddler independence.',
    supportive: "They're exploring everything. Growth is fueled by curiosity and movement.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH pulses are predictable and sleep-locked. The pattern will remain similar until puberty.',
        explanation: "At 2, the GH secretion pattern is essentially set for childhood. Large pulses during deep sleep, minimal during waking hours. What changes now is behavior around sleep: toddler resistance, bedtime battles, night wakings. Each disruption isn't just a parenting challenge — it's a potential growth signal disruption. The good news: the system is resilient. Occasional bad nights don't matter. Chronic sleep problems do. If a 2-year-old consistently gets poor sleep, growth velocity will reflect it within months. Protect the sleep, protect the broadcast.",
        flow: 'Stable GH pattern → Sleep disruptions = broadcast disruptions → (Occasional fine; Chronic = growth impact)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Picky eating becomes a variable. The liver still needs protein to produce IGF-1.',
        explanation: "Welcome to toddler pickiness. The liver doesn't care about food preferences — it still needs amino acids to produce IGF-1. When a toddler refuses protein-rich foods, IGF-1 production drops. Studies show direct correlation between protein intake and growth velocity at this age. The strategic workaround: dairy is usually accepted, and it's highly effective at driving IGF-1. Milk, yogurt, cheese — these often survive picky phases. The system doesn't need perfect nutrition, just adequate protein from whatever sources the toddler will actually eat.",
        flow: "Protein intake → Liver → IGF-1 → (Picky eating = find protein they'll accept)",
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: "Growth velocity settles to ~3 inches/year. Quality of movement matters more than quantity.",
        explanation: "Growth rate normalizes to about 3 inches per year — the 'childhood cruising speed' that continues until puberty. At this pace, bone quality matters more than rapid elongation. The growth plates are still highly active but more focused on proper architecture than maximum speed. High-variety movement (running, jumping, climbing, dancing) provides the mechanical signals for well-structured bone. Sedentary toddlers who watch screens instead of moving miss these architectural inputs. The bones will still grow, but the structure won't be as optimized.",
        flow: 'Childhood growth rate → Varied movement → Mechanical signals → Well-structured bone',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-3',
    ageRange: '3 years',
    header: 'Age 3',
    subhead: 'Pre-school energy.',
    supportive: 'Endless energy is building endless structure. Keep fueling it.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'Sleep is the primary growth window. Bedtime creep is the main threat.',
        explanation: "Three-year-olds need 10-13 hours of sleep, with most GH released during the early night hours. The main challenge is 'bedtime creep' — gradually later bedtimes that don't seem harmful but accumulate. Moving bedtime from 7:30pm to 9pm shifts the GH window and can reduce total deep sleep. The hypothalamus releases GHRH on a schedule influenced by light exposure; later bedtimes plus morning schedules (daycare, preschool) can compress the sleep window. The system adapts, but chronically compressed sleep means chronically reduced GH pulses.",
        flow: 'Bedtime timing → Determines GH window → Later bedtime = compressed window → (Less deep sleep = less GH)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Dietary variety typically improves. More protein sources means more stable IGF-1.',
        explanation: "Most 3-year-olds expand their dietary acceptance somewhat. More foods means more protein sources, which means more consistent amino acid supply to the liver. IGF-1 production stabilizes when protein intake is steady rather than feast-or-famine. This is also when dietary habits start cementing — preferences formed now tend to persist. Building in protein-rich foods (eggs, dairy, meat) as regular staples ensures the growth factory has consistent raw materials. The liver averages inputs over days, not meals, so consistency beats perfection.",
        flow: 'Varied diet → Consistent amino acids → Stable IGF-1 production → Steady growth',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: "Active play drives bone strength. The 'loading' comes from normal childhood chaos.",
        explanation: "Preschoolers are in constant motion — running, jumping, falling, getting up. This isn't just energy expenditure; it's skeletal training. Every jump sends force through the growth plates. Every fall and recovery loads bones in unexpected directions, building resilience into the architecture. Preschool-aged children who engage in rough-and-tumble play have measurably denser bones than sedentary peers. The growth plates are building to specification, and the specification is written by movement. Protect play time like you protect sleep — it's building the skeleton.",
        flow: 'Active play → Multi-directional loading → Growth plates build resilient architecture',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-4',
    ageRange: '4 years',
    header: 'Age 4',
    subhead: 'Body awareness emerging.',
    supportive: "They're starting to understand their body. Great habits can start forming now.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'Sleep architecture matures. Deep sleep phases become more distinct and efficient.',
        explanation: "By 4, sleep architecture more closely resembles adult patterns. Slow-wave sleep (N3) — where most GH is released — becomes more concentrated in the early night. This is efficient: the system packs maximum GH release into the first sleep cycles. It also means the first few hours after falling asleep are disproportionately important. A child who falls asleep easily and sleeps deeply in those first hours gets more GH than one who takes an hour to settle or sleeps lightly. Sleep quality now rivals sleep quantity in importance.",
        flow: 'Mature sleep architecture → Concentrated N3 early → First hours = maximum GH release',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: "Growth steady state. Protein supports consistent IGF-1, but the system isn't demanding more yet.",
        explanation: "At 4, the GH-IGF axis is in cruise control. Nothing dramatic is happening — consistent inputs produce consistent outputs. This is actually an opportunity: it's a stable baseline to build good habits on. Children who eat adequate protein (0.95g/kg minimum, ideally higher) maintain strong IGF-1 levels. Children who subsist on refined carbs and minimal protein run lower. The difference may not be visible year-over-year, but it compounds. Good nutrition now is an investment in the pre-pubertal growth that matters most.",
        flow: 'Consistent protein → Consistent IGF-1 → Steady growth → (Compounding for later years)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Coordination improves. More complex movements provide more complex mechanical signals.',
        explanation: "Four-year-olds can skip, hop on one foot, throw, and catch. These coordinated movements load bones in more sophisticated patterns than toddler movement. Single-leg hopping, for instance, loads one leg at 2-3x body weight — a significant mechanical stimulus that bilateral activities can't match. Sports exposure begins for many children, introducing structured movement patterns. The growth plates respond to whatever signals they receive. Varied, challenging movement builds varied, resilient bone architecture. Repetitive limited movement builds limited architecture.",
        flow: 'Complex movement → Complex loading patterns → Growth plates build sophisticated architecture',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-5',
    ageRange: '5 years',
    header: 'Age 5',
    subhead: 'School-age transition.',
    supportive: 'Big changes in routine. Growth continues through the transition.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'School schedules can disrupt sleep patterns. Protecting sleep becomes an active task.',
        explanation: "Kindergarten introduces fixed wake times, often earlier than a 5-year-old's natural rhythm. If bedtime doesn't adjust accordingly, sleep gets compressed. The GH system doesn't care about school schedules — it needs adequate deep sleep to release growth hormone. Parents must now actively manage bedtime to protect the GH window. A 5-year-old needing 10-12 hours of sleep with a 6:30am wake-up needs to be asleep by 7:30pm. This feels early to many families, but the biology is non-negotiable. Protect the window or lose the pulses.",
        flow: 'Early wake time → Requires earlier bedtime → (If not adjusted = compressed GH window)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: "School food enters the picture. Home nutrition now competes with external influences.",
        explanation: "School meals and snacks introduce variables parents can't fully control. Cafeteria food, shared snacks, birthday treats — these affect the amino acid mix reaching the liver. The good news: the GH-IGF axis averages over time. A low-protein school lunch won't derail growth if breakfast and dinner deliver. Strategic anchoring — protein-rich breakfast and dinner at home — can buffer whatever happens during school hours. The system responds to total daily protein, not meal-by-meal protein. Home meals are the controllable lever.",
        flow: 'School food variability → Buffer with home meals → Total daily protein → Stable IGF-1',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Recess is skeletal training. Unstructured play provides essential mechanical variety.',
        explanation: "Recess isn't just a break from academics — it's structured chaos that builds bones. Running, climbing, hanging, jumping — these activities load the skeleton in ways that organized sports often don't. Growth plates respond best to varied, unpredictable mechanical signals. Playgrounds are essentially skeletal training equipment. Schools that reduce recess time are reducing growth stimulus. If school recess is limited, after-school active play becomes even more important. The bones need the signals regardless of whether school provides them.",
        flow: 'Recess = varied loading → Playground = training equipment → Growth plates respond to chaos',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-6',
    ageRange: '6 years',
    header: 'Age 6',
    subhead: 'Physical capabilities expanding.',
    supportive: 'They can do so much more now. Every new skill builds the body.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'Sleep needs decrease slightly. Quality over quantity becomes the theme.',
        explanation: "Six-year-olds need 9-12 hours of sleep — slightly less than younger children. But here's what matters: the proportion of deep sleep that contains GH pulses. A child who sleeps 10 restless hours gets less GH than one who sleeps 9 solid hours with good sleep architecture. Things that fragment sleep — screens before bed, sugar late in the day, inconsistent schedules — reduce sleep quality without reducing quantity. Measuring sleep in hours isn't enough; the depth and consistency of those hours determines GH output.",
        flow: "Sleep quality > quantity → Deep sleep phases = GH release → (Fragmented sleep = less GH despite 'enough' hours)",
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Physical activity increases protein needs. Growing muscles compete with growing bones for resources.',
        explanation: "Active 6-year-olds need more protein than sedentary ones — their muscles are growing and recovering alongside their bones. IGF-1 serves both purposes: bone elongation and muscle protein synthesis. When protein intake is marginal, the body prioritizes survival functions. Growth can slow before obvious deficiency symptoms appear. Children heavily involved in sports may need 1.0-1.2g/kg protein rather than baseline requirements. Watch for slowing growth velocity in very active children — it may signal nutritional insufficiency rather than genetic limit.",
        flow: 'High activity → Higher protein need → IGF-1 serves muscles + bones → (Marginal intake = prioritization)',
        citation: 'Rogol AD. J Clin Endocrinol Metab. 2002',
      },
      {
        title: 'How bones actually grow',
        intro: 'Organized sports begin for many. The type of sport affects skeletal development patterns.',
        explanation: "Many 6-year-olds start organized sports, and the type matters. Impact sports (gymnastics, soccer, basketball) provide superior bone-building stimulus compared to non-impact sports (swimming, cycling). This isn't about one being 'better' — it's about mechanical signaling. Growth plates respond to forces transmitted through bone. Swimming provides almost none. Running and jumping provide abundant signals. A child doing only swimming may have excellent cardiovascular fitness but suboptimal skeletal stimulus. For bone building, impact wins.",
        flow: 'Sport type → Impact vs. non-impact → Growth plate stimulus varies → (Impact sports = stronger signal)',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-7',
    ageRange: '7 years',
    header: 'Age 7',
    subhead: 'Pre-puberty begins approaching.',
    supportive: "The highest-leverage years are starting. You're in the optimal window.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'The GH system is mature and efficient. Lifestyle factors now determine output.',
        explanation: "At 7, the growth hormone machinery is fully developed. The hypothalamus, pituitary, and liver are all running at capacity. What varies now is entirely environmental: sleep timing, sleep quality, and insulin levels (from eating patterns). A 7-year-old with perfect sleep hygiene and no late-night eating will have GH output at the top of their genetic potential. One with chaotic sleep and bedtime snacks will run at the bottom. The hardware is identical; the software (habits) determines performance. This is high-leverage optimization territory.",
        flow: 'Mature system → Lifestyle = the variable → Sleep + no late eating → Maximum output',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'The JAK2-STAT5 pathway is maximally efficient. Protein intake directly controls IGF-1 levels.',
        explanation: "The liver's response to GH is at peak efficiency. There's no developmental limitation anymore — every GH pulse gets translated into IGF-1 proportional to available amino acids. This creates a clear dose-response: more dietary protein (up to a point) means more IGF-1 means faster growth. Studies show children at 1.2-1.5g/kg protein grow faster than those at minimum requirements. Dairy protein is particularly effective at raising IGF-1. The system is optimized; you're just adjusting the input dial now.",
        flow: 'Optimized pathway → Protein = dial → More protein → More IGF-1 → Faster growth',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth plates are fully responsive. This is when mechanical loading matters most.',
        explanation: "Growth plates at 7 are wide open and highly sensitive to both hormonal and mechanical signals. This is the golden window for bone building. High-impact activities — sprinting, jumping, gymnastics — create acute GH spikes of 450-771% above baseline while simultaneously loading the plates directly. The combination is powerful: elevated GH + mechanical signal = maximum plate response. Children who are active now build more bone than they could at any other age. Sedentary 7-year-olds miss an irreplaceable window.",
        flow: 'Open plates + high sensitivity → Impact activity → GH spike + mechanical signal → Maximum building',
        citation: 'Stokes KA. Sports Med. 2002',
      },
    ],
  },
  {
    id: 'pre-puberty',
    ageRange: 'Ages 8-11',
    header: 'Pre-Puberty',
    subhead: 'The highest-leverage window.',
    supportive: "You have time. This is the optimal window for growth optimization.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH is released primarily during deep sleep — about 70% of daily GH comes out in the first 3 hours after falling asleep.',
        explanation: "Think of your child's brain as having a 'growth broadcast' that only turns on during deep sleep. The hypothalamus sends a signal (GHRH) that tells the pituitary to release a big pulse of growth hormone. But here's the catch — if there's insulin in the bloodstream from a recent meal, it jams the signal. The broadcast gets blocked. That's why eating before bed can cut GH release by up to 80%. Morning sunlight sets the timer for when this broadcast happens — miss the light, and the whole schedule drifts.",
        flow: 'Morning light → Sets internal clock → Deep sleep triggers GH broadcast → (Insulin blocks it)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: "GH receptors are mature and efficient. The key now is making sure each GH pulse 'counts.'",
        explanation: "GH is the message, but your child's liver is the translator. When GH hits the liver, it flips a switch (JAK2-STAT5) that produces IGF-1 — the actual growth molecule that reaches bones and muscles. Protein is the raw material for this translation. Low protein = weak translation, even if GH is fine. Inflammation from junk food or excess body fat installs a 'dimmer switch' (called SOCS) that weakens the signal. This is why two kids with identical GH levels can grow at totally different rates.",
        flow: 'GH → Liver switch (JAK2-STAT5) → IGF-1 production → (Protein amplifies; Inflammation dims)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth plates are fully open and highly responsive. Activity type matters — impact loading signals bones to grow.',
        explanation: "Growth plates are like construction sites at the ends of bones. IGF-1 is the foreman telling workers (chondrocytes) to build. But there's a second signal: mechanical force. Every time your child jumps, sprints, or lands hard, sensors in the growth plate detect it and say 'we need more structure here.' That's why jumping and sprinting grow bones more than swimming or cycling — impact is information. The plates stay open until estrogen shows up and tells the workers to go home permanently. More body fat = more estrogen = earlier shutdown.",
        flow: 'IGF-1 + Impact → Growth plate builds → Estrogen eventually closes the site (fat accelerates this)',
        citation: 'Stokes KA. Sports Med. 2002; Nilsson O. Endocr Rev. 2005',
      },
    ],
  },
];

// Helper to get stage from age in months
function getStageFromAge(ageInMonths: number): string {
  if (ageInMonths < 0) return 'early-prenatal';
  if (ageInMonths < 3) return '0-3-months';
  if (ageInMonths < 6) return '3-6-months';
  if (ageInMonths < 12) return '6-12-months';
  if (ageInMonths < 18) return '12-18-months';
  if (ageInMonths < 24) return '18-24-months';
  if (ageInMonths < 36) return 'age-2';
  if (ageInMonths < 48) return 'age-3';
  if (ageInMonths < 60) return 'age-4';
  if (ageInMonths < 72) return 'age-5';
  if (ageInMonths < 84) return 'age-6';
  if (ageInMonths < 96) return 'age-7';
  return 'pre-puberty';
}

// Calculate age in months from birth date
function calculateAgeInMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  return months;
}

export default function StagePage() {
  const [currentStageId, setCurrentStageId] = useState<string>('pre-puberty');
  const [openSection, setOpenSection] = useState<number>(0);
  const [showStages, setShowStages] = useState(false);

  // Load child data and determine stage
  useEffect(() => {
    const childData = localStorage.getItem('child_data');
    if (childData) {
      try {
        const parsed = JSON.parse(childData);
        if (parsed.birthDate) {
          const ageInMonths = calculateAgeInMonths(parsed.birthDate);
          const stageId = getStageFromAge(ageInMonths);
          setCurrentStageId(stageId);
        }
      } catch (e) {
        // Use default stage
      }
    }
  }, []);

  const currentStage = allStages.find(s => s.id === currentStageId) || allStages[allStages.length - 1];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? -1 : index);
  };

  const handleStageSelect = (stageId: string) => {
    setCurrentStageId(stageId);
    setOpenSection(0);
    setShowStages(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stageLabels = [
    { id: 'early-prenatal', label: 'First & Second Trimester' },
    { id: 'late-prenatal', label: 'Third Trimester' },
    { id: '0-3-months', label: 'Newborn (0-3 months)' },
    { id: '3-6-months', label: '3-6 Months' },
    { id: '6-12-months', label: '6-12 Months' },
    { id: '12-18-months', label: '12-18 Months' },
    { id: '18-24-months', label: '18-24 Months' },
    { id: 'age-2', label: 'Age 2' },
    { id: 'age-3', label: 'Age 3' },
    { id: 'age-4', label: 'Age 4' },
    { id: 'age-5', label: 'Age 5' },
    { id: 'age-6', label: 'Age 6' },
    { id: 'age-7', label: 'Age 7' },
    { id: 'pre-puberty', label: 'Pre-Puberty (Ages 8-11)' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-forest hover:text-forest-dark transition-colors mb-8 sm:mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="text-sm text-gray-500 mb-2">{currentStage.ageRange}</div>
          <h1 className="font-display text-3xl sm:text-4xl text-gray-900 mb-3">
            {currentStage.header}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-3">
            {currentStage.subhead}
          </p>
          <p className="text-base text-forest font-medium">
            {currentStage.supportive}
          </p>
        </header>

        {/* Accordion */}
        <div className="space-y-4">
          {currentStage.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-forest/10 text-forest rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">
                    {index + 1}
                  </span>
                  <h2 className="font-semibold text-base sm:text-lg text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openSection === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === index && (
                <div className="px-5 sm:px-6 pb-6 sm:pb-8 pt-0">
                  <div className="pl-12 sm:pl-14 space-y-5">
                    {/* Intro */}
                    <p className="text-gray-900 font-medium text-sm sm:text-base leading-relaxed">
                      {section.intro}
                    </p>

                    {/* Explanation */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {section.explanation}
                    </p>

                    {/* Flow diagram */}
                    <div className="bg-forest/5 rounded-xl p-4 border border-forest/10">
                      <p className="text-forest text-sm font-mono leading-relaxed">
                        {section.flow}
                      </p>
                    </div>

                    {/* Citation */}
                    <p className="text-gray-400 text-sm italic">
                      [{section.citation}]
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* See all stages */}
        <div className="mt-8">
          <button
            onClick={() => setShowStages(!showStages)}
            className="flex items-center gap-2 text-forest hover:text-forest-dark transition-colors font-medium"
          >
            <span>See all stages →</span>
            <svg
              className={`w-4 h-4 transition-transform ${showStages ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showStages && (
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
              <div className="space-y-1">
                {stageLabels.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(stage.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      currentStageId === stage.id
                        ? 'bg-forest/10 text-forest'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${currentStageId === stage.id ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={`font-medium text-sm ${currentStageId === stage.id ? 'text-forest' : ''}`}>
                      {stage.label}
                    </span>
                    {currentStageId === stage.id && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">
                        Current
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic mt-4 pt-3 border-t border-gray-100">
                More stages coming soon...
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-forest rounded-2xl text-white text-center">
          <h3 className="font-display text-xl sm:text-2xl mb-3">
            The window is open now.
          </h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Every day matters during this stage. The protocol is designed to maximize every opportunity.
          </p>
          <Link
            href="/protocol"
            className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-xl font-semibold hover:bg-cream transition-colors"
          >
            View the Protocol
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
