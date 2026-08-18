const { body } = require("express-validator");

const paymentValidation = [
    body("orderId")
        .notEmpty()
        .withMessage("Order ID is required")
        .isInt({ min: 1 })
        .withMessage("Order ID must be a valid positive integer"),

    body("paymentMethod")
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn(["CARD", "UPI", "COD"])
        .withMessage("Payment method must be CARD, UPI, or COD")
];

module.exports = {
    paymentValidation
};