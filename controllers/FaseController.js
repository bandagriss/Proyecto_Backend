const models = require('../models');

function listar(req, res) {
  models.Fase.findAll()
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
          mensaje: 'No se encontraron resultados',
          datos: respuesta
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
  models.Fase.create({
    fid_proyecto: req.body.fid_proyecto,
    nombre: req.body.nombre,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    gastos: req.body.gastos,
    estado: req.body.estado,
    adjunto: req.body.adjunto,
    fecha_inicio_real: req.body.fecha_inicio_real,
    fecha_fin_real: req.body.fecha_fin_real
  })
    .then((respuestaFase) => {
      res.status(201).send({
        finalizado: true,
        mensaje: 'La fase se creó satisfactoriamente',
        datos: respuestaFase
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
  models.Fase.update({
    fid_proyecto: req.body.fid_proyecto,
    nombre: req.body.nombre,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    gastos: req.body.gastos,
    estado: req.body.estado,
    adjunto: req.body.adjunto,
    fecha_inicio_real: req.body.fecha_inicio_real,
    fecha_fin_real: req.body.fecha_fin_real
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
  models.Fase.findOne({
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
  models.Fase.destroy({
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
