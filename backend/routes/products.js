const express = require('express');
const { getProducts, getProductData, addNewProduct, removeProduct, editProduct } = require('../controllers/productController')
const router = express.Router(); // creación de la instancia de enrutamiento

router.get('/', getProducts);

router.get('/:id', getProductData)

router.post('/product-add', addNewProduct);

router.put('/product-edit/:id', editProduct);

router.delete('/:id', removeProduct)

module.exports = router; // exportación del enrutador