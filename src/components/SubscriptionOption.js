// src/components/SubscriptionOption.js
import React from 'react';
import { Form } from 'react-bootstrap';

function SubscriptionOption({ subscribe, setSubscribe }) {
  return (
    <Form.Group controlId="subscription" className="mt-3">
      <Form.Check
        type="checkbox"
        label="Subscribe to email updates and promotions"
        checked={subscribe}
        onChange={(e) => setSubscribe(e.target.checked)}
      />
    </Form.Group>
  );
}

export default SubscriptionOption;
