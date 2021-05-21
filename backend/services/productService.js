const database = require('../utils/database');

const getAllProducts = async () => {

    const sql = 'select * from products';

    const connection = await database.connection();
    const [rows] = await connection.execute(sql);
    return rows;
}

const getFilteredProducts = async (data) => {

    const { name, category } = data;

    let sql = 'select * from products';
    let parameters = [];
    let count = 0;

    if (name) {
        sql += ' where name = ?';
        parameters.push(name);
        count++;
    }

    if (category) {
        if (count === 0)
            sql += ' where category = ?';
        else
            sql += ' and category = ?';
        parameters.push(category)
        count++;
    }

    const connection = await database.connection();
    const [rows] = await connection.execute(sql, parameters);

    return rows;
}

const getProduct = async (id) => {

    const sql = 'select * from products where id = ?';

    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [id]);
    if (rows.length === 0) {
        const error = new Error('Product not found');
        error.httpCode = 404;
        throw error;
    }

    return rows[0];
}

const addProduct = async ({ name, description, category, price, stock, rating, image }) => {

    const sql = 'insert into products (name, description, category, price, stock, rating, image) values (?, ?, ?, ?, ?, ?)';

    const connection = await database.connection();
    const [result] = await connection.execute(sql, [name, description, category, price, stock, rating, image]);

    if (result.affectedRows) {
        let message = 'Product created successfully';
        let id = result.insertId
        return { message, id };
    }
}

const updateProduct = async (id, { name, description, price, stock, image }) => {

    const sql = 'update products set name = ?, description = ?, price = ?, stock = ?, image = ? where id = ?';

    const connection = await database.connection();
    const [result] = await connection.execute(sql, [name, description, price, stock, image, id]);

    //result.changedRows
    let message = 'Product updated successfully';
    return { message };
}

const deleteProduct = async (id) => {
    const sql = 'delete from products where id = ?';

    const connection = await database.connection();
    const [result] = await connection.execute(sql, [id]);

    if (result.affectedRows) {
        let message = 'Product deleted successfully';
        return { message };
    }
}

module.exports = {
    getAllProducts,
    getFilteredProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}