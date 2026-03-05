import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9', color: '#1c1917' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)', borderBottom: '1px solid #e7e5e4' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", fontSize: 'var(--text-lg, 1.125rem)', color: '#059669', textDecoration: 'none' }}>
            bioKids
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#57534e', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" style={{ background: '#059669', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
              Get Access
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: '6rem', paddingBottom: '4rem', padding: '1rem' }} className="sm:pt-32 sm:pb-24 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#a8a29e', marginBottom: '2rem', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }} className="sm:mb-12">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          {/* Title */}
          <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3rem)', color: '#1c1917', marginBottom: '0.75rem', fontWeight: 800 }} className="sm:mb-4">Terms of Service</h1>
          <p style={{ fontSize: '0.875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace", marginBottom: '2.5rem' }} className="sm:text-base sm:mb-14">Last updated: February 27, 2026</p>

          <div style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base space-y-8 sm:space-y-10">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and West Palm Research LLC, a Florida limited liability company (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), governing your access to and use of the website biokids.me and the bioKids platform, including all content, features, protocols, research synthesis, tools, and services made available through it (collectively, the &ldquo;Service&rdquo;). By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.
            </p>

            {/* Section 1 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">1. Eligibility</h2>
              <p>
                The Service is designed exclusively for parents and legal guardians of minor children. You must be at least 18 years of age and the parent or legal guardian of any child for whom you access or use the Service. By using the Service, you represent and warrant that you meet these requirements. If you do not meet these requirements, you are not authorized to use the Service and must cease all use immediately.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">2. Intellectual Property and Proprietary Rights</h2>
              <div className="space-y-4">
                <p>
                  All content available through the Service — including but not limited to protocols, research syntheses, written content, growth optimization systems, algorithm designs, software code, user interface designs, graphics, logos, trademarks, trade dress, data compilations, organizational frameworks, the selection and arrangement of content, and all other materials (collectively, &ldquo;Content&rdquo;) — is the exclusive intellectual property of West Palm Research LLC and is protected by United States and international copyright, trademark, trade secret, and other intellectual property laws.
                </p>
                <p>
                  The Content represents proprietary research synthesis and original intellectual work product. The unique compilation, organization, analysis, interpretation, and presentation of scientific research within the Service constitutes original authorship and is independently protectable under copyright law, separate and apart from any underlying public domain research.
                </p>
                <p>
                  All rights not expressly granted to you in these Terms are reserved by West Palm Research LLC.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">3. Prohibited Conduct — Content Protection</h2>
              <p className="mb-4">By using the Service, you expressly agree that you shall NOT, under any circumstances:</p>
              <div className="space-y-3">
                <p>(a) Copy, reproduce, duplicate, screenshot, screen-record, photograph, transcribe, or otherwise capture any Content from the Service, whether in whole or in part, by any means, whether manual, electronic, automated, or otherwise;</p>
                <p>(b) Distribute, share, publish, post, upload, transmit, forward, or otherwise make available any Content to any third party, whether for commercial or non-commercial purposes, through any medium including but not limited to social media, messaging platforms, email, websites, forums, print, or any other channel;</p>
                <p>(c) Create derivative works based on, adapt, modify, translate, reverse-engineer, decompile, or build upon any Content from the Service;</p>
                <p>(d) Use any Content to create, develop, operate, market, or contribute to any competing product, service, platform, publication, course, coaching program, app, or offering of any kind;</p>
                <p>(e) Use any automated tools, scripts, bots, scrapers, crawlers, browser extensions, or any other technology to extract, download, index, harvest, mine, or systematically access Content from the Service;</p>
                <p>(f) Remove, alter, obscure, or tamper with any copyright notices, watermarks, proprietary markings, or attribution contained in or on the Content;</p>
                <p>(g) Share account credentials or allow any person other than the registered account holder to access the Service through your account;</p>
                <p>(h) Resell, sublicense, rent, lease, or commercially exploit access to the Service or any Content;</p>
                <p>(i) Use the Content for any artificial intelligence training, machine learning datasets, large language model training, or any other computational analysis purpose.</p>
              </div>
              <p className="mt-4">
                West Palm Research LLC may employ technical measures including but not limited to digital watermarking, forensic tracking, and usage monitoring to detect unauthorized reproduction or distribution of Content. You consent to such measures as a condition of using the Service.
              </p>
              <p className="mt-4">
                Any violation of this Section 3 shall constitute a material breach of these Terms and may result in immediate termination of your account without refund, as well as civil and criminal liability. West Palm Research LLC reserves the right to pursue all available legal remedies, including but not limited to injunctive relief, statutory damages, actual damages, and recovery of attorneys&apos; fees and costs.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">4. License Grant</h2>
              <p>
                Subject to your compliance with these Terms, West Palm Research LLC grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and view the Content solely for your personal, non-commercial use as a parent or legal guardian, exclusively within the Service platform. This license does not transfer any ownership rights in the Content to you. This license terminates immediately upon any violation of these Terms or upon cancellation or termination of your account.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">5. Subscription and Payment</h2>
              <div className="space-y-4">
                <p><strong style={{ color: '#1c1917' }}>(a) Free Trial:</strong> The Service may offer a free trial period. You may use one free trial per household. Abuse of free trials, including creating multiple accounts, is a violation of these Terms and grounds for immediate termination.</p>
                <p><strong style={{ color: '#1c1917' }}>(b) Subscription:</strong> Following any trial period, continued access requires a paid subscription at the then-current rate. Subscriptions are billed on a recurring monthly basis.</p>
                <p><strong style={{ color: '#1c1917' }}>(c) Cancellation:</strong> You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. No partial refunds are issued for unused portions of a billing period.</p>
                <p><strong style={{ color: '#1c1917' }}>(d) No Refunds:</strong> All payments are final and non-refundable, except as required by applicable law.</p>
                <p><strong style={{ color: '#1c1917' }}>(e) Price Changes:</strong> We reserve the right to modify subscription pricing at any time. Changes will be communicated at least 30 days in advance and will apply to the next billing cycle following notice.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">6. Disclaimer of Medical Advice</h2>
              <div style={{ textTransform: 'uppercase' }} className="space-y-4">
                <p>THE SERVICE IS FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. THE SERVICE IS NOT A MEDICAL DEVICE, MEDICAL SERVICE, OR HEALTHCARE PROVIDER.</p>
                <p>NOTHING PROVIDED THROUGH THE SERVICE — INCLUDING BUT NOT LIMITED TO PROTOCOLS, RECOMMENDATIONS, RESEARCH SUMMARIES, GROWTH PROJECTIONS, OPTIMIZATION STRATEGIES, AI-GENERATED RESPONSES, OR ANY OTHER CONTENT — CONSTITUTES MEDICAL ADVICE, MEDICAL DIAGNOSIS, MEDICAL TREATMENT, OR A DOCTOR-PATIENT RELATIONSHIP.</p>
                <p>THE CONTENT IS BASED ON WEST PALM RESEARCH LLC&apos;S PROPRIETARY INTERPRETATION AND SYNTHESIS OF PUBLICLY AVAILABLE PEER-REVIEWED SCIENTIFIC RESEARCH. IT IS PRESENTED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY AND IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT FROM A LICENSED HEALTHCARE PROVIDER.</p>
                <p>YOU MUST ALWAYS CONSULT YOUR CHILD&apos;S PEDIATRICIAN, ENDOCRINOLOGIST, OR OTHER QUALIFIED MEDICAL PROFESSIONAL BEFORE IMPLEMENTING ANY CHANGES TO YOUR CHILD&apos;S DIET, NUTRITION, SUPPLEMENTATION, EXERCISE, SLEEP HABITS, OR ANY OTHER HEALTH-RELATED ROUTINE. DO NOT DISREGARD, DELAY, OR AVOID SEEKING PROFESSIONAL MEDICAL ADVICE BECAUSE OF ANYTHING YOU HAVE READ, VIEWED, OR ACCESSED THROUGH THE SERVICE.</p>
                <p>WEST PALM RESEARCH LLC IS NOT A LICENSED MEDICAL PROVIDER AND DOES NOT PRACTICE MEDICINE. THE COMPANY DOES NOT DIAGNOSE, TREAT, CURE, OR PREVENT ANY DISEASE OR MEDICAL CONDITION.</p>
                <p>EVERY CHILD IS BIOLOGICALLY UNIQUE. RESULTS, OUTCOMES, AND EXPERIENCES WILL VARY. WEST PALM RESEARCH LLC MAKES NO GUARANTEES, REPRESENTATIONS, OR WARRANTIES — EXPRESS OR IMPLIED — REGARDING ANY SPECIFIC HEALTH OUTCOMES, GROWTH RESULTS, HEIGHT CHANGES, PHYSICAL DEVELOPMENT, OR ANY OTHER OUTCOME OF ANY KIND.</p>
                <p>YOU ASSUME ALL RISK ASSOCIATED WITH YOUR USE OF THE SERVICE AND ANY ACTIONS TAKEN BASED ON INFORMATION OBTAINED THROUGH THE SERVICE. YOU ACKNOWLEDGE THAT YOU ARE SOLELY RESPONSIBLE FOR ALL DECISIONS REGARDING YOUR CHILD&apos;S HEALTH AND WELLBEING.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">7. Assumption of Risk</h2>
              <p>
                You expressly acknowledge and agree that your use of the Service and any implementation of Content is entirely at your own risk. You voluntarily assume full responsibility for any and all risks, known or unknown, associated with using information from the Service, including but not limited to risks related to changes in your child&apos;s diet, supplementation, exercise, sleep, or daily routine. You acknowledge that you have been advised to consult a qualified medical professional before making any such changes.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">8. Limitation of Liability</h2>
              <div style={{ textTransform: 'uppercase' }} className="space-y-4">
                <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WEST PALM RESEARCH LLC, ITS MEMBERS, MANAGERS, OFFICERS, EMPLOYEES, AGENTS, CONTRACTORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO: (A) YOUR USE OF OR INABILITY TO USE THE SERVICE; (B) ANY CONTENT OBTAINED FROM THE SERVICE; (C) ANY ACTIONS TAKEN OR DECISIONS MADE BASED ON INFORMATION PROVIDED THROUGH THE SERVICE; (D) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA; OR (E) ANY OTHER MATTER RELATING TO THE SERVICE, REGARDLESS OF THE THEORY OF LIABILITY (WHETHER CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE) AND EVEN IF WEST PALM RESEARCH LLC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                <p>IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF WEST PALM RESEARCH LLC EXCEED THE LESSER OF: (I) THE TOTAL AMOUNT YOU HAVE ACTUALLY PAID TO WEST PALM RESEARCH LLC IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (II) ONE HUNDRED U.S. DOLLARS ($100.00).</p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless West Palm Research LLC, its members, managers, officers, employees, agents, contractors, and affiliates from and against any and all claims, actions, suits, proceedings, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees and court costs) arising out of or in any way related to: (a) your access to or use of the Service; (b) any Content you access through the Service; (c) your violation of these Terms or any applicable law or regulation; (d) any decisions you make or actions you take based on information provided through the Service; (e) your infringement or misappropriation of any intellectual property or other rights of West Palm Research LLC or any third party; (f) any unauthorized use, reproduction, distribution, or sharing of Content; or (g) any claim by a third party arising from your use of the Service.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">10. Dispute Resolution and Arbitration</h2>
              <p className="mb-4">
                Any dispute, claim, or controversy arising out of or relating to these Terms, the Service, or any Content (&ldquo;Dispute&rdquo;) shall be resolved exclusively through final and binding individual arbitration administered by the American Arbitration Association (&ldquo;AAA&rdquo;) under its Consumer Arbitration Rules, as modified by these Terms. Arbitration shall be conducted in Palm Beach County, Florida, or at your election, by telephone or videoconference.
              </p>
              <p className="uppercase mb-4">
                YOU AND WEST PALM RESEARCH LLC EACH WAIVE THE RIGHT TO A TRIAL BY JURY. YOU AND WEST PALM RESEARCH LLC EACH WAIVE THE RIGHT TO PARTICIPATE IN A CLASS ACTION, CLASS ARBITRATION, COLLECTIVE ACTION, REPRESENTATIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR ANY OTHER PROCEEDING WHERE EITHER PARTY ACTS OR PROPOSES TO ACT IN A REPRESENTATIVE CAPACITY. NO ARBITRATION OR PROCEEDING SHALL BE COMBINED WITH ANOTHER WITHOUT THE PRIOR WRITTEN CONSENT OF ALL PARTIES.
              </p>
              <p>
                If any portion of this arbitration provision is found to be unenforceable, the remainder shall continue in full force and effect.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">11. Governing Law and Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. To the extent any legal proceedings are not subject to arbitration, you consent to the exclusive jurisdiction and venue of the state and federal courts located in Palm Beach County, Florida, and waive any objection to such jurisdiction or venue.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">12. Account Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to: violation of these Terms, suspected fraudulent activity, abuse of free trial offers, unauthorized sharing of Content, or any conduct we determine in our sole discretion to be harmful to the Service, other users, or West Palm Research LLC. Upon termination, your license to access and use the Service and all Content terminates immediately. No refund will be issued upon termination for cause.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">13. Disclaimer of Warranties</h2>
              <div style={{ textTransform: 'uppercase' }} className="space-y-4">
                <p>THE SERVICE AND ALL CONTENT ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WEST PALM RESEARCH LLC EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, COMPLETENESS, RELIABILITY, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.</p>
                <p>WEST PALM RESEARCH LLC DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT ANY CONTENT WILL BE ACCURATE, RELIABLE, OR COMPLETE.</p>
              </div>
            </section>

            {/* Section 14 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">14. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court or arbitrator of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">15. Entire Agreement</h2>
              <p>
                These Terms, together with the Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and West Palm Research LLC regarding the Service and supersede all prior and contemporaneous agreements, representations, and understandings.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">16. No Waiver</h2>
              <p>
                The failure of West Palm Research LLC to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative of West Palm Research LLC.
              </p>
            </section>

            {/* Section 18 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">18. Liquidated Damages</h2>
              <p>
                You acknowledge that unauthorized reproduction, distribution, or misappropriation of Content would cause substantial and irreparable harm to West Palm Research LLC, the exact amount of which would be difficult or impossible to ascertain. Accordingly, you agree that in addition to all other remedies available at law or in equity, West Palm Research LLC shall be entitled to liquidated damages of Ten Thousand U.S. Dollars ($10,000.00) per individual item of Content that is copied, reproduced, distributed, shared, or otherwise misappropriated in violation of these Terms, plus Ten Thousand U.S. Dollars ($10,000.00) per platform or channel on which such Content is published or distributed. These amounts represent a reasonable estimate of the minimum damages that would be suffered and are not intended as a penalty. This provision does not limit West Palm Research LLC&apos;s right to seek actual damages, statutory damages, or any other relief to the extent actual damages exceed the liquidated amounts.
              </p>
            </section>

            {/* Section 19 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">19. Attorneys&apos; Fees and Costs</h2>
              <p>
                In the event of any legal action, arbitration, or proceeding arising out of or relating to these Terms or any violation thereof, the prevailing party shall be entitled to recover all reasonable attorneys&apos; fees, costs, and expenses incurred in connection with such action, including but not limited to fees incurred in enforcing intellectual property rights, pursuing injunctive relief, issuing DMCA takedown notices, and collecting any damages or judgments awarded.
              </p>
            </section>

            {/* Section 20 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">20. Contact</h2>
              <p className="mb-2">West Palm Research LLC</p>
              <p className="mb-4">Palm Beach County, Florida</p>
              <p>
                For questions or concerns regarding these Terms:<br />
                Email: <a href="mailto:contact@biokids.me" className="text-green-400 underline hover:text-green-300">contact@biokids.me</a>
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#059669', fontWeight: 800 }} className="sm:text-xl">bioKids</span>
          <div className="flex gap-6 sm:gap-8 text-sm" style={{ color: '#57534e', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500 }}>
            <Link href="/privacy" style={{ textDecoration: 'none', color: '#57534e' }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#57534e' }}>Terms</Link>
            <a href="mailto:contact@biokids.me" style={{ textDecoration: 'none', color: '#57534e' }}>contact@biokids.me</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
