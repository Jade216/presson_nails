import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserContext } from '../context/UserContext';


function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.login({ email, password });

      console.log('Logged-in user:', response.user);

      if (response.error) {
        setError(response.error);
      } else {
        // Assuming you save the token and user details after login
        // localStorage.setItem('user', JSON.stringify(response.user));
        login(response.user);
        localStorage.setItem('token', response.token);
        navigate('/'); // Redirect to homepage or user dashboard
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>

      <div className="mt-3">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

    </div>
  );
}

export default Login;
