
module.exports = (sequelize, DataTypes) => {
  var Documento = sequelize.define('Documento', {
    detalle: DataTypes.STRING,
    fid_fase: DataTypes.INTEGER
  }, {
    tableName: 'documentos',
    timestamps: true,
    paranoid: true
  });
  Documento.associate = (models) => {
    Documento.belongsTo(models.Fase, {
      foreignKey: 'fid_fase'
    });
  };
  return Documento;
};
