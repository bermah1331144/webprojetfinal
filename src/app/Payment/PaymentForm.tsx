'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/Payment/success', // adapte au besoin
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" className='btn custom-btn mt-3 col-12'>
        Payer
      </button>
    </form>
  );
}
