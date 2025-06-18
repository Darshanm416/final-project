const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Import path
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); 

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => res.send('Backend OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
