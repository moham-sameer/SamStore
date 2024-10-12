// controllers/paymentController.js
const Razorpay = require('razorpay');

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
    key_id: 'your_key_id',
    key_secret: 'your_key_secret',
});

// Create an order
exports.createOrder = async (req, res) => {
    const { amount } = req.body;  // Amount in smallest currency unit (e.g., for INR, it's paise)

    try {
        const options = {
            amount: amount * 100, // Amount in paise (e.g., 500 INR = 50000 paise)
            currency: 'INR',
            receipt: `receipt_${Math.random() * 10000}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ orderId: order.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
