import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const isPlaceholder = (key: string | undefined) =>
  !key || key.includes('your_') || key.includes('_here') || key.includes('xxx');
const isValidStripeKey = stripeKey && stripeKey.startsWith('sk_') && !isPlaceholder(stripeKey);
const stripe = isValidStripeKey ? new Stripe(stripeKey) : null;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Creates a subscription for Apple Pay / Google Pay / card payments
// using PaymentMethod from the Express Checkout Element
export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const { paymentMethodId, email, userId } = await request.json();

    if (!paymentMethodId || !email || !userId) {
      return NextResponse.json(
        { error: 'Missing paymentMethodId, email, or userId' },
        { status: 400 }
      );
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId || !priceId.startsWith('price_')) {
      return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 });
    }

    // 1. Create or retrieve customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer: Stripe.Customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
      // Attach new payment method
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
    } else {
      customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
        metadata: { user_id: userId },
      });
    }

    // 2. Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: { user_id: userId },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoice = subscription.latest_invoice as any;
    const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent | undefined;

    // 3. If payment succeeded immediately (common with Apple Pay)
    if (subscription.status === 'active' || subscription.status === 'trialing') {
      // Update profile
      const supabase = getSupabase();
      if (supabase) {
        await supabase
          .from('profiles')
          .update({ subscription_status: 'active' })
          .eq('id', userId);
      }

      return NextResponse.json({
        success: true,
        subscriptionId: subscription.id,
        status: subscription.status,
      });
    }

    // 4. If payment requires confirmation (3D Secure, etc.)
    if (paymentIntent && paymentIntent.status === 'requires_action') {
      return NextResponse.json({
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id,
      });
    }

    // 5. Payment succeeded
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      const supabase = getSupabase();
      if (supabase) {
        await supabase
          .from('profiles')
          .update({ subscription_status: 'active' })
          .eq('id', userId);
      }

      return NextResponse.json({
        success: true,
        subscriptionId: subscription.id,
        status: 'active',
      });
    }

    return NextResponse.json({
      success: false,
      status: paymentIntent?.status || subscription.status,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
