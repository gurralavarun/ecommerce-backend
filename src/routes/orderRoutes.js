const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
    orderIdValidation,
    orderStatusValidation
} = require("../validators/orderValidator");

const {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
} = require("../controllers/orderController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order and order management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create an order from the user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Order creation failed
 *       401:
 *         description: Authentication required
 */
router.post(
    "/",
    authenticateToken,
    createOrder
);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Admin only. Returns all customer orders with customer details.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
    "/",
    authenticateToken,
    authorizeRole("ADMIN"),
    getAllOrders
);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get the logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
    "/my-orders",
    authenticateToken,
    getUserOrders
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *       400:
 *         description: Invalid order ID
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Order not found
 */
router.get(
    "/:id",
    authenticateToken,
    orderIdValidation,
    validate,
    getOrderById
);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel the logged-in user's order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Invalid order ID or order cannot be cancelled
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Order not found
 */
router.put(
    "/:id/cancel",
    authenticateToken,
    orderIdValidation,
    validate,
    cancelOrder
);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - CONFIRMED
 *                   - SHIPPED
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: SHIPPED
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid order ID or order status
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Order not found
 */
router.put(
    "/:id/status",
    authenticateToken,
    authorizeRole("ADMIN"),
    orderStatusValidation,
    validate,
    updateOrderStatus
);

module.exports = router;