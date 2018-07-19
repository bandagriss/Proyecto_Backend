const express = require('express');
const jwt = require('express-jwt');

const config = require('../config/config.json');

const router = express.Router();
const UsuarioCtrl = require('../controllers/UsuarioController');

const secret = config.jwt.jwtSecret;


router.route('/usuarios')

/**
 * recupera una lista de usuarios
 * @param {}
 * @return {String}
 */
  .get(jwt({ secret }), UsuarioCtrl.listar)
/**
 *Crea un usuario
 * @param {username, password, nro_carnet, fid_rol, fid_institucion}
 * @return {String}
 */
  .post(jwt({ secret }), UsuarioCtrl.crear);

router.route('/usuarios/:id')
  .get(jwt({ secret }), UsuarioCtrl.buscar)
  .put(jwt({ secret }), UsuarioCtrl.actualizar)
  .delete(jwt({ secret }), UsuarioCtrl.eliminar);

router.route('/usuario/imagen')
  .post(jwt({ secret }), UsuarioCtrl.imagen);


module.exports = router;
