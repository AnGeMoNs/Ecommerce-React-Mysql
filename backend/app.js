// app.js
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./config/passport.js')(passport);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
  credentials: true, // Para permitir el envío de cookies con las solicitudes
};
app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_fallback',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto', sameSite: 'lax' }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configuración de políticas de seguridad con Helmet
app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "http://localhost:3000"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "http://localhost:3000"]
  }
}));

// Servir archivos estáticos de la carpeta "public"
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.gif')) {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }
}));

const { sequelize } = require('./models'); // Importa sequelize de models/index.js

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');

    sequelize.sync({ force: false })
      .then(() => {
        console.log('Modelos sincronizados con la base de datos.');

        const productRoutes = require('./routes/products.js');
        const cartRoutes = require('./routes/cart.js');
        const orderRoutes = require('./routes/orders.js');
        const userRoutes = require('./routes/users.js');
        const policyRoutes = require('./routes/policy.js');
        const { isAuthenticated } = require('./middleware/isAuthenticated.js');

        // Usa las rutas sin el prefijo /api
        app.use('/users', userRoutes);
        app.use('/products', productRoutes);
        app.use('/cart', cartRoutes);
        app.use('/policy', policyRoutes);
        app.use('/orders', isAuthenticated, orderRoutes);

        app.get('/', (req, res) => {
          res.send('Backend funcionando');
        });
        
        // Middleware para manejar 404 no encontrado
        app.use((req, res, next) => {
          res.status(404).json({ error: 'Archivo no encontrado' });
        });

        // Middleware para manejar errores
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Algo salió mal!' });
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
      })
      .catch(err => {
        console.error('Error al sincronizar los modelos con la base de datos:', err);
      });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

