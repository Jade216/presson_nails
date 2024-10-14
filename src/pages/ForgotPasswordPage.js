import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import api from '../services/api';  // API service to handle password reset requests

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Send request to API to initiate password reset
      const response = await api.forgotPassword({ email });
      setSuccess(response.message || 'If your email is registered, you will receive a reset link.');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">Send Reset Link</Button>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Form>
    </Container>
  );
}

export default ForgotPassword;
