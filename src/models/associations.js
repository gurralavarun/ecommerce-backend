const Role = require("./Role");
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");

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

module.exports = {
    Role,
    User,
    Category,
    Product
};