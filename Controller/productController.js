const multer = require('multer');
const path = require('path');
const Product = require('../model/product');
const fs = require('fs');
    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  exports.upload = upload;
  
  // Create a new product
  exports.createProduct = async (req, res) => {
    try {
      const { product_name, product_description, product_quantity, price, price_after_discount } = req.body;
      const product = new Product({
        product_name,
        product_description,
        product_quantity,
        price,
        price_after_discount,
        picture: req.file.filename
      });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all products
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single product by ID
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a product by ID
  exports.updateProductById = async (req, res) => {
    try {
      const { product_name, product_description, product_quantity, price, price_after_discount } = req.body;
      const updateData = {
        product_name,
        product_description,
        product_quantity,
        price,
        price_after_discount
      };
      if (req.file) {
        updateData.picture = req.file.filename;
      }
      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Delete the picture file from the uploads folder
      const filePath = path.join(__dirname, '../uploads', product.picture);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
          return res.status(500).json({ message: 'Error deleting the file' });
        }
        res.status(200).json({ message: 'Product and associated picture deleted successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  