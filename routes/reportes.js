const express = require('express');

const router = express.Router();
const ReporteCtrl = require('../controllers/ReporteController');

router.route('/reportes/:id')
  .get(ReporteCtrl.reporteProyecto);


module.exports = router;
