const express = require('express');
const path = require('path');
const productsRoutes = require('./routes/products.routes');
const usersRoutes = require('./routes/users.routes');
const salesRoutes = require('./routes/sales.routes');
const cartsRoutes = require('./routes/carts.routes');
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');
const logger = require('./middlewares/logger.middleware');
const cors = require('cors');
const app = express();

// Middleware para parsear JSON
app.use(cors({origin: ["http://localhost:5173", "http://localhost:5174"]}));
app.use(logger);
app.use(express.json());
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/sales', salesRoutes);
app.use('/api', salesRoutes);
app.use('/carts', cartsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

module.exports = app;