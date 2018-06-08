const models = require('../models');
const libs = require('../libs');

function buscar(req, res, objeto, mensaje) {
  models.ProyectoPersona.findOne({
    where: {
      id: objeto.id
    },
    include: [
      { model: models.Usuario }
    ]
  }).then((respuesta) => {
    if (respuesta != null) {
      libs.Success(res, respuesta, mensaje);
    }
    else {
      libs.Success(res, respuesta, 'No se encontró el registro');
    }
  }).catch(error => libs.Error(res, error));
}

function listar(req, res) {
  models.ProyectoPersona.findAll()
    .then((respuesta) => {
      if (respuesta.length > 0) {
        res.status(200).send({
          finalizado: true,
          mensaje: 'La consulta fue un exito',
          datos: respuesta
        });
      }
      else {
        res.status(200).send({
          finalizado: true,
          mensaje: 'La consulta fue un exito',
          datos: 'No se encontraron resultados en la búsqueda'
        });
      }
    }).catch((error) => {
      res.status(400).send({
        finalizado: false,
        mensaje: 'Ocurrio un error al procesar la consulta',
        datos: error
      });
    });
}

function crear(req, res) {
  models.ProyectoPersona.create({
    fid_proyecto: req.body.fid_proyecto,
    fid_persona: req.body.fid_persona
  })
    .then((respuestaProyectoPersona) => {
      buscar(req, res, respuestaProyectoPersona, 'El proyecto asigando a una persona se creó satisfactoriamente');
    })
    .catch(error => libs.Error(res, error));
}

function actualizar(req, res) {
  models.ProyectoPersona.update({
    fid_proyecto: req.body.fid_proyecto,
    fid_persona: req.body.fid_persona,
    detalle: req.body.detalle
  }, {
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    libs.Success(res, respuesta, 'El dato fue actualizado correctamente');
  }).catch(error => libs.Error(res, error));
}



function eliminar(req, res) {
  models.ProyectoPersona.destroy({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta > 0) {
      libs.Success(res, respuesta, 'El registro se eliminó exitosamente');
    }
    else {
      libs.Success(res, respuesta, 'No se encontró ningún registro');
    }
  }).catch(error => libs.Error(res, error));
}

function listarByProyecto(req, res) {
  models.ProyectoPersona.findAll({
    where: { fid_proyecto: req.params.id },
    include: [
      {
        model: models.Usuario
      }]
  }).then((respuesta) => {
    libs.Success(res, respuesta, 'La consulta fue un éxito');
  }).catch(error => libs.Error(res, error));
}

module.exports = {
  listar,
  crear,
  actualizar,
  buscar,
  eliminar,
  listarByProyecto
};
