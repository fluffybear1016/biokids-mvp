import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

export async function POST(request: Request) {
  try {
    const { email, onboardingSessionId } = await request.json();

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
      customer_email: email || undefined,
      success_url: `${baseUrl}/onboarding?step=9&checkout=success`,
      cancel_url: `${baseUrl}/onboarding?step=8&checkout=cancelled`,
      metadata: {
        onboarding_session_id: onboardingSessionId || '',
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
