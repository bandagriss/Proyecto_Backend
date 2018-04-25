var express = require('express');

var router = express.Router();
var models = require('../models');


/**
 * Recupera todos los registros de usuarios
 * @param {}
 * @return {usuarios}
 */

router.get('/usuario', (req, res) => {
  models.Usuario.findAll()
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
});


/**
 * Crea un usuario
 * @param {nombre}
 * @return {registro}
 */

router.post('/usuario', (req, res) => {
  models.Usuario.create({
    nombres: req.body.nombre.trim(),
    fid_rol: req.body.fid_rol,
    fid_institucion: req.body.fid_institucion,
    apellido_paterno: req.body.apellido_paterno.trim(),
    apellido_materno: req.body.apellido_materno.trim(),
    genero: req.body.genero,
    fecha_nacimiento: req.body.fecha_nacimiento,
    nro_carnet: req.body.nro_carnet,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    imagen: req.body.imagen,
    usuario: req.body.usuario,
    contrasena: req.body.contrasena
  })
    .then((respuestaUsuario) => {
      res.status(201).send({
        mensaje: 'La institución se creó satisfactoriamente',
        datos: respuestaUsuario
      });
    })
    .catch((error) => {
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

router.put('/usuario/:id', (req, res) => {
  models.Usuario.update({
    nombres: req.body.nombres,
    fid_rol: req.body.fid_rol,
    fid_institucion: req.body.fid_institucion,
    apellido_paterno: req.body.apellido_paterno,
    apellido_materno: req.body.apellido_materno,
    genero: req.body.genero,
    fecha_nacimiento: req.body.fecha_nacimiento,
    nro_carnet: req.body.nro_carnet,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    imagen: req.body.imagen,
    usuario: req.body.usuario,
    contrasena: req.body.contrasena
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
});


/**
 * Retorna los datos de un usuario
 * @param {id}
 * @return {registro}
 */

router.get('/usuario/:id', (req, res) => {
  models.Usuario.findOne({
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
});


/**
 * Elimina un registro
 * @param {id}
 * @return {cantidad}
 */

router.delete('/usuario/:id', (req, res) => {
  models.Usuario.destroy({
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
});

module.exports = router;
