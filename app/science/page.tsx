'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { Child, GrowthWindow, getGrowthStage, stageInfo, createClient } from '@/lib/supabase';

// Right sidebar secrets - rotates daily
const sidebarSecrets = [
  "Kids are wired for whole foods until sugar rewires them. Never let junk compete. Fruit first, fill up on protein/milk/vegetables. Result: No food battles.",
  "70% of growth hormone is released in the first 3 hours of sleep. An 8:30pm bedtime captures the critical 10pm-1am surge.",
  "30-second sprints trigger 771% GH increase. Steady cardio doesn't come close.",
  "Eating within 2 hours of sleep suppresses GH by up to 80%.",
  "Morning sunlight within 30 min of waking sets the master clock for optimal GH release.",
  "Excess body fat produces estrogen, signaling growth plates to close earlier.",
];

// Growth Secrets - rotates daily
const growthSecrets = [
  {
    icon: '🌙',
    title: '70% of GH in the First 3 Hours',
    text: 'Growth hormone is released in pulses during deep sleep, with 70% occurring in the first 3 sleep cycles. An 8:30pm bedtime captures the critical 10pm-1am surge.',
    citation: '[Van Cauter E. Sleep. 2000]',
  },
  {
    icon: '🍽️',
    title: 'The Insulin-GH Trade-off',
    text: 'Eating within 2 hours of sleep spikes insulin, which suppresses growth hormone by up to 80%. That bedtime snack? It\'s costing inches.',
    citation: '[Ho KY. J Clin Endocrinol Metab. 1988]',
  },
  {
    icon: '🏃',
    title: 'The 771% Sprint Effect',
    text: '30-second all-out sprints trigger GH release up to 771% above baseline. Steady-state cardio doesn\'t come close. Six sprints, 3x per week.',
    citation: '[Stokes KA. Sports Med. 2002]',
  },
  {
    icon: '🥛',
    title: 'Why the Dutch Are Tallest',
    text: 'The Netherlands has the tallest population on Earth — and the highest milk consumption. A2 casein proteins directly support IGF-1 production.',
    citation: '[Hoppe C. Am J Clin Nutr. 2004]',
  },
  {
    icon: '⚖️',
    title: 'Fat Closes Growth Plates',
    text: 'Excess body fat produces estrogen via aromatase. Elevated estrogen signals growth plates to ossify (close) earlier — potentially costing years of growth.',
    citation: '[Nilsson O. Endocr Rev. 2005]',
  },
  {
    icon: '☀️',
    title: 'Morning Light Sets the Clock',
    text: '10-30 minutes of sunlight within 30 minutes of waking synchronizes the master clock, which controls melatonin timing — and melatonin gates GH release.',
    citation: '[Roenneberg T. Curr Biol. 2007]',
  },
];

