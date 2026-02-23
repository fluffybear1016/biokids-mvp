import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes('your-project')) {
    return null;
  }

  return createClient(url, key);
}

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 400 });
  }

  const supabase = getSupabaseClient();

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
  }

  try {
    if (supabase) {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const userIdFromCheckout = session.metadata?.user_id || session.client_reference_id;

          if (userIdFromCheckout) {
            await supabase
              .from('profiles')
              .update({ subscription_status: 'active' })
              .eq('id', userIdFromCheckout);
          }
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const status = subscription.status === 'active' ? 'active' :
                         subscription.status === 'past_due' ? 'past_due' : 'cancelled';

          // Match by metadata user_id stored during checkout
          if (subscription.metadata?.user_id) {
            await supabase
              .from('profiles')
              .update({ subscription_status: status })
              .eq('id', subscription.metadata.user_id);
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;

          if (subscription.metadata?.user_id) {
            await supabase
              .from('profiles')
              .update({ subscription_status: 'cancelled' })
              .eq('id', subscription.metadata.user_id);
          }
          break;
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
