const { getAllProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../services/productService');

const getProducts = async (req, res, next) => {
    const products = await getAllProducts();
    res.status(200).json(products);
}

const getProductData = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await getProduct(id);

        if (!product) {
            const error = new Error('Product not found');
            error.httpCode = 404;
            throw error;
        }

        return res.status(200).send({
            success: 'true',
            product
        });
    } catch (error) {
        next(error);
    }
}

const addNewProduct = async (req, res, next) => {
    const product = req.body;

    try {
        const response = await addProduct(product);
        product.id = response[0].insertId;
        return res.status(200).send({
            success: 'true',
            message: 'product created successfully',
            product
        });
    } catch (error) {
        return res.status(500).send({
            success: 'false',
            message: "Couldn't create this product"
        });
    }
}

const editProduct = async (req, res, next) => {
    const product = req.body;

    const { id } = req.params;

    try {
        const updatedProduct = await updateProduct(id, product);

        return res.status(200).send({
            success: 'true',
            message: 'product updated successfully',
            product
        });
    } catch (error) {
        return res.status(500).send({
            success: 'false',
            message: "Couldn't update this product"
        });
    }

}

const removeProduct = async (req, res, next) => {

    const { id } = req.params;

    try {
        const product = await getProduct(id);

        if (!product) {
            const error = new Error('Product not found');
            error.httpCode = 404;
            throw error;
        }
        await deleteProduct(id);
        return res.status(200).send({
            success: 'true',
            message: 'Product deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProducts,
    getProductData,
    addNewProduct,
    editProduct,
    removeProduct
}

