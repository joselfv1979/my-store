const express = require('express');
const { getProducts, getFilteredProductList, getProductData, createProduct, removeProduct, editProduct } = require('../controllers/productController')
const router = express.Router(); // creación de la instancia de enrutamiento

router.get('/', getFilteredProductList);

router.get('/:id', getProductData);

router.post('/product-add', createProduct);

router.put('/product-edit/:id', editProduct);

router.delete('/:id', removeProduct)

module.exports = router; // exportación del enrutador