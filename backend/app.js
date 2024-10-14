const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the 'nail_images' directory
app.use('/nail_images', express.static(path.join(__dirname, 'nail_images')));

app.get('/', (req, res) => {
  res.send('Welcome to the Press-On Nails API');
});

app.get('/db-test', async (req, res) => {
    try {
      const result = await db.query('SELECT NOW()');
      res.json({ success: true, time: result.rows[0].now });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

console.log('JWT Secret:', process.env.JWT_SECRET);  // Check if this logs the correct secret

  
// Routes
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Handle 404 for any undefined route
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler (optional, for catching unexpected errors)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
