const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const UsuarioCtrl = require('../controllers/UsuarioController');

const secret = config.jwt.jwtSecret;

/**
 * Verifica si el servidor esta arriba
 * @param {}
 * @return {String}
 */

router.get('/api-status', (req, res) => {
  res.json({ status: secret });
});


/**
 * Recupera todos los registros de usuarios
 * @param {}
 * @return {usuarios}
 */

router.route('/usuarios')
  .get(jwt({ secret }), UsuarioCtrl.list)
  .post(UsuarioCtrl.create);

module.exports = router;
