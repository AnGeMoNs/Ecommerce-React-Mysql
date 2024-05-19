// middleware/isAuthenticated.js
module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        if (req.headers['content-type'] === 'application/json') {
            return res.status(401).json({ message: 'No autorizado. Por favor, inicia sesión.' });
        }

        res.redirect('/users/login');
    }
};

