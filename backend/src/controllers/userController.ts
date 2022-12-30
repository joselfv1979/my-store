import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";
import { generateToken } from "../utils/jwt";
import {
  getAllUsers,
  getUser,
  getUserDataById,
  addUser,
  deleteUser,
  updateUser,
  emailExist,
  usernameExist,
} from "../services/userService";
import { IUser } from "../models/User";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch users, try it later"));
  }
};

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await getUser(username, password);

    if (!user) {
      return next(new CustomError(401, "Invalid credentials"));
    }

    let id = "";
    if (user.id) {
      id = user.id;
    }
    const token = generateToken(id, username, JSON.stringify(user.roles));

    res.status(200).json({
      id: user.id,
      username,
      roles: user.roles,
      token,
    });
  } catch (error) {
    next(new CustomError(500, "Couldn't login user, try it later"));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await getUserDataById(id);
    if (!user) return next(new CustomError(404, "User not found"));

    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
};

export const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, username, email, password, roles } = req.body;
    const photo = req.file ? req.file.path : "";

    if (!fullname || !username || !email || !password || !roles) {
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
    const newUser: IUser = {
      fullname,
      username,
      email,
      password,
      roles,
      image: photo,
    };

    const response = await addUser(newUser);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { fullname, username, email, image } = req.body;
    const photo = req.file ? req.file.path : image;

    if (!id || !fullname || !username || !email) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBody = { ...req.body, imagePath: photo };

    const user = await updateUser(id, newBody);
    if (!user) return next(new CustomError(404, "User not found"));
    res.status(201).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await deleteUser(id);
    if (!user) return next(new CustomError(404, "User not found"));

    return res.status(204).end();
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
};
