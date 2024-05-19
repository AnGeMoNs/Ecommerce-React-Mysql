// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');

// Ruta para obtener la lista de todos los productos
router.get('/', productsController.listProducts);
// Ruta para buscar productos por nombre
router.get('/search', productsController.searchProducts);
// Ruta para obtener productos destacados
router.get('/featured', productsController.featureProducts);
// Ruta para obtener los detalles de un producto específico
router.get('/:id', productsController.getProductDetails);

module.exports = router;
