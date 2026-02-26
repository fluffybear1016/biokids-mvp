'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';
import { MovementHomeTab } from '@/components/HomeTabs';

export default function PhysicalActivityWindow() {
  const [child, setChild] = useState<Child | null>(null);
  const [ageInMonths, setAgeInMonths] = useState(96); // Default 8 years
  const [activeTab, setActiveTab] = useState<'home' | 'levers' | 'sprint' | 'athletes' | 'science'>('home');
  const [expandedLever, setExpandedLever] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [expandedJam, setExpandedJam] = useState<string | null>(null);

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

  // Movement levers data
  const movementLevers = [
    {
      id: "l1", rank: 1,
      title: "Sprints — the #1 GH trigger",
      subtitle: `30-sec all-out × ${ageInYears < 13 ? "4-6" : "6"} reps, ${ageInYears < 13 ? "2-3" : "1-2"}×/week. 771% GH spike.`,
      color: "forest",
      content: "High-intensity anaerobic effort triggers massive GH release through lactate accumulation and neural activation. Lactate is a direct GH secretagogue — higher lactate = higher GH. Sprinting recruits fast-twitch muscle fibers which drive GH response. Short intense bouts far exceed long moderate exercise. Sprinting builds incredible strength and power WITHOUT weights — the Jamaican model proves sprint work alone creates phenomenal strength.",
      extra: "Pre-sprint: 2 eggs + unroasted peanuts + coconut oil. Eggs = choline primes pituitary. Peanuts = niacin suppresses FFA brake. Coconut oil = quick fuel, extends GH window 4 hours.\n\nPost-sprint (within 30 min): 1 cup A2 milk + 1 tsp raw honey. Milk amino acids + gentle insulin = liver converts GH → IGF-1. Without this the GH pulse is \"orphaned.\" Sprint in the sun for vitamin D. Then stretch 10 min immediately.",
      timing: "Afternoon/early evening. Empty stomach or 2+ hrs after meal. NOT before bed.",
      citations: [
        { text: "Stokes KA et al. Sports Med. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12468657" },
        { text: "Pritzlaff CJ et al. J Appl Physiol. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/10694568" },
      ]
    },
    {
      id: "l2", rank: 2,
      title: "Jumping and impact — daily",
      subtitle: "Basketball, soccer, jump rope, box jumps, Masai jumps, hopscotch. 10-15 min minimum.",
      color: "forest",
      content: "Jump training significantly increased femur length, tibia length, bone weight, and femur diameter in both young and old rats (Dennis Raney). Impact creates ground-reaction forces 2-4× body weight, triggering mechanotransduction — osteocytes detect force and signal osteoblasts to increase bone mineral deposition. Also creates beneficial microfractures in growth plate cartilage — the body rebuilds longer and stronger.",
      extra: "Types: Jump rope (30-60s × 10-15), box jumps, broad jumps (3-5 sets of 8-10), bunny hops, two-footed reach jumps, Masai-style vertical jumps (tall, straight, minimal knee bend), hopscotch, jumping off low steps, trampoline play.\n\nCritical window: Ages 3-5 are critical — children who jump regularly develop significantly higher bone mineral density that persists into adulthood.",
      timing: "Daily during active play. Follow immediately with 10 min stretching.",
      citations: [
        { text: "Gunter KB et al. Bone. 2008", url: "https://pubmed.ncbi.nlm.nih.gov/18022390" },
        { text: "McKay HA et al. J Bone Miner Res. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15666169" },
      ]
    },
    {
      id: "l3", rank: 3,
      title: "Multi-sport — resist early specialization",
      subtitle: "Multiple sports through age 12-14. Soccer, swimming, gymnastics, handball.",
      color: "forest",
      content: "Serbian youth play multiple sports, developing footwork, court vision, and coordination. Jokic played soccer extensively as a child, developed footwork before basketball, didn't specialize until teenage years. Wembanyama (7'4\") focused on chess, reading, varied skills — no weights, no early specialization. Coordination MUST be developed before strength. 3+ hours daily of varied physical activity rewires the cerebellum during the critical window.",
      extra: "The American problem: Early specialization pressure (often by age 8), single-sport year-round focus, travel teams from young ages → overuse injuries, burnout, high dropout rates. America has 47× more people than Serbia but Serbia wins per-capita decisively.\n\nTeach the game: Watch sports together and discuss strategy. Ask \"what would you do?\" Value assists, not just points. Celebrate team success. Allow unstructured play.",
      timing: "No single-sport focus until teenage years. Diverse movement from toddler through age 14.",
      citations: [
        { text: "Myer GD et al. Sports Med. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/26010965" },
        { text: "Jayanthi NA et al. Sports Health. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23060525" },
      ]
    },
    {
      id: "l4", rank: 4,
      title: "Stretching — daily, age-appropriate",
      subtitle: "Growth plates are sensitive to tension forces. Flexibility optimizes bone elongation.",
      color: "forest",
      content: "Tight muscles (especially hip flexors and hamstrings) affect posture and place uneven pressure on the spine. Spinal compression reduces measured height by up to an inch throughout the day. Fascia can create imbalances affecting bone development — gentle stretching maintains fascial mobility so muscles and bones grow in harmony. Light stretching before bed improves sleep quality and enhances nighttime GH surge.",
      extra: "Morning stretches are especially valuable — after sleep, spinal discs are maximally hydrated and spine is at its longest.\n\nBy age: Toddlers = play-based \"animal walks,\" reaching for toys. Preschoolers = cat-cow, child's pose, cobra. School-age = structured 5-10 min daily. ALL ages: never force — should feel good, not painful.",
      timing: "Morning (maintain overnight spinal length) + evening (before bed for GH). 5-10 min daily.",
      citations: [
        { text: "Behm DG et al. Appl Physiol Nutr Metab. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/26642915" },
        { text: "Bandy WD et al. Phys Ther. 1997", url: "https://pubmed.ncbi.nlm.nih.gov/9057784" },
      ]
    },
    {
      id: "l5", rank: 5,
      title: "5 stretches that add inches — do ≥3 daily",
      subtitle: "Hanging, cat, cobra, fascia stretch, inversion. ~1 inch in a few months.",
      color: "amber",
      content: "1. Hanging on pull-up bar — dead hangs 30-60 sec × multiple sets. Progress to weighted (ankle weights 10-30 lbs). Flutter kicks while hanging for posterior chain.\n\n2. The cat stretch — hands and knees, round back up, then arch down.\n\n3. The cobra stretch — prone, push chest up, decompress lower back and spine.\n\n4. The ultimate fascia stretch — full body elongation targeting fascia chains.\n\n5. Inversion table stretch — 60-90° angle, 1-5 min per set, multiple times daily.",
      extra: "Inflatable cushion under back for 10 minutes showed 2.766mm to 7.66mm height gain (Dennis Raney). Additional: standing table holds, \"sky stretch,\" \"downhill stretch\" 30-min regimes. Resistance bands for shin/femur stretches (20-30 sec holds). Cycling with seat raised ¼-½ inch every 1-2 weeks for tensile stress.",
      timing: "At least 3 of these 5 daily. Morning + evening. Consistent daily practice.",
      citations: [
        { text: "Nachemson AL et al. Spine. 1981", url: "https://pubmed.ncbi.nlm.nih.gov/7280837" },
        { text: "Healey EL et al. Man Ther. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22427016" },
      ]
    },
    {
      id: "l6", rank: 6,
      title: "Stretch immediately after impact",
      subtitle: "10 min stretching after sprints/jumps. Microfractures heal in elongated position.",
      color: "coral",
      content: "Impact creates microfractures. These heal in whatever position the bone is held. Stretching during repair encourages healing in an elongated position — this IS the actual growth mechanism from exercise. Follow with milk + honey — casein protein and calcium provide building materials while honey shuttles nutrients to repair sites.",
      extra: "Tensile loading after impact: hanging from bars, resistance bands for 10-20 min. Repeat 3-5×/week with 1-2 rest days for healing.",
      timing: "Immediately after every sprint or jumping session. Don't skip this — it's where the growth happens.",
      citations: [
        { text: "Witvrouw E et al. Am J Sports Med. 2003", url: "https://pubmed.ncbi.nlm.nih.gov/14523308" },
        { text: "Best TM et al. Med Sci Sports Exerc. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/9624957" },
      ]
    },
    {
      id: "l7", rank: 7,
      title: "Posture correction — 10 min, 3× daily",
      subtitle: "Wall angels, chin tucks, thoracic extension. +0.5-1cm from decompression alone.",
      color: "blue",
      content: "Can yield 0.5-1+ cm height by decompressing intervertebral discs and correcting forward head posture and kyphosis. Posture compounds visual tallness 2-4cm via thoracic mobility. Gravity compresses spine ~1cm daily — posture work reverses this.",
      extra: "Exercises: Wall angels (3×10 reps), chin tucks (3×15 reps), thoracic extension over foam roller (2 min), spinal alignment drills.",
      timing: "10 minutes, 3× daily. Morning, midday, evening.",
      citations: [
        { text: "Grob D et al. Eur Spine J. 2007", url: "https://pubmed.ncbi.nlm.nih.gov/17454085" },
        { text: "Yip CHT et al. Arch Phys Med Rehabil. 2008", url: "https://pubmed.ncbi.nlm.nih.gov/18270354" },
      ]
    },
    {
      id: "l8", rank: 8,
      title: "Active play — 3+ hours daily",
      subtitle: "Tag, chase, climbing, playground. Movement as play, not training.",
      color: "brown",
      content: "3+ hours daily of physical activity — climbing, chasing, jumping, running, ball handling — rewires the cerebellum during the critical motor development window. Children naturally sprint during play. Jamaican children run to school, chase animals, do community races — it doesn't feel like \"exercise.\"",
      extra: "Make movement joyful, not anxiety-driven. Encourage confidence and swagger, not fear-based pressure. Protect development time — don't overschedule. Let children be bored and self-direct. Guard sleep aggressively.",
      timing: "Every day. Outdoor, unstructured, self-directed. Screens are the enemy of movement.",
      citations: [
        { text: "Janssen I et al. Int J Behav Nutr Phys Act. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20459784" },
        { text: "Strong WB et al. J Pediatr. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15741266" },
      ]
    },
    {
      id: "l9", rank: 9,
      title: "Swimming — zero compression elongation",
      subtitle: "Full body loading + stretching + spinal decompression.",
      color: "purple",
      content: "Zero compression on growth plates. Full-body elongation under resistance. Develops coordination across all planes of movement. Focus on elongation over compression.",
      extra: "",
      timing: "Regular swimming sessions. Great complement to sprinting and jumping.",
      citations: [
        { text: "Lauer J et al. Sports Biomech. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28753858" },
        { text: "Gomes LH et al. J Sports Sci. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25710177" },
      ]
    },
    {
      id: "l10", rank: 10,
      title: "Rest days — growth happens during recovery",
      subtitle: "1-2 rest days per week. 3:1 hard-to-easy pattern. Never train through fatigue.",
      color: "coral",
      content: "Growth happens during recovery, not during exercise. Overtraining raises chronic cortisol which directly suppresses GH. The sprint triggers the signal — rest is when the body builds. GH releases in pulses during deep sleep and post-exercise recovery.",
      extra: "",
      timing: "3-5 training days, 1-2 full rest days per week. Jamaican 3:1 hard-to-easy pattern.",
      citations: [
        { text: "Kreher JB et al. Sports Health. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22561651" },
        { text: "Meeusen R et al. Med Sci Sports Exerc. 2013", url: "https://pubmed.ncbi.nlm.nih.gov/23247672" },
      ]
    },
    {
      id: "l11", rank: 11,
      title: "No weights until age 19 — absolute earliest",
      subtitle: "Sprint + plyometrics + bodyweight = all the stimulus needed. Zero compression risk.",
      color: "gray",
      content: "Compressive forces on open growth plates can cause damage. Sprinting gives equal or greater GH stimulus (771% vs 300-500%) with zero compression. Body weight exercises, pull-ups, push-ups are fine.",
      extra: "Athletes who avoided weights during development: Jamaican HS sprinters (sub-10s by 17-18), Manning brothers (both 6'5\", no weights until college sophomore year), Kevin Durant (6'10\", NBA MVP), Wembanyama (7'4\", generational talent), Michael Jordan (6'6\", grew 4 inches after HS, hung from bars), Dirk Nowitzki (7'0\", mentor banned weights).\n\nPattern: No compression during development + sprint/skill work = height and coordination preserved, power climbs, stronger pound-for-pound than peers who lifted early.",
      timing: "No barbell work until 19 at the absolute earliest. Body weight + sprints + skills = everything needed.",
      citations: [
        { text: "Caine D et al. Sports Med. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16796396" },
        { text: "Micheli LJ et al. Am J Sports Med. 1988", url: "https://pubmed.ncbi.nlm.nih.gov/3057592" },
      ]
    },
  ];

  // Sprint protocols by age
  const sprintProtocols = [
    {
      title: "Play-Based (all ages)",
      color: "forest",
      active: ageInYears < 8,
      content: "Tag games, races with siblings/friends, chase games, hill sprints as play. Chasing animals, running to school, community races. Multiple short bursts throughout the day — make it fun, not forced. The Jamaican childhood: children sprint from the moment they can run.",
      citations: [
        { text: "Pellegrini AD et al. Child Dev. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16942539" },
        { text: "Burdette HL et al. Pediatrics. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15585429" },
      ]
    },
    {
      title: `Structured (ages 8-12)${ageInYears >= 8 && ageInYears <= 12 ? " ← your child" : ""}`,
      color: "amber",
      active: ageInYears >= 8 && ageInYears <= 12,
      content: "4-6 sprints of 20-40 meters. Full effort 90-100%. 2-4 minutes rest between. 2-3 sessions per week. On grass, track, or field. Still incorporate play-based sprinting alongside.",
      citations: [
        { text: "Lloyd RS et al. Br J Sports Med. 2014", url: "https://pubmed.ncbi.nlm.nih.gov/24532151" },
        { text: "Moran J et al. Sports Med. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28253289" },
      ]
    },
    {
      title: `Advanced (ages 13+)${ageInYears >= 13 ? " ← your child" : ""}`,
      color: "coral",
      active: ageInYears >= 13,
      content: "6×30-second all-out sprints. 4 minutes rest between. This IS the 771% GH protocol (Stokes KA. Sports Med. 2002). 1-2× per week maximum. Wingate-style cycling sprints as alternative: 30 sec all-out with 4 min rest.",
      citations: [
        { text: "Stokes KA et al. Sports Med. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12468657" },
        { text: "Wahl P et al. J Strength Cond Res. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20217459" },
      ]
    },
  ];

  // Sprint nutrition stack
  const sprintStack = [
    {
      phase: "PRE-SPRINT",
      emoji: "🥚",
      color: "forest",
      items: [
        "2 eggs — choline → acetylcholine → pituitary primed for max GH amplitude",
        "Unroasted peanuts — niacin → FFA suppression, removes secondary GH brake",
        "Coconut oil 1g/kg — quick fuel + extends GH window up to 4 hours",
      ]
    },
    {
      phase: "SPRINT",
      emoji: "🏃",
      color: "amber",
      items: [
        "All-out effort, 30 seconds — don't pace it",
        "Full rest between (4 min) — DO NOT short-change rest",
        "In the sun when possible — vitamin D synthesis",
      ]
    },
    {
      phase: "POST-SPRINT (within 30 min)",
      emoji: "🥛",
      color: "coral",
      items: [
        "1 cup A2 milk + 1 tsp raw honey",
        "Milk amino acids + honey's gentle insulin = STAT5 > AKT → liver converts GH → IGF-1",
        "Without this, the GH pulse is \"orphaned\" — present but wasted",
      ]
    },
    {
      phase: "IMMEDIATELY AFTER",
      emoji: "🧘",
      color: "purple",
      items: [
        "10 minutes stretching — microfractures heal in elongated position",
        "Hanging from bars + resistance band stretches for tensile loading",
      ]
    },
  ];

  // Sprint vs Weights comparison
  const sprintVsWeights = [
    ["GH Boost", "771-2,000%", "300-500%"],
    ["Growth Plate Safety", "Safe — no compression", "Risk — compression"],
    ["Natural Movement", "Yes", "No"],
    ["Age Appropriate", "All ages", "Only after 19"],
    ["Equipment", "None", "Gym required"],
    ["Fun for Kids", "Games & races", "Often boring"],
    ["Jamaican Model", "Primary method", "Avoided entirely"],
  ];

  // Case studies
  const caseStudies = [
    {
      id: "jamaica",
      icon: "🇯🇲",
      title: "Jamaica — Why a Tiny Island Dominates Sprinting",
      color: "forest",
      content: `3 million people produce 70-80% of top global 100m times. Usain Bolt (fastest human in history), Shelly-Ann Fraser-Pryce, Elaine Thompson-Herah.

THREE PILLARS:
1. Genetic predisposition — ACTN3/ACE variants for fast-twitch fibers, West African descent. But West Africa doesn't dominate sprinting — proving genetics alone are insufficient.
2. Rural hardships — no cars, walk and run everywhere, chasing goats creates natural explosive sprint play, physical resilience from outdoor demanding lifestyle instead of screens.
3. CHAMPS — hyper-competitive national school meet, 30,000+ spectators, TV coverage. National identity tied to sprinting. Entire communities know who the fast kids are.

DIET: Yams (massive complex carbs, daily staple), plantains (potassium), ackee (protein + healthy fats), fish (omega-3, iodine), chicken. Far more nutrient-dense than American fast food. Minimal processed foods.

TRAINING: NO weight training until after growth plates close. Coaches like Stephen Francis report minimal gym time until closure. Hill sprints, intensive tempos, acceleration work, speed endurance, technical drills, plyometrics. Track volume 4-5 days/week. Sprint work alone creates phenomenal strength.

LIFESTYLE: Tight community parenting. Faith networks. Bolt-style swagger encouraged — not fear-based pressure. Kids build elite confidence early. Outdoor active days, minimal screens, early bedtimes, natural circadian alignment.`,
      citations: [
        { text: "Irving RA et al. Genes (Basel). 2018", url: "https://pubmed.ncbi.nlm.nih.gov/30047773" },
        { text: "Scott RA et al. Med Sci Sports Exerc. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19648898" },
      ]
    },
    {
      id: "serbia",
      icon: "🇷🇸",
      title: "Serbia — Basketball Dominance from 7 Million People",
      color: "blue",
      content: `7 million people competing head-to-head with Team USA. Jokic, multiple NBA players.

MULTI-SPORT: Kids enter academies at 6-10 playing soccer/handball first for coordination, then positionless basketball emphasizing passing/IQ. Jokic played soccer extensively, developed footwork before basketball, didn't specialize until teenage years.

DIET: Grilled meats (ćevapi, pljeskavica), fermented dairy (kajmak, sir), fresh milk/cheese from small-scale farming with less pesticide exposure. Home-cooked meals. Average male ~182cm with many 6'8"+ athletes.

CULTURE: Yugoslav legacy — everyone shoots/dribbles, team-first, mental toughness. Tight-knit families enforce early bedtimes (9-10pm), outdoor play, low screen time.

THE LESSON: America has 47× more people, more courts, coaches, academies, AAU teams. Serbia has cleaner food, better development philosophy, and patience. Serbia wins per-capita decisively.`,
      citations: [
        { text: "Popovic S et al. Int J Morphol. 2017", url: "https://pubmed.ncbi.nlm.nih.gov/28070254" },
        { text: "Tucker LA et al. Am J Health Promot. 2015", url: "https://pubmed.ncbi.nlm.nih.gov/25365561" },
      ]
    },
    {
      id: "nowts",
      icon: "🏅",
      title: "The No-Weights Hall of Fame",
      color: "amber",
      content: `DIRK NOWITZKI (7'0"): Mentor Holger Geschwindner BANNED weights. Used saxophone for rhythm, fencing for coordination, reading for focus, physics for shot mechanics. Goal: develop a complete human. Created a 7-footer who moves like a guard.

VICTOR WEMBANYAMA (7'4"): No weights. Chess, reading, varied skills. French system overloads tall kids with guard skills early. Coordination before strength.

KEVIN DURANT (6'10"): No weights during development. Preserved elite coordination. NBA MVP.

MICHAEL JORDAN (6'6"): Hung from bars, avoided weights. Grew 4 inches after high school. GOAT.

ELI & PEYTON MANNING (both 6'5"): No weights until sophomore year of college. Both elite NFL QBs.

JAMAICAN HS SPRINTERS: No weights until growth plate closure. Sub-10s by 17-18.

SHARED PATTERN: No compression during growth → height and coordination preserved → eventual strength superior to those who lifted early.`,
      citations: [
        { text: "Caine D et al. Sports Med. 2006", url: "https://pubmed.ncbi.nlm.nih.gov/16796396" },
        { text: "Faigenbaum AD et al. Pediatrics. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/19620931" },
      ]
    },
    {
      id: "france",
      icon: "🇫🇷",
      title: "France — Basketball Development Philosophy",
      color: "purple",
      content: `Emphasizes skill development over physicality. Teaches guard skills to tall players early. Doesn't rely on weight training during growth. Focuses on coordination and movement quality. High-rep skill drills induce BDNF expression. Overloads tall kids with guard skill reps. Coordination must be developed BEFORE strength. 3+ hours daily of physical activity during youth.`,
      citations: [
        { text: "Vaeyens R et al. Sports Med. 2008", url: "https://pubmed.ncbi.nlm.nih.gov/18712939" },
        { text: "Moesch K et al. Eur J Sport Sci. 2012", url: "https://pubmed.ncbi.nlm.nih.gov/22408271" },
      ]
    },
  ];

  // Jamaican method phases
  const jamaicanMethod = [
    {
      id: "jam-gpp",
      title: "Early Phase / GPP (September-March)",
      subtitle: "High-volume intensive tempo on grass",
      color: "forest",
      content: "8×300m at 38-39s with 5 min rest, or 12×200m with 3 min rest. Total: ~2000-2500m per session, 2× per week. Plus: short sprints (20-30m), hill sprints, technical drills (A-skips, high knees, arm mechanics). 4 hard days per week, running in flats until around February on varied surfaces."
    },
    {
      id: "jam-peak",
      title: "Peak Competition Phase (April-August)",
      subtitle: "Volume drops, intensity peaks",
      color: "amber",
      content: "Volume drops to ~1000m per session. Recoveries lengthen to 7-15 min for max-velocity, 20-30 min for speed endurance. Acceleration (10×40m), flying sprints (30-60m), speed endurance (250-300m). Women do ~20% less volume. 3:1 hard-to-easy week pattern. No low-intensity runs over 20 minutes to preserve fast-twitch fibers."
    },
    {
      id: "jam-result",
      title: "The Result",
      subtitle: "Sub-10-second 100m by age 17-18. No weights.",
      color: "forest",
      content: "Massive strength built through sprinting, hills, plyometrics, and tempo. No weights at all. Height and coordination preserved. Athletes end up stronger pound-for-pound than peers who lifted heavily during growth years. Preserved speed and fluidity — no bulk-driven slowing."
    },
  ];

  // Citations
  const citations = [
    "Stokes KA. Sports Med. 2002 — Sprint protocol 771% GH increase",
    "Gunter KB. Bone. 2008 — Jumping and bone mineral density in children",
    "Weeks BK. Osteoporos Int. 2008 — Impact loading and bone development",
    "McKay HA. J Bone Miner Res. 2005 — Jumping intervention bone gains",
    "Nachemson AL. Spine. 1981 — Spinal decompression from hanging",
    "Malina RM. Growth, Maturation, and Physical Activity. 2004",
    "Janssen I. Int J Behav Nutr. 2010 — Active play sustainability",
    "Dennis Raney — Jump training effects on femur/tibia length and diameter",
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-forest mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <header className="bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-8 sm:p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[120px] sm:text-[150px] opacity-15">🏃</div>
          <div className="flex justify-between items-start mb-5 relative">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Movement Window</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-300 rounded-full" />
              Optimal
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4 relative">Movement</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-xl relative">
            High-intensity exercise triggers GH spikes up to 771%. Impact activities stimulate growth plates. Sprinting builds elite power without weights.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/20">
            <div>
              <span className="font-display text-3xl sm:text-4xl">771%</span>
              <span className="text-sm text-white/80 block sm:inline sm:ml-2">GH from sprints</span>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl">6×30s</span>
              <span className="text-sm text-white/80 block sm:inline sm:ml-2">sprint protocol</span>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl">0 lbs</span>
              <span className="text-sm text-white/80 block sm:inline sm:ml-2">weights needed</span>
            </div>
          </div>
        </header>

        {/* Age-based recommendations bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap items-center gap-3 sm:gap-6">
          <span className="text-sm font-semibold text-gray-600">
            {child ? `${child.name}'s protocol` : 'Age-based protocol'}:
          </span>
          <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full font-medium">
            Age {Math.floor(ageInYears)}
          </span>
          <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full font-medium">
            {ageInYears < 8 ? "Play-based sprints" : ageInYears <= 12 ? "Structured 4-6 reps" : "Advanced 6×30s"}
          </span>
          <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full font-medium">
            {ageInYears < 13 ? "2-3×/week" : "1-2×/week"}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-0">
          {[
            { id: 'home', label: 'Home' },
            { id: 'levers', label: 'Levers' },
            { id: 'sprint', label: 'Sprint' },
            { id: 'athletes', label: 'Athletes' },
            { id: 'science', label: 'Science' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all flex-1 sm:flex-initial ${
                activeTab === tab.id
                  ? 'bg-white text-forest shadow-sm'
                  : 'bg-cream-dark text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═══ TAB: HOME ═══ */}
        {activeTab === 'home' && (
          <div className="bg-white rounded-b-3xl rounded-tr-3xl p-6 sm:p-8 shadow-sm">
            <MovementHomeTab age={Math.floor(ageInMonths / 12)} />
          </div>
        )}

        {/* ═══ TAB: LEVERS ═══ */}
        {activeTab === 'levers' && (
          <div className="bg-white rounded-b-3xl rounded-tr-3xl p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl text-gray-900 mb-1">Movement Levers</h2>
              <p className="text-sm text-gray-500">Ranked by impact on height and development. Do #1 first.</p>
            </div>

            <div className="space-y-3">
              {movementLevers.map((lever, i) => {
                const isExpanded = expandedLever === lever.id;
                return (
                  <div key={lever.id}>
                    <button
                      onClick={() => setExpandedLever(isExpanded ? null : lever.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isExpanded ? 'bg-forest/5 border-forest/20' : 'bg-cream border-cream hover:border-forest/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          lever.rank <= 3 ? 'bg-forest' : lever.rank <= 6 ? 'bg-forest/80' : 'bg-forest/60'
                        }`}>
                          {lever.rank}
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{lever.title}</div>
                          <div className="text-sm text-gray-500 mt-0.5">{lever.subtitle}</div>
                        </div>
                        <span className="text-forest text-sm">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 bg-forest/5 rounded-b-xl -mt-2 border border-t-0 border-forest/20">
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">{lever.content}</p>
                        {lever.extra && (
                          <p className="text-sm text-gray-600 leading-relaxed mb-3 whitespace-pre-line">{lever.extra}</p>
                        )}
                        <div className="text-sm bg-forest/10 text-forest px-3 py-2 rounded-lg font-medium">
                          Timing: {lever.timing}
                        </div>
                        {lever.citations && (
                          <div className="mt-3 bg-stone-50 rounded-lg p-3 font-mono">
                            <p className="text-[10px] text-stone-500 font-medium mb-1">Peer-reviewed:</p>
                            {lever.citations.map((c: { text: string; url: string }, ci: number) => (
                              <a key={ci} href={c.url} target="_blank" rel="noopener noreferrer"
                                className="block text-[10px] text-emerald-700 underline pl-2 border-l-2 border-emerald-200 mb-1 hover:text-emerald-900">
                                {c.text}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Never section */}
            <div className="mt-8 bg-coral-light rounded-2xl p-6">
              <div className="text-sm font-bold text-coral uppercase tracking-wider mb-4">Never</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Weight lifting before age 19",
                  "Long slow cardio (>20 min kills fast-twitch)",
                  "Sedentary lifestyle",
                  "Overtraining without rest days",
                  "Single-sport before age 14",
                  "Training through illness/fatigue",
                  "Screens over outdoor play",
                  "Fear-based coaching",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-coral font-bold">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB: SPRINT ═══ */}
        {activeTab === 'sprint' && (
          <div className="bg-white rounded-b-3xl rounded-tr-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl text-gray-900 mb-6">Sprint Protocol</h2>

            {/* Age-appropriate protocols */}
            <div className="space-y-3 mb-8">
              {sprintProtocols.map((p, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    p.active ? 'bg-forest/5 border-forest' : 'bg-cream border-transparent'
                  }`}
                >
                  <div className={`font-semibold mb-2 ${p.active ? 'text-forest' : 'text-gray-500'}`}>
                    {p.title}
                  </div>
                  <div className={`text-sm leading-relaxed ${p.active ? 'text-gray-700' : 'text-gray-400'}`}>
                    {p.content}
                  </div>
                  {p.citations && (
                    <div className="mt-3 bg-stone-50 rounded-lg p-3 font-mono">
                      <p className="text-[10px] text-stone-500 font-medium mb-1">Peer-reviewed:</p>
                      {p.citations.map((c: { text: string; url: string }, ci: number) => (
                        <a key={ci} href={c.url} target="_blank" rel="noopener noreferrer"
                          className="block text-[10px] text-emerald-700 underline pl-2 border-l-2 border-emerald-200 mb-1 hover:text-emerald-900">
                          {c.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* The Stack */}
            <h3 className="font-display text-lg text-gray-900 mb-4 pb-2 border-b-2 border-forest/20">The Sprint Nutrition Stack</h3>
            <div className="space-y-3 mb-8">
              {sprintStack.map((s, i) => (
                <div key={i} className={`rounded-xl p-4 ${
                  s.color === 'forest' ? 'bg-forest/5' :
                  s.color === 'amber' ? 'bg-amber/5' :
                  s.color === 'coral' ? 'bg-coral-light' :
                  'bg-purple-50'
                }`}>
                  <div className={`font-semibold text-sm mb-2 ${
                    s.color === 'forest' ? 'text-forest' :
                    s.color === 'amber' ? 'text-amber' :
                    s.color === 'coral' ? 'text-coral' :
                    'text-purple-600'
                  }`}>
                    {s.emoji} {s.phase}
                  </div>
                  {s.items.map((item, ii) => (
                    <div key={ii} className="text-sm text-gray-700 leading-relaxed pl-2">• {item}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Sprint vs Weights */}
            <h3 className="font-display text-lg text-gray-900 mb-4 pb-2 border-b-2 border-forest/20">Sprint vs Weight Lifting</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest/5">
                    <th className="p-3 text-left font-bold">Factor</th>
                    <th className="p-3 text-center text-forest font-bold">Sprinting</th>
                    <th className="p-3 text-center text-coral font-bold">Weights</th>
                  </tr>
                </thead>
                <tbody>
                  {sprintVsWeights.map(([factor, sprint, weight], i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="p-3 font-medium">{factor}</td>
                      <td className="p-3 text-center text-forest">{sprint}</td>
                      <td className="p-3 text-center text-coral">{weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Jamaican Method */}
            <h3 className="font-display text-lg text-gray-900 mb-4 pb-2 border-b-2 border-forest/20">The Jamaican High School Method</h3>
            <div className="space-y-2">
              {jamaicanMethod.map((phase) => {
                const isExpanded = expandedJam === phase.id;
                return (
                  <div key={phase.id}>
                    <button
                      onClick={() => setExpandedJam(isExpanded ? null : phase.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isExpanded ? 'bg-forest/5 border-forest/20' : 'bg-cream border-cream hover:border-forest/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{phase.title}</div>
                          <div className="text-sm text-gray-500">{phase.subtitle}</div>
                        </div>
                        <span className="text-forest text-sm">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 bg-forest/5 rounded-b-xl -mt-2 border border-t-0 border-forest/20">
                        <p className="text-sm text-gray-700 leading-relaxed">{phase.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ TAB: ATHLETES ═══ */}
        {activeTab === 'athletes' && (
          <div className="bg-white rounded-b-3xl rounded-tr-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl text-gray-900 mb-2">Case Studies</h2>
            <p className="text-sm text-gray-500 mb-6">Real athletes and cultures that prove these principles work.</p>

            <div className="space-y-3">
              {caseStudies.map((cs, i) => {
                const isExpanded = expandedCase === i;
                return (
                  <div key={cs.id}>
                    <button
                      onClick={() => setExpandedCase(isExpanded ? null : i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isExpanded ? 'bg-forest/5 border-forest/20' : 'bg-cream border-cream hover:border-forest/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{cs.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{cs.title}</div>
                        </div>
                        <span className="text-forest text-sm">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-3 bg-forest/5 rounded-b-xl -mt-2 border border-t-0 border-forest/20">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{cs.content}</p>
                        {cs.citations && (
                          <div className="mt-3 bg-stone-50 rounded-lg p-3 font-mono">
                            <p className="text-[10px] text-stone-500 font-medium mb-1">Peer-reviewed:</p>
                            {cs.citations.map((c: { text: string; url: string }, ci: number) => (
                              <a key={ci} href={c.url} target="_blank" rel="noopener noreferrer"
                                className="block text-[10px] text-emerald-700 underline pl-2 border-l-2 border-emerald-200 mb-1 hover:text-emerald-900">
                                {c.text}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ TAB: SCIENCE ═══ */}
        {activeTab === 'science' && (
          <div className="bg-white rounded-b-3xl rounded-tr-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl text-gray-900 mb-6">The Science</h2>

            <div className="bg-forest/5 border-l-4 border-forest rounded-r-xl p-5 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                High-intensity exercise (sprints, jumps) triggers acute GH release through lactate accumulation and neural activation. 30-second all-out sprints can increase GH by <strong>771% above baseline</strong> (Stokes KA. Sports Med. 2002).
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Impact loading — jumping, running — mechanically stimulates growth plate chondrocytes through <strong>piezoelectric effects</strong>. The ground-reaction forces of 2-4× body weight trigger mechanotransduction, signaling osteoblasts to increase bone mineral deposition.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Intensity matters more than duration.</strong> Anaerobic threshold work produces the strongest GH response. Steady-state cardio doesn't produce the same effect. GH is released in pulses, with the largest spikes during high-intensity exercise and deep sleep recovery periods.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-5 mb-6">
              <div className="font-bold text-blue-600 mb-3">Key Principles</div>
              <div className="space-y-2 text-sm">
                {[
                  ["Sprint > steady cardio", "771% GH from sprints vs minimal from jogging. Lactate is the GH secretagogue."],
                  ["Impact stimulates plates", "Jumping creates microfractures that heal longer. Stretch immediately after."],
                  ["No weights during growth", "Compression damages open growth plates. Sprints give better GH stimulus anyway."],
                  ["Recovery is growth", "The sprint triggers the signal. Rest and sleep are when the body actually builds."],
                  ["Multi-sport wins", "Coordination before strength. Diverse movement rewires the cerebellum."],
                ].map(([title, desc], i) => (
                  <div key={i}>
                    <strong className="text-gray-900">{title}:</strong> <span className="text-gray-700">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-display text-lg text-gray-900 mb-4">Key Citations</h3>
            <div className="space-y-2">
              {citations.map((c, i) => (
                <div key={i} className="text-sm text-gray-600 p-2 bg-cream rounded-lg font-mono">
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
