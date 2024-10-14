const User = require('../models/User');
const AuthService = require('../services/authService');
const crypto = require('crypto');
const { sendResetEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Check if the user already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered' });
    }

    // Hash the password
    const hashedPassword = await AuthService.hashPassword(password);

    // Create a new user
    const newUser = await User.createUser(firstName, lastName, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error during registration:', err);  // Log error for debugging
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await AuthService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = AuthService.createToken(user);

    // Send token and user data to the client
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        firstName:user.first_name, } });
  } catch (err) {
    console.error('Error during login:', err);  // Log error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(200).json({ message: 'If your email is registered, you will receive a reset link.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = Date.now() + 3600000;  // 1-hour expiration

    // Save token and expiration to the user
    await User.updateResetToken(user.id, token, expirationTime);

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    await sendResetEmail(user.email, resetUrl);

    res.status(200).json({ message: 'Reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findUserByResetToken(token);
    if (!user || user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Password validation (optional)
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one letter and one number.' });
    }

    // Hash and save the new password
    const hashedPassword = await AuthService.hashPassword(password);
    await User.updatePassword(user.id, hashedPassword);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
