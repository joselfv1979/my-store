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

const updateUser = async (id, { username, email }) => {

    const sql = 'update users set username = ?, email = ? where id = ?';

    const connection = await database.connection();
    const [result] = await connection.execute(sql, [username, email, id]);

    if (result.affectedRows) {
        let message = 'User updated successfully';
        return { message };
    } 
}

const deleteUser = async (id) => {
    const sql = 'delete from users where id = ?';

    const connection = await database.connection();
    const result = await connection.execute(sql, [id]);

    if (result[0].affectedRows) {
        let message = 'User deleted successfully';
        return message;
    }
}

const usernameExist = async (username) => {

    const sql = 'SELECT id FROM users WHERE username = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [username]);
        return rows.length;
        
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

const emailExist = async (email) => {

    const sql = 'SELECT id FROM users WHERE email = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [email]);
        return rows.length;
        
    } catch (error) {
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

module.exports = {
    getAllUsers,
    getUserDataById,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    emailExist,
    usernameExist
}