const { getAllUsers, getUser, getUserDataById, addUser, deleteUser, updateUser } = require('../services/userService');

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

        return res.status(200).send({
            success: 'true',
            user
        });
    } catch (error) {
        error.message = 'error in logging user';
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
        const { body, files } = req;
        // const savedImage = await processAndSaveImage(files.image);
        // body.image = savedImage;
        console.log('controller', body);
        body.role = 'user'
        const { message } = await addUser(body);

        return res.status(200).send({
            success: 'true',
            message
        });
    } catch (error) {
        error.message = 'error in creating user';
        next(error)
    }
}

const editUser = async (req, res, next) => {

    try {
        const { body, files } = req;
        const { id } = req.params;
        console.log('controller', body);
        body.role = 'user'

        // const savedImage = await processAndSaveImage(files.image);
        // body.image = savedImage;

        const { message } = await updateUser(id, body);

        return res.status(200).send({
            success: 'true',
            message
        });
    } catch (error) {
        error.message = 'error in updating user';
        next(error);
    }

}

const removeUser = async (req, res, next) => {

    try {
        const { id } = req.params;

        const user = await getUserById(id);

        if (!user) {
            const error = new Error('User not found');
            error.httpCode = 404;
            throw error;
        }
        const { message } = await deleteUser(id);
        return res.status(200).send({
            success: 'true',
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