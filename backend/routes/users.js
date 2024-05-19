// routes/users.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser, logoutUser, showUserProfile } = require('../controllers/usersController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

// Procesar el formulario de registro
router.post('/register', registerUser);

// Procesar el formulario de login
router.post('/login', passport.authenticate('local'), loginUser);

// Ruta para cerrar sesión
router.post('/logout', logoutUser); // Cambiado de GET a POST

// Ruta para mostrar el perfil del usuario
router.get('/profile', isAuthenticated, showUserProfile);

module.exports = router;



