const express = require("express");

const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const router = express.Router();

router.post(
    "/",
    authenticateToken,
    authorizeRole("ADMIN"),
    createProduct
);

router.get("/", getAllProducts);

router.put(
    "/:id",
    authenticateToken,
    authorizeRole("ADMIN"),
    updateProduct
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("ADMIN"),
    deleteProduct
);

module.exports = router;