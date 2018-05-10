
module.exports = (sequelize, DataTypes) => {
  const Institucion = sequelize.define('Institucion', {
    fid_departamento: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    tableName: 'instituciones',
    timestamps: true,
    paranoid: true
  });
  Institucion.associate = (models) => {
    Institucion.belongsTo(models.Departamento, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'fid_departamento',
        allowNull: false
      }
    });
    Institucion.hasMany(models.Proyecto, {
      foreignKey: 'fid_institucion'
    });
    Institucion.hasMany(models.Financiador, {
      foreignKey: 'fid_institucion'
    });
    Institucion.hasMany(models.Usuario, {
      foreignKey: 'fid_institucion'
    });
  };
  return Institucion;
};
