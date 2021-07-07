const jwt = require('jsonwebtoken'); // librería de cifrado de token

const { getAllUsers, getUser, getUserDataById, addUser, deleteUser, updateUser, emailExist, usernameExist  } = require('../services/userService');

const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            const error = new Error('Users not found');
            error.httpCode = 404;
            throw error;
        }

        return res.status(200).send({
            success: 'true',
            users
        });
    } catch (error) {
        next(error);
    }
}

const getUserData = async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const user = await getUser(username, password);

        if (!user) {
            const error = new Error('Invalid credentials');
            error.httpCode = 403;
            throw error;
        }

        const { id, role } = user;

        const tokenPayload = { userId: id };

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });

        user.token = token;

        return res.status(200).send({
            success: 'true',
            user
        });
    } catch (error) {
        error.message = 'Invalid credentials';
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserDataById(id);

        if (!user) {
            const error = new Error('User not found');
            error.httpCode = 404;
            throw error;
        }

        return res.status(200).send({ success: 'true', user });
    } catch (error) {
        next(error);
    }
}

const addNewUser = async (req, res, next) => {

    try {
        const { body } = req;

        if (await emailExist(body.email) > 0) {
            const error = new Error('Mail address already exists');
            error.httpCode = 409;
            throw error;
        }
        if (await usernameExist(body.username) > 0) {
            const error = new Error('username already exists');
            error.httpCode = 409;
            throw error;
        }
        body.role = 'user'
        const { message } = await addUser(body);

        return res.status(200).send({
            success: 'true',
            message
        });
    } catch (error) {
        next(error)
    }
}

const editUser = async (req, res, next) => {

    try {
        const { body } = req;
        const { id } = req.params;

        body.role = 'user'

        const { message } = await updateUser(id, body);

        return res.status(200).send({
            success: 'true',
            message, 
            body
        });
    } catch (error) {
        error.message = 'error in updating user';
        next(error);
    }

}

const removeUser = async (req, res, next) => {

    try {
        const { id } = req.params;
        const  message  = await deleteUser(id);
        return res.status(200).send({
            success: true,
            message
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUserData,
    getUserById,
    addNewUser,
    editUser,
    removeUser
}