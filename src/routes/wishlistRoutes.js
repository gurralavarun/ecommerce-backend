const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require("../controllers/wishlistController");

const router = express.Router();

router.post(
    "/:productId",
    authenticateToken,
    addToWishlist
);

router.get(
    "/",
    authenticateToken,
    getWishlist
);

router.delete(
    "/:productId",
    authenticateToken,
    removeFromWishlist
);

module.exports = router;