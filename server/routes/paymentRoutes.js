// routes/paymentRoutes.js
const express = require('express');
const { createOrder } = require('../controllers/paymentController');

const router = express.Router();

// Define the route for creating an order
router.post('/create-order', createOrder);

module.exports = router;
