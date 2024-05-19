// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');
const { isAuthenticated } = require('../middleware/isAuthenticated.js');

// Ruta para añadir un producto al carrito
router.post('/add', isAuthenticated, cartController.addToCart);

// Ruta para ver el carrito de compras
router.get('/', isAuthenticated, cartController.viewCart);
// Rutas para incrementar y decrementar la cantidad de productos en el carrito
router.post('/increment/:id', isAuthenticated, cartController.incrementItem);
router.post('/decrement/:id', isAuthenticated, cartController.decrementItem);
module.exports = router;
