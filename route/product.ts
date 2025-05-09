export {};

import express from 'express';
const router = express.Router();

const inventoryController = require('../controller/inventory');

/*Retrieve all products TODO: edit controller to use recursion*/
router.get('/', inventoryController.getAllProducts);

/*Retrieve product by ID */
router.get('/:id', inventoryController.getProductById);

/*Create new product*/
router.post('/', inventoryController.addNewProduct);

/*Update product by ID*/
router.put('/:id', inventoryController.updateProduct);

/*Delete a product by ID */
router.delete('/:id', inventoryController.deleteProduct);

module.exports = router;