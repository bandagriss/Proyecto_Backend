const models = require('../models');
const libs = require('../libs');

function columnas() {
  return ['fid_financiador', 'fid_institucion', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'poblacion_hombres', 'poblacion_mujeres', 'cantidad', 'objetivo', 'resultado', 'codigo_proyecto'];
}

function listar(req, res) {
  models.Proyecto.findAll({
    include: [{
      model: models.Fase
    }],
    order: [[models.Fase, 'createdAt', 'ASC']]
  })
    .then((respuesta) => {
      if (respuesta.length > 0) {
        libs.Success(res, respuesta, 'La consulta fue un éxito');
      }
      else {
        libs.Success(res, respuesta, 'No se encontraron resultados');
      }
    }).catch(error => libs.Error(res, error));
}

function crear(req, res) {
  const objeto = libs.optenerParametros(req, columnas());
  models.Proyecto.create(objeto)
    .then(respuestaProyecto => libs.Success(res, respuestaProyecto, 'El Proyecto se creó exitosamente'))
    .catch(error => libs.Error(res, error));
}

function actualizar(req, res) {
  const objeto = libs.optenerParametros(req, columnas());
  models.Proyecto.update(objeto, {
    where: {
      id: req.params.id
    }
  }).then(respuesta => libs.Success(res, respuesta, 'El Proyecto se actualizó correctamente'))
    .catch(error => libs.Error(res, error));
}

function buscar(req, res) {
  models.Proyecto.findOne({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta != null) {
      libs.Success(res, respuesta, 'La consulta fue un éxito');
    }
    else {
      libs.Success(res, respuesta, 'No se encontró el registro');
    }
  }).catch(error => libs.Error(res, error));
}

function eliminar(req, res) {
  models.Proyecto.destroy({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta > 0) {
      libs.Success(res, respuesta, 'El registro se eliminó exitosamente');
    }
    else {
      libs.Success(res, respuesta, 'No se encontró el registro');
    }
  }).catch(error => libs.Error(res, error));
}

module.exports = {
  listar,
  crear,
  actualizar,
  buscar,
  eliminar
};
