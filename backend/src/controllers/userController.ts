import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";
import {
  getAllUsers,
  getUserDataById,
  addUser,
  deleteUser,
  updateUser,
  emailExist,
  usernameExist,
} from "../services/userService";
import { UserWithoutId } from "../models/User";

// endpoint to get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch users, try it later"));
  }
};

// endpoint to get one user by id
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    
    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await getUserDataById(id);
    if (!user) return next(new CustomError(404, "User not found"));

    return res.status(200).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
};

// endpoint to create a new user
export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, username, email, password, role } = req.body;
    const photo = req.file ? req.file.path : "";

    if (!fullname || !username || !email || !password || !role) {
      return next(new CustomError(400, "Bad request"));
    }

    const resultEmail = await emailExist(email);
    if (resultEmail) {
      return next(new CustomError(409, "Email address already exists"));
    }

    const resultUsername = await usernameExist(username);
    if (resultUsername) {
      return next(new CustomError(409, "Username already exists"));
    }

    const newUser: UserWithoutId = {
      fullname,
      username,
      email,
      password,
      role,
      image: photo,
    };
    
    const user = await addUser(newUser);

    if(!user) {
      return next(new CustomError(500, "Couldn't register user, try it later"));
    }

     return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// endpoint to update one user by id
export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { fullname, username, email, image } = req.body;
    const photo = req.file ? req.file.path : image;

    if (!id || !fullname || !username || !email) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBody = { ...req.body, imagePath: photo };

    const updatedUser = await updateUser(id, newBody);
    if (!updatedUser) return next(new CustomError(404, "User not found"));
    
    const user = await getUserDataById(id);
    return res.status(201).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
};

// endpoint to delete one user by id
export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await deleteUser(id);
    if (!user) return next(new CustomError(404, "User not found"));

    return res.status(204).end();
  } catch (error) {
    next(new CustomError(500, "Couldn't delete user"));
  }
};

