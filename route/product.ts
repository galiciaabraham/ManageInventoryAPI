export {};

import express from 'express';
const router = express.Router();
import utilities from '../utilities/utilities';
import { productController } from '../controller/inventory';

/*Retrieve all products */
router.get('/', utilities.handleErrors( productController.getAllProducts ));

/*Retrieve product by ID */
router.get('/:id', utilities.handleErrors( productController.getProductById ));

/*Use a recursive function to find a product by ID  */
router.get('/recursive/:id', utilities.handleErrors( productController.recursiveSearch.bind(productController) ));

/*Create new product*/
router.post('/', utilities.handleErrors ( productController.addNewProduct.bind(productController) ));

/*Update product by ID*/
router.put('/:id', utilities.handleErrors( productController.updateProduct.bind(productController) ));

/*Delete a product by ID */
router.delete('/:id', utilities.handleErrors ( productController.deleteProduct.bind(productController) ));

module.exports = router;