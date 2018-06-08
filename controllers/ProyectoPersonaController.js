const models = require('../models');

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
  console.log("===================>", "llega aqui");
  models.ProyectoPersona.create({
    fid_proyecto: req.body.fid_proyecto,
    fid_persona: req.body.fid_persona
    // detalle: req.body.detalle
  })
    .then((respuestaProyectoPersona) => {
      res.status(201).send({
        finalizado: true,
        mensaje: 'El proyecto asignado a una persona se creó satisfactoriamente',
        datos: respuestaProyectoPersona
      });
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
  models.ProyectoPersona.update({
    fid_proyecto: req.body.fid_proyecto,
    fid_persona: req.body.fid_persona,
    detalle: req.body.detalle
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

function buscar(req, res) {
  models.ProyectoPersona.findOne({
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
  models.ProyectoPersona.destroy({
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
