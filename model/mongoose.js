const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const models = {};

mongoose.connect(process.env.CONNECTION_URI);

const productSchema = new mongoose.Schema({
    product_id: Number,
    product_name: String,
    quantity: Number,
    entry_date: String,
    modification_date: String,
});

models.productModel = mongoose.model('products', productSchema);

module.exports = models;