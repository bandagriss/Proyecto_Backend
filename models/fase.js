'use strict';
module.exports = (sequelize, DataTypes) => {
  var Fase = sequelize.define('Fase', {
    nombre: DataTypes.STRING,
    fid_proyecto: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    gastos: DataTypes.INTEGER,
    estado: {
      type: DataTypes.ENUM,
      values: ['creado', 'en proceso', 'finalizado']
    },
    adjunto: DataTypes.STRING,
    fecha_inicio_real: DataTypes.DATE,
    fecha_fin_real: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Fase.belongsTo(models.Proyecto, {
          allowNull: false
        });
      }
    },
    tableName: 'fases',
    timestamps: true,
    paranoid: true
  });
  return Fase;
};
