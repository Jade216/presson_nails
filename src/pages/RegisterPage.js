import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RegistrationForm from '../components/RegistrationForm';


function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Call the register API
      const response = await api.register({ firstName, lastName, email, password });

      if (response && response.message){
        navigate('/login');
      
      } 
     
    } catch (err) {

      console.log('Error object:', err);

      if (err.message) {
        setError(err.message); 
      } else {
        setError('Registration failed. Please try again.'); //Generic Error
      }
    }
  
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      
      {/* RegistrationForm now handles form UI and sends formData */}
      <RegistrationForm onSubmit={handleRegister} /> {/* Pass handleRegister as a prop */}
      
    </div>
  );
}

export default Register;
