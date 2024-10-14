const express = require('express');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { createPaymentIntent } = require('../services/stripe');
const router = express.Router();

// POST /api/orders/checkout
router.post('/checkout', async (req, res) => {
  const { userId, items, totalPrice, shippingAddress } = req.body;

  // Input validation
  if (!userId || !items || !totalPrice || !shippingAddress) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create the order in the orders table
    const order = await Order.createOrder(userId, totalPrice, shippingAddress);

    // Insert order items into the order_items table
    const orderItemsPromises = items.map(item =>
      OrderItem.createOrderItem(order.id, item.productId, item.quantity, item.price)
    );
    await Promise.all(orderItemsPromises);

    // Create a payment intent using Stripe for the total price
    const paymentIntent = await createPaymentIntent(totalPrice);

    // Respond with the order details and payment client secret
    res.json({ order, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;
