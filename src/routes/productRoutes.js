const express = require("express");

const {
    createProduct,
    getAllProducts,
    getLowStockProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
    createProductValidation,
    updateProductValidation,
    productIdValidation
} = require("../validators/productValidator");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and product browsing APIs
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wireless Headphones
 *               description:
 *                 type: string
 *                 example: Bluetooth wireless headphones
 *               price:
 *                 type: number
 *                 format: double
 *                 example: 2499.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/headphones.jpg
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation or product creation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.post(
    "/",
    authenticateToken,
    authorizeRole("ADMIN"),
    createProductValidation,
    validate,
    createProduct
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search products by name
 *         example: headphones
 *       - in: query
 *         name: categoryId
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter products by category ID
 *         example: 1
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Minimum product price
 *         example: 1000
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Maximum product price
 *         example: 5000
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get(
    "/",
    getAllProducts
);

/**
 * @swagger
 * /api/products/low-stock:
 *   get:
 *     summary: Get low-stock products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 5
 *         description: Stock threshold for low-stock products
 *         example: 5
 *     responses:
 *       200:
 *         description: Low-stock products retrieved successfully
 *       400:
 *         description: Invalid threshold
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
    "/low-stock",
    authenticateToken,
    authorizeRole("ADMIN"),
    getLowStockProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Headphones
 *               description:
 *                 type: string
 *                 example: Updated product description
 *               price:
 *                 type: number
 *                 format: double
 *                 example: 2999.99
 *               stock:
 *                 type: integer
 *                 example: 40
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/updated-headphones.jpg
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation or product update failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.put(
    "/:id",
    authenticateToken,
    authorizeRole("ADMIN"),
    updateProductValidation,
    validate,
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
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
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("ADMIN"),
    productIdValidation,
    validate,
    deleteProduct
);

module.exports = router;