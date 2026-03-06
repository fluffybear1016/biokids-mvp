'use client';

import { useState } from 'react';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#065f46', card: '#fff', border: '#e7e5e4',
};

const stacks = [
  {
    id: 'morning',
    name: 'Morning Stack',
    subtitle: 'Prime the IGF-1 axis for the full day',
    steps: [
      { time: 'Wake', action: 'Same time daily after 10-12 hrs sleep', why: 'Circadian consistency maximizes SWS depth' },
      { time: 'Within 30 min', action: 'Outdoor stretching in morning sunlight (5-10 min)', why: 'Sets circadian clock → melatonin timing 14-16 hrs later → deeper SWS → larger GH pulses' },
      { time: 'Start the day', action: 'Laughter and joy', why: 'Anticipation of fun raises GH 87% (Berk et al. 2006)' },
      { time: 'Breakfast', action: '8-12 oz whole A2 or raw milk, OR sheep\'s milk yogurt', why: 'Sheep yogurt = GABA pump (fermented) + A2 casein (50-80% more than cow) in one food' },
      { time: 'Breakfast', action: 'Pumpkin seeds + berries on yogurt', why: 'Arginine pump + zinc (IGF-1 receptor loading) + magnesium in one handful. Berries add flavonoid-based aromatase modulation + polyphenol antioxidants' },
      { time: 'Breakfast', action: '2-3 pasture-raised eggs', why: 'Choline → acetylcholine → primes GH axis' },
      { time: 'Breakfast', action: 'Cod liver oil (non-liver days only)', why: 'Retinol + vitamin D + omega-3. Skip on beef liver days to avoid excess retinol' },
      { time: 'Breakfast', action: 'No oats or conventional grains', why: 'Glyphosate residues disrupt gut + hormones' },
      { time: 'All day', action: 'Filtered water only', why: 'Remove PFAS, heavy metals, pesticide residues' },
      { time: 'Until lunch', action: 'Zero sugar', why: 'Keeps insulin low, GH receptor sensitivity high' },
    ],
    note: 'Morning sunlight is the #1 circadian anchor — it affects GH pulses 16 hours later during deep sleep. Sheep\'s milk yogurt is the single most efficient dairy food: fermented + A2 + highest casein density.',
  },
  {
    id: 'sprint',
    name: 'Sprint Stack',
    subtitle: '~530% GH spike → converted to IGF-1',
    steps: [
      { time: 'Lunch', action: 'Beef liver (mix in burgers/meatballs if needed)', why: 'Highest choline density of any meat + retinol + B12 + zinc' },
      { time: 'Lunch', action: 'Eggs + peanuts', why: 'More choline + niacin pump (suppresses free fatty acids that brake GH)' },
      { time: 'Lunch', action: 'Vitamin C with iron-rich foods', why: 'Enhances non-heme iron absorption — never pair iron meals with dairy' },
      { time: '1 hr after lunch', action: '4-6x 30-sec all-out sprints (up to 4 min rest)', why: '~530% GH spike via lactate pathway (Stokes et al. 2002)' },
      { time: 'Immediately after', action: '10 min stretching + dead hangs', why: 'Spinal decompression + microfractures heal elongated under traction' },
      { time: 'Within 30 min', action: '8-12 oz whole A2/raw milk OR sheep yogurt + raw honey', why: 'Whey converts GH → IGF-1 via STAT5 pathway; casein sustains amino delivery' },
      { time: 'Never', action: 'No weight lifting until plates close', why: 'Axial compression on open growth plates — sprints, jumps, climbing only' },
      { time: 'Never', action: 'No intense exercise after 6 PM', why: 'Raises core temp when it needs to fall for optimal sleep onset' },
    ],
    note: 'Without post-sprint dairy, the GH pulse is "orphaned" — present but not converted to growth. Separate dairy from iron-rich meals (beef liver) by 2+ hrs. Add vitamin C to all iron meals.',
  },
  {
    id: 'sleep',
    name: 'Sleep Stack',
    subtitle: '60-80% of daily GH produced during overnight fast',
    steps: [
      { time: 'Dinner (by 6 PM)', action: 'Consume high glycine foods: bone broth, homemade bovine gelatin jello (allulose/monk fruit + pineapple juice)', why: 'The more glycine the more GH — but also the faster they fall asleep (which leads to more GH)' },
      { time: 'After dinner', action: 'No food for 2-3 hrs before bed', why: 'Protects the overnight fast when 60-80% of daily GH is produced' },
      { time: 'After dinner', action: 'No screens (or Night Shift + blue blockers minimum)', why: 'Blue light suppresses melatonin for 90+ min, flattens GH curve' },
      { time: '60 min before bed', action: 'Warm bath with Epsom salts (10-20 min)', why: 'Core temp rise → accelerated drop → signals sleep onset. Epsom salts add transdermal magnesium' },
      { time: 'After bath', action: 'Magnesium lotion on feet + shoulders', why: 'GABA receptor activation — suppresses somatostatin — removes the brake on GH. Touch ritual triggers parasympathetic response' },
      { time: '30 min before bed', action: 'bioKids Sleep Drink: 1 oz tart cherry + 4 oz A2 milk', why: 'Casein (slow aminos) + melatonin (SWS + aromatase inhibition) + tryptophan → serotonin' },
      { time: 'Always', action: 'Zero caffeine + zero chocolate, ever', why: 'Both stimulants shrink deep slow-wave sleep where GH is released. Dark chocolate is not your friend — it\'s loaded with caffeine and most brands heavy metals' },
      { time: 'Room', action: '65-68°F, complete darkness, cover ALL LEDs', why: 'Cool temp + darkness = maximal SWS architecture' },
      { time: 'Lights out', action: 'In bed 8-8:30 PM → asleep by 8:30-9 PM', why: 'First SWS cycle = largest GH pulse of the entire day' },
    ],
    note: 'Key insight: The Sleep Drink is ~55 cal, 9-10g carbs — too mild to suppress nocturnal GH. Combined with the full day protocol this should yield an all natural GH pump that essentially does not get turned off: 451% GH at 24 hrs (Zajac et al. 2018). Each step primes the next.',
  },
  {
    id: 'puberty-delay',
    name: 'Puberty Delay Stack',
    subtitle: 'Each month of delay = another month of growth plate activity',
    intro: 'Reviews and clinical commentaries on aromatase inhibitors and growth plate closure explicitly describe aromatase inhibitors\' role as delaying or decelerating fusion when plates are still open — and can help to eke out extra growth time. We only use natural ways at bioKids, never pharmacological interventions.',
    steps: [
      // ── Tier 1: Cruciferous (ranked by glucosinolate density) ──
      { time: 'Daily #1', action: 'Broccoli sprouts (3-5 day old)', why: 'Tier 1 crucifer: 10-100x more sulforaphane than mature broccoli. The single most potent DIM/I3C source' },
      { time: 'Daily', action: 'Mature broccoli (steamed 3-4 min)', why: 'Tier 2 crucifer: high glucoraphanin + myrosinase intact. Brief steam maximizes sulforaphane yield' },
      { time: 'Daily', action: 'Brussels sprouts, cabbage, cauliflower (rotate)', why: 'Tier 3 crucifers: strong DIM/I3C + fiber. Rotate for broad glucosinolate coverage' },

      // ── Tier 2: Aromatase inhibitors ──
      { time: 'Daily', action: 'White button mushrooms (raw or lightly cooked)', why: 'Highest aromatase inhibition of any food — blocks adipose tissue → estrogen conversion directly' },
      { time: 'Daily', action: 'Pomegranate (arils or juice)', why: 'Ellagic acid + urolithins — potent anti-estrogenic polyphenols' },

      // ── Tier 3: Phytoestrogen competitors + citrus ──
      { time: 'Daily', action: 'Beans, lentils, peas', why: 'Weak phytoestrogens compete for receptors → delays HPG axis activation' },
      { time: 'Daily', action: 'Citrus with peel/pulp (orange, grapefruit, lemon zest)', why: 'Hesperidin + naringenin in peel/pith are natural aromatase inhibitors. Use whole fruit or zest' },

      // ── The Smoothie ──
      { time: 'Daily', action: 'Puberty Delay Smoothie: ¾c A2 milk + ¼c broccoli sprouts + 1c frozen berries + ¼c pomegranate + 10-15g gelatin + honey', why: 'Delivers crucifers + polyphenols + glycine + IGF-1 in one drink. Rotate add-ins weekly (see note)' },

      // ── Dairy + nutrition rules ──
      { time: 'Always', action: 'A2 milk only (not A1)', why: 'No BCM-7 inflammatory cascade — dairy raises IGF-1 without closing plates (Shim 2024)' },
      { time: 'Always', action: 'Zero sugar + zero artificial sweeteners', why: 'Insulin spikes + gut microbiome shifts → early puberty onset' },

      // ── Environmental estrogen avoidance ──
      { time: 'Always', action: 'Encourage active play and movement every day', why: 'Regular activity naturally supports healthy body composition. Adipose tissue converts testosterone to estrogen via aromatase — staying active helps keep this in check without any need for food restriction' },
      { time: 'Always', action: 'Zero plastics for food/drink (glass, steel, silicone only)', why: 'BPA/BPS/phthalates are xenoestrogens — even "BPA-free" plastics leach estrogenic compounds' },
      { time: 'Always', action: 'No non-stick cookware (PFAS), no pesticides on food', why: 'PFAS = "forever chemicals" with estrogenic activity. Organic produce eliminates organophosphates' },
      { time: 'Always', action: 'Zero ultra-processed foods', why: 'Additives, seed oils, and packaging chemicals compound xenoestrogen load' },
      { time: 'Always', action: 'Zero smoking, vaping, alcohol exposure', why: 'All accelerate pubertal timing through endocrine disruption' },

      // ── Light/circadian ──
      { time: 'Evening', action: 'Full darkness after sunset', why: 'Melatonin directly inhibits aromatase enzyme — light at night = more estrogen' },

      // ── Stretching ──
      { time: 'Late teens', action: 'Continue stretching aggressively, especially lower limbs', why: 'Growth plates in lower limbs (femur, tibia) usually stay open the longest — aggressive stretching in late teen years maximizes remaining growth window' },
    ],
    note: 'Estrogen — not GH — closes growth plates (Shim 2024). FOOD POWER RANKING: Broccoli sprouts > white button mushrooms > pomegranate > mature broccoli > Brussels sprouts > beans/lentils > citrus peel. Every item here either blocks aromatase, competes at estrogen receptors, or removes environmental estrogens.',
  },
  {
    id: 'height-preservation',
    name: 'Height Preservation & Strength',
    subtitle: 'Ages 19-25. CONTINUE ALL ITEMS FROM PUBERTY DELAY STACK.',
    steps: [
      // ── Sleep & Recovery ──
      { time: 'Sleep', action: '10+ hours on back, thin pillow', why: 'Disc rehydration — spinal height peaks each morning' },

      // ── Morning Stretching ──
      { time: 'Morning', action: '60-sec dead hang + spinal stretches', why: 'Decompression after overnight rehydration' },
      { time: 'Morning', action: 'Cobra stretch, cat-cow, full body elongation stretches', why: 'Maintain and improve spinal mobility. Growth plates may still be open especially in lower limbs — continue stretching aggressively' },

      // ── Strength Training ──
      { time: 'Training', action: 'Begin lifting weights — start light, gradually work up', why: 'Progressive overload builds bone density + posture-supporting muscle. Focus on back exercises: rows, deadlifts, pull-ups, face pulls' },
      { time: 'Training', action: 'Back-focused workouts for posture preservation', why: 'Rhomboids, rear delts, erector spinae — counteract forward slouch from sitting. Strong back = taller standing posture' },
      { time: 'Post-workout', action: 'Consume protein within 1 hour of completing workout', why: 'Maximizes muscle protein synthesis window. Whey or whole food protein paired with the training stimulus' },

      // ── Nutrition ──
      { time: 'Daily', action: 'Continue dairy flooding: 16-24 oz A2/raw milk', why: 'Dairy raises IGF-1 + improves lumbar/hip BMD without accelerating plate closure (Shim 2024, PNAS 2025)' },
      { time: 'Daily', action: 'Sheep\'s milk yogurt + pumpkin seeds', why: 'Highest casein density + zinc + arginine for continued GH-IGF1 axis support' },
      { time: 'Daily', action: 'Bovine gelatin — max daily intake', why: 'Pure glycine pump for disc, cartilage, and connective tissue repair. Superior to collagen supplements' },
      { time: 'Daily', action: 'Zinc-rich foods + vitamin D', why: 'Maintain all 3 levels of GH axis: pituitary, liver, growth plate' },
      { time: 'Daily', action: 'Anti-inflammatory whole foods + vitamin C with iron meals', why: 'Systemic inflammation degrades disc/joint tissue. Separate dairy from iron by 2+ hrs' },

      // ── Posture & Decompression ──
      { time: 'Throughout day', action: 'Move every 45 min + posture checks', why: 'Prevent disc compression from sitting' },
      { time: 'Daily', action: 'Inversion table or cushion under back', why: 'Active spinal decompression' },
      { time: 'Daily', action: 'Continue aggressive stretching — especially lower body', why: 'Growth plates in lower limbs may still be open. Dead hangs, hip flexor stretches, hamstring stretches, shin/femur resistance band stretches' },

      // ── Zero tolerance ──
      { time: 'Always', action: 'Zero smoking, vaping, alcohol exposure', why: 'Alcohol suppresses GH 75% + dehydrates discs. Smoking and vaping accelerate disc degeneration and suppress bone density' },
    ],
    note: 'Spinal hygiene + dairy flooding + strength training can add 0.5-1" in your 20s. Growth plates in lower limbs may still be open — keep stretching aggressively. Peer-reviewed evidence confirms dairy-driven IGF-1 increases lumbar spine BMD in adults without accelerating plate closure — estrogen, not GH, is what closes plates.',
  },
];

