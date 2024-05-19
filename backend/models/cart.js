// models/cart.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const User = require('./user');
class Cart extends Model {}

Cart.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
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
    modelName: 'Cart',
    tableName: 'cart',  // Especifica el nombre de la tabla aquí
    timestamps: true
});

module.exports = Cart;

