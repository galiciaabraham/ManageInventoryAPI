import { productModel } from "../model/mongoose";
import { Request, Response } from 'express';
import  { Product }  from '../utilities/productType';

//Encapsulation of the Product Controller functions within a TypeScript class.
class ProductController {
    //Initializes a TypeScript List to store the new products added during the current session.
    private products : Product[] = [];

    //Add a new product to the data base and push it to the current session list of added products
    public async addNewProduct(req: Request, res: Response) : Promise<void> {
        try {
            const newProduct : Product = {
                product_id : req.body.product_id,
                product_name : req.body.product_name,
                quantity : req.body.quantity,
                entry_date : req.body.entry_date,
                modification_date : ''
            }
            await productModel.create(newProduct);
            this.products.push(newProduct);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).send('An error has occured while adding the new product.');
        }
    }

    //Get all products from the database.
    public async getAllProducts (req: Request, res: Response) : Promise<void> {
        try {
            const data = await productModel.find({});
            if (!data || data.length == 0) {
                res.status(400).json({message: 'No products not found'})   
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send('An error has occured while retreiving the data, Oh no!');
        }
    }
    //Get a product by ID from the database
    public async getProductById (req: Request, res: Response) : Promise<void> {
        const id = req.params.id;
        try {
            const data = await productModel.find({product_id : id})
            if (!data || data.length == 0) {
                res.status(400).json({message: 'product not found'})   
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send('An error has occured while retreiving the data, Oh no!');
        }
    }
    //Update a product by ID in the database
    public async updateProduct (req : Request, res: Response) : Promise<void> {
        const id = req.params.id;
        const update : Product = {
                product_id : parseInt(id),
                product_name : req.body.product_name,
                quantity : req.body.quantity,
                entry_date : req.body.entry_date,
                modification_date : new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
            }
            const filter = { product_id : id};
        try {
            
            const result = await productModel.updateOne( filter, update);
            if (result.modifiedCount === 1){
                res.status(200).json(update);

            }
        } catch (error) {
            res.status(500).send('An error has occured while updating the new product.');
        }
    }
    //Delete a product from the database by ID
    public async deleteProduct (req : Request, res: Response) : Promise<void> {
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

    //Find a product added during the current session using recursion.
    private findProductRecursively (products: Product[], product_id: string): Product | null {
            
            for (const product of products) {
                if (product.product_id === parseInt(product_id)) {
                    return product;
                }
            }
            return null;
        }
    
    //Return the result of the recursive search. 
    public recursiveSearch(req : Request, res: Response) {
    const product_id = req.params.id;
    const product = this.findProductRecursively(this['products'], product_id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

}

export const productController = new ProductController();