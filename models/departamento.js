'use strict';
module.exports = (sequelize, DataTypes) => {
  var Departamento = sequelize.define('Departamento', {
    nombre: {
      type:  DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Departamento.hasMany(models.Institucion);
      }
    },
    tableName: 'departamentos',
    timestamps: true,
    paranoid: true
  });
  return Departamento;
};
