const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    checkWishlist
} = require("../controllers/wishlistController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management APIs
 */


/**
 * @swagger
 * /api/wishlist/check/{productId}:
 *   get:
 *     summary: Check whether a product is in the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Wishlist status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inWishlist:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Authentication required
 */
router.get(
    "/check/:productId",
    authenticateToken,
    checkWishlist
);
/**
 * @swagger
 * /api/wishlist/{productId}:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *       400:
 *         description: Product is already in wishlist or invalid product
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Product not found
 */

router.post(
    "/:productId",
    authenticateToken,
    addToWishlist
);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get the current user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
    "/",
    authenticateToken,
    getWishlist
);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Product not found in wishlist
 */
router.delete(
    "/:productId",
    authenticateToken,
    removeFromWishlist
);

module.exports = router;