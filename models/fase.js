'use strict';
module.exports = (sequelize, DataTypes) => {
  var Fase = sequelize.define('Fase', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Fase;
};