'use strict';
module.exports = (sequelize, DataTypes) => {
  var Financiador = sequelize.define('Financiador', {
    nombre: DataTypes.STRING,
    fid_institucion: DataTypes.INTEGER,
    fid_usuario: DataTypes.INTEGER,
    procedencia: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    logo: DataTypes.STRING,
    fecha_fundacion: DataTypes.DATE,
    codigo_registro: DataTypes.STRING,
    vision: DataTypes.STRING,
    mision: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Financiador.belongsTo(models.Usuario, {
          allowNull: false
        });
        Financiador.belongsTo(models.Institucion, {
          allowNull: false
        });
        Financiador.hasMany(models.Proyecto);
      }
    },
    tableName: 'financiadores',
    timestamps: true,
    paranoid: true
  });
  return Financiador;
};
