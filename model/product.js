    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    price_after_discount: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
    });

    const Product = mongoose.model('Product', productSchema);

    module.exports = Product;
