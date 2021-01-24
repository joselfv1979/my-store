const database = require('../utils/database');

const getAllProducts = async () => {

    const sql = 'select * from products';

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

const getProduct = async (id) => {

    const sql = 'select * from products where id = ?'

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        if(rows.length ===0) return false;
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async ({ name, description, price, stock }) => {

    const sql = 'insert into products (name, description, price, stock) values (?, ?, ?, ?)';

    try {
        const connection = await database.connection();
        const newProduct = await connection.execute(sql, [name, description, price, stock]);
        return newProduct;
    } catch (error) {
        console.log(error);
        return error
    }
}

const updateProduct = async ( id, { name, description, price, stock }) => {

    const sql = 'update products set name = ?, description = ?, price = ?, stock = ? where id = ?';

    try {
        const connection = await database.connection();
        const [updatedProduct] = await connection.execute(sql, [name, description, price, stock, id]);
        return updatedProduct.changedRows;
    } catch (error) {
        console.log(error);
        return error
    }
}

const deleteProduct = async (id) => {
    const sql = 'delete from products where id = ?';
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
    getAllProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}