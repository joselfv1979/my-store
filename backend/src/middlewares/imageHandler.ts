import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

// Image handling middleware
const storage = multer.diskStorage({
  destination: process.env.UPLOADS_DIR,
  filename: (req, file, cb) => {
    cb(null, `${uuidv4() + file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const { mimetype } = file;
  if (
    mimetype === "image/jpg" ||
    mimetype === "image/jpeg" ||
    mimetype === "image/jfif" ||
    mimetype === "image/png"
  ) {
    cb(null, true);
  } 
};

export default multer({ storage, fileFilter });
