import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';  // To get the reset token from the URL
import api from '../services/api';  // API service to handle the password reset

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useParams();  // Get the reset token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Send request to API to reset the password using the token
      const response = await api.resetPassword({ token, password });
      setSuccess('Password reset successful! You can now log in.');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">Reset Password</Button>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Form>
    </Container>
  );
}

export default ResetPassword;
