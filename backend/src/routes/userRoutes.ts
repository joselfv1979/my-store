import { RequestHandler, Router } from "express";
import { login } from "../controllers/loginController";
import { getUsers, getUserById, addNewUser, editUser, removeUser, authenticateUser } from '../controllers/userController';
import authHandler from "../middlewares/authHandler";

const userRouter = Router(); // Creates a routing instance

userRouter.post('/sign-in', login);

userRouter.post('/auth/google', authenticateUser as RequestHandler);

userRouter.post('/sign-up', addNewUser as RequestHandler);

userRouter.put('/user-edit/:id', authHandler, editUser as RequestHandler);

userRouter.delete('/:id', authHandler, removeUser as RequestHandler);

userRouter.get('/:id', authHandler, getUserById as RequestHandler);

userRouter.get('/', authHandler, getUsers as RequestHandler);

export default userRouter;
