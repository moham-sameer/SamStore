const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/auth');
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/api/payments', paymentRoutes); 
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
