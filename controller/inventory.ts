import { productModel } from "../model/mongoose";
import { Request, Response } from 'express';
import  { Product }  from '../utilities/productType';

class ProductController {
    private products : Product[] = [];

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

    public async updateProduct (req : Request, res: Response) : Promise<void> {
        const id = req.params.id;
        const update : Product = {
                product_id : id,
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

    private findProductRecursively (products: Product[], productId: string): Product | null {
            for (const product of products) {
                if (product.product_id === productId) {
                    return product;
                }
            }
            return null;
        }
    
    public recursiveSearch(req : Request, res: Response) {
    const productId = req.params.id;
    const product = this.findProductRecursively(this['products'], productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

}

export const productController = new ProductController();