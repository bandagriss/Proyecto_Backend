const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const FaseCtrl = require('../controllers/FaseController');

const secret = config.jwt.jwtSecret;

router.route('/fase')
  .get(jwt({ secret }), FaseCtrl.listar)
  .post(jwt({ secret }), FaseCtrl.crear);

router.route('/fase/:id')
  .get(jwt({ secret }), FaseCtrl.buscar)
  .put(jwt({ secret }), FaseCtrl.actualizar)
  .delete(jwt({ secret }), FaseCtrl.eliminar);

module.exports = router;
