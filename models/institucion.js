'use strict';
module.exports = (sequelize, DataTypes) => {
  var Institucion = sequelize.define('Institucion', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Institucion;
};