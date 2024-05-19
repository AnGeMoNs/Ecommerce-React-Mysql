// models/orderItem.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Order = require('./order'); // Importa correctamente el modelo Order
const Product = require('./product'); // Importa correctamente el modelo Product

class OrderItem extends Model {}

OrderItem.init({
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id'
        },
        allowNull: true
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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
    modelName: 'OrderItem',
    tableName: 'orderitems',
    timestamps: true
});


module.exports = OrderItem;
