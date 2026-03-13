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
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1c1917', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
              Join the Beta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — the +4.3cm moment */}
      <section className="pt-24 sm:pt-32 pb-0 sm:pb-0 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-4 sm:mb-6">
            <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3.75rem)', color: '#1c1917', marginBottom: '1.25rem', fontWeight: 800, lineHeight: 1.15 }}>
              Make your child <span style={{ color: '#065f46' }}>taller.</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#57534e', marginBottom: '1.25rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }}>
              The evidence-based system that helps children reach their maximum height. No prescriptions. No supplements. Just the levers parents actually control.
            </p>
            <p style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: '#065f46', marginBottom: '2rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75, fontStyle: 'italic' }}>
              Height isn&apos;t the only benefit &mdash; every growth signal simultaneously supports brain development.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a href="#height-calculator" style={{ background: '#065f46', color: 'white', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", display: 'inline-block' }} className="sm:text-lg">
                Free Height Calculator
              </a>
              <p style={{ fontSize: '0.875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-sm">See how tall your child could be</p>
            </div>
          </div>

        </div>
      </section>

      {/* Height Predictor */}
      <div id="height-calculator">
        <LandingHeightPredictor />
      </div>

      {/* The Sprint Stack — the "holy shit" moment for athletic parents */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #065f46', padding: '2rem 1.5rem', boxShadow: '0 4px 24px rgba(6,95,70,0.08)' }} className="sm:p-10">
            <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>
              Featured protocol
            </div>
            <h3 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.25rem', color: '#1c1917', fontWeight: 800, marginBottom: '0.75rem' }} className="sm:text-2xl">
              The Sprint Stack
            </h3>
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.9375rem', color: '#57534e', lineHeight: 1.75, marginBottom: '1.25rem' }} className="sm:text-base">
              Your child already sprints at practice. What they eat before and after changes the growth response dramatically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" style={{ marginBottom: '1.25rem' }}>
              <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>Before</div>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, lineHeight: 1.5 }}>1 beef liver meatball + 1 egg + peanuts</div>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#78716c', marginTop: 4 }}>loads choline + niacin</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>Sprint</div>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, lineHeight: 1.5 }}>6 &times; 30-sec all-out</div>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#78716c', marginTop: 4 }}>triggers lactate response</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>After</div>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, lineHeight: 1.5 }}>Cold A2 milk + raw honey</div>
                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#78716c', marginTop: 4 }}>converts signal to growth</div>
              </div>
            </div>

            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.75rem', color: '#78716c', lineHeight: 1.6, textAlign: 'center' }}>
              This is one stack. The full protocol goes much deeper.
            </p>
          </div>
        </div>
      </section>

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
            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e7e5e4', position: 'relative' }}>
              <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2rem', color: '#d1fae5', lineHeight: 1, marginBottom: '0.5rem' }}>&ldquo;</div>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', lineHeight: 1.7, marginBottom: '1rem' }}>
                My son just turned 13 and is in the 97th percentile for height thanks to bioKids. My husband and I are 5&apos;9 and 5&apos;7.5&rdquo; respectively. I am starting my other two boys 11 and 7 on bioKids now.
              </p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>Maggie</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#78716c' }}>Mom of 3 &middot; New York</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e7e5e4', position: 'relative' }}>
              <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2rem', color: '#d1fae5', lineHeight: 1, marginBottom: '0.5rem' }}>&ldquo;</div>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', lineHeight: 1.7, marginBottom: '1rem' }}>
                Both my kids are in the 99th percentile, 8 and 7 years old. We helped create the bioKids protocol and are starting tennis lessons for them next year in hopes of a D1 scholarship.
              </p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>Marko</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#78716c' }}>Dad of 2 &middot; New York</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e7e5e4', position: 'relative' }}>
              <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2rem', color: '#d1fae5', lineHeight: 1, marginBottom: '0.5rem' }}>&ldquo;</div>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', lineHeight: 1.7, marginBottom: '1rem' }}>
                I&apos;ve trained top NBA talent all the way down to elementary school kids. The limiting factor is always height. bioKids might just change the game forever&hellip;
              </p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>Thomas</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#78716c' }}>Athletic Trainer &middot; Miami</p>
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
                <p style={{ marginBottom: '0.75rem' }}>Any age before growth plates close &mdash; typically up to age 17 for girls and age 20 for boys. Starting at any age is powerful. The earlier you start, the more years of compounding you get.</p>
                <p>The levers work the same way at every age: nutrition fuels the growth axis, sprints trigger the response, sleep is when growth actually happens. Even starting at 12 or 14 gives your child years of optimization during their peak growth window.</p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                How does the height calculator work?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>It starts with the standard mid-parental height prediction used by pediatric endocrinologists &mdash; your height plus your partner&apos;s height, adjusted for your child&apos;s sex, with a &plusmn;2&quot; genetic range. This method is grounded in decades of scientific literature on growth prediction models.</p>
                <p style={{ marginBottom: '0.75rem' }}>Then it shows the <em>bioKids zone</em> &mdash; where your child could land with optimized nutrition, sprint protocols, and sleep architecture. This isn&apos;t a guarantee. It&apos;s the ceiling that the science supports when every lever is pulled consistently. Every variable in the calculator &mdash; from nutritional impact on IGF-1 to exercise-induced growth hormone response &mdash; is backed by published scientific studies.</p>
                <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46' }}>Tanner et al., Arch Dis Child &middot; Khamis &amp; Roche, Pediatrics 1994 &middot; Hoppe et al., Eur J Clin Nutr 2008 &middot; Wideman et al., Med Sci Sports Exerc 2002</p>
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
                <p style={{ marginBottom: '0.75rem' }}>Every recommendation links directly to its source &mdash; journals like JAMA, Lancet, JCEM, Nature, and the Journal of Applied Physiology. Every number on every card cites the study it comes from. Every study should be available at <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', textDecoration: 'underline' }}>PubMed</a>, which is from the US National Library of Medicine, National Center for Biotechnology Information.</p>
                <p>Some studies are from adults (marked with *). We note this transparently. Whole foods deliver these pathways at lower but meaningful doses. We never overstate what the research shows.</p>
              </div>
            </details>

            <details style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <summary style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', fontWeight: 700, color: '#1c1917', padding: '1rem 1.25rem', cursor: 'pointer', lineHeight: 1.5 }}>
                Is this just about height?
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#57534e', lineHeight: 1.75 }}>
                <p style={{ marginBottom: '0.75rem' }}>No. Every growth signal &mdash; sleep quality, nutrient density, sprint-triggered hormones &mdash; simultaneously supports brain development. The same pathways that drive height drive cognitive function, bone density, and long-term health. You&apos;re not choosing between height and health. They&apos;re the same system.</p>
                <p>You are giving your child the best chance to maximize their genetic expression.</p>
              </div>
            </details>

          </div>
        </div>
      </section>

      {/* CTA — Free Beta */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div style={{ border: '2px solid rgba(5, 150, 105, 0.25)', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'center', background: '#fff', boxShadow: '0 4px 24px rgba(6,95,70,0.08)' }} className="sm:p-10">
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>Free during beta</p>
            <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', marginBottom: '0.25rem', fontWeight: 800 }} className="sm:text-3xl">
              <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.5rem', color: '#065f46' }}>Free</span>
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#78716c', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Full protocol access. No credit card required. Join hundreds of parents already optimizing.
            </p>
            <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.875rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-lg">
              Join the Beta
            </Link>
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
            <Link href="/privacy" style={{ textDecoration: 'none', color: '#1c1917' }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#1c1917' }}>Terms</Link>
            <a href="mailto:contact@biokids.me" style={{ textDecoration: 'none', color: '#1c1917' }}>contact@biokids.me</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
