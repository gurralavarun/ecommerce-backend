const sequelize = require("../config/database");

const {
    Cart,
    CartItem,
    Product,
    Order,
    OrderItem
} = require("../models/associations");

const createOrder = async (userId) => {
    const transaction = await sequelize.transaction();

    try {
        const cart = await Cart.findOne({
            where: { userId },
            include: {
                model: CartItem,
                include: {
                    model: Product
                }
            },
            transaction
        });

        if (!cart || cart.CartItems.length === 0) {
            throw new Error("Cart is empty");
        }

        let totalAmount = 0;

        for (const cartItem of cart.CartItems) {
            const product = cartItem.Product;

            if (cartItem.quantity > product.stock) {
                throw new Error(
                    `Insufficient stock for product: ${product.name}`
                );
            }

            totalAmount +=
                Number(product.price) * cartItem.quantity;
        }

        const order = await Order.create(
            {
                userId,
                totalAmount,
                status: "PENDING"
            },
            { transaction }
        );

        for (const cartItem of cart.CartItems) {
            const product = cartItem.Product;

            await OrderItem.create(
                {
                    orderId: order.id,
                    productId: product.id,
                    quantity: cartItem.quantity,
                    price: product.price
                },
                { transaction }
            );

            await product.update(
                {
                    stock: product.stock - cartItem.quantity
                },
                { transaction }
            );
        }

        await CartItem.destroy({
            where: { cartId: cart.id },
            transaction
        });

        await transaction.commit();

        return order;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getUserOrders = async (userId) => {
    return await Order.findAll({
        where: { userId },
        include: {
            model: OrderItem,
            include: {
                model: Product,
                attributes: ["id", "name", "imageUrl"]
            }
        },
        order: [["createdAt", "DESC"]]
    });
};

const getOrderById = async (userId, orderId) => {
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId
        },
        include: {
            model: OrderItem,
            include: {
                model: Product,
                attributes: ["id", "name", "imageUrl"]
            }
        }
    });



    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};

const cancelOrder = async (userId, orderId) => {
    const transaction = await sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId
            },
            include: {
                model: OrderItem
            },
            transaction
        });

        if (!order) {
            throw new Error("Order not found");
        }

        if (!["PENDING", "CONFIRMED"].includes(order.status)) {
            throw new Error(
                "Order cannot be cancelled at this stage"
            );
        }

        for (const orderItem of order.OrderItems) {
            const product = await Product.findByPk(
                orderItem.productId,
                { transaction }
            );

            if (product) {
                await product.update(
                    {
                        stock:
                            product.stock +
                            orderItem.quantity
                    },
                    { transaction }
                );
            }
        }

        await order.update(
            {
                status: "CANCELLED"
            },
            { transaction }
        );

        await transaction.commit();

        return order;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const updateOrderStatus = async (orderId, status) => {
    const allowedStatuses = [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED"
    ];

    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid order status");
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    await order.update({
        status
    });

    return order;
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
};