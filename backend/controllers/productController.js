const { getAllProducts, getFilteredProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../services/productService');
const { processAndSaveImage, deleteOldImage } = require('../utils/processImage');
const { getRating } = require ('../utils/ProductRating');

const getProductList = async (req, res, next) => {

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

        const savedImage = await processAndSaveImage(files.image);
        body.image = savedImage;
        body.rating = getRating(); console.log('rating', body.rating);
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
        const { body } = req;

        const { id } = req.params;

        if (req.files) {

            const savedImage = await processAndSaveImage(req.files.image);
            body.image = savedImage;

            const productData = await getProduct(id);

            await deleteOldImage(productData.image);
        }

        const { message } = await updateProduct(id, body);

        body.id = Number(id);

        return res.status(200).send({
            success: 'true',
            message,
            body
        });
    } catch (error) {
        error.message = 'error in updating product';
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
        error.message = 'error in deleting product';
        next(error);
    }
}

module.exports = {
    getProductList,
    getProductData,
    createProduct,
    editProduct,
    removeProduct
}

