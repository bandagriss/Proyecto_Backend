const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const InstitucionCtrl = require('../controllers/InstitucionController');

const secret = config.jwt.jwtSecret;

router.route('/institucion')
  .get(jwt({ secret }), InstitucionCtrl.listar)
  .post(jwt({ secret }), InstitucionCtrl.crear);

router.route('/institucion/:id')
  .get(jwt({ secret }), InstitucionCtrl.buscar)
  .put(jwt({ secret }), InstitucionCtrl.actualizar)
  .delete(jwt({ secret }), InstitucionCtrl.eliminar);

module.exports = router;
