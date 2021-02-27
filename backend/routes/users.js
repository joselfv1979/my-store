const express = require('express');
const { getUsers, getUserData, addNewUser, editUser, removeUser } = require('../controllers/userController');
const router = express.Router(); // creación de la instancia de enrutamiento

router.get('/', getUsers);

router.post('/sign-in', getUserData);

router.post('/sign-up', addNewUser);

router.put('/user-edit/:id', editUser);

router.delete('/:id', removeUser)

module.exports = router; // exportación del enrutador