const scienceSections = [
  {
    id: 'sleep',
    title: 'Sleep',
    href: '/windows/sleep-circadian',
    items: [
      {
        id: 'sleep-bedtime',
        emoji: '🌙',
        title: 'Bedtime before 8:30pm',
        text: '70% of growth hormone is released in the first 3 hours of deep sleep. An early bedtime captures the critical 10pm–1am GH surge.',
        mechanism: 'GH secretion is pulsatile and tied to slow-wave sleep onset. The largest GH pulse occurs in the first NREM cycle, typically 60–90 minutes after sleep onset. Earlier bedtimes produce longer and deeper initial sleep cycles.',
        citations: [
          { text: 'Van Cauter E, et al. JAMA. 2000;284(7):861-868.', url: 'https://pubmed.ncbi.nlm.nih.gov/10938176/' },
          { text: 'Takahashi Y, et al. J Clin Invest. 1968;47(9):2079-2090.', url: 'https://pubmed.ncbi.nlm.nih.gov/5675428/' },
        ],
      },
      {
        id: 'sleep-duration',
        emoji: '💤',
        title: '10+ hours of sleep (ages 5–12)',
        text: 'Children who sleep fewer than 9 hours show measurably lower IGF-1 levels and reduced linear growth velocity.',
        mechanism: 'Cumulative GH secretion is proportional to total sleep duration. Each additional sleep cycle adds another GH pulse. Short sleep also elevates cortisol, which is catabolic to bone and cartilage.',
        citations: [
          { text: 'Mindell JA, et al. Sleep Med Rev. 2016;32:6-16.', url: 'https://pubmed.ncbi.nlm.nih.gov/26802824/' },
          { text: 'Knutson KL. Sleep Med Clin. 2012;7(1):65-77.', url: 'https://pubmed.ncbi.nlm.nih.gov/22891189/' },
        ],
      },
      {
        id: 'sleep-consistency',
        emoji: '⏰',
        title: 'Consistent wake time',
        text: 'Wake time variability >1 hour scrambles circadian rhythm and blunts slow-wave sleep, reducing GH secretion.',
        mechanism: 'The suprachiasmatic nucleus (SCN) entrains to wake time more than bedtime. Irregular wake times shift the SCN, delaying melatonin onset and compressing the deep sleep window where GH is released.',
        citations: [
          { text: 'Wittmann M, et al. Chronobiol Int. 2006;23(1-2):497-509.', url: 'https://pubmed.ncbi.nlm.nih.gov/16687322/' },
          { text: 'Roenneberg T, et al. Curr Biol. 2007;17(2):R44-R45.', url: 'https://pubmed.ncbi.nlm.nih.gov/17240323/' },
        ],
      },
      {
        id: 'sleep-dark',
        emoji: '🔴',
        title: 'Dark room / red light only',
        text: 'Even dim light at night suppresses melatonin by up to 50%. Melatonin gates the onset of deep sleep where GH is released.',
        mechanism: 'Melanopsin-containing retinal ganglion cells are maximally sensitive to blue/green light (460–520nm). Even 8 lux of white light suppresses melatonin onset. Red light (>620nm) does not activate this pathway.',
        citations: [
          { text: 'Gooley JJ, et al. J Clin Endocrinol Metab. 2011;96(3):E463-E472.', url: 'https://pubmed.ncbi.nlm.nih.gov/21193540/' },
          { text: 'Zeitzer JM, et al. J Physiol. 2000;526(3):695-702.', url: 'https://pubmed.ncbi.nlm.nih.gov/10922269/' },
        ],
      },
      {
        id: 'sleep-nofood',
        emoji: '🍽️',
        title: 'No food 2–3 hours before bed',
        text: 'Eating within 2 hours of sleep spikes insulin, which suppresses growth hormone by up to 80%.',
        mechanism: 'Insulin and GH are antagonistic. Postprandial insulin rise directly inhibits GHRH-stimulated GH release from the anterior pituitary. Even a small carbohydrate snack can blunt the first GH pulse of the night.',
        citations: [
          { text: 'Ho KY, et al. J Clin Endocrinol Metab. 1988;67(6):1111-1117.', url: 'https://pubmed.ncbi.nlm.nih.gov/3142910/' },
          { text: 'Lanzi R, et al. J Clin Endocrinol Metab. 1999;84(4):1370-1373.', url: 'https://pubmed.ncbi.nlm.nih.gov/10199778/' },
        ],
      },
    ],
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    href: '/windows/nutrition',
    items: [
      {
        id: 'nutr-milk',
        emoji: '🥛',
        title: 'A2 / raw milk daily',
        text: 'Milk intake is the single strongest dietary predictor of IGF-1 levels and linear growth in children. A2 beta-casein avoids the inflammatory BCM-7 peptide.',
        mechanism: 'Milk proteins (whey and casein) stimulate hepatic IGF-1 production. The Netherlands has the tallest population and highest milk consumption globally. A2 beta-casein produces different peptides during digestion that avoid gut inflammation.',
        citations: [
          { text: 'Hoppe C, et al. Eur J Clin Nutr. 2004;58(9):1211-1216.', url: 'https://pubmed.ncbi.nlm.nih.gov/15054433/' },
          { text: 'Wiley AS. Am J Hum Biol. 2005;17(4):425-441.', url: 'https://pubmed.ncbi.nlm.nih.gov/15981178/' },
          { text: 'Jianqin S, et al. Nutr J. 2016;15(1):35.', url: 'https://pubmed.ncbi.nlm.nih.gov/27039383/' },
        ],
      },
      {
        id: 'nutr-protein',
        emoji: '🥩',
        title: 'Protein at every meal',
        text: 'Amino acids (especially arginine and lysine) directly stimulate GH release. 20–30g of protein per meal maintains positive nitrogen balance for growth.',
        mechanism: 'Arginine suppresses somatostatin (the GH inhibitor), while lysine potentiates GHRH-stimulated GH release. Together they produce a synergistic effect on GH secretion greater than either amino acid alone.',
        citations: [
          { text: 'Collier SR, et al. J Int Soc Sports Nutr. 2006;3(1):54-62.', url: 'https://pubmed.ncbi.nlm.nih.gov/18500966/' },
          { text: 'Isidori A, et al. J Clin Endocrinol Metab. 1981;53(3):611-616.', url: 'https://pubmed.ncbi.nlm.nih.gov/6789769/' },
        ],
      },
      {
        id: 'nutr-clo',
        emoji: '🐟',
        title: 'Cod liver oil daily',
        text: 'Provides vitamin D3, vitamin A, and omega-3 DHA — three critical nutrients for bone mineralization, growth plate regulation, and IGF-1 signaling.',
        mechanism: 'Vitamin D activates osteoblasts and regulates calcium/phosphorus absorption. Vitamin A modulates growth plate chondrocyte differentiation. DHA is incorporated into cell membranes of growing bone tissue and modulates GH receptor sensitivity.',
        citations: [
          { text: 'Heaney RP, et al. J Clin Endocrinol Metab. 2003;88(12):5766-5772.', url: 'https://pubmed.ncbi.nlm.nih.gov/14671166/' },
          { text: 'Laron Z. Mol Cell Endocrinol. 2001;177(1-2):1-11.', url: 'https://pubmed.ncbi.nlm.nih.gov/11377816/' },
        ],
      },
      {
        id: 'nutr-nosugar',
        emoji: '🚫',
        title: 'Minimize sugar and processed food',
        text: 'Sugar spikes insulin, which directly suppresses GH. Chronic high insulin also promotes fat storage, and excess body fat produces estrogen that closes growth plates early.',
        mechanism: 'Hyperinsulinemia suppresses GH via increased somatostatin tone and reduced GHRH sensitivity. Adipose tissue expresses aromatase, converting androgens to estrogen. Elevated estrogen accelerates growth plate senescence and fusion.',
        citations: [
          { text: 'Ho KY, et al. J Clin Endocrinol Metab. 1988;67(6):1111-1117.', url: 'https://pubmed.ncbi.nlm.nih.gov/3142910/' },
          { text: 'Nilsson O, et al. Endocr Rev. 2005;26(1):114-146.', url: 'https://pubmed.ncbi.nlm.nih.gov/15689574/' },
        ],
      },
      {
        id: 'nutr-glycine',
        emoji: '😴',
        title: 'Glycine with dinner',
        text: 'Glycine enhances deep sleep quality and directly stimulates GH secretion from the pituitary. 3–5g with dinner is the optimal dose.',
        mechanism: 'Glycine acts on NMDA receptors in the suprachiasmatic nucleus to lower core body temperature, promoting sleep onset. It also acts directly on somatotrophs in the anterior pituitary to stimulate GH release independently of GHRH.',
        citations: [
          { text: 'Kawai N, et al. Neuropsychopharmacology. 2015;40(6):1405-1416.', url: 'https://pubmed.ncbi.nlm.nih.gov/25533534/' },
          { text: 'Kasai K, et al. Metabolism. 1980;29(9):826-831.', url: 'https://pubmed.ncbi.nlm.nih.gov/7376793/' },
          { text: 'Bannai M, et al. Front Neurol. 2012;3:61.', url: 'https://pubmed.ncbi.nlm.nih.gov/22529837/' },
        ],
      },
    ],
  },
  {
    id: 'movement',
    title: 'Movement',
    href: '/windows/physical-activity',
    items: [
      {
        id: 'move-sprint',
        emoji: '🏃',
        title: '30-second sprint intervals',
        text: '6 × 30-second all-out sprints trigger up to 771% increase in growth hormone above baseline. Steady-state cardio does not come close.',
        mechanism: 'High-intensity anaerobic exercise above the lactate threshold triggers massive GH release via acid-base balance disruption, catecholamine surge, and direct stimulation of the hypothalamic-pituitary axis. The effect is intensity-dependent, not duration-dependent.',
        citations: [
          { text: 'Stokes KA, et al. J Sports Sci. 2002;20(6):487-494.', url: 'https://pubmed.ncbi.nlm.nih.gov/12137178/' },
          { text: 'Wideman L, et al. Sports Med. 2002;32(15):987-1004.', url: 'https://pubmed.ncbi.nlm.nih.gov/12457419/' },
        ],
      },
      {
        id: 'move-jump',
        emoji: '🦘',
        title: 'Jumping and impact play',
        text: 'Vertical loading forces from jumping stimulate osteoblast activity at growth plates. Even 10 minutes of jumping per day measurably increases bone density.',
        mechanism: 'Mechanical loading activates the Wnt/β-catenin signaling pathway in osteocytes, which increases osteoblast differentiation and bone formation. Ground reaction forces during jumping are 3–5x body weight, well above the threshold for osteogenic stimulus.',
        citations: [
          { text: 'Gunter K, et al. Bone. 2008;42(4):710-718.', url: 'https://pubmed.ncbi.nlm.nih.gov/18258497/' },
          { text: 'Fuchs RK, et al. Bone. 2001;28(1):128-132.', url: 'https://pubmed.ncbi.nlm.nih.gov/11165954/' },
        ],
      },
      {
        id: 'move-hang',
        emoji: '🐒',
        title: 'Hanging and decompression',
        text: 'Hanging from a bar decompresses intervertebral discs and stretches the spinal column. Combined with gravity traction, this supports maximal spinal length expression.',
        mechanism: 'Axial traction reduces intradiscal pressure and allows rehydration of the nucleus pulposus. The stretch reflex in paraspinal muscles is inhibited during sustained hanging, permitting greater elongation. Regular decompression preserves disc height during growth.',
        citations: [
          { text: 'Rodacki AL, et al. Clin Biomech. 2003;18(1):16-23.', url: 'https://pubmed.ncbi.nlm.nih.gov/12527242/' },
          { text: 'Nachemson A, et al. Spine. 1979;4(1):89-92.', url: 'https://pubmed.ncbi.nlm.nih.gov/432719/' },
        ],
      },
      {
        id: 'move-sunlight',
        emoji: '☀️',
        title: 'Morning sunlight within 30 min of waking',
        text: '10–30 minutes of direct sunlight sets the master circadian clock, which controls melatonin timing — and melatonin gates the GH release window.',
        mechanism: 'Morning light activates melanopsin-containing retinal ganglion cells, which signal the suprachiasmatic nucleus (SCN). The SCN then sets a ~14-hour countdown to melatonin onset. Consistent morning light exposure produces earlier, stronger melatonin peaks and deeper initial sleep.',
        citations: [
          { text: 'Roenneberg T, et al. Curr Biol. 2007;17(2):R44-R45.', url: 'https://pubmed.ncbi.nlm.nih.gov/17240323/' },
          { text: 'Duffy JF, et al. Sleep Med Clin. 2009;4(2):165-177.', url: 'https://pubmed.ncbi.nlm.nih.gov/20161220/' },
        ],
      },
      {
        id: 'move-noexercise',
        emoji: '🛑',
        title: 'No intense exercise after 6pm',
        text: 'Late-evening high-intensity exercise raises core temperature and cortisol, delaying sleep onset and suppressing the first GH pulse of the night.',
        mechanism: 'Exercise raises core body temperature for 2–3 hours post-session. Sleep onset requires a drop in core temperature. Cortisol elevation from intense exercise is catabolic and directly opposes GH action at the receptor level.',
        citations: [
          { text: 'Stutz J, et al. Sports Med. 2019;49(2):269-287.', url: 'https://pubmed.ncbi.nlm.nih.gov/30374942/' },
          { text: 'Thun E, et al. Sleep Med Rev. 2015;23:87-93.', url: 'https://pubmed.ncbi.nlm.nih.gov/25645130/' },
        ],
      },
    ],
  },
];

