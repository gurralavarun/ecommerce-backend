const paymentService = require("../services/paymentService");

const processPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;

        const payment = await paymentService.processPayment(
            req.user.userId,
            orderId,
            paymentMethod
        );

        res.status(201).json({
            message: "Payment processed successfully",
            payment
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    processPayment
};