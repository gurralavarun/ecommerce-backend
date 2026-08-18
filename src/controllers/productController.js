const productService = require("../services/productService");

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
const result = await productService.getAllProducts(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getLowStockProducts = async (req, res) => {
    try {
        const products = await productService.getLowStockProducts(
            req.query.threshold
        );

        res.status(200).json({
            threshold: req.query.threshold
                ? Number(req.query.threshold)
                : 5,
            products
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getLowStockProducts,
    updateProduct,
    deleteProduct
};