'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Rol.hasMany(models.Usuario);
      }
    },
    tableName: 'roles',
    timestamps: true,
    paranoid: true
  });
  return Rol;
};
