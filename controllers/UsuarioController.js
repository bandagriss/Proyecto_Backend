const models = require('../models');

function list(req, res) {
  const { offset = 0, limit = 50 } = req.query;
  models.Usuario.findAll({
    offset,
    limit,
    attributes: { exclude: ['password', 'refresh_token'] }
  }).then((users) => {
    res.status(200).json(users);
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
}

function create(req, res) {
  models.Usuario.create({
    username: req.body.username,
    password: req.body.password,
    fid_rol: req.body.fid_rol,
    fid_institucion: req.body.fid_institucion,
    nombres: req.body.nombres,
    nro_carnet: req.body.nro_carnet
  }, {
    attributes: { exclude: ['refresh_token'] }
  }).then((newUser) => {
    res.status(201).json(newUser);
  }).catch((e) => {
    res.status(401).json({ error: e.errors[0].message });
    // res.status(401).json({ error: e });
  });
}

module.exports = {
  list,
  create
};
