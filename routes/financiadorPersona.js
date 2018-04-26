const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const FinanciadorPersonaCtrl = require('../controllers/FinanciadorPersonaController');

const secret = config.jwt.jwtSecret;

router.route('/financiador_persona')
  .get(jwt({ secret }), FinanciadorPersonaCtrl.listar)
  .post(jwt({ secret }), FinanciadorPersonaCtrl.crear);

router.route('/financiador_persona/:id')
  .get(jwt({ secret }), FinanciadorPersonaCtrl.buscar)
  .put(jwt({ secret }), FinanciadorPersonaCtrl.actualizar)
  .delete(jwt({ secret }), FinanciadorPersonaCtrl.eliminar);

module.exports = router;
