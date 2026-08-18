const { body, param } = require("express-validator");

const orderIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Order ID must be a valid positive integer")
];

const orderStatusValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Order ID must be a valid positive integer"),

    body("status")
        .notEmpty()
        .withMessage("Order status is required")
        .isIn([
            "PENDING",
            "CONFIRMED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ])
        .withMessage("Invalid order status")
];

module.exports = {
    orderIdValidation,
    orderStatusValidation
};