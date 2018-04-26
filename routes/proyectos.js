const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const ProyectoCtrl = require('../controllers/ProyectoController');

const secret = config.jwt.jwtSecret;

router.route('/proyecto')
  .get(jwt({ secret }), ProyectoCtrl.listar)
  .post(jwt({ secret }), ProyectoCtrl.crear);

router.route('/proyecto/:id')
  .get(jwt({ secret }), ProyectoCtrl.buscar)
  .put(jwt({ secret }), ProyectoCtrl.actualizar)
  .delete(jwt({ secret }), ProyectoCtrl.eliminar);

module.exports = router;
