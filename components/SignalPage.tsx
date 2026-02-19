'use client';

import { useState, useEffect } from 'react';

export default function SignalPage() {
  // Auto-detect time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    return 'evening';
  };

  const [currentPeriod, setCurrentPeriod] = useState('morning');
  const [completedItems, setCompletedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

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

  const toggleComplete = (id, e) => {
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

  const toggleExpand = (id) => {
    setExpandedItem(prev => prev === id ? null : id);
  };

  const allItems = [
    // ============ MORNING ============
    { id: 'waketime', period: 'morning', title: 'Consistent wake time', subtitle: 'Same time daily, even weekends', mechanism: 'Anchors circadian rhythm for predictable GH pulses', practical: 'Pick a time and stick to it. Variability scrambles the system.', science: 'Wake time variability >1 hour correlates with reduced slow-wave sleep and blunted GH secretion.', citations: ['Wittmann M, et al. Chronobiol Int. 2006;23(1-2):497-509.'] },
    { id: 'sun', period: 'morning', title: 'Morning sunlight', subtitle: '10 min outside, no sunglasses', mechanism: "Sets tonight's melatonin clock", practical: 'Backyard, walk to bus stop, breakfast on porch.', science: 'Light exposure synchronizes the suprachiasmatic nucleus, determining melatonin onset 14-16 hours later.', citations: ['Roenneberg T, et al. Curr Biol. 2007;17(11):R462-71.'] },
    { id: 'breakfast', period: 'morning', title: 'Protein breakfast', subtitle: 'Eggs + cheese, skip the cereal', mechanism: 'Amino acids for IGF-1 synthesis', practical: 'Scrambled eggs with cheese. Takes 5 min.', science: 'BCAAs directly stimulate hepatic IGF-1 production.', citations: ['Hoppe C, et al. Eur J Clin Nutr. 2005;59(3):393-8.'] },
    { id: 'dairy1', period: 'morning', title: 'First dairy serving', subtitle: 'Milk with breakfast or yogurt', mechanism: 'Start the 24oz daily target', practical: 'Glass of milk, yogurt parfait, cheese with eggs.', science: 'Milk proteins uniquely stimulate IGF-1 via amino acid profile. +0.39cm per 8oz/day.', citations: ['Hoppe C, et al. Annu Rev Nutr. 2006;26:131-73.'] },
    { id: 'clo', period: 'morning', title: 'Cod liver oil', subtitle: "1 tsp in smoothie — they won't taste it", mechanism: 'Retinol primes GH receptors', practical: 'Blend into any smoothie. Or mix with OJ.', science: 'Retinol is required for GH receptor gene expression. Deficiency reduces GH binding by 40-60%.', citations: ['Balmer JE, et al. J Lipid Res. 2002;43(11):1773-808.'] },
    { id: 'nosugar', period: 'morning', title: 'No sugar until lunch', subtitle: 'Keeps GH active all morning', mechanism: 'Insulin suppresses GH by 60-80%', practical: 'Eggs, cheese, meat for breakfast. Fruit after lunch.', science: 'Insulin directly inhibits pituitary GH release.', citations: ['Lanzi R, et al. Metabolism. 1999;48(9):1152-6.'] },
    { id: 'backpack', period: 'morning', title: 'Light backpack', subtitle: 'Under 10-15% of body weight', mechanism: 'Heavy loads compress spine during growth', practical: 'Weigh it. Remove unnecessary items.', science: 'Chronic heavy loads can affect spinal development in children.', citations: ['Brackley HM, et al. Ergonomics. 2004;47(13):1399-1413.'] },
    { id: 'activeam', period: 'morning', title: 'Active commute', subtitle: 'Walk to school, bike, or morning play', mechanism: 'Morning movement sets up energy to burn later', practical: 'Any activity counts. Builds adenosine for tonight.', science: 'Physical activity increases adenosine accumulation, building sleep pressure throughout the day.', citations: ['Kredlow MA, et al. Sleep Med Rev. 2015;25:6-22.'] },
    
    // ============ AFTERNOON ============
    { id: 'dairy2', period: 'afternoon', title: 'Dairy with lunch', subtitle: 'Milk, yogurt, or cheese', mechanism: '+0.39cm per 8oz milk/day', practical: 'Any form counts toward 24oz daily target.', science: 'Milk proteins uniquely stimulate IGF-1 production.', citations: ['Hoppe C, et al. Annu Rev Nutr. 2006;26:131-73.'] },
    { id: 'nosugarpm', period: 'afternoon', title: 'Water, not juice/soda', subtitle: 'Save sugar for strategic moments', mechanism: 'Random sugar spikes blunt GH all day', practical: 'Water or milk. Save treats for post-sprint.', science: 'Each insulin spike suppresses GH for 2-3 hours.', citations: ['Lanzi R, et al. Metabolism. 1999;48(9):1152-6.'] },
    { id: 'nonap', period: 'afternoon', title: 'No naps after 2-3pm', subtitle: 'Early naps only if needed', mechanism: 'Late naps steal sleep pressure from tonight', practical: 'If they must nap, keep it before 2pm and under 30 min.', science: 'Naps >30min after 3pm reduce slow-wave sleep and delay sleep onset.', citations: ['Milner CE, et al. Sleep Med Rev. 2009;13(3):227-36.'] },
    { id: 'presprint', period: 'afternoon', title: 'Pre-sprint fuel (sprint days)', subtitle: 'Eggs + peanuts 30 min before', mechanism: 'Choline + niacin prime GH expression', practical: 'Hard boiled egg and handful of peanuts.', science: 'Niacin enhances GH response to exercise by 300-400%.', citations: ['Quabbe HJ, et al. J Clin Endocrinol Metab. 1983;57(6):1263-9.'] },
    { id: 'sprint', period: 'afternoon', title: '6x 30-second sprints (3x/week)', subtitle: 'All-out effort. Make it a race.', mechanism: '771% GH spike — nothing else comes close', practical: 'Race them down the street 6 times. 10 min total.', science: 'Maximal sprints trigger massive GH via lactate surge.', citations: ['Stokes KA, et al. J Sports Sci. 2002;20(6):487-94.'] },
    { id: 'postmilk', period: 'afternoon', title: 'Milk + honey after sprints', subtitle: 'Within 30 min. Chocolate milk works.', mechanism: 'Converts GH → IGF-1. Without this, GH is wasted.', practical: "They're thirsty anyway. Add honey for carbs.", science: 'Post-exercise protein required for IGF-1 synthesis.', citations: ['Cappon J, et al. J Appl Physiol. 1994;76(6):2490-6.'] },
    { id: 'play', period: 'afternoon', title: 'Outdoor play until dinner', subtitle: 'Parks, bikes, running around', mechanism: 'Burns energy → exhausted by bedtime', practical: 'The more active, the easier tonight will be.', science: 'Physical activity increases adenosine, building sleep pressure.', citations: ['Kredlow MA, et al. Sleep Med Rev. 2015;25:6-22.'] },
    { id: 'jump', period: 'afternoon', title: 'Jumping / impact play', subtitle: 'Jump rope, basketball, trampoline', mechanism: 'Impact stimulates growth plates directly', practical: 'Any jumping activity. Even jumping jacks.', science: 'Mechanical loading triggers osteoblast activity at growth plates.', citations: ['Bass SL, et al. J Bone Miner Res. 1998;13(3):500-7.'] },
    { id: 'hang', period: 'afternoon', title: 'Dead hang / monkey bars', subtitle: 'Pull-up bar in doorway. Even 30 sec helps.', mechanism: 'Spinal decompression — discs expand', practical: 'Playground monkey bars or doorway pull-up bar.', science: 'Hanging creates tensile force that rehydrates intervertebral discs.', citations: ['Nachemson AL. Spine. 1981;6(1):93-7.'] },
    
    // ============ EVENING ============
    { id: 'nointense', period: 'evening', title: 'No intense exercise after 6pm', subtitle: 'Calm activities only', mechanism: 'Late exercise raises core temp when it needs to fall', practical: 'Save the running around for afternoon.', science: 'Exercise within 2 hours of bed delays sleep onset.', citations: ['Kredlow MA, et al. Sleep Med Rev. 2015;25:6-22.'] },
    { id: 'dinnerpro', period: 'evening', title: 'Protein at dinner', subtitle: 'Meat, fish, eggs, or dairy', mechanism: 'Substrate for overnight tissue repair', practical: 'Any protein source works.', science: 'Evening protein increases overnight muscle protein synthesis by 22%.', citations: ['Res PT, et al. Med Sci Sports Exerc. 2012;44(8):1560-9.'] },
    { id: 'dairy3', period: 'evening', title: 'Third dairy serving', subtitle: 'Cheese with dinner or sleepy drink', mechanism: 'Hits the 24oz daily target', practical: 'The sleepy drink counts as dairy too.', science: 'Consistent dairy intake correlates with linear growth velocity.', citations: ['Hoppe C, et al. Annu Rev Nutr. 2006;26:131-73.'] },
    { id: 'glycine', period: 'evening', title: '① Glycine with dinner', subtitle: 'Add to any food — invisible', mechanism: 'Lowers core temp → sleep onset begins', practical: "Soup, rice, pasta sauce. They won't taste it.", science: 'Glycine acts on NMDA receptors, lowering core body temperature — the primary trigger for sleep initiation.', citations: ['Kawai N, et al. Neuropsychopharmacology. 2015;40(6):1405-16.'] },
    { id: 'nosugareve', period: 'evening', title: 'No sugar after dinner', subtitle: 'One dessert can block 80% of GH', mechanism: 'Insulin blocks the entire overnight GH pulse', practical: 'If dessert, make it small and early.', science: 'Insulin directly inhibits pituitary GH for 2-3 hours.', citations: ['Lanzi R, et al. Metabolism. 1999;48(9):1152-6.'] },
    { id: 'nolate', period: 'evening', title: 'No food 2-3 hrs before bed', subtitle: 'Dinner done by 6pm ideally', mechanism: 'Digestion interferes with deep sleep', practical: 'Earlier dinner = better sleep.', science: 'Late eating reduces slow-wave sleep and GH secretion.', citations: ['Crispim CA, et al. Int J Obes. 2011;35(10):1308-14.'] },
    { id: 'noscreens', period: 'evening', title: 'No screens after dinner', subtitle: 'Or Night Shift max + blue blockers', mechanism: 'Blue light delays melatonin 90+ min', practical: 'TV is better than tablets/phones. Distance matters.', science: 'Blue light (460-480nm) suppresses melatonin via melanopsin receptors.', citations: ['Cajochen C, et al. J Clin Endocrinol Metab. 2005;90(3):1311-6.'] },
    { id: 'bath', period: 'evening', title: 'Warm bath (optional)', subtitle: '20 min before wind-down', mechanism: 'Paradoxically cools core temp after', practical: 'Add epsom salt for extra magnesium.', science: 'Post-bath cooling triggers sleep onset mechanisms.', citations: ['Haghayegh S, et al. Sleep Med Rev. 2019;46:124-35.'] },
    { id: 'magnesium', period: 'evening', title: '② Magnesium lotion', subtitle: 'Rub on feet and shoulders', mechanism: 'Drowsy in 20 min', practical: "Do it while they watch TV. Works even when they're wired.", science: 'Magnesium activates the parasympathetic nervous system and regulates melatonin.', citations: ['Abbasi B, et al. J Res Med Sci. 2012;17(12):1161-1169.'] },
    { id: 'stretch', period: 'evening', title: 'Gentle stretching (optional)', subtitle: 'Calm, slow movements', mechanism: 'Activates parasympathetic system', practical: 'Simple stretches while watching TV.', science: 'Slow stretching increases HRV and parasympathetic tone.', citations: ['Cowen VS, et al. Int J Yoga. 2010;3(1):3-9.'] },
    { id: 'cherry', period: 'evening', title: '③ Sleepy drink', subtitle: 'Tart cherry juice (1oz) + warm milk', mechanism: 'Melatonin + tryptophan knockout combo', practical: "Make it a ritual. They'll start asking for it.", science: 'Montmorency cherries contain melatonin (13.5ng/g). Milk α-lactalbumin has highest tryptophan of any food.', citations: ['Howatson G, et al. Eur J Nutr. 2012;51(8):909-16.'] },
    { id: 'routine', period: 'evening', title: 'Same routine every night', subtitle: 'Same order, same time', mechanism: 'Brain auto-releases melatonin when routine starts', practical: 'Bath → lotion → drink → books → bed. Pavlovian in 1-2 weeks.', science: 'Consistent routines activate anticipatory circadian mechanisms.', citations: ['Mindell JA, et al. Sleep. 2015;38(5):717-22.'] },
    { id: 'coolroom', period: 'evening', title: 'Cool room: 65-68°F', subtitle: 'Crack window, use fan', mechanism: 'Body must drop 2-3°F for deep sleep', practical: 'Cool room + warm blanket = fastest sleep onset.', science: 'Core temp drop of 1-1.5°C required for sleep initiation.', citations: ['Kräuchi K, et al. Nature. 1999;401(6748):36-7.'] },
    { id: 'dark', period: 'evening', title: 'Complete darkness', subtitle: 'Blackout curtains, cover all LEDs', mechanism: 'Even dim light suppresses GH', practical: 'Tape over any lights. Blackout curtains are worth it.', science: 'Light during sleep reduces GH secretion by 50%+.', citations: ['Gooley JJ, et al. J Clin Endocrinol Metab. 2011;96(3):E463-72.'] },
    { id: 'lights', period: 'evening', title: '④ Dim/red lights → bed', subtitle: "They're already drowsy", mechanism: 'No fight. They want to sleep.', practical: 'Red bulbs or lamps only. Then lights out.', science: 'Blue light suppresses melatonin by 50%+. By now, the biochemical cascade is complete.', citations: ['Gooley JJ, et al. J Clin Endocrinol Metab. 2011;96(3):E463-72.'] },
    { id: 'bedtime', period: 'evening', title: 'In bed by 8-8:30pm', subtitle: 'Asleep by 8:30-9pm', mechanism: 'First 90 min = 70% of GH release', practical: 'Non-negotiable. Everything else builds to this.', science: 'The first slow-wave cycle contains majority of nocturnal GH secretion.', citations: ['Van Cauter E, et al. JAMA. 2000;284(7):861-8.'] },
  ];

  const periods = ['morning', 'afternoon', 'evening'];
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

  const renderItem = (item, isFirst = false) => {
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
                setExpandedItem(expandedItem === item.id + '-science' ? item.id : item.id + '-science');
              }}
              className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-1 font-medium"
            >
              {expandedItem === item.id + '-science' ? '▼' : '▶'} See the science
            </button>

            {expandedItem === item.id + '-science' && (
              <div className="mt-3 bg-stone-50 rounded-lg p-3">
                <p className="text-xs text-stone-700 mb-2">{item.science}</p>
                <p className="text-[10px] text-stone-500 font-medium mb-1">Peer-reviewed:</p>
                {item.citations.map((c, i) => (
                  <p key={i} className="text-[10px] text-stone-500 pl-2 border-l-2 border-emerald-200 mb-1">{c}</p>
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
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
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
