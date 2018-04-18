var express = require('express');
var router = express.Router();
var models = require('../models');


/**
 * Recupera todos los registros de instituciones
 * @param {} 
 * @return {instituciones}
 */

router.get('/institucion', (req, res) => {
  models.Institucion.findAll()
    .then(respuesta => {
      if( respuesta.length > 0 ){
        res.status(200).send({
          mensaje: 'La consulta fue un exito',
          datos: respuesta
        })
      } else {
        res.status(200).send({
          mensaje: 'La consulta fue un exito',
          datos: 'No se encontraron resultados en la búsqueda'
        })
      }
    }).catch(error => {
      res.status(401).send({
        mensaje: 'Ocurrio un error al procesar la consulta',
        datos: error
      })
    })
});


/**
 * Crea una institucion
 * @param {nombre} 
 * @return {registro}
 */

router.post('/institucion', (req, res) => {
  models.Institucion.create({
    nombre: req.body.nombre.trim(),
    descripcion: req.body.descripcion.trim(),
    fid_departamento: req.body.fid_departamento
  })
    .then(respuestaInstitucion => {
      res.status(201).send({
        mensaje: "La institución se creó satisfactoriamente",
        datos: respuestaInstitucion
      })
    })
    .catch(error => {
      res.status(401).send({
        mensaje: 'Ocurrió un problema al guardar el registro',
        datos: error
      });
    });
});


/**
 * Actualiza un registro
 * @param {id} 
 * @return {cantidad}
 */

router.put('/institucion/:id', (req, res) => {
  models.Institucion.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fid_departamento: req.body.fid_departamento
  }, {
    where: {
      id: req.params.id
    }
  }).then(respuesta => {
    res.status(200).send({
      mensaje: 'El dato fue actualizado correctamente',
      datos: respuesta
    })
  }).catch(error => {
    res.status(401).send({
      mensaje: 'Ocurrió un error al actualizar',
      datos: error
    })
  })
});


/**
 * Retorna los datos de una institucion 
 * @param {id} 
 * @return {registro}
 */

router.get('/institucion/:id', (req, res) => {
  models.Institucion.findOne({
    where: {
      id: req.params.id
    }
  }).then(respuesta => {
    if( respuesta != null ){
      res.status(200).send({
        mensaje: 'La consulta fue un exito',
        datos: respuesta
      })
    } else {
      res.status(200).send({
        mensaje: 'No se encontró el registro',
        datos: respuesta
      })
    }
  }).catch(error => {
    res.status(401).send({
      mensaje: 'Ocurrió un error en la consulta',
      datos: error
    })
  });
});


/**
 * Elimina un registro
 * @param {id} 
 * @return {cantidad}
 */

router.delete('/institucion/:id', (req, res) => {
  models.Institucion.destroy({
    where: {
      id: req.params.id
    }
  }).then(respuesta => {
    if( respuesta > 0 ){
      res.status(200).send({
        mensaje: 'El registro se eliminó exitosamente',
        datos: respuesta
      })
    } else {
      res.status(200).send({
        mensaje: 'No se encontró ningún registro',
        datos: respuesta
      })
    }

  }).catch(error => {
    res.status(401).send({
      mensaje: 'Ocurrió un error al eliminar el registro',
      datos: error
    })
  })
});

module.exports = router;
