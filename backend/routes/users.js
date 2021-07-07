const express = require('express');
const { getUsers, getUserById, getUserData, addNewUser, editUser, removeUser } = require('../controllers/userController');
const router = express.Router(); // creación de la instancia de enrutamiento

router.get('/:id', getUserById);

router.get('/', getUsers);

router.post('/sign-in', getUserData);

router.post('/sign-up', addNewUser);

router.put('/edit/:id', editUser);

router.delete('/delete/:id', removeUser)

module.exports = router; // exportación del enrutador
