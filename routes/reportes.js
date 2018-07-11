const express = require('express');
// const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const ReporteCtrl = require('../controllers/ReporteController');

// const secret = config.jwt.jwtSecret;

router.route('/reportes/:id')
  .get(ReporteCtrl.reporteProyecto);


module.exports = router;
