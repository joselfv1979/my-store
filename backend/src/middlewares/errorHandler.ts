import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";

// Error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {  // CustomError: { status: number, message: string }  
  if (err instanceof CustomError) {
    console.log(err);
    res.status(err.status).json(err.message);
  } else {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
};