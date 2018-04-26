const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const FinanciadorCtrl = require('../controllers/FinanciadorController');

const secret = config.jwt.jwtSecret;

router.route('/financiador')
  .get(jwt({ secret }), FinanciadorCtrl.listar)
  .post(jwt({ secret }), FinanciadorCtrl.crear);

router.route('/financiador/:id')
  .get(jwt({ secret }), FinanciadorCtrl.buscar)
  .put(jwt({ secret }), FinanciadorCtrl.actualizar)
  .delete(jwt({ secret }), FinanciadorCtrl.eliminar);

module.exports = router;
