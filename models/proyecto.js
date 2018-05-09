
module.exports = (sequelize, DataTypes) => {
  var Proyecto = sequelize.define('Proyecto', {
    nombre: DataTypes.STRING,
    fid_institucion: DataTypes.INTEGER,
    fid_financiador: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    codigo_proyecto: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    cantidad: DataTypes.INTEGER,
    poblacion_hombres: DataTypes.STRING,
    poblacion_mujeres: DataTypes.STRING,
    resultado: DataTypes.STRING,
    objetivo: DataTypes.STRING
  }, {
    tableName: 'proyectos',
    timestamps: true,
    paranoid: true
  });
  Proyecto.associate = (models) => {
    Proyecto.belongsTo(models.Institucion, {
      foreignKey: 'fid_institucion'
    });
    Proyecto.belongsTo(models.Financiador, {
      foreignKey: 'fid_financiador'
    });
    Proyecto.hasMany(models.Fase, {
      foreignKey: 'fid_proyecto'
    });
    Proyecto.hasMany(models.ProyectoPersona, {
      foreignKey: 'fid_proyecto'
    });
  };
  return Proyecto;
};
