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
        explanation: "Here's something fascinating: your baby will eventually depend on growth hormone for height, but right now growth hormone is almost irrelevant. The pituitary gland — the pea-sized structure that will eventually produce growth hormone — is literally forming from a small pouch of cells called Rathke's pouch. By week 8, the basic architecture exists. By week 20, it starts producing tiny amounts of growth hormone. But fetal growth runs on a completely different system: insulin-like growth factor 2 and insulin. Think of growth hormone as hardware being installed for later use — the software running current growth is insulin-like growth factor 2, controlled almost entirely by nutrient supply from you. This is why maternal nutrition matters so profoundly in the first two trimesters. You're not just feeding a baby; you're programming the efficiency of a hormone system that will operate for the next 18 years.",
        flow: "Pituitary forming from Rathke's pouch → Growth hormone hardware installing → Current growth runs on insulin-like growth factor 2 and insulin → Maternal nutrition programs future hormone efficiency",
        citation: 'Gluckman PD. Endocr Rev. 1995',
      },
      {
        title: 'How those signals reach the body',
        intro: "Growth hormone receptors are being installed throughout your baby's body. Your nutrition determines antenna quality.",
        explanation: "Your baby's cells are building growth hormone receptors — think of these as antennas that will receive growth signals after birth. The density and sensitivity of these receptors is being programmed right now based on the uterine environment. Omega-3 fatty acids, especially docosahexaenoic acid, incorporate into cell membranes and affect receptor function for life. Adequate protein provides amino acids for receptor protein synthesis. But here's the critical insight: endocrine-disrupting chemicals can permanently scramble this calibration. Bisphenol A from plastics, glyphosate from non-organic produce, pesticides, phthalates from fragrances, parabens from skincare — these compounds mimic or interfere with hormone signaling during the exact window when receptors are being calibrated. A receptor system calibrated in a clean environment will respond efficiently to growth hormone for 18 years. One calibrated amid endocrine disruptors may be permanently less sensitive. The womb environment programs the child.",
        flow: 'Growth hormone receptors installing → Docosahexaenoic acid builds quality membranes → Endocrine-disrupting chemicals scramble calibration → Clean environment = efficient receptors for life',
        citation: 'Hill DJ. Pediatr Res. 1998',
      },
      {
        title: 'How bones actually grow',
        intro: "Bones aren't bones yet — they're cartilage scaffolds being sculpted. The growth plates that will determine adult height are being established now.",
        explanation: "Your baby's skeleton begins as mesenchymal stem cells that condense and differentiate into chondrocytes — the specialized cells that form cartilage. These chondrocytes create cartilage 'models' of every bone in the body. By the end of the second trimester, primary ossification centers appear — spots where cartilage begins mineralizing into actual bone. More importantly, the growth plates (epiphyseal plates) that will drive all future height gain are being established. These plates contain zones of cells at different stages: resting, proliferating, hypertrophying, and mineralizing. The organizational template being laid down now determines how efficiently these plates will function for the next 15-18 years. Folate supports the massive cell division. Choline is critical for cell membrane synthesis. Adequate protein provides the amino acids for collagen matrix. Calcium and phosphorus begin the mineralization process. Deficiencies here don't just affect current growth — they program the efficiency of the growth plate machinery itself.",
        flow: 'Mesenchymal stem cells → Chondrocytes → Cartilage models → Ossification centers form → Growth plate template established → Maternal nutrients determine machinery efficiency',
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
        intro: "Your baby's growth hormone system is coming online. The hypothalamus is learning to send signals.",
        explanation: "In the third trimester, something remarkable happens: your baby's brain starts rehearsing the growth hormone broadcast it will run for the next two decades. The hypothalamus — the master control center — is learning to produce growth hormone-releasing hormone and somatostatin, the accelerator and brake pedals for growth hormone secretion. The pituitary gland is maturing its somatotroph cells, which will manufacture growth hormone. By week 30, your baby is producing real growth hormone pulses, though they're not yet driving growth (that's still insulin-like growth factor 2's job). Think of this as a dress rehearsal. The quality of this rehearsal depends heavily on one factor: maternal stress. Cortisol crosses the placenta freely. Chronic maternal stress creates chronically elevated fetal cortisol, which directly suppresses hypothalamic growth hormone-releasing hormone neurons. It's like static on the line during installation — the system still gets built, but the signal patterns are noisier, less efficient. Calm maternal environment equals clean wiring. Stressed environment equals compromised baseline.",
        flow: 'Hypothalamus learning growth hormone-releasing hormone production → Pituitary somatotrophs maturing → Dress rehearsal for lifetime broadcast → Maternal cortisol crosses placenta → Chronic stress creates static during installation',
        citation: 'Gluckman PD. Endocr Rev. 1995',
      },
      {
        title: 'How those signals reach the body',
        intro: "Growth hormone receptors are finalizing their calibration. This is the last chance to optimize antenna sensitivity.",
        explanation: "The growth hormone receptors your baby has been building are now entering final calibration. When growth hormone binds these receptors after birth, it triggers the JAK2-STAT5 signaling cascade that produces insulin-like growth factor 1 — the actual growth molecule. The sensitivity of this entire pathway is being programmed now. Docosahexaenoic acid continues to matter enormously — it incorporates into receptor membranes and affects signal transduction efficiency. Zinc is essential: it's a cofactor for over 300 enzymes including those involved in growth hormone receptor signaling. Zinc deficiency during this window can permanently reduce receptor sensitivity. Iodine supports thyroid hormone production, and thyroid hormones work synergistically with growth hormone — they're required for normal growth hormone receptor expression. Meanwhile, endocrine-disrupting chemicals continue to pose a threat. Your baby's liver is now producing sex hormone-binding globulin and beginning to process hormones — exposures to xenoestrogens during this window can affect these systems permanently. Every meal, every product you put on your skin, every plastic container matters.",
        flow: 'Receptors in final calibration → Docosahexaenoic acid optimizes membranes → Zinc enables receptor signaling → Iodine supports thyroid-growth hormone synergy → Xenoestrogens threaten permanent disruption',
        citation: 'Hill DJ. Pediatr Res. 1998',
      },
      {
        title: 'How bones actually grow',
        intro: "Growth plates are maturing. The template for 18 years of growth is being finalized.",
        explanation: "Your baby's growth plates are transitioning from rough templates to functional machinery. The columnar organization of chondrocyte zones — resting, proliferative, hypertrophic — is solidifying. This organization determines how efficiently the plates will respond to growth hormone and insulin-like growth factor 1 after birth. The extracellular matrix is being laid down: type II collagen, aggrecan, and other proteoglycans that form the scaffold chondrocytes will build upon. Calcium transfer across the placenta accelerates dramatically in the third trimester — your baby is mineralizing bone rapidly, and you need approximately 1,200 milligrams of calcium daily to keep up without depleting your own bones. Vitamin D is critical: it regulates calcium absorption and transport, and maternal vitamin D status directly predicts infant bone mineral content at birth. Vitamin K2 activates osteocalcin, the protein that binds calcium into bone matrix — without adequate K2, calcium may not reach the skeleton efficiently. The raw materials you provide now become the foundation your child builds upon for two decades.",
        flow: 'Growth plate zones organizing → Extracellular matrix forming → Calcium transfer accelerating → Vitamin D enables absorption → Vitamin K2 activates bone mineralization → Foundation for 18 years of building',
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
        intro: "The growth hormone system just went live, but it hasn't learned day from night yet.",
        explanation: "Your newborn's growth hormone system has switched from rehearsal to performance — but it's performing without a script. Unlike older children who release 70% of their growth hormone during nighttime sleep, your newborn's hypothalamus fires growth hormone-releasing hormone pulses randomly throughout 24 hours. This seems chaotic, but it's actually perfect engineering. A newborn sleeps 16-17 hours in fragmented bursts with no consolidated nighttime. Tying growth hormone to 'night' would make no sense. Instead, feeding becomes the primary trigger. Every time your baby feeds, amino acids — particularly arginine and lysine from breast milk or formula — stimulate growth hormone release directly. Each feed is a growth signal. This is why frequent feeding matters beyond just calories: you're triggering growth hormone pulses 8-12 times per day. The circadian pattern will develop over the first 3-6 months as the suprachiasmatic nucleus matures and light exposure trains the internal clock. For now, feed frequently and let the baby sleep whenever they want. Every sleep period and every feeding is building.",
        flow: 'Growth hormone system live but unpatterned → Feeding triggers growth hormone via amino acids → 8-12 pulses daily from frequent feeds → Circadian organization develops over months → Feed frequently, sleep on demand',
        citation: 'Giustina A. Endocr Rev. 1998',
      },
      {
        title: 'How those signals reach the body',
        intro: "The liver is coming online as the insulin-like growth factor 1 factory. Breast milk provides backup growth factors.",
        explanation: "Your newborn's liver is learning its lifelong job as the body's primary insulin-like growth factor 1 factory. When growth hormone binds liver receptors, it triggers the JAK2-STAT5 cascade, which activates insulin-like growth factor 1 gene transcription. But the system is immature — output is variable and lower than it will be later. Here's where breast milk performs a remarkable feat: it contains insulin-like growth factor 1, insulin-like growth factor 2, epidermal growth factor, and other growth factors that survive the infant gut and enter circulation directly. Colostrum in the first days is especially concentrated with these factors — it's essentially a growth factor delivery system disguised as food. Think of breast milk as supplemental support while your baby's own factory ramps up. The combination of endogenous production plus milk-borne growth factors drives the rapid growth of early infancy. For formula-fed infants, the system relies entirely on endogenous production, making protein quality and adequate feeding volume even more critical.",
        flow: 'Liver learning insulin-like growth factor 1 production → JAK2-STAT5 pathway immature but functional → Breast milk delivers backup insulin-like growth factor 1 directly → Colostrum especially concentrated → Combined endogenous plus exogenous growth factors drive rapid growth',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: "Growth plates are running at maximum velocity. This is the fastest growth rate of your child's entire life.",
        explanation: "Newborn growth plates are operating at a speed they will never match again. Your baby may grow 10 inches in the first year — roughly 1 inch per month in the early months, slowing slightly toward the end. Here's what's happening at the cellular level: chondrocytes in the proliferative zone are dividing rapidly, then entering the hypertrophic zone where they enlarge dramatically — sometimes increasing cell volume by 10-fold. This hypertrophy actually contributes more to bone length than cell division itself. The enlarged chondrocytes then undergo apoptosis and are replaced by bone through endochondral ossification. Calcium and phosphorus are being deposited at tremendous rates. Vitamin D is the gatekeeper: it unlocks intestinal calcium absorption. Newborns are often born with low vitamin D stores depending on maternal status during pregnancy, which is why supplementation is typically recommended from birth (400 international units daily). Vitamin K2 continues to matter — it activates the osteocalcin that binds calcium into bone matrix. Without these nutrients, the assembly line has workers but no materials.",
        flow: 'Chondrocytes dividing then hypertrophying 10-fold → Hypertrophy drives length more than division → Apoptosis then ossification → Calcium deposition at maximum rate → Vitamin D unlocks absorption → Vitamin K2 activates binding → 1 inch per month',
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
        intro: 'The circadian system is beginning to organize. Sleep is starting to matter differently.',
        explanation: "Around 3-4 months, something shifts in your baby's brain. The suprachiasmatic nucleus — the master circadian clock — is maturing and beginning to respond to light-dark cycles. Your baby starts consolidating sleep into longer stretches, and the growth hormone system notices. Pulses during sleep become slightly larger than daytime pulses — the first hints of the adult-like pattern where nighttime sleep dominates growth hormone release. But feeding still triggers significant pulses. Think of this as a transition period: the random-fire newborn pattern is giving way to organized circadian rhythm, but the system is running both programs simultaneously. This is why both sleep consolidation AND frequent feeding support growth at this stage — you're feeding two patterns at once. Morning light exposure accelerates the circadian organization. Dim evenings help establish melatonin rhythm. The suprachiasmatic nucleus is trainable, and the training you provide now determines how efficiently the growth hormone broadcast synchronizes to sleep for the next 18 years.",
        flow: 'Suprachiasmatic nucleus maturing → Light-dark training circadian clock → Sleep pulses growing larger → Feeding pulses still active → Both patterns running simultaneously → Morning light accelerates organization',
        citation: 'Giustina A. Endocr Rev. 1998',
      },
      {
        title: 'How those signals reach the body',
        intro: "The liver's insulin-like growth factor 1 factory is stabilizing. Protein quality directly controls output.",
        explanation: "By now, your baby's liver is running more consistently as an insulin-like growth factor 1 factory. The JAK2-STAT5 pathway is maturing — when growth hormone arrives, the response is more predictable. Here's where the science gets precise: the liver needs amino acids to manufacture insulin-like growth factor 1, and specific amino acids matter more than others. Arginine, lysine, and methionine are particularly potent stimulators of both growth hormone release and insulin-like growth factor 1 synthesis. Breast milk contains these in optimal ratios. Formula varies. The relationship becomes clearer at this stage: more high-quality protein equals more insulin-like growth factor 1 equals faster growth. Studies show formula-fed infants with higher protein content grow faster, though there's a sweet spot — excess protein may accelerate maturation long-term. The liver is also developing its ability to produce insulin-like growth factor binding proteins, which regulate how much insulin-like growth factor 1 is 'free' to act on tissues. The system is calibrating. Consistent, high-quality nutrition keeps calibration optimal.",
        flow: 'Liver stabilizing → JAK2-STAT5 pathway maturing → Arginine, lysine, methionine drive production → Breast milk optimal ratios → Insulin-like growth factor binding proteins developing → Consistent nutrition calibrates system',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth velocity remains rapid. Tummy time and early movement are programming skeletal architecture.',
        explanation: "Growth plates maintain extraordinary activity — your baby is still gaining roughly half an inch to one inch per month. But something new is happening: mechanical signals are beginning to influence bone development. Tummy time isn't just a motor milestone — it's the first real loading your baby's skeleton experiences. When your baby pushes up, force transmits through the arm bones, and chondrocytes in the growth plates detect this via mechanoreceptors. These cells respond by modifying proliferation and matrix synthesis in ways that optimize bone architecture for the forces they experience. This is called mechanotransduction, and it's already operational. Babies who spend more time in varied positions — tummy time, supported sitting, reaching — send more diverse mechanical signals to their developing skeleton. Those confined to bouncers and car seats miss this input. The skeleton is asking 'what forces will I need to handle?' and movement provides the answer. Vitamin D and K2 continue to matter critically — calcium is still being deposited at tremendous rates. Every building block you provide becomes permanent structure.",
        flow: 'Growth plates highly active → Tummy time introduces mechanical loading → Chondrocyte mechanoreceptors detect force → Mechanotransduction modifies growth → Varied positions diversify signals → Skeleton programming to match demands',
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
        intro: 'The circadian pattern is locking in. Nighttime growth hormone pulses now dominate.',
        explanation: "By 6 months, your baby's circadian system has largely organized. The suprachiasmatic nucleus is trained, melatonin rhythm is established, and growth hormone secretion now follows a clear pattern: large pulses during deep sleep (especially in the first few hours after falling asleep), minimal during daytime. This is the adult-like pattern that will continue for the next 18 years. The transition has profound implications: sleep quality now matters enormously for growth. Disrupted sleep — from teething, illness, schedule chaos, or simply inconsistent routines — directly disrupts growth hormone pulses. The system is trainable but also vulnerable to detraining. Consistent sleep schedules reinforce strong circadian rhythm. Inconsistent schedules keep the system unstable. A baby who sleeps at the same times daily develops stronger, more reliable growth hormone pulses than one with chaotic scheduling. You're not just managing sleep for rest — you're training the broadcast schedule for a decade and a half of growth.",
        flow: 'Circadian system organized → Melatonin rhythm established → Growth hormone locked to deep sleep → Consistency strengthens pattern → Chaos destabilizes it → Sleep schedule is broadcast training',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Solid foods add protein diversity. The liver responds to new amino acid sources.',
        explanation: "The introduction of solid foods changes the growth equation. Breast milk or formula still provides baseline nutrition, but now direct dietary protein enters the picture. The liver's insulin-like growth factor 1 production responds to total protein intake from all sources — and responds robustly. First foods matter strategically: protein-rich options like pureed meats (beef, chicken, lamb), egg yolks, and full-fat dairy provide concentrated amino acids that directly support insulin-like growth factor 1 synthesis. Iron becomes critical at this stage — iron deficiency impairs growth through multiple mechanisms including reduced insulin-like growth factor 1 production and impaired oxygen delivery to rapidly dividing cells. Zinc also matters: it's required for growth hormone receptor signaling and insulin-like growth factor 1 synthesis. Red meat provides both iron and zinc in highly bioavailable forms. The outdated advice to start with rice cereal was biochemically backwards — the liver needs protein and minerals, not refined carbohydrates. Feed what builds.",
        flow: 'Solid foods begin → Liver responds to dietary protein → Meats, egg yolks, dairy provide amino acids → Iron critical for insulin-like growth factor 1 and cell division → Zinc enables growth hormone signaling → Protein-first, not cereal-first',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Crawling and standing introduce vertical loading. The skeleton is learning what forces it must handle.',
        explanation: "Growth velocity slows from the frenetic newborn pace but remains substantial — roughly 4-5 inches in this six-month window. What changes dramatically is mechanical input. Crawling loads the arms, wrists, and shoulders in new ways. Pulling to stand introduces vertical compression through the spine and legs for the first time. Standing, even briefly, sends force straight through the femurs, tibias, and spine. Growth plate chondrocytes detect these forces via integrins and ion channels, triggering intracellular signaling cascades that modify gene expression. The bones literally remodel in response to the forces they experience. This is Wolff's Law in action: bone adapts to the loads placed upon it. Babies who crawl and stand earlier send mechanical signals earlier. Those delayed in motor milestones have delayed skeletal programming — not catastrophically, but measurably. The skeleton is asking 'what am I built for?' and every movement provides data. Encourage movement. Avoid containment. Let gravity teach the bones what they need to become.",
        flow: "Crawling loads upper body → Standing introduces vertical compression → Chondrocyte mechanoreceptors signal → Gene expression modified → Wolff's Law operational → Movement teaches skeleton its purpose",
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
        intro: 'The circadian growth hormone pattern is now mature. Sleep quality directly determines growth velocity.',
        explanation: "By 12 months, your child's growth hormone secretion system operates like an adult's — just at higher intensity. The hypothalamus releases growth hormone-releasing hormone in response to deep sleep, the pituitary responds with large pulses, and 70% of daily growth hormone output occurs in the first few hours after falling asleep. The pattern is locked. What varies now is execution. Sleep quality determines whether your child captures the full growth hormone broadcast or only partial signal. Toddlers who fall asleep easily and stay asleep get complete pulses. Those who fight bedtime, wake frequently, or sleep in chaotic schedules get fragmented, incomplete pulses. Research shows direct correlation between sleep quality and growth velocity at this age — independent of nutrition. A toddler sleeping 12-14 hours in consistent, consolidated blocks will grow measurably faster than one sleeping the same total hours in fragmented, irregular patterns. The broadcast is mature. Show up for it consistently.",
        flow: 'Circadian pattern mature → 70% of growth hormone in first hours of sleep → Sleep quality determines capture → Consistent schedule strengthens signal → Fragmented sleep wastes broadcast → 12-14 hours in solid blocks',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Whole milk becomes a growth accelerator. The protein-insulin-like growth factor 1 connection is fully operational.',
        explanation: "At 12 months, whole cow's milk typically enters the diet, and research reveals it as a potent growth lever. Milk protein — particularly casein and whey — stimulates insulin-like growth factor 1 production more effectively than equivalent protein from other sources. Danish studies demonstrate clear dose-response: more milk consumption correlates with higher insulin-like growth factor 1 and faster growth. The mechanism involves both direct amino acid effects on the liver and bioactive peptides in milk that may enhance growth hormone signaling. Two to two-and-a-half cups (16-20 ounces) daily provides optimal support without the excess associated with faster maturation. Beyond protein, milk delivers calcium, phosphorus, and iodine — all critical for bone building and thyroid function. The liver's insulin-like growth factor 1 factory is now fully operational. Protein intake directly sets production levels. This is the age where nutrition choices visibly affect growth velocity. The machinery is ready. The fuel determines output.",
        flow: 'Whole milk enters diet → Casein and whey potently stimulate insulin-like growth factor 1 → Dose-response demonstrated → 2-2.5 cups daily optimal → Calcium, phosphorus, iodine also delivered → Liver at full capacity → Protein sets production ceiling',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Walking introduces repetitive impact loading. Growth plates respond to every step.',
        explanation: "Walking is a biomechanical revolution. For the first time, your child's full body weight transmits through the legs with every single step, creating repetitive impact that growth plates have never experienced. Each footfall sends force through the calcaneus, tibia, femur, and spine. Chondrocytes in growth plates detect this via mechanosensitive ion channels, triggering calcium influx that activates signaling cascades modifying proliferation and matrix synthesis. This is beyond tummy time — this is sustained, repetitive mechanical instruction. The skeleton is receiving constant 'build stronger here' signals with every step. Research shows that delays in walking can affect leg bone development — not catastrophically, but measurably. The signal is binary: walking or not walking, steps or no steps. Once walking begins, more steps equals more signal. Let your toddler walk everywhere. Avoid strollers when possible. Avoid carrying when they can walk. Every step is a building instruction. Every step is data the skeleton uses to construct itself.",
        flow: 'Walking begins → Full body weight through legs with each step → Impact activates mechanosensitive channels → Calcium influx triggers signaling → Chondrocytes modify gene expression → More steps equals more signal → Walk everywhere',
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
    id: 'age-8',
    ageRange: '8 years',
    header: 'Age 8',
    subhead: 'Deep in the optimal window.',
    supportive: 'This is prime time. Small consistent actions compound here.',
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'The GH broadcast is fully mature. What you control now is signal strength.',
        explanation: "At 8, the growth hormone system has been running at full capacity for a year. The hypothalamus knows exactly when to fire GHRH, the pituitary responds on cue, and the pattern is locked to deep sleep. What separates high-output kids from low-output kids is entirely environmental. Three things control signal strength: when they fall asleep (earlier = catches more deep sleep cycles), how deeply they sleep (fragmented sleep = weaker pulses), and whether insulin is competing (food before bed = jammed signal). An 8-year-old sleeping 9pm-6am with no bedtime snack is running at maximum broadcast power. Move bedtime to 10:30pm with a bowl of cereal at 9pm, and you've cut GH output significantly — same hardware, worse software.",
        flow: 'Sleep timing + Sleep depth + No late insulin → Maximum GH pulses → (Any disruption = reduced output)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'The liver is a finely tuned IGF-1 factory. Protein is the throttle.',
        explanation: "By 8, the JAK2-STAT5 signaling cascade operates at peak efficiency. When GH lands on liver receptors, the response is immediate and proportional — more GH signal in, more IGF-1 out. But here's the bottleneck: the liver needs amino acids to manufacture IGF-1. Think of protein as the raw material and GH as the work order. A big work order with no materials produces nothing. Studies at this age show clear dose-response: children consuming 1.2-1.5g/kg protein daily have measurably higher IGF-1 levels than those at minimum requirements. Dairy protein is particularly potent — milk essentially comes with a built-in IGF-1 amplifier. The system is waiting for inputs. Feed it.",
        flow: 'GH arrives → JAK2-STAT5 fires → Liver needs amino acids → Protein intake = IGF-1 output',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth plates are wide open and highly sensitive. Impact activities send powerful growth signals.',
        explanation: "At 8, the epiphyseal plates are in their most responsive state. Chondrocytes are primed to receive both hormonal signals (IGF-1) and physical signals from movement. When your child jumps, sprints, or lands from height, tiny microfractures form in the growth plate cartilage. This sounds alarming but it's actually the growth stimulus — the body responds by building back stronger and longer. The key is what happens immediately after: stretching while the bones are in repair mode encourages them to heal in an elongated position. Follow impact activities with 5-10 minutes of stretching, then milk mixed with honey — the protein and calcium support the repair process while the natural sugars help shuttle nutrients to the healing tissue. Swimming and cycling don't create this effect — only activities where feet hit ground.",
        flow: 'Jumping/sprinting → Microfractures form → Stretching during repair → Bones heal elongated → Milk + honey delivers materials',
        citation: 'Stokes KA. Sports Med. 2002',
      },
    ],
  },
  {
    id: 'age-9',
    ageRange: '9 years',
    header: 'Age 9',
    subhead: 'Prime optimization territory.',
    supportive: "You're right in the sweet spot. Everything you do now matters.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'Sleep is under siege from homework, screens, and social schedules. Each late night has a cost.',
        explanation: "Nine-year-olds face increasing pressure on sleep from multiple directions: later homework, more screen time, social activities, and the cultural drift toward 'older kid' bedtimes. The biology doesn't care about any of this. The GH broadcast still happens during deep sleep in the early night hours, and it still requires adequate total sleep to complete all cycles. Every 30-minute delay in bedtime compresses the window. A 9-year-old who 'should' sleep 9-11 hours but actually sleeps 8 hours with a 10pm bedtime is losing 1-2 GH pulse cycles nightly. Over months, this compounds into measurable growth velocity differences. The social pressure to stay up later is biological sabotage disguised as maturity.",
        flow: 'Later bedtime → Compressed sleep window → Fewer complete GH cycles → (Cumulative growth impact)',
        citation: 'Van Cauter E. JAMA. 2000',
      },
      {
        title: 'How those signals reach the body',
        intro: 'IGF-1 production is running at capacity. Inflammation is the main threat to efficiency.',
        explanation: "The GH-to-IGF-1 conversion pathway is fully optimized at 9. The only things that can reduce efficiency are inflammation and insulin resistance — and both are increasingly common in modern kids. Processed foods, excess sugar, and sedentary behavior create low-grade chronic inflammation. The body responds by upregulating SOCS proteins (suppressors of cytokine signaling), which literally install a dimmer switch on the JAK2-STAT5 pathway. Two 9-year-olds with identical GH levels can have vastly different IGF-1 output based on inflammatory status. The child eating whole foods and moving regularly runs at full brightness. The one subsisting on processed snacks runs dimmed. Same hardware, different metabolic environment.",
        flow: 'GH → JAK2-STAT5 → IGF-1 → (Inflammation installs SOCS dimmer → Reduced output despite normal GH)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth plates respond to variety. Different movements teach bones to grow in different ways.',
        explanation: "At 9, many children specialize in single sports year-round. From a skeletal development perspective, this is suboptimal. Growth plates adapt to the physical signals they receive — but they adapt specifically to those signals only. A child who only plays soccer develops bone architecture optimized for running and kicking. A child who only swims gets almost no growth plate stimulation at all (no impact). Multi-sport kids or those with varied activities — jumping, climbing, sprinting, hanging — send diverse signals to their growth plates. The skeleton is asking 'what do you need me to do?' and variety gives a complete answer. After any high-impact play session, stretching for 5-10 minutes followed by milk with honey helps bones repair in their lengthened state.",
        flow: 'Varied activities → Multiple growth signals → Comprehensive plate stimulation → Stretching + milk/honey → Elongated healing',
        citation: 'Gunter K. Bone. 2008',
      },
    ],
  },
  {
    id: 'age-10',
    ageRange: '10 years',
    header: 'Age 10',
    subhead: 'The pre-puberty peak.',
    supportive: "Maximum leverage before puberty. You're doing this at exactly the right time.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'For some children, puberty hormones are beginning to stir. This amplifies GH — if sleep is protected.',
        explanation: "Around age 10, especially in girls, the first hormonal whispers of puberty may begin. The hypothalamus starts releasing small pulses of GnRH (gonadotropin-releasing hormone), which eventually triggers sex hormone production. Here's what matters for growth: estrogen (even in tiny amounts) amplifies GH secretion. The pre-pubertal GH surge is beginning. But — and this is critical — this amplified GH is still released during sleep. A 10-year-old entering early puberty with excellent sleep habits will ride a wave of elevated GH. One with poor sleep habits will miss it. The stakes are rising precisely when sleep is most contested by social and academic pressures.",
        flow: 'Early puberty signals → GH amplification begins → Still sleep-gated → (Good sleep = ride the wave; Poor sleep = miss it)',
        citation: 'Martha PM Jr. J Clin Endocrinol Metab. 1992',
      },
      {
        title: 'How those signals reach the body',
        intro: 'Body composition starts to matter more. Excess fat creates resistance to growth signals.',
        explanation: "At 10, the relationship between body fat and growth signaling becomes more consequential. Adipose tissue isn't passive storage — it's metabolically active. Fat cells produce inflammatory cytokines that upregulate SOCS proteins, dimming the JAK2-STAT5 pathway. Fat cells also contain aromatase, an enzyme that converts androgens to estrogen. More fat = more circulating estrogen = earlier maturation signaling. This creates a double penalty: GH signaling efficiency drops while puberty timing accelerates. Children who enter puberty early grow faster initially but stop sooner — the growth plates receive shutdown signals earlier. Maintaining healthy body composition at 10 isn't about aesthetics; it's about extending the growth window.",
        flow: 'Excess fat → Inflammation + Aromatase → Reduced GH efficiency + Earlier puberty signaling → Shorter growth window',
        citation: 'Veldhuis JD. J Clin Endocrinol. 1995',
      },
      {
        title: 'How bones actually grow',
        intro: 'The sprint-and-stretch protocol becomes highly effective. Short bursts followed by elongation.',
        explanation: "At 10, children can effectively execute the growth protocol that research supports: sprint intervals followed immediately by stretching. Here's how it works — 6 all-out sprints of 30 seconds each (with rest between) triggers a massive GH spike through lactate accumulation. The sprinting also creates beneficial microfractures in growth plate cartilage. Immediately after, 10 minutes of full-body stretching — especially hanging, toe touches, and spinal lengthening — keeps the body in an elongated position while those microfractures begin healing. The bones repair themselves in whatever position they're held in. Finish with milk mixed with honey: the casein protein and calcium provide building materials, while honey's natural sugars help transport nutrients to the repair sites. This protocol takes 30 minutes and outperforms hours of moderate activity.",
        flow: 'Sprint intervals → GH spike + Microfractures → Immediate stretching → Elongated healing position → Milk + honey delivers materials',
        citation: 'Stokes KA. Sports Med. 2002',
      },
    ],
  },
  {
    id: 'age-11',
    ageRange: '11 years',
    header: 'Age 11',
    subhead: 'The transition approaches.',
    supportive: "Puberty is near for many. You've built a strong foundation.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'Puberty is amplifying GH secretion. This is the beginning of the growth spurt.',
        explanation: "By 11, most girls and many boys show early pubertal signs. The hypothalamic-pituitary-gonadal axis is activating, and sex hormones are beginning to rise. Estrogen — present in both sexes, though higher in girls — has a direct amplifying effect on GH secretion. The pituitary releases larger GH pulses; the hypothalamus becomes more sensitive to GHRH. GH output can increase 2-3x from pre-pubertal baseline. This is the biological ramp into the growth spurt. But the fundamentals remain: GH is still released during sleep, following the same circadian rules. An 11-year-old capturing this amplified signal with solid sleep will grow faster than ever. One losing sleep to screens and social pressures will squander the surge.",
        flow: 'Puberty activating → Estrogen amplifies GH → Larger sleep pulses → (Must still sleep to capture them)',
        citation: 'Martha PM Jr. J Clin Endocrinol Metab. 1992',
      },
      {
        title: 'How those signals reach the body',
        intro: 'IGF-1 levels are climbing toward lifetime peaks. Nutrition demands are increasing.',
        explanation: "As GH secretion rises, so does IGF-1 production — the liver is translating the amplified signal into amplified output. IGF-1 levels at 11 may be 50-100% higher than at age 7. But this elevated production requires elevated raw materials. Protein needs increase; caloric needs increase. Children who continue eating like 8-year-olds while their bodies demand more will see IGF-1 production limited by substrate availability, not by hormonal signal. Appetite often increases naturally — this is biological, not behavioral. Resisting it or restricting it limits growth. The system is ramping up production; it needs matching inputs to actually produce.",
        flow: 'Amplified GH → Higher IGF-1 demand → Needs more protein and calories → (Undereating = production ceiling)',
        citation: 'Rogol AD. J Clin Endocrinol Metab. 2002',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth plates are entering their final high-activity phase. Every month of movement counts.',
        explanation: "At 11, especially in girls, growth plate biology shifts. The plates remain highly active — this is peak growth velocity for many girls — but the countdown to closure has begun. Estrogen receptors in the growth plate are increasingly occupied, and with each month of pubertal progression, the signal toward closure strengthens. The plates aren't closing yet, but the process that will close them is now underway. This makes the next 2-4 years a defined window rather than an indefinite opportunity. Jumping, sprinting, climbing, hanging — followed by stretching and milk with honey — maximizes what the plates can build before they close. Every active day is a building day. Every sedentary day is a missed opportunity that won't come back.",
        flow: 'Puberty advancing → Closure clock started → Plates still open → Impact + Stretch + Milk/honey → Maximize remaining window',
        citation: 'Nilsson O. Endocr Rev. 2005',
      },
    ],
  },
  {
    id: 'age-12',
    ageRange: '12 years',
    header: 'Age 12',
    subhead: 'Puberty in full swing.',
    supportive: "The growth sprint is happening. You're supporting it at the right time.",
    sections: [
      {
        title: 'How growth signals are made',
        intro: 'GH secretion is at or near lifetime peak. This is maximum broadcast power.',
        explanation: "At 12, most children are solidly in puberty, and GH secretion has reached its zenith. The combination of pubertal sex hormones amplifying the hypothalamic-pituitary axis produces GH pulses larger than at any other life stage. A 12-year-old may secrete 2-3x more GH per day than they did at 8, and 5-10x more than they will at 30. This is the biological sprint. The growth spurt — that dramatic 3-4+ inches per year — is driven by this hormonal surge. But the fundamentals remain: GH is still released during deep sleep. Sleep deprivation during puberty — increasingly common with social media, gaming, and academic pressure — directly truncates peak GH output. Protecting sleep at 12 isn't about rest; it's about capturing a once-in-a-lifetime hormonal peak.",
        flow: 'Pubertal amplification → Maximum GH pulses → Still sleep-dependent → (Sleep deprivation = wasting the peak)',
        citation: 'Martha PM Jr. J Clin Endocrinol Metab. 1992',
      },
      {
        title: 'How those signals reach the body',
        intro: 'IGF-1 reaches lifetime highs. The liver is running at maximum capacity.',
        explanation: "With GH at peak levels, IGF-1 production follows. Serum IGF-1 at 12 may be the highest it will ever be — some children exceed adult reference ranges during this phase. The liver's JAK2-STAT5 machinery is running at full capacity, converting every GH pulse into IGF-1 output. The rate-limiting factor is purely nutritional: adequate protein, adequate calories, adequate micronutrients (especially zinc and vitamin D). Appetite increases significantly — a 12-year-old may eat like a small adult. This isn't overeating; it's the body demanding resources for rapid construction. Restricting food during the pubertal growth spurt directly limits height. Feed the system. It's building as fast as it can.",
        flow: 'Peak GH → Peak IGF-1 potential → Needs maximum nutritional input → (Restriction = building slowdown)',
        citation: 'Hoppe C. Am J Clin Nutr. 2004',
      },
      {
        title: 'How bones actually grow',
        intro: 'Growth velocity peaks for many. Plates are highly active but the closure countdown continues.',
        explanation: "At 12, girls often hit peak height velocity — the fastest growth rate of their lives. Boys typically peak 1-2 years later. The growth plates are working at maximum speed: chondrocytes proliferating rapidly, enlarging dramatically, and being replaced by bone at the fastest rate since infancy. But here's the tension: the same estrogen that amplifies GH is also advancing the closure timeline. Every month of rapid growth is also a month closer to fusion. For girls, the majority of adult height is typically achieved by 14-15. For boys, 16-18. The window is finite and shrinking. Active movement — sprinting, jumping, climbing, playing — followed by stretching and milk with honey remains the protocol. No weights, no gym equipment. Just natural movement, elongation during repair, and the nutrients to build. Sedentary 12-year-olds are watching their window narrow while sitting still.",
        flow: 'Peak velocity → Maximum plate activity → Estrogen advancing closure → Impact + Stretch + Milk/honey → Build before closure',
        citation: 'Nilsson O. Endocr Rev. 2005',
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
  if (ageInMonths < 108) return 'age-8';
  if (ageInMonths < 120) return 'age-9';
  if (ageInMonths < 132) return 'age-10';
  if (ageInMonths < 144) return 'age-11';
  return 'age-12';
}

// Calculate age in months from birth date
function calculateAgeInMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  return months;
}

export default function StagePage() {
  const [currentStageId, setCurrentStageId] = useState<string>('age-8');
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
    { id: 'age-8', label: 'Age 8' },
    { id: 'age-9', label: 'Age 9' },
    { id: 'age-10', label: 'Age 10' },
    { id: 'age-11', label: 'Age 11' },
    { id: 'age-12', label: 'Age 12' },
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
