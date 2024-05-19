// models/order.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const User = require('./user');

class Order extends Model {}

Order.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentDetails: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { 
    sequelize, 
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true
});


module.exports = Order;
