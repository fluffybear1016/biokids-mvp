import Link from 'next/link';
import LandingHeightPredictor from '@/components/LandingHeightPredictor';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", textDecoration: 'none', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#065f46', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>bioKids</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#065f46', borderRadius: 4, padding: '1px 5px', letterSpacing: '0.08em', marginLeft: 4 }}>BETA</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/about" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1c1917', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-sm">About</Link>
            <Link href="/learn" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1c1917', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-sm">Learn</Link>
            <Link href="/home" className="text-xs sm:text-sm" style={{ background: '#065f46', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Open the Protocol</Link>
          </div>
        </div>
      </nav>

      {/* Hero — the +4.3cm moment */}
      <section className="pt-24 sm:pt-32 pb-0 sm:pb-0 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-4 sm:mb-6">
            <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3.75rem)', color: '#1c1917', marginBottom: '1.25rem', fontWeight: 800, lineHeight: 1.15 }}>
              Teach <span style={{ color: '#065f46' }}>Height.</span>
            </h1>

            <h2 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#57534e', marginBottom: '1.25rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75, fontWeight: 400 }}>
              The parent&apos;s system for growing taller kids naturally &mdash; backed by 250+ medical studies.
            </h2>
            <div className="flex flex-col items-center gap-3" style={{ marginTop: '2rem' }}>
              <a href="#height-calculator" style={{ background: '#065f46', color: 'white', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", display: 'inline-block' }} className="sm:text-lg">
                Free Height Calculator
              </a>
              <p style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-sm">See how tall your child could be</p>
            </div>
          </div>

        </div>
      </section>

      {/* Height Predictor */}
      <div id="height-calculator">
        <LandingHeightPredictor />
      </div>

      {/* Growth Trajectory Graph */}
      <section style={{ padding: '0 1rem 3rem', backgroundColor: '#fafaf9' }} className="sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div style={{ maxWidth: '48rem', margin: '0 auto', background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '1rem 1.125rem' }} className="sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 style={{ fontWeight: 600, color: '#1c1917', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem' }} className="sm:text-base">Height Trajectory</h3>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm" style={{ fontFamily: "'Courier New', Courier, monospace", color: '#1c1917', fontWeight: 500 }}>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }}></span>
                  Average Child
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#065f46', display: 'inline-block' }}></span>
                  bioKid
                </span>
              </div>
            </div>

            {/* SVG Graph */}
            <div className="relative h-48 sm:h-64">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M 20 180 Q 50 170, 80 155 Q 120 135, 180 115 Q 250 95, 320 85 Q 360 82, 380 80" fill="none" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />
                <path d="M 20 180 Q 50 165, 80 140 Q 120 100, 180 60 Q 250 30, 320 18 Q 360 12, 380 10" fill="none" stroke="#065f46" strokeWidth="3" strokeLinecap="round" />
                <circle cx="20" cy="180" r="6" fill="#065f46" />
                <circle cx="380" cy="80" r="5" fill="#d1d5db" />
                <circle cx="380" cy="10" r="6" fill="#065f46" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] sm:text-xs px-2 sm:px-4" style={{ color: '#1c1917', fontFamily: "'Courier New', Courier, monospace" }}>
                <span>Birth</span>
                <span className="hidden sm:inline">Age 5</span>
                <span className="sm:hidden">5</span>
                <span className="hidden sm:inline">Age 10</span>
                <span className="sm:hidden">10</span>
                <span className="hidden sm:inline">Age 15</span>
                <span className="sm:hidden">15</span>
                <span className="hidden sm:inline">Age 25</span>
                <span className="sm:hidden">25</span>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#57534e', marginTop: '1rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-sm">
              Same genes, different environment. The gap compounds every year.
            </p>
          </div>
        </div>
      </section>

      {/* Key message — below the fold */}
      <section style={{ padding: 'var(--py-8, 2rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: '#57534e', lineHeight: 1.85, marginBottom: '0.75rem' }}>
            From childhood through 25 years old. No prescriptions, no meds, just the levers parents actually control.
          </p>
        </div>
      </section>

      {/* The Gap Section — polygenic framing (felt, not explained) */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#065f46' }} className="sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 800 }} className="sm:text-4xl">Height optimization isn&apos;t taught.</h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-xl">
            Not in schools. Not at checkups. Not by coaches. The science exists &mdash; it&apos;s just buried in academic journals that no parent has time to read.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base">
            We spent 2,400+ hours reading them and turned it into a daily protocol. Now it&apos;s yours.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1.5px solid #065f46', position: 'relative' }}>
              <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2rem', color: '#d1fae5', lineHeight: 1, marginBottom: '0.5rem' }}>&ldquo;</div>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', lineHeight: 1.7, marginBottom: '1rem' }}>
                I&apos;ve trained top NBA talent all the way down to elementary school kids. The limiting factor is always height. bioKids might just change the game forever&hellip;
              </p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>Thomas</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#57534e' }}>Athletic Trainer &middot; Miami</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e7e5e4', position: 'relative' }}>
              <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2rem', color: '#d1fae5', lineHeight: 1, marginBottom: '0.5rem' }}>&ldquo;</div>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', lineHeight: 1.7, marginBottom: '1rem' }}>
                My son just turned 13 and went from the 60th to 87th percentile for height thanks to bioKids. My husband and I are 5&apos;9 and 5&apos;7.5&rdquo; respectively. I am starting my other two boys 11 and 7 on bioKids now.
              </p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>Maggie</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#57534e' }}>Mom of 3 &middot; New York</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e7e5e4', position: 'relative' }}>
              <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2rem', color: '#d1fae5', lineHeight: 1, marginBottom: '0.5rem' }}>&ldquo;</div>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', lineHeight: 1.7, marginBottom: '1rem' }}>
                Both my kids are in the 99th percentile, 8 and 7 years old. We helped create the bioKids protocol and are starting tennis lessons for them next year in hopes of a D1 scholarship.
              </p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>Jeffrey</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#57534e' }}>Dad of 2 &middot; New York</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — trust builder */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.25rem', color: '#1c1917', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }} className="sm:text-2xl">
            Questions parents ask
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                Is this real? Can my child actually get taller from this?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>Yes. Height is polygenic &mdash; controlled by thousands of gene variants, each contributing tiny amounts. But genes set a <em>range</em>, not a fixed number. The environment determines where in that range your child lands.</p>
                <p style={{ marginBottom: '0.75rem' }}>A 24-week study of short-stature children found that a jumping protocol produced <span style={{ fontWeight: 700, color: '#065f46' }}>+4.32 cm</span> of height gain vs 0.93&ndash;1.84 cm in controls. IGF-1 increased. Bone density improved. Zero injuries.</p>
                <p style={{ marginBottom: '0.75rem' }}>Every recommendation in this app is cited to an academic or scientific study published in a scientific journal. We don&apos;t guess. We read 2,400+ hours of research and built a daily system from it.</p>
                <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46' }}>Zribi et al., J Pediatr Endocrinol Metab &middot; Hoppe et al., Eur J Clin Nutr 2008 &middot; Stokes et al., J Sports Sci 2002</p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                What age does this work for?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>Birth through age 25. Your body keeps growing longer than most people think.</p>
                <p style={{ marginBottom: '0.75rem' }}>Growth plates in males commonly remain open into the early 20s. Many 18, 19, and 20-year-olds still have active growth plates and are still gaining height &mdash; especially with the right inputs. Even after plates close, bone mass (density, thickness, and vertebral structure) continues increasing until your mid-20s. This adds measurable height. You reach peak bone mass around age 25 &mdash; and every bit of density you build before that point becomes your foundation for life.</p>
                <p style={{ marginBottom: '0.75rem' }}>The earlier you start, the more years of compounding you get. But starting at 16, 18, or even 22 still gives you years of real, meaningful optimization during the window that matters most.</p>
                <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', marginTop: '0.75rem' }}>Recker et al., JAMA 1992 &middot; Baxter-Jones et al., JBMR 2011 &middot; Gilsanz et al., J Pediatr 2011</p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                How does the height calculator work?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>It starts with the standard mid-parental height prediction used by pediatric endocrinologists worldwide &mdash; your height plus your partner&apos;s height, adjusted for your child&apos;s sex, with a &plusmn;2&quot; genetic range. The &ldquo;genetic range&rdquo; comes directly from this method.</p>
                <p style={{ marginBottom: '0.75rem' }}>Then it shows the <em>bioKids zone</em> &mdash; where your child could land with optimized sleep, nutrition, and physical activity during the growth window. This isn&apos;t a guarantee. It&apos;s the ceiling that the science supports when every lever is pulled consistently.</p>
                <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', lineHeight: 1.8 }}>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/9600238/" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46' }}>Luo, Albertsson-Wikland &amp; Karlberg, &ldquo;Target Height as Predicted by Parental Heights in a Population-Based Study&rdquo; &mdash; Pediatric Research, 1998</a><br/>
                  <a href="https://www.mdpi.com/2227-9067/11/12/1440" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46' }}>Zeevi et al., &ldquo;The Effect of Lifestyle Interventions on Final Height in Healthy Children&rdquo; &mdash; Children (MDPI), 2024</a>
                </p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                What about junk food, pizza, sleepovers?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>Life happens. Even 60% consistency compounds beautifully over months. A pizza night or a late sleepover doesn&apos;t erase a week of good inputs.</p>
                <p style={{ marginBottom: '0.75rem' }}>The protocol is designed around real family life. The daily targets matter more than perfection on any single day. Miss something? Pick it up tomorrow. Your child&apos;s growth axis responds to patterns, not individual meals.</p>
                <p>We even give an optional detox smoothie to help the body excrete these foods without issues.</p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                Where do the citations come from?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>Every study is available at the <a href="https://www.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', textDecoration: 'underline', fontWeight: 600 }}>US National Library of Medicine</a> via <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', textDecoration: 'underline', fontWeight: 600 }}>PubMed</a> (National Center for Biotechnology Information). Every recommendation links directly to its source &mdash; journals like JAMA, Lancet, JCEM, Nature, and the Journal of Applied Physiology. Every number on every card cites the study it comes from.</p>
                <p>Some studies are from human adults, supplements, and some from animals (marked with *). We note this transparently. Whole foods deliver these pathways at lower but meaningful levels &mdash; for example, a-GPC was shown in a study to increase growth hormone by 44&times;, whereas acetylcholine from eggs would hit that same pathway in a lesser but significant way. We do not overstate what the research shows &mdash; but we do show you that research.</p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                Is this just about height?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>No. Every growth signal &mdash; sleep quality, nutrient density, sprint-triggered hormones &mdash; simultaneously supports brain development, bone density, and long-term health. The same pathways that drive height drive cognitive function and skeletal strength. You&apos;re not choosing between height and health. They&apos;re the same system.</p>
                <p style={{ marginBottom: '0.75rem' }}>And the benefits extend well beyond childhood. Peak bone mass is reached around age 25. The calcium, vitamin D, protein, and impact exercise your child gets now is literally building the bone bank they&apos;ll carry for the rest of their life. A stronger peak means stronger bones at 40, 60, and 80.</p>
                <p>You are giving your child the best chance to maximize their genetic expression &mdash; from birth through their mid-20s.</p>
              </div>
            </details>

          </div>
        </div>
      </section>

      {/* CTA — Free Beta */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div style={{ border: '2px solid rgba(5, 150, 105, 0.25)', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'center', background: '#fff', boxShadow: '0 4px 24px rgba(6,95,70,0.08)' }} className="sm:p-10">
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>100% Free</p>
            <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', marginBottom: '0.25rem', fontWeight: 800 }} className="sm:text-3xl">
              <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.5rem', color: '#065f46' }}>Free</span>
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Full protocol access. No credit card. No sign up. Just open it and start.
            </p>
            <Link href="/home" style={{ background: '#065f46', color: 'white', padding: '0.875rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-lg">Open the Full Protocol</Link>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section style={{ padding: '5rem 1rem', backgroundColor: '#fafaf9' }} className="sm:py-32">
        <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '2.25rem', fontWeight: 800, color: '#065f46', textAlign: 'center' }} className="sm:text-6xl">
          Every inch counts.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#065f46', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>bioKids</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#065f46', borderRadius: 4, padding: '1px 5px', letterSpacing: '0.08em', marginLeft: 4 }}>BETA</span>
          </span>
          <div className="flex gap-6 sm:gap-8 text-sm" style={{ color: '#1c1917', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500 }}>
            <Link href="/about" style={{ textDecoration: 'none', color: '#1c1917' }}>About</Link>
            <Link href="/privacy" style={{ textDecoration: 'none', color: '#1c1917' }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#1c1917' }}>Terms</Link>
            <a href="mailto:contact@biokids.me" style={{ textDecoration: 'none', color: '#1c1917' }}>contact@biokids.me</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
