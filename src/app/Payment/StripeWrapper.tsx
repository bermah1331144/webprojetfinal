'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const appearance: Appearance = {
    theme: 'stripe'
  };

export default function StripeWrapper({prixTotal}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const montant = Math.round(prixTotal * 100);
        if(montant > 0){
          const res = await axios.post('/api/create-payment-intent', {
            data: { amount: montant},
          });
          setClientSecret(res.data); // 🔁 Assure-toi que c'est une string
        }
      } catch (err) {
        console.error('Erreur création paiement :', err);
      }
    };

    createIntent();
  }, [prixTotal]);

  if (!clientSecret) return <p>Chargement du paiement...</p>;

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  );
}
