'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import Notification from '../(composant)/notification';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    
    setShowNotification(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/pagePrincipale', // adapte au besoin
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Notification message="Paiement validé" visible={showNotification} duration={3000} onClose={() => setShowNotification(false)}/>
      <PaymentElement />
      <button type="submit" className='btn custom-btn mt-3 col-12'>
        Payer
      </button>
    </form>
  );
}
