const express = require('express');
const { json } = require('express');
const app = express();

const productRoutes = require('./api/routes/products');


app.use('/products', productRoutes);

module.exports = app;


