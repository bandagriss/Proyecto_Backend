const models = require('../models');
const libs = require('../libs');

function columnas() {
  return ['fid_fase', 'detalle', 'nombre'];
}

function buscar(req, res) {
  models.Documento.findOne({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta != null) {
      libs.Success(res, respuesta, 'La consulta fue satisfactoria');
    }
    else {
      libs.Success(res, respuesta, 'No se encontraron resultados');
    }
  }).catch(error => libs.Error(res, error));
}

function listar(req, res) {
  models.Documento.findAll()
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
  models.Documento.create(objeto)
    .then(respuestaDocumento => libs.Success(res, respuestaDocumento, 'El Documento se creó satisfactoriamente'))
    .catch(error => libs.Error(res, error));
}

function actualizar(req, res) {
  const objeto = libs.optenerParametros(req, columnas());
  models.Documento.update(objeto, {
    where: {
      id: req.params.id
    }
  }).then(() => buscar(req, res))
    .catch(error => libs.Error(res, error));
}

function eliminar(req, res) {
  models.Documento.destroy({
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

function guardar(req, res) {
  if (!req.files) {
    libs.Error(res, 'No se encontro el archivo');
  }
  const fecha = Date.parse(new Date());
  const archivo = req.files.file;
  archivo.mv(`./public/files/${fecha}_${archivo.name}`, (err) => {
    if (err) {
      libs.Error(res, err);
    }
    const objeto = {};
    objeto.fid_fase = req.params.id;
    objeto.detalle = `files/${fecha}_${archivo.name}`;
    objeto.nombre = archivo.name;
    models.Documento.create(objeto)
      .then(respuestaDocumento => libs.Success(res, respuestaDocumento, 'El Documento se creó satisfactoriamente'))
      .catch(error => libs.Error(res, error));
  });
}


module.exports = {
  listar,
  crear,
  actualizar,
  buscar,
  eliminar,
  guardar
};
