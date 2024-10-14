// src/components/OrderConfirmation.js
import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OrderConfirmation({ order }) {
  return (
    <Container className="mt-4">
      <Alert variant="success">
        <Alert.Heading>Thank you for your purchase!</Alert.Heading>
        <p>Your order #{order.id} has been successfully placed.</p>
        <hr />
        <p className="mb-0">
          <strong>Total:</strong> ${order.total_price}
        </p>
        <p className="mb-0">
          <strong>Shipping Address:</strong> {order.shipping_address}
        </p>
      </Alert>
      <Button as={Link} to="/products" variant="primary">
        Continue Shopping
      </Button>
    </Container>
  );
}

export default OrderConfirmation;
