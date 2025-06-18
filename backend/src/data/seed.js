const mongoose = require('mongoose');
const Product = require('../models/product');
const connectDB = require('../config/db');

const seedProducts = [
  {
    name: 'Wireless Headphones',
    image: 'https://via.placeholder.com/150',
    description: 'High quality wireless headphones',
    price: 99.99,
  },
  {
    name: 'Smartphone',
    image: 'https://via.placeholder.com/150',
    description: 'Latest smartphone with amazing features',
    price: 499.99,
  },
];

(async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(seedProducts);
  console.log('Database seeded');
  process.exit();
})();
