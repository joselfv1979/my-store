const database = require('../utils/database');

const getAllUsers = async () => {

    const sql = 'select * from users';

    const connection = await database.connection();
    const [rows] = await connection.execute(sql);
    return rows;
}

const getUserDataById = async (id) => {

    const sql = 'select * from users where id = ?';

    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [id]);
    if (rows.length === 0) {
        const error = new Error('User not found');
        error.httpCode = 404;
        throw error;
    }

    return rows[0];
}

const getUser = async (username, password) => {

    const sql = 'select * from users where username = ? and password = sha1(?)';

    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [username, password]);
    return rows[0];

}

const addUser = async ({ username, email, password, role }) => {

    const sql = 'insert into users (username, email, password, role) values (?, ?, sha1(?), ?)';

    const connection = await database.connection();
    const [result] = await connection.execute(sql, [username, email, password, role]);

    if (result.affectedRows) {
        let message = 'User registered successfully';
        return { message };
    }
}

const updateUser = async (id, { username, email, password, role }) => {

    const sql = 'update products set username = ?, email = ?, password = ?, role = ? where id = ?';

    const connection = await database.connection();
    const [result] = await connection.execute(sql, [username, email, password, role, id]);

    if (result.changedRows) {
        let message = 'User updated successfully';
        return { message };
    }
}

const deleteUser = async (id) => {
    const sql = 'delete from users where id = ?';

    const connection = await database.connection();
    const result = await connection.execute(sql, [id]);

    if (result.affectedRows) {
        let message = 'User deleted successfully';
        return { message };
    }
}

module.exports = {
    getAllUsers,
    getUserDataById,
    getUser,
    addUser,
    deleteUser,
    updateUser
}