'use client';

import { useState, useEffect } from 'react';

type Period = 'morning' | 'afternoon' | 'evening';

export const SIGNAL_ITEM_COUNT = 33;

// High-priority items for future notification system
export const NOTIFICATION_PRIORITY_ITEMS = [
  { ids: ['dairy1', 'dairy2', 'dairy3'], label: 'Dairy (all 3 servings)' },
  { ids: ['clo'], label: 'Cod Liver Oil' },
  { ids: ['breakfast', 'dairy2', 'dinnerpro'], label: 'Protein at breakfast, lunch, dinner' },
  { ids: ['glycine'], label: 'Glycine with dinner' },
  { ids: ['bedtime'], label: 'Bedtime by 8-8:30pm' },
];

export default function SignalPage() {
  // Auto-detect time of day
  const getTimeOfDay = (): Period => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    return 'evening';
  };

  const [currentPeriod, setCurrentPeriod] = useState<Period>('morning');
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedScience, setExpandedScience] = useState<string | null>(null);

  // Initialize on mount
  useEffect(() => {
    // Set time of day
    setCurrentPeriod(getTimeOfDay());
    
    // Load completed items from localStorage (reset daily)
    const today = new Date().toDateString();
    const saved = localStorage.getItem('biokids_signal_completed');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setCompletedItems(parsed.items);
      }
    }
  }, []);

  // Save completed items to localStorage
  useEffect(() => {
    localStorage.setItem('biokids_signal_completed', JSON.stringify({
      date: new Date().toDateString(),
      items: completedItems
    }));
  }, [completedItems]);

  // Auto-expand first uncompleted item when period changes
  useEffect(() => {
    const periodItems = allItems.filter(item => item.period === currentPeriod);
    const firstUncompleted = periodItems.find(item => !completedItems.includes(item.id));
    if (firstUncompleted) {
      setExpandedItem(firstUncompleted.id);
    }
  }, [currentPeriod, completedItems]);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCompleting = !completedItems.includes(id);
    setCompletedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    
    // Auto-expand next item when completing
    if (isCompleting) {
      const periodItems = allItems.filter(item => item.period === currentPeriod);
      const currentIndex = periodItems.findIndex(item => item.id === id);
      const nextItem = periodItems.slice(currentIndex + 1).find(item => !completedItems.includes(item.id) && item.id !== id);
      if (nextItem) {
        setExpandedItem(nextItem.id);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(prev => prev === id ? null : id);
  };

  const allItems: { id: string; period: Period; title: string; subtitle: string; mechanism: string; practical: string; science: string; citations: { text: string; url: string }[] }[] = [
    // ============ MORNING ============
    { id: 'waketime', period: 'morning', title: 'Consistent wake time', subtitle: 'Same time daily, even weekends', mechanism: 'Anchors circadian rhythm for predictable GH pulses', practical: 'Pick a time and stick to it. Variability scrambles the system.', science: 'Wake time variability >1 hour correlates with reduced slow-wave sleep and blunted GH secretion.', citations: [{ text: 'Wittmann M, et al. Chronobiol Int. 2006;23(1-2):497-509.', url: 'https://pubmed.ncbi.nlm.nih.gov/16687322/' }, { text: 'Van Cauter E, et al. JAMA. 2000;284(7):861-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/10938176/' }] },
    { id: 'sun', period: 'morning', title: 'Morning sunlight before screen time', subtitle: '10 min outside, no sunglasses, ideally no screen time in am', mechanism: "Sets tonight's melatonin clock", practical: 'Backyard, walk to bus stop, breakfast on porch.', science: 'Light exposure synchronizes the suprachiasmatic nucleus, determining melatonin onset 14-16 hours later.', citations: [{ text: 'Roenneberg T, et al. Curr Biol. 2007;17(11):R462-71.', url: 'https://pubmed.ncbi.nlm.nih.gov/17580084/' }, { text: 'Wright KP, et al. Curr Biol. 2013;23(16):1554-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/23910656/' }] },
    { id: 'breakfast', period: 'morning', title: 'Protein breakfast', subtitle: '2-3 Pasture Raised Eggs + cheese (Parm, cottage, etc.), SKIP the cereal always', mechanism: 'Amino acids for IGF-1 synthesis', practical: 'Scrambled eggs with cheese. Takes 5 min.', science: 'BCAAs directly stimulate hepatic IGF-1 production.', citations: [{ text: 'Hoppe C, et al. Eur J Clin Nutr. 2005;59(3):393-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/15578035/' }, { text: 'Bonjour JP, et al. J Am Coll Nutr. 2013;32(4):251-63.', url: 'https://pubmed.ncbi.nlm.nih.gov/24024770/' }] },
    { id: 'dairy1', period: 'morning', title: 'First dairy serving', subtitle: 'A2 milk or Raw milk with breakfast or A2/sheeps milk yogurt', mechanism: 'Start the 24oz daily target', practical: 'Glass of milk, yogurt parfait, cheese with eggs.', science: 'Milk proteins uniquely stimulate IGF-1 via amino acid profile. +0.39cm per 8oz/day.', citations: [{ text: 'Hoppe C, et al. Annu Rev Nutr. 2006;26:131-73.', url: 'https://pubmed.ncbi.nlm.nih.gov/16848703/' }, { text: 'Wiley AS. Am J Hum Biol. 2010;22(4):517-25.', url: 'https://pubmed.ncbi.nlm.nih.gov/20155844/' }] },
    { id: 'clo', period: 'morning', title: 'Cod liver oil', subtitle: "1 tsp in smoothie — they won't taste it", mechanism: 'Retinol primes GH receptors', practical: 'Blend into any smoothie. Or mix with OJ.', science: 'Retinol is required for GH receptor gene expression. Deficiency reduces GH binding by 40-60%.', citations: [{ text: 'Balmer JE, Blomhoff R. J Lipid Res. 2002;43(11):1773-808.', url: 'https://pubmed.ncbi.nlm.nih.gov/12401878/' }, { text: 'Mukherjee R, et al. J Biol Chem. 1996;271(30):18120-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/8663437/' }] },
    { id: 'nosugar', period: 'morning', title: 'No sugar until lunch', subtitle: 'Keeps GH active all morning', mechanism: 'Insulin suppresses GH by 60-80%', practical: 'Eggs, cheese, meat for breakfast. Fruit after lunch.', science: 'Insulin directly inhibits pituitary GH release.', citations: [{ text: 'Lanzi R, et al. Metabolism. 1999;48(9):1152-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/10484056/' }, { text: 'Yamashita S, Melmed S. J Clin Invest. 1986;78(4):1008-14.', url: 'https://pubmed.ncbi.nlm.nih.gov/3760179/' }] },
    { id: 'backpack', period: 'morning', title: 'Light backpack', subtitle: 'Under 10-15% of body weight', mechanism: 'Heavy loads compress spine during growth', practical: 'Weigh it. Remove unnecessary items.', science: 'Chronic heavy loads can affect spinal development in children.', citations: [{ text: 'Brackley HM, Stevenson JM. Spine. 2004;29(19):2184-90.', url: 'https://pubmed.ncbi.nlm.nih.gov/15454714/' }, { text: 'Negrini S, Carabalona R. Spine. 2002;27(2):187-95.', url: 'https://pubmed.ncbi.nlm.nih.gov/11805666/' }] },
    { id: 'activeam', period: 'morning', title: 'Active commute', subtitle: 'Walk to school, bike, or morning play', mechanism: 'Morning movement sets up energy to burn later', practical: 'Any activity counts. Builds adenosine for tonight.', science: 'Physical activity increases adenosine accumulation, building sleep pressure throughout the day.', citations: [{ text: 'Kredlow MA, et al. J Behav Med. 2015;38(3):427-49.', url: 'https://pubmed.ncbi.nlm.nih.gov/25596964/' }, { text: 'Porkka-Heiskanen T, et al. Science. 1997;276(5316):1265-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/9157887/' }] },
    
    // ============ AFTERNOON ============
    { id: 'dairy2', period: 'afternoon', title: 'Protein + dairy at lunch', subtitle: 'Meat/fish/eggs + milk, yogurt, or cheese', mechanism: '+0.39cm per 8oz milk/day', practical: 'Any form counts toward 24oz daily target.', science: 'Milk proteins uniquely stimulate IGF-1 production.', citations: [{ text: 'Hoppe C, et al. Annu Rev Nutr. 2006;26:131-73.', url: 'https://pubmed.ncbi.nlm.nih.gov/16848703/' }, { text: 'Cadogan J, et al. BMJ. 1997;315(7118):1255-60.', url: 'https://pubmed.ncbi.nlm.nih.gov/9390050/' }] },
    { id: 'nosugarpm', period: 'afternoon', title: 'Water, not juice/soda', subtitle: 'Save sugar for strategic moments', mechanism: 'Random sugar spikes blunt GH all day', practical: 'Water or milk. Save treats for post-sprint.', science: 'Each insulin spike suppresses GH for 2-3 hours.', citations: [{ text: 'Lanzi R, et al. Metabolism. 1999;48(9):1152-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/10484056/' }, { text: 'Cornford AS, et al. Horm Res Paediatr. 2011;75(6):396-404.', url: 'https://pubmed.ncbi.nlm.nih.gov/21540578/' }] },
    { id: 'nonap', period: 'afternoon', title: 'No naps after 2-3pm', subtitle: 'Early naps only if needed', mechanism: 'Late naps steal sleep pressure from tonight', practical: 'If they must nap, keep it before 2pm and under 30 min.', science: 'Naps >30min after 3pm reduce slow-wave sleep and delay sleep onset.', citations: [{ text: 'Milner CE, Cote KA. J Sleep Res. 2009;18(2):272-81.', url: 'https://pubmed.ncbi.nlm.nih.gov/19645971/' }, { text: 'Takahashi M. Sleep Med Rev. 2003;7(3):227-35.', url: 'https://pubmed.ncbi.nlm.nih.gov/12927122/' }] },
    { id: 'presprint', period: 'afternoon', title: 'Pre-sprint fuel (sprint days)', subtitle: 'Eggs + peanuts 30 min before', mechanism: 'Choline + niacin prime GH expression', practical: 'Hard boiled egg and handful of peanuts.', science: 'Niacin enhances GH response to exercise by 300-400%.', citations: [{ text: 'Quabbe HJ, et al. J Clin Endocrinol Metab. 1983;57(6):1214-9.', url: 'https://pubmed.ncbi.nlm.nih.gov/6415142/' }, { text: 'Stokes KA, et al. J Appl Physiol. 2002;92(2):602-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/11796671/' }] },
    { id: 'sprint', period: 'afternoon', title: '6x 30-second sprints (3x/week)', subtitle: 'All-out effort. Make it a race.', mechanism: '771% GH spike — nothing else comes close', practical: 'Race them down the street 6 times. 10 min total.', science: 'Maximal sprints trigger massive GH via lactate surge.', citations: [{ text: 'Stokes KA, et al. J Sports Sci. 2002;20(6):487-94.', url: 'https://pubmed.ncbi.nlm.nih.gov/12137178/' }, { text: 'Pritzlaff CJ, et al. J Appl Physiol. 1999;87(2):498-504.', url: 'https://pubmed.ncbi.nlm.nih.gov/10444604/' }] },
    { id: 'postmilk', period: 'afternoon', title: 'Milk + honey after sprints', subtitle: 'Within 30 min. Chocolate milk works.', mechanism: 'Converts GH → IGF-1. Without this, GH is wasted.', practical: "They're thirsty anyway. Add honey for carbs.", science: 'Post-exercise protein required for IGF-1 synthesis.', citations: [{ text: 'Cappon J, et al. J Appl Physiol. 1994;76(6):2490-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/7928875/' }, { text: 'Karp JR, et al. Int J Sport Nutr Exerc Metab. 2006;16(1):78-91.', url: 'https://pubmed.ncbi.nlm.nih.gov/16676705/' }] },
    { id: 'play', period: 'afternoon', title: 'Outdoor play until dinner', subtitle: 'Parks, bikes, running around', mechanism: 'Burns energy → exhausted by bedtime', practical: 'The more active, the easier tonight will be.', science: 'Physical activity increases adenosine, building sleep pressure.', citations: [{ text: 'Kredlow MA, et al. J Behav Med. 2015;38(3):427-49.', url: 'https://pubmed.ncbi.nlm.nih.gov/25596964/' }, { text: 'Nixon GM, et al. Sleep. 2008;31(1):71-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/18220080/' }] },
    { id: 'jump', period: 'afternoon', title: 'Jumping / impact play', subtitle: 'Jump rope, basketball, trampoline', mechanism: 'Impact stimulates growth plates directly', practical: 'Any jumping activity. Even jumping jacks.', science: 'Mechanical loading triggers osteoblast activity at growth plates.', citations: [{ text: 'Bass SL, et al. J Bone Miner Res. 1998;13(3):500-7.', url: 'https://pubmed.ncbi.nlm.nih.gov/9525351/' }, { text: 'Gunter K, et al. J Bone Miner Res. 2008;23(7):986-93.', url: 'https://pubmed.ncbi.nlm.nih.gov/18684084/' }] },
    { id: 'hang', period: 'afternoon', title: 'Dead hang / monkey bars', subtitle: 'Pull-up bar in doorway. Even 30 sec helps.', mechanism: 'Spinal decompression — discs expand', practical: 'Playground monkey bars or doorway pull-up bar.', science: 'Hanging creates tensile force that rehydrates intervertebral discs.', citations: [{ text: 'Nachemson AL. Spine. 1981;6(1):93-7.', url: 'https://pubmed.ncbi.nlm.nih.gov/7209680/' }, { text: 'Reilly T, et al. Chronobiol Int. 1984;1(2):121-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/6600092/' }] },
    
    // ============ EVENING ============
    { id: 'nointense', period: 'evening', title: 'No intense exercise after 6pm', subtitle: 'Calm activities only', mechanism: 'Late exercise raises core temp when it needs to fall', practical: 'Save the running around for afternoon.', science: 'Exercise within 2 hours of bed delays sleep onset.', citations: [{ text: 'Kredlow MA, et al. J Behav Med. 2015;38(3):427-49.', url: 'https://pubmed.ncbi.nlm.nih.gov/25596964/' }, { text: 'Stutz J, et al. Sports Med. 2019;49(2):269-87.', url: 'https://pubmed.ncbi.nlm.nih.gov/30374942/' }] },
    { id: 'dinnerpro', period: 'evening', title: 'Protein at dinner', subtitle: 'Meat, fish, eggs, or dairy', mechanism: 'Substrate for overnight tissue repair', practical: 'Any protein source works.', science: 'Evening protein increases overnight muscle protein synthesis by 22%.', citations: [{ text: 'Res PT, et al. Med Sci Sports Exerc. 2012;44(8):1560-9.', url: 'https://pubmed.ncbi.nlm.nih.gov/22330017/' }, { text: 'Snijders T, et al. J Nutr. 2015;145(6):1178-84.', url: 'https://pubmed.ncbi.nlm.nih.gov/25926415/' }] },
    { id: 'dairy3', period: 'evening', title: 'Third dairy serving', subtitle: 'Cheese with dinner or sleepy drink', mechanism: 'Hits the 24oz daily target', practical: 'The sleepy drink counts as dairy too.', science: 'Consistent dairy intake correlates with linear growth velocity.', citations: [{ text: 'Hoppe C, et al. Annu Rev Nutr. 2006;26:131-73.', url: 'https://pubmed.ncbi.nlm.nih.gov/16848703/' }, { text: 'Trommelen J, van Loon LJ. Nutrients. 2016;8(12):763.', url: 'https://pubmed.ncbi.nlm.nih.gov/27916799/' }] },
    { id: 'glycine', period: 'evening', title: '① Glycine with dinner', subtitle: 'Add to any food — invisible', mechanism: 'Lowers core temp → sleep onset begins', practical: "Soup, rice, pasta sauce. They won't taste it.", science: 'Glycine acts on NMDA receptors, lowering core body temperature — the primary trigger for sleep initiation.', citations: [{ text: 'Kawai N, et al. Neuropsychopharmacology. 2015;40(6):1405-16.', url: 'https://pubmed.ncbi.nlm.nih.gov/25533534/' }, { text: 'Bannai M, et al. Front Neurol. 2012;3:61.', url: 'https://pubmed.ncbi.nlm.nih.gov/22529837/' }, { text: 'Melendez-Hevia E, et al. J Biosci. 2009;34(6):853-72.', url: 'https://pubmed.ncbi.nlm.nih.gov/20093739/' }] },
    { id: 'nosugareve', period: 'evening', title: 'No sugar after dinner', subtitle: 'One dessert can block 80% of GH', mechanism: 'Insulin blocks the entire overnight GH pulse', practical: 'If dessert, make it small and early.', science: 'Insulin directly inhibits pituitary GH for 2-3 hours.', citations: [{ text: 'Lanzi R, et al. Metabolism. 1999;48(9):1152-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/10484056/' }, { text: 'Van Cauter E, et al. J Clin Endocrinol Metab. 1992;74(6):1441-50.', url: 'https://pubmed.ncbi.nlm.nih.gov/1592892/' }] },
    { id: 'nolate', period: 'evening', title: 'No food 2-3 hrs before bed', subtitle: 'Dinner done by 6pm ideally', mechanism: 'Digestion interferes with deep sleep', practical: 'Earlier dinner = better sleep.', science: 'Late eating reduces slow-wave sleep and GH secretion.', citations: [{ text: 'Crispim CA, et al. J Clin Sleep Med. 2011;7(6):659-64.', url: 'https://pubmed.ncbi.nlm.nih.gov/22171206/' }, { text: 'Kinsey AW, Ormsbee MJ. Nutrients. 2015;7(4):2648-62.', url: 'https://pubmed.ncbi.nlm.nih.gov/25859885/' }] },
    { id: 'noscreens', period: 'evening', title: 'No screens after dinner', subtitle: 'Or Night Shift max + blue blockers', mechanism: 'Blue light delays melatonin 90+ min', practical: 'TV is better than tablets/phones. Distance matters.', science: 'Blue light (460-480nm) suppresses melatonin via melanopsin receptors.', citations: [{ text: 'Cajochen C, et al. J Clin Endocrinol Metab. 2005;90(3):1311-6.', url: 'https://pubmed.ncbi.nlm.nih.gov/15585546/' }, { text: 'Gooley JJ, et al. J Clin Endocrinol Metab. 2011;96(3):E463-72.', url: 'https://pubmed.ncbi.nlm.nih.gov/21193540/' }] },
    { id: 'bath', period: 'evening', title: 'Warm bath (optional)', subtitle: '20 min before wind-down', mechanism: 'Paradoxically cools core temp after', practical: 'Add epsom salt for extra magnesium.', science: 'Post-bath cooling triggers sleep onset mechanisms.', citations: [{ text: 'Haghayegh S, et al. Sleep Med Rev. 2019;46:124-35.', url: 'https://pubmed.ncbi.nlm.nih.gov/31102877/' }, { text: 'Kräuchi K, et al. Nature. 1999;401(6748):36-7.', url: 'https://pubmed.ncbi.nlm.nih.gov/10485705/' }] },
    { id: 'magnesium', period: 'evening', title: '② Magnesium lotion', subtitle: 'Rub on feet and shoulders', mechanism: 'Drowsy in 20 min', practical: "Do it while they watch TV. Works even when they're wired.", science: 'Magnesium activates the parasympathetic nervous system and regulates melatonin.', citations: [{ text: 'Abbasi B, et al. J Res Med Sci. 2012;17(12):1161-9.', url: 'https://pubmed.ncbi.nlm.nih.gov/23853635/' }, { text: 'Held K, et al. Pharmacopsychiatry. 2002;35(4):135-43.', url: 'https://pubmed.ncbi.nlm.nih.gov/12163983/' }] },
    { id: 'stretch', period: 'evening', title: 'Gentle stretching (optional)', subtitle: 'Calm, slow movements', mechanism: 'Activates parasympathetic system', practical: 'Simple stretches while watching TV.', science: 'Slow stretching increases HRV and parasympathetic tone.', citations: [{ text: 'Harinath K, et al. Indian J Physiol Pharmacol. 2004;48(3):324-31.', url: 'https://pubmed.ncbi.nlm.nih.gov/15648406/' }, { text: 'Banasik J, et al. J Am Acad Nurse Pract. 2011;23(3):135-42.', url: 'https://pubmed.ncbi.nlm.nih.gov/21355946/' }] },
    { id: 'cherry', period: 'evening', title: '③ Sleepy drink', subtitle: 'Tart cherry juice (1oz) + warm milk', mechanism: 'Melatonin + tryptophan knockout combo', practical: "Make it a ritual. They'll start asking for it.", science: 'Montmorency cherries contain melatonin (13.5ng/g). Milk α-lactalbumin has highest tryptophan of any food.', citations: [{ text: 'Howatson G, et al. Eur J Nutr. 2012;51(8):909-16.', url: 'https://pubmed.ncbi.nlm.nih.gov/22038497/' }, { text: 'Pigeon WR, et al. J Med Food. 2010;13(3):579-83.', url: 'https://pubmed.ncbi.nlm.nih.gov/20438325/' }] },
    { id: 'routine', period: 'evening', title: 'Same routine every night', subtitle: 'Same order, same time', mechanism: 'Brain auto-releases melatonin when routine starts', practical: 'Bath → lotion → drink → books → bed. Pavlovian in 1-2 weeks.', science: 'Consistent routines activate anticipatory circadian mechanisms.', citations: [{ text: 'Mindell JA, et al. Sleep. 2015;38(5):717-22.', url: 'https://pubmed.ncbi.nlm.nih.gov/25325493/' }, { text: 'Mindell JA, et al. Sleep. 2009;32(5):599-606.', url: 'https://pubmed.ncbi.nlm.nih.gov/19480226/' }] },
    { id: 'coolroom', period: 'evening', title: 'Cool room: 65-68°F', subtitle: 'Crack window, use fan', mechanism: 'Body must drop 2-3°F for deep sleep', practical: 'Cool room + warm blanket = fastest sleep onset.', science: 'Core temp drop of 1-1.5°C required for sleep initiation.', citations: [{ text: 'Kräuchi K, et al. Nature. 1999;401(6748):36-7.', url: 'https://pubmed.ncbi.nlm.nih.gov/10485705/' }, { text: 'Okamoto-Mizuno K, Mizuno K. J Physiol Anthropol. 2012;31(1):14.', url: 'https://pubmed.ncbi.nlm.nih.gov/22738673/' }] },
    { id: 'dark', period: 'evening', title: 'Complete darkness', subtitle: 'Blackout curtains, cover all LEDs', mechanism: 'Even dim light suppresses GH', practical: 'Tape over any lights. Blackout curtains are worth it.', science: 'Light during sleep reduces GH secretion by 50%+.', citations: [{ text: 'Gooley JJ, et al. J Clin Endocrinol Metab. 2011;96(3):E463-72.', url: 'https://pubmed.ncbi.nlm.nih.gov/21193540/' }, { text: 'Obayashi K, et al. Chronobiol Int. 2014;31(10):1062-72.', url: 'https://pubmed.ncbi.nlm.nih.gov/25283267/' }] },
    { id: 'lights', period: 'evening', title: '④ Dim/red lights → bed', subtitle: "They're already drowsy", mechanism: 'No fight. They want to sleep.', practical: 'Red bulbs or lamps only. Then lights out.', science: 'Blue light suppresses melatonin by 50%+. By now, the biochemical cascade is complete.', citations: [{ text: 'Gooley JJ, et al. J Clin Endocrinol Metab. 2011;96(3):E463-72.', url: 'https://pubmed.ncbi.nlm.nih.gov/21193540/' }, { text: 'Figueiro MG, et al. Neuro Endocrinol Lett. 2011;32(2):158-63.', url: 'https://pubmed.ncbi.nlm.nih.gov/21552190/' }] },
    { id: 'bedtime', period: 'evening', title: 'In bed by 8-8:30pm', subtitle: 'Asleep by 8:30-9pm', mechanism: 'First 90 min = 70% of GH release', practical: 'Non-negotiable. Everything else builds to this.', science: 'The first slow-wave cycle contains majority of nocturnal GH secretion.', citations: [{ text: 'Van Cauter E, et al. JAMA. 2000;284(7):861-8.', url: 'https://pubmed.ncbi.nlm.nih.gov/10938176/' }, { text: 'Takahashi Y, et al. J Clin Invest. 1968;47(9):2079-90.', url: 'https://pubmed.ncbi.nlm.nih.gov/5675428/' }] },
  ];

  const periods: Period[] = ['morning', 'afternoon', 'evening'];
  const periodLabels = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };
  const periodDescriptions = { 
    morning: 'Set up energy for the day', 
    afternoon: 'Burn it off, build sleep pressure', 
    evening: 'The wind-down sequence' 
  };

  const currentItems = allItems.filter(item => item.period === currentPeriod);
  const currentIndex = periods.indexOf(currentPeriod);
  const upcomingPeriods = periods.slice(currentIndex + 1);
  const upcomingItems = allItems.filter(item => upcomingPeriods.includes(item.period));
  const completedToday = allItems.filter(item => completedItems.includes(item.id) && item.period !== currentPeriod);

  const renderItem = (item: typeof allItems[number], isFirst = false) => {
    const isExpanded = expandedItem === item.id;
    const isCompleted = completedItems.includes(item.id);

    return (
      <div key={item.id} className={`${isFirst && !isCompleted ? 'rounded-2xl border-2 border-emerald-200 shadow-sm' : 'rounded-xl border border-stone-200'} ${isCompleted ? 'opacity-60' : ''} bg-white overflow-hidden`}>
        <div 
          onClick={() => toggleExpand(item.id)}
          className={`p-4 cursor-pointer hover:bg-stone-50 transition-colors ${isExpanded ? 'border-b border-stone-100' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <button 
                onClick={(e) => toggleComplete(item.id, e)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isCompleted 
                    ? 'border-emerald-600 bg-emerald-600' 
                    : 'border-stone-300 hover:border-emerald-400'
                }`}
              >
                {isCompleted && <span className="text-white text-xs">✓</span>}
              </button>
              <div>
                <p className={`font-semibold ${isCompleted ? 'text-stone-400' : 'text-stone-900'} ${isFirst && !isCompleted ? 'text-lg' : 'text-sm'}`}>
                  {item.title}
                </p>
                <p className={`text-stone-500 ${isFirst && !isCompleted ? 'text-sm' : 'text-xs'}`}>{item.subtitle}</p>
              </div>
            </div>
            <span className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="bg-emerald-50 rounded-lg p-3 mb-3">
              <p className={`text-emerald-800 ${isFirst && !isCompleted ? 'text-sm' : 'text-xs'}`}>{item.mechanism}</p>
            </div>
            
            <p className={`text-stone-500 italic mb-3 ${isFirst && !isCompleted ? 'text-sm' : 'text-xs'}`}>{item.practical}</p>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setExpandedScience(expandedScience === item.id ? null : item.id);
              }}
              className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-1 font-medium font-mono"
            >
              {expandedScience === item.id ? '▼' : '▶'} See the science
            </button>

            {expandedScience === item.id && (
              <div className="mt-3 bg-stone-50 rounded-lg p-3 font-mono">
                <p className="text-xs text-stone-700 mb-2">{item.science}</p>
                <p className="text-[10px] text-stone-500 font-medium mb-1">Peer-reviewed:</p>
                {item.citations.map((c, i) => (
                  <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="block text-[10px] text-emerald-700 underline pl-2 border-l-2 border-emerald-200 mb-1 hover:text-emerald-900">{c.text}</a>
                ))}
              </div>
            )}

            {isCompleted ? (
              <button 
                onClick={(e) => toggleComplete(item.id, e)}
                className="mt-4 w-full bg-stone-200 text-stone-700 py-2 rounded-lg text-sm font-medium hover:bg-stone-300"
              >
                ↩ Undo
              </button>
            ) : (
              <button 
                onClick={(e) => toggleComplete(item.id, e)}
                className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
              >
                ✓ Mark as done
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-sans-override max-w-2xl mx-auto p-4 sm:p-6">
      {/* Period header */}
      <div className="text-center mb-2">
        <p className="text-2xl font-semibold text-stone-900">{periodLabels[currentPeriod]}</p>
        <p className="text-sm text-stone-500">{periodDescriptions[currentPeriod]}</p>
        {currentPeriod === 'evening' && (
          <p className="text-xs text-emerald-700 mt-1 font-medium">Do these in order. By the end, they're drowsy.</p>
        )}
      </div>

      {/* Period tabs */}
      <div className="flex gap-2 justify-center mb-6">
        {periods.map(p => (
          <button 
            key={p}
            onClick={() => setCurrentPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPeriod === p 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      {/* Current period items */}
      {currentItems.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-emerald-700 mb-2 tracking-wide">
            {currentPeriod === 'evening' ? 'WIND-DOWN SEQUENCE' : 'NOW'}
          </p>
          <div className="space-y-3">
            {currentItems.map((item) => {
              const firstUncompleted = currentItems.find(i => !completedItems.includes(i.id));
              const isFirst = firstUncompleted && item.id === firstUncompleted.id;
              return renderItem(item, isFirst);
            })}
          </div>
        </div>
      )}

      {/* Coming up */}
      {upcomingItems.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-stone-400 mb-2 tracking-wide">COMING UP</p>
          <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
            {upcomingItems.slice(0, 4).map(item => (
              <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-500">{item.subtitle}</p>
                </div>
                <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-1 rounded capitalize">{item.period}</span>
              </div>
            ))}
            {upcomingItems.length > 4 && (
              <div className="px-4 py-2 text-center">
                <p className="text-xs text-stone-400">+{upcomingItems.length - 4} more</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completed from other periods */}
      {completedToday.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-stone-400 mb-2 tracking-wide">COMPLETED</p>
          <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
            {completedToday.map(item => (
              <div key={item.id} className="px-4 py-3 flex items-center justify-between opacity-50">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 text-sm">✓</span>
                  <p className="text-sm text-stone-600">{item.title}</p>
                </div>
                <button 
                  onClick={(e) => toggleComplete(item.id, e)}
                  className="text-[10px] text-stone-400 hover:text-stone-600"
                >
                  Undo
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All done state */}
      {currentItems.every(item => completedItems.includes(item.id)) && upcomingItems.length === 0 && (
        <div className="mt-4 bg-emerald-50 rounded-xl p-6 text-center border border-emerald-200">
          <p className="text-emerald-800 font-semibold">🎉 All done for today</p>
          <p className="text-emerald-700 text-sm mt-1">They should be drowsy and ready for sleep.</p>
        </div>
      )}

      {/* Bottom line */}
      <div className="mt-6 bg-stone-100 rounded-lg p-3 text-center">
        <p className="text-[10px] text-stone-600 font-medium">
          Sleep drives GH → IGF-1 → Growth Plate signaling.
        </p>
      </div>
    </div>
  );
}
