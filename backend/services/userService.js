const database = require('../utils/database');

const getAllUsers = async () => {

    const sql = 'select * from users';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql);
        return rows;
    } catch (error) {
        console.log(error);
        return {
            'code': 500,
            'description': error.toString()
        }
    }
}

const getUser = async (username, password) => {

    const sql = 'select * from users where username = ? and password = sha1(?)';
    
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [username, password]);
        return rows[0];
    } catch (error) {
        console.log(error);
        return error
    }
}

const addUser = async ({ username, email, password, role }) => {

    const sql = 'insert into users (username, email, password, role) values (?, ?, sha1(?), ?)';

    try {
        const connection = await database.connection();
        const newUser = await connection.execute(sql, [username, email, password, role]);
        return newUser;
    } catch (error) {
        console.log(error);
        return error
    }
}

const updateUser = async ( id, { username, email, password, role }) => {

    const sql = 'update products set username = ?, email = ?, password = ?, role = ? where id = ?';

    try {
        const connection = await database.connection();
        const [updatedProduct] = await connection.execute(sql, [username, email, password, role, id]);
        return updatedProduct.changedRows;
    } catch (error) {
        console.log(error);
        return error
    }
}

const deleteUser = async (id) => {
    const sql = 'delete from users where id = ?';
    try {
        const connection = await database.connection();
        const result = await connection.execute(sql, [id]);
        console.log('uu', result[0].affectedRows);
        result[0].affectedRows === 1 ? result = true : false;
        console.log('res', result);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser
}