const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');
const upload = productController.upload;

// Create a new product
router.post('/addproduct', upload.single('picture'), productController.createProduct);

// Get all products
router.get('/getallproducts', productController.getAllProducts);

// Get a single product by ID
router.get('/getproduct/:id', productController.getProductById);

// Update a product by ID
router.put('/updateproduct/:id', upload.single('picture'), productController.updateProductById);
// Get all products by category
router.get('/getproductsbycategory/:category', productController.getProductsByCategory);

// Delete a product by ID
router.delete('/deleteproduct/:id', productController.deleteProductById);

module.exports = router;
