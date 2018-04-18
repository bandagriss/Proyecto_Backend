var express = require('express');
var router = express.Router();
var models = require('../models');


/**
 * Recupera todos los registros de financiadores
 * @param {} 
 * @return {financiadores}
 */

router.get('/financiadores', (req, res) => {
  models.Financiador.findAll()
    .then(respuesta => {
      if( respuesta.length > 0 ){
        res.status(200).send({
          mensaje: 'La consulta fue un exito',
          datos: respuesta
        })
      } else {
        res.status(200).send({
          mensaje: 'No se encontraron resultados',
          datos: respuesta
        });
      }
    }).catch(error => {
      res.status(401).send({
        mensaje: 'Ocurrio un error al procesar la consulta',
        datos: error
      })
    })
});


/**
 * Crea un financiadores
 * @param {nombre} 
 * @return {registro}
 */

router.post('/financiadores', (req, res) => {
  models.Financiador.create({
    nombre: req.body.nombre,
    fid_institucion: req.body.fid_institucion,
    fid_usuario: req.body.fid_usuario,
    procedencia: req.body.procedencia,
    descripcion: req.body.descripcion,
    logo: req.body.logo,
    fecha_fundacion: req.body.fecha_fundacion,
    codigo_registro: req.body.codigo_registro,
    vision: req.body.vision,
    mision: req.body.mision,
  })
    .then(respuestaFinanciador => {
      res.status(201).send({
        mensaje: "La institución se creó satisfactoriamente",
        datos: respuestaFinanciador
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

router.put('/financiadores/:id', (req, res) => {
  models.Financiador.update({
    nombre: req.body.nombre,
    fid_institucion: req.body.fid_institucion,
    fid_usuario: req.body.fid_usuario,
    procedencia: req.body.procedencia,
    descripcion: req.body.descripcion,
    logo: req.body.logo,
    fecha_fundacion: req.body.fecha_fundacion,
    codigo_registro: req.body.codigo_registro,
    vision: req.body.vision,
    mision: req.body.mision,
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
 * Retorna los datos de un financiadores 
 * @param {id} 
 * @return {registro}
 */

router.get('/financiadores/:id', (req, res) => {
  models.Financiador.findOne({
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

router.delete('/financiadores/:id', (req, res) => {
  models.Financiador.destroy({
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
