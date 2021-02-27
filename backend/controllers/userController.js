const { getAllUsers, getUser, addUser, deleteUser, updateUser } = require('../services/userService');

const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            const error = new Error('User not found');
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
            error.httpCode = 404;
            throw error;
        }

        return res.status(200).send({
            success: 'true',
            user
        });
    } catch (error) {
        next(error);
    }
}

const addNewUser = async (req, res, next) => {

    try {
        const { body, files } = req;
        // const savedImage = await processAndSaveImage(files.image);
        // body.image = savedImage;
        const response = await addUser(body);
        body.id = response[0].insertId;
        return res.status(200).send({
            success: 'true',
            message: 'user created successfully',
            body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: 'false',
            message: "Couldn't create this user"
        });
    }
}

const editUser = async (req, res, next) => {

    try {
        const { body, files } = req;
        const { id } = req.params;

        // const savedImage = await processAndSaveImage(files.image);
        // body.image = savedImage;

        const updatedUser = await updateUser(id, body);

        return res.status(200).send({
            success: 'true',
            message: 'user updated successfully',
            body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: 'false',
            message: "Couldn't update this user"
        });
    }

}

const removeUser = async (req, res, next) => {

    try {
        const { id } = req.params;

        const user = await getProduct(id);

        if (!user) {
            const error = new Error('User not found');
            error.httpCode = 404;
            throw error;
        }
        await deleteUser(id);
        return res.status(200).send({
            success: 'true',
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUserData,
    addNewUser,
    editUser,
    removeUser
}