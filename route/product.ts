export {};

import express from 'express';
const router = express.Router();

const inventoryController = require('../controller/inventory');

router.get('/:id', inventoryController.getProductById);

module.exports = router;