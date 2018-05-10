const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  var Usuario = sequelize.define('Usuario', {
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: [true], msg: 'El campo nombres no puede estar vacio' }
      }
    },
    fid_rol: DataTypes.INTEGER,
    fid_institucion: DataTypes.INTEGER,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    genero: {
      type: DataTypes.ENUM,
      values: ['masculino', 'femenino']
    },
    fecha_nacimiento: DataTypes.DATE,
    nro_carnet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: [true], msg: 'El número de carnet es requerido' }
      }
    },
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    correo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'El Usuario ya existe'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Las probabilidades estan realmente en tu contra'
      },
      defaultValue: uuidv1()
    }
  }, {
    classMethods: {
      associate(models) {
        Usuario.belongsTo(models.Rol, {
          foreignKey: {
            allowNull: false
          }
        });
        Usuario.belongsTo(models.Institucion, {
          foreignKey: {
            allowNull: false
          }
        });
        Usuario.hasMany(models.ProyectoPersona);
        Usuario.hasMany(models.FinanciadorPersona);
      }
    },
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true
  });
  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Institucion, {
      foreignKey: 'fid_institucion'
    });
    Usuario.belongsTo(models.Rol, {
      foreignKey: 'fid_rol'
    });
    Usuario.hasMany(models.ProyectoPersona, {
      foreignKey: 'fid_persona'
    });
    Usuario.hasMany(models.FinanciadorPersona, {
      foreignKey: 'fid_persona'
    });
  };

  Usuario.beforeCreate((usuario) => {
    const respuesta = usuario;
    const hash = bcrypt.hashSync(usuario.password, 10);
    respuesta.password = hash;
    respuesta.refresh_token = uuidv1();
  });

  Usuario.prototype.comparePassword = (pass1, pass2) => bcrypt.compareSync(pass1, pass2);

  return Usuario;
};
