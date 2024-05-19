const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql', // Asegúrate de especificar el dialecto correcto
    logging: false // Puedes habilitar el logging para desarrollo
});

module.exports = sequelize;
