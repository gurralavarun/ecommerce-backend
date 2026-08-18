const {
    Cart,
    CartItem,
    Product
} = require("../models/associations");

const addToCart = async (userId, productId, quantity) => {
    if (!quantity || quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    const product = await Product.findByPk(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    if (product.stock < quantity) {
        throw new Error("Insufficient stock");
    }

    let cart = await Cart.findOne({
        where: { userId }
    });

    if (!cart) {
        cart = await Cart.create({
            userId
        });
    }

    let cartItem = await CartItem.findOne({
        where: {
            cartId: cart.id,
            productId
        }
    });

    if (cartItem) {
        const newQuantity = cartItem.quantity + quantity;

        if (newQuantity > product.stock) {
            throw new Error("Insufficient stock");
        }

        await cartItem.update({
            quantity: newQuantity
        });
    } else {
        cartItem = await CartItem.create({
            cartId: cart.id,
            productId,
            quantity
        });
    }

    return cartItem;
};

const getCart = async (userId) => {
    const cart = await Cart.findOne({
        where: { userId },
        include: {
            model: CartItem,
            include: {
                model: Product,
                attributes: ["id", "name", "price", "stock", "imageUrl"]
            }
        }
    });

    if (!cart) {
        return {
            items: [],
            subtotal: 0,
            total: 0
        };
    }

    let subtotal = 0;

    const items = cart.CartItems.map((item) => {
        const itemTotal = Number(item.Product.price) * item.quantity;

        subtotal += itemTotal;

        return {
            id: item.id,
            productId: item.Product.id,
            name: item.Product.name,
            price: Number(item.Product.price),
            quantity: item.quantity,
            itemTotal
        };
    });

    return {
        cartId: cart.id,
        items,
        subtotal,
        total: subtotal
    };
};

const updateCartItem = async (userId, cartItemId, quantity) => {
    if (!quantity || quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    const cart = await Cart.findOne({
        where: { userId }
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const cartItem = await CartItem.findOne({
        where: {
            id: cartItemId,
            cartId: cart.id
        }
    });

    if (!cartItem) {
        throw new Error("Cart item not found");
    }

    const product = await Product.findByPk(cartItem.productId);

    if (!product) {
        throw new Error("Product not found");
    }

    if (quantity > product.stock) {
        throw new Error("Insufficient stock");
    }

    await cartItem.update({
        quantity
    });

    return cartItem;
};

const removeCartItem = async (userId, cartItemId) => {
    const cart = await Cart.findOne({
        where: { userId }
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const cartItem = await CartItem.findOne({
        where: {
            id: cartItemId,
            cartId: cart.id
        }
    });

    if (!cartItem) {
        throw new Error("Cart item not found");
    }

    await cartItem.destroy();
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
};