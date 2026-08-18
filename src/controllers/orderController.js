const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(
            req.user.userId
        );

        res.status(201).json({
            message: "Order created successfully",
            order
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await orderService.getUserOrders(
            req.user.userId
        );

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(
            req.user.userId,
            req.params.id
        );

        res.status(200).json({
            order
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(
            req.user.userId,
            req.params.id
        );

        res.status(200).json({
            message: "Order cancelled successfully",
            order
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
};