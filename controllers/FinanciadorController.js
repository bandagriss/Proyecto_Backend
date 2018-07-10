const models = require('../models');
const libs = require('../libs');


function columnas() {
  return ['nombre', 'procedencia', 'descripcion', 'logo', 'fecha_fundacion', 'codigo_registro', 'vision', 'mision', 'pais_origen'];
}

function buscar(req, res, mensaje) {
  models.Financiador.findOne({
    where: {
      id: req.params.id
    }
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
  models.Financiador.findAll()
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
  models.Financiador.create(objeto)
    .then(respuesta => libs.Success(res, respuesta, 'El Financiador se creó exitosamente'))
    .catch(error => libs.Error(res, error));
}

function actualizar(req, res) {
  const objeto = libs.optenerParametros(req, columnas());
  models.Financiador.update(objeto, {
    where: {
      id: req.params.id
    }
  }).then(() => buscar(req, res, 'El dato fue actualizado correctamente'))
    .catch(error => libs.Error(res, error));
}

function eliminar(req, res) {
  models.Financiador.destroy({
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
  }).catch((error) => {
    libs.Error(res, error);
  });
}

// function imagen(req, res) {
//   if (!req.files) {
//     libs.Error(res, 'La imagen no se cargo');
//   }
//   else {
//     libs.Success(res, req.files, 'La imagen se cargo con éxito');
//   }
// }

function imagen(req, res) {
  if (!req.files) {
    libs.Error(res, 'No se encontro el archivo');
  }
  const fecha = Date.parse(new Date());
  const archivo = req.files.avatar;
  const rutaArchivo = `./public/images/${fecha}_${archivo.name}`;
  archivo.mv(rutaArchivo, (err) => {
    if (err) {
      libs.Error(res, err);
    }
    libs.Success(res, rutaArchivo, 'La imagen se cargo con éxito');
  });
}

module.exports = {
  listar,
  crear,
  actualizar,
  buscar,
  eliminar,
  // imagen,
  imagen
};

