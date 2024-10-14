const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true }, // e.g., Electronics
    subcategory: { type: String, required: true }, // e.g., Smartphones
    brand: { type: String, required: true },
    stock: { type: Number, default: 0 },
    imageUrl: { type: [String], required: true }, // array of image URLs
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    specs: {
      batteryLife: { type: String }, // for electronics
      screenSize: { type: String }, // for electronics
      weight: { type: Number },
      dimensions: { type: String },
    },
    variants: [
      {
        color: { type: String },
        size: { type: String },
        stock: { type: Number },
      },
    ],
    shipping: {
      weight: { type: Number },
      regions: { type: [String] }, // list of countries/regions
    },
    seller: {
      name: { type: String },
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    },
    seo: {
      keywords: { type: [String] },
      metaDescription: { type: String },
    },
  }, { timestamps: true });

  const Product = mongoose.model('Product', productSchema);

module.exports = Product;
  