'use client';

import Link from 'next/link';

export default function ShoppingListPage() {
  return (
    <div style={{ maxWidth:480, margin:"0 auto", padding:"0 20px 60px", fontFamily:"'Courier New', Courier, monospace" }}>
      {/* Back nav */}
      <div style={{ paddingTop:20, marginBottom:24 }}>
        <Link href="/home" style={{ fontSize:12, fontWeight:600, color:"#065f46", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
      </div>

      <div style={{ fontSize:20, fontWeight:900, color:"#1c1917", letterSpacing:"-0.02em", textAlign:"center" }}>
        Shopping List
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#44403c", marginTop:6, fontWeight:400 }}>Ranked by importance &middot; buy the top items first</div>
      </div>

      {/* Tier 1 — Non-negotiable */}
      <div style={{ marginTop:28, marginBottom:28 }}>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Tier 1 — Non-negotiable</div>
        {[
          { item:"A2 whole milk (organic, full-fat)", note:"Daily target: 20–24 oz. Bowl/smoothie + post-sprint + Sleep Drink. Each 8 oz/day = +0.39 cm." },
          { item:"Sheep yogurt (plain, whole)", note:"35× more lactoferrin. 5 oz = 8 oz A2 milk. Height Bowl base." },
          { item:"Pasture-raised eggs", note:"2–3 daily. Richest whole-food choline source. Sunny side up." },
          { item:"Grass-fed beef (any cut)", note:"Richest glutamine + ornithine + tyrosine. Daily protein rotation." },
          { item:"Beef liver (grass-fed)", note:"Most nutrient-dense food on earth. Mix 2 tbsp into meatballs — kids won't taste it." },
          { item:"Turkey breast", note:"Highest niacin + arginine per gram of any common meat. Dinner rotation." },
          { item:"Wild-caught salmon", note:"Omega-3s + vitamin D (271% RDA) + niacin. 2–3×/wk. Never farmed." },
          { item:"Cooked oysters", note:"28.2mg zinc per 3 oz — full week's supply. GH receptor cofactor. 1×/wk." },
          { item:"Natural peanut butter (no added oils/sugar)", note:"Highest niacin food. Arginine. Bowl/smoothie + pre-sprint snack." },
          { item:"Pumpkin seeds (raw)", note:"Highest practical arginine (~7g/cup) + zinc + magnesium + tryptophan. Copenhagen: +0.33 cm/yr." },
          { item:"Lemon-flavored cod liver oil", note:"½ tsp daily. Retinol + D + omega-3 in one spoon. Hidden in the smoothie." },
          { item:"Bone broth", note:"Richest glycine source. Dinner starter. Lowers core temp for sleep + growth plate collagen." },
          { item:"Bovine gelatin (unflavored)", note:"Pure collagen. Homemade jello with tart cherry. Glycine dessert." },
          { item:"Lentils & beans (chickpeas, black beans, kidney beans)", note:"DAILY. Iron + lysine + inositol + arginine + magnesium + fiber. Plant protein delays puberty = longer growth window. Pair with red bell pepper for vitamin C." },
          { item:"Carrots", note:"Beta-carotene → retinol. Supports vitamin A pathway for bone growth and immune function." },
          { item:"Raw honey", note:"Compliance driver. Post-sprint milk + Bowl drizzle. Gentle insulin for IGF-1 conversion." },
                  ].map((r, i) => (
          <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"baseline" }}>
            <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#065f46", minWidth:20, textAlign:"right" }}>{i+1}</span>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:"#1c1917" }}>{r.item}</div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#57534e", marginTop:2 }}>{r.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tier 2 — Important */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#44403c", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Tier 2 — Important</div>
        {[
          { item:"Frozen berries (organic)", note:"Vitamin C + antioxidants. Bowl/smoothie. Masks CLO flavor. Raspberries support melatonin." },
          { item:"Red bell peppers", note:"190mg vitamin C per cup — 3× more than oranges. Alongside eggs + iron meals." },
          { item:"Broccoli", note:"DIM — delays growth plate closure by blocking aromatase. Every lunch and dinner." },
          { item:"Broccoli sprouts", note:"20–100× more sulforaphane than mature broccoli. Recovery smoothie after junk food. Activates Nrf2 detox." },
          { item:"Tart cherry juice (100%, unsweetened)", note:"Highest food melatonin. Sleep Drink + gelatin jello. No blends, no added sugar." },
          { item:"Chicken breast", note:"High ornithine + niacin + arginine. Versatile dinner rotation protein." },
          { item:"Sauerkraut, kimchi, or natto", note:"Even 2 tbsp counts. GABA via gut-brain axis. Natto adds vitamin K2 for growth plates." },
          { item:"Kefir (full-fat, grass-fed)", note:"Fermented dairy. GABA-producing bacteria + all 6 milk height proteins. Counts toward daily dairy." },
          { item:"Collard greens", note:"Lower oxalate than spinach. Magnesium + vitamin K + calcium. Primary leafy green." },
          { item:"Pineapple", note:"Bromelain aids amino acid extraction from meats. Serotonin support. Manganese for bone." },
                    { item:"Hemp hearts", note:"Complete protein — all essential aminos. Bowl topping." },
          { item:"Bananas", note:"Smoothie version. Potassium + creaminess. Dopamine signaling." },
          { item:"Allulose or monk fruit sweetener", note:"Zero insulin spike. Gelatin jello + homemade ice cream sweetener." },
          { item:"Epsom salt", note:"Warm bath before bed. Transdermal magnesium for deeper SWS." },
          { item:"Magnesium lotion", note:"Feet and shoulders at bedtime. Best absorbed for sleep — activates GABA receptors." },
        ].map((r, i) => (
          <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"baseline" }}>
            <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#57534e", minWidth:20, textAlign:"right" }}>{i+18}</span>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:"#1c1917" }}>{r.item}</div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#57534e", marginTop:2 }}>{r.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tier 3 — Nice to have */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#57534e", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Tier 3 — Nice to have</div>
        {[
          { item:"Pistachios", note:"Highest melatonin per gram of any nut. Best evening snack." },
          { item:"Walnuts", note:"Melatonin support + omega-3s. Evening snack." },
          { item:"Sardines / mackerel (with bones)", note:"Calcium + vitamin D + omega-3. Bone density. Wild-caught only." },
          { item:"Brussels sprouts / cauliflower", note:"Extra vitamin C vegetables for iron meals. Roast with olive oil — kids love the crunch." },
          { item:"Watermelon", note:"Citrulline → arginine. Better oral bioavailability than arginine itself." },
          { item:"Beets", note:"Dopamine signaling — directly inhibits somatostatin release." },
          { item:"Fresh ginger", note:"Increases ghrelin — natural GH secretagogue. In meals or as tea." },
          { item:"Coconut oil", note:"Pre-sprint fuel. Short-term GH boost up to 4 hours. Stacks with sprint pulse." },
          { item:"Shredded coconut (unsweetened)", note:"Bowl topping. Medium-chain fats." },
          { item:"Quinoa / buckwheat", note:"Complete plant proteins. Low-GI carb base. mTOR support." },
        ].map((r, i) => (
          <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"baseline" }}>
            <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:16, fontWeight:800, color:"#57534e", minWidth:20, textAlign:"right" }}>{i+34}</span>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:"#1c1917" }}>{r.item}</div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#57534e", marginTop:2 }}>{r.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#57534e", textAlign:"center", marginTop:20, lineHeight:1.6, fontStyle:"italic" }}>
        Start with Tier 1. Add Tier 2 when it feels easy. Tier 3 whenever you want.
      </div>
    </div>
  );
}
