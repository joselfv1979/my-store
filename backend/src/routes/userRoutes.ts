import { Router } from "express";
import { login } from "../controllers/loginController";
import { getUsers, getUserById, addNewUser, editUser, removeUser } from '../controllers/userController';

const userRouter = Router(); // creación de la instancia de enrutamiento

userRouter.get('/:id', getUserById);

userRouter.delete('/:id', removeUser);

userRouter.post('/sign-in', login);

userRouter.post('/sign-up', addNewUser);

userRouter.put('/edit/:id', editUser);

userRouter.get('/', getUsers);

export default userRouter; // exportación del enrutador
