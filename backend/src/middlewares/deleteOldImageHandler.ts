import { Request, Response, NextFunction, RequestHandler } from "express";
import { unlink } from "fs/promises";
import { getProduct } from "../services/productService";
import { CustomError } from "../models/CustomError";

const deleteOldImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadDir = process.env.UPLOADS_DIR as string;
  const publicPath = process.env.PUBLIC_PATH as string;

  // If there is a new image file, the old file is removed from the server.
  if (req.file) {
    try {
      const product = await getProduct(req.params.id);
      // If the old file is 'no_image.jpg', we do not delete it.
      if (product && !product.imagePath.includes("no_image.jpg")) {
        await unlink(product.imagePath.replace("static", "public"));
      }
      req.body.image = req.file.path
        .replace(/\\/g, "/")
        .replace(uploadDir, publicPath);
    } catch (error) {
      next(new CustomError(500, "Couldn't update product, try it later"));
    }
  }

  next();
};

export default deleteOldImageHandler as RequestHandler;
