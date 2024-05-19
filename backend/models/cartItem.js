// models/cartItem.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Product = require('./product');
const Cart = require('./cart');
class CartItem extends Model {}

CartItem.init({
    cartId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cart,
            key: 'id'
        },
        allowNull: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'id'
        },
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
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
    modelName: 'CartItem',
    tableName: 'cartitems',  // Especifica el nombre de la tabla aquí
    timestamps: true
});



module.exports = CartItem;
