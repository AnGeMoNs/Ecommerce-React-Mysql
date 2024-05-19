// models/category.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class Category extends Model {}

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
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
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true
});

module.exports = Category;

