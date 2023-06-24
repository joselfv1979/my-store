import { Router } from "express";
import { getProductList, getProductData, createProduct, removeProduct, editProduct } from '../controllers/productController';
import authHandler from "../middlewares/authHandler";
import imageHandler from "../middlewares/imageHandler";
import { imagePathHandler } from "../middlewares/imagePathHandler";
import { deleteOldImageHandler } from "../middlewares/deleteOldImageHandler";


const productRouter = Router(); // Creates a routing instance

// Some routes use image, authentication handlers

productRouter.get('/:id', getProductData);

productRouter.post('/product-add', authHandler, imageHandler.single("image"), imagePathHandler, createProduct);

productRouter.put('/product-edit/:id', authHandler, imageHandler.single("image"), deleteOldImageHandler, editProduct);

productRouter.delete('/:id', authHandler, removeProduct);

productRouter.get('/', getProductList);

export default productRouter;