const defaultGrowthWindow: GrowthWindow = {
  id: '1',
  child_id: '1',
  sleep_avg_hours: 9.2,
  sleep_avg_bedtime: '20:24:00',
  sleep_nights_on_protocol: 6,
  sleep_status: 'optimal',
  height_percentile: 78,
  height_previous_percentile: 65,
  circadian_days_aligned: 6,
  circadian_avg_wake_time: '06:45:00',
  circadian_morning_sunlight_days: 4,
  circadian_status: 'check',
  week_of: '2026-01-27',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function Dashboard() {
  const router = useRouter();
  const [child, setChild] = useState<Child | null>(null);
  const [growthWindow, setGrowthWindow] = useState<GrowthWindow>(defaultGrowthWindow);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Fetch child data via server API
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) { setLoading(false); return; }

      fetch(`/api/auth/user-state?userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.children && data.children.length > 0) {
            const c = data.children[0];
            setChild({
              id: c.id,
              user_id: session.user.id,
              name: c.name,
              birth_date: c.birth_date,
              gender: null,
              created_at: c.created_at,
              updated_at: c.created_at,
            });
          }
        })
        .catch(err => console.error('Fetch child error:', err))
        .finally(() => setLoading(false));
    });
  }, []);

  // Time-based active phase data
  const getActivePhase = (hour: number) => {
    if (hour >= 6 && hour < 10) {
      return {
        emoji: '☀️',
        title: 'Morning Light',
        subtitle: 'Circadian rhythm syncing',
        tip: 'Get 10-30 minutes of direct sunlight within 30 minutes of waking to set the master clock.',
      };
    } else if (hour >= 10 && hour < 14) {
      return {
        emoji: '🏃',
        title: 'Peak Activity',
        subtitle: 'Growth hormone primed',
        tip: 'Ideal time for sprint intervals — 6x30 second all-out efforts trigger up to 771% GH increase.',
      };
    } else if (hour >= 14 && hour < 18) {
      return {
        emoji: '⚽',
        title: 'Active Play',
        subtitle: 'Movement window open',
        tip: 'Encourage jumping, climbing, and active play. Impact activities stimulate bone growth.',
      };
    } else if (hour >= 18 && hour < 20) {
      return {
        emoji: '🌅',
        title: 'Wind Down',
        subtitle: 'Preparing for GH release',
        tip: 'Dim lights, finish dinner, and avoid screens. Blue light after sunset suppresses melatonin.',
      };
    } else if (hour >= 20 && hour < 22) {
      return {
        emoji: '🌙',
        title: 'Golden Sleep',
        subtitle: 'Growth hormone releasing',
        tip: 'Maintain consistent bedtime. Consider magnesium-rich foods or bath for deeper sleep.',
      };
    } else {
      return {
        emoji: '💤',
        title: 'Deep Sleep',
        subtitle: 'Peak GH secretion',
        tip: 'Avoid waking them — 70% of growth hormone is released in the first 3 hours of sleep.',
      };
    }
  };

  const activePhase = getActivePhase(currentHour);

  // Rotate secret based on day of year
  const [currentSecret, setCurrentSecret] = useState(growthSecrets[0]);
  const [sidebarSecret, setSidebarSecret] = useState(sidebarSecrets[0]);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const secretIndex = dayOfYear % growthSecrets.length;
    const sidebarSecretIndex = dayOfYear % sidebarSecrets.length;
    setCurrentSecret(growthSecrets[secretIndex]);
    setSidebarSecret(sidebarSecrets[sidebarSecretIndex]);

    // Update current hour every minute
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const stage = child ? getGrowthStage(child.birth_date) : 'pre-puberty';
  const stageData = stageInfo[stage];
  const childName = child?.name || (typeof window !== 'undefined' && localStorage.getItem('childName')) || 'Your child';

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-forest font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6 sm:py-12">

        {/* Search Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/jarvis?q=${encodeURIComponent(searchQuery.trim())}`); }}
          style={{ marginBottom: 24 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything about growth optimization..."
            style={{ width: '100%', padding: '14px 16px', fontSize: 14, color: '#1B4332', background: 'white', border: '1px solid #e5e5e5', borderRadius: 10, outline: 'none' }}
          />
        </form>

        {/* Stage Hero */}
        <section className="bg-gradient-to-br from-forest to-forest-light rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-white mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-white/10 to-transparent opacity-50" />

          <div className="flex justify-between items-start mb-4 sm:mb-6 relative">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse-dot" />
              Window is OPEN
            </span>
          </div>

          <div className="relative">
            <div className="text-xs sm:text-sm text-white/70 mb-1 sm:mb-2">Where {childName} is right now</div>
            <h1 className="font-display text-3xl sm:text-5xl mb-2 sm:mb-3">{stageData.label}</h1>
            <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-5">
              You have time. {childName} is in the optimal window.
            </p>
            <p className="text-sm sm:text-lg text-white/90 max-w-lg">
              This is the highest-leverage stage for supporting natural growth. Small consistent actions now make a big difference.
            </p>
            <Link
              href="/stage"
              className="inline-flex items-center gap-2 bg-white text-forest px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold mt-4 sm:mt-6 hover:bg-cream transition-colors text-sm sm:text-base"
            >
              See what matters most →
            </Link>
          </div>
        </section>

        {/* Category Sections with Science */}
        {scienceSections.map((section) => (
          <section key={section.id} className="bg-white rounded-2xl border border-stone-200 mb-4 sm:mb-6 overflow-hidden">
            <Link href={section.href} className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 hover:bg-stone-50 transition-colors">
              <h2 className="font-display text-lg sm:text-xl text-forest">{section.title}</h2>
              <span className="text-stone-400 text-sm">View details →</span>
            </Link>
            <div className="border-t border-stone-100">
              {section.items.map((item) => (
                <div key={item.id} className="border-b border-stone-100 last:border-b-0">
                  <div className="px-5 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">{item.emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-stone-900">{item.title}</h3>
                        <p className="text-xs text-stone-500 mt-0.5">{item.text}</p>
                        <button
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                          className="text-[11px] text-emerald-700 font-medium mt-2 hover:text-emerald-900 font-mono"
                        >
                          {expandedItem === item.id ? '▼' : '▶'} See the science
                        </button>
                        {expandedItem === item.id && (
                          <div className="mt-3 bg-stone-50 rounded-lg p-3 font-mono">
                            <p className="text-xs text-stone-700 mb-2">{item.mechanism}</p>
                            <p className="text-[10px] text-stone-500 font-medium mb-1">Peer-reviewed:</p>
                            {item.citations.map((c, i) => (
                              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="block text-[10px] text-emerald-700 underline pl-2 border-l-2 border-emerald-200 mb-1 hover:text-emerald-900">{c.text}</a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

      </main>

        {/* Right Sidebar - xl screens only */}
        <aside className="hidden xl:block sticky top-0 h-screen w-72 flex-shrink-0 p-4 space-y-4 overflow-y-auto">
          {/* Active Now */}
          <div className="bg-white rounded-2xl p-5 border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Now</span>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                {activePhase.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-forest">{activePhase.title}</h3>
                <p className="text-xs text-gray-500">{activePhase.subtitle}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs text-green-800 leading-relaxed">
                <span className="font-semibold">💡</span> {activePhase.tip}
              </p>
            </div>
          </div>

          {/* Why We're Confident */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Why We're Confident</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Studies indexed</span>
                <span className="font-semibold text-forest">312</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Research hours</span>
                <span className="font-semibold text-forest">2,400+</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100 leading-relaxed">
              Every recommendation is backed by high end academic peer-reviewed research.
            </p>
          </div>

          {/* Growth Secrets */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              🔒 Growth Secrets
            </h3>
            <p className="text-sm text-amber-900 leading-relaxed">
              {sidebarSecret}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200">
              <span className="text-xs text-amber-600">💡 Daily tip • Refreshes tomorrow</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
