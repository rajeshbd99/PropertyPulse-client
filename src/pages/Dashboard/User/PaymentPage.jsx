import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PaymentPage = ({ match }) => {
  const [offer, setOffer] = useState(null);
  const { offerId, propertyId } = match.params;
  const stripePromise = loadStripe('your-public-stripe-key');

  useEffect(() => {
    axios.get(`/api/offer/${offerId}`)
      .then(response => {
        setOffer(response.data);
      })
      .catch(error => {
        console.error('Error fetching offer details:', error);
      });
  }, [offerId]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: offer.offerAmount, quantity: 1 }],
      mode: 'payment',
      successUrl: `/payment-success/${offerId}`,
      cancelUrl: '/payment-cancelled',
    });

    if (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div>
      <h1>Payment for {offer?.propertyTitle}</h1>
      <p>Amount: ${offer?.offerAmount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
