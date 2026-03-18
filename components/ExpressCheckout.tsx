'use client';

import { useEffect, useState, useCallback } from 'react';
import { loadStripe, Stripe, PaymentRequest } from '@stripe/stripe-js';

const PUBLISHABLE_KEY = 'pk_live_51Sw3RG3eI33ypy3JUaKVJ6RY9Xw5ear1j1eQQOp81v6YSc63XuihA4vSoANrCMLemY13GxAi0fT3x7JgFglHmGTn00W88YoFKE';
const mono = "'Courier New', Courier, monospace";

type Props = {
  email: string;
  userId: string;
  onSuccess: () => void;
};

export default function ExpressCheckout({ email, userId, onSuccess }: Props) {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canPay, setCanPay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize Stripe and Payment Request
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const stripeInstance = await loadStripe(PUBLISHABLE_KEY);
      if (cancelled || !stripeInstance) return;
      setStripe(stripeInstance);

      // Create a PaymentRequest for $30/mo subscription
      const pr = stripeInstance.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'bioKids Height Protocol — Monthly',
          amount: 3000, // $30.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check if Apple Pay / Google Pay is available
      const result = await pr.canMakePayment();
      if (cancelled) return;

      if (result) {
        setPaymentRequest(pr);
        setCanPay(true);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  // Handle payment method from Apple Pay / Google Pay
  const handlePaymentMethod = useCallback(async (ev: { paymentMethod: { id: string }; complete: (status: string) => void }) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: ev.paymentMethod.id,
          email,
          userId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        ev.complete('success');
        onSuccess();
      } else if (data.requiresAction && stripe) {
        // Handle 3D Secure authentication
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
        if (confirmError) {
          ev.complete('fail');
          setError(confirmError.message || 'Payment authentication failed');
        } else {
          ev.complete('success');
          onSuccess();
        }
      } else {
        ev.complete('fail');
        setError(data.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      ev.complete('fail');
      setError('Payment failed: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [email, userId, stripe, onSuccess]);

  // Attach paymentmethod event handler
  useEffect(() => {
    if (!paymentRequest) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paymentRequest as any).on('paymentmethod', handlePaymentMethod);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (paymentRequest as any).off('paymentmethod', handlePaymentMethod);
    };
  }, [paymentRequest, handlePaymentMethod]);

  // Don't render if Apple Pay / Google Pay not available
  if (!canPay) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => {
          if (paymentRequest && !loading) {
            paymentRequest.show();
          }
        }}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 20px',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontFamily: mono,
          fontSize: 15,
          fontWeight: 700,
          cursor: loading ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? (
          'Processing...'
        ) : (
          <>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 12.536c-.03-3.11 2.54-4.6 2.654-4.68-1.443-2.113-3.693-2.402-4.497-2.435-1.914-.194-3.735 1.127-4.707 1.127-.973 0-2.473-1.098-4.065-1.069-2.09.03-4.018 1.216-5.095 3.088-2.172 3.769-.556 9.352 1.56 12.413 1.035 1.496 2.268 3.179 3.888 3.118 1.56-.063 2.15-1.01 4.035-1.01 1.885 0 2.415 1.01 4.065.979 1.678-.03 2.742-1.526 3.772-3.028 1.19-1.737 1.68-3.417 1.71-3.504-.037-.017-3.283-1.26-3.315-4.999z" fill="white"/>
              <path d="M13.91 3.545C14.775 2.49 15.365 1.06 15.21 0 13.946.06 12.396.88 11.5 1.905c-.805.932-1.51 2.42-1.32 3.852 1.393.11 2.817-.748 3.73-2.212z" fill="white"/>
            </svg>
            Pay with Apple Pay
          </>
        )}
      </button>

      {error && (
        <p style={{
          fontFamily: mono,
          fontSize: 11,
          color: '#dc2626',
          textAlign: 'center',
          marginTop: 8,
        }}>
          {error}
        </p>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '16px 0',
      }}>
        <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
        <span style={{ fontFamily: mono, fontSize: 11, color: '#57534e' }}>or pay with card</span>
        <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
      </div>
    </div>
  );
}
