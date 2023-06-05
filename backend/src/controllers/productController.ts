import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";
import { IProduct } from "../models/Product";
import { ProductQuery } from "../models/ProductQuery";
import {
  getFilteredProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService";
import { getRating } from "../utils/productRating";

// endpoint to get all products
export const getProductList = async (
  req: Request<{}, {}, {}, ProductQuery>,
  res: Response,
  next: NextFunction
) => {
  try {        
    const result = await getFilteredProducts(req.query);    
    res.json(result);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch products, try it later"));
  }
};

// endpoint to get one product by id
export const getProductData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const product = await getProduct(id);
    if (!product) return next(new CustomError(404, "Product not found"));

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// endpoint to create a new product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      return next(new CustomError(400, "Bad request"));
    }
    
    const imagePath = req.file ? req.file.path : "";

    // 'static' is virtual directory, so as not to expose the real path 'public'
    const path = imagePath.replace(/\\/g, "/").replace("public", "static");

    const rating = getRating();    

    const newProduct: IProduct = {
      name,
      description,
      category,
      price,
      rating,
      imagePath: path,
    };

    const productId = await addProduct(newProduct);

    if(!productId) return new CustomError(500, "Couldn't create product, try it later");

    const product = await getProduct(productId.toString());
    return res.status(200).json(product);
  } catch (error) {
    next(new CustomError(500, "Couldn't create product, try it later"));
  }
};

// endpoint to update one product by id
export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, image } = req.body;

    if (!name || !description || !category || !price) {
      return next(new CustomError(400, "Bad request"));
    }

    // Check if there is a new file path, or we use the old one.
    const imagePath = req.file ? req.file.path.replace("public", "static") : image;
    
    const updatedProduct = await updateProduct(id, { ...req.body, imagePath });

    if(updatedProduct !== 1) {
      return next(new CustomError(404, "Product not found"));
    }  
    
    const product = await getProduct(id);
    
    return res.status(200).json(product);
  } catch (error) {        
    next(new CustomError(500, "Couldn't update product, try it later"));
  }
};

// endpoint to delete one product by id
export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await deleteProduct(id);

    if (!product) return next(new CustomError(404, "Product not found"));

    return res.status(204).end();
  } catch (error) {
    next(new CustomError(500, "Couldn't delete book, try it later"));
  }
};
