const express = require('express');
const router = express.Router();

// Ruta para la política de privacidad
router.get('/privacy', (req, res) => {
    res.json({ 
        policy: "Aquí va el contenido de tu política de privacidad."
    });
});
module.exports = router;
