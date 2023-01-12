import { Router } from "express";
const { getUsers, getUserById, getUserData, addNewUser, editUser, removeUser } = require('../controllers/userController');

const userRouter = Router(); // creación de la instancia de enrutamiento

userRouter.get('/:id', getUserById);

userRouter.delete('/:id', removeUser);;

userRouter.post('/sign-in', getUserData);

userRouter.post('/sign-up', addNewUser);

userRouter.put('/edit/:id', editUser);

userRouter.get('/', getUsers);

export default userRouter; // exportación del enrutador
