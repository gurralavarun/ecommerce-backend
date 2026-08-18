const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cartItem = await cartService.addToCart(
            req.user.userId,
            productId,
            quantity
        );

        res.status(201).json({
            message: "Product added to cart successfully",
            cartItem
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user.userId);

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        const cartItem = await cartService.updateCartItem(
            req.user.userId,
            req.params.id,
            quantity
        );

        res.status(200).json({
            message: "Cart item updated successfully",
            cartItem
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const removeCartItem = async (req, res) => {
    try {
        await cartService.removeCartItem(
            req.user.userId,
            req.params.id
        );

        res.status(200).json({
            message: "Cart item removed successfully"
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const result = await cartService.clearCart(
            req.user.userId
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
};