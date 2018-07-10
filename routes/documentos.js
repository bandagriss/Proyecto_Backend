const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const DocumentoCtrl = require('../controllers/DocumentoController');

const secret = config.jwt.jwtSecret;

router.route('/documento')
  .get(jwt({ secret }), DocumentoCtrl.listar)
  .post(jwt({ secret }), DocumentoCtrl.crear);

router.route('/documento/:id')
  .get(jwt({ secret }), DocumentoCtrl.buscar)
  .put(jwt({ secret }), DocumentoCtrl.actualizar)
  .post(jwt({ secret }), DocumentoCtrl.guardar)
  .delete(jwt({ secret }), DocumentoCtrl.eliminar);

module.exports = router;
