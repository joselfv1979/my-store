import { Router } from "express";
const { getUsers, getUserById, getUserData, addNewUser, editUser, removeUser } = require('../controllers/userController');

const userRouter = Router(); // creación de la instancia de enrutamiento

userRouter.get('/:id', getUserById);

userRouter.get('/', getUsers);

userRouter.post('/sign-in', getUserData);

userRouter.post('/sign-up', addNewUser);

userRouter.put('/edit/:id', editUser);

userRouter.delete('/delete/:id', removeUser)

export default userRouter; // exportación del enrutador
