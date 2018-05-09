const models = require('../models');

function listar(req, res) {
  const { offset = 0, limit = 50 } = req.query;
  models.Usuario.findAll({
    offset,
    limit,
    attributes: { exclude: ['password', 'refresh_token'] }
  }).then((users) => {
    res.status(200).json({
      finalizado: true,
      mensaje: 'Lista de Usuarios encontrados',
      data: users
    });
  }).catch((e) => {
    res.status(400).json({ error: e.message });
  });
}

function crear(req, res) {
  models.Usuario.create({
    username: req.body.username,
    password: req.body.password,
    nombres: req.body.nombres,
    fid_rol: req.body.fid_rol,
    fid_institucion: req.body.fid_institucion,
    apellido_paterno: req.body.apellido_paterno.trim(),
    apellido_materno: req.body.apellido_materno.trim(),
    genero: req.body.genero,
    fecha_nacimiento: req.body.fecha_nacimiento,
    nro_carnet: req.body.nro_carnet,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    imagen: req.body.imagen
  }, {
    attributes: { exclude: ['refresh_token'] }
  }).then((newUser) => {
    res.status(201).json({
      finalizado: true,
      mensaje: 'Se creó el usuario correctamente',
      data: newUser
    });
  }).catch((e) => {
    res.status(400).json({
      finalizado: false,
      mensaje: 'Ocurrio un error al crear el usuario',
      error: e.errors[0].message
    });
    // res.status(400).json({ error: e });
  });
}

function buscar(req, res) {
  models.Usuario.findOne({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta != null) {
      res.status(200).send({
        finalizado: true,
        mensaje: 'La consulta fue un exito',
        datos: respuesta
      });
    }
    else {
      res.status(200).send({
        finalizado: true,
        mensaje: 'No se encontró el registro',
        datos: respuesta
      });
    }
  }).catch((error) => {
    res.status(400).send({
      finalizado: false,
      mensaje: 'Ocurrió un error en la consulta',
      datos: error
    });
  });
}

function actualizar(req, res) {
  models.Usuario.update({
    nombres: req.body.nombres,
    fid_rol: req.body.fid_rol,
    fid_institucion: req.body.fid_institucion,
    apellido_paterno: req.body.apellido_paterno,
    apellido_materno: req.body.apellido_materno,
    genero: req.body.genero,
    fecha_nacimiento: req.body.fecha_nacimiento,
    nro_carnet: req.body.nro_carnet,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    imagen: req.body.imagen,
    usuario: req.body.usuario,
    contrasena: req.body.contrasena
  }, {
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    res.status(200).send({
      finalizado: true,
      mensaje: 'El dato fue actualizado correctamente',
      datos: respuesta
    });
  }).catch((error) => {
    res.status(400).send({
      finalizado: false,
      mensaje: 'Ocurrió un error al actualizar',
      datos: error
    });
  });
}

function eliminar(req, res) {
  models.Usuario.destroy({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta > 0) {
      res.status(200).send({
        finalizado: true,
        mensaje: 'El registro se eliminó exitosamente',
        datos: respuesta
      });
    }
    else {
      res.status(200).send({
        finalizado: true,
        mensaje: 'No se encontró ningún registro',
        datos: respuesta
      });
    }
  }).catch((error) => {
    res.status(400).send({
      finalizado: false,
      mensaje: 'Ocurrió un error al eliminar el registro',
      datos: error
    });
  });
}

module.exports = {
  listar,
  crear,
  buscar,
  actualizar,
  eliminar
};
