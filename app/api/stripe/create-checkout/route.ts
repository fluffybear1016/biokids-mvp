import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Only initialize Stripe if we have a real secret key (not placeholder)
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isPlaceholder = (key: string | undefined) =>
  !key || key.includes('your_') || key.includes('_here') || key.includes('xxx');
const isValidStripeKey = stripeKey && stripeKey.startsWith('sk_') && !isPlaceholder(stripeKey);
const stripe = isValidStripeKey ? new Stripe(stripeKey) : null;

export async function POST(request: Request) {
  try {
    const { birthDate, userId, email } = await request.json();

    if (!stripe) {
      return NextResponse.json({ url: null, message: 'Stripe not configured' });
    }

    if (!userId) {
      return NextResponse.json({ error: 'User must be authenticated' }, { status: 401 });
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    const isValidPriceId = priceId && priceId.startsWith('price_') && !isPlaceholder(priceId);

    if (!isValidPriceId) {
      return NextResponse.json({ url: null, message: 'Stripe price not configured' });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: `${baseUrl}/onboarding?step=3&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/onboarding?step=1`,
      metadata: {
        user_id: userId,
        birth_date: birthDate || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
