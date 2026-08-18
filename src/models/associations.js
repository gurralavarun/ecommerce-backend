const Role = require("./Role");
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const CartItem = require("./CartItem");

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

module.exports = {
    Role,
    User,
    Category,
    Product,
    Cart,
    CartItem
};