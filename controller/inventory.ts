import { productModel } from "../model/mongoose";

const addNewProduct = async (req: any, res: any) => {
    try {
        const data = {
            product_id : req.body.productId,
            product_name : req.body.productName,
            quantity : req.body.quantity,
            entry_date : req.body.entryDate,
            modification_date : ''
        }
        await productModel.create(data);
        res.status(204);
    } catch (error) {
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
    try {
        const data = {
            product_name : req.body.productName,
            quantity : req.body.quantity,
            entry_date : req.body.entryDate,
            modify_date : Date.now().toString()
        }
        const id = req.params.id;
        await productModel.findByIdAndUpdate( {product_id : id}, data);
        res.status(204);
    } catch (error) {
        res.status(500).send('An error has occured while updating the new product.');
    }
}

const deleteProduct = async (req : any, res: any) => {
    const id = req.params.id;
    try {
        console.log(id);
        await productModel.deleteOne({product_id : id})
        res.status(204);
    } catch (error) {
        res.status(500).send('An error has occured while deleting the product, Oh no!');
    }
}

module.exports = { getProductById, getAllProducts, addNewProduct, updateProduct, deleteProduct };