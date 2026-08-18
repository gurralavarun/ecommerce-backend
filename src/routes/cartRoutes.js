const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

const validate = require("../middleware/validationMiddleware");

const {
    addToCartValidation,
    updateCartItemValidation,
    cartItemIdValidation
} = require("../validators/cartValidator");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management APIs
 */

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Invalid product or quantity
 *       401:
 *         description: Authentication required
 */
router.post(
    "/items",
    authenticateToken,
    addToCartValidation,
    validate,
    addToCart
);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
    "/",
    authenticateToken,
    getCart
);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
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
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Invalid quantity or insufficient stock
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Cart item not found
 */
router.put(
    "/items/:id",
    authenticateToken,
    updateCartItemValidation,
    validate,
    updateCartItem
);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
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
 *         description: Cart item removed successfully
 *       400:
 *         description: Invalid cart item ID
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Cart item not found
 */
router.delete(
    "/items/:id",
    authenticateToken,
    cartItemIdValidation,
    validate,
    removeCartItem
);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Cart not found
 */
router.delete(
    "/",
    authenticateToken,
    clearCart
);

module.exports = router;