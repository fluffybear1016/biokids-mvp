'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form data
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  // Post-payment data
  const [childName, setChildName] = useState('');
  const [sex, setSex] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [useMetric, setUseMetric] = useState(false);
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const totalSteps = 5;

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_complete', 'true');
    localStorage.setItem('child_data', JSON.stringify({
      name: childName,
      birthDate,
      sex,
      height: useMetric ? heightCm : `${heightFt}'${heightIn}"`,
      weight: useMetric ? weightKg : weight,
    }));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-display text-lg sm:text-xl text-forest">
            <span className="text-xl sm:text-2xl">🌿</span>
            bioKids
          </Link>
          <span className="text-xs sm:text-sm text-black font-mono">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-forest transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {step === 1 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Let's set this up for your child.</h1>
              <p className="font-mono text-sm sm:text-base text-black">We use age to tailor the growth hormone system to their stage.</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-black">Child's birth date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest"
              />
              <p className="text-xs sm:text-sm font-mono text-black">This lets us show precise growth and hormone windows.</p>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!birthDate}
              className="w-full bg-forest text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-dark transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Your growth hormone plan is ready.</h1>
              <p className="font-mono text-sm sm:text-base text-black">We'll configure the system around your child's exact age and growth windows.</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
              <h2 className="font-semibold text-base sm:text-lg text-black mb-3 sm:mb-4">What's included</h2>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-forest text-lg sm:text-xl">✓</span>
                  <div className="text-sm sm:text-base"><span className="font-semibold text-black">The Complete System</span><span className="font-mono text-black"> – Daily and weekly actions to support optimal growth hormone.</span></div>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-forest text-lg sm:text-xl">✓</span>
                  <div className="text-sm sm:text-base"><span className="font-semibold text-black">The Synthesized Science</span><span className="font-mono text-black"> – Peer-reviewed mechanisms and case studies, translated for parents.</span></div>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-forest text-lg sm:text-xl">✓</span>
                  <div className="text-sm sm:text-base"><span className="font-semibold text-black">gH AI</span><span className="font-mono text-black"> – Your on-call growth hormone assistant. Ask questions anytime.</span></div>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-forest text-lg sm:text-xl">✓</span>
                  <div className="text-sm sm:text-base"><span className="font-semibold text-black">Growth Tracking</span><span className="font-mono text-black"> – Follow progress across the critical growth and hormone windows.</span></div>
                </li>
              </ul>
            </div>
            <div className="bg-forest text-white rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Founding member rate</h3>
              <p className="text-2xl sm:text-3xl font-display mb-2">$30<span className="text-base sm:text-lg font-normal">/month</span></p>
              <p className="text-white/90 font-mono text-xs sm:text-sm mb-2">Reserved for the first 100 families. As we add features and real-world data, pricing will increase—but your rate stays locked in for life.</p>
              <p className="text-white/70 font-mono text-xs sm:text-sm">Cancel anytime, online.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => setStep(1)} className="px-6 py-3 sm:py-4 rounded-xl font-semibold text-black border-2 border-gray-300 hover:bg-gray-100 transition-colors order-2 sm:order-1">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-forest text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-forest-dark transition-colors order-1 sm:order-2">Continue to secure my rate</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Create your account and start.</h1>
              <p className="font-mono text-sm sm:text-base text-black">One login for your child's complete growth hormone system.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Create a password" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Confirm password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Confirm your password" />
              </div>
              <hr className="my-4 sm:my-6 border-gray-300" />
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Card number</label>
                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Expiration</label>
                  <input type="text" value={expiration} onChange={(e) => setExpiration(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">CVC</label>
                  <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="123" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Name on card</label>
                <input type="text" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Full name as shown on card" />
              </div>
            </div>
            <div className="space-y-2 font-mono text-xs sm:text-sm text-black">
              <p>Cancel anytime, online.</p>
              <p>No hormones, no meds—education and systems only.</p>
              <p>By creating an account, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => setStep(2)} className="px-6 py-3 sm:py-4 rounded-xl font-semibold text-black border-2 border-gray-300 hover:bg-gray-100 transition-colors order-2 sm:order-1">Back</button>
              <button onClick={handlePayment} disabled={loading || !email || !password || !confirmPassword || !cardNumber || !expiration || !cvc || !nameOnCard} className="flex-1 bg-forest text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-dark transition-colors order-1 sm:order-2">{loading ? 'Processing...' : 'Start optimizing'}</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Add your child.</h1>
              <p className="font-mono text-sm sm:text-base text-black">We use this to show the right windows and recommendations.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Name or initial</label>
                <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="e.g., Emma or E" />
                <p className="text-xs sm:text-sm font-mono text-black mt-1">For privacy, you can use just their first initial.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Birth date</label>
                <input type="date" value={birthDate} disabled className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-mono text-black text-base bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Sex</label>
                <div className="flex gap-3 sm:gap-4">
                  <button onClick={() => setSex('female')} className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-colors ${sex === 'female' ? 'bg-forest text-white border-forest' : 'bg-white text-black border-gray-300 hover:border-forest'}`}>Female</button>
                  <button onClick={() => setSex('male')} className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-colors ${sex === 'male' ? 'bg-forest text-white border-forest' : 'bg-white text-black border-gray-300 hover:border-forest'}`}>Male</button>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(5)} disabled={!childName || !sex} className="w-full bg-forest text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-dark transition-colors">Continue</button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Track their starting point.</h1>
              <p className="font-mono text-sm sm:text-base text-black">Measurements help us personalize recommendations. Body composition changes how we approach growth hormone.</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-black">Height</label>
                  <button onClick={() => setUseMetric(!useMetric)} className="text-xs sm:text-sm font-mono text-forest underline">Switch to {useMetric ? 'ft/in' : 'cm'}</button>
                </div>
                {useMetric ? (
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Height in cm" />
                ) : (
                  <div className="flex gap-3">
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Feet" />
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Inches" />
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-black">Weight</label>
                {useMetric ? (
                  <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest mt-1" placeholder="Weight in kg" />
                ) : (
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest mt-1" placeholder="Weight in lbs" />
                )}
              </div>
              <p className="text-xs sm:text-sm font-mono text-black">These fields are optional. You can skip and add later.</p>
            </div>
            <div className="space-y-3">
              <button onClick={handleComplete} className="w-full bg-forest text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-forest-dark transition-colors">Continue</button>
              <button onClick={handleComplete} className="w-full text-black font-mono underline py-2 text-sm sm:text-base">Skip for now</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
