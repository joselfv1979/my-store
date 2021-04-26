const { getAllProducts, getFilteredProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../services/productService');
const { processAndSaveImage } = require('../utils/processImage');

const getProductList = async (req, res, next) => {
    
    try {
        const result = await getAllProducts();

        if (!result) {
            const error = new Error('Products not found');
            error.httpCode = 404;
            throw error;
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getFilteredProductList = async (req, res, next) => {

    try {
        const result = await getFilteredProducts(req.query);

        if (!result) {
            const error = new Error('Products not found');
            error.httpCode = 404;
            throw error;
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

}

const getProductData = async (req, res, next) => {

    try {
        const { id } = req.params;
        const product = await getProduct(id);

        return res.status(200).send({
            success: 'true',
            product
        });
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {

    try {
        const { body, files } = req;
    
        console.log(body);
        const savedImage = await processAndSaveImage(files.image);
        body.image = savedImage;
        const { message, id } = await addProduct(body);
        body.id = id;
    
        return res.status(200).send({
            success: 'true',
            message,
            body
        });
    } catch (error) {
        error.message = 'error in creating product';
        next(error);
    }
}

const editProduct = async (req, res, next) => {

    try {
        const { body, files } = req;

        const { id } = req.params;

        await getProduct(id);

        const savedImage = await processAndSaveImage(files.image);
        body.image = savedImage;

        const { message } = await updateProduct(id, body);

        body.id = Number(id);

        return res.status(200).send({
            success: 'true',
            message,
            body
        });
    } catch (error) {
        // error.message = 'error in updating product';
        next(error);
    }

}

const removeProduct = async (req, res, next) => {

    try {
        const { id } = req.params;

        await getProduct(id);

        const { message } = await deleteProduct(id);

        return res.status(200).send({
            success: 'true',
            message
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProductList,
    getFilteredProductList,
    getProductData,
    createProduct,
    editProduct,
    removeProduct
}

