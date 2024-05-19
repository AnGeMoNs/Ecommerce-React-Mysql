// routes/orders.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController.js');
const { isAuthenticated } = require('../middleware/isAuthenticated.js');

// Ruta para realizar un pedido
router.post('/place', isAuthenticated, ordersController.placeOrder);

// Ruta para ver todos los pedidos del usuario
router.get('/', isAuthenticated, ordersController.viewOrders);

// Ruta para ver los detalles de un pedido específico
router.get('/:id', isAuthenticated, ordersController.viewOrderDetails);

module.exports = router;
