'use strict';
module.exports = (sequelize, DataTypes) => {
  var Financiador = sequelize.define('Financiador', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Financiador;
};