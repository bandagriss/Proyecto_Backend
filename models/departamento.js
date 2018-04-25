
module.exports = (sequelize, DataTypes) => {
  var Departamento = sequelize.define('Departamento', {
    nombre: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Departamento.hasMany(models.Institucion);
      }
    },
    tableName: 'departamentos',
    timestamps: true,
    paranoid: true
  });
  return Departamento;
};
