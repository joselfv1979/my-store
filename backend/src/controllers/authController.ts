import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { addUser, getUserByEmail, getUserDataById, loginUser, updatePassword } from "../services/userService";
import { generateToken } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";
import { IUser, UserWithoutId } from "../models/User";
import sendMail from "../utils/sendMail";

// endpoint to login users
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

// endpoint to login users with Google
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

  return res.json({ user, token });
};

// endpoint to request a password reset
export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    if (!email) return next(new CustomError(400, "Bad request"));

    const user = await getUserByEmail(email);
    if (!user) return next(new CustomError(404, "User not found"));

    const token = generateToken(user.id, user.username);
    
    const link = `${process.env.CLIENT_URL}/password-reset?token=${token}&id=${user.id}`;
    const template = 'requestResetPassword';

    const payload = { user, link };

    await sendMail(payload, "Password Reset Request", template);
    return res.status(200).send('Password reset email sent successfully.');
  } catch (error) {
    next(error); 
  }
}

// endpoint to request a password reset
export const passwordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = req.body.password;
    const id = req.params.userId;

    const user = await getUserDataById(id);
    if (!user) return next(new CustomError(404, "User not found"));

    const resetPassword = await updatePassword(id, password);

    if(!resetPassword) return next(new CustomError(500, "Couldn't rest password"));

    const template = 'resetPassword';
    const payload = { user };
    await sendMail(payload, "Password Reset", template);

    return res.status(200).send('Password reset email sent successfully.');
  } catch (error) {
    next(new CustomError(500, "Couldn't rest password")); 
  }
}

