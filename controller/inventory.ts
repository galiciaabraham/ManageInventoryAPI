import { productModel } from "../model/mongoose";

const addNewProduct = async (req: any, res: any) => {
    console.log('Request body:', req.body);
    try {
        console.log('Called addNewProduct correctly');
        const newProduct = {
            product_id : req.body.productId,
            product_name : req.body.productName,
            quantity : req.body.quantity,
            entry_date : req.body.entryDate,
            modification_date : ''
        }
        console.log(newProduct);
        await productModel.create(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error has occured while adding the new product.');
    }
}

const getAllProducts = async (req: any, res: any) => {
    try {
        const data = await productModel.find({});
        if (!data || data.length == 0) {
            return res.status(400).json({message: 'No products not found'})   
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('An error has occured while retreiving the data, Oh no!');
    }
}

const getProductById = async (req: any, res: any) => {
    const id = req.params.id;
    try {
        console.log(id);
        const data = await productModel.find({product_id : id})
        console.log(data);
        if (!data || data.length == 0) {
            return res.status(400).json({message: 'product not found'})   
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('An error has occured while retreiving the data, Oh no!');
    }
}

const updateProduct = async (req : any, res: any) => {
    const id = req.params.id;
    const data = {
            product_id : id,
            product_name : req.body.productName,
            quantity : req.body.quantity,
            entry_date : req.body.entryDate,
            modification_date : new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
        }
        const filter = { product_id : id};
    try {
        
        const result = await productModel.updateOne( filter, data);
        if (result.modifiedCount === 1){
            res.status(204).send(result);

        }
    } catch (error) {
        res.status(500).send('An error has occured while updating the new product.');
    }
}

const deleteProduct = async (req : any, res: any) => {
    const id = req.params.id;
    const filter = {product_id : id};
    try {
        const result = await productModel.deleteOne(filter)
        if (result.deletedCount == 1){
        res.status(204).send(result);
        }
    } catch (error) {
        res.status(500).send('An error has occured while deleting the product, Oh no!');
    }
}

module.exports = { getProductById, getAllProducts, addNewProduct, updateProduct, deleteProduct };