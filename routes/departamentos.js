const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const DepartamentoCtrl = require('../controllers/DepartamentoController');

const secret = config.jwt.jwtSecret;

router.route('/departamentos')
  .get(jwt({ secret }), DepartamentoCtrl.listar)
  .post(jwt({ secret }), DepartamentoCtrl.crear);

router.route('/departamentos/:id')
  .get(jwt({ secret }), DepartamentoCtrl.buscar)
  .put(jwt({ secret }), DepartamentoCtrl.actualizar)
  .delete(jwt({ secret }), DepartamentoCtrl.eliminar);

module.exports = router;
