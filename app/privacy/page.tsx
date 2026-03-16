import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9', color: '#1c1917' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)', borderBottom: '1px solid #e7e5e4' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", fontSize: 'var(--text-lg, 1.125rem)', color: '#065f46', textDecoration: 'none' }}>
            bioKids
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#57534e', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
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
          <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3rem)', color: '#1c1917', marginBottom: '0.75rem', fontWeight: 800 }} className="sm:mb-4">Privacy Policy</h1>
          <p style={{ fontSize: '0.875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace", marginBottom: '2.5rem' }} className="sm:text-base sm:mb-14">Last updated: February 27, 2026</p>

          <div style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base space-y-8 sm:space-y-10">
            <p>
              This Privacy Policy is issued by West Palm Research LLC, a Florida limited liability company (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operating the website biokids.me and the bioKids platform (collectively, the &ldquo;Service&rdquo;). By accessing or using the Service, you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) agree to this Privacy Policy.
            </p>

            {/* Section 1 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">1. Information We Collect</h2>
              <div className="space-y-4">
                <p>
                  <strong style={{ color: '#1c1917' }}>Account Information:</strong> When you create an account, we collect your name and email address. bioKids is 100% free — we do not collect any payment or billing information.
                </p>
                <p>
                  <strong style={{ color: '#1c1917' }}>Child-Related Information:</strong> To personalize protocols, we collect limited, non-identifying data about your child as provided by you, the parent or legal guardian. This may include age, biological sex, and height. We do not collect children&apos;s names, photographs, school information, location data, or any other personally identifiable information about minors.
                </p>
                <p>
                  <strong style={{ color: '#1c1917' }}>Usage Data:</strong> We automatically collect standard technical data including pages visited, device type, browser type, IP address, and access timestamps solely to maintain and improve the Service.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">2. How We Use Your Information</h2>
              <p className="mb-3">We use collected information exclusively to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, personalize, and improve the Service</li>
                <li>Send essential account and service communications</li>
                <li>Send daily protocol reminder notifications (if enabled)</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, trade, license, or otherwise disclose your personal information to any third party for marketing, advertising, or any other commercial purpose. This is an absolute commitment.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">3. Data Security</h2>
              <p>
                We implement industry-standard security measures including TLS/SSL encryption for all data in transit, secure authentication through Supabase, and encrypted data at rest. While we take commercially reasonable measures to protect your data, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">4. Children&apos;s Privacy (COPPA Compliance)</h2>
              <p>
                bioKids is a platform designed for and directed at parents and legal guardians of minor children. The Service is not intended for use by children. We do not knowingly collect personal information directly from any child under the age of 18. All child-related data is provided exclusively by, and under the control of, the parent or legal guardian. We collect the minimum data necessary to deliver the Service. If we learn that we have inadvertently collected personal information from a child, we will delete that information immediately. If you believe a child has provided us with personal information, contact us at <a href="mailto:contact@biokids.me" style={{ color: '#065f46', textDecoration: 'underline' }}>contact@biokids.me</a>.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">5. User Eligibility</h2>
              <p>
                You must be at least 18 years of age and the parent or legal guardian of any child for whom you provide information to use this Service. By using the Service, you represent and warrant that you meet these requirements.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">6. Third-Party Services</h2>
              <p className="mb-3">The Service integrates the following third-party providers, each operating under their own privacy policies and security standards:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Supabase, Inc. — authentication and database services</li>
                <li>Vercel, Inc. — web hosting and deployment</li>
                <li>Expo (Software Mansion S.A.) — push notification delivery</li>
              </ul>
              <p className="mt-4">We are not responsible for the privacy practices of these third-party services.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">7. Disclaimer of Medical Advice</h2>
              <p className="uppercase">
                THE SERVICE IS FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. NOTHING PROVIDED THROUGH THE SERVICE CONSTITUTES MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. THE CONTENT IS BASED ON PUBLICLY AVAILABLE PEER-REVIEWED RESEARCH AND IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE FROM A QUALIFIED HEALTHCARE PROVIDER. ALWAYS CONSULT YOUR CHILD&apos;S PEDIATRICIAN OR A QUALIFIED MEDICAL PROFESSIONAL BEFORE MAKING ANY CHANGES TO YOUR CHILD&apos;S DIET, EXERCISE, SLEEP, OR HEALTH ROUTINE. WEST PALM RESEARCH LLC MAKES NO GUARANTEES, REPRESENTATIONS, OR WARRANTIES REGARDING ANY SPECIFIC HEALTH OUTCOMES, GROWTH RESULTS, OR PHYSICAL CHANGES.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">8. Limitation of Liability</h2>
              <p className="uppercase">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WEST PALM RESEARCH LLC, ITS MEMBERS, MANAGERS, OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, REGARDLESS OF THE THEORY OF LIABILITY. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless West Palm Research LLC, its members, managers, officers, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or in any way related to: (a) your use of the Service; (b) your violation of this Privacy Policy or any applicable law; (c) any decisions you make based on information provided through the Service; or (d) your infringement of any third-party rights.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">10. Dispute Resolution and Arbitration</h2>
              <p className="uppercase">
                ANY DISPUTE, CLAIM, OR CONTROVERSY ARISING OUT OF OR RELATING TO THIS PRIVACY POLICY OR THE SERVICE SHALL BE RESOLVED EXCLUSIVELY THROUGH BINDING INDIVIDUAL ARBITRATION ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION UNDER ITS CONSUMER ARBITRATION RULES, CONDUCTED IN PALM BEACH COUNTY, FLORIDA. YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ON AN INDIVIDUAL BASIS AND NOT AS A CLASS ACTION, CLASS ARBITRATION, OR ANY OTHER REPRESENTATIVE PROCEEDING. YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST WEST PALM RESEARCH LLC.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">11. Governing Law</h2>
              <p>
                This Privacy Policy shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any legal proceedings not subject to arbitration shall be brought exclusively in the state or federal courts located in Palm Beach County, Florida.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">12. Your Rights</h2>
              <p className="mb-3">You may at any time:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access, correct, or update your account information</li>
                <li>Request deletion of your account and all associated data</li>
                <li>Request a portable copy of your data</li>
                <li>Opt out of non-essential communications</li>
                <li>Disable push notifications through your device settings</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at <a href="mailto:contact@biokids.me" style={{ color: '#065f46', textDecoration: 'underline' }}>contact@biokids.me</a>. We will respond to all requests within 30 days.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">13. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to provide the Service and fulfill the purposes described in this Policy. Upon account deletion, we will remove your data within 30 days, except where retention is required by law.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">14. Cookies</h2>
              <p>
                We use strictly essential cookies to maintain your authenticated session. We do not use third-party advertising cookies, tracking pixels, or behavioral targeting technologies.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">15. Changes to This Policy</h2>
              <p>
                We reserve the right to modify this Privacy Policy at any time. Material changes will be communicated via email or prominent notice on the Service at least 14 days prior to taking effect. Your continued use of the Service after changes become effective constitutes acceptance of the revised Policy.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">16. Contact</h2>
              <p className="mb-2">West Palm Research LLC</p>
              <p className="mb-4">Palm Beach County, Florida</p>
              <p>
                For questions, concerns, or requests regarding this Privacy Policy:<br />
                Email: <a href="mailto:contact@biokids.me" style={{ color: '#065f46', textDecoration: 'underline' }}>contact@biokids.me</a>
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#065f46', fontWeight: 800 }} className="sm:text-xl">bioKids</span>
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
