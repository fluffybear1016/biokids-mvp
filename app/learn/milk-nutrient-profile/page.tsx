'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function MilkNutrientProfileArticle() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Back link */}
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-forest font-medium mb-6 hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-forest uppercase tracking-wider">Nutrition</span>
            <span className="text-xs text-gray-400">&middot;</span>
            <span className="text-xs text-gray-400">9 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Milk&apos;s Nutrient Profile: The Ultimate Growth Food</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">A complete breakdown of what&apos;s actually in milk &mdash; and why quality matters.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Big Picture */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Big Picture</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Raw milk contains all essential minerals, all 20 standard amino acids (making it a complete protein), a broad spectrum of fatty acids, dozens of functional enzymes, and live bacteria.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Not all milk is created equal. Both the cow&apos;s diet and the processing method substantially change this matrix.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              High-quality, grass-fed milk is best understood as a whole-food suspension of proteins, lipids, carbohydrates, minerals, vitamins, and bioactive factors that together support child growth, bone development, and immune function.
            </p>
          </section>

          {/* Protein */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Protein: The Growth Foundation</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Bovine milk provides roughly <strong>3&ndash;4g protein per 100ml</strong>, composed of:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>80% caseins</strong> (slow-digesting)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>20% whey proteins</strong> (fast-digesting)</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Why This Matters for Growth</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Milk contains particularly high amounts of lysine, leucine, and other branched-chain amino acids &mdash; critical for muscle protein synthesis and linear growth.
            </p>
            <p className="text-xs text-forest italic mb-5">[Millward DJ. et al. American Journal of Clinical Nutrition. 2008]</p>

            <h3 className="font-semibold text-black text-base mb-2">The Two Protein Types</h3>
            <div className="space-y-4 mb-4">
              <div>
                <h4 className="font-semibold text-black text-sm mb-1">Caseins (&alpha;s1, &alpha;s2, &beta;, and &kappa;):</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Form micelles that carry calcium and phosphate</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Deliver slow, sustained amino acid release</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Support overnight growth processes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black text-sm mb-1">Whey proteins (&beta;-lactoglobulin, &alpha;-lactalbumin, immunoglobulins):</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Rapidly digested</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Rich in branched-chain amino acids</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>High in sulfur-containing amino acids</li>
                </ul>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This combination makes milk one of the highest-quality protein sources by classical measures (PDCAAS and DIAAS) &mdash; especially relevant for children whose growth and IGF-1 production depend on regular access to complete protein.
            </p>
            <p className="text-xs text-forest italic mt-3">[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Minerals */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Minerals: The Bone Builders</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Milk delivers a broad panel of macro- and trace minerals:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-black text-sm mb-2">Macro-minerals:</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Calcium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Phosphorus</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Magnesium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Potassium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Sodium</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm mb-2">Trace minerals:</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Zinc</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Iodine</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Selenium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span className="text-forest font-bold">&#8226;</span>Iron (small amounts)</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-forest italic mb-5">[Gaucheron F. Journal of the American College of Nutrition. 2011]</p>

            <h3 className="font-semibold text-black text-base mb-2">Bioavailability Advantage</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Calcium and phosphorus in milk are <strong>highly bioavailable</strong> due to incorporation in casein micelles and the presence of lactose (which enhances calcium absorption). This is why milk calcium is absorbed better than calcium from most plant sources.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Key Minerals for Growth:</h3>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Zinc:</strong> Supports immune function and IGF-1 receptor signaling</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Iodine:</strong> Essential for thyroid function (which regulates the entire growth axis)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Selenium:</strong> Contributes to antioxidant defense and thyroid hormone metabolism</li>
            </ul>
          </section>

          {/* Fats */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Fats: More Than Just Calories</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The fat fraction of whole milk contains a complex mixture:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Short-chain fatty acids (C4:0, C6:0)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Medium-chain fatty acids</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Long-chain fatty acids</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Saturated, monounsaturated, and polyunsaturated types</li>
            </ul>
            <p className="text-xs text-forest italic mb-5">[O&apos;Callaghan TF. et al. Scientific Reports. 2020]</p>

            <h3 className="font-semibold text-black text-base mb-2">Why Fat Matters</h3>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Provide energy for growth</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Serve as structural components of cell membranes</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Carry fat-soluble vitamins (A, D, E, K)</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">The Grass-Fed Advantage</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Milk fat from grass-fed cows has:
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Higher n-3 (omega-3) fatty acids</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>3&ndash;5&times; more conjugated linoleic acid (CLA)</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Better n-6:n-3 ratio</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              CLA has been associated with anti-inflammatory and immunomodulatory effects in experimental models.
            </p>
            <p className="text-xs text-forest italic mt-3">[Dhiman TR. et al. Journal of Dairy Science. 1999]</p>
          </section>

          {/* Vitamins */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Vitamins: Fat-Soluble and Water-Soluble</h2>

            <h3 className="font-semibold text-black text-base mb-3">Fat-Soluble Vitamins (in the cream):</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Vitamin</th>
                    <th className="text-left py-2 text-black font-semibold">Function</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Vitamin A</td>
                    <td className="py-2">Vision, immune function, growth</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Vitamin D</td>
                    <td className="py-2">Calcium absorption, bone growth</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Vitamin E</td>
                    <td className="py-2">Antioxidant protection</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Vitamin K</td>
                    <td className="py-2">Bone mineralization, blood clotting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              Concentrations are influenced by feed type (pasture vs. stored forage), season, and fat content of the milk.
            </p>

            <h3 className="font-semibold text-black text-base mb-3">Water-Soluble Vitamins:</h3>
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Vitamin</th>
                    <th className="text-left py-2 text-black font-semibold">Function</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Riboflavin (B2)</td>
                    <td className="py-2">Energy metabolism</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Vitamin B12</td>
                    <td className="py-2">Neural development, red blood cells</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Vitamin B6</td>
                    <td className="py-2">Protein metabolism</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Folate</td>
                    <td className="py-2">Cell division, growth</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              These contribute significantly to recommended intakes in children.
            </p>
            <p className="text-xs text-forest italic mt-3">[Haug A. et al. Lipids in Health and Disease. 2007]</p>
          </section>

          {/* Bioactive Proteins */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Bioactive Proteins: The Immune Components</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Raw milk carries immunologically active proteins:
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="font-semibold text-black text-sm mb-1">Lactoferrin:</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Binds iron</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Antimicrobial activity</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Supports immune function</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm mb-1">Lysozyme:</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Lyses bacterial cell walls</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Natural antimicrobial</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm mb-1">Immunoglobulins (IgG, IgA, IgM):</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Provide passive immune protection</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Support gut barrier function</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-forest italic mb-4">[L&ouml;nnerdal B. American Journal of Clinical Nutrition. 2003]</p>

            <h3 className="font-semibold text-black text-base mb-2">Processing Impact</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Standard pasteurization reduces but doesn&apos;t eliminate activity</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>UHT treatment has more marked effects</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Raw milk retains full activity (but carries safety considerations)</li>
            </ul>
          </section>

          {/* Enzymes and Microbiota */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Enzymes and Microbiota</h2>

            <h3 className="font-semibold text-black text-base mb-2">Endogenous Enzymes</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Raw milk contains dozens of functional enzymes:
            </p>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Alkaline phosphatase</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Lipoprotein lipase</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Proteases</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Peroxidases</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Living Microbiota</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Raw milk hosts beneficial bacteria:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Lactobacillus</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Lactococcus</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Leuconostoc</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Bifidobacterium species</li>
            </ul>
            <p className="text-xs text-forest italic mb-4">[Quigley L. et al. FEMS Microbiology Reviews. 2013]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Some research suggests raw milk consumption is associated with lower risk of atopic diseases in farm children, possibly via these microbial and immunomodulatory components.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Important: Public health authorities recommend pasteurization to prevent foodborne infections, which also reduces enzymatic activities and viable beneficial bacteria.
              </p>
            </div>
          </section>

          {/* How Processing Changes Milk */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">How Processing Changes Milk</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Processing</th>
                    <th className="text-left py-2 text-black font-semibold">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Pasteurization (72&deg;C/15s)</td>
                    <td className="py-2">Minimal impact on protein/minerals; partially reduces heat-labile vitamins; inactivates enzymes and most microflora</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Homogenization</td>
                    <td className="py-2">Disrupts fat globules; modifies gastric emptying; little effect on total nutrients</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">UHT (135&ndash;150&deg;C)</td>
                    <td className="py-2">Extensive protein denaturation; greater vitamin loss; near-sterile, long shelf life</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong>Across all processing:</strong> Macronutrients (protein, fat, lactose) and most minerals remain largely intact. The main differences are in enzymatic, microbial, and some vitamin/peptide functions.
            </p>
            <p className="text-xs text-forest italic mt-3">[Claeys WL. et al. Food Control. 2013]</p>
          </section>

          {/* Quality Hierarchy */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Quality Hierarchy: Best to Worst</h2>
            <h3 className="font-semibold text-black text-base mb-3">For Maximum Nutrient Density:</h3>
            <ol className="space-y-2 list-decimal list-inside mb-5">
              <li className="text-sm sm:text-base text-gray-700"><strong>Raw grass-fed milk</strong> (from tested, trusted sources)</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Pasteurized grass-fed whole milk</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Pasteurized organic whole milk</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Conventional whole milk</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Reduced-fat milk</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>UHT/ultra-pasteurized milk</strong></li>
            </ol>

            <h3 className="font-semibold text-black text-base mb-2">Why Grass-Fed Matters:</h3>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Higher omega-3 fatty acids</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>More CLA</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>More fat-soluble vitamins</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Better fatty acid ratios</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Why Whole Milk Matters:</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Reducing fat content without fortification lowers:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Vitamins A, D, E, K</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Long-chain fatty acids critical for neural and hormonal development</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Benbrook CM. et al. PLOS ONE. 2013]</p>
          </section>

          {/* Practical Recommendations */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Practical Recommendations</h2>

            <h3 className="font-semibold text-black text-base mb-3">Daily Milk Targets by Age:</h3>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-forest/20">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Age</th>
                    <th className="text-left py-2 text-black font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">1&ndash;2 years</td>
                    <td className="py-2">16&ndash;24 oz</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">3&ndash;5 years</td>
                    <td className="py-2">16&ndash;20 oz</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">6&ndash;9 years</td>
                    <td className="py-2">16&ndash;24 oz</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">10+ years</td>
                    <td className="py-2">24&ndash;32 oz</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-black text-base mb-2">Quality Priorities:</h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700"><strong>Always whole milk</strong> &mdash; never reduced fat for growing children</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Grass-fed when possible</strong> &mdash; better fatty acid profile</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>A2 milk if available</strong> &mdash; less inflammatory (<Link href="/learn/a1-vs-a2-milk" className="text-forest underline">see our A1 vs A2 article</Link>)</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Avoid UHT</strong> &mdash; most nutrient degradation</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Raw milk only from trusted, tested sources</strong> &mdash; if legal and safe in your area</li>
            </ol>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
              High-quality whole milk &mdash; especially from grass-fed cows &mdash; provides:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Complete amino acid profile</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Broad, bioavailable mineral spectrum</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Complex, favorable fatty acid profile</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Multiple bioactive proteins and peptides</li>
            </ul>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Processing for safety changes some components, but even processed whole milk remains <strong>one of the most nutrient-dense single foods in a child&apos;s diet.</strong>
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              For growth optimization, milk isn&apos;t optional &mdash; it&apos;s foundational.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Millward DJ, et al. Protein quality assessment: impact of expanding understanding of protein and amino acid needs for optimal health. <em>American Journal of Clinical Nutrition</em>. 2008;87(5):1576S-1581S.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Gaucheron F. Milk and dairy products: a unique micronutrient combination. <em>Journal of the American College of Nutrition</em>. 2011;30(sup5):470S-476S.</li>
              <li>O&apos;Callaghan TF, et al. Effect of pasture versus indoor feeding systems on quality characteristics, nutritional composition, and sensory and volatile properties of full-fat Cheddar cheese. <em>Scientific Reports</em>. 2020;10:1-13.</li>
              <li>Dhiman TR, et al. Conjugated linoleic acid content of milk from cows fed different diets. <em>Journal of Dairy Science</em>. 1999;82(10):2146-2156.</li>
              <li>Haug A, et al. Bovine milk in human nutrition &ndash; a review. <em>Lipids in Health and Disease</em>. 2007;6:25.</li>
              <li>L&ouml;nnerdal B. Nutritional and physiologic significance of human milk proteins. <em>American Journal of Clinical Nutrition</em>. 2003;77(6):1537S-1543S.</li>
              <li>Quigley L, et al. The complex microbiota of raw milk. <em>FEMS Microbiology Reviews</em>. 2013;37(5):664-698.</li>
              <li>Claeys WL, et al. Raw or heated cow milk consumption: review of risks and benefits. <em>Food Control</em>. 2013;31(1):251-262.</li>
              <li>Benbrook CM, et al. Organic production enhances milk nutritional quality by shifting fatty acid composition. <em>PLOS ONE</em>. 2013;8(12):e82429.</li>
            </ul>
          </section>

        </article>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/learn" className="inline-flex items-center gap-2 text-forest font-semibold hover:underline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>

      </main>
    </div>
  );
}
