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
  getUserByEmail,
} from "../services/userService";
import { IUser, UserWithoutId } from "../models/User";
import { OAuth2Client } from "google-auth-library";

// endpoint to get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    res.json(users);
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

    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  const googleClient = new OAuth2Client({
    clientId: `${process.env.CLIENT_URL}`,
  });
  
  const ticket = await googleClient.verifyIdToken({
    idToken: req.body.token,
    audience: `${process.env.GOOGLE_CLIENT_ID}`
  });

  const payload = ticket.getPayload();

  if(!payload?.email || !payload?.name) {
    return next(new CustomError(400, "Bad request"));
  }

  let user: IUser | undefined;
  
  let storedUser = await getUserByEmail(payload.email);

  if(!storedUser) {
    const newUser: UserWithoutId = {
      fullname: "",
      username: payload.name,
      email: payload.email,
      password: "",
      roles: ['user'],
      image: "",
    }
    user = await addUser(newUser);
  }

  res.json({ user, token });
};

// endpoint to create a new user
export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const newUser: UserWithoutId = {
      fullname,
      username,
      email,
      password,
      roles,
      image: photo,
    };
    
    const user = await addUser(newUser);

    if(!user) {
      return next(new CustomError(500, "Couldn't register user, try it later"));
    }

     res.status(200).json(user);
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
    res.status(201).json(user);
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

    res.status(204).end();
  } catch (error) {
    next(new CustomError(500, "Couldn't delete user"));
  }
};
