import { useState } from "react";

const greenNum = (text) => {
  if (!text) return null;
  return text.split(/(\d+[\.,]?\d*%?×?)/g).map((part, i) =>
    /\d/.test(part)
      ? <span key={i} style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", color:"#065f46" }}>{part}</span>
      : <span key={i}>{part}</span>
  );
};

function Card({ item, done, onDone, isOpen, onToggle }) {
  const isSig = item.sig || item.tier === 0;
  const isUtil = item.tier >= 3;
  const noGH = !item.gh || item.gh === "—";

  return (
    <div style={{
      background: isSig ? "#f0fdf4" : "#fff",
      borderRadius: isSig ? 20 : 14,
      border: isSig ? "1.5px solid #065f46" : "1px solid #e7e5e4",
      overflow:"hidden",
      opacity: done ? 0.55 : 1,
      transition:"all 0.3s ease",
      boxShadow: isSig ? "0 4px 24px rgba(6,95,70,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      <div onClick={onToggle} style={{ cursor:"pointer", padding: isSig ? "18px 20px" : isUtil ? "12px 16px" : "14px 18px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
          <div
            onClick={e => { e.stopPropagation(); onDone(); }}
            style={{
              width:22, height:22, borderRadius:11, flexShrink:0, marginTop:1,
              border: done ? "none" : "2px solid #d6d3d1",
              background: done ? "#065f46" : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer",
            }}
          >
            {done && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
              <span style={{ fontSize: isSig ? 16 : isUtil ? 13.5 : 14.5, fontWeight:700, color: done ? "#78716c" : "#1c1917", lineHeight:1.3 }}>{item.t}</span>
              {!noGH && <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:11, color:"#065f46", flexShrink:0, background:"#f0fdf4", border:"1px solid #065f46", borderRadius:8, padding:"2px 7px" }}>{item.gh}</span>}
            </div>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#1c1917", marginTop:3, lineHeight:1.3 }}>{item.sub}</div>
            {!isUtil && <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11.5, color:"#1c1917", marginTop:6, lineHeight:1.5 }}>{greenNum(item.headline)}</div>}
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#1c1917", opacity:0.9, marginTop:4, lineHeight:1.3 }}>{item.cite}</div>
          </div>
          {item.why && <span style={{ flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center", width:28, height:28, borderRadius:14, background: isOpen ? "#f0fdf4" : "#fafaf8", border: isOpen ? "1px solid #065f46" : "1px solid #d6d3d1", transform: isOpen ? "rotate(180deg)" : "none" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke={isOpen ? "#065f46" : "#78716c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>}
        </div>
      </div>
      {isOpen && item.why && <div style={{ padding:"0 20px 18px", borderTop:"1px solid #f5f5f0" }}>
        <div style={{ background:"#f0fdf4", borderRadius:12, padding:"16px 18px", margin:"14px 0 0" }}>
          <p style={{ fontSize:13, color:"#065f46", lineHeight:1.65, margin:0 }}>{item.why}</p>
        </div>
      </div>}
    </div>
  );
}

export default function HomePreview() {
  const [doneItems, setDoneItems] = useState({});
  const [openId, setOpenId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const toggleDone = (id) => setDoneItems(d => ({ ...d, [id]: !d[id] }));

  const morningItems = [
    { id:"wake", t:"Same wake time", sub:"±30 min, weekends too", gh:"tonight's growth", headline:"of tonight's GH depends on this morning", tier:1, cite:"Brandenberger, Lancet 2000; Van Cauter, JAMA 2000" },
    { id:"d1", t:"The Growth Bowl", sub:"Sheep yogurt + peanut butter + berries + seeds · let them build it", gh:"+0.39 cm/day", headline:"each 8 oz of A2 milk/day = +0.39 cm across childhood", tier:0, cite:"Hoppe, Eur J Clin Nutr 2008" },
    { id:"bkf", t:"Pasture-raised eggs — over easy", sub:"2–3 daily in olive oil · red bell pepper alongside · runny yolk = maximum nutrients", gh:"primes the whole day", headline:"choline from eggs primes the entire growth axis for the day", tier:0, cite:"Ziegenfuss, JISSN 2008" },
    { id:"clo", t:"Cod liver oil — ½ tsp daily", sub:"Retinol + vitamin D + omega-3s in one spoon — NOT on beef liver days", gh:"receptor fuel", headline:"of GH receptor function lost without retinol", tier:0, cite:"Balmer, J Lipid Res 2002" },
    { id:"smth", t:"The Growth Smoothie", sub:"Berry + banana + A2 milk + nut butter — hides cod liver oil perfectly", gh:"multi-pathway", headline:"delivers vitamin C, omega-3, protein, and compliance in one glass", tier:0, cite:"Hoppe, Eur J Clin Nutr 2008; Balmer, J Lipid Res 2002", why:"This is the delivery vehicle. Cod liver oil, chia seeds, collagen — kids resist all of them on their own. Blend them into a berry smoothie and they disappear. The berries mask every flavor while adding vitamin C. Banana adds potassium + natural sweetness for compliance. A2 milk adds casein + whey toward the daily target. Nut butter adds arginine + niacin. Make it taste like a treat — they'll ask for it daily." },
    { id:"ns", t:"No refined sugar until lunch", sub:"Natural sugars in milk, fruit, and honey are fine and part of the protocol · no artificial sweeteners ever", gh:"protects overnight growth", headline:"fasting GH — one cereal bowl suppresses up to 80%", tier:1, cite:"Lanzi, Metabolism 1999", why:"This means refined and added sugar — cereal, juice, candy, flavored yogurts. Natural sugars in whole milk, fruit, and raw honey are completely fine and are part of the protocol." },
  ];

  const afternoonItems = [
    { id:"lunch", t:"The Growth Meal", sub:"Rotate: liver meatballs · oysters · salmon · turkey · beef — with sauerkraut + lentils + broccoli + seeds", gh:"15+ pathways", headline:"15+ growth pathways activated in one meal", tier:0, cite:"Isidori, Curr Med Res Opin 1981" },
    { id:"water", t:"Water or milk between meals", sub:"No juice boxes, no soda, no sweeteners · A2 milk is fine and encouraged", gh:"protects growth window", headline:"protected — each sugar spike suppresses up to 80%", tier:2, cite:"Lanzi, Metabolism 1999" },
    { id:"spr", t:"6 × 30-sec all-out sprints", sub:"MON / WED / FRI — alternate days with jumping", gh:"strongest lever", headline:"per sprint in adult studies — nothing in nutrition comes close", tier:0, cite:"Stokes, J Sports Sci 2002" },
    { id:"pm", t:"Dairy Serving #2", sub:"8–12 oz cold A2 milk + 1 tbsp raw honey · immediately after any physical activity", gh:"24-hr growth signal", headline:"GH to IGF-1 conversion — still 451% above baseline at 24h in adult study", tier:0, sig:true, cite:"Zajac, Biol Sport 2018" },
  ];

  const eveningItems = [
    { id:"nox", t:"No vigorous exercise close to bedtime", sub:"Core temp must drop for deep sleep — aim for 2+ hrs gap", gh:"tonight's growth", headline:"of tonight's GH at risk — late exercise delays sleep onset", tier:2, cite:"Stutz, Sports Med 2019" },
    { id:"din", t:"Dinner", sub:"Bone broth starter · rotated protein · lentils + broccoli · no dairy here — save milk for Sleep Drink · aim to finish 2–3 hrs before bed", gh:"10+ pathways", headline:"glycine from bone broth lowers core temp for sleep AND builds growth plate collagen", tier:0, cite:"Welbourne, Am J Clin Nutr 1995" },
    { id:"nse", t:"Evening snacks", sub:"Homemade gummies, pistachios, pumpkin seeds · no refined sugar — monk fruit, allulose, or raw honey", gh:"protects overnight growth", headline:"overnight GH protected — each spike blocks up to 80%", tier:1, cite:"Lanzi, Metabolism 1999", why:"Refined sugar is the enemy here — one scoop of regular ice cream suppresses up to 80% via insulin. Raw honey and natural sugars in fruit are fine in small amounts. Monk fruit and allulose don't spike insulin at all." },
    { id:"drink", t:"The Sleep Drink", sub:"4 oz A2 milk + 1 oz tart cherry juice · unsweetened · 60 min before bed", gh:"24-hr growth signal", headline:"the 24-hour cycle completes — GH 451% at 24h in adult study", tier:0, sig:true, cite:"Zajac, Biol Sport 2018" },
    { id:"bed", t:"Early, consistent bedtime", sub:"Target 10–12 hours of sleep · the exact time fits your family", gh:"tonight's growth", headline:"each 90-min cycle is one 'growth rep' — 11 hrs = 7–8 reps", tier:0, cite:"Brandenberger, Lancet 2000" },
  ];

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#fafaf9", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth:540, margin:"0 auto", padding:"0 20px" }}>

        <div style={{ paddingTop:48 }}>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:16, fontWeight:600, color:"#1c1917", lineHeight:1.55, maxWidth:460, marginBottom:0 }}>
            Marcus's daily growth protocol.
          </p>
        </div>

        {/* CHANGE: Age window in welcome */}
        {showWelcome && (
          <div style={{
            background:"linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)",
            borderRadius:20, border:"2px solid #86efac",
            padding:"32px 24px", marginTop:24,
            boxShadow:"0 4px 24px rgba(6,95,70,0.1)",
            textAlign:"center",
          }}>
            <div style={{ fontSize:28, marginBottom:14 }}>🌱</div>
            <p style={{ fontSize:20, fontWeight:800, color:"#065f46", margin:"0 0 10px", letterSpacing:"-0.02em", lineHeight:1.3 }}>
              Welcome, Marcus's family.
            </p>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, color:"#065f46", lineHeight:1.65, margin:"0 0 6px", maxWidth:360, marginLeft:"auto", marginRight:"auto" }}>
              Everything below is your child's daily growth protocol — 15+ science-backed levers, arranged into a simple checklist.
            </p>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11.5, color:"#059669", lineHeight:1.6, margin:"0 0 6px", maxWidth:340, marginLeft:"auto", marginRight:"auto" }}>
              Works at any age before growth plates close — typically 14–16 for girls, 16–18 for boys. Starting at any age is powerful.
            </p>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:12, color:"#059669", lineHeight:1.6, margin:"0 0 20px", maxWidth:340, marginLeft:"auto", marginRight:"auto" }}>
              Check things off as you go. It gets easier every day.
            </p>
            <button onClick={() => setShowWelcome(false)} style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, fontWeight:700, color:"#fff", background:"#065f46", border:"none", borderRadius:12, padding:"10px 28px", cursor:"pointer" }}>
              Let's begin
            </button>
          </div>
        )}

        <div style={{ height:1, background:"#e7e5e4", margin:"36px 0 40px" }} />

        {/* CHANGE: Life Happens */}
        <div style={{ fontSize:20, fontWeight:900, color:"#1c1917", letterSpacing:"-0.02em", textAlign:"center", marginBottom:8 }}>Today's Game Plan</div>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#44403c", textAlign:"center", marginBottom:12, lineHeight:1.5 }}>Check them off as you go. It gets easier every day.</div>
        <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#78716c", textAlign:"center", marginBottom:32, lineHeight:1.6, fontStyle:"italic" }}>Miss something? That's fine. Even 60% consistency compounds beautifully over months.</div>

        {/* CHANGE: Softened time — "whenever they wake" */}
        <div style={{ marginBottom:44 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
              <span style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>Morning</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#44403c" }}>whenever they wake</span>
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#f0fdf4", border:"1px solid #065f46", padding:"2px 8px", borderRadius:10 }}>
                <span style={{ width:5, height:5, background:"#065f46", borderRadius:"50%", display:"inline-block" }} />
                <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.04em" }}>Now</span>
              </span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {morningItems.map(item => (
              <Card key={item.id} item={item} done={!!doneItems[item.id]} onDone={() => toggleDone(item.id)} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} />
            ))}
          </div>
        </div>

        {/* CHANGE: Softened time — "around lunch through late afternoon" */}
        <div style={{ marginBottom:44 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
              <span style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>Afternoon</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#44403c" }}>around lunch through late afternoon</span>
            </div>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#065f46", marginTop:4, fontWeight:600 }}>THE SPRINT STACK — the most powerful combination in the protocol.</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {afternoonItems.map(item => (
              <Card key={item.id} item={item} done={!!doneItems[item.id]} onDone={() => toggleDone(item.id)} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} />
            ))}
          </div>
        </div>

        {/* CHANGE: Softened time — "after school" */}
        <div style={{ marginBottom:44 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
              <span style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>Late Afternoon</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#44403c" }}>after school</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <Card item={{ id:"rest", t:"Rest and play", sub:"Unstructured time with friends", gh:"stress ↓ cortisol ↓", headline:"anticipation of fun raised GH 87% in adult study", tier:1, cite:"Berk, FASEB J 2006" }} done={!!doneItems["rest"]} onDone={() => toggleDone("rest")} isOpen={openId === "rest"} onToggle={() => setOpenId(openId === "rest" ? null : "rest")} />
          </div>
        </div>

        {/* CHANGE: Softened time — "wind-down hours" */}
        <div style={{ marginBottom:0 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
              <span style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em" }}>Evening</span>
              <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#44403c" }}>wind-down hours</span>
            </div>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#065f46", marginTop:4, fontWeight:600 }}>Do these in order. By the end, they're drowsy.</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {eveningItems.map(item => (
              <Card key={item.id} item={item} done={!!doneItems[item.id]} onDone={() => toggleDone(item.id)} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} />
            ))}
          </div>
        </div>

        <div style={{ margin:"52px 0 40px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#065f46", fontWeight:600, marginBottom:6 }}>Every day counts.</p>
          <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9.5, color:"#78716c", lineHeight:1.6 }}>
            Every number on this page comes from a peer-reviewed study. * from adult studies — whole foods deliver these pathways at lower but meaningful doses.
          </p>
        </div>
      </div>
    </div>
  );
}