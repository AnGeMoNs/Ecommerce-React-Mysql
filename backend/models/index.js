// associations.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Cart = require('./cart');
const CartItem = require('./cartItem');
const Order = require('./order');
const OrderItem = require('./orderItem');

// Definir asociaciones

// Usuario y Orden
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Usuario y Carrito
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Producto y Categoría
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Carrito y CarritoItem
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Producto y CarritoItem
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// Orden y OrdenItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Producto y OrdenItem
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    Sequelize,
    User,
    Product,
    Category,
    Cart,
    CartItem,
    Order,
    OrderItem
};

