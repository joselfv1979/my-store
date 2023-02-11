import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { loginUser } from "../services/userService";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);

    const user = result;
    
    if (!user) {
      return next(new CustomError(401, "Invalid credentials"));
    }

    const token = generateToken(user.id, user.username, user.role);

    res.status(200).json({
      id: user.id,
      username: user.username,
      roles: user.role,
      token,
    });
  } catch (error) {
    next(new CustomError(500, "Couldn't login user, try it later"));
  }
};

