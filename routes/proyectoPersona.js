const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const ProyectoPersonaCtrl = require('../controllers/ProyectoPersonaController');

const secret = config.jwt.jwtSecret;

router.route('/proyecto_persona')
  .get(jwt({ secret }), ProyectoPersonaCtrl.listar)
  .post(jwt({ secret }), ProyectoPersonaCtrl.crear);

router.route('/proyecto_persona/:id')
  .get(jwt({ secret }), ProyectoPersonaCtrl.buscar)
  .put(jwt({ secret }), ProyectoPersonaCtrl.actualizar)
  .delete(jwt({ secret }), ProyectoPersonaCtrl.eliminar);

router.route('/proyecto_personas/:id')
  .get(jwt({ secret }), ProyectoPersonaCtrl.listarByProyecto);

module.exports = router;
