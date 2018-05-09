
module.exports = (sequelize, DataTypes) => {
  var Financiador = sequelize.define('Financiador', {
    nombre: DataTypes.STRING,
    procedencia: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    logo: DataTypes.STRING,
    fecha_fundacion: DataTypes.DATE,
    codigo_registro: DataTypes.STRING,
    vision: DataTypes.STRING,
    mision: DataTypes.STRING,
    pais_origen: DataTypes.STRING
  }, {
    tableName: 'financiadores',
    timestamps: true,
    paranoid: true
  });
  Financiador.associate = (models) => {
    Financiador.hasMany(models.Proyecto, {
      foreignKey: 'fid_financiador'
    });
    Financiador.hasMany(models.FinanciadorPersona, {
      foreignKey: 'fid_financiador'
    });
  };
  return Financiador;
};
