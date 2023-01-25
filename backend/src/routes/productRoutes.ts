import { Router } from "express";
import { getProductList, getProductData, createProduct, removeProduct, editProduct } from '../controllers/productController';
import authHandler from "../middlewares/authHandler";

const productRouter = Router(); // creación de la instancia de enrutamiento

productRouter.get('/', getProductList);

productRouter.get('/:id', authHandler, getProductData);

productRouter.post('/product-add', authHandler, createProduct);

productRouter.put('/product-edit/:id', authHandler, editProduct);

productRouter.delete('/:id', authHandler, removeProduct)

export default productRouter; // exportación del enrutador