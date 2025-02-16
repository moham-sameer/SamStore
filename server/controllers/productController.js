
const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { title, description, price, category, rating, stock, imageUrl } = req.body;

  try {
    const product = new Product({ title, description, price, category, rating, stock, imageUrl });
    const savedProduct = await product.save();
    const formattedProduct = {
      id: savedProduct._id.toString(),
      title: savedProduct.title,
      description: savedProduct.description,
      price: savedProduct.price,
      discount: savedProduct.discount,
      category: savedProduct.category,
      subcategory: savedProduct.subcategory || "N/A",
      brand: savedProduct.brand || "Unknown",
      stock: savedProduct.stock,
      imageUrl: savedProduct.imageUrl?.[0] || "",
      rating: savedProduct.rating,
      totalReviews: savedProduct.totalReviews,
      batteryLife: savedProduct.specs?.batteryLife || "N/A",
      screenSize: savedProduct.specs?.screenSize || "N/A",
      weight: savedProduct.specs?.weight || 0,
      dimensions: savedProduct.specs?.dimensions || "N/A",
      shippingWeight: savedProduct.shipping?.weight || 0,
      shippingRegions: savedProduct.shipping?.regions?.join(", ") || "N/A",
      sellerName: savedProduct.seller?.name || "Unknown",
      sellerId: savedProduct.seller?.id?.toString() || "N/A",
      keywords: savedProduct.seo?.keywords?.join(", ") || "",
      metaDescription: savedProduct.seo?.metaDescription || "",
      createdAt: savedProduct.createdAt,
      updatedAt: savedProduct.updatedAt,
    };
    
    console.log(formattedProduct);
    res.status(201).json(formattedProduct);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Format response to include `id` instead of `_id`
    const formattedProduct = {
      id: updatedProduct._id.toString(),  // Ensure 'id' is included
      title: updatedProduct.title,
      description: updatedProduct.description,
      price: updatedProduct.price,
      discount: updatedProduct.discount,
      category: updatedProduct.category,
      subcategory: updatedProduct.subcategory || "N/A",
      brand: updatedProduct.brand || "Unknown",
      stock: updatedProduct.stock,
      imageUrl: updatedProduct.imageUrl?.[0] || "",
      rating: updatedProduct.rating,
      totalReviews: updatedProduct.totalReviews,
      batteryLife: updatedProduct.specs?.batteryLife || "N/A",
      screenSize: updatedProduct.specs?.screenSize || "N/A",
      weight: updatedProduct.specs?.weight || 0,
      dimensions: updatedProduct.specs?.dimensions || "N/A",
      shippingWeight: updatedProduct.shipping?.weight || 0,
      shippingRegions: updatedProduct.shipping?.regions?.join(", ") || "N/A",
      sellerName: updatedProduct.seller?.name || "Unknown",
      sellerId: updatedProduct.seller?.id?.toString() || "N/A",
      keywords: updatedProduct.seo?.keywords?.join(", ") || "",
      metaDescription: updatedProduct.seo?.metaDescription || "",
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };

    res.status(200).json(formattedProduct);  // Send formatted response

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
