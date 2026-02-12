'use client';

const FONT = "'Courier New', Courier, monospace";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: '#f0fdf4', padding: '10px 16px', borderRadius: 8, textAlign: 'center' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#1B4332', fontFamily: FONT }}>{value}</div>
      <div style={{ fontSize: 11, color: '#666', fontFamily: FONT }}>{label}</div>
    </div>
  );
}

function HomeItem({ number, title, description, citation, color }: { number: number; title: string; description: string; citation: string; color: string }) {
  return (
    <div style={{
      background: number % 2 === 1 ? '#f0fdf4' : '#faf9f6',
      padding: '16px 20px',
      borderRadius: 12,
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span style={{
          background: color, color: 'white', width: 28, height: 28, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: FONT
        }}>{number}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6, fontFamily: FONT }}>{title}</div>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 8, lineHeight: 1.5, fontFamily: FONT }}>{description}</div>
          <div style={{ fontSize: 11, color: '#888', fontFamily: FONT }}>[{citation}]</div>
        </div>
      </div>
    </div>
  );
}

function AvoidSection({ items }: { items: string[] }) {
  return (
    <div style={{ background: '#fef2f2', borderRadius: 12, padding: 20, border: '1px solid #fecaca' }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, color: '#991b1b', letterSpacing: 1, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT }}>
        {'\u26A0\uFE0F'} AVOID
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#7f1d1d', fontFamily: FONT, lineHeight: 1.4 }}>
            <span style={{ background: '#fecaca', color: '#991b1b', width: 20, height: 20, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{'\u2717'}</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SLEEP HOME TAB
// ============================================
export function SleepHomeTab({ age }: { age: number }) {
  const getSleepHours = () => {
    if (age <= 1) return "16";
    if (age <= 2) return "14";
    if (age <= 5) return "13";
    if (age <= 12) return "12";
    if (age <= 18) return "10";
    return "10";
  };

  const getBedtime = () => {
    if (age <= 1) return "6:00-7:00 PM";
    if (age <= 2) return "6:30-7:30 PM";
    if (age <= 5) return "7:00-7:30 PM";
    if (age <= 9) return "7:30-8:00 PM";
    if (age <= 15) return "8:00-8:30 PM";
    if (age <= 18) return "8:30-9:30 PM";
    return "9:00-10:30 PM";
  };

  const getMilkDose = () => {
    if (age <= 1) return "breast milk or formula";
    if (age <= 2) return "2-4 oz";
    if (age <= 5) return "3-4 oz";
    if (age <= 9) return "4-6 oz";
    return "6-8 oz";
  };

  const getGrowthReps = () => {
    const hours = age <= 1 ? 16 : age <= 2 ? 14 : age <= 5 ? 13 : age <= 12 ? 12 : 10;
    return Math.floor(hours / 1.5);
  };

  const getItems = () => {
    const baseItems = [
      { title: `Sleep ${getSleepHours()} hours every night`, description: `Each 90-min cycle = one growth rep. ${getSleepHours()} hours = ${getGrowthReps()} reps. Never below 10 hours.`, citation: "Van Cauter E. JAMA. 2000" },
      { title: `Fixed bedtime ${getBedtime()} \u2014 same time every day`, description: "Anchors circadian clock. First SWS block hits the 10pm-1am peak GH window.", citation: "Roenneberg T. Curr Biol. 2007" },
      { title: "Complete darkness \u2014 blackout shades required", description: "Even small light suppresses melatonin. Melatonin gates GH release.", citation: "LeBourgeois MK. Mind Brain Educ. 2017" },
      { title: "Cool room 65-68\u00B0F", description: "Core body cooling is required for deep sleep initiation.", citation: "Okamoto-Mizuno K. J Physiol Anthropol. 2012" },
    ];
    if (age <= 2) {
      baseItems.push({ title: "Consistent nap schedule", description: "Naps contribute to total sleep. Overtired babies sleep worse at night.", citation: "Mindell JA. Sleep Med Rev. 2010" });
    } else if (age <= 5) {
      baseItems.push({ title: `Warm milk (${getMilkDose()}) before bed`, description: "\u03B1-lactalbumin has highest tryptophan content. Tryptophan \u2192 serotonin \u2192 melatonin.", citation: "Markus CR. Am J Clin Nutr. 2005" });
    } else if (age <= 12) {
      baseItems.push({ title: "No food 2-3 hours before bed", description: "Insulin suppresses GH by 80%. Clear it before the sleep window.", citation: "Lanzi R. Metabolism. 1999" });
    } else if (age <= 18) {
      baseItems.push({ title: "No screens 1-2 hours before bed", description: "Blue light delays melatonin onset by 90+ minutes. Use blue blockers if necessary.", citation: "Chang AM. PNAS. 2015" });
    } else {
      baseItems.push({ title: "No alcohol \u2014 suppresses GH 75%", description: "Even moderate drinking fragments sleep architecture and blunts GH pulses.", citation: "Prinz PN. J Clin Endocrinol Metab. 1980" });
    }
    return baseItems;
  };

  const getAvoidItems = () => {
    const baseAvoid = ["Irregular bedtime \u2014 scatters GH pulses for days", "Light in room \u2014 even LEDs suppress melatonin", "Warm room \u2014 prevents deep sleep entry"];
    if (age <= 5) {
      return ["Skipping naps \u2014 leads to overtired, worse night sleep", "Screen time before bed \u2014 even \"educational\" shows", ...baseAvoid];
    } else if (age <= 12) {
      return ["Screens before bed \u2014 blue light delays melatonin", "Late eating \u2014 insulin blocks nocturnal GH", ...baseAvoid];
    } else if (age <= 18) {
      return ["Phone in bedroom \u2014 notifications fragment sleep", "Caffeine after noon \u2014 half-life is 6 hours", "Weekend sleep-ins \u2014 \"social jet lag\" disrupts GH timing", ...baseAvoid];
    }
    return ["Alcohol \u2014 suppresses GH by 75%", "Late eating \u2014 insulin blocks nocturnal GH", "Caffeine after 2pm \u2014 half-life is 6 hours", ...baseAvoid];
  };

  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1B4332', margin: '0 0 8px', fontFamily: FONT }}>Sleep Essentials</h2>
        <p style={{ fontSize: 14, color: '#666', margin: '0 0 16px', fontFamily: FONT }}>Do these 5 things. Everything else is optimization.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Stat label="Sleep target" value={getSleepHours() + " hrs"} />
          <Stat label="Bedtime" value={getBedtime()} />
          <Stat label="Growth reps" value={getGrowthReps()} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {getItems().map((item, i) => (
          <HomeItem key={i} number={i + 1} title={item.title} description={item.description} citation={item.citation} color="#1B4332" />
        ))}
      </div>
      <AvoidSection items={getAvoidItems()} />
    </div>
  );
}

// ============================================
// NUTRITION HOME TAB
// ============================================
export function NutritionHomeTab({ age }: { age: number }) {
  const getMilkDose = () => {
    if (age <= 1) return "breast milk or formula primarily";
    if (age <= 2) return "16-24 oz";
    if (age <= 5) return "16-20 oz";
    if (age <= 9) return "16-24 oz";
    return "24-32 oz";
  };

  const getProteinTarget = () => {
    if (age <= 3) return "1.0-1.2g/kg";
    if (age <= 12) return "1.2-1.5g/kg";
    return "1.5-2.0g/kg";
  };

  const getEggCount = () => {
    if (age <= 2) return "1 egg";
    if (age <= 5) return "1-2 eggs";
    if (age <= 12) return "2-3 eggs";
    return "3-4 eggs";
  };

  const getCLODose = () => {
    if (age <= 1) return "Skip";
    if (age <= 3) return "\u00BC tsp";
    if (age <= 8) return "\u00BD tsp";
    if (age <= 12) return "\u00BD-1 tsp";
    return "1 tsp";
  };

  const getItems = () => {
    if (age <= 1) {
      return [
        { title: "Breast milk or formula as primary nutrition", description: "Breast milk contains \u03B1-lactalbumin, lactoferrin, and perfect amino acid profile for growth.", citation: "L\u00F6nnerdal B. Am J Clin Nutr. 2003" },
        { title: "Vitamin D supplementation (400 IU/day)", description: "Breast milk is low in vitamin D. Required for bone growth and GH receptor function.", citation: "Wagner CL. Pediatrics. 2008" },
        { title: "Iron-rich first foods at 6+ months", description: "Iron stores from birth deplete by 6 months. Critical for growth and brain development.", citation: "Baker RD. Pediatrics. 2010" },
        { title: "Introduce eggs at 6+ months", description: "Complete protein, choline for brain development. Early introduction reduces allergy risk.", citation: "Ierodiakonou D. JAMA. 2016" },
        { title: "Avoid added sugar completely", description: "Insulin dysregulation starts early. No juice, no sweetened foods.", citation: "Vos MB. Circulation. 2017" }
      ];
    }
    return [
      { title: `A2 milk ${getMilkDose()} daily`, description: "+0.39cm per 8oz/day. The Dutch and Dinka \u2014 tallest populations \u2014 drink milk constantly.", citation: "Hoppe C. Eur J Clin Nutr. 2004" },
      { title: `Eggs daily (${getEggCount()})`, description: "Choline primes pituitary-hypothalamus communication. Complete amino acids for IGF-1.", citation: "Zeisel SH. Annu Rev Nutr. 2006" },
      { title: age <= 3 ? `Cod liver oil ${getCLODose()} daily` : `Cod liver oil ${getCLODose()} daily OR beef liver 1x/week`, description: "Retinol primes GH receptors on liver cells. Without it, GH floats around unused.", citation: "Balmer JE. J Lipid Res. 2002" },
      { title: `Protein every meal \u2014 ${getProteinTarget()} daily`, description: "Amino acids are the building blocks for IGF-1 synthesis.", citation: "Hoppe C. Am J Clin Nutr. 2004" },
      { title: age <= 5 ? "No added sugar" : "No sugar before lunch", description: "Insulin suppresses GH by 80%. Keep the morning window insulin-free.", citation: "Lanzi R. Metabolism. 1999" }
    ];
  };

  const getAvoidItems = () => {
    const baseAvoid = ["Seed oils \u2014 inflammatory, disrupt hormone signaling", "Ultra-processed foods \u2014 empty calories, additives"];
    if (age <= 2) {
      return ["Honey before age 1 \u2014 botulism risk", "Cow's milk before age 1 as primary drink", "Added sugar in any form", "Juice \u2014 even \"100% fruit\" is sugar water", ...baseAvoid];
    } else if (age <= 5) {
      return ["Sugar and refined carbs \u2014 spike insulin, suppress GH", "Juice \u2014 liquid sugar without fiber", "A1 milk \u2014 releases inflammatory BCM-7", ...baseAvoid];
    }
    return ["Sugar and refined carbs \u2014 spike insulin, suppress GH", "A1 milk \u2014 releases inflammatory BCM-7", "Low protein intake \u2014 limits IGF-1 production", ...baseAvoid];
  };

  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1B4332', margin: '0 0 8px', fontFamily: FONT }}>Nutrition Essentials</h2>
        <p style={{ fontSize: 14, color: '#666', margin: '0 0 16px', fontFamily: FONT }}>Do these 5 things. Everything else is optimization.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Stat label="Protein target" value={getProteinTarget()} />
          <Stat label="Daily milk" value={age <= 1 ? "Breast/formula" : getMilkDose()} />
          <Stat label="Eggs" value={age <= 1 ? "6+ months" : getEggCount()} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {getItems().map((item, i) => (
          <HomeItem key={i} number={i + 1} title={item.title} description={item.description} citation={item.citation} color="#2D6A4F" />
        ))}
      </div>
      <AvoidSection items={getAvoidItems()} />
    </div>
  );
}

// ============================================
// MOVEMENT HOME TAB
// ============================================
export function MovementHomeTab({ age }: { age: number }) {
  const getItems = () => {
    if (age <= 1) {
      return [
        { title: "Tummy time daily \u2014 build core strength", description: "Prevents flat head, builds neck/core muscles for crawling and walking.", citation: "Kuo YL. J Dev Behav Pediatr. 2008" },
        { title: "Floor play \u2014 freedom to move", description: "Avoid containers (swings, seats). Unrestricted movement develops motor skills.", citation: "Abbott AL. Phys Occup Ther Pediatr. 2000" },
        { title: "Outdoor time \u2014 natural light exposure", description: "Sunlight exposure regulates circadian rhythm for better sleep and GH timing.", citation: "Roenneberg T. Curr Biol. 2007" },
        { title: "Baby wearing / carrying upright", description: "Supports hip development, vestibular system, and bonding.", citation: "Blois M. J Perinat Educ. 2005" },
        { title: "Limit container time", description: "Car seats, swings, bouncers restrict movement. Use only when necessary.", citation: "Abbott AL. Phys Occup Ther Pediatr. 2000" }
      ];
    }
    if (age <= 5) {
      return [
        { title: "Active play 3+ hours daily \u2014 running, climbing, jumping", description: "Young children need constant movement for bone density and motor development.", citation: "Timmons BW. Appl Physiol Nutr Metab. 2012" },
        { title: "Outdoor play \u2014 morning sunlight especially", description: "Sunlight within 30min of waking sets tonight\u2019s GH timing.", citation: "Roenneberg T. Curr Biol. 2007" },
        { title: "Climbing and hanging \u2014 playgrounds, monkey bars", description: "Spinal decompression and upper body strength. Natural growth stimulus.", citation: "Nachemson AL. Spine. 1981" },
        { title: "Jumping \u2014 trampolines, jumping games", description: "Impact loading stimulates bone growth at growth plates.", citation: "Gunter KB. Bone. 2008" },
        { title: "Limit sitting \u2014 no more than 30 min at a time", description: "Young children should rarely be sedentary. Movement is default state.", citation: "Carson V. Br J Sports Med. 2017" }
      ];
    }
    if (age <= 12) {
      return [
        { title: "Sprints 3x/week \u2192 milk within 30 minutes", description: "6\u00D730sec all-out sprints = 771% GH spike. Milk converts it to IGF-1.", citation: "Stokes KA. Sports Med. 2002" },
        { title: "Stretching 10 min post-sprint", description: "Sprints create microfractures. Stretching during repair = elongated healing.", citation: "Gunter KB. Bone. 2008" },
        { title: "Outdoor play daily \u2014 morning sunlight", description: "Sunlight within 30min of waking sets tonight\u2019s GH timing.", citation: "Roenneberg T. Curr Biol. 2007" },
        { title: "Hanging/climbing daily", description: "Spinal decompression. Growth only happens lying down or hanging.", citation: "Nachemson AL. Spine. 1981" },
        { title: "Stand/move every 45 minutes", description: "Sitting compresses spinal discs 40% more than standing.", citation: "Nachemson AL. Spine. 1981" }
      ];
    }
    if (age <= 18) {
      return [
        { title: "Sprints 3x/week \u2192 milk within 30 minutes", description: "6\u00D730sec all-out sprints = 771% GH spike. Milk converts it to IGF-1.", citation: "Stokes KA. Sports Med. 2002" },
        { title: "Stretching 10-15 min post-exercise", description: "Maintain flexibility, support elongated healing during growth spurt.", citation: "Gunter KB. Bone. 2008" },
        { title: "Morning sunlight 10-30 min", description: "Sets circadian rhythm for optimal GH release during sleep.", citation: "Roenneberg T. Curr Biol. 2007" },
        { title: "Hanging/pull-ups daily", description: "Spinal decompression. Especially important during growth spurt years.", citation: "Nachemson AL. Spine. 1981" },
        { title: "Avoid heavy compound lifts until plates close", description: "Bodyweight and moderate resistance only. Heavy squats/deadlifts can damage plates.", citation: "Faigenbaum AD. Pediatrics. 2010" }
      ];
    }
    return [
      { title: "Sprints or HIIT 3x/week \u2192 milk after", description: "GH still matters for bone density and recovery. The 771% spike still works.", citation: "Stokes KA. Sports Med. 2002" },
      { title: "Morning dead hang 60 seconds", description: "Discs are maximally hydrated after sleep. Lock in 0.5-1cm before compression.", citation: "Reilly T. Ergonomics. 1984" },
      { title: "Stand/move every 45 minutes", description: "Sitting compresses discs 40% more than standing. Prevents height loss.", citation: "Nachemson AL. Spine. 1981" },
      { title: "Evening inversion or back extension", description: "Decompress before bed. Studies show 2.7-7.7mm gained in 10 minutes.", citation: "Reilly T. Ergonomics. 1984" },
      { title: "Back sleeping on firm mattress", description: "Discs rehydrate overnight. Position determines whether you gain or lose.", citation: "Nachemson AL. Spine. 1981" }
    ];
  };

  const getAvoidItems = () => {
    if (age <= 1) return ["Excessive container time \u2014 limits movement development", "Baby walkers \u2014 delay walking, dangerous", "Propping to sit before ready", "Skipping tummy time"];
    if (age <= 5) return ["Screen time replacing active play", "Prolonged sitting \u2014 strollers, car seats beyond necessity", "Indoor all day \u2014 miss sunlight and movement", "Restrictive clothing that limits movement"];
    if (age <= 12) return ["Prolonged sitting \u2014 compresses discs, stunts spinal height", "Skipping post-sprint milk \u2014 GH spike wasted without conversion", "Indoor all day \u2014 miss circadian signal", "Heavy weight lifting \u2014 can damage growth plates"];
    if (age <= 18) return ["Heavy compound lifts \u2014 can damage open growth plates", "Skipping post-sprint milk \u2014 GH spike wasted", "Prolonged sitting without breaks", "No rest days \u2014 recovery is when growth happens", "Indoor all day \u2014 miss morning light"];
    return ["Prolonged sitting \u2014 accelerates disc degeneration", "Skipping morning hang \u2014 miss the rehydration window", "No exercise \u2014 GH still matters for maintenance", "Stomach sleeping \u2014 compresses spine asymmetrically", "Alcohol before bed \u2014 suppresses GH 75%"];
  };

  const getStats = () => {
    if (age <= 5) return <><Stat label="Active play" value="3+ hrs/day" /><Stat label="Outdoor" value="Daily" /></>;
    if (age <= 18) return <><Stat label="Sprints" value="3x/week" /><Stat label="GH spike" value="771%" /><Stat label="Hang" value="Daily" /></>;
    return <><Stat label="HIIT" value="3x/week" /><Stat label="Morning hang" value="60 sec" /><Stat label="Spinal gain" value="0.5-1 inch" /></>;
  };

  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1B4332', margin: '0 0 8px', fontFamily: FONT }}>Movement Essentials</h2>
        <p style={{ fontSize: 14, color: '#666', margin: '0 0 16px', fontFamily: FONT }}>Do these 5 things. Everything else is optimization.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>{getStats()}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {getItems().map((item, i) => (
          <HomeItem key={i} number={i + 1} title={item.title} description={item.description} citation={item.citation} color="#40916C" />
        ))}
      </div>
      <AvoidSection items={getAvoidItems()} />
    </div>
  );
}
