const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const { createOrder, getUserOrders, getOrderById, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    createOrder
);

router.get(
    "/",
    authenticateToken,
    getUserOrders
);

router.get(
    "/:id",
    authenticateToken,
    getOrderById
);

router.put(
    "/:id/status",
    authenticateToken,
    authorizeRole("ADMIN"),
    updateOrderStatus
);

module.exports = router;