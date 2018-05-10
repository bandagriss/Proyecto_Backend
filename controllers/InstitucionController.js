const models = require('../models');


function buscar(req, res) {
  models.Institucion.findOne({
    where: {
      id: req.params.id
    },
    include: [models.Departamento]
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

function listar(req, res) {
  models.Institucion.findAll({
    include: [models.Departamento]
  })
    .then((respuesta) => {
      res.status(200).send({
        finalizado: true,
        mensaje: 'La consulta fue un exito',
        datos: respuesta
      });
    }).catch((error) => {
      res.status(400).send({
        finalizado: false,
        mensaje: 'Ocurrio un error al procesar la consulta',
        datos: error
      });
    });
}

function crear(req, res) {
  models.Institucion.create({
    nombre: req.body.nombre.trim(),
    descripcion: req.body.descripcion.trim(),
    fid_departamento: req.body.fid_departamento
  })
    .then((respuesta) => {
      req.params.id = respuesta.id;
      buscar(req, res);
    })
    .catch((error) => {
      res.status(400).send({
        finalizado: false,
        mensaje: 'Ocurrió un problema al guardar el registro',
        datos: error
      });
    });
}

function actualizar(req, res) {
  models.Institucion.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fid_departamento: req.body.fid_departamento
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    buscar(req, res);
  }).catch((error) => {
    res.status(400).send({
      finalizado: false,
      mensaje: 'Ocurrió un error al actualizar',
      datos: error
    });
  });
}

function eliminar(req, res) {
  models.Institucion.destroy({
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
  actualizar,
  buscar,
  eliminar
};