// ── Zinc foods reference (used for tooltips/education) ──
// Cooked oysters (3 oz): 28.2 mg | Beef liver (3 oz): 4.5 mg | Beef roasted (3 oz): 3.8 mg
// Pumpkin seeds (1 oz): 2.2 mg | Cheddar cheese (1.5 oz): 1.5 mg | Egg (1 large): 0.6 mg
// Body cannot store zinc — daily intake is non-negotiable.
// Lactose in milk aids zinc absorption. Phytates in grains/legumes reduce it.

export default function GrowthStacks() {
  const [activeStack, setActiveStack] = useState('morning');
  const currentStack = stacks.find(s => s.id === activeStack)!;

  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.green}`, overflow: 'hidden' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        {stacks.map((stack) => (
          <button
            key={stack.id}
            onClick={() => setActiveStack(stack.id)}
            style={{
              flexShrink: 0, padding: '10px 14px', fontSize: 11, fontWeight: 600,
              fontFamily: F, cursor: 'pointer', transition: 'all 0.15s', border: 'none',
              borderBottom: activeStack === stack.id ? `2px solid ${C.green}` : '2px solid transparent',
              background: activeStack === stack.id ? C.card : 'transparent',
              color: activeStack === stack.id ? C.green : C.body,
            }}
          >
            {stack.name}
          </button>
        ))}
      </div>

      {/* Stack Content */}
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: '0 0 4px' }}>
            {currentStack.name}
          </h3>
          <p style={{ fontSize: 12, color: C.green, margin: 0, fontFamily: F }}>{currentStack.subtitle}</p>
        </div>

        {/* Intro (if present) */}
        {currentStack.intro && (
          <div style={{ marginBottom: 14, padding: '12px 14px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, color: C.body, margin: 0, fontFamily: F, lineHeight: 1.65 }}>{currentStack.intro}</p>
          </div>
        )}

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {currentStack.steps.map((step, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 10, background: C.bg, borderRadius: 10, borderLeft: `2px solid ${C.green}` }}
            >
              <div style={{ flexShrink: 0, width: 80, fontSize: 10, fontWeight: 700, color: C.green, paddingTop: 2, fontFamily: F }}>
                {step.time}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.title, fontFamily: F }}>{step.action}</div>
                <div style={{ fontSize: 11, color: C.body, marginTop: 2, fontFamily: F }}>{step.why}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop: 14, padding: 10, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: '#78350f', margin: 0, fontFamily: F, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700 }}>Key insight:</span> {currentStack.note}
          </p>
        </div>
      </div>
    </div>
  );
}
