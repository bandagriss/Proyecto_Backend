'use strict';
module.exports = (sequelize, DataTypes) => {
  var Departamento = sequelize.define('Departamento', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Departamento;
};