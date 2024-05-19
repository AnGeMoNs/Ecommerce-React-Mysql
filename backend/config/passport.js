// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Asegúrate de tener este modelo creado

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Buscar el usuario por email
        User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Ese email no está registrado' });
                }

                // Comparar la contraseña hasheada
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Contraseña incorrecta' });
                    }
                });
            })
            .catch(err => done(err));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => done(err));
    });
};

