import { RequestHandler, Router } from "express";
import { getProductList, getProductData, createProduct, removeProduct, editProduct } from '../controllers/productController';
import authHandler from "../middlewares/authHandler";
import imageHandler from "../middlewares/imageHandler";
import { imagePathHandler } from "../middlewares/imagePathHandler";
import deleteOldImageHandler from "../middlewares/deleteOldImageHandler";

const productRouter = Router(); // Creates a routing instance

// Some routes use image, authentication handlers

productRouter.get('/:id', getProductData as RequestHandler);

productRouter.post('/product-add', imageHandler.single("image"), authHandler, imagePathHandler, createProduct as RequestHandler);

productRouter.put('/product-edit/:id', imageHandler.single("image"), authHandler, deleteOldImageHandler, editProduct  as RequestHandler);

productRouter.delete('/:id', authHandler, removeProduct as RequestHandler);

productRouter.get('/', getProductList);

export default productRouter;