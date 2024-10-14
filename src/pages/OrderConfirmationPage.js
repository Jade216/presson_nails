import React from 'react';

function OrderConfirmationPage({ order }) {
  return (
    <div className="container">
      <h1>Thank you for your purchase!</h1>
      <p>Your order number is: {order.id}</p>
      <p>You will receive an email confirmation shortly.</p>
    </div>
  );
}

export default OrderConfirmationPage;
