const { body, param } = require("express-validator");

const createProductValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .optional()
        .trim(),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        .isInt({ min: 1 })
        .withMessage("Category ID must be a valid positive integer"),

    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL")
];

const updateProductValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Product ID must be a valid positive integer"),

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("description")
        .optional()
        .trim(),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("categoryId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Category ID must be a valid positive integer"),

    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL")
];

const productIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Product ID must be a valid positive integer")
];

module.exports = {
    createProductValidation,
    updateProductValidation,
    productIdValidation
};