const models = require('../models');

function listar(req, res) {
  models.Proyecto.findAll()
    .then((respuesta) => {
      if (respuesta.length > 0) {
        res.status(200).send({
          mensaje: 'La consulta fue un exito',
          datos: respuesta
        });
      }
      else {
        res.status(200).send({
          mensaje: 'No se encontraron resultados',
          datos: respuesta
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
  models.Proyecto.create({
    nombre: req.body.nombre,
    fid_institucion: req.body.fid_institucion,
    fid_financiador: req.body.fid_financiador,
    descripcion: req.body.descripcion,
    codigo_proyecto: req.body.codigo_proyecto,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    cantidad: req.body.cantidad,
    poblacion_hombres: req.body.poblacion_hombres,
    poblacion_mujeres: req.body.poblacion_mujeres,
    resultado: req.body.resultado,
    objetivo: req.body.objetivo
  })
    .then((respuestaProyecto) => {
      res.status(201).send({
        mensaje: 'La institución se creó satisfactoriamente',
        datos: respuestaProyecto
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
  models.Proyecto.update({
    nombre: req.body.nombre,
    fid_institucion: req.body.fid_institucion,
    fid_financiador: req.body.fid_financiador,
    descripcion: req.body.descripcion,
    codigo_proyecto: req.body.codigo_proyecto,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    cantidad: req.body.cantidad,
    poblacion_hombres: req.body.poblacion_hombres,
    poblacion_mujeres: req.body.poblacion_mujeres,
    resultado: req.body.resultado,
    objetivo: req.body.objetivo
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
  models.Proyecto.findOne({
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
  models.Proyecto.destroy({
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
