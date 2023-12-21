import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { CustomJwt } from "../models/Jwt";

export interface AuthRequest extends Request {
  userId: string;
}

// Middleware for token authentication
const authHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {  
  const authorization = request.get("authorization");

  if (!authorization) {
    return next(new CustomError(401, "Unauthorized"));
  }

  let token = "";

  if (authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  
  if (
    !token ||
    token.length === 0 ||
    token === "null" ||
    token === "undefined"
  ) {
    return next(new CustomError(401, "token missing or invalid"));
  }

  let decodedToken = <CustomJwt>jwt.verify(token, process.env.SECRET as string);

  if (!decodedToken) {
    return next(new CustomError(401, "token missing or invalid"));
  }

  const { id: userId } = decodedToken;

  request.params.userId = userId;

  next();
};

export default authHandler;