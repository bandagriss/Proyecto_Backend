const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
const config = require('../config/config.json');
const models = require('../models');

function authenticate(req, res, next) {
  models.Usuario.findOne({
    where: {
      username: req.body.username
    },
    include: [{
      model: models.Rol
    }, {
      model: models.Institucion
    }]
  }).then((user) => {
    if (user && user.comparePassword(req.body.password, user.password)) {
      req.dbUsuario = user;
      next();
    }
    else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
}

async function generateJWT(req, res, next) {
  if (req.dbUsuario) {
    const jwtPayload = { id: req.dbUsuario.id };
    const jwtSecret = config.jwt.jwtSecret;
    const jwtData = { expiresIn: config.jwt.jwtDuration };
    req.token = jwt.sign(jwtPayload, jwtSecret, jwtData);
    // Sets a new refresh_token every time the jwt is generated
    await req.dbUsuario.update({ refresh_token: uuidv1() }).catch((e) => {
      res.status(500).json({ error: e.message });
    });
  }
  next();
}

function refreshJWT(req, res, next) {
  models.Usuario.findOne({
    where: {
      username: req.body.username,
      refresh_token: req.body.refresh_token
    }
  }).then((user) => {
    req.dbUsuario = user;
    next();
  }).catch(() => {
    res.status(401).json({ error: 'Usuario o token incorrecto' });
  });
}

function returnJWT(req, res) {
  if (req.dbUsuario && req.token) {
    const data = {};
    data.id = req.dbUsuario.id;
    data.nombres = req.dbUsuario.nombres;
    data.apellido_paterno = req.dbUsuario.apellido_paterno;
    data.apellido_paterno = req.dbUsuario.apellido_paterno;
    data.apellido_materno = req.dbUsuario.apellido_materno;
    data.imagen_usuario = req.dbUsuario.imagen;
    data.institucion_nombre = req.dbUsuario.Institucion.nombre;
    data.institucion = req.dbUsuario.Institucion.id;
    data.rol_nombre = req.dbUsuario.Rol.nombre;
    res.status(201).json({ token: req.token, refresh_token: req.dbUsuario.refresh_token, data });
  }
  else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  authenticate, generateJWT, refreshJWT, returnJWT
};
