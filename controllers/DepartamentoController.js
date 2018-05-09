const models = require('../models');


function listar(req, res) {
  models.Departamento.findAll()
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
  models.Departamento.findOne({
    where: {
      nombre: req.body.nombre.trim()
    }
  }).then((respDepartamento) => {
    if (respDepartamento != null) {
      res.status(200).send({
        finalizado: true,
        mensaje: 'El departamento ya existe',
        datos: respDepartamento
      });
    }
    else {
      models.Departamento.create({
        nombre: req.body.nombre.trim()
      })
        .then((respuestaDepartamento) => {
          res.status(201).send({
            finalizado: true,
            mensaje: 'El departamento se creó satisfactoriamente',
            datos: respuestaDepartamento
          });
        });
    }
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
  models.Departamento.update({
    nombre: req.body.nombre
  }, {
    where: {
      id: req.params.id
    }
  }).then((respuesta) => {
    if (respuesta != null) {
      models.Departamento.findOne({
        where: { id: req.params.id }
      }).then((item) => {
        res.status(200).send({
          finalizado: true,
          mensaje: 'El dato fue actualizado correctamente',
          datos: item
        });
      });
    }
    else {
      res.status(400).send({
        finalizado: true,
        mensaje: 'No se actualizó ningun dato',
        datos: respuesta
      });
    }
  }).catch((error) => {
    res.status(400).send({
      finalizado: false,
      mensaje: 'Ocurrió un error al actualizar el departamento',
      datos: error
    });
  });
}

function buscar(req, res) {
  models.Departamento.findOne({
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

function eliminar(req, res) {
  models.Departamento.destroy({
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
