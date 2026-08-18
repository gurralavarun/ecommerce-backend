const wishlistService = require("../services/wishlistService");

const addToWishlist = async (req, res) => {
    try {
        const item = await wishlistService.addToWishlist(
            req.user.userId,
            req.params.productId
        );

        res.status(201).json({
            message: "Product added to wishlist successfully",
            item
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistService.getWishlist(
            req.user.userId
        );

        res.status(200).json({
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        await wishlistService.removeFromWishlist(
            req.user.userId,
            req.params.productId
        );

        res.status(200).json({
            message: "Product removed from wishlist successfully"
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};