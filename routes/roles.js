const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const RolCtrl = require('../controllers/RolController');

const secret = config.jwt.jwtSecret;


router.route('/rol')
  .get(jwt({ secret }), RolCtrl.listar)
  .post(jwt({ secret }), RolCtrl.crear);

router.route('/rol/:id')
  .get(jwt({ secret }), RolCtrl.buscar)
  .put(jwt({ secret }), RolCtrl.actualizar)
  .delete(jwt({ secret }), RolCtrl.eliminar);


module.exports = router;
