const models = require('../models');
const libs = require('../libs');

function columnas() {
  return ['fid_proyecto', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'gastos', 'estado'];
}

function buscar(req, res) {
  models.Fase.findOne({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta != null) {
      libs.Success(res, respuesta, 'El dato fue actualizado correctamente');
    }
    else {
      libs.Success(res, respuesta, 'No se encontraron resultados');
    }
  }).catch(error => libs.Error(res, error));
}

function listar(req, res) {
  models.Fase.findAll()
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
  models.Fase.create(objeto)
    .then(respuestaFase => libs.Success(res, respuestaFase, 'La fase se creó satisfactoriamente'))
    .catch(error => libs.Error(res, error));
}

function actualizar(req, res) {
  const objeto = libs.optenerParametros(req, columnas());
  models.Fase.update(objeto, {
    where: {
      id: req.params.id
    }
  }).then(() => buscar(req, res))
    .catch(error => libs.Error(res, error));
}

function eliminar(req, res) {
  models.Fase.destroy({
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

module.exports = {
  listar,
  crear,
  actualizar,
  buscar,
  eliminar
};
