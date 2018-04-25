
module.exports = (sequelize, DataTypes) => {
  var Usuario = sequelize.define('Usuario', {
    nombres: {
      type: DataTypes.STRING,
      trim: true
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
    nro_carnet: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    correo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING
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
      }
    },
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true
  });
  return Usuario;
};
