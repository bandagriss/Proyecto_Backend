var express = require('express');
var router = express.Router();
var models = require('../models');


/**
 * Recupera todos los registros de departamentos
 * @param {} 
 * @return {departamentos}
 */

router.get('/departamentos', function(req, res, next) {
  models.Departamento.findAll()
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
 * Crea un departamento
 * @param {nombre} 
 * @return {registro}
 */

router.post('/departamentos', (req, res) => {
  models.Departamento.findOne({
    where: {
      nombre: req.body.nombre.trim(),
    }
  }).then(respDepartamento => {
    if( respDepartamento != null ){
      res.status(200).send({
        mensaje: "El departamento ya existe",
        datos: respDepartamento
      })
    } else {
      models.Departamento.create({
        nombre: req.body.nombre.trim()
      })
        .then(respuestaDepartamento => {
          res.status(201).send({
            mensaje: "El departamento se creó satisfactoriamente",
            datos: respuestaDepartamento
          })
        })
    }
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

router.put('/departamentos/:id', (req, res) => {
  models.Departamento.update({
    nombre: req.body.nombre
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
      mensaje: 'Ocurrió un error al actualizar el departamento',
      datos: error
    })
  })
});


/**
 * Retorna los datos de un departamento 
 * @param {id} 
 * @return {registro}
 */

router.get('/departamentos/:id', (req, res) => {
  models.Departamento.findOne({
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

router.delete('/departamentos/:id', (req, res) => {
  models.Departamento.destroy({
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
