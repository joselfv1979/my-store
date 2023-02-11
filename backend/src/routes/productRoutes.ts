import { Router } from "express";
import { getProductList, getProductData, createProduct, removeProduct, editProduct } from '../controllers/productController';
import authHandler from "../middlewares/authHandler";
import imageHandler from "../middlewares/imageHandler";

const productRouter = Router(); // creación de la instancia de enrutamiento

productRouter.get('/:id', authHandler, getProductData);

productRouter.post('/product-add', imageHandler.single("image"), createProduct);

productRouter.put('/product-edit/:id', imageHandler.single("image"), editProduct);

productRouter.delete('/:id', removeProduct);

productRouter.get('/', getProductList);

export default productRouter; // exportación del enrutador