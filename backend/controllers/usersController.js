// controllers/usersController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const registerUser = async (req, res) => {
    const { name, email, password, address } = req.body;
    let errors = [];

    if (!name || !email || !password || !address) {
        errors.push({ msg: 'Por favor llena todos los campos' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Email ya registrado' }] });
        }

        const newUser = new User({
            name,
            email,
            password,
            address
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        res.status(201).json({ msg: 'Te has registrado exitosamente. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const loginUser = (req, res) => {
    res.status(200).json({ msg: 'Inicio de sesión exitoso', user: req.user });
};

const logoutUser = (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Error al destruir la sesión' });
            }
            res.clearCookie('connect.sid'); // Asegúrate de limpiar la cookie de sesión
            res.status(200).json({ msg: 'Has cerrado sesión exitosamente' });
        });
    });
};

const showUserProfile = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: 'No autorizado' });
    }
    res.status(200).json({ user: req.user });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    showUserProfile
};

