import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { birthDate } = await request.json();

    if (!stripe) {
      // Stripe not configured, return null to skip payment
      return NextResponse.json({ url: null, message: 'Stripe not configured' });
    }

    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ url: null, message: 'Stripe price not configured' });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: `${baseUrl}/onboarding?step=3&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/onboarding?step=2`,
      metadata: {
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
