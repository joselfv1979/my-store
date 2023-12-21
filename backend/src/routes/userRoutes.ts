import { Router } from "express";
import { getUsers, getUserById, addNewUser, editUser, removeUser } from '../controllers/userController';
import authHandler from "../middlewares/authHandler";

const userRouter = Router(); // Creates a routing instance

userRouter.post('/sign-up', addNewUser);

userRouter.put('/user-edit/:id', authHandler, editUser);

userRouter.delete('/:id', authHandler, removeUser);

userRouter.get('/:id', authHandler, getUserById);

userRouter.get('/', authHandler, getUsers);

export default userRouter;
