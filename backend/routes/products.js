const express = require('express');
const router = express.Router(); // creación de la instancia de enrutamiento

const { isAuthenticated } = require('./../middlewares/auth');

const { getProductList, getFilteredProductList, getProductData, createProduct, removeProduct, editProduct } = require('../controllers/productController')

router.get('/', getProductList);

router.get('/filter', getFilteredProductList);

router.get('/:id', getProductData);

router.post('/product-add', isAuthenticated, createProduct);

router.put('/product-edit/:id', isAuthenticated, editProduct);

router.delete('/:id', isAuthenticated, removeProduct)

module.exports = router; // exportación del enrutador