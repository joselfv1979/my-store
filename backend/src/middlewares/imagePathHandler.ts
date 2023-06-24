import { Request, Response, NextFunction } from "express";

export const imagePathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadDir = process.env.UPLOADS_DIR;
  const publicPath = process.env.PUBLIC_PATH;

  const imagePath = req.file ? req.file.path : `${uploadDir}/no_image.jpg`;
  const path = imagePath.replace(/\\/g, "/").replace(uploadDir, publicPath);
  req.body.image = path;
  next();
};
