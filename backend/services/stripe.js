const stripe = require('stripe')(process.env.STRIPE_API_KEY);

async function createPaymentIntent(amount) {
  try {
    return await stripe.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: 'usd',
    });
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Payment creation failed');
  }
}
