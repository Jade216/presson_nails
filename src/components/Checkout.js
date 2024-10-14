// src/components/CheckoutForm.js
import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../services/api';
import SubscriptionOption from './SubscriptionOption';

const stripePromise = loadStripe('your_stripe_publishable_key_here');

function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    try {
      // Create the order in the backend
      const orderData = {
        userId: null, // Guest checkout
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: parseFloat(totalPrice),
        shippingAddress,
      };

      const response = await api.checkout(orderData);
      const { clientSecret, order } = response;

      // Confirm the payment on the frontend
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              line1: shippingAddress,
            },
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          setSuccess('Payment successful! Your order has been placed.');
          clearCart();
          // Optionally, handle subscription
          if (subscribe) {
            // Implement subscription logic here (e.g., send to backend)
          }
        }
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="shippingAddress">
        <Form.Label>Shipping Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="cardElement" className="mt-3">
        <Form.Label>Credit or Debit Card</Form.Label>
        <CardElement />
      </Form.Group>

      <SubscriptionOption subscribe={subscribe} setSubscribe={setSubscribe} />

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      <Button variant="primary" type="submit" className="mt-3" disabled={!stripe || loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Pay Now'}
      </Button>
    </Form>
  );
}

function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default CheckoutWrapper;
