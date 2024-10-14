// src/components/RegistrationForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

console.log('Top-level log - Checking if file is loaded');

function RegistrationForm() {

  console.log('RegistrationForm component loaded'); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
  });

  useEffect(() => {
    console.log('Password Validations:', passwordValidations);
  }, [passwordValidations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      // Update password validation state
      setPasswordValidations({
        minLength: value.length >= 6,
        hasLetter: /[a-zA-Z]/.test(value),
        hasNumber: /\d/.test(value),
      });
      console.log('Password:', value);
      console.log('Validations - MinLength:', value.length >= 6, 'HasLetter:', /[a-zA-Z]/.test(value), 'HasNumber:', /\d/.test(value));
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { minLength, hasLetter, hasNumber} = passwordValidations;

    if ( !minLength || !hasLetter || !hasNumber) {
      console.log('Invalid password. Failing validation.');
      setError('Password does not meet all the requirements.');
      return;
    }

    if (!validateEmail(formData.email)) {
      console.log('Invalid email. Failing validation.');
      setError('Please enter a valid email address.');
      return;
    }

    console.log('Validation passed. Submitting form.');

    try {
      const response = await api.register(formData);  // Read the response from API
  
      if (response && response.message) {
        // If the response contains a success message
        setSuccess(response.message);
        setTimeout(() => navigate('/login'), 2000);
        
      } else {
        // Optional: Handle other success cases, such as receiving user info
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      }
  
    
    } catch (err) {
      // Check if there's more specific error information from the response
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
  
    }
  };

  return (
    <Container className="mt-4">
      {/* <h2>Register</h2> */}
      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <Form.Group controlId="firstName" className="mt-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Last Name */}
        <Form.Group controlId="lastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="mt-2">
          <ul className="list-unstyled">
            <li className={`text-${passwordValidations.minLength ? 'success' : 'danger'}`}>
              {passwordValidations.minLength ? '✔' : '✖'} Password must be at least 6 characters long
            </li>
            <li className={`text-${passwordValidations.hasLetter ? 'success' : 'danger'}`}>
              {passwordValidations.hasLetter ? '✔' : '✖'} Password must contain at least one letter
            </li>
            <li className={`text-${passwordValidations.hasNumber ? 'success' : 'danger'}`}>
              {passwordValidations.hasNumber ? '✔' : '✖'} Password must contain at least one number
            </li>
          </ul>
        </div>
        
        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-4">
          Register
        </Button>

        {/* Error and Success Messages */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Form>
    </Container>
  );
}

export default RegistrationForm;
