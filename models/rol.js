
module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    nombre: DataTypes.STRING
  }, {
    tableName: 'roles',
    timestamps: true,
    paranoid: true
  });
  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, {
      foreignKey: 'fid_rol'
    });
  };
  return Rol;
};
