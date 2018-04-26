
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
    classMethods: {
      associate(models) {
        Financiador.hasMany(models.Proyecto);
        Financiador.hasMany(models.FinanciadorPersona);
      }
    },
    tableName: 'financiadores',
    timestamps: true,
    paranoid: true
  });
  return Financiador;
};
