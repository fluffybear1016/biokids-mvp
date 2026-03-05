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
      emoji: "",
      color: "forest",
      items: [
        "2 eggs — choline → acetylcholine → pituitary primed for max GH amplitude",
        "Unroasted peanuts — niacin → FFA suppression, removes secondary GH brake",
        "Coconut oil 1g/kg — quick fuel + extends GH window up to 4 hours",
      ]
    },
    {
      phase: "SPRINT",
      emoji: "",
      color: "amber",
      items: [
        "All-out effort, 30 seconds — don't pace it",
        "Full rest between (4 min) — DO NOT short-change rest",
        "In the sun when possible — vitamin D synthesis",
      ]
    },
    {
      phase: "POST-SPRINT (within 30 min)",
      emoji: "",
      color: "coral",
      items: [
        "1 cup A2 milk + 1 tsp raw honey",
        "Milk amino acids + honey's gentle insulin = STAT5 > AKT → liver converts GH → IGF-1",
        "Without this, the GH pulse is \"orphaned\" — present but wasted",
      ]
    },
    {
      phase: "IMMEDIATELY AFTER",
      emoji: "",
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
      icon: "",
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
      icon: "",
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
      icon: "",
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
      icon: "",
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
        <Link href="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontSize: 14, color: CC.light, textDecoration: 'none', marginBottom: 24 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Page Title */}
        <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Movement
        </h1>
        <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 24 }}>
          High-intensity exercise triggers GH spikes up to 771%. Impact activities stimulate growth plates. Sprinting builds elite power without weights.
        </p>

        {/* Key Stats — signature card */}
        <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '14px 18px', marginBottom: 44, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: CC.green }}>771%</div>
            <div style={{ fontFamily: F, fontSize: 14, color: CC.light }}>GH from sprints</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: CC.green }}>6x30s</div>
            <div style={{ fontFamily: F, fontSize: 14, color: CC.light }}>sprint protocol</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 22, color: CC.green }}>0 lbs</div>
            <div style={{ fontFamily: F, fontSize: 14, color: CC.light }}>weights needed</div>
          </div>
        </div>

        {/* Age-based recommendations */}
        <div style={{ background: CC.card, border: `1px solid ${CC.border}`, borderRadius: 14, padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: F, fontSize: 14, color: CC.light }}>
              {child ? `${child.name}'s protocol` : 'Age-based protocol'}:
            </span>
            {[
              { label: 'Age', value: String(Math.floor(ageInYears)) },
              { label: 'Type', value: ageInYears < 8 ? "Play-based sprints" : ageInYears <= 12 ? "Structured 4-6 reps" : "Advanced 6x30s" },
              { label: 'Freq', value: ageInYears < 13 ? "2-3x/week" : "1-2x/week" },
            ].map((item, i) => (
              <span key={i} style={{ fontFamily: F, fontSize: 13, color: CC.body, background: CC.bg, padding: '6px 12px', borderRadius: 20 }}>
                {item.label}: <strong style={{ color: CC.title }}>{item.value}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 0, background: CC.bg, padding: 4, borderRadius: '14px 14px 0 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: `1px solid ${CC.border}`, borderBottom: 'none' }}>
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
              style={{
                padding: '10px 14px', border: 'none',
                background: activeTab === tab.id ? CC.card : 'transparent',
                borderRadius: 10, fontSize: 13, fontFamily: F,
                fontWeight: activeTab === tab.id ? 800 : 400,
                color: activeTab === tab.id ? CC.title : CC.light,
                cursor: 'pointer', transition: 'all 0.2s',
                whiteSpace: 'nowrap' as const, flexShrink: 0, flex: 1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: CC.card, borderRadius: '0 0 14px 14px', padding: 18, border: `1px solid ${CC.border}`, borderTop: 'none', marginBottom: 44 }}>

          {/* ═══ TAB: HOME ═══ */}
          {activeTab === 'home' && (
            <div style={{ padding: 8 }}>
              <MovementHomeTab age={Math.floor(ageInMonths / 12)} />
            </div>
          )}

          {/* ═══ TAB: LEVERS ═══ */}
          {activeTab === 'levers' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 8px', textAlign: 'center' }}>Movement Levers</h2>
              <p style={{ textAlign: 'center', fontFamily: F, color: CC.light, fontSize: 14, marginBottom: 24 }}>Ranked by impact on height and development. Do #1 first.</p>

              {movementLevers.map((lever) => {
                const isExpanded = expandedLever === lever.id;
                return (
                  <div key={lever.id} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedLever(isExpanded ? null : lever.id)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14,
                        padding: '14px 18px', fontFamily: F, textAlign: 'left',
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                      }}
                    >
                      <span style={{
                        width: 28, height: 28, background: CC.green, color: 'white', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontFamily: F, fontWeight: 800, flexShrink: 0,
                      }}>{lever.rank}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: CC.title, marginBottom: 4 }}>{lever.title}</div>
                        <div style={{ fontSize: 13, color: CC.body, lineHeight: 1.75 }}>{lever.subtitle}</div>
                      </div>
                      <span style={{ color: CC.light, fontSize: 18 }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none' }}>
                        <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>{lever.content}</p>
                        {lever.extra && (
                          <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12, whiteSpace: 'pre-line' as const }}>{lever.extra}</p>
                        )}
                        <div style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: CC.green, background: CC.card, padding: '8px 12px', borderRadius: 10, border: `1px solid ${CC.sigBorder}` }}>
                          Timing: {lever.timing}
                        </div>
                        {lever.citations && <CitationBlock citations={lever.citations} />}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Never section */}
              <div style={{ marginTop: 24, background: CC.card, borderRadius: 14, padding: '14px 18px', border: `1px solid ${CC.border}` }}>
                <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: CC.red, marginBottom: 10 }}>Never</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
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
                    <div key={i} style={{ fontFamily: F, fontSize: 13, color: CC.body, lineHeight: 1.75 }}>✕ {item}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══ TAB: SPRINT ═══ */}
          {activeTab === 'sprint' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 24px' }}>Sprint Protocol</h2>

              {/* Age-appropriate protocols */}
              {sprintProtocols.map((p, i) => (
                <div key={i} style={{
                  padding: '14px 18px', borderRadius: p.active ? 20 : 14, marginBottom: 8,
                  background: p.active ? '#ecfdf5' : CC.card,
                  border: p.active ? `2px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                }}>
                  <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: p.active ? CC.green : CC.light, marginBottom: 4 }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily: F, fontSize: 14, color: p.active ? CC.body : CC.light, lineHeight: 1.75 }}>
                    {p.content}
                  </div>
                  {p.citations && <CitationBlock citations={p.citations} />}
                </div>
              ))}

              {/* The Stack */}
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${CC.border}` }}>The Sprint Nutrition Stack</div>
              {sprintStack.map((s, i) => (
                <div key={i} style={{ background: CC.card, border: `1px solid ${CC.border}`, borderRadius: 14, padding: '14px 18px', marginBottom: 8 }}>
                  <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: CC.green, marginBottom: 8 }}>
                    {s.emoji} {s.phase}
                  </div>
                  {s.items.map((item, ii) => (
                    <div key={ii} style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, paddingLeft: 8 }}>&bull; {item}</div>
                  ))}
                </div>
              ))}

              {/* Sprint vs Weights */}
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${CC.border}` }}>Sprint vs Weight Lifting</div>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', fontSize: 13, fontFamily: F, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: CC.bg }}>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 800, color: CC.title, borderBottom: `2px solid ${CC.border}` }}>Factor</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: CC.green, borderBottom: `2px solid ${CC.border}` }}>Sprinting</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: CC.red, borderBottom: `2px solid ${CC.border}` }}>Weights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprintVsWeights.map(([factor, sprint, weight], i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${CC.border}` }}>
                        <td style={{ padding: '10px 12px', fontWeight: 800, color: CC.title }}>{factor}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', color: CC.green }}>{sprint}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', color: CC.red }}>{weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Jamaican Method */}
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginTop: 44, marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${CC.border}` }}>The Jamaican High School Method</div>
              {jamaicanMethod.map((phase) => {
                const isExpanded = expandedJam === phase.id;
                return (
                  <div key={phase.id} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedJam(isExpanded ? null : phase.id)}
                      style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 18px', fontFamily: F, textAlign: 'left',
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: CC.title }}>{phase.title}</div>
                        <div style={{ fontSize: 13, color: CC.light }}>{phase.subtitle}</div>
                      </div>
                      <span style={{ color: CC.light }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                        {phase.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ TAB: ATHLETES ═══ */}
          {activeTab === 'athletes' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Case Studies</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: CC.light, marginBottom: 24 }}>Real athletes and cultures that prove these principles work.</p>

              {caseStudies.map((cs, i) => {
                const isExpanded = expandedCase === i;
                return (
                  <div key={cs.id} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedCase(isExpanded ? null : i)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                        padding: '14px 18px', fontFamily: F, textAlign: 'left',
                        background: isExpanded ? '#ecfdf5' : CC.bg,
                        border: isExpanded ? `1px solid ${CC.sigBorder}` : `1px solid ${CC.border}`,
                        borderRadius: isExpanded ? '14px 14px 0 0' : 14, cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{cs.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: CC.title }}>{cs.title}</div>
                      </div>
                      <span style={{ color: CC.light }}>{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: '14px 18px', background: '#ecfdf5', borderRadius: '0 0 14px 14px', border: `1px solid ${CC.sigBorder}`, borderTop: 'none', fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, whiteSpace: 'pre-line' as const }}>
                        {cs.content}
                        {cs.citations && <CitationBlock citations={cs.citations} />}
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
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: CC.title, letterSpacing: '-0.02em', margin: '0 0 24px' }}>The Science</h2>

              <div style={{ background: CC.card, border: `2px solid ${CC.sigBorder}`, borderRadius: 20, padding: '14px 18px', marginBottom: 24 }}>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>
                  High-intensity exercise (sprints, jumps) triggers acute GH release through lactate accumulation and neural activation. 30-second all-out sprints can increase GH by <strong>771% above baseline</strong> (Stokes KA. Sports Med. 2002).
                </p>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 12 }}>
                  Impact loading — jumping, running — mechanically stimulates growth plate chondrocytes through <strong>piezoelectric effects</strong>. The ground-reaction forces of 2-4x body weight trigger mechanotransduction, signaling osteoblasts to increase bone mineral deposition.
                </p>
                <p style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75 }}>
                  <strong>Intensity matters more than duration.</strong> Anaerobic threshold work produces the strongest GH response. Steady-state cardio doesn't produce the same effect. GH is released in pulses, with the largest spikes during high-intensity exercise and deep sleep recovery periods.
                </p>
              </div>

              <div style={{ background: CC.card, border: `1px solid ${CC.border}`, borderRadius: 14, padding: '14px 18px', marginBottom: 24 }}>
                <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: CC.title, marginBottom: 12 }}>Key Principles</div>
                {[
                  ["Sprint > steady cardio", "771% GH from sprints vs minimal from jogging. Lactate is the GH secretagogue."],
                  ["Impact stimulates plates", "Jumping creates microfractures that heal longer. Stretch immediately after."],
                  ["No weights during growth", "Compression damages open growth plates. Sprints give better GH stimulus anyway."],
                  ["Recovery is growth", "The sprint triggers the signal. Rest and sleep are when the body actually builds."],
                  ["Multi-sport wins", "Coordination before strength. Diverse movement rewires the cerebellum."],
                ].map(([title, desc], i) => (
                  <div key={i} style={{ fontFamily: F, fontSize: 14, color: CC.body, lineHeight: 1.75, marginBottom: 8 }}>
                    <strong style={{ color: CC.title }}>{title}:</strong> {desc}
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: CC.title, marginBottom: 12 }}>Key Citations</div>
              {citations.map((c, i) => (
                <div key={i} style={{ fontFamily: F, fontSize: 13, color: CC.light, padding: '6px 0', lineHeight: 1.75 }}>
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
