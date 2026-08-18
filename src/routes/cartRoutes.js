const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
} = require("../controllers/cartController");const router = express.Router();

router.post(
    "/items",
    authenticateToken,
    addToCart
);

router.get(
    "/",
    authenticateToken,
    getCart
);

router.put(
    "/items/:id",
    authenticateToken,
    updateCartItem
);

router.delete(
    "/items/:id",
    authenticateToken,
    removeCartItem
);

module.exports = router;