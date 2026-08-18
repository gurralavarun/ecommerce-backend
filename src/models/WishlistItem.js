const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const WishlistItem = sequelize.define(
    "WishlistItem",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "wishlist_items",
        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: ["userId", "productId"]
            }
        ]
    }
);

module.exports = WishlistItem;