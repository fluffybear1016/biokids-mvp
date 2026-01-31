import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-display text-lg sm:text-xl text-forest">
            <span className="text-xl sm:text-2xl">🌿</span>
            bioKids
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" className="text-sm font-medium text-black hover:text-forest font-mono-science">Log in</Link>
            <Link href="/onboarding" className="bg-forest text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-semibold hover:bg-forest-dark transition-colors font-mono-science">
              Get Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 bg-forest/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-forest mb-4 sm:mb-6 font-mono-science">
              🧬 For High-Agency Parents
            </span>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-black mb-4 sm:mb-6 leading-tight">
              A natural way to optimize your child's <span className="text-forest">growth hormone</span>
            </h1>
            <p className="text-base sm:text-xl text-black mb-8 sm:mb-10 font-mono-science">
              The evidence-based system for natural growth hormone optimization—from prenatal to age 25. No hormones, no meds, just the levers parents actually control.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/onboarding" className="bg-forest text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-forest-dark transition-all hover:-translate-y-0.5 font-mono-science">
                Get Access →
              </Link>
            </div>
          </div>

          {/* Growth Trajectory Graph */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 className="font-semibold text-black font-mono-science font-medium text-sm sm:text-base">Growth Trajectory</h3>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono-science text-black font-medium">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></span>
                  Average Child
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-forest rounded-full"></span>
                  bioKid
                </span>
              </div>
            </div>

            {/* SVG Graph */}
            <div className="relative h-48 sm:h-64">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Average child curve - flattens early, plateaus */}
                <path
                  d="M 20 180 Q 50 170, 80 155 Q 120 135, 180 115 Q 250 95, 320 85 Q 360 82, 380 80"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* bioKid curve - separates early, keeps rising strongly */}
                <path
                  d="M 20 180 Q 50 165, 80 140 Q 120 100, 180 60 Q 250 30, 320 18 Q 360 12, 380 10"
                  fill="none"
                  stroke="#2D5A47"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Start point - same for both */}
                <circle cx="20" cy="180" r="6" fill="#2D5A47" />

                {/* End points */}
                <circle cx="380" cy="80" r="5" fill="#d1d5db" />
                <circle cx="380" cy="10" r="6" fill="#2D5A47" />
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-black px-2 sm:px-4 font-mono-science">
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

            <p className="text-center text-xs sm:text-sm text-black mt-4 sm:mt-6 font-mono-science">
              Same genes, different environment: a structured growth hormone-supportive system changes the growth curve.
            </p>
          </div>
        </div>
      </section>

      {/* The Gap Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-forest-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-4xl mb-4 sm:mb-6">Most parents don't know what they're leaving on the table.</h2>
          <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 font-mono-science">
            Growth hormone optimization isn't taught in schools. It isn't in parenting books.
            It's buried in peer-reviewed journals that no one reads.
          </p>
          <p className="text-sm sm:text-base text-white/80 font-mono-science">
            We read them. We built the protocol. Now it's yours.
          </p>
        </div>
      </section>

      {/* Trust / Research Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-4xl text-black mb-3 sm:mb-4">Trusted by parents who do the research</h2>
            <p className="text-xs sm:text-sm font-semibold text-forest uppercase tracking-wider font-mono-science">Why we're confident</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm">
              <p className="font-display text-3xl sm:text-4xl text-forest mb-2 sm:mb-4">312</p>
              <p className="text-sm sm:text-base text-black font-mono-science font-medium">peer-reviewed studies in pediatric endocrinology, growth science, and sports medicine mapped into one system</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm">
              <p className="font-display text-3xl sm:text-4xl text-forest mb-2 sm:mb-4">2,400+</p>
              <p className="text-sm sm:text-base text-black font-mono-science font-medium">hours of research synthesis so you don't have to</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm">
              <p className="font-display text-3xl sm:text-4xl text-forest mb-2 sm:mb-4">100%</p>
              <p className="text-sm sm:text-base text-black font-mono-science font-medium">grounded in academic research, not influencer lore</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - Teaser Only */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-4xl text-black mb-3 sm:mb-4">What's inside</h2>
            <p className="text-sm sm:text-base text-black font-mono-science font-medium">Everything you need to optimize your child's natural growth hormone over time.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: '📋', title: 'The Complete System', desc: 'Daily and weekly actions, personalized to your child\'s growth stage.' },
              { icon: '🧬', title: 'The Synthesized Science', desc: 'Mechanism breakdowns and case studies with peer-reviewed citations, so you understand the why.' },
              { icon: '🤖', title: 'gH AI', desc: 'Your personal growth hormone optimization assistant. Ask anything, anytime.' },
              { icon: '📊', title: 'Growth Tracking', desc: 'Monitor progress across the three critical growth windows.' },
            ].map((item) => (
              <div key={item.title} className="bg-cream rounded-2xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 font-mono-science text-black">{item.title}</h3>
                  <p className="text-sm sm:text-base text-black font-mono-science font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member Pricing */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-forest rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center bg-white">
            <h2 className="font-display text-2xl sm:text-3xl text-black mb-3 sm:mb-4">Founding member rate</h2>
            <p className="text-sm sm:text-base text-black font-mono-science font-medium mb-2 sm:mb-3">
              Reserved for the first 100 families: <span className="font-bold text-forest">$30/month</span> for full access to the system.
            </p>
            <p className="text-sm sm:text-base text-black font-mono-science font-medium mb-5 sm:mb-6">
              As we add features and real-world data, membership pricing will increase—your rate stays locked in for life.
            </p>
            <Link href="/onboarding" className="bg-forest text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-forest-dark transition-all inline-block font-mono-science">
              Get Access →
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-forest uppercase tracking-wider mb-3 sm:mb-4 font-mono-science">Trusted By</p>
            <h2 className="font-display text-2xl sm:text-3xl text-black">Parents who do the research.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { quote: "Finally, something beyond 'feed them vegetables and hope for the best.'", author: "Parent of 2", location: "San Francisco" },
              { quote: "The protocol is simple. The science is deep. Exactly what I was looking for.", author: "Parent of 1", location: "Austin" },
              { quote: "I wish I had this when my oldest was younger. Starting with my second now.", author: "Parent of 3", location: "New York" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6">
                <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 font-mono-science">"{item.quote}"</p>
                <div className="text-xs sm:text-sm text-black font-mono-science font-medium">
                  <span className="font-medium text-black">{item.author}</span>
                  <span className="mx-2">·</span>
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base sm:text-xl text-black mb-6 sm:mb-8 font-mono-science">
            Get full access for <span className="font-bold text-forest">$30/month</span> · Founding-member rate · Cancel anytime.
          </p>
          <Link href="/onboarding" className="bg-forest text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-forest-dark transition-all inline-block font-mono-science">
            Get Access →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span className="font-display text-lg sm:text-xl text-forest">🌿 bioKids</span>
          <div className="flex gap-6 sm:gap-8 text-sm text-black font-mono-science font-medium">
            <Link href="/privacy" className="hover:text-forest">Privacy</Link>
            <Link href="/terms" className="hover:text-forest">Terms</Link>
            <a href="mailto:hello@biokids.me" className="hover:text-forest">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
