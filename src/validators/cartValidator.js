const { body, param } = require("express-validator");

const addToCartValidation = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isInt({ min: 1 })
        .withMessage("Product ID must be a valid positive integer"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")
];

const updateCartItemValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Cart item ID must be a valid positive integer"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")
];

const cartItemIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Cart item ID must be a valid positive integer")
];

module.exports = {
    addToCartValidation,
    updateCartItemValidation,
    cartItemIdValidation
};