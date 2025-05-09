import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.CONNECTION_URI || '');

const productSchema = new mongoose.Schema({
    product_id: Number,
    product_name: String,
    quantity: Number,
    entry_date: String,
    modification_date: String,
});

const productModel = mongoose.model('products', productSchema);

export { productModel };