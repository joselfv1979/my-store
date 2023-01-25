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

    const image = req.file ? req.file.path : "";
    const rating = getRating();

    const newProduct: IProduct = {
      name,
      description,
      category,
      price,
      rating,
      image,
    };

    const product = await addProduct(newProduct);

    return res.status(200).json(product);
  } catch (error) {
    next(new CustomError(500, "Couldn't create product, try it later"));
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      return next(new CustomError(400, "Bad request"));
    }

    const image = req.file ? req.file.path : "";

    const newBody = { ...req.body, image };

    const product = await updateProduct(id, newBody);

    return res.status(200).json(product);
  } catch (error) {
    next(new CustomError(500, "Couldn't update product, try it later"));
  }
};

export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await getProduct(id);

    const product = await deleteProduct(id);
    if (!product) return next(new CustomError(404, "Product not found"));

    return res.status(204).end();
  } catch (error) {
    next(new CustomError(500, "Couldn't delete book, try it later"));
  }
};
