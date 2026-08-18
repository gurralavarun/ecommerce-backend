const Role = require("./Role");
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const WishlistItem = require("./WishlistItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");

Role.hasMany(User, {
    foreignKey: "roleId"
});

User.belongsTo(Role, {
    foreignKey: "roleId"
});

Category.hasMany(Product, {
    foreignKey: "categoryId"
});

Product.belongsTo(Category, {
    foreignKey: "categoryId"
});

User.hasOne(Cart, {
    foreignKey: "userId"
});

Cart.belongsTo(User, {
    foreignKey: "userId"
});

Cart.hasMany(CartItem, {
    foreignKey: "cartId"
});

CartItem.belongsTo(Cart, {
    foreignKey: "cartId"
});

Product.hasMany(CartItem, {
    foreignKey: "productId"
});

CartItem.belongsTo(Product, {
    foreignKey: "productId"
});

User.hasMany(WishlistItem, {
    foreignKey: "userId"
});

WishlistItem.belongsTo(User, {
    foreignKey: "userId"
});

Product.hasMany(WishlistItem, {
    foreignKey: "productId"
});

WishlistItem.belongsTo(Product, {
    foreignKey: "productId"
});

User.hasMany(Order, {
    foreignKey: "userId"
});

Order.belongsTo(User, {
    foreignKey: "userId"
});

Order.hasMany(OrderItem, {
    foreignKey: "orderId"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

Product.hasMany(OrderItem, {
    foreignKey: "productId"
});

OrderItem.belongsTo(Product, {
    foreignKey: "productId"
});

Order.hasOne(Payment, {
    foreignKey: "orderId"
});

Payment.belongsTo(Order, {
    foreignKey: "orderId"
});

module.exports = {
    Role,
    User,
    Category,
    Product,
    Cart,
    CartItem,
    WishlistItem,
    Order,
    OrderItem,
    Payment
};