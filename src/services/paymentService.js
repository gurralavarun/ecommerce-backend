const {
    Payment,
    Order
} = require("../models/associations");

const processPayment = async (userId, orderId, paymentMethod) => {
    const allowedMethods = ["CARD", "UPI", "COD"];

    if (!allowedMethods.includes(paymentMethod)) {
        throw new Error("Invalid payment method");
    }

    const order = await Order.findOne({
        where: {
            id: orderId,
            userId
        }
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status !== "PENDING") {
        throw new Error("Payment cannot be processed for this order");
    }

    const existingPayment = await Payment.findOne({
        where: { orderId }
    });

    if (existingPayment) {
        throw new Error("Payment already processed for this order");
    }

    const payment = await Payment.create({
        orderId,
        paymentMethod,
        status: "SUCCESS"
    });

    await order.update({
        status: "CONFIRMED"
    });

    return payment;
};

module.exports = {
    processPayment
};