import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//It defines the connection string as found in your .env file.
mongoose.connect(process.env.CONNECTION_URI || '');

//Defines a new mongoose Schema that must match your database structure. 
//A further step is to add validation rules.
const productSchema = new mongoose.Schema({
    product_id: Number,
    product_name: String,
    quantity: Number,
    entry_date: String,
    modification_date: String,
});

//Export the model and schema.
const productModel = mongoose.model('products', productSchema);

export { productModel };