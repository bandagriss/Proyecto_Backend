
module.exports = (sequelize, DataTypes) => {
  const Departamento = sequelize.define('Departamento', {
    nombre: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'departamentos',
    timestamps: true,
    paranoid: true
  });
  Departamento.associate = (models) => {
    Departamento.hasMany(models.Institucion, {
      foreignKey: 'fid_departamento'
    });
  };
  return Departamento;
};
