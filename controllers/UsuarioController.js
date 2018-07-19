const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const models = require('../models');
const libs = require('../libs');

function buscar(req, res, mensaje) {
  models.Usuario.findOne({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['password', 'refresh_token'] },
    include: [
      {
        model: models.Rol
      },
      {
        model: models.Institucion
      }
    ]
  }).then((respuesta) => {
    if (respuesta != null) {
      libs.Success(res, respuesta, mensaje);
    }
    else {
      libs.Success(res, respuesta, 'No se encontró el registro');
    }
  }).catch((error) => {
    libs.Error(res, error, 'Ocurrió un error en la consulta');
  });
}

function cambiarContrasena(req, res) {
  models.Usuario.findOne({
    where: {
      id: req.params.id
    }
  }).then((usuario) => {
    if (usuario && usuario.comparePassword(req.body.antiguaContrasena, usuario.password)) {
      if (req.body.nuevaContrasena === req.body.confirmarContrasena) {
        models.Usuario.update({
          password: bcrypt.hashSync(req.body.nuevaContrasena, 10),
          refresh_token: uuidv1()
        }, {
          where: {
            id: req.params.id
          }
        }).then((respuesta) => {
          libs.Success(res, respuesta, 'Se actualizó la contraseña con éxito');
        }).catch(error => libs.Error(res, error, 'No se logro actualizar la contraseña'));
      }
      else {
        libs.Error(res, 'Error las contraseñas no coinciden', 'Ocurrió un error en la consulta');
      }
    }
    else {
      libs.Error(res, 'Error en contraseña actual vuelva a intentarlo', 'Ocurrió un error en la consulta');
    }
  }).catch(error => libs.Error(res, error, 'Ocurrió un error en la consulta'));
}


function listar(req, res) {
  const { offset = 0, limit = 50 } = req.query;
  models.Usuario.findAll({
    offset,
    limit,
    attributes: { exclude: ['password', 'refresh_token'] },
    include: [{
      model: models.Rol
    }, {
      model: models.Institucion
    }]
  }).then((respuesta) => {
    libs.Success(res, respuesta, 'Lista de Usuarios encontrados');
  }).catch((e) => {
    libs.Error(res, e, 'Ocurrio un error al listar los usuarios');
  });
}

function crear(req, res) {
  const columnas = ['nombres', 'fid_rol', 'fid_institucion', 'apellido_paterno', 'apellido_materno', 'telefono', 'correo', 'username', 'nro_carnet'];
  const objeto = libs.optenerParametros(req, columnas);
  objeto.password = '123456';
  models.Usuario.create(objeto, {
    attributes: { exclude: ['refresh_token'] }
  }).then((newUser) => {
    req.params.id = newUser.id;
    buscar(req, res, 'Se creó correctamente');
  }).catch((e) => {
    libs.Error(res, e, 'Ocurrio un error al crear el usuario');
  });
}


function actualizar(req, res) {
  const columnas = ['nombres', 'fid_rol', 'fid_institucion', 'apellido_paterno', 'apellido_materno', 'telefono', 'correo', 'username', 'nro_carnet', 'imagen', 'direccion', 'fecha_nacimiento', 'genero'];
  const objeto = libs.optenerParametros(req, columnas);
  // if (objeto) {
  //   libs.Success(res, objeto, 'No se actualizo ningún dato');
  // }
  models.Usuario.update(objeto, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    if (req.body.antiguaContrasena && req.body.nuevaContrasena && req.body.confirmarContrasena) {
      cambiarContrasena(req, res);
    }
    buscar(req, res, 'El dato se actualizó correctamente');
  }).catch((error) => {
    libs.Error(res, error, 'Ocurrió un error al actualizar el dato');
  });
}

function eliminar(req, res) {
  models.Usuario.destroy({
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
    libs.Error(res, error, 'Ocurrió un error al eliminar el registro');
  });
}

function imagen(req, res) {
  if (!req.files) {
    libs.Error(res, 'No se encontro el archivo');
  }
  const fecha = Date.parse(new Date());
  const archivo = req.files.avatar;
  const rutaArchivo = `./public/imagen_usuario/${fecha}_${archivo.name}`;
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
  buscar,
  actualizar,
  eliminar,
  imagen
};
