
module.exports = (sequelize, DataTypes) => {
  var Fase = sequelize.define('Fase', {
    nombre: DataTypes.STRING,
    fid_proyecto: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    gastos: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    estado: {
      type: DataTypes.ENUM,
      values: ['creado', 'en proceso', 'finalizado']
    },
    adjunto: DataTypes.STRING
  }, {
    tableName: 'fases',
    timestamps: true,
    paranoid: true
  });
  Fase.associate = (models) => {
    Fase.belongsTo(models.Proyecto, {
      foreignKey: 'fid_proyecto'
    });
  };
  return Fase;
};
