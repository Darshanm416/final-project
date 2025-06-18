const Product = require('../models/product');
const redis = require('../config/redis');

// @desc    Get all products (cached)
exports.getProducts = async (req, res) => {
  try {
    const cachedProducts = await redis.get('products');

    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find({});
    await redis.set('products', JSON.stringify(products), { EX: 60 });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a new product and clear cache
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newProduct = new Product({ name, description, price, image });
    const savedProduct = await newProduct.save();

    // Clear products cache so next fetch gets latest
    await redis.del('products');

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
