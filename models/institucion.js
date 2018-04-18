'use strict';
module.exports = (sequelize, DataTypes) => {
  var Institucion = sequelize.define('Institucion', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fid_departamento: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Institucion.belongsTo(models.Departamento, {
          foreignKey: {
            allowNull: false
          }
        });
        Institucion.hasMany(models.Proyecto);
        Institucion.hasMany(models.Financiador);
        Institucion.hasMany(models.Usuario);
      }
    },
    tableName: 'instituciones',
    timestamps: true,
    paranoid: true
  });
  return Institucion;
};
