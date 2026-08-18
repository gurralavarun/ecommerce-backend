const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
    paymentValidation
} = require("../validators/paymentValidator");

const {
    processPayment
} = require("../controllers/paymentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing APIs
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Process payment for an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               paymentMethod:
 *                 type: string
 *                 enum:
 *                   - CARD
 *                   - UPI
 *                   - COD
 *                 example: UPI
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *       400:
 *         description: Validation or payment processing failed
 *       401:
 *         description: Authentication required
 */
router.post(
    "/",
    authenticateToken,
    paymentValidation,
    validate,
    processPayment
);

module.exports = router;