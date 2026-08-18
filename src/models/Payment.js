const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define(
    "Payment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        paymentMethod: {
            type: DataTypes.ENUM("CARD", "UPI", "COD"),
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
            allowNull: false,
            defaultValue: "PENDING"
        }
    },
    {
        tableName: "payments",
        timestamps: true
    }
);

module.exports = Payment;