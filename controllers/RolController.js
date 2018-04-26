const models = require('../models');

function listar(req, res) {
  models.Rol.findAll()
    .then((respuesta) => {
      if (respuesta.length > 0) {
        res.status(200).send({
          mensaje: 'La consulta fue un exito',
          datos: respuesta
        });
      }
      else {
        res.status(200).send({
          mensaje: 'La consulta fue un exito',
          datos: 'No se encontraron resultados en la búsqueda'
        });
      }
    }).catch((error) => {
      res.status(401).send({
        mensaje: 'Ocurrio un error al procesar la consulta',
        datos: error
      });
    });
}

function crear(req, res) {
  models.Rol.create({
    nombre: req.body.nombre.trim()
  })
    .then((respuestaRol) => {
      res.status(201).send({
        mensaje: 'La institución se creó satisfactoriamente',
        datos: respuestaRol
      });
    })
    .catch((error) => {
      res.status(401).send({
        mensaje: 'Ocurrió un problema al guardar el registro',
        datos: error
      });
    });
}

function actualizar(req, res) {
  models.Rol.update({
    nombre: req.body.nombre
  }, {
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    res.status(200).send({
      mensaje: 'El dato fue actualizado correctamente',
      datos: respuesta
    });
  }).catch((error) => {
    res.status(401).send({
      mensaje: 'Ocurrió un error al actualizar',
      datos: error
    });
  });
}

function buscar(req, res) {
  models.Rol.findOne({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta != null) {
      res.status(200).send({
        mensaje: 'La consulta fue un exito',
        datos: respuesta
      });
    }
    else {
      res.status(200).send({
        mensaje: 'No se encontró el registro',
        datos: respuesta
      });
    }
  }).catch((error) => {
    res.status(401).send({
      mensaje: 'Ocurrió un error en la consulta',
      datos: error
    });
  });
}

function eliminar(req, res) {
  models.Rol.destroy({
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta > 0) {
      res.status(200).send({
        mensaje: 'El registro se eliminó exitosamente',
        datos: respuesta
      });
    }
    else {
      res.status(200).send({
        mensaje: 'No se encontró ningún registro',
        datos: respuesta
      });
    }
  }).catch((error) => {
    res.status(401).send({
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
